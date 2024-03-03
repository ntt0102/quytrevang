<?php

namespace App\Http\Controllers\Api\Trading;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Trading\StatisticService;

class StatisticController extends CoreController
{
    protected $statisticService;

    public function __construct(StatisticService $statisticService)
    {
        parent::__construct();
        $this->statisticService = $statisticService;
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
        $data = $this->statisticService->getData($this->payload);
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
        $data = $this->statisticService->getSummary($this->payload);
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
        $data = $this->statisticService->getOpening($this->payload);
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
        $data = $this->statisticService->getChart($this->payload);
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
        $data = $this->statisticService->save($this->payload);
        return $this->sendResponse($data);
    }
}
