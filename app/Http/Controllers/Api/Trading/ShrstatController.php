<?php

namespace App\Http\Controllers\Api\Trading;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Trading\ShrstatService;

class ShrstatController extends CoreController
{
    protected $shrstatService;

    public function __construct(ShrstatService $shrstatService)
    {
        parent::__construct();
        $this->shrstatService = $shrstatService;
    }

    /**
     * Get the trades
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getData(Request $request)
    {
        $data = $this->shrstatService->getData($this->payload);
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
        $data = $this->shrstatService->getSummary($this->payload);
        return $this->sendResponse($data);
    }
    /**
     * Get the opening
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getOpening(Request $request)
    {
        $data = $this->shrstatService->getOpening($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Get the chart
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getProfitChart(Request $request)
    {
        $data = $this->shrstatService->getProfitChart($this->payload);
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
        $data = $this->shrstatService->save($this->payload);
        return $this->sendResponse($data);
    }
}
