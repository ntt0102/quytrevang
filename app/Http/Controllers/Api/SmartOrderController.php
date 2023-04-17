<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\SmartOrderService;

class SmartOrderController extends CoreController
{
    protected $smartOrderService;

    public function __construct(SmartOrderService $smartOrderService)
    {
        $this->smartOrderService = $smartOrderService;
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
        $data = $this->smartOrderService->getconfig($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * Get Background
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getBackground(Request $request)
    {
        $data = $this->smartOrderService->getBackground();
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * Get Background
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getWebBackground(Request $request)
    {
        $data = $this->smartOrderService->getBackground();
        return $this->sendResponse($data);
    }

    /**
     * Set option
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function setConfig(Request $request)
    {
        $data = $this->smartOrderService->setConfig($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * Get Chart Data
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getChartData(Request $request)
    {
        $data = $this->smartOrderService->getChartData($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * Save Order
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function saveOrder(Request $request)
    {
        $data = $this->smartOrderService->saveOrder($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * Update Trades
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function report(Request $request)
    {
        $data = $this->smartOrderService->report($this->decrypt($request));
        return $this->sendResponse($this->encrypt($data));
    }

    /**
     * Get List
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getList(Request $request)
    {
        $data = $this->smartOrderService->getList($request);
        return $this->sendResponse($data);
    }

    /**
     * validate User
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function validateUser(Request $request)
    {
        $data = $this->smartOrderService->validateUser($request);
        return $this->sendResponse($data);
    }

    /**
     * Save
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function saveSo(Request $request)
    {
        $data = $this->smartOrderService->saveSo($request);
        return $this->sendResponse($data);
    }

    /**
     * Get Plans
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getPlans(Request $request)
    {
        $data = $this->smartOrderService->getPlans($request);
        return $this->sendResponse($data);
    }

    /**
     * Save Plans
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function savePlans(Request $request)
    {
        $data = $this->smartOrderService->savePlans($request);
        return $this->sendResponse($data);
    }
}
