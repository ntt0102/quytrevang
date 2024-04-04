<?php

namespace App\Services\Special;

use App\Services\CoreService;

class AiService extends CoreService
{
    const TIME_ZONE = 7 * 60 * 60;
    const TIME_TF = 'd';

    public function getData($payload)
    {
        $from = strtotime('last day of last week -2 years');
        $to = strtotime('last day of last week');
        $payload = (object)['symbol' => 'MSN', 'from' => $from, 'to' => $to];
        $aPV = $this->getPriceVolume($payload);
        $aF = $this->getForeign($payload);
        // return array_values($aPV);
        return array_values(array_merge_recursive(array_intersect_key($aF, $aPV), $aPV));
    }
    public function getPriceVolume($payload)
    {
        $type = $payload->symbol == 'VNINDEX' ? 'index' : 'stock';
        $client = new \GuzzleHttp\Client();
        $url = "https://services.entrade.com.vn/chart-api/v2/ohlcs/{$type}?symbol={$payload->symbol}&resolution=1D&from={$payload->from}&to={$payload->to}";
        $res = $client->get($url);
        $data = json_decode($res->getBody());
        $this->getTfPriceVolume($data);
        return $data;
    }
    private function getTfPriceVolume(&$data)
    {
        $r = [];
        $h = 0;
        $l = 0;
        $c = 0;
        $v = 0;
        $prevAvg = $data->c[0];
        for ($i = 0; $i < count($data->t); $i++) {
            $key = date('Y-m-' . self::TIME_TF, +$data->t[$i] + self::TIME_ZONE);
            if (!array_key_exists($key, $r)) {
                $h = $data->h[$i];
                $l = $data->l[$i];
                $v = 0;
            } else {
                if ($data->h[$i] > $h) $h = $data->h[$i];
                if ($data->l[$i] < $l) $l = $data->l[$i];
            }
            $c = $data->c[$i];
            $avg = ($h + $l + $c) / 3;
            $r[$key]['price'] = $avg;
            $v += $data->v[$i];
            // $r[$key]['volume'] = $v;
        }
        $data = $r;
    }
    public function getForeign($payload)
    {
        $startDate = date('m/d/Y', $payload->from);
        $endDate = date("m/d/Y", $payload->to);
        $client = new \GuzzleHttp\Client();
        $url = "https://s.cafef.vn/Ajax/PageNew/DataHistory/GDKhoiNgoai.ashx?Symbol={$payload->symbol}&StartDate={$startDate}&EndDate={$endDate}&PageIndex=1&PageSize=1000000";
        $res = $client->get($url);
        $data = json_decode($res->getBody())->Data->Data;
        usort($data, function ($a, $b) {
            $at = strtotime(str_replace('/', '-', $a->Ngay));
            $bt = strtotime(str_replace('/', '-', $b->Ngay));
            return strcmp($at, $bt);
        });
        $this->getTfForeign($data);
        return $data;
    }
    private function getTfForeign(&$data)
    {
        $r = [];
        $f = 0;
        foreach ($data as $bar) {
            $key = date('Y-m-' . self::TIME_TF, strtotime(str_replace('/', '-', $bar->Ngay)) + self::TIME_ZONE);
            if (!array_key_exists($key, $r)) {
                $f = 0;
            }
            $f += $bar->KLGDRong;
            $r[$key]['foreign'] = $f;
        }
        $data = $r;
    }
}
