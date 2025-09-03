<template>
    <div class="profile-page">
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
                        visible: user.level < 5,
                        location: 'before',
                        widget: 'dxButton',
                        options: {
                            icon: 'far fa-user-edit small',
                            hint: $t('components.editProfile.title'),
                            onClick: () =>
                                $refs.editProfilePopupRef.show(profile),
                        },
                    },
                    {
                        location: 'before',
                        widget: 'dxButton',
                        options: {
                            icon: 'far fa-user-circle small',
                            hint: $t('components.changeAvatar.title'),
                            onClick: () => $refs.changeAvatarPopupRef.show(),
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'far fa-key small',
                            hint: $t('components.changePin.title'),
                            onClick: () => $refs.changePinPopupRef.show(),
                        },
                    },

                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'far fa-user-lock small',
                            hint: $t('components.changePassword.title'),
                            onClick: () => $refs.changePasswordPopupRef.show(),
                        },
                    },
                ]"
            />
            <div class="info">
                <div class="avatar">
                    <Photoswipe :images="[user.avatar]" />
                </div>
                <div class="personal">
                    <div>
                        <span>{{ $t("models.user.name") }}:</span>
                        <span class="name">{{ user.name }}</span>
                    </div>
                    <div>
                        <span>{{ $t("models.user.code") }}:</span>
                        <span>{{ user.code }}</span>
                    </div>
                    <div v-if="!!user.phone">
                        <span>{{ $t("models.user.phone") }}:</span>
                        <span>{{ $filters.phone(user.phone) }}</span>
                    </div>
                    <div>
                        <span>{{ $t("models.user.email") }}:</span>
                        <span>{{ user.email }}</span>
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
            <div class="title">
                {{ $t("user.profile.changeRequest.title") }}
            </div>
            <div class="content">
                <div>{{ $t("user.profile.changeRequest.desctiption") }}</div>
                <DxButton
                    :text="$t('user.profile.changeRequest.command')"
                    icon="far fa-share-square small"
                    type="default"
                    styling-mode="contained"
                    @click="$refs.sendCommentPopupRef.show()"
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
        <SendCommentPopup ref="sendCommentPopupRef" />
        <UserDetailPopup ref="userDetailPopupRef" />
        <EditProfilePopup ref="editProfilePopupRef" />
        <ChangeAvatarPopup ref="changeAvatarPopupRef" />
        <ChangePinPopup ref="changePinPopupRef" />
        <ChangePasswordPopup ref="changePasswordPopupRef" />
    </div>
</template>

<script setup>
import SendCommentPopup from "../../../../components/Popups/SendCommentPopup.vue";
import UserDetailPopup from "../../../../components/Popups/UserDetailPopup.vue";
import EditProfilePopup from "./EditProfilePopup.vue";
import ChangeAvatarPopup from "./ChangeAvatarPopup.vue";
import ChangePinPopup from "./ChangePinPopup.vue";
import ChangePasswordPopup from "./ChangePasswordPopup.vue";
import Photoswipe from "../../../../components/Photoswipe.vue";
import { ref, inject, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();
const bus = inject("bus");
const userDetailPopupRef = ref(null);

const user = computed(() => store.state.auth.user);
let profile = computed(() => store.state.userProfile.profile);
store.dispatch("userProfile/getProfile");

onMounted(() => {
    if (route.hash === "#detail") detailInfoClick();
});
function detailInfoClick() {
    userDetailPopupRef.value.show(profile.value);
}
function onDeleteClick() {
    bus.emit("checkPin", () => {
        store.dispatch("userProfile/delete").then((isOk) => {
            if (isOk) {
                if (navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage({
                        type: "LOGOUT",
                    });
                }
                store.dispatch("auth/clearToken");
                router.push({ name: "login" });
            }
        });
    });
}
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

            .photoswipe {
                display: unset !important;
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

    .screen-x-small & {
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
