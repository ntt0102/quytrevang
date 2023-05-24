<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Auth\VerificationService;

class VerificationController extends CoreController
{
    protected $verificationService;

    public function __construct(VerificationService $verificationService)
    {
        parent::__construct();
        $this->verificationService = $verificationService;
    }

    /**
     * Resend the email verification notification.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function resend(Request $request)
    {
        $data = $this->verificationService->resend($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function verify(Request $request)
    {
        $data = $this->verificationService->verify($this->payload);
        return $this->sendResponse($data);
    }
}
