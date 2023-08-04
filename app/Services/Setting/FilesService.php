<?php

namespace App\Services\Setting;

use App\Services\CoreService;
use Illuminate\Support\Facades\Storage;

class FilesService extends CoreService
{
    private const ROOT_PATH = 'public/';
    public function __construct()
    {
    }

    /**
     * Get Items.
     * 
     * @param $payload
     * @return array
     */
    public function getItems($payload)
    {
        $rootPath = FilesService::ROOT_PATH . $payload->clientPath . (!!$payload->clientPath ? '/' : '');
        return $this->scan($rootPath . $payload->path . (!!$payload->path ? '/' : ''));
    }

    /**
     * Create Directory.
     * 
     * @param $payload
     * @return array
     */
    public function createDirectory($payload)
    {
        $rootPath = FilesService::ROOT_PATH . $payload->clientPath . (!!$payload->clientPath ? '/' : '');
        $path = $rootPath . $payload->path . '/' . $payload->name;
        if (Storage::exists($path)) return false;
        return Storage::makeDirectory($path);
    }

    /**
     * Rename Item.
     * 
     * @param $payload
     * 
     */
    public function renameItem($payload)
    {
        try {
            $rootPath = FilesService::ROOT_PATH . $payload->clientPath . (!!$payload->clientPath ? '/' : '');
            $path = $rootPath . $payload->path . '/';
            return Storage::move($path . $payload->oldName, $path . $payload->newName);
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Delete Item.
     * 
     * @param $payload
     * 
     */
    public function deleteItem($payload)
    {
        $rootPath = FilesService::ROOT_PATH . $payload->clientPath . (!!$payload->clientPath ? '/' : '');
        $path = $rootPath . $payload->path;
        if ($payload->isDirectory)
            return Storage::deleteDirectory($path);
        else return Storage::delete($path);
    }

    /**
     * Copy Item.
     * 
     * @param $payload
     * 
     */
    public function copyItem($payload)
    {
        try {
            $rootPath = FilesService::ROOT_PATH . $payload->clientPath . (!!$payload->clientPath ? '/' : '');
            $fromPath = $rootPath . $payload->fromPath . '/';
            $toPath = $rootPath . $payload->toPath . '/';
            return Storage::copy($fromPath . $payload->name, $toPath . $payload->name);
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Move Item.
     * 
     * @param $payload
     * 
     */
    public function moveItem($payload)
    {
        try {
            $rootPath = FilesService::ROOT_PATH . $payload->clientPath . (!!$payload->clientPath ? '/' : '');
            $fromPath = $rootPath . $payload->fromPath . '/';
            $toPath = $rootPath . $payload->toPath . '/';
            return Storage::move($fromPath . $payload->name, $toPath . $payload->name);
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Upload File Chunk.
     * 
     * @param $payload
     * 
     */
    public function uploadFileChunk($payload)
    {
        $rootPath = FilesService::ROOT_PATH . $payload->clientPath . (!!$payload->clientPath ? '/' : '');
        $path = $rootPath . $payload->path;
        if (!$payload->hasFile('file')) return false;
        $path = $payload->file('file')->storeAs($path, $payload->name);
        return !!$path;
    }

    /**
     * Scan.
     * 
     * @param $path
     * 
     */
    private function scan($path)
    {
        $output = [];
        $files = Storage::files($path);
        foreach ($files as $file) {
            $name = str_replace($path, '', $file);
            if ($name != '.gitignore') {
                $obj = new \stdClass();
                $obj->name = $name;
                $obj->isDirectory = false;
                $obj->size = Storage::size($file);
                $obj->lastModified = date('d/m/Y', Storage::lastModified($file));
                $output[] = $obj;
            }
        }
        $directories = Storage::directories($path);
        foreach ($directories as $directory) {
            $obj = new \stdClass();
            $obj->name = str_replace($path, '', $directory);
            $obj->isDirectory = true;
            $obj->items = $this->scan($directory);
            $output[] = $obj;
        }
        return $output;
    }
}
