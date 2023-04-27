import i18n from "../plugins/i18n";

const Overview = () =>
    import(/* webpackPrefetch: true */ "../views/user/Overview");
const Profile = () =>
    import(/* webpackPrefetch: true */ "../views/user/Profile");
const Contract = () =>
    import(/* webpackPrefetch: true */ "../views/user/Contract");

const Users = () => import(/* webpackPrefetch: true */ "../views/admin/Users");
const Contracts = () =>
    import(/* webpackPrefetch: true */ "../views/admin/Contracts");
const SmartOrders = () =>
    import(/* webpackPrefetch: true */ "../views/admin/SmartOrders");
const Comments = () =>
    import(/* webpackPrefetch: true */ "../views/admin/Comments");

const OrderChart = () =>
    import(/* webpackPrefetch: true */ "../views/Trading/OrderChart");
const Trades = () =>
    import(/* webpackPrefetch: true */ "../views/Trading/Trades");
const Finbooks = () =>
    import(/* webpackPrefetch: true */ "../views/Trading/Finbooks");

const Command = () =>
    import(/* webpackPrefetch: true */ "../views/Settings/Command");
const Notification = () =>
    import(/* webpackPrefetch: true */ "../views/Settings/Notification");
const Files = () =>
    import(/* webpackPrefetch: true */ "../views/Settings/Files");
const Log = () => import(/* webpackPrefetch: true */ "../views/Settings/Log");
const Faqs = () => import(/* webpackPrefetch: true */ "../views/Settings/Faqs");
const Parameters = () =>
    import(/* webpackPrefetch: true */ "../views/Settings/Parameters");
const Database = () =>
    import(/* webpackPrefetch: true */ "../views/Settings/Database");
const Roles = () =>
    import(/* webpackPrefetch: true */ "../views/Settings/Roles");
const Permissions = () =>
    import(/* webpackPrefetch: true */ "../views/Settings/Permissions");

const Login = () => import(/* webpackPrefetch: true */ "../views/auth/Login");
const CreateAccount = () =>
    import(/* webpackPrefetch: true */ "../views/auth/CreateAccount");
const ResetPassword = () =>
    import(/* webpackPrefetch: true */ "../views/auth/ResetPassword");
const ChangePassword = () =>
    import(/* webpackPrefetch: true */ "../views/auth/ChangePassword");
const VerifyEmail = () =>
    import(/* webpackPrefetch: true */ "../views/auth/VerifyEmail");

const Policy = () => import(/* webpackPrefetch: true */ "../views/Policy");
const NotFound = () => import(/* webpackPrefetch: true */ "../views/NotFound");

import AuthLayout from "../components/Layouts/AuthLayout";
import GuestLayout from "../components/Layouts/GuestLayout";
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
                        title: i18n.t("admin.orderChart.title"),
                        permission: "stock@order",
                    },
                },
                {
                    path: "trading-trades",
                    name: "trades",
                    component: Trades,
                    meta: {
                        title: i18n.t("admin.trades.title"),
                        permission: "trades@view",
                    },
                },
                {
                    path: "trading-finbooks",
                    name: "finbooks",
                    component: Finbooks,
                    meta: {
                        title: i18n.t("admin.finbooks.title"),
                        permission: "finbooks@control",
                    },
                },
                {
                    path: "setting-command",
                    name: "command",
                    component: Command,
                    meta: {
                        title: i18n.t("admin.settings.command.title"),
                        permission: "command@setting",
                    },
                },
                {
                    path: "setting-notification",
                    name: "notification",
                    component: Notification,
                    meta: {
                        title: i18n.t("admin.settings.notification.title"),
                        permission: "notification@setting",
                    },
                },
                {
                    path: "setting-files",
                    name: "files",
                    component: Files,
                    meta: {
                        title: i18n.t("admin.settings.files.title"),
                        permission: "files@setting",
                    },
                },
                {
                    path: "setting-log",
                    name: "log",
                    component: Log,
                    meta: {
                        title: i18n.t("admin.settings.log.title"),
                        permission: "log@setting",
                    },
                },
                {
                    path: "setting-faqs",
                    name: "faqs",
                    component: Faqs,
                    meta: {
                        title: i18n.t("admin.settings.faqs.title"),
                        permission: "faqs@setting",
                    },
                },
                {
                    path: "setting-parameters",
                    name: "parameters",
                    component: Parameters,
                    meta: {
                        title: i18n.t("admin.settings.parameters.title"),
                        permission: "parameters@setting",
                    },
                },
                {
                    path: "setting-database",
                    name: "database",
                    component: Database,
                    meta: {
                        title: i18n.t("admin.settings.database.title"),
                        permission: "database@setting",
                    },
                },
                {
                    path: "setting-roles",
                    name: "roles",
                    component: Roles,
                    meta: {
                        title: i18n.t("admin.settings.roles.title"),
                        permission: "roles@setting",
                    },
                },
                {
                    path: "setting-permissions",
                    name: "permissions",
                    component: Permissions,
                    meta: {
                        title: i18n.t("admin.settings.permissions.title"),
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
