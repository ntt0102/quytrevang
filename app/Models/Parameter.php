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

    public static function getValue($slug, $default = '')
    {
        $parameter = parent::where('slug', $slug)->first();
        if (!$parameter) return $default;
        return $parameter->value;
    }
}
