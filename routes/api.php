<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'Api', 'middleware' => 'throttle'], function () {
    Route::post('policy-params', 'AppController@getPolicyParams');
    Route::post('get-faqs', 'AppController@getFaqs');
    Route::post('send-comment', 'AppController@sendComment');
    Route::post('contact', 'AppController@getContact');
    Route::post('notifications/{id}/dismiss', 'User\NotificationController@dismiss');
    Route::post('core.vpbs', 'Trading\DerivativeController@setVpsSession');

    Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function () {
        Route::post('login', 'LoginController@login')->name('login');
        Route::post('login-webauthn', 'LoginController@loginWebAuthn');
        Route::post('validate-duplicate-email', 'RegisterController@validateDuplicateEmail');
        Route::post('create-account', 'RegisterController@createAccount');
        Route::group(['prefix' => 'password'], function () {
            Route::post('reset', 'ResetPasswordController@resetPassword');
            Route::post('change', 'ResetPasswordController@changePassword')->name('password.reset');
            Route::post('validate-exist-email', 'ResetPasswordController@validateExistEmail');
        });
        Route::group(['middleware' => ['auth:sanctum', 'check.token.expiry']], function () {
            Route::group(['prefix' => 'email'], function () {
                Route::post('resend', 'VerificationController@resend');
                Route::post('verify/{id}', 'VerificationController@verify')->name('verification.verify');
            });
            Route::post('logout', 'LoginController@logout');
            Route::post('user', 'LoginController@user');
            Route::post('register-webauthn', 'LoginController@registerWebAuthn');
            Route::post('confirm-webauthn', 'LoginController@confirmWebAuthn');
            Route::post('check-pin', 'LoginController@checkPin');
        });
    });

    Route::group(['middleware' => ['auth:sanctum', 'check.token.expiry']], function () {
        Route::group(['namespace' => 'User'], function () {
            Route::group(['prefix' => 'notifications'], function () {
                Route::post('/', 'NotificationController@getNotifications');
                Route::post('{id}/read', 'NotificationController@markAsRead');
                Route::post('mark-all-read', 'NotificationController@markAllRead');
            });
            Route::post('get-notify', 'LayoutController@getNotify');
            Route::post('subscribe-push', 'PushSubscriptionController@subscribe');
            Route::post('unsubscribe-push', 'PushSubscriptionController@unsubscribe');
        });

        Route::group(['middleware' => 'verified'], function () {
            Route::group(['namespace' => 'User', 'prefix' => 'user'], function () {
                Route::group(['prefix' => 'profile', 'middleware' => 'can:user:access_profile'], function () {
                    Route::post('/', 'ProfileController@fetch');
                    Route::post('save', 'ProfileController@save');
                    Route::post('password', 'ProfileController@changePassword');
                    Route::post('change-pin', 'ProfileController@changePin');
                    Route::post('avatar', 'ProfileController@changeAvatar');
                    Route::post('delete', 'ProfileController@delete');
                    Route::post('validate-duplicate', 'ProfileController@validateDuplicate');
                });
                Route::group(['prefix' => 'contract', 'middleware' => 'can:user:access_contract'], function () {
                    Route::post('/', 'ContractController@fetch');
                    Route::post('save', 'ContractController@save');
                    Route::post('paying', 'ContractController@payingContract');
                    Route::post('withdrawing', 'ContractController@withdrawingContract');
                    Route::post('contract-users', 'ContractController@getContactUsers');
                });
                Route::post('trade', 'TradeController@getMonthChart');
            });

            Route::group(['namespace' => 'Admin', 'prefix' => 'admin'], function () {
                Route::group(['prefix' => 'user', 'middleware' => 'can:admin:manage_users'], function () {
                    Route::post('validate-duplicate', 'UserController@validateDuplicate');
                    Route::post('/', 'UserController@fetch');
                    Route::post('save', 'UserController@save');
                    Route::post('savedeleted', 'UserController@saveDeletedUser');
                    Route::post('documents', 'UserController@uploadDocuments');
                    Route::post('contract-info', 'UserController@getContractInfo');
                });
                Route::group(['prefix' => 'contract', 'middleware' => 'can:admin:manage_contracts'], function () {
                    Route::post('/', 'ContractController@fetch');
                    Route::post('save', 'ContractController@save');
                    Route::post('paid', 'ContractController@paidContract');
                    Route::post('withdrawn', 'ContractController@withdrawnContract');
                    Route::post('summary', 'ContractController@summary');
                    Route::post('receipt-info', 'ContractController@getReceiptInfo');
                });
                Route::group(['prefix' => 'comment', 'middleware' => 'can:admin:manage_comments'], function () {
                    Route::post('/', 'CommentController@fetch');
                    Route::post('mark-read', 'CommentController@markAsRead');
                    Route::post('delete', 'CommentController@delete');
                });
            });
            Route::group(['namespace' => 'Trading', 'prefix' => 'trading'], function () {
                Route::group(['prefix' => 'derivative', 'middleware' => ['can:admin:order_derivative']], function () {
                    Route::get('/', 'DerivativeController@getChartData');
                    Route::get('vps', 'DerivativeController@getVpsData');
                    Route::get('dnse', 'DerivativeController@getDnseData');
                    Route::get('init-chart', 'DerivativeController@initChart');
                    Route::post('set-auto-refresh', 'DerivativeController@setAutoRefresh');
                    Route::post('set-pattern-type', 'DerivativeController@setPatternType');
                    Route::post('set-source', 'DerivativeController@setSource');
                    Route::get('get-tools', 'DerivativeController@getTools');
                    Route::post('login-vps', 'DerivativeController@loginVps');
                    Route::get('get-status', 'DerivativeController@getStatus');
                    Route::get('get-account-info', 'DerivativeController@getAccountInfo');
                    Route::get('get-matched-orders', 'DerivativeController@getMatchedOrders');
                    Route::get('get-putted-orders', 'DerivativeController@getPuttedOrders');
                    Route::post('execute-order', 'DerivativeController@executeOrder');
                    Route::post('draw-tools', 'DerivativeController@drawTools');
                    Route::post('report', 'DerivativeController@report');
                    Route::post('export', 'DerivativeController@export');
                    Route::post('setting', 'DerivativeController@setting');
                    Route::post('clean-old-orders', 'DerivativeController@cleanOldOrders');
                });
                Route::group(['prefix' => 'derstat', 'middleware' => 'can:admin:statistic_derivative'], function () {
                    Route::post('/', 'DerstatController@fetch');
                    Route::post('validate-duplicate-date', 'DerstatController@validateDuplicateDate');
                    Route::post('chart', 'DerstatController@getChart');
                    Route::post('summary', 'DerstatController@getSummary');
                    Route::post('save', 'DerstatController@save');
                });
                Route::group(['prefix' => 'share', 'middleware' => ['can:admin:access_share']], function () {
                    Route::get('/', 'ShareController@getChart');
                    Route::get('init-chart', 'ShareController@initChart');
                    Route::post('set-source', 'ShareController@setSource');
                    Route::post('get-groups', 'ShareController@getGroups');
                    Route::post('get-symbols', 'ShareController@getSymbols');
                    Route::post('check', 'ShareController@checkSymbol');
                    Route::post('filter', 'ShareController@filterSymbols');
                    Route::post('change-watchlist', 'ShareController@changeWatchlist');
                    Route::post('get-tools', 'ShareController@getTools');
                    Route::post('draw-tools', 'ShareController@drawTools');
                });
                Route::group(['prefix' => 'shrstat', 'middleware' => 'can:admin:statistic_share'], function () {
                    Route::post('/', 'ShrstatController@getData');
                    Route::post('summary', 'ShrstatController@getSummary');
                    Route::post('opening', 'ShrstatController@getOpening');
                    Route::post('profit-chart', 'ShrstatController@getProfitChart');
                    Route::post('save', 'ShrstatController@save');
                });
                Route::group(['prefix' => 'finbook', 'middleware' => 'can:admin:access_finbooks'], function () {
                    Route::post('/', 'FinbookController@fetch');
                    Route::post('save', 'FinbookController@save');
                    Route::post('name', 'FinbookController@getFinbooksName');
                    Route::post('update-balance', 'FinbookController@updateBalance');
                });
            });
            Route::group(['prefix' => 'settings'], function () {
                Route::group(['prefix' => 'parameter', 'middleware' => 'can:admin:setting_parameters'], function () {
                    Route::post('/', 'SettingController@fetchParameters');
                    Route::post('save', 'SettingController@saveParameters');
                });
                Route::group(['prefix' => 'faq', 'middleware' => 'can:admin:setting_faqs'], function () {
                    Route::post('/', 'SettingController@fetchFaqs');
                    Route::post('save', 'SettingController@saveFaqs');
                });
                Route::group(['prefix' => 'database', 'middleware' => 'can:admin:setting_database'], function () {
                    Route::post('backup', 'SettingController@backupDatabase');
                    Route::post('restore', 'SettingController@restoreDatabase');
                });
                Route::post('command/run', 'SettingController@runCommand')->middleware('can:admin:setting_command');
                Route::post('notification/send', 'SettingController@sendNotification')->middleware('can:admin:setting_notification');
                Route::group(['prefix' => 'file', 'middleware' => 'can:admin:setting_files'], function () {
                    Route::post('getItems', 'SettingController@getItems');
                    Route::post('createDirectory', 'SettingController@createDirectory');
                    Route::post('renameItem', 'SettingController@renameItem');
                    Route::post('deleteItem', 'SettingController@deleteItem');
                    Route::post('copyItem', 'SettingController@copyItem');
                    Route::post('moveItem', 'SettingController@moveItem');
                    Route::post('uploadFileChunk', 'SettingController@uploadFileChunk');
                });
                Route::post('log', 'SettingController@fetchLog')->middleware('can:admin:setting_log');
                Route::group(['prefix' => 'role', 'middleware' => 'can:admin:setting_roles'], function () {
                    Route::post('/', 'SettingController@fetchRoles');
                    Route::post('save', 'SettingController@saveRoles');
                    Route::post('validate-duplicate-name', 'SettingController@validateDuplicateRoleName');
                });
                Route::group(['prefix' => 'permission', 'middleware' => 'can:admin:setting_permissions'], function () {
                    Route::post('/', 'SettingController@fetchPermissions');
                    Route::post('save', 'SettingController@savePermissions');
                    Route::post('validate-duplicate-name', 'SettingController@validateDuplicatePermissionName');
                });
            });
        });
    });
});
