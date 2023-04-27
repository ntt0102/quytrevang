import i18n from "../plugins/i18n";

export default [
    {
        text: i18n.t("user.overview.title"),
        name: "overview",
        icon: "far fa-tachometer",
    },
    {
        text: i18n.t("user.profile.title"),
        name: "profile",
        icon: "far fa-id-card",
        permissions: ["common@access"],
        level: 3,
    },
    {
        text: i18n.t("user.contract.title"),
        name: "contract",
        icon: "far fa-usd-circle",
        permissions: ["common@access"],
        level: 5,
    },
    {
        text: i18n.t("admin.title"),
        icon: "far fa-tools",
        permissions: [
            "users@control",
            "contracts@control",
            "copyists@control",
            "comments@control",
        ],
        items: [
            {
                text: i18n.t("admin.users.title"),
                name: "users",
                icon: "far fa-user-cog",
                permissions: ["users@control"],
            },
            {
                text: i18n.t("admin.contracts.title"),
                name: "contracts",
                icon: "far fa-file-invoice-dollar",
                permissions: ["contracts@control"],
            },
            {
                text: i18n.t("admin.smartorders.title"),
                name: "smartorders",
                icon: "far fa-store",
                permissions: ["copyists@control"],
            },
            {
                text: i18n.t("admin.comments.title"),
                name: "comments",
                icon: "far fa-comment",
                permissions: ["comments@control"],
            },
        ],
    },
    {
        text: i18n.t("trading.title"),
        icon: "far fa-chart-line",
        permissions: [
            "stock@order",
            "trades@view",
            "trades@edit",
            "finbooks@control",
        ],
        items: [
            {
                text: i18n.t("trading.orderChart.title"),
                name: "order",
                icon: "far fa-gavel",
                permissions: ["stock@order"],
            },
            {
                text: i18n.t("trading.trades.title"),
                name: "trades",
                icon: "far fa-analytics",
                permissions: ["trades@view", "trades@edit"],
            },
            {
                text: i18n.t("trading.finbooks.title"),
                name: "finbooks",
                icon: "far fa-book",
                permissions: ["finbooks@control"],
            },
        ],
    },
    {
        text: i18n.t("settings.title"),
        icon: "far fa-cog",
        permissions: [
            "command@setting",
            "notification@setting",
            "files@setting",
            "log@setting",
            "faqs@setting",
            "parameters@setting",
            "database@setting",
            "roles@setting",
            "permissions@setting",
        ],
        items: [
            {
                text: i18n.t("settings.command.title"),
                name: "command",
                icon: "far fa-terminal",
                permissions: ["command@setting"],
            },
            {
                text: i18n.t("settings.notification.title"),
                name: "notification",
                icon: "far fa-paper-plane",
                permissions: ["notification@setting"],
            },
            {
                text: i18n.t("settings.files.title"),
                name: "files",
                icon: "far fa-folder-tree",
                permissions: ["files@setting"],
            },
            {
                text: i18n.t("settings.log.title"),
                name: "log",
                icon: "far fa-clipboard-list",
                permissions: ["log@setting"],
            },
            {
                text: i18n.t("settings.faqs.title"),
                name: "faqs",
                icon: "far fa-question-square",
                permissions: ["faqs@setting"],
            },
            {
                text: i18n.t("settings.parameters.title"),
                name: "parameters",
                icon: "far fa-sliders-h",
                permissions: ["parameters@setting"],
            },
            {
                text: i18n.t("settings.database.title"),
                name: "database",
                icon: "far fa-database",
                permissions: ["database@setting"],
            },
            {
                text: i18n.t("settings.roles.title"),
                name: "roles",
                icon: "far fa-user-tag",
                permissions: ["roles@setting"],
            },
            {
                text: i18n.t("settings.permissions.title"),
                name: "permissions",
                icon: "far fa-user-shield",
                permissions: ["permissions@setting"],
            },
        ],
    },
    {
        text: "Làm mới",
        name: "refresh",
        icon: "far fa-sync",
    },
];
