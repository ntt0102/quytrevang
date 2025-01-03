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
     * Set Source
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function setSource(Request $request)
    {
        $data = $this->shareService->setSource($this->payload);
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
     * Get Groups
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getGroups(Request $request)
    {
        $data = $this->shareService->getGroups();
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
        $data = $this->shareService->getSymbols($this->payload->group);
        return $this->sendResponse($data);
    }
    /**
     * Check Symbol
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function checkSymbol(Request $request)
    {
        $data = $this->shareService->checkSymbol($this->payload);
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
     * Add Watchlist
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function changeWatchlist(Request $request)
    {
        $data = $this->shareService->changeWatchlist($this->payload);
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
}
