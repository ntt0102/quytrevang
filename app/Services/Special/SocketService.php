<?php

namespace App\Services\Special;

use App\Services\CoreService;
use Ratchet\Client\Connector;
use App\Jobs\ExportStockJob;
use App\Jobs\ExportDerivativeJob;

class SocketService extends CoreService
{

    const ENPOINT = 'wss://tradestation.fireant.vn/quote?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxODg5NjIyNTMwLCJuYmYiOjE1ODk2MjI1MzAsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsiYWNhZGVteS1yZWFkIiwiYWNhZGVteS13cml0ZSIsImFjY291bnRzLXJlYWQiLCJhY2NvdW50cy13cml0ZSIsImJsb2ctcmVhZCIsImNvbXBhbmllcy1yZWFkIiwiZmluYW5jZS1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImludmVzdG9wZWRpYS1yZWFkIiwib3JkZXJzLXJlYWQiLCJvcmRlcnMtd3JpdGUiLCJwb3N0cy1yZWFkIiwicG9zdHMtd3JpdGUiLCJzZWFyY2giLCJzeW1ib2xzLXJlYWQiLCJ1c2VyLWRhdGEtcmVhZCIsInVzZXItZGF0YS13cml0ZSIsInVzZXJzLXJlYWQiXSwianRpIjoiMjYxYTZhYWQ2MTQ5Njk1ZmJiYzcwODM5MjM0Njc1NWQifQ.dA5-HVzWv-BRfEiAd24uNBiBxASO-PAyWeWESovZm_hj4aXMAZA1-bWNZeXt88dqogo18AwpDQ-h6gefLPdZSFrG5umC1dVWaeYvUnGm62g4XS29fj6p01dhKNNqrsu5KrhnhdnKYVv9VdmbmqDfWR8wDgglk5cJFqalzq6dJWJInFQEPmUs9BW_Zs8tQDn-i5r4tYq2U8vCdqptXoM7YgPllXaPVDeccC9QNu2Xlp9WUvoROzoQXg25lFub1IYkTrM66gJ6t9fJRZToewCt495WNEOQFa_rwLCZ1QwzvL0iYkONHS_jZ0BOhBCdW9dWSawD6iF1SIQaFROvMDH1rg';

    public function __construct()
    {
    }

    public function connectSocket()
    {
        $connector = new Connector();
        $connector(self::ENPOINT)->then(function ($ws) {
            echo "Connected to WebSocket server.\n";
            $msg = '{"protocol":"json","version":1}';
            $ws->send($msg);
            $msg = '{"arguments":["VN30F1M"],"invocationId":"0","target":"SubscribeTrades","type":1}';
            $ws->send($msg);

            $ws->on('message', function ($msg) use ($ws) {
                echo "Received message: \n";
                $data = $this->getSocketData($msg);
                if (!isset($data)) return false;
                if ($data->type == 1 && $data->target == 'UpdateLastPrices' && count($data->arguments[0]) > 2000) {
                    ExportStockJob::dispatch(json_encode($data->arguments[0]));
                } else if ($data->type == 3) {
                    $ws->close();
                    ExportDerivativeJob::dispatch(json_encode($data->result));
                }
            });

            $ws->on('error', function ($e) {
                echo "Error: {$e->getMessage()}\n";
            });
            $ws->on('close', function ($e) {
                echo "Close socket.\n";
            });
        }, function ($e) {
            echo "Could not connect: {$e->getMessage()}\n";
        });
    }

    private function getSocketData($msg)
    {
        $startPos = strpos($msg, '{');
        $endPos = strrpos($msg, '}');

        if (
            $startPos !== false && $endPos !== false && $endPos > $startPos
        ) {
            $filteredData = substr($msg, $startPos, ($endPos - $startPos + 1));
            if ($filteredData === '{}') return null;
            return json_decode($filteredData);
        }
        return null;
    }
}
