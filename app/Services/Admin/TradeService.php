<?php

namespace App\Services\Admin;

use App\Services\CoreService;
use App\Repositories\TradeRepository;
use App\Repositories\ParameterRepository;
use Illuminate\Support\Facades\Storage;
use App\Events\UpdateTradeEvent;


class TradeService extends CoreService
{
    private $tradeRepository;
    private $parameterRepository;
    private $BARS_PER_PAGE = 8;

    public function __construct(
        TradeRepository $tradeRepository,
        ParameterRepository $parameterRepository
    ) {
        $this->tradeRepository = $tradeRepository;
        $this->parameterRepository = $parameterRepository;
    }

    /**
     * Return all the trades.
     *
     * @return array
     */
    public function fetch()
    {
        return $this->tradeRepository->getData();
    }


    /**
     * Return the chart.
     *
     * @return array
     */
    public function getChart($request)
    {
        $period = (int) $request->period;
        $page = (int) $request->page;
        $charts = $this->createChartData($period, $page);
        if (!count($charts)) $page -= 1;
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
    private function createChartData($period = 1, $page = 1)
    {
        $endDate = $page > 1 ? $this->getStartDateOfPage($period, $page - 1) : $this->tradeRepository->latest('monday')->monday;
        $startDate = $this->getStartDateOfPage($period, $page);
        $charts = $this->tradeRepository->where([['monday', '>', $startDate], ['monday', '<=', $endDate]], ['*'], ['monday', 'asc']);
        $charts = $charts->reduce(function ($group, $ch) use ($period) {
            $week = date_create($ch->monday)->format('W');
            $time = floor(($week - 1) / $period) + 1;
            $length = count($group);
            $maxIndex = $length - 1;
            if (
                $length == 0
                || $period == 1
                || ($week != 53 && (($week - 1) % $period == 0 || $group[$maxIndex]->time != $time))
            ) {
                $ch->id = 1;
                $ch->time = $time;
                $group[] = $ch;
            } else {
                $group[$maxIndex]->id++;
                $group[$maxIndex]->amount += $ch->amount;
                $group[$maxIndex]->scores += $ch->scores;
                $group[$maxIndex]->revenue += $ch->revenue;
                $group[$maxIndex]->loss += $ch->loss;
                $group[$maxIndex]->fees += $ch->fees;
            }
            return $group;
        }, []);
        $charts = collect($charts)->reduce(function ($carry, $ch) use ($period) {
            if ($ch->fees > 0) {
                $profit = $ch->revenue - $ch->loss - $ch->fees;
                $marginRate = (float) $this->parameterRepository->getValue('marginRate');
                $principal = ($ch->amount / $ch->id) * ($ch->scores / $ch->id) * 100000 * $marginRate;
                $year = date_create($ch->monday)->format('Y');
                $temp =  [
                    's1' => 0,
                    's2' => 0,
                    's3' => $profit,
                    's4' => $ch->loss,
                    's5' => $ch->fees,
                    'revenue' => $ch->revenue,
                    'loss' => $ch->loss,
                    'fees' => $ch->fees,
                    'copyRate' => $profit > 0 ? round(40 * (1 - ($ch->loss / ($ch->revenue - $ch->fees)))) : 0,
                    'profit' => $profit,
                    'principal' => (int) $principal,
                    'profitPerFees' => round($profit / $ch->fees, 1),
                    'profitPerPrincipal' => round(100 * $profit / ($principal), 1),
                    'time' => trans('custom.chart.period.' . $period) . ' ' . ($period == 52 ? $year : $ch->time . ($year != date("Y") ? '/' . $year : ''))
                ];
                if ($profit < 0) {
                    $temp['s3'] = 0;
                    if (-$profit <=  $ch->loss) {
                        $temp['s1'] = $profit;
                        $temp['s2'] = 0;
                        $temp['s4'] = $ch->loss + $profit;
                    } else {
                        $temp['s1'] = -$ch->loss;
                        $temp['s2'] = $ch->loss + $profit;
                        $temp['s4'] = 0;
                        $temp['s5'] = $ch->loss + $ch->fees + $profit;
                    }
                }
                $carry[] = $temp;
            }
            return $carry;
        }, []);
        return $charts;
    }

    /**
     * @param integer $period
     * @param integer $page
     * @return string $startDate
     */
    private function getStartDateOfPage($period, $page)
    {
        $bars = $this->BARS_PER_PAGE * $page;
        $endDate = $this->tradeRepository->latest('monday')->monday;
        $endDateObject = date_create($endDate);
        $weekOfYear = $endDateObject->format('W');
        if (!($period > 1 && $weekOfYear == 53)) $bars -= 1;
        $oddWeeks = ($weekOfYear - 1) % $period;
        return $endDateObject->sub(date_interval_create_from_date_string(($period * $bars + $oddWeeks + 1) . ' weeks'))->format('Y-m-d');
    }

    /**
     * Return the summary.
     *
     * @return array
     */
    public function getSummary($request)
    {
        return [
            'week' => $this->calculateSummary(1),
            'month' => $this->calculateSummary(4),
            'quarter' => $this->calculateSummary(13),
            'year' => $this->calculateSummary(52),
            'all' => $this->calculateSummary(),
        ];
    }

    /**
     * Calculate summary
     * @param integer $period
     * @param string $endDate
     * @return float
     */
    private function calculateSummary($period = null, $endDate = null)
    {
        if (!$endDate) $endDate = $this->tradeRepository->latest('monday')->monday;
        $queryConditions = [['monday', '<=', $endDate]];
        if (!!$period) {
            $endDateObject = date_create($endDate);
            $weekOfYear = $endDateObject->format('W');
            $tick = $period > 1 && $weekOfYear == 53 ? 1 : 0;
            if ($period > 52) {
                $tick += $period / 52 - 1;
                $period = 52;
            }
            $oddWeeks = ($weekOfYear - 1) % $period;
            $startDate = $endDateObject->sub(date_interval_create_from_date_string(($tick * $period + $oddWeeks) . ' weeks'))->format('Y-m-d');
            $queryConditions[] = ['monday', '>=', $startDate];
        }
        $charts = $this->tradeRepository->where($queryConditions);

        $sum = $charts->reduce(function ($sum, $ch) {
            $sum['index']++;
            $sum['amount'] += $ch->amount;
            $sum['scores'] += $ch->scores;
            $sum['revenue'] += $ch->revenue;
            $sum['loss'] += $ch->loss;
            $sum['fees'] += $ch->fees;
            return $sum;
        }, [
            'index' => 0,
            'amount' => 0,
            'scores' => 0,
            'revenue' => 0,
            'loss' => 0,
            'fees' => 0,
        ]);
        if (!$sum['index']) return 0;
        $profitSum = $sum['revenue'] - $sum['loss'] - $sum['fees'];
        $marginRate = (float) $this->parameterRepository->getValue('marginRate');
        $principalAvg = ($sum['amount'] / $sum['index']) * ($sum['scores'] / $sum['index']) * 100000 * $marginRate;
        $profitPerPrincipal = round(100 * $profitSum / ($principalAvg), 1);
        return $profitPerPrincipal;
    }

    /**
     * Save role
     * 
     * @param $request
     * 
     */
    public function save($request)
    {
        return $this->transaction(function () use ($request) {
            foreach ($request->changes as $change) {
                $response = [];
                if (in_array($change['type'], ["insert", "update"])) {
                    $data = [
                        "amount" => $change['data']['amount'],
                        "scores" => $change['data']['scores'],
                        "revenue" => $change['data']['revenue'],
                        "loss" => $change['data']['loss'],
                        "fees" => $change['data']['fees'],
                        "monday" => $change['data']['monday'],
                    ];
                }
                switch ($change['type']) {
                    case 'insert':
                        $currentMonday = $data['monday'];
                        $lastTrade = $this->tradeRepository->latest('monday');
                        $lastMonday = $lastTrade->monday;
                        if ($currentMonday != $lastMonday) {
                            $trade = $this->tradeRepository->create($data);
                            $response['isOk'] = !!$trade;
                        } else {
                            $response['isOk'] = $this->tradeRepository->update($lastTrade, [
                                'revenue' => $data['revenue'] + $lastTrade->revenue,
                                'loss' => $data['loss'] + $lastTrade->loss,
                                'fees' => $data['fees'] + $lastTrade->fees,
                            ]);
                        }
                        break;

                    case 'update':
                        $trade = $this->tradeRepository->findById($change['key']);
                        $response['isOk'] = $this->tradeRepository->update($trade, $data);
                        break;

                    case 'remove':
                        $trade = $this->tradeRepository->findById($change['key']);
                        $response['isOk'] = $this->tradeRepository->delete($trade);
                        break;
                }
                if (!$response['isOk']) break;
            }
            if ($response['isOk']) event(new UpdateTradeEvent());
            return $response;
        });
    }

    /**
     * Return the flow.
     *
     * @return array
     */
    public function getFlow($request)
    {
        $json = Storage::disk('public')->get('tradeflow.json');
        $json = json_decode($json, true);
        return $json;
    }

    /**
     * Save the flow.
     *
     * @return array
     */
    public function saveFlow($request)
    {
        $data = $request->data;
        $data = json_decode($data);
        Storage::disk('public')->put('tradeflow.json', $data);
    }
}
