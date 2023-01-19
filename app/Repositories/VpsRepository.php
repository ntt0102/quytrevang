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
        return $this->model->get();
        //
    }

    /**
     * @inheritdoc
     */
    public function clear()
    {
        return Vps::truncate();
    }
}
