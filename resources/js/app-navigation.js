import lang from "./lang";

export default [
    {
        text: lang.global.t("user.overview.title"),
        name: "overview",
        icon: "far fa-tachometer",
    },
    {
        text: lang.global.t("user.profile.title"),
        name: "profile",
        icon: "far fa-id-card",
        permissions: ["common@access"],
        level: 3,
    },
    {
        text: lang.global.t("user.contract.title"),
        name: "contract",
        icon: "far fa-usd-circle",
        permissions: ["common@access"],
        level: 5,
    },
    {
        text: lang.global.t("admin.title"),
        icon: "far fa-tools",
        permissions: [
            "users@control",
            "contracts@control",
            "copyists@control",
            "comments@control",
        ],
        items: [
            {
                text: lang.global.t("admin.users.title"),
                name: "users",
                icon: "far fa-user-cog",
                permissions: ["users@control"],
            },
            {
                text: lang.global.t("admin.contracts.title"),
                name: "contracts",
                icon: "far fa-file-invoice-dollar",
                permissions: ["contracts@control"],
            },
            {
                text: lang.global.t("admin.copyists.title"),
                name: "copyists",
                icon: "far fa-copy",
                permissions: ["copyists@control"],
            },
            {
                text: lang.global.t("admin.comments.title"),
                name: "comments",
                icon: "far fa-comment",
                permissions: ["comments@control"],
            },
        ],
    },
    {
        text: lang.global.t("trading.title"),
        icon: "far fa-chart-line",
        permissions: [
            "stock@order",
            "trades@view",
            "trades@edit",
            "finbooks@control",
        ],
        items: [
            {
                text: lang.global.t("trading.orderChart.title"),
                name: "order",
                icon: "far fa-gavel",
                permissions: ["stock@order"],
            },
            {
                text: lang.global.t("trading.trades.title"),
                name: "statistic",
                icon: "far fa-analytics",
                permissions: ["trades@view", "trades@edit"],
            },
            {
                text: lang.global.t("trading.finbooks.title"),
                name: "finbooks",
                icon: "far fa-book",
                permissions: ["finbooks@control"],
            },
        ],
    },
    {
        text: lang.global.t("settings.title"),
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
                text: lang.global.t("settings.command.title"),
                name: "setting-command",
                icon: "far fa-terminal",
                permissions: ["command@setting"],
            },
            {
                text: lang.global.t("settings.notification.title"),
                name: "setting-notification",
                icon: "far fa-paper-plane",
                permissions: ["notification@setting"],
            },
            {
                text: lang.global.t("settings.files.title"),
                name: "setting-files",
                icon: "far fa-folder-tree",
                permissions: ["files@setting"],
            },
            {
                text: lang.global.t("settings.log.title"),
                name: "setting-log",
                icon: "far fa-clipboard-list",
                permissions: ["log@setting"],
            },
            {
                text: lang.global.t("settings.faqs.title"),
                name: "setting-faqs",
                icon: "far fa-question-square",
                permissions: ["faqs@setting"],
            },
            {
                text: lang.global.t("settings.parameters.title"),
                name: "setting-parameters",
                icon: "far fa-sliders-h",
                permissions: ["parameters@setting"],
            },
            {
                text: lang.global.t("settings.database.title"),
                name: "setting-database",
                icon: "far fa-database",
                permissions: ["database@setting"],
            },
            {
                text: lang.global.t("settings.roles.title"),
                name: "setting-roles",
                icon: "far fa-user-tag",
                permissions: ["roles@setting"],
            },
            {
                text: lang.global.t("settings.permissions.title"),
                name: "setting-permissions",
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
