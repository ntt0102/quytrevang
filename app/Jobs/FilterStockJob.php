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
        // \Log::info('Begin filter');
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
        $stocks = StockSymbol::where('name', $this->payload->name)->get();
        foreach ($stocks as $stock) {
            foreach ($stock->symbols as $symbol) {
                $this->payload->symbol = $symbol;
                $data = $stockService->getData($this->payload)['filter'];
                if (count($data['price']) == 0) continue;
                $strPr = $data['price'][0];
                $endPr = $data['price'][1];
                $strCh = $data['cash'][0];
                $endCh = $data['cash'][1];
                $isCash = $endPr < $strPr && $endCh > $strCh;
                $isIndex = $endVni < $strVni && $endPr > $strPr;
                $isMix = $endVni < $strVni && $endPr > $strPr && $endCh > $strCh;
                if ($isCash) $rCash[] = $symbol;
                if ($isIndex) $rIndex[] = $symbol;
                if ($isMix) $rMix[] = $symbol;
            }
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
