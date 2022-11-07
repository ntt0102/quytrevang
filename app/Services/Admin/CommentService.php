<?php

namespace App\Services\Admin;

use App\Services\CoreService;
use App\Repositories\CommentRepository;
use Illuminate\Support\Facades\Storage;

class CommentService extends CoreService
{
    private $commentRepository;

    public function __construct(
        CommentRepository $commentRepository
    ) {
        $this->commentRepository = $commentRepository;
    }

    /**
     * Return all the Methods.
     * 
     * @param $request
     *
     * @return array
     */
    public function fetch($request)
    {
        $comments = $this->commentRepository->findAll();
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
            $comment = $this->commentRepository->findById($request->id);
            $this->commentRepository->update($comment, ['read' => 1]);
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
            $comments = $this->commentRepository->findByIds($request->ids);
            foreach ($comments as $comment) {
                $path = 'public/' . (!!$comment->user_code ? md5($comment->user_code) : 'guests') . '/r/';
                $isOk = $this->commentRepository->delete($comment);
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
