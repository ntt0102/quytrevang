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
     * @param $request
     * 
     */
    public function send($request)
    {
        if ($request->receiver == '*') $receiver = User::all();
        else {
            $codes = (array) explode(",", $request->receiver);
            $receiver = User::whereIn('code', $codes)->get();
        }
        $params = [
            'event' => 'received-notification',
            'title' => $request->title,
            'body' => $request->body,
        ];
        if (isset($request->image)) $params['image'] = $request->image;
        if (isset($request->actions)) {
            $params['actions'] = [];
            foreach ($request->actions as $action) {
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
