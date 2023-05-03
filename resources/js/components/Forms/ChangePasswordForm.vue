<template>
    <form class="change-password" @submit.prevent="$emit('onSubmit', formData)">
        <DxForm ref="form" :form-data="formData" labelMode="floating">
            <DxItem
                :visible="hasEmail"
                name="email"
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
                :editor-options="{
                    mode: 'password',
                }"
                :validation-rules="validationRules.confirmPassword"
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

<script>
import DxForm, { DxItem } from "devextreme-vue/form";

export default {
    components: {
        DxForm,
        DxItem,
    },
    props: {
        hasEmail: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            passwordMode: true,
            formData: {
                email: "",
                password: "",
                password_confirmation: "",
            },
            validationRules: {
                email: [
                    {
                        type: "required",
                        message:
                            this.$t("models.user.email") +
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
        this.setFocus();
    },
    computed: {
        form: function () {
            return this.$refs.form.instance;
        },
    },
    methods: {
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
        setFocus() {
            setTimeout(
                () =>
                    this.form
                        .getEditor(this.hasEmail ? "email" : "password")
                        .focus(),
                500
            );
        },
    },
};
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
