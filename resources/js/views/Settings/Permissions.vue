<template>
    <div class="settings-page">
        <h2 class="content-block">
            {{ $t("settings.permissions.title") }}
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
                    :caption="$t('settings.permissions.name')"
                    :validation-rules="validationRules.name"
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
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import adminSettingsPermissionsStore from "../../store/modules/Setting/Permission";

export default {
    components: {
        DxDataGrid,
        DxColumn,
    },
    data() {
        return {
            gridData: null,
            validationRules: {
                name: [
                    {
                        type: "required",
                        message:
                            this.$t("settings.permissions.name") +
                            this.$mt.validations.required,
                    },
                    {
                        type: "async",
                        validationCallback: this.validateDuplicateName,
                        message:
                            this.$t("settings.permissions.name") +
                            this.$mt.validations.duplicate,
                    },
                ],
            },
        };
    },
    beforeCreate() {
        this.$store.registerModule(
            "Settings.permissions",
            adminSettingsPermissionsStore
        );
    },
    created() {
        this.fetch();
    },
    destroyed() {
        this.$store.unregisterModule("Settings.permissions");
    },
    watch: {
        permissions() {
            this.cloneDeepData();
        },
    },
    computed: {
        ...mapGetters("Settings.permissions", ["permissions"]),
        dataGrid: function () {
            return this.$refs.dataGrid.instance;
        },
    },
    methods: {
        ...mapActions("Settings.permissions", [
            "fetch",
            "save",
            "validateDuplicateName",
            "resetState",
        ]),
        onSave(formData) {
            this.$bus.emit("checkPin", () => this.save(formData));
        },
        cloneDeepData() {
            this.gridData = this.$mf.cloneDeep(this.permissions);
        },
    },
};
</script>
<style lang="scss" scoped></style>
