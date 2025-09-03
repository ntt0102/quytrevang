<?php

namespace App\Features\Auth\Controllers;

use App\Http\Controllers\CoreController;
use Illuminate\Http\Request;
use App\Features\Auth\Services\LoginService;

class LoginController extends CoreController
{
    protected $loginService;

    public function __construct(LoginService $loginService)
    {
        parent::__construct();
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
        $data = $this->loginService->login($this->payload);
        return $this->sendResponse($data);
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
        $data = $this->loginService->loginWebAuthn($this->payload);
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
        $data = $this->loginService->registerWebAuthn($this->payload);
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
        $data = $this->loginService->confirmWebAuthn($this->payload);
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
        $data = $this->loginService->logout($this->payload);
        return $this->sendResponse($data);
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
        $data = $this->loginService->checkPin($this->payload);
        return $this->sendResponse($data);
    }
}
