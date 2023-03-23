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
        if ($request->has('name')) {
            $data = $this->registerService->createAccount($request);
            return $this->sendResponse($data);
        }
        $payload = $this->decrypt($request);
        $data = $this->registerService->createAccount($payload);
        return $this->sendResponse($this->encrypt($data));
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
