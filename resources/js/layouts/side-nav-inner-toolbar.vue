<template>
    <div class="side-nav-inner-toolbar">
        <dx-drawer
            class="drawer"
            position="before"
            template="menuTemplate"
            v-model:opened="menuOpened"
            :opened-state-mode="drawerOptions.menuMode"
            :reveal-mode="drawerOptions.menuRevealMode"
            :min-size="drawerOptions.minMenuSize"
            :max-size="drawerOptions.maxMenuSize"
            :shading="drawerOptions.shaderEnabled"
            :close-on-outside-click="drawerOptions.closeOnOutsideClick"
        >
            <div class="container">
                <header-toolbar
                    :menu-toggle-enabled="headerMenuTogglerEnabled"
                    :toggle-menu-func="toggleMenu"
                />
                <dx-scroll-view
                    ref="scrollViewRef"
                    class="layout-body with-footer"
                >
                    <div class="content">
                        <transition name="fade" mode="out-in">
                            <RouterView :key="$route.name" />
                        </transition>
                    </div>
                    <AppFooter />
                </dx-scroll-view>
            </div>
            <template #menuTemplate>
                <side-nav-menu
                    :compact-mode="!menuOpened"
                    @click="handleSideBarClick"
                >
                    <dx-toolbar
                        class="navigation-header"
                        :items="[
                            {
                                visible: !isXSmall,
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
                            <div class="logo" :class="{ small: isXSmall }">
                                <img
                                    src="../../images/android-chrome-reverse-512x512.png"
                                    :alt="$appName"
                                />
                                <div>{{ $appName }}</div>
                            </div>
                        </template>
                    </dx-toolbar>
                </side-nav-menu>
            </template>
        </dx-drawer>
        <!-- <InstallAppPopup ref="installAppPopupRef" /> -->
        <!-- <CheckPinPopup ref="checkPinPopupRef" /> -->
    </div>
</template>

<script>
import Pusher from "pusher-js";
import DxDrawer from "devextreme-vue/drawer";
import HeaderToolbar from "../components/header-toolbar.vue";
import SideNavMenu from "../components/side-nav-menu.vue";
import AppFooter from "../components/app-footer.vue";
// import InstallAppPopup from "../components/Popups/InstallAppPopup.vue";
// import CheckPinPopup from "../components/Popups/CheckPinPopup.vue";
import userLayoutStore from "../store/modules/User/Layout";
import userProfileStore from "../store/modules/User/Profile";
import { ref, inject, watch, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";

export default {
    components: {
        DxDrawer,
        HeaderToolbar,
        SideNavMenu,
        AppFooter,
        // InstallAppPopup,
        // CheckPinPopup,
    },
    props: {
        isXSmall: Boolean,
        isLarge: Boolean,
    },

    setup(props) {
        const store = useStore();
        const route = useRoute();
        store.registerModule("User.layout", userLayoutStore);
        store.registerModule("User.profile", userProfileStore);
        console.log("createLayout");

        const bus = inject("bus");
        const mf = inject("mf");
        const installAppPopupRef = ref(null);
        const checkPinPopupRef = ref(null);
        const scrollViewRef = ref(null);
        const menuOpened = ref(props.isLarge);
        const menuTemporaryOpened = ref(false);
        const token = computed(() => store.state.Auth.token);
        const user = computed(() => store.state.Auth.user);

        store.dispatch("User.layout/initLayout");
        store.dispatch("User.layout/fetchNotification");

        registerServiceWorker();
        initPushNotification();
        let pusher;
        connectPusher();

        const drawerOptions = computed(() => {
            const shaderEnabled = !props.isLarge;
            return {
                menuMode: props.isLarge ? "shrink" : "overlap",
                menuRevealMode: props.isXSmall ? "slide" : "expand",
                minMenuSize: props.isXSmall ? 0 : 60,
                maxMenuSize: props.isXSmall ? 250 : undefined,
                closeOnOutsideClick: shaderEnabled,
                shaderEnabled,
            };
        });

        const headerMenuTogglerEnabled = computed(() => {
            return props.isXSmall;
        });

        function toggleMenu(e) {
            const pointerEvent = e.event;
            pointerEvent.stopPropagation();
            if (menuOpened.value) {
                menuTemporaryOpened.value = false;
            }

            menuOpened.value = !menuOpened.value;
        }

        function handleSideBarClick() {
            if (menuOpened.value === false) {
                menuTemporaryOpened.value = true;
            }

            menuOpened.value = true;
        }

        function connectPusher() {
            pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
                cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
                encrypted: true,
                authEndpoint: `${window.baseURL}/broadcasting/auth`,
                auth: {
                    headers: {
                        Authorization: `Bearer ${token.value}`,
                    },
                },
            });
            pusher
                .subscribe(`private-user-${user.value.id}`)
                .bind(
                    "Illuminate\\Notifications\\Events\\BroadcastNotificationCreated",
                    (e) => {
                        setTimeout(() => {
                            let layout = ["notification"];
                            switch (e.event) {
                                case "registered-user":
                                    if (route.name == "users")
                                        store.dispatch("Admin.users/fetch");
                                    break;

                                case "confirming-user":
                                    layout.push("users");
                                    if (route.name == "users")
                                        store.dispatch("Admin.users/fetch");
                                    break;

                                case "confirmed-user":
                                    store.dispatch("auth/check", true);
                                    break;

                                case "created-contract":
                                case "paying-contract":
                                case "withdrawing-contract":
                                    layout.push("contracts");
                                    if (route.name == "contracts")
                                        store.dispatch("Admin.contracts/fetch");
                                    break;

                                case "paid-contract":
                                case "withdrawn-contract":
                                    store.dispatch("auth/check", true);
                                    if (route.name == "overview") {
                                        store.dispatch(
                                            "User.contract/fetch",
                                            false
                                        );
                                        store.dispatch(
                                            "Admin.contracts/getSummary"
                                        );
                                    } else if (route.name == "contract")
                                        store.dispatch("User.contract/fetch");
                                    break;

                                case "sent-comment":
                                    layout.push("comments");
                                    if (route.name == "comments")
                                        store.dispatch("Admin.comments/fetch");
                                    break;
                            }
                            store.dispatch("User.layout/initLayout", layout);
                            store.dispatch("User.layout/fetchNotification");
                        }, 2000);
                    }
                )
                .bind("read-notification", (e) => {
                    store.dispatch("User.layout/initLayout", ["notification"]);
                    store.dispatch("User.layout/fetchNotification");
                });
            if (
                ["users@control", "contracts@control", "comments@control"].some(
                    (p) => user.value.permissions.includes(p)
                )
            ) {
                pusher
                    .subscribe("private-admin")
                    .bind("broadcast", ({ model }) => {
                        if (
                            user.value.permissions.includes(`${model}@control`)
                        ) {
                            setTimeout(() => {
                                store.dispatch("User.layout/initLayout", [
                                    model,
                                ]);
                                if (route.name == model)
                                    store.dispatch(`Admin.${model}/fetch`);
                            }, 2000);
                        }
                    });
            }
            if (
                ["trades@view", "trades@edit"].some((p) =>
                    user.value.permissions.includes(p)
                )
            ) {
                pusher.subscribe("private-trade").bind("update-trade", () => {
                    setTimeout(() => {
                        if (user.value.permissions.includes("trades@view")) {
                            if (route.name == "trades") {
                                store.dispatch("Trading.trades/fetch");
                                store.dispatch(
                                    "Trading.trades/getChart",
                                    store.getters["Trading.trades/period"]
                                );
                            } else if (route.name == "overview")
                                store.dispatch("Trading.trades/getSummary");
                        }
                        if (
                            user.value.permissions.includes("common@access") &&
                            route.name == "overview"
                        )
                            store.dispatch("User.trade/getMonthChart");
                    }, 2000);
                });
            }
            if (user.value.permissions.includes("finbooks@control")) {
                pusher
                    .subscribe("private-finbook")
                    .bind("update-finbook", () => {
                        if (["finbooks", "overview"].includes(route.name))
                            setTimeout(
                                () => store.dispatch("Trading.finbooks/fetch"),
                                2000
                            );
                    });
            }
        }
        function initPushNotification() {
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
                            store.dispatch("User.layout/setPushEnabled", false);
                            return;
                        }
                        store.dispatch(
                            "User.layout/updateSubscription",
                            subscription
                        );
                    })
                    .catch((e) => {
                        console.log("Error during getSubscription()", e);
                    });
            });

            navigator.serviceWorker.onmessage = (event) => {
                if (event.data) {
                    if (event.data.type === "DISMISS")
                        store.dispatch(
                            "User.layout/dismissNotification",
                            event.data.data
                        );
                    if (event.data.type === "OFFLINE") {
                        toast.error(this.$t("messages.error.offline"));
                        store.dispatch("setSyncing", false);
                    }
                }
            };
        }
        function registerServiceWorker() {
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
        }
        onMounted(() => {
            mf.removePreload();
            // installAppPopupRef.value.show();
            // bus.on("checkPin", (callback, forcePin = false) =>
            //     checkPinPopupRef.value.show({ callback, forcePin })
            // );
        });

        onUnmounted(() => {
            store.unregisterModule("User.layout");
            store.unregisterModule("User.profile");
            pusher.disconnect();
            bus.off("checkPin");
        });

        watch(
            () => props.isLarge,
            () => {
                if (!menuTemporaryOpened.value) {
                    menuOpened.value = props.isLarge;
                }
            }
        );

        watch(
            () => route.name,
            () => {
                if (menuTemporaryOpened.value || !props.isLarge) {
                    menuOpened.value = false;
                    menuTemporaryOpened.value = false;
                }
                scrollViewRef.value.instance.scrollTo(0);
            }
        );

        return {
            scrollViewRef,
            installAppPopupRef,
            checkPinPopupRef,
            menuOpened,
            drawerOptions,
            headerMenuTogglerEnabled,
            toggleMenu,
            handleSideBarClick,
        };
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
        @import "../../sass/variables.scss";
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
