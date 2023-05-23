<?php

namespace App\Services\Setting;

use App\Services\CoreService;
use App\Repositories\PermissionRepository;


class PermissionService extends CoreService
{
    private $permissionRepository;

    public function __construct(PermissionRepository $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
    }

    /**
     * Return all the permissions.
     *
     * @return array
     */
    public function fetch()
    {
        return [
            'permissions' => $this->permissionRepository->findAll(["id", "name"])
        ];
    }

    /**
     * Save permission.
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
                        $permission = $this->permissionRepository->create(["name" => $change['data']['name'], 'guard_name' => 'web']);
                        $response['isOk'] = !!$permission;
                        break;

                    case 'update':
                        $permission = $this->permissionRepository->findById($change['key']);
                        $response['isOk'] = $this->permissionRepository->update($permission, ["name" => $change['data']['name']]);
                        break;

                    case 'remove':
                        $permission = $this->permissionRepository->findById($change['key']);
                        $response['isOk'] = $this->permissionRepository->delete($permission);
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
        $permissions = $this->permissionRepository->where([['name', $request["name"]]]);
        return count($permissions) == 0;
    }
}
