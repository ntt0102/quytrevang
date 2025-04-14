<?php

namespace App\Models;

use App\Models\CoreModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class DerivativeOrder extends CoreModel
{
    protected $visible = [
        'id',
        'status',
        'side',
        'entry_price',
        'tp_price',
        'sl_price',
        'entry_no',
        'tp_no',
        'sl_no',
    ];

    protected $fillable = [
        'status',
        'side',
        'entry_price',
        'tp_price',
        'sl_price',
        'entry_no',
        'tp_no',
        'sl_no',
    ];

    protected static $logAttributes = [
        'status',
        'side',
        'entry_price',
        'tp_price',
        'sl_price',
        'entry_no',
        'tp_no',
        'sl_no',
    ];

    public function scopeActive($query)
    {
        return $query->where('status', '!=', 2);
    }
}
