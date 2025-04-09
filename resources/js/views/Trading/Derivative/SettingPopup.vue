<template>
    <CorePopup
        ref="popupRef"
        :width="250"
        :height="260"
        class="der-setting-popup"
        :title="$t('trading.derivative.buttons.setting')"
        :toolbarItems="[
            {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: $t('buttons.save'),
                    onClick: () => $refs.submitRef.click(),
                },
            },
        ]"
        @shown="onShown"
        @hidden="onHidden"
    >
        <form @submit.prevent="onSubmit">
            <button ref="submitRef" class="display-none" />
            <DxForm
                ref="formRef"
                labelLocation="left"
                :form-data="state.formData"
            >
                <DxItem
                    name="tpDefault"
                    data-field="tpDefault"
                    editor-type="dxNumberBox"
                    :editor-options="{
                        stylingMode: 'outlined',
                        showSpinButtons: true,
                    }"
                    :validation-rules="state.validationRules.tpDefault"
                    :label="{
                        text: $t('trading.derivative.settingPopup.tpDefault'),
                    }"
                />
                <DxItem
                    name="slDefault"
                    data-field="slDefault"
                    editor-type="dxNumberBox"
                    :editor-options="{
                        stylingMode: 'outlined',
                        showSpinButtons: true,
                    }"
                    :validation-rules="state.validationRules.slDefault"
                    :label="{
                        text: $t('trading.derivative.settingPopup.slDefault'),
                    }"
                />
            </DxForm>
        </form>
    </CorePopup>
</template>
<script setup>
import DxForm, { DxItem } from "devextreme-vue/form";
import CorePopup from "../../../components/Popups/CorePopup.vue";
import { inject, reactive, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const mt = inject("mt");
const popupRef = ref(null);
const formRef = ref(null);
const config = computed(() => store.state.tradingDerivative.config);
const state = reactive({
    formData: {},
    validationRules: {
        tpDefault: [
            {
                type: "required",
                message:
                    t("trading.derivative.settingPopup.tpDefault") +
                    mt.validations.required,
            },
        ],
        slDefault: [
            {
                type: "required",
                message:
                    t("trading.derivative.settingPopup.slDefault") +
                    mt.validations.required,
            },
        ],
    },
});

watch(config, initFormData);

function show() {
    popupRef.value.show();
}

function onSubmit() {
    store.dispatch("tradingDerivative/setting", state.formData).then((isOk) => {
        if (isOk) {
            popupRef.value.hide();
        } else {
            initFormData(config.value);
            setFocus();
        }
    });
}
function initFormData(data) {
    state.formData = {
        tpDefault: data.tpDefault,
        slDefault: data.slDefault,
    };
}
function setFocus() {
    setTimeout(() => {
        formRef.value.instance.getEditor("tpDefault").focus();
    }, 0);
}

function onShown() {
    initFormData(config.value);
    setFocus();
}
function onHidden() {}

defineExpose({
    show,
});
</script>
<style lang="scss">
.der-setting-popup {
    margin-top: -20px;

    .dx-field-item {
        padding-top: 10px !important;
    }
    .dx-popup-content {
        padding: 7px 15px;
    }
}
</style>
