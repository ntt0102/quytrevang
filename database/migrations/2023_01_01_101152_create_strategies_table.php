<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStrategiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('strategies', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->integer('trend');
            $table->float('momentum', 8, 1);
            $table->float('atc', 8, 1);
            $table->integer('order')->nullable();
            $table->float('ato', 8, 1)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('strategies');
    }
}
