<?php

namespace App\Models;

use App\Models\CoreModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class StockOrder extends CoreModel
{
    protected $visible = [
        'id',
        'symbol',
        'buy_date',
        'buy_volume',
        'buy_price',
        'buy_fee',
        'sell_date',
        'sell_volume',
        'sell_price',
        'sell_fee',
    ];

    protected $fillable = [
        'symbol',
        'buy_date',
        'buy_volume',
        'buy_price',
        'buy_fee',
        'sell_date',
        'sell_volume',
        'sell_price',
        'sell_fee',
    ];

    protected static $logAttributes = [
        'symbol',
        'buy_date',
        'buy_volume',
        'buy_price',
        'buy_fee',
        'sell_date',
        'sell_volume',
        'sell_price',
        'sell_fee',
    ];

    protected $casts = [
        // 'buy_volume' => 'array',
        // 'buy_price' => 'array',
        // 'buy_fee' => 'array',
        // 'sell_volume' => 'array',
        // 'sell_price' => 'array',
        // 'sell_fee' => 'array',
    ];

    public function scopeClosed(Builder $query): void
    {
        $query->whereRaw('CHECK_CLOSED(buy_volume, sell_volume)');
    }

    public function scopeOpening(Builder $query): void
    {
        $query->whereRaw('NOT CHECK_CLOSED(buy_volume, sell_volume)');
    }

    public static function getProfitChart($period, $fromDate, $toDate)
    {
        $expression = DB::raw("CALL PROFIT_CHART('{$period}', '{$fromDate}', '{$toDate}')");
        $string = $expression->getValue(DB::connection()->getQueryGrammar());
        return DB::select($string);
    }
    // public static function getWinRate($date)
    // {
    //     $expression = DB::raw("CALL WIN_RATE('{$date}')");
    //     $string = $expression->getValue(DB::connection()->getQueryGrammar());
    //     return DB::select($string)[0];
    // }
}
