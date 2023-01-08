<?php

namespace App\Models;

use App\Models\CoreModel;

class Strategy extends CoreModel
{
    public $timestamps = false;

    protected $visible = [
        'date',
        'trend',
        'momentum',
        'atc',
        'ato'
    ];

    protected $fillable = [
        'date',
        'trend',
        'momentum',
        'atc',
        'ato'
    ];
}
