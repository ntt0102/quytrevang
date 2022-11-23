<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Variable;

class VariablesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Variable::create([
            'name' => "changedDatabaseFlag",
            'value' => "0",
        ]);
        Variable::create([
            'name' => "reportedTradingFlag",
            'value' => "0",
        ]);
        Variable::create([
            'name' => "runningSocketFlag",
            'value' => "0",
        ]);
        Variable::create([
            'name' => "startScheduleTime",
            'value' => "17:48:00",
        ]);
        Variable::create([
            'name' => "priceBackgroundLine",
            'value' => '{"time":"","interval":0,"price":0}',
        ]);
        Variable::create([
            'name' => "socketVol10Temp",
            'value' => '{"side":"B","B":0,"S":0}',
        ]);
    }
}
