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
     * Get config
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getconfig(Request $request)
    {
        $data = $this->smartOrderService->getconfig($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * Get config
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getBackground(Request $request)
    {
        $data = $this->smartOrderService->getBackground($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * Set option
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function setConfig(Request $request)
    {
        $data = $this->smartOrderService->setConfig($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * Get Chart Data
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getChartData(Request $request)
    {
        $data = $this->smartOrderService->getChartData($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
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
        $data = $this->smartOrderService->report($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }
}
