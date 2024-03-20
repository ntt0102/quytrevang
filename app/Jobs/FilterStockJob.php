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
        \Log::info('Start filter');
        $rCash = [];
        $rIndex = [];
        $rMix = [];
        $isCash = false;
        $isIndex = false;
        $isMix = false;
        $stockService = app(StockService::class);
        $this->payload->symbol = 'VNINDEX';
        $vnindex = $stockService->getDataFromSsi($this->payload)['filter']['price'];
        $strVni = $vnindex[0];
        $endVni = $vnindex[1];
        $stock = StockSymbol::where('name', $this->payload->name)->first();
        if (!$stock) return false;
        foreach ($stock->symbols as $symbol) {
            $this->payload->symbol = $symbol;
            $data = $stockService->getData($this->payload);
            if (count($data['chart']['price']) == 0) continue;
            $t1Pr = $data['filter']['price'][0];
            $t2Pr = $data['filter']['price'][1];
            $bPr = $data['filter']['price'][2];
            if ($t1Pr - $bPr == 0) continue;
            $rPr = ($t2Pr - $bPr) / ($t1Pr - $bPr);
            $t1Ch = $data['filter']['cash'][0];
            $t2Ch = $data['filter']['cash'][1];
            $bCh = $data['filter']['cash'][2];
            if ($t1Ch - $bCh == 0) continue;
            $rCh = ($t2Ch - $bCh) / ($t1Ch - $bCh);
            $isCash = $t2Pr < $t1Pr && $rPr > 0.382 && $t2Ch > $t1Ch && $rCh > 1.618;
            $isIndex = $endVni < $strVni && $t2Pr > $t1Pr;
            $isMix = $endVni < $strVni && $t2Pr > $t1Pr && $t2Ch > $t1Ch && $rCh > 1.618;
            if ($isCash) $rCash[] = $symbol;
            if ($isIndex) $rIndex[] = $symbol;
            if ($isMix) $rMix[] = $symbol;
        }
        StockSymbol::updateOrCreate(['name' => 'f_cash'], ['symbols' => $rCash]);
        StockSymbol::updateOrCreate(['name' => 'f_index'], ['symbols' => $rIndex]);
        StockSymbol::updateOrCreate(['name' => 'f_mix'], ['symbols' => $rMix]);
        Notification::send(
            User::permission('trades@edit')->get(),
            new FilteredStockNotification()
        );
        // \Log::info('End filter');
    }
}
