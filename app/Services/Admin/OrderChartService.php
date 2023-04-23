<?php

namespace App\Services\Admin;

use App\Services\CoreService;
use App\Models\VpsUser;
use App\Services\Special\VpsOrderService;

class OrderChartService extends CoreService
{
    private $SHIFT_TIME = 7 * 60 * 60;

    /**
     * Get chart data
     *
     * @param $payload
     * 
     */
    public function getChartData($payload)
    {
        $date = date('Y-m-d');
        $data = [];
        if ($payload->date < $date)
            $data = $this->generateDataFromCsv($payload->date);
        else if ($payload->date == $date) {
            if (get_global_value('openingMarketFlag') == '1')
                $data = $this->generateDataFromVps();
        }
        return $data;
    }


    /**
     * Get Config
     *
     * @param $payload
     * 
     */
    public function getConfig($payload)
    {
        return [
            'symbol' => get_global_value('vn30f1m')
        ];
    }

    /**
     * Set config
     *
     * @param $payload
     * 
     */
    public function setConfig($payload)
    {
        return $this->transaction(
            function () use ($payload) {
                $so = request()->user()->smartOrder;
            }
        );
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
                $vpsUser = request()->user()->vpsUser;
                switch ($payload->cmd) {
                    case 'entry':
                        $isNew = $payload->type == 'new';
                        $vos = new VpsOrderService($vpsUser, $isNew);
                        if (($isNew && !!$vos->status && $vos->status['net'] == 0) || !$isNew)
                            $result = $vos->orderCondition($payload, $vpsUser->entry_order_id);
                        else return [
                            'isOk' => false,
                            'message' => 'openedPosition',
                        ];
                        break;

                    case 'tpsl':
                        $result = true;
                        break;
                    case 'tp':
                        $result = true;
                        break;
                    case 'sl':
                        $result = true;
                        break;
                    case 'cancel':
                        $result = true;
                        break;
                    case 'exit':
                        $result = true;
                        break;
                }
                return [
                    'isOk' => !!$result,
                    'data' => $result
                ];
            }
        );
    }

    /**
     * get Vps Account Info
     *
     * @param $payload
     * 
     */
    public function setVpsUserSession($payload)
    {
        $user = VpsUser::where('vps_code', $payload->user)->first();
        if (!$user) false;
        $user->vps_session = $payload->session;
        return !!$user->save();

        // return $user->update(['vps_session' => $payload->session]);
    }

    /**
     * Get data from VPS website
     */
    public function generateDataFromVps()
    {
        $list = $this->cloneVpsData();
        return collect($list)->map(function ($item) {
            return [
                'time' => strtotime(date('Y-m-d ') . $item->time) + $this->SHIFT_TIME,
                'value' => $item->lastPrice
            ];
        });
    }

    /**
     * 
     */
    public function exportToCsv($date = null)
    {
        if (get_global_value('openingMarketFlag') == '1') {
            if (!$date) $date = date('Y-m-d');
            $filename = storage_path('app/public/vn30f1m/' . $date . '.csv');
            $list = $this->cloneVpsData();
            $fp = fopen($filename, 'w');
            foreach ($list as $item) {
                $line = [];
                $line[] = strtotime($date . $item->time) + $this->SHIFT_TIME;
                $line[] = $item->lastPrice;
                fputcsv($fp, $line);
            }
            fclose($fp);
        }
    }

    /**
     * 
     */
    public function generateDataFromCsv($date)
    {
        $filename = storage_path('app/public/vn30f1m/' . $date . '.csv');
        if (!is_file($filename)) return [];
        $fp = fopen($filename, 'r');
        $keys = ['time', 'value'];
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
     * Vps data
     */
    private function cloneVpsData()
    {
        $client = new \GuzzleHttp\Client();
        $url = "https://bddatafeed.vps.com.vn/getpschartintraday/VN30F1M";
        $res = $client->get($url);
        return json_decode($res->getBody());
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
