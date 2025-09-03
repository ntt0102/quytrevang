<?php

namespace App\Features\Auth\Services;

use Illuminate\Support\Facades\Password;

class ChangePasswordService
{
    private $authUser;

    /**
     * Handle reset password 
     * 
     * @param  $payload
     */
    public function changePassword($payload)
    {
        $status = Password::reset(
            $payload->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $this->authUser = $user;
                $user->forceFill([
                    'password' => bcrypt($password)
                ])->save();
            }
        );
        if (!($status == Password::PASSWORD_RESET)) return ['isOk' => false, 'message' => 'invalidResetPasswordLink'];

        $tokenResult = $this->authUser->createToken(config('app.name'));
        $token = $tokenResult->token;
        $token->expires_at = date_create()->modify('+1 day');
        $token->save();
        //
        return [
            'isOk' => true,
            'user' => $this->authUser->getAuthInfo(),
            'token' => [
                'expires_at' => date_create($tokenResult->token->expires_at)->format('Y-m-d H:i:s'),
                'access_token' => $tokenResult->accessToken
            ],
        ];
    }
}
