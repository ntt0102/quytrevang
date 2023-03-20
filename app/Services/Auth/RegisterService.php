<?php

namespace App\Services\Auth;

use Illuminate\Support\Facades\Notification;
use App\Notifications\RegisteredUserNotification;
use App\Services\CoreService;
use App\Repositories\UserRepository;
use App\Repositories\SmartOrderRepository;

class RegisterService extends CoreService
{
    private $userRepository;
    private $smartOrderRepository;

    public function __construct(
        UserRepository $userRepository,
        SmartOrderRepository $smartOrderRepository
    ) {
        $this->userRepository = $userRepository;
        $this->smartOrderRepository = $smartOrderRepository;
    }

    /**
     * Register new user.
     * 
     * @param $request
     *
     * @return array
     */
    public function createAccount($request)
    {
        return $this->transaction(function () use ($request) {
            $clientIp = $request->ip();
            if ($request->chanel == 'SmartOrder') {
                if ($this->smartOrderRepository->hasDevice($clientIp))
                    return ['isOk' => false, 'message' => 'deviceExist'];
            }
            if (count($this->userRepository->where([['email', $request->email]])) != 0)
                return ['isOk' => false, 'message' => 'emailExist'];
            if (count($this->userRepository->where([['phone', $request->phone]])) != 0)
                return ['isOk' => false, 'message' => 'phoneExist'];
            //
            $data = [
                'code' => $this->userRepository->generateUniqueCode(),
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => bcrypt($request->password),
            ];
            $user = $this->userRepository->create($data);
            //
            if (empty($user)) return ['isOk' => false];
            //
            if ($request->chanel == 'SmartOrder') {
                $this->smartOrderRepository->create([
                    'user_code' => $user->code,
                    'started_at' => date('Y-m-d'),
                    'periods' => '7 days',
                    'device_limit' => 2,
                    'devices' => [$clientIp]
                ]);
            } else
                $this->userRepository->sendEmailVerificationNotification($user);
            //
            $user->assignRole('user');
            //
            $tokenResult = $this->userRepository->createToken($user);
            $token = $tokenResult->token;
            $token->expires_at = date_create()->modify('+1 day');
            $token->save();

            Notification::send(
                $this->userRepository->getUsersHasPermission('users@control'),
                new RegisteredUserNotification($user)
            );

            return [
                'isOk' => true,
                'user' => $this->userRepository->getAuthUser($user),
                'token' => [
                    'expires_at' => date_create($tokenResult->token->expires_at)->format('Y-m-d H:i:s'),
                    'access_token' => $tokenResult->accessToken
                ]
            ];
        });
    }

    /**
     * Validate Duplicate Email
     * 
     * @param $request
     */
    public function validateDuplicateEmail($request)
    {
        $users = $this->userRepository->where([['email', $request->email]]);
        return count($users) == 0;
    }
}
