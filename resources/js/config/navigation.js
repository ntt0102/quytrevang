import lang from "../lang";

export default [
    {
        text: lang.global.t("user.overview.title"),
        name: "overview",
        icon: "far fa-tachometer",
        permissions: ["user:access_overview"],
    },
    {
        text: lang.global.t("user.profile.title"),
        name: "profile",
        icon: "far fa-id-card",
        permissions: ["user:access_profile"],
        level: 3,
    },
    {
        text: lang.global.t("user.contract.title"),
        name: "contract",
        icon: "far fa-usd-circle",
        permissions: ["user:access_contract"],
        level: 5,
    },
    {
        text: lang.global.t("admin.title"),
        name: "admin",
        icon: "far fa-tools",
        permissions: [
            "admin:manage_users",
            "admin:manage_contracts",
            "admin:manage_comments",
        ],
        items: [
            {
                text: lang.global.t("admin.users.title"),
                name: "admin-user",
                icon: "far fa-user-cog",
                permissions: ["admin:manage_users"],
            },
            {
                text: lang.global.t("admin.contracts.title"),
                name: "admin-contract",
                icon: "far fa-file-invoice-dollar",
                permissions: ["admin:manage_contracts"],
            },
            {
                text: lang.global.t("admin.comments.title"),
                name: "admin-comment",
                icon: "far fa-comment",
                permissions: ["admin:manage_comments"],
            },
        ],
    },
    {
        text: lang.global.t("trading.title"),
        icon: "far fa-chart-line",
        permissions: [
            "admin:order_derivative",
            "admin:statistic_derivative",
            "admin:access_share",
            "admin:statistic_share",
            "admin:access_finbooks",
        ],
        items: [
            {
                text: lang.global.t("trading.derivative.title"),
                name: "trading-derivative",
                icon: "far fa-bolt",
                permissions: ["admin:order_derivative"],
            },
            {
                text: lang.global.t("trading.derstats.title"),
                name: "trading-derstats",
                icon: "far fa-analytics",
                permissions: ["admin:statistic_derivative"],
            },
            {
                text: lang.global.t("trading.share.title"),
                name: "trading-share",
                icon: "far fa-gavel",
                permissions: ["admin:access_share"],
            },
            {
                text: lang.global.t("trading.shrstats.title"),
                name: "trading-shrstats",
                icon: "far fa-chart-scatter",
                permissions: ["admin:statistic_share"],
            },
            {
                text: lang.global.t("trading.finbooks.title"),
                name: "trading-finbook",
                icon: "far fa-book",
                permissions: ["admin:access_finbooks"],
            },
        ],
    },
    {
        text: lang.global.t("settings.title"),
        icon: "far fa-cog",
        permissions: [
            "admin:setting_command",
            "admin:setting_notification",
            "admin:setting_files",
            "admin:setting_log",
            "admin:setting_faqs",
            "admin:setting_parameters",
            "admin:setting_database",
            "admin:setting_roles",
            "admin:setting_permissions",
        ],
        items: [
            {
                text: lang.global.t("settings.command.title"),
                name: "setting-command",
                icon: "far fa-terminal",
                permissions: ["admin:setting_command"],
            },
            {
                text: lang.global.t("settings.notification.title"),
                name: "setting-notification",
                icon: "far fa-paper-plane",
                permissions: ["admin:setting_notification"],
            },
            {
                text: lang.global.t("settings.files.title"),
                name: "setting-file",
                icon: "far fa-folder-tree",
                permissions: ["admin:setting_files"],
            },
            {
                text: lang.global.t("settings.log.title"),
                name: "setting-log",
                icon: "far fa-clipboard-list",
                permissions: ["admin:setting_log"],
            },
            {
                text: lang.global.t("settings.faqs.title"),
                name: "setting-faq",
                icon: "far fa-question-square",
                permissions: ["admin:setting_faqs"],
            },
            {
                text: lang.global.t("settings.parameters.title"),
                name: "setting-parameter",
                icon: "far fa-sliders-h",
                permissions: ["admin:setting_parameters"],
            },
            {
                text: lang.global.t("settings.database.title"),
                name: "setting-database",
                icon: "far fa-database",
                permissions: ["admin:setting_database"],
            },
            {
                text: lang.global.t("settings.roles.title"),
                name: "setting-role",
                icon: "far fa-user-tag",
                permissions: ["admin:setting_roles"],
            },
            {
                text: lang.global.t("settings.permissions.title"),
                name: "setting-permission",
                icon: "far fa-user-shield",
                permissions: ["admin:setting_permissions"],
            },
        ],
    },
    {
        text: "Làm mới",
        name: "refresh",
        icon: "far fa-sync",
    },
];
