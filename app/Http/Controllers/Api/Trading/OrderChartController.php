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
        parent::__construct();
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
        $data = $this->orderChartService->getChartData($this->payload);
        return $this->sendResponse($data);
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
        $data = $this->orderChartService->getConfig($this->payload);
        return $this->sendResponse($data);
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
        $data = $this->orderChartService->getStatus($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Get Account Info
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getAccountInfo(Request $request)
    {
        $data = $this->orderChartService->getAccountInfo($this->payload);
        return $this->sendResponse($data);
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
        $data = $this->orderChartService->executeOrder($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Get Copyist Status
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getCopyistStatus(Request $request)
    {
        $data = $this->orderChartService->getCopyistStatus($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Close Position
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function closePosition(Request $request)
    {
        $data = $this->orderChartService->closePosition($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Set Vps Session
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function setCopyistSession(Request $request)
    {
        $data = $this->orderChartService->setCopyistSession($request);
        return $this->sendResponseWithoutEncrypt($data);
    }
}
