<?php

namespace App\Models;

use App\Models\CoreModel;
use Carbon\Carbon;

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
    protected $casts = [
        'x' => 'string',
        'y' => 'float'
    ];
    protected static $recordEvents = [];
    public function getXAttribute()
    {
        return (string) $this->x;
    }
    public function getYAttribute()
    {
        return number_format($this->y, 1);
    }
}
