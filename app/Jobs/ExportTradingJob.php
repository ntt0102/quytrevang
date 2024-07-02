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
            $orderChartService = app(\App\Services\Trading\OrderChartService::class);
            $date = date('Y-m-d');
            $path = storage_path('app/phaisinh/' . $date);
            if (is_dir($path)) return false;
            if (!mkdir($path, 0777, true)) return false;
            //
            $vn30f1mFile = $path . '/vn30f1m.csv';
            $vn30f1mData = $orderChartService->cloneVn30f1mData();
            $fp = fopen($vn30f1mFile, 'w');
            foreach ($vn30f1mData as $item) {
                $line = [];
                $line[] = strtotime($item->Date) + $this->SHIFT_TIME;
                $line[] = $item->Price;
                $line[] = $item->Volume;
                $line[] = $item->Side == 'B' ? 1 : ($item->Side == 'S' ? -1 : 0);
                fputcsv($fp, $line);
            }
            fclose($fp);
            //
            $vn30File = $path . '/vn30.csv';
            $vn30Data = $orderChartService->cloneVn30Data();
            $fp = fopen($vn30File, 'w');
            foreach ($vn30Data as $item) {
                $line = [];
                $line[] = strtotime($item->Date) + $this->SHIFT_TIME;
                $line[] = $item->IndexCurrent;
                $line[] = $item->BuyForeignQuantity - $item->SellForeignQuantity;
                $line[] = $item->TotalActiveBuyVolume - $item->TotalActiveSellVolume;
                fputcsv($fp, $line);
            }
            fclose($fp);
            //
            $fgnf1mFile = $path . '/fgnf1m.csv';
            $fgnf1mData = $orderChartService->cloneFgnf1mData();
            $fp = fopen($fgnf1mFile, 'w');
            foreach ($fgnf1mData as $item) {
                $line = [];
                $line[] = strtotime($item->dateTime . 'Z');
                $line[] = $item->value;
                fputcsv($fp, $line);
            }
            fclose($fp);
        }
    }
}
