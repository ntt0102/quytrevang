<?php

namespace App\Notifications;

use App\Notifications\CoreNotification;
use App\Models\Contract;
use App\Events\ConfirmingUserEvent;

class WithdrawingContractNotification extends CoreNotification
{
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Contract $contract)
    {
        $path = 'Notifications/WithdrawingContract.';
        $params = [
            'event' => 'withdrawing-contract',
            'title' => trans($path . 'title' . $contract->status, ['userName' => $contract->user->name]),
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
