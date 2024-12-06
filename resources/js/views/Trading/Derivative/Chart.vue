<template>
    <div
        class="derivative-chart"
        ref="chartContainerRef"
        @click="eventChartClick"
        @contextmenu="eventChartContextmenu"
    >
        <div class="chart-wrapper" ref="orderChartRef">
            <div
                class="area data-area"
                @click="toolAreaClick"
                @contextmenu="toolAreaContextmenu"
            >
                <div
                    ref="connectionRef"
                    class="command"
                    :class="{ yellow: status.pending, red: config.volInValid }"
                    :title="$t('trading.derivative.connection')"
                    @click="getStatus"
                >
                    <i
                        class="far"
                        :class="{
                            'fa-link-simple': status.connection,
                            'fa-link-simple-slash': !status.connection,
                            blink: state.isSocketWarning,
                        }"
                    ></i>
                </div>
                <div
                    class="command status"
                    :class="{
                        green: status.position > 0,
                        red: status.position < 0,
                    }"
                    :title="$t('trading.derivative.position')"
                    @click="getAccountInfo"
                >
                    {{ status.position }}
                </div>
                <div class="command clock" @click="connectSocket">
                    {{ state.clock }}
                </div>
                <input
                    type="date"
                    class="chart-date command"
                    :title="$t('trading.derivative.date')"
                    v-model="state.chartDate"
                    @change="dateSelectChange"
                />
                <div
                    ref="reloadToolRef"
                    class="command"
                    :title="$t('trading.derivative.reload')"
                    @click="resetChart"
                    @contextmenu="getTools"
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
                @click="toolAreaClick"
                @contextmenu="toolAreaContextmenu"
            >
                <FullscreenTool :chartContainerRef="chartContainerRef" />
                <div
                    ref="tradingviewRef"
                    class="command far fa-chart-candlestick"
                    :title="$t('trading.derivative.tradingview')"
                    @click="tradingviewClick"
                ></div>
                <ProgressTool
                    ref="progressToolRef"
                    @refreshPattern="refreshPattern"
                    @hideContext="hideContext"
                />
                <ScanTool
                    ref="scanToolRef"
                    :prices="state.data.price"
                    :timeToIndex="timeToIndex"
                    @scaned="scaned"
                    @removePattern="() => patternToolRef.remove()"
                    @hideContext="hideContext"
                />
                <PatternTool
                    ref="patternToolRef"
                    :prices="state.data.price"
                    :priceSeries="state.series.price"
                    :timeMarkSeries="state.series.timeMark"
                    :pickTimeToolRef="pickTimeToolRef"
                    :timeToIndex="timeToIndex"
                    :indexToTime="indexToTime"
                    @setProgress="setProgress"
                    @hideContext="hideContext"
                />
                <PickTimeTool
                    ref="pickTimeToolRef"
                    :pickTimeSeries="state.series.pickTime"
                    @refreshPattern="refreshPattern"
                    @hideContext="hideContext"
                />
                <LineTool
                    ref="lineToolRef"
                    :priceSeries="state.series.price"
                    @hideContext="hideContext"
                />
                <TimeRangeTool
                    ref="timeRangeToolRef"
                    :timeRangeSeries="state.series.timeRange"
                    :timeToIndex="timeToIndex"
                    :indexToTime="indexToTime"
                    @hideContext="hideContext"
                />
                <TargetTool
                    ref="targetToolRef"
                    :priceSeries="state.series.price"
                    @hideContext="hideContext"
                />
                <div
                    v-show="showCancelOrder"
                    ref="cancelOrderRef"
                    class="cancel-order command"
                    :title="$t('trading.derivative.cancelTool')"
                    @click="cancelOrderClick"
                >
                    <i
                        class="far fa-trash-alt"
                        :class="{ blink: state.isOrderWarning }"
                    >
                    </i>
                </div>
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
                :style="state.tradingViewStyle"
                :src="tradingViewSrc"
            ></iframe>
        </div>
    </div>
</template>

<script setup>
import FullscreenTool from "./Tools/FullscreenTool.vue";
import ProgressTool from "./Tools/ProgressTool.vue";
import ScanTool from "./Tools/ScanTool.vue";
import PatternTool from "./Tools/PatternTool.vue";
import PickTimeTool from "./Tools/PickTimeTool.vue";
import LineTool from "./Tools/LineTool.vue";
import TimeRangeTool from "./Tools/TimeRangeTool.vue";
import TargetTool from "./Tools/TargetTool.vue";

import { createChart } from "../../../plugins/lightweight-charts.esm.development";
import { alert } from "devextreme/ui/dialog";
import { confirm } from "devextreme/ui/dialog";
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
import {
    format,
    getUnixTime,
    addHours,
    subSeconds,
    differenceInSeconds,
} from "date-fns";

const CHART_OPTIONS = {
    localization: { dateFormat: "dd/MM/yyyy", locale: "vi-VN" },
    rightPriceScale: {
        visible: true,
        scaleMargins: { top: 0.25, bottom: 0.25 },
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
        rightOffset: 1000,
        minBarSpacing: 0.01,
        barSpacing: 0.05,
    },
};
const TP_DEFAULT = 3;
const SL_DEFAULT = 2;
const CURRENT_DATE = format(new Date(), "yyyy-MM-dd");
const TIME = {
    START: getUnixTime(new Date(`${CURRENT_DATE}T08:45:00Z`)),
    ATO: getUnixTime(new Date(`${CURRENT_DATE}T09:00:00Z`)),
    ATC: getUnixTime(new Date(`${CURRENT_DATE}T14:30:00Z`)),
    END: getUnixTime(new Date(`${CURRENT_DATE}T14:45:00Z`)),
};
const FIREANT_SOCKET_ENDPOINT =
    "wss://tradestation.fireant.vn/quote?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxODg5NjIyNTMwLCJuYmYiOjE1ODk2MjI1MzAsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsiYWNhZGVteS1yZWFkIiwiYWNhZGVteS13cml0ZSIsImFjY291bnRzLXJlYWQiLCJhY2NvdW50cy13cml0ZSIsImJsb2ctcmVhZCIsImNvbXBhbmllcy1yZWFkIiwiZmluYW5jZS1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImludmVzdG9wZWRpYS1yZWFkIiwib3JkZXJzLXJlYWQiLCJvcmRlcnMtd3JpdGUiLCJwb3N0cy1yZWFkIiwicG9zdHMtd3JpdGUiLCJzZWFyY2giLCJzeW1ib2xzLXJlYWQiLCJ1c2VyLWRhdGEtcmVhZCIsInVzZXItZGF0YS13cml0ZSIsInVzZXJzLXJlYWQiXSwianRpIjoiMjYxYTZhYWQ2MTQ5Njk1ZmJiYzcwODM5MjM0Njc1NWQifQ.dA5-HVzWv-BRfEiAd24uNBiBxASO-PAyWeWESovZm_hj4aXMAZA1-bWNZeXt88dqogo18AwpDQ-h6gefLPdZSFrG5umC1dVWaeYvUnGm62g4XS29fj6p01dhKNNqrsu5KrhnhdnKYVv9VdmbmqDfWR8wDgglk5cJFqalzq6dJWJInFQEPmUs9BW_Zs8tQDn-i5r4tYq2U8vCdqptXoM7YgPllXaPVDeccC9QNu2Xlp9WUvoROzoQXg25lFub1IYkTrM66gJ6t9fJRZToewCt495WNEOQFa_rwLCZ1QwzvL0iYkONHS_jZ0BOhBCdW9dWSawD6iF1SIQaFROvMDH1rg";
const VPS_SOCKET_ENDPOINT =
    "wss://datafeed.vps.com.vn/socket.io/?EIO=3&transport=websocket";
const store = useStore();
const route = useRoute();
const { t } = useI18n();
const devices = inject("devices");
const mf = inject("mf");
const filters = inject("filters");
const chartContainerRef = ref(null);
const orderChartRef = ref(null);
const connectionRef = ref(null);
const fullscreenToolRef = ref(null);
const tradingviewChartRef = ref(null);
const reloadToolRef = ref(null);
const tradingviewRef = ref(null);
const progressToolRef = ref(null);
const lineToolRef = ref(null);
const patternToolRef = ref(null);
const pickTimeToolRef = ref(null);
const targetToolRef = ref(null);
const timeRangeToolRef = ref(null);
const scanToolRef = ref(null);
const cancelOrderRef = ref(null);
const entryOrderRef = ref(null);
const tpslOrderRef = ref(null);

let params = {
    chart: {},
    series: {},
    data: {
        whitespace: [],
        price: [],
    },
    tools: { pattern: {} },
    crosshair: {},
    interval: null,
    interval60: null,
    websocket: null,
    socketStop: false,
    vpsUpdatedAt: subSeconds(new Date(), 61),
    isAutoOrdering: false,
    currentSeconds: getUnixTime(addHours(new Date(), 7)),
};
initToolsParams();
//
const state = reactive({
    data: {
        whitespace: [],
        price: [],
    },
    series: {},
    chartDate: route.query.date ?? CURRENT_DATE,
    clock: format(new Date(), "HH:mm:ss"),
    isFullscreen: false,
    isSocketWarning: false,
    isOrderWarning: false,
    lineColor: "#F44336",
    lineTitle: "",
    progress: {},
    scanSide: "left",
    showProgressContext: false,
    showScanContext: false,
    showLineContext: false,
    showTradingView: false,
    tradingViewStyle: { left: "32px" },
});
const status = computed(() => store.state.tradingDerivative.status);
const config = computed(() => store.state.tradingDerivative.config);
const tools = computed(() => store.state.tradingDerivative.tools);
const isLoading = computed(() => store.state.tradingDerivative.isLoading);
const showCancelOrder = computed(
    () =>
        status.value.position !== 0 ||
        !!status.value.pending ||
        !!tools.value.order
);
const tradingViewSrc = computed(() => {
    return `https://chart.vps.com.vn/tv/?u=${config.value.vpsUser}&s=${config.value.vpsSession}&symbol=VN30F1M&resolution=1&lang=vi`;
});

initChart();

params.interval = setInterval(intervalHandler, 1000);
params.interval60 = setInterval(() => {
    if (inSession()) {
        getStatus();
        if (config.value.autoRefresh) refreshPatternTool(true);
    } else clearInterval(params.interval60);
}, 60000);

onMounted(() => {
    params.chart = createChart(orderChartRef.value, CHART_OPTIONS);
    params.chart.subscribeCrosshairMove(eventChartCrosshairMove);
    params.chart.subscribeCustomPriceLineDragged(eventPriceLineDrag);
    params.series.whitespace = params.chart.addHistogramSeries({
        priceScaleId: "whitespace",
        scaleMargins: { top: 0, bottom: 0 },
        color: "#808080",
        lastValueVisible: false,
        priceLineVisible: false,
    });
    state.series.timeRange = params.chart.addHistogramSeries({
        priceScaleId: "timeRange",
        scaleMargins: { top: 0, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
    });
    state.series.pickTime = params.chart.addHistogramSeries({
        priceScaleId: "pickTime",
        scaleMargins: { top: 0, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
    });
    state.series.timeMark = params.chart.addHistogramSeries({
        priceScaleId: "timeMark",
        scaleMargins: { top: 0, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
    });
    state.series.price = params.chart.addLineSeries({
        color: "#F5F5F5",
        priceFormat: { minMove: 0.1 },
    });
    new ResizeObserver(eventChartResize).observe(chartContainerRef.value);
    document.addEventListener("keydown", eventKeyPress);
    // document.addEventListener("fullscreenchange", eventFullscreenChange);
});
onUnmounted(() => {
    if (params.chart) {
        params.chart.remove();
        params.chart = null;
    }
    document.removeEventListener("keydown", eventKeyPress);
    // document.removeEventListener("fullscreenchange", eventFullscreenChange);
    clearInterval(params.interval);
    clearInterval(params.interval60);
    closeSocket();
    params.socketStop = true;
});

watch(() => store.state.tradingDerivative.chartData, loadChartData);
watch(tools, loadToolsData);
watch(() => state.progress, progressAlert);
watch(
    () => config.value.source,
    (_, old) => (old ? connectSocket() : null)
);

function eventChartClick(e) {
    hideContext();
    toggleOrderButton(false);

    if (scanToolRef.value.isSelected()) {
        scanToolRef.value.draw({ time: params.crosshair.time });
    } else if (patternToolRef.value.isSelected()) {
        patternToolRef.value.draw({
            time: params.crosshair.time,
            price: coordinateToPrice(params.crosshair.y),
        });
    } else if (pickTimeToolRef.value.isSelected()) {
        pickTimeToolRef.value.draw({ time: params.crosshair.time });
    } else if (lineToolRef.value.isSelected()) {
        lineToolRef.value.draw({
            price: coordinateToPrice(params.crosshair.y),
        });
    } else if (timeRangeToolRef.value.isSelected()) {
        timeRangeToolRef.value.draw({ time: params.crosshair.time });
    } else if (targetToolRef.value.isSelected()) {
        targetToolRef.value.draw({
            price: coordinateToPrice(params.crosshair.y),
        });
    }
}
function eventChartContextmenu(e) {
    toggleOrderButton(true);
    e.preventDefault();
}
function toolAreaClick(e) {
    e.stopPropagation();
}
function toolAreaContextmenu(e) {
    e.preventDefault();
    e.stopPropagation();
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
    if (e.point !== undefined) {
        params.crosshair.x = e.point.x;
        params.crosshair.y = e.point.y;
    }
}
function eventPriceLineDrag(e) {
    let line = e.customPriceLine;
    let lineOptions = line.options();
    lineOptions.price = mf.fmtNum(lineOptions.price);
    const oldPrice = +e.fromPriceString;
    const newPrice = lineOptions.price;
    switch (lineOptions.lineType) {
        case "order":
            if (newPrice !== oldPrice) {
                let isChanged = false;
                if (lineOptions.kind === "entry") {
                    if (!status.value.position) {
                        isChanged = true;
                        params.tools.order[lineOptions.kind].price = newPrice;
                        store
                            .dispatch("tradingDerivative/executeOrder", {
                                action: "entry",
                                etData: {
                                    cmd: "change",
                                    price: params.tools.order.entry.price,
                                },
                            })
                            .then((resp) => {
                                if (resp.isOk) {
                                    drawOrderTool([lineOptions.kind]);
                                    toast.success(
                                        t(
                                            "trading.derivative.changeEntrySuccess"
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
                    params.tools.order[lineOptions.kind].price = newPrice;
                    if (lineOptions.kind === "tp")
                        store
                            .dispatch("tradingDerivative/executeOrder", {
                                action: "tp",
                                tpData: {
                                    cmd: "change",
                                    price: params.tools.order.tp.price,
                                },
                            })
                            .then((resp) => {
                                if (resp.isOk) {
                                    drawOrderTool([lineOptions.kind]);
                                    toast.success(
                                        t("trading.derivative.changeTpSuccess")
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
                            .dispatch("tradingDerivative/executeOrder", {
                                action: "sl",
                                slData: {
                                    cmd: "change",
                                    price: params.tools.order.sl.price,
                                },
                            })
                            .then((resp) => {
                                if (resp.isOk) {
                                    drawOrderTool([lineOptions.kind]);
                                    toast.success(
                                        t("trading.derivative.changeSlSuccess")
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
                    toast.show(t("trading.derivative.noChangeOrderLine"));
                }
            }
            break;
        case "line":
            lineToolRef.value.drag({ lineOptions, oldPrice, newPrice });
            break;
        case "target":
            targetToolRef.value.drag({ lineOptions, newPrice });
            break;
        case "pattern":
            patternToolRef.value.drag({ lineOptions });
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
    if (e.ctrlKey) {
        switch (e.keyCode) {
            case 219:
                params.chart.timeScale().applyOptions({
                    barSpacing:
                        params.chart.options().timeScale.barSpacing - 0.01,
                });
                break;
            case 221:
                params.chart.timeScale().applyOptions({
                    barSpacing:
                        params.chart.options().timeScale.barSpacing + 0.01,
                });
                break;
        }
    }
    if (e.altKey) {
        switch (e.keyCode) {
            case 219:
                params.chart
                    .timeScale()
                    .scrollToPosition(
                        params.chart.timeScale().scrollPosition() - 50
                    );
                break;
            case 221:
                params.chart
                    .timeScale()
                    .scrollToPosition(
                        params.chart.timeScale().scrollPosition() + 50
                    );
                break;
        }
    }
}
function loadChartData(chartData) {
    if (!(state.chartDate === CURRENT_DATE && inSession())) {
        if (chartData.price.length > 0) {
            params.data.whitespace = mergeChartData(
                params.data.whitespace,
                createWhitespaceData(state.chartDate)
            );
            state.data.whitespace = params.data.whitespace;
        }
        params.series.whitespace.setData(params.data.whitespace);

        params.data.price = mergeChartData(params.data.price, chartData.price);
        state.data.price = params.data.price;
        state.series.price.setData(params.data.price);
    }
}
function updateChartData(data, source = null) {
    const _source = source ?? config.value.source;
    let prices = [];
    data.forEach((item) => {
        let time, value;
        if (_source === "FireAnt") {
            time = getUnixTime(addHours(new Date(item.date), 7));
            value = item.price;
        } else {
            time = getUnixTime(new Date(`${CURRENT_DATE}T${item.time}Z`));
            value = item.lastPrice;
        }
        prices.push({ time, value });
    });
    if (prices.length > 1) {
        params.data.price = mergeChartData(params.data.price, prices);
        state.data.price = params.data.price;
        state.series.price.setData(params.data.price);
    } else {
        params.data.price.push(prices[0]);
        state.data.price = params.data.price;
        state.series.price.update(prices[0]);
    }
}
function createWhitespaceData(date) {
    const amStart = getUnixTime(new Date(`${date}T09:00:00Z`));
    const amEnd = getUnixTime(new Date(`${date}T11:30:00Z`));
    const pmStart = getUnixTime(new Date(`${date}T13:00:00Z`));
    const pmEnd = getUnixTime(new Date(`${date}T14:30:00Z`));
    const pm14h00 = getUnixTime(new Date(`${date}T14:00:00Z`));
    let data = [];
    for (let sec = amStart; sec <= pmEnd; sec++) {
        if (sec > amEnd && sec < pmStart) continue;
        let item = { time: sec };
        if (sec === pm14h00 || sec === pmEnd) item.value = 1;
        data.push(item);
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
function loadToolsData(toolsData) {
    removeAllTools();
    Object.entries(toolsData).forEach(([name, points]) => {
        switch (name) {
            case "order":
                loadOrderTool(points);
                break;
            case "pattern":
                if (checkPatternPointsValid(points)) {
                    patternToolRef.value.load(mf.cloneDeep(points));
                }
                break;
            case "tr":
                timeRangeToolRef.value.load(points);
                break;
            case "0_pt":
                pickTimeToolRef.value.load(points[0]);
                break;
            case "line":
                lineToolRef.value.load(points);
                break;
            case "target":
                targetToolRef.value.load(points);
                break;
        }
    });
}
function progressAlert(newProgress, oldProgress) {
    if (config.value.autoRefresh) {
        if (
            newProgress.step > oldProgress.step ||
            (newProgress.step === oldProgress.step &&
                newProgress.result > oldProgress.result)
        ) {
            let text = "";
            if (newProgress.result) {
                if ([2, 4, 5].includes(newProgress.step))
                    text = t("trading.derivative.progressOrder", newProgress);
                else
                    text = t("trading.derivative.progressSuccess", newProgress);
            } else text = t("trading.derivative.progressFail", newProgress);
            speakAlert(text);
        }
    }
}
function speakAlert(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "vi-VN";
    speechSynthesis.speak(utterance);
}
async function connectSocket() {
    if (inSession()) {
        await closeSocket();
        const isFireAnt = config.value.source === "FireAnt";
        const enpoint = isFireAnt
            ? FIREANT_SOCKET_ENDPOINT
            : VPS_SOCKET_ENDPOINT;
        params.websocket = new WebSocket(enpoint);
        params.websocket.onclose = (e) => {
            if (!params.socketStop) {
                state.isSocketWarning = true;
                connectSocket();
            }
        };
        if (isFireAnt) configFireAntSocket();
        else {
            getVpsData();
            configVpsSocket();
        }
    }
}
async function closeSocket() {
    if (params.websocket && params.websocket.readyState === WebSocket.OPEN) {
        params.websocket.close();

        await new Promise((resolve) => {
            const interval = setInterval(() => {
                if (
                    !params.websocket ||
                    params.websocket.readyState === WebSocket.CLOSED
                ) {
                    params.websocket = null;
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });
    }
}
function configFireAntSocket() {
    store.dispatch("tradingDerivative/setLoading", true);
    params.websocket.onopen = (e) => {
        if (params.websocket.readyState === WebSocket.OPEN) {
            let message = '{"protocol":"json","version":1}';
            params.websocket.send(message);
            message =
                '{"arguments":["VN30F1M"],"invocationId":"0","target":"SubscribeTrades","type":1}';
            params.websocket.send(message);
        }
    };
    params.websocket.onmessage = (e) => {
        state.isSocketWarning = false;
        const data = parseFireAntMessage(e.data);
        data.forEach((item) => {
            if (!item) return false;
            if (item.type === 3) {
                const date = item.result[0].date.slice(0, 10);
                if (date === CURRENT_DATE) {
                    getTools();
                    params.data.whitespace = mergeChartData(
                        params.data.whitespace,
                        createWhitespaceData(CURRENT_DATE)
                    );
                    state.data.whitespace = params.data.whitespace;
                    params.series.whitespace.setData(params.data.whitespace);
                    updateChartData(item.result);
                }
                store.dispatch("tradingDerivative/setLoading", false);
            } else if (
                item.type === 1 &&
                item.target === "UpdateTrades" &&
                item.arguments[0] === "VN30F1M"
            ) {
                console.log("FireAnt", item.arguments[1]);
                scanOrder(item.arguments[1].at(-1).price);
                updateChartData(item.arguments[1]);
            }
        });
    };
}
function parseFireAntMessage(msg) {
    let result = [];
    msg.split("").forEach((item) => {
        const startPos = item.indexOf("{");
        const endPos = item.lastIndexOf("}");
        let temp = null;
        if (startPos !== -1 && endPos !== -1 && endPos > startPos) {
            const filteredData = item.substring(startPos, endPos + 1);
            if (filteredData !== "{}") temp = JSON.parse(filteredData);
        }
        result.push(temp);
    });
    return result;
}
function configVpsSocket() {
    params.websocket.onopen = (e) => {
        if (params.websocket.readyState === WebSocket.OPEN) {
            const msg = {
                action: "join",
                list: config.value.vn30f1m,
            };
            const message = `42${JSON.stringify([
                "regs",
                JSON.stringify(msg),
            ])}`;
            params.websocket.send(message);
        }
    };
    params.websocket.onmessage = (e) => {
        state.isSocketWarning = false;
        if (e.data.substr(0, 1) === "4") {
            if (e.data.substr(1, 1) === "2") {
                const event = JSON.parse(e.data.substr(2));
                if (event[0] === "stockps") {
                    const data = event[1].data;
                    if (data.id === 3220) {
                        console.log("VPS", data);
                        scanOrder(data.lastPrice);
                        updateChartData([data]);
                    }
                }
            }
        }
    };
}
function getVpsData() {
    if (differenceInSeconds(new Date(), new Date(params.vpsUpdatedAt)) > 60) {
        fetch("https://bddatafeed.vps.com.vn/getpschartintraday/VN30F1M")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                updateChartData(data, "VPS");
            });
        params.vpsUpdatedAt = new Date();
    }
}
function intervalHandler() {
    params.currentSeconds = getUnixTime(addHours(new Date(), 7));
    if (inSession()) {
        if (!!status.value.position) {
            if (params.currentSeconds > TIME.ATC - 5 * 60) {
                state.isOrderWarning = true;
                if (
                    params.currentSeconds > TIME.ATC - 15 &&
                    mf.isSet(params.tools.order.tp.line)
                ) {
                    store
                        .dispatch("tradingDerivative/executeOrder", {
                            action: "cancel",
                            tpData: { cmd: "cancel" },
                            slData: { cmd: "delete" },
                        })
                        .then((resp) => {
                            if (resp.isOk) {
                                removeOrderTool(["entry", "tp", "sl"]);
                                toast.success(
                                    t(
                                        "trading.derivative.autoCancelTpSlSuccess"
                                    )
                                );
                            } else toastOrderError(resp.message);
                        });
                }
            }
        }
        if (config.value.openingMarket && params.currentSeconds === TIME.START)
            connectSocket();
    }
    state.clock = format(new Date(), "HH:mm:ss");
}
function drawOrderTool(kinds) {
    const TYPE = "order";
    let param = {
        isRemove: false,
        name: TYPE,
        points: [],
        data: [],
    };
    let color, title;
    kinds.forEach((kind) => {
        const entryPrice = params.tools.order.entry.price;
        const tpPrice = params.tools.order.tp.price;
        const slPrice = params.tools.order.sl.price;
        switch (kind) {
            case "entry":
                color = "yellow";
                title = params.tools.order.side > 0 ? "LONG" : "SHORT";
                break;
            case "tp":
                color = "lime";
                title = mf.fmtNum(tpPrice - entryPrice, 1, true);
                break;
            case "sl":
                color = "red";
                title = mf.fmtNum(slPrice - entryPrice, 1, true);
                break;
        }
        param.points.push(kind);
        if (mf.isSet(params.tools.order[kind].line)) {
            params.tools.order[kind].line.applyOptions({
                price: params.tools.order[kind].price,
                title: title,
            });
            param.data.push(params.tools.order[kind].line.options());
        } else {
            const options = {
                lineType: TYPE,
                kind: kind,
                side: params.tools.order.side,
                price: params.tools.order[kind].price,
                color: color,
                lineWidth: 1,
                lineStyle: 0,
                title: title,
                draggable: true,
            };
            params.tools.order[kind].line =
                state.series.price.createPriceLine(options);
            param.data.push(options);
        }
    });
    store.dispatch("tradingDerivative/drawTools", param);
}
function loadOrderTool(kinds) {
    Object.entries(kinds).forEach(([kind, option]) => {
        params.tools.order.side = option.side;
        params.tools.order[kind].price = option.price;
        params.tools.order[kind].line =
            state.series.price.createPriceLine(option);
    });
}
function removeOrderTool(kinds, withServer = true) {
    if (withServer)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: true,
            name: "order",
        });
    kinds.forEach((kind) => {
        if (mf.isSet(params.tools.order[kind].line)) {
            state.series.price.removePriceLine(params.tools.order[kind].line);
            delete params.tools.order[kind].line;
        }
    });
}
function tradingviewClick(e) {
    state.showTradingView = !state.showTradingView;
    e.stopPropagation();
}
function refreshPattern() {
    patternToolRef.value.refresh();
}
function scaned(points) {
    console.log("scaned", points);
    patternToolRef.value.load(points, true);
}
function hideContext() {
    progressToolRef.value.hide();
    scanToolRef.value.hide();
    lineToolRef.value.hide();
}
function checkPatternPointsValid({ A: { time } }) {
    return params.data.whitespace.some((item) => item.time === time);
}
function setProgress(value) {
    progressToolRef.value.set(value);
}
function removeAllTools() {
    removeOrderTool(["entry", "tp", "sl"], false);
}
function toggleOrderButton(show) {
    if (show) {
        if (inSession()) {
            if (!mf.isSet(params.tools.order.tp.line)) {
                if (!!status.value.position) {
                    if (
                        params.currentSeconds > TIME.ATO &&
                        params.currentSeconds < TIME.ATC
                    ) {
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
            if (!mf.isSet(params.tools.order.entry.line)) {
                let price = null,
                    side = 0;
                if (!status.value.position) {
                    if (
                        params.currentSeconds > TIME.ATO &&
                        params.currentSeconds < TIME.ATC
                    ) {
                        price = coordinateToPrice(params.crosshair.y);
                        side = price >= params.data.price.at(-1).value ? 1 : -1;
                        params.tools.order.side = side;
                        params.tools.order.entry.price = price;
                    }
                } else {
                    if (params.currentSeconds < TIME.ATO) price = "ATO";
                    else if (params.currentSeconds > TIME.ATC) price = "ATC";
                    if (!!price) {
                        params.tools.order.entry.price = price;
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
    } else {
        entryOrderRef.value.style.display = "none";
        tpslOrderRef.value.style.display = "none";
    }
}
function entryOrderClick() {
    if (inSession()) {
        if (params.currentSeconds < TIME.ATO) {
            let result = confirm(
                t("trading.derivative.atoOrder"),
                t("titles.confirm")
            );
            result.then((dialogResult) => {
                if (dialogResult) {
                    store
                        .dispatch("tradingDerivative/executeOrder", {
                            action: "exit",
                            exitData: {
                                cmd: "new",
                                price: "ATO",
                            },
                        })
                        .then((resp) => {
                            if (resp.isOk)
                                toast.success(
                                    t("trading.derivative.atoOrderSuccess")
                                );
                            else toastOrderError(resp.message);
                        });
                }
            });
        } else if (params.currentSeconds < TIME.ATC) {
            store
                .dispatch("tradingDerivative/executeOrder", {
                    action: "entry",
                    etData: {
                        cmd: "new",
                        side: params.tools.order.side,
                        price: params.tools.order.entry.price,
                    },
                })
                .then((resp) => {
                    if (resp.isOk) {
                        drawOrderTool(["entry"]);
                        toast.success(t("trading.derivative.newEntrySuccess"));
                    } else toastOrderError(resp.message);
                });
        } else {
            let result = confirm(
                t("trading.derivative.atcOrder"),
                t("titles.confirm")
            );
            result.then((dialogResult) => {
                if (dialogResult) {
                    store
                        .dispatch("tradingDerivative/executeOrder", {
                            action: "exit",
                            exitData: {
                                cmd: "new",
                                price: "ATC",
                            },
                        })
                        .then((resp) => {
                            if (resp.isOk)
                                toast.success(
                                    t("trading.derivative.atcOrderSuccess")
                                );
                            else toastOrderError(resp.message);
                        });
                }
            });
        }
    }
}
function tpslOrderClick() {
    params.tools.order.tp.price =
        params.tools.order.entry.price + params.tools.order.side * TP_DEFAULT;
    params.tools.order.sl.price =
        params.tools.order.entry.price - params.tools.order.side * SL_DEFAULT;
    store
        .dispatch("tradingDerivative/executeOrder", {
            action: "tpsl",
            tpData: {
                cmd: "new",
                price: params.tools.order.tp.price,
            },
            slData: {
                cmd: "new",
                price: params.tools.order.sl.price,
            },
        })
        .then((resp) => {
            if (resp.isOk) {
                params.tools.order.entry.line.applyOptions({
                    draggable: false,
                });
                drawOrderTool(["entry", "tp", "sl"]);
                toast.success(t("trading.derivative.newTpSlSuccess"));
            } else toastOrderError(resp.message);
        });
}
function cancelOrderClick() {
    if (mf.isSet(params.tools.order.entry.line)) {
        if (mf.isSet(params.tools.order.tp.line)) {
            store
                .dispatch("tradingDerivative/executeOrder", {
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
                        removeOrderTool(["entry", "tp", "sl"]);
                        toast.success(t("trading.derivative.exitSuccess"));
                    } else {
                        toastOrderError(resp.message);
                    }
                });
        } else {
            store
                .dispatch("tradingDerivative/executeOrder", {
                    action: "entry",
                    etData: { cmd: "delete" },
                })
                .then((resp) => {
                    if (resp.isOk) {
                        removeOrderTool(["entry"]);
                        toast.success(
                            t("trading.derivative.deleteEntrySuccess")
                        );
                    } else {
                        toastOrderError(resp.message);
                    }
                });
        }
    } else getTools();
}
function scanOrder(lastPrice) {
    if (mf.isSet(params.tools.order.entry.line)) {
        if (mf.isSet(params.tools.order.tp.line)) {
            if (
                (params.tools.order.side > 0 &&
                    lastPrice >= params.tools.order.tp.price) ||
                (params.tools.order.side < 0 &&
                    lastPrice <= params.tools.order.tp.price)
            ) {
                if (!params.isAutoOrdering) {
                    params.isAutoOrdering = true;
                    store
                        .dispatch("tradingDerivative/executeOrder", {
                            action: "sl",
                            slData: {
                                cmd: "delete",
                            },
                        })
                        .then((resp) => {
                            if (resp.isOk) {
                                removeOrderTool(["entry", "tp", "sl"]);
                                toast.success(
                                    t("trading.derivative.deleteTpSuccess")
                                );
                                toggleOrderButton(false);
                            } else toastOrderError(resp.message);
                            params.isAutoOrdering = false;
                        });
                }
            }
            if (
                (params.tools.order.side > 0 &&
                    lastPrice <= params.tools.order.sl.price) ||
                (params.tools.order.side < 0 &&
                    lastPrice >= params.tools.order.sl.price)
            ) {
                if (!params.isAutoOrdering) {
                    params.isAutoOrdering = true;
                    store
                        .dispatch("tradingDerivative/executeOrder", {
                            action: "tp",
                            tpData: {
                                cmd: "cancel",
                            },
                        })
                        .then((resp) => {
                            if (resp.isOk) {
                                removeOrderTool(["entry", "tp", "sl"]);
                                toast.success(
                                    t("trading.derivative.deleteSlSuccess")
                                );
                                toggleOrderButton(false);
                            } else toastOrderError(resp.message);
                            params.isAutoOrdering = false;
                        });
                }
            }
        } else {
            if (
                (params.tools.order.side > 0 &&
                    lastPrice >= params.tools.order.entry.price) ||
                (params.tools.order.side < 0 &&
                    lastPrice <= params.tools.order.entry.price)
            ) {
                if (!params.isAutoOrdering) {
                    params.isAutoOrdering = true;
                    setTimeout(() => {
                        params.tools.order.tp.price =
                            params.tools.order.entry.price +
                            params.tools.order.side * TP_DEFAULT;
                        params.tools.order.sl.price =
                            params.tools.order.entry.price -
                            params.tools.order.side * SL_DEFAULT;
                        store
                            .dispatch("tradingDerivative/executeOrder", {
                                action: "tpsl",
                                tpData: {
                                    cmd: "new",
                                    price: params.tools.order.tp.price,
                                },
                                slData: {
                                    cmd: "new",
                                    price: params.tools.order.sl.price,
                                },
                            })
                            .then((resp) => {
                                if (resp.isOk) {
                                    params.tools.order.entry.line.applyOptions({
                                        draggable: false,
                                    });
                                    drawOrderTool(["entry", "tp", "sl"]);
                                    toast.success(
                                        t(
                                            "trading.derivative.autoNewTpSlSuccess"
                                        )
                                    );
                                } else toastOrderError(resp.message);
                                params.isAutoOrdering = false;
                            });
                    }, 1000);
                }
            }
        }
    }
}
function chartTopClick() {
    params.chart.timeScale().scrollToRealTime();
}
function inSession() {
    return (
        config.value.openingMarket &&
        params.currentSeconds >= TIME.START &&
        params.currentSeconds <= TIME.END
    );
}
function dateSelectChange() {
    if (!state.chartDate) return false;
    getChartData();
}
function resetChart() {
    params.data.whitespace = [];
    params.data.price = [];
    state.data.whitespace = params.data.whitespace;
    state.data.price = params.data.price;
    connectSocket();
    getChartData();
}
function initChart() {
    store.dispatch("tradingDerivative/initChart").then(() => {
        connectSocket();
        if (!route.query.date && config.value.lastOpeningDate)
            state.chartDate = config.value.lastOpeningDate;
        getChartData();
    });
}
function getChartData() {
    store
        .dispatch("tradingDerivative/getChartData", state.chartDate)
        .then((hasData) => {
            if (hasData) getTools();
        });
}
function getStatus() {
    store.dispatch("tradingDerivative/getStatus");
}
function getTools() {
    store.dispatch("tradingDerivative/getTools");
}
function initToolsParams(tools) {
    if (!tools) tools = ["order", "lines", "tr", "pattern", "target", "pt"];
    if (tools.includes("order"))
        params.tools.order = { side: 0, entry: {}, tp: {}, sl: {} };
    if (tools.includes("lines")) params.tools.lines = [];
    if (tools.includes("target")) params.tools.target = {};
    if (tools.includes("tr")) params.tools.timeRange = [];
    if (tools.includes("pattern")) params.tools.pattern.lines = {};
    if (tools.includes("pt")) params.tools.pickTime = null;
}
function getAccountInfo() {
    store.dispatch("tradingDerivative/getAccountInfo").then((data) => {
        let html = "";
        html += '<div style="width: 200px;">';
        html += `<div style="display: flex;"><div style="flex: 0 0 75px;">${t(
            "trading.derivative.nav"
        )}</div><div>: ${filters.currency(data.nav)}</div></div>`;
        html += `<div style="display: flex;"><div style="flex: 0 0 75px;">${t(
            "trading.derivative.maxVol"
        )}</div><div>: ${filters.numberVnFormat(data.maxVol)}</div></div>`;
        html += `<div style="display: flex;"><div style="flex: 0 0 75px;">${t(
            "trading.derivative.vm"
        )}</div><div>: ${filters.currency(data.vm)}</div></div>`;
        html += `<div style="display: flex;"><div style="flex: 0 0 75px;">${t(
            "trading.derivative.fee"
        )}</div><div>: ${filters.currency(data.fee)}</div></div>`;
        html += "</div>";
        alert(html, t("trading.derivative.accountInfo"));
    });
}
function coordinateToPrice(y) {
    return mf.fmtNum(state.series.price.coordinateToPrice(y));
}
// function mf.fmtNum(price, digits = 1, abs = false) {
//     price = +price;
//     if (abs) price = Math.abs(price);
//     return parseFloat(price.toFixed(digits));
// }
function toastOrderError(error) {
    if (!error) error = "unknown";
    toast.error(t(`trading.derivative.${error}`));
}
// function mf.cmp(value1, side, value2, eq = false) {
//     if (side) return eq ? value1 >= value2 : value1 > value2;
//     else return eq ? value1 <= value2 : value1 < value2;
// }
function timeToIndex(time) {
    let index = params.data.whitespace.findIndex((item) => item.time === time);
    if (index === -1) {
        const date = format(new Date(time * 1000), "yyyy-MM-dd");
        const amEnd = getUnixTime(new Date(`${date}T11:30:00Z`));
        const pmStart = getUnixTime(new Date(`${date}T13:00:00Z`));
        const pmEnd = getUnixTime(new Date(`${date}T14:30:00Z`));
        if (time > amEnd && time < pmStart) time = amEnd;
        else if (time > pmEnd) time = pmEnd;
        index = params.data.whitespace.findIndex((item) => item.time === time);
    }
    return index;
}
function indexToTime(index) {
    if (index < params.data.whitespace.length)
        return params.data.whitespace[index].time;
    else return false;
}
</script>
<style lang="scss">
.derivative-chart {
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
                position: relative;

                .contextmenu {
                    position: absolute;
                    top: 0px;
                    left: 42px;
                }
            }

            .cancel-order {
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

        &.selected {
            color: #1f62ff !important;
        }

        &:not(.noaction):hover {
            background: #2a2e39 !important;
        }

        &.noaction {
            cursor: unset !important;
        }

        &.green {
            color: lime;
        }

        &.red {
            color: red;
        }

        &.yellow {
            color: orange;
        }

        i {
            pointer-events: none;

            &.blink {
                animation: blinker 0.5s linear infinite;
            }

            @keyframes blinker {
                0% {
                    opacity: 1;
                }

                50% {
                    opacity: 0;
                }

                100% {
                    opacity: 1;
                }
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
            background: yellow;
        }
    }

    .chart-top {
        position: absolute;
        bottom: 29px;
        right: 55px;
        border-radius: 50%;
        border: 1px solid #2b2b43;
        padding-left: 0.7px;
        padding-top: 1.3px;
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
