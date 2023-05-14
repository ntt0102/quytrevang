<template>
    <div class="login-form">
        <div class="user" v-if="!!state.formData.name">
            <Photoswipe :images="[state.formData.avatar]" />
            <DxDropDownButton
                :split-button="true"
                :use-select-mode="false"
                :items="[
                    ...state.loggedinUsers,
                    { name: $t('auth.login.anotherAccount') },
                ]"
                :text="state.formData.name"
                display-expr="name"
                key-expr="username"
                itemTemplate="itemTemplate"
                :dropDownOptions="{
                    minWidth: 260,
                    wrapperAttr: { class: 'login-users-popup' },
                }"
                @item-click="onItemClick"
            >
                <template #itemTemplate="{ data }">
                    <div style="display: flex; align-items: center">
                        <img
                            v-if="!!data.avatar"
                            :alt="$appName"
                            :src="data.avatar"
                            style="
                                width: 30px;
                                border-radius: 50%;
                                margin-right: 5px;
                            "
                        />
                        <span style="font-size: 16px; padding: 5px">{{
                            data.name
                        }}</span>
                    </div>
                </template>
            </DxDropDownButton>
        </div>
        <form @submit.prevent="onSubmit">
            <DxForm
                ref="formRef"
                :form-data="state.formData"
                labelMode="floating"
            >
                <DxItem
                    :visible="!state.formData.name"
                    data-field="username"
                    editor-type="dxTextBox"
                    :validation-rules="state.validationRules.username"
                    :label="{ text: $t('models.user.username') }"
                />
                <DxItem
                    name="password"
                    data-field="password"
                    editor-type="dxTextBox"
                    :editor-options="{
                        mode: 'password',
                        buttons: [
                            {
                                options: {
                                    icon: 'far fa-eye',
                                    onClick: viewPasswordClick,
                                },
                                name: 'btPw',
                                location: 'after',
                            },
                        ],
                    }"
                    :validation-rules="state.validationRules.password"
                    :label="{ text: $t('models.user.password') }"
                />
                <DxItem
                    data-field="rememberMe"
                    editor-type="dxCheckBox"
                    :editor-options="{
                        text: $t('auth.login.rememberMe'),
                        elementAttr: { class: 'form-text' },
                    }"
                    :label="{ visible: false }"
                />
                <DxItem
                    item-type="button"
                    :button-options="{
                        width: '100%',
                        type: 'default',
                        text: $t('auth.login.submit'),
                        useSubmitBehavior: true,
                    }"
                />
            </DxForm>
        </form>
        <div class="fingerprint">
            <DxButton
                icon="../../../images/fingerprint.png"
                @click="fingerPrintClick"
            />
        </div>
        <DxForm>
            <DxItem>
                <template #default>
                    <div class="link">
                        <RouterLink :to="{ name: 'reset-password' }">{{
                            $t("auth.login.forgotPassword")
                        }}</RouterLink>
                    </div>
                </template>
            </DxItem>
            <DxItem>
                <template #default>
                    <div class="create-account">
                        {{ $t("auth.login.haveNotAccount") }}
                        <RouterLink :to="{ name: 'create-account' }">{{
                            $t("auth.login.createAccount")
                        }}</RouterLink>
                    </div>
                </template>
            </DxItem>
        </DxForm>
    </div>
</template>

<script setup>
import DxForm, { DxItem } from "devextreme-vue/form";
import DxDropDownButton from "devextreme-vue/drop-down-button";
import Photoswipe from "../../components/Photoswipe.vue";
import { getCurrentInstance, inject, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { cookies } = useCookies();
import { useCookies } from "vue3-cookies";
import { toast } from "vue3-toastify";

const store = useStore();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const mc = inject("mc");
const mt = inject("mt");
const app = getCurrentInstance();
const screenSize =
    app.appContext.config.globalProperties.$screen.getScreenSizeInfo;
const formRef = ref(null);
const state = reactive({
    loggedinUsers: [],
    formData: {
        username: null,
        password: null,
        rememberMe: false,
        avatar: null,
        name: null,
    },
    validationRules: {
        username: [
            {
                type: "required",
                message: t("models.user.username") + mt.validations.required,
            },
        ],
        password: [
            {
                type: "required",
                message: t("models.user.password") + mt.validations.required,
            },
        ],
    },
});
let passwordMode = true;
state.loggedinUsers = getLoggedinUsersCookie();
if (state.loggedinUsers.length > 0) {
    state.loggedinUsers.reverse();
    state.formData = { ...state.formData, ...state.loggedinUsers[0] };
}

onMounted(() => {
    if (screenSize.isXSmall && state.formData.webauthn) fingerPrintClick();
    else
        setTimeout(
            () =>
                formRef.value.instance
                    .getEditor(!state.formData.name ? "username" : "password")
                    .focus(),
            500
        );
});
function onSubmit() {
    store
        .dispatch("auth/login", state.formData)
        .then(({ isOk, isMaintenance, user }) =>
            responseProcess(isOk, isMaintenance, user)
        );
}
function fingerPrintClick() {
    if (state.formData.username) {
        store
            .dispatch("auth/loginWebAuthn", state.formData.username)
            .then(({ isOk, isMaintenance, user }) =>
                responseProcess(isOk, isMaintenance, user)
            )
            .catch(() =>
                toast.show(t("messages.warning.unregisteredFingerPrint"))
            );
    } else toast.show(t("messages.warning.fingerUsernameEmpty"));
}
function responseProcess(isOk, isMaintenance, user) {
    if (isOk) {
        setLoggedinUsersCookie(user);
        if (isMaintenance) router.push({ name: "setting-command" });
        else {
            let query = route.query;
            const nextRouteName = query.redirect ? query.redirect : "overview";
            delete query.redirect;
            router.push({
                name: nextRouteName,
                query: query,
                hash: route.hash,
            });
        }
    }
}
function viewPasswordClick() {
    formRef.value.instance.itemOption("password", {
        editorOptions: {
            mode: passwordMode ? "text" : "password",
            buttons: [
                {
                    options: {
                        icon: passwordMode ? "far fa-eye-slash" : "far fa-eye",
                        onClick: viewPasswordClick,
                    },
                    name: "btPw",
                    location: "after",
                },
            ],
        },
    });
    passwordMode = !passwordMode;
}
function getLoggedinUsersCookie() {
    return cookies.isKey(mc.LOGGEDIN_USERS_COOKIE_NAME)
        ? JSON.parse(cookies.get(mc.LOGGEDIN_USERS_COOKIE_NAME))
        : [];
}
function setLoggedinUsersCookie(user) {
    let users = getLoggedinUsersCookie();
    users = users.filter((item) => item.username != user.username);
    users.push(user);
    users = users.slice(-5);
    cookies.set(mc.LOGGEDIN_USERS_COOKIE_NAME, JSON.stringify(users), "1y");
}
function onItemClick(e) {
    if (!!e.itemData.username) {
        state.formData = {
            ...state.formData,
            ...e.itemData,
        };
        if (screenSize.isXSmall && e.itemData.webauthn) fingerPrintClick();
        else
            setTimeout(
                () => formRef.value.instance.getEditor("password").focus(),
                500
            );
    } else {
        state.formData.username = null;
        state.formData.name = null;
        state.formData.avatar = null;
        setTimeout(
            () => formRef.value.instance.getEditor("username").focus(),
            500
        );
    }
}
</script>

<style lang="scss">
@import "../../../sass/variables.scss";
.login-form {
    .user {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;

        img {
            width: 50px;
            margin-bottom: 10px;
            border-radius: 50%;
        }
    }
    .dx-field-item:not(.dx-field-item-has-group):not(
            .dx-field-item-has-tabs
        ):not(.dx-first-row):not(.dx-label-v-align) {
        padding-top: 10px;
    }
    .link {
        text-align: center;
        font-size: 16px;
        font-style: normal;

        a {
            text-decoration: none;
        }
    }
    .create-account {
        text-align: center;
    }

    .form-text {
        margin: 10px 0;
        color: rgba($base-text-color, alpha($base-text-color) * 0.7);
    }

    .dx-button-text {
        display: inline;
        vertical-align: middle;
    }

    .dx-button-submit-input {
        display: none;
    }

    .fa-eye {
        font-size: 18px;
    }

    .fa-eye-slash {
        font-size: 18px;
    }

    .fingerprint {
        text-align: center;
        margin-top: 7px;
        margin-bottom: 20px;

        .dx-button {
            width: 57px;
            height: 57px;
            border-radius: 5px !important;

            .dx-button-content {
                width: 56px;
                height: 56px;
            }
            .dx-icon {
                width: 55px;
                height: 55px;
            }
        }
    }
}
.login-users-popup {
    .dx-overlay-content {
        background: lighten($base-bg, 10);

        .dx-list-item-content {
            padding: 5px 5px 5px 10px;
        }
    }
}
</style>
