<template>
    <div class="copyists-page content-block dx-card responsive-paddings">
        <DxDataGrid
            ref="dataGridRef"
            :data-source="state.gridData"
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
            @contentReady="
                $mf.dataGridPreload(state.gridData, dataGridRef.instance)
            "
            @init-new-row="onInitNewRow"
            @toolbar-preparing="onToolbarPreparing"
            @saved="onSave"
        >
            <DxColumn
                :fixed="true"
                :width="$screen.getScreenSizeInfo.isXSmall ? 35 : 125"
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
                data-field="user_code"
                dataType="number"
                name="userCode"
                :header-filter="{ allowSearch: true }"
                :caption="$t('admin.copyists.user')"
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
                data-field="vps_code"
                dataType="string"
                :header-filter="{ allowSearch: true }"
                :caption="$t('admin.copyists.vpsCode')"
                :validation-rules="state.validationRules.vpsCode"
            />
            <!--<DxColumn
                data-field="device_limit"
                dataType="number"
                :header-filter="{ allowSearch: true }"
                :caption="$t('admin.copyists.deviceLimit')"
                :validation-rules="state.validationRules.deviceLimit"
            />
            <DxColumn
                data-field="started_at"
                data-type="date"
                :editor-options="{
                    dateSerializationFormat: $mc.DX_SERVER_DATE_FORMAT,
                }"
                :caption="$t('admin.copyists.startedAt')"
            />
            <DxColumn
                :visible="false"
                data-field="devices"
                dataType="string"
                :header-filter="{ allowSearch: true }"
                :caption="$t('admin.copyists.devices')"
            /> -->
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
                                hint: $t('admin.copyists.clearDevices'),
                                text: $t('admin.copyists.clearDevices'),
                                onClick: () =>
                                    dataGridRef.instance.cellValue(
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
                                    dataGridRef.instance.deleteRow(
                                        data.rowIndex
                                    ),
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
import { reactive, ref, watch, inject, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";

const store = useStore();
const { t } = useI18n();
const mt = inject("mt");
const mf = inject("mf");
const dataGridRef = ref(null);
const state = reactive({
    gridData: null,
    validationRules: {
        user: [
            {
                type: "required",
                message: t("admin.copyists.user") + mt.validations.required,
            },
            {
                type: "async",
                validationCallback: (e) =>
                    store.dispatch("adminCopyist/validateDuplicateUser", e),
                message: t("admin.copyists.user") + mt.validations.duplicate,
            },
        ],
        vpsCode: [
            {
                type: "required",
                message: t("admin.copyists.vpsCode") + mt.validations.required,
            },
        ],
        lastTransaction: [
            {
                type: "deviceLimit",
                message:
                    t("admin.copyists.deviceLimit") + mt.validations.required,
            },
        ],
        startedAt: [
            {
                type: "required",
                message:
                    t("admin.copyists.startedAt") + mt.validations.required,
            },
        ],
    },
});
const users = computed(() => store.state.adminCopyist.users);
store.dispatch("adminCopyist/getCopyists");

watch(
    () => store.state.adminCopyist.copyists,
    (value) => {
        console.log("value", value);
        state.gridData = mf.cloneDeep(value);
    }
);

function onSave(e) {
    bus.emit("checkPin", () =>
        store.dispatch("adminCopyist/save", { changes: e.changes })
    );
}
function onInitNewRow(e) {
    e.data.last_transaction = t("admin.copyists.openNewBook");
}
function onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
        location: "before",
        widget: "dxButton",
        options: {
            icon: "far fa-tags small",
            hint: t("admin.copyists.pricePlans"),
            onClick: () => {},
        },
    });
}
</script>
<style lang="scss"></style>
