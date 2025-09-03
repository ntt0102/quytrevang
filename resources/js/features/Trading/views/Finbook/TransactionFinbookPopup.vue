<template>
    <CorePopup
        ref="popupRef"
        class="transaction-finbook-popup"
        :title="$t('trading.derstats.buttons.addData')"
        :toolbarItems="[
            {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: $t('buttons.save'),
                    onClick: () => saveClick(),
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
                <DxTabPanel
                    ref="tabPanel"
                    :loop="false"
                    :animation-enabled="true"
                    :swipe-enabled="false"
                    :showNavButtons="true"
                    :items="[
                        tabPanelItem('deposit'),
                        tabPanelItem('withdraw'),
                        tabPanelItem('transfer'),
                        tabPanelItem('adjustment'),
                    ]"
                    @titleClick="onTitleClick"
                >
                    <template #depositTemplate>
                        <DxForm
                            ref="depositFormRef"
                            :form-data="state.formData"
                            :label-location="
                                $screen.getScreenSizeInfo.isXSmall
                                    ? 'top'
                                    : 'left'
                            "
                            :scrolling-enabled="true"
                        >
                            <DxItem
                                data-field="deposit.money"
                                editor-type="dxNumberBox"
                                :editor-options="{
                                    format: '#,##0 ₫',
                                }"
                                :validation-rules="state.validationRules.money"
                                :label="{
                                    text: $t(
                                        'components.transactionFinbook.money'
                                    ),
                                }"
                            />
                            <DxItem
                                data-field="deposit.content"
                                editor-type="dxTextBox"
                                :validation-rules="
                                    state.validationRules.content
                                "
                                :label="{
                                    text: $t(
                                        'components.transactionFinbook.content'
                                    ),
                                }"
                            />
                            <DxItem
                                name="depositSubmit"
                                cssClass="display-none"
                                item-type="button"
                                :button-options="{
                                    useSubmitBehavior: true,
                                }"
                            />
                        </DxForm>
                    </template>
                    <template #withdrawTemplate>
                        <DxForm
                            ref="withdrawFormRef"
                            :form-data="state.formData"
                            :label-location="
                                $screen.getScreenSizeInfo.isXSmall
                                    ? 'top'
                                    : 'left'
                            "
                            :scrolling-enabled="true"
                        >
                            <DxItem
                                data-field="withdraw.money"
                                editor-type="dxNumberBox"
                                :editor-options="{
                                    format: '#,##0 ₫',
                                }"
                                :validation-rules="state.validationRules.money"
                                :label="{
                                    text: $t(
                                        'components.transactionFinbook.money'
                                    ),
                                }"
                            />
                            <DxItem
                                data-field="withdraw.content"
                                editor-type="dxTextBox"
                                :validation-rules="
                                    state.validationRules.content
                                "
                                :label="{
                                    text: $t(
                                        'components.transactionFinbook.content'
                                    ),
                                }"
                            />
                            <DxItem
                                name="withdrawSubmit"
                                cssClass="display-none"
                                item-type="button"
                                :button-options="{
                                    useSubmitBehavior: true,
                                }"
                            />
                        </DxForm>
                    </template>
                    <template #transferTemplate>
                        <DxForm
                            ref="transferFormRef"
                            :form-data="state.formData"
                            :label-location="
                                $screen.getScreenSizeInfo.isXSmall
                                    ? 'top'
                                    : 'left'
                            "
                            :scrolling-enabled="true"
                        >
                            <DxItem
                                data-field="transfer.receiverId"
                                editor-type="dxSelectBox"
                                :editor-options="{
                                    searchEnabled: true,
                                    items: state.finbooksName,
                                    displayExpr: 'name',
                                    valueExpr: 'id',
                                }"
                                :validation-rules="
                                    state.validationRules.receiverId
                                "
                                :label="{
                                    text: $t(
                                        'components.transactionFinbook.receiverId'
                                    ),
                                }"
                            />
                            <DxItem
                                data-field="transfer.money"
                                editor-type="dxNumberBox"
                                :editor-options="{
                                    format: '#,##0 ₫',
                                }"
                                :validation-rules="state.validationRules.money"
                                :label="{
                                    text: $t(
                                        'components.transactionFinbook.money'
                                    ),
                                }"
                            />
                            <DxItem
                                data-field="transfer.content"
                                editor-type="dxTextBox"
                                :validation-rules="
                                    state.validationRules.content
                                "
                                :label="{
                                    text: $t(
                                        'components.transactionFinbook.content'
                                    ),
                                }"
                            />
                            <DxItem
                                name="transferSubmit"
                                cssClass="display-none"
                                item-type="button"
                                :button-options="{
                                    useSubmitBehavior: true,
                                }"
                            />
                        </DxForm>
                    </template>
                    <template #adjustmentTemplate>
                        <DxForm
                            ref="adjustmentFormRef"
                            :form-data="state.formData"
                            :label-location="
                                $screen.getScreenSizeInfo.isXSmall
                                    ? 'top'
                                    : 'left'
                            "
                            :scrolling-enabled="true"
                        >
                            <DxItem
                                data-field="adjustment.money"
                                editor-type="dxNumberBox"
                                :editor-options="{
                                    format: '#,##0 ₫',
                                }"
                                :validation-rules="state.validationRules.money"
                                :label="{
                                    text: $t(
                                        'components.transactionFinbook.money'
                                    ),
                                }"
                            />
                            <DxItem
                                data-field="adjustment.content"
                                editor-type="dxTextBox"
                                :validation-rules="
                                    state.validationRules.content
                                "
                                :label="{
                                    text: $t(
                                        'components.transactionFinbook.content'
                                    ),
                                }"
                            />
                            <DxItem
                                name="adjustmentSubmit"
                                cssClass="display-none"
                                item-type="button"
                                :button-options="{
                                    useSubmitBehavior: true,
                                }"
                            />
                        </DxForm>
                    </template>
                </DxTabPanel>
            </form>
        </DxScrollView>
    </CorePopup>
</template>
<script setup>
import { DxTabPanel } from "devextreme-vue/tab-panel";
import { DxForm, DxItem } from "devextreme-vue/form";
import CorePopup from "../../../../components/Popups/CorePopup.vue";
import { inject, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const bus = inject("bus");
const mt = inject("mt");
const popupRef = ref(null);
const depositFormRef = ref(null);
const withdrawFormRef = ref(null);
const transferFormRef = ref(null);
const adjustmentFormRef = ref(null);
const state = reactive({
    finbooksName: [],
    formData: { type: "deposit" },
    validationRules: {
        money: [
            {
                type: "required",
                message:
                    t("components.transactionFinbook.money") +
                    mt.validations.required,
            },
        ],
        content: [
            {
                type: "required",
                message:
                    t("components.transactionFinbook.content") +
                    mt.validations.required,
            },
        ],
        receiverId: [
            {
                type: "required",
                message:
                    t("components.transactionFinbook.receiverId") +
                    mt.validations.required,
            },
        ],
    },
});
let finbook = null;
store
    .dispatch("tradingFinbook/getFinbooksName")
    .then((data) => (state.finbooksName = data));
initFormData();

function show(e) {
    popupRef.value.setTitle(e.name);
    popupRef.value.show();
    finbook = e;
}
function onSubmit() {
    console.log(state.formData);
    bus.emit("checkPin", () =>
        store
            .dispatch("tradingFinbook/updateBalance", state.formData)
            .then((isOk) => {
                if (isOk) popupRef.value.hide();
            })
    );
}
function saveClick() {
    getFormRef()
        .instance.getButton(`${state.formData.type}Submit`)
        .element()
        .click();
}
function setFocus() {
    getFormRef()
        .instance.getEditor(
            `${state.formData.type}.${
                state.formData.type == "transfer" ? "receiverId" : "money"
            }`
        )
        .focus();
}
function getFormRef() {
    let formRef = null;
    switch (state.formData.type) {
        case "deposit":
            formRef = depositFormRef;
            break;
        case "withdraw":
            formRef = withdrawFormRef;
            break;
        case "transfer":
            formRef = transferFormRef;
            break;
        case "adjustment":
            formRef = adjustmentFormRef;
            break;
    }
    return formRef.value;
}
function tabPanelItem(type) {
    return {
        title: t(`components.transactionFinbook.${type}`),
        text: type,
        template: `${type}Template`,
    };
}
function initFormData() {
    let temp = {
        money: null,
        content: null,
    };
    state.formData = {
        ...state.formData,
        ...{
            deposit: { ...temp },
            withdraw: { ...temp },
            transfer: { ...temp, ...{ receiverId: null } },
            adjustment: { ...temp },
        },
    };
}
function onTitleClick({ itemData: { text } }) {
    state.formData.type = text;
    setFocus();
}

function onShown() {
    state.formData.id = finbook.id;
    setFocus();
}
function onHidden() {
    initFormData();
}

defineExpose({ show });
</script>
<style lang="scss">
.transaction-finbook-popup {
    .dx-tabpanel-tabs {
        margin-bottom: 20px;
    }
}
</style>
