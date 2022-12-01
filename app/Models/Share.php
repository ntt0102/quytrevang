<?php

namespace App\Models;

use App\Models\CoreModel;

class Share extends CoreModel
{
    public $timestamps = false;

    protected $visible = [
        'time',
        'value',
    ];

    protected $fillable = [
        'symbol',
        'date',
        'price',
        'foreign',
    ];
    protected static $recordEvents = [];
}
