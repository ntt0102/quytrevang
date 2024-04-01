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
    const F_BREAK = "f_break";
    const PRICE_RATIO = 0.382;
    const CASH_RATIO = 2.618;
    const DIFF_DAYS = 30;

    private $payload;
    public $tries = 1;
    public $timeout = 10000;

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
        $rBreak = [];
        $isTop = false;
        $isBottom = false;
        $isBreak = false;
        $stockService = app(StockService::class);
        $this->payload->symbol = 'VNINDEX';
        $vnindex = $stockService->getDataFromDnse($this->payload)['f']['p'];
        $t1Vni = $vnindex['t1'];
        $t2Vni = $vnindex['t2'];
        $stock = StockSymbol::where('name', $this->payload->name)->first();
        if (!$stock) return false;
        foreach ($stock->symbols as $symbol) {
            $this->payload->symbol = $symbol;
            $this->payload->foreign = true;
            $data = $stockService->getData($this->payload);
            if (count($data['c']['price']) == 0) continue;
            $t1P = $data['f']['p']['t1'];
            $t2P = $data['f']['p']['t2'];
            $bP = $data['f']['p']['b'];
            if ($t1P['v'] - $bP['v'] == 0) continue;
            $rP = ($t2P['v'] - $bP['v']) / ($t1P['v'] - $bP['v']);
            $t1C = $data['f']['c']['t1'];
            $t2C = $data['f']['c']['t2'];
            $bC = $data['f']['c']['b'];
            if ($t1C['v'] - $bC['v'] == 0) continue;
            $rC = ($t2C['v'] - $bC['v']) / ($t1C['v'] - $bC['v']);
            $t1F = $data['f']['f']['t1'];
            $t2F = $data['f']['f']['t2'];
            $bF = $data['f']['f']['b'];
            if ($t1F['v'] - $bF['v'] == 0) continue;
            $rF = ($t2F['v'] - $bF['v']) / ($t1F['v'] - $bF['v']);
            $dP = date_create('@' . $bP['t']);
            $dC = date_create('@' . $bC['t']);
            $diff = +date_diff($dC, $dP)->format("%R%a");
            $isTop = $rP < 1 && $rP > self::PRICE_RATIO && $rC > self::CASH_RATIO;
            $isBottom = $rF > $rC;
            // $isBottom = $rP < 1 && $rC > 1 && $diff > self::DIFF_DAYS;
            $isBreak = $t2Vni['v'] < $t1Vni['v'] && $rP > 1 && $rC > self::CASH_RATIO;
            if ($isTop) $rTop[] = $symbol;
            if ($isBottom) $rBottom[] = $symbol;
            if ($isBreak) $rBreak[] = $symbol;
        }
        if (in_array(self::F_TOP, $this->payload->kinds))
            StockSymbol::updateOrCreate(['name' => self::F_TOP], ['symbols' => $rTop]);
        if (in_array(self::F_BOTTOM, $this->payload->kinds))
            StockSymbol::updateOrCreate(['name' => self::F_BOTTOM], ['symbols' => $rBottom]);
        if (in_array(self::F_BREAK, $this->payload->kinds))
            StockSymbol::updateOrCreate(['name' => self::F_BREAK], ['symbols' => $rBreak]);
        Notification::send(
            User::permission('trades@edit')->get(),
            new FilteredStockNotification($this->payload->kinds)
        );
        // \Log::info('End filter');
    }
}
