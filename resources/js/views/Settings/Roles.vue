<template>
    <div class="settings-page">
        <h2 class="content-block">
            {{ $t("admin.settings.roles.title") }}
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
                    mode: 'batch',
                    startEditAction: 'dblClick',
                }"
                @contentReady="$mf.dataGridPreload(gridData, dataGrid)"
                @saved="onSave"
            >
                <DxColumn
                    :fixed="true"
                    :width="35"
                    type="buttons"
                    cssClass="dx-datagrid-command-column"
                    cell-template="commandCellTemplate"
                    :caption="$t(`titles.commandHeaderTitleShort`)"
                />
                <DxColumn
                    data-field="name"
                    :header-filter="{ allowSearch: true }"
                    :caption="$t('admin.settings.roles.name')"
                    :validation-rules="validationRules.name"
                />
                <DxColumn
                    :allow-sorting="false"
                    data-field="permissions"
                    :cell-template="cellTemplate"
                    :calculate-filter-expression="calculateFilterExpression"
                    :header-filter="{ allowSearch: true }"
                    edit-cell-template="tagBoxEditor"
                    :caption="$t('admin.settings.roles.permission')"
                    :validation-rules="validationRules.permissions"
                    :lookup="{
                        dataSource: permissions,
                    }"
                />
                <template #tagBoxEditor="{ data: cellInfo }">
                    <ListTagBox
                        :width="300"
                        :height="400"
                        :value="cellInfo.value"
                        :on-value-changed="
                            (value) => onValueChanged(value, cellInfo)
                        "
                        :data-source="permissions"
                        :data-grid-component="cellInfo.component"
                    />
                </template>
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
                                    icon: 'trash',
                                    hint: $t('buttons.delete'),
                                    text: $t('buttons.delete'),
                                    onClick: () => {
                                        dataGrid.deleteRow(data.rowIndex);
                                    },
                                },
                            },
                        ]"
                    />
                </template>
            </DxDataGrid>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ListTagBox from "../../components/ListTagBox.vue";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import adminSettingsRolesStore from "../../store/modules/Admin/Settings/Roles";

export default {
    components: {
        ListTagBox,
        DxDataGrid,
        DxColumn,
    },
    data() {
        return {
            gridData: null,
            calculateFilterExpression: function (
                filterValue,
                selectedFilterOperation,
                target
            ) {
                if (target === "search" && typeof filterValue === "string") {
                    return [this.dataField, "contains", filterValue];
                }
                return function (data) {
                    return (data.permissions || []).indexOf(filterValue) !== -1;
                };
            },
            validationRules: {
                name: [
                    {
                        type: "required",
                        message:
                            this.$t("admin.settings.roles.name") +
                            this.$mt.validations.required,
                    },
                    {
                        type: "async",
                        validationCallback: this.validateDuplicateName,
                        message:
                            this.$t("admin.settings.roles.name") +
                            this.$mt.validations.duplicate,
                    },
                ],
                permissions: [
                    {
                        type: "required",
                        message:
                            this.$t("admin.settings.roles.permission") +
                            this.$mt.validations.required,
                    },
                ],
            },
        };
    },
    beforeCreate() {
        this.$store.registerModule(
            "Admin.settings.roles",
            adminSettingsRolesStore
        );
    },
    created() {
        this.fetch();
    },
    destroyed() {
        this.$store.unregisterModule("Admin.settings.roles");
    },
    watch: {
        roles() {
            this.cloneDeepData();
        },
    },
    computed: {
        ...mapGetters("Admin.settings.roles", ["roles", "permissions"]),
        dataGrid: function () {
            return this.$refs.dataGrid.instance;
        },
    },
    methods: {
        ...mapActions("Admin.settings.roles", [
            "fetch",
            "save",
            "validateDuplicateName",
            "resetState",
        ]),
        onSave(formData) {
            this.$bus.emit("checkPin", () => this.save(formData));
        },
        cloneDeepData() {
            this.gridData = this.$mf.cloneDeep(this.roles);
        },
        cellTemplate(container, options) {
            var noBreakSpace = "\u00A0",
                text = (options.value || [])
                    .map((element) => {
                        return options.column.lookup.calculateCellValue(
                            element
                        );
                    })
                    .join(", ");
            container.textContent = text || noBreakSpace;
            container.title = text;
        },
        onValueChanged(value, cellInfo) {
            cellInfo.setValue(value);
            cellInfo.component.updateDimensions();
        },
    },
};
</script>
<style lang="scss" scoped></style>
