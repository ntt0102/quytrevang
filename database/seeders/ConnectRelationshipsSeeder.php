<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class ConnectRelationshipsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * Attach Permissions to User.
         */
        $userRole = Role::where('name', 'user')->first();
        $userRole->givePermissionTo('common@access');

        /**
         * Attach Permissions to Assistant.
         */
        $assistantRole = Role::where('name', 'assistant')->first();
        $assistantRole->givePermissionTo('users@control');
        $assistantRole->givePermissionTo('contracts@control');
        $assistantRole->givePermissionTo('copyists@control');
        $assistantRole->givePermissionTo('notification@setting');
        $assistantRole->givePermissionTo('files@setting');
        $assistantRole->givePermissionTo('faqs@setting');

        /**
         * Attach Permissions to Admin.
         */
        $adminRole = Role::where('name', 'admin')->first();
        $adminRole->givePermissionTo('system@control');

        $adminRole->givePermissionTo('users@control');
        $adminRole->givePermissionTo('contracts@control');
        $adminRole->givePermissionTo('copyists@control');
        $adminRole->givePermissionTo('comments@control');

        $adminRole->givePermissionTo('stock@order');
        $adminRole->givePermissionTo('trades@view');
        $adminRole->givePermissionTo('trades@edit');
        $adminRole->givePermissionTo('finbooks@control');

        $adminRole->givePermissionTo('command@setting');
        $adminRole->givePermissionTo('notification@setting');
        $adminRole->givePermissionTo('files@setting');
        $adminRole->givePermissionTo('log@setting');
        $adminRole->givePermissionTo('faqs@setting');
        $adminRole->givePermissionTo('parameters@setting');
        $adminRole->givePermissionTo('database@setting');
        $adminRole->givePermissionTo('roles@setting');
        $adminRole->givePermissionTo('permissions@setting');
    }
}
