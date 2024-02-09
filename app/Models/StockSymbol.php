<?php

namespace App\Models;

use App\Models\CoreModel;

class StockSymbol extends CoreModel
{
    protected $visible = [
        'id',
        'name',
        'symbols',
        'updated_at'
    ];

    protected $fillable = [
        'name',
        'symbols',
    ];

    protected static $logAttributes = [
        'name',
        'symbols',
        'updated_at'
    ];

    protected $casts = ['symbols' => 'array'];
}
