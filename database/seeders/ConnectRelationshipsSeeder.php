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
        $userRole->givePermissionTo('user:access_overview');
        $userRole->givePermissionTo('user:access_profile');
        $userRole->givePermissionTo('user:access_contract');

        /**
         * Attach Permissions to Assistant.
         */
        $assistantRole = Role::where('name', 'assistant')->first();
        $assistantRole->givePermissionTo('admin:manage_users');
        $assistantRole->givePermissionTo('admin:manage_contracts');
        $assistantRole->givePermissionTo('admin:setting_notification');
        $assistantRole->givePermissionTo('admin:setting_files');
        $assistantRole->givePermissionTo('admin:setting_faqs');

        /**
         * Attach Permissions to Admin.
         */
        $adminRole = Role::where('name', 'admin')->first();
        $adminRole->givePermissionTo('admin:control_system');

        $adminRole->givePermissionTo('admin:manage_users');
        $adminRole->givePermissionTo('admin:manage_contracts');
        $adminRole->givePermissionTo('admin:manage_comments');

        $adminRole->givePermissionTo('admin:order_derivative');
        $adminRole->givePermissionTo('admin:statistic_derivative');
        $adminRole->givePermissionTo('admin:access_share');
        $adminRole->givePermissionTo('admin:statistic_share');
        $adminRole->givePermissionTo('admin:access_finbooks');

        $adminRole->givePermissionTo('admin:setting_command');
        $adminRole->givePermissionTo('admin:setting_notification');
        $adminRole->givePermissionTo('admin:setting_files');
        $adminRole->givePermissionTo('admin:setting_log');
        $adminRole->givePermissionTo('admin:setting_faqs');
        $adminRole->givePermissionTo('admin:setting_parameters');
        $adminRole->givePermissionTo('admin:setting_database');
        $adminRole->givePermissionTo('admin:setting_roles');
        $adminRole->givePermissionTo('admin:setting_permissions');
    }
}
