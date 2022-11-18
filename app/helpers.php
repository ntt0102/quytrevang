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

if (!function_exists('check_opening_market')) {
    /**
     * Check opening market
     *
     * @return bool
     */
    function check_opening_market()
    {
        return app(\App\Services\AppService::class)->vpsCheckOpeningMarket();
    }
}

if (!function_exists('trading_time')) {
    /**
     * Get start trading time.
     *
     * @return string
     */
    function trading_time($time)
    {
        return app(\App\Repositories\ParameterRepository::class)->getValue($time);
    }
}

if (!function_exists('text2code')) {
    /**
     * Convert text to code
     *
     * @param string $str
     * @return string
     */
    function text2code($str)
    {
        $unicode = array(
            'a' => 'á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ',
            'd' => 'đ',
            'e' => 'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
            'i' => 'í|ì|ỉ|ĩ|ị',
            'o' => 'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ',
            'u' => 'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự',
            'y' => 'ý|ỳ|ỷ|ỹ|ỵ',
            'A' => 'Á|À|Ả|Ã|Ạ|Ă|Ắ|Ặ|Ằ|Ẳ|Ẵ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ',
            'D' => 'Đ',
            'E' => 'É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ',
            'I' => 'Í|Ì|Ỉ|Ĩ|Ị',
            'O' => 'Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ',
            'U' => 'Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự',
            'Y' => 'Ý|Ỳ|Ỷ|Ỹ|Ỵ',

        );
        foreach ($unicode as $nonUnicode => $uni) {
            $str = preg_replace("/($uni)/i", $nonUnicode, $str);
        }
        return str_replace(' ', '_', $str);
    }
}

if (!function_exists('formatBytes')) {
    /**
     * Format bytes
     *
     * @param int $bytes
     * @param int $precision
     * @return int
     */
    function formatBytes($bytes, $precision = 2)
    {
        $units = array('B', 'KB', 'MB', 'GB', 'TB');

        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);

        // Uncomment one of the following alternatives
        // $bytes /= pow(1024, $pow);
        // $bytes /= (1 << (10 * $pow)); 

        return round($bytes, $precision) . ' ' . $units[$pow];
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
}
