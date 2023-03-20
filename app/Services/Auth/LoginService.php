<?php

namespace App\Services\Auth;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Foundation\Application;
use DarkGhostHunter\Larapass\Facades\WebAuthn;
use DarkGhostHunter\Larapass\Http\WebAuthnRules;

class LoginService
{
    use WebAuthnRules;

    private $userRepository;
    private $isMaintenance;

    public function __construct(Application $app, UserRepository $userRepository)
    {
        $this->isMaintenance = $app->isDownForMaintenance();
        $this->userRepository = $userRepository;
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
        $username  = request()->username;
        $fieldName = filter_var($username, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';
        request()->merge([$fieldName => $username]);
        $credentials = request([$fieldName, 'password']);
        if (!Auth::attempt($credentials))
            return ['isOk' => false, 'message' => 'unauthorized'];
        //
        $user = $request->user();
        if ($request->chanel == 'SmartOrder') {
            $so = $user->smartOrder;
            if (!$so) return ['isOk' => false, 'message' => 'unsetup'];
            $expires_at = date_create($so->started_at)->add(date_interval_create_from_date_string($so->periods));
            if (date_create() > $expires_at)
                return ['isOk' => false, 'message' => 'expired'];
            if (!in_array($request->deviceId, $so->devices)) {
                if (count($so->devices) >= $so->device_limit)
                    return ['isOk' => false, 'message' => 'deviceLimit'];
                //
                $devices = $so->devices;
                $devices[] = $request->deviceId;
                app(\App\Repositories\SmartOrderRepository::class)->update($so, ['devices' => $devices]);
            }
        }
        //
        return $this->createToken($user, $request->rememberMe);
    }

    /**
     * Login.
     * 
     * @param $request
     *
     * @return array
     */
    public function smartOrderLogin($request)
    {
        $username  = request()->username;
        $fieldName = filter_var($username, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';
        request()->merge([$fieldName => $username]);
        $credentials = request([$fieldName, 'password']);
        if (!Auth::attempt($credentials))
            return ['isOk' => false, 'message' => 'unauthorized'];
        //
        $user = $request->user();
        if ($request->chanel == 'SmartOrder') {
            $so = $user->smartOrder;
            if (!$so) return ['isOk' => false, 'message' => 'unsetup'];
            $expires_at = date_create($so->started_at)->add(date_interval_create_from_date_string($so->periods));
            if (date_create() > $expires_at)
                return ['isOk' => false, 'message' => 'expired'];
            if (!in_array($request->deviceId, $so->devices)) {
                if (count($so->devices) >= $so->device_limit)
                    return ['isOk' => false, 'message' => 'deviceLimit'];
                //
                $devices = $so->devices;
                $devices[] = $request->deviceId;
                app(\App\Repositories\SmartOrderRepository::class)->update($so, ['devices' => $devices]);
            }
        }
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
        switch ($request->routeAction) {
            case 'assert':
                $user = $this->userRepository->findOne([[$request->username, $request->input($request->username)]]);
                try {
                    return WebAuthn::generateAssertion($user);
                } catch (\Throwable $th) {
                    return 'Lỗi';
                }
                break;
            case 'verify':
                if (!$request->id) return ['isOk' => false];
                $user = $this->userRepository->getFromCredentialId($request->id);
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
        $user = $request->user();
        switch ($request->routeAction) {
            case 'attest':
                return WebAuthn::generateAttestation($user);
                break;
            case 'verify':
                $credential = WebAuthn::validateAttestation(
                    $request->all(),
                    $user
                );
                if (!$credential) return ['isOk' => false];
                $user->flushCredentials();
                $user->addCredential($credential);
                return ['isOk' => true];

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
        $user = $request->user();
        switch ($request->routeAction) {
            case 'assert':
                return WebAuthn::generateAssertion($user);
                break;
            case 'verify':
                if (!$request->id) return ['isOk' => false];
                if ($user->hasCredential($request->id))
                    return ['isOk' => true, 'message' => null];
                return ['isOk' => false, 'message' => 'checkPinFail'];
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
        $tokenResult = $this->userRepository->createToken($user);
        $token = $tokenResult->token;
        if ($remember)
            $token->expires_at = date_create()->modify('+7 days');
        else
            $token->expires_at = date_create()->modify('+1 day');
        $token->save();
        return [
            'isOk' => true,
            'message' => null,
            'user' => $this->userRepository->getAuthUser($user),
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
        $this->userRepository->revokeToken($request->user());
    }

    /**
     * Get the authenticated user
     * 
     * @return object $user
     */
    public function user($request)
    {
        return $this->userRepository->getAuthUser($request->user());
    }

    /**
     * Get the authenticated user
     * 
     * @return object $user
     */
    public function smartOrderUser($request)
    {
        return $this->userRepository->getAuthUser($request->user());
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
