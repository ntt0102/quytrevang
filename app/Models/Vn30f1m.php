<?php

namespace App\Models;

use App\Models\CoreModel;

class Vn30f1m extends CoreModel
{
    public $timestamps = false;

    protected $visible = [
        'time',
        'value'
    ];

    protected $fillable = [
        'date',
        'price1',
        'price2',
        'price3'
    ];
    protected static $recordEvents = [];
}
