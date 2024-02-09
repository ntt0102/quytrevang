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
        $ss = StockSymbol::where('name', 'hose')->first();
        $symbols = !!$ss ? $ss->symbols : [];
        $stockService = app(StockService::class);
        $this->payload->symbol = 'VNINDEX';
        $vnindex = $stockService->getChartData($this->payload)['price'];
        foreach ($symbols as $symbol) {
            $this->payload->symbol = $symbol;
            $data = $stockService->getChartData($this->payload);
            if (count($data['price']) == 0) continue;
            $isCash = current($data['price'])['value'] > end($data['price'])['value'] &&
                current($data['cash'])['value'] < end($data['cash'])['value'];
            $isIndex = current($vnindex)['value'] > end($vnindex)['value'] &&
                current($data['price'])['value'] < end($data['price'])['value'];
            if (($this->payload->type == 'cash' && $isCash) ||
                ($this->payload->type == 'index' && $isIndex) ||
                ($this->payload->type == 'mix' && $isCash && $isIndex)
            ) $r[] = $symbol;
        }
        $ss = StockSymbol::updateOrCreate(['name' => 'filter-' . $this->payload->type], ['symbols' => $r]);
    }
}
