<?php

namespace App\Services\Special;

use App\Services\CoreService;
use App\Repositories\ParameterRepository;
use App\Repositories\VpsRepository;

class SocketService extends CoreService
{
    private $parameterRepository;
    private $vpsRepository;
    private $connection;

    public function __construct(
        ParameterRepository $parameterRepository,
        VpsRepository $vpsRepository
    ) {
        $this->parameterRepository = $parameterRepository;
        $this->vpsRepository = $vpsRepository;
    }

    public function connectVps()
    {
        $uri = 'wss://datafeed.vps.com.vn/socket.io/?EIO=3&transport=websocket';
        \Ratchet\Client\connect($uri)->then(function ($conn) {
            $this->connection = $conn;
            $conn->on('message', function ($msg) use ($conn) {
                error_log("WebSocket message.");
                // activity()->log("WebSocket message.");
                if (!$this->inTradingTimeRange()) {
                    error_log("Timeout market.");
                    activity()->log("Timeout market.");
                    $conn->close();
                } else {
                    $first = substr($msg, 0, 1);
                    if ($first == 4) {
                        $second = substr($msg, 1, 1);
                        if ($second == 0) {
                            error_log("Socket opened.");
                            activity()->log("Socket opened.");
                            $VN30F1M = $this->parameterRepository->getValue('VN30F1M');
                            $data = ['action' => 'join', 'list' => $VN30F1M];
                            $conn->send('42' . json_encode(["regs", json_encode($data)]));
                        } else if ($second == 2) {
                            $json = json_decode(substr($msg, 2));
                            if ($json[0] == 'boardps') {
                                $this->priceHandler($json[1]->data);
                                $this->volumeHandler($json[1]->data);
                                $this->valueHandler($json[1]->data);
                            } else if ($json[0] == 'stockps') $this->priceHandler($json[1]->data);
                        }
                    }
                    //
                    if (!$this->inSocketTimeLimit()) {
                        error_log("Timeout schedule");
                        activity()->log("Timeout schedule");
                        $conn->close();
                    }
                }
            });
            $conn->on('close', function () {
                error_log("WebSocket closed.");
                activity()->log("WebSocket closed.");
                if ($this->inTradingTimeRange() && $this->inSocketTimeLimit())
                    $this->connectVps();
                else set_global_value('runningSocketFlag', '0');
            });
            $conn->on('error', function () use ($conn) {
                error_log("WebSocket error.");
                activity()->log("WebSocket error.");
                $conn->close();
            });
        }, function ($e) {
            error_log("WebSocket could not connect: {$e->getMessage()}\n");
            activity()->log("WebSocket could not connect: {$e->getMessage()}\n");
            set_global_value('runningSocketFlag', '0');
        });
    }

    private function priceHandler($data)
    {
        if ($data->id == 3220) {
            $date = now()->format('Y-m-d ');
            $param = ['time' => $date . $data->timeServer, 'value' => $data->lastPrice, 'type' => 0];
            error_log("price");
            // activity()->withProperties($param)->log('price');
            $this->vpsRepository->create($param);
            $prevTime = now()->sub(date_interval_create_from_date_string(($this->inPeriodicTimeRange() ? '15' : '2') . ' minutes'));
            $this->vpsRepository->deleteMultiple([['type', 0], ['time', '<=', $prevTime->format('Y-m-d H:i:s')]]);
            //
            if (!$this->inPeriodicTimeRange()) {
                $activeValue = 0;
                $buyPrice = get_global_value('buyPrice');
                $sellPrice = get_global_value('sellPrice');
                //
                if (abs($data->lastPrice - $buyPrice) < 1) {
                    if ($data->lastPrice <= $buyPrice)
                        $activeValue = -$data->lastVol * $data->lastPrice;
                    else if ($data->lastPrice >= $sellPrice)
                        $activeValue = $data->lastVol * $data->lastPrice;
                    //
                    $param = ['time' => $date . $data->timeServer, 'value' => $activeValue, 'type' => 2];
                    error_log("value");
                    // activity()->withProperties($param)->log('value');
                    $this->vpsRepository->create($param);
                    $prevTime = now()->sub(date_interval_create_from_date_string('2 minutes'));
                    $this->vpsRepository->deleteMultiple([['type', 2], ['time', '<=', $prevTime->format('Y-m-d H:i:s')]]);
                }
            }
        }
    }

    private function volumeHandler($data)
    {
        if ($data->id == 3310) {
            $date = now()->format('Y-m-d ');
            $param = ['time' => $date . $data->timeServer, 'value' => $data->BVolume - $data->SVolume, 'type' => 1];
            error_log("volume");
            // activity()->withProperties($param)->log('volume');
            $this->vpsRepository->create($param);
            $prevTime = now()->sub(date_interval_create_from_date_string(($this->inPeriodicTimeRange() ? '15' : '2') . ' minutes'));
            $this->vpsRepository->deleteMultiple([['type', 1], ['time', '<=', $prevTime->format('Y-m-d H:i:s')]]);
        }
    }

    private function valueHandler($data)
    {
        if ($data->id == 3210) {
            if (!$this->inPeriodicTimeRange()) {
                [$price] = explode("|", $data->g1);
                error_log("value: " . $price);
                // activity()->withProperties($price)->log('value');
                if ($data->side == "B") set_global_value('buyPrice', $price);
                else set_global_value('sellPrice', $price);
            }
        }
    }

    private function inPeriodicTimeRange()
    {
        $time = time();
        return ($time >= strtotime(trading_time('startAtoTime'))
            && $time <= strtotime(trading_time('endAtoTime'))
        ) || ($time >= strtotime(trading_time('startAtcTime'))
            && $time <= strtotime(trading_time('endAtcTime')));
    }

    private function inTradingTimeRange()
    {
        $time = time();
        return ($time >= strtotime(trading_time('startAtoTime'))
            && $time <= strtotime(trading_time('startBreakTime'))
        ) || ($time >= strtotime(trading_time('endBreakTime'))
            && $time <= strtotime(trading_time('endAtcTime')));
    }

    private function inSocketTimeLimit()
    {
        $startSocketTime = strtotime(get_global_value('startSocketTime'));
        return time() <= $startSocketTime  + 5 * 60 + 30;
    }
}
