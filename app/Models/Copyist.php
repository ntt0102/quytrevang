<?php

namespace App\Models;

use App\Models\CoreModel;

class Copyist extends CoreModel
{
    protected $visible = [
        'id',
        'user_code',
        'vps_code',
        'vps_session',
        'allow_copy',
        'allow_share',
        'allow_max_vol',
        'volume',
        'entry_order_id',
        'tp_order_id',
        'sl_order_id',
        'exit_order_id',
    ];

    protected $fillable = [
        'user_code',
        'vps_code',
        'vps_session',
        'allow_copy',
        'allow_share',
        'allow_max_vol',
        'volume',
        'entry_order_id',
        'tp_order_id',
        'sl_order_id',
        'exit_order_id',
    ];

    protected static $recordEvents = [];


    /**
     * Get the user.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_code', 'code');
    }

    public static function getCopyists()
    {
        return parent::where('allow_share', 1)->where('allow_copy', 1)->get();
    }
}
