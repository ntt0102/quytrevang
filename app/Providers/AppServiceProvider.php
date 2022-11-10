<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        //
        Event::listen([
            'eloquent.created: *',
            'eloquent.updated: *',
            'eloquent.deleted: *',
            'eloquent.restored: *'
        ], function ($model) {
            list(,, $name) = explode('\\', $model);
            if ($name != 'Variable') {
                if (get_global_value('backupedDatabaseFlag') == '0')
                    set_global_value('backupedDatabaseFlag', '1');
            }
        });
        //
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }
        //
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }
}
