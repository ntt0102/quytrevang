<?php

namespace App\Notifications;

use App\Notifications\CoreNotification;

class ExportStockNotification extends CoreNotification
{
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct()
    {
        $path = 'Notifications/ExportStock.';
        $params = [
            'event' => 'export-stock',
            'title' => trans($path . 'title'),
            'body' => trans($path . 'body'),
        ];
        parent::__construct($params, false, false, true);
    }
}
