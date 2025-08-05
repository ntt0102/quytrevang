<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ExportDerVpsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 3600;

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
        $data = app(\App\Services\Trading\DerivativeService::class)->cloneVpsData();
        if (!count($data)) return false;


        $date = get_global_value('lastOpeningDate');
        if (!$date) $date = date("Y-m-d");
        $file = storage_path('app/phaisinh/' . $date . '.csv');

        $fp = fopen($file, 'w');
        foreach ($data as $index => $item) {
            $line = [];
            $line[] = $index;
            $line[] = strtotime("{$date}T{$item->time}Z");
            $line[] = $item->lastPrice;
            $line[] = $item->lastVol;
            fputcsv($fp, $line);
        }
        fclose($fp);
    }
}
