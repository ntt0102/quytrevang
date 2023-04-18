<?php

namespace App\Services\User;

use App\Services\CoreService;
use Illuminate\Support\Facades\Notification;
use App\Notifications\CreatedContractNotification;
use App\Notifications\PayingContractNotification;
use App\Notifications\WithdrawingContractNotification;
use App\Repositories\ContractRepository;
use App\Repositories\ParameterRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Storage;


class OrderChartService extends CoreService
{
    private $contractRepository;
    private $parameterRepository;
    private $userRepository;

    public function __construct(
        ContractRepository $contractRepository,
        ParameterRepository $parameterRepository,
        UserRepository $userRepository
    ) {
        $this->contractRepository = $contractRepository;
        $this->parameterRepository = $parameterRepository;
        $this->userRepository = $userRepository;
    }

    /**
     * Return Config.
     * 
     * @param $request
     *
     * @return array
     */
    public function getConfig($request)
    {
        $so = $request->user()->smartOrder;
        return [
            'timeFrame' => $so->time_frame,
            'chartType' => $so->chart_type,
            'contractNumber' => $so->contracts,
            'takeProfit' => $so->take_profit,
            'stopLoss' => $so->stop_loss,
            'isTpSl' => !!$so->tpsl,
            'isVolume' => !!$so->volume,
            'isViewChart' => !!$so->view_chart
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
        $date = date('Y-m-d');
        $data = [];
        if ($request->date < $date)
            $data = $this->getFromCsv($request->date);
        else if ($request->date == $date) {
            if (get_global_value('openingMarketFlag') == '1')
                $data = $this->getVpsData();
        }
        return $data;
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
}
