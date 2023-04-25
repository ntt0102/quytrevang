<?php

namespace App\Models;

use App\Models\CoreModel;

class Trade extends CoreModel
{
    protected $visible = [
        'id',
        'amount',
        'scores',
        'revenue',
        'loss',
        'fees',
        'date'
    ];

    protected $fillable = [
        'amount',
        'scores',
        'revenue',
        'loss',
        'fees',
        'date'
    ];

    protected static $logAttributes = [
        'amount',
        'scores',
        'revenue',
        'loss',
        'fees',
        'date'
    ];
}
