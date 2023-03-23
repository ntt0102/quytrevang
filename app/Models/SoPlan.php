<?php

namespace App\Models;

use App\Models\CoreModel;

class SoPlan extends CoreModel
{
    protected $visible = [
        'name',
        'months',
        'price',
        'renewal_price',
        'highest_price',
        'save_money'
    ];

    protected $fillable = [
        'name',
        'months',
        'price',
        'highest_price',
        'renewal_price'
    ];

    protected static $recordEvents = [];

    /**
     * The attributes that it available in the json response.
     *
     * @var array
     */
    protected $appends = ['save_money'];

    /**
     * Get the contracts for the user.
     */
    public function getSaveMoneyAttribute()
    {
        return $this->months * ($this->highest_price - $this->price);
    }
}
