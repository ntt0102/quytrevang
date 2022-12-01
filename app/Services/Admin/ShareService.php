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
     * Return all the Shares
     * 
     * @param $request
     *
     * @return array
     */
    public function fetch($request)
    {
        $Shares = $this->shareRepository->findAll(['*'], ['display', 'asc']);
        return $Shares;
    }

    /**
     * Save
     * 
     * @param $request
     * 
     */
    public function save($request)
    {
        return $this->transaction(function () use ($request) {
            foreach ($request->changes as $change) {
                $response = [];
                switch ($change['type']) {
                    case 'insert':
                        $data = [
                            "display" => $change['data']['display'],
                            "name" => $change['data']['name'],
                            "balance" => $change['data']['balance'],
                            "last_transaction" => $change['data']['last_transaction']
                        ];
                        $Share = $this->shareRepository->create($data);
                        $isOk = !!$Share;
                        $response['isOk'] = $isOk;
                        break;

                    case 'update':
                        $Share = $this->shareRepository->findById($change['key']);
                        $data = [
                            "display" => $change['data']['display'],
                            "name" => $change['data']['name'],
                            "balance" => $change['data']['balance'],
                            "last_transaction" => $change['data']['last_transaction']
                        ];
                        $hasChangedBalance = $data["balance"] != $Share->balance;
                        $isOk = $this->shareRepository->update($Share, $data);
                        $response['isOk'] = $isOk;
                        break;

                    case 'remove':
                        $Share = $this->shareRepository->findById($change['key']);
                        $isOk = $this->shareRepository->delete($Share);
                        $response['isOk'] = $isOk;
                        break;
                }
                if (!$response['isOk']) break;
            }
            return $response;
        });
    }

    /**
     * Get Shares Name
     * 
     * @param $request
     *
     * @return array
     */
    public function getSharesName($request)
    {
        $Shares = $this->shareRepository->findAll(['id', 'name'], ['display', 'asc']);
        return $Shares;
    }

    /**
     * Get Data
     * 
     * 
     */
    public function getData()
    {
        return $this->transaction(function () {
            $currentDate = now()->format('Y-m-d');
            if ($this->shareRepository->count([['date', $currentDate]])) return false;
            $client = new \GuzzleHttp\Client();
            $isOk = true;
            // $url = "https://bgapidatafeed.vps.com.vn/getlistindexdetail/10";
            // $res = $client->get($url);
            // $data = ['date' => $currentDate, 'symbol' => 'VNINDEX', 'price' => json_decode($res->getBody())[0]->cIndex];
            // $isOk = !!$this->shareRepository->create($data);
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
            if (!$isOk) $this->getData();
            else return $isOk;
        });
    }
}
