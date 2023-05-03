<?php

namespace App\Services\Auth;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Password;

class ChangePasswordService
{
    private $authUser;
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Handle reset password 
     * 
     * @param  $request
     */
    public function changePassword($request)
    {
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $this->authUser = $user;
                $user->forceFill([
                    'password' => bcrypt($password)
                ])->save();
            }
        );
        if (!($status == Password::PASSWORD_RESET)) return ['isOk' => false, 'message' => 'invalidResetPasswordLink'];

        $tokenResult = $this->userRepository->createToken($this->authUser);
        $token = $tokenResult->token;
        $token->expires_at = date_create()->modify('+1 day');
        $token->save();
        //
        return [
            'isOk' => true,
            'user' => $this->userRepository->getAuthUser($this->authUser),
            'token' => [
                'expires_at' => date_create($tokenResult->token->expires_at)->format('Y-m-d H:i:s'),
                'access_token' => $tokenResult->accessToken
            ],
        ];
    }
}
