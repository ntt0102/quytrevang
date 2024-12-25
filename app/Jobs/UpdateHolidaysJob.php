<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateHolidaysJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct() {}

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $holidays = $this->getHolidays();
        set_global_value('holidays', implode(',', $holidays));
    }

    private function getHolidays()
    {
        try {
            $client = new \GuzzleHttp\Client();

            $headers = [
                '__vptoken' => 'CfDJ8IgwhWJVLhVGlvpLg9E0vBLsfrheRTo8i_hJeJDhtNZY1jGH_D9sqRWnpzT6eKtwaAY0UwRbtM6BpyMKhCKg6GJC0xPupJyz9982-rJziCZp_Hy7EykTvWmbp6_0VItYPejB56DRQrpyc2E_ZgsV1qw',
            ];

            $cookie = \GuzzleHttp\Cookie\CookieJar::fromArray([
                '__VPToken' => 'CfDJ8IgwhWJVLhVGlvpLg9E0vBKNP8N79EPuF-xavJoHRrKRSvx2YYFYWi8eopnkxd6u2gP3LXpOpBCzVXhtLl-AZGGX6815qs8Ysgepqns8iHPVS6gaSzsx-DEtvJmlyj0WlLUGkrss8ZaB6h2DNdQf_jI',
            ], 'vsd.vn');

            $data = [
                "CurrentPage" => 1,
                "OrderBy" => "",
                "OrderType" => "",
                "RecordOnPage" => 10,
                "SearchKey" => date('Y')
            ];

            $req = $client->post('https://vsd.vn/lich-nghi-giao-dich/search', [
                'headers' => $headers,
                'cookies' => $cookie,
                'json' => $data,
            ]);

            $response = json_decode($req->getBody(), true);

            $htmlContent = $response["dataDetail"];
            $htmlContent = '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">' . $htmlContent;

            libxml_use_internal_errors(true);
            $dom = new \DOMDocument();
            $dom->loadHTML($htmlContent, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

            $xpath = new \DOMXPath($dom);
            $tableRows = $xpath->query("//table//tr");

            $holidays = [];

            foreach ($tableRows as $index => $row) {
                if ($index === 0) continue;
                $columns = $row->getElementsByTagName('td');
                if ($columns->length === 2) {
                    $texts = trim($columns->item(1)->textContent);
                    $days = $this->crawlDays($texts);
                    $holidays = array_merge($holidays, $days);
                }
            }
            return $holidays;
        } catch (\Throwable $th) {
            return [];
        }
    }

    private function crawlDays($dates)
    {
        $days = [];
        if (preg_match('/Từ.* ngày (\d{1,2})\/(\d{1,2})\/(\d{4}).*đến.* ngày (\d{1,2})\/(\d{1,2})\/(\d{4}).*/', $dates, $matches)) {
            $startDate = sprintf('%s-%s-%s', $matches[3], add_date_zero($matches[2]), add_date_zero($matches[1]));
            $endDate = sprintf('%s-%s-%s', $matches[6], add_date_zero($matches[5]), add_date_zero($matches[4]));
            $startDate = date_create_from_format('Y-m-d', $startDate);
            $endDate = date_create_from_format('Y-m-d', $endDate);
            while ($startDate <= $endDate) {
                $days[] = $startDate->format('Y-m-d');
                $startDate->modify('+1 day');
            }
        } elseif (preg_match('/.* ngày (\d{1,2})\/(\d{1,2})\/(\d{4}).*và.* ngày (\d{1,2})\/(\d{1,2})\/(\d{4}).*/', $dates, $matches)) {
            $days[] = sprintf('%s-%s-%s', $matches[3], add_date_zero($matches[2]), add_date_zero($matches[1]));
            $days[] = sprintf('%s-%s-%s', $matches[6], add_date_zero($matches[5]), add_date_zero($matches[4]));
        } elseif (preg_match('/.* ngày (\d{1,2})\/(\d{1,2})\/(\d{4}).*/', $dates, $matches)) {
            $days[] = sprintf('%s-%s-%s', $matches[3], add_date_zero($matches[2]), add_date_zero($matches[1]));
        }

        return $days;
    }
}
