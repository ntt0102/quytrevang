<template>
    <DxPopup
        ref="popup"
        :showCloseButton="true"
        :fullScreen="$screen.getScreenSizeInfo.isXSmall ? true : false"
        :show-title="true"
        :title="$t('admin.users.deletedUsers')"
        @hiding="$mf.popRouteHistoryState"
    >
        <template #content>
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
                :editing="{
                    allowUpdating: true,
                    allowDeleting: true,
                    confirmDelete: false,
                    mode: 'batch',
                }"
                @contentReady="$mf.dataGridPreload(gridData, dataGrid)"
                @saved="onSavedDeletedUser"
            >
                <DxColumn
                    :fixed="true"
                    :width="$screen.getScreenSizeInfo.isXSmall ? 35 : 75"
                    type="buttons"
                    cssClass="dx-datagrid-command-column"
                    cell-template="commandCellTemplate"
                    :caption="
                        $t(
                            `titles.commandHeaderTitle${
                                $screen.getScreenSizeInfo.isXSmall
                                    ? 'Short'
                                    : ''
                            }`
                        )
                    "
                />
                <DxColumn
                    :allow-editing="false"
                    data-field="code"
                    data-type="string"
                    :caption="$t('models.user.codeShort')"
                />
                <DxColumn
                    :allow-editing="false"
                    data-field="name"
                    :caption="$t('models.user.name')"
                />
                <DxColumn
                    :allow-editing="false"
                    data-field="phone"
                    :caption="$t('models.user.phone')"
                />
                <DxColumn
                    :allow-editing="false"
                    :visible="false"
                    data-field="deleted_at"
                />
                <template #commandCellTemplate="{ data }">
                    <DxToolbar
                        :items="[
                            {
                                locateInMenu: 'auto',
                                showText: 'inMenu',
                                location: 'before',
                                widget: 'dxButton',
                                options: {
                                    disabled: isRowDeleted(data.key),
                                    type: 'default',
                                    icon: isRowRestored(data.key)
                                        ? 'undo'
                                        : 'repeat',
                                    hint: $t('admin.users.buttons.revert'),
                                    text: $t('admin.users.buttons.revert'),
                                    onClick: () => {
                                        if (isRowRestored(data.key))
                                            unrestore(data.key);
                                        else
                                            dataGrid.cellValue(
                                                data.rowIndex,
                                                'deleted_at',
                                                null
                                            );
                                        dataGrid.repaintRows(data.rowIndex);
                                    },
                                },
                            },
                            {
                                locateInMenu: 'auto',
                                showText: 'inMenu',
                                location: 'before',
                                widget: 'dxButton',
                                options: {
                                    type: 'default',
                                    icon: isRowDeleted(data.key)
                                        ? 'undo'
                                        : 'clearsquare',
                                    hint: $t('admin.users.buttons.remove'),
                                    text: $t('admin.users.buttons.remove'),
                                    onClick: () => {
                                        if (isRowDeleted(data.key))
                                            dataGrid.undeleteRow(data.rowIndex);
                                        else dataGrid.deleteRow(data.rowIndex);
                                    },
                                },
                            },
                        ]"
                    />
                </template>
            </DxDataGrid>
        </template>
    </DxPopup>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";

export default {
    components: {
        DxDataGrid,
        DxColumn,
    },
    data() {
        return { gridData: null };
    },
    computed: {
        ...mapGetters("Admin.users", ["deletedUsers"]),
        dataGrid: function () {
            return this.$refs.dataGrid.instance;
        },
        popup() {
            return this.$refs.popup.instance;
        },
    },
    watch: {
        deletedUsers() {
            this.cloneDeepData();
        },
    },
    methods: {
        ...mapActions("Admin.users", ["save"]),
        show() {
            this.popup.show();
            this.cloneDeepData();
            this.$mf.pushPopupToHistoryState(() => this.popup.hide());
        },
        onSavedDeletedUser(e) {
            this.$bus.emit("checkPin", () => {
                e.isDeleted = true;
                this.save(e);
            });
        },
        cloneDeepData() {
            this.gridData = this.$mf.cloneDeep(this.deletedUsers);
        },
        isRowRestored(key) {
            const change = this.dataGrid
                .option("editing.changes")
                .find((c) => c.type == "update" && c.key == key);
            return this.$mf.isSet(change);
        },
        unrestore(key) {
            let changes = this.dataGrid.option("editing.changes");
            changes = changes.filter(
                (c) => !(c.type == "update" && c.key == key)
            );
            this.dataGrid.option("editing.changes", changes);
        },
        isRowDeleted(key) {
            const change = this.dataGrid
                .option("editing.changes")
                .find((c) => c.type == "remove" && c.key == key);
            return this.$mf.isSet(change);
        },
    },
};
</script>
<style lang="scss"></style>
