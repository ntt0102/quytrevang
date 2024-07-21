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
        if (count($this->data) < 2000) return false;
        $vnindex = current(array_filter($this->data, function ($item) {
            return $item[0] === 'VNINDEX';
        }));
        $date = substr($vnindex[1], 0, 10);
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
                in_array($item[0], ['VNINDEX', 'VN30', 'VN30F1M', 'VN30F2M', 'VN30F1Q', 'VN30F2Q'])
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
