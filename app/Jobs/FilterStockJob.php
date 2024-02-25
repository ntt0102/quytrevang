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
        $r = [];
        $isCash = false;
        $isIndex = false;
        $stockService = app(StockService::class);
        $this->payload->symbol = 'VNINDEX';
        $vnindex = $stockService->getData($this->payload)['price'];
        $strVni = current($vnindex)['value'];
        $endVni = current($vnindex)['value'];
        $stocks = StockSymbol::whereIn('name', ['hose', 'index'])->get();
        foreach ($stocks as $stock) {
            foreach ($stock->symbols as $symbol) {
                $this->payload->symbol = $symbol;
                $data = $stockService->getData($this->payload);
                $price = $data['price'];
                $strPr = current($price)['value'];
                $endPr = end($price)['value'];
                $cash = $data['cash'];
                $strCh = current($cash)['value'];
                $endCh = end($cash)['value'];
                if (count($price) == 0) continue;
                $isCash = $endPr < $strPr && $endCh > $strCh;
                $isIndex = $endVni < $strVni && $endPr > $strPr;
                if (($this->payload->type == 'fcash' && $isCash) ||
                    ($this->payload->type == 'findex' && $isIndex) ||
                    ($this->payload->type == 'fmix' && $isCash && $isIndex)
                ) $r[] = $symbol;
            }
        }
        $ss = StockSymbol::updateOrCreate(['name' => $this->payload->type], ['symbols' => $r]);
    }
}
