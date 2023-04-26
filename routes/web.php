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
    // $text = 'tho';
    // $key = 'key';
    // // $encrypted = app(\App\Services\SmartOrderService::class)->cryptoJsAesEncrypt($key, $text);
    // $encrypted = '{"ct":"tVh03CaS6JTXe690C/030Gjo24nPTDTiQozJrh3emoQ=","iv":"5b26bd6d9c67982e8dd5b8405ec91e16","s":"88e9e8aea4062416"}';
    // $s = $encrypted;
    // $decrypted = app(\App\Services\SmartOrderService::class)->cryptoJsAesDecrypt($key, $encrypted);
    // $s = $decrypted;
    // $vWord = 'NguyenTruongTho';
    // $customKey = \Illuminate\Encryption\Encrypter::generateKey(config('app.cipher'));
    // dd(base64_encode($customKey));
    // $customKey = '7Ko5X9IgJuKbsWe8IlSMDSPcxpudWvXxKQ9EIPQjnDg=';
    // $customKey = base64_decode($customKey);
    // $newEncrypter = new \Illuminate\Encryption\Encrypter($customKey, config('app.cipher'));
    // $s = $newEncrypter->encrypt($vWord);
    // dd($s);
    // $s = 'eyJpdiI6IkRoSE5SNkloNHdxMCt1YlJkL3QwZnc9PSIsInZhbHVlIjoiMlJmelRFSnFGbFVGQitwcXRVVHAzdz09IiwibWFjIjoiM2RiMTVjODZjODg4OTRmOWMyZWQ5Nzg5NTU3ZGYwZGFkZDVhMDJiMzhjMzdhYTVkYzk1ZWIyZjg4MzExZmM4NCJ9';
    // $s = $newEncrypter->decrypt($s);
    // $s = Illuminate\Support\Facades\Crypt::encrypt('tho');
    // $s = 'eyJpdiI6IjQrTGowYnN1RVJtRWROTTJaOWIyd1E9PSIsInZhbHVlIjoibkI2anNBN01jQXBqVmdodit6MURxZz09IiwibWFjIjoiMTgzMjJjZTM1ZDc3YTU0MjNjYTQ1OTczODg5ZTQ2MTlhMzdjZTlhY2I2MjZhMWI5MTVhZjZmNzYzODE1NWYyZCJ9';
    // $s = Illuminate\Support\Facades\Crypt::decrypt($s);
    // $customKey = Encrypter::generateKey(config('app.cipher'));
    // $s = $customKey;
    // $s = app(\App\Services\VpsService::class)->checkOpeningMarket();
    // $s = app(\App\Services\SmartOrderService::class)->getInfo('vn30f2304')->r;
    // $s = app(\App\Services\VpsService::class)->getVolumeByPrice();
    // $s = app(\App\Services\Admin\OrderChartService::class)->generateDataFromCsv('2023-04-22');
    // $s = app(\App\Services\VpsService::class);
    // $s = $s->getInfo($s->getSymbol())->r;
    // $s = app(\App\Services\SmartOrderService::class)->getFromCsv('2023-03-28');
    // $s = app(\App\Repositories\StrategyRepository::class)->getStrategies(-10, -5);
    // dd($s);
    // $n = now()->sub(date_interval_create_from_date_string('178 minutes'));
    // dd($n->format('Y-m-d H:i:s'));
    // $s = app(\App\Repositories\SmartOrderRepository::class)->hasDevice('24efbc2f1f3b09283ee0d2b246a665a0');
    // $s = app(\App\Repositories\VpsRepository::class)->getVolumeByPrice('');
    // $v = number_format('123.452', 2);
    // $s = is_numeric("1000.1");
    // $s = !![1, 2];
    // $s = \App\Models\User::find(1);
    // $s = $s->smartOrder->validDevice('24efbc2f1f3b09283ee0d2b246a665a01');
    // $s = date_create() < date_add(date_create($s->smartOrder->started_at), date_interval_create_from_date_string("7 days"));
    // $s = App\Models\VpsUser::where('vps_code', 2285828)->first()->update(['vps_session' => 'abc']);
    // $s = app(App\Services\Admin\OrderChartService::class)->setVpsUserSession();
    // $s = App\Models\VpsUser::getCopyists();
    // dd($s);
    // $vpsUser = App\Models\VpsUser::where('vps_code', 228582)->first();
    // $vos = new App\Services\Special\VpsOrderService($vpsUser, true);
    // $s = $vos->getRandom();
    // $s = $vos->getAccountStatus();
    // $s = $so->vps_accounts;
    // $s = new App\Services\Special\VpsOrderService($vpsUser);
    // $s = $s->status->{'connect'};
    // dd($s);
    // First day of the week.
    // echo $day = date('w');
    // echo $week_start = date('m-d-Y', strtotime('-' . $day . ' days'));
    // echo $week_end = date('m-d-Y', strtotime('+' . (6 - $day) . ' days'));
    // // First day of the month.
    // echo $query_date = '2023-04-25';
    // echo date('Y-m-01', strtotime($query_date));
    // echo date('Y-m-t', strtotime($query_date));
    // $date = date_create('2006-12-12');
    // $date->modify('-0 day');
    // echo $date->format('Y-m-d');
    $s = app(App\Services\Admin\TradeService::class)->calculateSummary('all');
    // $s = date("n/Y");
    dd($s);
})->middleware('cors');
