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
        $t1 = $payload->filterTimes[0];
        $t2 = $payload->filterTimes[1];
        $t3 = $payload->filterTimes[2];
        $t4 = $payload->filterTimes[3];
        $term = $t1 ? 3 : 2;
        $vnindex = $this->calcStock('VNINDEX', $t1, $t2, $t3, $t4, $term);
        $stock = $this->calcStock($symbol, $t1, $t2, $t3, $t4, $term);
        $check = (array)$this->checkStock($vnindex, $stock, $term);
        $fromto = [
            'from' => date('d/m/Y', $term === 3 ? $t1 : $t2),
            'to' => date('d/m/Y', $t4),
        ];
        return [
            'symbol' => $symbol,
            'result' => $fromto + $check
        ];
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

    public function scanStock($data, $longDate, $midDate, $shortDate, $currDate, $term)
    {
        if ($data->s !== 'ok') return false;
        $Hl = $Ll = $Hm = $Lm = $Hs = $Ls = $Hc = (object)[];
        $s1Date = ($shortDate + 2 * $currDate) / 3;
        $s2Date = (2 * $shortDate + $currDate) / 3;
        $m1Date = ($midDate + 2 * $shortDate) / 3;
        $m2Date = (2 * $midDate + $shortDate) / 3;
        if ($term === 3) {
            $l1Date = ($longDate + 2 * $midDate) / 3;
            $l2Date = (2 * $longDate + $midDate) / 3;
        }
        $last = count($data->t) - 1;
        for ($i = $last; $i >= 0; $i--) {
            $h = $data->h[$i];
            $l = $data->l[$i];
            $t = $data->t[$i];
            $pH = (object)['t1' => date('Y-m-d', $t), 't' => $t, 'i' => $i, 'p' => $h];
            $pL = (object)['t1' => date('Y-m-d', $t), 't' => $t, 'i' => $i, 'p' => $l];
            if ($i === $last) {
                $Hl = $Ll = $Hm = $Lm = $Hs = $Ls = $Hc = $pL;
            } else {
                if ($t >= $shortDate) {
                    if ($t >= $s1Date) {
                        if ($h > $Hc->p) $Ls = $Hc = $pH;
                    }
                    if ($t <= $s1Date && $t >= $s2Date) {
                        if ($l < $Ls->p) $Hs = $Ls = $pL;
                    }
                    if ($t <= $s2Date) {
                        if ($h > $Hs->p) $Lm = $Hs = $pH;
                    }
                } else  if ($t >= $midDate) {
                    if ($t >= $m1Date) {
                        if ($h > $Hs->p) $Lm = $Hs = $pH;
                    }
                    if ($t <= $m1Date && $t >= $m2Date) {
                        if ($l < $Lm->p) $Hm = $Lm = $pL;
                    }
                    if ($t <= $m2Date) {
                        if ($h > $Hm->p) $Ll = $Hm = $pH;
                    }
                } else {
                    if ($term === 3) {
                        if ($t >= $l1Date) {
                            if ($h > $Hm->p) $Ll = $Hm = $pH;
                        }
                        if ($t <= $l1Date && $t >= $l2Date) {
                            if ($l < $Ll->p) $Hl = $Ll = $pL;
                        }
                        if ($t <= $l2Date) {
                            if ($h > $Hl->p) $Hl = $pH;
                        }
                    }
                }
            }
        }
        return (object)['Hl' => $Hl, 'Ll' => $Ll, 'Hm' => $Hm, 'Lm' => $Lm, 'Hs' => $Hs, 'Ls' => $Ls, 'Hc' => $Hc];
    }

    public function scanPivot($data, $stop)
    {
        $B = $M = (object)[];
        $last = count($data->t) - 1;
        for ($i = $last; $i >= 0; $i--) {
            $h = $data->h[$i];
            $l = $data->l[$i];
            $t = $data->t[$i];
            $pH = (object)['t1' => date('Y-m-d', $t), 't' => $t, 'i' => $i, 'p' => $h];
            $pL = (object)['t1' => date('Y-m-d', $t), 't' => $t, 'i' => $i, 'p' => $l];
            if ($i === $last) {
                $B = (object)['H' => $pH, 'L' => $pL];
                $M = clone $B;
            } else {
                if ($h > $B->H->p) $B->H = $pH;
                if ($l < $B->L->p) {
                    if ($B->H->p - $B->L->p > $M->H->p - $M->L->p) $M = clone $B;
                    $B->H = $pL;
                    $B->L = $pL;
                }
            }
            if ($t === $stop) break;
        }
        return $M;
    }

    public function calcStock($symbol, $t1, $t2, $t3, $t4, $term)
    {
        $data = $this->getStock($symbol, $term === 3 ? $t1 : $t2, $t4);
        if ($data->s !== 'ok') return false;
        $points = $this->scanStock($data, $t1, $t2, $t3, $t4, $term);
        if (!$points) return false;
        $calc = [
            'short' => round(($points->Hc->p - $points->Ls->p) / ($points->Hs->p - $points->Ls->p), 2),
            'mid' => round(($points->Hs->p - $points->Lm->p) / ($points->Hm->p - $points->Lm->p), 2)
        ];
        $range = [
            round($points->Hs->p - $points->Ls->p, 2),
            round($points->Hm->p - $points->Lm->p, 2)

        ];
        if ($term === 3) {
            $calc['long'] = round(($points->Hm->p - $points->Ll->p) / ($points->Hl->p - $points->Ll->p), 2);
            $range[2] = round($points->Hl->p - $points->Ll->p, 2);
        }
        $ascRange = $range;
        sort($ascRange);
        $compress = $range === $ascRange;
        $pivotPoint = $this->scanPivot($data, $points->Ls->t);
        $pivot = abs($pivotPoint->H->i - $points->Hc->i) <= 5;
        return (object)['symbol' => $symbol, 'term' => (object)$calc, 'compress' => $compress, 'pivot' => $pivot, 'points' => $points, 'range' => $range];
    }

    public function checkStock($vnindex, $stock, $term)
    {
        $check = [
            $stock->pivot,
            $stock->compress,
            $stock->term->short > 0.7 && $stock->term->short > $vnindex->term->short,
            $stock->term->mid > 0.7 && $stock->term->mid > $vnindex->term->mid
        ];
        $result = [
            'pivot' => $check[0],
            'compress' => $check[1],
            'short' => $check[2],
            'mid' => $check[3],
        ];
        if ($term === 3) {
            $check[] = $stock->term->long > 0.7 && $stock->term->long > $vnindex->term->long;
            $result['long'] = $check[4];
        }
        $sum = count(array_filter($check)) === count($check);
        $result['sum'] = $sum;

        return (object)[
            $vnindex->symbol => $vnindex->term,
            $stock->symbol => $stock->term,
            'result' => (object)$result,
            'compress' => $stock->range,
            'points' => $stock->points,
        ];
    }

    public function filterStock($group, $t1, $t2, $t3, $t4)
    {
        $filteredSymbols = [];
        $term = $t1 ? 3 : 2;
        $vnindex = $this->calcStock('VNINDEX', $t1, $t2, $t3, $t4, $term);
        $symbols = $this->getSymbols($group);
        if (empty($symbols)) return false;
        foreach ($symbols as $symbol) {
            echo $symbol . ' ';
            $stock = $this->calcStock($symbol, $t1, $t2, $t3, $t4, $term);
            $check = $this->checkStock($vnindex, $stock, $term);
            if ($check->result->sum) $filteredSymbols[] = $symbol;
        }
        return (object)[
            'group' => $group,
            'symbols' => $filteredSymbols
        ];
    }

    public function test()
    {
        $symbol = 'CTG';
        $t1 = strtotime('2021-05-25');
        $t2 = strtotime('2024-06-12');
        $t3 = strtotime('2024-09-27');
        $t4 = strtotime('2024-12-20');
        $term = $t1 ? 3 : 2;
        // ----------------------------
        // $data = $this->calcStock($symbol, $t1, $t2, $t3, $t4, $term);
        // ----------------------------
        $vnindex = $this->calcStock('VNINDEX', $t1, $t2, $t3, $t4, $term);
        $stock = $this->calcStock($symbol, $t1, $t2, $t3, $t4, $term);
        $data = $this->checkStock($vnindex, $stock, $term);
        // ----------------------------
        return $data;
    }
}
