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
        $data = json_decode($this->data);
        if (count($data) < 2000) return false;
        $vnindex = current(array_filter($data, function ($item) {
            return $item->symbol === 'VNINDEX';
        }));
        $date = substr($vnindex->date, 0, 10);
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
        foreach ($data as $item) {
            if ((!str_contains($item->symbol, '$') && !str_contains($item->symbol, '^') && strlen($item->symbol) == 3) ||
                in_array($item->symbol, ['VNINDEX', 'VN30', 'VN30F1M', 'VN30F2M', 'VN30F1Q', 'VN30F2Q'])
            ) {
                $file = storage_path('app/cophieu/' . $item->symbol . '.csv');
                $fp = fopen($file, 'a+');
                $line = [
                    substr($item->date, 0, 10),
                    $item->activeBuyVolume - ($item->totalVolume - $item->activeBuyVolume)
                ];
                fputcsv($fp, $line);
                fclose($fp);
            }
        }
    }
}
