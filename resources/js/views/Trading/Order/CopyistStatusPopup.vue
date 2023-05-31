<template>
    <CorePopup
        ref="popupRef"
        :title="$t('trading.orderChart.copyistStatusPopup.title')"
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
                @contentReady="
                    $mf.dataGridPreload(state.gridData, dataGridRef.instance)
                "
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
                    data-field="vps_code"
                    data-type="string"
                    :caption="
                        $t('trading.orderChart.copyistStatusPopup.vpsCode')
                    "
                />
                <DxColumn
                    data-field="connection"
                    data-type="boolean"
                    :caption="
                        $t('trading.orderChart.copyistStatusPopup.connection')
                    "
                />
                <DxColumn
                    data-field="position"
                    data-type="number"
                    :caption="
                        $t('trading.orderChart.copyistStatusPopup.position')
                    "
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
    editPermission: "trades@edit",
    validationRules: {
        amount: [
            {
                type: "required",
                message: t("trading.trades.amount") + mt.validations.required,
            },
        ],
        scores: [
            {
                type: "required",
                message: t("trading.trades.scores") + mt.validations.required,
            },
        ],
        revenue: [
            {
                type: "required",
                message: t("trading.trades.revenue") + mt.validations.required,
            },
        ],
        loss: [
            {
                type: "required",
                message: t("trading.trades.loss") + mt.validations.required,
            },
        ],
        fees: [
            {
                type: "required",
                message: t("trading.trades.fees") + mt.validations.required,
            },
        ],
        date: [
            {
                type: "required",
                message: t("trading.trades.date") + mt.validations.required,
            },
            {
                type: "async",
                validationCallback: (e) =>
                    store.dispatch("tradingStatistic/validateDuplicateDate", e),
                message: t("trading.trades.validations.date"),
            },
        ],
    },
});
const permissions = computed(() => store.state.auth.user.permissions);

watch(
    () => store.state.tradingOrder.copyists,
    (value) => {
        state.gridData = mf.cloneDeep(value);
    }
);

function show() {
    popupRef.value.show();
}
function onSave(formData) {
    if (!formData.changes.length) return;
    bus.emit("checkPin", () =>
        store.dispatch("tradingStatistic/save", formData)
    );
}
function onShown() {
    store.dispatch("tradingOrder/getCopyistStatus");
}
function onHidden() {
    state.gridData = null;
}

defineExpose({ show });
</script>
