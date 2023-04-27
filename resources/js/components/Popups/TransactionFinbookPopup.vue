<template>
    <DxPopup
        ref="popup"
        :showCloseButton="true"
        :fullScreen="$devices.phone ? true : false"
        :show-title="true"
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
                    onClick: () => popup.hide(),
                },
            },
        ]"
        @hiding="onHiding"
    >
        <template #content>
            <form class="transaction-finbook-popup" @submit.prevent="onSubmit">
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
                            ref="depositForm"
                            :form-data="formData"
                            :label-location="$devices.phone ? 'top' : 'left'"
                            :scrolling-enabled="true"
                        >
                            <DxItem
                                data-field="deposit.money"
                                editor-type="dxNumberBox"
                                :editor-options="{
                                    format: '#,##0 ₫',
                                }"
                                :validation-rules="validationRules.money"
                                :label="{
                                    text: $t(
                                        'components.transactionFinbook.money'
                                    ),
                                }"
                            />
                            <DxItem
                                data-field="deposit.content"
                                editor-type="dxTextBox"
                                :validation-rules="validationRules.content"
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
                            ref="withdrawForm"
                            :form-data="formData"
                            :label-location="$devices.phone ? 'top' : 'left'"
                            :scrolling-enabled="true"
                        >
                            <DxItem
                                data-field="withdraw.money"
                                editor-type="dxNumberBox"
                                :editor-options="{
                                    format: '#,##0 ₫',
                                }"
                                :validation-rules="validationRules.money"
                                :label="{
                                    text: $t(
                                        'components.transactionFinbook.money'
                                    ),
                                }"
                            />
                            <DxItem
                                data-field="withdraw.content"
                                editor-type="dxTextBox"
                                :validation-rules="validationRules.content"
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
                            ref="transferForm"
                            :form-data="formData"
                            :label-location="$devices.phone ? 'top' : 'left'"
                            :scrolling-enabled="true"
                        >
                            <DxItem
                                data-field="transfer.receiverId"
                                editor-type="dxSelectBox"
                                :editor-options="{
                                    searchEnabled: true,
                                    items: finbooksName,
                                    displayExpr: 'name',
                                    valueExpr: 'id',
                                }"
                                :validation-rules="validationRules.receiverId"
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
                                :validation-rules="validationRules.money"
                                :label="{
                                    text: $t(
                                        'components.transactionFinbook.money'
                                    ),
                                }"
                            />
                            <DxItem
                                data-field="transfer.content"
                                editor-type="dxTextBox"
                                :validation-rules="validationRules.content"
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
                            ref="adjustmentForm"
                            :form-data="formData"
                            :label-location="$devices.phone ? 'top' : 'left'"
                            :scrolling-enabled="true"
                        >
                            <DxItem
                                data-field="adjustment.money"
                                editor-type="dxNumberBox"
                                :editor-options="{
                                    format: '#,##0 ₫',
                                }"
                                :validation-rules="validationRules.money"
                                :label="{
                                    text: $t(
                                        'components.transactionFinbook.money'
                                    ),
                                }"
                            />
                            <DxItem
                                data-field="adjustment.content"
                                editor-type="dxTextBox"
                                :validation-rules="validationRules.content"
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
        </template>
    </DxPopup>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxTabPanel } from "devextreme-vue/tab-panel";
import { DxForm, DxItem } from "devextreme-vue/form";

export default {
    components: {
        DxTabPanel,
        DxItem,
        DxForm,
    },
    data() {
        return {
            finbooksName: [],
            formData: { type: "deposit" },
            validationRules: {
                money: [
                    {
                        type: "required",
                        message:
                            this.$t("components.transactionFinbook.money") +
                            this.$mt.validations.required,
                    },
                ],
                content: [
                    {
                        type: "required",
                        message:
                            this.$t("components.transactionFinbook.content") +
                            this.$mt.validations.required,
                    },
                ],
                receiverId: [
                    {
                        type: "required",
                        message:
                            this.$t(
                                "components.transactionFinbook.receiverId"
                            ) + this.$mt.validations.required,
                    },
                ],
            },
        };
    },
    created() {
        this.getFinbooksName().then((data) => (this.finbooksName = data));
        this.initFormData();
    },
    destroyed() {},
    computed: {
        popup() {
            return this.$refs.popup.instance;
        },
    },
    methods: {
        ...mapActions("Trading.finbooks", ["updateBalance", "getFinbooksName"]),
        show(finbook) {
            this.popup.option("title", finbook.name);
            this.formData.id = finbook.id;
            this.popup.show();
            this.setFocus();
            this.$mf.pushPopupToHistoryState(() => this.popup.hide());
        },
        onSubmit() {
            console.log(this.formData);
            this.$bus.emit("checkPin", () =>
                this.updateBalance(this.formData).then((isOk) => {
                    if (isOk) this.popup.hide();
                })
            );
        },
        saveClick() {
            this.$refs[`${this.formData.type}Form`].instance
                .getButton(`${this.formData.type}Submit`)
                .element()
                .click();
        },
        setFocus() {
            setTimeout(
                () =>
                    this.$refs[`${this.formData.type}Form`].instance
                        .getEditor(
                            `${this.formData.type}.${
                                this.formData.type == "transfer"
                                    ? "receiverId"
                                    : "money"
                            }`
                        )
                        .focus(),
                500
            );
        },
        onHiding() {
            this.initFormData();
            this.$mf.popRouteHistoryState();
        },
        tabPanelItem(type) {
            return {
                title: this.$t(`components.transactionFinbook.${type}`),
                text: type,
                template: `${type}Template`,
            };
        },
        initFormData() {
            let temp = {
                money: null,
                content: null,
            };
            this.formData = {
                ...this.formData,
                ...{
                    deposit: { ...temp },
                    withdraw: { ...temp },
                    transfer: { ...temp, ...{ receiverId: null } },
                    adjustment: { ...temp },
                },
            };
        },

        onTitleClick({ itemData: { text } }) {
            this.formData.type = text;
            this.setFocus();
        },
    },
};
</script>
<
<style lang="scss">
.transaction-finbook-popup {
    .dx-tabpanel-tabs {
        margin-bottom: 20px;
    }
}
</style>
