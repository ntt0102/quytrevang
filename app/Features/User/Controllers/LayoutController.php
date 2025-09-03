<?php

namespace App\Features\User\Controllers;

use App\Http\Controllers\CoreController;
use Illuminate\Http\Request;
use App\Features\User\Services\LayoutService;

class LayoutController extends CoreController
{
    protected $layoutService;

    public function __construct(LayoutService $layoutService)
    {
        parent::__construct();
        $this->layoutService = $layoutService;
    }

    /**
     * Get the page params
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getNotify(Request $request)
    {
        $data = $this->layoutService->getNotify($this->payload);
        return $this->sendResponse($data);
    }
}
