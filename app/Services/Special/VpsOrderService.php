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

    public function getAccountStatus()
    {
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
        $url = "https://smartpro.vps.com.vn/handler/core.vpbs";
        $res = $this->client->post($url, ['json' => $payload]);
        $rsp = json_decode($res->getBody());
        if (!$rsp->rc) return [];
        return [
            'max_vol' => $rsp->data->max_vol,
            'fee' => $rsp->data->others,
            'vm' => $rsp->data->vm,
            'net' => $rsp->data->net != 'NO' ? $rsp->data->net : 0
        ];
    }
}
