<?php

namespace App\Features\Auth\Controllers;

use App\Http\Controllers\CoreController;
use Illuminate\Http\Request;
use App\Features\Auth\Services\RegisterService;

class RegisterController extends CoreController
{
    protected $registerService;

    public function __construct(RegisterService $registerService)
    {
        parent::__construct();
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
            $data = $this->registerService->createAccount($this->payload);
            return $this->sendResponse($data);
        }
        $payload = $this->decrypt($this->payload);
        $data = $this->registerService->createAccount($payload);
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
        $isOk = $this->registerService->validateDuplicateEmail($this->payload);
        return $this->sendResponse($isOk);
    }
}
