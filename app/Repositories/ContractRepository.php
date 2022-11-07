<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\Contract;

class ContractRepository extends CoreRepository
{
    /**
     * @var Contract
     */
    protected $model;

    /**
     * ContractRepository constructor.
     *
     * @param Contract $model
     */
    public function __construct(Contract $model)
    {
        parent::__construct($model);
    }

    /**
     * @inheritdoc
     */
    public function findByCode($code)
    {
        return $this->model->where('code', $code)->first();
    }

    /**
     * @inheritdoc
     */
    public function getConfirmingNumber()
    {
        return count($this->model->where([['paid_at', '<>', null], ['paid_docs', '[]']])->orWhere([['withdrawn_at', '<>', null], ['withdrawn_docs', '[]']])->get());
    }

    /**
     * @inheritdoc
     */
    public function summary()
    {
        $contracts = $this->model->whereNotNull('confirmed_by')->where('withdrawn_docs', '[]')
            ->groupBy('user_code')
            ->selectRaw('sum(principal) as sum, user_code')->get();
        return $contracts;
    }

    /**
     * @inheritdoc
     */
    public function generateUniqueCode()
    {
        do {
            $code = random_int(10000000, 99999999);
        } while (Contract::where('code', $code)->first());

        return $code;
    }
}
