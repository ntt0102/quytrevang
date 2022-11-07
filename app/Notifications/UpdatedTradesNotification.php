<?php

namespace App\Notifications;

use App\Notifications\CoreNotification;

class UpdatedTradesNotification extends CoreNotification
{
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($revenue, $fees)
    {
        $path = 'Notifications/UpdatedTrades.';
        $params = [
            'event' => 'report-trades',
            'title' => trans($path . 'title', ['date' => date_create()->format('d/m/Y')]),
            'body' => trans($path . 'body', ['revenue' => $revenue, 'fees' => $fees]),
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
