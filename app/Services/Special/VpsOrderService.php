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

    public function __construct(VpsUser $vpsUser)
    {
        $this->client = new Client();
        $this->vpsUser = $vpsUser;
        $this->symbol = get_global_value('vn30f1m');
        $this->status = $this->getAccountStatus();
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
            ],
        ];
        $url = "https://smartpro.vps.com.vn/handler/core.vpbs";
        $res = $this->client->post($url, ['json' => $payload]);
        $rsp = json_decode($res->getBody());
        if ($rsp->rc != 1) return (object)['connect' => false];
        return (object)[
            'connect' => true,
            'maxVol' => $rsp->data->max_vol,
            'fee' => $rsp->data->others,
            'vm' => $rsp->data->vm,
            'net' => $rsp->data->net != 'NO' ? $rsp->data->net : 0
        ];
    }

    public function conditionOrder($type, $data)
    {
        if (!$this->status->connect)
            return ['isOk' => false, 'message' => 'notConnect'];
        //
        $isEntry = $type == "entry";
        $isSl = $type == "sl";
        $isNew = $data->cmd == "new";
        if ($isEntry && $isNew && $this->status->net != 0)
            return ['isOk' => false, 'message' => 'openedPosition'];
        if ($isSl && $isNew && $this->status->net == 0)
            return ['isOk' => false, 'message' => 'unopenedPosition'];
        //
        $isNotDelete = $data->cmd != 'delete';
        $payload = [
            "group" => "O",
            "user" => $this->vpsUser->vps_code,
            "session" => $this->vpsUser->vps_session,
            "language" => "vi",
            "data" => [
                "cmd" => "co.stop.order." . $data->cmd,
                "accountNo" => $this->formatAccount(),
                "pin" => "",
                "orderId" => $this->vpsUser->{$type . '_order_id'},
                "channel" => "H",
                "priceType" => "MTL",
                "quantity" => strval($this->vpsUser->volume),
                "relation" => $isNotDelete ? $this->formatRelation($data->side) : "",
                "side" => $isNew ? $this->formatSide($data->side) : "",
                "stopOrderType" => "stop",
                "symbol" => $this->symbol,
                "triggerPrice" => $isNotDelete ?  $this->formatPrice($data->price) : ""
            ]
        ];
        $url = "https://smartpro.vps.com.vn/handler/core_ext.vpbs";
        $res = $this->client->post($url, ['json' => $payload]);
        $rsp = json_decode($res->getBody());
        if ($rsp->rc != 1) return ['isOk' => false, 'message' => 'failOrder'];
        $isOk = $this->vpsUser->update([$type . '_order_id' => $rsp->data->stopOrderID]);
        if (!$isOk) return ['isOk' => false, 'message' => 'failSave'];
        return ['isOk' => true];
    }

    public function order($type, $data)
    {
        if (!$this->status->connect)
            return ['isOk' => false, 'message' => 'notConnect'];
        //
        $isNew = $data->cmd == "new";
        if ($isNew && $this->status->net == 0)
            return ['isOk' => false, 'message' => 'unopenedPosition'];
        //
        $isNotCancel = $data->cmd != "cancel";
        $price = $isNotCancel ? $this->formatPrice($data->price) : "";
        $side = $isNew ? $this->formatSide($data->side) : "";
        $account = $this->formatAccount();
        $refId = $this->createRefId();
        $payload = [
            "group" => "FD",
            "user" => $this->vpsUser->vps_code,
            "session" => $this->vpsUser->vps_session,
            "c" => "H",
            "checksum" => $isNotCancel ? $this->createCheckSum($isNew, $price, $side, $account, $refId) : "",
            "language" => "vi",
            "data" => [
                "type" => "string",
                "cmd" => "Web." . $data->cmd . "Order",
                "account" => $account,
                "pin" => "",
                "orderNo" => $this->vpsUser->{$type . '_order_id'},
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
        if ($rsp->rc != 1) return ['isOk' => false, 'message' => 'failOrder'];
        $isOk = $this->vpsUser->update([$type . '_order_id' => $rsp->data->orderNo]);
        if (!$isOk) return ['isOk' => false, 'message' => 'failSave'];
        return ['isOk' => true];
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
    }

    public function formatRelation($side)
    {
        if ($side == -1) return "LTEQ";
        if ($side == 1) return "GTEQ";
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
