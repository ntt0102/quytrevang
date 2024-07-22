<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ExportDerivativeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    const SHIFT_TIME = 7 * 60 * 60;
    public $timeout = 3600;
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
        if (!count($data)) return false;


        $date = substr($data[0]->date, 0, 10);
        $file = storage_path('app/phaisinh/' . $date . '.csv');
        if (file_exists($file)) return false;

        $fp = fopen($file, 'w');
        foreach ($data as $item) {
            $line = [];
            $line[] = strtotime($item->date) + self::SHIFT_TIME;
            $line[] = $item->price;
            $line[] = $item->volume;
            $line[] = $item->side == 'B' ? 1 : ($item->side == 'S' ? -1 : 0);
            fputcsv($fp, $line);
        }
        fclose($fp);
    }
}
