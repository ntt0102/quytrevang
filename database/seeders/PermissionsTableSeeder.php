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
        Permission::create(['name' => 'profile@control']);
        Permission::create(['name' => 'contract@control']);
        Permission::create(['name' => 'method@control']);
        Permission::create(['name' => 'trade@view']);

        Permission::create(['name' => 'system@control']);
        Permission::create(['name' => 'users@control']);
        Permission::create(['name' => 'contracts@control']);
        Permission::create(['name' => 'comments@control']);
        Permission::create(['name' => 'trades@view']);
        Permission::create(['name' => 'trades@edit']);
        Permission::create(['name' => 'finbooks@control']);

        Permission::create(['name' => 'setting@control']);
        Permission::create(['name' => 'setting.parameters@control']);
        Permission::create(['name' => 'setting.faqs@control']);
        Permission::create(['name' => 'setting.database@control']);
        Permission::create(['name' => 'setting.command@control']);
        Permission::create(['name' => 'setting.notification@control']);
        Permission::create(['name' => 'setting.files@control']);
        Permission::create(['name' => 'setting.log@control']);
        Permission::create(['name' => 'setting.roles@control']);
        Permission::create(['name' => 'setting.permissions@control']);
    }
}
