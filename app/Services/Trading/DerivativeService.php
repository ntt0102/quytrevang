<?php

namespace App\Services\Trading;

use App\Services\CoreService;
use App\Services\Special\VpsOrderService;
use Illuminate\Support\Facades\Artisan;
use App\Models\Parameter;
use App\Models\StockDrawing;
use App\Models\DerivativeOrder;
use App\Jobs\ReportTradingJob;
use App\Jobs\ExportDerDnseJob;
use App\Jobs\ExportDerVpsJob;

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
        $data = ['ticks' => []];
        $file = storage_path('app/phaisinh/' . $payload->date . '.csv');
        if (!file_exists($file)) return $data;
        $fp = fopen($file, 'r');
        while (!feof($fp)) {
            $line = fgetcsv($fp);
            if ($line) {
                $data['ticks'][] = [
                    'id' => +$line[0],
                    'date' => $line[1],
                    'price' => +$line[2],
                ];
            }
        }
        fclose($fp);
        return $data;
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
        $volInvalid = false;
        if ($vos->connection && !$vos->position) {
            $maxVolume = $vos->getAccountInfo()->maxVol;
            $orderVolume = (int) Parameter::getValue('orderVolume');
            $volInvalid = $maxVolume < $orderVolume;
        }
        return [
            'config' => [
                'openingMarket' => get_global_value('openingMarketFlag') === '1',
                'source' => get_global_value('derivativeSource'),
                'vn30f1m' => get_global_value('vn30f1m'),
                'vpsUser' => get_global_value('vpsUser'),
                'vpsSession' => get_global_value('vpsSession'),
                'lastOpeningDate' => get_global_value('lastOpeningDate'),
                'autoRefresh' => get_global_value('autoRefreshFlag') === "1",
                'patternType' => get_global_value('derPatternType'),
                'volInvalid' =>  $volInvalid,
                'tpDefault' => floatval(get_global_value('tpDefault')),
                'slDefault' => floatval(get_global_value('slDefault')),
                'orders' => $this->getActiveOrders()
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
            'pendingOrders' => $vos->getPendingOrders(),
        ];
    }

    /**
     * Get active orders
     *
     * @param $payload
     * 
     */
    public function getActiveOrders()
    {
        $activeOrders = DerivativeOrder::active()->get();
        return $activeOrders->mapWithKeys(function ($order) {
            return [$order->id => $order];
        });
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
        return set_global_value('autoRefreshFlag', $status);
    }

    /**
     * Set Pattern Type
     *
     * @param $payload
     * 
     */
    public function setPatternType($payload)
    {
        return set_global_value('derPatternType', $payload->patternType);
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
        $symbol = 'VN30F1M';
        $tools = StockDrawing::where('symbol', $symbol)->orderByRaw("name ASC, point ASC")->get(['name', 'point', 'data']);
        foreach ($tools as $tool) {
            if (!isset($result[$tool->name])) $result[$tool->name] = [];
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
        $symbol = $payload->symbol;
        if ($payload->isRemove) {
            $dt = StockDrawing::where('symbol', $symbol)->where('name', $payload->name);
            if (isset($payload, $payload->point)) {
                $dt = $dt->where('point', $payload->point);
            }
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
                'pendingOrders' => $vos->getPendingOrders(),
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
     * Get Matched Orders
     *
     * @param $payload
     * 
     */
    public function getMatchedOrders($payload)
    {
        $vos = new VpsOrderService();
        return $vos->getMatchedOrders();
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
                if (!$vos->connection) {
                    return ['isOk' => false, 'message' => 'notConnect'];
                }
                //
                switch ($payload->action) {
                    case 'entry':
                        $isNew = $payload->data->cmd === "new";
                        if ($isNew && $vos->position !== 0) {
                            return ['isOk' => false, 'message' => 'openedPosition'];
                        }
                        if ($payload->data->type === 'SLO') {
                            $entryOrder = $vos->conditionOrder($payload->data, true);
                        } else {
                            $entryOrder = $vos->order($payload->data, true);
                        }
                        if (!$entryOrder->isOk) return $entryOrder;
                        $key = ['entry_no' => $entryOrder->orderNo];
                        $data = [
                            'entry_price' => $payload->data->price,
                        ];
                        if ($isNew) {
                            $data['status'] = 0;
                            $data['type'] = $payload->data->type;
                            $data['side'] = $payload->data->side;
                            $data['tp_price'] = $payload->data->tpPrice;
                            $data['sl_price'] = $payload->data->slPrice;
                        }
                        $order = DerivativeOrder::updateOrCreate($key, $data);
                        if (!$order) {
                            return ['isOk' => false, 'message' => 'failSave'];
                        }
                        return ['isOk' => true, 'order' => $order];
                        break;
                    case 'tpsl':
                        if ($vos->position === 0) {
                            return ['isOk' => false, 'message' => 'unopenedPosition'];
                        }
                        $order = DerivativeOrder::find($payload->orderId);
                        if (!$order) {
                            return ['isOk' => false, 'message' => 'failSave'];
                        }
                        if ($order->tp_price) {
                            $tpPrice = $order->tp_price;
                        } else {
                            $tpDefault = floatval(get_global_value('tpDefault'));
                            $tpPrice = $order->entry_price + $order->side * $tpDefault;
                        }
                        if ($order->sl_price) {
                            $slPrice = $order->sl_price;
                        } else {
                            $slDefault = floatval(get_global_value('slDefault'));
                            $slPrice = $order->entry_price - $order->side * $slDefault;
                        }
                        $tpOrder = $vos->order((object)['cmd' => 'new', 'price' => $tpPrice]);
                        if (!$tpOrder->isOk) return $tpOrder;
                        $slOrder = $vos->conditionOrder((object)['cmd' => 'new', 'price' => $slPrice]);
                        if (!$slOrder->isOk) return $slOrder;
                        $data = [
                            'status'    => 1,
                            'tp_no'     => $tpOrder->orderNo,
                            'sl_no'     => $slOrder->orderNo,
                        ];
                        $order->fill($data);
                        if (!$order->save()) {
                            return ['isOk' => false, 'message' => 'failSave'];
                        }
                        //
                        $this->deleteOtherOrders($vos, $payload->orderId);
                        return ['isOk' => true, 'order' => $order];
                        break;
                    case 'tp':
                        $tpOrder = $vos->order($payload->data);
                        if (!$tpOrder->isOk) return $tpOrder;
                        $order = DerivativeOrder::find($payload->orderId);
                        if (!$order) {
                            return ['isOk' => false, 'message' => 'failSave'];
                        }
                        $data = ['tp_price' => $payload->data->price];
                        $order->fill($data);
                        if (!$order->save()) {
                            return ['isOk' => false, 'message' => 'failSave'];
                        }
                        return ['isOk' => true, 'order' => $order];
                        break;
                    case 'sl':
                        $slOrder = $vos->conditionOrder($payload->data);
                        if (!$slOrder->isOk) return $slOrder;
                        $order = DerivativeOrder::find($payload->orderId);
                        if (!$order) {
                            return ['isOk' => false, 'message' => 'failSave'];
                        }
                        $data = ['sl_price' => $payload->data->price];
                        $order->fill($data);
                        if (!$order->save()) {
                            return ['isOk' => false, 'message' => 'failSave'];
                        }
                        return ['isOk' => true, 'order' => $order];
                        break;
                    case 'cancel':
                        if (isset($payload->exit) && $payload->exit !== '') {
                            if ($vos->position !== 0) {
                                $exitOrder = $vos->order((object)['cmd' => 'new', 'price' => $payload->exit]);
                                if (!$exitOrder->isOk) return $exitOrder;
                            }
                        }
                        if (isset($payload->orderId)) {
                            $order = DerivativeOrder::find($payload->orderId);
                            if ($order->status === 0) {
                                if ($order->type === 'SLO') {
                                    $vos->conditionOrder((object)['cmd' => 'delete', 'orderNo' => $order->entry_no], true);
                                } else {
                                    $vos->order((object)['cmd' => 'cancel', 'orderNo' => $order->entry_no], true);
                                }
                            } else {
                                $hasKind = isset($payload->kind);
                                $kinds = $hasKind ? [$payload->kind] : ['tp', 'sl'];
                                if ($hasKind && $vos->position !== 0) {
                                    return ['isOk' => false, 'message' => 'unclosedPosition'];
                                }
                                if (in_array('tp', $kinds)) {
                                    $vos->order((object)['cmd' => 'cancel', 'orderNo' => $order->tp_no]);
                                }
                                if (in_array('sl', $kinds)) {
                                    $vos->conditionOrder((object)['cmd' => 'delete', 'orderNo' => $order->sl_no]);
                                }
                            }
                            $order->fill(['status' => 2]);
                            if (!$order->save()) {
                                return ['isOk' => false, 'message' => 'failSave'];
                            }
                        } else {
                            $vos->cancelAllConditionOrders();
                            $vos->cancelAllOrders();
                        }
                        return ['isOk' => true];
                        break;
                }
            }
        );
    }

    private function deleteOtherOrders($vos, $orderId)
    {
        DerivativeOrder::where('id', '!=', $orderId)->where('status', 0)->get()
            ->each(function ($order) use ($vos) {
                $vos->conditionOrder((object)['cmd' => 'delete', 'orderNo' => $order->entry_no], true);
                $order->status = 2;
                $order->save();
            });
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
     * Vps data
     */
    public function getVn30f1mSymbol()
    {
        $client = new \GuzzleHttp\Client();
        $url = "https://spwapidatafeed.vps.com.vn/pslistdatamap";
        $res = $client->get($url);
        $rsp = json_decode($res->getBody());
        return $rsp->VN30F1M ?? null;
        // $client = new \GuzzleHttp\Client();
        // $url = "https://api.dnse.com.vn/chart-api/symbols?type=derivativeMapping";
        // $res = $client->get($url);
        // $rsp = json_decode($res->getBody());
        // $result = array_filter($rsp->mapping, function ($item) {
        //     return $item->symbolType === 'VN30F1M';
        // });
        // $symbols = array_column($result, 'symbol');
        // return $symbols[0] ?? null;
    }

    /**
     * Vps data
     */
    public function cloneVpsData()
    {
        try {
            $client = new \GuzzleHttp\Client();
            $url = "https://spwapidatafeed.vps.com.vn/getpschartintraday/VN30F1M";
            // $url = "https://sboard.shs.com.vn/api/v1/market/VN30F2412/quote?fetchCount=6000";
            // $url = "https://livedragon.vdsc.com.vn/market/fosTodayInfo.rv?stockCode=VN30F2412";
            // $url = "https://datafeedapi.aisec.com.vn/getpschartintraday/VN30F1M";
            $res = $client->get($url);
            return (array)json_decode($res->getBody());
        } catch (\Throwable $th) {
            return [];
        }
    }

    /**
     * Get DNSE data
     *
     * @param $payload
     * 
     */
    public function getDnseData()
    {
        return $this->cloneDnseData();
    }

    /**
     * Vps data
     */
    public function cloneDnseData($date = null)
    {
        if (!$date) $date = date("Y-m-d");
        $vn30f1m = get_global_value('vn30f1m');
        try {
            $client = new \GuzzleHttp\Client();
            $data = [
                "json" => [
                    "operationName" => "GetKrxTicksBySymbols",
                    "query" => "query GetKrxTicksBySymbols {
                        GetKrxTicksBySymbols(symbols: \"{$vn30f1m}\", date: \"{$date}\", limit: 100000, board: 2) {
                            ticks {
                                totalVolumeTraded
                                sendingTime
                                matchPrice
                                matchQtty
                            }
                        }
                    }",
                    "variables" => (object)[],
                ],
            ];
            $req = $client->post('https://api.dnse.com.vn/price-api/query', $data);
            $data = json_decode($req->getBody())->data->GetKrxTicksBySymbols->ticks;
            usort($data, function ($a, $b) {
                return $b->totalVolumeTraded < $a->totalVolumeTraded;
            });
            return (array)$data;
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
        if ($payload->type === 'download') {
            $filename = $payload->date . '.csv';
            $file = storage_path('app/phaisinh/' . $filename);
            if (file_exists($file)) {
                $ret['download'] = true;
                $ret['file'] = $file;
                $ret['filename'] = $filename;
                $ret['headers'] = ['Content-Type' => 'text/csv'];
            }
        } else {
            switch ($payload->source) {
                case 'FIREANT':
                    Artisan::call('clone:data --type=export');
                    $ret['isOk'] = true;
                    break;

                case 'DNSE':
                    ExportDerDnseJob::dispatch($payload->date);
                    $ret['isOk'] = true;
                    break;

                case 'VPS':
                    ExportDerVpsJob::dispatch();
                    $ret['isOk'] = true;
                    break;
            }
        }

        return $ret;
    }

    /**
     * setting
     * 
     * @param $payload
     * 
     */
    public function setting($payload)
    {
        if (
            set_global_value('tpDefault', $payload->tpDefault) &&
            set_global_value('slDefault', $payload->slDefault)
        )
            return ['isOk' => true];
        else return ['isOk' => false];
    }

    /**
     * Clean Old Orders
     * 
     * @param $payload
     * 
     */
    public function cleanOldOrders($payload)
    {
        if (DerivativeOrder::active()->exists()) {
            return ['isOk' => false];
        }
        DerivativeOrder::truncate();
        return ['isOk' => true];
    }
}
