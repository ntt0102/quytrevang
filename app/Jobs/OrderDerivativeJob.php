<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\VpsOrderService;
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
        $activeOrders = DerivativeOrder::active()->get();
        if (count($activeOrders) === 0) return false;
        $lastPrice = $this->getLastPrice();
        if (!$lastPrice) return false;
        $vos = new VpsOrderService();
        $activeOrders->each(function ($order) use ($vos, $lastPrice) {
            $sideBool = $order->side > 0;
            if (!$vos->connection) return;
            if ($vos->position !== 0) {
                if ($order->status === 0) {
                    if (cmp($lastPrice, $sideBool, $order->entry_price, true)) {
                        if ($order->tp_price) {
                            $tpPrice = $order->tp_price;
                        } else {
                            $tpDefault = floatval(get_global_value('tpDefault'));
                            $tpPrice = $order->entry_price + $order->side * $tpDefault;
                        }
                        if ($order->sl_price) {
                            $slPrice = $order->sl_price;
                            $sl1Price = $order->sl1_price;
                        } else {
                            $slDefault = floatval(get_global_value('slDefault'));
                            $slPrice = $order->entry_price - $order->side * $slDefault;
                            $sl1Price = ($order->entry_price + $slPrice) / 2;
                        }
                        $tpNo = $vos->order(["cmd" => "new", "price" => $tpPrice]);
                        if (!$tpNo) return;
                        $slNo = $vos->conditionOrder(["cmd" => "new", "price" => $slPrice]);
                        if (!$slNo) return;
                        $data = [
                            'status'    => 1,
                            'tp_price'  => $tpPrice,
                            'sl_price'  => $slPrice,
                            'sl1_price'  => $sl1Price,
                            'tp_no'     => $tpNo,
                            'sl_no'     => $slNo,
                        ];
                        $order->fill($data);
                        if (!$order->save()) return;
                        $this->deleteOtherOrders($vos, $order->id);
                    }
                }
            } else {
                if ($order->status === 1) {
                    $isOrdered = false;
                    if (cmp($lastPrice, $sideBool, $order->tp_price, true)) {
                        $vos->conditionOrder((object)['cmd' => 'delete', 'orderNo' => $order->sl_no]);
                        $isOrdered = true;
                    }
                    if (cmp($lastPrice, !$sideBool, $order->sl_price, true)) {
                        $vos->order((object)['cmd' => 'cancel', 'orderNo' => $order->tp_no]);
                        $isOrdered = true;
                    }
                    if (!$isOrdered) return;
                    $order->fill(['status' => 2]);
                    $order->save();
                }
            }
        });
    }

    /**
     * Get Last Price
     */
    private function getLastPrice()
    {
        try {
            $vn30f1m = get_global_value('vn30f1m');
            $client = new \GuzzleHttp\Client();
            $url = "https://datafeedapi.aisec.com.vn/getpsalldatalsnapshot/{$vn30f1m}";
            $res = $client->get($url);
            $rsp = json_decode($res->getBody());
            if (count($rsp) === 1) return $rsp[0]->lastPrice;
            else return null;
        } catch (\Throwable $th) {
            return null;
        }
    }
    private function deleteOtherOrders($vos, $orderId)
    {
        DerivativeOrder::where('id', '!=', $orderId)->where('status', 0)->get()
            ->each(function ($order) use ($vos) {
                $vos->conditionOrder((object)['cmd' => 'delete', 'orderNo' => $order->entry_no], true);
                $order->status = 2;
                $order->save();
            });
    }
}
