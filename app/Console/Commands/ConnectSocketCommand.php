<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ConnectSocketCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'socket:connect';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Connect socket';

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
        app(\App\Services\AppService::class)->vpsWebSocket();
    }
}
