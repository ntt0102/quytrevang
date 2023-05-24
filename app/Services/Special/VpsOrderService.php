<?php

namespace App\Services\Special;

use App\Services\CoreService;
use App\Models\Copyist;
use GuzzleHttp\Client;

class VpsOrderService extends CoreService
{
    private $client;
    private $copyist;
    public $symbol;
    public $connection = false;
    public $position = 0;

    public function __construct(Copyist $copyist)
    {
        $this->client = new Client();
        $this->copyist = $copyist;
        $this->symbol = get_global_value('vn30f1m');
        $this->getPosition();
    }

    public function getPosition()
    {
        $payload = [
            "group" => "Q",
            "user" => $this->copyist->vps_code,
            "session" => $this->copyist->vps_session,
            "c" => "H",
            "data" => [
                "type" => "string",
                "cmd" => "Web.Portfolio.PortfolioStatus2",
                "p1" => $this->formatAccount(),
            ],
        ];
        $url = "https://smartpro.vps.com.vn/handler/core.vpbs";
        $res = $this->client->post($url, ['json' => $payload]);
        $rsp = json_decode($res->getBody());
        if (!$rsp) return;
        $this->connection = $rsp->rc == 1;
        $this->position = $rsp->rc == 1 ? (count($rsp->data) ? intval($rsp->data[0]->net) : 0) : 0;
    }

    public function getAccountInfo()
    {
        $payload = [
            "group" => "Q",
            "user" => $this->copyist->vps_code,
            "session" => $this->copyist->vps_session,
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
        if ($rsp->rc == 1)
            return (object)[
                'maxVol' => intval($rsp->data->max_vol),
                'fee' => intval($rsp->data->others),
                'vm' => intval($rsp->data->vm)
            ];
    }

    public function execute($payload)
    {
        if (!$this->connection)
            return ['isOk' => false, 'message' => 'notConnect'];
        //
        switch ($payload->action) {
            case 'entry':
                return $this->conditionOrder($payload->action, $payload->data);
                break;
            case 'tpsl':
                $tp = $this->order('tp', $payload->tpData);
                if (!$tp['isOk']) return $tp;
                return $this->conditionOrder('sl', $payload->slData);
                break;
            case 'tp':
                return $this->order($payload->action, $payload->data);
                break;
            case 'sl':
                return $this->conditionOrder($payload->action, $payload->data);
                break;
            case 'cancel':
                $tp = $this->order('tp', $payload->tpData);
                if (!$tp['isOk']) return $tp;
                return $this->conditionOrder('sl', $payload->slData);
                break;
            case 'exit':
                if (isset($payload->tpData)) {
                    $tp = $this->order('tp', $payload->tpData);
                    if (!$tp['isOk']) return $tp;
                }
                if (isset($payload->slData)) {
                    $sl = $this->conditionOrder('sl', $payload->slData);
                    if (!$sl['isOk']) return $sl;
                }
                return $this->order('exit', $payload->exitData);
                break;
        }
    }

    public function conditionOrder($type, $data)
    {
        $isEntry = $type == "entry";
        $isSl = $type == "sl";
        $isNew = $data->cmd == "new";
        if ($isEntry && $isNew && $this->position != 0)
            return ['isOk' => false, 'message' => 'openedPosition'];
        if ($isSl && $isNew && $this->position == 0)
            return ['isOk' => false, 'message' => 'unopenedPosition'];
        //
        $isNotDelete = $data->cmd != 'delete';
        $payload = [
            "group" => "O",
            "user" => $this->copyist->vps_code,
            "session" => $this->copyist->vps_session,
            "language" => "vi",
            "data" => [
                "cmd" => "co.stop.order." . $data->cmd,
                "accountNo" => $this->formatAccount(),
                "pin" => "",
                "orderId" => $this->copyist->{$type . '_order_id'},
                "channel" => "H",
                "priceType" => "MTL",
                "quantity" => strval($this->copyist->volume),
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
        if ($rsp->rc != 1) {
            if ($isNotDelete)
                return ['isOk' => false, 'message' => 'failOrder'];
            else return ['isOk' => true];
        }
        $isOk = $this->copyist->update([$type . '_order_id' => $rsp->data->stopOrderID]);
        if (!$isOk) return ['isOk' => false, 'message' => 'failSave'];
        return ['isOk' => true];
    }

    public function order($type, $data)
    {
        $isNew = $data->cmd == "new";
        if ($isNew && $this->position == 0)
            return ['isOk' => false, 'message' => 'unopenedPosition'];
        //
        $isNotCancel = $data->cmd != "cancel";
        $price = $isNotCancel ? $this->formatPrice($data->price) : "";
        $side = $isNew ? $this->formatSide($data->side) : "";
        $account = $this->formatAccount();
        $refId = $this->createRefId();
        $payload = [
            "group" => "FD",
            "user" => $this->copyist->vps_code,
            "session" => $this->copyist->vps_session,
            "c" => "H",
            "checksum" => $isNotCancel ? $this->createCheckSum($isNew, $price, $side, $account, $refId) : "",
            "language" => "vi",
            "data" => [
                "type" => "string",
                "cmd" => "Web." . $data->cmd . "Order",
                "account" => $account,
                "pin" => "",
                "orderNo" => $this->copyist->{$type . '_order_id'},
                "price" => $price,
                "nprice" => $price,
                "side" => $side,
                "volume" => $this->copyist->volume,
                "nvol" => $this->copyist->volume,
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
        if ($rsp->rc != 1) {
            if ($isNotCancel)
                return ['isOk' => false, 'message' => 'failOrder'];
            else return ['isOk' => true];
        }
        $isOk = $this->copyist->update([$type . '_order_id' => $rsp->data[0]->orderNo]);
        if (!$isOk) return ['isOk' => false, 'message' => 'failSave'];
        return ['isOk' => true];
    }

    public function formatAccount()
    {
        return $this->copyist->vps_code . "8";
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

        return $this->copyist->vps_code . ".H." . $text;
    }

    public function createCheckSum($isNew, $price, $side, $account, $refId)
    {
        $checkSum = $this->copyist->vps_session;
        $checkSum .= $isNew ? $price : "undefined";
        if ($isNew) $checkSum .= $side;
        $checkSum .= ($isNew ? $this->copyist->volume * 100 : 0) . "vpbs@456";
        if ($isNew) {
            $checkSum .= $account;
            $checkSum .= $this->symbol;
        }
        $checkSum .= $refId;
        return md5($checkSum);
    }
}
