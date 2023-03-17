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
     * Get config
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
     * Set option
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function setOption(Request $request)
    {
        $data = $this->smartOrderService->setOption($request);
        return $this->sendResponse($data);
    }

    /**
     * Get, set and Clear Data
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getChartData(Request $request)
    {
        $data = $this->smartOrderService->getChartData($request);
        return $this->sendResponse($data);
    }
}
