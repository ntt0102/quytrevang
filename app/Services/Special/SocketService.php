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
        if (get_global_value('runningSocketFlag') == '0') {
            set_global_value('runningSocketFlag', '1');
            $uri = 'wss://datafeed.vps.com.vn/socket.io/?EIO=3&transport=websocket';
            \Ratchet\Client\connect($uri)->then(function ($conn) {
                $conn->on('message', function ($msg) use ($conn) {
                    $time = time();
                    $stopTradingTime = strtotime(get_stop_trading_time());
                    if ($time >= $stopTradingTime) {
                        error_log("Timeout market.");
                        $conn->close();
                    } else {
                        $startSocketTime = strtotime(get_global_value('startScheduleTime'));
                        if ($time >= $startSocketTime + 25 * 60 + 30) {
                            error_log("Timeout connection.");
                            $conn->close();
                        }
                    }
                    //
                    $first = substr($msg, 0, 1);
                    if ($first == 4) {
                        $second = substr($msg, 1, 1);
                        if ($second == 0) {
                            $VN30F1M = $this->parameterRepository->getValue('VN30F1M');
                            $data = ['action' => 'join', 'list' => $VN30F1M];
                            $conn->send('42' . json_encode(["regs", json_encode($data)]));
                        } else if ($second == 2) {
                            $json = json_decode(substr($msg, 2));
                            $event = $json[0];
                            if ($event == 'boardps') {
                                $data = $json[1]->data;
                                if ($data->id == 3220) {
                                    // error_log($event . ': ' . $data->id . ': ' . $data->lastPrice);
                                    $param = ['x' => now(), 'y' => $data->lastPrice, 'type' => 0];
                                    $this->vpsRepository->create($param);
                                } else if ($data->id == 3310) {
                                    // error_log($event . ': ' . $data->id . ': ' . $data->BVolume . ',' . $data->SVolume);
                                    $param = ['x' => now(), 'y' => $data->BVolume - $data->SVolume, 'type' => 1];
                                    $this->vpsRepository->create($param);
                                } else if ($data->id == 3211) {
                                    $sum =  collect(explode("SOH", $data->ndata))->reduce(function ($acc, $item) {
                                        return $acc + (int)explode(":", $item)[1];
                                    }, 0);
                                    $socketVol10Temp = json_decode(get_global_value('socketVol10Temp'), true);
                                    if ($data->side == 'B' && $socketVol10Temp['side'] == 'S' && $socketVol10Temp['B'] != 0) {
                                        $param = ['x' => now(), 'y' => $socketVol10Temp['B'] - $socketVol10Temp['S'], 'type' => 2];
                                        $this->vpsRepository->create($param);
                                    }
                                    $socketVol10Temp['side'] = $data->side;
                                    $socketVol10Temp[$data->side] = $sum;
                                    set_global_value('socketVol10Temp', json_encode($socketVol10Temp));
                                };
                            } else if ($event == 'stockps') {
                                $data = $json[1]->data;
                                if ($data->id == 3220) {
                                    // error_log($event . ': ' . $data->id . ': ' . $data->lastPrice);
                                    $param = ['x' => now(), 'y' => $data->lastPrice, 'type' => 0];
                                    $this->vpsRepository->create($param);
                                };
                            }
                        }
                    }
                });
                $conn->on('close', function () {
                    error_log("WebSocket closed.");
                    set_global_value('runningSocketFlag', '0');
                    $time = time();
                    $stopTradingTime = strtotime(get_stop_trading_time());
                    $startSocketTime = strtotime(get_global_value('startScheduleTime'));
                    if ($time < $stopTradingTime && $time < $startSocketTime  + 25 * 60 + 30) $this->connectVps();
                });
                $conn->on('error', function () use ($conn) {
                    error_log("WebSocket error.");
                    $conn->close();
                });
            }, function ($e) {
                error_log("WebSocket could not connect: {$e->getMessage()}\n");
            });
        }
    }

    public function connectHnx()
    {
        // $data = urlencode(json_encode([["name" => "pushhub"]]));
        // $url = "https://banggia.hnx.vn/signalr/negotiate?clientProtocol=1.5&connectionData={$data}";
        // $client = new \GuzzleHttp\Client(['verify' => false]);
        // $res = $client->get($url);
        // $resp = json_decode($res->getBody());
        // $token = urlencode($resp->ConnectionToken);
        // $sseUrl = "https://banggia.hnx.vn/signalr/connect?transport=serverSentEvents&clientProtocol=1.5&connectionToken={$token}&connectionData={$data}";
        // $clientSse = new \GuzzleHttp\Client([
        //     'verify' => false,
        //     'stream' => true, 'debug' => false
        // ]);
        // $response = $clientSse->request('GET', $sseUrl);
        // // error_log(222222222);
        // // error_log($response->getStatusCode());
        // // if ($response->getStatusCode() == 204) {
        // //     error_log('error 204');
        // // }
        // $body = $response->getBody();
        // // error_log(3333333);
        // // error_log('Body: ' . $body);
        // while (!$body->eof()) {
        //     echo $body->read(1024);

        //     break;
        // }
        // // while (true) {
        // //     $buffer .= $body->read(1);
        // //     error_log($buffer);
        // // }
        // // $es = new \EventSource\EventSource($sseUrl);
        // // // $es->setCurlOptions([CURLOPT_SSL_VERIFYPEER => false]);
        // // $messageReceived = 0;
        // // $es->onMessage(function (\EventSource\Event $event) use ($messageReceived, $es) {
        // //     if ($es === 4) {
        // //         $es->abort();
        // //     }
        // //     $messageReceived++;
        // //     $stopTradingTime = strtotime(get_stop_trading_time());
        // //     if (time() >= $stopTradingTime) {
        // //         error_log("Timeout market.");
        // //         $es->abort();
        // //     }
        // //     set_global_value('startScheduleTime', $event->data);
        // //     // echo $event->data, "\n";
        // //     // error_log(json_encode($event));
        // // });

        // // $es->connect();
        /////////////////////////////////////////////////////////
        $uri = 'wss://pricestream-iboard.ssi.com.vn/realtime';
        \Ratchet\Client\connect($uri)->then(function ($conn) {
            $conn->on('message', function ($msg) use ($conn) {
                error_log("WebSocket message.");
            });
            $conn->on('close', function () {
                error_log("WebSocket closed.");
            });
            $conn->on('error', function () use ($conn) {
                error_log("WebSocket error.");
            });
        }, function ($e) {
            error_log("WebSocket could not connect: {$e->getMessage()}\n");
        });
        // error_log($uri);
    }
}
