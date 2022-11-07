<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\URL;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\ResetPassword;

class ResetPasswordNotification extends ResetPassword
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($token)
    {
        parent::__construct($token);
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        // $link = url("/change-password/" . $this->token);
        $link = URL::to('/') . '/change-password?token=' . $this->token;
        $path = 'Notifications/ResetPassword.';
        return (new MailMessage)
            ->markdown('emails.common')
            ->subject(trans($path . 'subject'))
            ->line(trans($path . 'line1'))
            ->action(trans($path . 'action'), $link)
            ->line(trans($path . 'line2', ['expire' => config('auth.passwords.users.expire')]))
            ->line(trans($path . 'line3'));
    }
}
