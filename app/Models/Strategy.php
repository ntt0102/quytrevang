<?php

namespace App\Models;

use App\Models\CoreModel;

class Strategy extends CoreModel
{
    public $timestamps = false;

    protected $visible = [
        'trend',
        'atc',
        'ato'
    ];

    protected $fillable = [
        'date',
        'trend',
        'atc',
        'ato'
    ];
}
