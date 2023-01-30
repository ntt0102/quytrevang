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
        'side'
    ];

    protected $fillable = [
        'time',
        'price',
        'vol',
        'side'
    ];
    protected static $recordEvents = [];
}
