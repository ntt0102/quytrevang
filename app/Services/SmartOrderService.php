<?php

namespace App\Services;

use App\Services\CoreService;
use Illuminate\Support\Facades\Notification;
use App\Notifications\UpdatedTradesNotification;
use App\Repositories\ParameterRepository;
use App\Repositories\UserRepository;
use App\Repositories\TradeRepository;
use App\Repositories\SmartOrderRepository;
use App\Events\UpdateTradeEvent;

class SmartOrderService extends CoreService
{
    private $parameterRepository;
    private $userRepository;
    private $tradeRepository;
    private $smartOrderRepository;

    public function __construct(
        ParameterRepository $parameterRepository,
        UserRepository $userRepository,
        TradeRepository $tradeRepository,
        SmartOrderRepository $smartOrderRepository
    ) {
        $this->parameterRepository = $parameterRepository;
        $this->userRepository = $userRepository;
        $this->tradeRepository = $tradeRepository;
        $this->smartOrderRepository = $smartOrderRepository;
    }

    /**
     * Get Config
     *
     * @param $request
     * 
     */
    public function getConfig($request)
    {
        $so = $request->user()->smartOrder;
        $isOpeningMarket = $this->checkOpeningMarket();
        $startTime = $this->parameterRepository->getValue('startTradingTime');
        $endTime = $this->parameterRepository->getValue('endTradingTime');
        $latestVersion = $this->parameterRepository->getValue($request->securities . 'SmartOrderVer');
        $contact = app(\App\Services\AppService::class)->getContact();
        return [
            'isOpeningMarket' => $isOpeningMarket,
            'isReportedResult' => get_global_value('reportedTradingFlag') == '1',
            'time' => [
                'start' => strtotime(date('Y-m-d ') . $startTime),
                'end' => strtotime(date('Y-m-d ') . $endTime)
            ],
            'symbol' => $this->getSymbol(),
            'registerDate' => date_create($so->created_at)->format('Y-m-d'),
            'startDate' => $so->started_at,
            'expiresDate' => date_create($so->started_at)->add(date_interval_create_from_date_string($so->periods))->format('Y-m-d'),
            'deviceLimit' => $so->device_limit,
            'contractNumber' => $so->contracts,
            'takeProfit' => $so->take_profit,
            'stopLoss' => $so->stop_loss,
            'isVolume' => $so->volume,
            'isViewChart' => $so->view_chart,
            'timeFrame' => $so->time_frame,
            'chartType' => $so->chart_type,
            'contact' => $contact,
            'latestVersion' => $latestVersion,
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
                $isOk = $this->smartOrderRepository->update($request->user()->smartOrder, [
                    'time_frame' => $request->timeFrame,
                    'chart_type' => $request->chartType,
                    'contracts' => $request->contractNumber,
                    'take_profit' => $request->takeProfit,
                    'stop_loss' => $request->stopLoss,
                    'volume' => $request->isVolume,
                    'view_chart' => $request->isViewChart,
                ]);
                return ['isOk' => $isOk];
            }
        );
    }
    /**
     * Get chart data
     *
     * @param $request
     * 
     */
    public function getChartData($request)
    {
        if ($request->date == date('Y-m-d'))
            return $this->getVpsData();
        else return $this->getFromCsv($request->date);
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
                if (get_global_value('reportedTradingFlag') == '1') return ['isOk' => true, 'isExecuted' => false];
                $revenue = $request->revenue > 0 ? $request->revenue : 0;
                $loss = $request->revenue < 0 ? -$request->revenue : 0;
                $currentDate = date_create();
                $lastTrade = $this->tradeRepository->latest('monday');
                if ($currentDate->format('W') != date_create($lastTrade->monday)->format('W')) {
                    $amount = $request->user()->smartOrder->contracts;
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
                return ['isOk' => $isOk, 'isExecuted' => true, 'data' => $request->all()];
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
        $array = $this->vpsData();
        $temp = collect($array)->reduce(function ($carry, $item) {
            $time = strtotime(date('Y-m-d ') . $item->time);
            $carry['data'][] = [
                'time' => $time,
                'price' => $item->lastPrice,
                'volume' => $item->lastVol
            ];
            $carry['times'][] = $time;
            return $carry;
        }, ['data' => [], 'times' => []]);
        $unique_times = array_unique($temp['times']);
        return array_values(array_intersect_key($temp['data'], $unique_times));
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
        return json_decode($res->getBody());
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
            $a = [];
            $a[] = strtotime(date('Y-m-d ') . $item->time);
            $a[] = $item->lastPrice;
            $a[] = $item->lastVol;
            fputcsv($fp, $a);
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
        $keys = ['time', 'price', 'volume', 'action'];
        while (!feof($fp)) {
            $line = fgetcsv($fp);
            if (!!$line) {
                $lines[] = collect($line)->reduce(function ($carry, $item, $index) use ($keys) {
                    $carry[$keys[$index]] = in_array($keys[$index], ['time', 'price', 'volume']) ? $item + 0 : $item;
                    return $carry;
                }, []);
            }
        }
        fclose($fp);
        $times = collect($lines)->reduce(function ($ts, $item) {
            $ts[] = $item['time'];
            return $ts;
        }, []);
        $unique_times = array_unique($times);
        return array_values(array_intersect_key($lines, $unique_times));
    }
}
