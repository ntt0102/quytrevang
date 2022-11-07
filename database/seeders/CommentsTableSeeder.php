<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Comment::create([
            'name' => "Nguyễn Văn A",
            'phone' => "0367269280",
            'subject' => "Mở tài khoản",
            'content' => "Tôi mở tài khoản bằng cách nào?",
            'read' => 0
        ]);
        Comment::create([
            'user_code' => 121992,
            'subject' => "Ký hợp đồng",
            'content' => "Tôi ký hợp đồng bằng cách nào?",
            'read' => 1
        ]);
    }
}
