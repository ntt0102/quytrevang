<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Copyist;

class CopyistsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Copyist::create([
            'user_code' => '121992',
            'vps_code' => '228582',
        ]);
    }
}
