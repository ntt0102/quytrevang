<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * Add Users
         *
         */
        $user = User::create([
            'code'     => 121992,
            'name' => 'Nguyễn Trường Thọ',
            'email' => 'ntt0102@gmail.com',
            'email_verified_at' => date_create(),
            'phone' => '0367269284',
            'password' => bcrypt('password'),
            'pin' => bcrypt('0128'),
            'sex' => 1,
            'birthday' => date_create_from_format('d/m/Y', '01/02/1992'),
            'address' => 'Thôn Phong Phú, Quế Thuận, Quế Sơn, Quảng Nam',
            'documents' => [['type' => 'contract', 'file' => '1.png']],
            'identity' => [
                'number' => '049092008897',
                'issued_on' => '2021-9-1',
            ],
            'bank_account' => ['bank_name' => 'VPBank', 'account_name' => 'NGUYEN TRUONG THO', 'account_number' => '0367269284'],
            'avatar' => '4fee13b01615da5a5bd100522c9a2ac0.png',
        ]);
        $user->assignRole('user');
        $user->assignRole('assistant');
        $user->assignRole('admin');

        $user = User::create([
            'code'     => 230395,
            'name' => 'Dương Thị Thanh Tâm',
            'email' => 'thanhtam.cna02@gmail.com',
            'email_verified_at' => date_create(),
            'phone' => '0763693771',
            'password' => bcrypt('password'),
            'pin' => bcrypt('0000'),
            'sex' => 0,
            'birthday' => date_create_from_format('d/m/Y', '23/03/1995'),
            'address' => 'Thôn Nam Hà, Bình Dương, Thăng Bình, Quảng Nam',
            'documents' => [['type' => 'contract', 'file' => '1.png']],
            'identity' => [
                'number' => '049195010162',
                'issued_on' => '2021-9-1',
            ],
            'bank_account' => ['bank_name' => 'Techcombank', 'account_name' => 'DUONG THI THANH TAM', 'account_number' => '19032731111014'],
            'avatar' => '6488d7db2d8815928d8ab691e585f880.png',
        ]);
        $user->assignRole('user');
        $user->assignRole('assistant');
        $user->givePermissionTo('trades@view');
        $user->givePermissionTo('finbooks@control');

        $user = User::create([
            'code'     => '100001',
            'name'     => 'Level 1',
            'email'    => 'l1@qtv.com',
            'password' => bcrypt('password'),
        ]);
        $user->assignRole('user');

        $user = User::create([
            'code'     => '100002',
            'name'     => 'Level 2',
            'email'    => 'l2@qtv.com',
            'password' => bcrypt('password'),
            'email_verified_at' => date_create(),
        ]);
        $user->assignRole('user');

        $user = User::create([
            'code'     => '100003',
            'name'     => 'Level 3',
            'email'    => 'l3@qtv.com',
            'password' => bcrypt('password'),
            'email_verified_at' => date_create(),
            'pin' => bcrypt('0000'),
        ]);
        $user->assignRole('user');

        $user = User::create([
            'code'     => '100004',
            'name'     => 'Level 4',
            'email'    => 'l4@qtv.com',
            'password' => bcrypt('password'),
            'email_verified_at' => date_create(),
            'pin' => bcrypt('0000'),
            'phone' => '0000000004',
        ]);
        $user->assignRole('user');

        $user = User::create([
            'code'     => '100005',
            'name'     => 'Level 5',
            'email'    => 'l5@qtv.com',
            'password' => bcrypt('password'),
            'email_verified_at' => date_create(),
            'pin' => bcrypt('0000'),
            'phone' => '0000000005',
            'documents' => [['type' => 'contract', 'file' => '1.png']],
        ]);
        $user->assignRole('user');

        $user = User::create([
            'code'     => 100006,
            'name'     => 'Level 6',
            'email'    => 'l6@qtv.com',
            'password' => bcrypt('password'),
            'email_verified_at' => date_create(),
            'pin' => bcrypt('0000'),
            'phone' => '0000000006',
            'documents' => [['type' => 'contract', 'file' => '1.png']],
        ]);
        $user = User::create([
            'code'     => 100007,
            'name'     => 'Deleted',
            'email'    => 'del@qtv.com',
            'password' => bcrypt('password'),
            'email_verified_at' => date_create(),
            'pin' => bcrypt('0000'),
            'phone' => '0000000007',
            'deleted_at' => date_create(),
        ]);
        $user->assignRole('user');
    }
}
