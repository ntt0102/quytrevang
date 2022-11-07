<?php

namespace App\Services\Admin;

use App\Services\CoreService;
use App\Repositories\ContractRepository;
use App\Repositories\UserRepository;
use App\Repositories\ParameterRepository;
use App\Notifications\PaidContractNotification;
use App\Notifications\WithdrawnContractNotification;
use App\Events\AdminBroadcastEvent;
use Illuminate\Support\Facades\Storage;


class ContractService extends CoreService
{
    private $contractRepository;
    private $userRepository;
    private $parameterRepository;

    public function __construct(
        ContractRepository $contractRepository,
        UserRepository $userRepository,
        ParameterRepository $parameterRepository
    ) {
        $this->contractRepository = $contractRepository;
        $this->userRepository = $userRepository;
        $this->parameterRepository = $parameterRepository;
    }

    /**
     * Return all the Contracts.
     * 
     * @param $request
     *
     * @return array
     */
    public function fetch($request)
    {
        $conditions = [];
        if (!($request->isOld == 'true')) $conditions[] = ['withdrawn_docs', '[]'];
        $contracts = $this->contractRepository->where($conditions, ['*']);
        $users = $this->userRepository->findAllWithTrashed(['code', 'name']);
        return [
            'contracts' => $contracts,
            'users' => $users,
            "interestRate" => (float) $this->parameterRepository->getValue('interestRate', '0.005'),
            "principalMin" => (int) $this->parameterRepository->getValue('principalMin'),
        ];
    }

    /**
     * Save Contract.
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
                            "code" => $this->contractRepository->generateUniqueCode(),
                            "user_code" => $change['data']['user_code'],
                            "principal" => $change['data']['principal'],
                            "interest_rate" => $change['data']['interest_rate'],
                            "paid_at" => $change['data']['paid_at'],
                        ];
                        if (array_key_exists('advance', $change['data'])) {
                            $data["advance"] = $change['data']['advance'];
                        }
                        if (array_key_exists('withdrawn_at', $change['data'])) {
                            $data["withdrawn_at"] = $change['data']['withdrawn_at'];
                        }
                        $contract = $this->contractRepository->create($data);
                        $response['isOk'] = !!$contract;
                        break;

                    case 'update':
                        $contract = $this->contractRepository->findById($change['key']);
                        if ($contract->status <= 3 || $request->user()->can('system@control')) {
                            $data = [];
                            $isUnconfirmed = false;
                            if ($contract->status <= 1 || $request->user()->can('system@control')) {
                                $isUnconfirmed = true;
                                $oldUserCode = $contract->user_code;
                                $data = array_merge($data, [
                                    "user_code" => $change['data']['user_code'],
                                    "principal" => $change['data']['principal'],
                                    "interest_rate" => $change['data']['interest_rate'],
                                    "paid_at" => $change['data']['paid_at'],
                                ]);
                            }
                            if (in_array($contract->status, [2, 3]))
                                $data = array_merge($data, [
                                    "advance" => $change['data']['advance'],
                                    "withdrawn_at" => $change['data']['withdrawn_at'],
                                ]);
                            //
                            $isOk = $this->contractRepository->update($contract, $data);
                            if ($isOk && $isUnconfirmed && $oldUserCode != $data['user_code']) {
                                $fromPath = 'public/' . md5($oldUserCode) . '/c/';
                                $toPath = 'public/' . md5($data['user_code']) . '/c/';
                                if (!!$contract->paid_docs) {
                                    foreach ($contract->paid_docs as $image) {
                                        if (Storage::exists($fromPath . $image))
                                            Storage::move($fromPath . $image, $toPath . $image);
                                    }
                                }
                                if (!!$contract->withdrawn_docs) {
                                    foreach ($contract->withdrawn_docs as $image) {
                                        if (Storage::exists($fromPath . $image))
                                            Storage::move($fromPath . $image, $toPath . $image);
                                    }
                                }
                            }
                            $response['isOk'] = $isOk;
                        } else $response = ['isOk' => false, 'message' => 'forbidden'];
                        break;

                    case 'remove':
                        $contract = $this->contractRepository->findById($change['key']);
                        if ($contract->status == 1 || $request->user()->can('system@control')) {
                            $isOk = $this->contractRepository->delete($contract);
                            if ($isOk) {
                                $path = 'public/' . md5($contract->user_code) . '/c/';
                                if (!!$contract->paid_docs) {
                                    foreach ($contract->paid_docs as $image) {
                                        if (Storage::exists($path . $image)) Storage::delete($path . $image);
                                    }
                                }
                                if (!!$contract->withdrawn_docs) {
                                    foreach ($contract->withdrawn_docs as $image) {
                                        if (Storage::exists($path . $image)) Storage::delete($path . $image);
                                    }
                                }
                            }
                            $response['isOk'] = $isOk;
                        } else $response = ['isOk' => false, 'message' => 'forbidden'];
                        break;
                }
                if (!$response['isOk']) break;
            }
            return $response;
        });
    }

    /**
     * Paid Contract.
     * 
     * @param $request
     * 
     */
    public function paidContract($request)
    {
        return $this->transaction(function () use ($request) {
            $contract = $this->contractRepository->findById((int) $request->contractId);
            $user = $contract->user;
            $isFirstConfirm = !$contract->confirmed_by;
            $isConfirmed = $request->isConfirmed == 'true';
            $path = 'public/' . md5($user->code) . '/c/';
            $documents = $contract->paid_docs;
            if ($request->isDelete == 'true') {
                foreach ($documents as $image) {
                    if (Storage::exists($path . $image)) Storage::delete($path . $image);
                    $documents = [];
                }
            }
            if ($request->hasfile('receiptImages')) {
                foreach ($request->file('receiptImages') as $index => $file) {
                    $name = md5(time() . $index) . '.png';
                    $file->storeAs($path, $name);
                    $documents[] = $name;
                }
            }
            $isOk = $this->contractRepository->update(
                $contract,
                [
                    'paid_docs' => $documents,
                    'confirmed_by' => $isConfirmed ? $request->user()->code : null
                ]
            );
            if ($isOk && $isFirstConfirm && $isConfirmed) {
                $user->notify(new PaidContractNotification($contract));
                event(new AdminBroadcastEvent('contracts'));
            }
            return ['isOk' => $isOk, 'doc' => $documents];
        });
    }

    /**
     * Withdrawn Contract
     * 
     * @param $request
     * 
     */
    public function withdrawnContract($request)
    {
        return $this->transaction(function () use ($request) {
            $contract = $this->contractRepository->findById((int) $request->contractId);
            $user = $contract->user;
            $isFirstWithdrawn = count($contract->withdrawn_docs) == 0;
            $path = 'public/' . md5($user->code) . '/c/';
            $documents = $contract->withdrawn_docs;
            if ($request->isDelete == 'true') {
                foreach ($documents as $image) {
                    if (Storage::exists($path . $image)) Storage::delete($path . $image);
                    $documents = [];
                }
            }
            if ($request->hasfile('receiptImages')) {
                foreach ($request->file('receiptImages') as $index => $file) {
                    $name = md5(time() . $index) . '.png';
                    $file->storeAs($path, $name);
                    $documents[] = $name;
                }
            }
            $createdImageName = md5(time()) . '.png';
            if ($contract->advance < $contract->total) $documents[] = $createdImageName;

            $isOk = $this->contractRepository->update(
                $contract,
                ['withdrawn_docs' => $documents]
            );
            if ($isOk && $isFirstWithdrawn) {
                $user->notify(new WithdrawnContractNotification($contract));
                event(new AdminBroadcastEvent('contracts'));
                if ($contract->advance < $contract->total) {
                    $data = [
                        "code" => $this->contractRepository->generateUniqueCode(),
                        "user_code" => $contract->user_code,
                        "principal" => $contract->total - $contract->advance,
                        "interest_rate" => (float) $this->parameterRepository->getValue('interestRate', '0.005'),
                        "paid_at" => date('Y-m-d'),
                        'paid_docs' => [$createdImageName],
                        'confirmed_by' => $request->user()->code,
                    ];
                    $newContract = $this->contractRepository->create($data);
                    if (!!$newContract) {
                        $img = create_contract_image($user->name, $user->code, $newContract->principal, $contract->code, $newContract->code);
                        $img->save(storage_path('app/' . $path . $createdImageName));
                    }
                }
            }
            return ['isOk' => $isOk];
        });
    }

    /**
     * Get summary.
     * 
     * @return Collection
     */
    public function summary()
    {
        return $this->contractRepository->summary()->map(function ($item) {
            return [
                'code' => $item->user->code,
                'name' => $item->user->name,
                'principal' => $item->sum
            ];
        });
    }

    /**
     * get receipt info
     * 
     * @param $request
     */
    public function getReceiptInfo($request)
    {
        $pCode = (int) $this->parameterRepository->getValue('representUser');
        $ret['representUser'] = $this->userRepository->findByCode($pCode);
        $ret['user'] = $this->userRepository->findByCode((int) $request->userCode);
        return $ret;
    }
}
