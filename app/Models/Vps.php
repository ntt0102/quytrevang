<?php

namespace App\Models;

use App\Models\CoreModel;

class Vps extends CoreModel
{
    public $timestamps = false;

    protected $visible = [
        'time',
        'price',
        'vol',
        'bid',
        'ask'
    ];

    protected $fillable = [
        'time',
        'price',
        'vol',
        'bid',
        'ask'
    ];
    protected static $recordEvents = [];
}
