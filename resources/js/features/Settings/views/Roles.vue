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
                :caption="$t('settings.roles.name')"
                :validation-rules="state.validationRules.name"
            />
            <DxColumn
                :allow-sorting="false"
                data-field="permissions"
                :cell-template="cellTemplate"
                :calculate-filter-expression="state.calculateFilterExpression"
                :header-filter="{ allowSearch: true }"
                edit-cell-template="tagBoxEditor"
                :caption="$t('settings.roles.permission')"
                :validation-rules="state.validationRules.permissions"
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
import ListTagBox from "../../../components/ListTagBox.vue";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import { computed, inject, onUnmounted, reactive, ref, watch } from "vue";
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
    calculateFilterExpression: function (
        filterValue,
        selectedFilterOperation,
        target
    ) {
        if (target === "search" && typeof filterValue === "string") {
            return ["permissions", "contains", filterValue];
        }
        return function (data) {
            return (data.permissions || []).indexOf(filterValue) !== -1;
        };
    },
    validationRules: {
        name: [
            {
                type: "required",
                message: t("settings.roles.name") + mt.validations.required,
            },
            {
                type: "async",
                validationCallback: (e) =>
                    store.dispatch("settingRole/validateDuplicateName", e),
                message: t("settings.roles.name") + mt.validations.duplicate,
            },
        ],
        permissions: [
            {
                type: "required",
                message:
                    t("settings.roles.permission") + mt.validations.required,
            },
        ],
    },
});
const permissions = computed(() => store.state.settingRole.permissions);
store.dispatch("settingRole/getRoles");
watch(
    () => store.state.settingRole.roles,
    (value) => {
        state.gridData = mf.cloneDeep(value);
    }
);
onUnmounted(() => store.dispatch("settingRole/resetState"));
function onSave(formData) {
    if (!formData.changes.length) return;
    bus.emit("checkPin", () => store.dispatch("settingRole/save", formData));
}
function cellTemplate(container, options) {
    var noBreakSpace = "\u00A0",
        text = (options.value || [])
            .map((element) => {
                return options.column.lookup.calculateCellValue(element);
            })
            .join(", ");
    container.textContent = text || noBreakSpace;
    container.title = text;
}
function onValueChanged(value, cellInfo) {
    cellInfo.setValue(value);
    cellInfo.component.updateDimensions();
}
</script>
