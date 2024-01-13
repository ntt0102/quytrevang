<template>
    <div class="content-block dx-card responsive-paddings">
        <DxToolbar
            :items="[
                {
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-flag-checkered small',
                        hint: $t('trading.orderChart.buttons.report'),
                        onClick: report,
                    },
                },
                {
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-file-export small',
                        hint: $t('trading.orderChart.buttons.export'),
                        onClick: exportCsv,
                    },
                },
                {
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-chart-line small',
                        hint: $t('trading.orderChart.buttons.cashflow'),
                        onClick: () => $refs.dailyCashFlowPopupRef.show(),
                    },
                },
            ]"
        />
        <div class="order-chart-container" ref="chartContainerRef">
            <div class="chart-wrapper" ref="orderChartRef">
                <div class="area data-area">
                    <div
                        ref="connectionRef"
                        :class="`command far fa-${
                            status.connection ? 'link' : 'unlink'
                        }`"
                        :title="$t('trading.orderChart.connection')"
                        @click="() => $store.dispatch('tradingOrder/getStatus')"
                    ></div>
                    <div
                        class="command status"
                        :class="{
                            green: status.position > 0,
                            red: status.position < 0,
                            pending: status.pending,
                        }"
                        :title="$t('trading.orderChart.position')"
                        @click="getAccountInfo"
                    >
                        {{ status.position }}
                    </div>
                    <div class="command clock" @click="refreshChart">
                        {{ state.clock }}
                    </div>
                    <input
                        type="date"
                        class="chart-date command"
                        :title="$t('trading.orderChart.date')"
                        v-model="state.chartDate"
                        @change="dateSelectChange"
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
                        ref="reloadToolRef"
                        class="command far fa-sync-alt"
                        :title="$t('trading.orderChart.reload')"
                        @click="resetChart"
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
                        v-show="true"
                        ref="pattern2ToolRef"
                        class="command far fa-heart"
                        :title="$t('trading.orderChart.pattern2Tool')"
                        @click="pattern2ToolClick"
                        @contextmenu="pattern2ToolContextmenu"
                    ></div>
                    <div
                        ref="rulerToolRef"
                        class="command far fa-line-height"
                        :title="$t('trading.orderChart.rulerTool')"
                        @click="rulerToolClick"
                        @contextmenu="rulerToolContextmenu"
                    ></div>
                    <div
                        ref="targetToolRef"
                        class="command far fa-grip-lines"
                        :title="$t('trading.orderChart.targetTool')"
                        @click="targetToolClick"
                        @contextmenu="targetToolContextmenu"
                    ></div>
                    <div
                        ref="boxToolRef"
                        class="command far fa-expand-alt"
                        :title="$t('trading.orderChart.boxTool')"
                        @click="boxToolClick"
                        @contextmenu="boxToolContextmenu"
                    ></div>
                    <div
                        v-show="false"
                        ref="alertToolRef"
                        class="command far fa-alarm-exclamation"
                        :title="$t('trading.orderChart.alertTool')"
                        @click="alertToolClick"
                        @contextmenu="alertToolContextmenu"
                    ></div>
                    <div
                        v-show="false"
                        class="command far fa-info-circle"
                        :title="
                            $t('trading.orderChart.copyistStatusPopup.title')
                        "
                        @click="() => $refs.copyistStatusPopupRef.show()"
                    ></div>
                    <div
                        ref="cancelOrderRef"
                        class="cancel-order command far fa-trash-alt"
                        :title="$t('trading.orderChart.cancelTool')"
                        @click="cancelOrderClick"
                    ></div>
                </div>
                <div>
                    <div
                        ref="entryOrderRef"
                        class="order-button entry"
                        @click="entryOrderClick"
                    >
                        Entry
                    </div>
                    <div
                        ref="tpslOrderRef"
                        class="order-button tpsl"
                        @click="tpslOrderClick"
                    >
                        TP/SL
                    </div>
                    <div
                        class="chart-top command far fa-angle-double-right"
                        @click="chartTopClick"
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
    <CopyistStatusPopup ref="copyistStatusPopupRef" />
    <DailyCashFlowPopup ref="dailyCashFlowPopupRef" />
</template>

<script setup>
import CopyistStatusPopup from "./CopyistStatusPopup.vue";
import DailyCashFlowPopup from "./DailyCashFlowPopup.vue";
import ColorPicker from "./ColorPicker.vue";
import toolsStore from "../../../plugins/orderChartDb.js";
import { createChart } from "../../../plugins/lightweight-charts.esm.development";
import { alert } from "devextreme/ui/dialog";
import { confirm } from "devextreme/ui/dialog";
import sound from "../../../../audios/alert.mp3";
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
        timeVisible: true,
        rightOffset: 20,
        minBarSpacing: 0.01,
    },
};
const TP_DEFAULT = 3;
const SL_DEFAULT = 2;
const CURRENT_DATE = moment().format("YYYY-MM-DD");
const TIME = {
    START: moment(CURRENT_DATE + " 08:45:00").unix(),
    ATO: moment(CURRENT_DATE + " 09:00:00").unix(),
    ATC: moment(CURRENT_DATE + " 14:30:00").unix(),
    END: moment(CURRENT_DATE + " 14:45:00").unix(),
};
const SOCKET_ENDPOINT =
    "wss://datafeed.vps.com.vn/socket.io/?EIO=3&transport=websocket";
const SOCKET_REFRESH_PERIOD = 120;

const store = useStore();
const route = useRoute();
const { t } = useI18n();
const devices = inject("devices");
const mf = inject("mf");
const bus = inject("bus");
const filters = inject("filters");
const chartContainerRef = ref(null);
const orderChartRef = ref(null);
const connectionRef = ref(null);
const spinnerRef = ref(null);
const fullscreenToolRef = ref(null);
const reloadToolRef = ref(null);
const tradingviewRef = ref(null);
const colorToolRef = ref(null);
const lineToolRef = ref(null);
const rulerToolRef = ref(null);
const targetToolRef = ref(null);
const pattern1ToolRef = ref(null);
const pattern2ToolRef = ref(null);
const alertToolRef = ref(null);
const boxToolRef = ref(null);
const cancelOrderRef = ref(null);
const entryOrderRef = ref(null);
const tpslOrderRef = ref(null);
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
    chartDate: route.query.date ?? CURRENT_DATE,
    clock: moment().format("HH:mm:ss"),
    isFullscreen: false,
    color: "#F44336",
    showColorPicker: false,
    showTradingView: false,
});
const status = computed(() => store.state.tradingOrder.status);
const tradingViewSrc = computed(() => {
    return `https://chart.vps.com.vn/tv/?loadLastChart=true&symbol=VN30F1M&u=${store.state.tradingOrder.config.vpsCode}&s=${store.state.tradingOrder.config.vpsSession}&resolution=1`;
});

store.dispatch("tradingOrder/getConfig").then(() => {
    connectSocket();
    // params.series.volume.createPriceLine({
    //     price: store.state.tradingOrder.config.volLimit,
    //     color: "yellow",
    //     lineWidth: 1,
    //     lineStyle: 1,
    //     axisLabelVisible: false,
    //     draggable: false,
    // });
    // params.volumeMax = store.state.tradingOrder.config.volLimit;
});
store.dispatch("tradingOrder/getStatus");

params.interval = setInterval(intervalHandler, 1000);
params.interval60 = setInterval(
    () => store.dispatch("tradingOrder/getStatus"),
    60000
);
toolsStore.create();

onMounted(() => {
    params.chart = createChart(orderChartRef.value, CHART_OPTIONS);
    chartContainerRef.value.addEventListener("click", eventChartClick);
    chartContainerRef.value.addEventListener(
        "contextmenu",
        eventChartContextmenu
    );
    params.chart.subscribeCrosshairMove(eventChartCrosshairMove);
    params.chart.subscribeCustomPriceLineDragged(eventPriceLineDrag);
    params.series.whitespace = params.chart.addLineSeries({
        priceScaleId: "whitespace",
        visible: false,
    });
    // params.series.signal = params.chart.addHistogramSeries({
    //     priceScaleId: "signal",
    //     scaleMargins: { top: 0, bottom: 0 },
    //     color: "#673AB7",
    //     lastValueVisible: false,
    //     priceLineVisible: false,
    //     visible: false,
    // });
    params.series.box = params.chart.addHistogramSeries({
        priceScaleId: "box",
        scaleMargins: { top: 0, bottom: 0 },
        color: "#2196F3",
        lastValueVisible: false,
        priceLineVisible: false,
    });
    // params.series.volprofile = params.chart.addHistogramSeries({
    //     priceScaleId: "volprofile",
    //     scaleMargins: { top: 0, bottom: 0 },
    //     color: "#673AB7",
    //     lastValueVisible: false,
    //     priceLineVisible: false,
    //     visible: false,
    // });
    // params.series.volume = params.chart.addHistogramSeries({
    //     priceScaleId: "volume",
    //     scaleMargins: { top: 0.95, bottom: 0 },
    //     color: "#CCCCCC",
    //     lastValueVisible: false,
    //     priceLineVisible: false,
    //     visible: false,
    // });
    // params.series.spread = params.chart.addHistogramSeries({
    //     priceScaleId: "spread",
    //     scaleMargins: { top: 0, bottom: 0.95 },
    //     color: "#CCCCCC",
    //     lastValueVisible: false,
    //     priceLineVisible: false,
    //     visible: false,
    // });
    params.series.cash = params.chart.addLineSeries({
        priceScaleId: "cash",
        scaleMargins: { top: 0.61, bottom: 0.01 },
        color: "yellow",
        lastValueVisible: false,
    });
    params.series.price = params.chart.addLineSeries({
        color: "#CCCCCC",
        priceFormat: { minMove: 0.1 },
    });
    new ResizeObserver(eventChartResize).observe(chartContainerRef.value);
    document.addEventListener("keydown", eventKeyPress);
    document.addEventListener("fullscreenchange", eventFullscreenChange);
    store.dispatch("tradingOrder/getChartData", state.chartDate).then(() => {
        loadToolsData();
    });
});
onUnmounted(() => {
    clearInterval(params.interval);
    clearInterval(params.interval60);
    params.socketStop = true;
    params.websocket.close();
    params.websocket = null;
});

watch(() => store.state.tradingOrder.chartData, loadChartData);

watch(
    () => store.state.tradingOrder.isChartLoading,
    (value) => {
        spinnerRef.value.style.display = value ? "block" : "none";
    }
);

function eventChartContextmenu(e) {
    showOrderButton();
    e.preventDefault();
}
function eventChartClick() {
    hideOrderButton();
    if (lineToolRef.value.classList.contains("selected")) drawLineTool();
    else if (rulerToolRef.value.classList.contains("selected")) drawRulerTool();
    else if (targetToolRef.value.classList.contains("selected"))
        drawTargetTool();
    else if (boxToolRef.value.classList.contains("selected")) drawBoxTool();
    else if (pattern1ToolRef.value.classList.contains("selected"))
        drawPattern1Tool();
    else if (pattern2ToolRef.value.classList.contains("selected"))
        drawPattern2Tool();
    else if (alertToolRef.value.classList.contains("selected")) drawAlertTool();
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
        case "order":
            if (newPrice != oldPrice) {
                let isChanged = false;
                if (lineOptions.kind == "entry") {
                    if (!status.value.position) {
                        isChanged = true;
                        params.order[lineOptions.kind].price = newPrice;
                        store
                            .dispatch("tradingOrder/executeOrder", {
                                action: "entry",
                                data: {
                                    cmd: "change",
                                    price: params.order.entry.price,
                                },
                            })
                            .then((resp) => {
                                if (resp.isOk) {
                                    drawOrderLine(lineOptions.kind);
                                    toast.success(
                                        t(
                                            "trading.orderChart.changeEntrySuccess"
                                        )
                                    );
                                } else {
                                    line.applyOptions({
                                        price: oldPrice,
                                    });
                                    toastOrderError(resp.message);
                                }
                            });
                    }
                } else {
                    isChanged = true;
                    params.order[lineOptions.kind].price = newPrice;
                    if (lineOptions.kind == "tp")
                        store
                            .dispatch("tradingOrder/executeOrder", {
                                action: "tp",
                                data: {
                                    cmd: "change",
                                    price: params.order.tp.price,
                                },
                            })
                            .then((resp) => {
                                if (resp.isOk) {
                                    drawOrderLine(lineOptions.kind);
                                    toast.success(
                                        t("trading.orderChart.changeTpSuccess")
                                    );
                                } else {
                                    line.applyOptions({
                                        price: oldPrice,
                                    });
                                    toastOrderError(resp.message);
                                }
                            });
                    else
                        store
                            .dispatch("tradingOrder/executeOrder", {
                                action: "sl",
                                data: {
                                    cmd: "change",
                                    price: params.order.sl.price,
                                },
                            })
                            .then((resp) => {
                                if (resp.isOk) {
                                    drawOrderLine(lineOptions.kind);
                                    toast.success(
                                        t("trading.orderChart.changeSlSuccess")
                                    );
                                } else {
                                    line.applyOptions({
                                        price: oldPrice,
                                    });
                                    toastOrderError(resp.message);
                                }
                            });
                }
                //
                if (!isChanged) {
                    line.applyOptions({ price: oldPrice });
                    toast.show(t("trading.orderChart.noChangeOrderLine"));
                }
            }
            break;
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
        case "pattern2":
            if (mf.isSet(params.pattern2.T)) {
                const opsE = params.pattern2.E.options();
                const price1 = +opsE.price1;
                const price2 = +opsE.price2;
                const price3 = +opsE.price3;
                const price4 = +opsE.price4;
                const price5 = +opsE.price;

                const d32 = price3 - price2;
                const d14 = price1 - price4;
                const d34 = price3 - price4;
                const d54 = price5 - price4;
                let d56, price6;
                if (lineOptions.point == "S") {
                    price6 = +params.pattern2.S.options().price;
                    d56 = price5 - price6;
                } else {
                    d56 = Math.abs(d32) > Math.abs(d54 / 2) ? d32 : d54 / 2;
                    price6 = price5 - d56;
                    params.pattern2.S.applyOptions({
                        price: +price6.toFixed(1),
                    });
                }
                const price7 =
                    price6 +
                    (Math.abs(d54) > Math.abs(d34)
                        ? Math.abs(d54) > Math.abs(d14)
                            ? 1
                            : 1.5
                        : 2) *
                        d54;
                const d75 = price7 - price5;

                params.pattern2.S.applyOptions({
                    title: `SL=${(-d56).toFixed(1)}`,
                });
                toolsStore.set("pattern2", params.pattern2.S.options());
                //
                params.pattern2.E.applyOptions({
                    title: `RR=${(d75 / d56).toFixed(1)}`,
                });
                toolsStore.set("pattern2", params.pattern2.E.options());
                //
                params.pattern2.T.applyOptions({
                    price: +price7.toFixed(1),
                    title: `TP=${d75.toFixed(1)}`,
                });
                toolsStore.set("pattern2", params.pattern2.T.options());
            }
            break;
        case "alert":
            toolsStore.set("alert", {
                price: oldPrice,
                removed: true,
            });
            const currentPrice = params.data.price.slice(-1)[0].value;
            let title = newPrice >= currentPrice ? ">" : "<";
            line.applyOptions({ title: title });
            toolsStore.set("alert", line.options());
            alertToolRef.value.classList.remove("selected");
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
            case 38:
                params.chart.timeScale().applyOptions({
                    barSpacing:
                        params.chart.options().timeScale.barSpacing + 0.05,
                });
                break;
            case 40:
                params.chart.timeScale().applyOptions({
                    barSpacing:
                        params.chart.options().timeScale.barSpacing - 0.05,
                });
                break;
            case 37:
                params.chart
                    .timeScale()
                    .scrollToPosition(
                        params.chart.timeScale().scrollPosition() - 10
                    );
                break;
            case 39:
                params.chart
                    .timeScale()
                    .scrollToPosition(
                        params.chart.timeScale().scrollPosition() + 10
                    );
                break;
            case 96:
                rulerToolRef.value.click();
                break;
            case 97:
                lineToolRef.value.click();
                break;
            case 98:
                reloadToolRef.value.click();
                break;
            case 99:
                fullscreenToolRef.value.click();
            case 100:
                tradingviewRef.value.click();
                break;
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
        if (status.value.pending) {
            const order = await toolsStore.get("order");
            order.map((item) => {
                params.order.side = item.side;
                params.order[item.kind].price = item.price;
                drawOrderLine(item.kind);
                toggleCancelOrderButton(true);
            });
            if (params.order.tp.hasOwnProperty("line"))
                params.order.entry.line.applyOptions({
                    draggable: false,
                });
        }
        //
        const lines = await toolsStore.get("line");
        lines.forEach((line) => {
            if (!line.removed)
                params.lines.push(params.series.price.createPriceLine(line));
        });
        //
        const boxs = await toolsStore.get("box");
        if (boxs.length == 4) {
            params.box = boxs;
            boxs.forEach((box, i) => {
                params.series.box.update(box.x);
                params.box[i].y = params.series.cash.createPriceLine(box.y);
            });
        }
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
        const targetLines = await toolsStore.get("target");
        if (targetLines.length > 0) {
            targetLines.forEach((line) => {
                params.target[line.point] =
                    params.series.cash.createPriceLine(line);
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
        const pattern2Lines = await toolsStore.get("pattern2");
        if (pattern2Lines.length > 0) {
            pattern2Lines.forEach((line) => {
                params.pattern2[line.point] =
                    params.series.price.createPriceLine(line);
            });
        }
        //
        const alerts = await toolsStore.get("alert");
        alerts.forEach((alert) => {
            if (!alert.removed)
                params.alerts.push(params.series.price.createPriceLine(alert));
        });
        //
        resolve();
    });
}
function loadChartData() {
    if (params.loadWhitespace) {
        if (store.state.tradingOrder.chartData.length > 0) {
            params.data.whitespace = mergeChartData(
                params.data.whitespace,
                createWhitespaceData()
            );
        }
        params.series.whitespace.setData(params.data.whitespace);
        params.loadWhitespace = false;
    }

    params.data.original = mergeChartData(
        store.state.tradingOrder.chartData,
        params.data.original
    );

    let data = params.data.original.reduce(
        (c, d) => {
            let lastPrice = d.price,
                lastCash = 0;
            if (c.price.length > 0) {
                lastPrice = c.price.slice(-1)[0].value;
                lastCash = c.cash.slice(-1)[0].value;
            }
            const change = d.price - lastPrice;
            const side = change > 0 ? 1 : change < 0 ? -1 : 0;
            c.price.push({ time: d.time, value: d.price });
            c.cash.push({
                time: d.time,
                value: lastCash + side * d.volume,
            });
            return c;
        },
        {
            price: [],
            cash: [],
        }
    );

    params.data.price = data.price;
    params.series.price.setData(data.price);
    //
    params.data.cash = data.cash;
    params.series.cash.setData(data.cash);
}
function updateChartData(d) {
    const prevLength = params.data.original.length;
    params.data.original = mergeChartData(params.data.original, [d]);
    if (params.data.original.length > prevLength) {
        const lastPrice = params.data.price.slice(-1)[0].value;
        const lastCash = params.data.cash.slice(-1)[0].value;
        const change = d.price - lastPrice;
        const side = change > 0 ? 1 : change < 0 ? -1 : 0;
        params.data.price.push({ time: d.time, value: d.price });
        params.series.price.setData(params.data.price);
        params.data.cash.push({
            time: d.time,
            value: lastCash + side * d.volume,
        });
        params.series.cash.setData(params.data.cash);
    }
}
function createWhitespaceData() {
    const date = state.chartDate;
    const amStart = moment(`${date} 09:00:00`).unix();
    const amEnd = moment(`${date} 11:30:00`).unix();
    const pmStart = moment(`${date} 13:00:00`).unix();
    const pmEnd = moment(`${date} 14:30:00`).unix();
    let data = [],
        sec;
    for (sec = amStart; sec <= amEnd; sec++) {
        data.push({ time: sec + 7 * 60 * 60 });
    }
    for (sec = pmStart; sec <= pmEnd; sec++) {
        data.push({ time: sec + 7 * 60 * 60 });
    }
    return data;
}
function mergeChartData(data1, data2) {
    return Array.from(
        new Map(
            [...data1, ...data2]
                .sort((a, b) => a.time - b.time)
                .map((d) => [d.time, d])
        ).values()
    );
}
function connectSocket() {
    params.websocket = new WebSocket(SOCKET_ENDPOINT);
    params.websocket.onopen = (e) => {
        let msg = {
            action: "join",
            list: store.state.tradingOrder.config.symbol,
        };
        params.websocket.send(
            `42${JSON.stringify(["regs", JSON.stringify(msg)])}`
        );
    };
    params.websocket.onclose = (e) => {
        if (params.socketStop) return false;
        if (inSession()) {
            blinkSocketStatus(true);
            connectSocket();
            if (
                moment().diff(params.socketRefreshTime, "seconds") >
                SOCKET_REFRESH_PERIOD
            )
                refreshChart();
        }
    };
    params.websocket.onmessage = (e) => {
        blinkSocketStatus(false);
        if (e.data.substr(0, 1) == 4) {
            if (e.data.substr(1, 1) == 2) {
                const event = JSON.parse(e.data.substr(2));
                if (event[0] == "stockps") {
                    const data = event[1].data;
                    if (data.id == 3220) {
                        if (params.data.original.length > 0) {
                            updateChartData({
                                time:
                                    moment(
                                        `${CURRENT_DATE} ${data.time}`
                                    ).unix() +
                                    7 * 60 * 60,
                                price: data.lastPrice,
                                volume: data.lastVol,
                            });
                        }
                        takeProfitAuto();
                        scanOrder();
                    }
                }
            }
        }
    };
}
function intervalHandler() {
    const CURRENT_SEC = moment().unix();
    if (inSession(CURRENT_SEC)) {
        if (!!status.value.position) {
            if (CURRENT_SEC > TIME.ATC - 5 * 60) {
                blinkCancelOrderButton();
                if (
                    CURRENT_SEC > TIME.ATC - 15 &&
                    params.order.tp.hasOwnProperty("line")
                ) {
                    store
                        .dispatch("tradingOrder/executeOrder", {
                            action: "cancel",
                            tpData: { cmd: "cancel" },
                            slData: { cmd: "delete" },
                        })
                        .then((resp) => {
                            if (resp.isOk) {
                                removeOrderLine("entry");
                                removeOrderLine("tp");
                                removeOrderLine("sl");
                                toggleCancelOrderButton(false);
                                toolsStore.clear("order");
                                toast.success(
                                    t(
                                        "trading.orderChart.autoCancelTpSlSuccess"
                                    )
                                );
                                playSound();
                            } else toastOrderError(resp.message);
                        });
                }
            }
        }
        if (CURRENT_SEC == TIME.START) connectSocket();
        //
        // params.alerts.forEach((alert) => {
        //     const ops = alert.options();
        //     if (!ops.removed && !!params.data.price.length) {
        //         const currentPrice = params.data.price.slice(-1)[0].value;
        //         if (
        //             (ops.title == ">" && currentPrice >= ops.price) ||
        //             (ops.title == "<" && currentPrice <= ops.price)
        //         )
        //             playSound();
        //     }
        // });
    }
    state.clock = moment().format("HH:mm:ss");
}
function showOrderButton() {
    if (store.state.tradingOrder.config.openingMarket) {
        const CURRENT_SEC = moment().unix();
        if (inSession(CURRENT_SEC)) {
            if (!params.order.tp.hasOwnProperty("line")) {
                if (!!status.value.position) {
                    if (CURRENT_SEC > TIME.ATO && CURRENT_SEC < TIME.ATC) {
                        params.order.entry.price =
                            params.data.price.slice(-1)[0].value;
                        params.order.side = status.value.position;
                        tpslOrderRef.value.style.left =
                            +(
                                params.crosshair.x +
                                (params.crosshair.x > innerWidth - 61 ? -61 : 1)
                            ) + "px";
                        tpslOrderRef.value.style.top =
                            +(
                                params.crosshair.y +
                                (params.crosshair.y > innerHeight - 51
                                    ? -51
                                    : 1)
                            ) + "px";
                        tpslOrderRef.value.style.display = "block";
                    }
                }
            }
            if (!params.order.entry.hasOwnProperty("line")) {
                let price = null,
                    side = 0;
                if (!status.value.position) {
                    if (CURRENT_SEC > TIME.ATO && CURRENT_SEC < TIME.ATC) {
                        price = coordinateToPrice(params.crosshair.y);
                        side =
                            price >= params.data.price.slice(-1)[0].value
                                ? 1
                                : -1;
                        params.order.side = side;
                        params.order.entry.price = price;
                    }
                } else {
                    if (CURRENT_SEC < TIME.ATO) price = "ATO";
                    else if (CURRENT_SEC > TIME.ATC) price = "ATC";
                    if (!!price) {
                        params.order.entry.price = price;
                        side = -status.value.position;
                    }
                }
                if (!!side) {
                    entryOrderRef.value.style.left =
                        +(
                            params.crosshair.x +
                            (params.crosshair.x > innerWidth - 71 ? -71 : 1)
                        ) + "px";
                    entryOrderRef.value.style.top =
                        +(
                            params.crosshair.y +
                            (params.crosshair.y > innerHeight - 61 ? -61 : 1)
                        ) + "px";
                    entryOrderRef.value.style.background =
                        side > 0 ? "green" : "red";
                    entryOrderRef.value.innerText = `${
                        side > 0 ? "LONG" : "SHORT"
                    } ${price}`;
                    entryOrderRef.value.style.display = "block";
                }
            }
        }
    }
}
function hideOrderButton() {
    entryOrderRef.value.style.display = "none";
    tpslOrderRef.value.style.display = "none";
}
function toggleCancelOrderButton(visible) {
    cancelOrderRef.value.style.display = visible ? "block" : "none";
}
function blinkCancelOrderButton() {
    if (!cancelOrderRef.value.classList.contains("blink"))
        cancelOrderRef.value.classList.add("blink");
}
function blinkSocketStatus(status) {
    if (status) {
        if (!connectionRef.value.classList.contains("blink"))
            connectionRef.value.classList.add("blink");
    } else {
        if (connectionRef.value.classList.contains("blink"))
            connectionRef.value.classList.remove("blink");
    }
}
function drawOrderLine(kind) {
    let color, title;
    switch (kind) {
        case "entry":
            color = "yellow";
            title = params.order.side > 0 ? "LONG" : "SHORT";
            break;
        case "tp":
            color = "lime";
            title = Math.abs(
                params.order.tp.price - params.order.entry.price
            ).toFixed(1);
            break;
        case "sl":
            color = "red";
            title = Math.abs(
                params.order.sl.price - params.order.entry.price
            ).toFixed(1);
            break;
    }
    if (params.order[kind].hasOwnProperty("line")) {
        params.order[kind].line.applyOptions({
            price: params.order[kind].price,
            title: title,
        });
    } else {
        params.order[kind].line = params.series.price.createPriceLine({
            lineType: "order",
            kind: kind,
            price: params.order[kind].price,
            color: color,
            lineWidth: 1,
            lineStyle: 0,
            title: title,
            draggable: true,
        });
    }
    toolsStore.set("order", {
        kind: kind,
        price: +params.order[kind].price,
        side: params.order.side,
    });
}
function removeOrderLine(kind) {
    if (params.order[kind].hasOwnProperty("line")) {
        params.series.price.removePriceLine(params.order[kind].line);
        delete params.order[kind].line;
    }
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
    const cash = coordinateToPrice(params.crosshair.y, "cash");
    let option = {
        lineType: "target",
        price: cash,
        lineWidth: 1,
        lineStyle: 0,
        draggable: false,
        axisLabelVisible: false,
    };
    if (mf.isSet(params.target.A)) {
        if (mf.isSet(params.target.B)) {
            option.point = "C";
            option.title = "C";
            option.color = "#9C27B0";
        } else {
            option.point = "B";
            option.title = "B";
            option.color = "#E91E63";
        }
    } else {
        option.point = "A";
        option.title = "A";
        option.color = "#E91E63";
    }
    params.target[option.point] = params.series.cash.createPriceLine(option);
    toolsStore.set("target", option);
    if (option.point == "C") {
        const a = +params.target.A.options().price;
        const b = +params.target.B.options().price;
        const c = +params.target.C.options().price;
        option.point = "D";
        option.price = +(c + b - a).toFixed(1);
        option.title = "D";
        option.color = "#9C27B0";
        params.target[option.point] =
            params.series.cash.createPriceLine(option);
        toolsStore.set("target", option);
        //
        targetToolRef.value.classList.remove("selected");
    }
}
function removeTargetTool() {
    if (mf.isSet(params.target.A)) {
        params.series.cash.removePriceLine(params.target.A);
        if (mf.isSet(params.target.B)) {
            params.series.cash.removePriceLine(params.target.B);
            if (mf.isSet(params.target.C)) {
                params.series.cash.removePriceLine(params.target.C);
                params.series.cash.removePriceLine(params.target.D);
            }
        }
        params.target = {
            A: {},
            B: {},
            C: {},
            D: {},
        };
        toolsStore.clear("target");
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
        option.color = "#009688";
        params.pattern1[option.point] =
            params.series.price.createPriceLine(option);
        toolsStore.set("pattern1", option);
        //
        option.point = "C";
        option.price = +(a + 0.5 * ba).toFixed(1);
        option.title = (0.5 * ba).toFixed(1);
        option.color = "#009688";
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
        option.color = "#009688";
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
function pattern2ToolClick(e) {
    state.showColorPicker = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        e.target.classList.add("selected");
        drawPattern2Tool(true);
    }
    e.stopPropagation();
}
function pattern2ToolContextmenu(e) {
    removePattern2Tool();
    e.target.classList.remove("selected");
    e.preventDefault();
    e.stopPropagation();
}
function drawPattern2Tool(fix = false) {
    let point1 = {};
    if (mf.isSet(params.pattern2.O)) {
        const ops = params.pattern2.O.options();
        point1 = {
            time: ops.time0,
            value: ops.price0,
        };
        removePattern2Tool();
    } else {
        if (fix) return false;
        point1 = {
            time: params.crosshair.time,
            value: coordinateToPrice(params.crosshair.y),
        };
    }

    const { price2, price3, price4, isAcc } = findPattern2Points(point1);
    console.log("price2", price2);
    console.log("price3", price3);
    console.log("price4", price4);
    let option = {
        lineType: "pattern2",
        lineWidth: 1,
        lineStyle: 1,
    };
    console.log("isAcc", isAcc);
    drawLineTool(point1.value, !isAcc, isAcc);
    //
    option.time0 = point1.time;
    option.price0 = point1.value;
    option.point = "O";
    option.price = price4;
    option.title = "O";
    option.color = "#2196F3";
    option.draggable = false;
    params.pattern2[option.point] = params.series.price.createPriceLine(option);
    toolsStore.set("pattern2", option);
    //
    pattern2ToolRef.value.classList.remove("selected");
}
function findPattern2Points(point1) {
    let price2 = point1.value,
        price3 = point1.value,
        price4 = point1.value,
        isAcc = false;
    for (let i of params.data.price) {
        if (i.time >= point1.time) {
            if (i.value < point1.value) {
                if (price2 <= point1.value && i.value < price2) {
                    // if (price3 > point1.value) break;
                    price2 = i.value;
                }
                //
                if (
                    price3 <= point1.value &&
                    price2 > point1.value &&
                    i.value < price3
                ) {
                    price3 = i.value;
                }
            } else if (i.value > point1.value) {
                if (price2 >= point1.value && i.value > price2) {
                    // if (price3 < point1.value) break;
                    price2 = i.value;
                }
                //
                if (
                    price3 >= point1.value &&
                    price2 < point1.value &&
                    i.value > price3
                ) {
                    price3 = i.value;
                }
            }
            const d = i.value - price3;
            const d13 = point1.value - price3;
            const d23 = price2 - price3;
            const d43 =
                Math.abs(d13 * 2) > Math.abs(d23 / 2) ? d13 * 2 : d23 / 2;
            price4 = +(price3 + d43).toFixed(1);
            if (price2 != point1.value && price3 != point1.value) {
                if (Math.abs(d) > Math.abs(d43)) {
                    isAcc = true;
                    break;
                }

                if (Math.abs(d) > Math.abs(d13) * 3) {
                    break;
                }
            }
        }
    }
    return { price2, price3, price4, isAcc };
}
function removePattern2Tool() {
    if (mf.isSet(params.pattern2.O)) {
        params.series.price.removePriceLine(params.pattern2.O);
        //
        params.pattern2 = {
            O: {},
        };
        toolsStore.clear("pattern2");
    }
}
function alertToolClick(e) {
    state.showColorPicker = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
    e.stopPropagation();
}
function alertToolContextmenu(e) {
    removeAlertTool();
    e.target.classList.remove("selected");
    e.preventDefault();
    e.stopPropagation();
}
function drawAlertTool() {
    const TYPE = "alert";
    const price = formatPrice(coordinateToPrice(params.crosshair.y));
    const oldLength = params.alerts.length;
    params.alerts = params.alerts.filter((line) => {
        const ops = line.options();
        const isExist = (ops.type = TYPE && price == +ops.price);
        if (isExist) {
            params.series.price.removePriceLine(line);
            toolsStore.set("alert", { price: price, removed: true });
        }
        return !isExist;
    });
    if (params.alerts.length == oldLength) {
        const options = {
            lineType: TYPE,
            price: price,
            title: price >= params.data.price.slice(-1)[0].value ? ">" : "<",
            color: "red",
            lineWidth: 1,
            lineStyle: 1,
            draggable: true,
        };
        params.alerts.push(params.series.price.createPriceLine(options));
        toolsStore.set("alert", options);
    }
    alertToolRef.value.classList.remove("selected");
}
function removeAlertTool() {
    params.alerts.forEach((line) => params.series.price.removePriceLine(line));
    params.alerts = [];
    toolsStore.clear("alert");
}
function boxToolClick(e) {
    state.showColorPicker = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        e.target.classList.add("selected");
        drawBoxTool(true);
    }
    e.stopPropagation();
}
function boxToolContextmenu(e) {
    removeBoxTool();
    e.target.classList.remove("selected");
    e.preventDefault();
    e.stopPropagation();
}
function drawBoxTool(fix = false) {
    let point1 = {};
    if (fix) {
        if (params.box.length == 0) return false;
        point1 = {
            time: +params.box[0].x.time,
            value: +params.box[0].y.options().price,
        };
        removeBoxTool();
    } else
        point1 = {
            time: params.crosshair.time,
            value: coordinateToPrice(params.crosshair.y, "cash"),
        };

    const { point2, point3, point4 } = findCashPoints(point1);
    let option = {
        y: {
            lineWidth: 1,
            lineStyle: 0,
            draggable: false,
            axisLabelVisible: false,
        },
        x: { value: 1 },
    };
    option.y.color = "#2196F3";
    option.y.price = point1.value;
    option.x.time = point1.time;
    drawBoxPoint(0, option);
    option.y.price = point2.value;
    option.x.time = point2.time;
    drawBoxPoint(1, option);
    option.y.color = "#9C27B0";
    option.y.price = point3.value;
    option.x.time = point3.time;
    drawBoxPoint(2, option);
    option.y.price = point4.value;
    option.x.time = point4.time;
    drawBoxPoint(3, option);
    boxToolRef.value.classList.remove("selected");
}
function findCashPoints(point1) {
    const p1 = mf.cloneDeep(point1);
    let point2 = p1,
        point3 = p1,
        point4 = p1;
    for (let i of params.data.cash) {
        if (i.time >= point1.time) {
            if (i.value < point1.value) {
                if (point2.value <= point1.value && i.value < point2.value) {
                    if (point3.value > point1.value) break;
                    point2 = i;
                }
                //
                if (
                    point3.value <= point1.value &&
                    point2.value > point1.value &&
                    i.value < point3.value
                ) {
                    if (point3.value == point1.value) point2.time = i.time;
                    point3 = i;
                }
            } else if (i.value > point1.value) {
                if (point2.value >= point1.value && i.value > point2.value) {
                    if (point3.value < point1.value) break;
                    point2 = i;
                }
                //
                if (
                    point3.value >= point1.value &&
                    point2.value < point1.value &&
                    i.value > point3.value
                ) {
                    if (point3.value == point1.value) point2.time = i.time;
                    point3 = i;
                }
            }
            if (point3.value != point1.value) {
                const i1 = params.data.whitespace.findIndex(
                    (x) => x.time === point1.time
                );
                const i2 = params.data.whitespace.findIndex(
                    (x) => x.time === point2.time
                );
                const i3 = params.data.whitespace.findIndex(
                    (x) => x.time === point3.time
                );
                const ic = params.data.whitespace.findIndex(
                    (x) => x.time === i.time
                );
                const i4 = i3 + i2 - i1;
                point4.time = params.data.whitespace[i4].time;
                point4.value = point3.value + point2.value - point1.value;
                if (ic > i4) break;
            }
        }
    }
    return { point2, point3, point4 };
}
function drawBoxPoint(id, option) {
    option.point = id;
    params.box.push(mf.cloneDeep(option));
    toolsStore.set("box", params.box[id]);
    params.series.box.update(params.box[id].x);
    params.box[id].y = params.series.cash.createPriceLine(params.box[id].y);
}
function removeBoxTool() {
    params.box.forEach((item) => params.series.cash.removePriceLine(item.y));
    params.series.box.setData([]);
    params.box = [];
    toolsStore.clear("box");
}
async function cancelOrderClick() {
    let result = true;
    if (!result) {
        result = await confirm(
            t("trading.orderChart.cancelOrder"),
            t("titles.confirm")
        );
    }
    if (result) {
        if (params.order.entry.hasOwnProperty("line")) {
            if (params.order.tp.hasOwnProperty("line")) {
                store
                    .dispatch("tradingOrder/executeOrder", {
                        action: "exit",
                        tpData: { cmd: "cancel" },
                        slData: { cmd: "delete" },
                        exitData: {
                            cmd: "new",
                            price: "MTL",
                        },
                    })
                    .then((resp) => {
                        if (resp.isOk) {
                            removeOrderLine("entry");
                            removeOrderLine("tp");
                            removeOrderLine("sl");
                            toggleCancelOrderButton(false);
                            toolsStore.clear("order");
                            toast.success(t("trading.orderChart.exitSuccess"));
                        } else {
                            toggleCancelOrderButton(true);
                            toastOrderError(resp.message);
                        }
                    });
            } else {
                store
                    .dispatch("tradingOrder/executeOrder", {
                        action: "entry",
                        data: { cmd: "delete" },
                    })
                    .then((resp) => {
                        if (resp.isOk) {
                            removeOrderLine("entry");
                            toggleCancelOrderButton(false);
                            toolsStore.clear("order");
                            toast.success(
                                t("trading.orderChart.deleteEntrySuccess")
                            );
                        } else {
                            toggleCancelOrderButton(true);
                            toastOrderError(resp.message);
                        }
                    });
            }
        }
    }
}
function entryOrderClick() {
    const CURRENT_SEC = moment().unix();
    if (inSession(CURRENT_SEC)) {
        if (CURRENT_SEC < TIME.ATO) {
            let result = confirm(
                t("trading.orderChart.atoOrder"),
                t("titles.confirm")
            );
            result.then((dialogResult) => {
                if (dialogResult) {
                    store
                        .dispatch("tradingOrder/executeOrder", {
                            action: "exit",
                            exitData: {
                                cmd: "new",
                                price: "ATO",
                            },
                        })
                        .then((resp) => {
                            if (resp.isOk)
                                toast.success(
                                    t("trading.orderChart.atoOrderSuccess")
                                );
                            else toastOrderError(resp.message);
                        });
                }
            });
        } else if (CURRENT_SEC < TIME.ATC) {
            store
                .dispatch("tradingOrder/executeOrder", {
                    action: "entry",
                    data: {
                        cmd: "new",
                        side: params.order.side,
                        price: params.order.entry.price,
                    },
                })
                .then((resp) => {
                    if (resp.isOk) {
                        drawOrderLine("entry");
                        toggleCancelOrderButton(true);
                        toast.success(t("trading.orderChart.newEntrySuccess"));
                    } else toastOrderError(resp.message);
                });
        } else {
            let result = confirm(
                t("trading.orderChart.atcOrder"),
                t("titles.confirm")
            );
            result.then((dialogResult) => {
                if (dialogResult) {
                    store
                        .dispatch("tradingOrder/executeOrder", {
                            action: "exit",
                            exitData: {
                                cmd: "new",
                                price: "ATC",
                            },
                        })
                        .then((resp) => {
                            if (resp.isOk)
                                toast.success(
                                    t("trading.orderChart.atcOrderSuccess")
                                );
                            else toastOrderError(resp.message);
                        });
                }
            });
        }
    }
}
function tpslOrderClick() {
    params.order.tp.price =
        params.order.entry.price + params.order.side * TP_DEFAULT;
    params.order.sl.price =
        params.order.entry.price - params.order.side * SL_DEFAULT;
    store
        .dispatch("tradingOrder/executeOrder", {
            action: "tpsl",
            tpData: {
                cmd: "new",
                price: params.order.tp.price,
            },
            slData: {
                cmd: "new",
                price: params.order.sl.price,
            },
        })
        .then((resp) => {
            if (resp.isOk) {
                drawOrderLine("entry");
                drawOrderLine("tp");
                drawOrderLine("sl");
                params.order.entry.line.applyOptions({
                    draggable: false,
                });
                toast.success(t("trading.orderChart.newTpSlSuccess"));
            } else toastOrderError(resp.message);
        });
}
function scanOrder() {
    if (params.order.entry.hasOwnProperty("line")) {
        const lastPrice = params.data.price.slice(-1)[0].value;
        if (params.order.tp.hasOwnProperty("line")) {
            if (
                (params.order.side > 0 && lastPrice >= params.order.tp.price) ||
                (params.order.side < 0 && lastPrice <= params.order.tp.price)
            ) {
                if (!params.isAutoOrdering) {
                    params.isAutoOrdering = true;
                    store
                        .dispatch("tradingOrder/executeOrder", {
                            action: "sl",
                            data: {
                                cmd: "delete",
                            },
                        })
                        .then((resp) => {
                            if (resp.isOk) {
                                removeOrderLine("entry");
                                removeOrderLine("tp");
                                removeOrderLine("sl");
                                toggleCancelOrderButton(false);
                                toolsStore.clear("order");
                                toast.success(
                                    t("trading.orderChart.deleteTpSuccess")
                                );
                                hideOrderButton();
                                playSound();
                            } else toastOrderError(resp.message);
                            params.isAutoOrdering = false;
                        });
                }
            }
            if (
                (params.order.side > 0 && lastPrice <= params.order.sl.price) ||
                (params.order.side < 0 && lastPrice >= params.order.sl.price)
            ) {
                if (!params.isAutoOrdering) {
                    params.isAutoOrdering = true;
                    store
                        .dispatch("tradingOrder/executeOrder", {
                            action: "tp",
                            data: {
                                cmd: "cancel",
                            },
                        })
                        .then((resp) => {
                            if (resp.isOk) {
                                removeOrderLine("entry");
                                removeOrderLine("tp");
                                removeOrderLine("sl");
                                toggleCancelOrderButton(false);
                                toolsStore.clear("order");
                                toast.success(
                                    t("trading.orderChart.deleteSlSuccess")
                                );
                                hideOrderButton();
                                playSound();
                            } else toastOrderError(resp.message);
                            params.isAutoOrdering = false;
                        });
                }
            }
        } else {
            if (
                (params.order.side > 0 &&
                    lastPrice >= params.order.entry.price) ||
                (params.order.side < 0 && lastPrice <= params.order.entry.price)
            ) {
                if (!params.isAutoOrdering) {
                    params.isAutoOrdering = true;
                    setTimeout(() => {
                        params.order.tp.price =
                            params.order.entry.price +
                            params.order.side * TP_DEFAULT;
                        params.order.sl.price =
                            params.order.entry.price -
                            params.order.side * SL_DEFAULT;
                        store
                            .dispatch("tradingOrder/executeOrder", {
                                action: "tpsl",
                                tpData: {
                                    cmd: "new",
                                    price: params.order.tp.price,
                                },
                                slData: {
                                    cmd: "new",
                                    price: params.order.sl.price,
                                },
                            })
                            .then((resp) => {
                                if (resp.isOk) {
                                    drawOrderLine("tp");
                                    drawOrderLine("sl");
                                    params.order.entry.line.applyOptions({
                                        draggable: false,
                                    });
                                    toast.success(
                                        t(
                                            "trading.orderChart.autoNewTpSlSuccess"
                                        )
                                    );
                                    playSound();
                                } else toastOrderError(resp.message);
                                params.isAutoOrdering = false;
                            });
                    }, 1000);
                }
            }
        }
    }
}
function takeProfitAuto() {
    if (!!status.value.position) {
        if (mf.isSet(params.target.X)) {
            const lastCash = params.data.cash.slice(-1)[0].value;
            const b = +params.target.B.options().price;
            const x = +params.target.X.options().price;
            const xb = x - b;
            if ((xb > 0 && lastCash >= x) || (xb < 0 && lastCash <= x)) {
                cancelOrderRef.value.click();
            }
        }
    }
}
function chartTopClick() {
    params.chart.timeScale().scrollToRealTime();
}
function inSession(currentSec = null) {
    if (!currentSec) currentSec = moment().unix();
    return currentSec >= TIME.START && currentSec <= TIME.END;
}
function coordinateToPrice(y, name = "price") {
    return formatPrice(params.series[name].coordinateToPrice(y));
}
function formatPrice(price) {
    if (!price) return 0;
    return +(+price.toFixed(1));
}
function toastOrderError(error) {
    if (!error) error = "unknown";
    toast.error(t(`trading.orderChart.${error}`));
}
function dateSelectChange() {
    params.loadWhitespace = true;
    store.dispatch("tradingOrder/getChartData", state.chartDate);
}
function refreshChart() {
    params.socketRefreshTime = moment();
    params.loadWhitespace = true;
    store.dispatch("tradingOrder/getChartData", state.chartDate);
}
function resetChart() {
    params.data.original = [];
    params.data.price = [];
    params.data.cash = [];
    params.data.whitespace = [];
    refreshChart();
}
function playSound() {
    let player = new Audio(sound);
    player.crossOrigin = "anonymous";
    player.addEventListener("canplaythrough", function () {
        player.play();
    });
}
function getAccountInfo() {
    store.dispatch("tradingOrder/getAccountInfo").then((data) => {
        let html = "";
        html += '<div style="width: 200px;">';
        html += `<div style="display: flex;"><div style="flex: 0 0 75px;">${t(
            "trading.orderChart.nav"
        )}</div><div>: ${filters.currency(data.nav)}</div></div>`;
        html += `<div style="display: flex;"><div style="flex: 0 0 75px;">${t(
            "trading.orderChart.maxVol"
        )}</div><div>: ${filters.numberVnFormat(data.maxVol)}</div></div>`;
        html += `<div style="display: flex;"><div style="flex: 0 0 75px;">${t(
            "trading.orderChart.vm"
        )}</div><div>: ${filters.currency(data.vm)}</div></div>`;
        html += `<div style="display: flex;"><div style="flex: 0 0 75px;">${t(
            "trading.orderChart.fee"
        )}</div><div>: ${filters.currency(data.fee)}</div></div>`;
        html += "</div>";
        alert(html, t("trading.orderChart.accountInfo"));
    });
}
function report() {
    bus.emit("checkPin", () => store.dispatch("tradingOrder/report"));
}
function exportCsv() {
    bus.emit("checkPin", () => store.dispatch("tradingOrder/export"));
}
</script>
<style lang="scss" scoped>
.order-chart-container {
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
            left: 0px;

            .command:not(:first-child) {
                border-left: solid 2px #2a2e39 !important;
            }

            .clock {
                width: 80px;
            }

            .chart-date {
                width: 125px;
            }

            .status {
                width: unset !important;
                padding: 0 10px !important;

                &.green {
                    color: lime !important;
                }
                &.red {
                    color: red !important;
                }
                &.pending {
                    background: gold !important;
                }
            }

            .spinner {
                width: 30px;
                height: 30px;
                display: none;
            }
        }

        &.tool-area {
            top: 32px;
            left: 0px;
            flex-direction: column;

            .command:not(:first-child) {
                border-top: solid 2px #2a2e39 !important;
            }

            .selected:not(.color) {
                color: #1f62ff !important;
            }

            .warning {
                color: yellow !important;
            }

            .color {
                position: relative;

                .color-picker {
                    position: absolute;
                    top: 0;
                    left: 40px;
                }
            }

            .cancel-order {
                display: none;
                color: red;
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

        &:not(.noaction):hover {
            background: #2a2e39 !important;
        }
        &.noaction {
            cursor: unset !important;
        }
        &.blink {
            animation: blinker 0.5s linear infinite;
        }
        @keyframes blinker {
            50% {
                color: transparent;
            }
        }
    }

    .order-button {
        position: absolute;
        display: none;
        padding: 5px;
        text-align: center;
        border-radius: 7px;
        color: black;
        background: silver;
        z-index: 3;
        cursor: pointer;

        &.entry {
            width: 70px;
            height: 55px;
            color: white !important;
        }

        &.tpsl {
            width: 60px;
            height: 50px;
            line-height: 40px;
        }
    }

    .chart-top {
        position: absolute;
        bottom: 29px;
        right: 55px;
        border-radius: 50%;
        border: 1px solid gray;
        padding-left: 1px;
        line-height: 22px !important;
        width: 25px !important;
        height: 25px !important;
        font-size: 18px;
    }

    .tradingview-chart {
        position: absolute;
        top: 0;
        left: 32px;
        width: calc(100% - 32px);
        height: 100%;
        z-index: 3;
    }
}
</style>
