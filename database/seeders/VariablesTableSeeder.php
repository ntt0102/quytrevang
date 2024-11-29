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
            'name' => "lastOpeningDate",
            'value' => "",
        ]);
        Variable::create([
            'name' => "vn30f1m",
            'value' => "VN30F2409",
        ]);
        Variable::create([
            'name' => "vpsUser",
            'value' => "228582",
        ]);
        Variable::create([
            'name' => "vpsPass",
            'value' => "a21328cca830063d80791b9e1e8b76a4",
        ]);
        Variable::create([
            'name' => "vpsSession",
            'value' => "",
        ]);
        Variable::create([
            'name' => "entryOrderId",
            'value' => "",
        ]);
        Variable::create([
            'name' => "tpOrderId",
            'value' => "",
        ]);
        Variable::create([
            'name' => "slOrderId",
            'value' => "",
        ]);
        Variable::create([
            'name' => "exitOrderId",
            'value' => "",
        ]);
        Variable::create([
            'name' => "dnseAccess",
            'value' => "",
        ]);
        Variable::create([
            'name' => "dnseTrading",
            'value' => "",
        ]);
    }
}
