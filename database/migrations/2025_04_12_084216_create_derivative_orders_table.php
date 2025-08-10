<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('derivative_orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('status')->default(0);
            $table->string('type');
            $table->tinyInteger('side');
            $table->float('entry_price', 6, 1);
            $table->float('tp_price', 6, 1);
            $table->float('sl_price', 6, 1);
            $table->string('entry_no');
            $table->string('tp_no');
            $table->string('sl_no');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('derivative_orders');
    }
};
