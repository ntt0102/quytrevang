<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Admin\UserService;

class UserController extends CoreController
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        parent::__construct();
        $this->userService = $userService;
    }

    /**
     * Get the users
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function fetch(Request $request)
    {
        $data = $this->userService->fetch($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Save changed users.
     *
     * @param Illuminate\Http\Request $request
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request)
    {
        $data = $this->userService->save($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Save deleted user.
     *
     * @param Illuminate\Http\Request $request
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function saveDeletedUser(Request $request)
    {
        $data = $this->userService->saveDeletedUser($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Upload documents
     *
     * @param Illuminate\Http\Request $request
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function uploadDocuments(Request $request)
    {
        $data = $this->userService->uploadDocuments($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Validate Duplicate
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function validateDuplicate(Request $request)
    {
        $isOk = $this->userService->validateDuplicate($this->payload);
        return $this->sendResponse($isOk);
    }

    /**
     * get contract info
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getContractInfo(Request $request)
    {
        $data = $this->userService->getContractInfo($this->payload);
        return $this->sendResponse($data);
    }
}
