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
    public function fetch($request)
    {
        $user = $request->user();
        $types = $request->types;
        $ret = [];
        if (in_array("notification", $types)) {
            $ret['unreadNotificationsNumber'] = $user->unreadNotifications->count();
        }
        if ($user->can('contracts@control') && in_array("contracts", $types)) {
            $confirmingContractsNumber = $this->contractRepository->getConfirmingNumber();
            $ret['confirmingContractsNumber'] = $confirmingContractsNumber;
        }
        if ($user->can('users@control') && in_array("users", $types)) {
            $signingUsersNumber = $this->userRepository->getSigningNumber();
            $ret['signingUsersNumber'] = $signingUsersNumber;
        }
        if ($user->can('comments@control') && in_array("comments", $types)) {
            $unreadCommentsNumber = $this->commentRepository->getUnreadNumber();
            $ret['unreadCommentsNumber'] = $unreadCommentsNumber;
        }

        return $ret;
    }
}
