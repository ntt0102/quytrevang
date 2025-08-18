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
        'type',
        'side',
        'entry_price',
        'tp_price',
        'sl_price',
        'entry_no',
        'tp_no',
        'sl_no',
        'created_at',
    ];

    protected $fillable = [
        'status',
        'type',
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
        'type',
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
