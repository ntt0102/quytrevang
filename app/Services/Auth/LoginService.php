<?php

namespace App\Services\Auth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Foundation\Application;
use App\Models\User;
use App\Services\Special\WebauthnService;


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
     * @param $request
     *
     * @return array
     */
    public function login($request)
    {
        $username  = $request->username;
        $fieldName = filter_var($username, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';
        $credentials = [
            $fieldName => $username,
            'password' => $request->password
        ];
        if (!Auth::attempt($credentials))
            return ['isOk' => false, 'message' => 'unauthorized'];
        //
        $user = request()->user();
        //
        return $this->createToken($user, $request->rememberMe);
    }

    /**
     * Login via WebAuthn
     * 
     * @param $request
     *
     * @return array
     */
    public function loginWebAuthn($request)
    {
        $webauthn = new WebauthnService(request()->getHost());
        switch ($request->routeAction) {
            case 'assert':
                $username  = $request->username;
                $fieldName = filter_var($username, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';
                $user = User::where($fieldName, $username)->first();
                return [
                    'challenge' => $webauthn->prepareForLogin($user->webauthn),
                    'userId' => $user->id
                ];
                break;
            case 'verify':
                $user = User::find($request->userId);
                $valid = $webauthn->authenticate($request->credentials, $user->webauthn);
                if (!$valid) return ['isOk' => false];
                return $this->createToken($user);
                break;
        }
    }

    /**
     * Register WebAuthn
     * 
     * @param $request
     *
     * @return array
     */
    public function registerWebAuthn($request)
    {
        $webauthn = new WebauthnService(request()->getHost());
        $user = $request->user();
        switch ($request->routeAction) {
            case 'attest':
                return ['challenge' => $webauthn->prepareChallengeForRegistration($user->email, strval($user->id))];
                break;
            case 'verify':
                $user->webauthn = $webauthn->register($request->credentials, null);
                $isOk = $user->save();
                return ['isOk' => $isOk];
                break;
        }
    }

    /**
     * Confirm WebAuthn
     * 
     * @param $request
     *
     * @return array
     */
    public function confirmWebAuthn($request)
    {
        $webauthn = new WebauthnService(request()->getHost());
        $user = $request->user();
        switch ($request->routeAction) {
            case 'assert':
                return ['challenge' => $webauthn->prepareForLogin($user->webauthn)];
                break;
            case 'verify':
                $valid = $webauthn->authenticate($request->credentials, $user->webauthn);
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
        $tokenResult = $user->createToken(config('app.name'));
        $token = $tokenResult->token;
        if ($remember)
            $token->expires_at = date_create()->modify('+7 days');
        else
            $token->expires_at = date_create()->modify('+1 day');
        $token->save();
        return [
            'isOk' => true,
            'message' => null,
            'user' => $user->getAuthInfo(),
            'token' => [
                'expires_at' => date_create($tokenResult->token->expires_at)->format('Y-m-d H:i:s'),
                'access_token' => $tokenResult->accessToken
            ],
            'isMaintenance' => $this->isMaintenance
        ];
    }

    /**
     * Logout user (Revoke the token)
     */
    public function logout($request)
    {
        $request->user()->token()->revoke();
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
     * @param $request
     */
    public function checkPin($request)
    {
        if (Hash::check($request->pin, $request->user()->pin))
            return ['isOk' => true, 'message' => null];
        return ['isOk' => false, 'message' => 'checkPinFail'];
    }
}
