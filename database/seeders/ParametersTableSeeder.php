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
            'description' => "Hợp đồng VN30F1M",
        ]);
        Parameter::create([
            'slug' => "startAtoTime",
            'value' => "08:45:00",
            'description' => "Thời gian bắt đầu ATO",
        ]);
        Parameter::create([
            'slug' => "endAtoTime",
            'value' => "09:00:00",
            'description' => "Thời gian kết thúc ATO",
        ]);
        Parameter::create([
            'slug' => "startAtcTime",
            'value' => "14:30:00",
            'description' => "Thời gian bắt đầu ATC",
        ]);
        Parameter::create([
            'slug' => "endAtcTime",
            'value' => "14:45:00",
            'description' => "Thời gian kết thúc ATC",
        ]);
        Parameter::create([
            'slug' => "startBreakTime",
            'value' => "11:30:00",
            'description' => "Thời gian bắt đầu nghỉ trưa",
        ]);
        Parameter::create([
            'slug' => "endBreakTime",
            'value' => "13:00:00",
            'description' => "Thời gian kết thúc nghỉ trưa",
        ]);
        Parameter::create([
            'slug' => "socketEnable",
            'value' => "1",
            'description' => "Bật socket",
        ]);
    }
}
