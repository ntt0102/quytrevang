<?php

namespace App\Services\Admin;

use App\Services\CoreService;
use App\Models\User;
use App\Models\Copyist;
use Illuminate\Support\Facades\Storage;

class CopyistService extends CoreService
{

    /**
     * Return all the Methods.
     * 
     * @param $payload
     *
     * @return array
     */
    public function fetch($payload)
    {
        $copyists = Copyist::all();
        $users = User::withTrashed()->get(['code', 'name']);
        return [
            'copyists' => $copyists,
            'users' => $users,
        ];
    }

    /**
     * Validate Duplicate User
     * 
     * @param $payload
     */
    public function validateUser($payload)
    {
        return Copyist::where('user_code', $payload->userCode)->count() == 0;
    }

    /**
     * Save
     * 
     * @param $payload
     * 
     */
    public function save($payload)
    {
        return $this->transaction(function () use ($payload) {
            foreach ($payload->changes as $change) {
                switch ($change->type) {
                    case 'insert':
                        unset($change->data->id);
                        $response['isOk'] = !!Copyist::create((array)$change->data);
                        break;

                    case 'update':
                        $copyist = Copyist::find($change->key);
                        $response['isOk'] = $copyist->update((array)$change->data);
                        break;

                    case 'remove':
                        $copyist = Copyist::find($change->key);
                        $response['isOk'] = $copyist->delete();
                        break;
                }
                if (!$response['isOk']) break;
            }
            return $response;
        });
    }
}
