<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\SoftDeletes;
use NotificationChannels\WebPush\HasPushSubscriptions;
use Spatie\Activitylog\Traits\LogsActivity;
use App\Notifications\ResetPasswordNotification;

class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable;
    use HasFactory;
    use HasApiTokens;
    use HasRoles;
    use SoftDeletes;
    use HasPushSubscriptions;
    // use LogsActivity;

    protected $guard_name = 'api';

    protected $visible = [
        'id',
        'code',
        'name',
        'email',
        'phone',
        'sex',
        'birthday',
        'address',
        'url_avatar',
        'roles',
        'permissions',
        'url_documents',
        'bank_account',
        'identity',
        'deleted_at',
        'level'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code',
        'name',
        'password',
        'pin',
        'webauthn',
        'email',
        'phone',
        'sex',
        'birthday',
        'address',
        'avatar',
        'documents',
        'bank_account',
        'identity'
    ];

    protected static $logAttributes = [
        'code',
        'name',
        'email',
        'phone',
        'sex',
        'birthday',
        'address',
        'avatar',
        'documents',
        'bank_account',
        'identity',
        'deleted_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'pin', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'documents' => 'array',
        'bank_account' => 'array',
        'identity' => 'array',
    ];

    /**
     * The attributes that it available in the json response.
     *
     * @var array
     */
    protected $appends = ['level', 'url_avatar', 'url_documents'];

    /**
     * Get the base64 avatar.
     *
     * @param  string  $value
     * @return string
     */
    public function getUrlAvatarAttribute()
    {

        return get_url_image(
            'storage/' . md5($this->code) . '/u/a/' . $this->avatar,
            'images/no-avatar.png'
        );
    }

    /**
     * Get the url documents
     *
     * @param  string  $value
     * @return string
     */
    public function getUrlDocumentsAttribute()
    {
        return array_map(function ($doc) {
            $doc['file'] = get_url_image(
                'storage/' . md5($this->code) . '/u/d/' . $doc['file']
            );
            return  $doc;
        }, !!$this->documents ? $this->documents : []);
    }

    /**
     * Get the level.
     *
     * @param  string  $value
     * @return string
     */
    public function getLevelAttribute()
    {
        $level = 1;
        if (!$this->email_verified_at) return $level;
        $level++; //2
        if (!$this->pin) return $level;
        $level++; //3
        if (!$this->phone) return $level;
        $level++; //4
        if (!collect($this->documents)->filter(function ($el) {
            return $el['type'] == 'contract';
        })->count()) return $level;
        $level++; //5
        if (!$this->contracts->count()) return $level;
        $level++; //6
        if (!$this->contracts->filter(function ($el) {
            return $el->withdrawn_docs == [];
        })->count()) return $level;
        $level++; //7
        return $level;
    }

    /**
     * Get the contracts for the user.
     */
    public function contracts()
    {
        return $this->hasMany(Contract::class, 'user_code', 'code');
    }


    /**
     * Get the comments for the user.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Get Copyist.
     */
    public function copyist()
    {
        return $this->hasOne(Copyist::class, 'user_code', 'code');
    }

    /**
     * The channels the user receives notification broadcasts on.
     *
     * @return string
     */
    public function receivesBroadcastNotificationsOn()
    {
        return 'user-' . $this->id;
    }

    // /**
    //  * Scope a query to only include active users.
    //  *
    //  * @param  \Illuminate\Database\Eloquent\Builder  $query
    //  * @return \Illuminate\Database\Eloquent\Builder
    //  */
    // public function scopeActive($query)
    // {
    //     return $query->whereNull('deleted_at')->whereNotNull('email_verified_at');
    // }

    /**
     * Override the mail body for reset password notification mail.
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    /**
     * Get Auth Info
     */
    public function getAuthInfo()
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'sex' => $this->sex,
            'email' => $this->email,
            'phone' => $this->phone,
            'level' => $this->level,
            'avatar' => $this->url_avatar,
            'permissions' => $this->getAllPermissions()->pluck('name'),
            'webauthn' => !!$this->webauthn
        ];
    }

    /**
     * Create code
     */
    static public function generateUniqueCode()
    {
        do {
            $code = random_int(100000, 999999);
        } while (User::where('code', $code)->first());

        return $code;
    }
}
