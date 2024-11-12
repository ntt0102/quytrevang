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
                        @click="
                            () => $store.dispatch('tradingDerivative/getStatus')
                        "
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
                        @click="() => resetChart(false)"
                        @contextmenu="() => resetChart(true)"
                    >
                        <i
                            class="far fa-sync-alt"
                            :class="{
                                'fa-spin':
                                    $store.state.tradingDerivative
                                        .isChartLoading,
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
                        @contextmenu="resetTools"
                    ></div>
                    <div
                        class="popup command"
                        :class="{
                            green: state.progress[0] <= 1,
                            red: state.progress[0] > 1,
                        }"
                        :title="$t('trading.derivative.progressTool')"
                        @click="showProgressToolPopup"
                    >
                        <i
                            class="far"
                            :class="{
                                'fa-badge-check': !state.progress.length,
                                [`fa-circle-${state.progress[0] + 1}`]:
                                    state.progress.length,
                            }"
                        >
                        </i>
                        <ProgressContextMenu
                            v-show="state.showProgressContext"
                            class="contextmenu"
                            v-model="state.progress"
                            @change="progressChange"
                        ></ProgressContextMenu>
                    </div>
                    <div
                        ref="autoScanToolRef"
                        class="command"
                        :title="$t('trading.derivative.autoScanTool')"
                        @click="autoScanToolClick"
                        @contextmenu="autoScanToolContextmenu"
                    >
                        <i
                            class="far fa-bolt-auto"
                            :class="{ blink: config.autoScan }"
                        ></i>
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
                        class="popup command"
                        :title="$t('trading.derivative.lineTool')"
                        @click="lineToolClick"
                        @contextmenu="lineToolContextmenu"
                    >
                        <i class="far fa-horizontal-rule"></i>
                        <LineContextMenu
                            v-show="state.showLineContext"
                            class="contextmenu"
                            :enable="state.showLineContext"
                            v-model:title="state.lineTitle"
                            v-model:color="state.lineColor"
                            @deleteAllLine="removeLineTool"
                        ></LineContextMenu>
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
                        v-show="false"
                        ref="rrToolRef"
                        class="command"
                        :title="$t('trading.derivative.rrTool')"
                        @click="rrToolClick"
                        @contextmenu="rrToolContextmenu"
                    >
                        <i class="far fa-percent"> </i>
                    </div>
                    <div
                        v-show="false"
                        class="popup command"
                        :title="$t('trading.derivative.sampleTool')"
                        @click="sampleToolClick"
                    >
                        <i class="far fa-heart-rate"></i>
                        <PatternContextMenu
                            v-show="state.showSampleContext"
                            class="contextmenu"
                        ></PatternContextMenu>
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
                    :src="tradingViewSrc"
                ></iframe>
            </div>
        </div>
    </div>
    <VpsOtpPopup ref="vpsOtpPopupRef" />
</template>

<script setup>
import LineContextMenu from "./LineContextMenu.vue";
import PatternContextMenu from "./PatternContextMenu/Index.vue";
import ProgressContextMenu from "./ProgressContextMenu/Index.vue";
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
import moment from "moment";

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
const SHIFT_TIME = 7 * 60 * 60;
const TP_DEFAULT = 3;
const SL_DEFAULT = 2;
const CURRENT_DATE = moment().format("YYYY-MM-DD");
const TIME = {
    START: moment(CURRENT_DATE + "T08:45:00").unix(),
    ATO: moment(CURRENT_DATE + "T09:00:00").unix(),
    ATC: moment(CURRENT_DATE + "T14:30:00").unix(),
    END: moment(CURRENT_DATE + "T14:45:00").unix(),
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
const rrToolRef = ref(null);
const patternToolRef = ref(null);
const targetToolRef = ref(null);
const timeRangeToolRef = ref(null);
const autoScanToolRef = ref(null);
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
        volume: [],
    },
    tools: {},
    crosshair: {},
    interval: null,
    interval60: null,
    websocket: null,
    isAutoOrdering: false,
    socketStop: false,
    socketSendData: null,
    currentSeconds: moment().unix(),
};
initToolsParams();
//
const state = reactive({
    chartDate: route.query.date ?? CURRENT_DATE,
    clock: moment().format("HH:mm:ss"),
    isFullscreen: false,
    isSocketWarning: false,
    isOrderWarning: false,
    isAutoScan: false,
    lineColor: "#F44336",
    lineTitle: "",
    progress: [],
    showLineContext: false,
    showSampleContext: false,
    showProgressContext: false,
    showTradingView: false,
});
const status = computed(() => store.state.tradingDerivative.status);
const config = computed(() => store.state.tradingDerivative.config);
const tools = computed(() => store.state.tradingDerivative.tools);
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
        .dispatch("tradingDerivative/getChartData", { date: state.chartDate })
        .then((hasData) => {
            if (hasData) store.dispatch("tradingDerivative/getTools");
        });
});

params.interval = setInterval(intervalHandler, 1000);
params.interval60 = setInterval(() => {
    if (inSession()) {
        store.dispatch("tradingDerivative/getStatus");
        if (config.value.autoScan) resetTools();
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
    params.series.volume = params.chart.addLineSeries({
        priceScaleId: "volume",
        scaleMargins: { top: 0.86, bottom: 0.01 },
        color: "#FFD700",
        lastValueVisible: false,
        visible: false,
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
    state.showLineContext = false;
    state.showSampleContext = false;
    toggleOrderButton(false);
    if (lineToolRef.value.classList.contains("selected")) drawLineTool();
    else if (targetToolRef.value.classList.contains("selected"))
        drawTargetTool();
    else if (timeRangeToolRef.value.classList.contains("selected"))
        drawTimeRangeTool();
    else if (autoScanToolRef.value.classList.contains("selected"))
        drawAutoScanTool();
    else if (rrToolRef.value.classList.contains("selected")) drawRrTool();
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
                                    drawOrderLine([lineOptions.kind]);
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
                                    drawOrderLine([lineOptions.kind]);
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
                                    drawOrderLine([lineOptions.kind]);
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
            store.dispatch("tradingDerivative/drawTools", {
                isRemove: false,
                name: "line",
                points: [newPrice],
                data: [lineOptions],
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
                    }
                    ba = parseFloat(((b - newPrice) / div).toFixed(1));
                    a = b - ba;
                    changeOptions = { price: a };
                    params.tools.target[point].applyOptions(changeOptions);
                }
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                point = "B";
                changeOptions = { price: b, title: ba.toFixed(1) };
                if (lineOptions.point == point) delete changeOptions.price;
                params.tools.target[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                point = "X";
                changeOptions = {
                    price: parseFloat((a - 0.5 * ba).toFixed(1)),
                    title: (-0.5 * ba).toFixed(1),
                };
                if (lineOptions.point == point) delete changeOptions.price;
                params.tools.target[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                point = "Y";
                changeOptions = {
                    price: parseFloat((a - ba).toFixed(1)),
                    title: (-ba).toFixed(1),
                };
                if (lineOptions.point == point) delete changeOptions.price;
                params.tools.target[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                point = "Z";
                changeOptions = {
                    price: parseFloat((a - 2 * ba).toFixed(1)),
                    title: (-2 * ba).toFixed(1),
                };
                if (lineOptions.point == point) delete changeOptions.price;
                params.tools.target[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                store.dispatch("tradingDerivative/drawTools", param);
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
                if (lineOptions.point == "EP") {
                    point = "SL";
                    params.tools.rr[point].applyOptions({
                        price: epPrice + slPrice - oldPrice,
                    });
                    param.points.push(point);
                    param.data.push(params.tools.rr[point].options());
                    //
                    point = "TP";
                    params.tools.rr[point].applyOptions({
                        price: epPrice + tpPrice - oldPrice,
                    });
                    param.points.push(point);
                    param.data.push(params.tools.rr[point].options());
                } else {
                    const rSl = slPrice - epPrice;
                    const rTp = tpPrice - epPrice;
                    if (rTp / rSl > 0) {
                        line.applyOptions({ price: oldPrice });
                        return false;
                    }
                    const rr = Math.abs(rTp) / Math.abs(rSl);
                    //
                    point = "EP";
                    params.tools.rr[point].applyOptions({
                        title: `RR=${rr.toFixed(1)}`,
                    });
                    param.points.push(point);
                    param.data.push(params.tools.rr[point].options());
                    //
                    point = "SL";
                    params.tools.rr[point].applyOptions({
                        title: `SL=${rSl.toFixed(1)}`,
                    });
                    param.points.push(point);
                    param.data.push(params.tools.rr[point].options());
                    //
                    point = "TP";
                    params.tools.rr[point].applyOptions({
                        title: `TP=${rTp.toFixed(1)}`,
                    });
                    param.points.push(point);
                    param.data.push(params.tools.rr[point].options());
                }
                store.dispatch("tradingDerivative/drawTools", param);
            }
            break;
        case "pattern":
            if (mf.isSet(params.tools.pattern.B)) {
                let param = {
                    isRemove: false,
                    name: "pattern",
                    points: [],
                    data: [],
                };
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
                const {
                    pattern,
                    timeRS1,
                    tr1,
                    tr2,
                    tr3,
                    pr1,
                    pr2,
                    pr3,
                    fibo,
                    sp,
                } = calculatePattern(points);
                const b = points.B.price;
                const c = points.C.price;
                let d = sp;
                loadTimeRangeTool(timeRS1, true, true);
                loadProgressTool(pattern, true);
                //
                point = "A";
                changeOptions = { title: `A ${tr1} ${pr1}` };
                params.tools.pattern[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.pattern[point].options());
                //
                point = "B";
                changeOptions = { title: `B ${tr2} ${pr2}` };
                params.tools.pattern[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.pattern[point].options());
                //
                point = "C";
                changeOptions = { title: `C ${tr3} ${pr3}` };
                params.tools.pattern[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.pattern[point].options());
                //
                point = "D";
                if (lineOptions.point == point) {
                    d = +params.tools.pattern.D.options().price;
                    changeOptions = {
                        title: "F " + parseInt(((c - d) / (c - b)) * 100),
                    };
                } else
                    changeOptions = {
                        price: d,
                        title: "F " + fibo,
                    };
                params.tools.pattern[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.pattern[point].options());
                //
                point = "X";
                changeOptions = {
                    price: parseFloat((d + (d - c) * 0.5).toFixed(1)),
                    title: "T " + parseFloat(((d - c) * 0.5).toFixed(1)),
                };
                params.tools.pattern[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.pattern[point].options());
                //
                point = "Y";
                changeOptions = {
                    price: parseFloat((d + (d - c)).toFixed(1)),
                    title: "T " + parseFloat((d - c).toFixed(1)),
                };
                params.tools.pattern[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.pattern[point].options());
                //
                point = "Z";
                changeOptions = {
                    price: parseFloat((d + (d - c) * 2).toFixed(1)),
                    title: "T " + parseFloat(((d - c) * 2).toFixed(1)),
                };
                params.tools.pattern[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.pattern[point].options());
                //
                store.dispatch("tradingDerivative/drawTools", param);
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
                Object.entries(points).forEach(([point, line]) => {
                    params.tools.order.side = line.side;
                    params.tools.order[point].price = line.price;
                    params.tools.order[point].line =
                        params.series.price.createPriceLine(line);
                });
                break;
            case "line":
                Object.values(points).forEach((line) =>
                    params.tools.lines.push(
                        params.series.price.createPriceLine(line)
                    )
                );
                break;
            case "tr":
                loadTimeRangeTool(Object.values(points));
                break;
            case "progress":
                state.progress = Object.values(points)[0];
                break;
            case "target":
            case "pattern":
                Object.entries(points).forEach(
                    ([point, line]) =>
                        (params.tools[name][point] =
                            params.series.price.createPriceLine(line))
                );
                break;
            case "auto":
                if (!("pattern" in toolsData)) loadAutoScanTool(toolsData);
                break;
        }
    });
}
function loadChartData(chartData) {
    if (!(state.chartDate == CURRENT_DATE && inSession())) {
        if (!chartData.isDay && chartData.price.length > 0) {
            params.data.whitespace = mergeChartData(
                params.data.whitespace,
                createWhitespaceData(state.chartDate)
            );
        }
        params.series.whitespace.setData(params.data.whitespace);

        params.data.price = mergeChartData(params.data.price, chartData.price);
        params.series.price.setData(params.data.price);
        params.data.volume = mergeChartData(
            params.data.volume,
            chartData.volume
        );
        params.series.volume.setData(params.data.volume);
    }
}
function updateChartData(data, lastVolume) {
    let prices = [],
        volumes = [];
    if (lastVolume == undefined) {
        if (params.data.volume.length == 0) return false;
        lastVolume = params.data.volume.at(-1).value;
    }
    data.forEach((item) => {
        const time = moment(item.date).unix() + SHIFT_TIME;
        prices.push({ time, value: item.price });
        lastVolume +=
            (item.side == "B" ? 1 : item.side == "S" ? -1 : 0) * item.volume;
        volumes.push({ time, value: lastVolume });
    });
    if (prices.length > 1) {
        params.data.price = mergeChartData(params.data.price, prices);
        params.series.price.setData(params.data.price);
        params.data.volume = mergeChartData(params.data.volume, volumes);
        params.series.volume.setData(params.data.volume);
    } else {
        params.data.price.push(prices[0]);
        params.series.price.update(prices[0]);
        params.data.volume.push(volumes[0]);
        params.series.volume.update(volumes[0]);
    }
}
function createWhitespaceData(date) {
    const amStart = moment(`${date}T09:00:00Z`).unix();
    const amEnd = moment(`${date}T11:30:00Z`).unix();
    const pmStart = moment(`${date}T13:00:00Z`).unix();
    const pmEnd = moment(`${date}T14:30:00Z`).unix();
    const pm14h00 = moment(`${date}T14:00:00Z`).unix();
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
                store.dispatch("tradingDerivative/getTools");
                params.data.whitespace = mergeChartData(
                    params.data.whitespace,
                    createWhitespaceData(CURRENT_DATE)
                );
                params.series.whitespace.setData(params.data.whitespace);
                updateChartData(item.result, 0);
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
    params.currentSeconds = moment().unix();
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
                                removeOrderLine(["entry", "tp", "sl"]);
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
    state.clock = moment().format("HH:mm:ss");
}
function drawOrderLine(kinds) {
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
function removeOrderLine(kinds, withServer = true) {
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
function lineToolClick(e) {
    state.showLineContext = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
}
function lineToolContextmenu(e) {
    state.showLineContext = !state.showLineContext;
    state.showSampleContext = false;
    state.showProgressContext = false;
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
        const options = {
            lineType: TYPE,
            price: price,
            color: state.lineColor,
            title: state.lineTitle,
            lineWidth: 1,
            lineStyle: 1,
            draggable: true,
        };
        params.tools.lines.push(params.series.price.createPriceLine(options));
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: false,
            name: TYPE,
            points: [price],
            data: [options],
        });
    }
    lineToolRef.value.classList.remove("selected");
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
function autoScanToolClick(e) {
    state.showLineContext = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        removeAutoScanTool();
        removePatternTool(false);
        removeTimeRangeTool(false);
        removeProgressTool(false);
        e.target.classList.add("selected");
    }
}
function autoScanToolContextmenu(e) {
    store.dispatch("tradingDerivative/setAutoScan", !config.value.autoScan);
    e.target.classList.remove("selected");
}
function drawAutoScanTool() {
    autoScanToolRef.value.classList.remove("selected");
    const data = params.crosshair.time
        ? params.data.price.filter((item) => item.time <= params.crosshair.time)
        : params.data.price;
    let param = {
        isRemove: false,
        name: "auto",
        points: [],
        data: [],
    };
    const points = scanPattern(data);
    if (!mf.isSet(points)) return false;
    const { pattern, timeRS1, tr1, tr2, tr3, pr1, pr2, pr3, fibo, sp } =
        calculatePattern(points);

    loadTimeRangeTool(timeRS1, true);
    loadProgressTool(pattern);
    removePatternTool(false);
    loadPatternTool(points, { tr1, tr2, tr3, pr1, pr2, pr3, fibo, sp });
    if (JSON.stringify(params.tools.auto) != JSON.stringify(points)) {
        params.tools.auto = points;
        Object.entries(points).forEach(([key, value]) => {
            param.points.push(key);
            param.data.push(value);
        });
        store.dispatch("tradingDerivative/drawTools", param);
    }
}
function loadAutoScanTool(data) {
    const points = mf.cloneDeep(data.auto);
    params.tools.auto = points;
    const { pattern, timeRS1, tr1, tr2, tr3, pr1, pr2, pr3, fibo, sp } =
        calculatePattern(points);
    if (!mf.isSet(points)) return false;

    loadTimeRangeTool(timeRS1, true);
    loadProgressTool(pattern);
    loadPatternTool(points, {
        tr1,
        tr2,
        tr3,
        pr1,
        pr2,
        pr3,
        fibo,
        sp,
    });
}
function scanPattern(data) {
    let side, A, B, C, D, S;
    for (let i = data.length - 1; i >= 0; i--) {
        const price = data[i].value;
        const time = data[i].time;
        const index = getTimeIndex(time);
        if (i == data.length - 1) {
            D = { index, time, price };
            [C, B, A, S] = Array(6)
                .fill(null)
                .map(() => mf.cloneDeep(D));
        }
        if (side == undefined) {
            if (price == D.price) continue;
            side = D.price > price;
        }
        if (!cmp(B.price, side, D.price) && cmp(price, !side, C.price))
            C = { index, time, price };
        if (cmp(price, side, B.price)) {
            if (cmp(A.price, !side, C.price)) {
                [D, C, B] = [C, B, A].map((item) => mf.cloneDeep(item));
                A = { index, time, price };
                S = mf.cloneDeep(A);
                side = !side;
            } else if (D.index - C.index <= 5) {
                D = mf.cloneDeep(C);
                B = mf.cloneDeep(C);
                C = { index, time, price };
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
            const cd = Math.abs(C.price - D.price);
            if (bc >= 1.5 && cd / bc > 0.5) {
                if (A.index - S.index > D.index - B.index) break;
                const as = Math.abs(A.price - S.price);
                if (as > bc) break;
            }
        }
    }
    return removeIndex({ A, B, C, D });
}
function removeIndex(obj) {
    const result = {};
    Object.entries(obj).forEach(([key, value]) => {
        const { index, ...rest } = value;
        result[key] = rest;
    });
    return result;
}
function removeAutoScanTool(withServer = true) {
    if (withServer)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: true,
            name: "auto",
        });
    initToolsParams(["auto"]);
}
function patternToolClick(e) {
    state.showLineContext = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
}
function patternToolContextmenu(e) {
    e.target.classList.remove("selected");
    removePatternTool(true);
    removeTimeRangeTool(true);
    removeProgressTool(true);
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
    let param = {
        isRemove: false,
        name: TYPE,
        points: [],
        data: [],
    };
    if (mf.isSet(params.tools.pattern.A)) {
        const aOptions = params.tools.pattern.A.options();

        if (mf.isSet(params.tools.pattern.B)) {
            const bOptions = params.tools.pattern.B.options();

            if (mf.isSet(params.tools.pattern.C)) {
                let point, changeOptions;
                const cOptions = params.tools.pattern.C.options();
                const points = {
                    A: { time, price },
                    B: { price: +bOptions.price },
                    C: { price: +cOptions.price },
                };
                const {
                    pattern,
                    timeRS1,
                    tr1,
                    tr2,
                    tr3,
                    pr1,
                    pr2,
                    pr3,
                    fibo,
                    sp,
                } = calculatePattern(points);
                const c = points.C.price;
                const d = sp;
                loadTimeRangeTool(timeRS1, true, true);
                loadProgressTool(pattern, true);
                //
                point = "A";
                changeOptions = {
                    price,
                    time,
                    title: `A ${tr1} ${pr1}`,
                };
                params.tools.pattern[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.pattern[point].options());
                //
                point = "B";
                changeOptions = {
                    title: `B ${tr2} ${pr2}`,
                };
                params.tools.pattern[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.pattern[point].options());
                //
                point = "C";
                changeOptions = { title: `C ${tr3} ${pr3}` };
                params.tools.pattern[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.pattern[point].options());
                //
                point = "D";
                changeOptions = { price: d, title: "F " + fibo };
                params.tools.pattern[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.pattern[point].options());
                //
                point = "X";
                changeOptions = {
                    price: parseFloat((d + (d - c) * 0.5).toFixed(1)),
                    title: "T " + parseFloat(((d - c) * 0.5).toFixed(1)),
                };
                params.tools.pattern[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.pattern[point].options());
                //
                point = "Y";
                changeOptions = {
                    price: parseFloat((d + (d - c)).toFixed(1)),
                    title: "T " + parseFloat((d - c).toFixed(1)),
                };
                params.tools.pattern[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.pattern[point].options());
                //
                point = "Z";
                changeOptions = {
                    price: parseFloat((d + (d - c) * 2).toFixed(1)),
                    title: "T " + parseFloat(((d - c) * 2).toFixed(1)),
                };
                params.tools.pattern[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.pattern[point].options());
            } else {
                const points = {
                    A: {
                        time: +aOptions.time,
                        price: +aOptions.price,
                    },
                    B: { price: +bOptions.price },
                    C: { price },
                };
                const {
                    pattern,
                    timeRS1,
                    tr1,
                    tr2,
                    tr3,
                    pr1,
                    pr2,
                    pr3,
                    fibo,
                    sp,
                } = calculatePattern(points);
                const c = points.C.price;
                const d = sp;
                loadTimeRangeTool(timeRS1, true, true);
                loadProgressTool(pattern, true);
                //
                let point = "A";
                params.tools.pattern[point].applyOptions({
                    title: `A ${tr1} ${pr1}`,
                });
                param.points.push(point);
                param.data.push(params.tools.pattern[point].options());
                //
                point = "B";
                params.tools.pattern[point].applyOptions({
                    title: `B ${tr2} ${pr2}`,
                });
                param.points.push(point);
                param.data.push(params.tools.pattern[point].options());
                //
                option.point = "C";
                option.title = `C ${tr3} ${pr3}`;
                option.color = "#FF9800";
                params.tools.pattern[option.point] =
                    params.series.price.createPriceLine(option);
                param.points.push(option.point);
                param.data.push(mf.cloneDeep(option));
                //
                option.point = "D";
                option.price = d;
                option.title = "F " + fibo;
                option.color = "#4CAF50";
                params.tools.pattern[option.point] =
                    params.series.price.createPriceLine(option);
                param.points.push(option.point);
                param.data.push(mf.cloneDeep(option));
                //
                option.point = "X";
                option.price = parseFloat((d + (d - c) * 0.5).toFixed(1));
                option.title = "T " + parseFloat(((d - c) * 0.5).toFixed(1));
                option.color = "#2196F3";
                option.draggable = false;
                params.tools.pattern[option.point] =
                    params.series.price.createPriceLine(option);
                param.points.push(option.point);
                param.data.push(mf.cloneDeep(option));
                //
                option.point = "Y";
                option.price = parseFloat((d + (d - c)).toFixed(1));
                option.title = "T " + parseFloat((d - c).toFixed(1));
                option.color = "#673AB7";
                option.draggable = false;
                params.tools.pattern[option.point] =
                    params.series.price.createPriceLine(option);
                param.points.push(option.point);
                param.data.push(mf.cloneDeep(option));
                //
                option.point = "Z";
                option.price = parseFloat((d + (d - c) * 2).toFixed(1));
                option.title = "T " + parseFloat(((d - c) * 2).toFixed(1));
                option.color = "#9C27B0";
                option.draggable = false;
                params.tools.pattern[option.point] =
                    params.series.price.createPriceLine(option);
                param.points.push(option.point);
                param.data.push(mf.cloneDeep(option));
            }
            patternToolRef.value.classList.remove("selected");
        } else {
            option.point = "B";
            option.title = "B 0 0";
            option.color = "#009688";
            params.tools.pattern[option.point] =
                params.series.price.createPriceLine(option);
            param.points.push(option.point);
            param.data.push(mf.cloneDeep(option));
        }
    } else {
        option.point = "A";
        option.title = "A 0 0";
        option.color = "#F44336";
        option.time = time;
        params.tools.pattern[option.point] =
            params.series.price.createPriceLine(option);
        param.points.push(option.point);
        param.data.push(mf.cloneDeep(option));
    }
    store.dispatch("tradingDerivative/drawTools", param);
}
function loadPatternTool(
    { A, B, C },
    { tr1, tr2, tr3, pr1, pr2, pr3, fibo, sp },
    isStore = false
) {
    if (!params.data.price.length) return false;
    const TYPE = "pattern";
    let option = {
        lineType: TYPE,
        lineWidth: 1,
        lineStyle: 1,
        draggable: true,
    };
    let param = {
        isRemove: false,
        name: TYPE,
        points: [],
        data: [],
    };
    const c = C.price;
    const d = sp;
    //
    option.point = "A";
    option.title = `A ${tr1} ${pr1}`;
    option.color = "#F44336";
    option.price = A.price;
    option.time = A.time;
    params.tools.pattern[option.point] =
        params.series.price.createPriceLine(option);
    param.points.push(option.point);
    param.data.push(mf.cloneDeep(option));
    //
    option.point = "B";
    option.title = `B ${tr2} ${pr2}`;
    option.color = "#009688";
    option.price = B.price;
    params.tools.pattern[option.point] =
        params.series.price.createPriceLine(option);
    param.points.push(option.point);
    param.data.push(mf.cloneDeep(option));
    //
    option.point = "C";
    option.price = c;
    option.title = `C ${tr3} ${pr3}`;
    option.color = "#FF9800";
    params.tools.pattern[option.point] =
        params.series.price.createPriceLine(option);
    param.points.push(option.point);
    param.data.push(mf.cloneDeep(option));
    //
    option.point = "D";
    option.price = d;
    option.title = "F " + fibo;
    option.color = "#4CAF50";
    params.tools.pattern[option.point] =
        params.series.price.createPriceLine(option);
    param.points.push(option.point);
    param.data.push(mf.cloneDeep(option));
    //
    option.point = "X";
    option.price = parseFloat((d + (d - c) * 0.5).toFixed(1));
    option.title = "T " + parseFloat(((d - c) * 0.5).toFixed(1));
    option.color = "#2196F3";
    option.draggable = false;
    params.tools.pattern[option.point] =
        params.series.price.createPriceLine(option);
    param.points.push(option.point);
    param.data.push(mf.cloneDeep(option));
    //
    option.point = "Y";
    option.price = parseFloat((d + (d - c)).toFixed(1));
    option.title = "T " + parseFloat((d - c).toFixed(1));
    option.color = "#673AB7";
    option.draggable = false;
    params.tools.pattern[option.point] =
        params.series.price.createPriceLine(option);
    param.points.push(option.point);
    param.data.push(mf.cloneDeep(option));
    //
    option.point = "Z";
    option.price = parseFloat((d + (d - c) * 2).toFixed(1));
    option.title = "T " + parseFloat(((d - c) * 2).toFixed(1));
    option.color = "#9C27B0";
    option.draggable = false;
    params.tools.pattern[option.point] =
        params.series.price.createPriceLine(option);
    param.points.push(option.point);
    param.data.push(mf.cloneDeep(option));
    //
    if (isStore) store.dispatch("tradingDerivative/drawTools", param);
}
function calculatePattern(points) {
    const phase1 = scanPhase(points.A, points.B);
    const phase2 = scanPhase(phase1.R, points.C);
    const phase3 = scanPhase(phase2.R, points.B);
    //
    const timeRS1 = [phase1.R1.time, phase1.S1.time];
    //
    const cb = points.C.price - points.B.price;
    const side = cb > 0;
    const rs1 = phase1.S1.price - phase1.R1.price;
    const rs2 = phase2.R1.price - phase2.S1.price;
    const rs3 = phase3.S1.price - phase3.R1.price;
    const tr1 =
        cmp(phase1.R1.price, side, points.B.price) &&
        cmp(phase1.S1.price, !side, points.C.price)
            ? 1
            : 0;
    const pr1 = tr1 == 1 ? parseInt((100 * rs1) / cb) : 0;
    const tr2 =
        phase2.tr >= phase1.tr ? (phase2.tr > 3 * phase1.tr ? 2 : 1) : 0;
    if (
        tr1 == 1 &&
        cmp(phase2.S1.price, !side, phase1.R1.price) &&
        cmp(phase2.R1.price, side, phase1.S1.price)
    )
        tr2 = 3;
    const pr2 = parseInt((100 * rs2) / cb);
    const tr3 =
        phase3.tr >= phase1.tr ? (phase3.tr > 3 * phase1.tr ? 2 : 1) : 0;
    const pr3 = parseInt((100 * rs3) / cb);
    //
    const pattern = validatePattern(tr2, tr3, pr2, pr3);
    //
    let prMax = 0,
        sp = points.B.price;
    if (tr1 >= 1) {
        sp = phase1.R1.price;
        prMax = rs1;
    }
    if (tr2 >= 1 && cmp(rs2, side, prMax)) {
        sp = phase2.S1.price;
        prMax = rs2;
    }
    if (tr3 >= 1 && cmp(rs3, side, prMax)) {
        sp = phase3.R1.price;
    }
    //
    const fibo = parseInt((Math.abs(points.C.price - sp) / cb) * 100);
    //
    return {
        pattern,
        timeRS1,
        tr1,
        tr2,
        tr3,
        pr1,
        pr2,
        pr3,
        fibo,
        sp,
        points,
    };
}
function scanPhase(S, R) {
    const side = R.price > S.price;
    let box = {},
        maxBox = {};
    params.data.price
        .filter((item) => item.time >= S.time)
        .every((item, i) => {
            const price = item.value;
            const time = item.time;
            const index = getTimeIndex(time);
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
                const ir = box.S.index - box.R.index;
                const pr = Math.abs(box.S.price - box.R.price);
                if (
                    (ir > maxBox.tr && pr > 0.5 * maxBox.pr) ||
                    (ir > 0.5 * maxBox.tr && pr > 2 * maxBox.pr)
                ) {
                    maxBox.tr = ir;
                    maxBox.pr = pr;
                    maxBox.R = box.R;
                    maxBox.S = box.S;
                }
                box = {
                    R: { index, time, price },
                    S: { index, time, price },
                };
            } else {
                box.S.index = index;
                box.S.time = time;
                if (cmp(price, !side, box.S.price)) box.S.price = price;
            }
            if (cmp(price, side, R.price, true)) return false;
            else return true;
        });
    const ir = box.S.index - box.R.index;
    if (ir > maxBox.tr) {
        const pr = Math.abs(box.S.price - box.R.price);
        maxBox.tr = ir;
        maxBox.pr = pr;
        maxBox.R = box.R;
        maxBox.S = box.S;
    }
    if (!R.time) R.time = box.S.time;
    return { tr: maxBox.tr, pr: maxBox.pr, S1: maxBox.S, R1: maxBox.R, S, R };
}
function validatePattern(tr2, tr3, pr2, pr3) {
    if (pr2 >= pr3) {
        if (tr2 > 0) return 0;
        else if (tr3 > 0) return 1;
    } else {
        if (tr3 > 0) return 1;
        else if (tr2 > 0) return 0;
    }
    return 2;
}
function removePatternTool(withServer = true, onlyServer = false) {
    if (withServer)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: true,
            name: "pattern",
        });
    if (!onlyServer) {
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
                }
            }
        }
        initToolsParams(["pattern"]);
    }
}
function timeRangeToolClick(e) {
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
    let option = { time: params.crosshair.time, value: 1 };
    switch (params.tools.timeRange.length) {
        case 0:
            option.color = "OrangeRed";
            params.tools.timeRange[0] = option;
            param.points.push(0);
            param.data.push(option);
            break;
        case 1:
            option.color = "lime";
            params.tools.timeRange[1] = option;
            param.points.push(1);
            param.data.push(option);
            timeRangeToolRef.value.classList.remove("selected");
            break;
        default:
            const index0 = getTimeIndex(params.tools.timeRange[0].time);
            const index1 = getTimeIndex(params.tools.timeRange[1].time);
            const index2 = getTimeIndex(option.time);
            const index3 = index2 + (index1 - index0);

            option.color = "OrangeRed";
            params.tools.timeRange[0] = mf.cloneDeep(option);
            param.points.push(0);
            param.data.push(mf.cloneDeep(option));
            //
            option.time = params.data.whitespace[index3].time;
            option.color = "lime";
            params.tools.timeRange[1] = option;
            param.points.push(1);
            param.data.push(option);
            timeRangeToolRef.value.classList.remove("selected");
            break;
    }
    params.series.timeRange.setData(params.tools.timeRange);
    store.dispatch("tradingDerivative/drawTools", param);
}
function loadTimeRangeTool(data, onlyTime = false, isStore = false) {
    if (onlyTime)
        data = [
            { time: data[0], value: 1, color: "OrangeRed" },
            { time: data[1], value: 1, color: "lime" },
        ];
    params.tools.timeRange = data;
    params.series.timeRange.setData(data);
    if (isStore)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: false,
            name: "tr",
            points: [0, 1],
            data: data,
        });
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
function targetToolClick(e) {
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
        data: [],
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
        param.data.push(mf.cloneDeep(option));
        //
        option.point = "X";
        option.price = parseFloat((a - 0.5 * ba).toFixed(1));
        option.title = parseFloat((-0.5 * ba).toFixed(1));
        option.color = "#2196F3";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        param.points.push(option.point);
        param.data.push(mf.cloneDeep(option));
        //
        option.point = "Y";
        option.price = parseFloat((a - ba).toFixed(1));
        option.title = parseFloat(-ba.toFixed(1));
        option.color = "#673AB7";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        param.points.push(option.point);
        param.data.push(mf.cloneDeep(option));
        //
        option.point = "Z";
        option.price = parseFloat((a - 2 * ba).toFixed(1));
        option.title = parseFloat((-2 * ba).toFixed(1));
        option.color = "#9C27B0";
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
    store.dispatch("tradingDerivative/drawTools", param);
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
        }
    }
    initToolsParams(["target"]);
}
function rrToolClick(e) {
    state.showLineContext = false;
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
        name: TYPE,
        points: [],
        data: [],
    };
    if (mf.isSet(params.tools.rr.EP)) {
        const epPrice = +params.tools.rr.EP.options().price;
        if (mf.isSet(params.tools.rr.SL)) {
            const slPrice = +params.tools.rr.SL.options().price;
            const rSl = slPrice - epPrice;
            let rTp = price - epPrice;
            if (rTp / rSl > 0) {
                const tpPrice = epPrice - (slPrice - epPrice);
                option.price = tpPrice;
                rTp = tpPrice - epPrice;
            }
            option.point = "TP";
            option.title = `TP=${rTp.toFixed(1)}`;
            option.color = "lime";
            params.tools.rr[option.point] =
                params.series.price.createPriceLine(option);
            param.points.push(option.point);
            param.data.push(mf.cloneDeep(option));
            //
            const rr = Math.abs(rTp) / Math.abs(rSl);
            const EP_POINT = "EP";
            params.tools.rr[EP_POINT].applyOptions({
                title: `RR=${rr.toFixed(1)}`,
            });
            param.points.push(EP_POINT);
            param.data.push(params.tools.rr[EP_POINT].options());
            //
            rrToolRef.value.classList.remove("selected");
        } else {
            const rSl = price - epPrice;
            option.point = "SL";
            option.title = `SL=${rSl.toFixed(1)}`;
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
    store.dispatch("tradingDerivative/drawTools", param);
}
function removeRrTool(withServer = true) {
    if (withServer)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: true,
            name: "rr",
        });
    if (mf.isSet(params.tools.rr.EP)) {
        params.series.price.removePriceLine(params.tools.rr.EP);
        if (mf.isSet(params.tools.rr.SL)) {
            params.series.price.removePriceLine(params.tools.rr.SL);
            if (mf.isSet(params.tools.rr.TP)) {
                params.series.price.removePriceLine(params.tools.rr.TP);
            }
        }
    }
    initToolsParams(["rr"]);
}
function sampleToolClick() {
    state.showSampleContext = !state.showSampleContext;
    state.showProgressContext = false;
    state.showLineContext = false;
}
function showProgressToolPopup() {
    state.showProgressContext = !state.showProgressContext;
    state.showSampleContext = false;
    state.showLineContext = false;
}
function loadProgressTool(data, isStore = false) {
    state.progress = [data];
    if (isStore) progressChange(state.progress);
}
function removeProgressTool(withServer = true, onlyServer = false) {
    if (withServer) progressChange([]);
    if (!onlyServer) state.progress = [];
}
function progressChange(e) {
    store.dispatch("tradingDerivative/drawTools", {
        isRemove: !e.length,
        name: "progress",
        points: [""],
        data: [e],
    });
}
function removeAllTools() {
    removeOrderLine(["entry", "tp", "sl"], false);
    removeLineTool(false);
    // removeRrTool(false);
    removeTargetTool(false);
    removeTimeRangeTool(false);
    removeProgressTool(false);
    removePatternTool(false);
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
                        drawOrderLine(["entry"]);
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
                drawOrderLine(["entry", "tp", "sl"]);
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
                        removeOrderLine(["entry", "tp", "sl"]);
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
                        removeOrderLine(["entry"]);
                        toast.success(
                            t("trading.derivative.deleteEntrySuccess")
                        );
                    } else {
                        toastOrderError(resp.message);
                    }
                });
        }
    } else resetTools();
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
                                removeOrderLine(["entry", "tp", "sl"]);
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
                                removeOrderLine(["entry", "tp", "sl"]);
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
                                    drawOrderLine(["entry", "tp", "sl"]);
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
    store.dispatch("tradingDerivative/getChartData", { date: state.chartDate });
}
function refreshChart() {
    if (inSession()) params.websocket.send(params.socketSendData);
}
function resetChart(isDay) {
    params.data.whitespace = [];
    params.data.price = [];
    params.data.volume = [];
    refreshChart();
    store.dispatch("tradingDerivative/getChartData", {
        date: state.chartDate,
        isDay,
    });
}
function resetTools() {
    store.dispatch("tradingDerivative/getTools");
}
function initToolsParams(tools) {
    if (tools == undefined)
        tools = ["order", "lines", "rr", "target", "tr", "pattern", "auto"];
    if (tools.includes("order"))
        params.tools.order = { side: 0, entry: {}, tp: {}, sl: {} };
    if (tools.includes("lines")) params.tools.lines = [];
    if (tools.includes("rr")) params.tools.rr = { EP: {}, SL: {}, TP: {} };
    if (tools.includes("target"))
        params.tools.target = { A: {}, B: {}, X: {}, Y: {}, Z: {} };
    if (tools.includes("tr")) params.tools.timeRange = [];
    if (tools.includes("pattern"))
        params.tools.pattern = {
            A: {},
            B: {},
            C: {},
            D: {},
            X: {},
            Y: {},
            Z: {},
        };
    if (tools.includes("auto")) params.tools.auto = {};
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
function getTimeIndex(time) {
    return params.data.whitespace.findIndex((item) => item.time == time);
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

            .popup {
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
