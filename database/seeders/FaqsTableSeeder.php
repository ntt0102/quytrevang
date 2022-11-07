<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faq;

class FaqsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Faq::create([
            'topic' => "Giới thiệu",
            'question' => "Quỹ Tre Vàng là gì?",
            'answer' => "Là một kênh đầu tư tài chính được lập bởi cá nhân nhằm hợp tác đầu tư với Khách hàng là những người có nhu cầu gửi tiền tiết kiệm với lãi suất cao hơn ngân hàng."
        ]);
        Faq::create([
            'topic' => "Giới thiệu",
            'question' => "Quỹ Tre Vàng đầu tư trong lĩnh vực gì?",
            'answer' => "Toàn bộ vốn của Khách hàng được sử dụng vào việc đầu tư trong lĩnh vực Chứng khoán, được giám sát và bảo hộ của Ủy ban Chứng khoán Nhà nước Việt Nam"
        ]);
        Faq::create([
            'topic' => "Nộp tiền",
            'question' => "Hạn mức nộp tiền tối thiểu là bao nhiêu?",
            'answer' => "Hạn mức nộp tiền tối thiểu là 1.000.000 ₫ (một triệu đồng)"
        ]);

        Faq::create([
            'topic' => "Nộp tiền",
            'question' => "Nộp tiền bằng cách nào?",
            'answer' => "Có 3 cách nộp tiền như sau: Số tài khoản ngân hàng, ViettelPay, Số thẻ ATM"
        ]);
    }
}
