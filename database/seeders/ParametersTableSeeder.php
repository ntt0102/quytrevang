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
            'value' => "0.2125",
            'description' => "Tỷ lệ ký quỹ",
        ]);
        Parameter::create([
            'slug' => "smartOrderMessage",
            'value' => "",
            'description' => "Thông báo SmartOrder",
        ]);
        Parameter::create([
            'slug' => "startTradingTime",
            'value' => "08:45:00",
            'description' => "Thời gian bắt đầu giao dịch",
        ]);
        Parameter::create([
            'slug' => "endTradingTime",
            'value' => "14:45:00",
            'description' => "Thời gian kết thúc giao dịch",
        ]);
    }
}
