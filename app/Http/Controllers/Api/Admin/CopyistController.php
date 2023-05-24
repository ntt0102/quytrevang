<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Admin\CopyistService;

class CopyistController extends CoreController
{
    protected $copyistService;

    public function __construct(CopyistService $copyistService)
    {
        $this->copyistService = $copyistService;
    }

    /**
     * Get the Copyists
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function fetch(Request $request)
    {
        $data = $this->copyistService->fetch($request);
        return $this->sendResponse($data);
    }

    /**
     * Mark As Read.
     *
     * @param Illuminate\Http\Request $request
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function markAsRead(Request $request)
    {
        $this->copyistService->markAsRead($request);
        return $this->sendResponse();
    }

    /**
     * Delete
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request)
    {
        $data = $this->copyistService->delete($request);
        return $this->fetch($request);
    }
}
