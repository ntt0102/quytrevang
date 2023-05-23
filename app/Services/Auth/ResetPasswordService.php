<?php

namespace App\Services\Auth;

use Illuminate\Support\Facades\Password;
use App\Models\User;

class ResetPasswordService
{

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
        return User::where('email', $request->email)->count() > 0;
    }
}
