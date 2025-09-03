<?php

namespace App\Features\Admin\Services;

use App\Services\CoreService;
use App\Models\Comment;
use Illuminate\Support\Facades\Storage;

class CommentService extends CoreService
{

    /**
     * Return all the Methods.
     * 
     * @param $payload
     *
     * @return array
     */
    public function fetch($payload)
    {
        $comments = Comment::all();
        $comments = $comments->map(function ($comment) {
            if (!!$comment->user_code) {
                $comment->name = $comment->user->name;
                $comment->phone = $comment->user->phone;
            }
            $comment->images = $comment->images;
            $comment->sent_at = $comment->created_at->format('d/m/Y H:i');
            return $comment;
        });
        return $comments;
    }

    /**
     * Mark As Read.
     * 
     * @param $payload
     * 
     */
    public function markAsRead($payload)
    {
        return $this->transaction(function () use ($payload) {
            $comment = Comment::find($payload->id);
            return $comment->update(['read' => 1]);
        });
    }

    /**
     * Delete.
     * 
     * @param $payload
     * 
     */
    public function delete($payload)
    {
        return $this->transaction(function () use ($payload) {
            $comments = Comment::find($payload->ids);
            foreach ($comments as $comment) {
                $path = 'public/' . (!!$comment->user_code ? md5($comment->user_code) : 'guests') . '/r/';
                $isOk = $comment->delete();
                if ($isOk && !!$comment->images) {
                    foreach ($comment->images as $image) {
                        if (Storage::exists($path . $image)) Storage::delete($path . $image);
                    }
                }
                if (!$isOk) break;
            }
            return ['isOk' => $isOk];
        });
    }
}
