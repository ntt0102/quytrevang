<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateOpeningMarketJob implements ShouldQueue
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
        set_global_value('openingMarketFlag', $this->checkOpeningMarket() ? '1' : '0');
    }

    /**
     * Check Opening Market
     * @return boolean
     */
    private function checkOpeningMarket()
    {
        $currentDay = date("w");
        if ($currentDay == 0 || $currentDay == 6) return false;

        $currentDate = date("Y-m-d");
        $currentYear = date("Y");
        $BASE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars";
        $BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY =
            "holiday@group.v.calendar.google.com";
        $API_KEY = env('GOOGLE_CALENDAR_API_KEY');
        $CALENDAR_REGION = "en.vietnamese";
        $url = $BASE_CALENDAR_URL . '/' . $CALENDAR_REGION . '%23' . $BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY . '/events?key=' . $API_KEY;
        $client = new \GuzzleHttp\Client();
        $res = $client->get($url);
        $resp = json_decode($res->getBody());
        $holidays = collect($resp->items)
            ->filter(function ($item) use ($currentYear) {
                return $item->start->date >= $currentYear . '-01-01' && $item->start->date <= $currentYear . '-31-12';
            })
            ->sortBy('start.date')
            ->reduce(function ($days, $item) {
                $days[] = $item->start->date;
                return $days;
            }, []);
        if (in_array($currentDate, $holidays)) return false;
        return true;
    }
}
