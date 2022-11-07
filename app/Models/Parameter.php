<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parameter extends Model
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
