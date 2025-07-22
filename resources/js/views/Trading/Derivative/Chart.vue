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
                :class="{
                    yellow: status.pendingOrders.length > 0,
                    red: config.volInvalid,
                }"
                :title="$t('trading.derivative.connection')"
                @click="connectBroker"
                @contextmenu="showPendingOrders"
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
                @contextmenu="showMatchedOrders"
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
                symbol="VN30F1M"
                timeframe="15"
            />
            <ProgressTool
                ref="progressToolRef"
                :chartHeightEnough="state.chartHeightEnough"
                @refreshPattern="() => refreshPattern(true)"
                @hideContext="hideContext"
            />
            <PatternTool
                ref="patternToolRef"
                :bars="state.bars"
                :pickTimeToolRef="pickTimeToolRef"
                :timeToIndex="timeToIndex"
                :indexToTime="indexToTime"
                @setProgress="setProgress"
                @setPatternOrder="setPatternOrder"
                @hideContext="hideContext"
            />
            <PickTimeTool
                ref="pickTimeToolRef"
                @refreshPattern="() => refreshPattern()"
                @hideContext="hideContext"
            />
            <TimeRangeTool
                ref="timeRangeToolRef"
                :timeToIndex="timeToIndex"
                :indexToTime="indexToTime"
                @hideContext="hideContext"
            />
            <LineTool
                ref="lineToolRef"
                symbol="VN30F1M"
                storeModule="tradingDerivative"
                :drawPriceLine="drawPriceLine"
                @hideContext="hideContext"
            />
            <TargetTool
                ref="targetToolRef"
                symbol="VN30F1M"
                storeModule="tradingDerivative"
                :drawPriceLine="drawPriceLine"
                :levels="[0.5, 1, 2, 4]"
                :isPercent="false"
                :showPercent="true"
                @hideContext="hideContext"
            />
            <OrderTool
                ref="orderToolRef"
                :position="status.position"
                :drawPriceLine="drawPriceLine"
                :inSession="inSession"
                :TIME="state.TIME"
                @hideContext="hideContext"
            />
        </div>
        <div>
            <div class="chart-top" @click="scrollChart">
                <i class="far fa-angle-double-right" />
            </div>
        </div>
    </div>
</template>

<script setup>
import FullscreenTool from "./Tools/FullscreenTool.vue";
import TradingviewTool from "./Tools/TradingviewTool.vue";
import ProgressTool from "./Tools/ProgressTool.vue";
import PatternTool from "./Tools/PatternTool.vue";
import PickTimeTool from "./Tools/PickTimeTool.vue";
import LineTool from "./Tools/LineTool.vue";
import TimeRangeTool from "./Tools/TimeRangeTool.vue";
import TargetTool from "./Tools/TargetTool.vue";
import OrderTool from "./Tools/OrderTool.vue";

import { createChart } from "../../../plugins/lightweight-charts.esm.development";
import mqtt from "mqtt";
import { mdds_pb } from "../../../plugins/dnse/mdds_pb.js";
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
    // formatISO,
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
const emit = defineEmits([
    "showPendingOrders",
    "showMatchedOrders",
    "showVpsOtpPopup",
]);
const chartContainerRef = ref(null);
const chartRef = ref(null);
const connectionRef = ref(null);
const reloadToolRef = ref(null);
const fullscreenToolRef = ref(null);
const tradingviewToolRef = ref(null);
const progressToolRef = ref(null);
const patternToolRef = ref(null);
const pickTimeToolRef = ref(null);
const lineToolRef = ref(null);
const timeRangeToolRef = ref(null);
const targetToolRef = ref(null);
const orderToolRef = ref(null);

const CURRENT_DATE = format(new Date(), "yyyy-MM-dd");
const TIME = {
    START: getUnixTime(new Date(`${CURRENT_DATE}T08:45:00Z`)),
    ATO: getUnixTime(new Date(`${CURRENT_DATE}T09:00:00Z`)),
    ATC: getUnixTime(new Date(`${CURRENT_DATE}T14:30:00Z`)),
    END: getUnixTime(new Date(`${CURRENT_DATE}T14:45:00Z`)),
};
const SOCKET_ENDPOINT = {
    FIREANT:
        "wss://tradestation.fireant.vn/quote-lite?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxODg5NjIyNTMwLCJuYmYiOjE1ODk2MjI1MzAsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsiYWNhZGVteS1yZWFkIiwiYWNhZGVteS13cml0ZSIsImFjY291bnRzLXJlYWQiLCJhY2NvdW50cy13cml0ZSIsImJsb2ctcmVhZCIsImNvbXBhbmllcy1yZWFkIiwiZmluYW5jZS1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImludmVzdG9wZWRpYS1yZWFkIiwib3JkZXJzLXJlYWQiLCJvcmRlcnMtd3JpdGUiLCJwb3N0cy1yZWFkIiwicG9zdHMtd3JpdGUiLCJzZWFyY2giLCJzeW1ib2xzLXJlYWQiLCJ1c2VyLWRhdGEtcmVhZCIsInVzZXItZGF0YS13cml0ZSIsInVzZXJzLXJlYWQiXSwianRpIjoiMjYxYTZhYWQ2MTQ5Njk1ZmJiYzcwODM5MjM0Njc1NWQifQ.dA5-HVzWv-BRfEiAd24uNBiBxASO-PAyWeWESovZm_hj4aXMAZA1-bWNZeXt88dqogo18AwpDQ-h6gefLPdZSFrG5umC1dVWaeYvUnGm62g4XS29fj6p01dhKNNqrsu5KrhnhdnKYVv9VdmbmqDfWR8wDgglk5cJFqalzq6dJWJInFQEPmUs9BW_Zs8tQDn-i5r4tYq2U8vCdqptXoM7YgPllXaPVDeccC9QNu2Xlp9WUvoROzoQXg25lFub1IYkTrM66gJ6t9fJRZToewCt495WNEOQFa_rwLCZ1QwzvL0iYkONHS_jZ0BOhBCdW9dWSawD6iF1SIQaFROvMDH1rg",
    VPS: "wss://datafeed.vps.com.vn/socket.io/?EIO=3&transport=websocket",
    DNSE: "wss://datafeed-krx.dnse.com.vn/wss",
};

let params = {
    ohlcMap: new Map(),
    chart: {},
    series: {},
    whitespaces: [],
    crosshair: {},
    interval: null,
    refreshAt: subSeconds(new Date(), 11),
    statusAt: subSeconds(new Date(), 21),
    websocket: null,
    socketStop: false,
    socketUpdatedAt: subSeconds(new Date(), 61),
    hasProgress: false,
};
const state = reactive({
    prices: [],
    chartDate: route.query.date ?? CURRENT_DATE,
    clock: format(new Date(), "HH:mm:ss"),
    chartHeightEnough: false,
    isSocketWarning: false,
    TIME,
});
const status = computed(() => store.state.tradingDerivative.status);
const config = computed(() => store.state.tradingDerivative.config);
const isLoading = computed(() => store.state.tradingDerivative.isLoading);

params.interval = setInterval(() => {
    state.clock = format(new Date(), "HH:mm:ss");
    if (inSession()) {
        if (orderToolRef.value) orderToolRef.value.cancelWithoutClose();
        if (differenceInSeconds(new Date(), new Date(params.refreshAt)) > 10) {
            if (config.value.autoRefresh) patternToolRef.value.refresh();
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
    patternToolRef.value.createSeries(params.chart);
    timeRangeToolRef.value.createSeries(params.chart);
    pickTimeToolRef.value.createSeries(params.chart);
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
    closeAllOrders,
});

function drawChart() {
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
    params.chart = createChart(chartRef.value, CHART_OPTIONS);
    params.chart.subscribeCrosshairMove(chartCrosshairMove);
    params.chart.subscribeCustomPriceLineDragged(priceLineDrag);
    params.series.whitespace = params.chart.addHistogramSeries({
        priceScaleId: "whitespace",
        scaleMargins: { top: 0, bottom: 0 },
        color: "#808080",
        lastValueVisible: false,
        priceLineVisible: false,
    });
    params.series.price = params.chart.addCandlestickSeries({
        upColor: "#F5F5F5",
        downColor: "#F5F5F5",
        borderVisible: false,
        wickUpColor: "#F5F5F5",
        wickDownColor: "#F5F5F5",
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
    hideContext(params.hasProgress);

    if (patternToolRef.value.isSelected()) {
        patternToolRef.value.draw(params.crosshair);
    } else if (pickTimeToolRef.value.isSelected()) {
        pickTimeToolRef.value.draw(params.crosshair);
    } else if (lineToolRef.value.isSelected()) {
        lineToolRef.value.draw(params.crosshair);
    } else if (timeRangeToolRef.value.isSelected()) {
        timeRangeToolRef.value.draw(params.crosshair);
    } else if (targetToolRef.value.isSelected()) {
        targetToolRef.value.draw(params.crosshair);
    }
}
function chartContextmenu(e) {
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
        // let price = e.seriesPrices.get(params.series.price);
        let price = coordinateToPrice(e.point.y);
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
function setChartData(data) {
    if (!(state.chartDate === CURRENT_DATE && inSession())) {
        if (data.ticks.length > 0) {
            params.whitespaces = mergeChartData(
                params.whitespaces,
                createWhitespaceData(state.chartDate)
            );
        }
        params.series.whitespace.setData(params.whitespaces);
        //
        setCandlestick(data.ticks, "FIREANT");
        getTools();
    }
}
function updateChartData(ticks, isFirst) {
    if (isFirst) {
        params.whitespaces = mergeChartData(
            params.whitespaces,
            createWhitespaceData(CURRENT_DATE)
        );
        params.series.whitespace.setData(params.whitespaces);
        //
        setCandlestick(ticks);
        getTools();
    } else updateCandlestick(ticks);
}
function setCandlestick(ticks, source = null) {
    if (!source) source = config.value.source;
    ticks.forEach((tick) => {
        let date, time, price;
        switch (source) {
            case "FIREANT":
                date = addHours(new Date(tick.date), 7);
                price = tick.price;
                break;
            case "VPS":
                date = new Date(`${CURRENT_DATE}T${tick.time}Z`);
                price = tick.lastPrice;
                break;
            case "DNSE":
                date = addHours(new Date(tick.sendingTime), 7);
                price = tick.matchPrice;
                break;
        }
        time = getUnixTime(date);
        date = format(date, "yyyy/MM/dd hh:mm:ss");
        // date = formatISO(date);
        if (!params.ohlcMap.has(time)) {
            const bar = {
                date,
                time,
                open: price,
                high: price,
                low: price,
                close: price,
            };
            params.ohlcMap.set(time, bar);
        } else {
            const bar = params.ohlcMap.get(time);
            bar.high = Math.max(bar.high, price);
            bar.low = Math.min(bar.low, price);
            bar.open = price;
            bar.close = price;
        }
    });
    const bars = Array.from(params.ohlcMap.values()).sort(
        (a, b) => new Date(a.time) - new Date(b.time)
    );
    params.series.price.setData(bars);
    state.bars = bars;
}
function updateCandlestick(ticks) {
    if (params.ohlcMap.size === 0) return false;
    if (config.value.source === "FIREANT") {
        ticks.sort((a, b) =>
            a.date === b.date
                ? a.id - b.id
                : new Date(a.date) - new Date(b.date)
        );
    }
    ticks.forEach((tick) => {
        let date, time, price;
        switch (config.value.source) {
            case "FIREANT":
                date = addHours(new Date(tick.date), 7);
                price = tick.price;
                break;
            case "VPS":
                date = new Date(`${CURRENT_DATE}T${tick.time}Z`);
                price = tick.lastPrice;
                break;
            case "DNSE":
                date = addHours(new Date(tick.sendingtime), 7);
                price = tick.matchprice;
                break;
        }
        time = getUnixTime(date);
        date = format(date, "yyyy/MM/dd hh:mm:ss");
        // date = formatISO(date);
        if (!params.ohlcMap.has(time)) {
            const bar = {
                date,
                time,
                open: price,
                high: price,
                low: price,
                close: price,
            };
            params.series.price.update(bar);
            params.ohlcMap.set(time, bar);
        } else {
            try {
                const bar = params.ohlcMap.get(time);
                bar.high = Math.max(bar.high, price);
                bar.low = Math.min(bar.low, price);
                bar.open = price;
                bar.close = price;
                params.series.price.update(bar);
            } catch (error) {
                return;
            }
        }
    });
    const bars = Array.from(params.ohlcMap.values()).sort(
        (a, b) => new Date(a.time) - new Date(b.time)
    );
    state.bars = bars;
}
function createWhitespaceData(date) {
    const amStart = getUnixTime(new Date(`${date}T09:00:00Z`));
    const amEnd = getUnixTime(new Date(`${date}T11:30:00Z`));
    const pmStart = getUnixTime(new Date(`${date}T13:00:00Z`));
    const pmEnd = getUnixTime(new Date(`${date}T14:30:00Z`));
    const pm13h00 = getUnixTime(new Date(`${date}T13:00:00Z`));
    const pm14h00 = getUnixTime(new Date(`${date}T14:00:00Z`));
    let data = [];
    for (let sec = amStart; sec <= pmEnd; sec++) {
        if (sec > amEnd && sec < pmStart) continue;
        let item = { time: sec };
        if (sec === pm13h00 || sec === pm14h00 || sec === pmEnd) item.value = 1;
        data.push(item);
    }
    if (state.chartDate === CURRENT_DATE) {
        const pmExtra = getUnixTime(new Date(`${date}T17:00:00Z`));
        for (let sec = pmEnd + 1; sec <= pmExtra; sec++) {
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
    const source = config.value.source;
    const onStatus =
        params.websocket &&
        (source === "DNSE"
            ? params.websocket.connected
            : params.websocket.readyState === WebSocket.OPEN);
    if (onStatus) {
        if (source === "DNSE") params.websocket.end();
        else params.websocket.close();

        await new Promise((resolve) => {
            const interval = setInterval(() => {
                const offStatus =
                    !params.websocket ||
                    (source === "DNSE"
                        ? params.websocket.disconnected
                        : params.websocket.readyState === WebSocket.CLOSED);
                if (offStatus) {
                    params.websocket = null;
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });
    } else params.websocket = null;
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
                    console.log("FIREANT-first", item.result);
                    updateChartData(item.result, true);
                }
                store.dispatch("tradingDerivative/setLoading", false);
            } else if (
                item.type === 1 &&
                item.target === "UpdateTrades" &&
                item.arguments[0] === "VN30F1M"
            ) {
                console.log("FIREANT", item.arguments[1]);
                orderToolRef.value.scan(item.arguments[1].at(-1).price);
                let updatedData = item.arguments[1];
                updatedData.sort((a, b) =>
                    a.date === b.date
                        ? a.id - b.id
                        : new Date(a.date) - new Date(b.date)
                );
                updateChartData(updatedData);
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
        store.dispatch("tradingDerivative/getVpsData").then((data) => {
            updateChartData(data, true);
            console.log("VPS-first: ", data);
        });
        params.socketUpdatedAt = new Date();
    }
}
function configDnseSocket() {
    params.websocket.on("connect", () => {
        if (params.websocket.connected) {
            const topics = [
                `quotes/krx/mdds/tick/v1/roundlot/symbol/${config.value.vn30f1m}`,
            ];
            params.websocket.subscribe(topics);
            console.log("DNSE connected");
        }
    });
    params.websocket.on("message", (_, message) => {
        state.isSocketWarning = false;
        const encapMsg = convertKrxMDDS(message);
        if (encapMsg.type === mdds_pb.Wrapper.KindCase.TICK) {
            let tick = encapMsg.payload;
            orderToolRef.value.scan(tick.matchprice);
            const time = new Date(tick.sendingtime.seconds * 1000);
            tick.sendingtime = time.toISOString();
            console.log("DNSE: ", tick);
            updateChartData([tick]);
        }
    });
}
function convertKrxMDDS(data) {
    try {
        const binaryData = new Uint8Array(data);
        const message = mdds_pb.Wrapper.deserializeBinary(binaryData);

        if (!message) return;

        const kindCase = message.getKindCase();
        const payloadMap = {
            [mdds_pb.Wrapper.KindCase.TICK]: message.getTick()?.toObject(),
        };

        return kindCase in payloadMap
            ? { type: kindCase, payload: payloadMap[kindCase] }
            : undefined;
    } catch (error) {
        console.error("An error occurred while parsing the message:", r, error);
        return;
    }
}
function getDnseData() {
    if (
        differenceInSeconds(new Date(), new Date(params.socketUpdatedAt)) > 60
    ) {
        store.dispatch("tradingDerivative/getDnseData").then((data) => {
            updateChartData(data, true);
            console.log("DNSE-first: ", data);
        });
        params.socketUpdatedAt = new Date();
    }
}
function refreshPattern(autoAdjust = false) {
    patternToolRef.value.refresh(autoAdjust);
}
function hideContext(progressIgnore = false) {
    if (!progressIgnore) progressToolRef.value.hide();
    lineToolRef.value.hide();
    orderToolRef.value.hide();
}
function setProgress(value) {
    if (!devices.phone) progressToolRef.value.hide(mf.isSet(value));
    progressToolRef.value.set(value);
    params.hasProgress = !!value.step;
}
function setPatternOrder(value) {
    orderToolRef.value.setPatternOrder(value);
}
function scrollChart() {
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
    state.bars = [];
    params.socketUpdatedAt = subSeconds(new Date(), 61);
    connectSocket();
    getChartData();
}
function showPendingOrders() {
    emit("showPendingOrders");
}
function showMatchedOrders() {
    emit("showMatchedOrders");
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
    store.dispatch("tradingDerivative/getChartData", state.chartDate);
}
function connectBroker() {
    if (status.value.connection) getStatus();
    else showVpsOtpPopup();
}
function showVpsOtpPopup() {
    emit("showVpsOtpPopup");
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
            "trading.derivative.accountInfoPopup.nav"
        )}</div><div>: ${filters.currency(data.nav)}</div></div>`;
        html += `<div style="display: flex;"><div style="flex: 0 0 75px;">${t(
            "trading.derivative.accountInfoPopup.maxVol"
        )}</div><div>: ${filters.numberVnFormat(data.maxVol)}</div></div>`;
        html += `<div style="display: flex;"><div style="flex: 0 0 75px;">${t(
            "trading.derivative.accountInfoPopup.vm"
        )}</div><div>: ${filters.currency(data.vm)}</div></div>`;
        html += `<div style="display: flex;"><div style="flex: 0 0 75px;">${t(
            "trading.derivative.accountInfoPopup.fee"
        )}</div><div>: ${filters.currency(data.fee)}</div></div>`;
        html += "</div>";
        alert(html, t("trading.derivative.accountInfoPopup.title"));
    });
}
function closeAllOrders() {
    orderToolRef.value.closeAllOrders();
}
function coordinateToPrice(y) {
    return mf.fmtNum(params.series.price.coordinateToPrice(y));
}
function timeToIndex(time) {
    let index = params.whitespaces.findIndex((item) => item.time === time);
    if (index === -1) {
        try {
            const date = format(new Date(time * 1000), "yyyy-MM-dd");
            const amEnd = getUnixTime(new Date(`${date}T11:30:00Z`));
            const pmStart = getUnixTime(new Date(`${date}T13:00:00Z`));
            const pmEnd = getUnixTime(new Date(`${date}T14:30:00Z`));
            if (time > amEnd && time < pmStart) time = amEnd;
            else if (time > pmEnd) time = pmEnd;
            index = params.whitespaces.findIndex((item) => item.time === time);
        } catch (error) {
            console.log("error", error);
        }
    }
    return index;
}
function indexToTime(index) {
    if (index < params.whitespaces.length)
        return params.whitespaces[index].time;
    else return params.whitespaces.at(-1).time;
}
function drawPriceLine(data, isRemove = false) {
    if (isRemove) params.series.price.removePriceLine(data);
    else return params.series.price.createPriceLine(data);
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

        &:hover {
            background: #2a2e39 !important;
        }
    }
}
</style>
