<?php

namespace App\Models;

use App\Models\CoreModel;

class SmartOrder extends CoreModel
{
    protected $visible = [
        'id',
        'user_code',
        'started_at',
        'periods',
        'device_limit',
        'devices'
    ];

    protected $fillable = [
        'user_code',
        'started_at',
        'periods',
        'device_limit',
        'devices',
        'time_frame',
        'chart_type',
        'contracts',
        'take_profit',
        'stop_loss',
        'tpsl',
        'volume',
        'view_chart',
        'report'
    ];
    protected static $recordEvents = [];
    protected $casts = ['devices' => 'array'];

    /**
     * Get the contracts for the user.
     */
    public function validDevice($deviceId)
    {
        return in_array($deviceId, $this->devices);
    }

    // /**
    //  * Get the user that owns the phone.
    //  */
    // public function user()
    // {
    //     return $this->belongsTo(User::class, 'user_code', 'code');
    // }
}
