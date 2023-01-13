<?php

namespace App\Models;

use App\Models\CoreModel;

class Vps extends CoreModel
{
    public $timestamps = false;

    protected $visible = [
        'x',
        'y'
    ];

    protected $fillable = [
        'type',
        'time',
        'value'
    ];
    protected $appends = ['x', 'y'];
    protected static $recordEvents = [];

    public function getXAttribute()
    {
        // return Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('Y-m-d H:i:s');
        // return  $date->format('Y-m-d');
        return $this->time->format('Y-m-d H:i:s');
        //
    }
    public function getYAttribute()
    {
        return $this->value;
    }
}
