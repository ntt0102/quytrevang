<?php

namespace App\Services\Trading;

use App\Services\CoreService;
use App\Models\StockSymbol;
use App\Models\DrawTool;
use App\Jobs\TestJob;

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
        $client = new \GuzzleHttp\Client();
        $url = "https://bgapidatafeed.vps.com.vn/getlistckindex/hose";
        $res = $client->get($url);
        $hose = json_decode($res->getBody());
        $index = ['VNINDEX', 'VN30', '^CK', '^NH'];
        $ss = StockSymbol::updateOrCreate(['name' => 'index'], ['symbols' => $index]);
        $ss = StockSymbol::updateOrCreate(['name' => 'hose'], ['symbols' => $hose]);
        return ['isOk' => !!$ss];
    }

    /**
     * Get Symbols
     *
     */
    public function getSymbols()
    {

        return StockSymbol::get(array('name', 'symbols'))
            ->pluck('symbols', 'name');
    }

    /**
     * Filter Symbols
     *
     * @param $payload
     * 
     */
    public function filterSymbols($payload)
    {
        TestJob::dispatch('web');
        return ['isOk' => true];
        // $r = [];
        // $isCash = false;
        // $isIndex = false;
        // $isMix = false;
        // $payload->symbol = 'VNINDEX';
        // $vnindex = $this->getData($payload)['price'];
        // $strVni = current($vnindex)['value'];
        // $endVni = end($vnindex)['value'];
        // $stocks = StockSymbol::whereIn('name', ['hose', 'index'])->get();
        // foreach ($stocks as $stock) {
        //     foreach ($stock->symbols as $symbol) {
        //         $payload->symbol = $symbol;
        //         $data = $this->getData($payload);
        //         $price = $data['price'];
        //         if (count($price) == 0) continue;
        //         $strPr = current($price)['value'];
        //         $endPr = end($price)['value'];
        //         $cash = $data['cash'];
        //         $strCh = current($cash)['value'];
        //         $endCh = end($cash)['value'];
        //         $isCash = $endPr < $strPr && $endCh > $strCh;
        //         $isIndex = $endVni < $strVni && $endPr > $strPr;
        //         $isMix = $endVni < $strVni && $endPr > $strPr && $endCh > $strCh;
        //         if (($payload->type == 'fcash' && $isCash) ||
        //             ($payload->type == 'findex' && $isIndex) ||
        //             ($payload->type == 'fmix' && $isMix)
        //         ) $r[] = $symbol;
        //     }
        // }
        // $stt = StockSymbol::updateOrCreate(['name' => $payload->type], ['symbols' => $r]);
        // return ['isOk' => !!$stt];
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
