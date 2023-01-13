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
    public function getTimeAttribute()
    {
        return strtotime($this->time);
    }
}
