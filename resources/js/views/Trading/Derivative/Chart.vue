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
                <TradingviewTool
                    ref="tradingviewRef"
                    :vpsUser="config.vpsUser"
                    :vpsSession="config.vpsSession"
                    :chartContainerRef="chartContainerRef"
                />
                <ProgressTool
                    ref="progressToolRef"
                    :position="status.position"
                    @refreshPattern="refreshPattern"
                    @hideContext="hideContext"
                />
                <ScanTool
                    ref="scanToolRef"
                    :prices="state.prices"
                    :timeToIndex="timeToIndex"
                    @scaned="patternScaned"
                    @removePattern="() => patternToolRef.remove()"
                    @hideContext="hideContext"
                />
                <PatternTool
                    ref="patternToolRef"
                    :prices="state.prices"
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
                <OrderTool
                    v-show="showCancelOrder"
                    ref="orderToolRef"
                    :position="status.position"
                    :prices="state.prices"
                    :priceSeries="state.series.price"
                    :inSession="inSession"
                    :TIME="state.TIME"
                    @getTools="getTools"
                    @showEntry="showEntryButton"
                    @showTpSl="showTpSlButton"
                    @orderChanged="orderChanged"
                    @hideContext="hideContext"
                />
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
        </div>
    </div>
</template>

<script setup>
import FullscreenTool from "./Tools/FullscreenTool.vue";
import TradingviewTool from "./Tools/TradingviewTool.vue";
import ProgressTool from "./Tools/ProgressTool.vue";
import ScanTool from "./Tools/ScanTool.vue";
import PatternTool from "./Tools/PatternTool.vue";
import PickTimeTool from "./Tools/PickTimeTool.vue";
import LineTool from "./Tools/LineTool.vue";
import TimeRangeTool from "./Tools/TimeRangeTool.vue";
import TargetTool from "./Tools/TargetTool.vue";
import OrderTool from "./Tools/OrderTool.vue";

import { createChart } from "../../../plugins/lightweight-charts.esm.development";
import { alert } from "devextreme/ui/dialog";
import {
    ref,
    reactive,
    inject,
    computed,
    watch,
    onMounted,
    onUnmounted,
} from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import {
    format,
    getUnixTime,
    addHours,
    subSeconds,
    differenceInSeconds,
} from "date-fns";

const store = useStore();
const route = useRoute();
const { t } = useI18n();
const devices = inject("devices");
const mf = inject("mf");
const filters = inject("filters");
const chartContainerRef = ref(null);
const orderChartRef = ref(null);
const connectionRef = ref(null);
const reloadToolRef = ref(null);
const tradingviewRef = ref(null);
const progressToolRef = ref(null);
const lineToolRef = ref(null);
const patternToolRef = ref(null);
const pickTimeToolRef = ref(null);
const targetToolRef = ref(null);
const timeRangeToolRef = ref(null);
const scanToolRef = ref(null);
const orderToolRef = ref(null);
const entryOrderRef = ref(null);
const tpslOrderRef = ref(null);

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

let params = {
    chart: {},
    whitespaces: [],
    crosshair: {},
    interval1: null,
    interval30: null,
    websocket: null,
    socketStop: false,
    vpsUpdatedAt: subSeconds(new Date(), 61),
};
const state = reactive({
    prices: [],
    series: {},
    chartDate: route.query.date ?? CURRENT_DATE,
    clock: format(new Date(), "HH:mm:ss"),
    isSocketWarning: false,
    hasOrderLine: false,
    TIME,
});
const status = computed(() => store.state.tradingDerivative.status);
const config = computed(() => store.state.tradingDerivative.config);
const isLoading = computed(() => store.state.tradingDerivative.isLoading);
const showCancelOrder = computed(
    () => status.value.position || status.value.pending || state.hasOrderLine
);

params.interval1 = setInterval(() => {
    if (orderToolRef.value) orderToolRef.value.cancelWithoutClose();
    state.clock = format(new Date(), "HH:mm:ss");
}, 1000);
params.interval30 = setInterval(() => {
    if (inSession()) {
        getStatus();
        if (config.value.autoRefresh) patternToolRef.value.refresh(true);
    } else clearInterval(params.interval30);
}, 30000);

initChart();
onMounted(() => {
    drawChart();
    new ResizeObserver(eventChartResize).observe(chartContainerRef.value);
    document.addEventListener("keydown", eventKeyPress);
});
onUnmounted(() => {
    removeChart();
    document.removeEventListener("keydown", eventKeyPress);
    clearInterval(params.interval1);
    clearInterval(params.interval30);
    disconnectSocket();
    params.socketStop = true;
});

watch(() => store.state.tradingDerivative.chartData, loadChartData);

defineExpose({
    connectSocket,
});

function drawChart() {
    params.chart = createChart(orderChartRef.value, CHART_OPTIONS);
    params.chart.subscribeCrosshairMove(eventChartCrosshairMove);
    params.chart.subscribeCustomPriceLineDragged(eventPriceLineDrag);
    state.series.whitespace = params.chart.addHistogramSeries({
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
}
function removeChart() {
    if (params.chart) {
        params.chart.remove();
        params.chart = null;
    }
}
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
            orderToolRef.value.drag({ line, lineOptions, oldPrice, newPrice });
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
    if (chartContainerRef.value) {
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
            params.whitespaces = mergeChartData(
                params.whitespaces,
                createWhitespaceData(state.chartDate)
            );
        }
        state.series.whitespace.setData(params.whitespaces);

        state.prices = mergeChartData(state.prices, chartData.price);
        state.series.price.setData(state.prices);
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
        state.prices = mergeChartData(state.prices, prices);
        state.series.price.setData(state.prices);
    } else {
        state.prices.push(prices[0]);
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
async function connectSocket() {
    if (inSession()) {
        await disconnectSocket();
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
async function disconnectSocket() {
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
                    params.whitespaces = mergeChartData(
                        params.whitespaces,
                        createWhitespaceData(CURRENT_DATE)
                    );
                    state.series.whitespace.setData(params.whitespaces);
                    updateChartData(item.result);
                }
                store.dispatch("tradingDerivative/setLoading", false);
            } else if (
                item.type === 1 &&
                item.target === "UpdateTrades" &&
                item.arguments[0] === "VN30F1M"
            ) {
                console.log("FireAnt", item.arguments[1]);
                orderToolRef.value.scan(item.arguments[1].at(-1).price);
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
                        orderToolRef.value.scan(data.lastPrice);
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
function refreshPattern() {
    patternToolRef.value.refresh();
}
function patternScaned(points) {
    patternToolRef.value.load(points, { isSave: true });
}
function hideContext() {
    progressToolRef.value.hide();
    scanToolRef.value.hide();
    lineToolRef.value.hide();
}
function setProgress(value) {
    progressToolRef.value.set(value);
}
function orderChanged(hasOrder) {
    state.hasOrderLine = hasOrder;
}
function toggleOrderButton(show) {
    if (show) {
        orderToolRef.value.show({
            price: coordinateToPrice(params.crosshair.y),
        });
    } else {
        entryOrderRef.value.style.display = "none";
        tpslOrderRef.value.style.display = "none";
    }
}
function showEntryButton({ side, price }) {
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
    entryOrderRef.value.style.background = side > 0 ? "green" : "red";
    entryOrderRef.value.innerText = `${side > 0 ? "LONG" : "SHORT"} ${price}`;
    entryOrderRef.value.style.display = "block";
}
function showTpSlButton({ side }) {
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
    tpslOrderRef.value.style.background = side > 0 ? "green" : "red";
    tpslOrderRef.value.style.display = "block";
}
function entryOrderClick() {
    orderToolRef.value.entry();
}
function tpslOrderClick() {
    orderToolRef.value.tpsl();
}
function chartTopClick() {
    params.chart.timeScale().scrollToRealTime();
}
function inSession() {
    const currentSeconds = getUnixTime(addHours(new Date(), 7));
    return (
        config.value.openingMarket &&
        currentSeconds >= TIME.START &&
        currentSeconds <= TIME.END
    );
}
function dateSelectChange() {
    if (!state.chartDate) return false;
    getChartData();
}
function resetChart() {
    params.whitespaces = [];
    state.prices = [];
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
function timeToIndex(time) {
    let index = params.whitespaces.findIndex((item) => item.time === time);
    if (index === -1) {
        const date = format(new Date(time * 1000), "yyyy-MM-dd");
        const amEnd = getUnixTime(new Date(`${date}T11:30:00Z`));
        const pmStart = getUnixTime(new Date(`${date}T13:00:00Z`));
        const pmEnd = getUnixTime(new Date(`${date}T14:30:00Z`));
        if (time > amEnd && time < pmStart) time = amEnd;
        else if (time > pmEnd) time = pmEnd;
        index = params.whitespaces.findIndex((item) => item.time === time);
    }
    return index;
}
function indexToTime(index) {
    if (index < params.whitespaces.length)
        return params.whitespaces[index].time;
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

            .tradingview {
                .chart {
                    position: absolute;
                    z-index: 3;
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
            color: white !important;
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
}
</style>
