<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\Special\VpsOrderService;
use App\Models\DerivativeOrder;

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
        $tpDefault = floatval(get_global_value('tpDefault'));
        $slDefault = floatval(get_global_value('slDefault'));
        $activeOrders = DerivativeOrder::active()->get();
        if (count($activeOrders) === 0) return false;
        $lastPrice = $this->getLastPrice();
        $activeOrders->each(function ($order) use ($lastPrice, $tpDefault, $slDefault) {
            $sideBool = $order->side > 0;
            $vos = new VpsOrderService();
            if (!$vos->connection) return;
            if ($vos->position !== 0) {
                if ($order->status === 0) {
                    if (cmp($lastPrice, $sideBool, $order->entry_price, true)) {
                        $tpPrice = $order->entry_price + $order->side * $tpDefault;
                        $slPrice = $order->entry_price - $order->side * $slDefault;
                        $tpNo = $vos->order(["cmd" => "new", "price" => $tpPrice]);
                        if (!$tpNo) return;
                        $slNo = $vos->conditionOrder(["cmd" => "new", "price" => $slPrice]);
                        if (!$slNo) return;
                        $data = [
                            'status'    => 1,
                            'tp_price'  => $tpPrice,
                            'sl_price'  => $slPrice,
                            'tp_no'     => $tpNo,
                            'sl_no'     => $slNo,
                        ];
                        $order->fill($data);
                        if (!$order->save()) return;
                        DerivativeOrder::where('id', '!=', $order->id)
                            ->where('status', 0)->update(['status' => 2]);
                    }
                }
            } else {
                if ($order->status === 1) {
                    $isOrdered = false;
                    if (cmp($lastPrice, $sideBool, $order->tp_price, true)) {
                        $slNo = $vos->conditionOrder(["cmd" => "delete", "orderNo" => $order->sl_no]);
                        if (!$slNo) return;
                        $isOrdered = true;
                    }
                    if (cmp($lastPrice, !$sideBool, $order->sl_price, true)) {
                        $tpNo = $vos->order(["cmd" => "cancel", "orderNo" => $order->tp_no]);
                        if (!$tpNo) return;
                        $isOrdered = true;
                    }
                    if (!$isOrdered) return;
                    $order = DerivativeOrder::where('tp_no', $order->tp_no)
                        ->where('sl_no', $order->sl_no)->first();
                    if (!$order->save()) return;
                }
            }
        });
    }

    /**
     * Get Last Price
     */
    public function getLastPrice()
    {
        try {
            $vn30f1m = get_global_value('vn30f1m');
            $client = new \GuzzleHttp\Client();
            $url = "https://datafeedapi.aisec.com.vn/getpsalldatalsnapshot/{$vn30f1m}";
            $res = $client->get($url);
            $rsp = json_decode($res->getBody());
            if (count($rsp) === 1) return $rsp[0]->lastPrice;
            else return [];
        } catch (\Throwable $th) {
            return [];
        }
    }
}
