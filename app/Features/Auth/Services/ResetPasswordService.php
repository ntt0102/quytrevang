<?php

namespace App\Features\Auth\Services;

use Illuminate\Support\Facades\Password;
use App\Models\User;

class ResetPasswordService
{

    /**
     * Send password reset link. 
     * 
     * @param $payload
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword($payload)
    {
        $status = Password::sendResetLink(
            $payload->only('email')
        );
        return ['isOk' => $status == Password::RESET_LINK_SENT, 'message' => 'sendResetPasswordLink'];
    }

    /**
     * Validate Exist Email
     * 
     * @param  $payload
     *
     * @return array
     */
    public function validateExistEmail($payload)
    {
        return User::where('email', $payload->email)->count() > 0;
    }
}
