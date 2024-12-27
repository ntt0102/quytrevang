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
            @contextmenu="areaContextmenu"
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
                    @focusIn="() => (state.isSymbolFocus = true)"
                    @focusOut="() => (state.isSymbolFocus = false)"
                />
            </div>
            <div class="command timeframe-select">
                <DxSelectBox
                    :data-source="['D', 'W', 'M']"
                    :showDropDownButton="false"
                    :dropDownOptions="{
                        wrapperAttr: {
                            class: 'share-min-select-dropdown',
                        },
                    }"
                    v-model="state.timeframe"
                    @valueChanged="timeframeChanged"
                />
            </div>
            <div
                class="command"
                :title="$t('trading.share.reload')"
                @click="reloadChartData"
                @contextmenu="loadNextSymbol"
            >
                <i
                    :class="`far fa-sync-alt ${
                        $store.state.tradingShare.isChartLoading
                            ? 'fa-spin'
                            : ''
                    }`"
                ></i>
            </div>
            <div
                v-show="showRemoveFilterSymbol"
                :class="`command far fa-times`"
                :title="$t('trading.share.removeFilterList')"
                @click="removeFilterList"
            ></div>
            <div
                v-show="showWatchlist"
                ref="addWatchlistToolRef"
                :class="`command far fa-${
                    inWatchlist ? 'minus-circle' : 'plus-circle'
                }`"
                :title="$t('trading.share.addWatchlist')"
                @click="addWatchlist"
            ></div>
            <div
                v-show="!!$store.state.tradingShare.chart.foreignRSI"
                class="command"
                :title="$t('trading.share.foreignRSI')"
            >
                {{ $store.state.tradingShare.chart.foreignRSI }}
            </div>
        </div>
        <div
            class="area tool-area"
            @click="areaClick"
            @contextmenu="areaContextmenu"
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
            />
            <FilterTimeTool
                ref="filterTimeToolRef"
                :filterTimeSeries="state.series.filterTime"
            />
            <!-- <div
                ref="fullscreenToolRef"
                :class="`command far fa-${
                    state.isFullscreen ? 'compress' : 'expand'
                }`"
                :title="$t('trading.share.fullscreen')"
                @click="toggleFullscreen"
            ></div>
            <div
                ref="tradingviewRef"
                class="command far fa-chart-bar"
                :title="$t('trading.share.tradingview')"
                @click="tradingviewClick"
            ></div> -->
            <!-- <div
                ref="lineToolRef"
                class="line command far fa-horizontal-rule"
                :title="$t('trading.share.tools.line')"
                @click="lineToolClick"
                @contextmenu="lineToolContextmenu"
            >
                <LineContextMenu
                    v-show="state.showLineContextMenu"
                    class="line-contextmenu"
                    :enable="state.showLineContextMenu"
                    v-model:title="state.lineTitle"
                    v-model:color="state.lineColor"
                    @deleteAllLine="removeLineTool"
                ></LineContextMenu>
            </div>
            <div
                ref="uplpsToolRef"
                class="command far fa-arrow-up"
                :title="$t('trading.share.tools.uplps')"
                @click="uplpsToolClick"
                @contextmenu="uplpsToolContextmenu"
            ></div>
            <div
                ref="cashToolRef"
                class="command drawless far fa-dot-circle"
                :title="$t('trading.share.tools.cash')"
                @click="cashToolClick"
                @contextmenu="cashToolContextmenu"
            ></div>
            <div
                ref="downlpsToolRef"
                class="command far fa-arrow-down"
                :title="$t('trading.share.tools.downlps')"
                @click="downlpsToolClick"
                @contextmenu="downlpsToolContextmenu"
            ></div>
            <div
                ref="targetToolRef"
                class="command far fa-flag-checkered"
                :title="$t('trading.share.tools.target')"
                @click="targetToolClick"
                @contextmenu="targetToolContextmenu"
            ></div>
            <div
                ref="rrToolRef"
                class="command far fa-line-height"
                :title="$t('trading.share.tools.rr')"
                @click="rrToolClick"
                @contextmenu="rrToolContextmenu"
            ></div>
            <div
                ref="rangeToolRef"
                class="command far fa-grip-lines-vertical"
                :title="$t('trading.share.tools.range')"
                @click="rangeToolClick"
                @contextmenu="rangeToolContextmenu"
            ></div>
            <div
                ref="eventsToolRef"
                class="command drawless far fa-map-marker-exclamation"
                :title="$t('trading.share.tools.events')"
                @click="eventsToolClick"
                @contextmenu="eventsToolContextmenu"
            ></div> -->
        </div>
    </div>
</template>

<script setup>
import FullscreenTool from "../Derivative/Tools/FullscreenTool.vue";
import TradingviewTool from "../Derivative/Tools/TradingviewTool.vue";
import FilterTimeTool from "./Tools/FilterTimeTool.vue";

import LineContextMenu from "./LineContextMenu.vue";
import { createChart } from "../../../plugins/lightweight-charts.esm.development";
import DxSelectBox from "devextreme-vue/select-box";
import { DxAutocomplete } from "devextreme-vue/autocomplete";
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
const filterTimeToolRef = ref(null);
const lineToolRef = ref(null);
const targetToolRef = ref(null);
const uplpsToolRef = ref(null);
const downlpsToolRef = ref(null);
const rrToolRef = ref(null);
const rangeToolRef = ref(null);
const tradingviewChartRef = ref(null);

let params = {
    chart: {},
    series: {},
    data: {
        ohlc: [],
        price: [],
        cash: [],
        foreign: [],
        active: [],
    },
    tools: {
        lines: [],
        target: { A: {}, B: {}, X: {}, Y: {}, Z: {} },
        uplps: { P1: {}, P2: {}, C1: {}, C2: {} },
        downlps: { P1: {}, P2: {}, C1: {}, C2: {} },
        rr: { EP: {}, SL: {}, TP: {} },
        range: [],
    },
    crosshair: {},
    isCashDraw: false,
    isOnlyLoadData: false,
    showNewsInfo: false,
};
const state = reactive({
    series: {},
    symbol: route.query.symbol ?? "VNINDEX",
    inputSymbol: route.query.symbol ?? "VNINDEX",
    timeframe: "D",
    symbolKind: null,
    chartShift: 0,
    lineTitle: "",
    lineColor: "#F44336",
    showLineContextMenu: false,
    isFullscreen: false,
    showTradingView: false,
    isSymbolFocus: false,
});
state.symbolKind = route.query.list ?? "vn100";

const chartFrom = computed(() => {
    const shift =
        state.chartShift +
        (state.timeframe === "M" ? 7 : state.timeframe === "W" ? 5 : 3);
    return route.query.from ?? getUnixTime(subYears(new Date(), shift));
});
const chartTo = computed(() => {
    return (
        route.query.to ?? getUnixTime(subYears(new Date(), state.chartShift))
    );
});
const showRemoveFilterSymbol = computed(
    () =>
        state.symbolKind.includes("f_") &&
        mf.isSet(store.state.tradingShare.symbols[state.symbolKind]) &&
        store.state.tradingShare.symbols[state.symbolKind].includes(
            " " + state.symbol
        )
);
const showWatchlist = computed(
    () => !!state.symbol && !!state.symbol.trim() && !state.symbol.includes("^")
);
const inWatchlist = computed(
    () =>
        mf.isSet(store.state.tradingShare.symbols.watch) &&
        store.state.tradingShare.symbols.watch.includes(" " + state.symbol)
);
const symbols = computed(() => store.state.tradingShare.symbols);

onMounted(() => {
    initChart();
    getChartData();
    drawChart();
    new ResizeObserver(eventChartResize).observe(chartContainerRef.value);
    document.addEventListener("keydown", eventKeyPress);
});

watch(
    () => store.state.tradingShare.chart,
    () => {
        if (!params.isOnlyLoadData) {
            // loadChartTools();
            // loadChartNews();
        }
        loadChartData();
    }
);

defineExpose({
    getSymbol,
    getFilterTimes,
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
            color: "rgba(54, 54, 64, 0.2)",
        },
    };
    params.chart = createChart(chartRef.value, CHART_OPTIONS);
    params.chart.subscribeCrosshairMove(eventChartCrosshairMove);
    params.chart.subscribeCustomPriceLineDragged(eventPriceLineDrag);
    state.series.filterTime = params.chart.addHistogramSeries({
        priceScaleId: "filterTime",
        scaleMargins: { top: 0, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
    });
    params.series.vnindex = params.chart.addCandlestickSeries({
        priceScaleId: "vnindex",
        upColor: "#42946C",
        downColor: "#BC3E4A",
        borderVisible: false,
        wickUpColor: "#42946C",
        wickDownColor: "#BC3E4A",
        priceFormat: { minMove: 0.01 },
        scaleMargins: { top: 0.1, bottom: 0.55 },
        lastValueVisible: false,
    });
    params.series.price = params.chart.addCandlestickSeries({
        upColor: "#42946C",
        downColor: "#BC3E4A",
        borderVisible: false,
        wickUpColor: "#42946C",
        wickDownColor: "#BC3E4A",
        priceFormat: { minMove: 0.01 },
    });
}

function stopPropagationEvent(e) {
    e.preventDefault();
    e.stopPropagation();
}
function chartClick(e) {
    // state.showLineContextMenu = false;
    //
    // if (lineToolRef.value.classList.contains("selected")) drawLineTool();
    // else if (targetToolRef.value.classList.contains("selected"))
    //     drawTargetTool();
    // else if (uplpsToolRef.value.classList.contains("selected")) drawUplpsTool();
    // else if (downlpsToolRef.value.classList.contains("selected"))
    //     drawDownlpsTool();
    // else if (rrToolRef.value.classList.contains("selected")) drawRrTool();
    // else if (rangeToolRef.value.classList.contains("selected")) drawRangeTool();
    // else
    if (filterTimeToolRef.value.isSelected()) {
        filterTimeToolRef.value.draw({ time: params.crosshair.time });
    }
    // else showNewsInfo();
    //
    // stopPropagationEvent(e);
}
function getFilterTimes() {
    return filterTimeToolRef.value.get();
}
function getSymbol() {
    return state.symbol;
}
function areaClick(e) {
    e.stopPropagation();
}
function areaContextmenu(e) {
    e.preventDefault();
    e.stopPropagation();
}
function eventChartCrosshairMove(e) {
    if (e.time) {
        let price = e.seriesPrices.get(params.series.price);
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
function eventPriceLineDrag(e) {
    let line = e.customPriceLine;
    let lineOptions = line.options();
    lineOptions.price = formatPrice(lineOptions.price);
    const oldPrice = +e.fromPriceString;
    const newPrice = +lineOptions.price;
    switch (lineOptions.lineType) {
        case "line":
            store.dispatch("tradingShare/drawTools", {
                isRemove: false,
                symbol: state.symbol,
                name: lineOptions.lineType,
                points: [oldPrice],
                data: [lineOptions],
            });
            lineToolRef.value.classList.remove("selected");
            break;
        case "target":
            if (mf.isSet(params.tools.target.B)) {
                let param = {
                    isRemove: false,
                    symbol: state.symbol,
                    name: "target",
                    points: [],
                    data: [],
                };
                let point;
                const a = +params.tools.target.A.options().price;
                const b = +params.tools.target.B.options().price;
                const ba = b - a;
                //
                if (lineOptions.point == "A") {
                    point = "A";
                    param.points.push(point);
                    param.data.push(params.tools.target[point].options());
                }
                //
                point = "B";
                params.tools.target[point].applyOptions({
                    title: ((100 * ba) / a).toFixed(1) + "%",
                });
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                point = "X";
                params.tools.target[point].applyOptions({
                    price: parseFloat((a - 0.5 * ba).toFixed(2)),
                    title: ((100 * -0.5 * ba) / a).toFixed(1) + "%",
                });
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                point = "Y";
                params.tools.target[point].applyOptions({
                    price: parseFloat((a - ba).toFixed(2)),
                    title: ((100 * -ba) / a).toFixed(1) + "%",
                });
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                point = "Z";
                params.tools.target[point].applyOptions({
                    price: parseFloat((a - 2 * ba).toFixed(2)),
                    title: ((100 * -2 * ba) / a).toFixed(1) + "%",
                });
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                store.dispatch("tradingShare/drawTools", param);
            }
            break;
        case "rr":
            if (mf.isSet(params.tools.rr.TP)) {
                let param = {
                    isRemove: false,
                    symbol: state.symbol,
                    name: "rr",
                    points: [],
                    data: [],
                };
                let point;
                const epPrice = +params.tools.rr.EP.options().price;
                const slPrice = +params.tools.rr.SL.options().price;
                const tpPrice = +params.tools.rr.TP.options().price;
                const rSl = slPrice - epPrice;
                const rTp = tpPrice - epPrice;
                if (rTp / rSl > 0) {
                    line.applyOptions({ price: oldPrice });
                    return false;
                }
                const rr = Math.abs(rTp) / Math.abs(rSl);
                const sl = (rSl / epPrice) * 100;
                const tp = (rTp / epPrice) * 100;
                //
                point = "EP";
                params.tools.rr[point].applyOptions({
                    title: `RR=${rr.toFixed(1)}`,
                });
                param.points.push(point);
                param.data.push(params.tools.rr[point].options());
                //
                point = "SL";
                params.tools.rr[point].applyOptions({
                    title: `SL=${sl.toFixed(1)}%`,
                });
                param.points.push(point);
                param.data.push(params.tools.rr[point].options());
                //
                point = "TP";
                params.tools.rr[point].applyOptions({
                    title: `TP=${tp.toFixed(1)}%`,
                });
                param.points.push(point);
                param.data.push(params.tools.rr[point].options());
                //
                store.dispatch("tradingShare/drawTools", param);
            }
            break;
    }
}
function eventChartResize() {
    if (!!chartContainerRef.value) {
        params.chart.resize(
            chartContainerRef.value.offsetWidth,
            chartContainerRef.value.offsetHeight
        );
        if (chartContainerRef.value.classList.contains("fullscreen")) {
            document.querySelector(
                ".dx-drawer-panel-content"
            ).style.visibility = "hidden";
            document.querySelector(".header-component").style.visibility =
                "hidden";
            document.querySelector(".sc-launcher").style.visibility = "hidden";
            document.querySelector(".dx-drawer-content").style.transform =
                "unset";
        }
    }
}
function eventKeyPress(e) {
    if (e.ctrlKey || e.metaKey) {
        switch (e.keyCode) {
            case 96:
                loadNextSymbol();
                break;
            case 110:
                addWatchlist();
                break;
        }
    } else if (!state.isSymbolFocus) {
        // if (!state.showLineContextMenu) {
        //     if (e.keyCode >= 65 && e.keyCode <= 90) {
        //         state.inputSymbol = "";
        //         symbolAutocompleteRef.value.instance.focus();
        //     }
        // }
    }
}
function removeFilterList() {
    confirm(
        `${t("trading.share.removeFilterList")}?`,
        t("titles.confirm")
    ).then((result) => {
        if (result) {
            const symbols = store.state.tradingShare.symbols[state.symbolKind];
            let idx = symbols.findIndex((e) => e.trim() == state.symbol);
            idx = idx == symbols.length - 1 ? 0 : idx + 1;
            const nextSymbol = symbols[idx].trim();
            const param = {
                symbol: state.symbol,
                name: state.symbolKind,
            };
            store.dispatch("tradingShare/removeFilterList", param).then(() => {
                state.inputSymbol = nextSymbol;
                state.symbol = nextSymbol;
                reloadChart(true);
            });
        }
    });
}
function addWatchlist() {
    if (!state.symbol) return false;
    const param = {
        symbol: state.symbol,
        add: !inWatchlist.value,
    };
    store.dispatch("tradingShare/addWatchlist", param);
}
function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
}
function loadChartTools() {
    removeLineTool(false);
    removeTargetTool(false);
    removeUplpsTool(false);
    removeUplpsTool(false, true);
    removeDownlpsTool(false);
    removeDownlpsTool(false, true);
    removeRrTool(false);
    loadTools();
}
function loadTools() {
    const tools = store.state.tradingShare.chart.tools;
    for (const [name, tool] of Object.entries(tools)) {
        switch (name) {
            case "line":
                Object.values(tool).forEach((line) =>
                    params.tools.lines.push(
                        params.series.price.createPriceLine(line)
                    )
                );
                break;
            case "target":
                Object.entries(tool).forEach(
                    ([point, line]) =>
                        (params.tools.target[point] =
                            params.series.price.createPriceLine(line))
                );
                break;
            case "rr":
                Object.entries(tool).forEach(
                    ([point, line]) =>
                        (params.tools.rr[point] =
                            params.series.price.createPriceLine(line))
                );
                break;
            default:
                if (name.includes("uplps")) {
                    Object.entries(tool).forEach(
                        ([point, line]) =>
                            (params.tools.uplps[point] =
                                params.series[
                                    point.includes("P") ? "price" : "cash"
                                ].createPriceLine(line))
                    );
                } else if (name.includes("downlps")) {
                    Object.entries(tool).forEach(
                        ([point, line]) =>
                            (params.tools.downlps[point] =
                                params.series[
                                    point.includes("P") ? "price" : "cash"
                                ].createPriceLine(line))
                    );
                }
                break;
        }
    }
}
function loadChartNews() {
    params.series.events.setData(store.state.tradingShare.chart.events);
}
function loadChartData() {
    // params.data = store.state.tradingShare.chart.data;
    // params.series.ohlc.setData(params.data.ohlc);
    params.series.price.setData(store.state.tradingShare.chart.price);
    // params.series.cash.setData(params.data.cash);
    // params.series.foreign.setData(params.data.foreign);
    // params.series.active.setData(params.data.active);
    // params.series.signal.setData(params.data.signal);
    // params.series.gap.setData(params.data.gap);
    params.chart.applyOptions({ watermark: { text: state.symbol } });
}

function lineToolClick(e) {
    state.showLineContextMenu = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
}
function lineToolContextmenu(e) {
    state.showLineContextMenu = !state.showLineContextMenu;
}
function drawLineTool(price = null, forceDraw = false, forceRemove = false) {
    const TYPE = "line";
    if (!price) price = formatPrice(coordinateToPrice(params.crosshair.y));
    const oldLength = params.tools.lines.length;
    params.tools.lines = params.tools.lines.filter((line) => {
        const ops = line.options();
        const isExist = (ops.type = TYPE && price == +ops.price);
        if (isExist) {
            params.series.price.removePriceLine(line);
            store.dispatch("tradingShare/drawTools", {
                isRemove: true,
                symbol: state.symbol,
                name: TYPE,
                point: price,
            });
        }
        return !isExist;
    });
    if ((params.tools.lines.length == oldLength && !forceRemove) || forceDraw) {
        const options = {
            lineType: TYPE,
            price: price,
            color: state.lineColor,
            title: state.lineTitle,
            lineWidth: 1,
            lineStyle: 1,
            draggable: true,
        };
        params.tools.lines.push(params.series.price.createPriceLine(options));
        store.dispatch("tradingShare/drawTools", {
            isRemove: false,
            symbol: state.symbol,
            name: TYPE,
            points: [price],
            data: [options],
        });
    }
    lineToolRef.value.classList.remove("selected");
}
function removeLineTool(server = true) {
    if (params.tools.lines.length > 0) {
        params.tools.lines.forEach((line) =>
            params.series.price.removePriceLine(line)
        );
        params.tools.lines = [];
        if (server)
            store.dispatch("tradingShare/drawTools", {
                isRemove: true,
                symbol: state.symbol,
                name: "line",
                point: null,
            });
    }
}
function targetToolClick(e) {
    state.showLineContextMenu = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        e.target.classList.add("selected");
        removeTargetTool();
    }
}
function targetToolContextmenu(e) {
    removeTargetTool();
    e.target.classList.remove("selected");
}
function drawTargetTool() {
    const TYPE = "target";
    const price = coordinateToPrice(params.crosshair.y);
    let option = {
        lineType: TYPE,
        price: price,
        lineWidth: 1,
        lineStyle: 1,
        draggable: true,
    };
    let param = {
        isRemove: false,
        symbol: state.symbol,
        name: TYPE,
        points: [],
        data: [],
    };
    if (mf.isSet(params.tools.target.A)) {
        const a = +params.tools.target.A.options().price;
        const ba = price - a;
        option.point = "B";
        option.title = ((100 * ba) / a).toFixed(1) + "%";
        option.color = "#FF9800";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        param.points.push(option.point);
        param.data.push(mf.cloneDeep(option));
        //
        option.point = "X";
        option.price = parseFloat((a - 0.5 * ba).toFixed(2));
        option.title = ((100 * -0.5 * ba) / a).toFixed(1) + "%";
        option.color = "#2196F3";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        param.points.push(option.point);
        param.data.push(mf.cloneDeep(option));
        //
        option.point = "Y";
        option.price = parseFloat((a - ba).toFixed(2));
        option.title = ((100 * -ba) / a).toFixed(1) + "%";
        option.color = "#673AB7";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        param.points.push(option.point);
        param.data.push(mf.cloneDeep(option));
        //
        option.point = "Z";
        option.price = parseFloat((a - 2 * ba).toFixed(2));
        option.title = ((100 * -2 * ba) / a).toFixed(1) + "%";
        option.color = "#673AB7";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        param.points.push(option.point);
        param.data.push(mf.cloneDeep(option));
        //
        targetToolRef.value.classList.remove("selected");
    } else {
        option.point = "A";
        option.title = "0";
        option.color = "#FF9800";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        param.points.push(option.point);
        param.data.push(mf.cloneDeep(option));
    }
    store.dispatch("tradingShare/drawTools", param);
}
function removeTargetTool(server = true) {
    if (mf.isSet(params.tools.target.A)) {
        params.series.price.removePriceLine(params.tools.target.A);
        if (mf.isSet(params.tools.target.B)) {
            params.series.price.removePriceLine(params.tools.target.B);
            params.series.price.removePriceLine(params.tools.target.X);
            params.series.price.removePriceLine(params.tools.target.Y);
            params.series.price.removePriceLine(params.tools.target.Z);
        }
        params.tools.target = {
            A: {},
            B: {},
            X: {},
            Y: {},
            Z: {},
        };
    }
    if (server)
        store.dispatch("tradingShare/drawTools", {
            isRemove: true,
            symbol: state.symbol,
            name: "target",
        });
}
function uplpsToolClick(e) {
    state.showLineContextMenu = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
}
function uplpsToolContextmenu(e) {
    removeUplpsTool();
    e.target.classList.remove("selected");
}
function drawUplpsTool() {
    let startTime, endTime;
    const name = params.isCashDraw ? "cash" : "price";
    const char = params.isCashDraw ? "C" : "P";
    if (mf.isSet(params.tools.uplps[`${char}1`])) {
        startTime = +params.tools.uplps[`${char}1`].options().startTime;
        endTime = params.crosshair.time;
        removeUplpsTool(false);
    } else startTime = params.crosshair.time;
    const { value1, value2 } = findUplps(startTime, endTime);
    let option = {
        lineWidth: 1,
        lineStyle: 1,
        color: "#009688",
        draggable: false,
    };
    let param = {
        isRemove: false,
        symbol: state.symbol,
        name: `${name}uplps`,
        points: [],
        data: [],
    };
    option.startTime = startTime;
    option.price = value1;
    option.title = `${char}1`;
    params.tools.uplps[option.title] =
        params.series[name].createPriceLine(option);
    param.points.push(option.title);
    param.data.push(mf.cloneDeep(option));
    //
    option.price = value2;
    option.title = `${char}2`;
    params.tools.uplps[option.title] =
        params.series[name].createPriceLine(option);
    param.points.push(option.title);
    param.data.push(mf.cloneDeep(option));

    store.dispatch("tradingShare/drawTools", param);
    uplpsToolRef.value.classList.remove("selected");
}
function findUplps(startTime, endTime) {
    let v1,
        v2,
        v3,
        d = 0,
        dMax = 0;
    const data = params.data[params.isCashDraw ? "cash" : "price"];
    for (let i = 0; i < data.length; i++) {
        const time = data[i].time;
        if (time < startTime) continue;
        if (!!endTime && time > endTime) break;
        const value = data[i].value;
        if (v1 == undefined) {
            v1 = value;
            v2 = value;
            v3 = value;
        }
        if (value > v3) {
            if (d > dMax) {
                v2 = v3;
                dMax = d;
            }
            v3 = value;
            d = 0;
        } else if (value < v3) {
            const _d = parseFloat((v3 - value).toFixed(2));
            if (_d > d) d = _d;
        }
        if (value < v1 && dMax > 0) break;
    }
    return {
        value1: parseFloat((v2 - dMax).toFixed(2)),
        value2: parseFloat((v3 - dMax).toFixed(2)),
    };
}
function removeUplpsTool(server = true, forceCash = false) {
    const isCashDraw = params.isCashDraw || forceCash;
    const name = isCashDraw ? "cash" : "price";
    const char = isCashDraw ? "C" : "P";
    const point1 = `${char}1`;
    const point2 = `${char}2`;
    if (mf.isSet(params.tools.uplps[point1])) {
        params.series[name].removePriceLine(params.tools.uplps[point1]);
        params.series[name].removePriceLine(params.tools.uplps[point2]);
    }
    params.tools.uplps[point1] = {};
    params.tools.uplps[point2] = {};
    if (server)
        store.dispatch("tradingShare/drawTools", {
            isRemove: true,
            symbol: state.symbol,
            name: `${name}uplps`,
        });
}
function downlpsToolClick(e) {
    state.showLineContextMenu = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
}
function downlpsToolContextmenu(e) {
    removeDownlpsTool();
    e.target.classList.remove("selected");
}
function drawDownlpsTool() {
    let startTime, endTime;
    const name = params.isCashDraw ? "cash" : "price";
    const char = params.isCashDraw ? "C" : "P";
    if (mf.isSet(params.tools.downlps[`${char}1`])) {
        startTime = +params.tools.downlps[`${char}1`].options().startTime;
        endTime = params.crosshair.time;
        removeDownlpsTool();
    } else startTime = params.crosshair.time;
    const { value1, value2 } = findDownlps(startTime, endTime);
    let option = {
        lineWidth: 1,
        lineStyle: 1,
        color: "#E91E63",
        draggable: false,
    };
    let param = {
        isRemove: false,
        symbol: state.symbol,
        name: `${name}downlps`,
        points: [],
        data: [],
    };
    option.startTime = startTime;
    option.price = value1;
    option.title = `${char}1`;
    params.tools.downlps[option.title] =
        params.series[name].createPriceLine(option);
    param.points.push(option.title);
    param.data.push(mf.cloneDeep(option));
    //
    option.price = value2;
    option.title = `${char}2`;
    params.tools.downlps[option.title] =
        params.series[name].createPriceLine(option);
    param.points.push(option.title);
    param.data.push(mf.cloneDeep(option));

    store.dispatch("tradingShare/drawTools", param);
    downlpsToolRef.value.classList.remove("selected");
}
function findDownlps(startTime, endTime) {
    let v1,
        v2,
        v3,
        d = 0,
        dMax = 0;
    const data = params.data[params.isCashDraw ? "cash" : "price"];
    for (let i = 0; i < data.length; i++) {
        const time = data[i].time;
        if (time < startTime) continue;
        if (!!endTime && time > endTime) break;
        const value = data[i].value;
        if (v1 == undefined) {
            v1 = value;
            v2 = value;
            v3 = value;
        }
        if (value < v3) {
            if (d < dMax) {
                v2 = v3;
                dMax = d;
            }
            v3 = value;
            d = 0;
        } else if (value > v3) {
            const _d = parseFloat((v3 - value).toFixed(2));
            if (_d < d) d = _d;
        }
        if (value > v1 && dMax < 0) break;
    }
    return {
        value1: parseFloat((v2 - dMax).toFixed(2)),
        value2: parseFloat((v3 - dMax).toFixed(2)),
    };
}
function removeDownlpsTool(server = true, forceCash = false) {
    const isCashDraw = params.isCashDraw || forceCash;
    const name = isCashDraw ? "cash" : "price";
    const char = isCashDraw ? "C" : "P";
    const point1 = `${char}1`;
    const point2 = `${char}2`;
    if (mf.isSet(params.tools.downlps[point1])) {
        params.series[name].removePriceLine(params.tools.downlps[point1]);
        params.series[name].removePriceLine(params.tools.downlps[point2]);
    }
    params.tools.downlps[point1] = {};
    params.tools.downlps[point2] = {};
    if (server)
        store.dispatch("tradingShare/drawTools", {
            isRemove: true,
            symbol: state.symbol,
            name: `${name}downlps`,
        });
}
function cashToolClick(e) {
    const selected = e.target.classList.contains("selected");
    if (!selected) {
        e.target.classList.add("selected");
        params.isCashDraw = true;
    } else {
        e.target.classList.remove("selected");
        params.isCashDraw = false;
    }
}
function cashToolContextmenu(e) {
    params.isCashDraw = false;
    e.target.classList.remove("selected");
}
function rrToolClick(e) {
    state.showLineContextMenu = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        e.target.classList.add("selected");
        removeRrTool();
    }
}
function rrToolContextmenu(e) {
    removeRrTool();
    e.target.classList.remove("selected");
}
function drawRrTool() {
    const TYPE = "rr";
    const price = coordinateToPrice(params.crosshair.y);
    let option = {
        lineType: TYPE,
        price: price,
        lineWidth: 1,
        lineStyle: 1,
        draggable: true,
    };
    let param = {
        isRemove: false,
        symbol: state.symbol,
        name: TYPE,
        points: [],
        data: [],
    };
    if (mf.isSet(params.tools.rr.EP)) {
        const epPrice = +params.tools.rr.EP.options().price;
        if (mf.isSet(params.tools.rr.SL)) {
            const slPrice = +params.tools.rr.SL.options().price;
            const rSl = slPrice - epPrice;
            const rTp = price - epPrice;
            if (rTp / rSl > 0) return false;
            const tp = (rTp / epPrice) * 100;
            option.point = "TP";
            option.title = `TP=${tp.toFixed(1)}%`;
            option.color = "lime";
            params.tools.rr[option.point] =
                params.series.price.createPriceLine(option);
            param.points.push(option.point);
            param.data.push(mf.cloneDeep(option));
            //
            const sl = (rSl / epPrice) * 100;
            const rr = Math.abs(rTp) / Math.abs(rSl);
            const EP_POINT = "EP";
            params.tools.rr[EP_POINT].applyOptions({
                title: `RR=${rr.toFixed(1)}`,
            });
            param.points.push(EP_POINT);
            param.data.push(params.tools.rr[EP_POINT].options());
            //
            rrToolRef.value.classList.remove("selected");
        } else {
            const sl = ((price - epPrice) / epPrice) * 100;
            option.point = "SL";
            option.title = `SL=${sl.toFixed(1)}%`;
            option.color = "red";
            params.tools.rr[option.point] =
                params.series.price.createPriceLine(option);
            param.points.push(option.point);
            param.data.push(mf.cloneDeep(option));
        }
    } else {
        option.point = "EP";
        option.title = "RR=";
        option.color = "yellow";
        params.tools.rr[option.point] =
            params.series.price.createPriceLine(option);
        param.points.push(option.point);
        param.data.push(mf.cloneDeep(option));
    }
    store.dispatch("tradingShare/drawTools", param);
}
function removeRrTool(server = true) {
    if (mf.isSet(params.tools.rr.EP)) {
        params.series.price.removePriceLine(params.tools.rr.EP);
        if (mf.isSet(params.tools.rr.SL)) {
            params.series.price.removePriceLine(params.tools.rr.SL);
            if (mf.isSet(params.tools.rr.TP)) {
                params.series.price.removePriceLine(params.tools.rr.TP);
            }
        }
    }
    params.tools.rr = { EP: {}, SL: {}, TP: {} };
    if (server)
        store.dispatch("tradingShare/drawTools", {
            isRemove: true,
            symbol: state.symbol,
            name: "rr",
        });
}
function rangeToolClick(e) {
    state.showLineContextMenu = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        e.target.classList.add("selected");
    }
}
function rangeToolContextmenu(e) {
    removeRangeTool();
    e.target.classList.remove("selected");
}
function drawRangeTool() {
    let param = {
        isRemove: false,
        symbol: "ALL",
        name: "range",
        points: [],
        data: [],
    };
    let option = { time: params.crosshair.time, value: 1 };
    if (params.tools.range.length > 0) {
        option.color = "red";
        params.tools.range[1] = option;
        param.points.push(1);
        rangeToolRef.value.classList.remove("selected");
    } else {
        option.color = "aqua";
        params.tools.range[0] = option;
        param.points.push(0);
    }
    params.series.range.setData(params.tools.range);
    param.data.push(option);
    store.dispatch("tradingShare/drawTools", param);
}
function removeRangeTool() {
    params.tools.range = [];
    params.series.range.setData([]);
    store.dispatch("tradingShare/drawTools", {
        isRemove: true,
        symbol: "ALL",
        name: "range",
    });
}
function eventsToolClick(e) {
    const selected = e.target.classList.contains("selected");
    if (!selected) {
        e.target.classList.add("selected");
        params.showNewsInfo = true;
    } else {
        e.target.classList.remove("selected");
        params.showNewsInfo = false;
    }
}
function eventsToolContextmenu(e) {
    params.showNewsInfo = false;
    e.target.classList.remove("selected");
}
function showNewsInfo() {
    if (params.showNewsInfo) {
        const event = store.state.tradingShare.chart.events.find(
            (e) => e.time == params.crosshair.time
        );
        if (mf.isSet(event)) {
            const text = event.title.split("|");
            let html = `
                <div>${t("trading.share.date")} ${format(
                fromUnixTime(event.time),
                "dd/MM/yyyy"
            )}:</div>
                <div>&nbsp;</div>
                `;
            text.forEach((t) => {
                html += `<div>${t}</div>`;
            });
            alert(html, t("trading.share.event"));
        }
    }
}
function coordinateToPrice(y, name = "price") {
    return formatPrice(params.series[name].coordinateToPrice(y));
}
function formatPrice(price) {
    if (!price) return 0;
    return parseFloat(+price.toFixed(2));
}
function symbolChanged() {
    if (!state.inputSymbol || !state.inputSymbol.trim()) return false;
    state.inputSymbol = state.inputSymbol.trim().toUpperCase();
    if (state.symbol == state.inputSymbol) return false;
    state.symbol = state.inputSymbol;
    symbolAutocompleteRef.value.instance.blur();
    reloadChart();
}
function timeframeChanged() {
    reloadChart(true, true);
}
function reloadChartData() {
    reloadChart(true);
}
function initChart() {
    store
        .dispatch("tradingShare/initChart", {
            timeframe: state.timeframe,
            vnindex: true,
        })
        .then((data) => {
            params.series.vnindex.setData(data.vnindex);
            filterTimeToolRef.value.load(data.filterTime);
            // params.tools.range = data.range;
            // params.series.range.setData(data.range);
        });
}
function getChartData() {
    store.dispatch("tradingShare/getChartData", {
        symbol: state.symbol,
        // from: chartFrom.value,
        // to: chartTo.value,
    });
}
function reloadChart(onlyData = false, withVnindex = false) {
    params.isOnlyLoadData = onlyData;
    store
        .dispatch("tradingShare/getChartData", {
            symbol: state.symbol,
            from: chartFrom.value,
            to: chartTo.value,
            timeframe: state.timeframe,
            window: params.tools.range.map((i) => i.time),
            vnindex: withVnindex,
        })
        .then((vnindex) => {
            if (withVnindex) params.series.vnindex.setData(vnindex);
        });
}
function loadNextSymbol() {
    const symbols = store.state.tradingShare.symbols[state.symbolKind];
    let idx = symbols.findIndex((e) => e.trim() == state.symbol);
    idx = idx == symbols.length - 1 ? 0 : idx + 1;
    state.inputSymbol = symbols[idx];
    state.symbol = state.inputSymbol.trim();
    reloadChart();
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
                width: 97px;

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
            }

            .timeframe-select {
                .dx-editor-underlined::after {
                    border-bottom: none !important;
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

            .line {
                position: relative;

                .line-contextmenu {
                    position: absolute;
                    top: 0;
                    left: 40px;
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
.dx-textbox {
    .dx-texteditor-input {
        text-align: center;
    }
}
</style>
