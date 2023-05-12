<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Auth\LoginService;
use LaravelWebauthn\Actions\PrepareCreationData;
use LaravelWebauthn\Actions\ValidateKeyCreation;

class LoginController extends CoreController
{
    protected $loginService;

    public function __construct(LoginService $loginService)
    {
        $this->loginService = $loginService;
    }

    /**
     * Login user and create token
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        if ($request->has('username')) {
            $data = $this->loginService->login($request);
            return $this->sendResponse($data);
        }
        $payload = $this->decrypt($request);
        $data = $this->loginService->login($payload);
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * login webauthn
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function loginWebAuthn(Request $request)
    {
        $data = $this->loginService->loginWebAuthn($request);
        return $this->sendResponse($data);
    }

    /**
     * Register webauthn
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function registerWebAuthn(Request $request)
    {
        $user = $request->user();
        switch ($request->routeAction) {
            case 'attest':
                $data = app(PrepareCreationData::class)($user);
                break;
            case 'verify':
                $data = app(ValidateKeyCreation::class)(
                    $user,
                    $request->only(['id', 'rawId', 'response', 'type']),
                    $user->name
                );

                break;
        }
        // $data = $this->loginService->registerWebAuthn($request);
        return $this->sendResponse($data);
    }

    /**
     * Confirm webauthn
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function confirmWebAuthn(Request $request)
    {
        $data = $this->loginService->confirmWebAuthn($request);
        return $this->sendResponse($data);
    }

    /**
     * Logout user (Revoke the token)
     * 
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $this->loginService->logout($request);
        return $this->sendResponse();
    }

    /**
     * Get the authenticated User
     * 
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function user(Request $request)
    {
        $data = $this->loginService->user();
        return $this->sendResponse($data);
    }

    /**
     * Check the PIN
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function checkPin(Request $request)
    {
        $data = $this->loginService->checkPin($request);
        return $this->sendResponse($data);
    }
}
