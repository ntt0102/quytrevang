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
    public function update($request)
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
    public function destroy($request)
    {
        $request->user()->deletePushSubscription($request->endpoint);
    }
}
