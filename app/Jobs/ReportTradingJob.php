<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Models\Trade;
use App\Services\Special\VpsOrderService;
use Illuminate\Support\Facades\Notification;
use App\Notifications\UpdatedTradesNotification;
use App\Events\UpdateStatisticEvent;

class ReportTradingJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

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
        if (Trade::where('date', date_create()->format('Y-m-d'))->count() > 0) return false;
        $vos = new VpsOrderService();
        if (!$vos->connection) return false;
        $info = $vos->getAccountInfo();
        //
        if (!$info) return false;
        Notification::send(
            User::permission('admin:statistic_derivative')->get(),
            new UpdatedTradesNotification(
                number_format($info->vm, 0, ",", ".") . ' ₫',
                number_format($info->fee, 0, ",", ".") . ' ₫'
            )
        );
        //
        if (!$info->fee && !$info->vm) return false;
        $revenue = $info->vm > 0 ? $info->vm : 0;
        $loss = $info->vm < 0 ? -$info->vm : 0;
        $trade = Trade::create([
            "amount" => $vos->orderVolume,
            "scores" => $this->getVn30f1mInfo($vos->symbol),
            "revenue" => $revenue,
            "loss" => $loss,
            "fees" => $info->fee,
            "date" => date_create()->format('Y-m-d'),
        ]);
        if (!$trade) return false;
        event(new UpdateStatisticEvent());
    }

    /**
     * Get Info
     */
    private function getVn30f1mInfo($symbol)
    {
        $client = new \GuzzleHttp\Client();
        $url = "https://spwapidatafeed.vps.com.vn/getpsalldatalsnapshot/{$symbol}";
        $res = $client->get($url);
        return json_decode($res->getBody())[0]->r;
    }
}
