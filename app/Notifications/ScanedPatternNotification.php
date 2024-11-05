<?php

namespace App\Notifications;

use App\Notifications\CoreNotification;

class ScanedPatternNotification extends CoreNotification
{
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct()
    {
        $path = 'Notifications/ScanedPattern.';
        $params = [
            'event' => 'scaned-phase',
            'title' => trans($path . 'title'),
            'body' => trans($path . 'body'),
            'actions' => [
                [
                    'action' =>  trans($path . 'actionUrl'),
                    'title' => trans($path . 'actionTitle'),
                ],
            ],
        ];
        parent::__construct($params, false, false);
    }
}
