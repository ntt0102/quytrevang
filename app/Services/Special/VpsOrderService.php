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
    private $volume;
    private $entryId;
    private $tpId;
    private $slId;
    private $exitId;
    private $symbol;
    public $status;

    public function __construct(VpsUser $vpsUser, bool $withStatus = false)
    {
        $this->client = new Client();
        $this->vpsUser = $vpsUser;
        // $this->vpsCode = $vpsUser->vps_code;
        // $this->vpsSession = $vpsUser->vps_session;
        // $this->volume = $vpsUser->volume;
        // $this->entryId = $vpsUser->entry_id;
        // $this->tpId = $vpsUser->tp_id;
        // $this->slId = $vpsUser->sl_id;
        // $this->exitId = $vpsUser->exit_id;
        $this->symbol = get_global_value('vn30f1m');
        if ($withStatus) $this->status = $this->getAccountStatus();
    }

    public function getAccountStatus()
    {
        $payload = [
            "group" => "Q",
            "user" => $this->vpsUser->vpsCode,
            "session" => $this->vpsUser->vpsSession,
            "c" => "H",
            "data" => [
                "type" => "string",
                "cmd" => "Web.Portfolio.AccountStatus",
                "p1" => $this->vpsUser->vpsCode . "8",
                "p2" => "",
                "p3" => "",
                "p4" => "null",
            ],
        ];
        $url = "https://smartpro.vps.com.vn/handler/core.vpbs";
        $res = $this->client->post($url, ['json' => $payload]);
        $rsp = json_decode($res->getBody());
        if ($rsp->rc != 1) return false;
        return [
            'max_vol' => $rsp->data->max_vol,
            'fee' => $rsp->data->others,
            'vm' => $rsp->data->vm,
            'net' => $rsp->data->net != 'NO' ? $rsp->data->net : 0
        ];
    }
    public function orderCondition($data, $orderId)
    {
        $payload = [
            "group" => "O",
            "user" => $this->vpsUser->vpsCode,
            "session" => $this->vpsUser->vpsSession,
            "language" => "vi",
            "data" => [
                "cmd" => "co.stop.order." . $data->type,
                "accountNo" => $this->vpsUser->vpsCode . "8",
                "pin" => "",
                "orderId" => $orderId,
                "channel" => "H",
                "priceType" => "MTL",
                "quantity" => strval($this->vpsUser->volume),
                "relation" => "GTEQ",
                "side" => $this->convertSide($data->side),
                "stopOrderType" => "stop",
                "symbol" => $this->symbol,
                "triggerPrice" => strval($data->price)
            ]
        ];
        $url = "https://smartpro.vps.com.vn/handler/core_ext.vpbs";
        $res = $this->client->post($url, ['json' => $payload]);
        $rsp = json_decode($res->getBody());
        if ($rsp->rc != 1) return false;
        return $rsp->stopOrderID;
    }

    public function order($data, $orderNo)
    {
        $refId = $this->createRefId();
        $payload = [
            "group" => "FD",
            "user" => $this->vpsUser->vpsCode,
            "session" => $this->vpsUser->vpsSession,
            "c" => "H",
            "checksum" => "e98580362777fe537071c8ac9f095f48",
            "language" => "vi",
            "data" => [
                "type" => "string",
                "cmd" => "Web." . $data->type . "Order",
                "account" => $this->vpsUser->vpsCode . "8",
                "pin" => "",
                "orderNo" => $orderNo,
                "price" => strval($data->price),
                "nprice" => strval($data->price),
                "side" => $this->convertSide($data->side),
                "volume" => $this->vpsUser->volume,
                "nvol" => $this->vpsUser->volume,
                "symbol" => $this->symbol,
                "advance" => "",
                "refId" => $refId,
                "fisID" => "",
                "orderType" => "1"
            ]
        ];
        $url = "https://smartpro.vps.com.vn/handler/core.vpbs";
        $res = $this->client->post($url, ['json' => $payload]);
        $rsp = json_decode($res->getBody());
        if ($rsp->rc != 1) return false;
        return $rsp->stopOrderID;
    }
    private function convertSide($side)
    {
        if ($side == -1) return "S";
        if ($side == 1) return "B";
        return "";
    }

    public function createRefId()
    {
        $text = "";
        $str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for ($i = 0; $i < 23; $i++)
            $text .= substr($str, floor(strlen($str) * rand() / getrandmax()), 1);

        return $this->vpsUser->vpsCode . ".H." . $text;
    }
}
