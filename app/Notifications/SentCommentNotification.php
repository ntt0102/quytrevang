<?php

namespace App\Notifications;

use App\Notifications\CoreNotification;
use App\Models\Comment;

class SentCommentNotification extends CoreNotification
{
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Comment $comment)
    {
        $path = 'Notifications/SentComment.';
        $params = [
            'event' => 'sent-comment',
            'title' => trans($path . 'title', ['userName' => !!$comment->name ? $comment->name : $comment->user->name]),
            'body' => $comment->subject,
            'icon' => !!$comment->user ? $comment->user->url_avatar : 'images/no-avatar.png',
            'actions' => [
                [
                    'action' =>  trans($path . 'actionUrl'),
                    'title' => trans($path . 'actionTitle'),
                ],
            ],
        ];
        if (!!count($comment->url_images)) $params['image'] = $comment->url_images[0];
        parent::__construct($params);
    }
}
