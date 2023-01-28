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
        'App\Console\Commands\CleanSubscriptionCommand',
        'App\Console\Commands\RunSocketCommand',
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
        $schedule->command('socket:run')->everyMinute();
        //
        $schedule->call(function () {
            $openingMarketFlag = app(\App\Services\VpsService::class)->checkOpeningMarket();
            set_global_value('openingMarketFlag', $openingMarketFlag ? '1' : '0');
            if ($openingMarketFlag) {
                set_global_value('runningSocketFlag', '0');
                app(\App\Repositories\VpsRepository::class)->clear();
            }
        })->dailyAt('08:40');
        //
        $schedule->call(function () {
            if (get_global_value('openingMarketFlag') == '1') {
                set_global_value('reportedTradingFlag', '0');
                set_global_value('runningSocketFlag', '0');
                app(\App\Services\VpsService::class)->setAtoStrategy();
            }
        })->dailyAt('11:35');
        //
        $schedule->call(function () {
            if (get_global_value('openingMarketFlag') == '1') {
                if (app(\App\Services\Special\SocketService::class)->inTradingTimeRange()) {
                    if (get_global_value('runningSocketFlag') == '0') {
                        set_global_value('runningSocketFlag', '1');
                        set_global_value('startSocketTime', now()->format('H:i:s'));
                        app(\App\Services\Special\SocketService::class)->connectVps();
                    } else if (!app(\App\Services\Special\SocketService::class)->inSocketTimeLimit())
                        set_global_value('runningSocketFlag', '0');
                } else if (get_global_value('runningSocketFlag') == '1')
                    set_global_value('runningSocketFlag', '0');
            }
        })->everyMinute();
        // ->between(trading_time('startAtoTime', true), trading_time('endAtcTime', true))
        // ->unlessBetween(trading_time('startBreakTime', true), trading_time('endBreakTime', true));
        //
        $schedule->call(function () {
            if (get_global_value('openingMarketFlag') == '1') {
                app(\App\Services\Admin\ShareService::class)->getData();
                app(\App\Services\Admin\Vn30f1mService::class)->getData();
            }
        })->dailyAt('14:46');
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
