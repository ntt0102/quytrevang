<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\ShareSymbol;
use App\Services\Trading\ShareService;
use App\Notifications\FilteredShareNotification;
use Illuminate\Support\Facades\Notification;
use App\Models\User;

class FilterShareJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    const F_TOP = "f_top";
    const F_BOTTOM = "f_bottom";
    const FOREIGN_RATIO = 2;
    const CASH_RATIO = 2;

    private $payload;
    public $tries = 1;
    public $timeout = 3600;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($payload)
    {
        $this->payload = $payload;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // \Log::info('Start filter');
        $share = ShareSymbol::where('name', $this->payload->name)->first();
        if (!$share) return false;
        $rTop = [];
        $rBottom = [];
        $shareService = app(ShareService::class);
        foreach ($share->symbols as $symbol) {
            $this->payload->symbol = trim($symbol);
            $rsi = $shareService->getDataFireAnt($this->payload)['rsi'];
            $fRSI = $rsi['foreign'];
            if (
                $fRSI[0] > 50 &&
                $fRSI[2] > 60 &&
                $fRSI[1] < $fRSI[2]
            ) {
                $pRSI = $rsi['price'];
                $cRSI = $rsi['cash'];
                if (
                    $this->payload->kind == self::F_BOTTOM &&
                    $fRSI[1] < 50 &&
                    $pRSI[0] < 50 && $cRSI[0] > 45
                )
                    $rBottom[] = $symbol;
                if (
                    $this->payload->kind == self::F_TOP &&
                    $pRSI[1] > 50 && $cRSI[1] > 55
                )
                    $rTop[] = $symbol;
            }
        }
        if ($this->payload->kind == self::F_TOP)
            ShareSymbol::updateOrCreate(['name' => self::F_TOP], ['symbols' => $rTop]);
        if ($this->payload->kind == self::F_BOTTOM)
            ShareSymbol::updateOrCreate(['name' => self::F_BOTTOM], ['symbols' => $rBottom]);
        Notification::send(
            User::permission('admin:access_share')->get(),
            new FilteredShareNotification($this->payload->kind)
        );
        // \Log::info('End filter');
    }
}
