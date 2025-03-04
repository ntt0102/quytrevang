<?php

namespace App\Services\Trading;

use App\Services\CoreService;
use App\Models\ShareSymbol;
use App\Models\ShareOrder;
use App\Models\StockDrawing;
use App\Jobs\FilterShareJob;
use App\Events\FilterShareEvent;

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
        $indexSymbol = get_global_value('shareIndex');
        $filterTime = StockDrawing::where('name', 'filterTime')->orderByRaw("point ASC")->pluck('data', 'point');
        $watch = ShareSymbol::where('name', 'WATCH')->first();
        $reversal = StockDrawing::where('symbol', $indexSymbol)
            ->where('name', 'reversal')
            ->where('point', '0')->value('data');
        return [
            'vpsUser' => get_global_value('vpsUser'),
            'vpsSession' => get_global_value('vpsSession'),
            'index' => $indexSymbol,
            'sources' => ['FIREANT', 'VNDIRECT'],
            'source' => get_global_value('shareSource'),
            'filterTime' => $filterTime,
            'watchlist' => $watch ? $watch->symbols : [],
            'reversal' => $reversal,
            'whitespace' => $this->createChartWhitespace(),
        ];
    }

    private function createChartWhitespace()
    {
        $chart = [];
        $date = new \DateTime('midnight', new \DateTimeZone('UTC'));
        $dayCount = 0;

        while ($dayCount <= 60) {
            if (check_opening_market($date)) {
                $chart[] = ['time' => $date->getTimestamp()];
                $dayCount++;
            }
            $date->modify('+1 day');
        }

        return $chart;
    }

    /**
     * Set Source
     *
     * @param $payload
     * 
     */
    public function setSource($payload)
    {
        set_global_value('shareSource', $payload->source);
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
            'stock' => $this->getChartData($payload->symbol, $payload->from),
            'tools' => $this->getTools($payload),
        ];
        if ($payload->withIndex) {
            $indexSymbol = get_global_value('shareIndex');
            $data['index'] = $this->getChartData($indexSymbol, $payload->from);
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
        $symbol = $payload->symbol;
        $tools = StockDrawing::where('symbol', $symbol)->orderByRaw("name ASC, point ASC")->get(['name', 'point', 'data']);
        foreach ($tools as $tool) {
            if (!isset($result[$tool->name])) $result[$tool->name] = [];
            $result[$tool->name][$tool->point] = $tool->data;
        }
        return (object)$result;
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
            if (isset($payload, $payload->point)) {
                $dt = $dt->where('point', $payload->point);
            }
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
        $groups = ShareSymbol::pluck('name');
        $hasHold = ShareOrder::opening()->exists();
        if ($hasHold) $groups->push('HOLD');
        return $groups;
    }

    /**
     * Get Symbols
     *
     */
    public function getSymbols($group)
    {
        if ($group === 'HOLD') {
            return ShareOrder::opening()->pluck('symbol');
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
        $indexSymbol = get_global_value('shareIndex');
        $symbol = $payload->symbol;
        $filterTimes = $payload->filterTimes;
        $filterTimesCount = count($filterTimes);
        if (!$symbol || $filterTimesCount < 2) return ['isOk' => false];
        $isMid = $filterTimesCount >= 3;
        $isLong = $filterTimesCount === 4;
        $index = $this->calcStock($indexSymbol, $filterTimes, $isMid, $isLong);
        $stock = $this->calcStock($symbol, $filterTimes, $isMid, $isLong);
        $check = (array)$this->checkStock($index, $stock, $isMid, $isLong);
        $fromto = [
            'start' => date('d/m/Y', end($filterTimes)),
            'end' => date('d/m/Y', $filterTimes[0]),
        ];
        return [
            'symbol' => $symbol,
            'result' => $check
            // 'result' => $fromto + $check
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
        $filterTimesCount = count($payload->filterTimes);
        if (!$payload->group || $filterTimesCount < 2) return ['isOk' => false];
        FilterShareJob::dispatch($payload->group, $payload->filterTimes);
        return ['isOk' => true];
    }

    /**
     * Update Watchlist
     *
     * @param $payload
     * 
     */
    public function changeWatchlist($payload)
    {
        if ($payload->multi) {
            $symbols = [];
            if ($payload->add) {
                $filter = ShareSymbol::where('name', 'FILTER')->first();
                $symbols = $filter->symbols;
            }
            $stt = ShareSymbol::updateOrCreate(['name' => 'WATCH'], ['symbols' => $symbols]);
            return ['isOk' => !!$stt, 'watchlist' => $symbols];
        } else {
            $symbol = $payload->symbol;
            $watch = ShareSymbol::where('name', 'WATCH')->first();
            if (!$watch) {
                ShareSymbol::create(['name' => 'WATCH', 'symbols' => [$symbol]]);
                return ['watchlist' => [$symbol]];
            } else {
                $symbols = $watch->symbols;
                if ($payload->add) array_push($symbols, $symbol);
                else $symbols = array_values(array_diff($symbols, [$symbol]));
                $watch->symbols = $symbols;
                $watch->save();
                return ['watchlist' => $symbols];
            }
        }
    }

    public function getGroupSymbols($group)
    {
        try {
            $client = new \GuzzleHttp\Client();
            $url = "https://datafeedapi.aisec.com.vn/getlistckindex/{$group}";
            $res = $client->get($url);
            return json_decode($res->getBody());
        } catch (\Throwable $th) {
            return [];
        }
    }

    public function getStock($symbol, $from, $to)
    {
        // 'charts.pinetree.vn/tv/history'
        // https://trading.vietcap.com.vn/api/chart/OHLCChart/gap-chart
        //X https://mastrade.masvn.com/api/v1/tradingview/history
        //X https://vstock.vn/mck/tvchart2/63791/history
        // https://kbbuddyiis.kbsec.com.vn/investment/stocks/AAM/data_day?sdate=14-03-2024&edate=09-01-2025
        try {
            $client = new \GuzzleHttp\Client();
            $url = "https://dchart-api.vndirect.com.vn/dchart/history?resolution=1D&symbol={$symbol}&from={$from}&to={$to}";
            $res = $client->get($url);
            $rsp = json_decode($res->getBody());
            if (!$rsp) return (object)['s' => 'ng'];
            return $rsp;
        } catch (\Throwable $th) {
            return (object)['s' => 'ng'];
        }
    }

    public function scanStock($data, $filterTimes, $isMid, $isLong)
    {
        if ($data->s !== 'ok') return false;
        $Hl = $Ll = $Hm = $Lm = $Hs = $Ls = $Hi = (object)[];
        $s1Date = ($filterTimes[1] + 2 * $filterTimes[0]) / 3;
        $s2Date = (2 * $filterTimes[1] + $filterTimes[0]) / 3;
        if ($isMid) {
            $m1Date = ($filterTimes[2] + 2 * $filterTimes[1]) / 3;
            $m2Date = (2 * $filterTimes[2] + $filterTimes[1]) / 3;
        }
        if ($isLong) {
            $l1Date = ($filterTimes[3] + 2 * $filterTimes[2]) / 3;
            $l2Date = (2 * $filterTimes[3] + $filterTimes[2]) / 3;
        }
        $last = count($data->t) - 1;
        for ($i = $last; $i >= 0; $i--) {
            $h = $data->h[$i];
            $l = $data->l[$i];
            $t = $data->t[$i];
            $pH = (object)['t1' => date('Y-m-d', $t), 't' => $t, 'i' => $i, 'p' => $h];
            $pL = (object)['t1' => date('Y-m-d', $t), 't' => $t, 'i' => $i, 'p' => $l];
            if ($i === $last) {
                $Hl = $Ll = $Hm = $Lm = $Hs = $Ls = $Hi = $pL;
            } else {
                if ($t >= $filterTimes[1]) {
                    if ($t >= $s1Date) {
                        if ($h > $Hi->p) $Ls = $Hi = $pH;
                    }
                    if ($t <= $s1Date && $t >= $s2Date) {
                        if ($l < $Ls->p) $Hs = $Ls = $pL;
                    }
                    if ($t <= $s2Date) {
                        if ($h > $Hs->p) $Lm = $Hs = $pH;
                    }
                } else  if ($isMid && $t >= $filterTimes[2]) {
                    if ($t >= $m1Date) {
                        if ($h > $Hs->p) $Lm = $Hs = $pH;
                    }
                    if ($t <= $m1Date && $t >= $m2Date) {
                        if ($l < $Lm->p) $Hm = $Lm = $pL;
                    }
                    if ($t <= $m2Date) {
                        if ($h > $Hm->p) $Ll = $Hm = $pH;
                    }
                } else if ($isLong) {
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
        return (object)['Hl' => $Hl, 'Ll' => $Ll, 'Hm' => $Hm, 'Lm' => $Lm, 'Hs' => $Hs, 'Ls' => $Ls, 'Hi' => $Hi];
    }

    public function scanBase($data, $stop)
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
                $B = (object)['H' => $pL, 'L' => $pL, 'ir' => 0];
                $M = clone $B;
            } else {
                if ($h > $B->H->p) $B->H = $pH;
                if ($l < $B->L->p) {
                    if ($B->ir > $M->ir) $M = clone $B;
                    $B->H = $pL;
                    $B->L = $pL;
                    $B->ir = 0;
                } else $B->ir++;
            }
            if ($t === $stop) break;
        }
        return $M;
    }

    public function calcStock($symbol, $filterTimes, $isMid, $isLong)
    {
        $data = $this->getStock($symbol, end($filterTimes), $filterTimes[0]);
        if ($data->s !== 'ok') return false;
        $points = $this->scanStock($data, $filterTimes, $isMid, $isLong);
        if (!$points) return false;
        $baseZone = $this->scanBase($data, $points->Ls->t);
        $base = abs($baseZone->H->i - $points->Hi->i) <= 5;
        //
        $HiLs = $points->Hi->p - $points->Ls->p;
        $HsLs = $points->Hs->p - $points->Ls->p;
        $bounce['short'] = round($HiLs / $HsLs, 2);
        $immedRange = round($baseZone->H->p - $baseZone->L->p, 2);
        $shortRange = round($HsLs, 2);
        $shrink['short'] = $immedRange < $shortRange;
        $trend['short'] = $baseZone->L->p > $points->Ls->p;
        if ($isMid) {
            $HsLm = $points->Hs->p - $points->Lm->p;
            $HmLm = $points->Hm->p - $points->Lm->p;
            $bounce['mid'] = round($HsLm / $HmLm, 2);
            $midRange = round($HmLm, 2);
            $shrink['mid'] = $shortRange < $midRange;
            $trend['mid'] = $points->Ls->p > $points->Lm->p;
        }
        if ($isLong) {
            $HmLl = $points->Hm->p - $points->Ll->p;
            $HlLl = $points->Hl->p - $points->Ll->p;
            $bounce['long'] = round($HmLl / $HlLl, 2);
            $longRange = round($HlLl, 2);
            $shrink['long'] = $midRange < $longRange;
            $trend['long'] = $points->Lm->p > $points->Ll->p;
        }
        $shrinkConds = array_values($shrink);
        $shrink['sum'] = count(array_filter($shrinkConds)) === count($shrinkConds);
        $trendConds = array_values($trend);
        $trend['sum'] = count(array_filter($trendConds)) === count($trendConds);

        return (object)[
            'symbol' => $symbol,
            'points' => $points,
            'base' => $base,
            'bounce' => (object)$bounce,
            'shrink' => (object)$shrink,
            'trend' => (object)$trend,
        ];
    }

    public function checkStock($index, $stock, $isMid, $isLong)
    {
        $pivot['short'] = $stock->points->Ls->t <= $index->points->Ls->t;
        $bounce['short'] = $stock->bounce->short > 0.7 && $stock->bounce->short > $index->bounce->short;
        if ($isMid) {
            $pivot['mid'] = $stock->points->Lm->t <= $index->points->Lm->t;
            $bounce['mid'] = $stock->bounce->mid > 0.7 && $stock->bounce->mid > $index->bounce->mid;
        }
        if ($isLong) {
            $pivot['long'] = $stock->points->Ll->t <= $index->points->Ll->t;
            $bounce['long'] = $stock->bounce->long > 0.7 && $stock->bounce->long > $index->bounce->long;
        }
        $pivotConds = array_values($pivot);
        $pivotSum = count(array_filter($pivotConds)) === count($pivotConds);
        $pivot['sum'] = $pivotSum;
        $bounceConds = array_values($bounce);
        $bounceSum = count(array_filter($bounceConds)) === count($bounceConds);
        $bounce['sum'] = $bounceSum;
        //
        return (object)[
        'check' => [
            'sum' => $pivotSum && $bounceSum && $stock->shrink->sum && $stock->trend->sum && $stock->base,
            'bounce' => $bounce,
            'pivot' => $pivot,
            'shrink' => $stock->shrink,
            'trend' => $stock->trend,
            'base' => $stock->base,
        ],
        'points' => [
            $index->symbol => $index->points,
            $stock->symbol => $stock->points
        ]
        ];
    }

    public function filterStock($group, $filterTimes)
    {
        $indexSymbol = get_global_value('shareIndex');
        $filterTimesCount = count($filterTimes);
        $isMid = $filterTimesCount >= 3;
        $isLong = $filterTimesCount === 4;
        $filteredSymbols = [];
        $index = $this->calcStock($indexSymbol, $filterTimes, $isMid, $isLong);
        $symbols = $this->getSymbols($group);
        if (empty($symbols)) return false;
        $total = count($symbols);
        $step = 1;
        $preProcess = 0;
        foreach ($symbols as $symbol) {
            $process = intval(100 * $step / $total);
            if ($process > $preProcess) {
                echo $process . ' ';
                event(new FilterShareEvent($process));
                $preProcess = $process;
            }
            $stock = $this->calcStock($symbol, $filterTimes, $isMid, $isLong);
            $check = $this->checkStock($index, $stock, $isMid, $isLong);
            if ($check->sum) $filteredSymbols[] = $symbol;
            $step++;
        }
        return (object)[
            'group' => $group,
            'symbols' => $filteredSymbols
        ];
    }

    public function test()
    {
        $indexSymbol = get_global_value('shareIndex');
        $symbol = 'CTG';
        $filterTimes = [
            strtotime('2024-12-20'),
            strtotime('2023-11-01'),
            // strtotime('2024-09-27'),
            // strtotime('2024-06-12'),
            // strtotime('2021-05-25')
        ];
        $filterTimesCount = count($filterTimes);
        $isMid = $filterTimesCount >= 3;
        $isLong = $filterTimesCount === 4;
        // ----------------------------
        // $data = $this->getStock($symbol, end($filterTimes), $filterTimes[0]);
        // ----------------------------
        // $data = $this->calcStock($symbol, $filterTimes, $isMid, $isLong);
        // ----------------------------
        $index = $this->calcStock($indexSymbol, $filterTimes, $isMid, $isLong);
        $stock = $this->calcStock($symbol, $filterTimes, $isMid, $isLong);
        $data = $this->checkStock($index, $stock, $isMid, $isLong);
        // ----------------------------
        // $data = FilterShareJob::dispatch('VNX50', $filterTimes);
        // ----------------------------
        return $data;
    }
}
