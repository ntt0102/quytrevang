<?php

namespace App\Models;

use App\Models\CoreModel;
use Carbon\Carbon;

class Vps extends CoreModel
{
    public $timestamps = false;

    protected $visible = [
        'x',
        'y',
        'z'
    ];

    protected $fillable = [
        'type',
        'x',
        'y'
    ];
    protected static $recordEvents = [];

    public function getZAttribute()
    {
        // return Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('Y-m-d H:i:s');
        // return  $date->format('Y-m-d');
        return $this->x;
        //
    }
}
