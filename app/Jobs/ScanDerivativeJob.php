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
        $point = [];
        $rt = [];
        $phase = 0;

        $data = array_values(array_filter($data, function ($item) use ($startPoint) {
            return $this->unix($item->date) >= $startPoint['time'];
        }));
        foreach ($data as $index => $item) {
            $price = $item->price;
            $time = $item->date;

            if ($index == 0 || $price == $startPoint['price']) {
                $point = [
                    'time' => $time,
                    'start' => $index,
                    'end' => $index,
                    'resistance' => $price,
                    'support' => $price,
                ];
                $rt = [
                    'start' => $time,
                    'end' => $time,
                    'distance' => 0,
                    'margin' => 0,
                    'count' => 0,
                    'over' => false,
                ];
                $phase = 0;
            }

            if ($this->cmp($price, $side, $point['resistance'])) {
                $distance = $point['end'] - $point['start'];
                $margin = $point['support'] - $point['resistance'];
                if (
                    ($distance > $rt['distance'] &&
                        $this->cmp($margin, !$side, 0.5 * $rt['margin'])) ||
                    ($distance > 0.5 * $rt['distance'] &&
                        $this->cmp($margin, !$side, 2 * $rt['margin']))
                ) {
                    $rt['start'] = $point['time'];
                    $rt['end'] = $time;
                    $rt['distance'] = $distance;
                    $rt['margin'] = $margin;
                    if ($rtRef > 0) {
                        if ($distance > $rtRef) $rt['count']++;
                        if ($distance > 3 * $rtRef) $rt['count'] = true;
                    }
                    $phase = $this->validatePhase(
                        $startPoint['price'],
                        $point['resistance'],
                        $point['support'],
                        $endPoint['price']
                    );
                }
                $point = [
                    'time' => $time,
                    'start' => $index,
                    'end' => $index,
                    'resistance' => $price,
                    'support' => $price,
                ];
            } else {
                $point['end'] = $index;
                if ($this->cmp($price, !$side, $point['support'])) $point['support'] = $price;
            }

            if ($this->cmp($price, $side, $endPoint['price'], true)) {
                break;
            }
        }

        return ['phase' => $phase, 'rt' => $rt];
    }

    function validatePattern($points, $phase2)
    {
        $A = $points['A'];
        $B = $points['B'];
        $C = $points['C'];
        $D = $points['D'];
        $E = $points['E'];

        if ($phase2['rt']['count'] < 1) {
            if (
                !empty($E) &&
                ($B['price'] - $C['price']) / ($B['price'] - $A['price']) >= 0.5 &&
                ($C['price'] - $D['price']) / ($C['price'] - $B['price']) >= 0.786 &&
                ($D['price'] - $E['price']) / ($D['price'] - $C['price']) >= 0.786
            ) {
                return 1;
            }
            return 6;
        }
        if ($phase2['rt']['over']) return 5;
        if ($phase2['rt']['count'] > 1) return 4;

        if ($phase2['phase'] > 0) return 3;

        if (($B['price'] - $C['price']) / ($B['price'] - $A['price']) < 0.382) return 2;

        return 0;
    }

    private function validatePhase($a, $b, $c, $d)
    {
        $result = 0;
        $da = $d - $a;
        $db = $d - $b;
        $dc = $d - $c;
        if ($db / $da > 0.236) $result += 1;
        if ($dc / $da < 0.786) $result += 2;
        return $result;
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
