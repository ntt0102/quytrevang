<?php

namespace App\Services\User;

use App\Services\CoreService;
use App\Repositories\TradeRepository;

class TradeService extends CoreService
{
    private $tradeRepository;

    public function __construct(
        TradeRepository $tradeRepository
    ) {
        $this->tradeRepository = $tradeRepository;
    }

    /**
     * Get the week trade
     *
     * @param $request
     * 
     */
    public function getWeekChart($request)
    {
        $chart = $this->tradeRepository->getData(10);
        $chart = $chart->sortBy('date')->values()->reduce(function ($carry, $ch) {
            $date = date_create($ch->date);
            $week = $date->format('W');
            $year = $date->format('Y');
            $profit = $ch->revenue - $ch->loss - $ch->fees;
            $accumulatedProfit = !!count($carry) ? end($carry)['accumulatedProfit'] + $profit : $profit;
            $carry[] = [
                'accumulatedProfit' => $accumulatedProfit,
                'time' => trans('custom.chart.period.1') . ' ' . $week . ($year != date("Y") ? '/' . $year : '')
            ];
            return $carry;
        }, []);
        return $chart;
    }
}
