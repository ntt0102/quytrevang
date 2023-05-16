<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateVn30f1mSymbolJob implements ShouldQueue
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
        if ($this->weekOfMonth() == 3) {
            $client = new \GuzzleHttp\Client();
            $url = "https://spwapidatafeed.vps.com.vn/pslistdata";
            $res = $client->get($url);
            $symbol = json_decode($res->getBody())[0];
            set_global_value('vn30f1m', $symbol);
        }
    }

    private function weekOfMonth($date = null)
    {
        $date = !$date ? time() : strtotime($date);
        //Get the first day of the month.
        $firstOfMonth = strtotime(date("Y-m-01", $date));
        //Apply above formula.
        return self::weekOfYear($date) - self::weekOfYear($firstOfMonth) + 1;
    }

    private function weekOfYear($date)
    {
        $weekOfYear = intval(date("W", $date));
        if (date('n', $date) == "1" && $weekOfYear > 51) {
            // It's the last week of the previos year.
            return 0;
        } else if (date('n', $date) == "12" && $weekOfYear == 1) {
            // It's the first week of the next year.
            return 53;
        } else {
            // It's a "normal" week.
            return $weekOfYear;
        }
    }
}
