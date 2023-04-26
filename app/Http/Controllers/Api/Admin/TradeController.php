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
}
