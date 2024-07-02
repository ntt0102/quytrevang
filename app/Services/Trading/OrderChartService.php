<?php

namespace App\Services\Trading;

use App\Services\CoreService;
use App\Models\Copyist;
use App\Services\Special\VpsOrderService;
use App\Jobs\OrderVpsJob;
use App\Jobs\ReportTradingJob;
use App\Jobs\ExportTradingJob;
use App\Models\DrawTool;

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
        if ($payload->date == $date && get_global_value('openingMarketFlag') == '1' && time() < strtotime('15:00:00'))
            return $this->generateDataFromApi();
        return $this->generateDataFromCsv($payload->date);
    }

    /**
     * Init Chart
     *
     * @param $payload
     * 
     */
    public function initChart($payload)
    {
        return [
            'config' => [
                'openingMarket' => get_global_value('openingMarketFlag') == '1',
                'vn30f1m' => get_global_value('vn30f1m'),
                'vpsUser' => get_global_value('vpsUser'),
                'vpsSession' => get_global_value('vpsSession'),
            ],
            'tools' => $this->getTools()
        ];
    }

    /**
     * Get chart tool
     *
     * @param $payload
     * 
     */
    public function getTools()
    {
        $result = array();
        $ss = DrawTool::where('symbol', 'VN30F1M')->orderByRaw("name ASC, point ASC")->get(['name', 'point', 'data']);
        foreach ($ss as $d) {
            if (!isset($result[$d->name])) $result[$d->name] = array();
            $result[$d->name][$d->point] = $d->data;
        }
        return $result;
    }

    /**
     * Get Status
     *
     * @param $payload
     * 
     */
    public function getStatus($payload)
    {
        $vos = new VpsOrderService();
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
        $vos = new VpsOrderService();
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
                $vos = new VpsOrderService();
                $ret = $vos->execute($payload);
                return $ret;
            }
        );
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
                $vos = new VpsOrderService();
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
    public function setVpsSession($payload)
    {
        return set_global_value('vpsUser', $payload->user) &&
            set_global_value('vpsSession', $payload->session);
    }

    /**
     * Get data from VPS website
     */
    public function generateDataFromApi()
    {
        $data = ['price' => [], 'vn30' => [], 'foreign' => [], 'active' => [], 'fgnf1m' => []];
        $vn30f1mData = $this->cloneVn30f1mData();
        $volume = 0;
        // foreach ($vn30f1mData as $item) {
        //     $time = strtotime(date('Y-m-d') . 'T' . $item->time . 'Z');
        //     $data['price'][] = [
        //         'time' => $time,
        //         'value' => $item->lastPrice,
        //     ];
        //     $volume += ($item->side == 'B' ? 1 : ($item->side == 'S' ? -1 : 0)) * $item->lastVol;
        //     $data['fgnf1m'][] = [
        //         'time' => $time,
        //         'value' => $volume,
        //     ];
        // }
        foreach ($vn30f1mData as $item) {
            $time = strtotime($item->Date) + $this->SHIFT_TIME;
            $data['price'][] = [
                'time' => $time,
                'value' => $item->Price,
            ];
            $volume += ($item->Side == 'B' ? 1 : ($item->Side == 'S' ? -1 : 0)) * $item->Volume;
            $data['fgnf1m'][] = [
                'time' => $time,
                'value' => $volume,
            ];
        }
        $vn30Data = $this->cloneVn30Data();
        foreach ($vn30Data as $item) {
            $time = strtotime($item->Date) + $this->SHIFT_TIME;
            $data['vn30'][] = [
                'time' => $time,
                'value' => $item->IndexCurrent,
            ];
            $data['foreign'][] = [
                'time' => $time,
                'value' => $item->BuyForeignQuantity - $item->SellForeignQuantity,
            ];
            $data['active'][] = [
                'time' => $time,
                'value' => $item->TotalActiveBuyVolume - $item->TotalActiveSellVolume,
            ];
        }
        $fgnf1mData = $this->cloneFgnf1mData();
        foreach ($fgnf1mData as $item) {
            array_unshift($data['fgnf1m'], [
                'time' => strtotime($item->dateTime . 'Z'),
                'value' => $item->value,
            ]);
        }
        return $data;
    }

    /**
     * generate Data From Csv
     */
    public function generateDataFromCsv($date)
    {
        $data = ['price' => [], 'vn30' => [], 'foreign' => [], 'active' => [], 'fgnf1m' => []];
        $path = storage_path('app/phaisinh/' . $date);
        if (!is_dir($path)) return $data;
        $vn30f1mFile = $path . '/vn30f1m.csv';
        $fp = fopen($vn30f1mFile, 'r');
        $volume = 0;
        while (!feof($fp)) {
            $line = fgetcsv($fp);
            if (!!$line) {
                $data['price'][] = [
                    'time' => +$line[0],
                    'value' => +$line[1],
                ];
                $volume += +$line[3] * +$line[2];
                $data['fgnf1m'][] = [
                    'time' => +$line[0],
                    'value' => $volume,
                ];
            }
        }
        fclose($fp);
        //
        $vn30File = $path . '/vn30.csv';
        $fp = fopen($vn30File, 'r');
        while (!feof($fp)) {
            $line = fgetcsv($fp);
            if (!!$line) {
                $time = +$line[0];
                $data['vn30'][] = [
                    'time' => $time,
                    'value' => +$line[1],
                ];
                $data['foreign'][] = [
                    'time' => $time,
                    'value' => +$line[2],
                ];
                $data['active'][] = [
                    'time' => $time,
                    'value' => +$line[3],
                ];
            }
        }
        fclose($fp);
        //
        // $fgnf1mFile = $path . '/fgnf1m.csv';
        // $fp = fopen($fgnf1mFile, 'r');
        // while (!feof($fp)) {
        //     $line = fgetcsv($fp);
        //     if (!!$line) {
        //         array_unshift($data['fgnf1m'], [
        //             'time' => +$line[0],
        //             'value' => +$line[1],
        //         ]);
        //     }
        // }
        // fclose($fp);
        return $data;
    }

    /**
     * Vps data
     */
    public function cloneVn30f1mData()
    {
        try {
            $client = new \GuzzleHttp\Client();
            // $url = "https://bddatafeed.vps.com.vn/getpschartintraday/VN30F1M";
            $url = "https://svr5.fireant.vn/api/Data/Markets/IntradayQuotes?symbol=VN30F1M";
            $res = $client->get($url);
            return json_decode($res->getBody());
        } catch (\Throwable $th) {
            return [];
        }
    }

    /**
     * Vps data
     */
    public function cloneVn30Data()
    {
        try {
            $client = new \GuzzleHttp\Client();
            $url = "https://svr5.fireant.vn/api/Data/Markets/IntradayMarketStatistic?symbol=VN30";
            $res = $client->get($url);
            return json_decode($res->getBody());
        } catch (\Throwable $th) {
            return [];
        }
    }

    /**
     * Vps data
     */
    public function cloneFgnf1mData()
    {
        return [];
        try {
            $client = new \GuzzleHttp\Client();
            $url = "https://fwtapi2.fialda.com/api/services/app/Home/GetForeignerTradingChart?indexCode=VN30F1M&chartPedirod=oneDay";
            $res = $client->get($url);
            return json_decode($res->getBody())->result->tradingVolumeChart;
        } catch (\Throwable $th) {
            return [];
        }
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
     * Draw Tools
     *
     * @param $payload
     * 
     */
    public function drawTools($payload)
    {
        $symbol = 'VN30F1M';
        if ($payload->isRemove) {
            $dt = DrawTool::where('symbol', $symbol)->where('name', $payload->name);
            if (isset($payload, $payload->point))
                $dt = $dt->where('point', $payload->point);
            $dt->delete();
        } else {
            for ($i = 0; $i < count($payload->points); $i++) {
                $key = ['symbol' => $symbol, 'name' => $payload->name, 'point' => $payload->points[$i]];
                $data = ['data' => $payload->data[$i]];
                DrawTool::updateOrCreate($key, $data);
            }
        }
        return (object)[];
    }
}
