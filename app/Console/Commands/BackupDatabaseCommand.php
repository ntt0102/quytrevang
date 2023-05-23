<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\Setting\DatabaseService;

class BackupDatabaseCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'database:backup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Backup Database';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        if (get_global_value('changedDatabaseFlag') == '1') {
            $db = new DatabaseService();
            $db->backup((object)[
                'download' => false,
                'sendMail' => true,
            ]);
            //
            set_global_value('changedDatabaseFlag', '0');
        }
    }
}
