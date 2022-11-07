<?php

namespace App\Notifications;

use App\Notifications\CoreNotification;
use App\Models\User;

class ConfirmingUserNotification extends CoreNotification
{
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $path = 'Notifications/ConfirmingUser.';
        $params = [
            'event' => 'confirming-user',
            'title' => trans($path . 'title', ['userName' => $user->name]),
            'body' => trans($path . 'body', ['code' => $user->code]),
            'icon' => $user->url_avatar,
            'actions' => [
                [
                    'action' =>  trans($path . 'actionUrl', ['code' => $user->code]),
                    'title' => trans($path . 'actionTitle'),
                ],
            ],
        ];
        parent::__construct($params);
    }
}
