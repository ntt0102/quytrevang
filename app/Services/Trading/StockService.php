<?php

namespace App\Services\Trading;

use App\Services\CoreService;
use App\Models\Copyist;
use App\Services\Special\VpsOrderService;
use App\Jobs\OrderVpsJob;
use App\Jobs\ReportTradingJob;
use App\Jobs\ExportTradingJob;

class StockService extends CoreService
{
    private $SHIFT_TIME = 7 * 60 * 60;

    /**
     * Get chart data
     *
     * @param $payload
     * 
     */
    public function getChartData($payload)
    {
        $r = ['price' => [], 'avg' => [], 'cash' => []];
        $client = new \GuzzleHttp\Client();
        $url = "https://iboard.ssi.com.vn/dchart/api/history?resolution=D&symbol=" . $payload->symbol . "&from=" . strtotime("-3 year") . "&to=" . time();
        $res = $client->get($url);
        $rsp = json_decode($res->getBody());
        if ($rsp->s != 'ok') return $r;
        $acc = 0;
        $prevAvg = ($rsp->h[0] + $rsp->l[0] + $rsp->c[0]) / 3;
        // $prevClose = $rsp->c[0];
        for ($i = 0; $i < count($rsp->t); $i++) {
            $r['price'][] = [
                'time' => $rsp->t[$i],
                'open' => +$rsp->o[$i],
                'high' => +$rsp->h[$i],
                'low' => +$rsp->l[$i],
                'close' => +$rsp->c[$i]
            ];
            $avg = ($rsp->h[$i] + $rsp->l[$i] + $rsp->c[$i]) / 3;
            // $close = +$rsp->c[$i];
            $r['avg'][] = [
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

    /**
     * Get Config
     *
     * @param $payload
     * 
     */
    public function getConfig($payload)
    {
        $copyist = request()->user()->copyist;
        return [
            'openingMarket' => get_global_value('openingMarketFlag') == '1',
            'symbol' => get_global_value('vn30f1m'),
            'volLimit' => 300,
            'vpsCode' => $copyist->vps_code,
            'vpsSession' => $copyist->vps_session,
        ];
    }

    /**
     * Get Status
     *
     * @param $payload
     * 
     */
    public function getStatus($payload)
    {
        $copyist = request()->user()->copyist;
        $vos = new VpsOrderService($copyist);
        return [
            'connection' => $vos->connection,
            'position' => $vos->position,
            'pending' => $vos->hasOrder() || $vos->hasConditionOrder()
        ];
    }

    /**
     * Get Account Info
     *
     * @param $payload
     * 
     */
    public function getAccountInfo($payload)
    {
        $copyist = request()->user()->copyist;
        $vos = new VpsOrderService($copyist);
        return $vos->getAccountInfo();
    }

    /**
     * Execute Order
     *
     * @param $payload
     * 
     */
    public function executeOrder($payload)
    {
        return $this->transaction(
            function () use ($payload) {
                $copyist = request()->user()->copyist;
                $vos = new VpsOrderService($copyist);
                $ret = $vos->execute($payload);
                if ($copyist->share && $ret['isOk']) {
                    Copyist::getCopyists()->each(function ($copyist) use ($payload) {
                        OrderVpsJob::dispatch($copyist, $payload);
                    });
                }
                return $ret;
            }
        );
    }

    /**
     * Get Copyist Status
     *
     * @param $payload
     * 
     */
    public function getCopyistStatus($payload)
    {
        $copyists = Copyist::getCopyists();
        $ret = [];
        foreach ($copyists as $copyist) {
            $vos = new VpsOrderService($copyist);
            $status = [
                'id' => $copyist->id,
                'vps_code' => $copyist->vps_code,
                'connection' => $vos->connection,
                'position' => $vos->position,
            ];
            $ret[] = $status;
        }
        return $ret;
    }

    /**
     * Close Postion
     *
     * @param $payload
     * 
     */
    public function closePosition($payload)
    {
        return $this->transaction(
            function () use ($payload) {
                $copyist = Copyist::find($payload->id);
                $vos = new VpsOrderService($copyist);
                $data = (object)[
                    "action" => "exit",
                    "tpData" => ["cmd" => "cancel"],
                    "slData" => ["cmd" => "delete"],
                    "exitData" => [
                        "cmd" => "new",
                        "price" => "MTL",
                    ],
                ];
                $ret = $vos->execute($data);
                return $ret;
            }
        );
    }

    /**
     * get Vps Account Info
     *
     * @param $payload
     * 
     */
    public function setCopyistSession($payload)
    {
        $user = Copyist::where('vps_code', $payload->user)->first();
        if (!$user) false;
        $user->vps_session = $payload->session;
        return !!$user->save();
    }

    /**
     * Get data from VPS website
     */
    public function generateDataFromVps()
    {
        $list = $this->cloneVpsData();
        return collect($list)->map(function ($item, $index) {
            return [
                'time' => strtotime(date('Y-m-d ') . $item->time) + $this->SHIFT_TIME,
                'price' => $item->lastPrice,
                'volume' => $this->filterVolume($item->lastVol, $index, $item->time),
            ];
        });
    }

    /**
     * generate Data From Csv
     */
    public function generateDataFromCsv($date)
    {
        $c = [];
        $filename = storage_path('app/vn30f1m/' . $date . '.csv');
        if (!file_exists($filename)) return $c;
        $fp = fopen($filename, 'r');
        $index = 0;
        while (!feof($fp)) {
            $line = fgetcsv($fp);
            if (!!$line) {
                $c[] = [
                    'time' => $line[0] + $this->SHIFT_TIME,
                    'price' => +$line[1],
                    'volume' => $this->filterVolume(+$line[2], $index, date('H:i:s', $line[0])),
                ];
                $index++;
            }
        }
        fclose($fp);
        return $c;
    }

    /**
     * Check continue time
     */
    private function filterVolume($volume, $index, $time)
    {
        if ($index <= 1 || $time >= '14:45:00') return 0;
        return $volume;
    }

    /**
     * Vps data
     */
    private function cloneVpsData()
    {
        $client = new \GuzzleHttp\Client();
        $url = "https://bddatafeed.vps.com.vn/getpschartintraday/VN30F1M";
        $res = $client->get($url);
        return json_decode($res->getBody());
    }

    /**
     * Report
     * 
     * @param $payload
     * 
     */
    public function report($payload)
    {
        return $this->transaction(function () {
            ReportTradingJob::dispatch();
            return ['isOk' => true];
        });
    }

    /**
     * Export
     * 
     * @param $payload
     * 
     */
    public function export($payload)
    {
        return $this->transaction(function () {
            ExportTradingJob::dispatch();
            return ['isOk' => true];
        });
    }

    /**
     * Cashflow
     * 
     * @param $payload
     * 
     */
    public function cashflow($payload)
    {
        $r = ['price' => [], 'avg' => [], 'cash' => []];
        $client = new \GuzzleHttp\Client();
        $url = "https://iboard.ssi.com.vn/dchart/api/history?resolution=D&symbol=" . $payload->symbol . "&from=" . strtotime("-3 year") . "&to=" . time();
        $res = $client->get($url);
        $rsp = json_decode($res->getBody());
        if ($rsp->s != 'ok') return $r;
        $acc = 0;
        $prevAvg = ($rsp->h[0] + $rsp->l[0] + $rsp->c[0]) / 3;
        // $prevClose = $rsp->c[0];
        for ($i = 0; $i < count($rsp->t); $i++) {
            $r['price'][] = [
                'time' => $rsp->t[$i],
                'open' => +$rsp->o[$i],
                'high' => +$rsp->h[$i],
                'low' => +$rsp->l[$i],
                'close' => +$rsp->c[$i]
            ];
            $avg = ($rsp->h[$i] + $rsp->l[$i] + $rsp->c[$i]) / 3;
            // $close = +$rsp->c[$i];
            $r['avg'][] = [
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
