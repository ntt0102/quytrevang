<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\SmartOrder;

class SmartOrderRepository extends CoreRepository
{
    /**
     * @var SmartOrder
     */
    protected $model;

    /**
     * SmartOrderRepository constructor.
     *
     * @param SmartOrder $model
     */
    public function __construct(SmartOrder $model)
    {
        parent::__construct($model);
    }

    /**
     * @inheritdoc
     */
    public function duplicateDevice($deviceId)
    {
        return count($this->model->whereJsonContains('devices', $deviceId)->get()) > 0;
    }
}
