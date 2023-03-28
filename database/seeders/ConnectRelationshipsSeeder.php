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
        $userRole->givePermissionTo('profile@control');
        $userRole->givePermissionTo('contract@control');
        $userRole->givePermissionTo('trade@view');

        /**
         * Attach Permissions to Assistant.
         */
        $assistantRole = Role::where('name', 'assistant')->first();
        $assistantRole->givePermissionTo('users@control');
        $assistantRole->givePermissionTo('contracts@control');
        $assistantRole->givePermissionTo('setting@control');
        $assistantRole->givePermissionTo('setting.files@control');
        $assistantRole->givePermissionTo('setting.faqs@control');
        $assistantRole->givePermissionTo('setting.notification@control');

        /**
         * Attach Permissions to Admin.
         */
        $adminRole = Role::where('name', 'admin')->first();
        $adminRole->givePermissionTo('system@control');
        $adminRole->givePermissionTo('comments@control');
        $adminRole->givePermissionTo('trades@view');
        $adminRole->givePermissionTo('trades@edit');
        $adminRole->givePermissionTo('finbooks@control');
        $adminRole->givePermissionTo('smartorders@control');
        $adminRole->givePermissionTo('setting.parameters@control');
        $adminRole->givePermissionTo('setting.database@control');
        $adminRole->givePermissionTo('setting.command@control');
        $adminRole->givePermissionTo('setting.log@control');
        $adminRole->givePermissionTo('setting.roles@control');
        $adminRole->givePermissionTo('setting.permissions@control');
    }
}
