<?php

namespace App\Models;

use App\Models\CoreModel;

class DrawTool extends CoreModel
{
    protected $visible = [
        'id',
        'symbol',
        'name',
        'point',
        'data',
        'updated_at'
    ];

    protected $fillable = [
        'symbol',
        'name',
        'point',
        'data',
    ];

    protected static $logAttributes = [
        'symbol',
        'name',
        'point',
        'data',
        'updated_at'
    ];

    protected $casts = ['data' => 'object'];
}
