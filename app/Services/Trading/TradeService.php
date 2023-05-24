<?php

namespace App\Services\Trading;

use App\Services\CoreService;
use App\Models\Parameter;
use App\Models\Trade;
use App\Events\UpdateStatisticEvent;


class TradeService extends CoreService
{

    /**
     * Return all the trades.
     *
     * @return array
     */
    public function fetch()
    {
        return Trade::orderBy('date', 'DESC')->take(5)->get();
    }

    /**
     * Return the chart.
     *
     * @return array
     */
    public function getChart($payload)
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
        $barsPerPage = $period == 'day' ? 30 : 10;
        $multiplier = $period == 'quarter' ? 3 : 1;
        $unit = $period == 'quarter' ? 'month' : $period;
        $startOfPage = date_create()->modify('-' . ($multiplier * ($page * $barsPerPage - 1)) . ' ' . $unit);
        $endOfPage = date_create()->modify('-' . (($page - 1) * $multiplier * $barsPerPage) . ' ' . $unit);
        $startDate = $this->firstDayOf($period, $startOfPage)->format('Y-m-d');
        $endDate = $this->lastDayOf($period, $endOfPage)->format('Y-m-d');
        return $this->queryChart($period, $startDate, $endDate)->get()->reduce(function ($carry, $item) use ($period) {
            if ($item->fees > 0) {
                $profit = $item->revenue - $item->loss - $item->fees;
                $marginRate = (float) Parameter::getValue('marginRate');
                $principal = ($item->amount / $item->counter) * ($item->scores / $item->counter) * 100000 * $marginRate;
                $temp =  [
                    's1' => 0,
                    's2' => 0,
                    's3' => $profit,
                    's4' => $item->loss,
                    's5' => $item->fees,
                    'revenue' => $item->revenue,
                    'loss' => $item->loss,
                    'fees' => $item->fees,
                    'profit' => $profit,
                    'principal' => (int) $principal,
                    'profitPerFees' => round($profit / $item->fees, 1),
                    'profitPerPrincipal' => round(100 * $profit / ($principal), 1),
                    'time' => $this->createChartTime($period, $item->time),
                ];
                if ($profit < 0) {
                    $temp['s3'] = 0;
                    if (-$profit <=  $item->loss) {
                        $temp['s1'] = $profit;
                        $temp['s2'] = 0;
                        $temp['s4'] = $item->loss + $profit;
                    } else {
                        $temp['s1'] = -$item->loss;
                        $temp['s2'] = $item->loss + $profit;
                        $temp['s4'] = 0;
                        $temp['s5'] = $item->loss + $item->fees + $profit;
                    }
                }
                $carry[] = $temp;
            }
            return $carry;
        }, []);
    }
    private function queryChart($period, $startDate, $endDate)
    {
        $charts = Trade::selectRaw('CAST(count(*) as INT) as counter');
        $charts->selectRaw('CAST(sum(amount) as INT) as amount');
        $charts->selectRaw('CAST(sum(scores) as INT) as scores');
        $charts->selectRaw('CAST(sum(revenue) as INT) as revenue');
        $charts->selectRaw('CAST(sum(loss) as INT) as loss');
        $charts->selectRaw('CAST(sum(fees) as INT) as fees');
        switch ($period) {
            case 'day':
                $charts->selectRaw("CONCAT(YEAR(date),'/',LPAD(MONTH(date), 2, '0'),'/',LPAD(DAY(date), 2, '0')) AS time");
                break;
            case 'week':
                $charts->selectRaw("CONCAT(YEAR(date),'/',LPAD(WEEK(date), 2, '0')) AS time");
                break;
            case 'month':
                $charts->selectRaw("CONCAT(YEAR(date),'/',LPAD(MONTH(date), 2, '0')) AS time");
                break;
            case 'quarter':
                $charts->selectRaw("CONCAT(YEAR(date),'/',QUARTER(date)) AS time");
                break;
            case 'year':
                $charts->selectRaw("YEAR(date) AS time");
                break;
            case 'all':
                $charts->selectRaw("1 AS time");
                break;
        }
        if (!!$startDate) $charts->where('date', '>=', $startDate);
        if (!!$endDate) $charts->where('date', '<=', $endDate);
        $charts->orderBy('time', 'asc');
        $charts->groupBy('time');
        return $charts;
    }
    private function createChartTime($period, $time)
    {
        if ($period != 'year') {
            if ($period == 'day') {
                [$y, $m, $d] = explode("/", $time);
                $t = $d;
                if ($y != date("Y")) $t .= '/' . $m . '/' . $y;
                else if ($m != date("m")) $t .= '/' . $m;
            } else {
                [$y, $x] = explode("/", $time);
                $t = $x;
                if ($y != date("Y")) $t .= '/' . $y;
            }
        } else $t = $time;
        $t = trans('custom.chart.period.' . $period) . ' ' . $t;
        $t = str_replace(' 0', ' ', $t);
        return str_replace('/0', '/', $t);
    }

    /**
     * Return the summary.
     *
     * @return array
     */
    public function getSummary($payload)
    {
        return [
            'day' => $this->calculateSummary('day'),
            'week' => $this->calculateSummary('week'),
            'month' => $this->calculateSummary('month'),
            'quarter' => $this->calculateSummary('quarter'),
            'year' => $this->calculateSummary('year'),
            'all' => $this->calculateSummary('all'),
        ];
    }

    /**
     * Calculate summary
     * @param integer $period
     * @return float
     */
    public function calculateSummary($period = 'day')
    {
        $startDate = $period != 'all' ? $this->firstDayOf($period)->format('Y-m-d') : null;
        $endDate = $period != 'all' ? $this->lastDayOf($period)->format('Y-m-d') : null;
        $sum = $this->queryChart($period, $startDate, $endDate)->first();
        if (!$sum) return 0;
        $profitSum = $sum->revenue - $sum->loss - $sum->fees;
        $marginRate = (float) Parameter::getValue('marginRate');
        $principalAvg = ($sum->amount / $sum->counter) * ($sum->scores / $sum->counter) * 100000 * $marginRate;
        $profitPerPrincipal = round(100 * $profitSum / ($principalAvg), 1);
        return $profitPerPrincipal;
    }

    /**
     * Save trade data
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
                        $isOk = !!Trade::create((array)$change->data);
                        break;

                    case 'update':
                        $trade = Trade::find($change->key);
                        $isOk = $trade->update((array)$change->data);
                        break;

                    case 'remove':
                        $trade = Trade::find($change->key);
                        $isOk = $trade->delete();
                        break;
                }
                if (!$isOk) break;
            }
            if ($isOk) event(new UpdateStatisticEvent());
            return ['isOk' => $isOk];
        });
    }

    /**
     * Return the first day of the Week/Month/Quarter/Year that the
     * current/provided date falls within
     *
     * @param string   $period The period to find the first day of. ('year', 'quarter', 'month', 'week')
     * @param DateTime $date   The date to use instead of the current date
     *
     * @return DateTime
     */
    function firstDayOf($period, $date = null)
    {
        $period = strtolower($period);
        $newDate = ($date === null) ? date_create() : clone $date;

        switch ($period) {
            case 'year':
                $newDate->modify('first day of january ' . $newDate->format('Y'));
                break;
            case 'quarter':
                $month = $newDate->format('n');

                if ($month < 4) {
                    $newDate->modify('first day of january ' . $newDate->format('Y'));
                } elseif ($month > 3 && $month < 7) {
                    $newDate->modify('first day of april ' . $newDate->format('Y'));
                } elseif ($month > 6 && $month < 10) {
                    $newDate->modify('first day of july ' . $newDate->format('Y'));
                } elseif ($month > 9) {
                    $newDate->modify('first day of october ' . $newDate->format('Y'));
                }
                break;
            case 'month':
                $newDate->modify('first day of this month');
                break;
            case 'week':
                $newDate->modify(($newDate->format('w') === '0') ? 'monday last week' : 'monday this week');
                break;
        }

        return $newDate;
    }

    /**
     * Return the last day of the Week/Month/Quarter/Year that the
     * current/provided date falls within
     *
     * @param string   $period The period to find the last day of. ('year', 'quarter', 'month', 'week')
     * @param DateTime $date   The date to use instead of the current date
     *
     * @return DateTime
     * @throws InvalidArgumentException
     */
    function lastDayOf($period, $date = null)
    {
        $period = strtolower($period);
        $newDate = ($date === null) ? date_create() : clone $date;

        switch ($period) {
            case 'year':
                $newDate->modify('last day of december ' . $newDate->format('Y'));
                break;
            case 'quarter':
                $month = $newDate->format('n');

                if ($month < 4) {
                    $newDate->modify('last day of march ' . $newDate->format('Y'));
                } elseif ($month > 3 && $month < 7) {
                    $newDate->modify('last day of june ' . $newDate->format('Y'));
                } elseif ($month > 6 && $month < 10) {
                    $newDate->modify('last day of september ' . $newDate->format('Y'));
                } elseif ($month > 9) {
                    $newDate->modify('last day of december ' . $newDate->format('Y'));
                }
                break;
            case 'month':
                $newDate->modify('last day of this month');
                break;
            case 'week':
                $newDate->modify(($newDate->format('w') === '0') ? 'now' : 'sunday this week');
                break;
        }

        return $newDate;
    }

    /**
     * Validate Duplicate Date
     * 
     * @param \$payload
     */
    public function validateDuplicateDate($payload)
    {
        $count = Trade::where('date', $payload->date)->count();
        return $count == 0;
    }
}
