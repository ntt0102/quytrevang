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
        $firstDayQuarter = first_day_of('quarter')->format('Y-m-d');
        $firstDayYear = first_day_of('year')->format('Y-m-d');
        $firstDayAll = '2020-01-01';
        return [
            'quarter' => StockOrder::getWinRate($firstDayQuarter),
            'year' => StockOrder::getWinRate($firstDayYear),
            'all' => StockOrder::getWinRate($firstDayAll),
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
        $client = new \GuzzleHttp\Client();
        $url = "https://bgapidatafeed.vps.com.vn/getliststockdata/";
        $orders = StockOrder::opening()->get();
        foreach ($orders as $order) {
            $res = $client->get($url . $order->symbol);
            $lastPrice = json_decode($res->getBody())[0]->lastPrice;
            $temp = $this->calculateProfit($order);
            $openingCash = $temp->openingVol * $lastPrice * 1000;
            $profit = $temp->closedCash + $openingCash;
            $ret['orders'][] = [
                'symbol' => $order->symbol,
                'lastPrice' => $lastPrice,
                'openingVol' => $temp->openingVol,
                'profit' => $profit,
                'percent' => $profit / -$temp->totalCost * 100
            ];
            $totalProfit += $profit;
        }
        $ret['totalProfit'] = $totalProfit;
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
     * Return the chart.
     *
     * @return array
     */
    public function getChart($payload)
    {
        return false;
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
