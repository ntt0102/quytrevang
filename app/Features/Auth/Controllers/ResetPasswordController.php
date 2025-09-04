<?php

namespace App\Features\Auth\Controllers;

use App\Http\Controllers\CoreController;
use Illuminate\Http\Request;
use App\Features\Auth\Services\ResetPasswordService;
use App\Features\Auth\Services\ChangePasswordService;

class ResetPasswordController extends CoreController
{
    protected $resetPasswordService;
    protected $changePasswordService;

    public function __construct(ResetPasswordService $resetPasswordService, ChangePasswordService $changePasswordService)
    {
        parent::__construct();
        $this->resetPasswordService = $resetPasswordService;
        $this->changePasswordService = $changePasswordService;
    }

    /**
     * Send password reset link. 
     * 
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function resetPassword(Request $request)
    {
        $data = $this->resetPasswordService->resetPassword($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Validate Exist Email
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function validateExistEmail(Request $request)
    {
        $isOk = $this->resetPasswordService->validateExistEmail($this->payload);
        return $this->sendResponse($isOk);
    }

    /**
     * Handle reset password 
     * 
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function changePassword(Request $request)
    {
        $isOk = $this->changePasswordService->changePassword($this->payload);
        return $this->sendResponse($isOk);
    }
}
