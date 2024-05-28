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
            CREATE PROCEDURE `SPLIT_ORDER`(IN `volume` VARCHAR(255), IN `price` VARCHAR(255), IN `fee` VARCHAR(255))
            BEGIN
                DROP TEMPORARY TABLE IF EXISTS split_order;
                CREATE TEMPORARY TABLE split_order AS
                    SELECT v.volume, p.price, f.fee
                    FROM json_table(volume, '$[*]' COLUMNS(id FOR ORDINALITY,volume int path '$')) v
                    JOIN json_table(price, '$[*]' COLUMNS(id FOR ORDINALITY,price int path '$')) p
                    JOIN json_table(fee, '$[*]' COLUMNS(id FOR ORDINALITY,fee int path '$')) f
                    WHERE v.id = p.id AND v.id = f.id;
            END
            "
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS `SPLIT_ORDER`');
    }
};
