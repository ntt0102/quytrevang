<?php

use Illuminate\Support\Facades\App;
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
    $port_number    = 8000;
    $IPadress_host    = "103.131.79.34";
    $hello_msg = "This is server";
    echo "Hitting the server :" . $hello_msg;
    $socket_creation = socket_create(AF_INET, SOCK_STREAM, 0) or die("Unable to create connection with socket\n");
    $server_connect = socket_connect($socket_creation, $IPadress_host, $port_number) or die("Unable to create connection with server\n");
    socket_write($socket_creation, $hello_msg, strlen($hello_msg)) or die("Unable to send data to the  server\n");
    $server_connect = socket_read($socket_creation, 1024) or die("Unable to read response from the server\n");
    echo "Message from the server :" . $server_connect;
    socket_close($socket_creation);
})->middleware('cors');
