<?php

namespace App\Features\User\Controllers;

use App\Http\Controllers\CoreController;
use Illuminate\Http\Request;
use App\Features\User\Services\PushSubscriptionService;

class PushSubscriptionController extends CoreController
{
    protected $pushSubscriptionService;

    public function __construct(PushSubscriptionService $pushSubscriptionService)
    {
        parent::__construct();
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
        $data = $this->pushSubscriptionService->subscribe($this->payload);
        return $this->sendResponse($data);
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
        $data = $this->pushSubscriptionService->unsubscribe($this->payload);
        return $this->sendResponse($data);
    }
}
