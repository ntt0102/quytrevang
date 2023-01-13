<?php

namespace App\Models;

use App\Models\CoreModel;
use Carbon\Carbon;

class Vps extends CoreModel
{
    public $timestamps = false;

    protected $visible = [
        'x',
        'y'
    ];

    protected $fillable = [
        'type',
        'x',
        'y'
    ];
    protected $casts = [
        'x' => 'string',
        'y' => 'string'
    ];
    protected static $recordEvents = [];

    public function getXAttribute()
    {
        // return Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('Y-m-d H:i:s');
        // return  $date->format('Y-m-d');
        return $this->y;
    }
}
