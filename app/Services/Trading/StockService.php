<?php

namespace App\Services\Trading;

use App\Services\CoreService;
use App\Models\StockSymbol;
use App\Models\StockOrder;
use App\Models\DrawTool;
use App\Models\Parameter;
use App\Jobs\FilterStockJob;
use stdClass;

class StockService extends CoreService
{
    const TIME_ZONE = 7 * 60 * 60;
    /**
     * Init Chart
     *
     * @param $payload
     * 
     */
    public function initChart($payload)
    {
        return [
            'chart' => $this->getChart($payload),
            'range' => DrawTool::where('name', 'range')->orderByRaw("point ASC")->pluck('data', 'point'),
            'fundSize' => (int) Parameter::getValue('fundSize', 0),
            'losePerOrder' => (float) Parameter::getValue('losePerOrder', 0)
        ];
    }
    /**
     * Get chart data
     *
     * @param $payload
     * 
     */
    public function getChart($payload)
    {
        $ret = [
            'data' => $this->getData($payload)['c'],
            'tools' => $this->getTools($payload),
            'dividend' => $this->hasDividend($payload),
            'events' => $this->getEvents($payload),
        ];
        if ($payload->vnindex) {
            $payload->symbol = 'VNINDEX';
            $ret['vnindex'] = $this->getDataFromVps($payload)['c']['price'];
        }
        return $ret;
    }
    /**
     * Get data
     *
     * @param $payload
     * 
     */
    public function getData($payload)
    {
        if (str_contains($payload->symbol, '^')) {
            return $this->getDataFromCp68($payload);
        }
        return array_merge_recursive(
            $this->getDataFromVps($payload),
            $this->getDataForeign($payload)
        );
    }
    public function getDataForeign($payload)
    {
        $r = [
            'c' => ['foreign' => []],
            'f' => ['f' => ['t1' => 0, 't2' => 0, 'b' => 0]]
        ];
        if (!$payload->foreign) return $r;
        $startDate = date('m/d/Y', $payload->from);
        $endDate = date("m/d/Y", $payload->to);
        if (!$payload->symbol) return $r;
        $client = new \GuzzleHttp\Client();
        $url = "https://s.cafef.vn/Ajax/PageNew/DataHistory/GDKhoiNgoai.ashx?Symbol={$payload->symbol}&StartDate={$startDate}&EndDate={$endDate}&PageIndex=1&PageSize=1000000";
        $res = $client->get($url);
        $rsp = json_decode($res->getBody())->Data;
        usort($rsp->Data, function ($a, $b) {
            $at = $this->unix($a->Ngay);
            $bt = $this->unix($b->Ngay);
            return strcmp($at, $bt);
        });
        $data = $rsp->Data;
        if ($payload->timeframe != 'D')  $this->getDataForeignTimeframe($data, $payload->timeframe);
        $size = count($data);
        if ($size == 0) return $r;
        $accCash = 0;
        for ($i = 0; $i < $size; $i++) {
            $date = $this->unix($data[$i]->Ngay);
            if ($i > 0) {
                $preDate = $this->unix($data[$i - 1]->Ngay);
                if ($date == $preDate) continue;
            }
            $accCash += $data[$i]->KLGDRong;
            $r['c']['foreign'][] = [
                'time' => $date,
                'value' => $accCash
                // 'value' => abs($data[$i]->KLGDRong),
                // 'value' => $data[$i]->KLMua + $data[$i]->KLBan,
                // 'color' => $data[$i]->KLGDRong > 0 ? 'green' : 'red'
            ];
            //
            if ($i <= $size / 2) {
                $strI = 0;
                if ($i == $strI || $accCash > $r['f']['f']['t1'])
                    $r['f']['f']['t1'] = $accCash;
            }
            if ($i >= $size / 2) {
                $strI = ceil($size / 2);
                if ($i == $strI || $accCash > $r['f']['f']['t2'])
                    $r['f']['f']['t2'] = $accCash;
            }
            if ($i >= $size / 3) {
                $strI = ceil($size / 3);
                if ($i == $strI || $accCash < $r['f']['f']['b'])
                    $r['f']['f']['b'] = $accCash;
            }
        }
        return $r;
    }
    private function getDataForeignTimeframe(&$data, $tf)
    {
        $candles = [];
        foreach ($data as $candle) {
            $key = date('Y-' . $tf, $this->unix($candle->Ngay));
            if (!array_key_exists($key, $candles)) {
                $candles[$key] = new stdClass();
                $candles[$key]->Ngay = $candle->Ngay;
                $candles[$key]->KLGDRong = 0;
            }
            $candles[$key]->KLGDRong += $candle->KLGDRong;
        }
        $data = array_values($candles);
    }
    public function getDataFromVps($payload)
    {
        $r = $this->initData();
        if (!$payload->symbol) return $r;
        $client = new \GuzzleHttp\Client();
        $url = "https://histdatafeed.vps.com.vn/tradingview/history?symbol={$payload->symbol}&resolution=1D&from={$payload->from}&to={$payload->to}";
        $res = $client->get($url);
        $rsp = json_decode($res->getBody());
        if ($rsp->s != 'ok') return $r;
        if ($payload->timeframe != 'D')  $this->getDataVpsTimeframe($rsp, $payload->timeframe);
        $size = count($rsp->t);
        if ($size == 0) return $r;
        $accCash = 0;
        $prevAvg = 0;
        for ($i = 0; $i < $size; $i++) {
            $date = $rsp->t[$i];
            $r['c']['ohlc'][] = [
                'time' => $date,
                'open' => +$rsp->o[$i],
                'high' => +$rsp->h[$i],
                'low' => +$rsp->l[$i],
                'close' => +$rsp->c[$i]
            ];
            $avg = ($rsp->h[$i] + $rsp->l[$i] + $rsp->c[$i]) / 3;
            $r['c']['price'][] = [
                'time' => $date,
                'value' => $avg
            ];
            if (!$prevAvg) $prevAvg = $avg;
            $change = $avg - $prevAvg;
            $side = 0;
            if ($change > 0) $side = 1;
            else if ($change < 0) $side = -1;
            $prevAvg = $avg;
            $cash = $side * $rsp->v[$i];
            $accCash += $cash;
            $r['c']['cash'][] = [
                'time' => $date,
                'value' => $accCash
            ];
            $this->createFilterData($r, $i, $size, $avg, $accCash);
        }
        return $r;
    }
    private function getDataVpsTimeframe(&$data, $tf)
    {
        $t = [];
        $o = [];
        $h = [];
        $l = [];
        $c = [];
        $v = [];
        for ($i = 0; $i < count($data->t); $i++) {
            $key = date('Y-' . $tf, +$data->t[$i] + self::TIME_ZONE);
            if (!array_key_exists($key, $t)) {
                $t[$key] = $data->t[$i];
                $o[$key] = $data->o[$i];
                $h[$key] = $data->h[$i];
                $l[$key] = $data->l[$i];
                $v[$key] = 0;
            } else {
                if ($data->h[$i] > $h[$key]) $h[$key] = $data->h[$i];
                if ($data->l[$i] < $l[$key]) $l[$key] = $data->l[$i];
            }
            $c[$key] = $data->c[$i];
            $v[$key] += $data->v[$i];
        }
        $data = (object)[
            't' => array_values($t),
            'o' => array_values($o),
            'h' => array_values($h),
            'l' => array_values($l),
            'c' => array_values($c),
            'v' => array_values($v),
        ];
    }
    public function getDataFromCp68($payload)
    {
        $r = $this->initData();
        if (!$payload->symbol) return $r;
        $client = new \GuzzleHttp\Client();
        $url = "https://www.cophieu68.vn/chart/chart_data.php?parameters=%7B%7D&dateby=1&stockname={$payload->symbol}";
        $res = $client->get($url);
        $rsp = json_decode($res->getBody());
        if (!is_object($rsp)) return $r;
        $candles = array_values(array_filter(
            $rsp->candle,
            function ($i) use ($payload) {
                $date = $this->unix($i->date);
                return $date >= $payload->from && $date <= $payload->to;
            }
        ));
        if ($payload->timeframe != 'D') $this->getDataCp68Timeframe($candles, $payload->timeframe);
        $size = count($candles);
        if ($size == 0) return $r;
        $accCash = 0;
        $prevAvg = 0;
        for ($i = 0; $i < $size; $i++) {
            $candle = $candles[$i];
            $date = $this->unix($candle->date);
            if ($i > 0) {
                $preDate = $this->unix($candles[$i - 1]->date);
                if ($date == $preDate) continue;
            }
            $r['c']['ohlc'][] = [
                'time' => $date,
                'open' => +$candle->open,
                'high' => +$candle->high,
                'low' => +$candle->low,
                'close' => +$candle->close
            ];
            $avg = ($candle->high + $candle->low + $candle->close) / 3;
            $r['c']['price'][] = [
                'time' => $date,
                'value' => $avg
            ];
            if (!$prevAvg) $prevAvg = $avg;
            $change = $avg - $prevAvg;
            $side = 0;
            if ($change > 0) $side = 1;
            else if ($change < 0) $side = -1;
            $prevAvg = $avg;
            $cash = $side * $candle->volume;
            $accCash += $cash;
            $r['c']['cash'][] = [
                'time' => $date,
                'value' => $accCash
            ];
            //
            $this->createFilterData($r, $i, $size, $avg, $accCash);
        }
        return $r;
    }
    private function getDataCp68Timeframe(&$data, $tf)
    {
        $candles = [];
        foreach ($data as $candle) {
            $key = date('Y-' . $tf, $this->unix($candle->date));
            if (!array_key_exists($key, $candles)) {
                $candles[$key] = new stdClass();
                $candles[$key]->date = $candle->date;
                $candles[$key]->open = $candle->open;
                $candles[$key]->high = $candle->high;
                $candles[$key]->low = $candle->low;
                $candles[$key]->volume = 0;
            } else {
                if ($candle->high > $candles[$key]->high) $candles[$key]->high = $candle->high;
                if ($candle->low < $candles[$key]->low) $candles[$key]->low = $candle->low;
            }
            $candles[$key]->close = $candle->close;
            $candles[$key]->volume += $candle->volume;
        }
        $data = array_values($candles);
    }
    private function initData()
    {
        return [
            'c' => ['ohlc' => [], 'price' => [], 'cash' => []],
            'f' => [
                'p' => ['t1' => 0, 't2' => 0, 'b' => 0],
                'c' => ['t1' => 0, 't2' => 0, 'b' => 0]
            ]
        ];
    }
    private function createFilterData(&$r, $i, $size, $avg, $accCash)
    {
        if ($i <= $size / 2) {
            $strI = 0;
            if ($i == $strI || $avg > $r['f']['p']['t1'])
                $r['f']['p']['t1'] = $avg;
            if ($i == $strI || $accCash > $r['f']['c']['t1'])
                $r['f']['c']['t1'] = $accCash;
        }
        if ($i >= $size / 2) {
            $strI = ceil($size / 2);
            if ($i == $strI || $avg > $r['f']['p']['t2'])
                $r['f']['p']['t2'] = $avg;
            if ($i == $strI || $accCash > $r['f']['c']['t2'])
                $r['f']['c']['t2'] = $accCash;
        }
        if ($i >= $size / 3) {
            $strI = ceil($size / 3);
            if ($i == $strI || $avg < $r['f']['p']['b'])
                $r['f']['p']['b'] = $avg;
            if ($i == $strI || $accCash < $r['f']['c']['b'])
                $r['f']['c']['b'] = $accCash;
        }
    }
    private function unix($str)
    {
        return strtotime(str_replace('/', '-', $str)) + self::TIME_ZONE;
    }
    /**
     * Get chart tool
     *
     * @param $payload
     * 
     */
    public function getTools($payload)
    {
        $result = array();
        $ss = DrawTool::where('symbol', $payload->symbol)->orderByRaw("name ASC, point ASC")->get(['name', 'point', 'data']);
        foreach ($ss as $d) {
            if (!isset($result[$d->name])) $result[$d->name] = array();
            $result[$d->name][$d->point] = $d->data;
        }
        return $result;
    }
    /**
     * Get events
     *
     * @param $payload
     * 
     */
    public function hasDividend($payload)
    {
        if (!$payload->dividend) return false;
        $startDate = date("Y-m-d");
        $endDate = date('Y-m-d', $this->unix('+1 year'));
        $client = new \GuzzleHttp\Client();
        $url = "https://finfo-api.vndirect.com.vn/v4/events?q=locale:VN~type:stockdiv,dividend~code:{$payload->symbol}~effectiveDate:gte:{$startDate}~effectiveDate:lte:{$endDate}&sort=effectiveDate:asc&size=50&page=1";
        $res = $client->get($url);
        $rsp = json_decode($res->getBody());
        return $rsp->totalElements > 0;
    }
    /**
     * Get news
     *
     * @param $payload
     * 
     */
    public function getEvents($payload)
    {
        $ret = [];
        $startDate = date('Y-m-d', $payload->from);
        $endDate = date("Y-m-d", $payload->to);
        $token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxODg5NjIyNTMwLCJuYmYiOjE1ODk2MjI1MzAsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsiYWNhZGVteS1yZWFkIiwiYWNhZGVteS13cml0ZSIsImFjY291bnRzLXJlYWQiLCJhY2NvdW50cy13cml0ZSIsImJsb2ctcmVhZCIsImNvbXBhbmllcy1yZWFkIiwiZmluYW5jZS1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImludmVzdG9wZWRpYS1yZWFkIiwib3JkZXJzLXJlYWQiLCJvcmRlcnMtd3JpdGUiLCJwb3N0cy1yZWFkIiwicG9zdHMtd3JpdGUiLCJzZWFyY2giLCJzeW1ib2xzLXJlYWQiLCJ1c2VyLWRhdGEtcmVhZCIsInVzZXItZGF0YS13cml0ZSIsInVzZXJzLXJlYWQiXSwianRpIjoiMjYxYTZhYWQ2MTQ5Njk1ZmJiYzcwODM5MjM0Njc1NWQifQ.dA5-HVzWv-BRfEiAd24uNBiBxASO-PAyWeWESovZm_hj4aXMAZA1-bWNZeXt88dqogo18AwpDQ-h6gefLPdZSFrG5umC1dVWaeYvUnGm62g4XS29fj6p01dhKNNqrsu5KrhnhdnKYVv9VdmbmqDfWR8wDgglk5cJFqalzq6dJWJInFQEPmUs9BW_Zs8tQDn-i5r4tYq2U8vCdqptXoM7YgPllXaPVDeccC9QNu2Xlp9WUvoROzoQXg25lFub1IYkTrM66gJ6t9fJRZToewCt495WNEOQFa_rwLCZ1QwzvL0iYkONHS_jZ0BOhBCdW9dWSawD6iF1SIQaFROvMDH1rg";
        $client = new \GuzzleHttp\Client(['headers' => ['authorization' => "Bearer {$token}"]]);
        // $url = "https://svr5.fireant.vn/api/Data/Companies/TimescaleMarks?symbol={$payload->symbol}&startDate={$startDate}&endDate={$endDate}";
        $url = "https://restv2.fireant.vn/symbols/{$payload->symbol}/timescale-marks?startDate={$startDate}&endDate={$endDate}";
        $res = $client->get($url);
        $rsp = json_decode($res->getBody());
        foreach ($rsp as $news) {
            $ret[] = [
                'time' => $this->unix($news->date),
                'value' => 1,
                'color' => $news->color,
                'title' => $news->title
            ];
        }
        return $ret;
    }
    /**
     * Clone Symbols
     *
     */
    public function cloneSymbols()
    {
        return $this->transaction(function () {
            $client = new \GuzzleHttp\Client();
            $url = "https://bgapidatafeed.vps.com.vn/getlistckindex/hose";
            $res = $client->get($url);
            $hose = json_decode($res->getBody());
            $url = "https://bgapidatafeed.vps.com.vn/getlistckindex/hnx";
            $res = $client->get($url);
            $hnx = json_decode($res->getBody());
            $url = "https://bgapidatafeed.vps.com.vn/getlistckindex/upcom";
            $res = $client->get($url);
            $upcom = json_decode($res->getBody());
            $index = ['^LARGECAP', '^MIDCAP', '^SMALLCAP', '^BB', '^BDS', '^BH', '^BL', '^CBTS', '^CK', '^CNTT', '^CSSK', '^DVLTAUGT', '^DVTVHT', '^KK', '^NH', '^NLN', '^SPCS', '^SXHGD', '^SXNHC', '^SXPT', '^SXTBMM', '^TBD', '^TCK', '^TI', '^TPDU', '^VLXD', '^VTKB', '^XD', '^CAOSU', '^DAUKHI', '^DUOCPHAM', '^GIAODUC', '^HK', '^NANGLUONG', '^NHUA', '^PHANBON', '^THEP'];
            $nh = ['VCB', 'BID', 'CTG', 'VPB', 'MBB', 'ACB', 'STB', 'HDB', 'VIB', 'SSB', 'SHB', 'MSB', 'TPB', 'LPB', 'EIB', 'OCB'];
            $ck = ['SSI', 'VND', 'VCI', 'SHS', 'HCM', 'VIX', 'MBS', 'FTS', 'BSI', 'CTS', 'VDS'];
            $list = [
                (object)['name' => 'hose', 'symbols' => array_merge(['VNINDEX'], $hose)],
                (object)['name' => 'hnx', 'symbols' => array_merge($index, $hnx, $upcom)],
                (object)['name' => 'nh', 'symbols' => $nh],
                (object)['name' => 'ck', 'symbols' => $ck],
            ];
            $stt = true;
            foreach ($list as $item) {
                $stt &= !!StockSymbol::updateOrCreate(['name' => $item->name], ['symbols' => $item->symbols]);
            }
            return ['isOk' => $stt];
        });
    }

    /**
     * Get Symbols
     *
     */
    public function getSymbols()
    {
        $symbols = StockSymbol::get(array('name', 'symbols'))
            ->pluck('symbols', 'name');
        $symbols['hold'] = StockOrder::opening()->get('symbol')->pluck('symbol');
        return $symbols;
    }

    /**
     * Filter Symbols
     *
     * @param $payload
     * 
     */
    public function filterSymbols($payload)
    {
        FilterStockJob::dispatch($payload);
        return ['isOk' => true];
    }

    /**
     * Remove Filter List
     *
     * @param $payload
     * 
     */
    public function removeFilterList($payload)
    {
        $list = StockSymbol::where('name', $payload->name)->first();
        $list->symbols = array_values(array_diff($list->symbols, [$payload->symbol]));
        $list->save();
        return (object)[];
    }

    /**
     * Add Watchlist
     *
     * @param $payload
     * 
     */
    public function addWatchlist($payload)
    {
        $watch = StockSymbol::where('name', 'watch')->first();
        if (!$watch) $stt = StockSymbol::create(['name' => 'watch', 'symbols' => [$payload->symbol]]);
        else {
            $symbols = $watch->symbols;
            if ($payload->add) array_push($symbols, $payload->symbol);
            else $symbols = array_values(array_diff($symbols, [$payload->symbol]));
            $watch->symbols = $symbols;
            $stt = $watch->save();
        }
        return (object)[];
    }

    /**
     * Delete Watchlist
     *
     * @param $payload
     * 
     */
    public function deleteWatchlist($payload)
    {
        $stt = StockSymbol::updateOrCreate(['name' => 'watch'], ['symbols' => []]);
        return ['isOk' => !!$stt];
    }

    /**
     * Draw Tools
     *
     * @param $payload
     * 
     */
    public function drawTools($payload)
    {
        if ($payload->isRemove) {
            $dt = DrawTool::where('symbol', $payload->symbol)->where('name', $payload->name);
            if ($payload->name == 'line' && !!$payload->point)
                $dt = $dt->where('point', $payload->point);
            $dt->delete();
        } else {
            for ($i = 0; $i < count($payload->points); $i++) {
                $key = ['symbol' => $payload->symbol, 'name' => $payload->name, 'point' => $payload->points[$i]];
                $data = ['data' => $payload->data[$i]];
                // if ($payload->name == 'line') $data['point'] = $payload->data[$i]->price;
                DrawTool::updateOrCreate($key, $data);
            }
        }
        return (object)[];
    }
}
