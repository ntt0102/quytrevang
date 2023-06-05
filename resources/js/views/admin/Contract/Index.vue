<template>
    <div class="content-block dx-card responsive-paddings">
        <DxDataGrid
            ref="dataGridRef"
            :data-source="state.gridData"
            key-expr="code"
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
                allowUpdating: true,
                allowDeleting: true,
                confirmDelete: false,
                mode: 'popup',
                popup: {
                    fullScreen: $screen.getScreenSizeInfo.isXSmall
                        ? true
                        : false,
                    showTitle: true,
                    onShown: onShown,
                    onHiding: onHidden,
                },
                form: {
                    labelLocation: $screen.getScreenSizeInfo.isXSmall
                        ? 'top'
                        : 'left',
                    items: [
                        { dataField: 'user_code' },
                        { dataField: 'principal' },
                        { dataField: 'interest_rate' },
                        { dataField: 'paid_at' },
                        { dataField: 'advance' },
                        { dataField: 'withdrawn_at' },
                    ],
                },
            }"
            @cell-prepared="$mf.setContractStatusColor"
            @contentReady="
                $mf.dataGridPreload(state.gridData, dataGridRef.instance)
            "
            @init-new-row="onInitNewRow"
            @editing-start="onEditingStart"
            @toolbar-preparing="onToolbarPreparing"
            @cellDblClick="onCellDblClick"
            @saved="onSave"
        >
            <DxColumn
                :fixed="true"
                :width="$screen.getScreenSizeInfo.isXSmall ? 35 : 70"
                alignment="center"
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
                dataType="string"
                :header-filter="{ allowSearch: true }"
                :caption="$t('models.contract.codeShort')"
            />
            <DxColumn
                :allow-editing="false"
                data-field="status"
                dataType="number"
                :caption="$t('models.contract.status')"
                :lookup="{
                    dataSource: $mf.getContractStatusList(),
                    displayExpr: 'name',
                    valueExpr: 'value',
                }"
            />
            <DxColumn
                data-field="user_code"
                dataType="number"
                name="userCode"
                :header-filter="{ allowSearch: true }"
                :caption="$t('models.contract.user')"
                :validation-rules="state.validationRules.user"
                :lookup="{
                    dataSource: users,
                    displayExpr: 'name',
                    valueExpr: 'code',
                    searchEnabled: true,
                    searchExpr: ['code', 'name'],
                }"
            />
            <DxColumn
                data-field="principal"
                data-type="number"
                format="#,##0 ₫"
                :editor-options="{
                    step: '1000000',
                    format: '#,##0 ₫',
                }"
                :header-filter="{ allowSearch: true }"
                :caption="$t('models.contract.principal')"
                :validation-rules="state.validationRules.principal"
            />
            <DxColumn
                data-field="interest_rate"
                data-type="number"
                :format="'#0.## %/' + $t('models.contract.frequency')"
                :editor-options="{
                    step: '0.0001',
                    format: '#0.## %/' + $t('models.contract.frequency'),
                }"
                :caption="$t('models.contract.interestRate')"
                :validation-rules="state.validationRules.interestRate"
            />
            <DxColumn
                data-field="paid_at"
                data-type="date"
                :editor-options="{
                    dateSerializationFormat: $mc.DX_SERVER_DATE_FORMAT,
                    showClearButton: 'true',
                    useMaskBehavior: 'true',
                    applyValueMode: 'useButtons',
                }"
                :caption="$t('models.contract.paidAt')"
                :validation-rules="state.validationRules.paidAt"
            />
            <DxColumn
                data-field="advance"
                data-type="number"
                format="#,##0 ₫"
                :editor-options="{
                    step: '1000000',
                    format: '#,##0 ₫',
                }"
                :header-filter="{ allowSearch: true }"
                :caption="$t('models.contract.advance')"
                :validation-rules="state.validationRules.advance"
            />
            <DxColumn
                data-field="withdrawn_at"
                data-type="date"
                :editor-options="{
                    dateSerializationFormat: $mc.DX_SERVER_DATE_FORMAT,
                    showClearButton: 'true',
                    useMaskBehavior: 'true',
                    applyValueMode: 'useButtons',
                }"
                :caption="$t('models.contract.withdrawnAt')"
            />
            <template #commandCellTemplate="{ data }">
                <DxToolbar
                    :items="[
                        {
                            visible:
                                (data.data.status == 2 &&
                                    permissions.includes('system@control')) ||
                                [0, 1].includes(data.data.status),
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'center',
                            widget: 'dxButton',
                            options: {
                                type: 'default',
                                icon: `far fa-${
                                    data.data.status == 2 ? 'file-' : ''
                                }check small`,
                                hint: $t(
                                    `components.paidContract.${
                                        data.data.status == 2
                                            ? 'confirmTitle'
                                            : 'title'
                                    }`
                                ),
                                text: $t(
                                    `components.paidContract.${
                                        data.data.status == 2
                                            ? 'confirmTitle'
                                            : 'title'
                                    }`
                                ),
                                onClick: () =>
                                    $refs.paidContractPopupRef.show(data.data),
                            },
                        },
                        {
                            visible:
                                data.data.status == 3 ||
                                (data.data.status == 4 &&
                                    permissions.includes('system@control')),
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'center',
                            widget: 'dxButton',
                            options: {
                                type: 'default',
                                icon: `far fa-${
                                    data.data.status <= 1
                                        ? 'check'
                                        : data.data.status == 3
                                        ? 'check-double'
                                        : 'file-check'
                                } small`,
                                hint: $t(
                                    `components.withdrawnContract.${
                                        data.data.status == 4
                                            ? 'withdrawnTitle'
                                            : 'title'
                                    }`
                                ),
                                text: $t(
                                    `components.withdrawnContract.${
                                        data.data.status == 4
                                            ? 'withdrawnTitle'
                                            : 'title'
                                    }`
                                ),
                                onClick: () =>
                                    $refs.withdrawnContractPopupRef.show(
                                        data.data
                                    ),
                            },
                        },
                        {
                            visible:
                                data.data.status <= 3 ||
                                permissions.includes('system@control'),
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'center',
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
                            visible:
                                data.data.status == 0 ||
                                permissions.includes('system@control'),
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'center',
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
                            visible: !isNaN(data.key),
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'center',
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
    <PaidContractPopup ref="paidContractPopupRef" />
    <WithdrawnContractPopup ref="withdrawnContractPopupRef" />
    <ContractDetailPopup ref="contractDetailPopupRef" />
</template>
<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import PaidContractPopup from "./PaidContractPopup.vue";
import WithdrawnContractPopup from "./WithdrawnContractPopup.vue";
import ContractDetailPopup from "../../../components/Popups/ContractDetailPopup.vue";
import { ref, reactive, inject, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const store = useStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const bus = inject("bus");
const filters = inject("filters");
const mc = inject("mc");
const mt = inject("mt");
const mf = inject("mf");
const routeHistoryState = inject("routeHistoryState");
const dataGridRef = ref(null);
const state = reactive({
    gridData: null,
    validationRules: {},
});
const users = computed(() => store.state.adminContract.users);
const permissions = computed(() => store.state.auth.user.permissions);
let isOld = false;

store.dispatch("adminContract/getContracts").then(() => createValidation());

watch(
    () => store.state.adminContract.contracts,
    (value) => cloneDeepData(value)
);

function onSave(e) {
    store.dispatch("adminContract/save", { changes: e.changes });
}
function onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
        {
            visible: mf.isSet(route.query),
            location: "before",
            widget: "dxButton",
            options: {
                icon: "far fa-arrow-left small",
                hint: t("buttons.back"),
                onClick: () => {
                    router.go(-1);
                },
            },
        },
        {
            location: "before",
            widget: "dxButton",
            options: {
                icon: "far fa-history small",
                type: isOld ? "default" : "normal",
                hint: t("models.contract.includeWithdrawn"),
                onClick: () => {
                    isOld = !isOld;
                    dataGridRef.value.instance.beginCustomLoading();
                    store.dispatch("adminContract/getContracts", isOld);
                },
            },
        }
    );
}
function createValidation() {
    state.validationRules = {
        user: [
            {
                type: "required",
                message: t("models.contract.user") + mt.validations.required,
            },
        ],
        principal: [
            {
                type: "required",
                message:
                    t("models.contract.principal") + mt.validations.required,
            },
            {
                type: "custom",
                validationCallback: validatePrincipal,
                message: t("models.contract.validations.principal").replace(
                    "{amount}",
                    filters.currency(state.principalMin)
                ),
            },
        ],
        advance: [
            {
                type: "custom",
                validationCallback: validateAdvance,
                message: t("models.contract.validations.advance")
                    .replace(
                        "{advance}",
                        filters.currency(0.1 * state.principalMin)
                    )
                    .replace("{surplus}", filters.currency(state.principalMin)),
            },
        ],
        interestRate: [
            {
                type: "required",
                message:
                    t("models.contract.interestRate") + mt.validations.required,
            },
        ],
        paidAt: [
            {
                type: "required",
                message: t("models.contract.paidAt") + mt.validations.required,
            },
        ],
    };
}
function onInitNewRow(e) {
    e.data.interest_rate = state.interestRate;
    e.data.paid_at = moment().format(mc.SERVER_DATE_FORMAT);
    dataGridRef.value.instance.columnOption(
        "interest_rate",
        "allowEditing",
        permissions.value.includes("system@control")
    );
    dataGridRef.value.instance.option(
        "editing.popup.title",
        t("models.contract.popup.create")
    );
}
function onEditingStart(e) {
    dataGridRef.value.instance.columnOption(
        "user_code",
        "allowEditing",
        e.data.status == 1 || permissions.value.includes("system@control")
    );
    dataGridRef.value.instance.columnOption(
        "principal",
        "allowEditing",
        e.data.status == 1 || permissions.value.includes("system@control")
    );
    dataGridRef.value.instance.columnOption(
        "interest_rate",
        "allowEditing",
        permissions.value.includes("system@control")
    );
    dataGridRef.value.instance.columnOption(
        "paid_at",
        "allowEditing",
        e.data.status == 1 || permissions.value.includes("system@control")
    );
    dataGridRef.value.instance.columnOption(
        "withdrawn_at",
        "allowEditing",
        [2, 3].includes(e.data.status)
    );
    dataGridRef.value.instance.option(
        "editing.popup.title",
        `${t("models.contract.popup.edit")} #${e.data.code}`
    );
}
function validatePrincipal(e) {
    return e.value >= state.principalMin;
}
function validateAdvance(e) {
    if (!e.value) return true;
    return (
        e.value >= 0.1 * state.principalMin &&
        e.data.total - e.value >= state.principalMin
    );
}
function cloneDeepData(contracts) {
    state.gridData = mf.cloneDeep(contracts);
    if (!!route.query.code) {
        dataGridRef.value.instance.columnOption("code", "filterValues", [
            +route.query.code,
        ]);
    }
    if (!!route.query.userCode) {
        dataGridRef.value.instance.columnOption("userCode", "filterValues", [
            +route.query.userCode,
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
function onCellDblClick(e) {
    if (e.rowType == "data" && e.columnIndex == 2)
        router.push({
            name: "admin-user",
            query: { code: e.data.user_code },
        });
}
</script>

<style lang="scss">
.include-withdrawn {
    margin-left: 20px;
}
</style>
