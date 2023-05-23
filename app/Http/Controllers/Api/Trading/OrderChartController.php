<?php

namespace App\Http\Controllers\Api\Trading;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Trading\OrderChartService;

class OrderChartController extends CoreController
{
    protected $orderChartService;

    public function __construct(OrderChartService $orderChartService)
    {
        $this->orderChartService = $orderChartService;
    }

    /**
     * Get the Chart data
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getChartData(Request $request)
    {
        $data = $this->orderChartService->getChartData($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * Get Status
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getStatus(Request $request)
    {
        $data = $this->orderChartService->getStatus($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * Get Config
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getConfig(Request $request)
    {
        $data = $this->orderChartService->getConfig($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * Set config
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function setConfig(Request $request)
    {
        $data = $this->orderChartService->setConfig($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * Execute Order
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function executeOrder(Request $request)
    {
        $data = $this->orderChartService->executeOrder($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * Execute Order
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function setVpsUserSession(Request $request)
    {
        $data = $this->orderChartService->setVpsUserSession($request);
        return $this->sendResponse($data);
    }
}
