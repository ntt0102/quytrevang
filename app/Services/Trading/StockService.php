<?php

namespace App\Services\Trading;

use App\Services\CoreService;
use App\Models\StockSymbol;
use App\Models\StockOrder;
use App\Models\DrawTool;
use App\Jobs\FilterStockJob;

class StockService extends CoreService
{
    /**
     * Get chart data
     *
     * @param $payload
     * 
     */
    public function getChartData($payload)
    {
        return [
            'data' => $this->getData($payload),
            'tools' => $this->getTools($payload)
        ];
    }
    /**
     * Get chart data
     *
     * @param $payload
     * 
     */
    public function getData($payload)
    {
        if (str_contains($payload->symbol, '^')) return $this->getDataFromCophieu68($payload);
        return $this->getDataFromSsi($payload);
    }
    /**
     * Get chart data
     *
     * @param $payload
     * 
     */
    public function getDataFromSsi($payload)
    {
        $r = ['ohlc' => [], 'price' => [], 'cash' => []];
        if (!$payload->symbol) return $r;
        $client = new \GuzzleHttp\Client();
        $url = "https://iboard.ssi.com.vn/dchart/api/history?resolution=D&symbol=" . $payload->symbol . "&from=" . $payload->from . "&to=" . $payload->to;
        $res = $client->get($url);
        $rsp = json_decode($res->getBody());
        if ($rsp->s != 'ok') return $r;
        if (count($rsp->t) == 0) return $r;
        $acc = 0;
        $prevAvg = ($rsp->h[0] + $rsp->l[0] + $rsp->c[0]) / 3;
        for ($i = 0; $i < count($rsp->t); $i++) {
            $r['ohlc'][] = [
                'time' => $rsp->t[$i],
                'open' => +$rsp->o[$i],
                'high' => +$rsp->h[$i],
                'low' => +$rsp->l[$i],
                'close' => +$rsp->c[$i]
            ];
            $avg = ($rsp->h[$i] + $rsp->l[$i] + $rsp->c[$i]) / 3;
            $r['price'][] = [
                'time' => $rsp->t[$i],
                'value' => $avg
            ];
            $change = $avg - $prevAvg;
            $side = 0;
            if ($change > 0) $side = 1;
            else if ($change < 0) $side = -1;
            $prevAvg = $avg;
            $cash = $side * $rsp->v[$i];
            $acc += $cash;
            $r['cash'][] = [
                'time' => $rsp->t[$i],
                'value' => $acc
            ];
        }
        return $r;
    }
    /**
     * Get chart data
     *
     * @param $payload
     * 
     */
    public function getDataFromCophieu68($payload)
    {
        $r = ['ohlc' => [], 'price' => [], 'cash' => []];
        if (!$payload->symbol) return $r;
        $client = new \GuzzleHttp\Client();
        $url = "https://www.cophieu68.vn/chart/chart_data.php?parameters=%7B%7D&dateby=1&stockname=" . $payload->symbol;
        $res = $client->get($url);
        $rsp = json_decode($res->getBody());
        if (!is_object($rsp)) return $r;
        if (count($rsp->candle) == 0) return $r;
        $acc = 0;
        $prevAvg = 0;
        foreach ($rsp->candle as $candle) {
            $date = strtotime($candle->date);
            if ($date < $payload->from) continue;
            if ($date > $payload->to) break;
            $r['ohlc'][] = [
                'time' => $date,
                'open' => +$candle->open,
                'high' => +$candle->high,
                'low' => +$candle->low,
                'close' => +$candle->close
            ];
            $avg = ($candle->high + $candle->low + $candle->close) / 3;
            $r['price'][] = [
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
            $acc += $cash;
            $r['cash'][] = [
                'time' => $date,
                'value' => $acc
            ];
        }
        return $r;
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
            $index = ['VNINDEX', 'VN30', '^LARGECAP', '^MIDCAP', '^SMALLCAP', '^BB', '^BDS', '^BH', '^BL', '^CBTS', '^CK', '^CNTT', '^CSSK', '^DVLTAUGT', '^DVTVHT', '^KK', '^NH', '^NLN', '^SPCS', '^SXHGD', '^SXNHC', '^SXPT', '^SXTBMM', '^TBD', '^TCK', '^TI', '^TPDU', '^VLXD', '^VTKB', '^XD', '^CAOSU', '^DAUKHI', '^DUOCPHAM', '^GIAODUC', '^HK', '^NANGLUONG', '^NHUA', '^PHANBON', '^THEP'];
            $nh = ['VCB', 'BID', 'CTG', 'VPB', 'MBB', 'ACB', 'STB', 'HDB', 'VIB', 'SSB', 'SHB', 'MSB', 'TPB', 'LPB', 'EIB', 'OCB'];
            $ck = ['SSI', 'VND', 'VCI', 'SHS', 'HCM', 'VIX', 'MBS', 'FTS', 'BSI', 'CTS', 'VDS'];
            $list = [
                (object)['name' => 'hose', 'symbols' => array_merge($index, $hose)],
                (object)['name' => 'hnx', 'symbols' => $hnx],
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
                if ($payload->name == 'line') $data['point'] = $payload->data[$i]->price;
                DrawTool::updateOrCreate($key, $data);
            }
        }
        return (object)[];
    }
}
