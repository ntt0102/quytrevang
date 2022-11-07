<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use Spatie\Permission\Models\Role;

class RoleRepository extends CoreRepository
{
    /**
     * @var Role
     */
    protected $model;

    /**
     * RoleRepository constructor.
     *
     * @param Role $model
     */
    public function __construct(Role $model)
    {
        parent::__construct($model);
    }
}
