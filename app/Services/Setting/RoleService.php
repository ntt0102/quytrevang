<?php

namespace App\Services\Setting;

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
     * @param $request
     * 
     */
    public function save($request)
    {
        return $this->transaction(function () use ($request) {
            foreach ($request->changes as $change) {
                $response = [];
                switch ($change['type']) {
                    case 'insert':
                        $role = Role::create(["name" => $change['data']['name'], 'guard_name' => 'web']);
                        $role->syncPermissions($change['data']['permissions']);
                        $response['isOk'] = !!$role;
                        break;

                    case 'update':
                        $role = Role::find($change['key']);
                        $response['isOk'] = $role->update(["name" => $change['data']['name']]);
                        $role->syncPermissions($change['data']['permissions']);
                        break;

                    case 'remove':
                        $role = Role::find($change['key']);
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
     * @param \$request
     */
    public function validateDuplicateName($request)
    {
        return  Role::where('name', $request["name"])->count() == 0;
    }
}
