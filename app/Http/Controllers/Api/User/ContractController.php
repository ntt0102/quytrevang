<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\User\ContractService;

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
     * Paying Contract
     *
     * @param Illuminate\Http\Request $request
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function payingContract(Request $request)
    {
        $data = $this->contractService->payingContract($request);
        return $this->sendResponse($data);
    }

    /**
     * Withdrawing Contract
     *
     * @param Illuminate\Http\Request $request
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function withdrawingContract(Request $request)
    {
        $data = $this->contractService->withdrawingContract($request);
        return $this->sendResponse($data);
    }
}
