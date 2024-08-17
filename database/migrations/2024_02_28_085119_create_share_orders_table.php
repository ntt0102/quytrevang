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
        Schema::create('share_orders', function (Blueprint $table) {
            $table->id();
            $table->string('symbol');
            $table->date('buy_date');
            $table->json('buy_volume');
            $table->json('buy_price');
            $table->json('buy_fee');
            $table->date('sell_date')->nullable();
            $table->json('sell_volume');
            $table->json('sell_price');
            $table->json('sell_fee');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('share_orders');
    }
};
