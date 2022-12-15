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
            $url = "https://bddatafeed.vps.com.vn/getpschartintraday/VN30F1M";
            $res = $client->get($url);
            $rep = json_decode($res->getBody());
            $data = ['date' => $currentDate, 'price1' => array_pop($rep)->lastPrice, 'price2' => array_pop($rep)->lastPrice];
            $isOk = !!$this->vn30f1mRepository->create($data);
            $isOk &= $this->vn30f1mRepository->update($this->vn30f1mRepository->getLast(), ['price3' => $rep[0]->lastPrice]);
            return $isOk;
        });
        if ($result) return $result;
        return $this->getData();
    }
}
