<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared(
            "
            CREATE FUNCTION `GET_PROFIT`(`buy_volume` VARCHAR(255), `buy_price` VARCHAR(255), `buy_fee` VARCHAR(255), `sell_volume` VARCHAR(255), `sell_price` VARCHAR(255), `sell_fee` VARCHAR(255)) RETURNS decimal(11,1)
            BEGIN
                DECLARE buy INT DEFAULT 0;
                DECLARE sell INT DEFAULT 0;
                DECLARE sellFee INT DEFAULT 0;
                
                CALL SPLIT_ORDER(buy_volume, buy_price, buy_fee);
                SELECT SUM(-volume*price - fee) INTO buy FROM split_order;

                CALL SPLIT_ORDER(sell_volume, sell_price, sell_fee);
                SELECT SUM(volume*price - fee) INTO sell FROM split_order;
                
                RETURN buy + sell;
            END
            "
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP FUNCTION IF EXISTS `GET_PROFIT`');
    }
};
