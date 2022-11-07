<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\Trade;

class TradeRepository extends CoreRepository
{
    /**
     * @var Trade
     */
    protected $model;

    /**
     * TradeRepository constructor.
     *
     * @param Trade $model
     */
    public function __construct(Trade $model)
    {
        parent::__construct($model);
    }

    /**
     * @param integer $limit
     */
    public function getData($limit = 5)
    {
        return $this->model->orderBy('monday', 'DESC')->take($limit)->get();
    }
}
