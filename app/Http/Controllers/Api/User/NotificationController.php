<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\User\NotificationService;

class NotificationController extends CoreController
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        parent::__construct();
        $this->notificationService = $notificationService;
    }

    /**
     * Get user's notifications.
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getNotifications(Request $request)
    {
        $data = $this->notificationService->getNotifications($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Mark user's notification as read.
     *
     * @param \Illuminate\Http\Request $request
     * @param  int $id
     * 
     * @return \Illuminate\Http\Response
     */
    public function markAsRead(Request $request, $id)
    {
        $data = $this->notificationService->markAsRead($request, $id);
        return $this->sendResponse($data);
    }

    /**
     * Mark all user's notifications as read.
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function markAllRead(Request $request)
    {
        $data = $this->notificationService->markAllRead($this->payload);
        return $this->sendResponse($data);
    }

    /**
     * Mark the notification as read and dismiss it from other devices.
     *
     * This method will be accessed by the service worker
     * so the user is not authenticated and it requires an endpoint.
     *
     * @param \Illuminate\Http\Request $request
     * @param  int $id
     * 
     * @return \Illuminate\Http\Response
     */
    public function dismiss(Request $request, $id)
    {
        $data = $this->notificationService->dismiss($request, $id);
        if ($data['isOk'])
            return $this->sendResponse(true);
        else {
            return $this->sendError($data['msg'], $data['code']);
        }
    }
}
