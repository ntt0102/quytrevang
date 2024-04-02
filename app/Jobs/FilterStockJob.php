<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\StockSymbol;
use App\Services\Trading\StockService;
use App\Notifications\FilteredStockNotification;
use Illuminate\Support\Facades\Notification;
use App\Models\User;

class FilterStockJob implements ShouldQueue
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
        $rTop = [];
        $rBottom = [];
        $stockService = app(StockService::class);
        $stock = StockSymbol::where('name', $this->payload->name)->first();
        if (!$stock) return false;
        foreach ($stock->symbols as $symbol) {
            $this->payload->symbol = $symbol;
            if ($this->payload->kind == self::F_TOP) {
                $cash = $stockService->getDataFromVps($this->payload)['f']['c'];
                if ($cash['t1'] - $cash['b'] == 0) continue;
                $rC = ($cash['t2'] - $cash['b']) / ($cash['t1'] - $cash['b']);
                if ($rC > self::CASH_RATIO) $rTop[] = $symbol;
            }
            if ($this->payload->kind == self::F_BOTTOM) {
                $this->payload->foreign = true;
                $foreign = $stockService->getDataForeign($this->payload)['f']['f'];
                if ($foreign['t1'] - $foreign['b'] == 0) continue;
                $rF = ($foreign['t2'] - $foreign['b']) / ($foreign['t1'] - $foreign['b']);
                if ($rF > self::FOREIGN_RATIO) $rBottom[] = $symbol;
            }
        }
        if ($this->payload->kind == self::F_TOP)
            StockSymbol::updateOrCreate(['name' => self::F_TOP], ['symbols' => $rTop]);
        if ($this->payload->kind == self::F_BOTTOM)
            StockSymbol::updateOrCreate(['name' => self::F_BOTTOM], ['symbols' => $rBottom]);
        Notification::send(
            User::permission('trades@edit')->get(),
            new FilteredStockNotification($this->payload->kind)
        );
        // \Log::info('End filter');
    }
}
