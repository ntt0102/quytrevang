<?php

namespace App\Services\Auth;

use Illuminate\Support\Facades\Notification;
use App\Notifications\RegisteredUserNotification;
use App\Services\CoreService;
use App\Notifications\VerifyEmailNotification;
use App\Models\User;

class RegisterService extends CoreService
{

    /**
     * Register new user.
     * 
     * @param $request
     *
     * @return array
     */
    public function createAccount($request)
    {
        return $this->transaction(function () use ($request) {
            $data = [
                'code' => User::generateUniqueCode(),
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => bcrypt($request->password),
            ];
            $user = User::create($data);
            if (empty($user)) return ['isOk' => false, 'message' => 'unknow'];
            //
            $user->notify(new VerifyEmailNotification);
            //
            $user->assignRole('user');
            //
            $tokenResult = $user->createToken(config('app.name'));
            $token = $tokenResult->token;
            $token->expires_at = date_create()->modify('+1 day');
            $token->save();

            Notification::send(
                User::permission('users@control')->get(),
                new RegisteredUserNotification($user)
            );

            return [
                'isOk' => true,
                'user' => $user->getAuthInfo(),
                'token' => [
                    'expires_at' => date_create($tokenResult->token->expires_at)->format('Y-m-d H:i:s'),
                    'access_token' => $tokenResult->accessToken
                ]
            ];
        });
    }

    /**
     * Validate Duplicate Email
     * 
     * @param $request
     */
    public function validateDuplicateEmail($request)
    {
        return User::where('email', $request->email)->count() == 0;
    }
}
