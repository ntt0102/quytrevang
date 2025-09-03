<?php

namespace App\Features\Auth\Services;

use App\Services\CoreService;
use App\Notifications\VerifyEmailNotification;
// use Illuminate\Foundation\Auth\RegistersUsers;

class VerificationService extends CoreService
{
    // use RegistersUsers;

    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param $payload
     */
    public function verify($payload)
    {
        return $this->transaction(function () use ($payload) {
            $user = request()->user();

            if ($payload->route('id') != $user->id || time() > $payload->expires || !$payload->hasValidSignature())
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
     * @param $payload
     * @return bool
     */
    public function resend($payload)
    {
        $user = request()->user();
        if ($user->hasVerifiedEmail())
            return ['isOk' => true, 'message' => 'verifiedEmail'];

        $user->notify(new VerifyEmailNotification);
        return ['isOk' => true, 'message' => 'sentVerifyEmailLink'];
    }
}
