<template>
    <div class="content-block dx-card responsive-paddings">
        <form class="setting-command-page" @submit.prevent="onSubmit">
            <DxForm
                ref="formRef"
                :form-data="state.formData"
                :label-location="
                    $screen.getScreenSizeInfo.isXSmall ? 'top' : 'left'
                "
                :scrolling-enabled="true"
            >
                <DxItem
                    data-field="radio"
                    editor-type="dxRadioGroup"
                    :editor-options="{
                        dataSource: $mf.getCommandList(),
                        displayExpr: 'name',
                        valueExpr: 'value',
                        onValueChanged: onValueChanged,
                    }"
                    :validation-rules="state.validationRules"
                    :label="{ visible: false }"
                />
                <DxItem
                    :visible="false"
                    data-field="textbox"
                    name="textbox"
                    :label="{ visible: false }"
                />
                <DxItem
                    item-type="button"
                    :button-options="{
                        width: 150,
                        left: 0,
                        type: 'default',
                        icon: 'far fa-running',
                        text: $t('settings.command.run'),
                        useSubmitBehavior: true,
                    }"
                />
            </DxForm>
        </form>
    </div>
</template>
<script setup>
import DxForm, { DxItem } from "devextreme-vue/form";
import DxRadioGroup from "devextreme-vue/radio-group";
import { inject, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const bus = inject("bus");
const mt = inject("mt");
const formRef = ref(null);
const state = reactive({
    formData: {
        radio: "config:cache",
        textbox: null,
    },
    validationRules: [
        {
            type: "required",
            message: t("settings.command.title") + mt.validations.required,
        },
    ],
});

function onSubmit() {
    bus.emit("checkPin", () => {
        let data =
            state.formData.radio != "custom"
                ? state.formData.radio
                : state.formData.textbox;
        store.dispatch("setting/runCommand", data);
    });
}
function onValueChanged(e) {
    if (e.value != "custom") {
        formRef.value.instance.itemOption("textbox", "visible", false);
        formRef.value.instance.itemOption("textbox", "validationRules", null);
    } else {
        formRef.value.instance.itemOption("textbox", "visible", true);
        formRef.value.instance.itemOption(
            "textbox",
            "validationRules",
            state.validationRules
        );
        formRef.value.instance.getEditor("textbox").focus();
    }
}
</script>
<style lang="scss">
.setting-command-page {
    margin-left: 20px;
    .dx-radiogroup .dx-radiobutton {
        margin: 20px 0;
    }
}
</style>
