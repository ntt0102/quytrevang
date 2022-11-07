<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Admin\Setting\ParameterService;
use App\Services\Admin\Setting\FaqService;
use App\Services\Admin\Setting\DatabaseService;
use App\Services\Admin\Setting\CommandService;
use App\Services\Admin\Setting\NotificationService;
use App\Services\Admin\Setting\FilesService;
use App\Services\Admin\Setting\LogService;
use App\Services\Admin\Setting\RoleService;
use App\Services\Admin\Setting\PermissionService;

class SettingController extends CoreController
{
    protected $parameterService;
    protected $faqService;
    protected $databaseService;
    protected $filesService;
    protected $roleService;
    protected $permissionService;

    public function __construct(
        ParameterService $parameterService,
        FaqService $faqService,
        DatabaseService $databaseService,
        FilesService $filesService,
        RoleService $roleService,
        PermissionService $permissionService
    ) {
        $this->parameterService = $parameterService;
        $this->faqService = $faqService;
        $this->databaseService = $databaseService;
        $this->filesService = $filesService;
        $this->roleService = $roleService;
        $this->permissionService = $permissionService;
    }

    /**
     * Get the Parameters
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function fetchParameters(Request $request)
    {
        $data = $this->parameterService->fetch($request);
        return $this->sendResponse($data);
    }

    /**
     * Save changed Parameters.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function saveParameters(Request $request)
    {
        $data = $this->parameterService->save($request);
        return $this->sendResponse($data);
    }

    /**
     * Get the Faqs
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function fetchFaqs(Request $request)
    {
        $data = $this->faqService->fetch($request);
        return $this->sendResponse($data);
    }

    /**
     * Save changed Faqs.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function saveFaqs(Request $request)
    {
        $data = $this->faqService->save($request);
        return $this->sendResponse($data);
    }

    /**
     * Backup Databases
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function backupDatabase(Request $request)
    {
        set_time_limit(300);
        $data = $this->databaseService->backup($request);
        if ($data['isOk'] && $data['download']) {
            return $this->sendDownload($data);
        }
        return $this->sendResponse($data);
    }

    /**
     * Restore Databases.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function restoreDatabase(Request $request)
    {
        set_time_limit(300);
        $data = $this->databaseService->restore($request);
        return $this->sendResponse($data);
    }

    /**
     * Run Command.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function runCommand(Request $request)
    {
        set_time_limit(300);
        $data = app(CommandService::class)->run($request);
        return $this->sendResponse($data);
    }

    /**
     * Send Notification.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function sendNotification(Request $request)
    {
        $data = app(NotificationService::class)->send($request);
        return $this->sendResponse($data);
    }

    /**
     * Get Items
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getItems(Request $request)
    {
        $data = $this->filesService->getItems($request);
        return $this->sendResponse($data);
    }

    /**
     * Create Directory
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function createDirectory(Request $request)
    {
        $isOk = $this->filesService->createDirectory($request);
        return $this->sendResponse($isOk);
    }

    /**
     * Rename Item.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function renameItem(Request $request)
    {
        $isOk = $this->filesService->renameItem($request);
        return $this->sendResponse($isOk);
    }

    /**
     * Delete Item.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function deleteItem(Request $request)
    {
        $isOk = $this->filesService->deleteItem($request);
        return $this->sendResponse($isOk);
    }

    /**
     * Copy Item.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function copyItem(Request $request)
    {
        $isOk = $this->filesService->copyItem($request);
        return $this->sendResponse($isOk);
    }

    /**
     * Move Item.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function moveItem(Request $request)
    {
        $isOk = $this->filesService->moveItem($request);
        return $this->sendResponse($isOk);
    }

    /**
     * Upload File Chunk.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function uploadFileChunk(Request $request)
    {
        $isOk = $this->filesService->uploadFileChunk($request);
        return $this->sendResponse($isOk);
    }

    /**
     * Get all logs.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function fetchLog(Request $request)
    {
        $data = app(LogService::class)->fetch($request);
        return $this->sendResponse($data);
    }

    /**
     * Get the roles
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function fetchRoles(Request $request)
    {
        $data = $this->roleService->fetch($request);
        return $this->sendResponse($data);
    }

    /**
     * Save changed roles.
     *
     * @param Illuminate\Http\Request $request
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function saveRoles(Request $request)
    {
        $data = $this->roleService->save($request);
        return $this->sendResponse($data);
    }

    /**
     * Validate Duplicate Name
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function validateDuplicateRoleName(Request $request)
    {
        $isOk = $this->roleService->validateDuplicateName($request);
        return $this->sendResponse($isOk);
    }

    /**
     * Get the Permissions
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function fetchPermissions(Request $request)
    {
        $data = $this->permissionService->fetch($request);
        return $this->sendResponse($data);
    }

    /**
     * Save changed Permissions.
     *
     * @param Illuminate\Http\Request $request
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function savePermissions(Request $request)
    {
        $data = $this->permissionService->save($request);
        return $this->sendResponse($data);
    }

    /**
     * Validate Duplicate Name
     *
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function validateDuplicatePermissionName(Request $request)
    {
        $isOk = $this->permissionService->validateDuplicateName($request);
        return $this->sendResponse($isOk);
    }
}
