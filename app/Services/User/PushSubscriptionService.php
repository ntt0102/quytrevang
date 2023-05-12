<?php

namespace App\Services\User;

use App\Services\CoreService;

class PushSubscriptionService extends CoreService
{

    public function __construct()
    {
    }

    /**
     * Get the page's params
     *
     * @param $request
     * 
     */
    public function subscribe($request)
    {
        $request->user()->updatePushSubscription(
            $request->endpoint,
            $request->key,
            $request->token
        );
    }

    /**
     * Get the notifications
     *
     * @param $request
     * 
     */
    public function unsubscribe($request)
    {
        $request->user()->deletePushSubscription($request->endpoint);
    }
}
