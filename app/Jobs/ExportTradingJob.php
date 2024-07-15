<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ExportTradingJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $SHIFT_TIME = 7 * 60 * 60;

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
        if (get_global_value('openingMarketFlag') == '1') {
            $date = date('Y-m-d');
            $file = storage_path('app/phaisinh/' . $date . '/.csv');
            if (file_exists($file)) return false;
            //
            $orderChartService = app(\App\Services\Trading\OrderChartService::class);
            $data = $orderChartService->cloneVn30f1mData();
            if (!count($data)) return false;

            $fp = fopen($file, 'w');
            foreach ($data as $item) {
                $line = [];
                $line[] = strtotime($item->Date) + $this->SHIFT_TIME;
                $line[] = $item->Price;
                $line[] = $item->Volume;
                $line[] = $item->Side == 'B' ? 1 : ($item->Side == 'S' ? -1 : 0);
                fputcsv($fp, $line);
            }
            fclose($fp);
        }
    }
}
