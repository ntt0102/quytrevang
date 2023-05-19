<template>
    <CorePopup
        ref="popupRef"
        :title="$t('admin.users.detailUser')"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxForm
            :form-data="state.formData"
            :col-count="2"
            :read-only="true"
            :label-location="
                $screen.getScreenSizeInfo.isXSmall ? 'top' : 'left'
            "
            :scrolling-enabled="true"
        >
            <DxItem
                item-type="group"
                :caption="$t('models.user.groups.personalInfo')"
            >
                <DxItem
                    data-field="name"
                    :label="{ text: $t('models.user.name') }"
                />
                <DxItem
                    data-field="sex"
                    editor-type="dxSelectBox"
                    :editor-options="{
                        items: $mf.getSexList(),
                        displayExpr: 'name',
                        valueExpr: 'value',
                    }"
                    :label="{ text: $t('models.user.sex') }"
                />
                <DxItem
                    data-field="birthday"
                    editor-type="dxDateBox"
                    :label="{ text: $t('models.user.birthday') }"
                />
            </DxItem>
            <DxItem
                item-type="group"
                :caption="$t('models.user.groups.idInfo')"
            >
                <DxItem
                    data-field="identity.number"
                    :label="{ text: $t('models.user.idNumber') }"
                />
                <DxItem
                    data-field="identity.issued_on"
                    editor-type="dxDateBox"
                    :label="{ text: $t('models.user.idIssuedOn') }"
                />
                <DxItem
                    data-field=""
                    :editorOptions="{
                        value: $mt.idIssuedAtValue,
                    }"
                    :label="{ text: $t('models.user.idIssuedAt') }"
                />
            </DxItem>
            <DxItem
                item-type="group"
                :col-span="2"
                :col-count="2"
                :caption="$t('models.user.groups.contactInfo')"
            >
                <DxItem
                    data-field="phone"
                    :editorOptions="{
                        mask: !!state.formData.phone ? '0000.000.000' : null,
                    }"
                    :label="{ text: $t('models.user.phone') }"
                />
                <DxItem
                    data-field="email"
                    :label="{ text: $t('models.user.email') }"
                />
                <DxItem
                    :col-span="2"
                    data-field="address"
                    :label="{ text: $t('models.user.address') }"
                />
            </DxItem>
            <DxItem
                item-type="group"
                :col-span="2"
                :caption="$t('models.user.groups.bankInfo')"
            >
                <DxItem
                    data-field="bank_account.bank_name"
                    :label="{ text: $t('models.user.bankName') }"
                />
                <DxItem
                    data-field="bank_account.account_number"
                    :label="{ text: $t('models.user.accountNumber') }"
                />
                <DxItem
                    data-field="bank_account.account_name"
                    :label="{ text: $t('models.user.accountName') }"
                />
            </DxItem>
            <DxItem
                :visible="hasConfirmedDocs"
                item-type="group"
                :col-span="2"
                :caption="$t('models.user.groups.confirmDocuments')"
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
import { DxForm, DxItem } from "devextreme-vue/form";
import DxTextArea from "devextreme-vue/text-area";

import CorePopup from "./CorePopup.vue";
import Photoswipe from "../Photoswipe.vue";
import { ref, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const popupRef = ref(null);
const state = reactive({
    formData: { url_documents: [] },
});
const hasConfirmedDocs = computed(
    () => state.formData.url_documents.length > 0
);
const images = computed(() => {
    return new Set(state.formData.url_documents.map((d) => d.file));
});

function show(user) {
    popupRef.value.setTitle(`${t("admin.users.detailUser")} #${user.code}`);
    popupRef.value.show();
    state.formData = user;
}
function onShown() {}
function onHidden() {}

defineExpose({ show });
</script>
