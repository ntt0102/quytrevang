<?php

namespace App\Features\User\Services;

use App\Services\CoreService;
use Illuminate\Support\Facades\Notification;
use App\Notifications\CreatedContractNotification;
use App\Notifications\PayingContractNotification;
use App\Notifications\WithdrawingContractNotification;
use App\Models\Copyist;
use App\Models\Contract;
use App\Models\Parameter;
use App\Models\User;


class CopyistService extends CoreService
{

    /**
     * Return all the Contracts.
     * 
     * @param $payload
     *
     * @return array
     */
    public function fetch($payload)
    {
        return [
            'copyist' => request()->user()->copyist,
        ];
    }

    /**
     * Save Contract.
     * 
     * @param $payload
     * 
     */
    public function save($payload)
    {
        return $this->transaction(
            function () use ($payload) {
                $data = [
                    'allow_copy' => $payload->allow_copy,
                    'allow_share' => $payload->allow_share,
                    'vps_code' => $payload->vps_code,
                    'allow_max_vol' => $payload->allow_max_vol,
                    'volume' => $payload->volume,
                ];
                $isOk = request()->user()->copyist->update($data);
                return ['isOk' => $isOk];
            }
        );
    }

    /**
     * Validate VpsCode
     * 
     * @param $payload
     */
    public function validateVpsCode($payload)
    {
        return Copyist::where('vps_code', $payload->vps_code)->count() == 0;
    }
}
