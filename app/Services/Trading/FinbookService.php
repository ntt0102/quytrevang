<?php

namespace App\Services\Trading;

use App\Services\CoreService;
use App\Models\Finbook;
use App\Events\UpdateFinbookEvent;

class FinbookService extends CoreService
{

    /**
     * Return all the Finbooks
     * 
     * @param $payload
     *
     * @return array
     */
    public function fetch($payload)
    {
        $finbooks = Finbook::orderBy('display', 'asc')->get();
        return $finbooks;
    }

    /**
     * Save
     * 
     * @param $payload
     * 
     */
    public function save($payload)
    {
        return $this->transaction(function () use ($payload) {
            foreach ($payload->changes as $change) {
                $response = [];
                switch ($change['type']) {
                    case 'insert':
                        $data = [
                            "display" => $change['data']['display'],
                            "name" => $change['data']['name'],
                            "balance" => $change['data']['balance'],
                            "last_transaction" => $change['data']['last_transaction']
                        ];
                        $finbook = Finbook::create($data);
                        $isOk = !!$finbook;
                        if ($isOk && $finbook->balance > 0) event(new UpdateFinbookEvent());
                        $response['isOk'] = $isOk;
                        break;

                    case 'update':
                        $finbook = Finbook::find($change['key']);
                        $data = [
                            "display" => $change['data']['display'],
                            "name" => $change['data']['name'],
                            "balance" => $change['data']['balance'],
                            "last_transaction" => $change['data']['last_transaction']
                        ];
                        $hasChangedBalance = $data["balance"] != $finbook->balance;
                        $isOk = $finbook->update($data);
                        if ($isOk && $hasChangedBalance) event(new UpdateFinbookEvent());
                        $response['isOk'] = $isOk;
                        break;

                    case 'remove':
                        $finbook = Finbook::find($change['key']);
                        $isOk = $finbook->delete();
                        $response['isOk'] = $isOk;
                        break;
                }
                if (!$response['isOk']) break;
            }
            return $response;
        });
    }

    /**
     * Get Finbooks Name
     * 
     * @param $payload
     *
     * @return array
     */
    public function getFinbooksName($payload)
    {
        $finbooks = Finbook::select('id', 'name')->orderBy('display', 'asc')->get();
        return $finbooks;
    }

    /**
     * Update Balance
     * 
     * @param $payload
     * 
     */
    public function updateBalance($payload)
    {
        return $this->transaction(function () use ($payload) {
            $finbook = Finbook::find($payload->id);
            $lastTransaction = $payload->input($payload->type)['content'];
            switch ($payload->type) {
                case 'deposit':
                    $balance = $finbook->balance + $payload->deposit['money'];
                    break;
                case 'withdraw':
                    $balance = $finbook->balance - $payload->withdraw['money'];
                    break;
                case 'transfer':
                    $balance = $finbook->balance - $payload->transfer['money'];
                    $reciever = Finbook::find($payload->transfer['receiverId']);
                    $reciever->update([
                        'balance' => $reciever->balance + $payload->transfer['money'],
                        'last_transaction' => '[' . $finbook->name . ' =>] ' . $lastTransaction
                    ]);
                    $lastTransaction = '[=> ' . $reciever->name . '] ' . $lastTransaction;
                    break;
                case 'adjustment':
                    $balance = $payload->adjustment['money'];
                    break;
            }
            $isOk = $finbook->update([
                'balance' => $balance,
                'last_transaction' => $lastTransaction
            ]);
            if ($isOk) event(new UpdateFinbookEvent());
            return ['isOk' => $isOk];
        });
    }
}
