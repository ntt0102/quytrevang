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
const Settings = () =>
    import(/* webpackPrefetch: true */ "../views/admin/Settings");
const Finbooks = () =>
    import(/* webpackPrefetch: true */ "../views/admin/Finbooks");
const Trades = () =>
    import(/* webpackPrefetch: true */ "../views/admin/Trades");
const Comments = () =>
    import(/* webpackPrefetch: true */ "../views/admin/Comments");

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
                        permission: "profile@control"
                    }
                },
                {
                    path: "profile",
                    name: "profile",
                    component: Profile,
                    meta: {
                        title: i18n.t("user.profile.title"),
                        permission: "profile@control"
                    }
                },
                {
                    path: "contract",
                    name: "contract",
                    component: Contract,
                    meta: {
                        title: i18n.t("user.contract.title"),
                        permission: "contract@control"
                    }
                },
                {
                    path: "admin-users",
                    name: "users",
                    component: Users,
                    meta: {
                        title: i18n.t("admin.users.title"),
                        permission: "users@control"
                    }
                },
                {
                    path: "admin-contracts",
                    name: "contracts",
                    component: Contracts,
                    meta: {
                        title: i18n.t("admin.contracts.title"),
                        permission: "contracts@control"
                    }
                },
                {
                    path: "settings",
                    name: "settings",
                    component: Settings,
                    meta: {
                        title: i18n.t("admin.settings.title"),
                        permission: "setting@control"
                    }
                },
                {
                    path: "admin-finbooks",
                    name: "finbooks",
                    component: Finbooks,
                    meta: {
                        title: i18n.t("admin.finbooks.title"),
                        permission: "finbooks@control"
                    }
                },
                {
                    path: "admin-trades",
                    name: "trades",
                    component: Trades,
                    meta: {
                        title: i18n.t("admin.trades.title"),
                        permission: "trades@view"
                    }
                },
                {
                    path: "admin-comments",
                    name: "comments",
                    component: Comments,
                    meta: {
                        title: i18n.t("admin.comments.title"),
                        permission: "comments@control"
                    }
                }
            ]
        }
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
                        title: i18n.t("auth.login.title")
                    }
                },
                {
                    path: "login-for-maintenance",
                    redirect: "login"
                },
                {
                    path: "create-account",
                    name: "create-account",
                    component: CreateAccount,
                    meta: {
                        title: i18n.t("auth.createAccount.title")
                    }
                },
                {
                    path: "reset-password",
                    name: "reset-password",
                    component: ResetPassword,
                    meta: {
                        title: i18n.t("auth.resetPassword.title")
                    }
                },
                {
                    path: "change-password",
                    component: ChangePassword,
                    meta: {
                        title: i18n.t("auth.resetPassword.title")
                    }
                },
                {
                    path: "verify-email",
                    name: "verify-email",
                    component: VerifyEmail,
                    meta: {
                        title: i18n.t("auth.verifyEmail.title")
                    }
                }
            ]
        },
        {
            path: "/policy",
            name: "policy",
            component: Policy,
            meta: { title: i18n.t("policy.title") }
        }
    ]),
    { path: "*", component: NotFound }
];
