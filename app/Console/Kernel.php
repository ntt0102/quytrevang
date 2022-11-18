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
        'App\Console\Commands\TradeVpsCommand',
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
                set_global_value('reportedTradingFlag', '0');
                set_global_value('runningSocketFlag', '0');
                set_global_value('socketVol10Temp', '{"side":"B","B":0,"S":0}');
                app(\App\Repositories\VpsRepository::class)->clear(7);
            }
        })->dailyAt('08:40');
        $schedule->call(function () {
            if (check_opening_market()) {
                set_global_value('startScheduleTime', now()->format('H:i:s'));
                app(\App\Services\Special\SocketService::class)->connectVps();
            }
        })->everyMinute()->between(trading_time('startAtoTime'), trading_time('endAtcTime'))
            ->unlessBetween(trading_time('endAtoTime'), trading_time('startAtcTime'));
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
