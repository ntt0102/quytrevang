<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Trade;

class TradesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Trade::create([
            'amount' => 1,
            'scores' => 1091,
            'revenue' => 1420000,
            'loss' => 310000,
            'fees' => 126231,
            'monday' => date_create_from_format('d/m/Y', '04/01/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1080.9,
            'revenue' => 930000,
            'loss' => 270000,
            'fees' => 114268,
            'monday' => date_create_from_format('d/m/Y', '11/01/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1193.1,
            'revenue' => 3180000,
            'loss' => 860000,
            'fees' => 354529,
            'monday' => date_create_from_format('d/m/Y', '18/01/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1172,
            'revenue' => 5990000,
            'loss' => 600000,
            'fees' => 443319,
            'monday' => date_create_from_format('d/m/Y', '25/01/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1065,
            'revenue' => 3490000,
            'loss' => 500000,
            'fees' => 433784,
            'monday' => date_create_from_format('d/m/Y', '01/02/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1138.2,
            'revenue' => 0,
            'loss' => 1150000,
            'fees' => 108424,
            'monday' => date_create_from_format('d/m/Y', '08/02/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1140.5,
            'revenue' => 1050000,
            'loss' => 1010000,
            'fees' => 337379,
            'monday' => date_create_from_format('d/m/Y', '15/02/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1182.4,
            'revenue' => 2750000,
            'loss' => 0,
            'fees' => 546138,
            'monday' => date_create_from_format('d/m/Y', '22/02/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1183.5,
            'revenue' => 540000,
            'loss' => 660000,
            'fees' => 274823,
            'monday' => date_create_from_format('d/m/Y', '01/03/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1180.6,
            'revenue' => 770000,
            'loss' => 530000,
            'fees' => 225738,
            'monday' => date_create_from_format('d/m/Y', '08/03/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1189,
            'revenue' => 240000,
            'loss' => 320000,
            'fees' => 137720,
            'monday' => date_create_from_format('d/m/Y', '15/03/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1207.6,
            'revenue' => 0,
            'loss' => 900000,
            'fees' => 135046,
            'monday' => date_create_from_format('d/m/Y', '23/03/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1176.8,
            'revenue' => 870000,
            'loss' => 0,
            'fees' => 229659,
            'monday' => date_create_from_format('d/m/Y', '30/03/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1241,
            'revenue' => 390000,
            'loss' => 340000,
            'fees' => 330964,
            'monday' => date_create_from_format('d/m/Y', '06/04/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1260,
            'revenue' => 1600000,
            'loss' => 100000,
            'fees' => 336590,
            'monday' => date_create_from_format('d/m/Y', '12/04/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1276,
            'revenue' => 1490000,
            'loss' => 2050000,
            'fees' => 241635,
            'monday' => date_create_from_format('d/m/Y', '19/04/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1297,
            'revenue' => 2160000,
            'loss' => 920000,
            'fees' => 119849,
            'monday' => date_create_from_format('d/m/Y', '26/04/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1278,
            'revenue' => 0,
            'loss' => 1170000,
            'fees' => 49448,
            'monday' => date_create_from_format('d/m/Y', '03/05/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1323.2,
            'revenue' => 1100000,
            'loss' => 770000,
            'fees' => 100668,
            'monday' => date_create_from_format('d/m/Y', '10/05/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1382.1,
            'revenue' => 350000,
            'loss' => 0,
            'fees' => 127809,
            'monday' => date_create_from_format('d/m/Y', '17/05/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1415,
            'revenue' => 2310000,
            'loss' => 0,
            'fees' => 182783,
            'monday' => date_create_from_format('d/m/Y', '24/05/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1485,
            'revenue' => 2630000,
            'loss' => 0,
            'fees' => 133273,
            'monday' => date_create_from_format('d/m/Y', '01/06/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1507,
            'revenue' => 1190000,
            'loss' => 3020000,
            'fees' => 211732,
            'monday' => date_create_from_format('d/m/Y', '07/06/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1494.2,
            'revenue' => 1850000,
            'loss' => 990000,
            'fees' => 160304,
            'monday' => date_create_from_format('d/m/Y', '14/06/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1476,
            'revenue' => 770000,
            'loss' => 330000,
            'fees' => 295216,
            'monday' => date_create_from_format('d/m/Y', '21/06/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1509.1,
            'revenue' => 260000,
            'loss' => 510000,
            'fees' => 246302,
            'monday' => date_create_from_format('d/m/Y', '28/06/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1560,
            'revenue' => 2840000,
            'loss' => 0,
            'fees' => 355309,
            'monday' => date_create_from_format('d/m/Y', '05/07/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1503,
            'revenue' => 3270000,
            'loss' => 990000,
            'fees' => 311774,
            'monday' => date_create_from_format('d/m/Y', '12/07/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1414.8,
            'revenue' => 1630000,
            'loss' => 0,
            'fees' => 178847,
            'monday' => date_create_from_format('d/m/Y', '19/07/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1413,
            'revenue' => 600000,
            'loss' => 100000,
            'fees' => 128754,
            'monday' => date_create_from_format('d/m/Y', '27/07/2021'),
        ]);
        Trade::create([
            'amount' => 2,
            'scores' => 1446.6,
            'revenue' => 980000,
            'loss' => 300000,
            'fees' => 425403,
            'monday' => date_create_from_format('d/m/Y', '02/08/2021'),
        ]);
        Trade::create([
            'amount' => 2,
            'scores' => 1469.9,
            'revenue' => 2000000,
            'loss' => 2600000,
            'fees' => 588279,
            'monday' => date_create_from_format('d/m/Y', '09/08/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1485.2,
            'revenue' => 580000,
            'loss' => 1550000,
            'fees' => 481734,
            'monday' => date_create_from_format('d/m/Y', '16/08/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1444.4,
            'revenue' => 1410000,
            'loss' => 2210000,
            'fees' => 412645,
            'monday' => date_create_from_format('d/m/Y', '23/08/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1423,
            'revenue' => 1000000,
            'loss' => 370000,
            'fees' => 234044,
            'monday' => date_create_from_format('d/m/Y', '30/08/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1433.8,
            'revenue' => 1310000,
            'loss' => 40000,
            'fees' => 235187,
            'monday' => date_create_from_format('d/m/Y', '06/09/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1445.3,
            'revenue' => 50000,
            'loss' => 740000,
            'fees' => 261887,
            'monday' => date_create_from_format('d/m/Y', '13/09/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1460,
            'revenue' => 580000,
            'loss' => 370000,
            'fees' => 130934,
            'monday' => date_create_from_format('d/m/Y', '20/09/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1452.3,
            'revenue' => 270000,
            'loss' => 1760000,
            'fees' => 288569,
            'monday' => date_create_from_format('d/m/Y', '27/09/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1441,
            'revenue' => 1010000,
            'loss' => 0,
            'fees' => 184021,
            'monday' => date_create_from_format('d/m/Y', '04/10/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1475.5,
            'revenue' => 750000,
            'loss' => 90000,
            'fees' => 350912,
            'monday' => date_create_from_format('d/m/Y', '11/10/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1505.1,
            'revenue' => 960000,
            'loss' => 0,
            'fees' => 242652,
            'monday' => date_create_from_format('d/m/Y', '18/10/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1495,
            'revenue' => 2370000,
            'loss' => 130000,
            'fees' => 213895,
            'monday' => date_create_from_format('d/m/Y', '25/10/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1535,
            'revenue' => 850000,
            'loss' => 510000,
            'fees' => 409291,
            'monday' => date_create_from_format('d/m/Y', '01/11/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1537.6,
            'revenue' => 1210000,
            'loss' => 1270000,
            'fees' => 463130,
            'monday' => date_create_from_format('d/m/Y', '08/11/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1533,
            'revenue' => 640000,
            'loss' => 740000,
            'fees' => 217046,
            'monday' => date_create_from_format('d/m/Y', '15/11/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1503.6,
            'revenue' => 2040000,
            'loss' => 120000,
            'fees' => 165426,
            'monday' => date_create_from_format('d/m/Y', '22/11/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1548.2,
            'revenue' => 1360000,
            'loss' => 410000,
            'fees' => 192504,
            'monday' => date_create_from_format('d/m/Y', '29/11/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1508.1,
            'revenue' => 1730000,
            'loss' => 0,
            'fees' => 80698,
            'monday' => date_create_from_format('d/m/Y', '6/12/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1508.1,
            'revenue' => 910000,
            'loss' => 1000000,
            'fees' => 407056,
            'monday' => date_create_from_format('d/m/Y', '13/12/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1512,
            'revenue' => 0,
            'loss' => 540000,
            'fees' => 134831,
            'monday' => date_create_from_format('d/m/Y', '20/12/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1524.5,
            'revenue' => 690000,
            'loss' => 690000,
            'fees' => 135949,
            'monday' => date_create_from_format('d/m/Y', '27/12/2021'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1544.9,
            'revenue' => 0,
            'loss' => 510000,
            'fees' => 82163,
            'monday' => date_create_from_format('d/m/Y', '3/1/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1540,
            'revenue' => 1170000,
            'loss' => 1470000,
            'fees' => 163122,
            'monday' => date_create_from_format('d/m/Y', '10/1/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1525.4,
            'revenue' => 0,
            'loss' => 460000,
            'fees' => 53342,
            'monday' => date_create_from_format('d/m/Y', '17/1/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1496,
            'revenue' => 470000,
            'loss' => 940000,
            'fees' => 323418,
            'monday' => date_create_from_format('d/m/Y', '24/1/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1543.9,
            'revenue' => 360000,
            'loss' => 70000,
            'fees' => 54958,
            'monday' => date_create_from_format('d/m/Y', '7/2/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1535.5,
            'revenue' => 120000,
            'loss' => 730000,
            'fees' => 163100,
            'monday' => date_create_from_format('d/m/Y', '14/2/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1523.2,
            'revenue' => 0,
            'loss' => 2680000,
            'fees' => 243587,
            'monday' => date_create_from_format('d/m/Y', '21/2/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1511,
            'revenue' => 30000,
            'loss' => 220000,
            'fees' => 107769,
            'monday' => date_create_from_format('d/m/Y', '28/2/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1496,
            'revenue' => 790000,
            'loss' => 1370000,
            'fees' => 455645,
            'monday' => date_create_from_format('d/m/Y', '7/3/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1475.2,
            'revenue' => 0,
            'loss' => 380000,
            'fees' => 79220,
            'monday' => date_create_from_format('d/m/Y', '14/3/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1479.7,
            'revenue' => 570000,
            'loss' => 630000,
            'fees' => 215139,
            'monday' => date_create_from_format('d/m/Y', '21/3/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1489.1,
            'revenue' => 1160000,
            'loss' => 610000,
            'fees' => 268204,
            'monday' => date_create_from_format('d/m/Y', '28/3/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1529.4,
            'revenue' => 0,
            'loss' => 1090000,
            'fees' => 246137,
            'monday' => date_create_from_format('d/m/Y', '4/4/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1525.9,
            'revenue' => 390000,
            'loss' => 390000,
            'fees' => 108599,
            'monday' => date_create_from_format('d/m/Y', '11/4/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1494.1,
            'revenue' => 1160000,
            'loss' => 0,
            'fees' => 108599,
            'monday' => date_create_from_format('d/m/Y', '18/4/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1442.9,
            'revenue' => 1000000,
            'loss' => 710000,
            'fees' => 76703,
            'monday' => date_create_from_format('d/m/Y', '25/4/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1408.3,
            'revenue' => 440000,
            'loss' => 0,
            'fees' => 25158,
            'monday' => date_create_from_format('d/m/Y', '2/5/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1353.7,
            'revenue' => 380000,
            'loss' => 220000,
            'fees' => 112171,
            'monday' => date_create_from_format('d/m/Y', '9/5/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1240,
            'revenue' => 950000,
            'loss' => 440000,
            'fees' => 191798,
            'monday' => date_create_from_format('d/m/Y', '16/5/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1289,
            'revenue' => 1940000,
            'loss' => 470000,
            'fees' => 192527,
            'monday' => date_create_from_format('d/m/Y', '23/5/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1322.5,
            'revenue' => 190000,
            'loss' => 1070000,
            'fees' => 241510,
            'monday' => date_create_from_format('d/m/Y', '30/5/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1318,
            'revenue' => 0,
            'loss' => 1490000,
            'fees' => 171103,
            'monday' => date_create_from_format('d/m/Y', '6/6/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1311.1,
            'revenue' => 1760000,
            'loss' => 90000,
            'fees' => 166123,
            'monday' => date_create_from_format('d/m/Y', '13/6/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1245.2,
            'revenue' => 1160000,
            'loss' => 0,
            'fees' => 46691,
            'monday' => date_create_from_format('d/m/Y', '20/6/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1227,
            'revenue' => 0,
            'loss' => 870000,
            'fees' => 70555,
            'monday' => date_create_from_format('d/m/Y', '27/6/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1242,
            'revenue' => 1150000,
            'loss' => 160000,
            'fees' => 93641,
            'monday' => date_create_from_format('d/m/Y', '4/7/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1225,
            'revenue' => 160000,
            'loss' => 460000,
            'fees' => 115831,
            'monday' => date_create_from_format('d/m/Y', '11/7/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1210.1,
            'revenue' => 20000,
            'loss' => 380000,
            'fees' => 279802,
            'monday' => date_create_from_format('d/m/Y', '18/7/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1225.6,
            'revenue' => 140000,
            'loss' => 0,
            'fees' => 117139,
            'monday' => date_create_from_format('d/m/Y', '25/7/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1230.7,
            'revenue' => 420000,
            'loss' => 620000,
            'fees' => 189301,
            'monday' => date_create_from_format('d/m/Y', '1/8/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1264.5,
            'revenue' => 70000,
            'loss' => 690000,
            'fees' => 239210,
            'monday' => date_create_from_format('d/m/Y', '8/8/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1280.1,
            'revenue' => 0,
            'loss' => 1090000,
            'fees' => 363237,
            'monday' => date_create_from_format('d/m/Y', '15/8/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1281,
            'revenue' => 20000,
            'loss' => 350000,
            'fees' => 109253,
            'monday' => date_create_from_format('d/m/Y', '22/8/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1293,
            'revenue' => 2620000,
            'loss' => 0,
            'fees' => 36145,
            'monday' => date_create_from_format('d/m/Y', '29/8/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1293.9,
            'revenue' => 710000,
            'loss' => 0,
            'fees' => 143596,
            'monday' => date_create_from_format('d/m/Y', '5/9/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1275,
            'revenue' => 330000,
            'loss' => 0,
            'fees' => 47371,
            'monday' => date_create_from_format('d/m/Y', '12/9/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1237,
            'revenue' => 1320000,
            'loss' => 1030000,
            'fees' => 221489,
            'monday' => date_create_from_format('d/m/Y', '19/9/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1210,
            'revenue' => 840000,
            'loss' => 470000,
            'fees' => 146931,
            'monday' => date_create_from_format('d/m/Y', '26/9/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1150,
            'revenue' => 1310000,
            'loss' => 1770000,
            'fees' => 152189,
            'monday' => date_create_from_format('d/m/Y', '3/10/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1032.2,
            'revenue' => 2810000,
            'loss' => 1120000,
            'fees' => 114001,
            'monday' => date_create_from_format('d/m/Y', '10/10/2022'),
        ]);
        Trade::create([
            'amount' => 1,
            'scores' => 1048,
            'revenue' => 2600000,
            'loss' => 0,
            'fees' => 73716,
            'monday' => date_create_from_format('d/m/Y', '17/10/2022'),
        ]);
        Trade::create([
            'amount' => 2,
            'scores' => 985,
            'revenue' => 2640000,
            'loss' => 1600000,
            'fees' => 201717,
            'monday' => date_create_from_format('d/m/Y', '24/10/2022'),
        ]);
        Trade::create([
            'amount' => 2,
            'scores' => 1016,
            'revenue' => 4540000,
            'loss' => 0,
            'fees' => 205004,
            'monday' => date_create_from_format('d/m/Y', '31/10/2022'),
        ]);
        Trade::create([
            'amount' => 3,
            'scores' => 980,
            'revenue' => 7920000,
            'loss' => 0,
            'fees' => 215224,
            'monday' => date_create_from_format('d/m/Y', '7/11/2022'),
        ]);
        Trade::create([
            'amount' => 3,
            'scores' => 938,
            'revenue' => 3000000,
            'loss' => 0,
            'fees' => 148117,
            'monday' => date_create_from_format('d/m/Y', '14/11/2022'),
        ]);
    }
}
