<?php

namespace App\Models;

use App\Models\CoreModel;

class VpsUser extends CoreModel
{
    protected $visible = [
        'id',
        'user_code',
        'vps_code',
        'vps_session',
        'allow_copy',
        'allow_share',
        'allow_vol_max',
        'volume',
    ];

    protected $fillable = [
        'user_code',
        'vps_code',
        'vps_session',
        'allow_copy',
        'allow_share',
        'allow_vol_max',
        'volume',
    ];

    protected static $recordEvents = [];


    /**
     * Get the user.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_code', 'code');
    }
}
