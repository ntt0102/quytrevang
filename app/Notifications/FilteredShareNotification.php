<?php

namespace App\Notifications;

use App\Notifications\CoreNotification;

class FilteredShareNotification extends CoreNotification
{
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($kind)
    {
        $path = 'Notifications/FilteredShare.';
        $params = [
            'event' => 'filtered-share',
            'title' => trans($path . 'title'),
            'body' => trans($path . 'body', ['kind' => trans($path . $kind)]),
            'actions' => [
                [
                    'action' =>  trans($path . 'actionUrl', ['kind' => $kind]),
                    'title' => trans($path . 'actionTitle'),
                ],
            ],
        ];
        parent::__construct($params);
    }
}
