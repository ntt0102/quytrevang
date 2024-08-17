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
        path: `/${lang.global.t("route.login")}`,
        name: "login",
        meta: {
            auth: false,
            layout: GuestLayout,
            title: lang.global.t("auth.login.title"),
        },
        component: loadView("Auth", "Login"),
    },
    {
        path: `/${lang.global.t("route.loginMaintain")}`,
        redirect: `/${lang.global.t("route.login")}`,
    },
    {
        path: `/${lang.global.t("route.register")}`,
        name: "register",
        meta: {
            auth: false,
            layout: GuestLayout,
            title: lang.global.t("auth.createAccount.title"),
        },
        component: loadView("Auth", "Register"),
    },
    {
        path: `/${lang.global.t("route.resetPassword")}`,
        name: "reset-password",
        meta: {
            auth: false,
            layout: GuestLayout,
            title: lang.global.t("auth.resetPassword.title"),
        },
        component: loadView("Auth", "ResetPassword"),
    },
    {
        path: `/${lang.global.t("route.changePassword")}`,
        meta: {
            auth: false,
            layout: GuestLayout,
            title: lang.global.t("auth.resetPassword.title"),
        },
        component: loadView("Auth", "ChangePassword"),
    },
    {
        path: `/${lang.global.t("route.verifyEmail")}`,
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
        path: `/${lang.global.t("route.policy")}`,
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
        redirect: `/${lang.global.t("route.overview")}`,
    },
    {
        path: `/${lang.global.t("route.overview")}`,
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
        path: `/${lang.global.t("route.profile")}`,
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
        path: `/${lang.global.t("route.contract")}`,
        name: "contract",
        meta: {
            auth: true,
            permission: "common@access",
            title: lang.global.t("user.contract.title"),
            layout: AuthLayout,
        },
        component: loadView("User", "Contract", "Index"),
    },
    {
        path: `/${lang.global.t("route.copyist")}`,
        name: "copyist",
        meta: {
            auth: true,
            permission: "common@access",
            title: lang.global.t("user.copyist.title"),
            layout: AuthLayout,
        },
        component: loadView("User", "Copyist", "Index"),
    },
    // Manager
    {
        path: `/${lang.global.t("route.adminUser")}`,
        name: "admin-user",
        meta: {
            auth: true,
            permission: "users@control",
            title: lang.global.t("admin.users.title"),
            layout: AuthLayout,
        },
        component: loadView("Admin", "User", "Index"),
    },
    {
        path: `/${lang.global.t("route.adminContract")}`,
        name: "admin-contract",
        meta: {
            auth: true,
            permission: "contracts@control",
            title: lang.global.t("admin.contracts.title"),
            layout: AuthLayout,
        },
        component: loadView("Admin", "Contract", "Index"),
    },
    {
        path: `/${lang.global.t("route.adminCopyist")}`,
        name: "admin-copyist",
        meta: {
            auth: true,
            permission: "copyists@control",
            title: lang.global.t("admin.copyists.title"),
            layout: AuthLayout,
        },
        component: loadView("Admin", "Copyist", "Index"),
    },
    {
        path: `/${lang.global.t("route.adminComment")}`,
        name: "admin-comment",
        meta: {
            auth: true,
            permission: "comments@control",
            title: lang.global.t("admin.comments.title"),
            layout: AuthLayout,
        },
        component: loadView("Admin", "Comment"),
    },
    // Trading
    {
        path: `/${lang.global.t("route.tradingOrder")}`,
        name: "trading-derivative",
        meta: {
            auth: true,
            permission: "stock@order",
            title: lang.global.t("trading.derivative.title"),
            layout: AuthLayout,
        },
        component: loadView("Trading", "Order", "Index"),
    },
    {
        path: `/${lang.global.t("route.tradingStock")}`,
        name: "trading-share",
        meta: {
            auth: true,
            permission: "stock@order",
            title: lang.global.t("trading.share.title"),
            layout: AuthLayout,
        },
        component: loadView("Trading", "Stock", "Index"),
    },
    {
        path: `/${lang.global.t("route.tradingStatistic")}`,
        name: "trading-shrstats",
        meta: {
            auth: true,
            permission: "stock@order",
            title: lang.global.t("trading.shrstats.title"),
            layout: AuthLayout,
        },
        component: loadView("Trading", "Statistic", "Index"),
    },
    {
        path: `/${lang.global.t("route.tradingStatistic1")}`,
        name: "trading-derstats",
        meta: {
            auth: true,
            permission: "stock@order",
            title: lang.global.t("trading.derstats.title"),
            layout: AuthLayout,
        },
        component: loadView("Trading", "Statistic1", "Index"),
    },
    {
        path: `/${lang.global.t("route.tradingFinbook")}`,
        name: "trading-finbook",
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
        path: `/${lang.global.t("route.settingCommand")}`,
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
        path: `/${lang.global.t("route.settingNotification")}`,
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
        path: `/${lang.global.t("route.settingFile")}`,
        name: "setting-file",
        meta: {
            auth: true,
            permission: "files@setting",
            title: lang.global.t("settings.files.title"),
            layout: AuthLayout,
        },
        component: loadView("Settings", "Files"),
    },
    {
        path: `/${lang.global.t("route.settingLog")}`,
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
        path: `/${lang.global.t("route.settingFaq")}`,
        name: "setting-faq",
        meta: {
            auth: true,
            permission: "faqs@setting",
            title: lang.global.t("settings.faqs.title"),
            layout: AuthLayout,
        },
        component: loadView("Settings", "Faqs"),
    },
    {
        path: `/${lang.global.t("route.settingParameter")}`,
        name: "setting-parameter",
        meta: {
            auth: true,
            permission: "parameters@setting",
            title: lang.global.t("settings.parameters.title"),
            layout: AuthLayout,
        },
        component: loadView("Settings", "Parameters"),
    },
    {
        path: `/${lang.global.t("route.settingDatabase")}`,
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
        path: `/${lang.global.t("route.settingRole")}`,
        name: "setting-role",
        meta: {
            auth: true,
            permission: "roles@setting",
            title: lang.global.t("settings.roles.title"),
            layout: AuthLayout,
        },
        component: loadView("Settings", "Roles"),
    },
    {
        path: `/${lang.global.t("route.settingPermission")}`,
        name: "setting-permission",
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
