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
     * @param $momentum
     * @param $atc
     */
    public function getStrategies($trend, $momentum, $atc)
    {
        $model = $this->model->where('trend', $trend);
        if ($momentum != null) $model = $model->where('momentum', $momentum > 0 ? '>=' : '<=', 0);
        if ($atc != null) $model = $model->where('atc', $atc > 0 ? '>=' : '<=', 0);
        return
            $model->orderBy('ato', 'DESC')
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
