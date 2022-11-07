<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Auth\ResetPasswordService;
use App\Services\Auth\ChangePasswordService;

class ResetPasswordController extends CoreController
{
    protected $resetPasswordService;
    protected $changePasswordService;

    public function __construct(ResetPasswordService $resetPasswordService, ChangePasswordService $changePasswordService)
    {
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
        $data = $this->resetPasswordService->resetPassword($request);
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
        $isOk = $this->resetPasswordService->validateExistEmail($request);
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
        $isOk = $this->changePasswordService->changePassword($request);
        return $this->sendResponse($isOk);
    }
}
