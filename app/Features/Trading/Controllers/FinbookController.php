<?php

namespace App\Features\Trading\Controllers;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Features\Trading\Services\FinbookService;

class FinbookController extends CoreController
{
    protected $finbookService;

    public function __construct(FinbookService $finbookService)
    {
        parent::__construct();
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
        $data = $this->finbookService->fetch($this->payload);
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
        $data = $this->finbookService->getFinbooksName($this->payload);
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
        $data = $this->finbookService->save($this->payload);
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
        $data = $this->finbookService->updateBalance($this->payload);
        return $this->sendResponse($data);
    }
}
