<?php

use App\Models\Variable;
use App\Models\Parameter;

if (!function_exists('get_global_value')) {
    /**
     * Get the global value.
     *
     * @param string $name
     * @return \App\Models\Parameter
     */
    function get_global_value($name)
    {
        return Variable::getValue($name);
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
        return Variable::setValue($name, $value);
    }
}

if (!function_exists('cmp')) {
    /**
     * Compare
     * @param string $value1
     * @param string $side
     * @param string $value2
     * @param string $eq
     * @return bool
     */
    function cmp($value1, $side, $value2, $eq = false)
    {
        if ($side) return $eq ? $value1 >= $value2 : $value1 > $value2;
        else return $eq ? $value1 <= $value2 : $value1 < $value2;
    }
}

if (!function_exists('check_opening_market')) {
    /**
     * Check Opening Market
     *
     * @param DateTime $date
     */
    function check_opening_market($date)
    {
        if (in_array($date->format('w'), [0, 6])) return false;
        $holidays = explode(",", get_global_value('holidays'));
        if (in_array($date->format('Y-m-d'), $holidays)) return false;
        return true;
    }
}

if (!function_exists('in_trading_time')) {
    /**
     * Get start trading time.
     *
     * @return string
     */
    function in_trading_time()
    {
        $current_time = date('H:i');
        $morning_start = '09:00';
        $morning_end = '11:30';
        $afternoon_start = '13:00';
        $afternoon_end = '14:30';

        return ($current_time >= $morning_start && $current_time <= $morning_end) ||
            ($current_time >= $afternoon_start && $current_time <= $afternoon_end);
    }
}

if (!function_exists('add_date_zero')) {
    /**
     * Add zero for Day or Month
     *
     * @return string
     */
    function add_date_zero($component)
    {
        return str_pad($component, 2, '0', STR_PAD_LEFT);
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
        function aes_encrypt($value, $passphrase = '19AqVgG36ekVzc1HyEmE9vfA7PH78DFCwhdwUxJ7dns=')
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
        function aes_decrypt($jsonString, $passphrase = '19AqVgG36ekVzc1HyEmE9vfA7PH78DFCwhdwUxJ7dns=')
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
    if (!function_exists('first_day_of')) {
        /**
         * Return the first day of the Week/Month/Quarter/Year that the
         * current/provided date falls within
         *
         * @param string   $period The period to find the first day of. ('year', 'quarter', 'month', 'week')
         * @param DateTime $date   The date to use instead of the current date
         *
         * @return DateTime
         */
        function first_day_of($period, $date = null)
        {
            $period = strtolower($period);
            $newDate = ($date === null) ? date_create() : clone $date;

            switch ($period) {
                case 'year':
                    $newDate->modify('first day of january ' . $newDate->format('Y'));
                    break;
                case 'quarter':
                    $month = $newDate->format('n');

                    if ($month < 4) {
                        $newDate->modify('first day of january ' . $newDate->format('Y'));
                    } elseif ($month > 3 && $month < 7) {
                        $newDate->modify('first day of april ' . $newDate->format('Y'));
                    } elseif ($month > 6 && $month < 10) {
                        $newDate->modify('first day of july ' . $newDate->format('Y'));
                    } elseif ($month > 9) {
                        $newDate->modify('first day of october ' . $newDate->format('Y'));
                    }
                    break;
                case 'month':
                    $newDate->modify('first day of this month');
                    break;
                case 'week':
                    $newDate->modify('monday this week');
                    break;
            }

            return $newDate;
        }
    }
    if (!function_exists('last_day_of')) {
        /**
         * Return the last day of the Week/Month/Quarter/Year that the
         * current/provided date falls within
         *
         * @param string   $period The period to find the last day of. ('year', 'quarter', 'month', 'week')
         * @param DateTime $date   The date to use instead of the current date
         *
         * @return DateTime
         * @throws InvalidArgumentException
         */
        function last_day_of($period, $date = null)
        {
            $period = strtolower($period);
            $newDate = ($date === null) ? date_create() : clone $date;

            switch ($period) {
                case 'year':
                    $newDate->modify('last day of december ' . $newDate->format('Y'));
                    break;
                case 'quarter':
                    $month = $newDate->format('n');

                    if ($month < 4) {
                        $newDate->modify('last day of march ' . $newDate->format('Y'));
                    } elseif ($month > 3 && $month < 7) {
                        $newDate->modify('last day of june ' . $newDate->format('Y'));
                    } elseif ($month > 6 && $month < 10) {
                        $newDate->modify('last day of september ' . $newDate->format('Y'));
                    } elseif ($month > 9) {
                        $newDate->modify('last day of december ' . $newDate->format('Y'));
                    }
                    break;
                case 'month':
                    $newDate->modify('last day of this month');
                    break;
                case 'week':
                    $newDate->modify('sunday this week');
                    break;
            }

            return $newDate;
        }
    }
}
