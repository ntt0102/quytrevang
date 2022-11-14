<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\Vps;
use Carbon\Carbon;

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
        if ($date)
            return [
                'price' => $this->model->whereDate('x', $date)->where('type', 0)->get(),
                'volume' => $this->model->whereDate('x', $date)->where('type', 1)->get(),
                'vol10' => $this->model->whereDate('x', $date)->where('type', 2)->get()
            ];
        else
            return [
                'price' => $this->model->where('type', 0)->get(),
                'volume' => $this->model->where('type', 1)->get(),
                'vol10' => $this->model->where('type', 2)->get()
            ];
    }

    /**
     * @inheritdoc
     */
    public function getLastOfType($type)
    {
        return $this->model->whereDate('x', Carbon::today())->where('type', $type)->orderBy('x', 'DESC')->first();
    }

    /**
     * @inheritdoc
     */
    public function clear()
    {
        return Vps::truncate();
    }
}
