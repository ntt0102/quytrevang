<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\VpsService;

class VpsController extends CoreController
{
    protected $vpsService;

    public function __construct(VpsService $vpsService)
    {
        $this->vpsService = $vpsService;
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
        $data = $this->vpsService->report($request);
        return $this->sendResponse($data);
    }

    // /**
    //  * Upload AT Image
    //  *
    //  * @param \Illuminate\Http\Request $request
    //  * 
    //  * @return \Illuminate\Http\Response
    //  */
    // public function export(Request $request)
    // {
    //     $data = $this->vpsService->export($request);
    //     return $this->sendResponse($data);
    // }

    /**
     * Check Market Open
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getconfig(Request $request)
    {
        $data = $this->vpsService->getconfig($request);
        return $this->sendResponse($data);
    }

    /**
     * get Volume By Price
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getVolumeByPrice(Request $request)
    {
        $data = $this->vpsService->getVolumeByPrice($request);
        return $this->sendResponse($data);
    }

    /**
     * Get, set and Clear Data
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function controlData(Request $request)
    {
        $data = $this->vpsService->controlData($request);
        return $this->sendResponse($data);
    }

    // /**
    //  * Get strategy
    //  *
    //  * @param \Illuminate\Http\Request $request
    //  * 
    //  * @return \Illuminate\Http\Response
    //  */
    // public function getStrategy(Request $request)
    // {
    //     $data = $this->vpsService->getStrategy($request);
    //     return $this->sendResponse($data);
    // }

    // /**
    //  * Set strategy
    //  *
    //  * @param \Illuminate\Http\Request $request
    //  * 
    //  * @return \Illuminate\Http\Response
    //  */
    // public function setStrategy(Request $request)
    // {
    //     $data = $this->vpsService->setStrategy($request);
    //     return $this->sendResponse($data);
    // }

    // /**
    //  * Get Vn30f1m
    //  *
    //  * @param \Illuminate\Http\Request $request
    //  * 
    //  * @return \Illuminate\Http\Response
    //  */
    // public function getVn30f1m(Request $request)
    // {
    //     $data = $this->vpsService->getVn30f1m($request);
    //     return $this->sendResponse($data);
    // }
}
