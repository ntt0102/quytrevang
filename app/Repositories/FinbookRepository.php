<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\Finbook;

class FinbookRepository extends CoreRepository
{
    /**
     * @var Finbook
     */
    protected $model;

    /**
     * FinbookRepository constructor.
     *
     * @param Finbook $model
     */
    public function __construct(Finbook $model)
    {
        parent::__construct($model);
    }
}
