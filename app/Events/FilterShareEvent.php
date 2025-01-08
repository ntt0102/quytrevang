<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;

class FilterShareEvent implements ShouldBroadcastNow
{
    use InteractsWithSockets, SerializesModels;

    public $filterProcess;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($filterProcess)
    {
        $this->filterProcess = $filterProcess;
        // $this->dontBroadcastToCurrentUser();
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [new PrivateChannel("trading-share")];
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'filtering-share';
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return ['process' => $this->filterProcess];
    }
}
