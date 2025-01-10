<?php

namespace App\Services\Auth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Foundation\Application;
use App\Models\User;
use App\Services\Special\WebauthnService;
use Carbon\Carbon;


class LoginService
{

    private $isMaintenance;

    public function __construct(Application $app)
    {
        $this->isMaintenance = $app->isDownForMaintenance();
    }



    /**
     * Login.
     * 
     * @param $payload
     *
     * @return array
     */
    public function login($payload)
    {
        $username  = $payload->username;
        $fieldName = filter_var($username, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';
        $credentials = [
            $fieldName => $username,
            'password' => $payload->password
        ];
        if (!Auth::attempt($credentials))
            return ['isOk' => false, 'message' => 'unauthorized'];
        //
        $user = request()->user();
        //
        return $this->createToken($user, $payload->rememberMe);
    }

    /**
     * Login via WebAuthn
     * 
     * @param $payload
     *
     * @return array
     */
    public function loginWebAuthn($payload)
    {
        $webauthn = new WebauthnService(request()->getHost());
        switch ($payload->routeAction) {
            case 'assert':
                $username  = $payload->username;
                $fieldName = filter_var($username, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';
                $user = User::where($fieldName, $username)->first();
                return [
                    'challenge' => $webauthn->prepareForLogin($user->webauthn),
                    'userId' => $user->id
                ];
                break;
            case 'verify':
                $user = User::find($payload->userId);
                $valid = $webauthn->authenticate($payload->credentials, $user->webauthn);
                if (!$valid) return ['isOk' => false];
                return $this->createToken($user);
                break;
        }
    }

    /**
     * Register WebAuthn
     * 
     * @param $payload
     *
     * @return array
     */
    public function registerWebAuthn($payload)
    {
        $webauthn = new WebauthnService(request()->getHost());
        $user = request()->user();
        switch ($payload->routeAction) {
            case 'attest':
                return ['challenge' => $webauthn->prepareChallengeForRegistration($user->email, strval($user->id))];
                break;
            case 'verify':
                $user->webauthn = $webauthn->register($payload->credentials, null);
                $isOk = $user->save();
                return ['isOk' => $isOk];
                break;
        }
    }

    /**
     * Confirm WebAuthn
     * 
     * @param $payload
     *
     * @return array
     */
    public function confirmWebAuthn($payload)
    {
        $webauthn = new WebauthnService(request()->getHost());
        $user = request()->user();
        switch ($payload->routeAction) {
            case 'assert':
                return ['challenge' => $webauthn->prepareForLogin($user->webauthn)];
                break;
            case 'verify':
                $valid = $webauthn->authenticate($payload->credentials, $user->webauthn);
                if (!$valid) return ['isOk' => false, 'message' => 'checkPinFail'];
                return ['isOk' => true];
                break;
        }
    }

    /**
     * Create token
     * 
     * @param App\Models\User $user
     * @param boolean $remember
     */
    private function createToken($user, $remember = false)
    {
        $token = $user->createToken($user->code);
        $expiresDays = $remember ? 7 : 1;
        $expiresAt = Carbon::now()->addDays($expiresDays);
        $token->accessToken->expires_at = $expiresAt;
        $token->accessToken->save();

        return [
            'isOk' => true,
            'message' => null,
            'user' => $user->getAuthInfo(),
            'token' => [
                'expires_at' => $expiresAt->toDateTimeString(),
                'access_token' => $token->plainTextToken,
            ],
            'isMaintenance' => $this->isMaintenance
        ];
    }

    /**
     * Logout user (Revoke the token)
     */
    public function logout($payload)
    {
        return request()->user()->currentAccessToken()->delete();
    }

    /**
     * Get the authenticated user
     * 
     * @return object $user
     */
    public function user()
    {
        return request()->user()->getAuthInfo();
    }

    /**
     * Check the PIN.
     * 
     * @param $payload
     */
    public function checkPin($payload)
    {
        if (Hash::check($payload->pin, request()->user()->pin))
            return ['isOk' => true, 'message' => null];
        return ['isOk' => false, 'message' => 'checkPinFail'];
    }
}
