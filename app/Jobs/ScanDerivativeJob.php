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
use App\Notifications\ScanedPatternNotification;

class ScanDerivativeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    const SHIFT_TIME = 7 * 60 * 60;
    public $tries = 1;
    public $timeout = 3600;
    private $data;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if (get_global_value('autoScanFlag') == '0') return false;

        $data = json_decode($this->data);

        // $targetTime = '13:35:47';
        // $data = array_filter($data, function ($item) use ($targetTime) {
        //     return $item->time <= $targetTime;
        // });

        $points = $this->scanPattern($data);


        if ($this->isOldPattern($points)) return false;

        set_global_value("dnseTrading", 'count: ' . count($data) . ', time: ' . date('H:i:s') . ', points: ' . json_encode($points));

        foreach ($points as $key => $value) {
            StockDrawing::updateOrCreate(
                ['symbol' => 'VN30F1M', 'name' => 'auto', 'point' => $key],
                ['data' => $value]
            );
        }

        $phase1 = $this->scanPhase($data, $points['A'], $points['B']);
        $phase2 = $this->scanPhase($data, $points['B'], $points['C'], $phase1['rt']['distance']);
        $pattern = $this->validatePattern($points, $phase2);

        if ($pattern == 0 || $pattern == 1) {
            Notification::send(
                User::permission('admin:order_derivative')->get(),
                new ScanedPatternNotification()
            );
        }

        return $pattern;
    }

    private function scanPattern($data)
    {
        $side = null;
        $A = $B = $C = $D = $E = $F = [];

        $lastPos = count($data) - 1;
        for ($index = $lastPos; $index >= 0; $index--) {
            $price = $data[$index]->price;
            $time = $data[$index]->date;

            if ($index == $lastPos) {
                $F = ['index' => $index, 'time' => $time, 'price' => $price];
                $E = $F;
                $D = $F;
                $C = $F;
                $B = $F;
                $A = $F;
            }

            if ($side === null) {
                if ($price == $F['price']) continue;
                $side = $F['price'] > $price;
            }

            if (
                !$this->cmp($D['price'], $side, $F['price']) &&
                $this->cmp($price, !$side, $E['price'])
            )
                $E = ['index' => $index, 'time' => $time, 'price' => $price];
            if (
                !$this->cmp($C['price'], !$side, $E['price']) &&
                $this->cmp($price, $side, $D['price'])
            ) {
                if ($F['index'] - $E['index'] <= 5) {
                    $F = $E;
                    $D = $E;
                    $E = ['index' => $index, 'time' => $time, 'price' => $price];
                    $side = !$side;
                } else $D = ['index' => $index, 'time' => $time, 'price' => $price];
            }
            if (
                !$this->cmp($B['price'], $side, $D['price']) &&
                $this->cmp($price, !$side, $C['price'])
            )
                $C = ['index' => $index, 'time' => $time, 'price' => $price];

            if ($this->cmp($price, $side, $B['price'])) {
                if ($this->cmp($A['price'], !$side, $C['price'])) {
                    $F = $E;
                    $E = $D;
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
                $E['index'] > $C['index'] &&
                $C['index'] - $index > $E['index'] - $D['index']
            ) {
                $cd = abs($C['price'] - $D['price']);
                $de = abs($D['price'] - $E['price']);
                $ef = abs($E['price'] - $F['price']);
                if ($de >= 1.5 && ($de / $cd > 0.5 || $ef / $de > 0.5)) break;
            }
            if (
                $C['index'] > $A['index'] &&
                $A['index'] - $index > $C['index'] - $B['index']
            ) {
                $ab = abs($A['price'] - $B['price']);
                $bc = abs($B['price'] - $C['price']);
                $cd = abs($C['price'] - $D['price']);
                if ($bc >= 1.5 && ($bc / $ab > 0.5 || $cd / $bc > 0.5)) break;
            }
        }
        $ret = [];
        if ($A['index'] != $C['index']) $ret = ['A' => $A, 'B' => $B, 'C' => $C, 'D' => $D, 'E' => $E, 'F' => $F];
        else if ($C['index'] != $E['index']) $ret = ['A' => $C, 'B' => $D, 'C' => $E, 'D' => $F, 'E' => [], 'F' => []];

        return $this->removeIndex($ret);
    }

    function scanPhase($data, $startPoint, $endPoint, $rtRef = 0)
    {
        $side = $endPoint['price'] > $startPoint['price'];
        $resPoint = [];
        $rt = [];
        $er = 0;
        $sp = 0;

        $data = array_filter($data, function ($item) use ($startPoint) {
            return $this->unix($item->date) >= $startPoint['time'];
        });
        foreach ($data as $index => $item) {
            $price = $item->price;
            $time = $item->date;

            if ($sp == 0 || $price == $startPoint['price']) {
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
                    'over' => false,
                ];
                $sp = $price;
            }

            if ($this->cmp($price, $side, $resPoint['price'])) {
                $distance = $resPoint['end'] - $resPoint['start'];
                if ($distance > $rt['distance']) {
                    $rt['start'] = $resPoint['time'];
                    $rt['end'] = $time;
                    $rt['distance'] = $distance;
                    if ($rtRef > 0) {
                        if ($distance > $rtRef) $rt['count']++;
                        if ($distance > 3 * $rtRef) $rt['count'] = true;
                    }
                    if ($resPoint['margin'] != 0) {
                        $er = round(($endPoint['price'] - $resPoint['price']) / $resPoint['margin'], 1);
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

            if ($this->cmp($price, $side, $endPoint['price'], true)) {
                break;
            }
        }

        return ['rt' => $rt, 'er' => $er, 'sp' => $sp];
    }

    function validatePattern($points, $phase2)
    {
        $A = $points['A'];
        $B = $points['B'];
        $C = $points['C'];
        $D = $points['D'];
        $E = $points['E'];

        if ($phase2['rt']['over']) return 7;
        if ($phase2['rt']['count'] > 1) return 6;

        if ($phase2['rt']['count'] < 1) {
            if (
                !empty($E) &&
                ($B['price'] - $C['price']) / ($B['price'] - $A['price']) >= 0.5 &&
                ($C['price'] - $D['price']) / ($C['price'] - $B['price']) >= 0.786 &&
                ($D['price'] - $E['price']) / ($D['price'] - $C['price']) >= 0.786
            ) {
                return 1;
            }
            return 2;
        }

        if (($B['price'] - $C['price']) / ($B['price'] - $A['price']) < 0.382) return 3;

        if ($phase2['er'] > 1) return 4;

        if (($C['price'] - $phase2['sp']) / ($C['price'] - $B['price']) < 0.786) return 5;

        return 0;
    }

    private function cmp($value1, $side, $value2, $eq = false)
    {
        if ($side) return $eq ? $value1 >= $value2 : $value1 > $value2;
        else return $eq ? $value1 <= $value2 : $value1 < $value2;
    }

    private function removeIndex($data)
    {
        $result = [];
        foreach ($data as $key => $value) {
            if (isset($value['index'])) unset($value['index']);
            if (isset($value['time'])) $value['time'] = $this->unix($value['time']);
            $result[$key] = $value;
        }
        return $result;
    }

    private function isOldPattern($new)
    {
        $old = StockDrawing::where('symbol', 'VN30F1M')
            ->where('name', 'auto')
            ->pluck('data', 'point')->toArray();

        $keysToRemove = array_flip(['D', 'C', 'E', 'F']);

        $filteredOld = array_diff_key($old, $keysToRemove);
        $filteredNew = array_diff_key($new, $keysToRemove);

        return json_encode($filteredOld) === json_encode($filteredNew);
    }


    private function unix($time)
    {
        return strtotime($time) + self::SHIFT_TIME;
    }
}
