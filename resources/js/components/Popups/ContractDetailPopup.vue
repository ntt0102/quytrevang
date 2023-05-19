<template>
    <CorePopup
        ref="popupRef"
        class="contract-detail-popup"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxForm
            :form-data="state.formData"
            :read-only="true"
            :label-location="
                $screen.getScreenSizeInfo.isXSmall ? 'top' : 'left'
            "
            :scrolling-enabled="true"
        >
            <DxItem :col-count="2" item-type="group">
                <DxItem
                    data-field="status"
                    editor-type="dxSelectBox"
                    :editor-options="{
                        searchEnabled: false,
                        items: $mf.getContractStatusList(),
                        displayExpr: 'name',
                        valueExpr: 'value',
                    }"
                    :label="{ text: $t('models.contract.status') }"
                />
                <DxItem
                    data-field="principal"
                    editor-type="dxNumberBox"
                    :editor-options="{ format: '#,##0 ₫' }"
                    :label="{ text: $t('models.contract.principal') }"
                />
                <DxItem
                    css-class="interest-item"
                    data-field="interest"
                    editor-type="dxNumberBox"
                    :editor-options="{ format: '#,##0 ₫' }"
                    :label="{ text: $t('models.contract.interest') }"
                />
                <DxItem
                    data-field="interest_rate"
                    editor-type="dxNumberBox"
                    :editor-options="{
                        format: '#0.# %/' + $t('models.contract.frequency'),
                    }"
                    :label="{
                        text: $t('models.contract.interestRate'),
                    }"
                />
                <DxItem
                    data-field="paid_at"
                    editor-type="dxDateBox"
                    :label="{ text: $t('models.contract.paidAt') }"
                />
                <DxItem
                    v-if="state.formData.withdrawn_at"
                    data-field="withdrawn_at"
                    editor-type="dxDateBox"
                    :label="{ text: $t('models.contract.withdrawnAt') }"
                />
                <DxItem
                    data-field="duration"
                    :label="{ text: $t('models.contract.duration') }"
                />
            </DxItem>
            <DxItem
                :visible="hasConfirmedDocs"
                item-type="group"
                :col-span="2"
                :caption="$t('models.contract.receipt')"
            >
                <DxItem>
                    <template #default>
                        <Photoswipe :images="images" />
                    </template>
                </DxItem>
            </DxItem>
        </DxForm>
    </CorePopup>
</template>
<script setup>
import DxForm, { DxItem } from "devextreme-vue/form";
import CorePopup from "./CorePopup.vue";
import Photoswipe from "../Photoswipe.vue";
import { ref, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const popupRef = ref(null);
const state = reactive({
    formData: { url_paid_docs: [], url_withdrawn_docs: [] },
});
const hasConfirmedDocs = computed(() => {
    return (
        state.formData.url_paid_docs.length > 0 ||
        state.formData.url_withdrawn_docs.length > 0
    );
});
const images = computed(() => {
    return [
        ...state.formData.url_paid_docs,
        ...state.formData.url_withdrawn_docs,
    ];
});

function show(contract) {
    console.log("contract", contract);
    popupRef.value.setTitle(
        `${t("models.contract.popup.detail")} #${contract.code}`
    );
    popupRef.value.show();
    state.formData = contract;
}
function onShown() {}
function onHidden() {}

defineExpose({ show });
</script>
<style lang="scss">
.contract-detail-popup {
    .interest-item .dx-texteditor-input {
        color: lime;
        font-weight: bold;
    }
    // .contract {
    //     display: flex;
    //     flex-wrap: wrap;
    //     padding: 0;

    //     > div {
    //         -ms-flex: 50%;
    //         flex: 50%;
    //         max-width: 50%;
    //         padding: 0 4px;

    //         > img {
    //             margin-top: 8px;
    //             vertical-align: middle;
    //             width: 100%;
    //         }
    //     }
    // }
    .screen-x-small & {
        .contract > div {
            -ms-flex: 100%;
            flex: 100%;
            max-width: 100%;
        }
    }
}
</style>
