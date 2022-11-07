<?php

namespace App\Http\Controllers\Api;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CoreController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct($permission)
    {
        set_time_limit(30);
    }

    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    protected function sendResponse($response = null, $code = 200)
    {
        return response()->json($response, $code);
    }

    /**
     * image response method.
     *
     * @return \Illuminate\Http\Response
     */
    protected function sendImage($pathToFile)
    {
        return response()->file($pathToFile);
    }

    /**
     * download response method.
     *
     * @return \Illuminate\Http\Response
     */
    protected function sendDownload($data)
    {
        return response()->download($data['file'], $data['filename'], $data['headers']);
    }


    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */
    protected function sendError($message = null, $code = 404)
    {
        return response()->json(['message' => $message], $code);
    }
}
