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
            $openingMarketFlag = app(\App\Services\SmartOrderService::class)->checkOpeningMarket();
            set_global_value('openingMarketFlag', $openingMarketFlag ? '1' : '0');
            if ($openingMarketFlag)
                set_global_value('reportedTradingFlag', '0');
        })->dailyAt('00:30');
        //
        $schedule->call(function () {
            if (get_global_value('openingMarketFlag') == '1')
                app(\App\Services\SmartOrderService::class)->exportToCsv();
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
