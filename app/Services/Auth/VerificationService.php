<?php

namespace App\Services\Auth;

use App\Services\CoreService;
use App\Repositories\UserRepository;
use Illuminate\Foundation\Auth\RegistersUsers;

class VerificationService extends CoreService
{
    use RegistersUsers;

    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

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

            if (!$this->userRepository->hasVerifiedEmail($user))
                $this->userRepository->markEmailAsVerified($user);

            return [
                'isOk' => true,
                'message' => null,
                'user' => $this->userRepository->getAuthUser($user),
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
        if ($this->userRepository->hasVerifiedEmail($request->user()))
            return ['isOk' => true, 'message' => 'verifiedEmail'];

        $this->userRepository->sendEmailVerificationNotification($request->user());
        return ['isOk' => true, 'message' => 'sentVerifyEmailLink'];
    }
}
