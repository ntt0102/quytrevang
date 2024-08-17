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
        Permission::create(['guard_name' => 'api', 'name' => 'user:access_overview']);
        Permission::create(['guard_name' => 'api', 'name' => 'user:access_profile']);
        Permission::create(['guard_name' => 'api', 'name' => 'user:access_contract']);

        Permission::create(['guard_name' => 'api', 'name' => 'admin:control_system']);

        Permission::create(['guard_name' => 'api', 'name' => 'admin:manage_users']);
        Permission::create(['guard_name' => 'api', 'name' => 'admin:manage_contracts']);
        Permission::create(['guard_name' => 'api', 'name' => 'admin:manage_comments']);

        Permission::create(['guard_name' => 'api', 'name' => 'admin:order_derivative']);
        Permission::create(['guard_name' => 'api', 'name' => 'admin:statistic_derivative']);
        Permission::create(['guard_name' => 'api', 'name' => 'admin:access_share']);
        Permission::create(['guard_name' => 'api', 'name' => 'admin:statistic_share']);
        Permission::create(['guard_name' => 'api', 'name' => 'admin:access_finbooks']);

        Permission::create(['guard_name' => 'api', 'name' => 'admin:setting_command']);
        Permission::create(['guard_name' => 'api', 'name' => 'admin:setting_notification']);
        Permission::create(['guard_name' => 'api', 'name' => 'admin:setting_files']);
        Permission::create(['guard_name' => 'api', 'name' => 'admin:setting_log']);
        Permission::create(['guard_name' => 'api', 'name' => 'admin:setting_faqs']);
        Permission::create(['guard_name' => 'api', 'name' => 'admin:setting_parameters']);
        Permission::create(['guard_name' => 'api', 'name' => 'admin:setting_database']);
        Permission::create(['guard_name' => 'api', 'name' => 'admin:setting_roles']);
        Permission::create(['guard_name' => 'api', 'name' => 'admin:setting_permissions']);
    }
}
