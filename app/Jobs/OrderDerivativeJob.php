<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\Special\VpsOrderService;
use App\Models\StockDrawing;

class OrderDerivativeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

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
        $symbol = 'VN30F1M';
        $tpDefault = intval(get_global_value('tpDefault'));
        $slDefault = intval(get_global_value('slDefault'));
        $vos = new VpsOrderService();
        if (!$vos->connection) return false;
        if ($vos->orderId['entry']) {
            if (!$vos->orderId['tp'] && $vos->position != 0) {
                $entry = StockDrawing::select('data')->where('symbol', $symbol)->where('name', 'order')->where('point', 'entry')->first();
                if (!$entry) return false;
                $entryLine = $entry->data;
                $tpLine = $entryLine;
                $slLine = $entryLine;
                $tpPrice = $entryLine->price + $entryLine->side * $tpDefault;
                $slPrice = $entryLine->price - $entryLine->side * $slDefault;
                //
                $tp = $vos->order('tp', ["cmd" => "new", "price" => $tpPrice]);
                if (!$tp['isOk']) return false;
                $sl = $vos->conditionOrder('sl', ["cmd" => "new", "price" => $slPrice]);
                if (!$sl['isOk']) return false;
                //
                $entryLine->draggable = false;
                $entry->data = $entryLine;
                $entry->save();
                //
                $tpLine->color = 'lime';
                $tpLine->title = number_format(abs($tpPrice - $entryLine->price), 1);
                $tpLine->price = $tpPrice;
                StockDrawing::updateOrCreate(
                    ['symbol' => $symbol, 'name' => 'order', 'point' => 'tp'],
                    ['data' => $tpLine]
                );
                //
                $slLine->color = 'red';
                $slLine->title = number_format(abs($slPrice - $entryLine->price), 1);
                $slLine->price = $slPrice;
                StockDrawing::updateOrCreate(
                    ['symbol' => $symbol, 'name' => 'order', 'point' => 'sl'],
                    ['data' => $slLine]
                );
            } else if ($vos->orderId['tp'] && $vos->position == 0) {
                $tp = $vos->order('tp', ["cmd" => "cancel"]);
                $sl = $vos->conditionOrder('sl', ["cmd" => "delete"]);
                if (!$tp['isOk'] && !$sl['isOk']) return false;
                StockDrawing::where('symbol', $symbol)->where('name', 'order')->delete();
                set_global_value('entryOrderId', '');
                set_global_value('tpOrderId', '');
                set_global_value('slOrderId', '');
            }
        }
    }
}
