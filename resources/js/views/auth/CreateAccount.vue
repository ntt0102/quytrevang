<template>
    <div>
        <div class="header">
            <div class="title">{{ $t("auth.createAccount.title") }}</div>
        </div>
        <form class="create-account-form" @submit.prevent="onSubmit">
            <DxForm ref="form" :form-data="formData" labelMode="floating">
                <DxItem
                    data-field="name"
                    editor-type="dxTextBox"
                    :validation-rules="validationRules.name"
                    :label="{ text: $t('models.user.name') }"
                />
                <DxItem
                    data-field="email"
                    editor-type="dxTextBox"
                    :editor-options="{ mode: 'email' }"
                    :validation-rules="validationRules.email"
                    :label="{ text: $t('models.user.email') }"
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
                                name: 'password',
                                location: 'after',
                            },
                        ],
                    }"
                    :validation-rules="validationRules.password"
                    :label="{ text: $t('models.user.password') }"
                />
                <DxItem
                    name="password_confirmation"
                    data-field="password_confirmation"
                    editor-type="dxTextBox"
                    :editor-options="{ mode: 'password' }"
                    :validation-rules="validationRules.confirmPassword"
                    :label="{ text: $t('models.user.confirmPassword') }"
                />
                <DxItem>
                    <template #default>
                        <div class="policy-info">
                            {{ $t("auth.createAccount.policy") }}
                            <RouterLink
                                :to="{ name: 'policy', hash: '#terms' }"
                                >{{ $t("policy.terms.title") }}</RouterLink
                            >{{ $t("auth.createAccount.and")
                            }}<RouterLink
                                :to="{ name: 'policy', hash: '#privacy' }"
                                >{{ $t("policy.privacy.title") }}</RouterLink
                            >{{ $t("auth.createAccount.our") }}
                        </div>
                    </template>
                </DxItem>
                <DxItem>
                    <template #default>
                        <div class="recaptcha-container">
                            <VueRecaptcha
                                ref="recaptcha"
                                theme="dark"
                                size="compact"
                                @verify="onVerify"
                                @expired="onExpired"
                                :sitekey="siteKey"
                            />
                        </div>
                    </template>
                </DxItem>
                <DxItem
                    item-type="button"
                    :button-options="{
                        width: '100%',
                        type: 'default',
                        text: $t('auth.createAccount.submit'),
                        useSubmitBehavior: true,
                    }"
                />
                <DxItem>
                    <template #default>
                        <div class="login-link">
                            {{ $t("auth.createAccount.haveAccount") }}
                            <RouterLink :to="{ name: 'login' }">{{
                                $t("auth.createAccount.login")
                            }}</RouterLink>
                        </div>
                    </template>
                </DxItem>
            </DxForm>
        </form>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DxForm, { DxItem } from "devextreme-vue/form";
import VueRecaptcha from "vue3-recaptcha2";

export default {
    components: {
        DxForm,
        DxItem,
        VueRecaptcha,
    },
    data() {
        return {
            passwordMode: true,
            siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
            isReCaptchaVerified: false,
            formData: {
                name: null,
                email: null,
                password: null,
                password_confirmation: null,
            },
            validationRules: {
                name: [
                    {
                        type: "required",
                        message:
                            this.$t("models.user.name") +
                            this.$mt.validations.required,
                    },
                    {
                        type: "stringLength",
                        max: 50,
                        message: this.$t("models.user.validations.name"),
                    },
                ],
                email: [
                    {
                        type: "required",
                        message:
                            this.$t("models.user.email") +
                            this.$mt.validations.required,
                    },
                    {
                        type: "email",
                        message:
                            this.$t("models.user.email") +
                            this.$mt.validations.email,
                    },
                    {
                        type: "async",
                        validationCallback: this.validateDuplicateEmail,
                        message:
                            this.$t("models.user.email") +
                            this.$mt.validations.duplicate,
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
                confirmPassword: [
                    {
                        type: "required",
                        message:
                            this.$t("models.user.password") +
                            this.$mt.validations.required,
                    },
                    {
                        type: "compare",
                        comparisonTarget: this.passwordComparison,
                        message:
                            this.$t("models.user.password") +
                            this.$mt.validations.match,
                    },
                ],
            },
        };
    },
    mounted() {
        setTimeout(() => this.form.getEditor("name").focus(), 500);
        this.$mf.includeScript("on", {
            src: "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
            id: "recaptcha",
        });
    },
    destroyed() {
        this.$mf.includeScript("off", "recaptcha");
    },
    computed: {
        form: function () {
            return this.$refs.form.instance;
        },
    },
    methods: {
        ...mapActions("Auth", ["createAccount", "validateDuplicateEmail"]),
        onSubmit() {
            this.checkSpam(this.formData.email).then((isNotSpam) => {
                if (isNotSpam) {
                    if (this.isReCaptchaVerified) {
                        this.createAccount(this.formData).then((isOk) => {
                            if (isOk) {
                                this.$router.push({
                                    name:
                                        this.$route.query.redirect ||
                                        "overview",
                                });
                            }
                        });
                    } else
                        this.$toasted.show(
                            this.$t("messages.warning.unVerifiedReCaptcha")
                        );
                }
            });
        },
        passwordComparison() {
            return this.formData.password;
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
            this.form.itemOption("password_confirmation", {
                editorOptions: {
                    mode: this.passwordMode ? "text" : "password",
                },
            });
            this.passwordMode = !this.passwordMode;
        },
        onVerify(response) {
            this.isReCaptchaVerified = true;
        },
        onExpired() {
            this.isReCaptchaVerified = false;
        },
        checkSpam(email) {
            return new Promise((resolve, reject) => {
                fetch(`https://api.stopforumspam.org/api?email=${email}`)
                    .then((response) => response.text())
                    .then((text) => {
                        let appears = text.substring(
                            text.lastIndexOf("<appears>") + "<appears>".length,
                            text.lastIndexOf("</appears>")
                        );
                        resolve(appears === "no");
                    });
            });
        },
    },
};
</script>

<style lang="scss">
@import "../../../sass/variables.scss";

.create-account-form {
    .dx-field-item:not(.dx-field-item-has-group):not(
            .dx-field-item-has-tabs
        ):not(.dx-first-row):not(.dx-label-v-align) {
        padding-top: 10px;
    }
    .policy-info {
        margin: 10px 0;
        color: rgba($base-text-color, alpha($base-text-color) * 0.7);
        font-style: normal;
        text-align: justify;

        a {
            color: rgba($base-text-color, alpha($base-text-color) * 0.7);
        }
    }

    .login-link {
        color: rgba($base-text-color, alpha($base-text-color) * 0.7);
        font-size: 16px;
        text-align: center;
    }

    .dx-button-text {
        display: inline;
        vertical-align: middle;
    }

    .dx-button-submit-input {
        display: none;
    }

    .recaptcha-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .fa-eye {
        font-size: 18px;
    }

    .fa-eye-slash {
        font-size: 18px;
    }
}
</style>
