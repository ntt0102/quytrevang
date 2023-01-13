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
        return $this->value;
    }
    public function getYAttribute()
    {
        return $this->value;
    }
}
