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
                        <h2 class="content-block">
                            {{ $route.meta.title }}
                        </h2>
                        <slot />
                    </div>
                    <slot name="footer" />
                </dx-scroll-view>
            </div>
            <template #menuTemplate>
                <side-nav-menu
                    :compact-mode="!menuOpened"
                    @click="handleSideBarClick"
                >
                    <dx-toolbar id="navigation-header">
                        <dx-item
                            v-if="!isXSmall"
                            location="before"
                            css-class="menu-button"
                        >
                            <template #default>
                                <dx-button
                                    icon="menu"
                                    styling-mode="text"
                                    @click="toggleMenu"
                                />
                            </template>
                        </dx-item>
                        <dx-item
                            location="before"
                            css-class="header-title dx-toolbar-label"
                        >
                            <template #default>
                                <div class="logo" :class="{ small: isXSmall }">
                                    <img
                                        src="../../../images/android-chrome-reverse-512x512.png"
                                        :alt="$appName"
                                    />
                                    <div>{{ $appName }}</div>
                                </div>
                            </template>
                        </dx-item>
                    </dx-toolbar>
                </side-nav-menu>
            </template>
        </dx-drawer>
        <InstallAppPopup ref="installAppPopupRef" />
        <CheckPinPopup ref="checkPinPopupRef" />
    </div>
</template>

<script setup>
import Pusher from "pusher-js";
import DxDrawer from "devextreme-vue/drawer";
import { DxItem } from "devextreme-vue/toolbar";

import HeaderToolbar from "./Partials/HeaderToolbar.vue";
import SideNavMenu from "./Partials/SideNavMenu.vue";
import InstallAppPopup from "../Popups/InstallAppPopup.vue";
import CheckPinPopup from "../Popups/CheckPinPopup.vue";
import { ref, inject, watch, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";

const props = defineProps({
    isXSmall: Boolean,
    isLarge: Boolean,
});
const store = useStore();
const route = useRoute();
const { t } = useI18n();
const bus = inject("bus");
const mf = inject("mf");
const installAppPopupRef = ref(null);
const checkPinPopupRef = ref(null);
const scrollViewRef = ref(null);
const menuOpened = ref(props.isLarge);
const menuTemporaryOpened = ref(false);
const token = computed(() => store.state.auth.token);
const user = computed(() => store.state.auth.user);

store.dispatch("getNotify");
store.dispatch("getNotifications");

registerServiceWorker();
initPushNotification();
let pusher;
connectPusher();

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
function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        console.log("Service workers aren't supported in this browser.");
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
                    store.dispatch("setPushSubscribed", false);
                    return;
                }
                store.dispatch("subscribePush", subscription);
            })
            .catch((e) => {
                console.log("Error during getSubscription()", e);
            });
    });

    navigator.serviceWorker.onmessage = (event) => {
        if (event.data) {
            // if (event.data.type === "OFFLINE") {
            //     toast.error(t("messages.error.offline"));
            //     store.dispatch("setSyncing", false);
            // }
        }
    };
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
                    let notify = ["notification"];
                    switch (e.event) {
                        case "registered-user":
                            if (route.name == "admin-user")
                                store.dispatch("adminUser/getUsers");
                            break;

                        case "confirming-user":
                            notify.push("adminUser");
                            if (route.name == "admin-user")
                                store.dispatch("adminUser/getUsers");
                            break;

                        case "confirmed-user":
                            store.dispatch("auth/check", true);
                            break;

                        case "created-contract":
                        case "paying-contract":
                        case "withdrawing-contract":
                            notify.push("adminContract");
                            if (route.name == "admin-contract")
                                store.dispatch("adminContract/getContracts");
                            break;

                        case "paid-contract":
                        case "withdrawn-contract":
                            store.dispatch("auth/check", true);
                            if (route.name == "overview") {
                                store.dispatch("userContract/getContracts");
                                store.dispatch("adminContract/getSummary");
                            } else if (route.name == "contract")
                                store.dispatch("userContract/getContracts");
                            break;

                        case "sent-comment":
                            notify.push("adminComment");
                            if (route.name == "admin-comment")
                                store.dispatch("adminComment/getComments");
                            break;
                        case "filtered-stock":
                            if (route.name == "trading-share") {
                                store.dispatch("tradingStock/getSymbols");
                            }
                            break;
                    }
                    store.dispatch("getNotify", notify);
                    store.dispatch("getNotifications");
                }, 2000);
            }
        )
        .bind("read-notification", (e) => {
            store.dispatch("getNotify", ["notification"]);
            store.dispatch("getNotifications");
        });
    if (user.value.permissions.includes("users@control")) {
        pusher.subscribe("private-admin-user").bind("update-user", () => {
            setTimeout(() => {
                store.dispatch("getNotify", ["adminUser"]);
                if (route.name == "admin-user")
                    store.dispatch("adminUser/getUsers"), 2000;
            });
        });
    }
    if (user.value.permissions.includes("contracts@control")) {
        pusher
            .subscribe("private-admin-contract")
            .bind("update-contract", () => {
                setTimeout(() => {
                    store.dispatch("getNotify", ["adminContract"]);
                    if (route.name == "admin-contract")
                        store.dispatch("adminContract/getContracts"), 2000;
                });
            });
    }
    if (user.value.permissions.includes("comments@control")) {
        pusher.subscribe("private-admin-comment").bind("update-comment", () => {
            setTimeout(() => {
                store.dispatch("getNotify", ["adminComment"]);
                if (route.name == "admin-comment")
                    store.dispatch("adminComment/getComments"), 2000;
            });
        });
    }
    if (user.value.permissions.includes("trades@view")) {
        pusher
            .subscribe("private-trading-shrstats")
            .bind("update-statistic", () => {
                setTimeout(() => {
                    if (route.name == "trading-shrstats") {
                        store.dispatch("tradingStatistic/getData");
                        store.dispatch("tradingStatistic/getSummary");
                        store.dispatch("tradingStatistic/getOpening");
                        store.dispatch(
                            "tradingStatistic/getProfitChart",
                            store.tradingStatistic.charts.period
                        );
                    }
                }, 2000);
            });
    }
    if (user.value.permissions.includes("finbooks@control")) {
        pusher
            .subscribe("private-trading-finbook")
            .bind("update-finbook", () => {
                if (["finbooks", "overview"].includes(route.name))
                    setTimeout(
                        () => store.dispatch("tradingFinbook/getFinbook"),
                        2000
                    );
            });
    }
}

onMounted(() => {
    mf.removePreload();
    installAppPopupRef.value.show();
    bus.on("checkPin", (callback, forcePin = false) =>
        checkPinPopupRef.value.show({ callback, forcePin })
    );
});

onUnmounted(() => {
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
</script>

<style lang="scss">
@import "../../../sass/variables.scss";
.side-nav-inner-toolbar {
    width: 100%;
}

#navigation-header {
    background-color: $base-accent;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    .menu-button .dx-icon {
        color: $base-text-color;
    }

    .screen-x-small & {
        padding-left: 20px;
    }

    .dx-theme-generic & {
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
</style>
