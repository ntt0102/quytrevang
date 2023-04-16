<?php

namespace App\Services;

use App\Services\CoreService;
use Illuminate\Support\Facades\Notification;
use App\Notifications\UpdatedTradesNotification;
use App\Repositories\ParameterRepository;
use App\Repositories\UserRepository;
use App\Repositories\TradeRepository;
use App\Repositories\SmartOrderRepository;
use App\Repositories\SoPlanRepository;
use App\Events\UpdateTradeEvent;

class SmartOrderService extends CoreService
{
    private $parameterRepository;
    private $userRepository;
    private $tradeRepository;
    private $smartOrderRepository;
    private $soPlanRepository;

    public function __construct(
        ParameterRepository $parameterRepository,
        UserRepository $userRepository,
        TradeRepository $tradeRepository,
        SmartOrderRepository $smartOrderRepository,
        SoPlanRepository $soPlanRepository
    ) {
        $this->parameterRepository = $parameterRepository;
        $this->userRepository = $userRepository;
        $this->tradeRepository = $tradeRepository;
        $this->smartOrderRepository = $smartOrderRepository;
        $this->soPlanRepository = $soPlanRepository;
    }

    /**
     * Get Config
     *
     * @param $request
     * 
     */
    public function getConfig($request)
    {
        $so = request()->user()->smartOrder;
        if (!$so->validDevice($request->deviceId)) return ['isOk' => false];
        //
        $isOpeningMarket = get_global_value('openingMarketFlag') == '1';
        $message = $this->parameterRepository->getValue('smartOrderMessage');
        $pCode = (int) $this->parameterRepository->getValue('representUser');
        $contactUser = $this->userRepository->findByCode($pCode);
        $config = [
            'isOpeningMarket' => $isOpeningMarket,
            'isReportedResult' => get_global_value('reportedTradingFlag') == '1',
            'time' => [
                'start' => strtotime(date('Y-m-d') . ' 08:45:00'),
                'ato' => strtotime(date('Y-m-d') . ' 09:00:00'),
                'atc' => strtotime(date('Y-m-d') . ' 14:30:00'),
                'end' => strtotime(date('Y-m-d') . ' 14:45:00'),
            ],
            'pusher' => [
                'key' => env('PUSHER_APP_KEY'),
                'cluster' => env('PUSHER_APP_CLUSTER'),
            ],
            'message' => $message,
            'symbol' => $this->getSymbol(),
            'registerDate' => date_create($so->created_at)->format('Y-m-d'),
            'startDate' => $so->started_at,
            'expiresDate' => date_create($so->started_at)->add(date_interval_create_from_date_string($so->periods))->format('Y-m-d'),
            'deviceLimit' => $so->device_limit,
            'isReport' => !!$so->report,
            'bankAccount' => $contactUser->bank_account,
            'plans' => $this->soPlanRepository->findAll(['*'], ['months', 'asc']),
        ];
        return [
            'isOk' => true,
            'config' => array_merge($config, $this->getSettings($so))
        ];
    }

    /**
     * Get Background
     *
     * @param $request
     * 
     */
    public function getBackground()
    {
        $message = $this->parameterRepository->getValue('smartOrderMessage');
        $pCode = (int) $this->parameterRepository->getValue('representUser');
        $contactUser = $this->userRepository->findByCode($pCode);
        $config = [
            'message' => $message,
            'contact' => [
                'email' => $contactUser->email,
                'phone' => $contactUser->phone,
            ],
            'bankAccount' => $contactUser->bank_account,
            'plans' => $this->soPlanRepository->findAll(['*'], ['months', 'asc']),
        ];
        return [
            'isOk' => true,
            'config' => $config
        ];
    }

    /**
     * Set option
     *
     * @param $request
     * 
     */
    public function setConfig($request)
    {
        return $this->transaction(
            function () use ($request) {
                $so = request()->user()->smartOrder;
                if (!$so->validDevice($request->deviceId))
                    return ['isOk' => false, 'message' => 'unauthorized'];
                //
                $isOk = $this->smartOrderRepository->update($so, [
                    'time_frame' => $request->timeFrame,
                    'chart_type' => $request->chartType,
                    'contracts' => $request->contractNumber,
                    'take_profit' => $request->takeProfit,
                    'stop_loss' => $request->stopLoss,
                    'tpsl' => $request->isTpSl,
                    'volume' => $request->isVolume,
                    'view_chart' => $request->isViewChart,
                    'copy_trade' => $request->isCopyTrade,
                ]);
                if (!$isOk) return ['isOk' => false];
                return [
                    'isOk' => true,
                    'config' => $this->getSettings($so)
                ];
            }
        );
    }
    /**
     * Get user settings
     */
    private function getSettings($so)
    {
        return [
            'timeFrame' => $so->time_frame,
            'chartType' => $so->chart_type,
            'contractNumber' => $so->contracts,
            'takeProfit' => $so->take_profit,
            'stopLoss' => $so->stop_loss,
            'isTpSl' => !!$so->tpsl,
            'isVolume' => !!$so->volume,
            'isViewChart' => !!$so->view_chart,
            'isCopyTrade' => !!$so->copy_trade
        ];
    }
    /**
     * Get chart data
     *
     * @param $request
     * 
     */
    public function getChartData($request)
    {
        $so = request()->user()->smartOrder;
        if (!$so->validDevice($request->deviceId))
            return ['isOk' => false, 'data' => []];
        //
        $date = date('Y-m-d');
        $data = [];
        if ($request->date < $date)
            $data = $this->getFromCsv($request->date);
        else if ($request->date == $date) {
            if (get_global_value('openingMarketFlag') == '1')
                $data = $this->getVpsData();
        }
        return [
            'isOk' => true,
            'data' => $data
        ];
    }
    /**
     * Report
     *
     * @param $request
     * 
     */
    public function report($request)
    {
        return $this->transaction(
            function () use ($request) {
                $so = request()->user()->smartOrder;
                if (!$so->validDevice($request->deviceId))
                    return ['isOk' => false, 'message' => 'unauthorized'];
                //
                if (get_global_value('reportedTradingFlag') == '1')
                    return ['isOk' => true, 'isExecuted' => false];
                //
                $revenue = $request->revenue > 0 ? $request->revenue : 0;
                $loss = $request->revenue < 0 ? -$request->revenue : 0;
                $currentDate = date_create();
                $lastTrade = $this->tradeRepository->latest('monday');
                if ($currentDate->format('W') != date_create($lastTrade->monday)->format('W')) {
                    $amount = request()->user()->smartOrder->contracts;
                    $trade = $this->tradeRepository->create([
                        "amount" => $amount,
                        "scores" => $this->getInfo($this->getSymbol())->r,
                        "revenue" => $revenue,
                        "loss" => $loss,
                        "fees" => $request->fees,
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
                return ['isOk' => $isOk, 'isExecuted' => true, 'data' => $request];
            }
        );
    }
    /**
     * Check Opening Market
     * @return boolean
     */
    public function checkOpeningMarket()
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
     * Get data from VPS website
     */
    public function getVpsData()
    {
        $list = $this->vpsData();
        return collect($list)->map(function ($item) {
            return [
                'time' => strtotime(date('Y-m-d ') . $item->time),
                'price' => $item->lastPrice,
                'volume' => $item->lastVol
            ];
        });
        // $array = $this->vpsData();
        // $temp = collect($array)->reduce(function ($carry, $item) {
        //     $time = strtotime(date('Y-m-d ') . $item->time);
        //     $carry['data'][] = [
        //         'time' => $time,
        //         'price' => $item->lastPrice,
        //         'volume' => $item->lastVol
        //     ];
        //     $carry['times'][] = $time;
        //     return $carry;
        // }, ['data' => [], 'times' => []]);
        // $unique_times = array_unique($temp['times']);
        // return array_values(array_intersect_key($temp['data'], $unique_times));
    }
    /**
     * Get Symbol
     */
    public function getSymbol()
    {
        $client = new \GuzzleHttp\Client();
        $url = "https://spwapidatafeed.vps.com.vn/pslistdata";
        $res = $client->get($url);
        return json_decode($res->getBody())[0];
    }

    /**
     * Get Info
     */
    public function getInfo($symbol)
    {
        $client = new \GuzzleHttp\Client();
        $url = "https://spwapidatafeed.vps.com.vn/getpsalldatalsnapshot/{$symbol}";
        $res = $client->get($url);
        return json_decode($res->getBody())[0];
    }

    /**
     * Vps data
     */
    private function vpsData()
    {
        $client = new \GuzzleHttp\Client();
        $url = "https://bddatafeed.vps.com.vn/getpschartintraday/VN30F1M";
        $res = $client->get($url);
        return json_decode($res->getBody());
    }

    /**
     * 
     */
    public function exportToCsv()
    {
        $filename = storage_path('app/public/vn30f1m/' . date('Y-m-d') . '.csv');
        $list = $this->vpsData();
        $fp = fopen($filename, 'w');
        foreach ($list as $item) {
            $line = [];
            $line[] = strtotime(date('Y-m-d ') . $item->time);
            $line[] = $item->lastPrice;
            $line[] = $item->lastVol;
            fputcsv($fp, $line);
        }
        fclose($fp);
    }

    /**
     * 
     */
    public function getFromCsv($date)
    {
        $filename = storage_path('app/public/vn30f1m/' . $date . '.csv');
        if (!is_file($filename)) return [];
        $fp = fopen($filename, 'r');
        $keys = ['time', 'price', 'volume'];
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
     * Return all the SO
     * 
     * @param $request
     *
     * @return array
     */
    public function getList($request)
    {
        $sos = $this->smartOrderRepository->findAll();
        $users = $this->userRepository->findAllWithTrashed(['code', 'name']);
        return [
            'sos' => $sos,
            'users' => $users,
        ];
    }

    /**
     * validate User
     * 
     * @param $request
     *
     * @return array
     */
    public function validateUser($request)
    {
        $sos = $this->smartOrderRepository->where([['user_code', $request->userCode]]);
        return count($sos) == 0;
    }

    /**
     * Save
     * 
     * @param $request
     * 
     */
    public function saveSo($request)
    {
        return $this->transaction(function () use ($request) {
            foreach ($request->changes as $change) {
                $response = [];
                switch ($change['type']) {
                    case 'insert':
                        $data = [
                            "user_code" => $change['data']['user_code'],
                            "started_at" => $change['data']['started_at'],
                            "periods" => $change['data']['periods'],
                            "device_limit" => $change['data']['device_limit'],
                            "devices" => [],
                        ];
                        $so = $this->smartOrderRepository->create($data);
                        $isOk = !!$so;
                        $response['isOk'] = $isOk;
                        break;

                    case 'update':
                        $so = $this->smartOrderRepository->findById($change['key']);
                        $data = [
                            "user_code" => $change['data']['user_code'],
                            "started_at" => $change['data']['started_at'],
                            "periods" => $change['data']['periods'],
                            "device_limit" => $change['data']['device_limit'],
                            "devices" => $change['data']['devices'],
                        ];
                        $isOk = $this->smartOrderRepository->update($so, $data);
                        $response['isOk'] = $isOk;
                        break;

                    case 'remove':
                        $so = $this->smartOrderRepository->findById($change['key']);
                        $isOk = $this->smartOrderRepository->delete($so);
                        $response['isOk'] = $isOk;
                        break;
                }
                if (!$response['isOk']) break;
            }
            return $response;
        });
    }

    /**
     * Return all the plans
     * 
     * @param $request
     *
     * @return array
     */
    public function getPlans($request)
    {
        $plans = $this->soPlanRepository->findAll(['*'], ['months', 'asc']);
        return [
            'plans' => $plans,
        ];
    }

    /**
     * Save Plans
     * 
     * @param $request
     * 
     */
    public function savePlans($request)
    {
        return $this->transaction(function () use ($request) {
            foreach ($request->changes as $change) {
                $response = [];
                switch ($change['type']) {
                    case 'insert':
                        $data = [
                            "name" => $change['data']['name'],
                            "months" => $change['data']['months'],
                            "price" => $change['data']['price'],
                            "renewal_price" => $change['data']['renewal_price'],
                            "highest_price" => $change['data']['highest_price'],
                        ];
                        $plan = $this->soPlanRepository->create($data);
                        $isOk = !!$plan;
                        $response['isOk'] = $isOk;
                        break;

                    case 'update':
                        $plan = $this->soPlanRepository->findById($change['key']);
                        $data = [
                            "name" => $change['data']['name'],
                            "months" => $change['data']['months'],
                            "price" => $change['data']['price'],
                            "renewal_price" => $change['data']['renewal_price'],
                            "highest_price" => $change['data']['highest_price'],
                        ];
                        $isOk = $this->soPlanRepository->update($plan, $data);
                        $response['isOk'] = $isOk;
                        break;

                    case 'remove':
                        $plan = $this->soPlanRepository->findById($change['key']);
                        $isOk = $this->soPlanRepository->delete($plan);
                        $response['isOk'] = $isOk;
                        break;
                }
                if (!$response['isOk']) break;
            }
            return $response;
        });
    }
}
