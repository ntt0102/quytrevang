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
