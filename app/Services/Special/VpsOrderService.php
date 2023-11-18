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
        if ($this->connection && count($rsp->data))
            $this->position = intval($rsp->data[0]->net);
    }

    public function hasOrder()
    {
        if (!$this->connection) return false;
        $payload = [
            "group" => "Q",
            "user" => $this->copyist->vps_code,
            "session" => $this->copyist->vps_session,
            "c" => "H",
            "data" => [
                "type" => "string",
                "cmd" => "Web.Order.FullAllOrder",
                "p1" => "1",
                "p2" => "1",
                "p3" => $this->formatAccount() . ",ALL,ALL",
                "p4" => "PENDING"
            ]
        ];
        $url = "https://smartpro.vps.com.vn/handler/core.vpbs";
        $res = $this->client->post($url, ['json' => $payload]);
        $rsp = json_decode($res->getBody());
        if ($rsp->rc != 1) return false;
        return count($rsp->data) > 0;
    }

    public function hasConditionOrder()
    {
        if (!$this->connection) return false;
        $payload = [
            "group" => "B",
            "user" => $this->copyist->vps_code,
            "session" => $this->copyist->vps_session,
            "data" => [
                "type" => "cursor",
                "cmd" => "list_condition_order",
                "p1" => $this->formatAccount(),
                "p2" => "",
                "p3" => $this->todayFormat(),
                "p4" => $this->todayFormat(),
                "p5" => "PENDING_TRIGGER",
                "p6" => "",
                "p7" => "",
                "p8" => "1",
                "p9" => "1"
            ]
        ];
        $url = "https://smartpro.vps.com.vn/handler/core.vpbs";
        $res = $this->client->post($url, ['json' => $payload]);
        $rsp = json_decode($res->getBody());
        if ($rsp->rc != 1) return false;
        return count($rsp->data) > 0;
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
        if ($rsp->rc != 1) return false;
        return (object)[
            'maxVol' => intval($rsp->data->max_vol),
            'fee' => intval($rsp->data->others),
            'vm' => intval($rsp->data->vm),
            'nav' => intval($rsp->data->nav),
        ];
    }

    public function execute($payload)
    {
        if (!$this->connection)
            return ['isOk' => false, 'message' => 'notConnect'];
        //
        switch ($payload->action) {
            case 'entry':
                $isNew = $payload->data->cmd == "new";
                if ($isNew && $this->position != 0)
                    return ['isOk' => false, 'message' => 'openedPosition'];
                else return $this->conditionOrder($payload->action, $payload->data);
                break;
            case 'tpsl':
                if ($this->position == 0)
                    return ['isOk' => false, 'message' => 'unopenedPosition'];
                else {
                    $tp = $this->order('tp', $payload->tpData);
                    if (!$tp['isOk']) return $tp;
                    return $this->conditionOrder('sl', $payload->slData);
                }
                break;
            case 'tp':
                $isNew = $payload->data->cmd == "new";
                if ($isNew && $this->position == 0)
                    return ['isOk' => false, 'message' => 'unopenedPosition'];
                else return $this->order($payload->action, $payload->data);
                break;
            case 'sl':
                $isNew = $payload->data->cmd == "new";
                if ($isNew && $this->position == 0)
                    return ['isOk' => false, 'message' => 'unopenedPosition'];
                else return $this->conditionOrder($payload->action, $payload->data);
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
                if ($this->position == 0) return ['isOk' => true];
                else return $this->order('exit', $payload->exitData);
                break;
        }
    }

    public function conditionOrder($type, $data)
    {
        $isSl = $type == "sl";
        $isNew = $data->cmd == "new";
        $isNotDelete = $data->cmd != 'delete';
        $side = $isSl ? -$this->position : ($isNew ? $data->side : $this->position);
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
                "quantity" => strval($isSl ? (abs($this->position)) : $this->copyist->volume),
                "relation" => $isNotDelete ? $this->formatRelation($side) : "",
                "side" => $isNew ? $this->formatSide($side) : "",
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
        $isNotCancel = $data->cmd != "cancel";
        $price = $isNotCancel ? $this->formatPrice($data->price) : "";
        $side = $isNew ? $this->formatSide(-$this->position) : "";
        $account = $this->formatAccount();
        $refId = $this->createRefId();
        $volume = abs($this->position);
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
                "volume" => $volume,
                "nvol" => $volume,
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
        if ($side < 0) return "S";
        if ($side > 0) return "B";
    }

    public function formatRelation($side)
    {
        if ($side < 0) return "LTEQ";
        if ($side > 0) return "GTEQ";
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

    private function todayFormat()
    {
        return now()->format('d/m/Y');
    }
}
