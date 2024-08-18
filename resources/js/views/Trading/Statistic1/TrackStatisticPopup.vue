<template>
    <CorePopup
        ref="popupRef"
        :title="$t('trading.derstats.buttons.addData')"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxScrollView>
            <DxDataGrid
                ref="dataGridRef"
                :data-source="state.gridData"
                key-expr="id"
                :show-borders="true"
                :column-auto-width="true"
                :allow-column-reordering="true"
                :allow-column-resizing="true"
                column-resizing-mode="widget"
                :paging="{ pageSize: 8 }"
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
                    :visible="false"
                    :width="35"
                    type="buttons"
                    cssClass="dx-datagrid-command-column"
                    cell-template="commandCellTemplate"
                    :caption="$t(`titles.commandHeaderTitleShort`)"
                />
                <DxColumn
                    data-field="date"
                    data-type="date"
                    :editor-options="{
                        dateSerializationFormat: $mc.DX_SERVER_DATE_FORMAT,
                        showClearButton: 'true',
                        useMaskBehavior: 'true',
                        applyValueMode: 'useButtons',
                    }"
                    :caption="$t('trading.derstats.date')"
                    :validation-rules="state.validationRules.date"
                />
                <DxColumn
                    data-field="amount"
                    data-type="number"
                    :width="100"
                    :caption="$t('trading.derstats.amount')"
                    :validation-rules="state.validationRules.amount"
                />
                <DxColumn
                    data-field="scores"
                    data-type="number"
                    format="#0.#"
                    :editor-options="{
                        step: '0.1',
                        format: '#0.#',
                    }"
                    :caption="$t('trading.derstats.scores')"
                    :validation-rules="state.validationRules.scores"
                />
                <DxColumn
                    data-field="revenue"
                    data-type="number"
                    format="#,##0"
                    :editor-options="{
                        step: '1',
                        format: '#,##0',
                    }"
                    :caption="$t('trading.derstats.revenue')"
                    :validation-rules="state.validationRules.revenue"
                />
                <DxColumn
                    data-field="loss"
                    data-type="number"
                    format="#,##0"
                    :editor-options="{
                        step: '1',
                        format: '#,##0',
                    }"
                    :caption="$t('trading.derstats.loss')"
                    :validation-rules="state.validationRules.loss"
                />
                <DxColumn
                    data-field="fees"
                    data-type="number"
                    format="#,##0"
                    :editor-options="{
                        step: '1',
                        format: '#,##0',
                    }"
                    :caption="$t('trading.derstats.fees')"
                    :validation-rules="state.validationRules.fees"
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
        </DxScrollView>
    </CorePopup>
</template>
<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import CorePopup from "../../../components/Popups/CorePopup.vue";
import { computed, inject, ref, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const bus = inject("bus");
const mt = inject("mt");
const mf = inject("mf");
const popupRef = ref(null);
const dataGridRef = ref(null);
const state = reactive({
    gridData: null,
    validationRules: {
        amount: [
            {
                type: "required",
                message: t("trading.derstats.amount") + mt.validations.required,
            },
        ],
        scores: [
            {
                type: "required",
                message: t("trading.derstats.scores") + mt.validations.required,
            },
        ],
        revenue: [
            {
                type: "required",
                message:
                    t("trading.derstats.revenue") + mt.validations.required,
            },
        ],
        loss: [
            {
                type: "required",
                message: t("trading.derstats.loss") + mt.validations.required,
            },
        ],
        fees: [
            {
                type: "required",
                message: t("trading.derstats.fees") + mt.validations.required,
            },
        ],
        date: [
            {
                type: "required",
                message: t("trading.derstats.date") + mt.validations.required,
            },
            {
                type: "async",
                validationCallback: (e) =>
                    store.dispatch("tradingDerstat/validateDuplicateDate", e),
                message: t("trading.derstats.validations.date"),
            },
        ],
    },
});
const permissions = computed(() => store.state.auth.user.permissions);

watch(
    () => store.state.tradingDerstat.data,
    (data) => {
        state.gridData = mf.cloneDeep(data);
    }
);

function show() {
    popupRef.value.show();
}
function onSave(formData) {
    if (!formData.changes.length) return;
    bus.emit("checkPin", () => store.dispatch("tradingDerstat/save", formData));
}
function onShown() {
    store.dispatch("tradingDerstat/getData");
}
function onHidden() {
    state.gridData = null;
}

defineExpose({ show });
</script>
