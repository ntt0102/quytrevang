<?php

namespace App\Services\Admin;

use App\Services\CoreService;
use App\Models\User;
use App\Models\Copyist;
use Illuminate\Support\Facades\Storage;

class CopyistService extends CoreService
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
        $copyists = Copyist::all();
        $users = User::withTrashed()->get(['code', 'name']);
        return [
            'copyists' => $copyists,
            'users' => $users,
        ];
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
            $comment = Copyist::find($request->id);
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
            $comments = Copyist::find($request->ids);
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
