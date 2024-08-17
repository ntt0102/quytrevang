<?php

namespace App\Http\Controllers\Api\Trading;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Trading\ShareService;

class ShareController extends CoreController
{
    protected $shareService;

    public function __construct(ShareService $shareService)
    {
        parent::__construct();
        $this->shareService = $shareService;
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
        $data = $this->shareService->initChart($this->payload);
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
        $data = $this->shareService->getChart($this->payload);
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
        $data = $this->shareService->cloneSymbols();
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
        $data = $this->shareService->getSymbols();
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
        $data = $this->shareService->filterSymbols($this->payload);
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
        $data = $this->shareService->removeFilterList($this->payload);
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
        $data = $this->shareService->addWatchlist($this->payload);
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
        $data = $this->shareService->deleteWatchlist($this->payload);
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
        $data = $this->shareService->drawTools($this->payload);
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
        $data = $this->shareService->exportStock($request);
        return $this->sendResponseWithoutEncrypt($data);
    }
}
