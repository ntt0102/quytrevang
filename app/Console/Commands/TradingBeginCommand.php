<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class TradingBeginCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trading:begin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Trading begin';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $isOpeningMarket = app(\App\Services\AppService::class)->vpsCheckOpeningMarket();
        if ($isOpeningMarket) {
            if (time() < strtotime('08:45:00')) {
                set_global_value('reportedTradingFlag', '0');
                app(\App\Repositories\VpsRepository::class)->clear();
            } else {
                set_global_value('startSocketTime', now()->format('H:i:s'));
                app(\App\Services\AppService::class)->vpsWebSocket();
            }
        }
    }
}
