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
            'trend' => -1,
            'momentum' => -1.2,
            'atc' => 7.7,
            'ato' => -1,
        ]);
        Strategy::create([
            'date' => "2022-12-06",
            'trend' => -2,
            'momentum' => 0.7,
            'atc' => -5.9,
            'ato' => -6,
        ]);
        Strategy::create([
            'date' => "2022-12-07",
            'trend' => -1,
            'momentum' => 0,
            'atc' => 12,
            'ato' => -1,
        ]);
        Strategy::create([
            'date' => "2022-12-08",
            'trend' => 2,
            'momentum' => -0.6,
            'atc' => -9.7,
            'ato' => 4,
        ]);
        Strategy::create([
            'date' => "2022-12-09",
            'trend' => 2,
            'momentum' => -0.5,
            'atc' => -1,
            'ato' => -1,
        ]);
        Strategy::create([
            'date' => "2022-12-12",
            'trend' => -1,
            'momentum' => -0.2,
            'atc' => -4,
            'ato' => 3.9,
        ]);
        Strategy::create([
            'date' => "2022-12-13",
            'trend' => 2,
            'momentum' => 0.5,
            'atc' => 0.4,
            'ato' => 10,
        ]);
        Strategy::create([
            'date' => "2022-12-14",
            'trend' => -2,
            'momentum' => -0.1,
            'atc' => 7,
            'ato' => -0.2,
        ]);
        Strategy::create([
            'date' => "2022-12-15",
            'trend' => -1,
            'momentum' => 0.5,
            'atc' => 0,
            'ato' => -6,
        ]);
        Strategy::create([
            'date' => "2022-12-16",
            'trend' => -2,
            'momentum' => 0.8,
            'atc' => 0,
            'ato' => -4,
        ]);
        Strategy::create([
            'date' => "2022-12-19",
            'trend' => -2,
            'momentum' => -0.5,
            'atc' => -4.2,
            'ato' => -3.5,
        ]);
        Strategy::create([
            'date' => "2022-12-20",
            'trend' => 1,
            'momentum' => 0.4,
            'atc' => 0,
            'ato' => 3,
        ]);
        Strategy::create([
            'date' => "2022-12-21",
            'trend' => 2,
            'momentum' => 0,
            'atc' => 9,
            'ato' => 6.5,
        ]);
        Strategy::create([
            'date' => "2022-12-22",
            'trend' => 1,
            'momentum' => -0.1,
            'atc' => -1.8,
            'ato' => -6.7,
        ]);
        Strategy::create([
            'date' => "2022-12-23",
            'trend' => 2,
            'momentum' => -1,
            'atc' => -9.2,
            'ato' => -4.4,
        ]);
        Strategy::create([
            'date' => "2022-12-26",
            'trend' => -1,
            'momentum' => 1.1,
            'atc' => -7.3,
            'ato' => 3.5,
        ]);
        Strategy::create([
            'date' => "2022-12-27",
            'trend' => 1,
            'momentum' => 0,
            'atc' => -9,
            'ato' => -2.9,
        ]);
        Strategy::create([
            'date' => "2022-12-28",
            'trend' => 1,
            'momentum' => 0,
            'atc' => -1,
            'ato' => -5.5,
        ]);
        Strategy::create([
            'date' => "2022-12-29",
            'trend' => -2,
            'momentum' => 0.1,
            'atc' => -9.1,
            'ato' => 4,
        ]);
        Strategy::create([
            'date' => "2022-12-30",
            'trend' => -2,
            'momentum' => -0.5,
            'atc' => 6.5,
            'ato' => -4.6,
        ]);
        Strategy::create([
            'date' => "2023-01-03",
            'trend' => 1,
            'momentum' => 0.1,
            'atc' => 8,
            'ato' => 1,
        ]);
        Strategy::create([
            'date' => "2023-01-04",
            'trend' => 1,
            'momentum' => -0.1,
            'atc' => -0.7,
            'ato' => 1.5,
        ]);
        Strategy::create([
            'date' => "2023-01-05",
            'trend' => -2,
            'momentum' => 0.8,
            'atc' => -1.2,
            'ato' => -0.6,
        ]);
        Strategy::create([
            'date' => "2023-01-06",
            'trend' => 1,
            'momentum' => 0.3,
            'atc' => 0.3,
            'ato' => null,
        ]);
    }
}
