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
        'vps_accounts',
        'time_frame',
        'chart_type',
        'contracts',
        'take_profit',
        'stop_loss',
        'tpsl',
        'volume',
        'view_chart',
        'copy_trade',
        'report',
        'copy_execute',
        'copy_payment',
        'copy_volume',
        'copy_revenue',
        'copy_fees',
        'copy_estimate',
    ];
    protected static $recordEvents = [];
    protected $casts = [
        'devices' => 'array',
        'vps_accounts' => 'array',
    ];
    protected $appends = ['copy_poundage'];

    public function getCopyPoundageAttribute()
    {
        $copyPoundageRate = app(\App\Repositories\ParameterRepository::class)->getValue('copyPoundageRate');
        return $copyPoundageRate * ($this->copy_revenue - $this->copy_fees);
    }

    /**
     * 
     */
    public function validDevice($deviceId)
    {
        return in_array($deviceId, $this->devices);
    }

    /**
     * 
     */
    public function validCopyTrade()
    {
        return count($this->vps_accounts) == 1;
    }

    // /**
    //  * Get the user that owns the phone.
    //  */
    // public function user()
    // {
    //     return $this->belongsTo(User::class, 'user_code', 'code');
    // }
}
