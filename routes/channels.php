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
Broadcast::channel('admin', function ($user) {
    return $user->hasAnyPermission(['users@control', 'contracts@control', 'comments@control']);
});
Broadcast::channel('admin-user', function ($user) {
    return $user->can('users@control');
});
Broadcast::channel('admin-contract', function ($user) {
    return $user->can('contracts@control');
});
Broadcast::channel('admin-comment', function ($user) {
    return $user->can('comments@control');
});
Broadcast::channel('trading-statistic1', function ($user) {
    return $user->hasAnyPermission(['trades@view', 'trades@edit']);
});
Broadcast::channel('trading-stock', function ($user) {
    return $user->can('trades@edit');
});
Broadcast::channel('trading-finbook', function ($user) {
    return $user->can('finbooks@control');
});
