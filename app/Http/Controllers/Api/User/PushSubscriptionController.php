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
    public function update(Request $request)
    {
        $this->pushSubscriptionService->update($request);
        return $this->sendResponse();
    }

    /**
     * Delete the specified subscription.
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $this->pushSubscriptionService->destroy($request);
        return $this->sendResponse();
    }
}
