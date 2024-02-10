<?php

namespace App\Services\Trading;

use App\Services\CoreService;
use App\Models\StockSymbol;
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
     * Clone Symbols
     *
     */
    public function cloneSymbols()
    {
        $client = new \GuzzleHttp\Client();
        $url = "https://bgapidatafeed.vps.com.vn/getlistckindex/hose";
        $res = $client->get($url);
        $hose = json_decode($res->getBody());
        $ss = StockSymbol::updateOrCreate(['name' => 'hose'], ['symbols' => array_merge(['VNINDEX', 'VN30'], $hose)]);
        return ['isOk' => !!$ss];
    }

    /**
     * Get Symbols
     *
     */
    public function getSymbols()
    {

        // return StockSymbol::where('name', 'hose')->get(['name', 'symbols']);
        return StockSymbol::select(array('name', 'symbols'))
            ->get()
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
        FilterStockJob::dispatch($payload);
        return ['isOk' => true];
    }
}
