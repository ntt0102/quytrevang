<?php

namespace App\Services\Auth;

use Illuminate\Support\Facades\Notification;
use App\Notifications\RegisteredUserNotification;
use App\Services\CoreService;
use App\Notifications\VerifyEmailNotification;
use App\Models\User;
use Carbon\Carbon;

class RegisterService extends CoreService
{

    /**
     * Register new user.
     * 
     * @param $payload
     *
     * @return array
     */
    public function createAccount($payload)
    {
        return $this->transaction(function () use ($payload) {
            $data = [
                'code' => User::generateUniqueCode(),
                'name' => $payload->name,
                'email' => $payload->email,
                'phone' => $payload->phone,
                'password' => bcrypt($payload->password),
            ];
            $user = User::create($data);
            if (empty($user)) return ['isOk' => false, 'message' => 'unknow'];
            //
            $user->notify(new VerifyEmailNotification);
            //
            $user->assignRole('user');
            //
            $token = $user->createToken(config('app.name'));
            $expiresAt = Carbon::now()->addDays(1);
            $token->accessToken->expires_at = $expiresAt;
            $token->accessToken->save();

            Notification::send(
                User::permission('admin:manage_users')->get(),
                new RegisteredUserNotification($user)
            );

            return [
                'isOk' => true,
                'user' => $user->getAuthInfo(),
                'token' => [
                    'expires_at' => $expiresAt->toDateTimeString(),
                    'access_token' => $token->plainTextToken,
                ]
            ];
        });
    }

    /**
     * Validate Duplicate Email
     * 
     * @param $payload
     */
    public function validateDuplicateEmail($payload)
    {
        return User::where('email', $payload->email)->count() == 0;
    }
}
