<?php

namespace App\Models;

use App\Models\CoreModel;

class SoOrder extends CoreModel
{
    protected $visible = [
        'id',
        'user_code',
        'type',
        'volume',
        'price'
    ];

    protected $fillable = [
        'user_code',
        'type',
        'volume',
        'price',
    ];

    protected static $recordEvents = [];
}
