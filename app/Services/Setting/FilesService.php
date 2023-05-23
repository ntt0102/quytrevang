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
     * @param $request
     * @return array
     */
    public function getItems($request)
    {
        $rootPath = FilesService::ROOT_PATH . $request->clientPath . (!!$request->clientPath ? '/' : '');
        return $this->scan($rootPath . $request->path . (!!$request->path ? '/' : ''));
    }

    /**
     * Create Directory.
     * 
     * @param $request
     * @return array
     */
    public function createDirectory($request)
    {
        $rootPath = FilesService::ROOT_PATH . $request->clientPath . (!!$request->clientPath ? '/' : '');
        $path = $rootPath . $request->path . '/' . $request->name;
        if (Storage::exists($path)) return false;
        return Storage::makeDirectory($path);
    }

    /**
     * Rename Item.
     * 
     * @param $request
     * 
     */
    public function renameItem($request)
    {
        try {
            $rootPath = FilesService::ROOT_PATH . $request->clientPath . (!!$request->clientPath ? '/' : '');
            $path = $rootPath . $request->path . '/';
            return Storage::move($path . $request->oldName, $path . $request->newName);
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Delete Item.
     * 
     * @param $request
     * 
     */
    public function deleteItem($request)
    {
        $rootPath = FilesService::ROOT_PATH . $request->clientPath . (!!$request->clientPath ? '/' : '');
        $path = $rootPath . $request->path;
        if ($request->isDirectory)
            return Storage::deleteDirectory($path);
        else return Storage::delete($path);
    }

    /**
     * Copy Item.
     * 
     * @param $request
     * 
     */
    public function copyItem($request)
    {
        try {
            $rootPath = FilesService::ROOT_PATH . $request->clientPath . (!!$request->clientPath ? '/' : '');
            $fromPath = $rootPath . $request->fromPath . '/';
            $toPath = $rootPath . $request->toPath . '/';
            return Storage::copy($fromPath . $request->name, $toPath . $request->name);
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Move Item.
     * 
     * @param $request
     * 
     */
    public function moveItem($request)
    {
        try {
            $rootPath = FilesService::ROOT_PATH . $request->clientPath . (!!$request->clientPath ? '/' : '');
            $fromPath = $rootPath . $request->fromPath . '/';
            $toPath = $rootPath . $request->toPath . '/';
            return Storage::move($fromPath . $request->name, $toPath . $request->name);
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Upload File Chunk.
     * 
     * @param $request
     * 
     */
    public function uploadFileChunk($request)
    {
        $rootPath = FilesService::ROOT_PATH . $request->clientPath . (!!$request->clientPath ? '/' : '');
        $path = $rootPath . $request->path;
        $path = $request->file('file')->storeAs($path, $request->name);
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
