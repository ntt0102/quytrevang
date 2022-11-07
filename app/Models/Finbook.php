<?php

namespace App\Models;

use App\Models\CoreModel;

class Finbook extends CoreModel
{
    protected $visible = [
        'id',
        'name',
        'balance',
        'last_transaction',
        'display',
        'updated_at'
    ];

    protected $fillable = [
        'name',
        'balance',
        'last_transaction',
        'display'
    ];

    protected static $logAttributes = [
        'name',
        'balance',
        'last_transaction',
        'display',
        'updated_at'
    ];
}
