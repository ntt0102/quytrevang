<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Auth\RegisterService;

class RegisterController extends CoreController
{
    protected $registerService;

    public function __construct(RegisterService $registerService)
    {
        $this->registerService = $registerService;
    }

    /**
     * Create user
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function createAccount(Request $request)
    {
        $payload = $this->decrypt($request);
        $data = $this->registerService->createAccount($payload);
        if ($payload->chanel == 'SmartOrder')
            return $this->sendResponse($this->encrypt($data));
        return $this->sendResponse($data);
    }

    /**
     * Validate Duplicate Email
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function validateDuplicateEmail(Request $request)
    {
        $isOk = $this->registerService->validateDuplicateEmail($request);
        return $this->sendResponse($isOk);
    }
}
