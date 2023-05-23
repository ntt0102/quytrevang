<?php

namespace App\Services\Admin;

use App\Services\CoreService;
use App\Models\Comment;
use Illuminate\Support\Facades\Storage;

class CommentService extends CoreService
{

    /**
     * Return all the Methods.
     * 
     * @param $request
     *
     * @return array
     */
    public function fetch($request)
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
     * @param $request
     * 
     */
    public function markAsRead($request)
    {
        return $this->transaction(function () use ($request) {
            $comment = Comment::find($request->id);
            $comment->update(['read' => 1]);
        });
    }

    /**
     * Delete.
     * 
     * @param $request
     * 
     */
    public function delete($request)
    {
        return $this->transaction(function () use ($request) {
            $comments = Comment::find($request->ids);
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
