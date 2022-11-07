<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class ReadNotificationEvent implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $userId;

    /**
     * Create a new event instance.
     *
     * @param  int $userId
     * @return void
     */
    public function __construct($userId)
    {
        $this->userId = $userId;
        // $this->dontBroadcastToCurrentUser();
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [new PrivateChannel("user-{$this->userId}")];
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'read-notification';
    }
}
