import lang from "../lang";

import AuthLayout from "../components/Layouts/AuthLayout.vue";
import GuestLayout from "../components/Layouts/GuestLayout.vue";
import Policy from "../views/Policy/Index.vue";

function loadView(name1, name2, name3) {
    if (!!name3) return () => import(`../views/${name1}/${name2}/${name3}.vue`);
    if (!!name2) return () => import(`../views/${name1}/${name2}.vue`);
    return () => import(`../views/${name1}.vue`);
}
const guestRoute = [
    {
        path: "/login",
        name: "login",
        meta: {
            auth: false,
            layout: GuestLayout,
            title: lang.global.t("auth.login.title"),
        },
        component: loadView("Auth", "Login"),
    },
    {
        path: "/login-for-maintenance",
        redirect: "login",
    },
    {
        path: "/register",
        name: "create-account",
        meta: {
            auth: false,
            layout: GuestLayout,
            title: lang.global.t("auth.createAccount.title"),
        },
        component: loadView("Auth", "Register"),
    },
    {
        path: "/reset-password",
        name: "reset-password",
        meta: {
            auth: false,
            layout: GuestLayout,
            title: lang.global.t("auth.resetPassword.title"),
        },
        component: loadView("Auth", "ResetPassword"),
    },
    {
        path: "/change-password",
        meta: {
            auth: false,
            layout: GuestLayout,
            title: lang.global.t("auth.resetPassword.title"),
        },
        component: loadView("Auth", "ChangePassword"),
    },
    {
        path: "/verify-email",
        name: "verify-email",
        meta: {
            auth: false,
            layout: GuestLayout,
            title: lang.global.t("auth.verifyEmail.title"),
            description: lang.global.t("auth.verifyEmail.description"),
        },
        component: loadView("Auth", "VerifyEmail"),
    },
    {
        path: "/policy",
        name: "policy",
        meta: { layout: Policy, title: lang.global.t("policy.title") },
        component: {},
    },
    { path: "/:pathMatch(.*)*", component: loadView("NotFound") },
];
const authRoute = [
    // User
    {
        path: "/",
        redirect: "/overview",
    },
    {
        path: "/overview",
        name: "overview",
        meta: {
            auth: true,
            permission: "common@access",
            title: lang.global.t("user.overview.title"),
            layout: AuthLayout,
        },
        component: loadView("User", "Overview", "Index"),
    },
    {
        path: "/profile",
        name: "profile",
        meta: {
            auth: true,
            permission: "common@access",
            title: lang.global.t("user.profile.title"),
            layout: AuthLayout,
        },
        component: loadView("User", "Profile", "Index"),
    },
    {
        path: "/contract",
        name: "contract",
        meta: {
            auth: true,
            permission: "common@access",
            title: lang.global.t("user.contract.title"),
            layout: AuthLayout,
        },
        component: loadView("User", "Contract", "Index"),
    },
    // Manager
    {
        path: "/admin-users",
        name: "users",
        meta: {
            auth: true,
            permission: "users@control",
            title: lang.global.t("admin.users.title"),
            layout: AuthLayout,
        },
        component: loadView("Admin", "User", "Index"),
    },
    {
        path: "/admin-contracts",
        name: "contracts",
        meta: {
            auth: true,
            permission: "contracts@control",
            title: lang.global.t("admin.contracts.title"),
            layout: AuthLayout,
        },
        component: loadView("Admin", "Contract", "Index"),
    },
    {
        path: "/admin-comments",
        name: "comments",
        meta: {
            auth: true,
            permission: "comments@control",
            title: lang.global.t("admin.comments.title"),
            layout: AuthLayout,
        },
        component: loadView("Admin", "Comments"),
    },
    // Trading
    {
        path: "/trading-order",
        name: "order",
        meta: {
            auth: true,
            permission: "stock@order",
            title: lang.global.t("trading.orderChart.title"),
            layout: AuthLayout,
        },
        component: loadView("Trading", "Order", "Index"),
    },
    {
        path: "/trading-statistic",
        name: "statistic",
        meta: {
            auth: true,
            permission: "stock@order",
            title: lang.global.t("trading.trades.title"),
            layout: AuthLayout,
        },
        component: loadView("Trading", "Statistic", "Index"),
    },
    {
        path: "/trading-finbooks",
        name: "finbooks",
        meta: {
            auth: true,
            permission: "finbooks@control",
            title: lang.global.t("trading.finbooks.title"),
            layout: AuthLayout,
        },
        component: loadView("Trading", "Finbook", "Index"),
    },
    // Settings
    {
        path: "/setting-command",
        name: "setting-command",
        meta: {
            auth: true,
            permission: "command@setting",
            title: lang.global.t("settings.command.title"),
            layout: AuthLayout,
        },
        component: loadView("Settings", "Command"),
    },
    {
        path: "/setting-notification",
        name: "setting-notification",
        meta: {
            auth: true,
            permission: "notification@setting",
            title: lang.global.t("settings.notification.title"),
            layout: AuthLayout,
        },
        component: loadView("Settings", "Notification"),
    },
    {
        path: "/setting-files",
        name: "setting-files",
        meta: {
            auth: true,
            permission: "files@setting",
            title: lang.global.t("settings.files.title"),
            layout: AuthLayout,
        },
        component: loadView("Settings", "Files"),
    },
    {
        path: "/setting-log",
        name: "setting-log",
        meta: {
            auth: true,
            permission: "log@setting",
            title: lang.global.t("settings.log.title"),
            layout: AuthLayout,
        },
        component: loadView("Settings", "Log"),
    },
    {
        path: "/setting-faqs",
        name: "setting-faqs",
        meta: {
            auth: true,
            permission: "faqs@setting",
            title: lang.global.t("settings.faqs.title"),
            layout: AuthLayout,
        },
        component: loadView("Settings", "Faqs"),
    },
    {
        path: "/setting-parameters",
        name: "setting-parameters",
        meta: {
            auth: true,
            permission: "parameters@setting",
            title: lang.global.t("settings.parameters.title"),
            layout: AuthLayout,
        },
        component: loadView("Settings", "Parameters"),
    },
    {
        path: "/setting-database",
        name: "setting-database",
        meta: {
            auth: true,
            permission: "database@setting",
            title: lang.global.t("settings.database.title"),
            layout: AuthLayout,
        },
        component: loadView("Settings", "Database"),
    },
    {
        path: "/setting-roles",
        name: "setting-roles",
        meta: {
            auth: true,
            permission: "roles@setting",
            title: lang.global.t("settings.roles.title"),
            layout: AuthLayout,
        },
        component: loadView("Settings", "Roles"),
    },
    {
        path: "/setting-permissions",
        name: "setting-permissions",
        meta: {
            auth: true,
            permission: "permissions@setting",
            title: lang.global.t("settings.permissions.title"),
            layout: AuthLayout,
        },
        component: loadView("Settings", "Permissions"),
    },
];
export default [...guestRoute, ...authRoute];
