<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Strategy;

class StrategiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Strategy::create([
            'date' => "2022-12-05",
            // 'trend' => -35.7,
            'trend' => -24.5,
            'atc' => 7.7,
            'ato' => -1,
        ]);
        Strategy::create([
            'date' => "2022-12-06",
            // 'trend' => -13.2,
            'trend' => -13.1,
            'atc' => -5.9,
            'ato' => -6,
        ]);
        Strategy::create([
            'date' => "2022-12-07",
            // 'trend' => -14.4,
            'trend' => -8.2,
            'atc' => 12,
            'ato' => -1,
        ]);
        Strategy::create([
            'date' => "2022-12-08",
            // 'trend' => 12.8,
            'trend' => 12.1,
            'atc' => -9.7,
            'ato' => 4,
        ]);
        Strategy::create([
            'date' => "2022-12-09",
            // 'trend' => 17,
            'trend' => 16,
            'atc' => -1,
            'ato' => -1,
        ]);
        Strategy::create([
            'date' => "2022-12-12",
            // 'trend' => -18.4,
            'trend' => -16.8,
            'atc' => -4,
            'ato' => 3.9,
        ]);
        Strategy::create([
            'date' => "2022-12-13",
            // 'trend' => 28.9,
            'trend' => 28.9,
            'atc' => 0.4,
            'ato' => 10,
        ]);
        Strategy::create([
            'date' => "2022-12-14",
            // 'trend' => -9.1,
            'trend' => -9.1,
            'atc' => 7,
            'ato' => -0.2,
        ]);
        Strategy::create([
            'date' => "2022-12-15",
            // 'trend' => -14.8,
            'trend' => -9.7,
            'atc' => 0,
            'ato' => -6,
        ]);
        Strategy::create([
            'date' => "2022-12-16",
            // 'trend' => -9.5,
            'trend' => -8.7,
            'atc' => 0,
            'ato' => -4,
        ]);
        Strategy::create([
            'date' => "2022-12-19",
            // 'trend' => -24.4,
            'trend' => -24.4,
            'atc' => -4.2,
            'ato' => -3.5,
        ]);
        Strategy::create([
            'date' => "2022-12-20",
            // 'trend' => 29.1,
            'trend' => 19.6,
            'atc' => 0,
            'ato' => 3,
        ]);
        Strategy::create([
            'date' => "2022-12-21",
            // 'trend' => 18.5,
            'trend' => 18.5,
            'atc' => 9,
            'ato' => 6.5,
        ]);
        Strategy::create([
            'date' => "2022-12-22",
            // 'trend' => 8.3,
            'trend' => 7.2,
            'atc' => -1.8,
            'ato' => -6.7,
        ]);
        Strategy::create([
            'date' => "2022-12-23",
            // 'trend' => 28.4,
            'trend' => 21.2,
            'atc' => -9.2,
            'ato' => -4.4,
        ]);
        Strategy::create([
            'date' => "2022-12-26",
            // 'trend' => -19,
            'trend' => -17.4,
            'atc' => -7.3,
            'ato' => 3.5,
        ]);
        Strategy::create([
            'date' => "2022-12-27",
            // 'trend' => 26.5,
            'trend' => 26.5,
            'atc' => -9,
            'ato' => -2.9,
        ]);
        Strategy::create([
            'date' => "2022-12-28",
            // 'trend' => -11.7,
            'trend' => -8.7,
            'atc' => -1,
            'ato' => -5.5,
        ]);
        Strategy::create([
            'date' => "2022-12-29",
            // 'trend' => -12.5,
            'trend' => -11.9,
            'atc' => -9.1,
            'ato' => 4,
        ]);
        Strategy::create([
            'date' => "2022-12-30",
            // 'trend' => -12.2,
            'trend' => -9.8,
            'atc' => 6.5,
            'ato' => -4.6,
        ]);
    }
}
