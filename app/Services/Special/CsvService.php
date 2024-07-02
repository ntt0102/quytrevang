<?php

namespace App\Services\Special;

use App\Services\CoreService;

class CsvService extends CoreService
{

    public function writeCsv($file, $data)
    {
        $path = storage_path('app/phaisinh/' . $date);
        $fp = fopen($file, 'w');
        foreach ($data as $item) {
            $line = [];
            $line[] = strtotime($item->Date) + $this->SHIFT_TIME;
            $line[] = $item->Price;
            fputcsv($fp, $line);
        }
        fclose($fp);
    }
}
