<?php

namespace App\Services\Setting;

use App\Services\CoreService;
use App\Models\Parameter;


class ParameterService extends CoreService
{

    /**
     * Return all the Parameters.
     * 
     * @param $payload
     *
     * @return array
     */
    public function fetch($payload)
    {
        return Parameter::all();
    }

    /**
     * Save Parameter.
     * 
     * @param $payload
     * 
     */
    public function save($payload)
    {
        return $this->transaction(function () use ($payload) {
            $response = [];
            foreach ($payload->changes as $change) {
                $response = [];
                if ($change->type == 'update') {
                    $data = [
                        "value" => $change->data->value,
                    ];
                    $parameter = Parameter::find($change->key);
                    $response['isOk'] = $parameter->update($data);
                }
                if (!$response['isOk']) break;
            }
            return $response;
        });
    }
}
