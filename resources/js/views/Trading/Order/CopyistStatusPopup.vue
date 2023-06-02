<template>
    <CorePopup
        ref="popupRef"
        :title="$t('trading.orderChart.copyistStatusPopup.title')"
        :toolbarItems="[
            {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: $t('buttons.reload'),
                    icon: 'far fa-sync-alt small',
                    onClick: onShown,
                },
            },
        ]"
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
                                visible: data.data.position != 0,
                                locateInMenu: 'auto',
                                showText: 'inMenu',
                                location: 'center',
                                widget: 'dxButton',
                                options: {
                                    type: 'default',
                                    icon: 'far fa-times small',
                                    hint: $t(
                                        'trading.orderChart.copyistStatusPopup.closePosition'
                                    ),
                                    text: $t(
                                        'trading.orderChart.copyistStatusPopup.closePosition'
                                    ),
                                    onClick: () => closePosition(data.data),
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
import { confirm } from "devextreme/ui/dialog";
import { inject, ref, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const mf = inject("mf");
const popupRef = ref(null);
const dataGridRef = ref(null);
const state = reactive({
    gridData: null,
});

watch(
    () => store.state.tradingOrder.copyists,
    (value) => {
        state.gridData = mf.cloneDeep(value);
    }
);

function show() {
    popupRef.value.show();
}
function closePosition(data) {
    let result = confirm(
        `${t("trading.orderChart.copyistStatusPopup.closePosition")} ${
            data.vps_code
        }?`,
        t("titles.confirm")
    );
    result.then((dialogResult) => {
        if (dialogResult) {
            store.dispatch("tradingOrder/closePosition", data.id);
        }
    });
}
function onShown() {
    store.dispatch("tradingOrder/getCopyistStatus");
}
function onHidden() {
    state.gridData = null;
}

defineExpose({ show });
</script>
