<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class CleanSubscriptionJob implements ShouldQueue
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
    public function __construct()
    {
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $date = date_create()->modify('-1 year');
        $users = User::all();
        foreach ($users as $user) {
            $subs = $user->routeNotificationForWebPush();
            if (count($subs) > 1) {
                foreach ($subs as $sub) {
                    if ($sub->updated_at->lessThan($date))
                        $user->deletePushSubscription($sub->endpoint);
                }
            }
        }
    }
}
