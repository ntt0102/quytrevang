<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\User\ProfileService;

class ProfileController extends CoreController
{
    protected $profileService;

    public function __construct(ProfileService $profileService)
    {
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
        $data = $this->profileService->fetch($request);
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
        $data = $this->profileService->save($request);
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
        $isOk = $this->profileService->changePassword($request);
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
        $data = $this->profileService->changePin($request);
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
        $data = $this->profileService->changeAvatar($request);
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
        $data = $this->profileService->delete($request);
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
        $isOk = $this->profileService->validateDuplicate($request);
        return $this->sendResponse($isOk);
    }
}
