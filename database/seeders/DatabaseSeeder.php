<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Database\Seeders\PermissionsTableSeeder;
use Database\Seeders\RolesTableSeeder;
use Database\Seeders\ConnectRelationshipsSeeder;
use Database\Seeders\UsersTableSeeder;
use Database\Seeders\ContractsTableSeeder;
use Database\Seeders\ParametersTableSeeder;
use Database\Seeders\FaqsTableSeeder;
use Database\Seeders\CommentsTableSeeder;
use Database\Seeders\VariablesTableSeeder;
use Database\Seeders\TradesTableSeeder;
use Database\Seeders\FinbooksTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(PermissionsTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(ConnectRelationshipsSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(ContractsTableSeeder::class);
        $this->call(ParametersTableSeeder::class);
        $this->call(FaqsTableSeeder::class);
        $this->call(CommentsTableSeeder::class);
        $this->call(VariablesTableSeeder::class);
        // $this->call(TradesTableSeeder::class);
        // $this->call(FinbooksTableSeeder::class);

        Model::reguard();
    }
}
