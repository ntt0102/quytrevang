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
            CREATE PROCEDURE `PROFIT_CHART`(IN `period` VARCHAR(10), IN `from_date` VARCHAR(10), IN `to_date` VARCHAR(10))
            BEGIN
				DROP TEMPORARY TABLE IF EXISTS t1;
                CREATE TEMPORARY TABLE t1 AS
                    SELECT
                    GET_PROFIT(`buy_volume`,`buy_price`,`buy_fee`,`sell_volume`,`sell_price`,`sell_fee`) AS p,
                    CASE
                        WHEN period = 'day' THEN CONCAT(YEAR(`buy_date`),'/',LPAD(MONTH(`buy_date`), 2, '0'),'/',LPAD(DAY(`buy_date`), 2, '0'))
                        WHEN period = 'week' THEN CONCAT(YEAR(`buy_date`),'/',LPAD(WEEK(`buy_date`), 2, '0'))
                        WHEN period = 'month' THEN CONCAT(YEAR(`buy_date`),'/',LPAD(MONTH(`buy_date`), 2, '0'))
                        WHEN period = 'quarter' THEN CONCAT(YEAR(`buy_date`),'/',QUARTER(`buy_date`))
                        WHEN period = 'year' THEN YEAR(`buy_date`)
                        WHEN period = 'all' THEN 1
                    END AS `date`
                    FROM `stock_orders` 
                    WHERE CHECK_CLOSED(`buy_volume`,`sell_volume`) AND `buy_date` >= from_date AND `buy_date` <= to_date;
                
                DROP TEMPORARY TABLE IF EXISTS t2;
                CREATE TEMPORARY TABLE t2 AS
                    SELECT `date`, p, p > 0 AS c FROM t1;
                
                DROP TEMPORARY TABLE IF EXISTS t3;
                CREATE TEMPORARY TABLE t3 AS
                SELECT `date`, SUM(p) AS `profit`, COUNT(c) AS `order` FROM t2 GROUP BY `date`, c;

                SELECT * FROM t3  ORDER BY `date` ASC;
            END
            "
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS `PROFIT_CHART`');
    }
};
