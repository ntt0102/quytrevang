<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Admin\TradeService;
use App\Services\Admin\ShareService;
use App\Services\Admin\Vn30f1mService;

class TradeController extends CoreController
{
    protected $tradeService;
    protected $shareService;
    protected $vn30f1mService;

    public function __construct(TradeService $tradeService, ShareService $shareService, Vn30f1mService $vn30f1mService)
    {
        $this->tradeService = $tradeService;
        $this->shareService = $shareService;
        $this->vn30f1mService = $vn30f1mService;
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
     * Get Vn30f1m
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function getVn30f1m(Request $request)
    {
        $data = $this->vn30f1mService->getVn30f1m($request);
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
