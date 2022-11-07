<?php

namespace App\Notifications;

use App\Notifications\CoreNotification;
use App\Models\Contract;

class WithdrawnContractNotification extends CoreNotification
{
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Contract $contract)
    {
        $path = 'Notifications/WithdrawnContract.';
        $params = [
            'event' => 'withdrawn-contract',
            'title' => trans($path . 'title'),
            'body' => trans($path . 'body', ['code' => $contract->code]),
            'actions' => [
                [
                    'action' =>  trans($path . 'actionUrl', ['code' => $contract->code]),
                    'title' => trans($path . 'actionTitle'),
                ],
            ],
            'image' => $contract->url_withdrawn_docs[0]
        ];
        parent::__construct($params);
    }
}
