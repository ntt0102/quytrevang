<?php

namespace App\Models;

use App\Models\CoreModel;

class Vps extends CoreModel
{
    public $timestamps = false;

    protected $visible = [
        'time',
        'value'
    ];

    protected $fillable = [
        'type',
        'time',
        'value'
    ];
    protected static $recordEvents = [];
    public function getTimeAttribute($time)
    {
        return strtotime($time->format('Y-m-d H:i:s'));
    }
}
