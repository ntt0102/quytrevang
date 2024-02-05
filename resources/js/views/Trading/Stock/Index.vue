<template>
    <div class="content-block dx-card responsive-paddings">
        <div class="stock-container" ref="chartContainerRef">
            <div class="chart-wrapper" ref="chartRef">
                <div class="area data-area">
                    <input
                        ref="symbolRef"
                        type="text"
                        class="command symbol-input"
                        :title="$t('trading.stock.symbol')"
                        v-model="state.symbol"
                        @change="symbolChange"
                        @focus="symbolFocus"
                    />
                    <DxSelectBox
                        :data-source="['AAA', 'BBB', 'CCC']"
                        :input-attr="{ class: 'command' }"
                        value="AAA"
                        @optionChanged="optionChanged"
                        @keyUp="keyUp"
                        @keyDown="keyDown"
                    />
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
                        :title="$t('trading.orderChart.fullscreen')"
                        @click="toggleFullscreen"
                    ></div>
                    <div
                        ref="tradingviewRef"
                        class="command far fa-chart-bar"
                        :title="$t('trading.orderChart.tradingview')"
                        @click="tradingviewClick"
                    ></div>
                    <div
                        ref="colorToolRef"
                        class="color command far fa-palette"
                        :style="{ color: state.color }"
                        :title="$t('trading.orderChart.colorTool')"
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
                        :title="$t('trading.orderChart.lineTool')"
                        @click="lineToolClick"
                        @contextmenu="lineToolContextmenu"
                    ></div>
                    <div
                        ref="pattern1ToolRef"
                        class="command far fa-dot-circle"
                        :title="$t('trading.orderChart.pattern1Tool')"
                        @click="pattern1ToolClick"
                        @contextmenu="pattern1ToolContextmenu"
                    ></div>
                    <div
                        ref="uplpsToolRef"
                        class="command far fa-arrow-up"
                        :title="$t('trading.orderChart.uplpsTool')"
                        @click="uplpsToolClick"
                        @contextmenu="uplpsToolContextmenu"
                    ></div>
                    <div
                        ref="downlpsToolRef"
                        class="command far fa-arrow-down"
                        :title="$t('trading.orderChart.downlpsTool')"
                        @click="downlpsToolClick"
                        @contextmenu="downlpsToolContextmenu"
                    ></div>
                    <div
                        ref="rulerToolRef"
                        class="command far fa-line-height"
                        :title="$t('trading.orderChart.rulerTool')"
                        @click="rulerToolClick"
                        @contextmenu="rulerToolContextmenu"
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
import toolsStore from "../../../plugins/stockDb.js";
import { createChart } from "../../../plugins/lightweight-charts.esm.development";
import DxSelectBox from "devextreme-vue/select-box";
import {
    reactive,
    ref,
    inject,
    watch,
    onMounted,
    onUnmounted,
    computed,
} from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
const CHART_OPTIONS = {
    localization: { dateFormat: "dd/MM/yyyy", locale: "vi-VN" },
    rightPriceScale: {
        visible: true,
        scaleMargins: { top: 0.05, bottom: 0.4 },
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
const symbolRef = ref(null);
const spinnerRef = ref(null);
const fullscreenToolRef = ref(null);
const tradingviewRef = ref(null);
const colorToolRef = ref(null);
const lineToolRef = ref(null);
const rulerToolRef = ref(null);
const pattern1ToolRef = ref(null);
const uplpsToolRef = ref(null);
const downlpsToolRef = ref(null);
const tradingviewChartRef = ref(null);
let params = {
    chart: {},
    series: {},
    data: {
        whitespace: [],
        original: [],
        price: [],
        cash: [],
    },
    order: { side: 0, entry: {}, tp: {}, sl: {} },
    lines: [],
    ruler: {
        l0: {},
        ln1: {},
        l1: {},
        l2: {},
        l3: {},
        l4: {},
        // l5: {},
        pointCount: 0,
    },
    target: { A: {}, B: {}, C: {}, D: {} },
    pattern1: { A: {}, B: {}, C: {}, X1: {}, X2: {}, Y1: {}, Y2: {} },
    pattern2: { O: {} },
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
    // volprofile: { v1: {}, v2: {}, poc: {}, pointCount: 0 },
    box: [],
    alerts: [],
    crosshair: {},
    shark: null,
    loadWhitespace: true,
    interval: null,
    interval60: null,
    websocket: null,
    isAutoOrdering: false,
    socketStop: false,
    volumeMax: 0,
    socketRefreshTime: moment(),
};
const state = reactive({
    symbol: "VNINDEX",
    isFullscreen: false,
    color: "#F44336",
    showColorPicker: false,
    showTradingView: false,
});
const tradingViewSrc = computed(
    () => `https://chart.vps.com.vn/tv/?symbol=${state.symbol}`
);
toolsStore.create();

onMounted(() => {
    params.chart = createChart(chartRef.value, CHART_OPTIONS);
    chartContainerRef.value.addEventListener("click", eventChartClick);
    chartContainerRef.value.addEventListener(
        "contextmenu",
        eventChartContextmenu
    );
    params.chart.subscribeCrosshairMove(eventChartCrosshairMove);
    params.chart.subscribeCustomPriceLineDragged(eventPriceLineDrag);
    params.series.cash = params.chart.addLineSeries({
        priceScaleId: "cash",
        scaleMargins: { top: 0.61, bottom: 0.01 },
        color: "yellow",
        priceFormat: { minMove: 1 },
        lastValueVisible: false,
    });
    params.series.ohlc = params.chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
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
    store.dispatch("tradingStock/getChartData", state.symbol).then(() => {
        loadToolsData();
    });
});

watch(() => store.state.tradingStock.chartData, loadChartData);

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
    else if (rulerToolRef.value.classList.contains("selected")) drawRulerTool();
    else if (pattern1ToolRef.value.classList.contains("selected"))
        drawPattern1Tool();
    else if (uplpsToolRef.value.classList.contains("selected")) drawUplpsTool();
    else if (downlpsToolRef.value.classList.contains("selected"))
        drawDownlpsTool();
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
            toolsStore.set("line", {
                price: oldPrice,
                removed: true,
            });
            toolsStore.set("line", lineOptions);
            lineToolRef.value.classList.remove("selected");
            break;
        case "ruler":
            switch (lineOptions.point) {
                case "l0":
                    toolsStore.set("ruler", lineOptions);
                    if (params.ruler.pointCount == 2) {
                        const distance = +params.ruler.l1.options().title;

                        const ln1Price = +(newPrice - distance).toFixed(1);
                        params.ruler.ln1.applyOptions({ price: ln1Price });
                        toolsStore.set("ruler", params.ruler.ln1.options());
                        //
                        const l1Price = +(newPrice + distance).toFixed(1);
                        params.ruler.l1.applyOptions({ price: l1Price });
                        toolsStore.set("ruler", params.ruler.l1.options());
                        //
                        const l2Price = +(newPrice + distance * 2).toFixed(1);
                        params.ruler.l2.applyOptions({ price: l2Price });
                        toolsStore.set("ruler", params.ruler.l2.options());
                        //
                        const l3Price = +(newPrice + distance * 3).toFixed(1);
                        params.ruler.l3.applyOptions({ price: l3Price });
                        toolsStore.set("ruler", params.ruler.l3.options());
                        //
                        const l4Price = +(newPrice + distance * 4).toFixed(1);
                        params.ruler.l4.applyOptions({ price: l4Price });
                        toolsStore.set("ruler", params.ruler.l4.options());

                        // const l5Price = +(newPrice + distance * 5).toFixed(1);
                        // params.ruler.l5.applyOptions({ price: l5Price });
                        // toolsStore.set("ruler", params.ruler.l5.options());
                    }
                    break;
                case "ln1":
                    const l0PriceN1 = +params.ruler.l0.options().price;
                    const distanceN1 = newPrice - l0PriceN1;
                    line.applyOptions({ title: distanceN1.toFixed(1) });
                    toolsStore.set("ruler", line.options());
                    //
                    params.ruler.l1.applyOptions({
                        title: (-distanceN1).toFixed(1),
                        price: +(l0PriceN1 - distanceN1).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l1.options());
                    //
                    params.ruler.l2.applyOptions({
                        title: (-distanceN1 * 2).toFixed(1),
                        price: +(l0PriceN1 - distanceN1 * 2).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l2.options());
                    //
                    params.ruler.l3.applyOptions({
                        title: (-distanceN1 * 3).toFixed(1),
                        price: +(l0PriceN1 - distanceN1 * 3).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l3.options());
                    //
                    params.ruler.l4.applyOptions({
                        title: (-distanceN1 * 4).toFixed(1),
                        price: +(l0PriceN1 - distanceN1 * 4).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l4.options());
                    break;
                case "l1":
                    const l0Price1 = +params.ruler.l0.options().price;
                    const distance1 = newPrice - l0Price1;
                    line.applyOptions({ title: distance1.toFixed(1) });
                    toolsStore.set("ruler", line.options());
                    //
                    params.ruler.ln1.applyOptions({
                        title: (-distance1).toFixed(1),
                        price: +(l0Price1 - distance1).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.ln1.options());
                    //
                    params.ruler.l2.applyOptions({
                        title: (distance1 * 2).toFixed(1),
                        price: +(l0Price1 + distance1 * 2).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l2.options());
                    //
                    params.ruler.l3.applyOptions({
                        title: (distance1 * 3).toFixed(1),
                        price: +(l0Price1 + distance1 * 3).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l3.options());
                    //
                    params.ruler.l4.applyOptions({
                        title: (distance1 * 4).toFixed(1),
                        price: +(l0Price1 + distance1 * 4).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l4.options());
                    //
                    // params.ruler.l5.applyOptions({
                    //     title: (distance1 * 5).toFixed(1),
                    //     price: +(l0Price1 + distance1 * 5).toFixed(1),
                    // });
                    // toolsStore.set("ruler", params.ruler.l5.options());
                    break;
                case "l2":
                    const l0Price2 = +params.ruler.l0.options().price;
                    const distance2 = newPrice - l0Price2;
                    line.applyOptions({ title: distance2.toFixed(1) });
                    toolsStore.set("ruler", line.options());
                    //
                    params.ruler.ln1.applyOptions({
                        title: (-distance2 * 0.5).toFixed(1),
                        price: +(l0Price2 - distance2 * 0.5).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.ln1.options());
                    //
                    params.ruler.l1.applyOptions({
                        title: (distance2 * 0.5).toFixed(1),
                        price: +(l0Price2 + distance2 * 0.5).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l1.options());
                    //
                    params.ruler.l3.applyOptions({
                        title: (distance2 * 1.5).toFixed(1),
                        price: +(l0Price2 + distance2 * 1.5).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l3.options());
                    //
                    params.ruler.l4.applyOptions({
                        title: (distance2 * 2).toFixed(1),
                        price: +(l0Price2 + distance2 * 2).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l4.options());
                    //
                    //     params.ruler.l5.applyOptions({
                    //         title: (distance2 * 2.5).toFixed(1),
                    //         price: +(l0Price2 + distance2 * 2.5).toFixed(1),
                    //     });
                    //     toolsStore.set("ruler", params.ruler.l5.options());
                    break;
                case "l3":
                    const l0Price3 = +params.ruler.l0.options().price;
                    const distance3 = newPrice - l0Price3;
                    line.applyOptions({ title: distance3.toFixed(1) });
                    toolsStore.set("ruler", line.options());
                    //
                    params.ruler.ln1.applyOptions({
                        title: (-distance3 / 3).toFixed(1),
                        price: +(l0Price3 - distance3 / 3).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.ln1.options());
                    //
                    params.ruler.l1.applyOptions({
                        title: (distance3 / 3).toFixed(1),
                        price: +(l0Price3 + distance3 / 3).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l1.options());
                    //
                    params.ruler.l2.applyOptions({
                        title: ((distance3 * 2) / 3).toFixed(1),
                        price: +(l0Price3 + (distance3 * 2) / 3).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l2.options());
                    //
                    // params.ruler.l4.applyOptions({
                    //     title: ((distance3 * 4) / 3).toFixed(1),
                    //     price: +(l0Price3 + (distance3 * 4) / 3).toFixed(1),
                    // });
                    // toolsStore.set("ruler", params.ruler.l4.options());
                    // //
                    // params.ruler.l5.applyOptions({
                    //     title: ((distance3 * 5) / 3).toFixed(1),
                    //     price: +(l0Price3 + (distance3 * 5) / 3).toFixed(1),
                    // });
                    // toolsStore.set("ruler", params.ruler.l5.options());
                    break;
                case "l4":
                    const l0Price4 = +params.ruler.l0.options().price;
                    const distance4 = newPrice - l0Price4;
                    line.applyOptions({ title: distance4.toFixed(1) });
                    toolsStore.set("ruler", line.options());
                    //
                    params.ruler.ln1.applyOptions({
                        title: (-distance4 / 4).toFixed(1),
                        price: +(l0Price4 - distance4 / 4).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.ln1.options());
                    //
                    params.ruler.l1.applyOptions({
                        title: (distance4 / 4).toFixed(1),
                        price: +(l0Price4 + distance4 / 4).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l1.options());
                    //
                    params.ruler.l2.applyOptions({
                        title: (distance4 / 2).toFixed(1),
                        price: +(l0Price4 + distance4 / 2).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l2.options());
                    //
                    params.ruler.l3.applyOptions({
                        title: ((distance4 * 3) / 4).toFixed(1),
                        price: +(l0Price4 + (distance4 * 3) / 4).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l3.options());
                    //
                    // params.ruler.l5.applyOptions({
                    //     title: ((distance4 * 5) / 4).toFixed(1),
                    //     price: +(l0Price4 + (distance4 * 5) / 4).toFixed(1),
                    // });
                    // toolsStore.set("ruler", params.ruler.l5.options());
                    break;
                // case "l5":
                //     const l0Price5 = +params.ruler.l0.options().price;
                //     const distance5 = newPrice - l0Price5;
                //     line.applyOptions({ title: distance5.toFixed(1) });
                //     toolsStore.set("ruler", line.options());
                //     //
                //     params.ruler.l1.applyOptions({
                //         title: (distance5 / 5).toFixed(1),
                //         price: +(l0Price5 + distance5 / 5).toFixed(1),
                //     });
                //     toolsStore.set("ruler", params.ruler.l1.options());
                //     //
                //     params.ruler.l2.applyOptions({
                //         title: ((distance5 * 2) / 5).toFixed(1),
                //         price: +(l0Price5 + (distance5 * 2) / 5).toFixed(1),
                //     });
                //     toolsStore.set("ruler", params.ruler.l2.options());
                //     //
                //     params.ruler.l3.applyOptions({
                //         title: ((distance5 * 3) / 5).toFixed(1),
                //         price: +(l0Price5 + (distance5 * 3) / 5).toFixed(1),
                //     });
                //     toolsStore.set("ruler", params.ruler.l3.options());
                //     //
                //     params.ruler.l4.applyOptions({
                //         title: ((distance5 * 4) / 5).toFixed(1),
                //         price: +(l0Price5 + (distance5 * 4) / 5).toFixed(1),
                //     });
                //     toolsStore.set("ruler", params.ruler.l4.options());
                //     break;
            }
            break;
        case "pattern1":
            if (mf.isSet(params.pattern1.C)) {
                const a = +params.pattern1.A.options().price;
                const b = +params.pattern1.B.options().price;
                const ba = b - a;
                //
                params.pattern1.B.applyOptions({
                    title: ba.toFixed(1),
                });
                toolsStore.set("pattern1", params.pattern1.B.options());
                //
                params.pattern1.C.applyOptions({
                    price: +(a + 0.5 * ba).toFixed(1),
                    title: (0.5 * ba).toFixed(1),
                });
                toolsStore.set("pattern1", params.pattern1.C.options());
                //
                params.pattern1.X1.applyOptions({
                    price: +(a - 0.375 * ba).toFixed(1),
                    title: (-0.375 * ba).toFixed(1),
                });
                toolsStore.set("pattern1", params.pattern1.X1.options());
                //
                params.pattern1.X2.applyOptions({
                    price: +(a - 0.5 * ba).toFixed(1),
                    title: (-0.5 * ba).toFixed(1),
                });
                toolsStore.set("pattern1", params.pattern1.X2.options());
                //
                params.pattern1.Y1.applyOptions({
                    price: +(a - ba).toFixed(1),
                    title: -ba.toFixed(1),
                });
                toolsStore.set("pattern1", params.pattern1.Y1.options());
                //
                params.pattern1.Y2.applyOptions({
                    price: +(a - 2 * ba).toFixed(1),
                    title: (-2 * ba).toFixed(1),
                });
                toolsStore.set("pattern1", params.pattern1.Y2.options());
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
function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
}
function loadToolsData() {
    return new Promise(async (resolve) => {
        const lines = await toolsStore.get("line");
        lines.forEach((line) => {
            if (!line.removed)
                params.lines.push(params.series.price.createPriceLine(line));
        });
        //
        const rulerLines = await toolsStore.get("ruler");
        if (rulerLines.length > 0) {
            params.ruler.pointCount = rulerLines.length > 1 ? 2 : 1;
            rulerLines.forEach((line) => {
                params.ruler[line.point] =
                    params.series.price.createPriceLine(line);
            });
        }
        //
        const pattern1Lines = await toolsStore.get("pattern1");
        if (pattern1Lines.length > 0) {
            pattern1Lines.forEach((line) => {
                params.pattern1[line.point] =
                    params.series.price.createPriceLine(line);
            });
        }
        //
        const uplpsLines = await toolsStore.get("uplps");
        if (uplpsLines.length > 0) {
            uplpsLines.forEach((line) => {
                params.uplps[line.title] =
                    params.series[
                        line.title.includes("P") ? "price" : "cash"
                    ].createPriceLine(line);
            });
        }
        //
        const downlpsLines = await toolsStore.get("downlps");
        if (downlpsLines.length > 0) {
            downlpsLines.forEach((line) => {
                params.downlps[line.title] =
                    params.series[
                        line.title.includes("P") ? "price" : "cash"
                    ].createPriceLine(line);
            });
        }
        resolve();
    });
}
function loadChartData() {
    params.data = store.state.tradingStock.chartData;
    params.series.ohlc.setData(params.data.ohlc);
    params.series.price.setData(params.data.price);
    params.series.cash.setData(params.data.cash);
    params.chart.applyOptions({ watermark: { text: state.symbol } });
    symbolRef.value.blur();
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
    if (mf.isSet(params.pattern1.X)) {
        drawLineTool(+params.pattern1.X.options().price);
        drawLineTool(+params.pattern1.Y.options().price);
        drawLineTool(+params.pattern1.Z.options().price);
        drawLineTool(+params.pattern1.T.options().price);
    }
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
    const oldLength = params.lines.length;
    params.lines = params.lines.filter((line) => {
        const ops = line.options();
        const isExist = (ops.type = TYPE && price == +ops.price);
        if (isExist) {
            params.series.price.removePriceLine(line);
            toolsStore.set("line", { price: price, removed: true });
        }
        return !isExist;
    });
    if ((params.lines.length == oldLength && !forceRemove) || forceDraw) {
        const options = {
            lineType: TYPE,
            price: price,
            color: state.color,
            lineWidth: 1,
            lineStyle: 1,
            draggable: true,
        };
        params.lines.push(params.series.price.createPriceLine(options));
        toolsStore.set("line", options);
    }
    lineToolRef.value.classList.remove("selected");
}
function removeLineTool() {
    params.lines.forEach((line) => params.series.price.removePriceLine(line));
    params.lines = [];
    toolsStore.clear("line");
}
function rulerToolClick(e) {
    state.showColorPicker = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        e.target.classList.add("selected");
        removeRulerTool();
    }
    e.stopPropagation();
}
function rulerToolContextmenu(e) {
    removeRulerTool();
    e.target.classList.remove("selected");
    e.preventDefault();
    e.stopPropagation();
}
function drawRulerTool() {
    const price = coordinateToPrice(params.crosshair.y);
    let options = {
        lineType: "ruler",
        price: price,
        lineWidth: 1,
        lineStyle: 1,
        draggable: true,
    };
    if (params.ruler.pointCount == 0) {
        options.point = "l0";
        options.color = "#F44336";
        options.title = "0";
        params.ruler[options.point] =
            params.series.price.createPriceLine(options);
        params.ruler.pointCount++;
        toolsStore.set("ruler", options);
    } else {
        const l0Price = +params.ruler.l0.options().price;

        const distance1 = price - l0Price;
        options.point = "l1";
        options.color = "#FF9800";
        options.title = distance1.toFixed(1);
        params.ruler[options.point] =
            params.series.price.createPriceLine(options);
        toolsStore.set("ruler", options);
        //
        const distanceN1 = -distance1;
        options.point = "ln1";
        options.color = "#FF9800";
        options.title = distanceN1.toFixed(1);
        options.price = +(l0Price + distanceN1).toFixed(1);
        params.ruler[options.point] =
            params.series.price.createPriceLine(options);
        toolsStore.set("ruler", options);
        //
        const distance2 = 2 * distance1;
        options.point = "l2";
        options.color = "#FFEB3B";
        options.title = distance2.toFixed(1);
        options.price = +(l0Price + distance2).toFixed(1);
        params.ruler[options.point] =
            params.series.price.createPriceLine(options);
        toolsStore.set("ruler", options);

        const distance3 = 3 * distance1;
        options.point = "l3";
        options.color = "#4CAF50";
        options.title = distance3.toFixed(1);
        options.price = +(l0Price + distance3).toFixed(1);
        params.ruler[options.point] =
            params.series.price.createPriceLine(options);
        toolsStore.set("ruler", options);

        const distance4 = 4 * distance1;
        options.point = "l4";
        options.color = "#009688";
        options.title = distance4.toFixed(1);
        options.price = +(l0Price + distance4).toFixed(1);
        params.ruler[options.point] =
            params.series.price.createPriceLine(options);
        toolsStore.set("ruler", options);

        // const distance5 = 5 * distance1;
        // options.point = "l5";
        // options.color = "#00BCD4";
        // options.title = distance5.toFixed(1);
        // options.price = +(l0Price + distance5).toFixed(1);
        // params.ruler[options.point] =
        //     params.series.price.createPriceLine(options);
        // toolsStore.set("ruler", options);

        params.ruler.pointCount++;
        rulerToolRef.value.classList.remove("selected");
    }
}
function removeRulerTool() {
    if (params.ruler.pointCount > 0) {
        params.series.price.removePriceLine(params.ruler.l0);
        if (params.ruler.pointCount > 1) {
            params.series.price.removePriceLine(params.ruler.ln1);
            params.series.price.removePriceLine(params.ruler.l1);
            params.series.price.removePriceLine(params.ruler.l2);
            params.series.price.removePriceLine(params.ruler.l3);
            params.series.price.removePriceLine(params.ruler.l4);
            // params.series.price.removePriceLine(params.ruler.l5);
        }
        //
        params.ruler = {
            l0: {},
            ln1: {},
            l1: {},
            l2: {},
            l3: {},
            l4: {},
            // l5: {},
            pointCount: 0,
        };
        toolsStore.clear("ruler");
    }
}
function pattern1ToolClick(e) {
    state.showColorPicker = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        e.target.classList.add("selected");
        removePattern1Tool();
    }
    e.stopPropagation();
}
function pattern1ToolContextmenu(e) {
    removePattern1Tool();
    e.target.classList.remove("selected");
    e.preventDefault();
    e.stopPropagation();
}
function drawPattern1Tool() {
    const price = coordinateToPrice(params.crosshair.y);
    let option = {
        lineType: "pattern1",
        price: price,
        lineWidth: 1,
        lineStyle: 1,
        draggable: true,
    };
    if (mf.isSet(params.pattern1.A)) {
        const a = +params.pattern1.A.options().price;
        const ba = price - a;
        option.point = "B";
        option.title = ba.toFixed(1);
        option.color = "#FF9800";
        params.pattern1[option.point] =
            params.series.price.createPriceLine(option);
        toolsStore.set("pattern1", option);
        //
        option.point = "C";
        option.price = +(a + 0.5 * ba).toFixed(1);
        option.title = (0.5 * ba).toFixed(1);
        option.color = "#FF9800";
        option.draggable = false;
        params.pattern1[option.point] =
            params.series.price.createPriceLine(option);
        toolsStore.set("pattern1", option);
        //
        option.point = "X1";
        option.price = +(a - 0.375 * ba).toFixed(1);
        option.title = (-0.375 * ba).toFixed(1);
        option.color = "#2196F3";
        params.pattern1[option.point] =
            params.series.price.createPriceLine(option);
        toolsStore.set("pattern1", option);
        //
        option.point = "X2";
        option.price = +(a - 0.5 * ba).toFixed(1);
        option.title = (-0.5 * ba).toFixed(1);
        option.color = "#2196F3";
        params.pattern1[option.point] =
            params.series.price.createPriceLine(option);
        toolsStore.set("pattern1", option);
        //
        option.point = "Y1";
        option.price = +(a - ba).toFixed(1);
        option.title = -ba.toFixed(1);
        option.color = "#673AB7";
        params.pattern1[option.point] =
            params.series.price.createPriceLine(option);
        toolsStore.set("pattern1", option);
        //
        option.point = "Y2";
        option.price = +(a - 2 * ba).toFixed(1);
        option.title = (-2 * ba).toFixed(1);
        option.color = "#673AB7";
        params.pattern1[option.point] =
            params.series.price.createPriceLine(option);
        toolsStore.set("pattern1", option);
        //
        pattern1ToolRef.value.classList.remove("selected");
    } else {
        option.point = "A";
        option.title = "0";
        option.color = "#FF9800";
        params.pattern1[option.point] =
            params.series.price.createPriceLine(option);
        toolsStore.set("pattern1", option);
    }
}
function removePattern1Tool() {
    if (mf.isSet(params.pattern1.A)) {
        params.series.price.removePriceLine(params.pattern1.A);
        if (mf.isSet(params.pattern1.B)) {
            params.series.price.removePriceLine(params.pattern1.B);
            params.series.price.removePriceLine(params.pattern1.C);
            params.series.price.removePriceLine(params.pattern1.X1);
            params.series.price.removePriceLine(params.pattern1.X2);
            params.series.price.removePriceLine(params.pattern1.Y1);
            params.series.price.removePriceLine(params.pattern1.Y2);
        }
        params.pattern1 = {
            A: {},
            B: {},
            C: {},
            X1: {},
            X2: {},
            Y1: {},
            Y2: {},
        };
        toolsStore.clear("pattern1");
    }
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
    if (mf.isSet(params.uplps.P1)) {
        startTime = +params.uplps.P1.options().startTime;
        endTime = params.crosshair.time;
        removeUplpsTool();
    } else startTime = params.crosshair.time;
    const { price1, price2, cash1, cash2 } = findUplps(startTime, endTime);
    let option = {
        lineWidth: 1,
        lineStyle: 1,
        color: "#009688",
        draggable: false,
    };
    option.startTime = startTime;
    option.price = price1;
    option.title = "P1";
    params.uplps[option.title] = params.series.price.createPriceLine(option);
    toolsStore.set("uplps", option);
    //
    option.price = price2;
    option.title = "P2";
    params.uplps[option.title] = params.series.price.createPriceLine(option);
    toolsStore.set("uplps", option);
    //
    option.price = cash1;
    option.title = "C1";
    params.uplps[option.title] = params.series.cash.createPriceLine(option);
    toolsStore.set("uplps", option);
    //
    option.price = cash2;
    option.title = "C2";
    params.uplps[option.title] = params.series.cash.createPriceLine(option);
    toolsStore.set("uplps", option);
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
            const _dP = +(p3 - price).toFixed(1);
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
            const _dC = +(c3 - cash).toFixed(1);
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
function removeUplpsTool() {
    if (mf.isSet(params.uplps.P1)) {
        params.series.price.removePriceLine(params.uplps.P1);
        params.series.price.removePriceLine(params.uplps.P2);
    }
    if (mf.isSet(params.uplps.C1)) {
        params.series.cash.removePriceLine(params.uplps.C1);
        params.series.cash.removePriceLine(params.uplps.C2);
    }
    params.uplps = {
        P1: {},
        P2: {},
        C1: {},
        C2: {},
    };
    toolsStore.clear("uplps");
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
    if (mf.isSet(params.downlps.P1)) {
        startTime = +params.downlps.P1.options().startTime;
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
    option.startTime = startTime;
    option.price = price1;
    option.title = "P1";
    params.downlps[option.title] = params.series.price.createPriceLine(option);
    toolsStore.set("downlps", option);
    //
    option.price = price2;
    option.title = "P2";
    params.downlps[option.title] = params.series.price.createPriceLine(option);
    toolsStore.set("downlps", option);
    //
    option.price = cash1;
    option.title = "C1";
    params.downlps[option.title] = params.series.cash.createPriceLine(option);
    toolsStore.set("downlps", option);
    //
    option.price = cash2;
    option.title = "C2";
    params.downlps[option.title] = params.series.cash.createPriceLine(option);
    toolsStore.set("downlps", option);
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
            const _dP = +(p3 - price).toFixed(1);
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
            const _dC = +(c3 - cash).toFixed(1);
            if (_dC < dC) dC = _dC;
        }
    }
    return {
        price1: +(p2 - dpMax).toFixed(1),
        price2: +(p3 - dpMax).toFixed(1),
        cash1: +(c2 - dcMax).toFixed(1),
        cash2: +(c3 - dcMax).toFixed(1),
    };
}
function removeDownlpsTool() {
    if (mf.isSet(params.downlps.P1)) {
        params.series.price.removePriceLine(params.downlps.P1);
        params.series.price.removePriceLine(params.downlps.P2);
    }
    if (mf.isSet(params.downlps.C1)) {
        params.series.cash.removePriceLine(params.downlps.C1);
        params.series.cash.removePriceLine(params.downlps.C2);
    }
    params.downlps = {
        P1: {},
        P2: {},
        C1: {},
        C2: {},
    };
    toolsStore.clear("downlps");
}
function coordinateToPrice(y, name = "price") {
    return formatPrice(params.series[name].coordinateToPrice(y));
}
function formatPrice(price) {
    if (!price) return 0;
    return +(+price.toFixed(1));
}
function symbolChange(e) {
    if (state.symbol == "") return false;
    state.symbol = state.symbol.toUpperCase();
    store.dispatch("tradingStock/getChartData", state.symbol);
}
function symbolFocus(e) {
    e.target.select();
}
function optionChanged() {
    console.log("optionChanged");
}
function keyDown() {
    console.log("keyDown");
}
function keyUp() {
    console.log("keyUp");
}
</script>
<style lang="scss" scoped>
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

            .symbol-input {
                width: 80px;
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
