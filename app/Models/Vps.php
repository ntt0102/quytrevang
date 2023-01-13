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
    protected $casts = [
        'x' => 'string'
    ];
    public function getXAttribute()
    {
        return $this->time;
    }
    public function getYAttribute()
    {
        return $this->value;
    }
}
