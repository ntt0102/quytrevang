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
        $params = [
            'event' => 'export-stock',
            'title' => '',
            'body' => '',
        ];
        parent::__construct($params, false, false, true);
    }
}
