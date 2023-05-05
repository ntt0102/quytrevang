<template>
    <div>
        <div class="header">
            <div class="title">{{ $t("auth.login.title") }}</div>
        </div>
        <div class="login-form">
            <div class="user" v-if="!!formData.name">
                <!-- <Photoswipe
                    @opened="$mf.pushPhotoswipeToHistoryState"
                    @close="$mf.popRouteHistoryState"
                >
                    <img
                        class="avatar"
                        :alt="$appName"
                        :src="formData.avatar"
                        v-pswp="formData.avatar"
                    />
                </Photoswipe> -->
                <DxDropDownButton
                    :split-button="true"
                    :use-select-mode="false"
                    :items="[
                        ...loggedinUsers,
                        { name: $t('auth.login.anotherAccount') },
                    ]"
                    :text="formData.name"
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
                <DxForm ref="form" :form-data="formData" labelMode="floating">
                    <DxItem
                        :visible="!formData.name"
                        data-field="username"
                        editor-type="dxTextBox"
                        :validation-rules="validationRules.username"
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
                        :validation-rules="validationRules.password"
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
                            <span>{{ $t("auth.login.haveNotAccount") }}</span>
                            <span class="link">
                                <RouterLink :to="{ name: 'create-account' }">{{
                                    $t("auth.login.createAccount")
                                }}</RouterLink>
                            </span>
                        </div>
                    </template>
                </DxItem>
            </DxForm>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DxForm, { DxItem } from "devextreme-vue/form";
import DxDropDownButton from "devextreme-vue/drop-down-button";

export default {
    components: {
        DxForm,
        DxItem,
        DxDropDownButton,
    },
    data() {
        return {
            passwordMode: true,
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
                        message:
                            this.$t("models.user.username") +
                            this.$mt.validations.required,
                    },
                ],
                password: [
                    {
                        type: "required",
                        message:
                            this.$t("models.user.password") +
                            this.$mt.validations.required,
                    },
                ],
            },
        };
    },
    created() {
        // this.$cookies.remove(this.$mc.LOGGEDIN_USERS_COOKIE_NAME);
        this.loggedinUsers = this.getLoggedinUsersCookie();
        if (this.loggedinUsers.length > 0) {
            this.loggedinUsers.reverse();
            this.formData = { ...this.formData, ...this.loggedinUsers[0] };
        }
    },
    mounted() {
        if (this.$devices.phone && this.formData.webauthn)
            this.fingerPrintClick();
        else
            setTimeout(
                () =>
                    this.form
                        .getEditor(
                            !this.formData.name ? "username" : "password"
                        )
                        .focus(),
                500
            );
    },
    computed: {
        form: function () {
            return this.$refs.form.instance;
        },
    },
    methods: {
        ...mapActions("Auth", ["login", "setState", "loginWebAuthn"]),
        onSubmit() {
            this.login(this.formData).then(({ isOk, isMaintenance, user }) =>
                this.responseProcess(isOk, isMaintenance, user)
            );
        },
        fingerPrintClick() {
            if (this.formData.username) {
                let param = {};
                let username = this.formData.username.includes("@")
                    ? "email"
                    : "phone";
                param[username] = this.formData.username;
                param.username = username;
                param.routeAction = "assert";
                this.loginWebAuthn(param)
                    .then(({ isOk, isMaintenance, user }) =>
                        this.responseProcess(isOk, isMaintenance, user)
                    )
                    .catch(() =>
                        this.$toasted.show(
                            this.$t("messages.warning.unregisteredFingerPrint")
                        )
                    );
            } else
                this.$toasted.show(
                    this.$t("messages.warning.fingerUsernameEmpty")
                );
        },
        responseProcess(isOk, isMaintenance, user) {
            if (isOk) {
                this.setLoggedinUsersCookie(user);
                if (isMaintenance)
                    this.$router.push({ name: "setting-command" });
                else {
                    let query = this.$route.query;
                    const nextRouteName = query.redirect
                        ? query.redirect
                        : "overview";
                    delete query.redirect;
                    this.$router.push({
                        name: nextRouteName,
                        query: query,
                        hash: this.$route.hash,
                    });
                }
            }
        },
        onCreateAccountClick() {
            this.$router.push({ name: "create-account" });
        },
        viewPasswordClick() {
            this.form.itemOption("password", {
                editorOptions: {
                    mode: this.passwordMode ? "text" : "password",
                    buttons: [
                        {
                            options: {
                                icon: this.passwordMode
                                    ? "far fa-eye-slash"
                                    : "far fa-eye",
                                onClick: this.viewPasswordClick,
                            },
                            name: "btPw",
                            location: "after",
                        },
                    ],
                },
            });
            this.passwordMode = !this.passwordMode;
        },
        getLoggedinUsersCookie() {
            return this.$cookies.isKey(this.$mc.LOGGEDIN_USERS_COOKIE_NAME)
                ? this.$cookies.get(this.$mc.LOGGEDIN_USERS_COOKIE_NAME)
                : [];
        },
        setLoggedinUsersCookie(user) {
            let users = this.getLoggedinUsersCookie();
            users = users.filter((item) => item.username != user.username);
            users.push(user);
            users = users.slice(-5);
            this.$cookies.set(this.$mc.LOGGEDIN_USERS_COOKIE_NAME, users, "1y");
        },
        onItemClick(e) {
            if (!!e.itemData.username) {
                this.formData = { ...this.formData, ...e.itemData };
                if (this.$devices.phone && e.itemData.webauthn)
                    this.fingerPrintClick();
                else
                    setTimeout(
                        () => this.form.getEditor("password").focus(),
                        500
                    );
            } else {
                this.formData.username = null;
                this.formData.name = null;
                this.formData.avatar = null;
                setTimeout(() => this.form.getEditor("username").focus(), 500);
            }
        },
    },
};
</script>

<style lang="scss">
@import "../../../sass/variables.scss";
.login-form {
    .user {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;

        .avatar {
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
                margin-top: -5px;
                margin-left: -5px;
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
