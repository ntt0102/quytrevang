<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ExportDerDnseJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    const SHIFT_TIME = 7 * 60 * 60;
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
        $data = app(\App\Services\Trading\DerivativeService::class)->cloneDnseData();
        if (!count($data)) return false;

        $date = substr($data[0]->time, 0, 10);
        $file = storage_path('app/phaisinh/' . $date . '.csv');

        $fp = fopen($file, 'w');
        foreach ($data as $item) {
            $line = [];
            $line[] = strtotime($item->time) + self::SHIFT_TIME;
            $line[] = $item->matchPrice;
            $line[] = $item->matchQtty;
            fputcsv($fp, $line);
        }
        fclose($fp);
    }
}
