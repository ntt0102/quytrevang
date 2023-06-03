<template>
    <CorePopup
        ref="popupRef"
        :title="$t('user.copyist.setting')"
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
            {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: $t('buttons.cancel'),
                    onClick: () => popupRef.hide(),
                },
            },
        ]"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxScrollView>
            <form @submit.prevent="onSubmit">
                <button ref="submitRef" class="display-none" />
                <DxForm
                    ref="formRef"
                    :form-data="state.formData"
                    :col-count="2"
                    :label-location="
                        $screen.getScreenSizeInfo.isXSmall ? 'top' : 'left'
                    "
                    :scrolling-enabled="true"
                >
                    <DxItem
                        :colSpan="2"
                        data-field="allow_copy"
                        editor-type="dxSwitch"
                        :label="{ text: $t('models.copyist.allowCopy') }"
                    />
                    <DxItem
                        :visible="permissions.includes('stock@order')"
                        :colSpan="2"
                        data-field="allow_share"
                        editor-type="dxSwitch"
                        :label="{ text: $t('models.copyist.allowShare') }"
                    />
                    <DxItem
                        :colSpan="2"
                        data-field="vps_code"
                        :validation-rules="state.validationRules.vpsCode"
                        :label="{ text: $t('models.copyist.vpsCode') }"
                    />
                    <DxItem
                        data-field="allow_max_vol"
                        editor-type="dxSwitch"
                        :label="{ text: $t('models.copyist.allowMaxVol') }"
                    />
                    <DxItem
                        :visible="!state.formData.allow_max_vol"
                        data-field="volume"
                        editor-type="dxNumberBox"
                        :validation-rules="state.validationRules.volume"
                        :label="{ text: $t('models.copyist.volume') }"
                    />
                </DxForm>
            </form>
        </DxScrollView>
    </CorePopup>
</template>
<script setup>
import { DxForm, DxItem } from "devextreme-vue/form";
import CorePopup from "../../../components/Popups/CorePopup.vue";
import { inject, ref, reactive, watch, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const bus = inject("bus");
const mt = inject("mt");
const mf = inject("mf");
const popupRef = ref(null);
const formRef = ref(null);
const state = reactive({
    formData: {},
    validationRules: {
        vpsCode: [
            {
                type: "required",
                message: t("models.copyist.vpsCode") + mt.validations.required,
            },
            {
                type: "async",
                validationCallback: (e) =>
                    store.dispatch("userCopyist/validateVpsCode", e),
                message: t("models.copyist.vpsCode") + mt.validations.duplicate,
            },
        ],
        volume: [
            {
                type: "required",
                message: t("models.copyist.volume") + mt.validations.required,
            },
        ],
    },
});

const permissions = computed(() => store.state.auth.user.permissions);

watch(
    () => store.state.userCopyist.copyist,
    (value) => {
        state.formData = mf.cloneDeep(value);
    }
);

function show() {
    popupRef.value.show();
}
function onSubmit() {
    bus.emit("checkPin", () => {
        store.dispatch("userCopyist/save", state.formData).then((isOk) => {
            if (isOk) popupRef.value.hide();
        });
    });
}
function onShown() {
    store.dispatch("userCopyist/getCopyist");
}
function onHidden() {}

defineExpose({ show });
</script>
