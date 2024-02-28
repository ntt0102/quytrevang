<?php

namespace App\Models;

use App\Models\CoreModel;

class StockOrder extends CoreModel
{
    protected $visible = [
        'id',
        'symbol',
        'buy_date',
        'buy_volume',
        'buy_price',
        'buy_fee',
        'sell_date',
        'sell_volume',
        'sell_price',
        'sell_fee',
    ];

    protected $fillable = [
        'symbol',
        'buy_date',
        'buy_volume',
        'buy_price',
        'buy_fee',
        'sell_date',
        'sell_volume',
        'sell_price',
        'sell_fee',
    ];

    protected static $logAttributes = [
        'symbol',
        'buy_date',
        'buy_volume',
        'buy_price',
        'buy_fee',
        'sell_date',
        'sell_volume',
        'sell_price',
        'sell_fee',
    ];

    protected $casts = [
        // 'buy_volume' => 'array',
        // 'buy_price' => 'array',
        // 'buy_fee' => 'array',
        // 'sell_volume' => 'array',
        // 'sell_price' => 'array',
        // 'sell_fee' => 'array',
    ];
}
