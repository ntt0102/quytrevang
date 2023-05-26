<?php

namespace App\Services\Admin;

use App\Services\CoreService;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\Parameter;
use Illuminate\Support\Facades\Storage;
use App\Events\AdminBroadcastEvent;
use App\Notifications\ConfirmedUserNotification;


class UserService extends CoreService
{

    /**
     * Return all the users.
     *
     * @return array
     */
    public function fetch()
    {
        $users = User::where('deleted_at', NULL)->orderBy('id', 'desc')->get();
        $users = $users->map(function ($user) {
            $user->roles = $user->roles()->get()->pluck('name');
            $user->permissions = $user->permissions()->get()->pluck('name');
            return $user;
        });
        $deletedUsers = User::onlyTrashed()->get(['id', 'code', 'name', 'phone', 'deleted_at']);
        return [
            'users' => $users,
            'deletedUsers' => $deletedUsers,
            'allRolesName' => Role::all()->pluck('name'),
            'allPermissionsName' => Permission::all()->pluck('name')
        ];
    }

    /**
     * Save user.
     * 
     * @param $payload
     * 
     */
    public function save($payload)
    {
        return $this->transaction(function () use ($payload) {
            foreach ($payload->changes as $change) {
                $response = [];
                if (in_array($change->type, ["insert", "update"])) {
                    $data = [
                        "name" => $change->data->name,
                        "sex" => $change->data->sex,
                        "birthday" => $change->data->birthday,
                        "identity" => $change->data->identity,
                        "phone" => $change->data->phone,
                        "email" => $change->data->email,
                        "address" => $change->data->address,
                        "bank_account" => $change->data->bank_account,
                    ];
                }
                switch ($change->type) {
                    case 'insert':
                        $data = array_merge($data, [
                            'code' => User::generateUniqueCode(),
                            "password" => bcrypt($change->data->phone),
                        ]);
                        $user = User::create($data);
                        if (request()->user()->can('system@control')) {
                            $user->syncRoles($change->data->roles);
                            $user->syncPermissions($change->data->permissions);
                        } else $user->assignRole('user');
                        $response['isOk'] = !!$user;
                        break;

                    case 'update':
                        $user = User::where('code', $change->key)->first();
                        if ($user->level <= 4 || request()->user()->can('system@control')) {
                            $response['isOk'] = $user->update($data);
                            if (request()->user()->can('system@control')) {
                                $user->syncRoles($change->data->roles);
                                $user->syncPermissions($change->data->permissions);
                            }
                        } else $response = ['isOk' => false, 'message' => 'forbidden'];
                        break;

                    case 'remove':
                        $user = User::where('code', $change->key)->first();
                        if ($user->level <= 6) {
                            $response['isOk'] = $user->delete();
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
     * @param $payload
     * 
     */
    public function saveDeletedUser($payload)
    {
        return $this->transaction(function () use ($payload) {
            foreach ($payload->changes as $change) {
                switch ($change->type) {
                    case 'update':
                        User::withTrashed()->findOrFail($change->key)->restore();
                        break;

                    case 'remove':
                        $user = User::withTrashed()->findOrFail($change->key);
                        $path = 'public/' . md5($user->code);
                        if (Storage::exists($path)) {
                            Storage::deleteDirectory($path);
                        }
                        User::withTrashed()->findOrFail($change->key)->forceDelete();
                        break;
                }
            }
            return ['isOk' => true];
        });
    }

    /**
     * Upload documents.
     * 
     * @param $payload
     * 
     */
    public function uploadDocuments($payload)
    {
        return $this->transaction(function () use ($payload) {
            $user = User::find((int) $payload->userId);
            if (in_array($user->level, [4, 5]) || request()->user()->can('system@control')) {
                $isFirstUpload = count($user->documents) == 0;
                $path = 'public/' . md5($user->code) . '/u/d/';

                $documents = $this->saveImage(
                    $user->documents,
                    $payload->file('contractImages'),
                    $path,
                    'contract',
                    $payload->hasfile('contractImages'),
                    $payload->isContractDelete == 'true'
                );
                $documents = $this->saveImage(
                    $documents,
                    $payload->file('identityImages'),
                    $path,
                    'identity',
                    $payload->hasfile('identityImages'),
                    $payload->isIdentityDelete == 'true'
                );

                $isOk = $user->update(['documents' => $documents]);
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
     * @param $payload
     */
    public function validateDuplicate($payload)
    {
        $field = $payload->field;
        if ($field == 'id_number')
            return User::whereJsonContains('identity', ['number' => $payload[$field]])->count() == 0;
        else return User::where($field, $payload[$field])->count() == 0;
    }

    /**
     * get contract info
     * 
     * @param $payload
     */
    public function getContractInfo($payload)
    {
        $pCode = (int) Parameter::getValue('representUser');
        $ret['representUser'] = User::where('code', $pCode)->first();
        $ret['interestRate'] = (float) Parameter::getValue('interestRate');
        $ret['principalMin'] = (int) Parameter::getValue('principalMin');
        $ret['holdWeeksMin'] = (int) Parameter::getValue('holdWeeksMin');
        return $ret;
    }
}
