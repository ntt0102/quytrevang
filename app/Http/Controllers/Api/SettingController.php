<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\CoreController;
use Illuminate\Http\Request;
use App\Services\Setting\ParameterService;
use App\Services\Setting\FaqService;
use App\Services\Setting\DatabaseService;
use App\Services\Setting\CommandService;
use App\Services\Setting\NotificationService;
use App\Services\Setting\FilesService;
use App\Services\Setting\LogService;
use App\Services\Setting\RoleService;
use App\Services\Setting\PermissionService;

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
        parent::__construct();
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
        $data = $this->parameterService->fetch($this->payload);
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
        $data = $this->parameterService->save($this->payload);
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
        $data = $this->faqService->fetch($this->payload);
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
        $data = $this->faqService->save($this->payload);
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
        $data = $this->databaseService->backup($this->payload);
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
        $data = $this->databaseService->restore($this->payload);
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
        $data = app(CommandService::class)->run($this->payload);
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
        $data = app(NotificationService::class)->send($this->payload);
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
        $data = $this->filesService->getItems($this->payload);
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
        $isOk = $this->filesService->createDirectory($this->payload);
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
        $isOk = $this->filesService->renameItem($this->payload);
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
        $isOk = $this->filesService->deleteItem($this->payload);
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
        $isOk = $this->filesService->copyItem($this->payload);
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
        $isOk = $this->filesService->moveItem($this->payload);
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
        $data = app(LogService::class)->fetch($this->payload);
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
        $data = $this->roleService->fetch($this->payload);
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
        $data = $this->roleService->save($this->payload);
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
        $isOk = $this->roleService->validateDuplicateName($this->payload);
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
        $data = $this->permissionService->fetch($this->payload);
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
        $data = $this->permissionService->save($this->payload);
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
        $isOk = $this->permissionService->validateDuplicateName($this->payload);
        return $this->sendResponse($isOk);
    }
}
