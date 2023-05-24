<?php

namespace App\Services\User;

use App\Services\CoreService;
use App\Models\Trade;

class TradeService extends CoreService
{

    /**
     * Get the month trade
     *
     * @param $payload
     * 
     */
    public function getMonthChart($payload)
    {
        $startDate = date_create()->modify('-1 month')->format('Y-m-d');
        $endDate = date_create()->format('Y-m-d');
        $data = Trade::where('date', '>=', $startDate)
            ->where('date', '<=', $endDate)
            ->orderBy('date', 'asc')->get()
            ->reduce(function ($carry, $item) {
                $carry['revenue'] += $item->revenue;
                $carry['loss'] += $item->loss;
                $carry['fees'] += $item->fees;
                $profit = $item->revenue - $item->loss - $item->fees;
                $accumulatedProfit = !!count($carry['charts']) ? end($carry['charts'])['accumulatedProfit'] + $profit : $profit;
                $carry['charts'][] = [
                    'accumulatedProfit' => $accumulatedProfit,
                    'time' => $this->createChartTime($item->date)
                ];
                return $carry;
            }, [
                'revenue' => 0,
                'loss' => 0,
                'fees' => 0,
                'charts' => [],
            ]);
        $copyRate = $data['revenue'] - $data['loss'] - $data['fees'] > 0
            ? round(50 * (1 - ($data['loss'] / ($data['revenue'] - $data['fees'])))) : 0;
        return [
            'charts' => $data['charts'],
            'copyRate' => $copyRate,
        ];
    }
    private function createChartTime($time)
    {
        [$y, $m, $d] = explode("-", $time);
        $t = $d;
        if ($y != date("Y")) $t .= '/' . $m . '/' . $y;
        else if ($m != date("m")) $t .= '/' . $m;
        $t = trans('custom.chart.period.day') . ' ' . $t;
        $t = str_replace(' 0', ' ', $t);
        return str_replace('/0', '/', $t);
    }
}
