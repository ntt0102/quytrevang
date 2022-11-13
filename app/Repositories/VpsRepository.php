<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\Vps;

class VpsRepository extends CoreRepository
{
    /**
     * @var Vps
     */
    protected $model;

    /**
     * VpsRepository constructor.
     *
     * @param Vps $model
     */
    public function __construct(Vps $model)
    {
        parent::__construct($model);
    }

    /**
     * @inheritdoc
     */
    public function getVps($date)
    {
        $model = $this->model;
        if ($date) $model = $model->whereDate('x', $date);
        return [
            'price' => $model->where('type', 0)->get(),
            'volume' => $model->where('type', 1)->get(),
            'vol10' => $model->where('type', 2)->get()
        ];
    }

    /**
     * @inheritdoc
     */
    public function clear()
    {
        return Vps::truncate();
    }
}
