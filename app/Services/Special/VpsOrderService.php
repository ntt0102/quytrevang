<?php

namespace App\Services\Special;

use App\Services\CoreService;
use App\Models\Parameter;
use GuzzleHttp\Client;

class VpsOrderService extends CoreService
{
    private $client;
    public $orderVolume;
    public $symbol;
    public $vpsUser;
    public $vpsPass;
    public $vpsSession;
    public $orderId;
    public $connection = false;
    public $position = 0;

    public function __construct($otpCode = null)
    {
        $this->client = new Client();
        $this->orderVolume = (int) Parameter::getValue('orderVolume');
        $this->symbol = get_global_value('vn30f1m');
        $this->vpsUser = get_global_value('vpsUser');
        $this->vpsPass = get_global_value('vpsPass');
        $this->vpsSession = get_global_value('vpsSession');
        if ($otpCode) $this->loginVps($otpCode);
        else $this->getPosition();
    }

    public function loginVps($otpCode)
    {
        $gssc = "yZl5Ut7NiKPg8FR+5aBvJza/JKiXuXbNMOIJ7AMQJjJV5/hblO8LUP95XiiLdiEGrtav+a4rLsyXadGWVMOKKOsnAbcQ50VfIXKxnwxHRw09sYG5ESUOXrV6AqjbeMQ+nK9nfO9ReDevPABSo2ZjuOCZExx30GlMblu+ALXf3VByCTSFL2mLH40JPH67sTstV5U3Uq0ZCOGXBxF8SzqA5zhhpgyebpIVukw/yR4AbkMPgbhyhah6wg==";
        $deviceInfo = "eyJ0eXBlIjoid2ViIiwic291cmNlIjoiU21hcnRQcm8gV2ViIiwidmVyc2lvbiI6IjEuNyIsIm1vZGVsIjoiRWRnZSIsImRldmljZU9TIjoiV2luZG93cyIsImdlb0xvY2F0aW9uIjoiIn0=";
        try {
            $payload = [
                'user' => $this->vpsUser,
                'pass' => $this->vpsPass,
                'channel' => 'H',
                'language' => 'VI',
                'cmd' => 'Web.sCheckLoginOTP',
                'p5' => $otpCode,
                'p6' => '',
                'p7' => 0,
                'deviceNew' => $gssc,
                'deviceName' => 'Edge Windows 10',
                'deviceInfo' => $deviceInfo,
            ];
            $url = "https://smartpro.vps.com.vn/handler/core_check.login";
            $res = $this->client->post($url, [
                'headers' => ['X-Device-New' => $gssc],
                'body' => $this->build_query_string($payload)
            ]);
            $rsp = json_decode($res->getBody());
            if ($rsp->rc == 1) {
                $this->vpsSession = $rsp->data->sid;
                $this->getPosition();
                set_global_value('vpsSession', $rsp->data->sid);
            };
        } catch (\Throwable $th) {
            return;
        }
    }

    public function getPosition()
    {
        try {
            $payload = [
                "group" => "Q",
                "user" => $this->vpsUser,
                "session" => $this->vpsSession,
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
        } catch (\Throwable $th) {
            return;
        }
    }

    public function getPendingOrders()
    {
        return array_merge($this->getPendingLO(), $this->getPendingSL());
    }

    public function getPendingSL()
    {
        if (!$this->connection) return [];
        $payload = [
            "group" => "B",
            "user" => $this->vpsUser,
            "session" => $this->vpsSession,
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
                "p9" => "10"
            ]
        ];
        $url = "https://smartpro.vps.com.vn/handler/core.vpbs";
        $res = $this->client->post($url, ['json' => $payload]);
        $rsp = json_decode($res->getBody());
        if ($rsp->rc != 1) return [];
        return array_map(function ($order) {
            return [
                'orderNo' => $order->STOP_ORDER_ID,
                'type' => 'SL',
                'time' => $order->CREATED_TIME,
                'side' => $order->SIDE,
                'volume' => $order->QUANTITY,
                // 'price' => $order->TRIGGER_PRICE,
                'price' => $order->C_SO_PRICE,

            ];
        }, $rsp->data);
    }

    public function getPendingLO()
    {
        if (!$this->connection) return [];
        $payload = [
            "group" => "Q",
            "user" => $this->vpsUser,
            "session" => $this->vpsSession,
            "c" => "H",
            "data" => [
                "type" => "string",
                "cmd" => "Web.Order.FullAllOrder",
                "p1" => "1",
                "p2" => "10",
                "p3" => $this->formatAccount() . ",ALL,ALL",
                "p4" => "PENDING"
            ]
        ];
        $url = "https://smartpro.vps.com.vn/handler/core.vpbs";
        $res = $this->client->post($url, ['json' => $payload]);
        $rsp = json_decode($res->getBody());
        if ($rsp->rc != 1) return [];
        return array_map(function ($order) {
            return [
                'orderNo' => $order->orderNo,
                'type' => 'LO',
                'time' => $order->orderTime,
                'side' => $order->side,
                'volume' => $order->volume,
                'price' => $order->showPrice,

            ];
        }, $rsp->data);
    }

    public function getAccountInfo()
    {
        if (!$this->connection) return false;
        $payload = [
            "group" => "Q",
            "user" => $this->vpsUser,
            "session" => $this->vpsSession,
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

    public function getMatchedOrders()
    {
        if (!$this->connection) return false;
        $payload = [
            "group" => "Q",
            "user" => $this->vpsUser,
            "session" => $this->vpsSession,
            "c" => "H",
            "data" => [
                "type" => "string",
                "cmd" => "Web.Order.FullAllOrder",
                "p1" => "1",
                "p2" => "6",
                "p3" => $this->formatAccount() . ",ALL,ALL",
                "p4" => "MATCH",
            ],
        ];
        $url = "https://smartpro.vps.com.vn/handler/core.vpbs";
        $res = $this->client->post($url, ['json' => $payload]);
        $rsp = json_decode($res->getBody());
        if ($rsp->rc != 1) return false;
        return $rsp->data;
    }

    public function conditionOrder($data, $isEntry = false)
    {
        $isNew = $data->cmd == "new";
        $isNotDelete = $data->cmd != "delete";
        $side = $isEntry ? ($isNew ? $data->side : $this->position) : -$this->position;
        $account = $this->formatAccount();
        $payload = [
            "group" => "O",
            "user" => $this->vpsUser,
            "session" => $this->vpsSession,
            "language" => "vi",
            "data" => [
                "cmd" => "co.stop.order." . $data->cmd,
                "accountNo" => $account,
                "pin" => "",
                "orderId" => (string)($data->orderNo ?? ""),
                "channel" => "H",
                "priceType" => "MTL",
                "quantity" => strval($isEntry ? $this->orderVolume : abs($this->position)),
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
        if ($rsp->rc != 1 && $isNotDelete) return false;
        return $rsp->data->stopOrderID ?? "";
    }

    public function order($data)
    {
        $isNew = $data->cmd == "new";
        $isNotDelete = $data->cmd != "cancel";
        $price = $isNotDelete ? $this->formatPrice($data->price) : "";
        $side = $isNew ? $this->formatSide(-$this->position) : "";
        $account = $this->formatAccount();
        $refId = $this->createRefId();
        $volume = abs($this->position);
        $payload = [
            "group" => "FD",
            "user" => $this->vpsUser,
            "session" => $this->vpsSession,
            "c" => "H",
            "checksum" => $isNotDelete ? $this->createCheckSum($isNew, $price, $side, $account, $refId) : "",
            "language" => "vi",
            "data" => [
                "type" => "string",
                "cmd" => "Web." . $data->cmd . "Order",
                "account" => $account,
                "pin" => "",
                "orderNo" => (string)($data->orderNo ?? ""),
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
        if ($rsp->rc != 1 && $isNotDelete) return false;
        return $rsp->data[0]->orderNo ?? "";
    }

    public function cancelAllConditionOrders()
    {
        $extInfo = "4051301374|Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0";
        $account = $this->formatAccount();
        $payload = [
            "group" => "O",
            "extInfo" => $extInfo,
            "user" => $this->vpsUser,
            "session" => $this->vpsSession,
            "language" => "vi",
            "data" => [
                "cmd" => "co.order.cancel.all",
                "accountNo" => $account,
                "symbol" => "ALL",
            ]
        ];
        $url = "https://smartpro.vps.com.vn/handler/core_ext.vpbs";
        $res = $this->client->post($url, ['json' => $payload]);
        $rsp = json_decode($res->getBody());
        return $rsp->rc == 1;
    }

    public function cancelAllOrders()
    {
        $extInfo = "4051301374|Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0";
        $account = $this->formatAccount();
        $payload = [
            "group" => "FD",
            "extInfo" => $extInfo,
            "user" => $this->vpsUser,
            "session" => $this->vpsSession,
            "c" => "H",
            "data" => [
                "cmd" => "Web.cancelAllOrder",
                "account" => $account,
                "orderType" => "0",
                "pin" => "",
                "symbol" => "ALL",
            ]
        ];
        $url = "https://smartpro.vps.com.vn/handler/core.vpbs";
        $res = $this->client->post($url, ['json' => $payload]);
        $rsp = json_decode($res->getBody());
        return $rsp->rc == 1;
    }

    public function formatAccount()
    {
        return $this->vpsUser . "8";
    }

    public function formatPrice($price)
    {
        return str_replace('.0', '', strval($price));
    }

    public function formatSide($side)
    {
        if ($side < 0) return "S";
        else if ($side > 0) return "B";
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

        return $this->vpsUser . ".H." . $text;
    }

    public function createCheckSum($isNew, $price, $side, $account, $refId)
    {
        $checkSum = $this->vpsSession;
        $checkSum .= $isNew ? $price : "undefined";
        if ($isNew) $checkSum .= $side;
        $checkSum .= ($isNew ? $this->orderVolume * 100 : 0) . "vpbs@456";
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

    private function build_query_string(array $data)
    {
        $query = '';
        foreach ($data as $key => $value) {
            $query .= $key . '=' . $value . '&';
        }
        return rtrim($query, '&');
    }
}
