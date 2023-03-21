<?php

namespace App\Repositories;

use App\Repositories\CoreRepository;
use App\Models\User;
use App\Notifications\VerifyEmailNotification;

class UserRepository extends CoreRepository
{
    /**
     * UserRepository constructor.
     *
     * @param User $model
     */
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    /**
     * Get the auth user
     * 
     * @param User $model
     *
     * @return object $user
     */
    public function getAuthUser($model)
    {
        return [
            'id' => $model->id,
            'code' => $model->code,
            'name' => $model->name,
            'sex' => $model->sex,
            'email' => $model->email,
            'phone' => $model->phone,
            'level' => $model->level,
            'avatar' => $model->url_avatar,
            'permissions' => $model->getAllPermissions()->pluck('name'),
            'webauthn' => $model->webAuthnCredentials->count() > 0
        ];
    }

    /**
     * @inheritdoc
     */
    public function findByCode($code)
    {
        return $this->model->where('code', $code)->first();
    }

    /**
     * Check verified email
     *
     * @param User $model
     * 
     * @param bool
     */
    public function hasVerifiedEmail($model)
    {
        return $model->hasVerifiedEmail();
    }

    /**
     * Mark Email As Verified
     *
     * @param User $model
     */
    public function markEmailAsVerified($model)
    {
        $model->markEmailAsVerified();
    }

    /**
     * Send a verify email
     *
     * @param User $model
     */
    public function sendEmailVerificationNotification($model)
    {
        $model->notify(new VerifyEmailNotification);
    }

    /**
     * get from creadentialId
     * 
     * @param string $credentialId
     * 
     * @return User $user
     */
    public function getFromCredentialId($credentialId)
    {
        return User::getFromCredentialId($credentialId);
    }

    /**
     * Create the token
     * 
     * @param User $model
     * 
     * @return $token
     */
    public function createToken($model)
    {
        return $model->createToken(config('app.name'));
    }

    /**
     * Revoke the token
     * 
     * @param User $model
     */
    public function revokeToken($model)
    {
        $model->token()->revoke();
    }

    /**
     * Destroy the user
     * 
     * @param $id
     */
    public function forceDelete($id)
    {
        $this->model->withTrashed()->findOrFail($id)->forceDelete();
    }

    /**
     * Restore the user
     * 
     * @param $id
     */
    public function restore($id)
    {
        $this->model->withTrashed()->findOrFail($id)->restore();
    }

    /**
     * @inheritdoc
     */
    public function findActivedAll($columns = ['*'], $orderBy = ['id', 'asc'])
    {
        return $this->model->active()->withTrashed()
            ->when(!empty($orderBy), function ($query) use ($orderBy) {
                $pairs = array_chunk($orderBy, 2);
                foreach ($pairs as $pair) {
                    $query->orderBy(...$pair);
                }
            })->get($columns);
    }

    /**
     * @inheritdoc
     */
    public function getSigningNumber()
    {
        return count($this->model->whereNotNull('phone')->whereNull('deleted_at')
            ->where('documents', '[]')->get());
    }

    /**
     * @inheritdoc
     */
    public function getUsersHasPermission($permission)
    {
        return User::permission($permission)->get();
    }

    /**
     * @inheritdoc
     */
    public function generateUniqueCode()
    {
        do {
            $code = random_int(100000, 999999);
        } while (User::where('code', $code)->first());

        return $code;
    }

    /**
     * @inheritdoc
     */
    public function hasOpeningContract()
    {

        return true;
    }
}
