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

class FilterJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    const F_TOP = "f_top";
    const F_BOTTOM = "f_bottom";

    private $payload;
    public $tries = 1;
    public $timeout = 5000;

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
        $stock = StockSymbol::where('name', $this->payload->name)->first();
        if (!$stock) return false;
        foreach ($stock->symbols as $symbol) {
            $this->payload->symbol = $symbol;
            $foreignRatio = $this->getForeignRatio($this->payload);
            if ($foreignRatio > 0.7) {
                $ratio = $this->getRatio($this->payload);
                if (
                    $this->payload->kind == self::F_BOTTOM &&
                    $ratio['p'] < 0.3 && $ratio['c'] > 0.7
                ) $rBottom[] = $symbol;
                if (
                    $this->payload->kind == self::F_TOP &&
                    $ratio['p'] > 0.3 && $ratio['c'] > 0.7
                ) $rTop[] = $symbol;
            }
        }
        if ($this->payload->kind == self::F_TOP)
            StockSymbol::updateOrCreate(['name' => self::F_TOP], ['symbols' => $rTop]);
        if ($this->payload->kind == self::F_BOTTOM)
            StockSymbol::updateOrCreate(['name' => self::F_BOTTOM], ['symbols' => $rBottom]);
        Notification::send(
            User::permission('trades@edit')->get(),
            new FilteredStockNotification($this->payload->kind)
        );
        // \Log::info('End filter');
    }

    public function getRatio($payload)
    {
        $client = new \GuzzleHttp\Client();
        $url = "https://histdatafeed.vps.com.vn/tradingview/history?symbol={$payload->symbol}&resolution=1D&from={$payload->from}&to={$payload->to}";
        $res = $client->get($url);
        $data = json_decode($res->getBody());
        if (!count($data->c)) return ['p' => -1, 'c' => -1];
        $hp = $data->h[0];
        $lp = $data->l[0];
        $cp = $data->c[0];
        $hc = 0;
        $lc = 0;
        $cc = 0;
        $prvTp = 0;
        for ($i = 0; $i < count($data->c); $i++) {
            $cp = $data->c[$i];
            if ($data->h[$i] > $hp) $hp = $data->h[$i];
            if ($data->l[$i] < $lp) $lp = $data->l[$i];
            //
            $tp = ($data->h[$i] + $data->l[$i] + $data->c[$i]) / 3;
            if ($i == 0) $prvTp = $tp;
            $change = $tp - $prvTp;
            $prvTp = $tp;
            $side = 0;
            if ($change > 0) $side = 1;
            else if ($change < 0) $side = -1;
            $cc += $side * $data->v[$i];
            if ($cc > $hc) $hc = $cc;
            if ($cc < $lc) $lc = $cc;
        }
        if ($hp - $lp == 0 || $hc - $lc == 0) return ['p' => -1, 'c' => -1];
        return [
            'p' => ($cp - $lp) / ($hp - $lp),
            'c' => ($cc - $lc) / ($hc - $lc)
        ];
    }
    public function getForeignRatio($payload)
    {
        $startDate = date('m/d/Y', $payload->from);
        $endDate = date("m/d/Y", $payload->to);
        $client = new \GuzzleHttp\Client();
        $url = "https://s.cafef.vn/Ajax/PageNew/DataHistory/GDKhoiNgoai.ashx?Symbol={$payload->symbol}&StartDate={$startDate}&EndDate={$endDate}&PageIndex=1&PageSize=1000000";
        $res = $client->get($url);
        $data = json_decode($res->getBody())->Data->Data;
        if (!count($data)) return -1;
        $h = $data[0]->KLGDRong;
        $l = $data[0]->KLGDRong;
        $c = $data[0]->KLGDRong;
        foreach ($data as $item) {
            $c += $item->KLGDRong;
            if ($c > $h) $h = $c;
            if ($c < $l) $l = $c;
        }
        if ($h - $l == 0) return -1;
        return ($c - $l) / ($h - $l);
    }
}
