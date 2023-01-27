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
            'name' => "openingMarketFlag",
            'value' => "0",
        ]);
        Variable::create([
            'name' => "runningSocketFlag",
            'value' => "0",
        ]);
        Variable::create([
            'name' => "startSocketTime",
            'value' => "17:48:00",
        ]);
        Variable::create([
            'name' => "bid",
            'value' => "0",
        ]);
        Variable::create([
            'name' => "ask",
            'value' => "0",
        ]);
    }
}
