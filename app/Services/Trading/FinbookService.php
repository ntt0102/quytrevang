<?php

namespace App\Services\Trading;

use App\Services\CoreService;
use App\Repositories\FinbookRepository;
use App\Events\UpdateFinbookEvent;

class FinbookService extends CoreService
{
    private $finbookRepository;

    public function __construct(
        FinbookRepository $finbookRepository
    ) {
        $this->finbookRepository = $finbookRepository;
    }

    /**
     * Return all the Finbooks
     * 
     * @param $request
     *
     * @return array
     */
    public function fetch($request)
    {
        $finbooks = $this->finbookRepository->findAll(['*'], ['display', 'asc']);
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
                        $finbook = $this->finbookRepository->create($data);
                        $isOk = !!$finbook;
                        if ($isOk && $finbook->balance > 0) event(new UpdateFinbookEvent());
                        $response['isOk'] = $isOk;
                        break;

                    case 'update':
                        $finbook = $this->finbookRepository->findById($change['key']);
                        $data = [
                            "display" => $change['data']['display'],
                            "name" => $change['data']['name'],
                            "balance" => $change['data']['balance'],
                            "last_transaction" => $change['data']['last_transaction']
                        ];
                        $hasChangedBalance = $data["balance"] != $finbook->balance;
                        $isOk = $this->finbookRepository->update($finbook, $data);
                        if ($isOk && $hasChangedBalance) event(new UpdateFinbookEvent());
                        $response['isOk'] = $isOk;
                        break;

                    case 'remove':
                        $finbook = $this->finbookRepository->findById($change['key']);
                        $isOk = $this->finbookRepository->delete($finbook);
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
        $finbooks = $this->finbookRepository->findAll(['id', 'name'], ['display', 'asc']);
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
            $finbook = $this->finbookRepository->findById($request->id);
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
                    $reciever = $this->finbookRepository->findById($request->transfer['receiverId']);
                    $this->finbookRepository->update($reciever, [
                        'balance' => $reciever->balance + $request->transfer['money'],
                        'last_transaction' => '[' . $finbook->name . ' =>] ' . $lastTransaction
                    ]);
                    $lastTransaction = '[=> ' . $reciever->name . '] ' . $lastTransaction;
                    break;
                case 'adjustment':
                    $balance = $request->adjustment['money'];
                    break;
            }
            $isOk = $this->finbookRepository->update($finbook, [
                'balance' => $balance,
                'last_transaction' => $lastTransaction
            ]);
            if ($isOk) event(new UpdateFinbookEvent());
            return ['isOk' => $isOk];
        });
    }
}
