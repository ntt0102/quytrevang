<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Closure;

class CoreService
{
    /**
     * Transaction database.
     * 
     * @param Closure $callback
     *
     * @return object
     */
    protected function transaction(Closure $callback)
    {
        return DB::transaction($callback);
    }
}
