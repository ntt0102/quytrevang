<?php

namespace App\Http\Controllers\Api\Trading;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Trading\FinbookService;

class FinbookController extends CoreController
{
    protected $finbookService;

    public function __construct(FinbookService $finbookService)
    {
        $this->finbookService = $finbookService;
    }

    /**
     * Get the Finbooks
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function fetch(Request $request)
    {
        $data = $this->finbookService->fetch($request);
        return $this->sendResponse($data);
    }

    /**
     * Get the Finbooks Name
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getFinbooksName(Request $request)
    {
        $data = $this->finbookService->getFinbooksName($request);
        return $this->sendResponse($data);
    }

    /**
     * Save
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request)
    {
        $data = $this->finbookService->save($request);
        return $this->sendResponse($data);
    }

    /**
     * Update Balance
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function updateBalance(Request $request)
    {
        $data = $this->finbookService->updateBalance($request);
        return $this->sendResponse($data);
    }
}
