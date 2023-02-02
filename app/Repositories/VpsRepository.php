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

    /**
     * @inheritdoc
     */
    public function getVolumeByPrice()
    {
        return $this->model->groupBy('price', 'side')
            ->selectRaw('sum(vol) as sum, price, side')
            ->orderBy('price', 'DESC')
            ->get();
        // return $this->model->where('side', $side)
        //     ->groupBy('price')
        //     ->selectRaw('sum(vol) as sum, price')
        //     ->orderBy('price', 'DESC')
        //     ->get();
    }
}
