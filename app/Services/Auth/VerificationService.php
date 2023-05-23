<?php

namespace App\Services\Auth;

use App\Services\CoreService;
use App\Notifications\VerifyEmailNotification;
// use Illuminate\Foundation\Auth\RegistersUsers;

class VerificationService extends CoreService
{
    // use RegistersUsers;

    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param $request
     */
    public function verify($request)
    {
        return $this->transaction(function () use ($request) {
            $user = $request->user();

            if ($request->route('id') != $user->id || time() > $request->expires || !$request->hasValidSignature())
                return ['isOk' => false, 'message' => 'invalidVerifyEmailLink'];

            if (!$user->hasVerifiedEmail())
                $user->markEmailAsVerified();

            return [
                'isOk' => true,
                'message' => null,
                'user' => $user->getAuthInfo(),
            ];
        });
    }

    /**
     * Resend the email verification notification.
     *
     * @param $request
     * @return bool
     */
    public function resend($request)
    {
        $user = $request->user();
        if ($user->hasVerifiedEmail())
            return ['isOk' => true, 'message' => 'verifiedEmail'];

        $user->notify(new VerifyEmailNotification);
        return ['isOk' => true, 'message' => 'sentVerifyEmailLink'];
    }
}
