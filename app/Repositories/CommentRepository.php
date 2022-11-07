<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\Comment;

class CommentRepository extends CoreRepository
{
    /**
     * @var Comment
     */
    protected $model;

    /**
     * CommentRepository constructor.
     *
     * @param Comment $model
     */
    public function __construct(Comment $model)
    {
        parent::__construct($model);
    }

    /**
     * @inheritdoc
     */
    public function getUnreadNumber()
    {
        return count($this->model->where('read', 0)->get());
    }
}
