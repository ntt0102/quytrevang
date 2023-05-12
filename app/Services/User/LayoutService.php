<?php

namespace App\Services\User;

use App\Services\CoreService;
use App\Repositories\ContractRepository;
use App\Repositories\UserRepository;
use App\Repositories\CommentRepository;

class LayoutService extends CoreService
{
    private $contractRepository;
    private $userRepository;
    private $commentRepository;

    public function __construct(
        ContractRepository $contractRepository,
        UserRepository $userRepository,
        CommentRepository $commentRepository
    ) {
        $this->contractRepository = $contractRepository;
        $this->userRepository = $userRepository;
        $this->commentRepository = $commentRepository;
    }

    /**
     * Get the page's params
     *
     * @param $request
     * 
     */
    public function getNotify($request)
    {
        $user = $request->user();
        $types = $request->types;
        $ret = [];
        if (in_array("notification", $types)) {
            $ret['notification'] = $user->unreadNotifications->count();
        }
        if ($user->can('users@control') && in_array("adminUser", $types)) {
            $ret['adminUser'] = $this->userRepository->getSigningNumber();
        }
        if ($user->can('contracts@control') && in_array("adminContract", $types)) {
            $ret['adminContract'] = $this->contractRepository->getConfirmingNumber();
        }
        if ($user->can('comments@control') && in_array("adminComment", $types)) {
            $ret['adminComment'] = $this->commentRepository->getUnreadNumber();
        }

        return $ret;
    }
}
