<?php

namespace App\Services\Setting;

use App\Services\CoreService;
use App\Repositories\UserRepository;
use Spatie\Activitylog\Models\Activity;

class LogService extends CoreService
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    /**
     * Get the logs.
     * 
     * @param $request
     * 
     */
    public function fetch($request)
    {
        $activities = Activity::all();
        return $activities->map(function ($activity) {
            $ret['id'] = $activity->id;
            $ret['causer'] = $activity->causer_id;
            $ret['subject'] = explode("\\", $activity->subject_type)[2] . '::' . $activity->subject_id;
            $ret['description'] = $activity->description;
            $ret['properties'] = $activity->properties;
            $ret['created_at'] = $activity->created_at;
            return $ret;
        });
    }
}
