<?php

namespace App\Services\Admin\Setting;

use App\Services\CoreService;
use App\Repositories\RoleRepository;
use App\Repositories\PermissionRepository;


class RoleService extends CoreService
{
    private $roleRepository;
    private $permissionRepository;

    public function __construct(RoleRepository $roleRepository, PermissionRepository $permissionRepository)
    {
        $this->roleRepository = $roleRepository;
        $this->permissionRepository = $permissionRepository;
    }

    /**
     * Return all the roles.
     *
     * @return array
     */
    public function fetch()
    {
        $roles = $this->roleRepository->findAll(["id", "name"]);
        $roles = $roles->map(function ($role) {
            $role['permissions'] = $role->permissions()->get()->pluck('name');
            return $role;
        });
        return [
            'roles' => $roles,
            'permissions' => $this->permissionRepository->findAll()->pluck('name')
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
                        $role = $this->roleRepository->create(["name" => $change['data']['name'], 'guard_name' => 'web']);
                        $role->syncPermissions($change['data']['permissions']);
                        $response['isOk'] = !!$role;
                        break;

                    case 'update':
                        $role = $this->roleRepository->findById($change['key']);
                        $response['isOk'] = $this->roleRepository->update($role, ["name" => $change['data']['name']]);
                        $role->syncPermissions($change['data']['permissions']);
                        break;

                    case 'remove':
                        $role = $this->roleRepository->findById($change['key']);
                        $response['isOk'] = $this->roleRepository->delete($role);
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
        $roles = $this->roleRepository->where([['name', $request["name"]]]);
        return count($roles) == 0;
    }
}
