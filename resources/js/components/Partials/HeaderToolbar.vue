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
            icon: `far fa-${isPushEnabled ? 'bell' : 'bell-slash'}`,
            elementAttr: { 'data-count': unreadNotificationsNumber },
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
                  text: $t('components.notification.receiveOption') + ':',
                },
                {
                  toolbar: 'top',
                  location: 'after',
                  widget: 'dxSwitch',
                  options: {
                    disabled: disabledSwitch,
                    value: isPushEnabled,
                    onValueChanged: onNotificationSwitchChanged,
                  },
                },
                {
                  toolbar: 'top',
                  location: 'left',
                  text: $t('components.notification.markAllRead'),
                  cssClass: 'mark-all-read',
                  onClick: () => {
                    markAllRead();
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
            icon: avatar,
            text: name,
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
                visible: level >= 3,
                text: $t('user.profile.title'),
                icon: 'far fa-id-card small',
                onClick: () => $router.push({ name: 'profile' }),
              },
              {
                visible: level >= 5,
                text: $t('user.contract.title'),
                icon: 'far fa-usd-circle small',
                onClick: () => $router.push({ name: 'contract' }),
              },
              {
                visible: level >= 3,
                text: $t('components.changePin.title'),
                icon: 'far fa-key small',
                onClick: () => $refs.changePinPopup.show(),
              },
              {
                visible: level >= 3,
                text: $t('components.changePassword.title'),
                icon: 'far fa-user-lock small',
                onClick: () => $refs.changePasswordPopup.show(),
              },
              {
                visible: level >= 3,
                text: $t('components.changeAvatar.title'),
                icon: 'far fa-user-circle small',
                onClick: () => $refs.changeAvatarPopup.show(),
              },
              {
                visible: level >= 3,
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
          <div v-if="notificationDropdown.length > 0" class="notification-list">
            <div
              v-for="notification of notificationDropdown"
              :key="notification.id"
              class="notification-item"
              :class="{ unread: notification.unread }"
              @click="notification.unread ? markAsRead(notification.id) : null"
            >
              <div class="img-left">
                <img
                  class="user-photo"
                  :src="notification.icon"
                  v-pswp="notification.icon"
                  :alt="$appName"
                />
              </div>
              <div class="user-content">
                <p class="title">{{ notification.title }}</p>
                <p class="body">{{ notification.body }}</p>
                <p class="time">{{ notification.ago }}</p>
                <div class="image" v-if="!!notification.image">
                  <img :src="notification.image" width="100%" :alt="$appName" />
                </div>
                <div class="actions">
                  <a
                    v-for="(button, index) in notification.actions"
                    :key="index"
                    href="javascript:void(0)"
                    @click="notificationActionClick(button.action)"
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
    <ChangeAvatarPopup ref="changeAvatarPopup" />
    <ChangePinPopup ref="changePinPopup" />
    <ChangePasswordPopup ref="changePasswordPopup" />
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DxDropDownButton from "devextreme-vue/drop-down-button";
import DxSwitch from "devextreme-vue/switch";
import ChangeAvatarPopup from "../../components/Popups/ChangeAvatarPopup.vue";
import ChangePinPopup from "../../components/Popups/ChangePinPopup.vue";
import ChangePasswordPopup from "../../components/Popups/ChangePasswordPopup.vue";

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
export default {
  components: {
    DxDropDownButton,
    DxSwitch,
    ChangeAvatarPopup,
    ChangePinPopup,
    ChangePasswordPopup,
  },
  props: {
    menuToggleEnabled: Boolean,
    toggleMenuFunc: Function,
  },
  data() {
    return {
      notificationDropdown: [],
      notificationInterval: null,
      disabledSwitch: false,
    };
  },
  destroyed() {
    clearInterval(this.notificationInterval);
  },
  computed: {
    ...mapGetters("Auth", ["level", "permissions", "name", "avatar"]),
    ...mapGetters("User.layout", [
      "isPushEnabled",
      "sidenav",
      "unreadNotificationsNumber",
      "notifications",
    ]),
    menuNotifications() {
      let count = 0;
      if (this.permissions.includes("users@control"))
        count += this.sidenav.signingUsersNumber;
      if (this.permissions.includes("contracts@control"))
        count += this.sidenav.confirmingContractsNumber;
      if (this.permissions.includes("comments@control"))
        count += this.sidenav.unreadCommentsNumber;
      return count;
    },
  },
  watch: {
    notifications() {
      this.cloneDeepData();
    },
  },
  methods: {
    ...mapActions("Auth", ["registerWebAuthn", "logout"]),
    ...mapActions("User.layout", [
      "updateSubscription",
      "deleteSubscription",
      "markAsRead",
      "markAllRead",
    ]),
    onNotificationShown() {
      return new Promise((resolve, reject) => {
        const permissionResult = Notification.requestPermission((result) => {
          resolve(result);
        });
        if (permissionResult) {
          permissionResult.then(resolve, reject);
        }
      }).then((permissionResult) => {
        this.notificationInterval = setInterval(() => {
          this.notificationDropdown = this.notificationDropdown.map((n) => {
            n.ago = moment(n.created_at).fromNow();
            return n;
          });
        }, 1000);
        if (permissionResult === "denied") {
          this.disabledSwitch = true;
          this.$toasted.show(this.$t("components.notification.blocked"));
        }
      });
    },
    cloneDeepData() {
      this.notificationDropdown = this.$mf
        .cloneDeep(this.notifications)
        .map((item) => {
          const ago = { ago: moment(item.created_at).fromNow() };
          return { ...item, ...ago };
        });
    },
    notificationActionClick(url) {
      if (url.includes("http")) return this.$mf.openLink(url);
      return this.$router.push(url);
    },
    onNotificationSwitchChanged(e) {
      if (this.isPushEnabled) {
        this.unsubscribeNotification();
      } else {
        this.subscribeNotification();
      }
    },
    subscribeNotification() {
      navigator.serviceWorker.ready.then((registration) => {
        const options = { userVisibleOnly: true };
        const vapidPublicKey = process.env.MIX_VAPID_PUBLIC_KEY;

        if (vapidPublicKey) {
          options.applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
        }

        registration.pushManager
          .subscribe(options)
          .then((subscription) => {
            this.updateSubscription(subscription);
          })
          .catch((e) => {
            if (Notification.permission === "denied") {
              console.log("Permission for Notifications was denied");
            } else {
              console.log("Unable to subscribe to push.", e);
            }
          });
      });
    },
    unsubscribeNotification() {
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
                this.deleteSubscription(subscription);
              })
              .catch((e) => {
                console.log("Unsubscription error: ", e);
              });
          })
          .catch((e) => {
            console.log("Error thrown while unsubscribing.", e);
          });
      });
    },
    registerFingerPrint() {
      this.$bus.emit(
        "checkPin",
        () =>
          this.registerWebAuthn().then(() => {
            let users = JSON.parse(
              this.$cookies.get(this.$mc.LOGGEDIN_USERS_COOKIE_NAME)
            );
            users[users.length - 1].webauthn = true;
            console.log("users", users);
            this.$cookies.set(
              this.$mc.LOGGEDIN_USERS_COOKIE_NAME,
              JSON.stringify(users),
              "1y"
            );
          }),
        true
      );
    },
    onLogoutClick() {
      this.logout().then((isOk) => {
        if (isOk) {
          this.$router.push({ name: "login" });
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: "LOGOUT",
            });
          }
        }
      });
    },
  },
};
</script>
<style lang="scss">
@import "../../../sass/variables.scss";
.header-component {
  flex: 0 0 auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  .dx-toolbar {
    background-color: darken($base-bg, 3);
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

  .header-title .dx-item-content {
    padding: 0;
    margin: 0;
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
