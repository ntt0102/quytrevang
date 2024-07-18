<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Notification;
use App\Notifications\ExportStockNotification;

class ExportStockCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stock:export';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Export Stock';

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
        if (get_global_value('openingMarketFlag') == '1') {
            $receiver = User::where('code', '121992')->get();
            Notification::send(
                $receiver,
                new ExportStockNotification()
            );
        }
    }
}
