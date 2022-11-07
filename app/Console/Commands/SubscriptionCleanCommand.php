<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Repositories\UserRepository;

class SubscriptionCleanCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'subscription:clean';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean Subscription';

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
        $dateYearAgo = date_sub(date_create(), date_interval_create_from_date_string('1 year'));
        $users = app(UserRepository::class)->findAll();
        foreach ($users as $user) {
            $subs = $user->routeNotificationForWebPush();
            if (count($subs) > 1) {
                foreach ($subs as $sub) {
                    if ($sub->updated_at->lessThan($dateYearAgo))
                        $user->deletePushSubscription($sub->endpoint);
                }
            }
        }
    }
}
