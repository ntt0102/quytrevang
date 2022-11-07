<?php

namespace App\Services\Admin\Setting;

use App\Services\CoreService;
use App\Repositories\FaqRepository;


class FaqService extends CoreService
{
    private $faqRepository;

    public function __construct(FaqRepository $faqRepository)
    {
        $this->faqRepository = $faqRepository;
    }

    /**
     * Return all the Faqs.
     * 
     * @param $request
     *
     * @return array
     */
    public function fetch($request)
    {
        return $this->faqRepository->findAll();
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
                        $faq = $this->faqRepository->create($data);
                        $response['isOk'] = !!$faq;
                        break;

                    case 'update':
                        $data = [
                            "topic" => $change['data']['topic'],
                            "question" => $change['data']['question'],
                            "answer" => $change['data']['answer']
                        ];
                        $faq = $this->faqRepository->findById($change['key']);
                        $response['isOk'] = $this->faqRepository->update($faq, $data);
                        break;

                    case 'remove':
                        $faq = $this->faqRepository->findById($change['key']);
                        $response['isOk'] = $this->faqRepository->delete($faq);
                        break;
                }
                if (!$response['isOk']) break;
            }
            return $response;
        });
    }
}
