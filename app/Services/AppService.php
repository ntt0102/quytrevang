<?php

namespace App\Services;

use App\Services\CoreService;
use Illuminate\Support\Facades\Notification;
use App\Notifications\UpdatedTradesNotification;
use App\Notifications\SentCommentNotification;
use App\Repositories\ParameterRepository;
use App\Repositories\FaqRepository;
use App\Repositories\CommentRepository;
use App\Repositories\UserRepository;
use App\Repositories\ContractRepository;
use App\Repositories\TradeRepository;
use App\Repositories\VpsRepository;
use Illuminate\Support\Facades\Storage;
use App\Events\UpdateTradeEvent;

class AppService extends CoreService
{
    private $parameterRepository;
    private $faqRepository;
    private $commentRepository;
    private $userRepository;
    private $contractRepository;
    private $tradeRepository;
    private $vpsRepository;

    public function __construct(
        ParameterRepository $parameterRepository,
        FaqRepository $faqRepository,
        CommentRepository $commentRepository,
        UserRepository $userRepository,
        ContractRepository $contractRepository,
        TradeRepository $tradeRepository,
        VpsRepository $vpsRepository
    ) {
        $this->parameterRepository = $parameterRepository;
        $this->faqRepository = $faqRepository;
        $this->commentRepository = $commentRepository;
        $this->userRepository = $userRepository;
        $this->contractRepository = $contractRepository;
        $this->tradeRepository = $tradeRepository;
        $this->vpsRepository = $vpsRepository;
    }

    /**
     * Update trades
     *
     * @param $request
     * 
     */
    public function vpsReport($request)
    {
        return $this->transaction(
            function () use ($request) {
                if (get_global_value('reportedTradingFlag') == '1') return ['isOk' => true, 'isExecuted' => false];
                $revenue = $request->revenue > 0 ? $request->revenue : 0;
                $loss = $request->revenue < 0 ? -$request->revenue : 0;
                $currentDate = date_create();
                $lastTrade = $this->tradeRepository->latest('monday');
                if ($currentDate->format('W') != date_create($lastTrade->monday)->format('W')) {
                    $amount = (int) $this->parameterRepository->getValue('tradeContracts');
                    $pmFee = (int) $this->parameterRepository->getValue('positionManagementFee');
                    $trade = $this->tradeRepository->create([
                        "amount" => $amount,
                        "scores" => $request->scores,
                        "revenue" => $revenue,
                        "loss" => $loss,
                        "fees" => $request->fees + ($request->pmNight * $amount * $pmFee),
                        "monday" => $currentDate->sub(date_interval_create_from_date_string(($currentDate->format('w') - 1) . ' days'))->format('Y-m-d'),
                    ]);
                    $isOk = !!$trade;
                } else {
                    if (!$request->fees) $isOk = true;
                    else {
                        $isOk = $this->tradeRepository->update($lastTrade, [
                            "revenue" => $revenue + $lastTrade->revenue,
                            "loss" => $loss + $lastTrade->loss,
                            "fees" => $request->fees + $lastTrade->fees,
                        ]);
                    }
                }
                if ($isOk) {
                    set_global_value('reportedTradingFlag', '1');
                    Notification::send(
                        $this->userRepository->getUsersHasPermission('trades@view'),
                        new UpdatedTradesNotification(
                            number_format($request->revenue, 0, ",", ".") . ' ₫',
                            number_format($request->fees, 0, ",", ".") . ' ₫'
                        )
                    );
                    event(new UpdateTradeEvent());
                }
                return ['isOk' => $isOk, 'isExecuted' => true, 'data' => $request->all()];
            }
        );
    }

    /**
     * Upload AT Image
     *
     * @param $request
     * 
     */
    public function vpsExport($request)
    {
        return $this->transaction(
            function () use ($request) {
                $path = 'public/vps/' . $request->session . '/';
                $img = $request->imageData;
                $img = str_replace('data:image/png;base64,', '', $img);
                $img = str_replace(' ', '+', $img);
                $imageData = base64_decode($img);
                $imageName = $request->imageName;
                $isOk = Storage::put($path . $imageName, $imageData);
                return ['isOk' => $isOk];
            }
        );
    }

    /**
     * Check Market Open
     *
     * @param $request
     * 
     */
    public function vpsConfig($request)
    {
        $this->parameterRepository->setValue('VN30F1M', $request->VN30F1M);
        //
        $isOpeningMarket = $this->vpsCheckOpeningMarket();
        $tradeContracts = (int) $this->parameterRepository->getValue('tradeContracts');
        return [
            'isOpeningMarket' => $isOpeningMarket,
            'contractNumber' => $tradeContracts,
            'time' => now()->format('Y-m-d H-i-s')
        ];
    }

    /**
     * Check Opening Market
     * @return boolean
     */
    public function vpsCheckOpeningMarket()
    {
        $currentDay = date("w");
        if ($currentDay == 0 || $currentDay == 6) return false;

        $currentDate = date("Y-m-d");
        $currentYear = date("Y");
        $BASE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars";
        $BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY =
            "holiday@group.v.calendar.google.com";
        $API_KEY = env('GOOGLE_CALENDAR_API_KEY');
        $CALENDAR_REGION = "en.vietnamese";
        $url = $BASE_CALENDAR_URL . '/' . $CALENDAR_REGION . '%23' . $BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY . '/events?key=' . $API_KEY;
        $client = new \GuzzleHttp\Client();
        $res = $client->get($url);
        $resp = json_decode($res->getBody());
        $holidays = collect($resp->items)
            ->filter(function ($item) use ($currentYear) {
                return $item->start->date >= $currentYear . '-01-01' && $item->start->date <= $currentYear . '-31-12';
            })
            ->sortBy('start.date')
            ->reduce(function ($days, $item) {
                $days[] = $item->start->date;
                return $days;
            }, []);
        if (in_array($currentDate, $holidays)) return false;
        return true;
    }

    /**
     * Get, set and Clear Data
     *
     * @param $request
     * 
     */
    public function vpsData($request)
    {
        return $this->transaction(
            function () use ($request) {
                $action = $request->action;
                switch ($action) {
                    case 'SET':
                        $this->vpsRepository->create($request->all());
                        break;
                    case 'GET':
                        return $this->vpsRepository->getVps();
                        break;
                    case 'CLEAR':
                        $this->vpsRepository->clear();
                        break;
                }
            }
        );
    }

    public function vpsWebSocket()
    {
        if (get_global_value('runningSocketFlag') == '0') {
            set_global_value('runningSocketFlag', '1');
            $uri = 'wss://datafeed.vps.com.vn/socket.io/?EIO=3&transport=websocket';
            \Ratchet\Client\connect($uri)->then(function ($conn) {
                $conn->on('message', function ($msg) use ($conn) {
                    $time = time();
                    $stopSocketTime = strtotime($this->parameterRepository->getValue('stopSocketTime'));
                    if ($time >= $stopSocketTime) {
                        error_log("Timeout market.");
                        $conn->close();
                    } else {
                        $startSocketTime = strtotime(get_global_value('startSocketTime'));
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
                                    error_log($event . ': ' . $data->id . ': ' . $data->lastPrice);
                                    $this->vpsRepository->create(['x' => now(), 'y' => $data->lastPrice, 'type' => false]);
                                } else if ($data->id == 3310) {
                                    error_log($event . ': ' . $data->id . ': ' . $data->BVolume . ',' . $data->SVolume);
                                    $this->vpsRepository->create(['x' => now(), 'y' => $data->BVolume - $data->SVolume, 'type' => true]);
                                };
                            } else if ($event == 'stockps') {
                                $data = $json[1]->data;
                                if ($data->id == 3220) {
                                    error_log($event . ': ' . $data->id . ': ' . $data->lastPrice);
                                    $this->vpsRepository->create(['x' => now(), 'y' => $data->lastPrice, 'type' => false]);
                                };
                            }
                        }
                    }
                });
                $conn->on('close', function () {
                    error_log("WebSocket closed.");
                    set_global_value('runningSocketFlag', '0');
                    $time = time();
                    $stopSocketTime = strtotime($this->parameterRepository->getValue('stopSocketTime'));
                    $startSocketTime = strtotime(get_global_value('startSocketTime'));
                    if ($time < $stopSocketTime && $time < $startSocketTime  + 25 * 60 + 30) $this->vpsWebSocket();
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

    public function hnxSSE()
    {
        $data = urlencode(json_encode([["name" => "pushhub"]]));
        $url = "https://banggia.hnx.vn/signalr/negotiate?clientProtocol=1.5&connectionData={$data}";
        error_log($url);
        $client = new \GuzzleHttp\Client(['verify' => false]);
        $res = $client->get($url);
        $resp = json_decode($res->getBody());
        $token = urlencode($resp->ConnectionToken);
        $sseUrl = "https://banggia.hnx.vn/signalr/connect?transport=serverSentEvents&clientProtocol=1.5&connectionToken={$token}&connectionData={$data}";
        error_log($sseUrl);
        $es = new \EventSource\EventSource($sseUrl);
        // $es->setCurlOptions([CURLOPT_SSL_VERIFYPEER => false]);
        $messageReceived = 0;
        $es->onMessage(function (\EventSource\Event $event) use ($messageReceived, $es) {
            if ($es === 4) {
                $es->abort();
            }
            $messageReceived++;
            $stopSocketTime = strtotime($this->parameterRepository->getValue('stopSocketTime'));
            if (time() >= $stopSocketTime) {
                error_log("Timeout market.");
                $es->abort();
            }
            set_global_value('startSocketTime', $event->data);
            // echo $event->data, "\n";
            // error_log(json_encode($event));
        });

        $es->connect();
    }

    /**
     * Get the policy params
     *
     * @param $request
     * 
     */
    public function getPolicyParams($request)
    {
        $ret["interestRate"] = (float) $this->parameterRepository->getValue('interestRate', '0.005');
        $ret["principalMin"] = (int) $this->parameterRepository->getValue('principalMin');
        $ret["holdWeeksMin"] = (int) $this->parameterRepository->getValue('holdWeeksMin');
        $ret["faqs"] = $this->faqRepository->findAll();
        return $ret;
    }


    /**
     * Get the faqs
     *
     * @param $request
     * 
     */
    public function getFaqs($request)
    {
        return $this->faqRepository->findAll();
    }

    /**
     * Send Comment
     *
     * @param $request
     * 
     */
    public function sendComment($request)
    {
        return $this->transaction(
            function () use ($request) {
                $images = [];
                if ($request->hasfile('files')) {
                    $path = 'public/' . (!!$request->userCode ? md5($request->userCode) : 'guests') . '/r/';
                    foreach ($request->file('files') as $index => $file) {
                        $name = md5(time() . $index) . '.png';
                        $file->storeAs($path, $name);
                        $images[] = $name;
                    }
                }
                $data = [
                    "user_code" => $request->userCode ?? 0,
                    "name" => $request->name ?? NULL,
                    "phone" => $request->phone ?? NULL,
                    "subject" => $request->subject,
                    "content" => $request->content,
                    "images" => $images,
                ];
                $comment = $this->commentRepository->create($data);
                Notification::send(
                    $this->userRepository->getUsersHasPermission('comments@control'),
                    new SentCommentNotification($comment)
                );
                return ['isOk' => !!$comment];
            }
        );
    }

    /**
     * Get the contact
     *
     */
    public function getContact()
    {
        $pCode = (int) $this->parameterRepository->getValue('representUser');
        $contactUser = $this->userRepository->findByCode($pCode);
        return [
            'email' => config('mail.from.address'),
            'phone' => !!$contactUser ? $contactUser->phone : null,
        ];
    }
}
