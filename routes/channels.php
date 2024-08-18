<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('user-{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
Broadcast::channel('admin-user', function ($user) {
    return $user->can('admin:manage_users');
});
Broadcast::channel('admin-contract', function ($user) {
    return $user->can('admin:manage_contracts');
});
Broadcast::channel('admin-comment', function ($user) {
    return $user->can('admin:manage_comments');
});
Broadcast::channel('trading-derivative', function ($user) {
    return $user->can(['admin:order_derivative']);
});
Broadcast::channel('trading-derstats', function ($user) {
    return $user->can(['admin:statistic_derivative']);
});
Broadcast::channel('trading-share', function ($user) {
    return $user->can('admin:access_share');
});
Broadcast::channel('trading-finbook', function ($user) {
    return $user->can('admin:access_finbooks');
});
