<?php

namespace App\Services;

use App\Services\CoreService;
use Illuminate\Support\Facades\Notification;
use App\Notifications\SentCommentNotification;
use App\Models\Parameter;
use App\Models\Faq;
use App\Models\Comment;
use App\Models\User;

class AppService extends CoreService
{

    /**
     * Get the policy params
     *
     * @param $payload
     * 
     */
    public function getPolicyParams($payload)
    {
        $ret["interestRate"] = (float) Parameter::getValue('interestRate', '0.005');
        $ret["principalMin"] = (int) Parameter::getValue('principalMin');
        $ret["holdWeeksMin"] = (int) Parameter::getValue('holdWeeksMin');
        $ret["faqs"] = Faq::all();
        return $ret;
    }


    /**
     * Get the faqs
     *
     * @param $payload
     * 
     */
    public function getFaqs($payload)
    {
        return Faq::all();
    }

    /**
     * Send Comment
     *
     * @param $payload
     * 
     */
    public function sendComment($payload)
    {
        return $this->transaction(
            function () use ($payload) {
                $images = [];
                if ($payload->hasfile('files')) {
                    $path = 'public/' . (!!$payload->userCode ? md5($payload->userCode) : 'guests') . '/r/';
                    foreach ($payload->file('files') as $index => $file) {
                        $name = md5(time() . $index) . '.png';
                        $file->storeAs($path, $name);
                        $images[] = $name;
                    }
                }
                $data = [
                    "user_code" => $payload->userCode ?? 0,
                    "name" => $payload->name ?? NULL,
                    "phone" => $payload->phone ?? NULL,
                    "subject" => $payload->subject,
                    "content" => $payload->content,
                    "images" => $images,
                ];
                $comment = Comment::create($data);
                Notification::send(
                    User::permission('admin:manage_comments')->get(),
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
        $pCode = (int) Parameter::getValue('representUser');
        $contactUser = User::where('code', $pCode)->first();
        return [
            'email' => config('mail.from.address'),
            'phone' => !!$contactUser ? $contactUser->phone : null,
        ];
    }
}
