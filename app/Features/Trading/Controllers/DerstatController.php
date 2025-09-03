<?php

namespace App\Features\Trading\Controllers;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Features\Trading\Services\DerstatService;

class DerstatController extends CoreController
{
    protected $derstatService;

    public function __construct(DerstatService $derstatService)
    {
        parent::__construct();
        $this->derstatService = $derstatService;
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
        $data = $this->derstatService->fetch($this->payload);
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
        $data = $this->derstatService->getChart($this->payload);
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
        $data = $this->derstatService->getSummary($this->payload);
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
        $data = $this->derstatService->save($this->payload);
        return $this->sendResponse($data);
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
        $data = $this->derstatService->validateDuplicateDate($this->payload);
        return $this->sendResponse($data);
    }
}
