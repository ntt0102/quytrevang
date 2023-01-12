<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::any('{all}', function () {
    return view('app');
})->where('all', '^((?!test|cache|migrate).)*?');

Route::get('cache', function () {
    exec('php ../artisan config:cache', $output, $return);
    if ($return != 0) return dd($output);
    return "Cache done!";
});

Route::get('migrate', function () {
    set_time_limit(300);
    exec('php ../artisan migrate:refresh --seed', $output, $return);
    if ($return != 0) return dd($output);
    exec('php ../artisan passport:install --force', $output, $return);
    if ($return != 0) return dd($output);
    return "Migrate done!";
});

Route::get('test', function () {
    // $s = app(\App\Services\VpsService::class)->setAtoStrategy();
    // $s = app(\App\Repositories\StrategyRepository::class)->getStrategies(-10, -5);
    // dd($s);
    $n = now()->sub(date_interval_create_from_date_string('178 minutes'));
    // dd($n->format('Y-m-d H:i:s'));
    $v = app(\App\Repositories\VpsRepository::class)->where([['type', 0], ['x', '<=', $n->format('Y-m-d H:i:s')]]);
    dd($v);
})->middleware('cors');
