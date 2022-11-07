<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\User\LayoutService;

class LayoutController extends CoreController
{
    protected $layoutService;

    public function __construct(LayoutService $layoutService)
    {
        $this->layoutService = $layoutService;
    }

    /**
     * Get the page params
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function fetch(Request $request)
    {
        $data = $this->layoutService->fetch($request);
        return $this->sendResponse($data);
    }
}
