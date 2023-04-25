<?php

namespace App\Models;

use App\Models\CoreModel;

class Parameter extends CoreModel
{
    protected $visible = [
        'id',
        'value',
        'description'
    ];

    protected $fillable = [
        'value',
    ];

    protected static $logAttributes = ['value'];

    protected static $recordEvents = ['updated'];
}
