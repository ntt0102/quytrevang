<?php

namespace App\Services\Special;

use App\Services\CoreService;
use App\Repositories\ParameterRepository;
use App\Repositories\VpsRepository;

class SocketService extends CoreService
{
    private $parameterRepository;
    private $vpsRepository;

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
            $conn->on('message', function ($msg) use ($conn) {
                // activity()->log("WebSocket message.");
                set_global_value('socketMessage', date('H:i:s'));
                if (!$this->inTradingTimeRange()) {
                    activity()->log("Timeout market.");
                    set_global_value('socketTimeout', date('H:i:s'));
                    $conn->close();
                } else {
                    try {
                        $first = substr($msg, 0, 1);
                        if ($first == 4) {
                            $second = substr($msg, 1, 1);
                            if ($second == 0) {
                                activity()->log("Socket opened.");
                                $VN30F1M = $this->parameterRepository->getValue('VN30F1M');
                                $data = ['action' => 'join', 'list' => $VN30F1M];
                                $conn->send('42' . json_encode(["regs", json_encode($data)]));
                            } else if ($second == 2) {
                                $json = json_decode(substr($msg, 2));
                                if ($json[0] == 'boardps') {
                                    // $this->priceHandler($json[1]->data);
                                    $this->bidAskHandler($json[1]->data);
                                } else if ($json[0] == 'stockps') $this->priceHandler($json[1]->data);
                            }
                        }
                    } catch (\Throwable $th) {
                        set_global_value('socketError', 'Socket data: ' . date('H:i:s'));
                    }
                    //
                    if (!$this->inSocketTimeLimit()) {
                        activity()->log("Timeout schedule");
                        set_global_value('socketLimit', date('H:i:s'));
                        $conn->close();
                    }
                }
            });
            $conn->on('close', function () {
                activity()->log("WebSocket closed.");
                set_global_value('socketClose', date('H:i:s'));
                if ($this->inTradingTimeRange() && $this->inSocketTimeLimit())
                    $this->connectVps();
            });
            $conn->on('error', function () use ($conn) {
                activity()->log("WebSocket error.");
                set_global_value('socketError', 'Socket error: ' . date('H:i:s'));
                $conn->close();
            });
        }, function ($e) {
            activity()->log("WebSocket could not connect: {$e->getMessage()}\n");
            set_global_value('socketError', 'Socket connect: ' . date('H:i:s'));
        });
    }

    private function priceHandler($data)
    {
        if ($data->id == 3220) {
            $bid = get_global_value('bidPrice');
            $ask = get_global_value('askPrice');
            if (!!$bid && !!$ask && $data->lastVol != $data->totalVol) {
                $param = [
                    'time' => now()->format('Y-m-d ') . $data->time,
                    'price' => $data->lastPrice,
                    'vol' => $data->lastVol,
                    'bid' => $bid,
                    'ask' => $ask,
                ];
                activity()->withProperties($param)->log('price');
                $this->vpsRepository->create($param);
            }
        }
    }

    private function bidAskHandler($data)
    {
        if ($data->id == 3210) {
            [$price] = explode("|", $data->g1);
            activity()->withProperties($price)->log('bidask');
            if ($data->side == "B") set_global_value('bidPrice', $price);
            else set_global_value('askPrice', $price);
        }
    }

    public function inTradingTimeRange()
    {
        $time = time();
        return ($time >= strtotime(trading_time('startTradingTime'))
            && $time <= strtotime(trading_time('startBreakTime'))
        ) || ($time >= strtotime(trading_time('endBreakTime'))
            && $time <= strtotime(trading_time('endTradingTime')));
    }

    public function inSocketTimeLimit()
    {
        $startSocketTime = strtotime(get_global_value('startSocketTime'));
        return time() <= $startSocketTime  + 20 * 60 + 50;
    }
}
