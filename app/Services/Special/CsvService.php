<?php

namespace App\Services\Special;

use App\Services\CoreService;

class CsvService extends CoreService
{
    const SHIFT_TIME = 7 * 60 * 60;

    public function convert()
    {
        $file = storage_path('app/phaisinh/2024-06-28/vn30f1m.csv');
        $data = $this->readCsv($file);
        $this->writeCsv($file, $data);
        return true;
    }
    public function writeCsv($file, $data)
    {
        $fp = fopen($file, 'w');
        foreach ($data as $item) {
            $line = [];
            // $line[] = strtotime($item->Date) + self::SHIFT_TIME;
            $line[] = $item[0];
            $line[] = $item[1];
            $line[] = 0;
            $line[] = 0;
            fputcsv($fp, $line);
        }
        fclose($fp);
    }
    public function readCsv($file)
    {
        $data = [];
        if (!file_exists($file)) return 'k ton tai';
        $fp = fopen($file, 'r');
        while (!feof($fp)) {
            $line = fgetcsv($fp);
            if (!!$line) {
                $data[] = [
                    +$line[0],
                    +$line[1],
                ];
            }
        }
        fclose($fp);
        return $data;
    }
}
