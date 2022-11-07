<?php

namespace App\Services\Admin;

use App\Services\CoreService;
use App\Repositories\UserRepository;
use App\Repositories\RoleRepository;
use App\Repositories\PermissionRepository;
use App\Repositories\ParameterRepository;
use Illuminate\Support\Facades\Storage;
use App\Events\AdminBroadcastEvent;
use App\Notifications\ConfirmedUserNotification;


class UserService extends CoreService
{
    private $userRepository;
    private $roleRepository;
    private $permissionRepository;
    private $parameterRepository;


    public function __construct(
        UserRepository $userRepository,
        RoleRepository $roleRepository,
        PermissionRepository $permissionRepository,
        ParameterRepository $parameterRepository
    ) {
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
        $this->permissionRepository = $permissionRepository;
        $this->parameterRepository = $parameterRepository;
    }

    /**
     * Return all the users.
     *
     * @return array
     */
    public function fetch()
    {
        $users = $this->userRepository->where([['deleted_at', NULL]]);
        $users = $users->map(function ($user) {
            $user->roles = $user->roles()->get()->pluck('name');
            $user->permissions = $user->permissions()->get()->pluck('name');
            return $user;
        });
        $deletedUsers = $this->userRepository->findTrashedAll(['id', 'code', 'name', 'phone', 'deleted_at']);
        return [
            'users' => $users,
            'deletedUsers' => $deletedUsers,
            'allRolesName' => $this->roleRepository->findAll()->pluck('name'),
            'allPermissionsName' => $this->permissionRepository->findAll()->pluck('name')
        ];
    }

    /**
     * Save user.
     * 
     * @param $request
     * 
     */
    public function save($request)
    {
        return $this->transaction(function () use ($request) {
            foreach ($request->changes as $change) {
                $response = [];
                if (in_array($change['type'], ["insert", "update"])) {
                    $data = [
                        "name" => $change['data']['name'],
                        "sex" => $change['data']['sex'],
                        "birthday" => $change['data']['birthday'],
                        "identity" => $change['data']['identity'],
                        "phone" => $change['data']['phone'],
                        "email" => $change['data']['email'],
                        "address" => $change['data']['address'],
                        "bank_account" => $change['data']['bank_account'],
                    ];
                }
                switch ($change['type']) {
                    case 'insert':
                        $data = array_merge($data, [
                            'code' => $this->userRepository->generateUniqueCode(),
                            "password" => bcrypt($change['data']['phone']),
                        ]);
                        $user = $this->userRepository->create($data);
                        if ($request->user()->can('system@control')) {
                            $user->syncRoles($change['data']['roles']);
                            $user->syncPermissions($change['data']['permissions']);
                        } else $user->assignRole('user');
                        $response['isOk'] = !!$user;
                        break;

                    case 'update':
                        $user = $this->userRepository->findByCode($change['key']);
                        if ($user->level <= 4 || $request->user()->can('system@control')) {
                            $response['isOk'] = $this->userRepository->update($user, $data);
                            if ($request->user()->can('system@control')) {
                                $user->syncRoles($change['data']['roles']);
                                $user->syncPermissions($change['data']['permissions']);
                            }
                        } else $response = ['isOk' => false, 'message' => 'forbidden'];
                        break;

                    case 'remove':
                        $user = $this->userRepository->findByCode($change['key']);
                        if ($user->level <= 6) {
                            $response['isOk'] = $this->userRepository->delete($user);
                        } else $response = ['isOk' => false, 'message' => 'hasOpeningContract', 'param' => $user->code];
                        break;
                }
                if (!$response['isOk']) break;
            }
            return $response;
        });
    }

    /**
     * Save deleted user.
     * 
     * @param $request
     * 
     */
    public function saveDeletedUser($request)
    {
        return $this->transaction(function () use ($request) {
            foreach ($request->changes as $change) {
                switch ($change['type']) {
                    case 'update':
                        $this->userRepository->restore($change['key']);
                        break;

                    case 'remove':
                        $user = $this->userRepository->findByIdWithTrashed($change['key']);
                        $path = 'public/' . md5($user->code);
                        if (Storage::exists($path)) {
                            Storage::deleteDirectory($path);
                        }
                        $this->userRepository->forceDelete($change['key']);
                        break;
                }
            }
            return ['isOk' => true];
        });
    }

    /**
     * Upload documents.
     * 
     * @param $request
     * 
     */
    public function uploadDocuments($request)
    {
        return $this->transaction(function () use ($request) {
            $user = $this->userRepository->findById((int) $request->userId);
            if (in_array($user->level, [4, 5]) || $request->user()->can('system@control')) {
                $isFirstUpload = count($user->documents) == 0;
                $path = 'public/' . md5($user->code) . '/u/d/';

                $documents = $this->saveImage(
                    $user->documents,
                    $request->file('contractImages'),
                    $path,
                    'contract',
                    $request->hasfile('contractImages'),
                    $request->isContractDelete == 'true'
                );
                $documents = $this->saveImage(
                    $documents,
                    $request->file('identityImages'),
                    $path,
                    'identity',
                    $request->hasfile('identityImages'),
                    $request->isIdentityDelete == 'true'
                );

                $isOk = $this->userRepository->update($user, ['documents' => $documents]);
                //
                if ($isOk && $isFirstUpload) {
                    $user->notify(new ConfirmedUserNotification());
                    event(new AdminBroadcastEvent('users'));
                }

                return ['isOk' => $isOk];
            } else return ['isOk' => false, 'message' => 'forbidden'];
        });
    }

    /**
     * Delete image
     */
    private function saveImage($documents, $files, $path, $type, $hasFile, $isDelete)
    {
        $temp = [];
        if ($isDelete) {
            foreach ($documents as $image) {
                if ($image['type'] == $type) {
                    if (Storage::exists($path . $image['file'])) Storage::delete($path . $image['file']);
                } else $temp[] = $image;
            }
        } else $temp = $documents;

        if ($hasFile) {
            foreach ($files as $index => $file) {
                $name = md5($type . time() . $index) . '.png';
                $file->storeAs($path, $name);
                $temp[] = [
                    'type' => $type,
                    'file' => $name
                ];
            }
        }

        return $temp;
    }

    /**
     * Validate Duplicate
     * 
     * @param $request
     */
    public function validateDuplicate($request)
    {
        $field = $request->field;
        if ($field == 'id_number')
            $users = $this->userRepository->whereJsonContains('identity', ['number' => $request[$field]]);
        else $users = $this->userRepository->where([[$field, $request[$field]]]);
        return count($users) == 0;
    }

    /**
     * get contract info
     * 
     * @param $request
     */
    public function getContractInfo($request)
    {
        $pCode = (int) $this->parameterRepository->getValue('representUser');
        $ret['representUser'] = $this->userRepository->findByCode($pCode);
        $ret['interestRate'] = (float) $this->parameterRepository->getValue('interestRate');
        $ret['principalMin'] = (int) $this->parameterRepository->getValue('principalMin');
        $ret['holdWeeksMin'] = (int) $this->parameterRepository->getValue('holdWeeksMin');
        return $ret;
    }
}
