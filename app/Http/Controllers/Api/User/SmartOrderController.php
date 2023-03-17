<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\SmartOrderService;

class SmartOrderController extends CoreController
{
    protected $smartOrderService;

    public function __construct(SmartOrderService $smartOrderService)
    {
        $this->smartOrderService = $smartOrderService;
    }

    /**
     * Update Trades
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function report(Request $request)
    {
        $data = $this->smartOrderService->report($request);
        return $this->sendResponse($data);
    }

    /**
     * Check Market Open
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getconfig(Request $request)
    {
        $data = $this->smartOrderService->getconfig($request);
        return $this->sendResponse($data);
    }

    /**
     * get Volume By Price
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getVolumeByPrice(Request $request)
    {
        $data = $this->smartOrderService->getVolumeByPrice();
        return $this->sendResponse($data);
    }

    /**
     * Get, set and Clear Data
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function controlData(Request $request)
    {
        $data = $this->smartOrderService->controlData($request);
        return $this->sendResponse($data);
    }
}
