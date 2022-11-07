<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\AppService;
use App\Services\Admin\ContractService;

class AppController extends CoreController
{
    protected $appService;
    protected $contractService;

    public function __construct(AppService $appService, ContractService $contractService)
    {
        $this->appService = $appService;
        $this->contractService = $contractService;
    }

    /**
     * Update Trades
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function updateTrades(Request $request)
    {
        $data = $this->appService->updateTrades($request);
        return $this->sendResponse($data);
    }

    /**
     * Upload AT Image
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function uploadAtImage(Request $request)
    {
        $data = $this->appService->uploadAtImage($request);
        return $this->sendResponse($data);
    }

    /**
     * Check Market Open
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function checkMarketOpen(Request $request)
    {
        $data = $this->appService->checkMarketOpen($request);
        return $this->sendResponse($data);
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
        $data = $this->appService->getPolicyParams($request);
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
        $data = $this->appService->getFaqs($request);
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
        $data = $this->appService->sendComment($request);
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
