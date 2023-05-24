<?php

namespace App\Services\Setting;

use App\Services\CoreService;
use Spatie\Permission\Models\Permission;


class PermissionService extends CoreService
{

    /**
     * Return all the permissions.
     *
     * @return array
     */
    public function fetch()
    {
        return [
            'permissions' => Permission::select("id", "name")->get()
        ];
    }

    /**
     * Save permission.
     * 
     * @param $payload
     * 
     */
    public function save($payload)
    {
        return $this->transaction(function () use ($payload) {
            foreach ($payload->changes as $change) {
                $response = [];
                switch ($change['type']) {
                    case 'insert':
                        $permission = Permission::create(["name" => $change['data']['name'], 'guard_name' => 'web']);
                        $response['isOk'] = !!$permission;
                        break;

                    case 'update':
                        $permission = Permission::find($change['key']);
                        $response['isOk'] = $permission->update(["name" => $change['data']['name']]);
                        break;

                    case 'remove':
                        $permission = Permission::find($change['key']);
                        $response['isOk'] = $permission->delete();
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
        return Permission::where('name', $payload["name"])->count() == 0;
    }
}
