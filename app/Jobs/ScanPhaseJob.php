<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\StockDrawing;
use App\Models\User;
use Illuminate\Support\Facades\Notification;
use App\Notifications\ScanedPhaseNotification;

class ScanPhaseJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    const SHIFT_TIME = 7 * 60 * 60;

    private $date;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->date = get_last_opening_date();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if (get_global_value('autoScanFlag') == '0') return false;

        $data = $this->cloneVpsData();

        // $targetTime = '13:35:47';
        // $data = array_filter($data, function ($item) use ($targetTime) {
        //     return $item->time <= $targetTime;
        // });

        $points = $this->scanPhase($data);

        if ($this->isSame($points)) return false;

        foreach ($points as $key => $value) {
            StockDrawing::updateOrCreate(
                ['symbol' => 'VN30F1M', 'name' => 'auto', 'point' => $key],
                ['data' => $value]
            );
        }

        $phase1 = $this->findPhase($data, $points['A']['time'], $points['B']['price']);
        $rtRef = $phase1['rt']['distance'];
        $phase2 = $this->findPhase($data, $points['B']['time'], $points['C']['price'], $rtRef);
        $rr1 = (($points['C']['price'] - $points['B']['price']) /
            ($points['A']['price'] - $points['B']['price'])) * 100;
        $rr2 = (($phase2['sp'] - $points['C']['price']) /
            ($points['B']['price'] - $points['C']['price'])) * 100;
        $progress = $this->checkPhase($phase2['rt']['count'], $phase2['er'], $rr1, $rr2);

        if ($progress == 0) {
            Notification::send(
                User::permission('admin:order_derivative')->get(),
                new ScanedPhaseNotification()
            );
        }

        return $progress;
    }

    private function cloneVpsData()
    {
        try {
            $client = new \GuzzleHttp\Client();
            $url = "https://bddatafeed.vps.com.vn/getpschartintraday/VN30F1M";
            $res = $client->get($url);
            return json_decode($res->getBody());
        } catch (\Throwable $th) {
            return [];
        }
    }

    private function scanPhase($data)
    {
        $side = null;
        $A = $B = $C = $D = null;

        $lastPos = count($data) - 1;
        for ($index = $lastPos; $index >= 0; $index--) {
            $price = $data[$index]->lastPrice;
            $time = $data[$index]->time;

            if ($index == $lastPos) {
                $D = ['index' => $index, 'time' => $time, 'price' => $price];
                $C = $D;
                $B = $D;
                $A = $D;
            }

            if ($side === null) {
                if ($price == $D['price']) continue;
                $side = $D['price'] > $price;
            }

            if (
                !$this->cmp($B['price'], $side, $D['price']) &&
                $this->cmp($price, !$side, $C['price'])
            ) {
                $C = ['index' => $index, 'time' => $time, 'price' => $price];
            }

            if ($this->cmp($price, $side, $B['price'])) {
                if ($this->cmp($A['price'], !$side, $C['price'])) {
                    $D = $C;
                    $C = $B;
                    $B = $A;
                    $A = ['index' => $index, 'time' => $time, 'price' => $price];
                    $side = !$side;
                } else $B = ['index' => $index, 'time' => $time, 'price' => $price];
            }

            if ($this->cmp($price, !$side, $A['price'])) {
                $A = ['index' => $index, 'time' => $time, 'price' => $price];
            }

            if (
                $D['index'] > $C['index'] &&
                $C['index'] > $B['index'] &&
                $B['index'] > $A['index'] &&
                $A['index'] - $index > $C['index'] - $B['index']
            ) {
                $ab = abs($A['price'] - $B['price']);
                $bc = abs($B['price'] - $C['price']);
                if ($bc >= 2 && $bc / $ab < 0.786) break;
            }
        }
        unset($A['index']);
        unset($B['index']);
        unset($C['index']);
        $A['time'] = $this->unix($A['time']);
        $B['time'] = $this->unix($B['time']);
        $C['time'] = $this->unix($C['time']);
        return ['A' => $A, 'B' => $B, 'C' => $C];
    }

    function findPhase($data, $startTime, $endPrice, $rtRef = 0)
    {
        $side = false;
        $resPoint = [];
        $rt = [];
        $er = 0;
        $sp = 0;

        $data = array_filter($data, function ($item) use ($startTime) {
            return $this->unix($item->time) >= $startTime;
        });
        foreach ($data as $index => $item) {
            $price = $item->lastPrice;
            $time = $item->time;

            if ($sp == 0) {
                $side = $endPrice >= $price;
                $resPoint = [
                    'time' => $time,
                    'price' => $price,
                    'start' => $index,
                    'end' => $index,
                    'margin' => 0,
                ];
                $rt = [
                    'start' => $time,
                    'end' => $time,
                    'distance' => 0,
                    'count' => 0,
                ];
                $sp = $price;
            }

            if ($this->cmp($price, $side, $resPoint['price'])) {
                $distance = $resPoint['end'] - $resPoint['start'];
                if ($distance > $rt['distance']) {
                    $rt['start'] = $resPoint['time'];
                    $rt['end'] = $time;
                    $rt['distance'] = $distance;
                    if ($rtRef > 0 && $distance > $rtRef) {
                        $rt['count']++;
                    }
                    if ($resPoint['margin'] != 0) {
                        $er = round(($endPrice - $resPoint['price']) / $resPoint['margin'], 1);
                        $sp = $resPoint['price'] - $resPoint['margin'];
                    }
                }
                $resPoint = [
                    'time' => $time,
                    'price' => $price,
                    'start' => $index,
                    'end' => $index,
                    'margin' => 0,
                ];
            } else {
                $resPoint['end'] = $index;
                $margin = round($resPoint['price'] - $price, 1);
                if ($this->cmp($margin, $side, $resPoint['margin'])) {
                    $resPoint['margin'] = $margin;
                }
            }

            if ($this->cmp($price, $side, $endPrice, true)) {
                break;
            }
        }

        return ['rt' => $rt, 'er' => $er, 'sp' => $sp];
    }

    function checkPhase($rt, $er, $rr1, $rr2)
    {
        if ($rt < 1) return 1;
        if ($rr1 < 38.2) return 2;
        if ($er > 1) return 3;
        if ($rt > 1) return 4;
        if ($rr2 < 50) return 5;
        return 0;
    }

    private function cmp($value1, $side, $value2, $eq = false)
    {
        if ($side) return $eq ? $value1 >= $value2 : $value1 > $value2;
        else return $eq ? $value1 <= $value2 : $value1 < $value2;
    }

    private function isSame($new)
    {
        $old = StockDrawing::where('symbol', 'VN30F1M')
            ->where('name', 'auto')
            ->pluck('data', 'point')->toArray();

        foreach (['A', 'B', 'C'] as $key) {
            if (!isset($old[$key]) || $old[$key]->time !== $new[$key]['time']) {
                return false;
            }
        }

        return true;
    }

    private function unix($time)
    {
        return strtotime($this->date . ' ' . $time) + self::SHIFT_TIME;
    }
}
