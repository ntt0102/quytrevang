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
use App\Events\FilterStockEvent;

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
        $vnindex = $stockService->getData($this->payload)['price'];
        $strVni = current($vnindex)['value'];
        $endVni = end($vnindex)['value'];
        $stocks = StockSymbol::whereIn('name', ['hose'])->get();
        foreach ($stocks as $stock) {
            foreach ($stock->symbols as $symbol) {
                $this->payload->symbol = $symbol;
                $data = $stockService->getData($this->payload);
                $price = $data['price'];
                if (count($price) == 0) continue;
                $strPr = current($price)['value'];
                $endPr = end($price)['value'];
                $cash = $data['cash'];
                $strCh = current($cash)['value'];
                $endCh = end($cash)['value'];
                $isCash = $endPr < $strPr && $endCh > $strCh;
                $isIndex = $endVni < $strVni && $endPr > $strPr;
                $isMix = $endVni < $strVni && $endPr > $strPr && $endCh > $strCh;
                if ($isCash) $rCash[] = $symbol;
                if ($isIndex) $rIndex[] = $symbol;
                if ($isMix) $rMix[] = $symbol;
            }
        }
        StockSymbol::updateOrCreate(['name' => 'fcash'], ['symbols' => $rCash]);
        StockSymbol::updateOrCreate(['name' => 'findex'], ['symbols' => $rIndex]);
        StockSymbol::updateOrCreate(['name' => 'fmix'], ['symbols' => $rMix]);
        event(new FilterStockEvent());
        // \Log::info('End filter');
    }
}
