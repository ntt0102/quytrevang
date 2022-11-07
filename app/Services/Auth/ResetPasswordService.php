<?php

namespace App\Services\Auth;

use Illuminate\Support\Facades\Password;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use App\Repositories\UserRepository;

class ResetPasswordService
{
    use SendsPasswordResetEmails;

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
        $response = Password::broker()->sendResetLink(
            $request->only('email')
        );
        return ['isOk' => $response == Password::RESET_LINK_SENT, 'message' => 'sendResetPasswordLink'];
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
