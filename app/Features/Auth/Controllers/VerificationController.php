<?php

namespace App\Features\Auth\Controllers;

use App\Http\Controllers\CoreController;
use Illuminate\Http\Request;
use App\Features\Auth\Services\VerificationService;

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
