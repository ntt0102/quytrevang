<?php

namespace App\Services\Setting;

use Illuminate\Support\Facades\Notification;
use App\Notifications\CoreNotification;
use App\Services\CoreService;
use App\Repositories\UserRepository;

class NotificationService extends CoreService
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    /**
     * Sent Notification.
     * 
     * @param $request
     * 
     */
    public function send($request)
    {
        if ($request->receiver == '*') $receiver = $this->userRepository->findAll();
        else {
            $codes = (array) explode(",", $request->receiver);
            $receiver = $this->userRepository->whereIn('code', $codes);
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
