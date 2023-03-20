<?php

use App\Repositories\VariableRepository;

if (!function_exists('get_global_value')) {
    /**
     * Get the global value.
     *
     * @param string $name
     * @return \App\Models\Parameter
     */
    function get_global_value($name)
    {
        return app(VariableRepository::class)->getValue($name);
    }
}

if (!function_exists('set_global_value')) {
    /**
     * Set the global value.
     *
     * @param string $name
     * @param string $value
     */
    function set_global_value($name, $value)
    {
        return app(VariableRepository::class)->setValue($name, $value);
    }
}

if (!function_exists('trading_time')) {
    /**
     * Get start trading time.
     *
     * @return string
     */
    function trading_time($time, $onlyMin = false)
    {
        $str = app(\App\Repositories\ParameterRepository::class)->getValue($time);
        if ($onlyMin) return substr($str, 0, 5);
        else return $str;
    }
}

if (!function_exists('get_url_image')) {
    /**
     * Get url image
     *
     * @param string $url
     * @param string $replace
     * @return string
     */
    function get_url_image($url, $replace = 'images/no-image.png')
    {
        if (str_contains($url, 'http') && getimagesize($url)) return $url;
        else if (is_file(public_path($url))) return $url;
        return $replace;
    }
}

if (!function_exists('create_contract_image')) {
    /**
     * Create contract image
     *
     * @param string $userName
     * @param int $userCode
     * @param int $amount
     * @param int $fromeContract
     * @param int $toContract
     * @return \Image
     */
    function create_contract_image($userName, $userCode, $amount, $fromeContract, $toContract)
    {
        $fontPath = public_path('fonts/vendor/devextreme/dist/css/Roboto-700.ttf');
        $img = \Image::canvas(500, 500, '#FFFFFF');

        $img->insert(public_path('images/badge-128x128.png'), 'top-left', 10, 10);
        $img->text(config('app.name'), 150, 100, function ($font) use ($fontPath) {
            $font->file($fontPath);
            $font->size(50);
        });
        $img->text(trans('custom.contractImage.transactionTime', ['time' => date("d/m/Y H:i:s")]), 20, 200, function ($font) use ($fontPath) {
            $font->file($fontPath);
            $font->size(22);
        });
        $img->text(trans('custom.contractImage.user', ['name' => $userName, 'code' => $userCode]), 20, 240, function ($font) use ($fontPath) {
            $font->file($fontPath);
            $font->size(22);
        });
        $img->text(trans('custom.contractImage.amount', ['amount' => number_format($amount, 0, ",", ".")]), 20, 300, function ($font) use ($fontPath) {
            $font->file($fontPath);
            $font->size(28);
        });
        $img->text(trans('custom.contractImage.from', ['code' => $fromeContract]), 20, 350, function ($font) use ($fontPath) {
            $font->file($fontPath);
            $font->size(28);
        });
        $img->text(trans('custom.contractImage.to', ['code' => $toContract]), 20, 400, function ($font) use ($fontPath) {
            $font->file($fontPath);
            $font->size(28);
        });
        return $img;
    }

    if (!function_exists('aes_encrypt')) {
        /**
         * Encrypt value to a cryptojs compatiable json encoding string
         *
         * @param mixed $passphrase
         * @param mixed $value
         * @return string
         */
        function aes_encrypt($value, $passphrase)
        {
            $salt = openssl_random_pseudo_bytes(8);
            $salted = '';
            $dx = '';
            while (strlen($salted) < 48) {
                $dx = md5($dx . $passphrase . $salt, true);
                $salted .= $dx;
            }
            $key = substr($salted, 0, 32);
            $iv  = substr($salted, 32, 16);
            $encrypted_data = openssl_encrypt(json_encode($value), 'aes-256-cbc', $key, true, $iv);
            $data = array("ct" => base64_encode($encrypted_data), "iv" => bin2hex($iv), "s" => bin2hex($salt));
            return json_encode($data);
        }
    }

    if (!function_exists('aes_decrypt')) {
        /**
         * Decrypt data from a CryptoJS json encoding string
         *
         * @param mixed $passphrase
         * @param mixed $jsonString
         * @return mixed
         */
        function aes_decrypt($jsonString, $passphrase)
        {
            $jsondata = json_decode($jsonString, true);
            $salt = hex2bin($jsondata["s"]);
            $ct = base64_decode($jsondata["ct"]);
            $iv  = hex2bin($jsondata["iv"]);
            $concatedPassphrase = $passphrase . $salt;
            $md5 = array();
            $md5[0] = md5($concatedPassphrase, true);
            $result = $md5[0];
            for ($i = 1; $i < 3; $i++) {
                $md5[$i] = md5($md5[$i - 1] . $concatedPassphrase, true);
                $result .= $md5[$i];
            }
            $key = substr($result, 0, 32);
            $data = openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);
            return json_decode($data, true);
        }
    }
}
