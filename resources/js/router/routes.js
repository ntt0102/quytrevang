import i18n from "../plugins/i18n";

const Overview = () =>
    import(/* webpackPrefetch: true */ "../views/user/Overview/Index.vue");
const Profile = () =>
    import(/* webpackPrefetch: true */ "../views/user/Profile/Index.vue");
const Contract = () =>
    import(/* webpackPrefetch: true */ "../views/user/Contract/Index.vue");

const Users = () =>
    import(/* webpackPrefetch: true */ "../views/admin/User/Index.vue");
const Contracts = () =>
    import(/* webpackPrefetch: true */ "../views/admin/Contract/Index.vue");
const SmartOrders = () =>
    import(/* webpackPrefetch: true */ "../views/admin/SmartOrders.vue");
const Comments = () =>
    import(/* webpackPrefetch: true */ "../views/admin/Comments.vue");

const OrderChart = () =>
    import(/* webpackPrefetch: true */ "../views/Trading/OrderChart.vue");
const Trades = () =>
    import(/* webpackPrefetch: true */ "../views/Trading/Statistic/Index.vue");
const Finbooks = () =>
    import(/* webpackPrefetch: true */ "../views/Trading/Finbooks.vue");

const Command = () =>
    import(/* webpackPrefetch: true */ "../views/Settings/Command.vue");
const Notification = () =>
    import(/* webpackPrefetch: true */ "../views/Settings/Notification.vue");
const Files = () =>
    import(/* webpackPrefetch: true */ "../views/Settings/Files.vue");
const Log = () =>
    import(/* webpackPrefetch: true */ "../views/Settings/Log.vue");
const Faqs = () =>
    import(/* webpackPrefetch: true */ "../views/Settings/Faqs.vue");
const Parameters = () =>
    import(/* webpackPrefetch: true */ "../views/Settings/Parameters.vue");
const Database = () =>
    import(/* webpackPrefetch: true */ "../views/Settings/Database.vue");
const Roles = () =>
    import(/* webpackPrefetch: true */ "../views/Settings/Roles.vue");
const Permissions = () =>
    import(/* webpackPrefetch: true */ "../views/Settings/Permissions.vue");

const Login = () =>
    import(/* webpackPrefetch: true */ "../views/auth/Login.vue");
const CreateAccount = () =>
    import(/* webpackPrefetch: true */ "../views/auth/CreateAccount.vue");
const ResetPassword = () =>
    import(/* webpackPrefetch: true */ "../views/auth/ResetPassword.vue");
const ChangePassword = () =>
    import(/* webpackPrefetch: true */ "../views/auth/ChangePassword.vue");
const VerifyEmail = () =>
    import(/* webpackPrefetch: true */ "../views/auth/VerifyEmail.vue");

const Policy = () =>
    import(/* webpackPrefetch: true */ "../views/Policy/Index.vue");
const NotFound = () =>
    import(/* webpackPrefetch: true */ "../views/NotFound.vue");

import AuthLayout from "../components/Layouts/AuthLayout.vue";
import GuestLayout from "../components/Layouts/GuestLayout.vue";
export default ({ authGuard, guestGuard }) => [
    // User routes
    ...authGuard([
        {
            path: "/",
            component: AuthLayout,
            redirect: "overview",
            meta: { auth: true },
            children: [
                {
                    path: "overview",
                    name: "overview",
                    component: Overview,
                    meta: {
                        title: i18n.t("user.overview.title"),
                        permission: "common@access",
                    },
                },
                {
                    path: "profile",
                    name: "profile",
                    component: Profile,
                    meta: {
                        title: i18n.t("user.profile.title"),
                        permission: "common@access",
                    },
                },
                {
                    path: "contract",
                    name: "contract",
                    component: Contract,
                    meta: {
                        title: i18n.t("user.contract.title"),
                        permission: "common@access",
                    },
                },
                {
                    path: "admin-users",
                    name: "users",
                    component: Users,
                    meta: {
                        title: i18n.t("admin.users.title"),
                        permission: "users@control",
                    },
                },
                {
                    path: "admin-contracts",
                    name: "contracts",
                    component: Contracts,
                    meta: {
                        title: i18n.t("admin.contracts.title"),
                        permission: "contracts@control",
                    },
                },
                {
                    path: "admin-sos",
                    name: "smartorders",
                    component: SmartOrders,
                    meta: {
                        title: i18n.t("admin.smartorders.title"),
                        permission: "copyists@control",
                    },
                },
                {
                    path: "admin-comments",
                    name: "comments",
                    component: Comments,
                    meta: {
                        title: i18n.t("admin.comments.title"),
                        permission: "comments@control",
                    },
                },
                {
                    path: "trading-order",
                    name: "order",
                    component: OrderChart,
                    meta: {
                        title: i18n.t("trading.orderChart.title"),
                        permission: "stock@order",
                    },
                },
                {
                    path: "trading-trades",
                    name: "trades",
                    component: Trades,
                    meta: {
                        title: i18n.t("trading.trades.title"),
                        permission: "trades@view",
                    },
                },
                {
                    path: "trading-finbooks",
                    name: "finbooks",
                    component: Finbooks,
                    meta: {
                        title: i18n.t("trading.finbooks.title"),
                        permission: "finbooks@control",
                    },
                },
                {
                    path: "setting-command",
                    name: "setting-command",
                    component: Command,
                    meta: {
                        title: i18n.t("settings.command.title"),
                        permission: "command@setting",
                    },
                },
                {
                    path: "setting-notification",
                    name: "setting-notification",
                    component: Notification,
                    meta: {
                        title: i18n.t("settings.notification.title"),
                        permission: "notification@setting",
                    },
                },
                {
                    path: "setting-files",
                    name: "setting-files",
                    component: Files,
                    meta: {
                        title: i18n.t("settings.files.title"),
                        permission: "files@setting",
                    },
                },
                {
                    path: "setting-log",
                    name: "setting-log",
                    component: Log,
                    meta: {
                        title: i18n.t("settings.log.title"),
                        permission: "log@setting",
                    },
                },
                {
                    path: "setting-faqs",
                    name: "setting-faqs",
                    component: Faqs,
                    meta: {
                        title: i18n.t("settings.faqs.title"),
                        permission: "faqs@setting",
                    },
                },
                {
                    path: "setting-parameters",
                    name: "setting-parameters",
                    component: Parameters,
                    meta: {
                        title: i18n.t("settings.parameters.title"),
                        permission: "parameters@setting",
                    },
                },
                {
                    path: "setting-database",
                    name: "setting-database",
                    component: Database,
                    meta: {
                        title: i18n.t("settings.database.title"),
                        permission: "database@setting",
                    },
                },
                {
                    path: "setting-roles",
                    name: "setting-roles",
                    component: Roles,
                    meta: {
                        title: i18n.t("settings.roles.title"),
                        permission: "roles@setting",
                    },
                },
                {
                    path: "setting-permissions",
                    name: "setting-permissions",
                    component: Permissions,
                    meta: {
                        title: i18n.t("settings.permissions.title"),
                        permission: "permissions@setting",
                    },
                },
            ],
        },
    ]),

    // Guest routes
    ...guestGuard([
        {
            path: "/",
            component: GuestLayout,
            meta: { auth: false },
            children: [
                {
                    path: "login",
                    name: "login",
                    component: Login,
                    meta: {
                        title: i18n.t("auth.login.title"),
                    },
                },
                {
                    path: "login-for-maintenance",
                    redirect: "login",
                },
                {
                    path: "create-account",
                    name: "create-account",
                    component: CreateAccount,
                    meta: {
                        title: i18n.t("auth.createAccount.title"),
                    },
                },
                {
                    path: "reset-password",
                    name: "reset-password",
                    component: ResetPassword,
                    meta: {
                        title: i18n.t("auth.resetPassword.title"),
                    },
                },
                {
                    path: "change-password",
                    component: ChangePassword,
                    meta: {
                        title: i18n.t("auth.resetPassword.title"),
                    },
                },
                {
                    path: "verify-email",
                    name: "verify-email",
                    component: VerifyEmail,
                    meta: {
                        title: i18n.t("auth.verifyEmail.title"),
                    },
                },
            ],
        },
        {
            path: "/policy",
            name: "policy",
            component: Policy,
            meta: { title: i18n.t("policy.title") },
        },
    ]),
    { path: "*", component: NotFound },
];
