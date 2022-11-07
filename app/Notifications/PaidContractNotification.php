<?php

namespace App\Notifications;

use App\Notifications\CoreNotification;
use App\Models\Contract;

class PaidContractNotification extends CoreNotification
{
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Contract $contract)
    {
        $path = 'Notifications/PaidContract.';
        $params = [
            'event' => 'paid-contract',
            'title' => trans($path . 'title'),
            'body' => trans($path . 'body', ['code' => $contract->code]),
            'actions' => [
                [
                    'action' =>  trans($path . 'actionUrl', ['code' => $contract->code]),
                    'title' => trans($path . 'actionTitle'),
                ],
            ],
        ];
        parent::__construct($params);
    }
}
