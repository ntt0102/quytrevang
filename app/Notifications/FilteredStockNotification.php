<?php

namespace App\Notifications;

use App\Notifications\CoreNotification;

class FilteredStockNotification extends CoreNotification
{
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($kind)
    {
        $path = 'Notifications/FilteredStock.';
        $params = [
            'event' => 'filtered-stock',
            'title' => trans($path . 'title'),
            'body' => trans($path . 'body', ['kind' => trans($path . $kind)]),
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
