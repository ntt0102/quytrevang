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
     * @param $request
     *
     * @return array
     */
    public function fetch($request)
    {
        $finbooks = Finbook::orderBy('display', 'asc')->get();
        return $finbooks;
    }

    /**
     * Save
     * 
     * @param $request
     * 
     */
    public function save($request)
    {
        return $this->transaction(function () use ($request) {
            foreach ($request->changes as $change) {
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
     * @param $request
     *
     * @return array
     */
    public function getFinbooksName($request)
    {
        $finbooks = Finbook::select('id', 'name')->orderBy('display', 'asc')->get();
        return $finbooks;
    }

    /**
     * Update Balance
     * 
     * @param $request
     * 
     */
    public function updateBalance($request)
    {
        return $this->transaction(function () use ($request) {
            $finbook = Finbook::find($request->id);
            $lastTransaction = $request->input($request->type)['content'];
            switch ($request->type) {
                case 'deposit':
                    $balance = $finbook->balance + $request->deposit['money'];
                    break;
                case 'withdraw':
                    $balance = $finbook->balance - $request->withdraw['money'];
                    break;
                case 'transfer':
                    $balance = $finbook->balance - $request->transfer['money'];
                    $reciever = Finbook::find($request->transfer['receiverId']);
                    $reciever->update([
                        'balance' => $reciever->balance + $request->transfer['money'],
                        'last_transaction' => '[' . $finbook->name . ' =>] ' . $lastTransaction
                    ]);
                    $lastTransaction = '[=> ' . $reciever->name . '] ' . $lastTransaction;
                    break;
                case 'adjustment':
                    $balance = $request->adjustment['money'];
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
