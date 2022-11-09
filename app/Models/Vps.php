<?php

namespace App\Models;

use App\Models\CoreModel;

class Vps extends CoreModel
{
    public $timestamps = false;

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
