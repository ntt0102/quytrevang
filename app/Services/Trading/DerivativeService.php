<?php

namespace App\Services\Trading;

use App\Services\CoreService;
use App\Services\Special\VpsOrderService;
use Illuminate\Support\Facades\Artisan;
use App\Models\StockDrawing;
use App\Jobs\ReportTradingJob;
use App\Jobs\ExportDerVpsJob;
use App\Jobs\LoginDnseJob;

class DerivativeService extends CoreService
{

    /**
     * Get chart data
     *
     * @param $payload
     * 
     */
    public function getChartData($payload)
    {
        $data = ['price' => []];
        $file = storage_path('app/phaisinh/' . $payload->date . '.csv');
        if (!file_exists($file)) return $data;
        $fp = fopen($file, 'r');
        while (!feof($fp)) {
            $line = fgetcsv($fp);
            if (!!$line) {
                $data['price'][] = [
                    'time' => +$line[0],
                    'value' => +$line[1],
                ];
            }
        }
        fclose($fp);
        return $data;
    }

    /**
     * Get VPS data
     *
     * @param $payload
     * 
     */
    public function getVpsData()
    {
        return $this->cloneVpsData();
    }

    /**
     * Init Chart
     *
     * @param $payload
     * 
     */
    public function initChart($payload)
    {
        $vos = new VpsOrderService();
        return [
            'config' => [
                'openingMarket' => get_global_value('openingMarketFlag') == '1',
                'source' => get_global_value('derivativeSource'),
                'vn30f1m' => get_global_value('vn30f1m'),
                'vpsUser' => get_global_value('vpsUser'),
                'vpsSession' => get_global_value('vpsSession'),
                'lastOpeningDate' => get_global_value('lastOpeningDate'),
                'autoRefresh' => get_global_value('autoRefreshFlag') == "1",
                'volInvalid' => $vos->connection && $vos->getAccountInfo()->maxVol == 0
            ],
            'status' => $this->getStatus($payload)
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
        $vos = new VpsOrderService();
        return [
            'connection' => $vos->connection,
            'position' => $vos->position,
            'pending' => $vos->hasOrder() || $vos->hasConditionOrder()
        ];
    }

    /**
     * Set Auto Scan
     *
     * @param $payload
     * 
     */
    public function setAutoRefresh($payload)
    {
        $status = $payload->autoRefresh ? '1' : '0';
        set_global_value('autoRefreshFlag', $status);
    }

    /**
     * Set Source
     *
     * @param $payload
     * 
     */
    public function setSource($payload)
    {
        set_global_value('derivativeSource', $payload->source);
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
        $tools = StockDrawing::where('symbol', 'VN30F1M')->orderByRaw("name ASC, point ASC")->get(['name', 'point', 'data']);
        foreach ($tools as $tool) {
            if (!isset($result[$tool->name])) $result[$tool->name] = array();
            $result[$tool->name][$tool->point] = $tool->data;
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
        $symbol = 'VN30F1M';
        if ($payload->isRemove) {
            $dt = StockDrawing::where('symbol', $symbol)->where('name', $payload->name);
            if (isset($payload, $payload->point))
                $dt = $dt->where('point', $payload->point);
            $dt->delete();
        } else {
            for ($i = 0; $i < count($payload->points); $i++) {
                $key = ['symbol' => $symbol, 'name' => $payload->name, 'point' => $payload->points[$i]];
                $data = ['data' => $payload->data[$i]];
                StockDrawing::updateOrCreate($key, $data);
            }
        }
        return (object)[];
    }

    /**
     * Login VPS
     *
     * @param $payload
     * 
     */
    public function loginVps($payload)
    {
        $vos = new VpsOrderService($payload->otpCode);
        return [
            'isOk' => $vos->connection,
            'status' => [
                'connection' => $vos->connection,
                'position' => $vos->position,
                'pending' => $vos->hasOrder() || $vos->hasConditionOrder()
            ]
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
     * Vps data
     */
    public function cloneVpsData()
    {
        try {
            $client = new \GuzzleHttp\Client();
            // $url = "https://bddatafeed.vps.com.vn/getpschartintraday/VN30F1M";
            $url = "https://datafeedapi.aisec.com.vn/getpschartintraday/VN30F1M";
            $res = $client->get($url);
            return (array)json_decode($res->getBody());
        } catch (\Throwable $th) {
            return [];
        }
    }

    /**
     * Vps data
     */
    public function cloneDnseData()
    {
        try {
            $client = new \GuzzleHttp\Client();
            $data = [
                'json' => [
                    'operationName' => 'GetTicksBySymbol',
                    'query' => 'query GetTicksBySymbol {
                        GetTicksBySymbol(symbol: "VN30F2412", date: "2024-12-06", limit: 6000) {
                            data {
                                symbol
                                matchPrice
                                matchQtty
                                time
                                side
                            }
                        }
                    }',
                    'variables' => (object)[]
                ],
            ];

            $req = $client->post('https://services.entrade.com.vn/price-api/query', $data);
            $data = json_decode($req->getBody())->data->GetTicksBySymbol->data;
            usort($data, function ($a, $b) {
                return $b->time < $a->time;
            });
            return $data;
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
        ReportTradingJob::dispatch();
        return ['isOk' => true];
    }

    /**
     * Export
     * 
     * @param $payload
     * 
     */
    public function export($payload)
    {
        $ret['download'] = false;
        if ($payload->type == 'download') {
            $filename = $payload->date . '.csv';
            $file = storage_path('app/phaisinh/' . $filename);
            if (file_exists($file)) {
                $ret['download'] = true;
                $ret['file'] = $file;
                $ret['filename'] = $filename;
                $ret['headers'] = ['Content-Type' => 'text/csv'];
            }
        } else if ($payload->source == 'FireAnt') {
            Artisan::call('clone:data --type=export');
            $ret['isOk'] = true;
        } else {
            ExportDerVpsJob::dispatch();
            $ret['isOk'] = true;
        }

        return $ret;
    }

    /**
     * loginDnse
     * 
     * @param $payload
     * 
     */
    public function loginDnse($payload)
    {
        LoginDnseJob::dispatch();
        return ['isOk' => true];
    }
}
