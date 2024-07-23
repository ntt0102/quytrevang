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
     * Init Chart
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function initChart(Request $request)
    {
        $data = $this->orderChartService->initChart($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Get Tools
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getTools(Request $request)
    {
        $data = $this->orderChartService->getTools(false);
        return $this->sendResponse($data);
    }

    /**
     * Login Vps
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function loginVps(Request $request)
    {
        $data = $this->orderChartService->loginVps($this->payload);
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
    public function setVpsSession(Request $request)
    {
        $data = $this->orderChartService->setVpsSession($request);
        return $this->sendResponseWithoutEncrypt($data);
    }

    /**
     * Draw Tools
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function drawTools(Request $request)
    {
        $data = $this->orderChartService->drawTools($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Report.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function report(Request $request)
    {
        $data = $this->orderChartService->report($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Export.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function export(Request $request)
    {
        $data = $this->orderChartService->export($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * loginDnse
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function loginDnse(Request $request)
    {
        $data = $this->orderChartService->loginDnse($this->payload);
        return $this->sendResponse($data);
    }
}
