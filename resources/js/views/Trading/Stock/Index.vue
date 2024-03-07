<template>
    <div class="content-block dx-card responsive-paddings">
        <DxToolbar
            :items="[
                {
                    location: 'before',
                    widget: 'dxSelectBox',
                    options: {
                        width: '130px',
                        dataSource: state.symbolKinds,
                        keyExpr: 'value',
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
                        onClick: () =>
                            $store.dispatch('tradingStock/cloneSymbols'),
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
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-filter small',
                        hint: $t('trading.stock.filterPopup.title'),
                        onClick: filterSymbols,
                    },
                },
            ]"
        />
        <div class="stock-container" ref="chartContainerRef">
            <div class="chart-wrapper" ref="chartRef">
                <div class="area data-area">
                    <DxSelectBox
                        :width="
                            $screen.getScreenSizeInfo.isXSmall
                                ? '140px'
                                : '130px'
                        "
                        height="30px"
                        :data-source="
                            $store.state.tradingStock.symbols[
                                state.symbolKind.value
                            ]
                        "
                        :search-enabled="true"
                        :show-clear-button="true"
                        :element-attr="{ class: 'symbol-select' }"
                        v-model="state.symbol"
                        @valueChanged="symbolChanged"
                    />
                    <div
                        v-show="!!state.symbol"
                        ref="addWatchlistToolRef"
                        :class="`command far fa-${
                            inWatchlist ? 'minus-circle' : 'plus-circle'
                        }`"
                        :title="$t('trading.stock.addWatchlist')"
                        @click="addWatchlist"
                    ></div>
                    <img
                        ref="spinnerRef"
                        class="command spinner"
                        src="../../../../images/spinner.gif"
                    />
                </div>
                <div class="area tool-area">
                    <div
                        ref="fullscreenToolRef"
                        :class="`command far fa-${
                            state.isFullscreen ? 'compress' : 'expand'
                        }`"
                        :title="$t('trading.stock.fullscreen')"
                        @click="toggleFullscreen"
                    ></div>
                    <div
                        ref="tradingviewRef"
                        class="command far fa-chart-bar"
                        :title="$t('trading.stock.tradingview')"
                        @click="tradingviewClick"
                    ></div>
                    <div
                        ref="colorToolRef"
                        class="color command far fa-palette"
                        :style="{ color: state.color }"
                        :title="$t('trading.stock.colorTool')"
                        @click="colorToolClick"
                        @contextmenu="colorToolContextmenu"
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
                        :title="$t('trading.stock.lineTool')"
                        @click="lineToolClick"
                        @contextmenu="lineToolContextmenu"
                    ></div>
                    <div
                        ref="uplpsToolRef"
                        class="command far fa-arrow-up"
                        :title="$t('trading.stock.uplpsTool')"
                        @click="uplpsToolClick"
                        @contextmenu="uplpsToolContextmenu"
                    ></div>
                    <div
                        ref="targetToolRef"
                        class="command far fa-dot-circle"
                        :title="$t('trading.stock.targetTool')"
                        @click="targetToolClick"
                        @contextmenu="targetToolContextmenu"
                    ></div>
                    <div
                        ref="downlpsToolRef"
                        class="command far fa-arrow-down"
                        :title="$t('trading.stock.downlpsTool')"
                        @click="downlpsToolClick"
                        @contextmenu="downlpsToolContextmenu"
                    ></div>
                    <div
                        ref="rangeToolRef"
                        class="command far fa-grip-lines-vertical"
                        :title="$t('trading.stock.rangeTool')"
                        @click="rangeToolClick"
                        @contextmenu="rangeToolContextmenu"
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
    <FilterPopup ref="filterPopupRef" />
</template>

<script setup>
import ColorPicker from "./ColorPicker.vue";
import FilterPopup from "./filterPopup.vue";
import stockDb from "../../../plugins/stockDb.js";
import { createChart } from "../../../plugins/lightweight-charts.esm.development";
import DxSelectBox from "devextreme-vue/select-box";
import { confirm } from "devextreme/ui/dialog";
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
const spinnerRef = ref(null);
const fullscreenToolRef = ref(null);
const tradingviewRef = ref(null);
const colorToolRef = ref(null);
const lineToolRef = ref(null);
const targetToolRef = ref(null);
const uplpsToolRef = ref(null);
const downlpsToolRef = ref(null);
const rangeToolRef = ref(null);
const filterPopupRef = ref(null);
const tradingviewChartRef = ref(null);
let params = {
    chart: {},
    series: {},
    data: {
        ohlc: [],
        price: [],
        cash: [],
    },
    tools: {
        lines: [],
        target: { A: {}, B: {}, X: {}, Y: {}, Z: {} },
        uplps: {
            P1: {},
            P2: {},
            C1: {},
            C2: {},
        },
        downlps: {
            P1: {},
            P2: {},
            C1: {},
            C2: {},
        },
        range: [],
    },
    crosshair: {},
};
const state = reactive({
    symbol: "VNINDEX",
    symbols: [],
    symbolKind: null,
    symbolKinds: [
        { text: t("trading.stock.symbolList.hoseList"), value: "hose" },
        { text: t("trading.stock.symbolList.nhList"), value: "nh" },
        { text: t("trading.stock.symbolList.ckList"), value: "ck" },
        { text: t("trading.stock.symbolList.filterCash"), value: "fcash" },
        // { text: t("trading.stock.symbolList.filterIndex"), value: "findex" },
        { text: t("trading.stock.symbolList.filterMix"), value: "fmix" },
        { text: t("trading.stock.symbolList.watchList"), value: "watch" },
        { text: t("trading.stock.symbolList.hold"), value: "hold" },
    ],
    isFullscreen: false,
    color: "#F44336",
    showColorPicker: false,
    showTradingView: false,
});
state.symbolKind = state.symbolKinds[0];
const tradingViewSrc = computed(
    () => `https://chart.vps.com.vn/tv/?symbol=${state.symbol}`
);
const inWatchlist = computed(() =>
    store.state.tradingStock.symbols.watch.includes(state.symbol)
);
store.dispatch("tradingStock/getSymbols");
stockDb.create();

onMounted(() => {
    params.chart = createChart(chartRef.value, CHART_OPTIONS);
    chartContainerRef.value.addEventListener("click", eventChartClick);
    chartContainerRef.value.addEventListener(
        "contextmenu",
        eventChartContextmenu
    );
    params.chart.subscribeCrosshairMove(eventChartCrosshairMove);
    params.chart.subscribeCustomPriceLineDragged(eventPriceLineDrag);
    params.series.range = params.chart.addHistogramSeries({
        priceScaleId: "range",
        scaleMargins: { top: 0, bottom: 0 },
        color: "#667b68",
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
    params.series.cash = params.chart.addLineSeries({
        priceScaleId: "cash",
        scaleMargins: { top: 0.66, bottom: 0.01 },
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
    store
        .dispatch("tradingStock/getChartData", state.symbol)
        .then(async (vnindex) => {
            params.series.vnindex.setData(vnindex);
            const range = await stockDb.get("range");
            if (range.length == 2) {
                params.tools.range = range;
                params.series.range.setData(range);
            }
        });
});

watch(
    () => store.state.tradingStock.chart,
    () => {
        loadchartTools();
        loadChartData();
    }
);

watch(
    () => store.state.tradingStock.isChartLoading,
    (value) => {
        spinnerRef.value.style.display = value ? "block" : "none";
    }
);
function eventChartContextmenu(e) {
    e.preventDefault();
}
function eventChartClick() {
    if (lineToolRef.value.classList.contains("selected")) drawLineTool();
    else if (targetToolRef.value.classList.contains("selected"))
        drawTargetTool();
    else if (uplpsToolRef.value.classList.contains("selected")) drawUplpsTool();
    else if (downlpsToolRef.value.classList.contains("selected"))
        drawDownlpsTool();
    else if (rangeToolRef.value.classList.contains("selected")) drawRangeTool();
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
    const newPrice = lineOptions.price;
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
function loadchartTools() {
    removeLineTool(false);
    removeUplpsTool(false);
    removeDownlpsTool(false);
    removeTargetTool(false);

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
            case "uplps":
                Object.entries(tool).forEach(
                    ([point, line]) =>
                        (params.tools.uplps[point] =
                            params.series[
                                point.includes("P") ? "price" : "cash"
                            ].createPriceLine(line))
                );
                break;
            case "downlps":
                Object.entries(tool).forEach(
                    ([point, line]) =>
                        (params.tools.downlps[point] =
                            params.series[
                                point.includes("P") ? "price" : "cash"
                            ].createPriceLine(line))
                );
                break;
            case "target":
                Object.entries(tool).forEach(
                    ([point, line]) =>
                        (params.tools.target[point] =
                            params.series.price.createPriceLine(line))
                );
                break;
        }
    }
}
function loadChartData() {
    params.data = store.state.tradingStock.chart.data;
    params.series.ohlc.setData(params.data.ohlc);
    params.series.price.setData(params.data.price);
    params.series.cash.setData(params.data.cash);
    params.chart.applyOptions({ watermark: { text: state.symbol } });
}
function tradingviewClick(e) {
    state.showTradingView = !state.showTradingView;
    e.stopPropagation();
}
function colorToolClick(e) {
    state.showColorPicker = !state.showColorPicker;
    e.stopPropagation();
}
function colorToolContextmenu(e) {
    // if (mf.isSet(params.tools.target.X)) {
    //     drawLineTool(+params.tools.target.X.options().price);
    //     drawLineTool(+params.tools.target.Y.options().price);
    //     drawLineTool(+params.tools.target.Z.options().price);
    //     drawLineTool(+params.tools.target.T.options().price);
    // }
    e.preventDefault();
    e.stopPropagation();
}
function lineToolClick(e) {
    state.showColorPicker = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
    e.stopPropagation();
}
function lineToolContextmenu(e) {
    removeLineTool();
    e.target.classList.remove("selected");
    e.preventDefault();
    e.stopPropagation();
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
        .querySelectorAll(".tool-area > .command")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        e.target.classList.add("selected");
        removeTargetTool();
    }
    e.stopPropagation();
}
function targetToolContextmenu(e) {
    removeTargetTool();
    e.target.classList.remove("selected");
    e.preventDefault();
    e.stopPropagation();
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
        .querySelectorAll(".tool-area > .command")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
    else drawUplpsTool();
    e.stopPropagation();
}
function uplpsToolContextmenu(e) {
    removeUplpsTool();
    e.target.classList.remove("selected");
    e.preventDefault();
    e.stopPropagation();
}
function drawUplpsTool() {
    let startTime, endTime;
    if (mf.isSet(params.tools.uplps.P1)) {
        startTime = +params.tools.uplps.P1.options().startTime;
        endTime = params.crosshair.time;
        removeUplpsTool(false);
    } else startTime = params.crosshair.time;
    const { price1, price2, cash1, cash2 } = findUplps(startTime, endTime);
    let option = {
        lineWidth: 1,
        lineStyle: 1,
        color: "#009688",
        draggable: false,
    };
    let param = {
        isRemove: false,
        symbol: state.symbol,
        name: "uplps",
        points: [],
        data: [],
    };
    option.startTime = startTime;
    option.price = price1;
    option.title = "P1";
    params.tools.uplps[option.title] =
        params.series.price.createPriceLine(option);
    param.points.push(option.title);
    param.data.push(mf.cloneDeep(option));
    //
    option.price = price2;
    option.title = "P2";
    params.tools.uplps[option.title] =
        params.series.price.createPriceLine(option);
    param.points.push(option.title);
    param.data.push(mf.cloneDeep(option));
    //
    option.price = cash1;
    option.title = "C1";
    params.tools.uplps[option.title] =
        params.series.cash.createPriceLine(option);
    param.points.push(option.title);
    param.data.push(mf.cloneDeep(option));
    //
    option.price = cash2;
    option.title = "C2";
    params.tools.uplps[option.title] =
        params.series.cash.createPriceLine(option);
    param.points.push(option.title);
    param.data.push(mf.cloneDeep(option));

    store.dispatch("tradingStock/drawTools", param);
    uplpsToolRef.value.classList.remove("selected");
}
function findUplps(startTime, endTime) {
    let p1,
        p2,
        p3,
        dP = 0,
        dpMax = 0,
        c1,
        c2,
        c3,
        dC = 0,
        dcMax = 0;
    for (let i = 0; i < params.data.price.length; i++) {
        const time = params.data.price[i].time;
        if (time < startTime) continue;
        if (!!endTime && time > endTime) break;
        const price = params.data.price[i].value;
        const cash = params.data.cash[i].value;
        if (p1 == undefined) {
            p1 = price;
            p2 = price;
            p3 = price;
            c1 = cash;
            c2 = cash;
            c3 = cash;
        }
        if (price > p3) {
            if (dP > dpMax) {
                p2 = p3;
                dpMax = dP;
            }
            p3 = price;
            dP = 0;
        } else if (price < p3) {
            const _dP = +(p3 - price).toFixed(2);
            if (_dP > dP) dP = _dP;
        }
        if (price < p1 && dpMax > 0) break;
        //
        if (cash > c3) {
            if (dC > dcMax) {
                c2 = c3;
                dcMax = dC;
            }
            c3 = cash;
            dC = 0;
        } else if (cash < c3) {
            const _dC = +(c3 - cash).toFixed(2);
            if (_dC > dC) dC = _dC;
        }
    }
    return {
        price1: +(p2 - dpMax).toFixed(2),
        price2: +(p3 - dpMax).toFixed(2),
        cash1: +(c2 - dcMax).toFixed(0),
        cash2: +(c3 - dcMax).toFixed(0),
    };
}
function removeUplpsTool(server = true) {
    if (mf.isSet(params.tools.uplps.P1)) {
        params.series.price.removePriceLine(params.tools.uplps.P1);
        params.series.price.removePriceLine(params.tools.uplps.P2);
    }
    if (mf.isSet(params.tools.uplps.C1)) {
        params.series.cash.removePriceLine(params.tools.uplps.C1);
        params.series.cash.removePriceLine(params.tools.uplps.C2);
    }
    params.tools.uplps = {
        P1: {},
        P2: {},
        C1: {},
        C2: {},
    };
    if (server)
        store.dispatch("tradingStock/drawTools", {
            isRemove: true,
            symbol: state.symbol,
            name: "uplps",
        });
}
function downlpsToolClick(e) {
    state.showColorPicker = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
    else drawDownlpsTool();
    e.stopPropagation();
}
function downlpsToolContextmenu(e) {
    removeDownlpsTool();
    e.target.classList.remove("selected");
    e.preventDefault();
    e.stopPropagation();
}
function drawDownlpsTool() {
    let startTime, endTime;
    if (mf.isSet(params.tools.downlps.P1)) {
        startTime = +params.tools.downlps.P1.options().startTime;
        endTime = params.crosshair.time;
        removeDownlpsTool();
    } else startTime = params.crosshair.time;
    const { price1, price2, cash1, cash2 } = findDownlps(startTime, endTime);
    let option = {
        lineWidth: 1,
        lineStyle: 1,
        color: "#E91E63",
        draggable: false,
    };
    let param = {
        isRemove: false,
        symbol: state.symbol,
        name: "downlps",
        points: [],
        data: [],
    };
    option.startTime = startTime;
    option.price = price1;
    option.title = "P1";
    params.tools.downlps[option.title] =
        params.series.price.createPriceLine(option);
    param.points.push(option.title);
    param.data.push(mf.cloneDeep(option));
    //
    option.price = price2;
    option.title = "P2";
    params.tools.downlps[option.title] =
        params.series.price.createPriceLine(option);
    param.points.push(option.title);
    param.data.push(mf.cloneDeep(option));
    //
    option.price = cash1;
    option.title = "C1";
    params.tools.downlps[option.title] =
        params.series.cash.createPriceLine(option);
    param.points.push(option.title);
    param.data.push(mf.cloneDeep(option));
    //
    option.price = cash2;
    option.title = "C2";
    params.tools.downlps[option.title] =
        params.series.cash.createPriceLine(option);
    param.points.push(option.title);
    param.data.push(mf.cloneDeep(option));

    store.dispatch("tradingStock/drawTools", param);
    downlpsToolRef.value.classList.remove("selected");
}
function findDownlps(startTime, endTime) {
    let p1,
        p2,
        p3,
        dP = 0,
        dpMax = 0,
        c1,
        c2,
        c3,
        dC = 0,
        dcMax = 0;
    for (let i = 0; i < params.data.price.length; i++) {
        const time = params.data.price[i].time;
        if (time < startTime) continue;
        if (!!endTime && time > endTime) break;
        const price = params.data.price[i].value;
        const cash = params.data.cash[i].value;
        if (p1 == undefined) {
            p1 = price;
            p2 = price;
            p3 = price;
            c1 = cash;
            c2 = cash;
            c3 = cash;
        }
        if (price < p3) {
            if (dP < dpMax) {
                p2 = p3;
                dpMax = dP;
            }
            p3 = price;
            dP = 0;
        } else if (price > p3) {
            const _dP = +(p3 - price).toFixed(2);
            if (_dP < dP) dP = _dP;
        }
        if (price > p1 && dpMax < 0) break;
        //
        if (cash < c3) {
            if (dC < dcMax) {
                c2 = c3;
                dcMax = dC;
            }
            c3 = cash;
            dC = 0;
        } else if (cash > c3) {
            const _dC = +(c3 - cash).toFixed(2);
            if (_dC < dC) dC = _dC;
        }
    }
    return {
        price1: +(p2 - dpMax).toFixed(2),
        price2: +(p3 - dpMax).toFixed(2),
        cash1: +(c2 - dcMax).toFixed(1),
        cash2: +(c3 - dcMax).toFixed(1),
    };
}
function removeDownlpsTool(server = true) {
    if (mf.isSet(params.tools.downlps.P1)) {
        params.series.price.removePriceLine(params.tools.downlps.P1);
        params.series.price.removePriceLine(params.tools.downlps.P2);
    }
    if (mf.isSet(params.tools.downlps.C1)) {
        params.series.cash.removePriceLine(params.tools.downlps.C1);
        params.series.cash.removePriceLine(params.tools.downlps.C2);
    }
    params.tools.downlps = {
        P1: {},
        P2: {},
        C1: {},
        C2: {},
    };
    if (server)
        store.dispatch("tradingStock/drawTools", {
            isRemove: true,
            symbol: state.symbol,
            name: "downlps",
        });
}
function rangeToolClick(e) {
    state.showColorPicker = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        e.target.classList.add("selected");
        removeRangeTool();
    }
    e.stopPropagation();
}
function rangeToolContextmenu(e) {
    removeRangeTool();
    e.target.classList.remove("selected");
    e.preventDefault();
    e.stopPropagation();
}
function drawRangeTool() {
    let option = { time: params.crosshair.time, value: 1, color: "lime" };
    if (params.tools.range.length > 0) {
        option.color = "red";
        rangeToolRef.value.classList.remove("selected");
    }
    params.series.range.update(option);
    params.tools.range.push(option);
    stockDb.set("range", option);
}
function removeRangeTool() {
    params.tools.range = [];
    params.series.range.setData([]);
    stockDb.clear("range");
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
    store.dispatch("tradingStock/getChartData", state.symbol);
}
function listChanged(e) {
    state.symbolKind = e.value;
}
function filterSymbols() {
    if (params.tools.range.length == 2) {
        const param = {
            from: params.tools.range[0].time,
            to: params.tools.range[1].time,
            name: state.symbolKind.value,
        };
        store.dispatch("tradingStock/filterSymbols", param);
    } else toast.error(t("trading.stock.rangeWarning"));
}
function deleteWatchlist() {
    confirm(`${t("trading.stock.deleteWatchList")}?`, t("titles.confirm")).then(
        (result) => {
            if (result) store.dispatch("tradingStock/deleteWatchlist");
        }
    );
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
