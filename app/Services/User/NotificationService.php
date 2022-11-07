<?php

namespace App\Services\User;

use App\Services\CoreService;
use NotificationChannels\WebPush\PushSubscription;
use App\Events\ReadNotificationEvent;

class NotificationService extends CoreService
{
    public function __construct()
    {
    }

    /**
     * Get user's notifications.
     *
     * @param $request
     * 
     */
    public function fetch($request)
    {
        $user = $request->user();

        $unread = $user->unreadNotifications()->get();
        $read = $user->readNotifications()->limit(20)->get();
        return $unread->merge($read)->sortByDesc('created_at')->values()->map(function ($n) {
            $ret = $n->data;
            if (array_key_exists('icon', $ret)) $ret['icon'] = get_url_image($n->data['icon'], 'images/no-avatar.png');
            if (array_key_exists('image', $ret)) $ret['image'] = get_url_image($n->data['image']);
            $ret['id'] = $n->id;
            $ret['unread'] = !$n->read_at ? true : false;
            $ret['created_at'] = $n->created_at;
            return $ret;
        });
    }

    /**
     * Mark user's notification as read.
     *
     * @param $request
     * @param  int $id
     * 
     */
    public function markAsRead($request, $id)
    {
        $notification = $request->user()
            ->unreadNotifications()
            ->where('id', $id)
            ->first();

        if (!!$notification) {
            $notification->markAsRead();
            event(new ReadNotificationEvent($request->user()->id));
        }
    }

    /**
     * Mark all user's notifications as read.
     *
     * @param $request
     * 
     */
    public function markAllRead($request)
    {
        $request->user()
            ->unreadNotifications()
            ->get()->each(function ($n) {
                $n->markAsRead();
            });
        event(new ReadNotificationEvent($request->user()->id));
    }

    /**
     * Mark the notification as read and dismiss it from other devices.
     *
     * This method will be accessed by the service worker
     * so the user is not authenticated and it requires an endpoint.
     *
     * @param $request
     * @param  int $id
     * 
     */
    public function dismiss($request, $id)
    {
        if (empty($request->endpoint)) {
            return [
                'isOk' => false,
                'code' => 403,
                'msg' => 'Endpoint missing.'
            ];
        }

        $subscription = PushSubscription::findByEndpoint($request->endpoint);
        if (is_null($subscription)) {
            return [
                'isOk' => false,
                'code' => 404,
                'msg' => 'Subscription not found.'
            ];
        }

        $notification = $subscription->subscribable->notifications()->where('id', $id)->first();
        if (is_null($notification)) {
            return [
                'isOk' => false,
                'code' => 404,
                'msg' => 'Notification not found.'
            ];
        }

        $notification->markAsRead();
        event(new ReadNotificationEvent($subscription->subscribable->id));

        return [
            'isOk' => true,
        ];
    }
}
