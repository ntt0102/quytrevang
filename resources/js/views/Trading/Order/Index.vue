<template>
    <div class="content-block dx-card responsive-paddings">
        <div class="order-chart-container" ref="chartContainerRef">
            <div class="chart-wrapper" ref="orderChartRef">
                <div class="area data-area">
                    <div
                        :class="`command far fa-${
                            status.connection ? 'link' : 'unlink'
                        }`"
                        :title="$t('trading.orderChart.connection')"
                        @click="() => $store.dispatch('tradingOrder/getStatus')"
                    ></div>
                    <div
                        class="command noaction status"
                        :class="{
                            green: status.position > 0,
                            red: status.position < 0,
                        }"
                        :title="$t('trading.orderChart.position')"
                    >
                        {{ status.position }}
                    </div>
                    <div class="command noaction clock">{{ state.clock }}</div>
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
                        @click="refreshChart"
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
                        ref="rulerToolRef"
                        class="command far fa-ruler"
                        :title="$t('trading.orderChart.rulerTool')"
                        @click="rulerToolClick"
                        @contextmenu="rulerToolContextmenu"
                    ></div>
                    <div
                        ref="verticalToolRef"
                        class="command far fa-grip-lines-vertical"
                        :title="$t('trading.orderChart.verticalTool')"
                        @click="verticalToolClick"
                        @contextmenu="verticalToolContextmenu"
                    ></div>
                    <div
                        ref="alertToolRef"
                        class="command far fa-alarm-exclamation"
                        :title="$t('trading.orderChart.alertTool')"
                        @click="alertToolClick"
                        @contextmenu="alertToolContextmenu"
                    ></div>
                    <!-- <div
                        class="command far fa-info-circle"
                        :title="
                            $t('trading.orderChart.copyistStatusPopup.title')
                        "
                        @click="() => $refs.copyistStatusPopupRef.show()"
                    ></div> -->
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
                    class="tradingview-chart"
                    :src="tradingViewSrc"
                ></iframe>
            </div>
        </div>
    </div>
    <!-- <CopyistStatusPopup ref="copyistStatusPopupRef" /> -->
</template>

<script setup>
// import CopyistStatusPopup from "./CopyistStatusPopup.vue";
import ColorPicker from "./ColorPicker.vue";
import toolsStore from "../../../plugins/orderChartDb.js";
import { createChart } from "../../../plugins/lightweight-charts.esm.development";
import { confirm } from "devextreme/ui/dialog";
import alertFile from "../../../../audios/alert.mp3";
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
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
const CHART_OPTIONS = {
    localization: { dateFormat: "dd/MM/yyyy", locale: "vi-VN" },
    rightPriceScale: {
        visible: true,
        scaleMargins: { top: 0.1, bottom: 0.21 },
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
        minBarSpacing: 0.05,
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

const store = useStore();
const { t } = useI18n();
const devices = inject("devices");
const mf = inject("mf");
const chartContainerRef = ref(null);
const orderChartRef = ref(null);
const spinnerRef = ref(null);
const fullscreenToolRef = ref(null);
const reloadToolRef = ref(null);
const tradingviewRef = ref(null);
const colorToolRef = ref(null);
const lineToolRef = ref(null);
const rulerToolRef = ref(null);
const verticalToolRef = ref(null);
const alertToolRef = ref(null);
const cancelOrderRef = ref(null);
const entryOrderRef = ref(null);
const tpslOrderRef = ref(null);
let params = {
    chart: {},
    series: {},
    data: { whitespace: [], price: [], volume: [] },
    order: { side: 0, entry: {}, tp: {}, sl: {} },
    lines: [],
    ruler: { l0: {}, l50: {}, l100: {}, l150: {}, pointCount: 0 },
    vertical: { v1: {}, v2: {}, v3: {}, v4: {}, pointCount: 0 },
    alerts: [],
    crosshair: {},
    shark: null,
    loadWhitespace: true,
    interval: null,
    interval60: null,
    websocket: null,
    isAutoOrdering: false,
    socketStop: false,
    alertAudio: new Audio(alertFile),
};
params.alertAudio.crossOrigin = "anonymous";
params.alertAudio.loop = true;
const state = reactive({
    chartDate: CURRENT_DATE,
    clock: moment().format("HH:mm:ss"),
    isFullscreen: false,
    color: "#F44336",
    showColorPicker: false,
    showTradingView: false,
});
const status = computed(() => store.state.tradingOrder.status);
const tradingViewSrc = computed(() => {
    return `https://chart.vps.com.vn/tv/?loadLastChart=true&symbol=VN30F1M&u=${store.state.tradingOrder.config.vps_code}&s=${store.state.tradingOrder.config.vps_session}&resolution=1`;
});

store.dispatch("tradingOrder/getConfig").then(connectSocket);
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
    params.series.vertical = params.chart.addHistogramSeries({
        priceScaleId: "vertical",
        scaleMargins: { top: 0, bottom: 0 },
        color: "#26a69a",
        lastValueVisible: false,
        priceLineVisible: false,
    });
    params.series.volume = params.chart.addHistogramSeries({
        priceScaleId: "volume",
        scaleMargins: { top: 0.8, bottom: 0 },
        color: "#CCCCCC",
        lastValueVisible: false,
        priceLineVisible: false,
    });
    params.series.volume.createPriceLine({
        price: 150,
        color: "yellow",
        lineWidth: 1,
        lineStyle: 1,
        axisLabelVisible: false,
        draggable: false,
    });
    params.series.price = params.chart.addLineSeries({
        color: "#CCCCCC",
        priceFormat: { minMove: 0.1 },
    });
    new ResizeObserver(eventChartResize).observe(chartContainerRef.value);
    window.addEventListener("keydown", eventKeyPress);
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
    else if (verticalToolRef.value.classList.contains("selected"))
        drawVerticalTool();
    else if (rulerToolRef.value.classList.contains("selected")) drawRulerTool();
    else if (alertToolRef.value.classList.contains("selected")) drawAlertTool();
}
function eventChartCrosshairMove(e) {
    if (e.time) {
        var price = e.seriesPrices.get(params.series.price);
        params.hasCrosshair = true;
        params.crosshair.time = e.time;
        params.crosshair.price = price;
    } else {
        params.hasCrosshair = false;
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
    var line = e.customPriceLine;
    var lineOptions = line.options();
    lineOptions.price = formatPrice(lineOptions.price);
    const oldPrice = +e.fromPriceString;
    const newPrice = lineOptions.price;
    switch (lineOptions.lineType) {
        case "order":
            if (newPrice != oldPrice) {
                var isChanged = false;
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
                case 1:
                    toolsStore.set("ruler", lineOptions);
                    if (params.ruler.pointCount == 2) {
                        const distance = +params.ruler.l100.options().title;

                        const l100Price = +(newPrice + distance).toFixed(1);
                        params.ruler.l100.applyOptions({ price: l100Price });
                        toolsStore.set("ruler", params.ruler.l100.options());

                        const l50Price = +(newPrice + 0.5 * distance).toFixed(
                            1
                        );
                        params.ruler.l50.applyOptions({ price: l50Price });
                        toolsStore.set("ruler", params.ruler.l50.options());

                        const l150Price = +(newPrice + 1.5 * distance).toFixed(
                            1
                        );
                        params.ruler.l150.applyOptions({ price: l150Price });
                        toolsStore.set("ruler", params.ruler.l150.options());
                    }
                    break;
                case 2:
                    const l0Price2 = +params.ruler.l0.options().price;
                    const distance2 = newPrice - l0Price2;
                    line.applyOptions({ title: distance2.toFixed(1) });
                    toolsStore.set("ruler", line.options());
                    //
                    params.ruler.l50.applyOptions({
                        title: (0.5 * distance2).toFixed(1),
                        price: +(l0Price2 + 0.5 * distance2).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l50.options());
                    //
                    params.ruler.l150.applyOptions({
                        title: (1.5 * distance2).toFixed(1),
                        price: +(l0Price2 + 1.5 * distance2).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l150.options());
                    break;
                case 3:
                    const l0Price3 = +params.ruler.l0.options().price;
                    const distance3 = newPrice - l0Price3;
                    line.applyOptions({ title: distance3.toFixed(1) });
                    toolsStore.set("ruler", line.options());
                    //
                    params.ruler.l100.applyOptions({
                        title: (2 * distance3).toFixed(1),
                        price: +(l0Price3 + 2 * distance3).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l100.options());

                    params.ruler.l150.applyOptions({
                        title: (3 * distance3).toFixed(1),
                        price: +(l0Price3 + 3 * distance3).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l150.options());
                    break;
                case 4:
                    const l0Price4 = +params.ruler.l0.options().price;
                    const distance4 = newPrice - l0Price4;
                    line.applyOptions({ title: distance4.toFixed(1) });
                    toolsStore.set("ruler", line.options());
                    //
                    params.ruler.l100.applyOptions({
                        title: ((distance4 * 2) / 3).toFixed(1),
                        price: +(l0Price4 + (distance4 * 2) / 3).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l100.options());
                    //
                    params.ruler.l50.applyOptions({
                        title: (distance4 / 3).toFixed(1),
                        price: +(l0Price4 + distance4 / 3).toFixed(1),
                    });
                    toolsStore.set("ruler", params.ruler.l50.options());
                    break;
            }
            break;
        case "alert":
            toolsStore.set("alert", {
                price: oldPrice,
                removed: true,
            });
            const currentPrice = params.data.price.slice(-1)[0].value;
            var title = newPrice >= currentPrice ? ">" : "<";
            line.applyOptions({ title: title });
            toolsStore.set("alert", line.options());
            alertToolRef.value.classList.remove("selected");
            params.alertAudio.pause();
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
        //
        const lines = await toolsStore.get("line");
        lines.forEach((line) => {
            if (!line.removed)
                params.lines.push(params.series.price.createPriceLine(line));
        });
        //
        const verticals = await toolsStore.get("vertical");
        if (verticals.length > 0) {
            params.series.vertical.setData(verticals);
        }
        //
        const rulerLines = await toolsStore.get("ruler");
        if (rulerLines.length > 0) {
            params.ruler.pointCount = rulerLines.length > 1 ? 2 : 1;
            rulerLines.forEach((line) => {
                params.ruler[line.pointName] =
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
        params.data.whitespace = mergeChartData(
            params.data.whitespace,
            createWhitespaceData()
        );
        params.series.whitespace.setData(params.data.whitespace);
        params.loadWhitespace = false;
    }
    params.data.price = mergeChartData(
        store.state.tradingOrder.chartData.price,
        params.data.price
    );
    params.series.price.setData(params.data.price);
    //
    params.data.volume = mergeChartData(
        store.state.tradingOrder.chartData.volume,
        params.data.volume
    );
    params.series.volume.setData(params.data.volume);
    //
    params.shark = store.state.tradingOrder.chartData.shark;
}
function updateChartData(price, volume) {
    params.data.price = mergeChartData([price], params.data.price);
    const lastPrice = params.data.price.slice(-1)[0];
    params.series.price.update(lastPrice);
    //
    params.data.volume = mergeChartData([volume], params.data.volume);
    const lastVolume = params.data.volume.slice(-1)[0];
    params.series.volume.update(lastVolume);
}
function createWhitespaceData() {
    const date = state.chartDate;
    const amStart = moment(`${date} 09:00:00`).unix();
    const amEnd = moment(`${date} 11:30:00`).unix();
    const pmStart = moment(`${date} 13:00:00`).unix();
    const pmEnd = moment(`${date} 14:30:00`).unix();
    var data = [],
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
    const endpoint =
        "wss://datafeed.vps.com.vn/socket.io/?EIO=3&transport=websocket";
    params.websocket = new WebSocket(endpoint);
    params.websocket.onopen = (e) => {
        var msg = {
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
            connectSocket();
            store.dispatch("tradingOrder/getChartData", state.chartDate);
        }
    };
    params.websocket.onmessage = (e) => {
        if (e.data.substr(0, 1) == 4) {
            if (e.data.substr(1, 1) == 2) {
                const event = JSON.parse(e.data.substr(2));
                if (event[0] == "stockps") {
                    const data = event[1].data;
                    if (data.id == 3220) {
                        const time =
                            moment(`${CURRENT_DATE} ${data.time}`).unix() +
                            7 * 60 * 60;
                        const prevPrice = params.data.price.slice(-1)[0].value;
                        const side = data.lastPrice - prevPrice;
                        let isShark = false;
                        if (data.lastVol >= 150) {
                            if (
                                params.shark != null &&
                                params.shark.recovery &&
                                params.data.volume.length - params.shark.index >
                                    1 &&
                                params.data.volume.length -
                                    params.shark.index <=
                                    4 &&
                                ((params.shark.side > 0 &&
                                    data.lastPrice > params.shark.price) ||
                                    (params.shark.side < 0 &&
                                        data.lastPrice < params.shark.price)) &&
                                data.lastVol > params.shark.volume &&
                                params.shark.volume / data.lastVol > 0.8 &&
                                side * params.shark.side > 0
                            )
                                isShark = true;

                            params.shark = {
                                side: side,
                                index: params.data.volume.length,
                                price: data.lastPrice,
                                volume: data.lastVol,
                                recovery: true,
                            };
                        } else if (params.shark != null)
                            params.shark.recovery &=
                                params.shark.side * side <= 0;
                        updateChartData(
                            {
                                time: time,
                                value: data.lastPrice,
                            },
                            {
                                time: time,
                                value: data.lastVol,
                                color:
                                    data.lastPrice > prevPrice
                                        ? isShark
                                            ? "lime"
                                            : "green"
                                        : data.lastPrice < prevPrice
                                        ? isShark
                                            ? "red"
                                            : "darkred"
                                        : "#CCCCCC",
                            }
                        );
                        if (params.order.entry.hasOwnProperty("line")) {
                            if (params.order.tp.hasOwnProperty("line")) {
                                if (
                                    (params.order.side > 0 &&
                                        data.lastPrice >=
                                            params.order.tp.price) ||
                                    (params.order.side < 0 &&
                                        data.lastPrice <= params.order.tp.price)
                                ) {
                                    if (!params.isAutoOrdering) {
                                        params.isAutoOrdering = true;
                                        store
                                            .dispatch(
                                                "tradingOrder/executeOrder",
                                                {
                                                    action: "sl",
                                                    data: {
                                                        cmd: "delete",
                                                    },
                                                }
                                            )
                                            .then((resp) => {
                                                if (resp.isOk) {
                                                    removeOrderLine("entry");
                                                    removeOrderLine("tp");
                                                    removeOrderLine("sl");
                                                    toggleCancelOrderButton(
                                                        false
                                                    );
                                                    toolsStore.clear("order");
                                                    toast.success(
                                                        t(
                                                            "trading.orderChart.deleteTpSuccess"
                                                        )
                                                    );
                                                    hideOrderButton();
                                                } else
                                                    toastOrderError(
                                                        resp.message
                                                    );
                                                params.isAutoOrdering = false;
                                            });
                                    }
                                }
                                if (
                                    (params.order.side > 0 &&
                                        data.lastPrice <=
                                            params.order.sl.price) ||
                                    (params.order.side < 0 &&
                                        data.lastPrice >= params.order.sl.price)
                                ) {
                                    if (!params.isAutoOrdering) {
                                        params.isAutoOrdering = true;
                                        store
                                            .dispatch(
                                                "tradingOrder/executeOrder",
                                                {
                                                    action: "tp",
                                                    data: {
                                                        cmd: "cancel",
                                                    },
                                                }
                                            )
                                            .then((resp) => {
                                                if (resp.isOk) {
                                                    removeOrderLine("entry");
                                                    removeOrderLine("tp");
                                                    removeOrderLine("sl");
                                                    toggleCancelOrderButton(
                                                        false
                                                    );
                                                    toolsStore.clear("order");
                                                    toast.success(
                                                        t(
                                                            "trading.orderChart.deleteSlSuccess"
                                                        )
                                                    );
                                                    hideOrderButton();
                                                } else
                                                    toastOrderError(
                                                        resp.message
                                                    );
                                                params.isAutoOrdering = false;
                                            });
                                    }
                                }
                            } else {
                                if (
                                    (params.order.side > 0 &&
                                        data.lastPrice >=
                                            params.order.entry.price) ||
                                    (params.order.side < 0 &&
                                        data.lastPrice <=
                                            params.order.entry.price)
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
                                                .dispatch(
                                                    "tradingOrder/executeOrder",
                                                    {
                                                        action: "tpsl",
                                                        tpData: {
                                                            cmd: "new",
                                                            price: params.order
                                                                .tp.price,
                                                        },
                                                        slData: {
                                                            cmd: "new",
                                                            price: params.order
                                                                .sl.price,
                                                        },
                                                    }
                                                )
                                                .then((resp) => {
                                                    if (resp.isOk) {
                                                        drawOrderLine("tp");
                                                        drawOrderLine("sl");
                                                        params.order.entry.line.applyOptions(
                                                            {
                                                                draggable: false,
                                                            }
                                                        );
                                                        toast.success(
                                                            t(
                                                                "trading.orderChart.autoNewTpSlSuccess"
                                                            )
                                                        );
                                                    } else
                                                        toastOrderError(
                                                            resp.message
                                                        );
                                                    params.isAutoOrdering = false;
                                                });
                                        }, 1000);
                                    }
                                }
                            }
                        }
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
                            } else toastOrderError(resp.message);
                        });
                }
            }
        }
        if (CURRENT_SEC == TIME.START) connectSocket();
        if (params.alertAudio.paused) {
            params.alerts.forEach((alert) => {
                const ops = alert.options();
                if (!ops.removed && !!params.data.price.length) {
                    const currentPrice = params.data.price.slice(-1)[0].value;
                    if (
                        (ops.title == ">" && currentPrice >= ops.price) ||
                        (ops.title == "<" && currentPrice <= ops.price)
                    )
                        params.alertAudio.play();
                }
            });
        }
    }
    state.clock = Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    }).format();
}
function showOrderButton() {
    const CURRENT_SEC = moment().unix();
    if (inSession(CURRENT_SEC)) {
        if (!params.order.tp.hasOwnProperty("line")) {
            if (!!status.value.position) {
                params.order.entry.price = params.data.price.slice(-1)[0].value;
                params.order.side = status.value.position;
                tpslOrderRef.value.style.left =
                    +(
                        params.crosshair.x +
                        (params.crosshair.x > innerWidth - 61 ? -61 : 1)
                    ) + "px";
                tpslOrderRef.value.style.top =
                    +(
                        params.crosshair.y +
                        (params.crosshair.y > innerHeight - 51 ? -51 : 1)
                    ) + "px";
                tpslOrderRef.value.style.display = "block";
            }
        }
        if (!params.order.entry.hasOwnProperty("line")) {
            var price = null,
                side = 0;
            if (!status.value.position) {
                price = coordinateToPrice(params.crosshair.y);
                side = price >= params.data.price.slice(-1)[0].value ? 1 : -1;
                params.order.side = side;
                params.order.entry.price = price;
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
            }
            entryOrderRef.value.style.display = "block";
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
    if (cancelOrderRef.value.classList.contains("warning"))
        cancelOrderRef.value.classList.remove("warning");
    else cancelOrderRef.value.classList.add("warning");
}
function drawOrderLine(kind) {
    var color, title;
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
    if (params.ruler.pointCount > 0) {
        drawLineTool(+params.ruler.l100.options().price);
        drawLineTool(+params.ruler.l150.options().price);
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
function drawLineTool(price = null) {
    const TYPE = "line";
    if (price == null)
        price = formatPrice(coordinateToPrice(params.crosshair.y));
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
    if (params.lines.length == oldLength) {
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
function verticalToolClick(e) {
    state.showColorPicker = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        e.target.classList.add("selected");
    }
    e.stopPropagation();
}
function verticalToolContextmenu(e) {
    removeVerticalTool();
    e.target.classList.remove("selected");
    e.preventDefault();
    e.stopPropagation();
}
function drawVerticalTool() {
    if (params.crosshair.time) {
        if (params.vertical.pointCount == 0) {
            params.vertical.v1 = { time: params.crosshair.time, value: 1 };
            params.series.vertical.setData([params.vertical.v1]);
            params.vertical.pointCount = 1;
            toolsStore.set("vertical", params.vertical.v1);
        } else if (params.vertical.pointCount == 1) {
            params.vertical.v2 = { time: params.crosshair.time, value: 1 };
            params.series.vertical.setData([
                params.vertical.v1,
                params.vertical.v2,
            ]);
            toolsStore.set("vertical", params.vertical.v2);
            params.vertical.pointCount = 2;
        } else {
            const i1 = params.data.whitespace.findIndex(
                (x) => x.time === params.vertical.v1.time
            );
            if (i1 < 0) return false;
            const i2 = params.data.whitespace.findIndex(
                (x) => x.time === params.vertical.v2.time
            );
            if (i2 < 0) return false;
            const i3 = params.data.whitespace.findIndex(
                (x) => x.time === params.crosshair.time
            );
            if (i3 < 0) return false;
            const i4 = i3 + i2 - i1;
            if (i4 < 0 || i4 >= params.data.whitespace.length) return false;
            params.vertical.v1 = { time: params.crosshair.time, value: 1 };
            params.vertical.v2 = {
                time: params.data.whitespace[i4].time,
                value: 1,
            };
            params.series.vertical.setData([
                params.vertical.v1,
                params.vertical.v2,
            ]);
            toolsStore.clear("vertical");
            toolsStore.set("vertical", params.vertical.v1);
            toolsStore.set("vertical", params.vertical.v2);
            verticalToolRef.value.classList.remove("selected");
            params.vertical.pointCount = 3;
        }
    }
}
function removeVerticalTool() {
    params.vertical = { v1: {}, v2: {}, v3: {}, pointCount: 0 };
    params.series.vertical.setData([]);
    toolsStore.clear("vertical");
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
    var options = {
        lineType: "ruler",
        price: price,
        color: "#FF00FF",
        lineWidth: 1,
        lineStyle: 1,
        draggable: true,
    };
    if (params.ruler.pointCount == 0) {
        options.point = 1;
        options.pointName = "l0";
        options.title = "0";
        params.ruler.l0 = params.series.price.createPriceLine(options);
        params.ruler.pointCount = 1;
        toolsStore.set("ruler", options);
    } else if (params.ruler.pointCount == 1) {
        const l0Price = +params.ruler.l0.options().price;

        const distance3 = price - l0Price;
        options.point = 3;
        options.pointName = "l50";
        options.title = distance3.toFixed(1);
        params.ruler.l50 = params.series.price.createPriceLine(options);
        toolsStore.set("ruler", options);

        const distance2 = 2 * distance3;
        options.point = 2;
        options.pointName = "l100";
        options.title = distance2.toFixed(1);
        options.price = +(l0Price + distance2).toFixed(1);
        params.ruler.l100 = params.series.price.createPriceLine(options);
        toolsStore.set("ruler", options);

        const distance4 = 3 * distance3;
        options.point = 4;
        options.pointName = "l150";
        options.title = distance4.toFixed(1);
        options.price = +(l0Price + distance4).toFixed(1);
        params.ruler.l150 = params.series.price.createPriceLine(options);
        toolsStore.set("ruler", options);

        params.ruler.pointCount = 2;
        rulerToolRef.value.classList.remove("selected");
    }
}
function removeRulerTool() {
    if (params.ruler.pointCount > 0) {
        params.series.price.removePriceLine(params.ruler.l0);
        if (params.ruler.pointCount > 1) {
            params.series.price.removePriceLine(params.ruler.l50);
            params.series.price.removePriceLine(params.ruler.l100);
            params.series.price.removePriceLine(params.ruler.l150);
        }
        //
        params.ruler = { l0: {}, l50: {}, l100: {}, l150: {}, pointCount: 0 };
        toolsStore.clear("ruler");
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
    params.alertAudio.pause();
}
function removeAlertTool() {
    params.alerts.forEach((line) => params.series.price.removePriceLine(line));
    params.alerts = [];
    toolsStore.clear("alert");
    params.alertAudio.pause();
}
function cancelOrderClick() {
    let result = confirm(
        t("trading.orderChart.cancelOrder"),
        t("titles.confirm")
    );
    result.then((dialogResult) => {
        if (dialogResult) {
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
                                toast.success(
                                    t("trading.orderChart.exitSuccess")
                                );
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
    });
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
                drawOrderLine("tp");
                drawOrderLine("sl");
                params.order.entry.line.applyOptions({
                    draggable: false,
                });
                toast.success(t("trading.orderChart.newTpSlSuccess"));
            } else toastOrderError(resp.message);
        });
}
function chartTopClick() {
    params.chart.timeScale().scrollToRealTime();
}
function inSession(currentSec = null) {
    if (!currentSec) currentSec = moment().unix();
    return currentSec >= TIME.START && currentSec <= TIME.END;
}
function coordinateToPrice(y) {
    return formatPrice(params.series.price.coordinateToPrice(y));
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
    params.data.price = [];
    params.data.volume = [];
    params.data.whitespace = [];
    params.loadWhitespace = true;
    store.dispatch("tradingOrder/getChartData", state.chartDate);
}
</script>
<style lang="scss" scoped>
.order-chart-container {
    height: 320px;
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
