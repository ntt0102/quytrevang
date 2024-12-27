<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\ShareSymbol;
use App\Services\Trading\ShareService;
use App\Notifications\FilteredShareNotification;
use Illuminate\Support\Facades\Notification;
use App\Models\User;

class FilterShareJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $group;
    private $t1;
    private $t2;
    private $t3;
    private $t4;
    public $tries = 1;
    public $timeout = 3600;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($param)
    {
        $this->group = $param->group;
        $this->t1 = $param->filterTimes[0];
        $this->t2 = $param->filterTimes[1];
        $this->t3 = $param->filterTimes[2];
        $this->t4 = $param->filterTimes[3];
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $shareService = app(ShareService::class);
        $result = $shareService->filterStock($this->group, $this->t1, $this->t2, $this->t3, $this->t4);
        if ($result) {
            ShareSymbol::updateOrCreate(['name' => 'FILTER'], ['symbols' => $result->symbols]);
        }
        Notification::send(
            User::permission('admin:access_share')->get(),
            new FilteredShareNotification($result)
        );
    }
}
