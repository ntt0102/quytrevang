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
    Route::post('core.vpbs', 'Trading\OrderChartController@setCopyistSession');

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
        Route::group(['middleware' => 'auth:api'], function () {
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

    Route::group(['middleware' => 'auth:api'], function () {
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
            Route::group(['namespace' => 'User', 'prefix' => 'user', 'middleware' => 'can:common@access'], function () {
                Route::group(['prefix' => 'profile'], function () {
                    Route::post('/', 'ProfileController@fetch');
                    Route::post('save', 'ProfileController@save');
                    Route::post('password', 'ProfileController@changePassword');
                    Route::post('change-pin', 'ProfileController@changePin');
                    Route::post('avatar', 'ProfileController@changeAvatar');
                    Route::post('delete', 'ProfileController@delete');
                    Route::post('validate-duplicate', 'ProfileController@validateDuplicate');
                });
                Route::group(['prefix' => 'contract'], function () {
                    Route::post('/', 'ContractController@fetch');
                    Route::post('save', 'ContractController@save');
                    Route::post('paying', 'ContractController@payingContract');
                    Route::post('withdrawing', 'ContractController@withdrawingContract');
                    Route::post('contract-users', 'ContractController@getContactUsers');
                });
                Route::group(['prefix' => 'copyist'], function () {
                    Route::post('/', 'CopyistController@fetch');
                    Route::post('save', 'CopyistController@save');
                    Route::post('validate-vpscode', 'CopyistController@validateVpsCode');
                });
                Route::post('trade', 'TradeController@getMonthChart');
            });

            Route::group(['namespace' => 'Admin', 'prefix' => 'admin'], function () {
                Route::group(['prefix' => 'user', 'middleware' => 'can:users@control'], function () {
                    Route::post('validate-duplicate', 'UserController@validateDuplicate');
                    Route::post('/', 'UserController@fetch');
                    Route::post('save', 'UserController@save');
                    Route::post('deleted', 'UserController@saveDeletedUser');
                    Route::post('documents', 'UserController@uploadDocuments');
                    Route::post('contract-info', 'UserController@getContractInfo');
                });
                Route::group(['prefix' => 'contract', 'middleware' => 'can:contracts@control'], function () {
                    Route::post('/', 'ContractController@fetch');
                    Route::post('save', 'ContractController@save');
                    Route::post('paid', 'ContractController@paidContract');
                    Route::post('withdrawn', 'ContractController@withdrawnContract');
                    Route::post('summary', 'ContractController@summary');
                    Route::post('receipt-info', 'ContractController@getReceiptInfo');
                });
                Route::group(['prefix' => 'copyist', 'middleware' => 'can:copyists@control'], function () {
                    Route::post('/', 'CopyistController@fetch');
                    Route::post('validate-user', 'CopyistController@validateUser');
                    Route::post('save', 'CopyistController@save');
                });
                Route::group(['prefix' => 'comment', 'middleware' => 'can:comments@control'], function () {
                    Route::post('/', 'CommentController@fetch');
                    Route::post('mark-read', 'CommentController@markAsRead');
                    Route::post('delete', 'CommentController@delete');
                });
            });
            Route::group(['namespace' => 'Trading', 'prefix' => 'trading'], function () {
                Route::group(['prefix' => 'statistic', 'middleware' => 'can:trades@view'], function () {
                    Route::post('/', 'TradeController@fetch');
                    Route::post('validate-duplicate-date', 'TradeController@validateDuplicateDate');
                    Route::post('chart', 'TradeController@getChart');
                    Route::post('summary', 'TradeController@getSummary');
                    Route::post('save', 'TradeController@save')->middleware('can:trades@edit');
                });
                Route::group(['prefix' => 'order', 'middleware' => ['can:stock@order']], function () {
                    Route::post('/', 'OrderChartController@getChartData');
                    Route::post('get-config', 'OrderChartController@getConfig');
                    Route::post('get-status', 'OrderChartController@getStatus');
                    Route::post('get-account-info', 'OrderChartController@getAccountInfo');
                    Route::post('execute-order', 'OrderChartController@executeOrder');
                    Route::post('get-copyist-status', 'OrderChartController@getCopyistStatus');
                    Route::post('close-position', 'OrderChartController@closePosition');
                    Route::post('report', 'OrderChartController@report');
                    Route::post('export', 'OrderChartController@export');
                    Route::post('cashflow', 'OrderChartController@cashflow');
                });
                Route::group(['prefix' => 'stock', 'middleware' => ['can:stock@order']], function () {
                    Route::post('/', 'StockController@getChartData');
                    Route::post('clone-symbols', 'StockController@cloneSymbols');
                    Route::post('get-symbols', 'StockController@getSymbols');
                    Route::post('filter', 'StockController@filterSymbols');
                });
                Route::group(['prefix' => 'finbook', 'middleware' => 'can:finbooks@control'], function () {
                    Route::post('/', 'FinbookController@fetch');
                    Route::post('save', 'FinbookController@save');
                    Route::post('name', 'FinbookController@getFinbooksName');
                    Route::post('update-balance', 'FinbookController@updateBalance');
                });
            });
            Route::group(['prefix' => 'settings'], function () {
                Route::group(['prefix' => 'parameter', 'middleware' => 'can:parameters@setting'], function () {
                    Route::post('/', 'SettingController@fetchParameters');
                    Route::post('save', 'SettingController@saveParameters');
                });
                Route::group(['prefix' => 'faq', 'middleware' => 'can:faqs@setting'], function () {
                    Route::post('/', 'SettingController@fetchFaqs');
                    Route::post('save', 'SettingController@saveFaqs');
                });
                Route::group(['prefix' => 'database', 'middleware' => 'can:database@setting'], function () {
                    Route::post('backup', 'SettingController@backupDatabase');
                    Route::post('restore', 'SettingController@restoreDatabase');
                });
                Route::post('command/run', 'SettingController@runCommand')->middleware('can:command@setting');
                Route::post('notification/send', 'SettingController@sendNotification')->middleware('can:notification@setting');
                Route::group(['prefix' => 'file', 'middleware' => 'can:files@setting'], function () {
                    Route::post('getItems', 'SettingController@getItems');
                    Route::post('createDirectory', 'SettingController@createDirectory');
                    Route::post('renameItem', 'SettingController@renameItem');
                    Route::post('deleteItem', 'SettingController@deleteItem');
                    Route::post('copyItem', 'SettingController@copyItem');
                    Route::post('moveItem', 'SettingController@moveItem');
                    Route::post('uploadFileChunk', 'SettingController@uploadFileChunk');
                });
                Route::post('log', 'SettingController@fetchLog')->middleware('can:log@setting');
                Route::group(['prefix' => 'role', 'middleware' => 'can:roles@setting'], function () {
                    Route::post('/', 'SettingController@fetchRoles');
                    Route::post('save', 'SettingController@saveRoles');
                    Route::post('validate-duplicate-name', 'SettingController@validateDuplicateRoleName');
                });
                Route::group(['prefix' => 'permission', 'middleware' => 'can:permissions@setting'], function () {
                    Route::post('/', 'SettingController@fetchPermissions');
                    Route::post('save', 'SettingController@savePermissions');
                    Route::post('validate-duplicate-name', 'SettingController@validateDuplicatePermissionName');
                });
            });
        });
    });
});
