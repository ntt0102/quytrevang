<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Jobs\BackupDatabaseJob;
use App\Jobs\CleanSubscriptionJob;
use App\Jobs\UpdateOpeningMarketJob;
use App\Jobs\UpdateVn30f1mSymbolJob;
use App\Jobs\ReportTradingJob;
use App\Jobs\ExportTradingJob;
use App\Jobs\ExportStockJob;

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
        $schedule->job(new BackupDatabaseJob)->daily();
        $schedule->job(new CleanSubscriptionJob)->yearly();
        $schedule->job(new UpdateOpeningMarketJob)->dailyAt('08:45');
        $schedule->job(new UpdateVn30f1mSymbolJob)->fridays()->at('09:00');

        $schedule->job(new ReportTradingJob)->dailyAt('14:46');
        $schedule->job(new ExportTradingJob)->dailyAt('14:46');
        // $schedule->job(new ExportStockJob)->dailyAt('14:46');
        $schedule->command('stock:export')->dailyAt('14:46');

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
