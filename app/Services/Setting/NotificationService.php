<?php

namespace App\Services\Setting;

use Illuminate\Support\Facades\Notification;
use App\Notifications\CoreNotification;
use App\Services\CoreService;
use App\Models\User;

class NotificationService extends CoreService
{

    /**
     * Sent Notification.
     * 
     * @param $payload
     * 
     */
    public function send($payload)
    {
        if ($payload->receiver == '*') $receiver = User::all();
        else {
            $codes = (array) explode(",", $payload->receiver);
            $receiver = User::whereIn('code', $codes)->get();
        }
        $params = [
            'event' => 'received-notification',
            'title' => $payload->title,
            'body' => $payload->body,
        ];
        if (isset($payload->image)) $params['image'] = $payload->image;
        if (isset($payload->actions)) {
            $params['actions'] = [];
            foreach ($payload->actions as $action) {
                if (isset($action)) {
                    list($title, $url) = explode(",", $action);
                    $params['actions'][] = array(
                        "action" => trim($url),
                        "title" => trim($title),
                    );
                }
            }
        }
        Notification::send(
            $receiver,
            new CoreNotification($params)
        );
        return ['isOk' => true];
    }
}
