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
    public function getVps()
    {
        return [
            $this->model->where('type', 0)->get(),
            $this->model->where('type', 1)->get(),
            $this->model->where('type', 2)->get(),
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
