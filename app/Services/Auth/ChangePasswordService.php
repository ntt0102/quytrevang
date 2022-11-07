<?php

namespace App\Services\Auth;

use App\Repositories\UserRepository;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Support\Facades\Password;

class ChangePasswordService
{
    use ResetsPasswords;

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
        $response = Password::broker()->reset(
            $request->only(
                'password',
                'password_confirmation',
                'token'
            ),
            function ($user, $password) {
                $this->authUser = $user;
                $this->userRepository->update($user, ['password' => bcrypt($password)]);
            }
        );
        if (!($response == Password::PASSWORD_RESET)) return ['isOk' => false, 'message' => 'invalidResetPasswordLink'];

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
