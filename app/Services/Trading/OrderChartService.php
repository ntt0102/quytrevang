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
        if ($payload->date == $date && get_global_value('openingMarketFlag') == '1' && time() < strtotime('14:45:00'))
            return $this->generateDataFromVps();
        return $this->generateDataFromCsv($payload->date);
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
        ];
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
            'volLimit' => 150,
            'vpsCode' => $copyist->vps_code,
            'vpsSession' => $copyist->vps_session,
        ];
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
        return collect($list)->reduce(function ($c, $item) {
            $time = strtotime(date('Y-m-d ') . $item->time) + $this->SHIFT_TIME;
            $price = $item->lastPrice;
            $volume = $item->lastVol < 700 ? $item->lastVol : 0;
            return $this->createChartData($c, $time, $price, $volume);
        }, ['price' => [], 'volume' => []]);
    }

    /**
     * 
     */
    public function generateDataFromCsv($date)
    {
        $c = ['price' => [], 'volume' => []];
        $filename = storage_path('app/vn30f1m/' . $date . '.csv');
        if (!is_file($filename)) return $c;
        $fp = fopen($filename, 'r');
        while (!feof($fp)) {
            $line = fgetcsv($fp);
            if (!!$line) {
                $time = $line[0] + 0;
                $price = $line[1] + 0;
                $volume = $line[2] + 0 < 700 ? $line[2] + 0 : 0;
                $c = $this->createChartData($c, $time, $price, $volume);
            }
        }
        fclose($fp);
        return $c;
    }
    /**
     * Create Chart Data
     */
    private function createChartData($c, $time, $price, $volume, $dir = null)
    {
        $prevPrice = count($c['price']) ? end($c['price'])['value'] : $price;
        $side = $price - $prevPrice;
        $upSide = !$dir ? $side > 0 : $dir > 0;
        $downSide = !$dir ? $side < 0 : $dir < 0;
        $c['price'][] = [
            'time' => $time,
            'value' => $price
        ];
        $c['volume'][] = [
            'time' => $time,
            'value' => $volume,
            'color' => $upSide
                ? "#00FF00"
                : ($downSide
                    ? "#FF0000"
                    : "#CCCCCC"),
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

    /**
     * Vps data
     */
    public function cloneTcbsData()
    {
        $data = [];
        $symbol = get_global_value('vn30f1m');
        $page = 0;
        $client = new \GuzzleHttp\Client();
        do {
            $url = "https://apipubaws.tcbs.com.vn/futures-insight/v1/intraday/{$symbol}/his/paging?size=100&page={$page}";
            $res = $client->get($url);
            $rsp = json_decode($res->getBody());
            $data = array_merge($data, $rsp->data);
            $page++;
        } while (count($rsp->data) == 100);
        return $data;
    }

    /**
     * Get data from TCBS website
     */
    public function generateDataFromTcbs()
    {
        $list = $this->cloneTcbsData();
        return collect($list)->reduce(function ($c, $item) {
            $time = strtotime(date('Y-m-d ') . $item->t) + $this->SHIFT_TIME;
            $price = $item->p;
            $volume = $item->v < 700 ? $item->v : 0;
            $side = $item->a == 'BU' ? 1 : -1;
            return $this->createChartData($c, $time, $price, $volume, $side);
        }, ['price' => [], 'volume' => []]);
    }

    public function export()
    {
        if (get_global_value('openingMarketFlag') == '1') {
            $date = date('Y-m-d');
            $filename = storage_path('app/vn30f1m/' . $date . '.csv');
            $list = $this->cloneTcbsData();
            $fp = fopen($filename, 'w');
            foreach ($list as $item) {
                $line = [];
                $line[] = strtotime($date . $item->t) + $this->SHIFT_TIME;
                $line[] = $item->p;
                $line[] = $item->v;
                $line[] = $item->a == 'BU' ? 1 : -1;
                fputcsv($fp, $line);
            }
            fclose($fp);
        }
    }
}
