<?php

namespace App\Services\Trading;

use App\Services\CoreService;

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
        $client = new \GuzzleHttp\Client();
        $url = "https://iboard.ssi.com.vn/dchart/api/history?resolution=D&symbol=" . $payload->symbol . "&from=" . strtotime("-3 year") . "&to=" . time();
        $res = $client->get($url);
        $rsp = json_decode($res->getBody());
        if ($rsp->s != 'ok') return $r;
        $acc = 0;
        $prevAvg = ($rsp->h[0] + $rsp->l[0] + $rsp->c[0]) / 3;
        // $prevClose = $rsp->c[0];
        for ($i = 0; $i < count($rsp->t); $i++) {
            $r['ohlc'][] = [
                'time' => $rsp->t[$i],
                'open' => +$rsp->o[$i],
                'high' => +$rsp->h[$i],
                'low' => +$rsp->l[$i],
                'close' => +$rsp->c[$i]
            ];
            $avg = ($rsp->h[$i] + $rsp->l[$i] + $rsp->c[$i]) / 3;
            // $close = +$rsp->c[$i];
            $r['price'][] = [
                'time' => $rsp->t[$i],
                'value' => $avg
                // 'value' => $close
            ];
            $change = $avg - $prevAvg;
            // $change = $close - $prevClose;
            $side = 0;
            if ($change > 0) $side = 1;
            else if ($change < 0) $side = -1;
            $prevAvg = $avg;
            // $prevClose = $close;
            $cash = $side * $rsp->v[$i];
            $acc += $cash;
            $r['cash'][] = [
                'time' => $rsp->t[$i],
                'value' => $acc
            ];
        }
        return $r;
    }
}
