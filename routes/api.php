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
    Route::get('policy-params', 'AppController@getPolicyParams');
    Route::get('get-faqs', 'AppController@getFaqs');
    Route::post('send-comment', 'AppController@sendComment');
    Route::get('contact', 'AppController@getContact');
    Route::post('notifications/{id}/dismiss', 'User\NotificationController@dismiss');
    Route::group(['prefix' => 'vps', 'middleware' => 'cors'], function () {
        Route::post('report', 'VpsController@report');
        // Route::post('export', 'VpsController@export');
        Route::post('config', 'VpsController@getConfig');
        Route::post('volume-by-price', 'VpsController@getVolumeByPrice');
        Route::post('data', 'VpsController@controlData');
        // Route::post('get-strategy', 'VpsController@getStrategy');
        // Route::post('set-strategy', 'VpsController@setStrategy');
        // Route::post('get-vn30f1m', 'VpsController@getVn30f1m');
    });

    Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function () {
        Route::post('login', 'LoginController@login');
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
                Route::get('verify/{id}', 'VerificationController@verify')->name('verification.verify');
            });
            Route::get('logout', 'LoginController@logout');
            Route::get('user', 'LoginController@user');
            Route::post('register-webauthn', 'LoginController@registerWebAuthn');
            Route::post('confirm-webauthn', 'LoginController@confirmWebAuthn');
            Route::post('check-pin', 'LoginController@checkPin');
        });
    });

    Route::group(['middleware' => 'auth:api'], function () {
        Route::group(['namespace' => 'User'], function () {
            Route::group(['prefix' => 'notifications'], function () {
                Route::get('/', 'NotificationController@fetch');
                Route::post('{id}/read', 'NotificationController@markAsRead');
                Route::post('mark-all-read', 'NotificationController@markAllRead');
            });
            Route::group(['prefix' => 'layout'], function () {
                Route::post('/', 'LayoutController@fetch');
            });
            Route::group(['prefix' => 'subscriptions'], function () {
                Route::post('/', 'PushSubscriptionController@update');
                Route::post('destroy', 'PushSubscriptionController@destroy');
            });
        });

        Route::group(['middleware' => 'verified'], function () {
            Route::group(['namespace' => 'User'], function () {
                Route::group(['prefix' => 'profile', 'middleware' => 'can:profile@control'], function () {
                    Route::get('/', 'ProfileController@fetch');
                    Route::post('/', 'ProfileController@save');
                    Route::post('password', 'ProfileController@changePassword');
                    Route::post('change-pin', 'ProfileController@changePin');
                    Route::post('avatar', 'ProfileController@changeAvatar');
                    Route::post('delete', 'ProfileController@delete');
                    Route::post('validate-duplicate', 'ProfileController@validateDuplicate');
                });
                Route::group(['prefix' => 'contract', 'middleware' => 'can:contract@control'], function () {
                    Route::get('/', 'ContractController@fetch');
                    Route::post('/', 'ContractController@save');
                    Route::post('paying', 'ContractController@payingContract');
                    Route::post('withdrawing', 'ContractController@withdrawingContract');
                    Route::get('contract-users', 'ContractController@getContactUsers');
                });
                Route::get('trade', 'TradeController@getWeekChart')->middleware('can:trade@view');
            });

            Route::group(['namespace' => 'Admin'], function () {
                Route::group(['prefix' => 'users', 'middleware' => 'can:users@control'], function () {
                    Route::post('validate-duplicate', 'UserController@validateDuplicate');
                    Route::get('/', 'UserController@fetch');
                    Route::post('/', 'UserController@save');
                    Route::post('deleted', 'UserController@saveDeletedUser');
                    Route::post('documents', 'UserController@uploadDocuments');
                    Route::get('contract-info', 'UserController@getContractInfo');
                });
                Route::group(['prefix' => 'contracts', 'middleware' => 'can:contracts@control'], function () {
                    Route::get('/', 'ContractController@fetch');
                    Route::post('/', 'ContractController@save');
                    Route::post('paid', 'ContractController@paidContract');
                    Route::post('withdrawn', 'ContractController@withdrawnContract');
                    Route::get('summary', 'ContractController@summary');
                    Route::get('receipt-info', 'ContractController@getReceiptInfo');
                });
                Route::group(['prefix' => 'settings', 'middleware' => 'can:setting@control'], function () {
                    Route::group(['prefix' => 'parameters', 'middleware' => 'can:setting.parameters@control'], function () {
                        Route::get('/', 'SettingController@fetchParameters');
                        Route::post('/', 'SettingController@saveParameters');
                    });
                    Route::group(['prefix' => 'faqs', 'middleware' => 'can:setting.faqs@control'], function () {
                        Route::get('/', 'SettingController@fetchFaqs');
                        Route::post('/', 'SettingController@saveFaqs');
                    });
                    Route::group(['prefix' => 'database', 'middleware' => 'can:setting.database@control'], function () {
                        Route::post('backup', 'SettingController@backupDatabase');
                        Route::post('restore', 'SettingController@restoreDatabase');
                    });
                    Route::post('command/run', 'SettingController@runCommand')->middleware('can:setting.command@control');
                    Route::post('notification/send', 'SettingController@sendNotification')->middleware('can:setting.notification@control');
                    Route::group(['prefix' => 'files', 'middleware' => 'can:setting.files@control'], function () {
                        Route::get('getItems', 'SettingController@getItems');
                        Route::post('createDirectory', 'SettingController@createDirectory');
                        Route::post('renameItem', 'SettingController@renameItem');
                        Route::post('deleteItem', 'SettingController@deleteItem');
                        Route::post('copyItem', 'SettingController@copyItem');
                        Route::post('moveItem', 'SettingController@moveItem');
                        Route::post('uploadFileChunk', 'SettingController@uploadFileChunk');
                    });
                    Route::get('log', 'SettingController@fetchLog')->middleware('can:setting.log@control');
                    Route::group(['prefix' => 'roles', 'middleware' => 'can:setting.roles@control'], function () {
                        Route::get('/', 'SettingController@fetchRoles');
                        Route::post('/', 'SettingController@saveRoles');
                        Route::post('validate-duplicate-name', 'SettingController@validateDuplicateRoleName');
                    });
                    Route::group(['prefix' => 'permissions', 'middleware' => 'can:setting.permissions@control'], function () {
                        Route::get('/', 'SettingController@fetchPermissions');
                        Route::post('/', 'SettingController@savePermissions');
                        Route::post('validate-duplicate-name', 'SettingController@validateDuplicatePermissionName');
                    });
                });
                Route::group(['prefix' => 'trades', 'middleware' => 'can:trades@view'], function () {
                    Route::get('/', 'TradeController@fetch');
                    Route::get('chart', 'TradeController@getChart');
                    Route::get('summary', 'TradeController@getSummary');
                    Route::group(['middleware' => 'can:trades@edit'], function () {
                        Route::post('/', 'TradeController@save');
                        Route::post('/share', 'TradeController@getShare');
                        Route::post('/vn30f1m', 'TradeController@getVn30f1m');
                        Route::group(['prefix' => 'flow'], function () {
                            Route::get('/', 'TradeController@getFlow');
                            Route::post('save', 'TradeController@saveFlow');
                        });
                    });
                });
                Route::group(['prefix' => 'finbooks', 'middleware' => 'can:finbooks@control'], function () {
                    Route::get('/', 'FinbookController@fetch');
                    Route::post('/', 'FinbookController@save');
                    Route::post('/name', 'FinbookController@getFinbooksName');
                    Route::post('/update-balance', 'FinbookController@updateBalance');
                });
                Route::group(['prefix' => 'comments', 'middleware' => 'can:comments@control'], function () {
                    Route::get('/', 'CommentController@fetch');
                    Route::post('/', 'CommentController@markAsRead');
                    Route::post('delete', 'CommentController@delete');
                });
            });
        });
    });
});
