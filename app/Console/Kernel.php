<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        'App\Console\Commands\BackupDatabaseCommand',
        'App\Console\Commands\CleanSubscriptionCommand'
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('database:backup')->daily();
        $schedule->command('subscription:clean')->yearly();
        //
        $schedule->call(function () {
            $openingMarketFlag = app(\App\Services\VpsService::class)->checkOpeningMarket();
            set_global_value('openingMarketFlag', $openingMarketFlag ? '1' : '0');
            if ($openingMarketFlag) {
                set_global_value('bidPrice', '0');
                set_global_value('askPrice', '0');
                set_global_value('reportedTradingFlag', '0');
                app(\App\Repositories\VpsRepository::class)->clear();
            }
        })->dailyAt('08:55');
        //
        // $schedule->call(function () {
        //     if (get_global_value('openingMarketFlag') == '1') {
        //         set_global_value('reportedTradingFlag', '0');
        //         app(\App\Services\VpsService::class)->setAtoStrategy();
        //     }
        // })->dailyAt('11:35');
        //
        $schedule->call(function () {
            if (get_global_value('openingMarketFlag') == '1') {
                set_global_value('startSocketTime', now()->format('H:i:s'));
                app(\App\Services\Special\SocketService::class)->connectVps();
            }
        })->everyMinute()
            ->between(trading_time('startTradingTime', true), trading_time('endTradingTime', true))
            ->unlessBetween(trading_time('startBreakTime', true), trading_time('endBreakTime', true));
        //
        $schedule->call(function () {
            if (get_global_value('openingMarketFlag') == '1')
                // app(\App\Services\Admin\ShareService::class)->getData();
                // app(\App\Services\Admin\Vn30f1mService::class)->getData();
                app(\App\Services\VpsService::class)->exportToCsv();
        })->dailyAt('14:35');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
