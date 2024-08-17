<?php

namespace App\Services\User;

use App\Services\CoreService;
use Illuminate\Support\Facades\Notification;
use App\Notifications\ConfirmingUserNotification;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class ProfileService extends CoreService
{

    /**
     * Get the profile
     *
     * @param $payload
     * 
     * @return \App\Models\User
     */
    public function fetch($payload)
    {
        $user = request()->user();
        unset($user->email_verified_at);
        unset($user->roles);
        unset($user->permissions);
        return $user;
    }

    /**
     * Update the profile
     *
     * @param $payload
     */
    public function save($payload)
    {
        return $this->transaction(
            function () use ($payload) {
                $user = request()->user();
                $isFirstUpdate = !$user->phone;
                $data = [
                    'name' => $payload->name,
                    'birthday' => $payload->birthday,
                    'sex' => $payload->sex,
                    'identity' => $payload->identity,
                    'email' => $payload->email,
                    'phone' => $payload->phone,
                    'address' => $payload->address,
                    'bank_account' => $payload->bank_account
                ];
                $isOk = $user->update($data);
                if ($isOk && $isFirstUpdate) {
                    Notification::send(
                        User::permission('admin:manage_users')->get(),
                        new ConfirmingUserNotification(request()->user())
                    );
                }
                return ['isOk' => $isOk];
            }
        );
    }

    /**
     * Change the password.
     * 
     * @param $payload
     */
    public function changePassword($payload)
    {
        return $this->transaction(
            function () use ($payload) {
                $user = request()->user();
                $isOk =   $user->update(
                    ['password' => bcrypt($payload->password)]
                );
                return ['isOk' => $isOk];
            }
        );
    }


    /**
     * Change the PIN.
     * 
     * @param $payload
     */
    public function changePin($payload)
    {
        return $this->transaction(
            function () use ($payload) {
                $user = request()->user();
                if ($user->level < 3 || $user->level >= 3 && Hash::check($payload->pin, $user->pin)) {
                    $isOk =  $user->update(
                        ['pin' => bcrypt($payload->new_pin)]
                    );
                    return ['isOk' => $isOk];
                } else return ['isOk' => false];
            }
        );
    }

    /**
     * Change the avatar
     *
     * @param $payload
     */
    public function changeAvatar($payload)
    {
        return $this->transaction(function () use ($payload) {
            $user = request()->user();
            $path = 'public/' . md5($user->code) . '/u/a/';
            if (Storage::exists($path . $user->avatar)) Storage::delete($path . $user->avatar);
            $img = $payload->avatar;
            $img = str_replace('data:image/png;base64,', '', $img);
            $img = str_replace(' ', '+', $img);
            $imageData = base64_decode($img);
            $filename = md5(time()) . '.png';
            if (Storage::put($path . $filename, $imageData)) {
                $isOk = $user->update(['avatar' => $filename]);
                return [
                    'isOk' => $isOk,
                    'avatar' => request()->user()->url_avatar,
                    'filename' => $filename
                ];
            }
            return ['isOk' => false];
        });
    }

    /**
     * Delete account
     * 
     * @param $payload
     */
    public function delete($payload)
    {
        return $this->transaction(
            function () use ($payload) {
                $user = request()->user();
                if (count($user->contracts->whereNull('withdrawn_at')) === 0) {
                    $isOk =  $user->delete();
                    return ['isOk' => $isOk];
                } else return ['isOk' => false, 'message' => 'hasOpeningContract', 'param' => $user->code];
            }
        );
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
}
