<?php

namespace App\Mails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BackupMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The user instance.
     *
     * @var User
     */
    public $attachment;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($attachment)
    {
        $this->attachment = $attachment;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $time = date('d-m-Y H:i:s');
        $email = $this->subject('[' . $time . '] Sao lưu dữ liệu')
            ->markdown('emails.backup')
            ->attach($this->attachment['file'], ['as' => $this->attachment['filename'], 'mime' => 'application/sql']);
        return $email;
    }
}
