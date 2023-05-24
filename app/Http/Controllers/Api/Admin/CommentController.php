<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Admin\CommentService;

class CommentController extends CoreController
{
    protected $commentService;

    public function __construct(CommentService $commentService)
    {
        parent::__construct();
        $this->commentService = $commentService;
    }

    /**
     * Get the Comments
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function fetch(Request $request)
    {
        $data = $this->commentService->fetch($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Mark As Read.
     *
     * @param Illuminate\Http\Request $request
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function markAsRead(Request $request)
    {
        $this->commentService->markAsRead($this->payload);
        return $this->sendResponse();
    }

    /**
     * Delete
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request)
    {
        $data = $this->commentService->delete($this->payload);
        return $this->fetch($this->payload);
    }
}
