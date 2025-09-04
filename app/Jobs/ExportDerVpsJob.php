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
        $data = app(\App\Features\Trading\Services\DerivativeService::class)->cloneVpsData();
        if (!count($data)) return false;


        $date = get_global_value('lastOpeningDate');
        if (!$date) $date = date("Y-m-d");
        $file = storage_path('app/phaisinh/' . $date . '.csv');

        $fp = fopen($file, 'w');
        foreach ($data as $item) {
            $line = [];
            $line[] = $item->sID;
            // $line[] = "{$date}T{$item->time}Z";
            // $originTime = "{$date}T{$item->time}Z";
            // $newTime = date("H:i:s", strtotime($originTime) - 7 * 3600);
            // $line[] = "{$date}T{$newTime}Z";
            // $parts = explode(':', $item->time);
            // $hour = (int)$parts[0] - 7;
            // $newTime = sprintf('%02d:%02d:%02d', $hour, (int)$parts[1], (int)$parts[2]);
            $line[] = $this->subHour($date, $item->time);
            $line[] = $item->lastPrice;
            $line[] = $item->lastVol;
            fputcsv($fp, $line);
        }
        fclose($fp);
    }

    private function subHour($date, $time)
    {
        $parts = explode(':', $time);
        $hour = (int)$parts[0] - 7;
        $newTime = sprintf('%02d:%02d:%02d', $hour, (int)$parts[1], (int)$parts[2]);
        return "{$date}T{$newTime}Z";
    }
}
