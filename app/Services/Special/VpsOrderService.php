<?php

namespace App\Services\Special;

use App\Services\CoreService;
use App\Models\VpsUser;
use GuzzleHttp\Client;

class VpsOrderService extends CoreService
{
    private $client;
    private $vpsUser;
    private $vpsCode;
    private $vpsSession;
    private $symbol;

    public function __construct(VpsUser $vpsUser)
    {
        $this->client = new Client();
        $this->vpsUser = $vpsUser;
        $this->vpsCode = strval($vpsUser->vps_code);
        $this->vpsSession = $vpsUser->vps_session;
        $this->symbol = get_global_value('vn30f1m');
    }

    public function getPosition()
    {
        // return [
        //     "user" => $this->vpsCode,
        //     "session" => $this->vpsSession,
        // ];
        $payload = [
            "group" => "Q",
            "user" => $this->vpsCode,
            "session" => $this->vpsSession,
            "c" => "H",
            "data" => [
                "type" => "string",
                "cmd" => "Web.Portfolio.AccountStatus",
                "p1" => $this->vpsCode . "8",
                "p2" => "",
                "p3" => "",
                "p4" => "null",
            ],
        ];
        // return $payload;
        // $payload = [
        //     "user" => $this->vpsCode,
        //     "session" => $this->vpsSession,
        // ];
        $url = "https://smartpro.vps.com.vn/handler/core.vpbs";
        // $url = "https://quytrevang.nguyenvanxuanphu.com/api/core.vpbs";
        $res = $this->client->post($url, [
            // 'headers' => [
            //     // 'Accept' => 'application/json',
            //     // 'Content-Type' => 'application/json'
            // ],
            'json' => $payload
        ]);
        return json_decode($res->getBody());
        // return $res->getBody()->getContents();
        // $request = $this->client->post($url,  ['body' => $payload]);
        // $response = $request->send();

        // dd($response);
    }
}
