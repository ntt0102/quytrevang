<?php

namespace App\Models;

use App\Models\CoreModel;

class SmartOrder extends CoreModel
{
    protected $visible = [
        'id',
        'user_code',
        'user_name',
        'user_phone',
        'user_email',
        'started_at',
        'periods',
        'device_limit',
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
     * Get user name.
     *
     * @param  string  $value
     * @return string
     */
    public function getUserNameAttribute()
    {

        return $this->user->name;
    }

    /**
     * Get user phone.
     *
     * @param  string  $value
     * @return string
     */
    public function getUserPhoneAttribute()
    {

        return $this->user->phone;
    }

    /**
     * Get user email.
     *
     * @param  string  $value
     * @return string
     */
    public function getUserEmailAttribute()
    {

        return $this->user->email;
    }

    /**
     * Get the contracts for the user.
     */
    public function validDevice($deviceId)
    {
        return in_array($deviceId, $this->devices);
    }

    /**
     * Get the user that owns the phone.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_code', 'code');
    }
}
