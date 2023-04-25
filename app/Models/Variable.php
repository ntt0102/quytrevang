<?php

namespace App\Models;

use App\Models\CoreModel;

class Variable extends CoreModel
{
    protected $fillable = [
        'name',
        'value'
    ];
}
