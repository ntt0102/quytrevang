<?php

namespace App\Services\Admin\Setting;

use App\Services\CoreService;
use Illuminate\Support\Facades\File;


class CommandService extends CoreService
{

    /**
     * Run Command.
     * 
     * @param $request
     * 
     */
    public function run($request)
    {
        $output = array();
        foreach (explode(",", $request->commands) as $command) {
            $command = trim($command);
            if (!!$command) {
                if ($command == 'storage:link') {
                    $path = public_path('storage');
                    if (File::exists($path)) {
                        if (realpath($path) == $path)
                            File::deleteDirectory($path);
                    }
                }
                exec('php ../artisan ' . $command, $output, $return);
                if ($return != 0) return ['isOk' => false];
            }
        }
        return ['isOk' => true];
    }
}
