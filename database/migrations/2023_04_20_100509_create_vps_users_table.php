<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVpsUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vps_users', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('user_code');
            $table->string('vps_code')->nullable();
            $table->string('vps_session')->nullable();
            $table->boolean('allow_copy')->default(0);
            $table->boolean('allow_share')->default(0);
            $table->boolean('allow_max_vol')->default(1);
            $table->integer('volume')->default(1);
            $table->string('entry_order_id')->nullable();
            $table->string('tp_order_id')->nullable();
            $table->string('sl_order_id')->nullable();
            $table->string('exit_order_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vps_users');
    }
}
