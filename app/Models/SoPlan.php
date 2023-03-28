<?php

namespace App\Models;

use App\Models\CoreModel;

class SoPlan extends CoreModel
{
    protected $visible = [
        'id',
        'name',
        'months',
        'price',
        'renewal_price',
        'highest_price'
    ];

    protected $fillable = [
        'name',
        'months',
        'price',
        'renewal_price',
        'highest_price',
    ];

    protected static $recordEvents = [];
}
