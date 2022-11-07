<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contract;

class ContractsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Contract::create([
            'code' => 10000000,
            'user_code' => 121992,
            'principal' => 10000000,
            'interest_rate' => 0.005,
            'paid_at' => '2020-5-5',
            'withdrawn_at' => '2021-5-5',
            'paid_docs' => ['1.pnj'],
            'withdrawn_docs' => ['1.pnj'],
            'confirmed_by' => 121992,
        ]);
        Contract::create([
            'code' => 10000001,
            'user_code' => 121992,
            'principal' => 5000000,
            'interest_rate' => 0.005,
            'paid_at' => '2020-5-5',
            'withdrawn_at' => '2021-5-5',
            'advance' => 1000000,
            'paid_docs' => ['1.pnj'],
            'confirmed_by' => 121992,
        ]);
        Contract::create([
            'code' => 10000002,
            'user_code' => 121992,
            'principal' => 20000000,
            'interest_rate' => 0.005,
            'paid_at' => '2021-5-1',
            'paid_docs' => ['1.pnj'],
            'confirmed_by' => 121992,
        ]);
        Contract::create([
            'code' => 10000003,
            'user_code' => 121992,
            'principal' => 40000000,
            'interest_rate' => 0.005,
            'paid_at' => '2021-5-1',
            'paid_docs' => ['1.pnj']
        ]);
        Contract::create([
            'code' => 10000004,
            'user_code' => 121992,
            'principal' => 30000000,
            'interest_rate' => 0.005,
            'paid_at' => '2021-5-1'
        ]);
        Contract::create([
            'code' => 10000005,
            'user_code' => 230395,
            'principal' => 20000000,
            'interest_rate' => 0.005,
            'paid_at' => '2021-5-1'
        ]);
    }
}
