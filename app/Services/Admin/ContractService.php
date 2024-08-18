<?php

namespace App\Services\Admin;

use App\Services\CoreService;
use App\Models\Contract;
use App\Models\User;
use App\Models\Parameter;
use App\Notifications\PaidContractNotification;
use App\Notifications\WithdrawnContractNotification;
use App\Events\UpdateContractEvent;
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
        $contracts = $payload->isOld == 'true' ? Contract::all() : Contract::where('withdrawn_docs', '[]')->get();
        $users = User::withTrashed()->get(['code', 'name']);
        return [
            'contracts' => $contracts,
            'users' => $users,
            "interestRate" => (float) Parameter::getValue('interestRate', '0.005'),
            "principalMin" => (int) Parameter::getValue('principalMin'),
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
            foreach ($payload->changes as $change) {
                $response = [];
                switch ($change->type) {
                    case 'insert':
                        $data = [
                            "code" => Contract::generateUniqueCode(),
                            "user_code" => $change->data->user_code,
                            "principal" => $change->data->principal,
                            "interest_rate" => $change->data->interest_rate,
                            "paid_at" => $change->data->paid_at,
                        ];
                        if (array_key_exists('advance', $change->data)) {
                            $data["advance"] = $change->data->advance;
                        }
                        if (array_key_exists('withdrawn_at', $change->data)) {
                            $data["withdrawn_at"] = $change->data->withdrawn_at;
                        }
                        $contract = Contract::create($data);
                        $response['isOk'] = !!$contract;
                        break;

                    case 'update':
                        $contract = Contract::where('code', $change->key)->first();
                        if ($contract->status <= 3 || request()->user()->can('admin:control_system')) {
                            $data = [];
                            $isUnconfirmed = false;
                            if ($contract->status <= 1 || request()->user()->can('admin:control_system')) {
                                $isUnconfirmed = true;
                                $oldUserCode = $contract->user_code;
                                $data = array_merge($data, [
                                    "user_code" => $change->data->user_code,
                                    "principal" => $change->data->principal,
                                    "interest_rate" => $change->data->interest_rate,
                                    "paid_at" => $change->data->paid_at,
                                ]);
                            }
                            if (in_array($contract->status, [2, 3]))
                                $data = array_merge($data, [
                                    "advance" => $change->data->advance,
                                    "withdrawn_at" => $change->data->withdrawn_at,
                                ]);
                            //
                            $isOk = $contract->update($data);
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
                        $contract = Contract::where('code', $change->key)->first();
                        if ($contract->status == 1 || request()->user()->can('admin:control_system')) {
                            $isOk = $contract->delete();
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
     * @param $payload
     * 
     */
    public function paidContract($payload)
    {
        return $this->transaction(function () use ($payload) {
            $contract = Contract::find((int) $payload->contractId);
            $user = $contract->user;
            $isFirstConfirm = !$contract->confirmed_by;
            $isConfirmed = $payload->isConfirmed == 'true';
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
                [
                    'paid_docs' => $documents,
                    'confirmed_by' => $isConfirmed ? request()->user()->code : null
                ]
            );
            if ($isOk && $isFirstConfirm && $isConfirmed) {
                $user->notify(new PaidContractNotification($contract));
                event(new UpdateContractEvent());
            }
            return ['isOk' => $isOk, 'doc' => $documents];
        });
    }

    /**
     * Withdrawn Contract
     * 
     * @param $payload
     * 
     */
    public function withdrawnContract($payload)
    {
        return $this->transaction(function () use ($payload) {
            $contract = Contract::find((int) $payload->contractId);
            $user = $contract->user;
            $isFirstWithdrawn = count($contract->withdrawn_docs) == 0;
            $path = 'public/' . md5($user->code) . '/c/';
            $documents = $contract->withdrawn_docs;
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
            $createdImageName = md5(time()) . '.png';
            if ($contract->advance < $contract->total) $documents[] = $createdImageName;

            $isOk = $contract->update(
                ['withdrawn_docs' => $documents]
            );
            if ($isOk && $isFirstWithdrawn) {
                $user->notify(new WithdrawnContractNotification($contract));
                event(new UpdateContractEvent());
                if ($contract->advance < $contract->total) {
                    $data = [
                        "code" => Contract::generateUniqueCode(),
                        "user_code" => $contract->user_code,
                        "principal" => $contract->total - $contract->advance,
                        "interest_rate" => (float) Parameter::getValue('interestRate', '0.005'),
                        "paid_at" => date('Y-m-d'),
                        'paid_docs' => [$createdImageName],
                        'confirmed_by' => request()->user()->code,
                    ];
                    $newContract = Contract::create($data);
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
        return Contract::summary()->map(function ($item) {
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
     * @param $payload
     */
    public function getReceiptInfo($payload)
    {
        $pCode = (int) Parameter::getValue('representUser');
        $ret['representUser'] = User::where('code', $pCode)->first();
        $ret['user'] = User::where('code', (int) $payload->userCode)->first();
        return $ret;
    }
}
