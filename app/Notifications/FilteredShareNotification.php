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
    public function __construct($result)
    {
        $path = 'Notifications/FilteredShare.';
        $params = [
            'event' => 'filtered-share',
            'title' => trans($path . 'title'),
            'body' => $result ? trans($path . 'success', ['group' => $result->group, 'count' => count($result->symbols)]) : trans($path . 'failed'),
            'actions' => [
                [
                    'action' =>  trans($path . 'actionUrl'),
                    'title' => trans($path . 'actionTitle'),
                ],
            ],
        ];
        parent::__construct($params);
    }
}
