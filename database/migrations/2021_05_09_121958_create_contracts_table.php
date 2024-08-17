<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('code')->unique();
            $table->unsignedBigInteger('user_code');
            $table->unsignedBigInteger('principal');
            $table->double('interest_rate', 8, 5);
            $table->unsignedBigInteger('advance')->nullable();
            $table->date('paid_at');
            $table->date('withdrawn_at')->nullable();
            $table->json('paid_docs');
            $table->json('withdrawn_docs');
            $table->unsignedBigInteger('confirmed_by')->nullable();
            $table->timestamps();
            $table->foreign('user_code')->references('code')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contracts');
    }
};
