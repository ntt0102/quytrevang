<?php

namespace App\Services\User;

use App\Services\CoreService;
use Illuminate\Support\Facades\Notification;
use App\Notifications\ConfirmingUserNotification;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class ProfileService extends CoreService
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Get the profile
     *
     * @param $request
     * 
     * @return \App\Models\User
     */
    public function fetch($request)
    {
        $user = $request->user();
        unset($user->email_verified_at);
        unset($user->roles);
        unset($user->permissions);
        return $user;
    }

    /**
     * Update the profile
     *
     * @param $request
     */
    public function save($request)
    {
        return $this->transaction(
            function () use ($request) {
                $user = $request->user();
                $isFirstUpdate = !$user->phone;
                $data = [
                    'name' => $request->name,
                    'birthday' => $request->birthday,
                    'sex' => $request->sex,
                    'identity' => $request->identity,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'bank_account' => $request->bank_account
                ];
                $isOk = $this->userRepository->update(
                    $user,
                    $data
                );
                if ($isOk && $isFirstUpdate) {
                    Notification::send(
                        $this->userRepository->getUsersHasPermission('users@control'),
                        new ConfirmingUserNotification($request->user())
                    );
                }
                return ['isOk' => $isOk];
            }
        );
    }

    /**
     * Change the password.
     * 
     * @param $request
     */
    public function changePassword($request)
    {
        return $this->transaction(
            function () use ($request) {
                $user = $request->user();
                $isOk =  $this->userRepository->update(
                    $user,
                    ['password' => bcrypt($request->password)]
                );
                return ['isOk' => $isOk];
            }
        );
    }


    /**
     * Change the PIN.
     * 
     * @param $request
     */
    public function changePin($request)
    {
        return $this->transaction(
            function () use ($request) {
                $user = $request->user();
                if ($user->level < 3 || $user->level >= 3 && Hash::check($request->pin, $user->pin)) {
                    $isOk = $this->userRepository->update(
                        $user,
                        ['pin' => bcrypt($request->new_pin)]
                    );
                    return ['isOk' => $isOk];
                } else return ['isOk' => false];
            }
        );
    }

    /**
     * Change the avatar
     *
     * @param $request
     */
    public function changeAvatar($request)
    {
        return $this->transaction(function () use ($request) {
            $user = $request->user();
            $path = 'public/' . md5($user->code) . '/u/a/';
            if (Storage::exists($path . $user->avatar)) Storage::delete($path . $user->avatar);
            $img = $request->avatar;
            $img = str_replace('data:image/png;base64,', '', $img);
            $img = str_replace(' ', '+', $img);
            $imageData = base64_decode($img);
            $filename = md5(time()) . '.png';
            if (Storage::put($path . $filename, $imageData)) {
                $isOk = $user->update(['avatar' => $filename]);
                return [
                    'isOk' => $isOk,
                    'avatar' => $request->user()->url_avatar,
                    'filename' => $filename
                ];
            }
            return ['isOk' => false];
        });
    }

    /**
     * Delete account
     * 
     * @param $request
     */
    public function delete($request)
    {
        return $this->transaction(
            function () use ($request) {
                $user = $request->user();
                if (count($user->contracts->whereNull('withdrawn_at')) === 0) {
                    $isOk = $this->userRepository->delete($user);
                    return ['isOk' => $isOk];
                } else return ['isOk' => false, 'message' => 'hasOpeningContract', 'param' => $user->code];
            }
        );
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
}
