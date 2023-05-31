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
        Route::group(['prefix' => 'so'], function () {
            Route::group(['middleware' => 'can:copyists@control'], function () {
                Route::post('manage', 'SmartOrderController@getList');
                Route::post('manage/validate-user', 'SmartOrderController@validateUser');
                Route::post('manage', 'SmartOrderController@saveSo');
                Route::post('plans', 'SmartOrderController@getPlans');
                Route::post('plans', 'SmartOrderController@savePlans');
            });
        });
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
            Route::group(['namespace' => 'User', 'middleware' => 'can:common@access'], function () {
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
                Route::post('trade', 'TradeController@getMonthChart');
            });

            Route::group(['namespace' => 'Admin'], function () {
                Route::group(['prefix' => 'users', 'middleware' => 'can:users@control'], function () {
                    Route::post('validate-duplicate', 'UserController@validateDuplicate');
                    Route::post('/', 'UserController@fetch');
                    Route::post('save', 'UserController@save');
                    Route::post('deleted', 'UserController@saveDeletedUser');
                    Route::post('documents', 'UserController@uploadDocuments');
                    Route::post('contract-info', 'UserController@getContractInfo');
                });
                Route::group(['prefix' => 'contracts', 'middleware' => 'can:contracts@control'], function () {
                    Route::post('/', 'ContractController@fetch');
                    Route::post('save', 'ContractController@save');
                    Route::post('paid', 'ContractController@paidContract');
                    Route::post('withdrawn', 'ContractController@withdrawnContract');
                    Route::post('summary', 'ContractController@summary');
                    Route::post('receipt-info', 'ContractController@getReceiptInfo');
                });
                Route::group(['prefix' => 'copyists', 'middleware' => 'can:copyists@control'], function () {
                    Route::post('/', 'CopyistController@fetch');
                    Route::post('validate-user', 'CopyistController@validateUser');
                    Route::post('save', 'CopyistController@save');
                });
                Route::group(['prefix' => 'comments', 'middleware' => 'can:comments@control'], function () {
                    Route::post('/', 'CommentController@fetch');
                    Route::post('mark-read', 'CommentController@markAsRead');
                    Route::post('delete', 'CommentController@delete');
                });
            });
            Route::group(['namespace' => 'Trading'], function () {
                Route::group(['prefix' => 'statistic', 'middleware' => 'can:trades@view'], function () {
                    Route::post('/', 'TradeController@fetch');
                    Route::post('validate-duplicate-date', 'TradeController@validateDuplicateDate');
                    Route::post('chart', 'TradeController@getChart');
                    Route::post('summary', 'TradeController@getSummary');
                    Route::post('save', 'TradeController@save')->middleware('can:trades@edit');
                });
                Route::group(['prefix' => 'order-chart', 'middleware' => ['can:stock@order']], function () {
                    Route::post('/', 'OrderChartController@getChartData');
                    Route::post('get-status', 'OrderChartController@getStatus');
                    Route::post('get-copyist-status', 'OrderChartController@getCopyistStatus');
                    Route::post('get-config', 'OrderChartController@getConfig');
                    Route::post('execute-order', 'OrderChartController@executeOrder');
                });
                Route::group(['prefix' => 'finbooks', 'middleware' => 'can:finbooks@control'], function () {
                    Route::post('/', 'FinbookController@fetch');
                    Route::post('save', 'FinbookController@save');
                    Route::post('name', 'FinbookController@getFinbooksName');
                    Route::post('update-balance', 'FinbookController@updateBalance');
                });
            });
            Route::group(['prefix' => 'settings'], function () {
                Route::group(['prefix' => 'parameters', 'middleware' => 'can:parameters@setting'], function () {
                    Route::post('/', 'SettingController@fetchParameters');
                    Route::post('save', 'SettingController@saveParameters');
                });
                Route::group(['prefix' => 'faqs', 'middleware' => 'can:faqs@setting'], function () {
                    Route::post('/', 'SettingController@fetchFaqs');
                    Route::post('save', 'SettingController@saveFaqs');
                });
                Route::group(['prefix' => 'database', 'middleware' => 'can:database@setting'], function () {
                    Route::post('backup', 'SettingController@backupDatabase');
                    Route::post('restore', 'SettingController@restoreDatabase');
                });
                Route::post('command/run', 'SettingController@runCommand')->middleware('can:command@setting');
                Route::post('notification/send', 'SettingController@sendNotification')->middleware('can:notification@setting');
                Route::group(['prefix' => 'files', 'middleware' => 'can:files@setting'], function () {
                    Route::post('getItems', 'SettingController@getItems');
                    Route::post('createDirectory', 'SettingController@createDirectory');
                    Route::post('renameItem', 'SettingController@renameItem');
                    Route::post('deleteItem', 'SettingController@deleteItem');
                    Route::post('copyItem', 'SettingController@copyItem');
                    Route::post('moveItem', 'SettingController@moveItem');
                    Route::post('uploadFileChunk', 'SettingController@uploadFileChunk');
                });
                Route::post('log', 'SettingController@fetchLog')->middleware('can:log@setting');
                Route::group(['prefix' => 'roles', 'middleware' => 'can:roles@setting'], function () {
                    Route::post('/', 'SettingController@fetchRoles');
                    Route::post('save', 'SettingController@saveRoles');
                    Route::post('validate-duplicate-name', 'SettingController@validateDuplicateRoleName');
                });
                Route::group(['prefix' => 'permissions', 'middleware' => 'can:permissions@setting'], function () {
                    Route::post('/', 'SettingController@fetchPermissions');
                    Route::post('save', 'SettingController@savePermissions');
                    Route::post('validate-duplicate-name', 'SettingController@validateDuplicatePermissionName');
                });
            });
        });
    });
});
