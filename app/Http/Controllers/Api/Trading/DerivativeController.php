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
    public function setAutoScan(Request $request)
    {
        $data = $this->derivativeService->setAutoScan($this->payload);
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
     * Close Position
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function closePosition(Request $request)
    {
        $data = $this->derivativeService->closePosition($this->payload);
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
     * loginDnse
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function loginDnse(Request $request)
    {
        $data = $this->derivativeService->loginDnse($this->payload);
        return $this->sendResponse($data);
    }
}
