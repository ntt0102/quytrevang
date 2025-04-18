<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Jobs\UpdateHolidaysJob;
use App\Jobs\BackupDatabaseJob;
use App\Jobs\CleanDatabaseJob;
use App\Jobs\UpdateOpeningMarketJob;
use App\Jobs\UpdateVn30f1mSymbolJob;
use App\Jobs\ReportTradingJob;
use App\Jobs\ExportDerVpsJob;
use App\Jobs\OrderDerivativeJob;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->job(new UpdateHolidaysJob)->yearlyOn(1, 1, '01:00');
        $schedule->command('tokens:delete-expired')->daily();
        $schedule->job(new CleanDatabaseJob)->daily();
        $schedule->job(new BackupDatabaseJob)->daily();
        $schedule->job(new UpdateOpeningMarketJob)->dailyAt('08:45');
        $schedule->job(new UpdateVn30f1mSymbolJob)->dailyAt('08:45');

        if (get_global_value('openingMarketFlag') == '1') {
            $schedule->job(new ReportTradingJob)->dailyAt('14:47');
            // $schedule->job(new ExportDerVpsJob)->dailyAt('14:48');
            $schedule->command('clone:data --type=export')->dailyAt('14:48');
            if (in_trading_time()) {
                $schedule->job(new OrderDerivativeJob)->everyMinute();
                // $schedule->command('clone:data --type=scan')->everyMinute();
            }
        }
        $schedule->command('queue:work --stop-when-empty')->everyMinute();
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
