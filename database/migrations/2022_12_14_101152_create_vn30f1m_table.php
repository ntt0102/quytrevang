<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVn30f1mTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vn30f1m', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->float('price1', 8, 1);
            $table->float('price2', 8, 1);
            $table->float('price3', 8, 1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vn30f1m');
    }
}
