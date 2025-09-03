<?php

use Illuminate\Support\Facades\Route;


use App\Http\Controllers\AppController;
use App\Features\Auth\Controllers\LoginController;
use App\Features\Auth\Controllers\RegisterController;
use App\Features\Auth\Controllers\ResetPasswordController;
use App\Features\Auth\Controllers\VerificationController;
use App\Features\Admin\Controllers\UserController;
use App\Features\Admin\Controllers\ContractController as AdminContractController;
use App\Features\Admin\Controllers\CommentController;
use App\Features\Trading\Controllers\DerivativeController;
use App\Features\Trading\Controllers\DerstatController;
use App\Features\Trading\Controllers\ShareController;
use App\Features\Trading\Controllers\ShrstatController;
use App\Features\Trading\Controllers\FinbookController;
use App\Features\User\Controllers\LayoutController;
use App\Features\User\Controllers\NotificationController;
use App\Features\User\Controllers\PushSubscriptionController;
use App\Features\User\Controllers\ProfileController;
use App\Features\User\Controllers\ContractController;
use App\Features\User\Controllers\TradeController;
use App\Features\Setting\Controllers\SettingController;


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

Route::group(['middleware' => 'throttle'], function () {
    Route::post('policy-params', [AppController::class, 'getPolicyParams']);
    Route::post('get-faqs', [AppController::class, 'getFaqs']);
    Route::post('send-comment', [AppController::class, 'sendComment']);
    Route::post('contact', [AppController::class, 'getContact']);
    Route::post('notifications/{id}/dismiss', [NotificationController::class, 'dismiss']);
    Route::post('core.vpbs', [DerivativeController::class, 'setVpsSession']);

    Route::group(['prefix' => 'auth'], function () {
        Route::post('login', [LoginController::class, 'login'])->name('login');
        Route::post('login-webauthn', [LoginController::class, 'loginWebAuthn']);
        Route::post('validate-duplicate-email', [RegisterController::class, 'validateDuplicateEmail']);
        Route::post('create-account', [RegisterController::class, 'createAccount']);
        Route::group(['prefix' => 'password'], function () {
            Route::post('reset', [ResetPasswordController::class, 'resetPassword']);
            Route::post('change', [ResetPasswordController::class, 'changePassword'])->name('password.reset');
            Route::post('validate-exist-email', [ResetPasswordController::class, 'validateExistEmail']);
        });
        Route::group(['middleware' => ['auth:sanctum', 'check.token.expiry']], function () {
            Route::group(['prefix' => 'email'], function () {
                Route::post('resend', [VerificationController::class, 'resend']);
                Route::post('verify/{id}', [VerificationController::class, 'verify'])->name('verification.verify');
            });
            Route::post('logout', [LoginController::class, 'logout']);
            Route::post('user', [LoginController::class, 'user']);
            Route::post('register-webauthn', [LoginController::class, 'registerWebAuthn']);
            Route::post('confirm-webauthn', [LoginController::class, 'confirmWebAuthn']);
            Route::post('check-pin', [LoginController::class, 'checkPin']);
        });
    });

    Route::group(['middleware' => ['auth:sanctum', 'check.token.expiry']], function () {
        Route::group(['prefix' => 'notifications'], function () {
            Route::post('/', [NotificationController::class, 'getNotifications']);
            Route::post('{id}/read', [NotificationController::class, 'markAsRead']);
            Route::post('mark-all-read', [NotificationController::class, 'markAllRead']);
        });
        Route::post('get-notify', [LayoutController::class, 'getNotify']);
        Route::post('subscribe-push', [PushSubscriptionController::class, 'subscribe']);
        Route::post('unsubscribe-push', [PushSubscriptionController::class, 'unsubscribe']);

        Route::group(['middleware' => 'verified'], function () {
            Route::group(['prefix' => 'user'], function () {
                Route::group(['prefix' => 'profile', 'middleware' => 'can:user:access_profile'], function () {
                    Route::post('/', [ProfileController::class, 'fetch']);
                    Route::post('save', [ProfileController::class, 'save']);
                    Route::post('password', [ProfileController::class, 'changePassword']);
                    Route::post('change-pin', [ProfileController::class, 'changePin']);
                    Route::post('avatar', [ProfileController::class, 'changeAvatar']);
                    Route::post('delete', [ProfileController::class, 'delete']);
                    Route::post('validate-duplicate', [ProfileController::class, 'validateDuplicate']);
                });
                Route::group(['prefix' => 'contract', 'middleware' => 'can:user:access_contract'], function () {
                    Route::post('/', [ContractController::class, 'fetch']);
                    Route::post('save', [ContractController::class, 'save']);
                    Route::post('paying', [ContractController::class, 'payingContract']);
                    Route::post('withdrawing', [ContractController::class, 'withdrawingContract']);
                    Route::post('contract-users', [ContractController::class, 'getContactUsers']);
                });
                Route::post('trade', [TradeController::class, 'getMonthChart']);
            });

            Route::group(['prefix' => 'admin'], function () {
                Route::group(['prefix' => 'user', 'middleware' => 'can:admin:manage_users'], function () {
                    Route::post('/', [UserController::class, 'fetch']);
                    Route::post('validate-duplicate', [UserController::class, 'validateDuplicate']);
                    Route::post('save', [UserController::class, 'save']);
                    Route::post('savedeleted', [UserController::class, 'saveDeletedUser']);
                    Route::post('documents', [UserController::class, 'uploadDocuments']);
                    Route::post('contract-info', [UserController::class, 'getContractInfo']);
                });
                Route::group(['prefix' => 'contract', 'middleware' => 'can:admin:manage_contracts'], function () {
                    Route::post('/', [AdminContractController::class, 'fetch']);
                    Route::post('save', [AdminContractController::class, 'save']);
                    Route::post('paid', [AdminContractController::class, 'paidContract']);
                    Route::post('withdrawn', [AdminContractController::class, 'withdrawnContract']);
                    Route::post('summary', [AdminContractController::class, 'summary']);
                    Route::post('receipt-info', [AdminContractController::class, 'getReceiptInfo']);
                });
                Route::group(['prefix' => 'comment', 'middleware' => 'can:admin:manage_comments'], function () {
                    Route::post('/', [CommentController::class, 'fetch']);
                    Route::post('mark-read', [CommentController::class, 'markAsRead']);
                    Route::post('delete', [CommentController::class, 'delete']);
                });
            });
            Route::group(['prefix' => 'trading'], function () {
                Route::group(['prefix' => 'derivative', 'middleware' => ['can:admin:order_derivative']], function () {
                    Route::get('/', [DerivativeController::class, 'getChartData']);
                    Route::get('vps', [DerivativeController::class, 'getVpsData']);
                    Route::get('dnse', [DerivativeController::class, 'getDnseData']);
                    Route::get('init-chart', [DerivativeController::class, 'initChart']);
                    Route::post('set-auto-refresh', [DerivativeController::class, 'setAutoRefresh']);
                    Route::post('set-pattern-type', [DerivativeController::class, 'setPatternType']);
                    Route::post('set-source', [DerivativeController::class, 'setSource']);
                    Route::get('get-tools', [DerivativeController::class, 'getTools']);
                    Route::post('login-vps', [DerivativeController::class, 'loginVps']);
                    Route::get('get-status', [DerivativeController::class, 'getStatus']);
                    Route::get('get-account-info', [DerivativeController::class, 'getAccountInfo']);
                    Route::get('get-matched-orders', [DerivativeController::class, 'getMatchedOrders']);
                    Route::get('get-putted-orders', [DerivativeController::class, 'getPuttedOrders']);
                    Route::post('execute-order', [DerivativeController::class, 'executeOrder']);
                    Route::post('draw-tools', [DerivativeController::class, 'drawTools']);
                    Route::post('report', [DerivativeController::class, 'report']);
                    Route::post('export', [DerivativeController::class, 'export']);
                    Route::post('setting', [DerivativeController::class, 'setting']);
                    Route::post('clean-old-orders', [DerivativeController::class, 'cleanOldOrders']);
                });
                Route::group(['prefix' => 'derstat', 'middleware' => 'can:admin:statistic_derivative'], function () {
                    Route::post('/', [DerstatController::class, 'fetch']);
                    Route::post('validate-duplicate-date', [DerstatController::class, 'validateDuplicateDate']);
                    Route::post('chart', [DerstatController::class, 'getChart']);
                    Route::post('summary', [DerstatController::class, 'getSummary']);
                    Route::post('save', [DerstatController::class, 'save']);
                });
                Route::group(['prefix' => 'share', 'middleware' => ['can:admin:access_share']], function () {
                    Route::get('/', [ShareController::class, 'getChart']);
                    Route::get('init-chart', [ShareController::class, 'initChart']);
                    Route::post('set-source', [ShareController::class, 'setSource']);
                    Route::post('get-groups', [ShareController::class, 'getGroups']);
                    Route::post('get-symbols', [ShareController::class, 'getSymbols']);
                    Route::post('check', [ShareController::class, 'checkSymbol']);
                    Route::post('filter', [ShareController::class, 'filterSymbols']);
                    Route::post('change-watchlist', [ShareController::class, 'changeWatchlist']);
                    Route::post('get-tools', [ShareController::class, 'getTools']);
                    Route::post('draw-tools', [ShareController::class, 'drawTools']);
                });
                Route::group(['prefix' => 'shrstat', 'middleware' => 'can:admin:statistic_share'], function () {
                    Route::post('/', [ShrstatController::class, 'getData']);
                    Route::post('summary', [ShrstatController::class, 'getSummary']);
                    Route::post('opening', [ShrstatController::class, 'getOpening']);
                    Route::post('profit-chart', [ShrstatController::class, 'getProfitChart']);
                    Route::post('save', [ShrstatController::class, 'save']);
                });
                Route::group(['prefix' => 'finbook', 'middleware' => 'can:admin:access_finbooks'], function () {
                    Route::post('/', [FinbookController::class, 'fetch']);
                    Route::post('save', [FinbookController::class, 'save']);
                    Route::post('name', [FinbookController::class, 'getFinbooksName']);
                    Route::post('update-balance', [FinbookController::class, 'updateBalance']);
                });
            });
            Route::group(['prefix' => 'settings'], function () {
                Route::group(['prefix' => 'parameter', 'middleware' => 'can:admin:setting_parameters'], function () {
                    Route::post('/', [SettingController::class, 'fetchParameters']);
                    Route::post('save', [SettingController::class, 'saveParameters']);
                });
                Route::group(['prefix' => 'faq', 'middleware' => 'can:admin:setting_faqs'], function () {
                    Route::post('/', [SettingController::class, 'fetchFaqs']);
                    Route::post('save', [SettingController::class, 'saveFaqs']);
                });
                Route::group(['prefix' => 'database', 'middleware' => 'can:admin:setting_database'], function () {
                    Route::post('backup', [SettingController::class, 'backupDatabase']);
                    Route::post('restore', [SettingController::class, 'restoreDatabase']);
                });
                Route::post('command/run', [SettingController::class, 'runCommand'])->middleware('can:admin:setting_command');
                Route::post('notification/send', [SettingController::class, 'sendNotification'])->middleware('can:admin:setting_notification');
                Route::group(['prefix' => 'file', 'middleware' => 'can:admin:setting_files'], function () {
                    Route::post('getItems', [SettingController::class, 'getItems']);
                    Route::post('createDirectory', [SettingController::class, 'createDirectory']);
                    Route::post('renameItem', [SettingController::class, 'renameItem']);
                    Route::post('deleteItem', [SettingController::class, 'deleteItem']);
                    Route::post('copyItem', [SettingController::class, 'copyItem']);
                    Route::post('moveItem', [SettingController::class, 'moveItem']);
                    Route::post('uploadFileChunk', [SettingController::class, 'uploadFileChunk']);
                });
                Route::post('log', [SettingController::class, 'fetchLog'])->middleware('can:admin:setting_log');
                Route::group(['prefix' => 'role', 'middleware' => 'can:admin:setting_roles'], function () {
                    Route::post('/', [SettingController::class, 'fetchRoles']);
                    Route::post('save', [SettingController::class, 'saveRoles']);
                    Route::post('validate-duplicate-name', [SettingController::class, 'validateDuplicateRoleName']);
                });
                Route::group(['prefix' => 'permission', 'middleware' => 'can:admin:setting_permissions'], function () {
                    Route::post('/', [SettingController::class, 'fetchPermissions']);
                    Route::post('save', [SettingController::class, 'savePermissions']);
                    Route::post('validate-duplicate-name', [SettingController::class, 'validateDuplicatePermissionName']);
                });
            });
        });
    });
});
