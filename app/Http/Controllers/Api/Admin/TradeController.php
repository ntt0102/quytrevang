<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Admin\TradeService;

class TradeController extends CoreController
{
    protected $tradeService;

    public function __construct(TradeService $tradeService)
    {
        $this->tradeService = $tradeService;
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
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request)
    {
        $data = $this->tradeService->save($request);
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
