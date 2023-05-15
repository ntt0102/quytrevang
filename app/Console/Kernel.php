<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Services\Admin\OrderChartService;

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
        $oCS = new OrderChartService();

        $schedule->command('queue:work --stop-when-empty')
            ->everyMinute()
            ->withoutOverlapping();

        $schedule->command('database:backup')->daily();
        $schedule->command('subscription:clean')->yearly();
        //
        $schedule->call(function () use ($oCS) {
            set_global_value('openingMarketFlag', $oCS->checkOpeningMarket() ? '1' : '0');
            set_global_value('vn30f1m', $oCS->getVn30f1mSymbol());
            // set_global_value('reportedTradingFlag', '0');
        })->dailyAt('06:30');
        //
        $schedule->call(function () use ($oCS) {
            $oCS->reportTrading();
            $oCS->exportToCsv();
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
