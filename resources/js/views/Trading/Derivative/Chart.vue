<template>
    <div
        ref="chartContainerRef"
        class="derivative-chart"
        @click="chartClick"
        @contextmenu="chartContextmenu"
    >
        <div ref="chartRef" />
        <div
            class="area data-area"
            @click="areaClick"
            @contextmenu="areaContextmenu"
        >
            <div
                ref="connectionRef"
                class="command"
                :class="{ yellow: status.pending, red: config.volInvalid }"
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
            @click="areaClick"
            @contextmenu="areaContextmenu"
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
            />
            <ProgressTool
                ref="progressToolRef"
                :chartHeightEnough="state.chartHeightEnough"
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
            <div class="chart-top" @click="chartTopClick">
                <i class="far fa-angle-double-right" />
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
import mqtt from "mqtt";
// import protobufjs from "protobufjs";
import {
    decodeEncapMessage,
    decodeMarketIndex,
    decodeTick,
} from "../../../plugins/dnse";
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
const mf = inject("mf");
const devices = inject("devices");
const filters = inject("filters");
const chartContainerRef = ref(null);
const chartRef = ref(null);
const connectionRef = ref(null);
const reloadToolRef = ref(null);
const fullscreenToolRef = ref(null);
const tradingviewToolRef = ref(null);
const progressToolRef = ref(null);
const scanToolRef = ref(null);
const patternToolRef = ref(null);
const pickTimeToolRef = ref(null);
const lineToolRef = ref(null);
const timeRangeToolRef = ref(null);
const targetToolRef = ref(null);
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
const SOCKET_ENDPOINT = {
    FIREANT:
        "wss://tradestation.fireant.vn/quote?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxODg5NjIyNTMwLCJuYmYiOjE1ODk2MjI1MzAsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsiYWNhZGVteS1yZWFkIiwiYWNhZGVteS13cml0ZSIsImFjY291bnRzLXJlYWQiLCJhY2NvdW50cy13cml0ZSIsImJsb2ctcmVhZCIsImNvbXBhbmllcy1yZWFkIiwiZmluYW5jZS1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImludmVzdG9wZWRpYS1yZWFkIiwib3JkZXJzLXJlYWQiLCJvcmRlcnMtd3JpdGUiLCJwb3N0cy1yZWFkIiwicG9zdHMtd3JpdGUiLCJzZWFyY2giLCJzeW1ib2xzLXJlYWQiLCJ1c2VyLWRhdGEtcmVhZCIsInVzZXItZGF0YS13cml0ZSIsInVzZXJzLXJlYWQiXSwianRpIjoiMjYxYTZhYWQ2MTQ5Njk1ZmJiYzcwODM5MjM0Njc1NWQifQ.dA5-HVzWv-BRfEiAd24uNBiBxASO-PAyWeWESovZm_hj4aXMAZA1-bWNZeXt88dqogo18AwpDQ-h6gefLPdZSFrG5umC1dVWaeYvUnGm62g4XS29fj6p01dhKNNqrsu5KrhnhdnKYVv9VdmbmqDfWR8wDgglk5cJFqalzq6dJWJInFQEPmUs9BW_Zs8tQDn-i5r4tYq2U8vCdqptXoM7YgPllXaPVDeccC9QNu2Xlp9WUvoROzoQXg25lFub1IYkTrM66gJ6t9fJRZToewCt495WNEOQFa_rwLCZ1QwzvL0iYkONHS_jZ0BOhBCdW9dWSawD6iF1SIQaFROvMDH1rg",
    VPS: "wss://datafeed.vps.com.vn/socket.io/?EIO=3&transport=websocket",
    DNSE: "wss://datafeed.dnse.com.vn/wss",
};

let params = {
    chart: {},
    whitespaces: [],
    crosshair: {},
    interval: null,
    refreshAt: subSeconds(new Date(), 11),
    statusAt: subSeconds(new Date(), 21),
    websocket: null,
    socketStop: false,
    socketUpdatedAt: subSeconds(new Date(), 61),
};
const state = reactive({
    prices: [],
    series: {},
    chartDate: route.query.date ?? CURRENT_DATE,
    clock: format(new Date(), "HH:mm:ss"),
    chartHeightEnough: false,
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

params.interval = setInterval(() => {
    state.clock = format(new Date(), "HH:mm:ss");
    if (inSession()) {
        if (orderToolRef.value) orderToolRef.value.cancelWithoutClose();
        if (differenceInSeconds(new Date(), new Date(params.refreshAt)) > 10) {
            if (config.value.autoRefresh) patternToolRef.value.refresh(true);
            params.refreshAt = new Date();
        }
        if (differenceInSeconds(new Date(), new Date(params.statusAt)) > 20) {
            getStatus();
            params.statusAt = new Date();
        }
    }
}, 1000);

initChart();
onMounted(() => {
    checkChartSize();
    drawChart();
    new ResizeObserver(chartResize).observe(chartContainerRef.value);
    document.addEventListener("keydown", chartShortcut);
});
onUnmounted(() => {
    removeChart();
    document.removeEventListener("keydown", chartShortcut);
    clearInterval(params.interval);
    disconnectSocket();
    params.socketStop = true;
});

watch(() => store.state.tradingDerivative.chartData, setChartData);

defineExpose({
    connectSocket,
});

function drawChart() {
    params.chart = createChart(chartRef.value, CHART_OPTIONS);
    params.chart.subscribeCrosshairMove(chartCrosshairMove);
    params.chart.subscribeCustomPriceLineDragged(priceLineDrag);
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
function chartClick(e) {
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
function chartContextmenu(e) {
    toggleOrderButton(true);
    e.preventDefault();
}
function areaClick(e) {
    e.stopPropagation();
}
function areaContextmenu(e) {
    e.preventDefault();
    e.stopPropagation();
}
function chartResize() {
    if (chartContainerRef.value) {
        checkChartSize();
        params.chart.resize(
            chartContainerRef.value.offsetWidth,
            chartContainerRef.value.offsetHeight
        );
        fullscreenToolRef.value.checkFullscreen();
    }
}
function checkChartSize() {
    state.chartHeightEnough = chartContainerRef.value.offsetHeight > 700;
}
function chartCrosshairMove(e) {
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
function priceLineDrag(e) {
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
function chartShortcut(e) {
    const timeScale = params.chart.timeScale();
    const barSpacing = params.chart.options().timeScale.barSpacing;
    switch (e.key) {
        case "[":
            if (e.ctrlKey) {
                timeScale.applyOptions({ barSpacing: barSpacing - 0.01 });
            } else if (e.altKey) {
                timeScale.scrollToPosition(timeScale.scrollPosition() - 50);
            }
            break;
        case "]":
            if (e.ctrlKey) {
                timeScale.applyOptions({ barSpacing: barSpacing + 0.01 });
            } else if (e.altKey) {
                timeScale.scrollToPosition(timeScale.scrollPosition() + 50);
            }
            break;
    }
}
function setChartData(chartData) {
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
        if (_source === "FIREANT") {
            time = getUnixTime(addHours(new Date(item.date), 7));
            value = item.price;
        } else if (_source === "VPS") {
            time = getUnixTime(new Date(`${CURRENT_DATE}T${item.time}Z`));
            value = item.lastPrice;
        } else if (_source === "DNSE") {
            time = getUnixTime(addHours(new Date(item.sendingTime), 7));
            value = item.matchPrice;
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
    const pm16h00 = getUnixTime(new Date(`${date}T16:00:00Z`));
    let data = [];
    for (let sec = amStart; sec <= pmEnd; sec++) {
        if (sec > amEnd && sec < pmStart) continue;
        let item = { time: sec };
        if (sec === pm14h00 || sec === pmEnd) item.value = 1;
        data.push(item);
    }
    if (state.chartDate === CURRENT_DATE) {
        for (let sec = pmEnd + 1; sec <= pm16h00; sec++) {
            let item = { time: sec };
            data.push(item);
        }
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
        const source = config.value.source;
        const enpoint = SOCKET_ENDPOINT[source];
        const closeHandler = () => {
            if (!params.socketStop) {
                state.isSocketWarning = true;
                connectSocket();
            }
        };
        if (source === "DNSE") {
            params.websocket = mqtt.connect(enpoint, {
                username: "entrade",
                password: "entrade",
            });
            params.websocket.on("close", closeHandler);
            configDnseSocket();
            getDnseData();
        } else {
            params.websocket = new WebSocket(enpoint);
            params.websocket.onclose = closeHandler;
            if (source === "FIREANT") configFIREANTSocket();
            else {
                configVpsSocket();
                getVpsData();
            }
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
function configFIREANTSocket() {
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
        const data = parseFIREANTMessage(e.data);
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
                console.log("FIREANT", item.arguments[1]);
                orderToolRef.value.scan(item.arguments[1].at(-1).price);
                updateChartData(item.arguments[1]);
            }
        });
    };
}
function parseFIREANTMessage(msg) {
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
    if (
        differenceInSeconds(new Date(), new Date(params.socketUpdatedAt)) > 60
    ) {
        fetch("https://bddatafeed.vps.com.vn/getpschartintraday/VN30F1M")
            .then((response) => response.json())
            .then((data) => {
                console.log("VPS: ", data);
                updateChartData(data, "VPS");
            });
        params.socketUpdatedAt = new Date();
    }
}
function configDnseSocket() {
    params.websocket.on("connect", () => {
        if (params.websocket.connected) {
            const topic = "quotes/index/MI/VNINDEX";
            // const topic = "quotes/stock/tick/VN30F1M";
            // const topic = "quotes/derivative/DP/VN30F1M";
            //   const topic = "stats/index/MB/VNINDEX";
            //   const topic = "stats/derivative/BA/VN30F1M";
            params.websocket.subscribe(topic, (err) => {
                if (err) console.log(`Subscribe error: ${err.message}`);
                else console.log(`Subscribed to topic: ${topic}`);
            });
        }
    });
    params.websocket.on("message", (topic, message) => {
        state.isSocketWarning = false;
        var encapMsg = decodeEncapMessage(message);
        //
        if (encapMsg.type === 2) {
            const mkid = decodeMarketIndex(encapMsg.payload);
            console.log("MarketIndex: ", mkid);
        }
    });
}
function getDnseData() {
    if (
        differenceInSeconds(new Date(), new Date(params.socketUpdatedAt)) > 60
    ) {
        fetch("https://services.entrade.com.vn/price-api/query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                operationName: "GetTicksBySymbol",
                query: `query GetTicksBySymbol {GetTicksBySymbol(symbol: "${config.value.vn30f1m}", date: "${state.chartDate}", limit: 10000) {data {symbol matchPrice matchQtty sendingTime: time side}}}`,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("DNSE: ", data.data.GetTicksBySymbol.data);
                updateChartData(data.data.GetTicksBySymbol.data, "DNSE");
            });

        params.socketUpdatedAt = new Date();
    }
}
function patternScaned(points) {
    patternToolRef.value.load(points, { isSave: true });
}
function refreshPattern() {
    patternToolRef.value.refresh();
}
function hideContext() {
    progressToolRef.value.hide();
    scanToolRef.value.hide();
    lineToolRef.value.hide();
}
function setProgress(value) {
    if (!devices.phone) progressToolRef.value.hide(mf.isSet(value));
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
    return true;
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

            .cancel-order {
                color: red;
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
        bottom: 30px;
        right: 53px;
        width: 25px;
        height: 25px;
        line-height: 24px;
        border-radius: 50%;
        text-align: center;
        color: #bbbbbb;
        border: 1px solid #2b2b43;
        z-index: 2;
        cursor: pointer;
    }
}
</style>
