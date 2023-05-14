<?php

namespace App\Services\Admin\Setting;

use App\Services\CoreService;
use App\Repositories\ParameterRepository;


class ParameterService extends CoreService
{
    private $parameterRepository;

    public function __construct(ParameterRepository $parameterRepository)
    {
        $this->parameterRepository = $parameterRepository;
    }

    /**
     * Return all the Parameters.
     * 
     * @param $request
     *
     * @return array
     */
    public function fetch($request)
    {
        return $this->parameterRepository->findAll();
    }

    /**
     * Save Parameter.
     * 
     * @param $request
     * 
     */
    public function save($request)
    {
        return $this->transaction(function () use ($request) {
            $response = [];
            foreach ($request->changes as $change) {
                $response = [];
                if ($change['type'] == 'update') {
                    $data = [
                        "value" => $change['data']['value'],
                    ];
                    $parameter = $this->parameterRepository->findById($change['key']);
                    $response['isOk'] = $this->parameterRepository->update($parameter, $data);
                }
                if (!$response['isOk']) break;
            }
            return $response;
        });
    }
}
