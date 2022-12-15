<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\Vn30f1m;

class Vn30f1mRepository extends CoreRepository
{
    /**
     * @var Vn30f1m
     */
    protected $model;

    /**
     * Vn30f1mRepository constructor.
     *
     * @param Vn30f1m $model
     */
    public function __construct(Vn30f1m $model)
    {
        parent::__construct($model);
    }

    /**
     * @inheritdoc
     */
    public function getVn30f1m()
    {
        return [
            'price1' => $this->model->get(['date AS time', 'price1 AS value']),
            'price2' => $this->model->get(['date AS time', 'price2 AS value']),
            'price3' => $this->model->get(['date AS time', 'price3 AS value']),
        ];
    }

    /**
     * @inheritdoc
     */
    public function getLast()
    {
        return $this->model->whereNull('price3')->first();
    }

    /**
     * @inheritdoc
     */
    public function clear()
    {
        return Vn30f1m::truncate();
    }
}
