import i18n from "../plugins/i18n";

export default [
    {
        text: i18n.t("user.overview.title"),
        name: "overview",
        icon: "far fa-tachometer"
    },
    {
        text: i18n.t("user.profile.title"),
        name: "profile",
        icon: "far fa-id-card",
        permission: "profile@control",
        level: 3
    },
    {
        text: i18n.t("user.contract.title"),
        name: "contract",
        icon: "far fa-usd-circle",
        permission: "contract@control",
        level: 5
    },
    {
        text: i18n.t("admin.users.title"),
        name: "users",
        icon: "far fa-user-cog",
        permission: "users@control"
    },
    {
        text: i18n.t("admin.contracts.title"),
        name: "contracts",
        icon: "far fa-file-invoice-dollar",
        permission: "contracts@control"
    },
    {
        text: i18n.t("admin.finbooks.title"),
        name: "finbooks",
        icon: "far fa-book",
        permission: "finbooks@control"
    },
    {
        text: i18n.t("admin.trades.title"),
        name: "trades",
        icon: "far fa-analytics",
        permission: "trades@view"
    },
    {
        text: i18n.t("admin.comments.title"),
        name: "comments",
        icon: "far fa-comment",
        permission: "comments@control"
    },
    {
        text: i18n.t("admin.settings.title"),
        name: "settings",
        icon: "far fa-cog",
        permission: "setting@control",
        level: 3
    },
    {
        text: "Làm mới",
        name: "refresh",
        icon: "far fa-sync"
    }
];
