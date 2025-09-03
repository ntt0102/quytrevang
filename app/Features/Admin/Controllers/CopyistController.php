<?php

namespace App\Features\Admin\Controllers;

use App\Http\Controllers\CoreController;
use Illuminate\Http\Request;
use App\Features\Admin\Services\CopyistService;

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
        return $this->sendResponse($data);
    }

    /**
     * Validate User
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function validateUser(Request $request)
    {
        $data = $this->copyistService->validateUser($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Save
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request)
    {
        $data = $this->copyistService->save($this->payload);
        return $this->sendResponse($data);
    }
}
