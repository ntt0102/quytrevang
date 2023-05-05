<template>
    <div class="side-nav-inner-toolbar">
        <DxDrawer
            class="drawer"
            position="before"
            template="menu"
            :opened.sync="menuOpened"
            :opened-state-mode="drawerOptions.menuMode"
            :reveal-mode="drawerOptions.menuRevealMode"
            :min-size="drawerOptions.minMenuSize"
            :shading="drawerOptions.shaderEnabled"
            :close-on-outside-click="drawerOptions.closeOnOutsideClick"
        >
            <div class="container">
                <HeaderToolbar
                    :menu-toggle-enabled="headerMenuTogglerEnabled"
                    :toggle-menu-func="toggleMenu"
                />
                <DxScrollView ref="scrollView" class="layout-body with-footer">
                    <div class="content">
                        <transition name="fade" mode="out-in">
                            <RouterView :key="$route.name" />
                        </transition>
                    </div>
                    <AppFooter />
                </DxScrollView>
            </div>
            <template #menu>
                <SideNavMenu
                    :compact-mode="!menuOpened"
                    @click="handleSideBarClick"
                >
                    <DxToolbar
                        class="navigation-header"
                        :items="[
                            {
                                visible: !isSmall,
                                location: 'before',
                                cssClass: 'menu-button',
                                widget: 'dxButton',
                                options: {
                                    icon: 'menu',
                                    stylingMode: 'text',
                                    onClick: toggleMenu,
                                },
                            },
                            {
                                location: 'before',
                                cssClass: 'header-title dx-toolbar-label',
                                template: 'appNameTemplate',
                            },
                        ]"
                    >
                        <template #appNameTemplate>
                            <div class="logo" :class="{ small: isSmall }">
                                <img
                                    src="../../../images/android-chrome-reverse-512x512.png"
                                    :alt="$appName"
                                />
                                <div>{{ $appName }}</div>
                            </div>
                        </template>
                    </DxToolbar>
                </SideNavMenu>
            </template>
        </DxDrawer>
        <InstallAppPopup ref="installAppPopup" />
        <CheckPinPopup ref="checkPinPopup" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Pusher from "pusher-js";
import DxDrawer from "devextreme-vue/drawer";
import HeaderToolbar from "../Partials/HeaderToolbar";
import SideNavMenu from "../Partials/SideNavMenu";
import AppFooter from "../Partials/AppFooter";
import InstallAppPopup from "../Popups/InstallAppPopup.vue";
import CheckPinPopup from "../Popups/CheckPinPopup.vue";
import userLayoutStore from "../../store/modules/User/Layout";
import userProfileStore from "../../store/modules/User/Profile";

export default {
    components: {
        DxDrawer,
        HeaderToolbar,
        SideNavMenu,
        AppFooter,
        InstallAppPopup,
        CheckPinPopup,
    },
    props: {
        isSmall: Boolean,
        isLarge: Boolean,
    },
    data() {
        return {
            menuOpened: this.isLarge,
            menuTemporaryOpened: false,
        };
    },
    beforeCreate() {
        this.$store.registerModule("User.layout", userLayoutStore);
        this.$store.registerModule("User.profile", userProfileStore);
    },
    created() {
        this.registerServiceWorker();
        this.initLayout();
        this.fetchNotification();
        this.initPushNotification();
        this.connectPusher();
    },
    mounted() {
        this.$mf.removePreload();
        this.$refs.installAppPopup.show();
        this.$bus.on("checkPin", (callback, forcePin = false) =>
            this.$refs.checkPinPopup.show({ callback, forcePin })
        );
    },
    destroyed() {
        this.$store.unregisterModule("User.layout");
        this.$store.unregisterModule("User.profile");
        this.$pusher.disconnect();
        this.$bus.off("checkPin");
    },
    computed: {
        ...mapGetters("Auth", ["id", "permissions", "token"]),
        drawerOptions() {
            const shaderEnabled = !this.isLarge;
            return {
                menuMode: this.isLarge ? "shrink" : "overlap",
                menuRevealMode: this.isSmall ? "slide" : "expand",
                minMenuSize: this.isSmall ? 0 : 60,
                menuOpened: this.isLarge,
                closeOnOutsideClick: shaderEnabled,
                shaderEnabled,
            };
        },
        headerMenuTogglerEnabled() {
            return this.isSmall;
        },
        scrollView() {
            return this.$refs.scrollView.instance;
        },
    },
    watch: {
        isLarge() {
            this.menuOpened = this.isLarge;
        },
        $route() {
            if (this.menuTemporaryOpened || !this.isLarge) {
                this.menuOpened = false;
                this.menuTemporaryOpened = false;
            }
            this.scrollView.scrollTo(0);
        },
    },
    methods: {
        ...mapActions("User.layout", [
            "initLayout",
            "fetchNotification",
            "updateSubscription",
            "setPushEnabled",
            "dismissNotification",
        ]),
        toggleMenu(e) {
            const pointerEvent = e.event;
            pointerEvent.stopPropagation();
            if (this.menuOpened) {
                this.menuTemporaryOpened = false;
            }
            this.menuOpened = !this.menuOpened;
            this.$bus.emit("toggleMenu");
        },
        handleSideBarClick() {
            if (this.menuOpened === false) this.menuTemporaryOpened = true;
            this.menuOpened = true;
        },
        connectPusher() {
            this.$pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
                cluster: process.env.MIX_PUSHER_APP_CLUSTER,
                encrypted: true,
                authEndpoint: `${window.baseURL}/broadcasting/auth`,
                auth: {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                },
            });
            this.$pusher
                .subscribe(`private-user-${this.id}`)
                .bind(
                    "Illuminate\\Notifications\\Events\\BroadcastNotificationCreated",
                    (e) => {
                        console.log("BroadcastNotificationCreated", e);
                        setTimeout(() => {
                            let layout = ["notification"];
                            switch (e.event) {
                                case "registered-user":
                                    if (this.$route.name == "users")
                                        this.$store.dispatch(
                                            "Admin.users/fetch"
                                        );
                                    break;

                                case "confirming-user":
                                    layout.push("users");
                                    if (this.$route.name == "users")
                                        this.$store.dispatch(
                                            "Admin.users/fetch"
                                        );
                                    break;

                                case "confirmed-user":
                                    this.$store.dispatch("Auth/fetch", true);
                                    break;

                                case "created-contract":
                                case "paying-contract":
                                case "withdrawing-contract":
                                    layout.push("contracts");
                                    if (this.$route.name == "contracts")
                                        this.$store.dispatch(
                                            "Admin.contracts/fetch"
                                        );
                                    break;

                                case "paid-contract":
                                case "withdrawn-contract":
                                    this.$store.dispatch("Auth/fetch", true);
                                    if (this.$route.name == "overview") {
                                        this.$store.dispatch(
                                            "User.contract/fetch",
                                            false
                                        );
                                        this.$store.dispatch(
                                            "Admin.contracts/getSummary"
                                        );
                                    } else if (this.$route.name == "contract")
                                        this.$store.dispatch(
                                            "User.contract/fetch"
                                        );
                                    break;

                                case "sent-comment":
                                    layout.push("comments");
                                    if (this.$route.name == "comments")
                                        this.$store.dispatch(
                                            "Admin.comments/fetch"
                                        );
                                    break;
                            }
                            this.initLayout(layout);
                            this.fetchNotification();
                        }, 2000);
                    }
                )
                .bind("read-notification", (e) => {
                    console.log("read-notification", e);
                    this.initLayout(["notification"]);
                    this.fetchNotification();
                });
            if (
                ["users@control", "contracts@control", "comments@control"].some(
                    (p) => this.permissions.includes(p)
                )
            ) {
                this.$pusher
                    .subscribe("private-admin")
                    .bind("broadcast", ({ model }) => {
                        console.log("broadcast", model);
                        if (this.permissions.includes(`${model}@control`)) {
                            setTimeout(() => {
                                this.initLayout([model]);
                                if (this.$route.name == model)
                                    this.$store.dispatch(
                                        `Admin.${model}/fetch`
                                    );
                            }, 2000);
                        }
                    });
            }
            if (
                ["trades@view", "trades@edit"].some((p) =>
                    this.permissions.includes(p)
                )
            ) {
                this.$pusher
                    .subscribe("private-trade")
                    .bind("update-trade", () => {
                        console.log("update-trade");
                        setTimeout(() => {
                            if (this.permissions.includes("trades@view")) {
                                if (this.$route.name == "trades") {
                                    this.$store.dispatch(
                                        "Trading.trades/fetch"
                                    );
                                    this.$store.dispatch(
                                        "Trading.trades/getChart",
                                        this.$store.getters[
                                            "Trading.trades/period"
                                        ]
                                    );
                                } else if (this.$route.name == "overview")
                                    this.$store.dispatch(
                                        "Trading.trades/getSummary"
                                    );
                            }
                            if (
                                this.permissions.includes("common@access") &&
                                this.$route.name == "overview"
                            )
                                this.$store.dispatch(
                                    "User.trade/getMonthChart"
                                );
                        }, 2000);
                    });
            }
            if (this.permissions.includes("finbooks@control")) {
                this.$pusher
                    .subscribe("private-finbook")
                    .bind("update-finbook", () => {
                        console.log("update-finbook");
                        if (["finbooks", "overview"].includes(this.$route.name))
                            setTimeout(
                                () =>
                                    this.$store.dispatch(
                                        "Trading.finbooks/fetch"
                                    ),
                                2000
                            );
                    });
            }
        },
        initPushNotification() {
            if (!("showNotification" in ServiceWorkerRegistration.prototype)) {
                console.log("Notifications aren't supported.");
                return;
            }

            if (!("PushManager" in window)) {
                console.log("Push messaging isn't supported.");
                return;
            }

            navigator.serviceWorker.ready.then((registration) => {
                registration.pushManager
                    .getSubscription()
                    .then((subscription) => {
                        Notification.requestPermission();
                        if (!subscription) {
                            this.setPushEnabled(false);
                            return;
                        }
                        this.updateSubscription(subscription);
                    })
                    .catch((e) => {
                        console.log("Error during getSubscription()", e);
                    });
            });

            navigator.serviceWorker.onmessage = (event) => {
                if (event.data) {
                    if (event.data.type === "DISMISS")
                        this.dismissNotification(event.data.data);
                    if (event.data.type === "OFFLINE") {
                        this.$toasted.error(this.$t("messages.error.offline"));
                        this.setSyncing(false);
                    }
                }
            };
        },
        registerServiceWorker() {
            if (!("serviceWorker" in navigator)) {
                console.log(
                    "Service workers aren't supported in this browser."
                );
                return;
            }

            navigator.serviceWorker
                .register("/sw.js")
                .then((swReg) => {
                    swReg.update();
                })
                .catch((err) => {
                    console.error("Service Worker Error", err);
                });
        },
    },
};
</script>

<style lang="scss">
.side-nav-inner-toolbar {
    width: 100%;
    height: 100vh;

    .container {
        height: 100%;
        flex-direction: column;
        display: flex;

        .layout-body {
            height: calc(100vh - 0px);
            min-height: 0;

            .content {
                flex-grow: 1;
                padding-bottom: 20px;
            }
        }
    }

    .navigation-header {
        @import "../../../sass/variables.scss";
        background-color: $base-accent;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

        .menu-button {
            width: $side-panel-min-width;
            text-align: center;
            padding: 0;

            .dx-icon {
                color: $base-text-color;
            }
        }

        &.dx-theme-generic {
            padding-top: 10px;
            padding-bottom: 10px;
        }

        .logo {
            display: flex;
            align-items: center;

            & > img {
                overflow: hidden;
                border-radius: 20%;
                height: 35px;
                width: 35px;
                margin: 0 4px;
                // border: 1px solid rgba(0, 0, 0, 0.1);
                // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
                background: white;
            }

            &.small {
                & > img {
                    margin-left: 13px;
                }

                & > div {
                    margin-left: 12px;
                }
            }
        }
    }

    .dx-overlay-content {
        position: absolute;
        pointer-events: auto;
        z-index: 1000;
        outline: 0;
        overflow: hidden;
    }
    .dx-drawer-panel-content {
        z-index: 1501 !important;
    }
    .dx-drawer-shader {
        z-index: 1500 !important;
    }
}
</style>
