<?php

namespace App\Features\Setting\Services;

use App\Services\CoreService;
use App\Models\Faq;


class FaqService extends CoreService
{

    /**
     * Return all the Faqs.
     * 
     * @param $payload
     *
     * @return array
     */
    public function fetch($payload)
    {
        return Faq::all();
    }

    /**
     * Save Faq.
     * 
     * @param $payload
     * 
     */
    public function save($payload)
    {
        return $this->transaction(function () use ($payload) {
            foreach ($payload->changes as $change) {
                $response = [];
                switch ($change->type) {
                    case 'insert':
                        $data = [
                            "topic" => $change->data->topic,
                            "question" => $change->data->question,
                            "answer" => $change->data->answer
                        ];
                        $faq = Faq::create($data);
                        $response['isOk'] = !!$faq;
                        break;

                    case 'update':
                        $data = [
                            "topic" => $change->data->topic,
                            "question" => $change->data->question,
                            "answer" => $change->data->answer
                        ];
                        $faq = Faq::find($change->key);
                        $response['isOk'] = $faq->update($data);
                        break;

                    case 'remove':
                        $faq = Faq::find($change->key);
                        $response['isOk'] = $faq->delete();
                        break;
                }
                if (!$response['isOk']) break;
            }
            return $response;
        });
    }
}
