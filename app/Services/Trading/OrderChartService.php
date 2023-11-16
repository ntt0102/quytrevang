<?php

namespace App\Services\Trading;

use App\Services\CoreService;
use App\Models\Copyist;
use App\Services\Special\VpsOrderService;
use App\Jobs\OrderVpsJob;

class OrderChartService extends CoreService
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
        $date = date('Y-m-d');
        if ($payload->date == $date && get_global_value('openingMarketFlag') == '1' && time() < strtotime('14:47:00'))
            return $this->generateDataFromVps();
        return $this->generateDataFromCsv($payload->date);
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
        // $info = $vos->getAccountInfo();
        // if (!$info) return ['isOk' => false];
        // $info['isOk'] = true;
        // return $info;
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
        return collect($list)->reduce(function ($c, $item, $index) {
            $time = strtotime(date('Y-m-d ') . $item->time) + $this->SHIFT_TIME;
            $price = $item->lastPrice;
            $volume = $item->lastVol;
            $isFilter = $this->isFilter($index, $item->time);
            return $this->createChartData($c, $time, $price, $volume, $isFilter);
        }, ['price' => [], 'volume' => []]);
    }

    /**
     * generate Data From Csv
     */
    public function generateDataFromCsv($date)
    {
        $c = ['price' => [], 'volume' => []];
        $filename = storage_path('app/vn30f1m/' . $date . '.csv');
        if (!file_exists($filename)) return $c;
        $fp = fopen($filename, 'r');
        $index = 0;
        while (!feof($fp)) {
            $line = fgetcsv($fp);
            if (!!$line) {
                $time = $line[0] + $this->SHIFT_TIME;
                $price = $line[1] + 0;
                $volume = $line[2] + 0;
                $isFilter = $this->isFilter($index, date('H:i:s', $line[0]));
                $c = $this->createChartData($c, $time, $price, $volume, $isFilter);
                $index++;
            }
        }
        fclose($fp);
        return $c;
    }

    /**
     * Check continue time
     */
    private function isFilter($index, $time)
    {
        return $index <= 1 || $time >= '14:45:00';
    }

    /**
     * Create Chart Data
     */
    private function createChartData($c, $time, $price, $volume, $isFilter)
    {
        $prevPrice = count($c['price']) ? end($c['price'])['value'] : $price;
        $change = $price - $prevPrice;
        $color = $change == 0 ? "#CCCCCC" : ($change > 0 ? "#00FF00" : "#FF0000");
        $c['price'][] = [
            'time' => $time,
            'value' => $price
        ];
        $c['volume'][] = [
            'time' => $time,
            'value' => $isFilter ? 0 : $volume,
            'color' => $color,
        ];
        $c['spread'][] = [
            'time' => $time,
            'value' => $isFilter ? 0 : -abs($change),
            'color' => $color,
        ];
        return $c;
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
}
