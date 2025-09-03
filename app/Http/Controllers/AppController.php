<?php

namespace App\Http\Controllers;

use App\Http\Controllers\CoreController;
use Illuminate\Http\Request;
use App\Services\AppService;
use App\Features\Admin\Services\ContractService;

class AppController extends CoreController
{
    protected $appService;
    protected $contractService;

    public function __construct(AppService $appService, ContractService $contractService)
    {
        parent::__construct();
        $this->appService = $appService;
        $this->contractService = $contractService;
    }

    /**
     * Get the policy params
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getPolicyParams(Request $request)
    {
        $data = $this->appService->getPolicyParams($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Get the faqs
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getFaqs(Request $request)
    {
        $data = $this->appService->getFaqs($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Send Comment
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function sendComment(Request $request)
    {
        $data = $this->appService->sendComment($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Get the contact
     *
     * @return \Illuminate\Http\Response
     */
    public function getContact()
    {
        $data = $this->appService->getContact();
        return $this->sendResponse($data);
    }
}
