<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\User\CopyistService;

class CopyistController extends CoreController
{
    protected $copyistService;

    public function __construct(CopyistService $copyistService)
    {
        parent::__construct();
        $this->copyistService = $copyistService;
    }

    /**
     * Get the Copyist
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
     * Save changed Copyist.
     *
     * @param Illuminate\Http\Request $request
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request)
    {
        $data = $this->copyistService->save($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * validate VpsCode
     *
     * @param Illuminate\Http\Request $request
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function validateVpsCode(Request $request)
    {
        $data = $this->copyistService->validateVpsCode($this->payload);
        return $this->sendResponse($data);
    }
}
