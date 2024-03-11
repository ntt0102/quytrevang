<template>
    <CorePopup
        ref="popupRef"
        :title="$t('trading.statistic.buttons.addData')"
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
                    allowAdding: permissions.includes(state.editPermission),
                    allowUpdating: permissions.includes(state.editPermission),
                    allowDeleting: permissions.includes(state.editPermission),
                    mode: 'batch',
                    startEditAction: 'dblClick',
                }"
                @contentReady="
                    $mf.dataGridPreload(state.gridData, dataGridRef.instance)
                "
                @init-new-row="onInitNewRow"
                @saved="onSave"
            >
                <DxColumn
                    :fixed="true"
                    :visible="permissions.includes(state.editPermission)"
                    :width="35"
                    type="buttons"
                    cssClass="dx-datagrid-command-column"
                    cell-template="commandCellTemplate"
                    :caption="$t(`titles.commandHeaderTitleShort`)"
                />
                <DxColumn
                    data-field="symbol"
                    data-type="string"
                    :width="80"
                    :caption="$t('trading.statistic.symbol')"
                    :validation-rules="state.validationRules.symbol"
                />
                <DxColumn
                    alignment="center"
                    :caption="$t('trading.statistic.buy')"
                >
                    <DxColumn
                        data-field="buy_date"
                        data-type="date"
                        :width="110"
                        :editor-options="{
                            dateSerializationFormat: $mc.DX_SERVER_DATE_FORMAT,
                            showClearButton: 'true',
                            useMaskBehavior: 'true',
                            applyValueMode: 'useButtons',
                        }"
                        :caption="$t('trading.statistic.date')"
                        :validation-rules="state.validationRules.buyDate"
                    />
                    <DxColumn
                        data-field="buy_volume"
                        data-type="string"
                        :caption="$t('trading.statistic.volume')"
                        :validation-rules="state.validationRules.buyVolume"
                    />
                    <DxColumn
                        data-field="buy_price"
                        data-type="string"
                        :caption="$t('trading.statistic.price')"
                        :validation-rules="state.validationRules.buyPrice"
                    />
                    <DxColumn
                        data-field="buy_fee"
                        data-type="string"
                        :caption="$t('trading.statistic.fee')"
                        :validation-rules="state.validationRules.buyFee"
                    />
                </DxColumn>
                <DxColumn
                    alignment="center"
                    :caption="$t('trading.statistic.sell')"
                >
                    <DxColumn
                        data-field="sell_date"
                        data-type="date"
                        :width="110"
                        :editor-options="{
                            dateSerializationFormat: $mc.DX_SERVER_DATE_FORMAT,
                            showClearButton: 'true',
                            useMaskBehavior: 'true',
                            applyValueMode: 'useButtons',
                        }"
                        :caption="$t('trading.statistic.date')"
                        :validation-rules="state.validationRules.sellDate"
                    />
                    <DxColumn
                        data-field="sell_volume"
                        data-type="string"
                        :caption="$t('trading.statistic.volume')"
                        :validation-rules="state.validationRules.sellVolume"
                    />
                    <DxColumn
                        data-field="sell_price"
                        data-type="string"
                        :caption="$t('trading.statistic.price')"
                        :validation-rules="state.validationRules.sellPrice"
                    />
                    <DxColumn
                        data-field="sell_fee"
                        data-type="string"
                        :caption="$t('trading.statistic.fee')"
                        :validation-rules="state.validationRules.sellFee"
                    />
                </DxColumn>
                <DxColumn
                    alignment="center"
                    :caption="$t('trading.statistic.profit')"
                >
                    <DxColumn
                        data-type="string"
                        :calculate-cell-value="calculateMoneyProfit"
                        :caption="$t('trading.statistic.moneyProfit')"
                    />
                    <DxColumn
                        data-type="string"
                        :calculate-cell-value="calculatePercentProfit"
                        :caption="$t('trading.statistic.percentProfit')"
                    />
                </DxColumn>

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
const mc = inject("mc");
const mf = inject("mf");
const filters = inject("filters");
const popupRef = ref(null);
const dataGridRef = ref(null);
const state = reactive({
    gridData: null,
    editPermission: "trades@edit",
    validationRules: {
        symbol: [
            {
                type: "required",
                message:
                    t("trading.statistic.symbol") + mt.validations.required,
            },
        ],
        buyDate: [
            {
                type: "required",
                message: t("trading.statistic.date") + mt.validations.required,
            },
        ],
        buyVolume: [
            {
                type: "required",
                message:
                    t("trading.statistic.volume") + mt.validations.required,
            },
            {
                type: "custom",
                validationCallback: validateArray,
                message: t("trading.statistic.validations.array"),
            },
        ],
        buyPrice: [
            {
                type: "required",
                message: t("trading.statistic.price") + mt.validations.required,
            },
            {
                type: "custom",
                validationCallback: validateArray,
                message: t("trading.statistic.validations.array"),
            },
        ],
        buyFee: [
            {
                type: "required",
                message: t("trading.statistic.fee") + mt.validations.required,
            },
            {
                type: "custom",
                validationCallback: validateArray,
                message: t("trading.statistic.validations.array"),
            },
        ],
        sellDate: [
            {
                type: "custom",
                validationCallback: validateSellDate,
                message: t("trading.statistic.validations.sellDate"),
            },
        ],
        sellVolume: [
            {
                type: "custom",
                validationCallback: validateArray,
                message: t("trading.statistic.validations.array"),
            },
        ],
        sellPrice: [
            {
                type: "custom",
                validationCallback: validateArray,
                message: t("trading.statistic.validations.array"),
            },
        ],
        sellFee: [
            {
                type: "custom",
                validationCallback: validateArray,
                message: t("trading.statistic.validations.array"),
            },
        ],
    },
});
const permissions = computed(() => store.state.auth.user.permissions);

watch(
    () => store.state.tradingStatistic.data,
    (data) => {
        state.gridData = mf.cloneDeep(data);
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
function onInitNewRow(e) {
    e.data.buy_date = moment().format(mc.SERVER_DATE_FORMAT);
    e.data.buy_volume = "[]";
    e.data.buy_price = "[]";
    e.data.buy_fee = "[]";
    e.data.sell_volume = "[]";
    e.data.sell_price = "[]";
    e.data.sell_fee = "[]";
}
function validateSellDate(e) {
    if (!e.value) return true;
    return moment(e.value).isAfter(moment(e.data.buy_date));
}
function validateArray(e) {
    const regex = /^\[.*\]$/;
    return regex.test(e.value);
}
function calculateMoneyProfit(rowData) {
    try {
        const profit = calcutateProfit(rowData);
        return profit.percent == -100 ? "-" : filters.shorten(profit.money);
    } catch (error) {
        return "-";
    }
}
function calculatePercentProfit(rowData) {
    try {
        const profit = calcutateProfit(rowData);
        return profit.percent == -100
            ? "-"
            : filters.numberVnFormat(profit.percent, 1);
    } catch (error) {
        return "-";
    }
}
function calcutateProfit(rowData) {
    const buyVolume = JSON.parse(rowData.buy_volume);
    const buyPrice = JSON.parse(rowData.buy_price);
    const buyFee = JSON.parse(rowData.buy_fee);
    const sellVolume = JSON.parse(rowData.sell_volume);
    const sellPrice = JSON.parse(rowData.sell_price);
    const sellFee = JSON.parse(rowData.sell_fee);
    let buyCash = 0,
        sellCash = 0,
        totalCost = 0;
    for (let i = 0; i < buyVolume.length; i++) {
        buyCash = -buyVolume[i] * buyPrice[i] - buyFee[i];
    }
    totalCost = buyCash;
    for (let i = 0; i < sellVolume.length; i++) {
        sellCash = sellVolume[i] * sellPrice[i] - sellFee[i];
        totalCost += -sellFee[i];
    }
    const profit = buyCash + sellCash;
    return { money: profit, percent: (profit / -totalCost) * 100 };
}
function onShown() {
    store.dispatch("tradingStatistic/getData");
}
function onHidden() {
    state.gridData = null;
}

defineExpose({ show });
</script>
