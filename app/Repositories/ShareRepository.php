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
    public function getShare()
    {
        return [
            $this->model->where('type', 0)->get(),
            $this->model->where('type', 1)->get(),
            // $this->model->where('type', 2)->get()
        ];
    }

    /**
     * @inheritdoc
     */
    public function clear()
    {
        return Share::truncate();
    }
}
