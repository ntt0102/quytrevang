<template>
    <header class="header-component">
        <DxToolbar
            :items="[
                {
                    visible: menuToggleEnabled,
                    location: 'before',
                    cssClass: 'menu-button',
                    widget: 'dxButton',
                    options: {
                        icon: 'menu',
                        stylingMode: 'text',
                        elementAttr: {
                            'data-count': menuNotifications,
                        },
                        onClick: toggleMenuFunc,
                    },
                },
                {
                    location: 'after',
                    cssClass: 'header-title notification-button',
                    widget: 'dxDropDownButton',
                    options: {
                        icon: `far fa-${
                            pushSubscribed ? 'bell' : 'bell-slash'
                        }`,
                        elementAttr: {
                            'data-count': unreadNotificationsNumber,
                        },
                        stylingMode: 'text',
                        showArrowIcon: false,
                        dropDownContentTemplate: 'notificationTemplate',
                        dropDownOptions: {
                            width: 300,
                            height: 370,
                            elementAttr: { id: 'headerNotificationPopup' },
                            wrapperAttr: { class: 'header-notification-popup' },
                            position: {
                                my: 'top right',
                                at: 'bottom right',
                                of: '.user-button',
                                offset: '-10 -8',
                            },
                            toolbarItems: [
                                {
                                    toolbar: 'top',
                                    location: 'after',
                                    cssClass: 'receive-option',
                                    text:
                                        $t(
                                            'components.notification.receiveOption'
                                        ) + ':',
                                },
                                {
                                    toolbar: 'top',
                                    location: 'after',
                                    widget: 'dxSwitch',
                                    options: {
                                        disabled: disabledSwitch,
                                        value: pushSubscribed,
                                        onValueChanged:
                                            onNotificationSwitchChanged,
                                    },
                                },
                                {
                                    toolbar: 'top',
                                    location: 'before',
                                    text: $t(
                                        'components.notification.markAllRead'
                                    ),
                                    cssClass: 'mark-all-read',
                                    onClick: () => {
                                        $store.dispatch('markAllRead');
                                    },
                                },
                            ],
                            onShown: onNotificationShown,
                        },
                    },
                },
                {
                    location: 'after',
                    cssClass: 'header-title user-button',
                    widget: 'dxDropDownButton',
                    options: {
                        icon: user.avatar,
                        text: user.name,
                        stylingMode: 'text',
                        dropDownOptions: {
                            width: 200,
                            elementAttr: { id: 'headerUserPopup' },
                            wrapperAttr: { class: 'header-user-popup' },
                            position: {
                                my: 'top right',
                                at: 'bottom right',
                                of: '.user-button',
                                offset: '-1 -8',
                            },
                        },
                        items: [
                            {
                                visible: user.level >= 3,
                                text: $t('user.profile.title'),
                                icon: 'far fa-id-card small',
                                onClick: () =>
                                    $router.push({ name: 'profile' }),
                            },
                            {
                                visible: user.level >= 5,
                                text: $t('user.contract.title'),
                                icon: 'far fa-usd-circle small',
                                onClick: () =>
                                    $router.push({ name: 'contract' }),
                            },
                            {
                                visible: user.level >= 3,
                                text: $t('components.changePin.title'),
                                icon: 'far fa-key small',
                                onClick: () => $refs.changePinPopupRef.show(),
                            },
                            {
                                visible: user.level >= 3,
                                text: $t('components.changePassword.title'),
                                icon: 'far fa-user-lock small',
                                onClick: () =>
                                    $refs.changePasswordPopupRef.show(),
                            },
                            {
                                visible: user.level >= 3,
                                text: $t('components.changeAvatar.title'),
                                icon: 'far fa-user-circle small',
                                onClick: () =>
                                    $refs.changeAvatarPopupRef.show(),
                            },
                            {
                                visible: user.level >= 3,
                                text: $t('user.profile.fingerPrint'),
                                icon: 'far fa-fingerprint small',
                                onClick: registerFingerPrint,
                            },
                            {
                                text: $t('auth.login.logout'),
                                icon: 'far fa-sign-out small',
                                onClick: onLogoutClick,
                            },
                        ],
                    },
                },
            ]"
        >
            <template #notificationTemplate>
                <DxScrollView>
                    <div
                        v-if="notificationDropdown.length > 0"
                        class="notification-list"
                    >
                        <div
                            v-for="notification of notificationDropdown"
                            :key="notification.id"
                            class="notification-item"
                            :class="{ unread: notification.unread }"
                            @click="
                                notification.unread
                                    ? $store.dispatch(
                                          'markAsRead',
                                          notification.id
                                      )
                                    : null
                            "
                        >
                            <div class="img-left">
                                <img
                                    class="user-photo"
                                    :src="notification.icon"
                                    :alt="$appName"
                                />
                            </div>
                            <div class="user-content">
                                <p class="title">{{ notification.title }}</p>
                                <p class="body">{{ notification.body }}</p>
                                <p class="time">{{ notification.ago }}</p>
                                <div class="image" v-if="!!notification.image">
                                    <img
                                        :src="notification.image"
                                        width="100%"
                                        :alt="$appName"
                                    />
                                </div>
                                <div class="actions">
                                    <a
                                        v-for="(
                                            button, index
                                        ) in notification.actions"
                                        :key="index"
                                        href="javascript:void(0)"
                                        @click="
                                            notificationActionClick(
                                                button.action
                                            )
                                        "
                                        >{{ button.title }}</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="not-unread">
                        {{ $t("components.notification.empty") }}
                    </div>
                </DxScrollView>
            </template>
        </DxToolbar>
        <ChangeAvatarPopup ref="changeAvatarPopupRef" />
        <ChangePinPopup ref="changePinPopupRef" />
        <ChangePasswordPopup ref="changePasswordPopupRef" />
    </header>
</template>

<script setup>
import DxDropDownButton from "devextreme-vue/drop-down-button";
import DxSwitch from "devextreme-vue/switch";
import ChangeAvatarPopup from "../../../features/User/views/Profile/ChangeAvatarPopup.vue";
import ChangePinPopup from "../../../features/User/views/Profile/ChangePinPopup.vue";
import ChangePasswordPopup from "../../../features/User/views/Profile/ChangePasswordPopup.vue";
import { ref, computed, inject, watch, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const props = defineProps({
    menuToggleEnabled: Boolean,
    title: String,
    toggleMenuFunc: Function,
    logOutFunc: Function,
});
const router = useRouter();
const route = useRoute();
const store = useStore();
const { cookies } = useCookies();

const bus = inject("bus");
const mc = inject("mc");
const mf = inject("mf");

let notificationInterval = null;

const user = computed(() => store.state.auth.user);

const pushSubscribed = computed(() => store.state.pushSubscribed);
const notify = computed(() => store.state.notify);
const unreadNotificationsNumber = computed(
    () => store.state.notify.notification
);
const notificationDropdown = ref([]);
const disabledSwitch = ref(false);
const menuNotifications = computed(() => {
    let count = 0;
    if (user.value.permissions.includes("admin:manage_users"))
        count += notify.value.adminUser;
    if (user.value.permissions.includes("admin:manage_contracts"))
        count += notify.value.adminContract;
    if (user.value.permissions.includes("admin:manage_comments"))
        count += notify.value.adminComment;
    return count;
});

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}
function onNotificationShown() {
    return new Promise((resolve, reject) => {
        const permissionResult = Notification.requestPermission((result) => {
            resolve(result);
        });
        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    }).then((permissionResult) => {
        notificationInterval = setInterval(() => {
            notificationDropdown.value = notificationDropdown.value.map((n) => {
                n.ago = formatDistanceToNow(new Date(n.created_at), {
                    addSuffix: true,
                    locale: vi,
                });
                return n;
            });
        }, 1000);
        if (permissionResult === "denied") {
            disabledSwitch.value = true;
            this.$toast.show(this.$t("components.notification.blocked"));
        }
    });
}
function notificationActionClick(url) {
    if (url.includes("http")) return mf.openLink(url);
    return router.push(url);
}
function onNotificationSwitchChanged(e) {
    if (pushSubscribed.value) {
        unsubscribeNotification();
    } else {
        subscribeNotification();
    }
}
function subscribeNotification() {
    navigator.serviceWorker.ready.then((registration) => {
        const options = { userVisibleOnly: true };
        const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

        if (vapidPublicKey) {
            options.applicationServerKey =
                urlBase64ToUint8Array(vapidPublicKey);
        }

        registration.pushManager
            .subscribe(options)
            .then((subscription) => {
                store.dispatch("subscribePush", subscription);
            })
            .catch((e) => {
                if (Notification.permission === "denied") {
                    console.log("Permission for Notifications was denied");
                } else {
                    console.log("Unable to subscribe to push.", e);
                }
            });
    });
}
function unsubscribeNotification() {
    navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager
            .getSubscription()
            .then((subscription) => {
                if (!subscription) {
                    return;
                }

                subscription
                    .unsubscribe()
                    .then(() => {
                        store.dispatch("unsubscribePush", subscription);
                    })
                    .catch((e) => {
                        console.log("Unsubscription error: ", e);
                    });
            })
            .catch((e) => {
                console.log("Error thrown while unsubscribing.", e);
            });
    });
}
function registerFingerPrint() {
    bus.emit(
        "checkPin",
        () =>
            store.dispatch("auth/registerWebAuthn").then(() => {
                let users = JSON.parse(
                    cookies.get(mc.LOGGEDIN_USERS_COOKIE_NAME)
                );
                users[users.length - 1].webauthn = true;
                console.log("users", users);
                cookies.set(
                    mc.LOGGEDIN_USERS_COOKIE_NAME,
                    JSON.stringify(users),
                    "1y"
                );
            }),
        true
    );
}
function onLogoutClick() {
    store.dispatch("auth/logout").then((isOk) => {
        if (isOk) {
            router.push({ name: "login" });
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    type: "LOGOUT",
                });
            }
        }
    });
}

onUnmounted(() => clearInterval(notificationInterval));

watch(
    () => store.state.notifications,
    (value) => {
        notificationDropdown.value = mf.cloneDeep(value).map((item) => {
            const ago = {
                ago: formatDistanceToNow(new Date(item.created_at), {
                    addSuffix: true,
                    locale: vi,
                }),
            };
            return { ...item, ...ago };
        });
    }
);
</script>

<style lang="scss">
@import "../../../../sass/variables.scss";
@import "../../../../sass/dx-styles.scss";

.header-component {
    flex: 0 0 auto;
    z-index: 1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    .dx-toolbar
        .dx-toolbar-item.menu-button
        > .dx-toolbar-item-content
        .dx-icon {
        color: $base-accent;
    }

    .menu-button {
        width: $side-panel-min-width;
        text-align: center;
        padding: 0;

        .dx-button {
            position: relative;

            &:not([data-count="0"]):after {
                position: absolute;
                content: attr(data-count);
                top: 2px;
                right: 5px;
                padding: 1px 4px 0px 4px;
                background: red;
                border-radius: 10px;
                color: #fff;
                font-size: 13px;
                font-weight: bold;
                pointer-events: none;
            }

            .dx-icon {
                color: $base-accent;
            }
        }
    }

    .notification-button {
        .dx-dropdownbutton {
            position: relative;
            &:not([data-count="0"]):after {
                position: absolute;
                content: attr(data-count);
                top: 4px;
                right: 4px;
                padding: 1px 4px 0px 4px;
                background: red;
                border-radius: 10px;
                color: #fff;
                font-size: 13px;
                font-weight: bold;
                pointer-events: none;
            }
            .dx-button {
                border-radius: 20px;
            }
        }
    }
    .user-button {
        .dx-icon {
            border-radius: 50%;
        }
        .dx-button-text {
            text-transform: unset;
        }
    }
}

.dx-toolbar.header-toolbar .dx-toolbar-items-container .dx-toolbar-after {
    padding: 0 40px;

    .screen-x-small & {
        padding: 0 20px;
    }
}

.dx-toolbar .dx-toolbar-item.dx-toolbar-button.menu-button {
    width: $side-panel-min-width;
    text-align: center;
    padding: 0;
}

.header-title .dx-item-content {
    padding: 0;
    margin: 0;
}

.dx-theme-generic {
    .dx-toolbar {
        padding: 10px 0;
    }
}

.header-user-popup {
    .dx-overlay-content {
        background: lighten($base-bg, 10);
    }
    .dx-list-item-content {
        padding: 5px 5px 5px 10px;
    }
}
.header-notification-popup {
    .dx-overlay-content {
        background: lighten($base-bg, 10);

        .dx-popup-content {
            padding-bottom: 7px;
        }
    }
    .dx-toolbar {
        height: 50px;
        .dx-toolbar-items-container {
            height: 50px;
        }
        .dx-toolbar-label {
            font-size: 16px;
        }
    }
    .dx-popup-content {
        padding: 0px;
    }
    .mark-all-read {
        text-decoration: underline;
        cursor: pointer;
        font-size: 14px !important;
        margin-left: -15px !important;
        &:hover {
            color: $base-accent;
        }
    }
    .receive-option {
        font-size: 14px !important;
        color: darken(white, 30);
        padding-right: 10px !important;
    }
    .dx-switch {
        width: 35px;
        height: 15px;
        margin-top: 5px;
        margin-right: 10px;
    }
    .notification-list {
        .notification-item {
            display: flex;
            white-space: normal;
            padding: 10px 15px;

            &:not(:last-child) {
                border-bottom: solid 1px lighten($base-bg, 25);
            }

            & div:not(:last-child) {
                margin-bottom: 5px;
            }

            &.unread {
                cursor: pointer;
                background: lighten($base-bg, 15);
            }

            .img-left {
                width: 2rem;

                .user-photo {
                    display: inline-block;
                    vertical-align: middle;
                    height: 2rem;
                    width: 2rem;
                    margin: 0 0.5rem 0 0;
                    border-radius: 50%;
                    max-width: 100%;
                }
            }

            .user-content {
                position: relative;
                width: calc(100% - 2rem);
                padding: 0 10px 0 10px;
            }

            .title {
                margin: 0.15rem 0 0;
                font-size: 16px;
                font-weight: bold;
            }
            .body {
                margin: 0.15rem 0 0;
                color: darken(white, 30);
            }
            .time {
                margin: 0;
                color: darken(white, 40);
                font-style: italic;
                font-size: 12px;
            }
            .image {
                margin-top: 10px;
            }
            .actions > a {
                display: inline-block;
                background: $base-accent;
                text-decoration: none;
                padding: 2px 5px;
                text-align: center;
                border-radius: 5px;
                color: white;

                &:not(:last-child) {
                    margin-right: 10px;
                }
            }
        }
    }
    .not-unread {
        text-align: center;
        padding: 15px;
    }
}
</style>
