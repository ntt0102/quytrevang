<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\Strategy;
use Illuminate\Support\Facades\DB;

class StrategyRepository extends CoreRepository
{
    /**
     * @var Strategy
     */
    protected $model;

    /**
     * StrategyRepository constructor.
     *
     * @param Strategy $model
     */
    public function __construct(Strategy $model)
    {
        parent::__construct($model);
    }
    /**
     * @param $trend
     * @param $atc
     */
    public function getStrategies($trend, $atc)
    {
        $trendOpe = $trend >= 0 ? '>' : '<';
        $atcOpe = $atc >= 0 ? '>' . ($trend >= 0 ? '=' : '') : '<' . ($trend < 0 ? '=' : '');
        $orderDir = $trend >= 0 ? 'DESC' : 'ASC';
        return $this->model->select(DB::raw('trend, atc, ROUND(`atc`/`trend`*100, 1) AS per, ato'))
            ->where('trend', $trendOpe, 0)
            ->where('atc', $atcOpe, 0)
            ->orderBy('ato', $orderDir)
            ->orderBy('per', $orderDir)
            ->get();
    }

    /**
     * @inheritdoc
     */
    public function getLast()
    {
        return $this->model->whereNull('ato')->first();
    }
}
