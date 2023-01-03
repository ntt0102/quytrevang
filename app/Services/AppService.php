<?php

namespace App\Services;

use App\Services\CoreService;
use Illuminate\Support\Facades\Notification;
use App\Notifications\SentCommentNotification;
use App\Repositories\ParameterRepository;
use App\Repositories\FaqRepository;
use App\Repositories\CommentRepository;
use App\Repositories\UserRepository;

class AppService extends CoreService
{
    private $parameterRepository;
    private $faqRepository;
    private $commentRepository;
    private $userRepository;

    public function __construct(
        ParameterRepository $parameterRepository,
        FaqRepository $faqRepository,
        CommentRepository $commentRepository,
        UserRepository $userRepository
    ) {
        $this->parameterRepository = $parameterRepository;
        $this->faqRepository = $faqRepository;
        $this->commentRepository = $commentRepository;
        $this->userRepository = $userRepository;
    }

    /**
     * Get the policy params
     *
     * @param $request
     * 
     */
    public function getPolicyParams($request)
    {
        $ret["interestRate"] = (float) $this->parameterRepository->getValue('interestRate', '0.005');
        $ret["principalMin"] = (int) $this->parameterRepository->getValue('principalMin');
        $ret["holdWeeksMin"] = (int) $this->parameterRepository->getValue('holdWeeksMin');
        $ret["faqs"] = $this->faqRepository->findAll();
        return $ret;
    }


    /**
     * Get the faqs
     *
     * @param $request
     * 
     */
    public function getFaqs($request)
    {
        return $this->faqRepository->findAll();
    }

    /**
     * Send Comment
     *
     * @param $request
     * 
     */
    public function sendComment($request)
    {
        return $this->transaction(
            function () use ($request) {
                $images = [];
                if ($request->hasfile('files')) {
                    $path = 'public/' . (!!$request->userCode ? md5($request->userCode) : 'guests') . '/r/';
                    foreach ($request->file('files') as $index => $file) {
                        $name = md5(time() . $index) . '.png';
                        $file->storeAs($path, $name);
                        $images[] = $name;
                    }
                }
                $data = [
                    "user_code" => $request->userCode ?? 0,
                    "name" => $request->name ?? NULL,
                    "phone" => $request->phone ?? NULL,
                    "subject" => $request->subject,
                    "content" => $request->content,
                    "images" => $images,
                ];
                $comment = $this->commentRepository->create($data);
                Notification::send(
                    $this->userRepository->getUsersHasPermission('comments@control'),
                    new SentCommentNotification($comment)
                );
                return ['isOk' => !!$comment];
            }
        );
    }

    /**
     * Get the contact
     *
     */
    public function getContact()
    {
        $pCode = (int) $this->parameterRepository->getValue('representUser');
        $contactUser = $this->userRepository->findByCode($pCode);
        return [
            'email' => config('mail.from.address'),
            'phone' => !!$contactUser ? $contactUser->phone : null,
        ];
    }
}
