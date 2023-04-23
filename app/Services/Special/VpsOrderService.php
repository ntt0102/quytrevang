<?php

namespace App\Services\Special;

use App\Services\CoreService;
use App\Models\VpsUser;
use GuzzleHttp\Client;

class VpsOrderService extends CoreService
{
    private $client;
    private $vpsUser;
    private $symbol;
    public $status;

    public function __construct(VpsUser $vpsUser, bool $withStatus = false)
    {
        $this->client = new Client();
        $this->vpsUser = $vpsUser;
        $this->symbol = get_global_value('vn30f1m');
        if ($withStatus) $this->status = $this->getAccountStatus();
    }

    public function getAccountStatus()
    {
        $payload = [
            "group" => "Q",
            "user" => $this->vpsUser->vps_code,
            "session" => $this->vpsUser->vps_session,
            "c" => "H",
            "data" => [
                "type" => "string",
                "cmd" => "Web.Portfolio.AccountStatus",
                "p1" => $this->formatAccount(),
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

    public function orderCondition($data, $orderId = "")
    {
        $payload = [
            "group" => "O",
            "user" => $this->vpsUser->vps_code,
            "session" => $this->vpsUser->vps_session,
            "language" => "vi",
            "data" => [
                "cmd" => "co.stop.order." . $data->type,
                "accountNo" => $this->formatAccount(),
                "pin" => "",
                "orderId" => $orderId,
                "channel" => "H",
                "priceType" => "MTL",
                "quantity" => strval($this->vpsUser->volume),
                "relation" => "GTEQ",
                "side" => $this->formatSide($data->side),
                "stopOrderType" => "stop",
                "symbol" => $this->symbol,
                "triggerPrice" => $this->formatPrice($data->price)
            ]
        ];
        $url = "https://smartpro.vps.com.vn/handler/core_ext.vpbs";
        $res = $this->client->post($url, ['json' => $payload]);
        $rsp = json_decode($res->getBody());
        return $rsp;
        if ($rsp->rc != 1) return false;
        return $rsp->stopOrderID;
    }

    public function order($data, $orderNo = "")
    {
        $price = $this->formatPrice($data->price);
        $side = $this->formatSide($data->side);
        $account = $this->formatAccount();
        $refId = $this->createRefId();
        $isNew = $data->type == "new";
        $checkSum = $this->createCheckSum($isNew, $price, $side, $account, $refId);
        $payload = [
            "group" => "FD",
            "user" => $this->vpsUser->vps_code,
            "session" => $this->vpsUser->vps_session,
            "c" => "H",
            "checksum" => $checkSum,
            "language" => "vi",
            "data" => [
                "type" => "string",
                "cmd" => "Web." . $data->type . "Order",
                "account" => $account,
                "pin" => "",
                "orderNo" => $orderNo,
                "price" => $price,
                "nprice" => $price,
                "side" => $side,
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
        return $rsp->orderNo;
    }

    public function formatAccount()
    {
        return $this->vpsUser->vps_code . "8";
    }

    public function formatPrice($price)
    {
        return str_replace('.0', '', strval($price));
    }

    public function formatSide($side)
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

        return $this->vpsUser->vps_code . ".H." . $text;
    }

    public function createCheckSum($isNew, $price, $side, $account, $refId)
    {
        $checkSum = $this->vpsUser->vps_session;
        $checkSum .= $isNew ? $price : "undefined";
        if ($isNew) $checkSum .= $side;
        $checkSum .= ($isNew ? $this->vpsUser->volume * 100 : 0) . "vpbs@456";
        if ($isNew) {
            $checkSum .= $account;
            $checkSum .= $this->symbol;
        }
        $checkSum .= $refId;
        return $checkSum;
    }
}
