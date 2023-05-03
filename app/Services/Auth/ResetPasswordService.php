<?php

namespace App\Services\Auth;

use Illuminate\Support\Facades\Password;
use App\Repositories\UserRepository;

class ResetPasswordService
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Send password reset link. 
     * 
     * @param $request
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword($request)
    {
        $status = Password::sendResetLink(
            $request->only('email')
        );
        return ['isOk' => $status == Password::RESET_LINK_SENT, 'message' => 'sendResetPasswordLink'];
    }

    /**
     * Validate Exist Email
     * 
     * @param  $request
     *
     * @return array
     */
    public function validateExistEmail($request)
    {
        $users = $this->userRepository->where([['email', $request->email]]);
        return count($users) > 0;
    }
}
