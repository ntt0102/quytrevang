<?php

namespace App\Services\User;

use App\Services\CoreService;
use Illuminate\Support\Facades\Notification;
use App\Notifications\CreatedContractNotification;
use App\Notifications\PayingContractNotification;
use App\Notifications\WithdrawingContractNotification;
use App\Models\Contract;
use App\Models\Parameter;
use App\Models\User;
use Illuminate\Support\Facades\Storage;


class ContractService extends CoreService
{

    /**
     * Return all the Contracts.
     * 
     * @param $payload
     *
     * @return array
     */
    public function fetch($payload)
    {
        $query = Contract::where('user_code', request()->user()->code);
        if (!($payload->isOld == 'true')) $query = $query->where('withdrawn_docs', '[]');
        $contracts = $query->get();
        $pCode = (int) Parameter::getValue('representUser');
        $representUser = User::where('code', $pCode)->first();
        return [
            'contracts' => $contracts,
            "interestRate" => (float) Parameter::getValue('interestRate'),
            "principalMin" => (int) Parameter::getValue('principalMin'),
            "holdWeeksMin" => (int) Parameter::getValue('holdWeeksMin'),
            "transferInfo" => $representUser->bank_account,
        ];
    }

    /**
     * Save Contract.
     * 
     * @param $payload
     * 
     */
    public function save($payload)
    {
        return $this->transaction(function () use ($payload) {
            $userCode = request()->user()->code;
            foreach ($payload->changes as $change) {
                $response = [];
                switch ($change->type) {
                    case 'insert':
                        $data = [
                            "code" => Contract::generateUniqueCode(),
                            "user_code" => $userCode,
                            "principal" => $change->data->principal,
                            "interest_rate" => Parameter::getValue('interestRate', '0.005'),
                            "paid_at" => date('Y-m-d'),
                        ];
                        $contract = Contract::create($data);
                        Notification::send(
                            User::permission('contracts@control')->get(),
                            new CreatedContractNotification($contract)
                        );
                        $response['isOk'] = !!$contract;
                        $response['contract'] = $contract;
                        break;

                    case 'update':
                        $contract = Contract::where('code', $change->key)->first();
                        if ($contract->user_code == $userCode || $contract->status == 1) {
                            $data = ["principal" => $change->data->principal];
                            $response['isOk'] =  $contract->update($data);
                        } else $response = ['isOk' => false, 'message' => 'forbidden'];
                        break;

                    case 'remove':
                        $contract = Contract::where('code', $change->key)->first();
                        if ($contract->user_code == $userCode || $contract->status == 1) {
                            $response['isOk'] = $contract->delete();
                        } else $response = ['isOk' => false, 'message' => 'forbidden'];
                        break;
                }
                if (!$response['isOk']) break;
                else $response['type'] = $change->type;
            }
            return $response;
        });
    }

    /**
     * Paying Contract
     * 
     * @param $payload
     * 
     */
    public function payingContract($payload)
    {
        return $this->transaction(function () use ($payload) {
            $contract = Contract::find((int) $payload->contractId);
            $user = $contract->user;
            $isFirstPaid = count($contract->paid_docs) == 0;
            $path = 'public/' . md5($user->code) . '/c/';
            $documents = $contract->paid_docs;
            if ($payload->isDelete == 'true') {
                foreach ($documents as $image) {
                    if (Storage::exists($path . $image)) Storage::delete($path . $image);
                    $documents = [];
                }
            }
            if ($payload->hasfile('receiptImages')) {
                foreach ($payload->file('receiptImages') as $index => $file) {
                    $name = md5(time() . $index) . '.png';
                    $file->storeAs($path, $name);
                    $documents[] = $name;
                }
            }
            $isOk = $contract->update(
                ['paid_docs' => $documents, 'paid_at' => date('Y-m-d')]
            );
            if ($isOk && $isFirstPaid)
                Notification::send(
                    User::permission('contracts@control')->get(),
                    new PayingContractNotification($contract)
                );
            return ['isOk' => $isOk];
        });
    }

    /**
     * Withdrawing Contract
     * 
     * @param $payload
     * 
     */
    public function withdrawingContract($payload)
    {
        return $this->transaction(function () use ($payload) {
            $userCode = request()->user()->code;
            $contract = Contract::find($payload->id);
            if ($contract->user_code == $userCode) {
                $data['advance'] = $payload->advance;
                $data['withdrawn_at'] = $payload->advance == 0 ? null : date('Y-m-d');
                $isOk = $contract->update($data);
                if ($isOk)
                    Notification::send(
                        User::permission('contracts@control')->get(),
                        new WithdrawingContractNotification($contract)
                    );
                return ['isOk' => $isOk];
            } else return  ['isOk' => false, 'message' => 'forbidden'];
        });
    }
}
