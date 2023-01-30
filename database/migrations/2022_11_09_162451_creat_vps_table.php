<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatVpsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vps', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamp('time');
            $table->float('price');
            $table->integer('vol');
            $table->float('bid');
            $table->float('ask');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vps');
    }
}
