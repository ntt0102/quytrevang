<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\SoOrder;

class SoOrderRepository extends CoreRepository
{
    /**
     * @var SoOrder
     */
    protected $model;

    /**
     * SoOrderRepository constructor.
     *
     * @param SoOrder $model
     */
    public function __construct(SoOrder $model)
    {
        parent::__construct($model);
    }
}
