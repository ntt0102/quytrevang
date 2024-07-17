<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ExportStockJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $data;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if (!count($this->data)) return false;
        $date = substr($this->data[0][1], 0, 10);
        $file = storage_path('app/cophieu/_up-to-date_.txt');
        $isUpdated = false;
        if (file_exists($file)) {
            $fp = fopen($file, 'r');
            $line = fgets($fp);
            if (!!$line && $date <= $line) $isUpdated = true;
            fclose($fp);
        }
        if ($isUpdated) return false;
        file_put_contents($file, $date);
        foreach ($this->data as $item) {
            if ((!str_contains($item[0], '$') && !str_contains($item[0], '^') && strlen($item[0]) == 3) ||
                $item[0] == 'VNINDEX' ||
                $item[0] == 'VN30'
            ) {
                $file = storage_path('app/cophieu/' . $item[0] . '.csv');
                $fp = fopen($file, 'a+');
                $line = [
                    substr($item[1], 0, 10),
                    $item[7] - ($item[4] - $item[7])
                ];
                fputcsv($fp, $line);
                fclose($fp);
            }
        }
    }
}
