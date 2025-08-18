<?php

namespace App\Http\Controllers\Api\Trading;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Trading\DerivativeService;

class DerivativeController extends CoreController
{
    protected $derivativeService;

    public function __construct(DerivativeService $derivativeService)
    {
        parent::__construct();
        $this->derivativeService = $derivativeService;
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
        $data = $this->derivativeService->getChartData($this->payload);
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
        $data = $this->derivativeService->initChart($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Set Auto Scan
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function setAutoRefresh(Request $request)
    {
        $data = $this->derivativeService->setAutoRefresh($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Set Set Pattern Type
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function setPatternType(Request $request)
    {
        $data = $this->derivativeService->setPatternType($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Set Source
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function setSource(Request $request)
    {
        $data = $this->derivativeService->setSource($this->payload);
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
        $data = $this->derivativeService->getTools(false);
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
        $data = $this->derivativeService->loginVps($this->payload);
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
        $data = $this->derivativeService->getStatus($this->payload);
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
        $data = $this->derivativeService->getAccountInfo($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Get Matched Orders
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getMatchedOrders(Request $request)
    {
        $data = $this->derivativeService->getMatchedOrders($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Get Putted Orders
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getPuttedOrders(Request $request)
    {
        $data = $this->derivativeService->getPuttedOrders($this->payload);
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
        $data = $this->derivativeService->executeOrder($this->payload);
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
        $data = $this->derivativeService->setVpsSession($request);
        return $this->sendResponseWithoutEncrypt($data);
    }

    /**
     * Get the VPS data
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getVpsData(Request $request)
    {
        $data = $this->derivativeService->getVpsData();
        return $this->sendResponse($data);
    }

    /**
     * Get the DNSE data
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getDnseData(Request $request)
    {
        $data = $this->derivativeService->getDnseData();
        return $this->sendResponse($data);
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
        $data = $this->derivativeService->drawTools($this->payload);
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
        $data = $this->derivativeService->report($this->payload);
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
        $data = $this->derivativeService->export($this->payload);
        if ($data['download']) return $this->sendDownload($data);
        return $this->sendResponse($data);
    }

    /**
     * setting
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function setting(Request $request)
    {
        $data = $this->derivativeService->setting($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Clean Old Orders
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function cleanOldOrders(Request $request)
    {
        $data = $this->derivativeService->cleanOldOrders($this->payload);
        return $this->sendResponse($data);
    }
}
