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
        $data = [];
        if ($payload->date < $date)
            $data = $this->generateDataFromCsv($payload->date);
        else if ($payload->date == $date) {
            if (get_global_value('openingMarketFlag') == '1')
                $data = $this->generateDataFromVps();
        }
        return $data;
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
        return [
            'symbol' => get_global_value('vn30f1m'),
        ];
    }

    /**
     * Set config
     *
     * @param $payload
     * 
     */
    public function setConfig($payload)
    {
        return $this->transaction(
            function () use ($payload) {
                // $so = request()->user()->smartOrder;
            }
        );
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
        return collect($list)->map(function ($item) {
            return [
                'time' => strtotime(date('Y-m-d ') . $item->time) + $this->SHIFT_TIME,
                'value' => $item->lastPrice
            ];
        });
    }

    /**
     * 
     */
    public function generateDataFromCsv($date)
    {
        $filename = storage_path('app/vn30f1m/' . $date . '.csv');
        if (!is_file($filename)) return [];
        $fp = fopen($filename, 'r');
        $keys = ['time', 'value'];
        while (!feof($fp)) {
            $line = fgetcsv($fp);
            if (!!$line) {
                $lines[] = collect($line)->reduce(function ($carry, $item, $index) use ($keys) {
                    $carry[$keys[$index]] = $item + 0;
                    return $carry;
                }, []);
            }
        }
        fclose($fp);
        return $lines;
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
