<template>
    <div class="smartorders-page">
        <h2 class="content-block">
            {{ $t("admin.smartorders.title") }}
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
                :column-chooser="{
                    enabled: true,
                    mode: 'select',
                    allowSearch: true,
                }"
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
                    mode: 'batch',
                }"
                @contentReady="$mf.dataGridPreload(gridData, dataGrid)"
                @init-new-row="onInitNewRow"
                @toolbar-preparing="onToolbarPreparing"
                @saved="onSave"
            >
                <DxColumn
                    :fixed="true"
                    :width="$devices.phone ? 35 : 70"
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
                    data-field="user_code"
                    dataType="number"
                    name="userCode"
                    :header-filter="{ allowSearch: true }"
                    :caption="$t('admin.smartorders.user')"
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
                    data-field="started_at"
                    data-type="date"
                    :editor-options="{
                        dateSerializationFormat: $mc.DX_SERVER_DATE_FORMAT,
                    }"
                    :caption="$t('admin.smartorders.startedAt')"
                />
                <DxColumn
                    data-field="periods"
                    dataType="string"
                    :header-filter="{ allowSearch: true }"
                    :caption="$t('admin.smartorders.periods')"
                    :validation-rules="validationRules.periods"
                />
                <DxColumn
                    data-field="device_limit"
                    dataType="number"
                    :header-filter="{ allowSearch: true }"
                    :caption="$t('admin.smartorders.deviceLimit')"
                    :validation-rules="validationRules.deviceLimit"
                />
                <DxColumn
                    :visible="false"
                    data-field="devices"
                    dataType="string"
                    :header-filter="{ allowSearch: true }"
                    :caption="$t('admin.smartorders.devices')"
                />
                <template #commandCellTemplate="{ data }">
                    <DxToolbar
                        :items="[
                            {
                                locateInMenu: 'auto',
                                showText: 'inMenu',
                                location: 'center',
                                widget: 'dxButton',
                                options: {
                                    type: 'default',
                                    icon: 'far fa-empty-set small',
                                    hint: $t('admin.smartorders.clearDevices'),
                                    text: $t('admin.smartorders.clearDevices'),
                                    onClick: () =>
                                        dataGrid.cellValue(
                                            data.rowIndex,
                                            'devices',
                                            []
                                        ),
                                },
                            },
                            {
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
                                        dataGrid.deleteRow(data.rowIndex),
                                },
                            },
                        ]"
                    />
                </template>
            </DxDataGrid>
        </div>
        <PricePlansPopup ref="pricePlansPopup" />
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import PricePlansPopup from "../../components/Popups/PricePlansPopup.vue";
import adminSmartOrdersStore from "../../store/modules/Trading/SmartOrders";

export default {
    components: {
        DxDataGrid,
        DxColumn,
        PricePlansPopup,
    },
    data() {
        return {
            gridData: null,
            validationRules: {
                user: [
                    {
                        type: "required",
                        message:
                            this.$t("admin.smartorders.user") +
                            this.$mt.validations.required,
                    },
                    {
                        type: "async",
                        validationCallback: this.validateDuplicateUser,
                        message:
                            this.$t("admin.smartorders.user") +
                            this.$mt.validations.duplicate,
                    },
                ],
                balance: [
                    {
                        type: "periods",
                        message:
                            this.$t("admin.smartorders.periods") +
                            this.$mt.validations.required,
                    },
                ],
                lastTransaction: [
                    {
                        type: "deviceLimit",
                        message:
                            this.$t("admin.smartorders.deviceLimit") +
                            this.$mt.validations.required,
                    },
                ],
                startedAt: [
                    {
                        type: "required",
                        message:
                            this.$t("admin.smartorders.startedAt") +
                            this.$mt.validations.required,
                    },
                ],
            },
        };
    },
    beforeCreate() {
        this.$store.registerModule("Admin.smartorders", adminSmartOrdersStore);
    },
    created() {
        this.fetch();
    },
    destroyed() {
        this.$store.unregisterModule("Admin.smartorders");
    },
    computed: {
        ...mapGetters("Admin.smartorders", ["sos", "users"]),
        dataGrid: function () {
            return this.$refs.dataGrid.instance;
        },
    },
    watch: {
        sos() {
            this.cloneDeepData();
        },
    },
    methods: {
        ...mapActions("Admin.smartorders", [
            "fetch",
            "validateDuplicateUser",
            "save",
        ]),
        onSave(e) {
            this.$bus.emit("checkPin", () => this.save({ changes: e.changes }));
        },
        cloneDeepData() {
            this.gridData = this.$mf.cloneDeep(this.sos);
        },
        onInitNewRow(e) {
            e.data.last_transaction = this.$t("admin.smartorders.openNewBook");
        },
        onToolbarPreparing(e) {
            e.toolbarOptions.items.unshift({
                location: "before",
                widget: "dxButton",
                options: {
                    icon: "far fa-tags small",
                    hint: this.$t("admin.smartorders.pricePlans"),
                    onClick: () => {
                        this.$refs.pricePlansPopup.show();
                    },
                },
            });
        },
    },
};
</script>
<style lang="scss"></style>
