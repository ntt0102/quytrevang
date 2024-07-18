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
     * Init Chart
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function initChart(Request $request)
    {
        $data = $this->stockService->initChart($this->payload);
        return $this->sendResponse($data);
    }
    /**
     * Get the Chart data
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getChart(Request $request)
    {
        $data = $this->stockService->getChart($this->payload);
        return $this->sendResponse($data);
    }
    /**
     * Request Export Stock
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function requestExportStock(Request $request)
    {
        $data = $this->stockService->requestExportStock();
        return $this->sendResponse($data);
    }

    /**
     * Clone the symbols
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function cloneSymbols(Request $request)
    {
        $data = $this->stockService->cloneSymbols();
        return $this->sendResponse($data);
    }
    /**
     * Get the symbols
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getSymbols(Request $request)
    {
        $data = $this->stockService->getSymbols();
        return $this->sendResponse($data);
    }
    /**
     * Filter Symbols
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function filterSymbols(Request $request)
    {
        $data = $this->stockService->filterSymbols($this->payload);
        return $this->sendResponse($data);
    }
    /**
     * Remove Filter List
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function removeFilterList(Request $request)
    {
        $data = $this->stockService->removeFilterList($this->payload);
        return $this->sendResponse($data);
    }
    /**
     * Add Watchlist
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function addWatchlist(Request $request)
    {
        $data = $this->stockService->addWatchlist($this->payload);
        return $this->sendResponse($data);
    }
    /**
     * Delete Watchlist
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function deleteWatchlist(Request $request)
    {
        $data = $this->stockService->deleteWatchlist($this->payload);
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
        $data = $this->stockService->drawTools($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Export Stock
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function exportStock(Request $request)
    {
        $data = $this->stockService->exportStock($request);
        return $this->sendResponseWithoutEncrypt($data);
    }
}
