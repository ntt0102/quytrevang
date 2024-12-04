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

    public function removeSide()
    {

        // Đường dẫn đến thư mục chứa các file CSV
        $directory = storage_path('app/phaisinh'); // Thay đổi đường dẫn thư mục cho phù hợp

        // Lấy tất cả các file CSV trong thư mục
        $files = glob($directory . '/*.csv');

        // Duyệt qua từng file CSV trong thư mục
        foreach ($files as $filename) {
            // Mở file CSV để đọc
            $file = fopen($filename, 'r');

            // Kiểm tra nếu file mở thành công
            if ($file === false) {
                echo "Không thể mở file: $filename\n";
                continue; // Tiếp tục với file tiếp theo nếu không mở được
            }

            // Mảng để lưu dữ liệu đã chỉnh sửa
            $updatedData = [];

            // Đọc từng dòng trong file
            while (($row = fgetcsv($file)) !== false) {
                // Xoá trường 'side' (vị trí thứ 4 trong mảng $row)
                unset($row[3]);  // Trường 'side' là phần tử thứ 4 trong mảng (bắt đầu từ 0)

                // Thêm dòng đã chỉnh sửa vào mảng
                $updatedData[] = $row;
            }

            // Đóng file sau khi đọc
            fclose($file);

            // Mở file CSV để ghi lại dữ liệu đã sửa
            $file = fopen($filename, 'w');

            // Kiểm tra nếu file mở thành công
            if ($file === false) {
                echo "Không thể mở file để ghi: $filename\n";
                continue; // Tiếp tục với file tiếp theo nếu không mở được
            }

            // Ghi lại dữ liệu đã chỉnh sửa vào file CSV
            foreach ($updatedData as $row) {
                fputcsv($file, $row);
            }

            // Đóng file sau khi ghi
            fclose($file);

            echo "Đã sửa file: $filename\n";
        }
    }
}
