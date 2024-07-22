<?php

use Illuminate\Support\Facades\Route;
use PhpParser\Node\Expr\Cast\Object_;

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
    // exec('php ../artisan config:cache', $output, $return);
    // if ($return != 0) return dd($output);
    // return "Cache done!";
});

Route::get('migrate', function () {
    // set_time_limit(300);
    // exec('php ../artisan migrate:refresh --seed', $output, $return);
    // if ($return != 0) return dd($output);
    // exec('php ../artisan passport:install --force', $output, $return);
    // if ($return != 0) return dd($output);
    // return "Migrate done!";
});

Route::get('test', function () {
    // $s = \App\Models\DrawTool::where('name', 'range')->orderByRaw("point ASC")->pluck('data', 'point');
    // $s = \App\Models\StockOrder::opening()->get('symbol')->pluck('symbol');
    // $s = $s->map(function ($s) {
    //     return ' ' . $s;
    // })->toArray();
    // $copyist = \App\Models\User::find(1)->copyist;
    // $vos = new \App\Services\Special\VpsOrderService($copyist);
    // // dd($vos->hasOrder());
    // dd($vos->hasOrder() || $vos->hasConditionOrder());
    // dd(strtotime("2022-04-04"));
    // $result = array();
    // $ss = \App\Models\DrawTool::where('symbol', 'VNINDEX')->orderByRaw("name ASC, point ASC")->get(['name', 'point', 'data']);
    // foreach ($ss as $d) {
    //     if (!isset($result[$d->name])) $result[$d->name] = array();
    //     $result[$d->name][$d->point] = $d->data;
    // }
    // $s->each(function ($d) {
    //     if (!isset($result[$d->name])) $result[$d->name] = array();
    //     $result[$d->name][$d->point] = $d;
    // });
    // dd($result);
    // set_time_limit(500);
    // $payload = (object)['from' => strtotime("2022-04-04"), 'to' => strtotime("2023-09-07"), 'type' => 'cash'];
    // $filter = App\Jobs\FilterStockJob::dispatch($payload);
    // dd(strtotime('02-04-2024') . '-' . strtotime('2024-04-02'));
    // dd(date('Y-m-d H:i:s', 1712028936));
    // // $filter = app(\App\Services\Trading\StockService::class)->getSymbols(false);
    // // $filter = app(\App\Services\Trading\StockService::class)->filterSymbols($payload);
    // $payload = (object)['symbol' => 'HAS', 'from' => 1618576947, 'to' => 1713271767, 'timeframe' => 'D', 'name' => 'vn100', 'kind' => 'f_bottom', 'foreign' => true, 'dividend' => false, 'vnindex' => true];
    // $payload = (object)['symbol' => 'NKG', 'from' => 1648080000, 'to' => 1674777600, 'timeframe' => 'D', 'name' => 'vn100', 'kind' => 'f_bottom', 'foreign' => true, 'dividend' => false, 'vnindex' => true];
    // $payload = (object)['symbol' => 'AAA', 'from' => 1698710400, 'to' => 1713225600, 'timeframe' => 'D', 'name' => 'vn100', 'kind' => 'f_top', 'foreign' => true, 'dividend' => false, 'vnindex' => true];
    // $payload = (object)['symbol' => 'AAA', 'from' => 1618557594, 'to' => 1713251994, 'timeframe' => 'D', 'name' => 'vn100', 'kind' => 'f_top', 'foreign' => true, 'dividend' => false, 'vnindex' => true];
    // $s = app(\App\Services\Trading\StockService::class)->getEvents($payload);
    // $s = app(\App\Services\Trading\StockService::class)->getDataFireAnt($payload);
    // $s = app(\App\Services\Trading\StockService::class)->getData($payload)['rsi'];
    // $s = \App\Jobs\FilterStockJob::dispatch($payload);
    // $s = \App\Jobs\FilterJob::dispatch($payload);
    // $s = new \App\Jobs\FilterStockJob($payload);
    // $s = $s->getForeignRatio($payload);
    // $s = $s->getRatio($payload);
    // $s = app(\App\Services\Special\CsvService::class)->convert();
    // $s = app(\App\Services\Trading\OrderChartService::class)->cloneDnseData();
    // $s = app(\App\Services\Trading\OrderChartService::class)->generateDataFromApi();
    // $s = file_exists(storage_path('app'));
    // $token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxODg5NjIyNTMwLCJuYmYiOjE1ODk2MjI1MzAsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsiYWNhZGVteS1yZWFkIiwiYWNhZGVteS13cml0ZSIsImFjY291bnRzLXJlYWQiLCJhY2NvdW50cy13cml0ZSIsImJsb2ctcmVhZCIsImNvbXBhbmllcy1yZWFkIiwiZmluYW5jZS1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImludmVzdG9wZWRpYS1yZWFkIiwib3JkZXJzLXJlYWQiLCJvcmRlcnMtd3JpdGUiLCJwb3N0cy1yZWFkIiwicG9zdHMtd3JpdGUiLCJzZWFyY2giLCJzeW1ib2xzLXJlYWQiLCJ1c2VyLWRhdGEtcmVhZCIsInVzZXItZGF0YS13cml0ZSIsInVzZXJzLXJlYWQiXSwianRpIjoiMjYxYTZhYWQ2MTQ5Njk1ZmJiYzcwODM5MjM0Njc1NWQifQ.dA5-HVzWv-BRfEiAd24uNBiBxASO-PAyWeWESovZm_hj4aXMAZA1-bWNZeXt88dqogo18AwpDQ-h6gefLPdZSFrG5umC1dVWaeYvUnGm62g4XS29fj6p01dhKNNqrsu5KrhnhdnKYVv9VdmbmqDfWR8wDgglk5cJFqalzq6dJWJInFQEPmUs9BW_Zs8tQDn-i5r4tYq2U8vCdqptXoM7YgPllXaPVDeccC9QNu2Xlp9WUvoROzoQXg25lFub1IYkTrM66gJ6t9fJRZToewCt495WNEOQFa_rwLCZ1QwzvL0iYkONHS_jZ0BOhBCdW9dWSawD6iF1SIQaFROvMDH1rg";
    // $client = new \GuzzleHttp\Client(['headers' => ['authorization' => "Bearer {$token}"]]);
    // $client = new \GuzzleHttp\Client();
    // // $url = "https://svr5.fireant.vn/api/Data/Companies/TimescaleMarks?symbol=TPB&startDate=2023-3-14&endDate=2037-1-1";
    // $url = "https://restv2.fireant.vn/symbols/TPB/timescale-marks?startDate=2022-12-29&endDate=2037-01-01";
    // $s = json_decode($res->getBody());
    // $s = app(\App\Services\Trading\StockService::class)->getDataSsiWithTimeframe($rsp, 'W');
    // $s = app(\App\Services\Trading\StockService::class)->removeFilterList($payload);
    // dd($filter);
    // $date = date('Y-m-d');
    // dd(get_global_value('openingMarketFlag'));
    // dd('2023-12-25' == $date && get_global_value('openingMarketFlag') == '1' && time() < strtotime('15:00:00'));
    // $client = new \GuzzleHttp\Client();
    // $url = "https://www.hsx.vn/Modules/Listed/Web/StockIndex/188803177?rows=1&page=1";
    // $res = $client->get($url);
    // $rsp = json_decode($res->getBody())->rows;
    // $s = array_map(function ($item) {
    //     return ' ' . str_replace(' ', '', $item->cell[2]);
    // }, $rsp);
    // $s = $rsp;
    // \Log::info('Hello world!!');
    // $s = \App\Models\StockOrder::getProfitChart('quarter', '2023-03-04', '2024-03-04');
    // $o = \App\Models\StockOrder::find(1);
    // $s = app(\App\Services\Trading\StatisticService::class)->getOpening($o);
    // $s = app(\App\Services\Trading\StatisticService::class)->calculateProfit($o);
    // $o = (object)[
    //     'receiver' => 1,
    //     'title' => 'test',
    //     'body' => 'OK'
    // ];
    // $s = app(\App\Services\Setting\NotificationService::class)->send($o);
    // $params = [
    //     'test' => 'tho',
    // ];
    // $receiver = \App\Models\User::whereIn('code', ['121992'])->get();
    // \Illuminate\Support\Facades\Notification::send(
    //     $receiver,
    //     new \App\Notifications\CoreNotification($params, false, true)
    // );
    \Illuminate\Support\Facades\Artisan::call('connect:socket');
    // $date = '2024-07-18';
    // $file = storage_path('app/cophieu/date.txt');
    // $isUpdated = false;
    // if (file_exists($file)) {
    //     $fp = fopen($file, 'r');
    //     $line = fgets($fp);
    //     if (!!$line && $date <= $line) $isUpdated = true;
    //     fclose($fp);
    // }
    // file_put_contents($file, $date);
    // dd($isUpdated);
    // $s = \App\Models\StockSymbol::where('name', 'vn100')->select('symbols')->first();
    // dd($s->symbols);
    // \App\Jobs\ExportTradingJob::dispatch();
    // \App\Jobs\GetDnseEmailOtpJob::dispatch();
    // $emailOtp = "";
    // $client = \Webklex\IMAP\Facades\Client::account('default');
    // $client->connect();
    // $folder = $client->getFolders();
    // // dd($folder);
    // $folder = $client->getFolderByPath('[Gmail]/Quan tr&Hs0-ng');
    // $messages = $folder->messages()->from('quytrevang@gmail.com')->unseen()->limit(1)->get();
    // dd($messages);
    // $messages[0]->move('[Gmail]/Th&APk-ng r&AOE-c');
    // while (!$emailOtp) {
    //     // $messages = $folder->messages()->from('noreply@mail.dnse.com.vn')->unseen()->limit(1)->get();
    //     $messages = $folder->messages()->from('quytrevang@gmail.com')->unseen()->limit(1)->get();
    //     echo count($messages);
    //     echo "\n";
    //     if (count($messages)) {
    //         preg_match('/\b\d{6}\b/', $messages[0]->getHTMLBody(), $otpMatches);
    //         if ($otpMatches) $emailOtp = $otpMatches[0];
    //     }
    // }
    // $client->disconnect();
    // set_global_value('dnseEmailOtp', $emailOtp);
    // $client = new \GuzzleHttp\Client();
    // $jayParsedAry = [
    //     "operationName" => "GetTicksBySymbol",
    //     "query" => 'query GetTicksBySymbol {
    //   GetTicksBySymbol(symbol: "VN30F2407", date: "2024-07-15", limit: 20) {
    //     data {
    //       symbol
    //       matchPrice
    //       matchQtty
    //       sendingTime: time
    //       side
    //     }
    //   }
    // }
    // ',
    //     "variables" => []
    // ];


    // $data = [
    //     'headers' => [
    //         'Content-Type' => 'application/json',
    //     ],
    //     'json' => [
    //         "operationName" => "GetTicksBySymbol",
    //         "query" => 'query GetTicksBySymbol {
    //   GetTicksBySymbol(symbol: "VN30F2407", date: "2024-07-15", limit: 20) {
    //     data {
    //       symbol
    //       matchPrice
    //       matchQtty
    //       sendingTime: time
    //       side
    //     }
    //   }
    // }
    // ',
    //         "variables" => []
    //     ],
    // ];
    // $req = $client->post('https://services.entrade.com.vn/price-api/query', $data);
    // $s = json_decode($req->getBody());

    // $data = [
    //     'json' => [
    //         "operationName" => "GetTicksBySymbol",
    //         "query" => 'query GetTicksBySymbol {
    //             GetTicksBySymbol(symbol: "VN30F2407", date: "2024-07-15", limit: 6) {
    //                 data {
    //                     symbol
    //                     matchPrice
    //                     matchQtty
    //                     time
    //                     side
    //                 }
    //             }
    //         }',
    //         "variables" => (object)[]
    //     ],
    // ];

    // $req = $client->post('https://services.entrade.com.vn/price-api/query', $data);
    // $s = json_decode($req->getBody())->data->GetTicksBySymbol->data;



    // echo $rsp->token;
    // set_global_value('dnseAccessToken', $rsp->token);
    // $s = new \App\Services\Special\VpsOrderService();
    // $s = new \App\Services\Special\SocketService();
    // $s->connectSocket();
    // \App\Jobs\ConnectSocketJob::dispatch();
    // $s = '2024-07-15' || date('Y-m-d');
    // dd($s);
    return 'ok';
});
