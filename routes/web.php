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
    // error_log('Some message here.');
    // $text = '["stockps",{"data":{"cmd":"ALGO.VN30","date":"09/11/2022 03:17:58","index":979.68,"change":"-0.41","calculate":"-0.49","ff":"0","id":8888}}]';
    // $json = json_decode($text)[1]->data;
    // if ($json->id == 3220) {
    //     $data = ['x' => now(), 'y' => $json->lastPrice, 'type' => false];
    // }
    // if ($json->id == 3310) {
    //     $data = ['x' => now(), 'y' => $json->BVolume - $json->SVolume, 'type' => true];
    // }
    $uri = 'wss://datafeed.vps.com.vn/socket.io/?EIO=3&transport=websocket';
    $socket = \Ratchet\Client\connect($uri);
    dd($socket);
})->middleware('cors');
