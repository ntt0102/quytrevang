<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\ShareSymbol;
use App\Features\Trading\Services\ShareService;
use App\Notifications\FilteredShareNotification;
use Illuminate\Support\Facades\Notification;
use App\Models\User;

class FilterShareJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $group;
    private $filterTimes;
    public $tries = 1;
    public $timeout = 3600;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($group, $filterTimes)
    {
        $this->group = $group;
        $this->filterTimes = $filterTimes;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $shareService = app(ShareService::class);
        $result = $shareService->filterStock($this->group, $this->filterTimes);
        if ($result) {
            ShareSymbol::updateOrCreate(['name' => 'FILTER'], ['symbols' => $result->symbols]);
        }
        Notification::send(
            User::permission('admin:access_share')->get(),
            new FilteredShareNotification($result)
        );
    }
}
