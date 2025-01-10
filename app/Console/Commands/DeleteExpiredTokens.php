<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravel\Sanctum\PersonalAccessToken;

class DeleteExpiredTokens extends Command
{
    protected $signature = 'tokens:delete-expired';
    protected $description = 'Delete expired personal access tokens';

    public function handle()
    {
        $deleted = PersonalAccessToken::where('expires_at', '<', now())->delete();
        $this->info("Deleted {$deleted} expired tokens.");
    }
}
