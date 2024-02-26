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
        \Log::info('Begin filter');
        $r = [];
        $isCash = false;
        $isIndex = false;
        $isMix = false;
        $stockService = app(StockService::class);
        $this->payload->symbol = 'VNINDEX';
        $vnindex = $stockService->getData($this->payload)['price'];
        $strVni = current($vnindex)['value'];
        $endVni = end($vnindex)['value'];
        $stocks = StockSymbol::whereIn('name', ['hose', 'index'])->get();
        foreach ($stocks as $stock) {
            \Log::info($stock->name . '-------------------');
            foreach ($stock->symbols as $symbol) {
                \Log::info($symbol);
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
                if (($this->payload->type == 'fcash' && $isCash) ||
                    ($this->payload->type == 'findex' && $isIndex) ||
                    ($this->payload->type == 'fmix' && $isMix)
                ) $r[] = $symbol;
            }
        }
        StockSymbol::updateOrCreate(['name' => $this->payload->type], ['symbols' => $r]);
        \Log::info('End filter');
    }
}
