<?php

namespace App\Services;

use App\Services\CoreService;
use Illuminate\Support\Facades\Notification;
use App\Notifications\UpdatedTradesNotification;
use App\Repositories\ParameterRepository;
use App\Repositories\UserRepository;
use App\Repositories\TradeRepository;
use App\Repositories\VpsRepository;
use App\Repositories\StrategyRepository;
use App\Events\UpdateTradeEvent;

class VpsService extends CoreService
{
    private $parameterRepository;
    private $userRepository;
    private $tradeRepository;
    private $vpsRepository;
    private $strategyRepository;

    public function __construct(
        ParameterRepository $parameterRepository,
        UserRepository $userRepository,
        TradeRepository $tradeRepository,
        VpsRepository $vpsRepository,
        StrategyRepository $strategyRepository
    ) {
        $this->parameterRepository = $parameterRepository;
        $this->userRepository = $userRepository;
        $this->tradeRepository = $tradeRepository;
        $this->vpsRepository = $vpsRepository;
        $this->strategyRepository = $strategyRepository;
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
     * Get Config
     *
     * @param $request
     * 
     */
    public function getConfig($request)
    {
        $isOpeningMarket = $this->checkOpeningMarket();
        $tradeContracts = (int) $this->parameterRepository->getValue('tradeContracts');
        $startTime = $this->parameterRepository->getValue('startTradingTime');
        $endTime = $this->parameterRepository->getValue('endTradingTime');
        $configs = [
            'isOpeningMarket' => $isOpeningMarket,
            'contractNumber' => $tradeContracts,
            'isReportedResult' => get_global_value('reportedTradingFlag') == '1',
            'time' => [
                'start' => strtotime(date('Y-m-d ') . $startTime),
                'end' => strtotime(date('Y-m-d ') . $endTime)
            ]
        ];
        return array_merge($configs, $this->getOtherConfigs());
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
     * Get, set and Clear Data
     *
     * @param $request
     * 
     */
    public function controlData($request)
    {
        return $this->transaction(
            function () use ($request) {
                $action = $request->action;
                switch ($action) {
                    case 'SET':
                        $this->vpsRepository->create($request->all());
                        break;
                    case 'GET':
                        if (!!$request->date)
                            return $this->getFromCsv($request->date);
                        // else if ($request->tcbs) return $this->getTcbs();
                        // else return $this->getVps();
                        else return $this->getTcbs();
                        break;
                    case 'CLEAR':
                        $this->vpsRepository->clear();
                        break;
                }
            }
        );
    }
    /**
     * 
     */
    public function getVps()
    {
        $data = $this->vpsRepository->getVps();
        $times = $data->reduce(function ($ts, $item) {
            $ts[] = $item->time;
            return $ts;
        }, []);
        $unique_times = array_unique($times);
        return array_values(array_intersect_key($data->toArray(), $unique_times));
    }
    /**
     * Tcbs data
     */
    public function getPsSymbol()
    {
        $client = new \GuzzleHttp\Client();
        $url = "https://spwapidatafeed.vps.com.vn/pslistdata";
        $res = $client->get($url);
        return json_decode($res->getBody())[0];
    }

    /**
     * Tcbs data
     */
    private function getOtherConfigs()
    {
        $symbol = $this->getPsSymbol();
        $client = new \GuzzleHttp\Client();
        $url = "https://spwapidatafeed.vps.com.vn/getpsalldatalsnapshot/{$symbol}";
        $res = $client->get($url);
        $c = json_decode($res->getBody())[0]->c;
        $escrow = ($c * 0.1 * 0.17) / 0.8;
        return [
            'symbol' => $symbol,
            'sheepLimit' => intval(800 / $escrow),
            'sharkLimit' => intval(2000 / $escrow)
        ];
    }

    /**
     * Tcbs data
     */
    private function tcbsData($size)
    {
        $symbol = $this->getPsSymbol();
        $client = new \GuzzleHttp\Client();
        $url = "https://apipubaws.tcbs.com.vn/futures-insight/v1/intraday/{$symbol}/his/paging?size={$size}";
        $res = $client->get($url);
        return json_decode($res->getBody())->data;
    }

    /**
     * get From TCBS
     */
    public function getTcbs()
    {
        $array = $this->tcbsData(10000);
        $temp = collect($array)->reduce(function ($carry, $item) {
            $carry['data'][] = [
                'time' => strtotime(date('Y-m-d ') . $item->t),
                'price' => $item->p,
                'volume' => $item->v,
                'action' => $item->a
            ];
            $carry['times'][] = $item->t;
            return $carry;
        }, ['data' => [], 'times' => []]);
        $unique_times = array_unique($temp['times']);
        return array_values(array_intersect_key($temp['data'], $unique_times));
    }

    /**
     * 
     */
    public function exportToCsv()
    {
        $filename = storage_path('app/public/vn30f1m/' . date('Y-m-d') . '.csv');
        $list = $this->tcbsData(10000);
        $fp = fopen($filename, 'w');
        foreach ($list as $item) {
            $a = [];
            $a[] = strtotime(date('Y-m-d ') . $item->t);
            $a[] = $item->p;
            $a[] = $item->v;
            $a[] = $item->a;
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

    // function exedata()
    // {
    //     $dates = [
    //         '2023-02-06', '2023-02-07', '2023-02-08',
    //         '2023-02-09', '2023-02-10', '2023-02-13',
    //         '2023-02-14', '2023-02-15', '2023-02-16',
    //         '2023-02-17', '2023-02-20'
    //     ];
    //     foreach ($dates as $date) {
    //         $filename = storage_path('app/public/vn30f1m/' . $date . '.csv');
    //         $filename_ = storage_path('app/public/vn30f1m/' . $date . '_.csv');
    //         $fp = fopen($filename, 'r');
    //         $fp_ = fopen($filename_, 'w');
    //         while (!feof($fp)) {
    //             $line = fgetcsv($fp);
    //             if (!!$line) {
    //                 $a = [
    //                     strtotime($line[0]),
    //                     $line[1] + 0,
    //                     $line[2] + 0,
    //                     $line[3]
    //                 ];
    //                 fputcsv($fp_, $a);
    //             }
    //         }
    //         fclose($fp_);
    //         fclose($fp);
    //     }
    // }

    /**
     * 
     */
    public function getVolumeByPrice()
    {
        $data = $this->vpsRepository->getVolumeByPrice();
        $merge = $data->reduce(function ($c, $item, $index) {
            $isUpdate = false;
            if (!!$index) {
                if ($item->price == end($c)['price']) $isUpdate = true;
            }
            //
            if ($isUpdate) {
                $end = array_pop($c);
                if ($item->side == 'BU') $end['buy'] = $item->sum + 0;
                else $end['sell'] = $item->sum + 0;
                $c[]  = $end;
            } else $c[] = [
                'price' => $item->price,
                'buy' => $item->side == 'BU' ? $item->sum + 0 : 0,
                'sell' => $item->side == 'SD' ? $item->sum + 0 : 0,
            ];
            return $c;
        }, []);
        return collect($merge)->reduce(function ($c, $item) {
            $c['price'][] = $item['price'];
            $c['buy'][] = $item['buy'];
            $c['sell'][] = -$item['sell'];
            return $c;
        }, ['price' => [], 'buy' => [], 'sell' => []]);
    }
}
