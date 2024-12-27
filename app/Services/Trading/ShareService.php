<?php

namespace App\Services\Trading;

use App\Services\CoreService;
use App\Models\ShareSymbol;
use App\Models\ShareOrder;
use App\Models\StockDrawing;
use App\Jobs\FilterShareJob;
use App\Jobs\ExportShareJob;

class ShareService extends CoreService
{

    /**
     * Init Chart
     *
     * @param $payload
     * 
     */
    public function initChart($payload)
    {
        $filterTime = StockDrawing::where('name', 'filterTime')->orderByRaw("point ASC")->pluck('data', 'point');
        $watch = ShareSymbol::where('name', 'WATCH')->first();
        return [
            'vpsUser' => get_global_value('vpsUser'),
            'vpsSession' => get_global_value('vpsSession'),
            'filterTime' => $filterTime,
            'watchlist' => $watch ? $watch->symbols : []
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
        $data = [
            'price' => $this->getChartData($payload->symbol, $payload->from),
            // 'tools' => $this->getTools($payload),
        ];
        if ($payload->withVnindex) {
            $data['vnindex'] = $this->getChartData("VNINDEX", $payload->from);
        }
        return $data;
    }
    public function getChartData($symbol, $from)
    {
        $chart = [];
        $to = time();
        $data = $this->getStock($symbol, $from, $to);
        if ($data->s !== 'ok') return [];
        $last = count($data->t) - 1;
        for ($i = 0; $i <= $last; $i++) {
            $chart[] = [
                'time' => $data->t[$i],
                'open' => $data->o[$i],
                'high' => $data->h[$i],
                'low' => $data->l[$i],
                'close' => $data->c[$i]
            ];
        }
        return $chart;
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
     * Draw Tools
     *
     * @param $payload
     * 
     */
    public function drawTools($payload)
    {
        if ($payload->isRemove) {
            $dt = StockDrawing::where('symbol', $payload->symbol)->where('name', $payload->name);
            $dt->delete();
        } else {
            for ($i = 0; $i < count($payload->points); $i++) {
                $key = ['symbol' => $payload->symbol, 'name' => $payload->name, 'point' => $payload->points[$i]];
                $data = ['data' => $payload->data[$i]];
                StockDrawing::updateOrCreate($key, $data);
            }
        }
        return (object)[];
    }

    /**
     * Get Groups
     *
     */
    public function getGroups()
    {
        return ShareSymbol::get('name')->pluck('name');
    }

    /**
     * Get Symbols
     *
     */
    public function getSymbols($group)
    {
        if ($group === 'HOLD') {
            return ShareOrder::opening()->get('symbol')->pluck('symbol');
        } else if (in_array($group, ['FILTER', 'WATCH'])) {
            $filter = ShareSymbol::where('name', $group)->first();
            return $filter ? $filter->symbols : [];
        } else {
            return $this->getGroupSymbols($group);
        }
    }

    /**
     * Check Symbols
     *
     * @param $payload
     * 
     */
    public function checkSymbol($payload)
    {
        $symbol = $payload->symbol;
        $time1 = $payload->filterTimes[0];
        $time2 = $payload->filterTimes[1];
        $time3 = $payload->filterTimes[2];
        $time4 = $payload->filterTimes[3];
        return $this->checkStock($symbol, $time1, $time2, $time3, $time4);
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
     * Add Watchlist
     *
     * @param $payload
     * 
     */
    public function addWatchlist($payload)
    {
        $symbol = $payload->symbol;
        $watch = ShareSymbol::where('name', 'WATCH')->first();
        if (!$watch) {
            ShareSymbol::create(['name' => 'WATCH', 'symbols' => [$symbol]]);
            return [$symbol];
        } else {
            $symbols = $watch->symbols;
            if ($payload->add) array_push($symbols, $symbol);
            else $symbols = array_values(array_diff($symbols, [$symbol]));
            $watch->symbols = $symbols;
            $watch->save();
            return $symbols;
        }
    }

    /**
     * Delete Watchlist
     *
     * @param $payload
     * 
     */
    public function deleteWatchlist($payload)
    {
        $stt = ShareSymbol::updateOrCreate(['name' => 'WATCH'], ['symbols' => []]);
        return ['isOk' => !!$stt];
    }

    public function getStock($symbol, $from, $to)
    {
        try {
            $client = new \GuzzleHttp\Client();
            $url = "https://dchart-api.vndirect.com.vn/dchart/history?resolution=1D&symbol={$symbol}&from={$from}&to={$to}";
            $res = $client->get($url);
            return json_decode($res->getBody());
        } catch (\Throwable $th) {
            return (object)['s' => 'ng'];
        }
    }

    public function scanStock($data, $longDate, $midDate, $shortDate, $currDate)
    {
        if ($data->s !== 'ok') return false;
        $Hl = $Ll = $Hm = $Lm = $Hs = $Ls = $Hc = (object)[];
        $hsDate = ($shortDate + $currDate) / 2;
        $lsDate = (2 * $shortDate + $currDate) / 3;
        $hmDate = ($midDate + $shortDate) / 2;
        $lmDate = (2 * $midDate + $shortDate) / 3;
        $hlDate = ($longDate + $midDate) / 2;
        $llDate = (2 * $longDate + $midDate) / 3;
        $last = count($data->t) - 1;
        for ($i = $last; $i >= 0; $i--) {
            $h = $data->h[$i];
            $l = $data->l[$i];
            $t = $data->t[$i];
            $pL = (object)['t' => date('Y-m-d', $t), 'p' => $l];
            $pH = (object)['t' => date('Y-m-d', $t), 'p' => $h];
            if ($i === $last) {
                $Hl = $Ll = $Hm = $Lm = $Hs = $Ls = $Hc = $pL;
            } else {
                if ($t >= $shortDate) {
                    if ($t >= $hsDate) {
                        if ($h > $Hc->p) $Ls = $Hc = $pH;
                    } else {
                        if ($h > $Hs->p) $Lm = $Hs = $pH;
                    }
                    if ($t >= $lsDate) {
                        if ($l < $Ls->p) $Hs = $Ls = $pL;
                    }
                } else  if ($t >= $midDate) {
                    if ($t >= $hmDate) {
                        if ($h > $Hs->p) $Lm = $Hs = $pH;
                    } else {
                        if ($h > $Hm->p) $Ll = $Hm = $pH;
                    }
                    if ($t >= $lmDate) {
                        if ($l < $Lm->p) $Hm = $Lm = $pL;
                    }
                } else {
                    if ($t >= $hlDate) {
                        if ($h > $Hm->p) $Ll = $Hm = $pH;
                    } else {
                        if ($h > $Hl->p) $Hl = $pH;
                    }
                    if ($t >= $llDate) {
                        if ($l < $Ll->p) $Hl = $Ll = $pL;
                    }
                }
            }
        }
        return (object)['Hl' => $Hl, 'Ll' => $Ll, 'Hm' => $Hm, 'Lm' => $Lm, 'Hs' => $Hs, 'Ls' => $Ls, 'Hc' => $Hc];
    }

    public function calcStock($symbol, $time1, $time2, $time3, $time4)
    {
        $data = $this->getStock($symbol, $time1, $time4);
        if ($data->s !== 'ok') return false;
        $points = $this->scanStock($data, $time1, $time2, $time3, $time4);
        if (!$points) return false;
        $long = ($points->Hm->p - $points->Ll->p) / ($points->Hl->p - $points->Ll->p);
        $mid = ($points->Hs->p - $points->Lm->p) / ($points->Hm->p - $points->Lm->p);
        $short = ($points->Hc->p - $points->Ls->p) / ($points->Hs->p - $points->Ls->p);
        $trend = $points->Lm->p > $points->Ll->p && $points->Ls->p > $points->Lm->p;
        return (object)['long' => $long, 'mid' => $mid, 'short' => $short, 'trend' => $trend];
    }

    public function getGroupSymbols($group)
    {
        try {
            $client = new \GuzzleHttp\Client();
            $url = "https://bgapidatafeed.vps.com.vn/getlistckindex/{$group}";
            $res = $client->get($url);
            return json_decode($res->getBody());
        } catch (\Throwable $th) {
            return [];
        }
    }

    public function checkStock($symbol, $time1, $time2, $time3, $time4)
    {
        $vnindex = $this->calcStock('VNINDEX', $time1, $time2, $time3, $time4);
        $stock = $this->calcStock($symbol, $time1, $time2, $time3, $time4);
        $trend = $stock->trend && $vnindex->trend;
        $long = $stock->long > $vnindex->long;
        $mid = $stock->mid > $vnindex->mid;
        $short = $stock->short > $vnindex->short;
        $total = $trend && $long && $mid && $short;
        return (object)[
            'from' => date('Y-m-d', $time1),
            'to' => date('Y-m-d', $time4),
            'VNINDEX' => $vnindex,
            $symbol => $stock,
            'check' => (object)[
                'trend' => $trend,
                'long' => $long,
                'mid' => $mid,
                'short' => $short,
                'total' => $total,
            ]
        ];
    }

    public function filterStock($group, $time1, $time2, $time3, $time4)
    {
        $checkResult = [];
        $vnindex = $this->calcStock('VNINDEX', $time1, $time2, $time3, $time4);
        $symbols = $this->getSymbols($group);
        if (empty($symbols)) return false;
        foreach ($symbols as $symbol) {
            $stock = $this->calcStock($symbol, $time1, $time2, $time3, $time4);
            $check = $stock->trend && $vnindex->trend
                && $stock->long > $vnindex->long
                && $stock->mid > $vnindex->mid
                && $stock->short > $vnindex->short;
            if ($check) $checkResult[] = $symbol;
        }
        return (object)[
            'from' => date('Y-m-d', $time1),
            'to' => date('Y-m-d', $time4),
            'group' => $group,
            'symbols' => $checkResult
        ];
    }
}
