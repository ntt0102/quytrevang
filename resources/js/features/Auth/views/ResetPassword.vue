<template>
    <form class="reset-password-page" @submit.prevent="onSubmit">
        <DxForm ref="formRef" :form-data="state.formData" labelMode="floating">
            <DxItem
                data-field="email"
                editor-type="dxTextBox"
                :editor-options="{ mode: 'email' }"
                :validation-rules="state.validationRules.email"
                :label="{ text: $t('models.user.email') }"
            />
            <DxItem
                item-type="button"
                :button-options="{
                    wrapperAttr: { class: 'submit-button' },
                    width: '100%',
                    type: 'default',
                    text: $t('auth.resetPassword.send'),
                    useSubmitBehavior: true,
                }"
            />
            <DxItem>
                <template #default>
                    <div class="login-link">
                        {{ $t("auth.resetPassword.returnTo") }}
                        <router-link :to="{ name: 'login' }">{{
                            $t("auth.resetPassword.signIn")
                        }}</router-link>
                    </div>
                </template>
            </DxItem>
        </DxForm>
    </form>
</template>

<script setup>
import DxForm, { DxItem } from "devextreme-vue/form";
import { inject, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const mt = inject("mt");
const formRef = ref(null);

const state = reactive({
    formData: { email: null },
    validationRules: {
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
                    store.dispatch("auth/validateExistEmail", e),
                message: t("models.user.validations.email"),
            },
        ],
    },
});
onMounted(() => {
    setTimeout(() => formRef.value.instance.getEditor("email").focus(), 500);
});
function onSubmit() {
    store.dispatch("auth/resetPassword", state.formData);
}
</script>

<style lang="scss">
@import "../../../../sass/variables.scss";

.reset-password-page {
    .submit-button {
        margin-top: 10px;
    }

    .login-link {
        text-align: center;
    }

    .dx-button-text {
        display: inline;
        vertical-align: middle;
    }

    .dx-button-submit-input {
        display: none;
    }
}
</style>
