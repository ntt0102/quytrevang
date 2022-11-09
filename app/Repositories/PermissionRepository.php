<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use Spatie\Permission\Models\Permission;

class PermissionRepository extends CoreRepository
{
    /**
     * @var Permission
     */
    protected $model;

    /**
     * PermissionRepository constructor.
     *
     * @param Permission $model
     */
    public function __construct(Permission $model)
    {
        parent::__construct($model);
    }
}
