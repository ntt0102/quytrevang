<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create(['guard_name' => 'api', 'name' => 'user']);
        Role::create(['guard_name' => 'api', 'name' => 'assistant']);
        Role::create(['guard_name' => 'api', 'name' => 'admin']);
    }
}
