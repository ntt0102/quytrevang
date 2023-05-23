<?php

namespace App\Services\Setting;

use App\Services\CoreService;
use App\Models\Parameter;


class ParameterService extends CoreService
{

    /**
     * Return all the Parameters.
     * 
     * @param $request
     *
     * @return array
     */
    public function fetch($request)
    {
        return Parameter::all();
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
                    $parameter = Parameter::find($change['key']);
                    $response['isOk'] = $parameter->update($data);
                }
                if (!$response['isOk']) break;
            }
            return $response;
        });
    }
}
