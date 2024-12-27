<template>
    <div class="share-page content-block dx-card responsive-paddings">
        <DxToolbar
            :items="[
                {
                    visible: $mf.isSet($route.query),
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-arrow-left small',
                        hint: $t('buttons.back'),
                        onClick: () => $router.go(-1),
                    },
                },
                {
                    location: 'before',
                    widget: 'dxAutocomplete',
                    options: {
                        width: '100',
                        showClearButton: true,
                        openOnFieldClick: true,
                        minSearchLength: 0,
                        dataSource: groups,
                        value: state.group,
                        elementAttr: { class: 'symbol-group' },
                        placeholder: $t('trading.share.group'),
                        onChange: groupChanged,
                        onItemClick: groupChanged,
                    },
                },
                {
                    visible: symbolsLength > 0,
                    location: 'before',
                    text: `(${symbolsLength})`,
                },
                // {
                //     location: 'before',
                //     widget: 'dxSelectBox',
                //     options: {
                //         width: '110',
                //         showDropDownButton: false,
                //         showClearButton: true,
                //         dataSource: groups,
                //         valueExpr: 'value',
                //         displayExpr: 'text',
                //         value: state.group,
                //         placeholder: $t('trading.share.group'),
                //         onValueChanged: groupChanged,
                //     },
                // },
                // {
                //     location: 'before',
                //     widget: 'dxSelectBox',
                //     options: {
                //         width: '30px',
                //         showDropDownButton: false,
                //         dataSource: [0, 1, 2, 3, 4, 5],
                //         value: state.chartShift,
                //         dropDownOptions: {
                //             wrapperAttr: { class: 'share-min-select-dropdown' },
                //         },
                //         hint: $t('trading.share.chartShift'),
                //         onValueChanged: chartShiftChanged,
                //     },
                // },
                // {
                //     location: 'after',
                //     widget: 'dxButton',
                //     options: {
                //         icon: 'far fa-list small',
                //         hint: $t('trading.share.cloneSymbols'),
                //         onClick: cloneSymbols,
                //     },
                // },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-folder-times small',
                        hint: $t('trading.share.deleteWatchList'),
                        onClick: deleteWatchlist,
                    },
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-filter small',
                        hint: $t('trading.share.filterSymbols'),
                        onClick: filterClick,
                    },
                },
            ]"
        />
        <Chart ref="chartRef" />
    </div>
</template>

<script setup>
import LineContextMenu from "./LineContextMenu.vue";
import { createChart } from "../../../plugins/lightweight-charts.esm.development";
import DxSelectBox from "devextreme-vue/select-box";
import DxAutocomplete from "devextreme-vue/autocomplete";
import DxTextBox from "devextreme-vue/text-box";
import Chart from "./Chart.vue";
import { confirm, alert } from "devextreme/ui/dialog";
import { reactive, ref, inject, watch, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import { subYears, getUnixTime, fromUnixTime, format } from "date-fns";

const store = useStore();
const route = useRoute();
const { t } = useI18n();
const devices = inject("devices");
const mf = inject("mf");
const bus = inject("bus");
const chartContainerRef = ref(null);
const chartRef = ref(null);
const symbolAutocompleteRef = ref(null);
const fullscreenToolRef = ref(null);
const tradingviewRef = ref(null);
const lineToolRef = ref(null);
const targetToolRef = ref(null);
const uplpsToolRef = ref(null);
const downlpsToolRef = ref(null);
const rrToolRef = ref(null);
const rangeToolRef = ref(null);
const tradingviewChartRef = ref(null);

const groups = computed(() => store.state.tradingShare.groups);
const symbolsLength = computed(() => store.state.tradingShare.symbols.length);

const state = reactive({
    group: null,
    symbol: route.query.symbol ?? "VNINDEX",
    inputSymbol: route.query.symbol ?? "VNINDEX",
    timeframe: "D",
    chartShift: 0,
    showLineContextMenu: false,
    isFullscreen: false,
    showTradingView: false,
    isSymbolFocus: false,
});

store.dispatch("tradingShare/getGroups");

function groupChanged({ component }) {
    state.group = component.option("value").trim().toUpperCase();
    if (state.group) store.dispatch("tradingShare/getSymbols", state.group);
}
function chartShiftChanged(e) {
    state.chartShift = e.value;
    reloadChart(false, true);
}
function cloneSymbols() {
    bus.emit("checkPin", () => store.dispatch("tradingShare/cloneSymbols"));
}
function deleteWatchlist() {
    bus.emit("checkPin", () => store.dispatch("tradingShare/deleteWatchlist"));
}
function filterClick() {
    const group = state.group;
    const filterTimes = chartRef.value.getFilterTimes();
    if (!group) {
        return toast.warning(t("trading.share.filterGroupWarning"));
    }
    if (filterTimes.length !== 4) {
        return toast.warning(t("trading.share.filterTimeWarning"));
    }
    bus.emit("checkPin", () => {
        store.dispatch("tradingShare/filterSymbols", { group, filterTimes });
    });
}
</script>
<style lang="scss">
.share-page {
    .symbol-group {
        .dx-texteditor-input {
            text-transform: uppercase;
            // padding: 5.7px 0;
        }

        .dx-texteditor-buttons-container {
            width: 23px !important;
        }
    }
}
// .share-min-select-dropdown {
//     .dx-list-item-content {
//         padding: 5px 5px !important;
//         text-align: center;
//     }
// }
</style>
