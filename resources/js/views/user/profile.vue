<template>
  <div class="profile-page">
    <h2 class="content-block">
      {{ $t("user.profile.title") }}
    </h2>

    <div class="content-block dx-card responsive-paddings">
      <DxToolbar
        :items="[
          {
            visible: !!$route.query.redirect,
            location: 'before',
            widget: 'dxButton',
            options: {
              icon: 'far fa-arrow-left small',
              hint: $t('buttons.back'),
              onClick: () => {
                $router.push({ name: $route.query.redirect });
              },
            },
          },
          {
            visible: level < 5,
            location: 'before',
            widget: 'dxButton',
            cssClass: 'guiding-step-2b',
            options: {
              icon: 'far fa-user-edit small',
              hint: $t('components.editProfile.title'),
              onClick: () => $refs.editProfilePopup.show(),
            },
          },
          {
            location: 'before',
            widget: 'dxButton',
            options: {
              icon: 'far fa-user-circle small',
              hint: $t('components.changeAvatar.title'),
              onClick: () => $refs.changeAvatarPopup.show(),
            },
          },
          {
            location: 'after',
            widget: 'dxButton',
            options: {
              icon: 'far fa-key small',
              hint: $t('components.changePin.title'),
              onClick: () => $refs.changePinPopup.show(),
            },
          },

          {
            location: 'after',
            widget: 'dxButton',
            options: {
              icon: 'far fa-user-lock small',
              hint: $t('components.changePassword.title'),
              onClick: () => $refs.changePasswordPopup.show(),
            },
          },
        ]"
      />
      <div class="info">
        <div class="avatar">
          <Photoswipe
            @opened="$mf.pushPhotoswipeToHistoryState"
            @close="$mf.popRouteHistoryState"
          >
            <img :src="avatar" v-pswp="avatar" :alt="$appName" />
          </Photoswipe>
        </div>
        <div class="personal">
          <div>
            <span>{{ $t("models.user.name") }}:</span>
            <span class="name">{{ name }}</span>
          </div>
          <div>
            <span>{{ $t("models.user.code") }}:</span>
            <span>{{ code }}</span>
          </div>
          <div v-if="!!phone">
            <span>{{ $t("models.user.phone") }}:</span>
            <span>{{ phone | phone }}</span>
          </div>
          <div>
            <span>{{ $t("models.user.email") }}:</span>
            <span>{{ email }}</span>
          </div>
          <DxButton
            width="170"
            class="detail"
            type="default"
            styling-mode="outlined"
            :text="$t('user.profile.detailInfo')"
            @click="detailInfoClick"
          />
        </div>
      </div>
    </div>
    <div class="content-block dx-card responsive-paddings change">
      <div class="title">{{ $t("user.profile.changeRequest.title") }}</div>
      <div class="content">
        <div>{{ $t("user.profile.changeRequest.desctiption") }}</div>
        <DxButton
          :text="$t('user.profile.changeRequest.command')"
          icon="far fa-share-square small"
          type="default"
          styling-mode="contained"
          @click="$refs.sendCommentPopup.show()"
        />
      </div>
    </div>
    <div class="content-block dx-card responsive-paddings delete">
      <div class="title">{{ $t("user.profile.delete.title") }}</div>
      <div class="content">
        <div>{{ $t("user.profile.delete.desctiption") }}</div>
        <DxButton
          :text="$t('user.profile.delete.command')"
          icon="far fa-trash small"
          type="danger"
          styling-mode="contained"
          @click="onDeleteClick"
        />
      </div>
    </div>
    <SendCommentPopup ref="sendCommentPopup" />
    <UserDetailPopup ref="userDetailPopup" />
    <EditProfilePopup ref="editProfilePopup" />
    <ChangeAvatarPopup ref="changeAvatarPopup" />
    <ChangePinPopup ref="changePinPopup" />
    <ChangePasswordPopup ref="changePasswordPopup" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SendCommentPopup from "../../components/Popups/SendCommentPopup.vue";
import UserDetailPopup from "../../components/Popups/UserDetailPopup.vue";
import EditProfilePopup from "../../components/Popups/EditProfilePopup.vue";
import ChangeAvatarPopup from "../../components/Popups/ChangeAvatarPopup.vue";
import ChangePinPopup from "../../components/Popups/ChangePinPopup.vue";
import ChangePasswordPopup from "../../components/Popups/ChangePasswordPopup.vue";

export default {
  components: {
    SendCommentPopup,
    UserDetailPopup,
    EditProfilePopup,
    ChangeAvatarPopup,
    ChangePinPopup,
    ChangePasswordPopup,
  },
  data() {
    return {
      isLoading: true,
      formData: {},
    };
  },
  mounted() {
    if (this.$route.hash === "#detail") this.detailInfoClick();
  },
  computed: {
    ...mapGetters("Auth", [
      "name",
      "code",
      "phone",
      "email",
      "avatar",
      "level",
    ]),
    popup() {
      return this.$refs.popup.instance;
    },
  },
  methods: {
    ...mapActions("Auth", ["clearData"]),
    ...mapActions("User.profile", ["fetch", "save", "delete"]),
    onSubmit() {
      if (this.$refs.editProfileForm.$refs.form.instance.validate().isValid) {
        this.popup.option("toolbarItems[0].options.disabled", true);
        this.save(this.formData).then(() => {
          this.popup.hide();
          this.$toasted.success(this.$mt.messages.success.saved);
        });
      }
    },
    cloneDeepData() {
      this.formData = this.$mf.cloneDeep(this.profile);
      this.isLoading = false;
    },
    validateBirthday(e) {
      return moment(e.value).isBefore(moment().subtract(18, "years"));
    },
    validateIdIssuedOn(e) {
      return moment(e.value).isBefore(moment().subtract(1, "day"));
    },
    detailInfoClick() {
      this.$refs.userDetailPopup.show({ getUser: () => this.fetch() });
    },
    onDeleteClick() {
      this.$bus.emit("checkPin", () => {
        this.delete().then((isOk) => {
          if (isOk) {
            if (navigator.serviceWorker.controller) {
              navigator.serviceWorker.controller.postMessage({
                type: "LOGOUT",
              });
            }
            this.clearData();
            this.$router.push({ name: "login" });
          }
        });
      });
    },
  },
};
</script>

<style lang="scss">
.profile-page {
  .info {
    display: flex;

    .avatar {
      float: left;
      height: 170px;
      width: 170px;
      margin-right: 20px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      background-color: #fff;
      overflow: hidden;
      border-radius: 50%;
      border: 2px solid rgba(0, 0, 0, 0.1);

      img {
        height: 170px;
        display: block;
        margin: 0 auto;
      }
    }
    .personal {
      & > div {
        display: flex;

        > span {
          &:first-child {
            color: darken(white, 30);
            width: 110px;
          }
          &:last-child {
            font-size: 18px;
            &.name {
              font-weight: bold;
            }
          }
        }
      }
      .detail {
        margin-top: 20px;

        .dx-button-text {
          text-transform: none !important;
        }
      }
    }
  }

  .dx-card {
    .title {
      font-size: 18px;
      margin-bottom: 20px;
    }
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .dx-button {
        margin-left: 20px;
        flex: 0 0 180px;
      }
    }
  }

  .delete {
    border: solid 2px red;

    .title {
      color: red;
    }
  }
}
body[screen-size="small"] {
  .profile-page {
    .info {
      flex-direction: column;

      .avatar {
        margin: 0 auto;
        margin-bottom: 30px;
      }
    }
  }
}
</style>
