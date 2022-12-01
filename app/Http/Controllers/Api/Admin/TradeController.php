<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Admin\TradeService;
use App\Services\Admin\ShareService;

class TradeController extends CoreController
{
    protected $tradeService;
    protected $shareService;

    public function __construct(TradeService $tradeService, ShareService $shareService)
    {
        $this->tradeService = $tradeService;
        $this->shareService = $shareService;
    }

    /**
     * Get the trades
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function fetch(Request $request)
    {
        $data = $this->tradeService->fetch($request);
        return $this->sendResponse($data);
    }

    /**
     * Get the chart
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getChart(Request $request)
    {
        $data = $this->tradeService->getChart($request);
        return $this->sendResponse($data);
    }

    /**
     * Get the summary
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getSummary(Request $request)
    {
        $data = $this->tradeService->getSummary($request);
        return $this->sendResponse($data);
    }

    /**
     * Save changed trades.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request)
    {
        $data = $this->tradeService->save($request);
        return $this->sendResponse($data);
    }

    /**
     * Get Symbol
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function getSymbol(Request $request)
    {
        $data = $this->shareService->getSymbol($request);
        return $this->sendResponse($data);
    }

    /**
     * Get Share
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function getShare(Request $request)
    {
        $data = $this->shareService->getShare($request);
        return $this->sendResponse($data);
    }

    /**
     * Get the flow
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getFlow(Request $request)
    {
        $data = $this->tradeService->getFlow($request);
        return $this->sendResponse($data);
    }

    /**
     * Save changed flow.
     *
     * @param Illuminate\Http\Request $request
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function saveFlow(Request $request)
    {
        $this->tradeService->saveFlow($request);
        return $this->sendResponse();
    }
}
