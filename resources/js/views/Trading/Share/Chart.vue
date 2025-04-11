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
                    item-template="symbol-item"
                    :show-clear-button="true"
                    :openOnFieldClick="true"
                    :minSearchLength="0"
                    :maxItemCount="100"
                    v-model="state.inputSymbol"
                    @change="symbolChanged"
                    @itemClick="symbolChanged"
                >
                    <template #symbol-item="{ data, index }">
                        {{ index + 1 }}. {{ data }}
                    </template>
                </DxAutocomplete>
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
                @contextmenu="loadNextSymbol"
            ></div>
            <div
                class="command"
                :title="$t('trading.share.reload')"
                @click="() => getChartData()"
                @contextmenu="() => getChartData(true)"
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
                :vpsUser="config.vpsUser"
                :vpsSession="config.vpsSession"
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
                :drawIndexLine="drawIndexLine"
                :drawStockLine="drawStockLine"
                @hideContext="hideContext"
            />
            <LineTool
                ref="lineToolRef"
                :symbol="state.symbol"
                storeModule="tradingShare"
                :drawPriceLine="drawStockLine"
                @hideContext="hideContext"
            />
            <TargetTool
                ref="targetToolRef"
                :symbol="state.symbol"
                storeModule="tradingShare"
                :drawPriceLine="drawStockLine"
                :levels="[1, 2]"
                :isPercent="true"
                :showPercent="false"
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
import {
    reactive,
    ref,
    computed,
    inject,
    watch,
    onMounted,
    onUnmounted,
} from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import { format, getUnixTime } from "date-fns";

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
const config = computed(() => store.state.tradingShare.config);
const showWatchlist = computed(() => state.symbol);
const inWatchlist = computed(() =>
    config.value.watchlist.includes(state.symbol)
);
const symbols = computed(() => store.state.tradingShare.symbols);
const chartFrom = computed(() => props.fromDate);
const state = reactive({
    symbol: route.query.symbol ?? "VN30",
    inputSymbol: route.query.symbol ?? "VN30",
    series: {},
});
let params = {
    chart: {},
    series: {},
    data: { index: [], stock: [] },
    crosshair: {},
    websocket: null,
};

onMounted(() => {
    drawChart();
    initChart();
    filterTimeToolRef.value.createSeries(params.chart);
    reversalToolRef.value.createSeries(params.chart);
    new ResizeObserver(chartResize).observe(chartContainerRef.value);
    document.addEventListener("keydown", chartShortcut);
});

onUnmounted(() => {
    removeChart();
    disconnectSocket();
    document.removeEventListener("keydown", chartShortcut);
});

watch(() => store.state.tradingShare.stock, loadStockChart);
watch(() => config.value.whitespace, loadWhitespaceChart);
watch(() => config.value.source, initData);

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
    params.series.whitespace = params.chart.addHistogramSeries({
        priceScaleId: "whitespace",
        scaleMargins: { top: 0, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
    });
    params.series.index = params.chart.addCandlestickSeries({
        priceScaleId: "index",
        upColor: "#30A165",
        downColor: "#EC3F3F",
        borderVisible: false,
        wickUpColor: "#30A165",
        wickDownColor: "#EC3F3F",
        priceFormat: { minMove: 0.01 },
        scaleMargins: { top: 0.1, bottom: 0.55 },
    });
    params.series.stock = params.chart.addCandlestickSeries({
        upColor: "#30A165",
        downColor: "#EC3F3F",
        borderVisible: false,
        wickUpColor: "#30A165",
        wickDownColor: "#EC3F3F",
        priceFormat: { minMove: 0.01 },
    });
}
function removeChart() {
    if (params.chart) {
        params.chart.remove();
        params.chart = null;
    }
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
        reversalToolRef.value.draw({
            stock: params.data.stock,
            time: params.crosshair.time,
        });
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
        let price = e.seriesPrices.get(params.series.stock);
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
function chartShortcut(e) {
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
        }
    } else if (document.activeElement.tagName != "INPUT") {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            state.inputSymbol = "";
            symbolAutocompleteRef.value.instance.focus();
        }
    }
}
function updateWatchlist(data) {
    config.value.watchlist = data;
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
        config.value.watchlist = mf.isSet(data) ? data : [];
    });
}

function loadWhitespaceChart(value) {
    params.series.whitespace.setData(value);
}
function loadStockChart(value) {
    params.data.stock = mf.cloneDeep(value);
    params.series.stock.setData(params.data.stock);
    params.chart.applyOptions({ watermark: { text: state.symbol } });
}
function loadIndexChart(value) {
    params.data.index = value;
    params.series.index.setData(value);
}
function updateLatestCandle(series, newPrice) {
    let latest = params.data[series].pop();
    if (!latest) return false;
    latest.high = Math.max(latest.high, newPrice);
    latest.low = Math.min(latest.low, newPrice);
    latest.close = newPrice;
    params.data[series].push(latest);
    state.series[series].update(latest);
}
function symbolChanged() {
    if (!state.inputSymbol || !state.inputSymbol.trim()) return false;
    state.inputSymbol = state.inputSymbol.trim().toUpperCase();
    if (state.symbol == state.inputSymbol) return false;
    state.symbol = state.inputSymbol;
    symbolAutocompleteRef.value.instance.blur();
    getChartData();
}
function initChart() {
    store.dispatch("tradingShare/initChart");
}
function initData(source) {
    if (source === "FIREANT") connectSocket();
    else {
        getChartData(true);
        disconnectSocket();
    }
}
function getChartData(withIndex = false, fromDate = null) {
    if (!state.symbol) return false;
    if (!fromDate) fromDate = chartFrom.value;
    if (config.value.source === "FIREANT") {
        getChartSocket(withIndex, fromDate);
    } else getChartServer(withIndex, fromDate);
}
function getChartSocket(withIndex = false, fromDate = null) {
    if (params.websocket && params.websocket.readyState === WebSocket.OPEN) {
        const from = format(fromDate, "yyyy-MM-dd");
        const to = format(new Date(), "yyyy-MM-dd");
        let message = `{"arguments":["${state.symbol}","D","${from}","${to}"],"invocationId":"stock","target":"GetBars","type":1}`;
        params.websocket.send(message);
        if (withIndex) {
            message = `{"arguments":["${config.value.index}","D","${from}","${to}"],"invocationId":"index","target":"GetBars","type":1}`;
            params.websocket.send(message);
        }
        removeTools();
    }
}
function getChartServer(withIndex = false, fromDate = null) {
    store
        .dispatch("tradingShare/getChartData", {
            symbol: state.symbol,
            from: getUnixTime(fromDate),
            withIndex,
        })
        .then((index) => {
            if (withIndex) loadIndexChart(index);
            removeTools();
        });
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
    if (!state.symbol || state.symbol === config.value.index) return false;
    const filterTimes = getFilterTimes();
    if (filterTimes.length < 2) {
        return toast.warning(t("trading.share.filterTimeWarning"));
    }
    checkToolRef.value.check({ symbol: state.symbol, filterTimes });
}
function connectSocket() {
    let uri =
        "wss://tradestation.fireant.vn/quote?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxODg5NjIyNTMwLCJuYmYiOjE1ODk2MjI1MzAsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsiYWNhZGVteS1yZWFkIiwiYWNhZGVteS13cml0ZSIsImFjY291bnRzLXJlYWQiLCJhY2NvdW50cy13cml0ZSIsImJsb2ctcmVhZCIsImNvbXBhbmllcy1yZWFkIiwiZmluYW5jZS1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImludmVzdG9wZWRpYS1yZWFkIiwib3JkZXJzLXJlYWQiLCJvcmRlcnMtd3JpdGUiLCJwb3N0cy1yZWFkIiwicG9zdHMtd3JpdGUiLCJzZWFyY2giLCJzeW1ib2xzLXJlYWQiLCJ1c2VyLWRhdGEtcmVhZCIsInVzZXItZGF0YS13cml0ZSIsInVzZXJzLXJlYWQiXSwianRpIjoiMjYxYTZhYWQ2MTQ5Njk1ZmJiYzcwODM5MjM0Njc1NWQifQ.dA5-HVzWv-BRfEiAd24uNBiBxASO-PAyWeWESovZm_hj4aXMAZA1-bWNZeXt88dqogo18AwpDQ-h6gefLPdZSFrG5umC1dVWaeYvUnGm62g4XS29fj6p01dhKNNqrsu5KrhnhdnKYVv9VdmbmqDfWR8wDgglk5cJFqalzq6dJWJInFQEPmUs9BW_Zs8tQDn-i5r4tYq2U8vCdqptXoM7YgPllXaPVDeccC9QNu2Xlp9WUvoROzoQXg25lFub1IYkTrM66gJ6t9fJRZToewCt495WNEOQFa_rwLCZ1QwzvL0iYkONHS_jZ0BOhBCdW9dWSawD6iF1SIQaFROvMDH1rg";
    params.websocket = new WebSocket(uri);

    params.websocket.onopen = () => {
        console.log("Đã kết nối tới WebSocket server");
        let message = '{"protocol":"json","version":1}';
        params.websocket.send(message);
        getChartData(true);
    };

    params.websocket.onmessage = (e) => {
        const data = parseSocketMessage(e.data);
        if (data.length == 0) return false;
        data.forEach((item) => {
            if (!item) return false;
            if (item.type == 3) {
                const prices = item.result.bars.map(
                    ({ open, high, low, close, date }) => {
                        const time = getUnixTime(new Date(date));
                        return { open, high, low, close, time };
                    }
                );
                if (item.invocationId === "stock") {
                    store.dispatch("tradingShare/getTools", {
                        symbol: state.symbol,
                    });
                    loadStockChart(prices);
                } else loadIndexChart(prices);
            } else if (item.type == 1 && item.target === "UpdateLastPrices") {
                const _data = item.arguments[0];
                const indexData = _data.find(
                    (i) => i.symbol == config.value.index
                );
                const stockData = _data.find((i) => i.symbol == state.symbol);
                if (indexData) updateLatestCandle("index", indexData.last);
                if (stockData) updateLatestCandle("stock", stockData.last);
            }
        });
    };

    params.websocket.onerror = (e) => {
        console.error("Lỗi kết nối WebSocket:", e);
    };

    params.websocket.onclose = () => {
        console.log("Đã đóng kết nối WebSocket");
    };
}
function disconnectSocket() {
    if (params.websocket) {
        if (params.websocket.readyState === WebSocket.OPEN) {
            params.websocket.close();
        }
        params.websocket = null;
    }
}
function parseSocketMessage(msg) {
    let result = [];
    msg.split("").forEach((item) => {
        const startPos = item.indexOf("{");
        const endPos = item.lastIndexOf("}");
        let temp = null;
        if (startPos !== -1 && endPos !== -1 && endPos > startPos) {
            const filteredData = item.substring(startPos, endPos + 1);
            if (filteredData != "{}") {
                try {
                    temp = JSON.parse(filteredData);
                } catch (error) {
                    console.error("JSON parse error:", error);
                }
            }
        }
        result.push(temp);
    });
    return result;
}
function hideContext() {
    lineToolRef.value.hide();
}
function coordinateToPrice(y) {
    return mf.fmtNum(params.series.stock.coordinateToPrice(y));
}
function drawIndexLine(data, isRemove = false) {
    if (isRemove) params.series.index.removePriceLine(data);
    else return params.series.index.createPriceLine(data);
}
function drawStockLine(data, isRemove = false) {
    if (isRemove) params.series.stock.removePriceLine(data);
    else return params.series.stock.createPriceLine(data);
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
