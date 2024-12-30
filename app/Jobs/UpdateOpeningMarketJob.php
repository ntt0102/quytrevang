<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateOpeningMarketJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

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
        $date = $this->getLastOpeningDate();
        set_global_value('lastOpeningDate', $date);

        $isOpeningMarket = $date == date('Y-m-d');
        set_global_value('openingMarketFlag', $isOpeningMarket ? '1' : '0');

        if ($isOpeningMarket) {
            set_global_value('entryOrderId', '');
            set_global_value('tpOrderId', '');
            set_global_value('slOrderId', '');
            set_global_value('exitOrderId', '');
        }
    }

    private function getLastOpeningDate()
    {
        $date = new \DateTime();
        while (!check_opening_market($date)) {
            $date->modify('-1 day');
        }
        return $date->format('Y-m-d');
    }
}
