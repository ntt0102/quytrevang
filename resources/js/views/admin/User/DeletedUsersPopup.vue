<template>
    <CorePopup
        ref="popupRef"
        :title="$t('admin.users.deletedUsers')"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxDataGrid
            ref="dataGridRef"
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
            :editing="{
                allowUpdating: true,
                allowDeleting: true,
                confirmDelete: false,
                mode: 'batch',
            }"
            @contentReady="
                $mf.dataGridPreload(state.gridData, dataGridRef.instance)
            "
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
                            $screen.getScreenSizeInfo.isXSmall ? 'Short' : ''
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
                                        dataGridRef.instance.cellValue(
                                            data.rowIndex,
                                            'deleted_at',
                                            null
                                        );
                                    dataGridRef.instance.repaintRows(
                                        data.rowIndex
                                    );
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
                                        dataGridRef.instance.undeleteRow(
                                            data.rowIndex
                                        );
                                    else
                                        dataGridRef.instance.deleteRow(
                                            data.rowIndex
                                        );
                                },
                            },
                        },
                    ]"
                />
            </template>
        </DxDataGrid>
    </CorePopup>
</template>
<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import CorePopup from "../../../components/Popups/CorePopup.vue";
import { useStore } from "vuex";
import { reactive, ref, inject, watch } from "vue";

const store = useStore();
const bus = inject("bus");
const mf = inject("mf");
const dataGridRef = ref(null);
const popupRef = ref(null);
const state = reactive({ gridData: null });

watch(
    () => store.state.adminUser.deletedUsers,
    (value) => {
        state.gridData = mf.cloneDeep(value);
    }
);

function show() {
    popupRef.value.show();
}
function onSavedDeletedUser(e) {
    bus.emit("checkPin", () => {
        e.isDeleted = true;
        store.dispatch("adminUser/save", e);
    });
}
function isRowRestored(key) {
    const change = dataGridRef.value.instance
        .option("editing.changes")
        .find((c) => c.type == "update" && c.key == key);
    return mf.isSet(change);
}
function unrestore(key) {
    let changes = dataGridRef.value.instance.option("editing.changes");
    changes = changes.filter((c) => !(c.type == "update" && c.key == key));
    dataGridRef.value.instance.option("editing.changes", changes);
}
function isRowDeleted(key) {
    const change = dataGridRef.value.instance
        .option("editing.changes")
        .find((c) => c.type == "remove" && c.key == key);
    return mf.isSet(change);
}
function onShown() {}
function onHidden() {}

defineExpose({ show });
</script>
<style lang="scss"></style>
