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
            if (check_opening_market()) {
                set_global_value('runningSocketFlag', '0');
                app(\App\Repositories\VpsRepository::class)->clear();
            }
        })->dailyAt('08:40');
        //
        $schedule->call(function () {
            if (check_opening_market()) {
                app(\App\Services\VpsService::class)->setAtoStrategy();
            }
        })->dailyAt('09:01');
        //
        $schedule->call(function () {
            if (check_opening_market()) {
                set_global_value('reportedTradingFlag', '0');
                set_global_value('runningSocketFlag', '0');
                app(\App\Repositories\VpsRepository::class)->clear();
            }
        })->dailyAt('14:25');
        //
        $schedule->call(function () {
            if (check_opening_market())
                app(\App\Services\Special\SocketService::class)->connectVps();
        })->everyMinute()
            ->between(trading_time('startAtoTime'), trading_time('endAtcTime'));
        //
        $schedule->call(function () {
            if (check_opening_market()) {
                app(\App\Services\Admin\ShareService::class)->getData();
                app(\App\Services\Admin\Vn30f1mService::class)->getData();
            }
        })->dailyAt('15:00');
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
