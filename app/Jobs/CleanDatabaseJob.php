<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class CleanDatabaseJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct() {}

    /**
     * Execute the job.
     *
     * @return void
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
        DB::table('notifications')->where('created_at', '<', now()->subDays(30))->delete();
        DB::table('oauth_access_tokens')->where('expires_at', '<', now())->delete();
    }
}
