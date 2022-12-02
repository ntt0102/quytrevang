<?php

namespace App\Services\Admin;

use App\Services\CoreService;
use App\Repositories\ShareRepository;

class ShareService extends CoreService
{
    private $shareRepository;

    public function __construct(
        ShareRepository $shareRepository
    ) {
        $this->shareRepository = $shareRepository;
    }

    /**
     * Get price and foreign of symbol
     * 
     * @param $request
     *
     * @return array
     */
    public function getShare($request)
    {
        $return = [];
        if ($request->symbols) {
            $symbols = $this->shareRepository->getSymbol();
            $return['symbols'] = $symbols;
            $symbol = $symbols[0];
            $return['symbol'] = $symbol;
        } else $symbol = $request->symbol;
        $return['shares'] = $this->shareRepository->getShare($symbol);
        return $return;
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
            if ($this->shareRepository->count([['date', $currentDate]])) return true;
            $client = new \GuzzleHttp\Client();
            $url = "https://bgapidatafeed.vps.com.vn/getlistindexdetail/10";
            $res = $client->get($url);
            $data = ['date' => $currentDate, 'symbol' => 'VNINDEX', 'price' => json_decode($res->getBody())[0]->cIndex];
            $isOk = !!$this->shareRepository->create($data);
            //
            $url = "https://bgapidatafeed.vps.com.vn/listvn30";
            $res = $client->get($url);
            $listvn30 = implode(",", json_decode($res->getBody()));
            $url = "https://bgapidatafeed.vps.com.vn/getliststockdata/{$listvn30}";
            $res = $client->get($url);
            foreach (json_decode($res->getBody()) as $item) {
                $data = ['date' => $currentDate, 'symbol' => $item->sym, 'price' => $item->lastPrice, 'foreign' => $item->fBVol - $item->fSVolume];
                $isOk &= !!$this->shareRepository->create($data);
            }
            return $isOk;
        });
        if ($result) return $result;
        return $this->getData();
    }
}
