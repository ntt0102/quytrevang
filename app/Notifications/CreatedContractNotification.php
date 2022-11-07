<?php

namespace App\Notifications;

use App\Notifications\CoreNotification;
use App\Models\Contract;

class CreatedContractNotification extends CoreNotification
{
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Contract $contract)
    {
        $path = 'Notifications/CreatedContract.';
        $params = [
            'event' => 'created-contract',
            'title' => trans($path . 'title', ['userName' => $contract->user->name]),
            'body' => trans($path . 'body', ['code' => $contract->code]),
            'icon' => $contract->user->url_avatar,
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
