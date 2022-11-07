<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\Faq;

class FaqRepository extends CoreRepository
{
    /**
     * @var Faq
     */
    protected $model;

    /**
     * FaqRepository constructor.
     *
     * @param Faq $model
     */
    public function __construct(Faq $model)
    {
        parent::__construct($model);
    }
}
