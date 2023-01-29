<?php

namespace App\Services\Admin\Setting;

use App\Services\CoreService;
use Illuminate\Support\Facades\Mail;
use App\Mails\BackupMail;


class DatabaseService extends CoreService
{
    private $username, $password, $host, $database, $directory;

    public function __construct()
    {
        $this->username = config('database.connections.mysql.username');
        $this->password = config('database.connections.mysql.password');
        $this->host = config('database.connections.mysql.host');
        $this->database = config('database.connections.mysql.database');
        $this->directory = storage_path() . "/app/backup/database/";
        // Delete old file
        array_map('unlink', array_filter((array) glob($this->directory . "*.sql")));
    }

    /**
     * Backup Database
     * 
     * @param $request
     *
     * @return array
     */
    public function backup($request)
    {
        // Expert
        $filename = $this->database . "-" . date('YmdHis') . ".sql";
        $command = "mysqldump --user=" . $this->username . " --password=" . $this->password . " --host=" . $this->host . " " . $this->database . " > " . $this->directory . $filename;
        exec($command);
        // Download
        $ret['isOk'] = is_file($this->directory . $filename);
        if ($ret['isOk']) {
            $ret['download'] = $request->download;
            if ($request->download) {
                $ret['file'] = $this->directory . $filename;
                $ret['filename'] = $filename;
                $ret['headers'] = ['Content-Type: application/sql'];
            }
            if ($request->sendMail) {
                $attachment['file'] = $this->directory . $filename;
                $attachment['filename'] = $filename;
                Mail::to(config('mail.from.address'))->send(new BackupMail($attachment));
            }
        }
        return $ret;
    }

    /**
     * Restore Database.
     * 
     * @param $request
     * 
     */
    public function restore($request)
    {
        $ret['isOk'] = $request->hasfile('file');
        if ($ret['isOk']) {
            // Move file
            $upload = $request->file('file');
            $filename = $upload->getClientOriginalName();
            $upload->move($this->directory, $filename);
            // Restore
            $command = "mysql --user=" . $this->username . " --password=" . $this->password . " --host=" . $this->host . " --force " . $this->database . " < " . $this->directory . $filename;
            exec($command);
        }
        return $ret;
    }
}
