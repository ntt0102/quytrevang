<template>
    <div class="content-block dx-card responsive-paddings">
        <DxDataGrid
            ref="dataGridRef"
            :column-min-width="40"
            :data-source="state.gridData"
            key-expr="id"
            :show-borders="true"
            :column-auto-width="true"
            :allow-column-reordering="true"
            :allow-column-resizing="true"
            column-resizing-mode="widget"
            :paging="{ pageSize: 10 }"
            :headerFilter="{ visible: true }"
            :loadPanel="{ enabled: true }"
            :selection="{ mode: 'single' }"
            :editing="{
                allowAdding: true,
                allowUpdating: allowModifying,
                allowDeleting: allowModifying,
                confirmDelete: false,
                mode: 'popup',
                popup: {
                    width: 300,
                    height: $screen.getScreenSizeInfo.isXSmall ? 250 : 210,
                    fullScreen: false,
                    showTitle: true,
                    onShown: onShown,
                    onHiding: onHidden,
                },
                form: {
                    labelLocation: $screen.getScreenSizeInfo.isXSmall
                        ? 'top'
                        : 'left',
                    items: [{ dataField: 'principal', colSpan: 2 }],
                },
            }"
            @cell-prepared="$mf.setContractStatusColor"
            @contentReady="
                $mf.dataGridPreload(state.gridData, dataGridRef.instance)
            "
            @init-new-row="onInitNewRow"
            @editing-start="onEditingStart"
            @toolbar-preparing="onToolbarPreparing"
            @saved="onSaved"
        >
            <DxColumn
                :fixed="true"
                :width="$screen.getScreenSizeInfo.isXSmall ? 35 : 98"
                type="buttons"
                cssClass="dx-datagrid-command-column"
                cell-template="commandCellTemplate"
                :caption="
                    $t(
                        `titles.commandHeaderTitle${
                            $screen.getScreenSizeInfo.isXSmall ? 'Short' : ''
                        }`
                    )
                "
            />
            <DxColumn
                :allow-editing="false"
                data-field="code"
                data-type="string"
                :header-filter="{ allowSearch: true }"
                :caption="$t('models.contract.codeShort')"
            />
            <DxColumn
                :allow-editing="false"
                data-field="status"
                :caption="$t('models.contract.status')"
                :lookup="{
                    dataSource: $mf.getContractStatusList(),
                    displayExpr: 'name',
                    valueExpr: 'value',
                }"
            />
            <DxColumn
                name="principal"
                data-field="principal"
                data-type="number"
                format="#,##0 ₫"
                :editor-options="{
                    step: '1000000',
                    format: '#,##0 ₫',
                }"
                :header-filter="{ allowSearch: true }"
                :caption="$t('models.contract.principal')"
                :validation-rules="state.validationRules"
            />
            <DxColumn
                :allow-editing="false"
                data-field="interest_rate"
                data-type="number"
                :format="'#0.## %/' + $t('models.contract.frequency')"
                :caption="$t('models.contract.interestRate')"
            />
            <DxColumn
                :allow-editing="false"
                name="paidAt"
                data-field="paid_at"
                data-type="date"
                :caption="$t('models.contract.paidAt')"
            />
            <DxColumn
                :allow-editing="false"
                name="withdrawnAt"
                data-field="withdrawn_at"
                data-type="date"
                :caption="$t('models.contract.withdrawnAt')"
            >
            </DxColumn>
            <template #commandCellTemplate="{ data }">
                <DxToolbar
                    :items="[
                        {
                            visible: data.data.status <= 1,
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'before',
                            widget: 'dxButton',
                            options: {
                                type: 'default',
                                icon: `far fa-${
                                    data.data.status == 0
                                        ? 'arrow-square-up'
                                        : 'receipt'
                                }`,
                                hint: $t(
                                    data.data.status == 0
                                        ? 'user.contract.paidContract'
                                        : 'user.contract.editPaidContract'
                                ),
                                text: $t(
                                    data.data.status == 0
                                        ? 'user.contract.paidContract'
                                        : 'user.contract.editPaidContract'
                                ),
                                onClick: () =>
                                    $refs.payingContractPopupRef.show(
                                        data.data
                                    ),
                            },
                        },
                        {
                            visible: data.data.status == 2,
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'before',
                            widget: 'dxButton',
                            options: {
                                type: 'default',
                                icon: 'far fa-arrow-square-down',
                                hint: $t('user.contract.withdrawContract'),
                                text: $t('user.contract.withdrawContract'),
                                onClick: () =>
                                    $refs.withdrawingContractPopupRef.show(
                                        data.data
                                    ),
                            },
                        },
                        {
                            visible: data.data.status == 3,
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'before',
                            widget: 'dxButton',
                            options: {
                                type: 'default',
                                icon: 'undo',
                                hint: $t('user.contract.unwithdrawContract'),
                                text: $t('user.contract.unwithdrawContract'),
                                onClick: () =>
                                    $bus.emit('checkPin', () =>
                                        $store.dispatch(
                                            'userContract/withdrawingContract',
                                            {
                                                id: data.data.id,
                                                advance: 0,
                                            }
                                        )
                                    ),
                            },
                        },
                        {
                            visible: data.data.status == 0,
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'before',
                            widget: 'dxButton',
                            options: {
                                type: 'default',
                                icon: 'edit',
                                hint: $t('buttons.edit'),
                                text: $t('buttons.edit'),
                                onClick: () =>
                                    dataGridRef.instance.editRow(data.rowIndex),
                            },
                        },
                        {
                            visible: data.data.status == 0,
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'before',
                            widget: 'dxButton',
                            options: {
                                type: 'default',
                                icon: 'trash',
                                hint: $t('buttons.delete'),
                                text: $t('buttons.delete'),
                                onClick: () =>
                                    $bus.emit('checkPin', () =>
                                        dataGridRef.instance.deleteRow(
                                            data.rowIndex
                                        )
                                    ),
                            },
                        },
                        {
                            visible: !isNaN(data.key) && data.data.status >= 1,
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'before',
                            widget: 'dxButton',
                            options: {
                                type: 'default',
                                icon: 'info',
                                hint: $t('models.contract.popup.detail'),
                                text: $t('models.contract.popup.detail'),
                                onClick: () =>
                                    $refs.contractDetailPopupRef.show(
                                        data.data
                                    ),
                            },
                        },
                    ]"
                />
            </template>
        </DxDataGrid>
    </div>
    <ContractConditionsPopup ref="contractConditionsPopupRef" />
    <PayingContractPopup ref="payingContractPopupRef" />
    <WithdrawingContractPopup ref="withdrawingContractPopupRef" />
    <ContractDetailPopup ref="contractDetailPopupRef" />
</template>
<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import ContractConditionsPopup from "./ContractConditionsPopup.vue";
import PayingContractPopup from "./PayingContractPopup.vue";
import WithdrawingContractPopup from "./WithdrawingContractPopup.vue";
import ContractDetailPopup from "../../../components/Popups/ContractDetailPopup.vue";
import { inject, ref, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const store = useStore();
const route = useRoute();
const { t } = useI18n();
const bus = inject("bus");
const mt = inject("mt");
const mc = inject("mc");
const mf = inject("mf");
const routeHistoryState = inject("routeHistoryState");
const dataGridRef = ref(null);
const payingContractPopupRef = ref(null);
const contractConditionsPopupRef = ref(null);
const state = reactive({
    gridData: null,
    // contract: { id: null },
    validationRules: [
        {
            type: "required",
            message: t("models.contract.principal") + mt.validations.required,
        },
        {
            type: "custom",
            validationCallback: validatePrincipal,
            message: t("models.contract.validations.principal"),
        },
    ],
});
store.dispatch("userContract/getContracts").then(() => {
    if (route.hash == "#conditions") showConditions();
});

watch(
    () => store.state.userContract.contracts,
    (value) => cloneDeepData(value)
);

function onSaved(formData) {
    bus.emit("checkPin", () => {
        store
            .dispatch("userContract/save", { changes: formData.changes })
            .then(({ isOk, type, contract }) => {
                if (isOk && type == "insert")
                    payingContractPopupRef.value.show(contract);
            });
    });
}
function allowModifying(e) {
    return e.row.data.status == 1;
}
function validatePrincipal(e) {
    return e.value >= store.state.userContract.principalMin;
}
function onInitNewRow(e) {
    e.data.status = 1;
    e.data.interest_rate = store.state.userContract.interestRate;
    e.data.paid_at = moment().format(mc.SERVER_DATE_FORMAT);
    dataGridRef.value.instance.option(
        "editing.popup.title",
        t("models.contract.popup.create")
    );
}
function onEditingStart(e) {
    dataGridRef.value.instance.option(
        "editing.popup.title",
        `${t("models.contract.popup.edit")} #${e.data.code}`
    );
}
function cloneDeepData(contracts) {
    state.gridData = mf.cloneDeep(contracts);
    if (!!route.query.code) {
        dataGridRef.value.instance.columnOption("code", "filterValues", [
            +route.query.code,
        ]);
    }
}
function onShown(e) {
    mf.checkPinDataGrid(e, dataGridRef.value.instance);
    mf.pushPopupToHistoryState(routeHistoryState, () =>
        dataGridRef.value.instance.cancelEditData()
    );
}
function onHidden() {
    mf.popRouteHistoryState(routeHistoryState);
}
function onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
        location: "before",
        widget: "dxButton",
        options: {
            icon: "help",
            type: "normal",
            hint: t("components.contractConditions.title"),
            onClick: () => contractConditionsPopupRef.value.show(),
        },
    });
}
</script>

<style lang="scss" scoped>
.include-withdrawn {
    margin-left: 20px;
}
</style>
