<?php

namespace App\Services\Trading;

use App\Services\CoreService;
use App\Models\ShareSymbol;
use App\Models\ShareOrder;
use App\Models\StockDrawing;
use App\Jobs\FilterShareJob;
use App\Jobs\ExportShareJob;
use stdClass;

class ShareService extends CoreService
{
    const TIME_ZONE = 7 * 60 * 60;
    const FA_AUTH = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxODg5NjIyNTMwLCJuYmYiOjE1ODk2MjI1MzAsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsiYWNhZGVteS1yZWFkIiwiYWNhZGVteS13cml0ZSIsImFjY291bnRzLXJlYWQiLCJhY2NvdW50cy13cml0ZSIsImJsb2ctcmVhZCIsImNvbXBhbmllcy1yZWFkIiwiZmluYW5jZS1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImludmVzdG9wZWRpYS1yZWFkIiwib3JkZXJzLXJlYWQiLCJvcmRlcnMtd3JpdGUiLCJwb3N0cy1yZWFkIiwicG9zdHMtd3JpdGUiLCJzZWFyY2giLCJzeW1ib2xzLXJlYWQiLCJ1c2VyLWRhdGEtcmVhZCIsInVzZXItZGF0YS13cml0ZSIsInVzZXJzLXJlYWQiXSwianRpIjoiMjYxYTZhYWQ2MTQ5Njk1ZmJiYzcwODM5MjM0Njc1NWQifQ.dA5-HVzWv-BRfEiAd24uNBiBxASO-PAyWeWESovZm_hj4aXMAZA1-bWNZeXt88dqogo18AwpDQ-h6gefLPdZSFrG5umC1dVWaeYvUnGm62g4XS29fj6p01dhKNNqrsu5KrhnhdnKYVv9VdmbmqDfWR8wDgglk5cJFqalzq6dJWJInFQEPmUs9BW_Zs8tQDn-i5r4tYq2U8vCdqptXoM7YgPllXaPVDeccC9QNu2Xlp9WUvoROzoQXg25lFub1IYkTrM66gJ6t9fJRZToewCt495WNEOQFa_rwLCZ1QwzvL0iYkONHS_jZ0BOhBCdW9dWSawD6iF1SIQaFROvMDH1rg";

    /**
     * Init Chart
     *
     * @param $payload
     * 
     */
    public function initChart($payload)
    {
        $range = StockDrawing::where('name', 'range')->orderByRaw("point ASC")->pluck('data', 'point');
        $payload->window = $range->map(function ($t) {
            return $t->time;
        });
        return [
            'chart' => $this->getChart($payload),
            'range' => $range,
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
            'data' => $this->getData($payload)['chart'],
            'tools' => $this->getTools($payload),
            'events' => $this->getEvents($payload),
        ];
        if ($payload->vnindex) {
            $payload->symbol = 'VNINDEX';
            $ret['vnindex'] = $this->getDataFireAnt($payload)['chart']['price'];
        }
        if (count($payload->window) == 2) {
            $payload->from = $payload->window[0];
            $payload->to = $payload->window[1];
            $ret['foreignRSI'] = round($this->getDataFireAnt($payload)['rsi']['foreign'][2]);
        }
        return $ret;
    }
    public function getData($payload)
    {
        $data = $this->getDataFireAnt($payload);
        $data['chart']['active'] = $this->getActiveVolume($payload);
        return $data;
    }
    public function getDataFireAnt($payload)
    {
        $r = [
            'chart' => ['ohlc' => [], 'price' => [], 'cash' => [], 'foreign' => [], 'gap' => [], 'signal' => []],
            'rsi' => ['price' => [100, 0], 'cash' => [0, 0], 'foreign' => [0, 0, 0]]
        ];
        if (!$payload->symbol) return $r;
        $startDate = date('Y-m-d', $payload->from);
        $endDate = date("Y-m-d", $payload->to);
        $client = new \GuzzleHttp\Client(['headers' => ['authorization' => self::FA_AUTH]]);
        $url = "https://restv2.fireant.vn/symbols/{$payload->symbol}/historical-quotes?startDate={$startDate}&endDate={$endDate}&offset=0&limit=1000000";
        $res = $client->get($url);
        $data = json_decode($res->getBody());
        // usort($data, function ($a, $b) {
        //     return $a->date < $b->date;
        // });
        if ($payload->timeframe != 'D')  $this->getDataFireAntTimeframe($data, $payload->timeframe);
        $size = count($data);
        if ($size == 0) return $r;
        $prevAvg = 0;
        $prevHigh = 0;
        $prevLow = 0;
        $topAvg = 0;
        $bottomAvg = 0;
        $priceGains = [0, 0];
        $priceLosses = [0, 0];
        $cashAcc = 0;
        $cashGains = [0, 0];
        $cashLosses = [0, 0];
        $frgnAcc = 0;
        $frgnGains = [0, 0, 0];
        $frgnLosses = [0, 0, 0];
        for ($i = $size - 1; $i >= 0; $i--) {
            $date = $this->unix($data[$i]->date);
            if ($i < $size - 1) {
                $preDate = $this->unix($data[$i + 1]->date);
                if ($date == $preDate) continue;
            }
            $priceOpen = $data[$i]->priceOpen / $data[$i]->adjRatio;
            $priceHigh = $data[$i]->priceHigh / $data[$i]->adjRatio;
            $priceLow = $data[$i]->priceLow / $data[$i]->adjRatio;
            $priceClose = $data[$i]->priceClose / $data[$i]->adjRatio;
            $r['chart']['ohlc'][] = [
                'time' => $date,
                'open' => $priceOpen,
                'high' => $priceHigh,
                'low' => $priceLow,
                'close' => $priceClose
            ];
            //
            $avg = ($priceHigh + $priceLow + $priceClose) / 3;
            $r['chart']['price'][] = [
                'time' => $date,
                'value' => $avg
            ];
            //
            if (!$prevHigh) $prevHigh = $priceHigh;
            $buyGap = $priceLow > $prevHigh;
            $prevHigh = $priceHigh;
            if (!$prevLow) $prevLow = $priceLow;
            $sellGap = $priceHigh < $prevLow;
            $prevLow = $priceLow;
            if ($buyGap || $sellGap) {
                $r['chart']['gap'][] = [
                    'time' => $date,
                    'value' => 1,
                    'color' => $buyGap ? 'purple' : 'orange'
                ];
            }
            //
            if (!$topAvg) $topAvg = $avg;
            if (!$bottomAvg) $bottomAvg = $avg;
            if ($i > 3 * $size / 4) {
                if ($avg > $topAvg) {
                    $topAvg = $avg;
                    $priceGains[0] = 0;
                    $priceLosses[0] = 0;
                    $cashGains[0] = 0;
                    $cashLosses[0] = 0;
                }
                if ($avg < $bottomAvg) {
                    $bottomAvg = $avg;
                    $priceGains[1] = 0;
                    $priceLosses[1] = 0;
                    $cashGains[1] = 0;
                    $cashLosses[1] = 0;
                }
            }
            if (!$prevAvg) $prevAvg = $avg;
            $change = $avg - $prevAvg;
            $prevAvg = $avg;
            $side = 0;
            if ($change > 0) {
                $side = 1;
                $priceGains[0] += $change;
                $priceGains[1] += $change;
                $cashGains[0] += $data[$i]->totalVolume;
                $cashGains[1] += $data[$i]->totalVolume;
            } else if ($change < 0) {
                $side = -1;
                $priceLosses[0] -= $change;
                $priceLosses[1] -= $change;
                $cashLosses[0] += $data[$i]->totalVolume;
                $cashLosses[1] += $data[$i]->totalVolume;
            }
            $cash = $side * $data[$i]->totalVolume;
            $cashAcc += $cash;
            $r['chart']['cash'][] = [
                'time' => $date,
                'value' => $cashAcc
            ];
            //
            $frgnQuantity = $data[$i]->buyForeignQuantity - $data[$i]->sellForeignQuantity;
            $frgnAcc += $frgnQuantity;
            $r['chart']['foreign'][] = [
                'time' => $date,
                'value' => $frgnAcc
            ];
            //
            $j = $i > $size / 2 ? 1 : 2;
            if ($frgnQuantity > 0) {
                $frgnGains[0] += $frgnQuantity;
                $frgnGains[$j] += $frgnQuantity;
            } else {
                $frgnLosses[0] -= $frgnQuantity;
                $frgnLosses[$j] -= $frgnQuantity;
            }
            //
            $buySignal = $data[$i]->buyQuantity > $data[$i]->sellQuantity && $data[$i]->buyCount < $data[$i]->sellCount;
            $sellSignal = 1.5 * $data[$i]->buyQuantity < $data[$i]->sellQuantity && $data[$i]->buyCount > $data[$i]->sellCount;
            if ($buySignal || $sellSignal) {
                $r['chart']['signal'][] = [
                    'time' => $date,
                    'value' => 1,
                    'color' => $buySignal ? 'lime' : 'red'
                ];
            }
        }
        for ($i = 0; $i < 3; $i++) {
            if ($i < 2) {
                if ($priceLosses[$i] > 0)
                    $r['rsi']['price'][$i] = 100 - (100 / (1 + ($priceGains[$i] / $priceLosses[$i])));
                if ($cashLosses[$i] > 0)
                    $r['rsi']['cash'][$i] = 100 - (100 / (1 + ($cashGains[$i] / $cashLosses[$i])));
            }
            if ($frgnLosses[$i] > 0)
                $r['rsi']['foreign'][$i] = 100 - (100 / (1 + ($frgnGains[$i] / $frgnLosses[$i])));
        }
        return $r;
    }
    private function getDataFireAntTimeframe(&$data, $tf)
    {
        $bars = [];
        foreach ($data as $bar) {
            $key = date('Y-' . $tf, $this->unix($bar->date));
            $priceOpen = $bar->priceOpen / $bar->adjRatio;
            $priceHigh = $bar->priceHigh / $bar->adjRatio;
            $priceLow = $bar->priceLow / $bar->adjRatio;
            $priceClose = $bar->priceClose / $bar->adjRatio;
            if (!array_key_exists($key, $bars)) {
                $bars[$key] = new stdClass();
                $bars[$key]->date = $bar->date;
                $bars[$key]->adjRatio = 1;
                $bars[$key]->priceHigh = $priceHigh;
                $bars[$key]->priceLow = $priceLow;
                $bars[$key]->priceClose = $priceClose;
                $bars[$key]->totalVolume = 0;
                $bars[$key]->buyForeignQuantity = 0;
                $bars[$key]->sellForeignQuantity = 0;
                $bars[$key]->buyCount = 0;
                $bars[$key]->sellCount = 0;
                $bars[$key]->buyQuantity = 0;
                $bars[$key]->sellQuantity = 0;
            } else {
                if ($priceHigh > $bars[$key]->priceHigh)
                    $bars[$key]->priceHigh = $priceHigh;
                if ($priceLow < $bars[$key]->priceLow)
                    $bars[$key]->priceLow = $priceLow;
            }
            $bars[$key]->priceOpen = $priceOpen;
            $bars[$key]->totalVolume += $bar->totalVolume;
            $bars[$key]->buyForeignQuantity += $bar->buyForeignQuantity;
            $bars[$key]->sellForeignQuantity += $bar->sellForeignQuantity;
            $bars[$key]->buyCount += $bar->buyCount;
            $bars[$key]->sellCount += $bar->sellCount;
            $bars[$key]->buyQuantity += $bar->buyQuantity;
            $bars[$key]->sellQuantity += $bar->sellQuantity;
        }
        $data = array_values($bars);
    }

    public function getActiveVolume($payload)
    {
        $data = [];
        if (!$payload->symbol) return $data;
        $startDate = date('Y-m-d', $payload->from);
        $endDate = date("Y-m-d", $payload->to);
        $file = storage_path('app/cophieu/' . $payload->symbol . '.csv');
        if (!file_exists($file)) return $data;
        $fp = fopen($file, 'r');
        $volume = 0;
        while (!feof($fp)) {
            $line = fgetcsv($fp);
            if (!!$line) {
                if ($line[0] < $startDate) continue;
                if ($line[0] > $endDate) break;
                $volume += +$line[1];
                $data[] = [
                    'time' => strtotime($line[0] . 'Z'),
                    'value' => $volume,
                ];
            }
        }
        fclose($fp);
        return $data;
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
        $ss = StockDrawing::where('symbol', $payload->symbol)->orderByRaw("name ASC, point ASC")->get(['name', 'point', 'data']);
        foreach ($ss as $d) {
            if (!isset($result[$d->name])) $result[$d->name] = array();
            $result[$d->name][$d->point] = $d->data;
        }
        return $result;
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
        $client = new \GuzzleHttp\Client(['headers' => ['authorization' => self::FA_AUTH]]);
        $url = "https://restv2.fireant.vn/symbols/{$payload->symbol}/timescale-marks?startDate={$startDate}&endDate={$endDate}";
        $res = $client->get($url);
        $rsp = json_decode($res->getBody());
        $lastestDate = time();
        foreach ($rsp as $news) {
            $eventDate = $this->unix($news->date);
            $ret[] = [
                'time' => $eventDate,
                'value' => 1,
                'color' => $news->color,
                'title' => $news->title
            ];
            $lastestDate = $eventDate;
        }
        $startDate = date("Y-m-d");
        $endDate = date('Y-m-d', $this->unix('+1 year'));
        $url = "https://restv2.fireant.vn/events/search?symbol={$payload->symbol}&orderBy=1&type=0&startDate={$startDate}&endDate={$endDate}&offset=0&limit=20";
        $res = $client->get($url);
        $rsp = json_decode($res->getBody());
        foreach ($rsp as $news) {
            $eventDate = $this->unix($news->recordDate);
            if ($eventDate == $lastestDate) continue;
            $ret[] = [
                'time' => $eventDate,
                'value' => 1,
                'color' => $news->type == 1 ? '#A0248B' : ($news->type == 2 ? '#FF8040' : '#1D14D6'),
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
            $url = "https://bgapidatafeed.vps.com.vn/getlistckindex/VN100";
            $res = $client->get($url);
            $vn100 = json_decode($res->getBody());
            $vn100 = explode(",", " " . implode(", ", $vn100));

            $index = ['^LARGECAP', '^MIDCAP', '^SMALLCAP', '^BB', '^BDS', '^BH', '^BL', '^CBTS', '^CK', '^CNTT', '^CSSK', '^DVLTAUGT', '^DVTVHT', '^KK', '^NH', '^NLN', '^SPCS', '^SXHGD', '^SXNHC', '^SXPT', '^SXTBMM', '^TBD', '^TCK', '^TI', '^TPDU', '^VLXD', '^VTKB', '^XD', '^CAOSU', '^DAUKHI', '^DUOCPHAM', '^GIAODUC', '^HK', '^NANGLUONG', '^NHUA', '^PHANBON', '^THEP'];
            $nh = [' VCB', ' BID', ' CTG', ' VPB', ' MBB', ' ACB', ' STB', ' HDB', ' VIB', ' SSB', ' SHB', ' MSB', ' TPB', ' LPB', ' EIB', ' OCB'];
            $ck = [' SSI', ' VND', ' VCI', ' SHS', ' HCM', ' VIX', ' MBS', ' FTS', ' BSI', ' CTS', ' VDS'];
            $list = [
                (object)['name' => 'vn100', 'symbols' => $vn100],
                (object)['name' => 'index', 'symbols' => $index],
                (object)['name' => 'nh', 'symbols' => $nh],
                (object)['name' => 'ck', 'symbols' => $ck],
            ];
            $stt = true;
            foreach ($list as $item) {
                $stt &= !!ShareSymbol::updateOrCreate(['name' => $item->name], ['symbols' => $item->symbols]);
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
        $symbols = ShareSymbol::get(array('name', 'symbols'))
            ->pluck('symbols', 'name');
        $holdSymbols = ShareOrder::opening()->get('symbol')->pluck('symbol');
        $holdSymbols = $holdSymbols->map(function ($s) {
            return ' ' . $s;
        });
        $symbols['hold'] = $holdSymbols;
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
        FilterShareJob::dispatch($payload);
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
        $list = ShareSymbol::where('name', $payload->name)->first();
        $list->symbols = array_values(array_diff($list->symbols, [' ' . $payload->symbol]));
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
        $symbol = ' ' . $payload->symbol;
        $watch = ShareSymbol::where('name', 'watch')->first();
        if (!$watch) ShareSymbol::create(['name' => 'watch', 'symbols' => [$symbol]]);
        else {
            $symbols = $watch->symbols;
            if ($payload->add) array_push($symbols, $symbol);
            else $symbols = array_values(array_diff($symbols, [$symbol]));
            $watch->symbols = $symbols;
            $watch->save();
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
        $stt = ShareSymbol::updateOrCreate(['name' => 'watch'], ['symbols' => []]);
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
            $dt = StockDrawing::where('symbol', $payload->symbol)->where('name', $payload->name);
            if ($payload->name == 'line' && !!$payload->point)
                $dt = $dt->where('point', $payload->point);
            $dt->delete();
        } else {
            for ($i = 0; $i < count($payload->points); $i++) {
                $key = ['symbol' => $payload->symbol, 'name' => $payload->name, 'point' => $payload->points[$i]];
                $data = ['data' => $payload->data[$i]];
                // if ($payload->name == 'line') $data['point'] = $payload->data[$i]->price;
                StockDrawing::updateOrCreate($key, $data);
            }
        }
        return (object)[];
    }

    public function getStock($symbol, $startDate, $endDate)
    {
        try {
            $startDate = strtotime($startDate);
            $endDate = strtotime($endDate);
            $client = new \GuzzleHttp\Client();
            $url = "https://dchart-api.vndirect.com.vn/dchart/history?resolution=1D&symbol={$symbol}&from={$startDate}&to={$endDate}";
            $res = $client->get($url);
            return json_decode($res->getBody());
        } catch (\Throwable $th) {
            return (object)['s' => 'ng'];
        }
    }

    public function scanStock($symbol, $long, $short, $current)
    {
        $data = $this->getStock($symbol, $long, $current);
        if ($data->s !== 'ok') return false;
        $A = $B = $C = $D = $E = $F = [];
        $short = strtotime($short);
        $current = strtotime($current);
        $mid = ($short + $current) / 2;
        $last = count($data->t) - 1;
        for ($i = $last; $i >= 0; $i--) {
            $h = $data->h[$i];
            $l = $data->l[$i];
            $t = $data->t[$i];
            $pL = ['t' => $t, 'p' => $l, 'time' => date('Y-m-d', $t)];
            $pH = ['t' => $t, 'p' => $h, 'time' => date('Y-m-d', $t)];
            if ($i === $last) {
                $F = $pL;
                $E = $D = $C = $B = $A = $F;
            }
            if ($t >= $short) {
                if ($t >= $mid) {
                    if ($h > $E['p']) $E = $pH;
                } else {
                    if ($h > $C['p']) $C = $pH;
                }
                if ($l < $D['p']) $D = $pL;
            } else {
                if ($h > $A['p']) $A = $pH;
            }
            if ($l < $B['p']) $B = $pL;
        }
        return ['A' => $A, 'B' => $B, 'C' => $C, 'D' => $D, 'E' => $E];
    }
}
