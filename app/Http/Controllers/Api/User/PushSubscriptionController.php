<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\User\PushSubscriptionService;

class PushSubscriptionController extends CoreController
{
    protected $pushSubscriptionService;

    public function __construct(PushSubscriptionService $pushSubscriptionService)
    {
        $this->pushSubscriptionService = $pushSubscriptionService;
    }

    /**
     * Update user's subscription.
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function subscribe(Request $request)
    {
        $this->pushSubscriptionService->subscribe($request);
        return $this->sendResponse();
    }

    /**
     * Delete the specified subscription.
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function unsubscribe(Request $request)
    {
        $this->pushSubscriptionService->unsubscribe($request);
        return $this->sendResponse();
    }
}
