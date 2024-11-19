<template>
    <div class="content-block dx-card responsive-paddings">
        <DxToolbar
            :items="[
                {
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-file-chart-pie small',
                        hint: $t('trading.derivative.buttons.report'),
                        onClick: report,
                    },
                },
                {
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-cloud-arrow-down small',
                        hint: $t('trading.derivative.buttons.export'),
                        onClick: exportCsv,
                    },
                },
                {
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-arrow-right-to-arc small',
                        hint: $t('trading.derivative.buttons.loginVps'),
                        onClick: loginVps,
                    },
                },
                {
                    visible: false,
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-sign-in-alt small',
                        hint: $t('trading.derivative.buttons.loginDnse'),
                        onClick: loginDnse,
                    },
                },
            ]"
        />
        <div
            class="order-chart-container"
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
                        :class="{ yellow: status.pending }"
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
                    <div class="command clock" @click="refreshChart">
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
                                'fa-spin': isChartLoading,
                            }"
                        ></i>
                    </div>
                </div>
                <div
                    class="area tool-area"
                    @click="toolAreaClick"
                    @contextmenu="toolAreaContextmenu"
                >
                    <div
                        ref="fullscreenToolRef"
                        class="command"
                        :title="$t('trading.derivative.fullscreen')"
                        @click="toggleFullscreen"
                    >
                        <i
                            class="far"
                            :class="{
                                'fa-compress': state.isFullscreen,
                                'fa-expand': !state.isFullscreen,
                            }"
                        ></i>
                    </div>
                    <div
                        ref="tradingviewRef"
                        class="command far fa-chart-candlestick"
                        :title="$t('trading.derivative.tradingview')"
                        @click="tradingviewClick"
                    ></div>
                    <div
                        class="context command"
                        :class="{ green: state.pattern.items.length }"
                        :title="$t('trading.derivative.progressTool')"
                        @click="progressToolClick"
                        @contextmenu="progressToolContextMenu"
                    >
                        <i
                            class="far"
                            :class="{
                                'fa-badge-check': !state.pattern.items.length,
                                [`fa-circle-${state.pattern.items.length}`]:
                                    state.pattern.items.length,
                                blink: config.autoScan,
                            }"
                        >
                        </i>
                        <PatternContext
                            v-show="state.showPatternContext"
                            class="contextmenu"
                            :items="state.pattern.items"
                            :selected="state.pattern.selected"
                            @selectPattern="selectPattern"
                        ></PatternContext>
                    </div>
                    <div
                        ref="scanToolRef"
                        class="context command"
                        :title="$t('trading.derivative.scanTool')"
                        @click="scanToolClick"
                        @contextmenu="scanToolContextMenu"
                    >
                        <i
                            class="far"
                            :class="{
                                [`fa-angles-${state.scanSide}`]: true,
                            }"
                        ></i>
                        <ScanContext
                            v-show="state.showScanContext"
                            class="contextmenu"
                            v-model="state.scanSide"
                        ></ScanContext>
                    </div>
                    <div
                        ref="patternToolRef"
                        class="command"
                        :title="$t('trading.derivative.patternTool')"
                        @click="patternToolClick"
                        @contextmenu="patternToolContextmenu"
                    >
                        <i class="far fa-heart-rate"></i>
                    </div>
                    <div
                        ref="timeRangeToolRef"
                        class="command"
                        :title="$t('trading.derivative.timeRangeTool')"
                        @click="timeRangeToolClick"
                        @contextmenu="timeRangeToolContextmenu"
                    >
                        <i class="far fa-grip-lines-vertical"></i>
                    </div>
                    <div
                        ref="lineToolRef"
                        class="context command"
                        :title="$t('trading.derivative.lineTool')"
                        @click="lineToolClick"
                        @contextmenu="lineToolContextmenu"
                    >
                        <i class="far fa-horizontal-rule"></i>
                        <LineContext
                            v-show="state.showLineContext"
                            class="contextmenu"
                            :enable="state.showLineContext"
                            v-model:title="state.lineTitle"
                            v-model:color="state.lineColor"
                            @deleteAllLine="removeLineTool"
                        ></LineContext>
                    </div>

                    <div
                        ref="targetToolRef"
                        class="command"
                        :title="$t('trading.derivative.targetTool')"
                        @click="targetToolClick"
                        @contextmenu="targetToolContextmenu"
                    >
                        <i class="far fa-line-height"> </i>
                    </div>
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
    </div>
    <VpsOtpPopup ref="vpsOtpPopupRef" />
</template>

<script setup>
import LineContext from "./LineContext.vue";
import ScanContext from "./ScanContext.vue";
import PatternContext from "./PatternContext.vue";
import VpsOtpPopup from "./VpsOtpPopup.vue";
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
import { format, getUnixTime, addHours } from "date-fns";

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
const fullscreenToolRef = ref(null);
const tradingviewChartRef = ref(null);
const reloadToolRef = ref(null);
const tradingviewRef = ref(null);
const lineToolRef = ref(null);
const patternToolRef = ref(null);
const targetToolRef = ref(null);
const timeRangeToolRef = ref(null);
const scanToolRef = ref(null);
const cancelOrderRef = ref(null);
const entryOrderRef = ref(null);
const tpslOrderRef = ref(null);
const vpsOtpPopupRef = ref(null);
let params = {
    chart: {},
    series: {},
    data: {
        whitespace: [],
        price: [],
    },
    tools: {},
    crosshair: {},
    interval: null,
    interval60: null,
    websocket: null,
    isAutoOrdering: false,
    socketStop: false,
    socketSendData: null,
    currentSeconds: getUnixTime(addHours(new Date(), 7)),
};
initToolsParams();
//
const state = reactive({
    chartDate: route.query.date ?? CURRENT_DATE,
    clock: format(new Date(), "HH:mm:ss"),
    isFullscreen: false,
    isSocketWarning: false,
    isOrderWarning: false,
    isAutoScan: false,
    lineColor: "#F44336",
    lineTitle: "",
    progress: [],
    pattern: { items: [], selected: null },
    showPatternContext: false,
    scanSide: "left",
    showScanContext: false,
    showLineContext: false,
    showTradingView: false,
    tradingViewStyle: { left: "32px" },
});
const status = computed(() => store.state.tradingDerivative.status);
const config = computed(() => store.state.tradingDerivative.config);
const tools = computed(() => store.state.tradingDerivative.tools);
const isChartLoading = computed(
    () => store.state.tradingDerivative.isChartLoading
);
const showCancelOrder = computed(
    () =>
        status.value.position != 0 ||
        !!status.value.pending ||
        !!tools.value.order
);
const tradingViewSrc = computed(() => {
    return `https://chart.vps.com.vn/tv/?u=${config.value.vpsUser}&s=${config.value.vpsSession}&symbol=VN30F1M&resolution=1&lang=vi`;
});

store.dispatch("tradingDerivative/initChart").then(() => {
    if (inSession()) connectSocket();
    if (!route.query.date && config.value.lastOpeningDate)
        state.chartDate = config.value.lastOpeningDate;
    store
        .dispatch("tradingDerivative/getChartData", state.chartDate)
        .then((hasData) => {
            if (hasData) getTools();
        });
});

params.interval = setInterval(intervalHandler, 1000);
params.interval60 = setInterval(() => {
    if (inSession()) {
        getStatus();
        if (config.value.autoScan) getTools();
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
    params.series.timeRange = params.chart.addHistogramSeries({
        priceScaleId: "range",
        scaleMargins: { top: 0, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
    });
    params.series.price = params.chart.addLineSeries({
        color: "#F5F5F5",
        priceFormat: { minMove: 0.1 },
    });
    new ResizeObserver(eventChartResize).observe(chartContainerRef.value);
    document.addEventListener("keydown", eventKeyPress);
    document.addEventListener("fullscreenchange", eventFullscreenChange);
});
onUnmounted(() => {
    document.removeEventListener("keydown", eventKeyPress);
    document.removeEventListener("fullscreenchange", eventFullscreenChange);
    clearInterval(params.interval);
    clearInterval(params.interval60);
    if (params.websocket) {
        params.websocket.close();
        params.websocket = null;
    }
    params.socketStop = true;
});

watch(() => store.state.tradingDerivative.chartData, loadChartData);
watch(() => tools.value, loadToolsData);

function eventChartClick(e) {
    state.showPatternContext = false;
    state.showScanContext = false;
    state.showLineContext = false;
    toggleOrderButton(false);
    if (lineToolRef.value.classList.contains("selected")) drawLineTool();
    else if (targetToolRef.value.classList.contains("selected"))
        drawTargetTool();
    else if (timeRangeToolRef.value.classList.contains("selected"))
        drawTimeRangeTool();
    else if (scanToolRef.value.classList.contains("selected")) drawScanTool();
    else if (patternToolRef.value.classList.contains("selected"))
        drawPatternTool();
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
    lineOptions.price = parseFloat(lineOptions.price.toFixed(1));
    const oldPrice = +e.fromPriceString;
    const newPrice = lineOptions.price;
    switch (lineOptions.lineType) {
        case "order":
            if (newPrice != oldPrice) {
                let isChanged = false;
                if (lineOptions.kind == "entry") {
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
                    if (lineOptions.kind == "tp")
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
            store.dispatch("tradingDerivative/drawTools", {
                isRemove: true,
                name: "line",
                point: oldPrice,
            });
            const color = lineOptions.color;
            const title = lineOptions.title;
            store.dispatch("tradingDerivative/drawTools", {
                isRemove: false,
                name: "line",
                points: [newPrice],
                data: [{ color, title }],
            });
            lineToolRef.value.classList.remove("selected");
            break;
        case "target":
            if (mf.isSet(params.tools.target.B)) {
                let param = {
                    isRemove: false,
                    name: "target",
                    points: [],
                    data: [],
                };
                let point, changeOptions;
                let a = +params.tools.target.A.options().price;
                let b = +params.tools.target.B.options().price;
                let ba = b - a;
                //
                point = "A";
                if (lineOptions.point == "A") {
                    ba = +params.tools.target.B.options().title;
                    b = a + ba;
                } else if (lineOptions.point != "B") {
                    let div = 0;
                    switch (lineOptions.point) {
                        case "X":
                            div = 1.5;
                            break;
                        case "Y":
                            div = 2;
                            break;
                        case "Z":
                            div = 3;
                            break;
                        case "W":
                            div = 5;
                            break;
                    }
                    ba = parseFloat(((b - newPrice) / div).toFixed(1));
                    a = b - ba;
                    changeOptions = { price: a };
                    params.tools.target[point].applyOptions(changeOptions);
                }
                param.points.push(point);
                param.data.push(a);
                //
                point = "B";
                changeOptions = { price: b, title: ba.toFixed(1) };
                if (lineOptions.point == point) delete changeOptions.price;
                params.tools.target[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(b);
                //
                point = "X";
                changeOptions = {
                    price: parseFloat((a - 0.5 * ba).toFixed(1)),
                    title: (-0.5 * ba).toFixed(1),
                };
                if (lineOptions.point == point) delete changeOptions.price;
                params.tools.target[point].applyOptions(changeOptions);
                //
                point = "Y";
                changeOptions = {
                    price: parseFloat((a - ba).toFixed(1)),
                    title: (-ba).toFixed(1),
                };
                if (lineOptions.point == point) delete changeOptions.price;
                params.tools.target[point].applyOptions(changeOptions);
                //
                point = "Z";
                changeOptions = {
                    price: parseFloat((a - 2 * ba).toFixed(1)),
                    title: (-2 * ba).toFixed(1),
                };
                if (lineOptions.point == point) delete changeOptions.price;
                params.tools.target[point].applyOptions(changeOptions);
                //
                point = "W";
                changeOptions = {
                    price: parseFloat((a - 4 * ba).toFixed(1)),
                    title: (-4 * ba).toFixed(1),
                };
                if (lineOptions.point == point) delete changeOptions.price;
                params.tools.target[point].applyOptions(changeOptions);
                //
                store.dispatch("tradingDerivative/drawTools", param);
            }
            break;
        case "pattern":
            if (mf.isSet(params.tools.pattern.B)) {
                let point, changeOptions;
                const aOptions = params.tools.pattern.A.options();
                const bOptions = params.tools.pattern.B.options();
                const cOptions = params.tools.pattern.C.options();
                const points = {
                    A: {
                        time: +aOptions.time,
                        price: +aOptions.price,
                    },
                    B: { price: +bOptions.price },
                    C: { price: +cOptions.price },
                };
                const d =
                    lineOptions.point == "D"
                        ? +params.tools.pattern.D.options().price
                        : null;
                const {
                    pattern,
                    timeRange,
                    info: { el1, el2, el3, fibo, tR, X, Y, Z, W },
                } = calculatePattern(points, null, d);
                loadProgressTool(pattern);
                loadTimeRangeTool(timeRange);
                savePattern(points);
                //
                point = "A";
                changeOptions = { title: `A ${el1}` };
                params.tools.pattern[point].applyOptions(changeOptions);
                //
                point = "B";
                changeOptions = { title: `B ${el2}` };
                params.tools.pattern[point].applyOptions(changeOptions);
                //
                point = "C";
                changeOptions = { title: `C ${el3}` };
                params.tools.pattern[point].applyOptions(changeOptions);
                //
                point = "D";
                changeOptions = {
                    price: tR,
                    title: "F " + fibo,
                };
                if (lineOptions.point == point) delete changeOptions.price;
                params.tools.pattern[point].applyOptions(changeOptions);
                //
                point = "X";
                changeOptions = {
                    price: parseFloat((tR + X).toFixed(1)),
                    title: "T " + parseFloat(X.toFixed(1)),
                };
                params.tools.pattern[point].applyOptions(changeOptions);
                //
                point = "Y";
                changeOptions = {
                    price: parseFloat((tR + Y).toFixed(1)),
                    title: "T " + parseFloat(Y.toFixed(1)),
                };
                params.tools.pattern[point].applyOptions(changeOptions);
                //
                point = "Z";
                changeOptions = {
                    price: parseFloat((tR + Z).toFixed(1)),
                    title: "T " + parseFloat(Z.toFixed(1)),
                };
                params.tools.pattern[point].applyOptions(changeOptions);
                //
                point = "W";
                changeOptions = {
                    price: parseFloat((tR + W).toFixed(1)),
                    title: "T " + parseFloat(W.toFixed(1)),
                };
                params.tools.pattern[point].applyOptions(changeOptions);
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
function loadToolsData(toolsData) {
    removeAllTools();
    Object.entries(toolsData).forEach(([name, points]) => {
        switch (name) {
            case "order":
                loadOrderTool(points);
                break;
            case "pattern":
                loadPatternTool(toolsData.pattern, null, !("tr" in toolsData));
                break;
            case "tr":
                loadTimeRangeTool(Object.values(points));
                break;
            case "line":
                loadLineTool(points);
                break;
            case "target":
                loadTargetTool(points);
                break;
        }
    });
}
function loadChartData(chartData) {
    if (!(state.chartDate == CURRENT_DATE && inSession())) {
        if (chartData.price.length > 0) {
            params.data.whitespace = mergeChartData(
                params.data.whitespace,
                createWhitespaceData(state.chartDate)
            );
        }
        params.series.whitespace.setData(params.data.whitespace);

        params.data.price = mergeChartData(params.data.price, chartData.price);
        params.series.price.setData(params.data.price);
    }
}
function updateChartData(data) {
    let prices = [];
    data.forEach((item) => {
        const time = getUnixTime(addHours(new Date(item.date), 7));
        prices.push({ time, value: item.price });
    });
    if (prices.length > 1) {
        params.data.price = mergeChartData(params.data.price, prices);
        params.series.price.setData(params.data.price);
    } else {
        params.data.price.push(prices[0]);
        params.series.price.update(prices[0]);
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
        if (sec == pm14h00 || sec == pmEnd) item.value = 1;
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
function connectSocket() {
    store.dispatch("tradingDerivative/setChartLoading", true);
    params.websocket = new WebSocket(FIREANT_SOCKET_ENDPOINT);
    params.websocket.onopen = (e) => {
        let message = '{"protocol":"json","version":1}';
        params.websocket.send(message);
        message =
            '{"arguments":["VN30F1M"],"invocationId":"0","target":"SubscribeTrades","type":1}';
        params.websocket.send(message);
        params.socketSendData = message;
    };
    params.websocket.onclose = (e) => {
        if (!params.socketStop && inSession()) {
            state.isSocketWarning = true;
            connectSocket();
        }
    };
    params.websocket.onmessage = (e) => {
        state.isSocketWarning = false;
        const data = parseSocketMessage(e.data);
        data.forEach((item) => {
            if (!item) return false;
            if (item.type == 3) {
                getTools();
                params.data.whitespace = mergeChartData(
                    params.data.whitespace,
                    createWhitespaceData(CURRENT_DATE)
                );
                params.series.whitespace.setData(params.data.whitespace);
                updateChartData(item.result);
                store.dispatch("tradingDerivative/setChartLoading", false);
            } else if (
                item.type == 1 &&
                item.target == "UpdateTrades" &&
                item.arguments[0] == "VN30F1M"
            ) {
                scanOrder(item.arguments[1].at(-1).price);
                updateChartData(item.arguments[1]);
            }
        });
    };
}
function parseSocketMessage(msg) {
    let result = [];
    msg.split("").forEach((item) => {
        const startPos = item.indexOf("{");
        const endPos = item.lastIndexOf("}");
        let temp = null;
        if (startPos !== -1 && endPos !== -1 && endPos > startPos) {
            const filteredData = item.substring(startPos, endPos + 1);
            if (filteredData != "{}") temp = JSON.parse(filteredData);
        }
        result.push(temp);
    });
    return result;
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
        if (config.value.openingMarket && params.currentSeconds == TIME.START)
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
        switch (kind) {
            case "entry":
                color = "yellow";
                title = params.tools.order.side > 0 ? "LONG" : "SHORT";
                break;
            case "tp":
                color = "lime";
                title = parseFloat(
                    Math.abs(
                        params.tools.order.tp.price -
                            params.tools.order.entry.price
                    ).toFixed(1)
                );
                break;
            case "sl":
                color = "red";
                title = parseFloat(
                    Math.abs(
                        params.tools.order.sl.price -
                            params.tools.order.entry.price
                    ).toFixed(1)
                );
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
                params.series.price.createPriceLine(options);
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
            params.series.price.createPriceLine(option);
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
            params.series.price.removePriceLine(params.tools.order[kind].line);
            delete params.tools.order[kind].line;
        }
    });
}
function tradingviewClick(e) {
    state.showTradingView = !state.showTradingView;
    e.stopPropagation();
}
function progressToolClick() {
    state.showPatternContext = !state.showPatternContext;
    state.showScanContext = false;
    state.showLineContext = false;
}
function progressToolContextMenu() {
    store.dispatch("tradingDerivative/setAutoScan", !config.value.autoScan);
}
function selectPattern(e) {
    if (e != state.pattern.selected) {
        state.pattern.selected = e;
        const aOptions = params.tools.pattern.A.options();
        const bOptions = params.tools.pattern.B.options();
        const cOptions = params.tools.pattern.C.options();
        const points = {
            A: { time: +aOptions.time, price: +aOptions.price },
            B: { price: +bOptions.price },
            C: { price: +cOptions.price },
        };
        removePatternTool();
        loadPatternTool(points, e);
    }
}
function loadProgressTool(e) {
    state.pattern = e;
    setTimeout(() => (state.showPatternContext = true), 0);
}
function removeProgressTool() {
    state.pattern.items = [];
    state.pattern.selected = null;
}
function scanToolClick(e) {
    state.showScanContext = false;
    state.showLineContext = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        removePatternTool();
        removeTimeRangeTool(false);
        removeProgressTool();
        savePattern();
        e.target.classList.add("selected");
    }
}
function scanToolContextMenu() {
    state.showScanContext = !state.showScanContext;
    state.showPatternContext = false;
    state.showLineContext = false;
}
function drawScanTool() {
    const leftSide = state.scanSide == "left";
    const data = params.crosshair.time
        ? params.data.price.filter(
              (item) => !cmp(item.time, leftSide, params.crosshair.time)
          )
        : params.data.price;
    let points = leftSide ? leftScanPattern(data) : rightScanPattern(data);
    points = removeIndex(points);
    if (mf.isSet(points)) {
        removePatternTool();
        loadPatternTool(points);
        savePattern(points);
    }
    scanToolRef.value.classList.remove("selected");
}
function leftScanPattern(data) {
    let side;
    let [A, B, C, S] = Array(4).fill({});
    for (let i = data.length - 1; i >= 0; i--) {
        const price = data[i].value;
        const time = data[i].time;
        const index = timeToIndex(time);
        if (index == -1) break;
        if (i == data.length - 1) {
            C = { index, time, price };
            [B, A, S] = Array(3)
                .fill(null)
                .map(() => mf.cloneDeep(C));
        }
        if (side == undefined) {
            if (price == C.price) continue;
            side = price > C.price;
        }
        if (cmp(price, side, B.price)) {
            if (cmp(A.price, !side, C.price)) {
                [C, B] = [B, A].map((item) => mf.cloneDeep(item));
                A = { index, time, price };
                S = mf.cloneDeep(A);
                side = !side;
            } else B = { index, time, price };
        }
        if (cmp(price, !side, A.price)) {
            A = { index, time, price };
            S = mf.cloneDeep(A);
        } else S.index = index;
        if (cmp(price, side, S.price)) S = { index, time, price };
        //
        if (C.index > A.index) {
            const bc = Math.abs(B.price - C.price);
            if (bc >= 1.5) {
                if (A.index - S.index > C.index - B.index) break;
                const as = Math.abs(A.price - S.price);
                if (as > bc) break;
            }
        }
    }
    return { A, B, C };
}
function rightScanPattern(data) {
    let side;
    let [A, B, C] = Array(3).fill({});
    for (let i = 0; i < data.length; i++) {
        const price = data[i].value;
        const time = data[i].time;
        const index = timeToIndex(time);
        if (index == -1) break;
        if (i == 0) {
            A = { index, time, price };
            B = mf.cloneDeep(A);
            C = mf.cloneDeep(A);
        }
        if (side == undefined) {
            if (price == A.price) continue;
            side = price > A.price;
        }
        if (cmp(price, side, B.price)) {
            B = { index, time, price };
            C = mf.cloneDeep(B);
        }
        if (cmp(B.price, side, A.price) && cmp(price, !side, C.price)) {
            if (!cmp(price, side, A.price)) {
                A = mf.cloneDeep(B);
                B = { index, time, price };
                C = mf.cloneDeep(B);
                side = !side;
            } else C = { index, time, price };
        }
    }
    return { A, B, C };
}
function removeIndex(obj) {
    const result = {};
    Object.entries(obj).forEach(([key, value]) => {
        const { index, ...rest } = value;
        result[key] = rest;
    });
    return result;
}
function patternToolClick(e) {
    state.showScanContext = false;
    state.showLineContext = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
}
function patternToolContextmenu(e) {
    e.target.classList.remove("selected");
    removePatternTool();
    removeTimeRangeTool(true);
    removeProgressTool();
    savePattern();
}
function drawPatternTool() {
    const TYPE = "pattern";
    const price = coordinateToPrice(params.crosshair.y);
    const time = params.crosshair.time;
    let option = {
        lineType: TYPE,
        price,
        lineWidth: 1,
        lineStyle: 1,
        draggable: true,
    };
    if (mf.isSet(params.tools.pattern.A)) {
        const aOptions = params.tools.pattern.A.options();

        if (mf.isSet(params.tools.pattern.B)) {
            const bOptions = params.tools.pattern.B.options();
            let points, _timeRange, _pattern;

            if (mf.isSet(params.tools.pattern.C)) {
                let point, changeOptions;
                const cOptions = params.tools.pattern.C.options();
                points = {
                    A: { time, price },
                    B: { price: +bOptions.price },
                    C: { price: +cOptions.price },
                };
                const {
                    pattern,
                    timeRange,
                    info: { el1, el2, el3, fibo, tR, X, Y, Z, W },
                } = calculatePattern(points);
                _timeRange = timeRange;
                _pattern = pattern;
                //
                point = "A";
                changeOptions = {
                    price,
                    time,
                    title: `A ${el1}`,
                };
                params.tools.pattern[point].applyOptions(changeOptions);
                //
                point = "B";
                changeOptions = {
                    title: `B ${el2}`,
                };
                params.tools.pattern[point].applyOptions(changeOptions);
                //
                point = "C";
                changeOptions = { title: `C ${el3}` };
                params.tools.pattern[point].applyOptions(changeOptions);
                //
                point = "D";
                changeOptions = { price: tR, title: "F " + fibo };
                params.tools.pattern[point].applyOptions(changeOptions);
                //
                point = "X";
                changeOptions = {
                    price: parseFloat((tR + X).toFixed(1)),
                    title: "T " + parseFloat(X.toFixed(1)),
                };
                params.tools.pattern[point].applyOptions(changeOptions);
                //
                point = "Y";
                changeOptions = {
                    price: parseFloat((tR + Y).toFixed(1)),
                    title: "T " + parseFloat(Y.toFixed(1)),
                };
                params.tools.pattern[point].applyOptions(changeOptions);
                //
                point = "Z";
                changeOptions = {
                    price: parseFloat((tR + Z).toFixed(1)),
                    title: "T " + parseFloat(Z.toFixed(1)),
                };
                params.tools.pattern[point].applyOptions(changeOptions);
                //
                point = "W";
                changeOptions = {
                    price: parseFloat((tR + W).toFixed(1)),
                    title: "T " + parseFloat(W.toFixed(1)),
                };
                params.tools.pattern[point].applyOptions(changeOptions);
            } else {
                points = {
                    A: {
                        time: +aOptions.time,
                        price: +aOptions.price,
                    },
                    B: { price: +bOptions.price },
                    C: { price },
                };
                const {
                    pattern,
                    timeRange,
                    info: { el1, el2, el3, fibo, tR, X, Y, Z, W },
                } = calculatePattern(points);
                _timeRange = timeRange;
                _pattern = pattern;
                //
                let point = "A";
                params.tools.pattern[point].applyOptions({
                    title: `A ${el1}`,
                });
                //
                point = "B";
                params.tools.pattern[point].applyOptions({
                    title: `B ${el2}`,
                });
                //
                option.point = "C";
                option.title = `C ${el3}`;
                option.color = "#FF9800";
                params.tools.pattern[option.point] =
                    params.series.price.createPriceLine(option);
                //
                option.point = "D";
                option.price = tR;
                option.title = "F " + fibo;
                option.color = "#4CAF50";
                params.tools.pattern[option.point] =
                    params.series.price.createPriceLine(option);
                //
                option.point = "X";
                option.price = parseFloat((tR + X).toFixed(1));
                option.title = "T " + parseFloat(X.toFixed(1));
                option.color = "#2196F3";
                option.draggable = false;
                params.tools.pattern[option.point] =
                    params.series.price.createPriceLine(option);
                //
                option.point = "Y";
                option.price = parseFloat((tR + Y).toFixed(1));
                option.title = "T " + parseFloat(Y.toFixed(1));
                option.color = "#673AB7";
                option.draggable = false;
                params.tools.pattern[option.point] =
                    params.series.price.createPriceLine(option);
                //
                option.point = "Z";
                option.price = parseFloat((tR + Z).toFixed(1));
                option.title = "T " + parseFloat(Z.toFixed(1));
                option.color = "#9C27B0";
                option.draggable = false;
                params.tools.pattern[option.point] =
                    params.series.price.createPriceLine(option);
                //
                option.point = "W";
                option.price = parseFloat((tR + W).toFixed(1));
                option.title = "T " + parseFloat(W.toFixed(1));
                option.color = "#E91E63";
                option.draggable = false;
                params.tools.pattern[option.point] =
                    params.series.price.createPriceLine(option);
            }
            loadProgressTool(_pattern);
            loadTimeRangeTool(_timeRange);
            savePattern(points);
            patternToolRef.value.classList.remove("selected");
        } else {
            option.point = "B";
            option.title = "B 0";
            option.color = "#009688";
            params.tools.pattern[option.point] =
                params.series.price.createPriceLine(option);
        }
    } else {
        option.point = "A";
        option.title = "A 0";
        option.color = "#F44336";
        option.time = time;
        params.tools.pattern[option.point] =
            params.series.price.createPriceLine(option);
    }
}
function loadPatternTool(points, patternSelected = null, loadTimeRange = true) {
    const TYPE = "pattern";
    let option = {
        lineType: TYPE,
        lineWidth: 1,
        lineStyle: 1,
        draggable: true,
    };
    const {
        pattern,
        timeRange,
        info: { el1, el2, el3, fibo, tR, X, Y, Z, W },
    } = calculatePattern(points, patternSelected);
    loadProgressTool(pattern);
    if (loadTimeRange) loadTimeRangeTool(timeRange);
    //
    option.point = "A";
    option.title = `A ${el1}`;
    option.color = "#F44336";
    option.price = points.A.price;
    option.time = points.A.time;
    params.tools.pattern[option.point] =
        params.series.price.createPriceLine(option);
    //
    option.point = "B";
    option.title = `B ${el2}`;
    option.color = "#009688";
    option.price = points.B.price;
    params.tools.pattern[option.point] =
        params.series.price.createPriceLine(option);
    //
    option.point = "C";
    option.price = points.C.price;
    option.title = `C ${el3}`;
    option.color = "#FF9800";
    params.tools.pattern[option.point] =
        params.series.price.createPriceLine(option);
    //
    option.point = "D";
    option.price = tR;
    option.title = "F " + fibo;
    option.color = "#4CAF50";
    params.tools.pattern[option.point] =
        params.series.price.createPriceLine(option);
    //
    option.point = "X";
    option.price = parseFloat((tR + X).toFixed(1));
    option.title = "T " + parseFloat(X.toFixed(1));
    option.color = "#2196F3";
    option.draggable = false;
    params.tools.pattern[option.point] =
        params.series.price.createPriceLine(option);
    //
    option.point = "Y";
    option.price = parseFloat((tR + Y).toFixed(1));
    option.title = "T " + parseFloat(Y.toFixed(1));
    option.color = "#673AB7";
    option.draggable = false;
    params.tools.pattern[option.point] =
        params.series.price.createPriceLine(option);
    //
    option.point = "Z";
    option.price = parseFloat((tR + Z).toFixed(1));
    option.title = "T " + parseFloat(Z.toFixed(1));
    option.color = "#9C27B0";
    option.draggable = false;
    params.tools.pattern[option.point] =
        params.series.price.createPriceLine(option);
    //
    option.point = "W";
    option.price = parseFloat((tR + W).toFixed(1));
    option.title = "T " + parseFloat(W.toFixed(1));
    option.color = "#E91E63";
    option.draggable = false;
    params.tools.pattern[option.point] =
        params.series.price.createPriceLine(option);
}
function calculatePattern(points, patternDefault = null, tRDefault = null) {
    const phase1 = scanPhase(points.A, points.B);
    const phase2 = scanPhase(phase1.R, points.C);
    const phase3 = scanPhase(phase2.R, phase2.S);
    //
    const el1 = parseFloat(phase1.el.toFixed(1));
    const el2 = parseFloat(phase2.el.toFixed(1));
    const el3 = parseFloat(phase3.el.toFixed(1));
    //
    const bc = points.B.price - points.C.price;
    const ba = points.B.price - points.A.price;
    const side = ba > 0;
    const BC = Math.abs(bc);
    let patterns = [];
    let tR, tS, timeRange, fibo;
    if (BC > phase1.pr) {
        if (BC >= 1.5) {
            if (phase2.tr >= 2 * phase1.tr) {
                // if (bc / ba < 0.5) patterns.push("FL");
            } else if (phase2.tr >= phase1.tr) patterns.push("F");
            else {
                // if (
                //     cmp(phase2.S1.price, side, phase1.R1.price) &&
                //     cmp(phase2.R1.price, !side, phase1.S1.price)
                // )
                //     patterns.push("FS");
            }
            if (phase3.tr >= 2 * phase1.tr) {
                // if (bc / ba < 0.5) patterns.push("TL");
            } else if (phase3.tr >= phase1.tr) patterns.push("T");
        }
        if (phase1.pr >= 1.5) {
            if (cmp(points.C.price, side, phase1.S1.price)) {
                if (phase1.el >= 2) {
                    if (phase2.tr > phase3.tr) patterns.push("ELF");
                    else patterns.push("ELT");
                } else if (phase1.el >= 1) {
                    if (phase2.tr > phase3.tr) patterns.push("EF");
                    else patterns.push("ET");
                }
            }
        }
    }
    const pattern = patternDefault ?? (patterns.length ? patterns[0] : null);
    if (["FL", "F", "FS"].includes(pattern)) {
        tS = phase2.R.price;
        tR = phase2.S1.price;
        timeRange = [
            phase2.R1.time,
            indexToTime(phase2.S1.index),
            phase2.S1.time,
        ];
    } else if (["TL", "T"].includes(pattern)) {
        tS = phase3.S.price;
        tR = phase3.R1.price;
        timeRange = [
            phase1.R1.time,
            indexToTime(phase1.S1.index),
            phase3.R1.time,
        ];
    } else if (["ELF", "ELT", "EF", "ET"].includes(pattern)) {
        tS = phase1.S1.price;
        tR = phase1.R1.price;
        fibo = parseInt(((tR - tS) / ba) * 100);
        if (["ELF", "EF"].includes(pattern)) {
            timeRange = [
                phase2.R1.time,
                indexToTime(phase2.S1.index),
                phase2.R.time,
            ];
        } else {
            timeRange = [
                phase1.R1.time,
                indexToTime(phase1.S1.index),
                phase1.R.time,
            ];
        }
    }
    if (!tS) tS = phase2.R.price;
    if (!tR) tR = points.B.price;
    if (tRDefault) tR = tRDefault;
    if (!timeRange) timeRange = [phase1.R1.time, indexToTime(phase1.S1.index)];
    if (!fibo) fibo = parseInt(((tR - tS) / bc) * 100);
    //
    const Y = tR - tS;
    const X = 0.5 * Y;
    const Z = 2 * Y;
    const W = 4 * Y;

    return {
        pattern: { items: patterns, selected: pattern },
        timeRange,
        info: { el1, el2, el3, fibo, tR, X, Y, Z, W },
    };
}
function scanPhase(start, end) {
    let S = mf.cloneDeep(start);
    let R = mf.cloneDeep(end);
    const side = R.price > S.price;
    let box = {},
        maxBox = {};
    params.data.price
        .filter((item) => item.time >= S.time)
        .every((item, i) => {
            const price = item.value;
            const time = item.time;
            const index = timeToIndex(time);
            if (index == -1) return false;
            if (i == 0 || price == S.price) {
                box = {
                    R: { index, time, price },
                    S: { index, time, price },
                };
                maxBox = {
                    R: box.R,
                    S: box.S,
                    pr: 0,
                    tr: 0,
                };
            }
            if (cmp(price, side, box.R.price)) {
                const tr = box.S.index - box.R.index;
                const pr = Math.abs(box.S.price - box.R.price);
                if (tr >= maxBox.tr) {
                    maxBox.tr = tr;
                    maxBox.pr = pr;
                    maxBox.R = box.R;
                    maxBox.S = box.S;
                }
                if (
                    pr >= maxBox.pr &&
                    Math.abs(box.R.price - maxBox.R.price) / pr < 0.2
                ) {
                    maxBox.S.index = box.S.index;
                    maxBox.tr = box.S.index - maxBox.R.index;
                    maxBox.pr = pr;
                }
                box = {
                    R: { index, time, price },
                    S: { index, time, price },
                };
            } else {
                box.S.index = index;
                if (cmp(price, !side, box.S.price)) {
                    box.S.time = time;
                    box.S.price = price;
                }
            }
            if (cmp(price, !side, S.price)) {
                box.S.price = S.price;
                return false;
            }
            if (!cmp(price, !side, R.price)) return false;
            return true;
        });
    const tr = box.S.index - box.R.index;
    if (tr >= maxBox.tr) {
        const pr = Math.abs(box.S.price - box.R.price);
        maxBox.tr = tr;
        maxBox.pr = pr;
        maxBox.R = box.R;
        maxBox.S = box.S;
    }
    R.time = indexToTime(box.S.index);
    R.index = timeToIndex(R.time);
    S.index = timeToIndex(S.time);
    const exr = Math.abs(R.price - maxBox.R.price);
    return {
        tr: maxBox.tr,
        pr: maxBox.pr,
        el: exr / maxBox.pr,
        S1: maxBox.S,
        R1: maxBox.R,
        S,
        R,
    };
}
function savePattern(points = {}) {
    let isRemove = !mf.isSet(points);
    let param = {
        isRemove,
        name: "pattern",
        points: [],
        data: [],
    };
    if (!isRemove) {
        Object.entries(points).forEach(([key, value]) => {
            param.points.push(key);
            param.data.push(value);
        });
    }
    store.dispatch("tradingDerivative/drawTools", param);
}
function removePatternTool() {
    if (mf.isSet(params.tools.pattern.A)) {
        params.series.price.removePriceLine(params.tools.pattern.A);
        if (mf.isSet(params.tools.pattern.B)) {
            params.series.price.removePriceLine(params.tools.pattern.B);
            if (mf.isSet(params.tools.pattern.C)) {
                params.series.price.removePriceLine(params.tools.pattern.C);
                params.series.price.removePriceLine(params.tools.pattern.D);
                params.series.price.removePriceLine(params.tools.pattern.X);
                params.series.price.removePriceLine(params.tools.pattern.Y);
                params.series.price.removePriceLine(params.tools.pattern.Z);
                params.series.price.removePriceLine(params.tools.pattern.W);
            }
        }
    }
    initToolsParams(["pattern"]);
}
function timeRangeToolClick(e) {
    state.showScanContext = false;
    state.showLineContext = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        e.target.classList.add("selected");
    }
}
function timeRangeToolContextmenu(e) {
    removeTimeRangeTool();
    e.target.classList.remove("selected");
}
function drawTimeRangeTool() {
    let param = {
        isRemove: false,
        name: "tr",
        points: [],
        data: [],
    };
    const time = params.crosshair.time;
    let option = { time, value: 1 };
    switch (params.tools.timeRange.length) {
        case 0:
            option.color = "OrangeRed";
            params.tools.timeRange[0] = option;
            param.points.push(0);
            param.data.push(time);
            break;
        case 1:
            option.color = "lime";
            params.tools.timeRange[1] = option;
            param.points.push(1);
            param.data.push(time);
            timeRangeToolRef.value.classList.remove("selected");
            break;
        default:
            const index0 = timeToIndex(params.tools.timeRange[0].time);
            const index1 = timeToIndex(params.tools.timeRange[1].time);
            const index2 = timeToIndex(time);
            const index3 = index2 + (index1 - index0);
            const time3 = indexToTime(index3);

            option.color = "OrangeRed";
            params.tools.timeRange[0] = mf.cloneDeep(option);
            param.points.push(0);
            param.data.push(time);
            //
            option.time = time3;
            option.color = "lime";
            params.tools.timeRange[1] = option;
            param.points.push(1);
            param.data.push(time3);
            timeRangeToolRef.value.classList.remove("selected");
            break;
    }
    params.series.timeRange.setData(params.tools.timeRange);
    store.dispatch("tradingDerivative/drawTools", param);
}
function loadTimeRangeTool(data) {
    let start, end;
    if (data.length == 2) {
        start = data[0];
        end = data[1];
    } else if (data.length == 3) {
        const index0 = timeToIndex(data[0]);
        const index1 = timeToIndex(data[1]);
        const index2 = timeToIndex(data[2]);
        const index3 = index2 + (index1 - index0);
        start = data[2];
        end = indexToTime(index3);
    } else return false;
    let timeRange = [
        { time: start, value: 1, color: "OrangeRed" },
        { time: end, value: 1, color: "lime" },
    ];
    params.tools.timeRange = timeRange;
    params.series.timeRange.setData(timeRange);
}
function removeTimeRangeTool(withServer = true, onlyServer = false) {
    if (withServer)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: true,
            name: "tr",
        });
    if (!onlyServer) {
        params.series.timeRange.setData([]);
        initToolsParams(["tr"]);
    }
}
function lineToolClick(e) {
    state.showScanContext = false;
    state.showLineContext = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
}
function lineToolContextmenu(e) {
    state.showLineContext = !state.showLineContext;
    state.showPatternContext = false;
    state.showScanContext = false;
}
function drawLineTool() {
    const TYPE = "line";
    const price = coordinateToPrice(params.crosshair.y);
    const oldLength = params.tools.lines.length;
    params.tools.lines = params.tools.lines.filter((line) => {
        const ops = line.options();
        const isExist = (ops.type = TYPE && price == +ops.price);
        if (isExist) {
            params.series.price.removePriceLine(line);
            store.dispatch("tradingDerivative/drawTools", {
                isRemove: true,
                name: TYPE,
                point: price,
            });
        }
        return !isExist;
    });
    if (params.tools.lines.length == oldLength) {
        const color = state.lineColor;
        const title = state.lineTitle;
        const options = {
            lineType: TYPE,
            price: price,
            color,
            title,
            lineWidth: 1,
            lineStyle: 1,
            draggable: true,
        };
        params.tools.lines.push(params.series.price.createPriceLine(options));
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: false,
            name: TYPE,
            points: [price],
            data: [{ color, title }],
        });
    }
    lineToolRef.value.classList.remove("selected");
}
function loadLineTool(lines) {
    const TYPE = "line";
    const options = {
        lineType: TYPE,
        lineWidth: 1,
        lineStyle: 1,
        draggable: true,
    };
    Object.entries(lines).forEach(([price, { color, title }]) => {
        options.price = +price;
        options.color = color;
        options.title = title;
        params.tools.lines.push(params.series.price.createPriceLine(options));
    });
}
function removeLineTool(withServer = true) {
    if (params.tools.lines.length > 0) {
        if (withServer)
            store.dispatch("tradingDerivative/drawTools", {
                isRemove: true,
                name: "line",
            });
        params.tools.lines.forEach((line) =>
            params.series.price.removePriceLine(line)
        );
        initToolsParams(["lines"]);
    }
}
function targetToolClick(e) {
    state.showScanContext = false;
    state.showLineContext = false;
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
        name: TYPE,
        points: [],
        data: [price],
    };
    if (mf.isSet(params.tools.target.A)) {
        const a = +params.tools.target.A.options().price;
        const ba = price - a;
        option.point = "B";
        option.title = parseFloat(ba.toFixed(1));
        option.color = "#F44336";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        param.points.push(option.point);
        //
        option.point = "X";
        option.price = parseFloat((a - 0.5 * ba).toFixed(1));
        option.title = parseFloat((-0.5 * ba).toFixed(1));
        option.color = "#2196F3";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        //
        option.point = "Y";
        option.price = parseFloat((a - ba).toFixed(1));
        option.title = parseFloat(-ba.toFixed(1));
        option.color = "#673AB7";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        //
        option.point = "Z";
        option.price = parseFloat((a - 2 * ba).toFixed(1));
        option.title = parseFloat((-2 * ba).toFixed(1));
        option.color = "#9C27B0";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        //
        option.point = "W";
        option.price = parseFloat((a - 4 * ba).toFixed(1));
        option.title = parseFloat((-4 * ba).toFixed(1));
        option.color = "#E91E63";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        //
        targetToolRef.value.classList.remove("selected");
    } else {
        option.point = "A";
        option.title = "0";
        option.color = "#FF9800";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        param.points.push(option.point);
    }
    store.dispatch("tradingDerivative/drawTools", param);
}
function loadTargetTool(points) {
    const TYPE = "target";
    let option = {
        lineType: TYPE,
        lineWidth: 1,
        lineStyle: 1,
        draggable: true,
    };
    const a = points.A;
    const b = points.B;
    const ba = b - a;
    //
    option.point = "A";
    option.price = a;
    option.title = "0";
    option.color = "#FF9800";
    params.tools.target[option.point] =
        params.series.price.createPriceLine(option);
    //
    option.point = "B";
    option.price = b;
    option.title = parseFloat(ba.toFixed(1));
    option.color = "#F44336";
    params.tools.target[option.point] =
        params.series.price.createPriceLine(option);
    //
    option.point = "X";
    option.price = parseFloat((a - 0.5 * ba).toFixed(1));
    option.title = parseFloat((-0.5 * ba).toFixed(1));
    option.color = "#2196F3";
    params.tools.target[option.point] =
        params.series.price.createPriceLine(option);
    //
    option.point = "Y";
    option.price = parseFloat((a - ba).toFixed(1));
    option.title = parseFloat(-ba.toFixed(1));
    option.color = "#673AB7";
    params.tools.target[option.point] =
        params.series.price.createPriceLine(option);
    //
    option.point = "Z";
    option.price = parseFloat((a - 2 * ba).toFixed(1));
    option.title = parseFloat((-2 * ba).toFixed(1));
    option.color = "#9C27B0";
    params.tools.target[option.point] =
        params.series.price.createPriceLine(option);
    //
    option.point = "W";
    option.price = parseFloat((a - 4 * ba).toFixed(1));
    option.title = parseFloat((-4 * ba).toFixed(1));
    option.color = "#E91E63";
    params.tools.target[option.point] =
        params.series.price.createPriceLine(option);
}
function removeTargetTool(withServer = true) {
    if (withServer)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: true,
            name: "target",
        });
    if (mf.isSet(params.tools.target.A)) {
        params.series.price.removePriceLine(params.tools.target.A);
        if (mf.isSet(params.tools.target.B)) {
            params.series.price.removePriceLine(params.tools.target.B);
            params.series.price.removePriceLine(params.tools.target.X);
            params.series.price.removePriceLine(params.tools.target.Y);
            params.series.price.removePriceLine(params.tools.target.Z);
            params.series.price.removePriceLine(params.tools.target.W);
        }
    }
    initToolsParams(["target"]);
}
function removeAllTools() {
    removeOrderTool(["entry", "tp", "sl"], false);
    removeLineTool(false);
    removeTargetTool(false);
    removeTimeRangeTool(false);
    removeProgressTool();
    removePatternTool();
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
function coordinateToPrice(y) {
    return parseFloat(params.series.price.coordinateToPrice(y).toFixed(1));
}
function toastOrderError(error) {
    if (!error) error = "unknown";
    toast.error(t(`trading.derivative.${error}`));
}
function dateSelectChange() {
    if (!state.chartDate) return false;
    store.dispatch("tradingDerivative/getChartData", state.chartDate);
}
function refreshChart() {
    if (inSession()) params.websocket.send(params.socketSendData);
}
function resetChart() {
    params.data.whitespace = [];
    params.data.price = [];
    refreshChart();
    store.dispatch("tradingDerivative/getChartData", state.chartDate);
}
function getStatus() {
    store.dispatch("tradingDerivative/getStatus");
}
function getTools() {
    store.dispatch("tradingDerivative/getTools");
}
function initToolsParams(tools) {
    if (tools == undefined)
        tools = ["order", "lines", "tr", "pattern", "target"];
    if (tools.includes("order"))
        params.tools.order = { side: 0, entry: {}, tp: {}, sl: {} };
    if (tools.includes("lines")) params.tools.lines = [];
    if (tools.includes("target")) params.tools.target = {};
    if (tools.includes("tr")) params.tools.timeRange = [];
    if (tools.includes("pattern")) params.tools.pattern = {};
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
function report() {
    bus.emit("checkPin", () => store.dispatch("tradingDerivative/report"));
}
function exportCsv() {
    bus.emit("checkPin", () =>
        store.dispatch("tradingDerivative/export", state.chartDate)
    );
}
function loginVps() {
    vpsOtpPopupRef.value.show();
}
function loginDnse() {
    bus.emit("checkPin", () => store.dispatch("tradingDerivative/loginDnse"));
}
function cmp(value1, side, value2, eq = false) {
    if (side) return eq ? value1 >= value2 : value1 > value2;
    else return eq ? value1 <= value2 : value1 < value2;
}
function timeToIndex(time) {
    let index = params.data.whitespace.findIndex((item) => item.time == time);
    if (index == -1) {
        const date = format(new Date(time * 1000), "yyyy-MM-dd");
        const amEnd = getUnixTime(new Date(`${date}T11:30:00Z`));
        const pmStart = getUnixTime(new Date(`${date}T13:00:00Z`));
        const pmEnd = getUnixTime(new Date(`${date}T14:30:00Z`));
        if (time > amEnd && time < pmStart) time = amEnd;
        else if (time > pmEnd) time = pmEnd;
        index = params.data.whitespace.findIndex((item) => item.time == time);
    }
    return index;
}
function indexToTime(index) {
    return params.data.whitespace[index].time;
}
</script>
<style lang="scss">
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
