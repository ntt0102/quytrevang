<?php

namespace App\Models;

use App\Models\CoreModel;

class Vps extends CoreModel
{
    protected $visible = [
        'x',
        'y'
    ];

    protected $fillable = [
        'type',
        'x',
        'y'
    ];
}
