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
     * @param $payload
     * 
     */
    public function subscribe($payload)
    {
        request()->user()->updatePushSubscription(
            $payload->endpoint,
            $payload->key,
            $payload->token
        );
    }

    /**
     * Get the notifications
     *
     * @param $payload
     * 
     */
    public function unsubscribe($payload)
    {
        request()->user()->deletePushSubscription($payload->endpoint);
    }
}
