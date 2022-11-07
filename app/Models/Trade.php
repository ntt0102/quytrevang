<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trade extends Model
{
    protected $visible = [
        'id',
        'amount',
        'scores',
        'revenue',
        'loss',
        'fees',
        'monday'
    ];

    protected $fillable = [
        'amount',
        'scores',
        'revenue',
        'loss',
        'fees',
        'monday'
    ];

    protected static $logAttributes = [
        'amount',
        'scores',
        'revenue',
        'loss',
        'fees',
        'monday'
    ];
}
