<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\User\TradeService;

class TradeController extends CoreController
{
    protected $tradeService;

    public function __construct(TradeService $tradeService)
    {
        parent::__construct();
        $this->tradeService = $tradeService;
    }

    /**
     * Get the week trade
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getMonthChart(Request $request)
    {
        $data = $this->tradeService->getMonthChart($this->payload);
        return $this->sendResponse($data);
    }
}
