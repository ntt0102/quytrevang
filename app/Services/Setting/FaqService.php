<?php

namespace App\Services\Setting;

use App\Services\CoreService;
use App\Models\Faq;


class FaqService extends CoreService
{

    /**
     * Return all the Faqs.
     * 
     * @param $request
     *
     * @return array
     */
    public function fetch($request)
    {
        return Faq::all();
    }

    /**
     * Save Faq.
     * 
     * @param $request
     * 
     */
    public function save($request)
    {
        return $this->transaction(function () use ($request) {
            foreach ($request->changes as $change) {
                $response = [];
                switch ($change['type']) {
                    case 'insert':
                        $data = [
                            "topic" => $change['data']['topic'],
                            "question" => $change['data']['question'],
                            "answer" => $change['data']['answer']
                        ];
                        $faq = Faq::create($data);
                        $response['isOk'] = !!$faq;
                        break;

                    case 'update':
                        $data = [
                            "topic" => $change['data']['topic'],
                            "question" => $change['data']['question'],
                            "answer" => $change['data']['answer']
                        ];
                        $faq = Faq::find($change['key']);
                        $response['isOk'] = $faq->update($data);
                        break;

                    case 'remove':
                        $faq = Faq::find($change['key']);
                        $response['isOk'] = $faq->delete();
                        break;
                }
                if (!$response['isOk']) break;
            }
            return $response;
        });
    }
}
