<?php

namespace App\Models;

use App\Models\CoreModel;

class Variable extends CoreModel
{
    protected $fillable = [
        'name',
        'value'
    ];

    static public function getValue(string $slug, string $default = '')
    {
        $variable = self::where('name', $slug)->first();
        if (!$variable) return $default;
        return $variable->value;
    }

    static public function setValue(string $slug, string $value)
    {
        $variable = self::where('name', $slug)->first();
        if (!$variable) return false;
        return !!$variable->update(['value' => $value]);
    }
}
