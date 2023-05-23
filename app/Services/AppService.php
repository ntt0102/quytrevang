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
     * @param $request
     * 
     */
    public function getPolicyParams($request)
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
     * @param $request
     * 
     */
    public function getFaqs($request)
    {
        return Faq::all();
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
                $comment = Comment::create($data);
                Notification::send(
                    User::permission('comments@control')->get(),
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
