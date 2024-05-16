<?php

namespace App\Models;

use App\Models\CoreModel;

class Comment extends CoreModel
{
    protected $visible = [
        'id',
        'user_code',
        'name',
        'phone',
        'subject',
        'content',
        'url_images',
        'read',
        'sent_at'
    ];

    protected $fillable = [
        'user_code',
        'name',
        'phone',
        'subject',
        'content',
        'images',
        'read'
    ];

    protected static $logAttributes = ['subject', 'read'];

    protected static $recordEvents = ['updated', 'deleted'];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'images' => 'array',
    ];

    protected $attributes = [
        'images' => '[]',
    ];

    /**
     * The attributes that it available in the json response.
     *
     * @var array
     */
    protected $appends = ['url_images'];

    /**
     * Get the url image
     *
     * @param  string  $value
     * @return string
     */
    public function getUrlImagesAttribute()
    {
        $code = !!$this->user ? $this->user->code : null;
        return array_map(function ($image) use ($code) {
            return get_url_image(
                'storage/' . (!!$code ? md5($code) : 'guests') . '/r/' . $image
            );
        }, !!$this->images ? $this->images : []);
    }

    /**
     * Get the user that owns the comment.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_code', 'code');
    }
}
