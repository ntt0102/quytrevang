<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Finbook;

class FinbooksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Finbook::create([
            'name' => "CKPS tại VPS",
            'balance' => 50000000,
            'last_transaction' => "Mở sổ mới",
            'display' => 1
        ]);
        Finbook::create([
            'name' => "Sổ tiết kiệm tại BIDV",
            'balance' => 70000000,
            'last_transaction' => "Mở sổ mới",
            'display' => 2
        ]);
        Finbook::create([
            'name' => "Sổ hưu trí ba má chồng",
            'balance' => 250000,
            'last_transaction' => "Mở sổ mới",
            'display' => 3
        ]);
        Finbook::create([
            'name' => "Sổ hưu trí ba má vợ",
            'balance' => 250000,
            'last_transaction' => "Mở sổ mới",
            'display' => 4
        ]);
    }
}
