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
        $chart = $chart->sortBy('monday')->values()->reduce(function ($carry, $ch) {
            $monday = date_create($ch->monday);
            $week = $monday->format('W');
            $year = $monday->format('Y');
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
