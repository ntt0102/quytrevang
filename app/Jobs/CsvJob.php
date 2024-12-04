<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CsvJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 3600;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct() {}

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
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
