<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Parameter;

class ParametersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Parameter::create([
            'slug' => "interestRate",
            'value' => "0.005",
            'description' => "Lãi suất trên tuần",
        ]);
        Parameter::create([
            'slug' => "principalMin",
            'value' => "5000000",
            'description' => "Tiền gốc tối thiểu",
        ]);
        Parameter::create([
            'slug' => "holdWeeksMin",
            'value' => "4",
            'description' => "Tuần nắm giữ tối thiểu",
        ]);
        Parameter::create([
            'slug' => "representUser",
            'value' => "121992",
            'description' => "Người đại diện",
        ]);
        Parameter::create([
            'slug' => "marginRate",
            'value' => "0.16875",
            'description' => "Tỷ lệ ký quỹ",
        ]);
        Parameter::create([
            'slug' => "tradeContracts",
            'value' => "2",
            'description' => "Số hợp đồng phái sinh",
        ]);
        Parameter::create([
            'slug' => "VN30F1M",
            'value' => "VN30F2211",
            'description' => "Hơp đồng VN30F1M",
        ]);
    }
}
