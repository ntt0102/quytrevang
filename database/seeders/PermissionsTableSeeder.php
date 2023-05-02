<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::create(['guard_name' => 'api', 'name' => 'common@access']);

        Permission::create(['guard_name' => 'api', 'name' => 'system@control']);

        Permission::create(['guard_name' => 'api', 'name' => 'users@control']);
        Permission::create(['guard_name' => 'api', 'name' => 'contracts@control']);
        Permission::create(['guard_name' => 'api', 'name' => 'copyists@control']);
        Permission::create(['guard_name' => 'api', 'name' => 'comments@control']);

        Permission::create(['guard_name' => 'api', 'name' => 'stock@order']);
        Permission::create(['guard_name' => 'api', 'name' => 'trades@view']);
        Permission::create(['guard_name' => 'api', 'name' => 'trades@edit']);
        Permission::create(['guard_name' => 'api', 'name' => 'finbooks@control']);

        Permission::create(['guard_name' => 'api', 'name' => 'command@setting']);
        Permission::create(['guard_name' => 'api', 'name' => 'notification@setting']);
        Permission::create(['guard_name' => 'api', 'name' => 'files@setting']);
        Permission::create(['guard_name' => 'api', 'name' => 'log@setting']);
        Permission::create(['guard_name' => 'api', 'name' => 'faqs@setting']);
        Permission::create(['guard_name' => 'api', 'name' => 'parameters@setting']);
        Permission::create(['guard_name' => 'api', 'name' => 'database@setting']);
        Permission::create(['guard_name' => 'api', 'name' => 'roles@setting']);
        Permission::create(['guard_name' => 'api', 'name' => 'permissions@setting']);
    }
}
