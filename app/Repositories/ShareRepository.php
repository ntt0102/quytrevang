<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\Share;

class ShareRepository extends CoreRepository
{
    /**
     * @var Share
     */
    protected $model;

    /**
     * ShareRepository constructor.
     *
     * @param Share $model
     */
    public function __construct(Share $model)
    {
        parent::__construct($model);
    }

    /**
     * @inheritdoc
     */
    public function getShare($symbol)
    {
        return [
            'vnindex' => $this->model->where('symbol', 'VNINDEX')->get(['date AS time', 'price AS value']),
            'price' => $this->model->where('symbol', $symbol)->get(['date AS time', 'price AS value']),
            'foreign' => $this->model->where('symbol', $symbol)->get(['date AS time', 'foreign AS value']),
        ];
    }

    /**
     * @inheritdoc
     */
    public function getSymbol()
    {
        return $this->model->where('symbol', '<>', 'VNINDEX')->select('symbol')->distinct()->get()->pluck('symbol');
    }
}
