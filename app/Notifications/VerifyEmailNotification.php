<?php

namespace App\Notifications;

use Illuminate\Support\Facades\URL;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmailNotification extends VerifyEmail
{
    /**
     * Build the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $verificationUrl = $this->verificationUrl($notifiable);
        $path = 'Notifications/VerifyEmail.';
        return (new MailMessage)
            ->markdown('emails.common')
            ->subject(trans($path . 'subject'))
            ->line(trans($path . 'line1'))
            ->action(trans($path . 'action'), $verificationUrl)
            ->line(trans($path . 'line2'));
    }

    /**
     * Get the verification URL for the given notifiable.
     *
     * @param mixed $notifiable
     * @return string
     */
    protected function verificationUrl($notifiable)
    {
        $link = URL::to('/') . '/verify-email?url=';
        $temporarySignedURL = URL::temporarySignedRoute(
            'verification.verify',
            date_create()->modify('+1 hour'),
            ['id' => $notifiable->getKey()]
        );

        return $link . urlencode($temporarySignedURL);
    }
}
