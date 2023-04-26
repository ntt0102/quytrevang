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
        Permission::create(['name' => 'common@access']);

        Permission::create(['name' => 'system@control']);

        Permission::create(['name' => 'users@control']);
        Permission::create(['name' => 'contracts@control']);
        Permission::create(['name' => 'copyists@control']);
        Permission::create(['name' => 'comments@control']);

        Permission::create(['name' => 'stock@order']);
        Permission::create(['name' => 'trades@view']);
        Permission::create(['name' => 'trades@edit']);
        Permission::create(['name' => 'finbooks@control']);

        Permission::create(['name' => 'command@setting']);
        Permission::create(['name' => 'notification@setting']);
        Permission::create(['name' => 'files@setting']);
        Permission::create(['name' => 'log@setting']);
        Permission::create(['name' => 'faqs@setting']);
        Permission::create(['name' => 'parameters@setting']);
        Permission::create(['name' => 'database@setting']);
        Permission::create(['name' => 'roles@setting']);
        Permission::create(['name' => 'permissions@setting']);
    }
}
