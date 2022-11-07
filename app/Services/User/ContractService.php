<?php

namespace App\Services\User;

use App\Services\CoreService;
use Illuminate\Support\Facades\Notification;
use App\Notifications\CreatedContractNotification;
use App\Notifications\PayingContractNotification;
use App\Notifications\WithdrawingContractNotification;
use App\Repositories\ContractRepository;
use App\Repositories\ParameterRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Storage;


class ContractService extends CoreService
{
    private $contractRepository;
    private $parameterRepository;
    private $userRepository;

    public function __construct(
        ContractRepository $contractRepository,
        ParameterRepository $parameterRepository,
        UserRepository $userRepository
    ) {
        $this->contractRepository = $contractRepository;
        $this->parameterRepository = $parameterRepository;
        $this->userRepository = $userRepository;
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
        $search = [['user_code', $request->user()->code]];
        if (!($request->isOld == 'true')) $search[] = ['withdrawn_docs', '[]'];
        $contracts = $this->contractRepository->where($search, ['*']);
        $pCode = (int) $this->parameterRepository->getValue('representUser');
        $representUser = $this->userRepository->findByCode($pCode);
        return [
            'contracts' => $contracts,
            "interestRate" => (float) $this->parameterRepository->getValue('interestRate'),
            "principalMin" => (int) $this->parameterRepository->getValue('principalMin'),
            "holdWeeksMin" => (int) $this->parameterRepository->getValue('holdWeeksMin'),
            "transferInfo" => $representUser->bank_account,
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
            $userCode = $request->user()->code;
            foreach ($request->changes as $change) {
                $response = [];
                switch ($change['type']) {
                    case 'insert':
                        $data = [
                            "code" => $this->contractRepository->generateUniqueCode(),
                            "user_code" => $userCode,
                            "principal" => $change['data']['principal'],
                            "interest_rate" => $this->parameterRepository->getValue('interestRate', '0.005'),
                            "paid_at" => date('Y-m-d'),
                        ];
                        $contract = $this->contractRepository->create($data);
                        Notification::send(
                            $this->userRepository->getUsersHasPermission('contracts@control'),
                            new CreatedContractNotification($contract)
                        );
                        $response['isOk'] = !!$contract;
                        $response['contract'] = $contract;
                        break;

                    case 'update':
                        $contract = $this->contractRepository->findById($change['key']);
                        if ($contract->user_code == $userCode || $contract->status == 1) {
                            $data = ["principal" => $change['data']['principal']];
                            $response['isOk'] =  $this->contractRepository->update($contract, $data);
                        } else $response = ['isOk' => false, 'message' => 'forbidden'];
                        break;

                    case 'remove':
                        $contract = $this->contractRepository->findById($change['key']);
                        if ($contract->user_code == $userCode || $contract->status == 1) {
                            $response['isOk'] = $this->contractRepository->delete($contract);
                        } else $response = ['isOk' => false, 'message' => 'forbidden'];
                        break;
                }
                if (!$response['isOk']) break;
                else $response['type'] = $change['type'];
            }
            return $response;
        });
    }

    /**
     * Paying Contract
     * 
     * @param $request
     * 
     */
    public function payingContract($request)
    {
        return $this->transaction(function () use ($request) {
            $contract = $this->contractRepository->findById((int) $request->contractId);
            $user = $contract->user;
            $isFirstPaid = count($contract->paid_docs) == 0;
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
                ['paid_docs' => $documents, 'paid_at' => date('Y-m-d')]
            );
            if ($isOk && $isFirstPaid)
                Notification::send(
                    $this->userRepository->getUsersHasPermission('contracts@control'),
                    new PayingContractNotification($contract)
                );
            return ['isOk' => $isOk];
        });
    }

    /**
     * Withdrawing Contract
     * 
     * @param $request
     * 
     */
    public function withdrawingContract($request)
    {
        return $this->transaction(function () use ($request) {
            $userCode = $request->user()->code;
            $contract = $this->contractRepository->findById($request->id);
            if ($contract->user_code == $userCode) {
                $data['advance'] = $request->advance;
                $data['withdrawn_at'] = $request->advance == 0 ? null : date('Y-m-d');
                $isOk =  $this->contractRepository->update($contract, $data);
                if ($isOk)
                    Notification::send(
                        $this->userRepository->getUsersHasPermission('contracts@control'),
                        new WithdrawingContractNotification($contract)
                    );
                return ['isOk' => $isOk];
            } else return  ['isOk' => false, 'message' => 'forbidden'];
        });
    }
}
