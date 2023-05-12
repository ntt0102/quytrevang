<template>
    <CorePopup
        ref="popupRef"
        :width="250"
        :height="state.hasPin ? 355 : 285"
        class="change-pin-popup"
        :title="state.title"
        @shown="onShown"
        @hidden="onHidden"
    >
        <form @submit.prevent="onSubmit">
            <DxForm
                ref="formRef"
                :form-data="state.formData"
                labelMode="static"
            >
                <DxItem
                    :visible="state.hasPin"
                    name="pin"
                    data-field="pin"
                    editor-type="dxTextBox"
                    :editor-options="{
                        stylingMode: 'outlined',
                        mode: 'password',
                        mask: '0000',
                    }"
                    :validation-rules="state.validationRules.oldPin"
                    :label="{ text: $t('components.changePin.oldPin') }"
                />
                <DxItem
                    name="new_pin"
                    data-field="new_pin"
                    editor-type="dxTextBox"
                    :editor-options="{
                        stylingMode: 'outlined',
                        mode: 'password',
                        mask: '0000',
                    }"
                    :validation-rules="state.validationRules.newPin"
                    :label="{ text: $t('components.changePin.newPin') }"
                />
                <DxItem
                    name="pin_confirmation"
                    data-field="pin_confirmation"
                    editor-type="dxTextBox"
                    :editor-options="{
                        stylingMode: 'outlined',
                        mode: 'password',
                        mask: '0000',
                    }"
                    :validation-rules="state.validationRules.confirmPin"
                    :label="{ text: $t('components.changePin.confirmPin') }"
                />
                <DxItem
                    item-type="button"
                    :button-options="{
                        width: '100%',
                        type: 'default',
                        text: $t('components.changePin.submit'),
                        useSubmitBehavior: true,
                    }"
                />
            </DxForm>
        </form>
    </CorePopup>
</template>
<script setup>
import DxForm, { DxItem } from "devextreme-vue/form";
import CorePopup from "../../../components/Popups/CorePopup.vue";
import { inject, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const mt = inject("mt");
const popupRef = ref(null);
const formRef = ref(null);
const state = reactive({
    title: null,
    hasPin: false,
    formData: {},
    validationRules: {
        oldPin: [
            {
                type: "required",
                message:
                    t("components.changePin.oldPin") + mt.validations.required,
            },
        ],
        newPin: [
            {
                type: "required",
                message:
                    t("components.changePin.newPin") + mt.validations.required,
            },
        ],
        confirmPin: [
            {
                type: "required",
                message:
                    t("components.changePin.confirmPin") +
                    mt.validations.required,
            },
            {
                type: "compare",
                comparisonTarget: () => state.formData.new_pin,
                message:
                    t("components.changePin.confirmPin") + mt.validations.match,
            },
        ],
    },
});
state.hasPin = store.state.auth.user.level >= 3;
state.title = t(
    "components.changePin." + (state.hasPin ? "title" : "setTitle")
);

function show() {
    popupRef.value.show();
}

function onSubmit() {
    store.dispatch("userProfile/changePin", state.formData).then((isOk) => {
        if (isOk) {
            store.dispatch("auth/check", true);
            popupRef.value.hide();
        } else {
            initFormData();
            setFocus();
        }
    });
}
function initFormData() {
    state.formData = {
        pin: "",
        new_pin: "",
        pin_confirmation: "",
    };
}
function setFocus() {
    setTimeout(() => {
        formRef.value.instance
            .getEditor(state.hasPin ? "pin" : "new_pin")
            .focus();
    }, 0);
}

function onShown() {
    initFormData();
    setFocus();
}
function onHidden() {}

defineExpose({
    show,
});
</script>
<style lang="scss">
.change-pin-popup {
    margin-top: -20px;

    .dx-field-item {
        padding-top: 10px !important;
    }
    .dx-popup-content {
        padding: 7px 15px;
    }
    .dx-texteditor-input {
        font-size: 30px;
        padding: 5px !important;
        text-align: center;
        text-indent: 28px;
        letter-spacing: 30px;
    }
}
</style>
