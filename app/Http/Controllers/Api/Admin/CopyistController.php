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
        parent::__construct();
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
        $data = $this->copyistService->fetch($this->payload);
        // return $this->sendResponse($data);
        return $this->sendResponse($this->payload);
        // return $this->sendResponse($request->tho);
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
        $this->copyistService->markAsRead($this->payload);
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
        $data = $this->copyistService->delete($this->payload);
        return $this->fetch($this->payload);
    }
}
