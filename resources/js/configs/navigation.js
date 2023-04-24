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
        permissions: ["profile@control"],
        level: 3
    },
    {
        text: i18n.t("user.contract.title"),
        name: "contract",
        icon: "far fa-usd-circle",
        permissions: ["contract@control"],
        level: 5
    },
    {
        text: i18n.t("admin.manager"),
        icon: "far fa-tools",
        permissions: [
            "users@control",
            "contracts@control",
            "finbooks@control",
            "trades@view",
            "smartorders@control",
            "comments@control",
            "setting@control"
        ],
        items: [
            {
                text: i18n.t("admin.users.title"),
                name: "users",
                icon: "far fa-user-cog",
                permissions: ["users@control"]
            },
            {
                text: i18n.t("admin.contracts.title"),
                name: "contracts",
                icon: "far fa-file-invoice-dollar",
                permissions: ["contracts@control"]
            },
            {
                text: i18n.t("admin.smartorders.title"),
                name: "smartorders",
                icon: "far fa-store",
                permissions: ["smartorders@control"]
            },
            {
                text: i18n.t("admin.comments.title"),
                name: "comments",
                icon: "far fa-comment",
                permissions: ["comments@control"]
            },
            {
                text: i18n.t("admin.settings.title"),
                name: "settings",
                icon: "far fa-cog",
                permissions: ["setting@control"],
                level: 3
            }
        ]
    },
    {
        text: i18n.t("admin.trading"),
        icon: "far fa-chart-line",
        permissions: [
            "orderChart@control",
            "trades@view",
            "trades@edit",
            "finbooks@control"
        ],
        items: [
            {
                text: i18n.t("admin.orderChart.title"),
                name: "orderChart",
                icon: "far fa-gavel",
                permissions: ["orderChart@control"]
            },
            {
                text: i18n.t("admin.trades.title"),
                name: "trades",
                icon: "far fa-analytics",
                permissions: ["trades@view", "trades@edit"]
            },
            {
                text: i18n.t("admin.finbooks.title"),
                name: "finbooks",
                icon: "far fa-book",
                permissions: ["finbooks@control"]
            }
        ]
    },
    {
        text: "Làm mới",
        name: "refresh",
        icon: "far fa-sync"
    }
];
