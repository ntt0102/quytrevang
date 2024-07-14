<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Webklex\IMAP\Facades\Client;

class GetDnseTokenJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    const DNSE_USR = '0367269284';
    const DNSE_PWD = 'Ckvndrt0!';
    private $client;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->client = new \GuzzleHttp\Client();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $accessToken = $this->getAccessToken();
        $this->sendEmailOtp($accessToken);
        $emailOtp = $this->getEmailOtp();
        $tradingToken = $this->getTradingToken($accessToken, $emailOtp);
        set_global_value('dnseAccess', $accessToken);
        set_global_value('dnseTrading', $tradingToken);
    }

    private function getAccessToken()
    {
        $data = [
            'headers' => [
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'username' => self::DNSE_USR,
                'password' => self::DNSE_PWD,
            ],
        ];
        $rsp = $this->client->post('https://services.entrade.com.vn/dnse-auth-service/login', $data);
        return json_decode($rsp->getBody())->token;
    }

    private function sendEmailOtp($accessToken)
    {
        $data = [
            'headers' => [
                'Content-Type' => 'application/json',
                'authorization' => 'Bearer ' . $accessToken,
            ],
        ];
        $this->client->post('https://services.entrade.com.vn/dnse-auth-service/api/email-otp', $data);
    }

    private function getEmailOtp()
    {
        $emailOtp = "";
        $client = Client::account('default');
        while (!$emailOtp) {
            $client->connect();
            $folder = $client->getFolderByPath('[Gmail]/Quan tr&Hs0-ng');
            // $messages = $folder->messages()->from('noreply@mail.dnse.com.vn')->unseen()->limit(1)->get();
            $messages = $folder->messages()->from('quytrevang@gmail.com')->unseen()->limit(1)->get();

            if (count($messages)) {
                preg_match('/\b\d{6}\b/', $messages[0]->getHTMLBody(), $otpMatches);
                if ($otpMatches) {
                    $emailOtp = $otpMatches[0];
                    $messages[0]->move('[Gmail]/Th&APk-ng r&AOE-c');
                }
            }

            sleep(5);
            $client->disconnect();
        }
        return $emailOtp;
    }

    private function getTradingToken($accessToken, $otp)
    {
        $data = [
            'headers' => [
                'Content-Type' => 'application/json',
                'authorization' => 'Bearer ' . $accessToken,
                'otp' => $otp,
            ],
        ];
        $rsp = $this->client->post('https://services.entrade.com.vn/dnse-order-service/trading-token', $data);
        return json_decode($rsp->getBody())->tradingToken;
    }
}
