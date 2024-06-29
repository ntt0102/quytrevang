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
            $orderChartService = app(\App\Services\Trading\OrderChartService::class);
            $date = date('Y-m-d');
            $path = storage_path('app/phaisinh/' . $date);
            if (is_dir($path)) return false;
            if (!mkdir($path, 0777, true)) return false;
            $vn30f1mFile = $path . '/vn30f1m.csv';
            $vn30File = $path . '/vn30.csv';
            $vn30f1mData = $orderChartService->cloneVn30f1mData();
            $vn30Data = $orderChartService->cloneVn30Data();
            $fp = fopen($vn30f1mFile, 'w');
            foreach ($vn30f1mData as $item) {
                $line = [];
                $line[] = strtotime($date . 'T' . $item->time . 'Z');
                $line[] = $item->lastPrice;
                fputcsv($fp, $line);
            }
            fclose($fp);
            $fp = fopen($vn30File, 'w');
            foreach ($vn30Data as $item) {
                $line = [];
                $line[] = strtotime($item->Date);
                $line[] = $item->IndexCurrent;
                $line[] = $item->BuyForeignQuantity - $item->SellForeignQuantity;
                $line[] = $item->TotalActiveBuyVolume - $item->TotalActiveSellVolume;
                fputcsv($fp, $line);
            }
            fclose($fp);
        }
    }
}
