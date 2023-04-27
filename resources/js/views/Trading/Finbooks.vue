<template>
    <div class="finbooks-page">
        <h2 class="content-block">
            {{ $t("admin.finbooks.title") }}
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
                    mode: 'batch',
                }"
                @contentReady="$mf.dataGridPreload(gridData, dataGrid)"
                @init-new-row="onInitNewRow"
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
                    data-field="display"
                    dataType="number"
                    :caption="$t('admin.finbooks.display')"
                    :validation-rules="validationRules.display"
                />
                <DxColumn
                    data-field="name"
                    dataType="string"
                    :header-filter="{ allowSearch: true }"
                    :caption="$t('admin.finbooks.name')"
                    :validation-rules="validationRules.name"
                />
                <DxColumn
                    data-field="balance"
                    data-type="number"
                    format="#,##0 ₫"
                    :editor-options="{
                        step: '1000000',
                        format: '#,##0 ₫',
                    }"
                    :header-filter="{ allowSearch: true }"
                    :caption="$t('admin.finbooks.balance')"
                    :validation-rules="validationRules.balance"
                />
                <DxColumn
                    data-field="last_transaction"
                    dataType="string"
                    :header-filter="{ allowSearch: true }"
                    :caption="$t('admin.finbooks.lastTransaction')"
                    :validation-rules="validationRules.lastTransaction"
                />
                <DxColumn
                    :allow-editing="false"
                    data-field="updated_at"
                    data-type="date"
                    :editor-options="{
                        dateSerializationFormat: $mc.DX_SERVER_DATE_FORMAT,
                    }"
                    :caption="$t('admin.finbooks.updatedAt')"
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
                                    icon: 'far fa-envelope-open-dollar small',
                                    hint: $t(
                                        'admin.finbooks.createTransaction'
                                    ),
                                    text: $t(
                                        'admin.finbooks.createTransaction'
                                    ),
                                    onClick: () =>
                                        $refs.transactionFinbookPopup.show(
                                            data.data
                                        ),
                                },
                            },
                            {
                                visible: data.data.balance == 0,
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
        <TransactionFinbookPopup ref="transactionFinbookPopup" />
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import TransactionFinbookPopup from "../../components/Popups/TransactionFinbookPopup.vue";
import adminFinbooksStore from "../../store/modules/Trading/Finbooks";

export default {
    components: {
        DxDataGrid,
        DxColumn,
        TransactionFinbookPopup,
    },
    data() {
        return {
            gridData: null,
            validationRules: {},
            validationRules: {
                name: [
                    {
                        type: "required",
                        message:
                            this.$t("admin.finbooks.name") +
                            this.$mt.validations.required,
                    },
                ],
                balance: [
                    {
                        type: "required",
                        message:
                            this.$t("admin.finbooks.balance") +
                            this.$mt.validations.required,
                    },
                ],
                lastTransaction: [
                    {
                        type: "required",
                        message:
                            this.$t("admin.finbooks.lastTransaction") +
                            this.$mt.validations.required,
                    },
                ],
                display: [
                    {
                        type: "required",
                        message:
                            this.$t("admin.finbooks.display") +
                            this.$mt.validations.required,
                    },
                ],
            },
        };
    },
    beforeCreate() {
        this.$store.registerModule("Admin.finbooks", adminFinbooksStore);
    },
    created() {
        this.fetch();
    },
    destroyed() {
        this.$store.unregisterModule("Admin.finbooks");
    },
    computed: {
        ...mapGetters("Admin.finbooks", ["finbooks"]),
        dataGrid: function () {
            return this.$refs.dataGrid.instance;
        },
    },
    watch: {
        finbooks() {
            this.cloneDeepData();
        },
    },
    methods: {
        ...mapActions("Admin.finbooks", ["fetch", "save", "resetState"]),
        onSave(e) {
            this.$bus.emit("checkPin", () => this.save({ changes: e.changes }));
        },
        cloneDeepData() {
            this.gridData = this.$mf.cloneDeep(this.finbooks);
        },
        onInitNewRow(e) {
            e.data.last_transaction = this.$t("admin.finbooks.openNewBook");
        },
    },
};
</script>
<style lang="scss"></style>
