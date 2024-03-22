<?php

namespace App\Services\Trading;

use App\Services\CoreService;
use App\Models\StockOrder;
use App\Events\UpdateStatisticEvent;


class StatisticService extends CoreService
{

    /**
     * Return all the stock.
     *
     * @return array
     */
    public function getData()
    {
        return StockOrder::orderBy('buy_date', 'DESC')->take(5)->get();
    }

    /**
     * Return the summary.
     *
     * @return array
     */
    public function getSummary($payload)
    {
        $quarterPeriod = 'quarter';
        $yearPeriod = 'year';
        $allPeriod = 'all';
        $quarterFromDate = first_day_of('quarter')->format('Y-m-d');
        $yearFromDate = first_day_of('year')->format('Y-m-d');
        $allFromDate = '2020-01-01';
        return [
            $quarterPeriod => $this->calculateSummary($quarterPeriod, $quarterFromDate),
            $yearPeriod => $this->calculateSummary($yearPeriod, $yearFromDate),
            $allPeriod => $this->calculateSummary($allPeriod, $allFromDate),
        ];
    }

    private function calculateSummary($period, $fromDate)
    {
        $pPos = 0;
        $pNeg = 0;
        $oPos = 0;
        $oNeg = 0;
        $data = StockOrder::getProfitChart($period, $fromDate, date('Y-m-d'));
        foreach ($data as $item) {
            if ($item->profit > 0) {
                $pPos = $item->profit;
                $oPos = $item->order;
            } else if ($item->profit < 0) {
                $pNeg = $item->profit;
                $oNeg = $item->order;
            }
        }
        return [
            'rr' => !$pNeg ? 0 : $pPos / (-$pNeg),
            'winrate' => !($oPos + $oNeg) ? 0 : $oPos / ($oPos + $oNeg) * 100,
            'profit' => $pPos + $pNeg,
        ];
    }

    /**
     * Return the summary.
     *
     * @return array
     */
    public function getOpening($payload)
    {
        $ret = [];
        $totalProfit = 0;
        $totalCost = 0;
        $client = new \GuzzleHttp\Client();
        $url = "https://bgapidatafeed.vps.com.vn/getliststockdata/";
        $orders = StockOrder::opening()->get();
        foreach ($orders as $order) {
            $res = $client->get($url . $order->symbol);
            $info = json_decode($res->getBody())[0];
            $lastPrice = $info->lastPrice;
            $change = $lastPrice - $info->r;
            $temp = $this->calculateProfit($order);
            $openingCash = $temp->openingVol * $lastPrice * 1000;
            $profit = $temp->closedCash + $openingCash;
            $ret['orders'][] = [
                'symbol' => $order->symbol,
                'lastPrice' => $lastPrice,
                'change' => $change,
                'openingVol' => $temp->openingVol,
                'profit' => $profit,
                'percent' => $profit / -$temp->totalCost * 100
            ];
            $totalProfit += $profit;
            $totalCost += $temp->totalCost;
        }
        $ret['totalProfit'] = $totalProfit;
        $ret['totalPercent'] = $totalProfit / -$totalCost * 100;
        return $ret;
    }

    /**
     *  Calculate Temp Profit
     * @param $order
     * @return Object
     */
    public function calculateProfit($order)
    {
        $buyCash = 0;
        $sellCash = 0;
        $totalBuyVol = 0;
        $totalSellVol = 0;
        $buyVolume = json_decode($order->buy_volume);
        $buyPrice = json_decode($order->buy_price);
        $buyFee = json_decode($order->buy_fee);
        $sellVolume = json_decode($order->sell_volume);
        $sellPrice = json_decode($order->sell_price);
        $sellFee = json_decode($order->sell_fee);
        for ($i = 0; $i < count($buyVolume); $i++) {
            $buyCash += -$buyVolume[$i] * $buyPrice[$i] - $buyFee[$i];
            $totalBuyVol += $buyVolume[$i];
        }
        $totalCost = $buyCash;
        for ($i = 0; $i < count($sellVolume); $i++) {
            $sellCash += $sellVolume[$i] * $sellPrice[$i] - $sellFee[$i];
            $totalSellVol += $sellVolume[$i];
            $totalCost += -$sellFee[$i];
        }
        return (object)[
            'openingVol' => $totalBuyVol - $totalSellVol,
            'closedCash' => $buyCash + $sellCash,
            'totalCost' => $totalCost,
        ];
    }

    /**
     * getProfitChart
     *
     * @return array
     */
    public function getProfitChart($payload)
    {
        $period = $payload->period;
        $page = (int) $payload->page;
        $charts = $this->createChartData($period, $page);
        return [
            'period' => $period,
            'page' => $page,
            'data' => $charts
        ];
    }

    /**
     * Create Chart Data
     * @param int $period
     * @param int $page
     */
    public function createChartData($period = 'day', $page = 1)
    {
        $ret = [];
        $accProfit = 0;
        $barsPerPage = $period == 'day' ? 90 : 10;
        $multiplier = $period == 'quarter' ? 3 : 1;
        $unit = $period == 'quarter' ? 'month' : $period;
        $startOfPage = date_create()->modify('-' . ($multiplier * ($page * $barsPerPage - 1)) . ' ' . $unit);
        $endOfPage = date_create()->modify('-' . (($page - 1) * $multiplier * $barsPerPage) . ' ' . $unit);
        $startDate = first_day_of($period, $startOfPage)->format('Y-m-d');
        $endDate = last_day_of($period, $endOfPage)->format('Y-m-d');
        $orders = StockOrder::getProfitChart($period, $startDate, $endDate);
        foreach ($orders as $order) {
            if (!array_key_exists($order->date, $ret)) {
                $pPos = 0;
                $pNeg = 0;
                $oPos = 0;
                $oNeg = 0;
            }
            if ($order->profit > 0) {
                $pPos = $order->profit;
                $oPos = $order->order;
            } else if ($order->profit < 0) {
                $pNeg = $order->profit;
                $oNeg = $order->order;
            }
            $profit = $pPos + $pNeg;
            $accProfit += $profit;
            $ret[$order->date]['rr'] = !$pNeg ? 0 : $pPos / (-$pNeg);
            $ret[$order->date]['winrate'] = !($oPos + $oNeg) ? 0 : $oPos / ($oPos + $oNeg) * 100;
            $ret[$order->date]['profit'] = $profit;
            $ret[$order->date]['accProfit'] = $accProfit;
            $ret[$order->date]['date'] = $this->createChartDate($period, $order->date);
        }
        return empty($ret) ? $ret : array_values($ret);
    }
    /**
     * create Chart Date
     */
    private function createChartDate($period, $date)
    {
        if ($period != 'year') {
            if ($period == 'day') {
                [$y, $m, $d] = explode("/", $date);
                $t = $d;
                if ($y != date("Y")) $t .= '/' . $m . '/' . $y;
                else if ($m != date("m")) $t .= '/' . $m;
            } else {
                [$y, $x] = explode("/", $date);
                $t = $x;
                if ($y != date("Y")) $t .= '/' . $y;
            }
        } else $t = $date;
        $t = trans('custom.chart.period.' . $period) . ' ' . $t;
        $t = str_replace(' 0', ' ', $t);
        return str_replace('/0', '/', $t);
    }

    /**
     * Save data
     * 
     * @param $payload
     * 
     */
    public function save($payload)
    {
        return $this->transaction(function () use ($payload) {
            foreach ($payload->changes as $change) {
                switch ($change->type) {
                    case 'insert':
                        $isOk = !!StockOrder::create((array)$change->data);
                        break;

                    case 'update':
                        $trade = StockOrder::find($change->key);
                        $isOk = $trade->update((array)$change->data);
                        break;

                    case 'remove':
                        $trade = StockOrder::find($change->key);
                        $isOk = $trade->delete();
                        break;
                }
                if (!$isOk) break;
            }
            if ($isOk) event(new UpdateStatisticEvent());
            return ['isOk' => $isOk];
        });
    }
}
