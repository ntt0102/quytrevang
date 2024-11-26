<template>
    <form class="create-account-page" @submit.prevent="onSubmit">
        <DxForm ref="formRef" :form-data="state.formData" labelMode="floating">
            <DxItem
                data-field="name"
                editor-type="dxTextBox"
                :validation-rules="state.validationRules.name"
                :label="{ text: $t('models.user.name') }"
            />
            <DxItem
                data-field="email"
                editor-type="dxTextBox"
                :editor-options="{ mode: 'email' }"
                :validation-rules="state.validationRules.email"
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
                :validation-rules="state.validationRules.password"
                :label="{ text: $t('models.user.password') }"
            />
            <DxItem
                name="password_confirmation"
                data-field="password_confirmation"
                editor-type="dxTextBox"
                :editor-options="{ mode: 'password' }"
                :validation-rules="state.validationRules.confirmPassword"
                :label="{ text: $t('models.user.confirmPassword') }"
            />
            <DxItem>
                <template #default>
                    <div class="policy-info">
                        {{ $t("auth.createAccount.policy") }}
                        <RouterLink :to="{ name: 'policy', hash: '#terms' }">{{
                            $t("policy.terms.title")
                        }}</RouterLink
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
                            :sitekey="state.siteKey"
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
</template>
<script setup>
import DxForm, { DxItem } from "devextreme-vue/form";
import VueRecaptcha from "vue3-recaptcha2";
import { inject, onMounted, onUnmounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";

const store = useStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const mt = inject("mt");
const mf = inject("mf");
const formRef = ref(null);
const state = reactive({
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
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
                message: t("models.user.name") + mt.validations.required,
            },
            {
                type: "stringLength",
                max: 50,
                message: t("models.user.validations.name"),
            },
        ],
        email: [
            {
                type: "required",
                message: t("models.user.email") + mt.validations.required,
            },
            {
                type: "email",
                message: t("models.user.email") + mt.validations.email,
            },
            {
                type: "async",
                validationCallback: (e) =>
                    store.dispatch("auth/validateDuplicateEmail", e),
                message: t("models.user.email") + mt.validations.duplicate,
            },
        ],
        password: [
            {
                type: "required",
                message: t("models.user.password") + mt.validations.required,
            },
        ],
        confirmPassword: [
            {
                type: "required",
                message: t("models.user.password") + mt.validations.required,
            },
            {
                type: "compare",
                comparisonTarget: passwordComparison,
                message: t("models.user.password") + mt.validations.match,
            },
        ],
    },
});
let passwordMode = true;
let isReCaptchaVerified = false;

onMounted(() => {
    setTimeout(() => formRef.value.instance.getEditor("name").focus(), 500);
    mf.includeScript("on", {
        src: "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
        id: "recaptcha",
    });
});
onUnmounted(() => {
    mf.includeScript("off", "recaptcha");
});

function onSubmit() {
    checkSpam(state.formData.email).then((isNotSpam) => {
        if (isNotSpam) {
            if (isReCaptchaVerified) {
                store
                    .dispatch("auth/createAccount", state.formData)
                    .then((isOk) => {
                        if (isOk) {
                            router.push({
                                name: route.query.redirect || "overview",
                            });
                        }
                    });
            } else toast.show(t("messages.warning.unVerifiedReCaptcha"));
        }
    });
}
function passwordComparison() {
    return state.formData.password;
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
    formRef.value.instance.itemOption("password_confirmation", {
        editorOptions: {
            mode: passwordMode ? "text" : "password",
        },
    });
    passwordMode = !passwordMode;
}
function onVerify() {
    isReCaptchaVerified = true;
}
function onExpired() {
    isReCaptchaVerified = false;
}
function checkSpam(email) {
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
}
</script>

<style lang="scss">
@import "../../../sass/variables.scss";

.create-account-page {
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
