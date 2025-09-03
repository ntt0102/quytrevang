<?php

namespace App\Features\Setting\Services;

use App\Services\CoreService;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class RoleService extends CoreService
{

    /**
     * Return all the roles.
     *
     * @return array
     */
    public function fetch()
    {
        $roles = Role::select("id", "name")->get();
        $roles = $roles->map(function ($role) {
            $role['permissions'] = $role->permissions()->get()->pluck('name');
            return $role;
        });
        return [
            'roles' => $roles,
            'permissions' => Permission::all()->pluck('name')
        ];
    }

    /**
     * Save role
     * 
     * @param $payload
     * 
     */
    public function save($payload)
    {
        return $this->transaction(function () use ($payload) {
            foreach ($payload->changes as $change) {
                $response = [];
                switch ($change->type) {
                    case 'insert':
                        $role = Role::create(["name" => $change->data->name, 'guard_name' => 'web']);
                        $role->syncPermissions($change->data->permissions);
                        $response['isOk'] = !!$role;
                        break;

                    case 'update':
                        $role = Role::find($change->key);
                        $response['isOk'] = $role->update(["name" => $change->data->name]);
                        $role->syncPermissions($change->data->permissions);
                        break;

                    case 'remove':
                        $role = Role::find($change->key);
                        $response['isOk'] = $role->delete();
                        break;
                }
                if (!$response['isOk']) break;
            }
            return $response;
        });
    }

    /**
     * Validate Duplicate Name
     * 
     * @param \$payload
     */
    public function validateDuplicateName($payload)
    {
        return  Role::where('name', $payload["name"])->count() == 0;
    }
}
