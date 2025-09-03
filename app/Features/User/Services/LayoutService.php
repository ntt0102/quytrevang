<?php

namespace App\Features\User\Services;

use App\Services\CoreService;
use App\Models\Contract;
use App\Models\User;
use App\Models\Comment;

class LayoutService extends CoreService
{

    /**
     * Get the page's params
     *
     * @param $payload
     * 
     */
    public function getNotify($payload)
    {
        $user = request()->user();
        $types = $payload->types;
        $ret = [];
        if (in_array("notification", $types)) {
            $ret['notification'] = $user->unreadNotifications->count();
        }
        if ($user->can('admin:manage_users') && in_array("adminUser", $types)) {
            $ret['adminUser'] = User::whereNotNull('phone')->whereNull('deleted_at')
                ->where('documents', '[]')->count();
        }
        if ($user->can('admin:manage_contracts') && in_array("adminContract", $types)) {
            $ret['adminContract'] = Contract::orWhere(function ($query) {
                $query->where('paid_at', '<>', null)->where('paid_docs', '[]');
            })
                ->orWhere(function ($query) {
                    $query->where('withdrawn_at', '<>', null)->where('withdrawn_docs', '[]');
                })->count();
        }
        if ($user->can('admin:manage_comments') && in_array("adminComment", $types)) {
            $ret['adminComment'] = Comment::where('read', 0)->count();
        }

        return $ret;
    }
}
