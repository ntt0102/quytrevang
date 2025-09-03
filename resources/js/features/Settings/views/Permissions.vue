<template>
    <div class="content-block dx-card responsive-paddings">
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
            :selection="{ mode: 'single' }"
            :editing="{
                allowAdding: true,
                allowUpdating: true,
                allowDeleting: true,
                mode: 'batch',
                startEditAction: 'dblClick',
            }"
            @contentReady="
                $mf.dataGridPreload(state.gridData, dataGridRef.instance)
            "
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
                :validation-rules="state.validationRules.name"
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
    </div>
</template>
<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import { inject, onUnmounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const bus = inject("bus");
const mt = inject("mt");
const mf = inject("mf");
const dataGridRef = ref(null);
const state = reactive({
    gridData: null,
    validationRules: {
        name: [
            {
                type: "required",
                message:
                    t("settings.permissions.name") + mt.validations.required,
            },
            {
                type: "async",
                validationCallback: (e) =>
                    store.dispatch(
                        "settingPermission/validateDuplicateName",
                        e
                    ),
                message:
                    t("settings.permissions.name") + mt.validations.duplicate,
            },
        ],
    },
});
store.dispatch("settingPermission/getPermissions");
watch(
    () => store.state.settingPermission.permissions,
    (value) => {
        state.gridData = mf.cloneDeep(value);
    }
);
onUnmounted(() => store.dispatch("settingPermission/resetState"));
function onSave(formData) {
    if (!formData.changes.length) return;
    bus.emit("checkPin", () =>
        store.dispatch("settingPermission/save", formData)
    );
}
</script>
