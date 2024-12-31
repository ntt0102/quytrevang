<template>
    <div
        ref="chartContainerRef"
        class="share-chart"
        @click="chartClick"
        @contextmenu="stopPropagationEvent"
    >
        <div ref="chartRef" />
        <div
            class="area data-area"
            @click="areaClick"
            @contextmenu="stopPropagationEvent"
        >
            <div class="command symbol-input">
                <DxAutocomplete
                    ref="symbolAutocompleteRef"
                    :data-source="symbols"
                    :show-clear-button="true"
                    :openOnFieldClick="true"
                    :minSearchLength="0"
                    :maxItemCount="100"
                    v-model="state.inputSymbol"
                    @change="symbolChanged"
                    @itemClick="symbolChanged"
                />
            </div>
            <div
                v-show="showWatchlist"
                ref="addWatchlistToolRef"
                class="command far"
                :class="{
                    'fa-heart-circle-minus': inWatchlist,
                    'fa-heart-circle-plus': !inWatchlist,
                }"
                :title="$t('trading.share.changeWatchlist')"
                @click="changeWatchlist"
            ></div>
            <div
                class="command"
                :title="$t('trading.share.reload')"
                @click="reloadChartData"
                @contextmenu="loadNextSymbol"
            >
                <i
                    class="far fa-sync-alt"
                    :class="{
                        'fa-spin': isLoading,
                    }"
                ></i>
            </div>
        </div>
        <div
            class="area tool-area"
            @click="areaClick"
            @contextmenu="stopPropagationEvent"
        >
            <FullscreenTool
                ref="fullscreenToolRef"
                :chartContainerRef="chartContainerRef"
            />
            <TradingviewTool
                ref="tradingviewToolRef"
                :vpsUser="state.vpsUser"
                :vpsSession="state.vpsSession"
                :chartContainerRef="chartContainerRef"
                :symbol="state.symbol"
                timeframe="1D"
            />
            <FilterTimeTool
                ref="filterTimeToolRef"
                @hideContext="hideContext"
            />
            <CheckTool
                ref="checkToolRef"
                :symbol="state.symbol"
                @checkSymbol="checkSymbol"
                @hideContext="hideContext"
            />
            <ReversalTool
                ref="reversalToolRef"
                :symbol="state.symbol"
                :priceSeries="state.series.price"
                @vnindexUpdated="updateVnindexMarker"
                @hideContext="hideContext"
            />
            <LineTool
                ref="lineToolRef"
                :symbol="state.symbol"
                storeModule="tradingShare"
                :priceSeries="state.series.price"
                @hideContext="hideContext"
            />
            <TargetTool
                ref="targetToolRef"
                :symbol="state.symbol"
                storeModule="tradingShare"
                :priceSeries="state.series.price"
                :levels="[1]"
                @hideContext="hideContext"
            />
        </div>
    </div>
</template>

<script setup>
import FullscreenTool from "../Derivative/Tools/FullscreenTool.vue";
import TradingviewTool from "../Derivative/Tools/TradingviewTool.vue";
import FilterTimeTool from "./Tools/FilterTimeTool.vue";
import CheckTool from "./Tools/CheckTool.vue";
import ReversalTool from "./Tools/ReversalTool.vue";
import LineTool from "../Derivative/Tools/LineTool.vue";
import TargetTool from "../Derivative/Tools/TargetTool.vue";

import { createChart } from "../../../plugins/lightweight-charts.esm.development";
import { DxAutocomplete } from "devextreme-vue/autocomplete";
import { reactive, ref, inject, watch, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { getUnixTime } from "date-fns";

const store = useStore();
const route = useRoute();
const { t } = useI18n();
const devices = inject("devices");
const mf = inject("mf");
const chartContainerRef = ref(null);
const chartRef = ref(null);
const symbolAutocompleteRef = ref(null);
const fullscreenToolRef = ref(null);
const filterTimeToolRef = ref(null);
const checkToolRef = ref(null);
const reversalToolRef = ref(null);
const lineToolRef = ref(null);
const targetToolRef = ref(null);

const props = defineProps(["fromDate", "group"]);
const isLoading = computed(() => store.state.tradingShare.isLoading);
const showWatchlist = computed(() => state.symbol);
const inWatchlist = computed(() => state.watchlist.includes(state.symbol));
const symbols = computed(() => store.state.tradingShare.symbols);
const chartFrom = computed(() => props.fromDate);
const state = reactive({
    symbol: route.query.symbol ?? "VN30",
    inputSymbol: route.query.symbol ?? "VN30",
    series: {},
    watchlist: [],
});
let params = {
    chart: {},
    series: {},
    crosshair: {},
};

onMounted(() => {
    drawChart();
    initChart();
    getChartData(true);
    filterTimeToolRef.value.createSeries(params.chart);
    reversalToolRef.value.createSeries(params.chart);
    new ResizeObserver(chartResize).observe(chartContainerRef.value);
    document.addEventListener("keydown", eventKeyPress);
});

watch(() => store.state.tradingShare.prices, loadChartData);

defineExpose({
    getFilterTimes,
    getChartData,
    updateWatchlist,
});

function drawChart() {
    const CHART_OPTIONS = {
        localization: { dateFormat: "dd/MM/yyyy", locale: "vi-VN" },
        rightPriceScale: {
            visible: true,
            scaleMargins: { top: 0.5, bottom: 0.05 },
        },
        leftPriceScale: { visible: false },
        layout: {
            backgroundColor: "#000000",
            textColor: "#CCCCCC",
        },
        grid: {
            vertLines: {
                color: "#1B1E27",
                style: 2,
            },
            horzLines: {
                color: "#1B1E27",
                style: 2,
            },
        },
        crosshair: { mode: 0 },
        timeScale: {
            timeVisible: false,
            rightOffset: 20,
            minBarSpacing: 0.01,
        },
        watermark: {
            visible: true,
            fontSize: 40,
            horzAlign: "center",
            vertAlign: "center",
            color: "rgba(54, 54, 64, 0.4)",
        },
    };
    params.chart = createChart(chartRef.value, CHART_OPTIONS);
    params.chart.subscribeCrosshairMove(eventChartCrosshairMove);
    params.chart.subscribeCustomPriceLineDragged(priceLineDrag);
    params.series.vnindex = params.chart.addCandlestickSeries({
        priceScaleId: "vnindex",
        upColor: "#30A165",
        downColor: "#EC3F3F",
        borderVisible: false,
        wickUpColor: "#30A165",
        wickDownColor: "#EC3F3F",
        priceFormat: { minMove: 0.01 },
        scaleMargins: { top: 0.1, bottom: 0.55 },
        lastValueVisible: false,
    });
    state.series.price = params.chart.addCandlestickSeries({
        upColor: "#30A165",
        downColor: "#EC3F3F",
        borderVisible: false,
        wickUpColor: "#30A165",
        wickDownColor: "#EC3F3F",
        priceFormat: { minMove: 0.01 },
    });
}

function stopPropagationEvent(e) {
    e.preventDefault();
    e.stopPropagation();
}
function chartClick() {
    hideContext();

    if (filterTimeToolRef.value.isSelected()) {
        filterTimeToolRef.value.draw({ time: params.crosshair.time });
    } else if (reversalToolRef.value.isSelected()) {
        reversalToolRef.value.draw({ time: params.crosshair.time });
    } else if (lineToolRef.value.isSelected()) {
        lineToolRef.value.draw({
            price: coordinateToPrice(params.crosshair.y),
        });
    } else if (targetToolRef.value.isSelected()) {
        targetToolRef.value.draw({
            price: coordinateToPrice(params.crosshair.y),
        });
    }
}
function areaClick(e) {
    e.stopPropagation();
}
function getFilterTimes() {
    return filterTimeToolRef.value.get();
}
function eventChartCrosshairMove(e) {
    if (e.time) {
        let price = e.seriesPrices.get(state.series.price);
        params.crosshair.time = e.time;
        params.crosshair.price = price;
    } else {
        if (!devices.phone) {
            params.crosshair.time = null;
            params.crosshair.price = null;
        }
    }
    if (e.point != undefined) {
        params.crosshair.x = e.point.x;
        params.crosshair.y = e.point.y;
    }
}
function priceLineDrag(e) {
    let line = e.customPriceLine;
    let lineOptions = line.options();
    lineOptions.price = mf.fmtNum(lineOptions.price);
    const oldPrice = +e.fromPriceString;
    const newPrice = lineOptions.price;
    switch (lineOptions.lineType) {
        case "line":
            lineToolRef.value.drag({ lineOptions, oldPrice, newPrice });
            break;
        case "target":
            targetToolRef.value.drag({ lineOptions, newPrice });
            break;
    }
}
function chartResize() {
    if (chartContainerRef.value) {
        params.chart.resize(
            chartContainerRef.value.offsetWidth,
            chartContainerRef.value.offsetHeight
        );
        fullscreenToolRef.value.checkFullscreen();
    }
}
function eventKeyPress(e) {
    if (e.ctrlKey || e.metaKey) {
        switch (e.code) {
            case "Numpad0":
                moveSymbolInGroup(true);
                break;
            case "Numpad1":
                moveSymbolInGroup(false);
                break;
            case "NumpadDecimal":
                changeWatchlist();
                break;
            case "Space":
                state.inputSymbol = "";
                symbolAutocompleteRef.value.instance.focus();
                break;
        }
    }
}
function updateWatchlist(data) {
    state.watchlist = data;
}
function changeWatchlist() {
    if (!state.symbol) return false;
    const param = {
        multi: false,
        group: props.group,
        symbol: state.symbol,
        add: !inWatchlist.value,
    };
    store.dispatch("tradingShare/changeWatchlist", param).then((data) => {
        state.watchlist = mf.isSet(data) ? data : [];
    });
}

function loadChartData() {
    state.series.price.setData(store.state.tradingShare.prices);
    params.chart.applyOptions({ watermark: { text: state.symbol } });
}
function symbolChanged() {
    if (!state.inputSymbol || !state.inputSymbol.trim()) return false;
    state.inputSymbol = state.inputSymbol.trim().toUpperCase();
    if (state.symbol == state.inputSymbol) return false;
    state.symbol = state.inputSymbol;
    symbolAutocompleteRef.value.instance.blur();
    getChartData();
}
function reloadChartData() {
    getChartData();
}
function initChart() {
    store.dispatch("tradingShare/initChart").then((data) => {
        state.watchlist = data.watchlist;
        state.vpsUser = data.vpsUser;
        state.vpsUser = data.vpsSession;
        setTimeout(() => filterTimeToolRef.value.load(data.filterTime), 3000);
    });
}
function getChartData(withVnindex = false, fromDate = null) {
    if (!state.symbol) return false;
    if (!fromDate) fromDate = chartFrom.value;
    store
        .dispatch("tradingShare/getChartData", {
            symbol: state.symbol,
            from: getUnixTime(fromDate),
            withVnindex,
        })
        .then((vnindex) => {
            if (withVnindex) {
                params.series.vnindex.setData(vnindex.prices);
                if (vnindex.reversal) {
                    updateVnindexMarker(vnindex.reversal.time);
                }
            } else removeTools();
        });
}
function updateVnindexMarker(time) {
    let markers = [];
    if (time) {
        markers.push({
            time: time,
            color: "#9C27B0",
            position: "aboveBar",
            shape: "circle",
        });
    }
    params.series.vnindex.setMarkers(markers);
}
function removeTools() {
    reversalToolRef.value.remove();
    lineToolRef.value.remove();
    targetToolRef.value.remove();
}
function loadNextSymbol() {
    moveSymbolInGroup();
}
function moveSymbolInGroup(side = true) {
    if (isLoading.value) return false;
    const _symbols = symbols.value;
    let idx = _symbols.findIndex((item) => item === state.symbol);
    idx = idx + (side ? 1 : -1);
    if (idx < 0) idx = _symbols.length - 1;
    else if (idx >= _symbols.length) idx = 0;
    const _symbol = _symbols[idx];
    if (!_symbol) return false;
    state.inputSymbol = _symbol;
    state.symbol = state.inputSymbol;
    getChartData();
}
function checkSymbol() {
    if (!state.symbol || state.symbol === "VNINDEX") return false;
    const filterTimes = getFilterTimes();
    checkToolRef.value.check({ symbol: state.symbol, filterTimes });
}
function hideContext() {
    lineToolRef.value.hide();
}
function coordinateToPrice(y) {
    return mf.fmtNum(state.series.price.coordinateToPrice(y));
}
</script>
<style lang="scss">
.share-chart {
    position: relative;
    height: 400px;
    background: #131722;
    border: none;

    &.fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1501;
    }

    .area {
        position: absolute;
        display: flex;
        justify-content: space-between;
        font-size: 17px;
        background: #131722;
        border: solid 2px #2a2e39;
        border-bottom-right-radius: 5px;
        z-index: 3;

        &.data-area {
            top: 0px;
            left: 32px;
            z-index: 3;

            .command:not(:first-child) {
                border-left: solid 2px #2a2e39 !important;
            }

            .symbol-input {
                width: 120px;

                .dx-texteditor-input {
                    text-align: center;
                    text-transform: uppercase;
                    padding: 5.7px 0;
                }
                .dx-placeholder {
                    line-height: 3px;
                }
                .dx-texteditor-buttons-container {
                    width: 25px;
                }
                .dx-editor-underlined::after {
                    border-bottom: none !important;
                }
                .dx-texteditor-input {
                    text-align: center;
                }
            }
        }

        &.tool-area {
            top: 0px;
            left: 0px;
            flex-direction: column;

            .command:not(:first-child) {
                border-top: solid 2px #2a2e39 !important;
            }

            .context {
                z-index: 0;
                position: relative;

                .contextmenu {
                    position: absolute;
                    top: 0px;
                    left: 42px;
                }
            }

            .tradingview {
                z-index: 1;

                .chart {
                    position: absolute;
                    z-index: 3;
                }
            }
        }
    }
    .command {
        width: 30px;
        height: 30px;
        flex: 1 1 auto;
        text-align: center;
        color: #bbbbbb;
        background: transparent !important;
        line-height: 30px;
        font-size: 16px;
        border: none;
        cursor: pointer;
        z-index: 3;

        &.selected {
            color: #1f62ff !important;
        }

        i {
            pointer-events: none;
        }
    }
}
</style>
