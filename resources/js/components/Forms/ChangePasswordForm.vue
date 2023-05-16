<template>
    <form
        class="change-password"
        @submit.prevent="$emit('onSubmit', state.formData)"
    >
        <DxForm ref="formRef" :form-data="state.formData" labelMode="floating">
            <DxItem
                :visible="hasEmail"
                name="email"
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
                :editor-options="{
                    mode: 'password',
                }"
                :validation-rules="state.validationRules.confirmPassword"
                :label="{ text: $t('models.user.confirmPassword') }"
            />
            <DxItem
                item-type="button"
                :button-options="{
                    width: '100%',
                    type: 'default',
                    text: $t('components.changePassword.submit'),
                    useSubmitBehavior: true,
                }"
            />
        </DxForm>
    </form>
</template>

<script setup>
import DxForm, { DxItem } from "devextreme-vue/form";
import { onMounted } from "vue";
import { ref } from "vue";
import { inject } from "vue";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
    hasEmail: {
        type: Boolean,
        default: false,
    },
});
const { t } = useI18n();
const mt = inject("mt");
const formRef = ref(null);
const state = reactive({
    formData: {
        email: "",
        password: "",
        password_confirmation: "",
    },
    validationRules: {
        email: [
            {
                type: "required",
                message: t("models.user.email") + mt.validations.required,
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

onMounted(() => setFocus());

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
function setFocus() {
    setTimeout(
        () =>
            formRef.value.instance
                .getEditor(props.hasEmail ? "email" : "password")
                .focus(),
        500
    );
}
defineExpose({ setFocus });
</script>
<style lang="scss">
.change-password {
    .fa-eye {
        font-size: 18px;
    }

    .fa-eye-slash {
        font-size: 18px;
    }
}
</style>
