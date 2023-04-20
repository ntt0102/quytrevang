<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Admin\OrderChartService;

class OrderChartController extends CoreController
{
    protected $orderChartService;

    public function __construct(OrderChartService $orderChartService)
    {
        $this->orderChartService = $orderChartService;
    }

    /**
     * Get the Chart data
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getChartData(Request $request)
    {
        $data = $this->orderChartService->getChartData($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * Get config
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getconfig(Request $request)
    {
        $data = $this->orderChartService->getconfig($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * Set config
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function setConfig(Request $request)
    {
        $data = $this->orderChartService->setConfig($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }
}
