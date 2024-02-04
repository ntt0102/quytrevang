<?php

namespace App\Http\Controllers\Api\Trading;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Trading\StockService;

class StockController extends CoreController
{
    protected $stockService;

    public function __construct(StockService $stockService)
    {
        parent::__construct();
        $this->stockService = $stockService;
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
        $data = $this->stockService->getChartData($this->payload);
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
        $data = $this->stockService->getConfig($this->payload);
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
        $data = $this->stockService->getStatus($this->payload);
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
        $data = $this->stockService->getAccountInfo($this->payload);
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
        $data = $this->stockService->executeOrder($this->payload);
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
        $data = $this->stockService->getCopyistStatus($this->payload);
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
        $data = $this->stockService->closePosition($this->payload);
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
        $data = $this->stockService->setCopyistSession($request);
        return $this->sendResponseWithoutEncrypt($data);
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
        $data = $this->stockService->report($this->payload);
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
        $data = $this->stockService->export($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Cashflow.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function cashflow(Request $request)
    {
        $data = $this->stockService->cashflow($this->payload);
        return $this->sendResponse($data);
    }
}
