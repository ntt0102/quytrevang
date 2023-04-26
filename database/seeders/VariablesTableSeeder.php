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
            'name' => "openingMarketFlag",
            'value' => "0",
        ]);
        Variable::create([
            'name' => "vn30f1m",
            'value' => "VN30F2305",
        ]);
    }
}
