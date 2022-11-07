<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Admin\ContractService;

class ContractController extends CoreController
{
    protected $contractService;

    public function __construct(ContractService $contractService)
    {
        $this->contractService = $contractService;
    }

    /**
     * Get the Contracts
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function fetch(Request $request)
    {
        $data = $this->contractService->fetch($request);
        return $this->sendResponse($data);
    }

    /**
     * Save changed Contracts.
     *
     * @param Illuminate\Http\Request $request
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request)
    {
        $data = $this->contractService->save($request);
        return $this->sendResponse($data);
    }

    /**
     * Confirm Paid Contract
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function paidContract(Request $request)
    {
        $data = $this->contractService->paidContract($request);
        return $this->sendResponse($data);
    }

    /**
     * Withdrawn Contract
     *
     * @param Illuminate\Http\Request $request
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function withdrawnContract(Request $request)
    {
        $data = $this->contractService->withdrawnContract($request);
        return $this->sendResponse($data);
    }

    /**
     * Get summary
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function summary(Request $request)
    {
        $data = $this->contractService->summary();
        return $this->sendResponse($data);
    }

    /**
     * get receipt info
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getReceiptInfo(Request $request)
    {
        $data = $this->contractService->getReceiptInfo($request);
        return $this->sendResponse($data);
    }
}
