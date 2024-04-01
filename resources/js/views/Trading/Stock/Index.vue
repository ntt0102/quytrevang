<template>
    <div class="content-block dx-card responsive-paddings">
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
                    widget: 'dxSelectBox',
                    options: {
                        width: '130px',
                        dataSource: state.symbolKinds,
                        valueExpr: 'value',
                        displayExpr: 'text',
                        value: state.symbolKind,
                        hint: $t('trading.stock.symbolKind'),
                        onValueChanged: listChanged,
                    },
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-list small',
                        hint: $t('trading.stock.cloneSymbols'),
                        onClick: cloneSymbols,
                    },
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-folder-times small',
                        hint: $t('trading.stock.deleteWatchList'),
                        onClick: deleteWatchlist,
                    },
                },
                {
                    location: 'after',
                    widget: 'dxDropDownButton',
                    options: {
                        splitButton: true,
                        useSelectMode: false,
                        items: state.filterItems,
                        displayExpr: 'text',
                        keyExpr: 'value',
                        icon: 'far fa-filter small',
                        hint: $t('trading.stock.filterSymbols'),
                        dropDownOptions: { width: '130px' },
                        onButtonClick: filterButtonClick,
                        onItemClick: filterItemClick,
                    },
                },
            ]"
        />
        <div
            class="stock-container"
            ref="chartContainerRef"
            @click="eventChartClick"
            @contextmenu="stopPropagationEvent"
        >
            <div class="chart-wrapper" ref="chartRef">
                <div class="area data-area" @click="stopPropagationEvent">
                    <DxSelectBox
                        :width="
                            $screen.getScreenSizeInfo.isXSmall
                                ? '140px'
                                : '130px'
                        "
                        :data-source="symbols"
                        :search-enabled="true"
                        :show-clear-button="true"
                        :element-attr="{
                            class: `command symbol-select ${dividendClass} ${
                                state.dividendEnable ? 'dividend-enable' : ''
                            }`,
                        }"
                        v-model="state.symbol"
                        @valueChanged="symbolChanged"
                    />
                    <DxSelectBox
                        width="60px"
                        :data-source="['D', 'W', 'M']"
                        :element-attr="{ class: 'command timeframe-select' }"
                        v-model="state.timeframe"
                        @valueChanged="timeframeChanged"
                    />
                    <div
                        class="command"
                        :title="$t('trading.stock.reload')"
                        @click="reloadChartData"
                        @contextmenu="loadNextSymbol"
                    >
                        <i
                            :class="`far fa-sync-alt ${
                                $store.state.tradingStock.isChartLoading
                                    ? 'fa-spin'
                                    : ''
                            }`"
                        ></i>
                    </div>
                    <div
                        v-show="state.symbolKind.includes('f_')"
                        :class="`command far fa-times`"
                        :title="$t('trading.stock.removeFilterList')"
                        @click="removeFilterList"
                    ></div>
                    <div
                        v-show="!!state.symbol"
                        ref="addWatchlistToolRef"
                        :class="`command far fa-${
                            inWatchlist ? 'minus-circle' : 'plus-circle'
                        }`"
                        :title="$t('trading.stock.addWatchlist')"
                        @click="addWatchlist"
                    ></div>
                </div>
                <div class="area tool-area" @click="stopPropagationEvent">
                    <div
                        ref="fullscreenToolRef"
                        :class="`command far fa-${
                            state.isFullscreen ? 'compress' : 'expand'
                        }`"
                        :title="$t('trading.stock.fullscreen')"
                        @click="toggleFullscreen"
                        @contextmenu="dividendTrigger"
                    ></div>
                    <div
                        ref="tradingviewRef"
                        class="command far fa-chart-bar"
                        :title="$t('trading.stock.tradingview')"
                        @click="tradingviewClick"
                        @contextmenu="foreignTrigger"
                    ></div>
                    <div
                        ref="colorToolRef"
                        class="color command far fa-palette"
                        :style="{ color: state.color }"
                        :title="$t('trading.stock.tools.color')"
                        @click="colorToolClick"
                    >
                        <ColorPicker
                            v-show="state.showColorPicker"
                            class="color-picker"
                            v-model="state.color"
                        ></ColorPicker>
                    </div>
                    <div
                        ref="lineToolRef"
                        class="command far fa-horizontal-rule"
                        :title="$t('trading.stock.tools.line')"
                        @click="lineToolClick"
                        @contextmenu="lineToolContextmenu"
                    ></div>
                    <div
                        ref="uplpsToolRef"
                        class="command far fa-arrow-up"
                        :title="$t('trading.stock.tools.uplps')"
                        @click="uplpsToolClick"
                        @contextmenu="uplpsToolContextmenu"
                    ></div>
                    <div
                        ref="cashToolRef"
                        class="command drawless far fa-dot-circle"
                        :title="$t('trading.stock.tools.cash')"
                        @click="cashToolClick"
                        @contextmenu="cashToolContextmenu"
                    ></div>
                    <div
                        ref="downlpsToolRef"
                        class="command far fa-arrow-down"
                        :title="$t('trading.stock.tools.downlps')"
                        @click="downlpsToolClick"
                        @contextmenu="downlpsToolContextmenu"
                    ></div>
                    <div
                        ref="targetToolRef"
                        class="command far fa-flag-checkered"
                        :title="$t('trading.stock.tools.target')"
                        @click="targetToolClick"
                        @contextmenu="targetToolContextmenu"
                    ></div>
                    <div
                        ref="rrToolRef"
                        class="command far fa-line-height"
                        :title="$t('trading.stock.tools.rr')"
                        @click="rrToolClick"
                        @contextmenu="rrToolContextmenu"
                    ></div>
                    <div
                        ref="rangeToolRef"
                        class="command far fa-grip-lines-vertical"
                        :title="$t('trading.stock.tools.range')"
                        @click="rangeToolClick"
                        @contextmenu="rangeToolContextmenu"
                    ></div>
                    <div
                        ref="eventsToolRef"
                        class="command drawless far fa-map-marker-exclamation"
                        :title="$t('trading.stock.tools.events')"
                        @click="eventsToolClick"
                        @contextmenu="eventsToolContextmenu"
                    ></div>
                </div>
                <iframe
                    v-show="state.showTradingView"
                    ref="tradingviewChartRef"
                    class="tradingview-chart"
                    :src="tradingViewSrc"
                ></iframe>
            </div>
        </div>
    </div>
</template>

<script setup>
import ColorPicker from "./ColorPicker.vue";
import { createChart } from "../../../plugins/lightweight-charts.esm.development";
import DxSelectBox from "devextreme-vue/select-box";
import { confirm, alert } from "devextreme/ui/dialog";
import { reactive, ref, inject, watch, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
const CHART_OPTIONS = {
    localization: { dateFormat: "dd/MM/yyyy", locale: "vi-VN" },
    rightPriceScale: {
        visible: true,
        scaleMargins: { top: 0.25, bottom: 0.35 },
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
        fontSize: 50,
        horzAlign: "center",
        vertAlign: "center",
        color: "rgba(171, 71, 188, 0.2)",
    },
};

const store = useStore();
const route = useRoute();
const { t } = useI18n();
const devices = inject("devices");
const mf = inject("mf");
const chartContainerRef = ref(null);
const chartRef = ref(null);
const fullscreenToolRef = ref(null);
const tradingviewRef = ref(null);
const colorToolRef = ref(null);
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
    },
    tools: {
        lines: [],
        target: { A: {}, B: {}, X: {}, Y: {}, Z: {} },
        uplps: { P1: {}, P2: {}, C1: {}, C2: {} },
        downlps: { P1: {}, P2: {}, C1: {}, C2: {} },
        rr: { EP: {}, SL: {}, TP: {} },
        range: [],
    },
    fundSize: 0,
    losePerOrder: 0,
    crosshair: {},
    isCashDraw: false,
    isOnlyLoadData: false,
    showNewsInfo: false,
    foreignEnable: false,
};
const state = reactive({
    symbol: route.query.symbol ?? "VNINDEX",
    timeframe: "D",
    symbolKind: null,
    symbolKinds: [
        { text: t("trading.stock.symbolList.hose"), value: "hose" },
        { text: t("trading.stock.symbolList.nh"), value: "nh" },
        { text: t("trading.stock.symbolList.ck"), value: "ck" },
        { text: t("trading.stock.symbolList.filterTop"), value: "f_top" },
        { text: t("trading.stock.symbolList.filterBottom"), value: "f_bottom" },
        { text: t("trading.stock.symbolList.filterBreak"), value: "f_break" },
        { text: t("trading.stock.symbolList.watch"), value: "watch" },
        { text: t("trading.stock.symbolList.hold"), value: "hold" },
        { text: t("trading.stock.symbolList.hnx"), value: "hnx" },
    ],
    filterItems: [
        { text: t("trading.stock.symbolList.filterTop"), value: "f_top" },
        { text: t("trading.stock.symbolList.filterBottom"), value: "f_bottom" },
        { text: t("trading.stock.symbolList.filterBreak"), value: "f_break" },
    ],
    color: "#F44336",
    showColorPicker: false,
    isFullscreen: false,
    showTradingView: false,
    dividendEnable: true,
});
state.symbolKind = route.query.list ?? "hose";
const tradingViewSrc = computed(
    () => `https://chart.vps.com.vn/tv/?symbol=${state.symbol}`
);
const inWatchlist = computed(() =>
    store.state.tradingStock.symbols.watch.includes(state.symbol)
);
const symbols = computed(
    () => store.state.tradingStock.symbols[state.symbolKind]
);
const dividendClass = computed(() =>
    store.state.tradingStock.chart.dividend ? " dividend" : ""
);
store.dispatch("tradingStock/getSymbols");

onMounted(() => {
    params.chart = createChart(chartRef.value, CHART_OPTIONS);
    params.chart.subscribeCrosshairMove(eventChartCrosshairMove);
    params.chart.subscribeCustomPriceLineDragged(eventPriceLineDrag);
    params.series.range = params.chart.addHistogramSeries({
        priceScaleId: "range",
        scaleMargins: { top: 0, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
    });
    params.series.events = params.chart.addHistogramSeries({
        priceScaleId: "events",
        scaleMargins: { top: 0.96, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
    });
    params.series.vnindex = params.chart.addLineSeries({
        priceScaleId: "vnindex",
        scaleMargins: { top: 0.05, bottom: 0.76 },
        color: "aqua",
        priceFormat: { minMove: 0.01 },
        lastValueVisible: false,
    });
    params.series.foreign = params.chart.addLineSeries({
        priceScaleId: "foreign",
        scaleMargins: { top: 0.66, bottom: 0.05 },
        color: "blue",
        priceFormat: { type: "volume", minMove: 1 },
        lastValueVisible: false,
    });
    params.series.cash = params.chart.addLineSeries({
        priceScaleId: "cash",
        scaleMargins: { top: 0.66, bottom: 0.05 },
        color: "yellow",
        priceFormat: { type: "volume", minMove: 1 },
        lastValueVisible: false,
    });
    params.series.ohlc = params.chart.addCandlestickSeries({
        upColor: "#42946C",
        downColor: "#BC3E4A",
        borderVisible: false,
        wickUpColor: "#42946C",
        wickDownColor: "#BC3E4A",
        priceFormat: { minMove: 0.01 },
    });
    params.series.price = params.chart.addLineSeries({
        color: "#CCCCCC",
        priceFormat: { minMove: 0.01 },
        lastValueVisible: false,
        priceLineVisible: false,
    });
    new ResizeObserver(eventChartResize).observe(chartContainerRef.value);
    document.addEventListener("fullscreenchange", eventFullscreenChange);
    console.log("params.foreignEnable", params.foreignEnable);
    store
        .dispatch("tradingStock/initChart", {
            symbol: state.symbol,
            timeframe: state.timeframe,
            vnindex: true,
            dividend: state.dividendEnable,
            foreign: params.foreignEnable,
        })
        .then((data) => {
            params.series.vnindex.setData(data.chart.vnindex);
            params.tools.range = data.range;
            params.series.range.setData(data.range);
            params.fundSize = data.fundSize;
            params.losePerOrder = data.losePerOrder;
        });
});

watch(
    () => store.state.tradingStock.chart,
    () => {
        if (!params.isOnlyLoadData) {
            loadChartTools();
            loadChartNews();
        }
        loadChartData();
    }
);

function stopPropagationEvent(e) {
    e.preventDefault();
    e.stopPropagation();
}
function eventChartClick(e) {
    if (lineToolRef.value.classList.contains("selected")) drawLineTool();
    else if (targetToolRef.value.classList.contains("selected"))
        drawTargetTool();
    else if (uplpsToolRef.value.classList.contains("selected")) drawUplpsTool();
    else if (downlpsToolRef.value.classList.contains("selected"))
        drawDownlpsTool();
    else if (rrToolRef.value.classList.contains("selected")) drawRrTool();
    else if (rangeToolRef.value.classList.contains("selected")) drawRangeTool();
    else showNewsInfo();
    //
    stopPropagationEvent(e);
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
            store.dispatch("tradingStock/drawTools", {
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
                    price: +(a - 0.5 * ba).toFixed(2),
                    title: ((100 * -0.5 * ba) / a).toFixed(1) + "%",
                });
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                point = "Y";
                params.tools.target[point].applyOptions({
                    price: +(a - ba).toFixed(2),
                    title: ((100 * -ba) / a).toFixed(1) + "%",
                });
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                point = "Z";
                params.tools.target[point].applyOptions({
                    price: +(a - 2 * ba).toFixed(2),
                    title: ((100 * -2 * ba) / a).toFixed(1) + "%",
                });
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                store.dispatch("tradingStock/drawTools", param);
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
                const volume = (
                    (params.fundSize * params.losePerOrder) /
                    Math.abs(sl) /
                    (epPrice * 1000)
                ).toFixed(0);
                //
                point = "EP";
                params.tools.rr[point].applyOptions({
                    title: `[V=${volume}] RR=${rr.toFixed(1)}`,
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
                store.dispatch("tradingStock/drawTools", param);
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
function eventFullscreenChange() {
    if (!!chartContainerRef.value) {
        if (document.fullscreenElement) {
            state.isFullscreen = true;
            chartContainerRef.value.classList.add("fullscreen");
            document.querySelector(
                ".dx-drawer-panel-content"
            ).style.visibility = "hidden";
            document.querySelector(".header-component").style.visibility =
                "hidden";
            document.querySelector(".sc-launcher").style.visibility = "hidden";
            document.querySelector(".dx-drawer-content").style.transform =
                "unset";
        } else {
            state.isFullscreen = false;
            chartContainerRef.value.classList.remove("fullscreen");
            document.querySelector(
                ".dx-drawer-panel-content"
            ).style.visibility = "unset";
            document.querySelector(".header-component").style.visibility =
                "unset";
            document.querySelector(".sc-launcher").style.visibility = "unset";
            document.querySelector(".dx-drawer-content").style.transform =
                "translate(0px, 0px)";
        }
    }
}
function removeFilterList() {
    confirm(
        `${t("trading.stock.removeFilterList")}?`,
        t("titles.confirm")
    ).then((result) => {
        if (result) {
            const symbols = store.state.tradingStock.symbols[state.symbolKind];
            let idx = symbols.findIndex((e) => e == state.symbol);
            idx = idx == symbols.length - 1 ? 0 : idx + 1;
            const param = {
                symbol: state.symbol,
                name: state.symbolKind,
            };
            store
                .dispatch("tradingStock/removeFilterList", param)
                .then(() => (state.symbol = symbols[idx]));
        }
    });
}
function addWatchlist() {
    if (!state.symbol) return false;
    const param = {
        symbol: state.symbol,
        add: !inWatchlist.value,
    };
    store.dispatch("tradingStock/addWatchlist", param);
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
    const tools = store.state.tradingStock.chart.tools;
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
    params.series.events.setData(store.state.tradingStock.chart.events);
}
function loadChartData() {
    params.data = store.state.tradingStock.chart.data;
    params.series.ohlc.setData(params.data.ohlc);
    params.series.price.setData(params.data.price);
    params.series.cash.setData(params.data.cash);
    params.series.foreign.setData(params.data.foreign);
    params.chart.applyOptions({ watermark: { text: state.symbol } });
}
function tradingviewClick(e) {
    state.showTradingView = !state.showTradingView;
}
function colorToolClick(e) {
    state.showColorPicker = !state.showColorPicker;
}
function lineToolClick(e) {
    state.showColorPicker = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
}
function lineToolContextmenu(e) {
    removeLineTool();
    e.target.classList.remove("selected");
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
            store.dispatch("tradingStock/drawTools", {
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
            color: state.color,
            lineWidth: 1,
            lineStyle: 1,
            draggable: true,
        };
        params.tools.lines.push(params.series.price.createPriceLine(options));
        store.dispatch("tradingStock/drawTools", {
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
        console.log("removeLineTool");
        params.tools.lines.forEach((line) =>
            params.series.price.removePriceLine(line)
        );
        params.tools.lines = [];
        if (server)
            store.dispatch("tradingStock/drawTools", {
                isRemove: true,
                symbol: state.symbol,
                name: "line",
                point: null,
            });
    }
}
function targetToolClick(e) {
    state.showColorPicker = false;
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
        option.price = +(a - 0.5 * ba).toFixed(2);
        option.title = ((100 * -0.5 * ba) / a).toFixed(1) + "%";
        option.color = "#2196F3";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        param.points.push(option.point);
        param.data.push(mf.cloneDeep(option));
        //
        option.point = "Y";
        option.price = +(a - ba).toFixed(2);
        option.title = ((100 * -ba) / a).toFixed(1) + "%";
        option.color = "#673AB7";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        param.points.push(option.point);
        param.data.push(mf.cloneDeep(option));
        //
        option.point = "Z";
        option.price = +(a - 2 * ba).toFixed(2);
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
    store.dispatch("tradingStock/drawTools", param);
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
        store.dispatch("tradingStock/drawTools", {
            isRemove: true,
            symbol: state.symbol,
            name: "target",
        });
}
function uplpsToolClick(e) {
    state.showColorPicker = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
    else drawUplpsTool();
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

    store.dispatch("tradingStock/drawTools", param);
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
            const _d = +(v3 - value).toFixed(2);
            if (_d > d) d = _d;
        }
        if (value < v1 && dMax > 0) break;
    }
    return {
        value1: +(v2 - dMax).toFixed(2),
        value2: +(v3 - dMax).toFixed(2),
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
        store.dispatch("tradingStock/drawTools", {
            isRemove: true,
            symbol: state.symbol,
            name: `${name}uplps`,
        });
}
function downlpsToolClick(e) {
    state.showColorPicker = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
    else drawDownlpsTool();
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

    store.dispatch("tradingStock/drawTools", param);
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
            const _d = +(v3 - value).toFixed(2);
            if (_d < d) d = _d;
        }
        if (value > v1 && dMax < 0) break;
    }
    return {
        value1: +(v2 - dMax).toFixed(2),
        value2: +(v3 - dMax).toFixed(2),
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
        store.dispatch("tradingStock/drawTools", {
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
    state.showColorPicker = false;
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
            const volume = (
                (params.fundSize * params.losePerOrder) /
                Math.abs(sl) /
                (epPrice * 1000)
            ).toFixed(0);
            const rr = Math.abs(rTp) / Math.abs(rSl);
            const EP_POINT = "EP";
            params.tools.rr[EP_POINT].applyOptions({
                title: `[V=${volume}] RR=${rr.toFixed(1)}`,
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
    store.dispatch("tradingStock/drawTools", param);
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
        store.dispatch("tradingStock/drawTools", {
            isRemove: true,
            symbol: state.symbol,
            name: "rr",
        });
}
function rangeToolClick(e) {
    state.showColorPicker = false;
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
    store.dispatch("tradingStock/drawTools", param);
}
function removeRangeTool() {
    params.tools.range = [];
    params.series.range.setData([]);
    store.dispatch("tradingStock/drawTools", {
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
        const event = store.state.tradingStock.chart.events.find(
            (e) => e.time == params.crosshair.time
        );
        if (mf.isSet(event)) {
            const text = event.title.split("|");
            let html = `
                <div>${t("trading.stock.date")} ${moment
                .unix(event.time)
                .format("DD/MM/YYYY")}:</div>
                <div>&nbsp;</div>
                `;
            text.forEach((t) => {
                html += `<div>${t}</div>`;
            });
            alert(html, t("trading.stock.event"));
        }
    }
}
function coordinateToPrice(y, name = "price") {
    return formatPrice(params.series[name].coordinateToPrice(y));
}
function formatPrice(price) {
    if (!price) return 0;
    return +(+price.toFixed(2));
}
function symbolChanged(e) {
    if (!state.symbol) return false;
    reloadChart();
}
function dividendTrigger() {
    state.dividendEnable = !state.dividendEnable;
    initChart();
}
function foreignTrigger() {
    params.foreignEnable = !params.foreignEnable;
    reloadChart(true);
}
function timeframeChanged() {
    reloadChart(true, true);
}
function reloadChartData() {
    reloadChart(true);
}
function initChart() {
    store
        .dispatch("tradingStock/initChart", {
            symbol: state.symbol,
            timeframe: state.timeframe,
            vnindex: true,
            dividend: state.dividendEnable,
            foreign: params.foreignEnable,
        })
        .then((data) => {
            params.series.vnindex.setData(data.chart.vnindex);
            params.tools.range = data.range;
            params.series.range.setData(data.range);
            params.fundSize = data.fundSize;
            params.losePerOrder = data.losePerOrder;
        });
}
function reloadChart(onlyData = false, withVnindex = false) {
    params.isOnlyLoadData = onlyData;
    store
        .dispatch("tradingStock/getChartData", {
            symbol: state.symbol,
            timeframe: state.timeframe,
            vnindex: withVnindex,
            dividend: state.dividendEnable,
            foreign: params.foreignEnable,
        })
        .then((vnindex) => {
            if (withVnindex) params.series.vnindex.setData(vnindex);
        });
}
function loadNextSymbol(e) {
    const symbols = store.state.tradingStock.symbols[state.symbolKind];
    let idx = symbols.findIndex((e) => e == state.symbol);
    idx = idx == symbols.length - 1 ? 0 : idx + 1;
    state.symbol = symbols[idx];
}
function listChanged(e) {
    state.symbolKind = e.value;
}
function cloneSymbols() {
    confirm(`${t("trading.stock.cloneSymbols")}?`, t("titles.confirm")).then(
        (result) => {
            if (result) store.dispatch("tradingStock/cloneSymbols");
        }
    );
}
function deleteWatchlist() {
    confirm(`${t("trading.stock.deleteWatchList")}?`, t("titles.confirm")).then(
        (result) => {
            if (result) store.dispatch("tradingStock/deleteWatchlist");
        }
    );
}
function filterSymbols(kinds) {
    if (params.tools.range.length == 2) {
        confirm(
            `${t("trading.stock.filterSymbols")}?`,
            t("titles.confirm")
        ).then((result) => {
            if (result) {
                const param = {
                    from: params.tools.range[0].time,
                    to: params.tools.range[1].time,
                    timeframe: state.timeframe,
                    name: state.symbolKind,
                    kinds: kinds,
                };
                store.dispatch("tradingStock/filterSymbols", param);
            }
        });
    } else toast.error(t("trading.stock.rangeWarning"));
}
function filterButtonClick() {
    filterSymbols(["f_top", "f_bottom", "f_break"]);
}
function filterItemClick({ itemData }) {
    filterSymbols([itemData.value]);
}
</script>
<style lang="scss">
.stock-container {
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
    .chart-wrapper {
        position: relative;
        height: 100%;
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
            z-index: 4 !important;

            .command:not(:first-child) {
                border-left: solid 2px #2a2e39 !important;
            }

            .symbol-select {
                .dx-texteditor-input {
                    text-align: center;
                    padding: 5.7px 0;
                }
                .dx-placeholder {
                    line-height: 3px;
                }
                &.dividend {
                    .dx-icon-clear {
                        background: red;
                    }
                }
                &.dividend-enable {
                    .dx-icon-clear {
                        color: lime;
                    }
                }
            }
            .timeframe-select {
                .dx-texteditor-input {
                    text-align: center;
                    padding: 5.7px 0;
                }
            }

            .spinner {
                width: 30px;
                height: 30px;
                display: none;
            }
        }

        &.tool-area {
            top: 0px;
            left: 0px;
            flex-direction: column;

            .command:not(:first-child) {
                border-top: solid 2px #2a2e39 !important;
            }

            .selected:not(.color) {
                color: #1f62ff !important;
            }

            .color {
                position: relative;

                .color-picker {
                    position: absolute;
                    top: 0;
                    left: 40px;
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
    }

    .tradingview-chart {
        position: absolute;
        top: 0;
        left: 32px;
        width: calc(100% - 32px);
        height: 100%;
        z-index: 5;
    }
}
</style>
