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
            CREATE PROCEDURE `WIN_RATE`(IN `in_date` VARCHAR(10))
            BEGIN
				DECLARE sPos INT DEFAULT 0;
                DECLARE sNeg INT DEFAULT 0;
                DECLARE cPos INT DEFAULT 0;
                DECLARE cNeg INT DEFAULT 0;
                DECLARE rr FLOAT DEFAULT 0;
                DECLARE winrate FLOAT DEFAULT 0;
                DECLARE profit INT DEFAULT 0;
            
                DROP TEMPORARY TABLE IF EXISTS t1;
                CREATE TEMPORARY TABLE t1 AS
                    SELECT GET_PROFIT(`buy_volume`,`buy_price`,`buy_fee`,`sell_volume`,`sell_price`,`sell_fee`) AS p
                    FROM `stock_orders` 
                    WHERE CHECK_CLOSED(`buy_volume`,`sell_volume`) AND `sell_date` >= `in_date`;
                
                DROP TEMPORARY TABLE IF EXISTS t2;
                CREATE TEMPORARY TABLE t2 AS
                    SELECT p, p > 0 AS c FROM t1;
                
                DROP TEMPORARY TABLE IF EXISTS t3;
                CREATE TEMPORARY TABLE t3 AS
                    SELECT SUM(p) AS s, COUNT(c) AS c FROM t2 GROUP BY c;

                SELECT s, c INTO sPos, cPos FROM t3 WHERE s > 0;
                SELECT s, c INTO sNeg, cNeg FROM t3 WHERE s <= 0;
                SET rr = sPos/(-sNeg);
                SET winrate = cPos/(cPos + cNeg)*100;
                SELECT SUM(p) INTO profit FROM t1;

                SELECT rr, winrate, profit;
            END
            "
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS `WIN_RATE`');
    }
};
