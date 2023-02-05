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
use Illuminate\Support\Facades\Storage;
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
        $this->parameterRepository->setValue('VN30F1M', $request->VN30F1M);
        //
        $isOpeningMarket = $this->checkOpeningMarket();
        $tradeContracts = (int) $this->parameterRepository->getValue('tradeContracts');
        $startTime = $this->parameterRepository->getValue('startTradingTime');
        $endTime = $this->parameterRepository->getValue('endTradingTime');
        return [
            'isOpeningMarket' => $isOpeningMarket,
            'contractNumber' => $tradeContracts,
            'time' => [
                'start' => $startTime,
                'end' => $endTime
            ],
            'strategy' => $this->strategyRepository->getLast()
        ];
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
                        else if ($request->tcbs) return $this->getTcbs();
                        else return $this->getVps();
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
     * get From TCBS
     */
    public function getTcbs()
    {
        $VN30F1M = $this->parameterRepository->getValue('VN30F1M');
        $client = new \GuzzleHttp\Client();
        $url = "https://apipubaws.tcbs.com.vn/futures-insight/v1/intraday/{$VN30F1M}/his/paging?size=5000";
        $res = $client->get($url);
        $array = json_decode($res->getBody())->data;
        // collect($array)->map(function ($item) {
        //     $param = [
        //         'time' => date('Y-m-d ') . $item->t,
        //         'price' => $item->p,
        //         'vol' => $item->v,
        //         'side' => $item->a
        //     ];
        //     $this->vpsRepository->create($param);
        // });
        $temp = collect($array)->reduce(function ($carry, $item) {
            $carry['data'][] = [
                'time' => date('Y-m-d ') . $item->t,
                'price' => $item->p,
                'vol' => $item->v,
                'side' => $item->a
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
        $list = \App\Models\Vps::all();
        $fp = fopen($filename, 'w');
        foreach ($list as $obj) {
            $a = [];
            $a[] = $obj->time;
            $a[] = $obj->price;
            $a[] = $obj->vol;
            $a[] = $obj->side;
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
        $keys = ['time', 'price', 'vol', 'side'];
        while (!feof($fp)) {
            $line = fgetcsv($fp);
            if (!!$line) {
                $lines[] = collect($line)->reduce(function ($carry, $item, $index) use ($keys) {
                    $carry[$keys[$index]] = $keys[$index] == 'price' || $keys[$index] == 'vol' ? $item + 0 : $item;
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
