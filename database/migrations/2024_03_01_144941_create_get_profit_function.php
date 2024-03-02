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
            CREATE FUNCTION `GET_PROFIT`(`buy_volume` VARCHAR(255), `buy_price` VARCHAR(255), `buy_fee` VARCHAR(255), `sell_volume` VARCHAR(255), `sell_price` VARCHAR(255), `sell_fee` VARCHAR(255)) RETURNS int(11)
            BEGIN
                DECLARE buy INT DEFAULT 0;
                DECLARE sell INT DEFAULT 0;
                
                SELECT SUM(-volume*price - fee) INTO buy 
                FROM json_table(buy_volume, '$[*]' columns (id FOR ORDINALITY,volume int path '$')) v
                JOIN json_table(buy_price, '$[*]' columns (id FOR ORDINALITY,price int path '$')) p
                JOIN json_table(buy_fee, '$[*]' columns (id FOR ORDINALITY,fee int path '$')) f
                WHERE v.id = p.id AND v.id = f.id;

                SELECT SUM(volume*price - fee) INTO sell 
                FROM json_table(sell_volume, '$[*]' columns (id FOR ORDINALITY,volume int path '$')) v
                JOIN json_table(sell_price, '$[*]' columns (id FOR ORDINALITY,price int path '$')) p
                JOIN json_table(sell_fee, '$[*]' columns (id FOR ORDINALITY,fee int path '$')) f
                WHERE v.id = p.id AND v.id = f.id;
                
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
