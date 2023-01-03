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
        $otcOpe = $atc >= 0 ? '>' . ($trend >= 0 ? '=' : '') : '<' . ($trend < 0 ? '=' : '');
        return $this->model->select(DB::raw('trend, atc, ROUND(`atc`/`trend`*100, 1) AS per, ato'))
            ->where('trend', $trendOpe, 0)
            ->where('trend', $otcOpe, 0)
            ->orderBy('ato', 'ASC')
            ->orderBy('per', 'ASC')
            ->get();
    }
}
