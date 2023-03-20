<?php

namespace App\Models;

use App\Models\CoreModel;

class SmartOrder extends CoreModel
{
    protected $visible = [
        'user_code',
        'started_at',
        'periods',
        'device_limit'
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
        'volume',
        'view_chart',
        'report'
    ];
    protected static $recordEvents = [];
    protected $casts = ['devices' => 'array'];
}
