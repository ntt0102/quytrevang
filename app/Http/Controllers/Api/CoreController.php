<?php

namespace App\Http\Controllers\Api;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class CoreController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    protected $passphrase = '19AqVgG36ekVzc1HyEmE9vfA7PH78DFCwhdwUxJ7dns=';
    protected $payload;

    public function __construct()
    {
        set_time_limit(30);
        $this->middleware(function (Request $request, $next) {
            $this->payload = $this->decrypt($request);
            return $next($request);
        });
    }

    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    protected function sendResponse($response = null, $code = 200)
    {
        return response()->json($this->encrypt($response), $code);
    }

    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    protected function sendResponseWithoutEncrypt($response = null, $code = 200)
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

    /**
     * Encrypt value to a cryptojs compatiable json encoding string
     *
     * @param mixed $value
     * @return string
     */
    function encrypt($value)
    {
        $salt = openssl_random_pseudo_bytes(8);
        $salted = '';
        $dx = '';
        while (strlen($salted) < 48) {
            $dx = md5($dx . $this->passphrase . $salt, true);
            $salted .= $dx;
        }
        $key = substr($salted, 0, 32);
        $iv  = substr($salted, 32, 16);
        $encrypted_data = openssl_encrypt(json_encode($value), 'aes-256-cbc', $key, true, $iv);
        return [
            "ct" => base64_encode($encrypted_data),
            "iv" => bin2hex($iv),
            "s" => bin2hex($salt)
        ];
    }

    /**
     * Decrypt data from a CryptoJS json encoding string
     *
     * @param mixed $jsonString
     * @return mixed
     */
    function decrypt($input)
    {
        $salt = hex2bin($input->s);
        $ct = base64_decode($input->ct);
        $iv  = hex2bin($input->iv);
        $concatedPassphrase = $this->passphrase . $salt;
        $md5 = array();
        $md5[0] = md5($concatedPassphrase, true);
        $result = $md5[0];
        for ($i = 1; $i < 3; $i++) {
            $md5[$i] = md5($md5[$i - 1] . $concatedPassphrase, true);
            $result .= $md5[$i];
        }
        $key = substr($result, 0, 32);
        $data = openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);
        return json_decode($data, false);
    }
}
