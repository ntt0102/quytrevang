<?php

namespace App\Services\Setting;

use App\Services\CoreService;
use Spatie\Activitylog\Models\Activity;

class LogService extends CoreService
{

    /**
     * Get the logs.
     * 
     * @param $payload
     * 
     */
    public function fetch($payload)
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
