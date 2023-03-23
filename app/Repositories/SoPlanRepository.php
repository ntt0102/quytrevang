<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\SoPlan;

class SoPlanRepository extends CoreRepository
{
    /**
     * @var SoPlan
     */
    protected $model;

    /**
     * SoPlanRepository constructor.
     *
     * @param SoPlan $model
     */
    public function __construct(SoPlan $model)
    {
        parent::__construct($model);
    }
}
