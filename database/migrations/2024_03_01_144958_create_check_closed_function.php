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
            CREATE FUNCTION `CHECK_CLOSED`(`buy_volume` VARCHAR(255), `sell_volume` VARCHAR(255)) RETURNS tinyint(1)
            BEGIN
                DECLARE buy INT DEFAULT 0;
                DECLARE sell INT DEFAULT 0;
                
                SELECT SUM(volume) INTO buy 
                FROM json_table(buy_volume, '$[*]' columns (volume int path '$')) v;

                SELECT SUM(volume) INTO sell 
                FROM json_table(sell_volume, '$[*]' columns (volume int path '$')) v;
                
                RETURN buy = sell;
            END
            "
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP FUNCTION IF EXISTS `CHECK_CLOSED`');
    }
};
