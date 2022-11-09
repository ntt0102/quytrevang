<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class TradesUpdateCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trades:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Trades update data';

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
        if (
            app(\App\Services\AppService::class)->vpsConfig()
            && get_global_value('updatedTradesFlag') == '1'
        ) {
            set_global_value('updatedTradesFlag', '0');
        }
    }
}
