<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class CoreModel extends Model
{
    // use LogsActivity;

    public static function all($columns = ['*'])
    {
        return parent::all($columns);
    }
}
