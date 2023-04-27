<template>
    <div>
        <h2 class="content-block">
            {{ $t("admin.contracts.title") }}
        </h2>
        <div class="content-block dx-card responsive-paddings">
            <DxDataGrid
                ref="dataGrid"
                :data-source="gridData"
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
                    allowUpdating: true,
                    allowDeleting: true,
                    confirmDelete: false,
                    mode: 'popup',
                    popup: {
                        fullScreen: $devices.phone ? true : false,
                        showTitle: true,
                        onShown: onShown,
                        onHiding: $mf.popRouteHistoryState,
                    },
                    form: {
                        labelLocation: $devices.phone ? 'top' : 'left',
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
                @contentReady="$mf.dataGridPreload(gridData, dataGrid)"
                @init-new-row="onInitNewRow"
                @editing-start="onEditingStart"
                @toolbar-preparing="onToolbarPreparing"
                @cellDblClick="onCellDblClick"
                @saved="onSave"
            >
                <DxColumn
                    :fixed="true"
                    :width="$devices.phone ? 35 : 125"
                    alignment="center"
                    type="buttons"
                    cssClass="dx-datagrid-command-column"
                    cell-template="commandCellTemplate"
                    :caption="
                        $t(
                            `titles.commandHeaderTitle${
                                $devices.phone ? 'Short' : ''
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
                    :validation-rules="validationRules.user"
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
                    :validation-rules="validationRules.principal"
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
                    :validation-rules="validationRules.interestRate"
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
                    :validation-rules="validationRules.paidAt"
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
                    :validation-rules="validationRules.advance"
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
                                        permissions.includes(
                                            'system@control'
                                        )) ||
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
                                        $refs.paidContractPopup.show(data.data),
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
                                        $refs.withdrawnContractPopup.show(
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
                                        dataGrid.editRow(data.rowIndex),
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
                                            dataGrid.deleteRow(data.rowIndex)
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
                                        $refs.contractDetailPopup.show(
                                            data.data
                                        ),
                                },
                            },
                        ]"
                    />
                </template>
            </DxDataGrid>
        </div>
        <PaidContractPopup ref="paidContractPopup" />
        <WithdrawnContractPopup ref="withdrawnContractPopup" />
        <ContractDetailPopup ref="contractDetailPopup" />
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import PaidContractPopup from "./PaidContractPopup.vue";
import WithdrawnContractPopup from "./WithdrawnContractPopup.vue";
import ContractDetailPopup from "../../../components/Popups/ContractDetailPopup.vue";
import adminContractsStore from "../../../store/modules/Admin/Contracts";

export default {
    components: {
        DxDataGrid,
        DxColumn,
        PaidContractPopup,
        WithdrawnContractPopup,
        ContractDetailPopup,
    },
    data() {
        return {
            gridData: null,
            isOld: false,
            validationRules: {},
        };
    },
    beforeCreate() {
        this.$store.registerModule("Admin.contracts", adminContractsStore);
    },
    created() {
        this.fetch(false).then(() => this.createValidation());
    },
    destroyed() {
        this.$store.unregisterModule("Admin.contracts");
    },
    computed: {
        ...mapGetters("Auth", ["permissions"]),
        ...mapGetters("Admin.contracts", [
            "contracts",
            "users",
            "principalMin",
        ]),
        dataGrid: function () {
            return this.$refs.dataGrid.instance;
        },
    },
    watch: {
        contracts() {
            this.cloneDeepData();
        },
    },
    methods: {
        ...mapActions("Admin.contracts", ["fetch", "save", "resetState"]),
        onSave(e) {
            this.save({ changes: e.changes });
        },
        onToolbarPreparing(e) {
            e.toolbarOptions.items.unshift(
                {
                    visible: this.$mf.isSet(this.$route.query),
                    location: "before",
                    widget: "dxButton",
                    options: {
                        icon: "far fa-arrow-left small",
                        hint: this.$t("buttons.back"),
                        onClick: () => {
                            this.$router.go(-1);
                        },
                    },
                },
                {
                    location: "before",
                    widget: "dxButton",
                    options: {
                        icon: "far fa-history small",
                        type: this.isOld ? "default" : "normal",
                        hint: this.$t("models.contract.includeWithdrawn"),
                        onClick: () => {
                            this.isOld = !this.isOld;
                            this.dataGrid.beginCustomLoading();
                            this.fetch(this.isOld);
                        },
                    },
                }
            );
        },
        createValidation() {
            this.validationRules = {
                user: [
                    {
                        type: "required",
                        message:
                            this.$t("models.contract.user") +
                            this.$mt.validations.required,
                    },
                ],
                principal: [
                    {
                        type: "required",
                        message:
                            this.$t("models.contract.principal") +
                            this.$mt.validations.required,
                    },
                    {
                        type: "custom",
                        validationCallback: this.validatePrincipal,
                        message: this.$t(
                            "models.contract.validations.principal"
                        ).replace(
                            "{amount}",
                            this.$options.filters.currency(this.principalMin)
                        ),
                    },
                ],
                advance: [
                    {
                        type: "custom",
                        validationCallback: this.validateAdvance,
                        message: this.$t("models.contract.validations.advance")
                            .replace(
                                "{advance}",
                                this.$options.filters.currency(
                                    0.1 * this.principalMin
                                )
                            )
                            .replace(
                                "{surplus}",
                                this.$options.filters.currency(
                                    this.principalMin
                                )
                            ),
                    },
                ],
                interestRate: [
                    {
                        type: "required",
                        message:
                            this.$t("models.contract.interestRate") +
                            this.$mt.validations.required,
                    },
                ],
                paidAt: [
                    {
                        type: "required",
                        message:
                            this.$t("models.contract.paidAt") +
                            this.$mt.validations.required,
                    },
                ],
            };
        },
        onInitNewRow(e) {
            e.data.interest_rate = this.interestRate;
            e.data.paid_at = moment().format(this.$mc.SERVER_DATE_FORMAT);
            this.dataGrid.columnOption(
                "interest_rate",
                "allowEditing",
                this.permissions.includes("system@control")
            );
            this.dataGrid.option(
                "editing.popup.title",
                this.$t("models.contract.popup.create")
            );
        },
        onEditingStart(e) {
            this.dataGrid.columnOption(
                "user_code",
                "allowEditing",
                e.data.status == 1 ||
                    this.permissions.includes("system@control")
            );
            this.dataGrid.columnOption(
                "principal",
                "allowEditing",
                e.data.status == 1 ||
                    this.permissions.includes("system@control")
            );
            this.dataGrid.columnOption(
                "interest_rate",
                "allowEditing",
                this.permissions.includes("system@control")
            );
            this.dataGrid.columnOption(
                "paid_at",
                "allowEditing",
                e.data.status == 1 ||
                    this.permissions.includes("system@control")
            );
            this.dataGrid.columnOption(
                "withdrawn_at",
                "allowEditing",
                [2, 3].includes(e.data.status)
            );
            this.dataGrid.option(
                "editing.popup.title",
                `${this.$t("models.contract.popup.edit")} #${e.data.code}`
            );
        },
        validatePrincipal(e) {
            return e.value >= this.principalMin;
        },
        validateAdvance(e) {
            if (!e.value) return true;
            return (
                e.value >= 0.1 * this.principalMin &&
                e.data.total - e.value >= this.principalMin
            );
        },
        cloneDeepData() {
            this.gridData = this.$mf.cloneDeep(this.contracts);
            if (!!this.$route.query.code) {
                this.dataGrid.columnOption("code", "filterValues", [
                    +this.$route.query.code,
                ]);
            }
            if (!!this.$route.query.userCode) {
                this.dataGrid.columnOption("userCode", "filterValues", [
                    +this.$route.query.userCode,
                ]);
            }
        },
        onShown(e) {
            this.$mf.checkPinDataGrid(e, this);
            this.$mf.pushPopupToHistoryState(() =>
                this.dataGrid.cancelEditData()
            );
        },
        onCellDblClick(e) {
            if (e.rowType == "data" && e.columnIndex == 2)
                this.$router.push({
                    name: "users",
                    query: { code: e.data.user_code },
                });
        },
    },
};
</script>

<style lang="scss">
.include-withdrawn {
    margin-left: 20px;
}
</style>
