<?php

namespace App\Features\User\Controllers;

use App\Http\Controllers\CoreController;
use Illuminate\Http\Request;
use App\Features\User\Services\ProfileService;

class ProfileController extends CoreController
{
    protected $profileService;

    public function __construct(ProfileService $profileService)
    {
        parent::__construct();
        $this->profileService = $profileService;
    }

    /**
     * Get the profile
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function fetch(Request $request)
    {
        $data = $this->profileService->fetch($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Update the profile
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request)
    {
        $data = $this->profileService->save($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Change the password
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function changePassword(Request $request)
    {
        $isOk = $this->profileService->changePassword($this->payload);
        return $this->sendResponse($isOk);
    }

    /**
     * Change the PIN
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function changePin(Request $request)
    {
        $data = $this->profileService->changePin($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Change the avatar
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function changeAvatar(Request $request)
    {
        $data = $this->profileService->changeAvatar($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Delete account
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request)
    {
        $data = $this->profileService->delete($this->payload);
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
        $isOk = $this->profileService->validateDuplicate($this->payload);
        return $this->sendResponse($isOk);
    }
}
