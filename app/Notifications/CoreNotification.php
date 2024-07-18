<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use NotificationChannels\WebPush\WebPushMessage;
use NotificationChannels\WebPush\WebPushChannel;
use Illuminate\Support\Carbon;

class CoreNotification extends Notification
{
    use Queueable;

    private $params;
    private $hasDatabase;
    private $hasBroadcast;
    private $hasWebPush;


    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(array $params, $hasDatabase = true, $hasBroadcast = true, $hasWebPush = true)
    {
        $this->hasDatabase = $hasDatabase;
        $this->hasBroadcast = $hasBroadcast;
        $this->hasWebPush = $hasWebPush;

        if (!isset($params['hasDatabase'])) {
            $params['hasDatabase'] = "core";
        }
        if (!isset($params['event'])) {
            $params['event'] = "core";
        }
        if (!isset($params['icon'])) {
            $params['icon'] = "/images/android-chrome-512x512.png";
        }
        if (!isset($params['title'])) {
            $params['title'] = config("app.name");
        }
        $params['badge'] = "/images/badge-128x128.png";

        $this->params = $params;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        $channels = [];
        if ($this->hasDatabase) $channels[] = 'database';
        if ($this->hasBroadcast) $channels[] = 'broadcast';
        if ($this->hasWebPush) $channels[] = WebPushChannel::class;
        return $channels;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return $this->params;
    }

    public function toBroadcast($notifiable)
    {
        return (new BroadcastMessage($this->params))->onConnection('sync');
    }

    /**
     * Get the web push representation of the notification.
     *
     * @param  mixed  $notifiable
     * @param  mixed  $notification
     * @return \Illuminate\Notifications\Messages\DatabaseMessage
     */
    public function toWebPush($notifiable, $notification)
    {
        $msg = (new WebPushMessage)
            ->body($this->params['body'])
            ->title($this->params['title'])
            ->icon($this->params['icon'])
            ->badge($this->params['badge'])
            ->data(['id' => $notification->id, 'event' => $this->params['event']]);

        if (isset($this->params['image'])) $msg->image($this->params['image']);
        if (isset($this->params['actions'])) {
            foreach ($this->params['actions'] as $action) {
                $msg->action($action['title'], $action['action']);
            }
        }

        return $msg;
    }
}
