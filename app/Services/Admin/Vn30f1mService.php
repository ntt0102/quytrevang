<?php

namespace App\Services\Admin;

use App\Services\CoreService;
use App\Repositories\Vn30f1mRepository;

class Vn30f1mService extends CoreService
{
    private $vn30f1mRepository;

    public function __construct(
        Vn30f1mRepository $vn30f1mRepository
    ) {
        $this->vn30f1mRepository = $vn30f1mRepository;
    }

    /**
     * Get price and foreign of symbol
     * 
     * @param $request
     *
     * @return array
     */
    public function getVn30f1m($request)
    {
        return $this->vn30f1mRepository->getVn30f1m();
    }

    /**
     * Get Data
     * 
     * 
     */
    public function getData()
    {
        $result =  $this->transaction(function () {
            $currentDate = now()->format('Y-m-d');
            if ($this->vn30f1mRepository->count([['date', $currentDate]])) return true;
            $client = new \GuzzleHttp\Client();
            $url = "https://bgapidatafeed.vps.com.vn/getlistindexdetail/10";
            $res = $client->get($url);
            $data = ['date' => $currentDate, 'symbol' => 'VNINDEX', 'price' => json_decode($res->getBody())[0]->cIndex];
            $isOk = !!$this->vn30f1mRepository->create($data);
            //
            $url = "https://bgapidatafeed.vps.com.vn/listvn30";
            $res = $client->get($url);
            $listvn30 = implode(",", json_decode($res->getBody()));
            $url = "https://bgapidatafeed.vps.com.vn/getliststockdata/{$listvn30}";
            $res = $client->get($url);
            foreach (json_decode($res->getBody()) as $item) {
                $data = ['date' => $currentDate, 'symbol' => $item->sym, 'price' => $item->lastPrice, 'foreign' => $item->fBVol - $item->fSVolume];
                $isOk &= !!$this->vn30f1mRepository->create($data);
            }
            return $isOk;
        });
        if ($result) return $result;
        return $this->getData();
    }
}
