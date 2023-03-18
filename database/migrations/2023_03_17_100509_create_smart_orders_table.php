<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSmartOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('smart_orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_code');
            $table->date('started_at');
            $table->string('periods');
            $table->integer('device_limit');
            $table->json('devices');
            $table->integer('time_frame')->default(0);
            $table->boolean('view_chart')->default(1);
            $table->integer('contracts')->default(1);
            $table->integer('take_profit')->default(3);
            $table->integer('stop_loss')->default(2);
            $table->boolean('volume')->default(0);
            $table->integer('chart_type')->default(0);
            $table->boolean('fullscreen')->default(1);
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
        Schema::dropIfExists('smart_orders');
    }
}
