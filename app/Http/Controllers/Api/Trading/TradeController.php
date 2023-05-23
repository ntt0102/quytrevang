<?php

namespace App\Http\Controllers\Api\Trading;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Trading\TradeService;

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
        $data = $this->tradeService->fetch($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
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
        $data = $this->tradeService->getChart($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
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
        $data = $this->tradeService->getSummary($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
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
        $data = $this->tradeService->save($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * validate Duplicate Date
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function validateDuplicateDate(Request $request)
    {
        $data = $this->tradeService->validateDuplicateDate($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }
}
