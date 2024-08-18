<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Notifications\DatabaseNotification;

class CleanDatabaseCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'database:clean';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean Database';

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
        $users = User::with('pushSubscriptions')->has('pushSubscriptions', '>', 1)->get();
        foreach ($users as $user) {
            foreach ($user->pushSubscriptions as $sub) {
                if ($sub->updated_at->lessThan(now()->subDays(365))) {
                    $user->deletePushSubscription($sub->endpoint);
                }
            }
        }
        //
        DatabaseNotification::where('created_at', '<', now()->subDays(30))->delete();
    }
}
