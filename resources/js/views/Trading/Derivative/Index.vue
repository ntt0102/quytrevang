<template>
    <div class="content-block dx-card responsive-paddings">
        <DxToolbar
            :items="[
                {
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-poll small',
                        hint: $t('trading.derivative.buttons.report'),
                        onClick: report,
                    },
                },
                {
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-file-export small',
                        hint: $t('trading.derivative.buttons.export'),
                        onClick: exportCsv,
                    },
                },
                {
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-sign-in-alt small',
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
                        :class="`command far fa-${
                            status.connection ? 'link' : 'unlink'
                        }`"
                        :title="$t('trading.derivative.connection')"
                        @click="
                            () => $store.dispatch('tradingDerivative/getStatus')
                        "
                    ></div>
                    <div
                        class="command status"
                        :class="{
                            green: status.position > 0,
                            red: status.position < 0,
                            pending: status.pending,
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
                            :class="`far fa-sync-alt ${
                                $store.state.tradingDerivative.isChartLoading
                                    ? 'fa-spin'
                                    : ''
                            }`"
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
                        :class="`command far fa-${
                            state.isFullscreen ? 'compress' : 'expand'
                        }`"
                        :title="$t('trading.derivative.fullscreen')"
                        @click="toggleFullscreen"
                    ></div>
                    <div
                        ref="tradingviewRef"
                        class="command far fa-chart-bar"
                        :title="$t('trading.derivative.tradingview')"
                        @click="tradingviewClick"
                        @contextmenu="resetTools"
                    ></div>
                    <div
                        class="popup command far fa-tasks"
                        :title="$t('trading.derivative.progressTool')"
                        @click="progressToolClick"
                    >
                        <ProgressContextMenu
                            v-show="state.showProgressContext"
                            class="contextmenu"
                            v-model="state.progress"
                            @change="progressChange"
                        ></ProgressContextMenu>
                    </div>
                    <div
                        class="popup command far fa-heart-rate"
                        :title="$t('trading.derivative.patternTool')"
                        @click="patternToolClick"
                    >
                        <PatternContextMenu
                            v-show="state.showPatternContext"
                            class="contextmenu"
                        ></PatternContextMenu>
                    </div>
                    <div
                        ref="lineToolRef"
                        class="popup command far fa-horizontal-rule"
                        :title="$t('trading.derivative.lineTool')"
                        @click="lineToolClick"
                        @contextmenu="lineToolContextmenu"
                    >
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
                        ref="timeRangeToolRef"
                        class="command far fa-grip-lines-vertical"
                        :title="$t('trading.derivative.timeRangeTool')"
                        @click="timeRangeToolClick"
                        @contextmenu="timeRangeToolContextmenu"
                    ></div>
                    <div
                        ref="targetToolRef"
                        class="command far fa-windsock"
                        :title="$t('trading.derivative.targetTool')"
                        @click="targetToolClick"
                        @contextmenu="targetToolContextmenu"
                    ></div>
                    <div
                        ref="rrToolRef"
                        class="command far fa-line-height"
                        :title="$t('trading.derivative.rrTool')"
                        @click="rrToolClick"
                        @contextmenu="rrToolContextmenu"
                    ></div>
                    <div
                        v-show="showCancelOrder"
                        ref="cancelOrderRef"
                        class="cancel-order command far fa-trash-alt"
                        :title="$t('trading.derivative.cancelTool')"
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
    <VpsOtpPopup ref="vpsOtpPopupRef" />
</template>

<script setup>
import LineContextMenu from "./LineContextMenu.vue";
import PatternContextMenu from "./PatternContextMenu.vue";
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
const targetToolRef = ref(null);
const timeRangeToolRef = ref(null);
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
    lineColor: "#F44336",
    lineTitle: "",
    progress: [],
    showLineContext: false,
    showPatternContext: false,
    showProgressContext: false,
    showTradingView: false,
});
const status = computed(() => store.state.tradingDerivative.status);
const config = computed(() => store.state.tradingDerivative.config);
const showCancelOrder = computed(
    () =>
        status.value.position != 0 ||
        !!status.value.pending ||
        !!store.state.tradingDerivative.tools.order
);
const tradingViewSrc = computed(() => {
    return `https://chart.vps.com.vn/tv/?u=${config.value.vpsUser}&s=${config.value.vpsSession}&symbol=VN30F1M&resolution=1&lang=vi`;
});

store.dispatch("tradingDerivative/initChart").then(() => {
    if (inSession()) connectSocket();
});

params.interval = setInterval(intervalHandler, 1000);
params.interval60 = setInterval(() => {
    if (inSession()) store.dispatch("tradingDerivative/getStatus");
    else clearInterval(params.interval60);
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
        scaleMargins: { top: 0.61, bottom: 0.01 },
        color: "#FFD700",
        lastValueVisible: false,
    });
    params.series.price = params.chart.addLineSeries({
        color: "#F5F5F5",
        priceFormat: { minMove: 0.1 },
    });
    new ResizeObserver(eventChartResize).observe(chartContainerRef.value);
    document.addEventListener("keydown", eventKeyPress);
    document.addEventListener("fullscreenchange", eventFullscreenChange);
    store.dispatch("tradingDerivative/getChartData", { date: state.chartDate });
    setTimeout(() => store.dispatch("tradingDerivative/getTools"), 1000);
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
watch(() => store.state.tradingDerivative.tools, loadToolsData);

function eventChartClick(e) {
    state.showLineContext = false;
    state.showPatternContext = false;
    state.showProgressContext = false;
    toggleOrderButton(false);
    if (lineToolRef.value.classList.contains("selected")) drawLineTool();
    else if (targetToolRef.value.classList.contains("selected"))
        drawTargetTool();
    else if (timeRangeToolRef.value.classList.contains("selected"))
        drawTimeRangeTool();
    else if (rrToolRef.value.classList.contains("selected")) drawRrTool();
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
    lineOptions.price = +lineOptions.price.toFixed(1);
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
                const b = +params.tools.target.B.options().price;
                let ba = b - a;
                //
                point = "A";
                if (lineOptions.point == "Y") {
                    ba = +((b - newPrice) / 2).toFixed(1);
                    a = b - ba;
                    changeOptions = { price: a };
                    params.tools.target[point].applyOptions(changeOptions);
                }
                if (["A", "Y"].includes(lineOptions.point)) {
                    param.points.push(point);
                    param.data.push(params.tools.target[point].options());
                }
                //
                point = "B";
                changeOptions = { title: ba.toFixed(1) };
                params.tools.target[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                point = "X";
                changeOptions = {
                    price: +(a - 0.5 * ba).toFixed(1),
                    title: (-0.5 * ba).toFixed(1),
                };
                params.tools.target[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                point = "Y";
                changeOptions = { title: (-ba).toFixed(1) };
                if (lineOptions.point != "Y") {
                    changeOptions.price = +(a - ba).toFixed(1);
                }
                params.tools.target[point].applyOptions(changeOptions);
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                point = "Z";
                changeOptions = {
                    price: +(a - 2 * ba).toFixed(1),
                    title: (-2 * ba).toFixed(1),
                };
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
function loadToolsData(tools) {
    removeAllTools();
    for (const [name, points] of Object.entries(tools)) {
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
                params.tools.timeRange = Object.values(points);
                params.series.timeRange.setData(params.tools.timeRange);
                break;
            case "progress":
                state.progress = Object.values(points)[0];
                break;
            default:
                Object.entries(points).forEach(
                    ([point, line]) =>
                        (params.tools[name][point] =
                            params.series.price.createPriceLine(line))
                );
                break;
        }
    }
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
        console.log("websocket-close");
        if (!params.socketStop && inSession()) {
            blinkSocketStatus(true);
            connectSocket();
        }
    };
    params.websocket.onmessage = (e) => {
        blinkSocketStatus(false);
        const data = parseSocketMessage(e.data);
        data.forEach((item) => {
            if (!item) return false;
            if (item.type == 3) {
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
                blinkCancelOrderButton();
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
                title = Math.abs(
                    params.tools.order.tp.price - params.tools.order.entry.price
                ).toFixed(1);
                break;
            case "sl":
                color = "red";
                title = Math.abs(
                    params.tools.order.sl.price - params.tools.order.entry.price
                ).toFixed(1);
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
    kinds.forEach((kind) => {
        if (mf.isSet(params.tools.order[kind].line)) {
            params.series.price.removePriceLine(params.tools.order[kind].line);
            delete params.tools.order[kind].line;
        }
    });
    if (withServer)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: true,
            name: "order",
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
    state.showPatternContext = false;
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
        params.tools.lines.forEach((line) =>
            params.series.price.removePriceLine(line)
        );
        initToolsParams(["lines"]);
        if (withServer)
            store.dispatch("tradingDerivative/drawTools", {
                isRemove: true,
                name: "line",
            });
    }
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
    if (withServer)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: true,
            name: "rr",
        });
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
        option.title = ba.toFixed(1);
        option.color = "#F44336";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        param.points.push(option.point);
        param.data.push(mf.cloneDeep(option));
        //
        option.point = "X";
        option.price = +(a - 0.5 * ba).toFixed(1);
        option.title = (-0.5 * ba).toFixed(1);
        option.color = "#2196F3";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        param.points.push(option.point);
        param.data.push(mf.cloneDeep(option));
        //
        option.point = "Y";
        option.price = +(a - ba).toFixed(1);
        option.title = (-ba).toFixed(1);
        option.color = "#673AB7";
        params.tools.target[option.point] =
            params.series.price.createPriceLine(option);
        param.points.push(option.point);
        param.data.push(mf.cloneDeep(option));
        //
        option.point = "Z";
        option.price = +(a - 2 * ba).toFixed(1);
        option.title = (-2 * ba).toFixed(1);
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
    if (withServer)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: true,
            name: "target",
        });
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
    if (params.tools.timeRange.length > 0) {
        option.color = "red";
        params.tools.timeRange[1] = option;
        param.points.push(1);
        timeRangeToolRef.value.classList.remove("selected");
    } else {
        option.color = "lime";
        params.tools.timeRange[0] = option;
        param.points.push(0);
    }
    params.series.timeRange.setData(params.tools.timeRange);
    param.data.push(option);
    store.dispatch("tradingDerivative/drawTools", param);
}
function removeTimeRangeTool(withServer = true) {
    params.series.timeRange.setData([]);
    initToolsParams(["tr"]);
    if (withServer)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: true,
            name: "tr",
        });
}
function patternToolClick() {
    state.showPatternContext = !state.showPatternContext;
    state.showProgressContext = false;
    state.showLineContext = false;
}
function progressToolClick() {
    state.showProgressContext = !state.showProgressContext;
    state.showPatternContext = false;
    state.showLineContext = false;
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
    removeRrTool(false);
    removeTargetTool(false);
    removeTimeRangeTool(false);
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
    }
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
    return +params.series.price.coordinateToPrice(y).toFixed(1);
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
    if (tools == undefined) tools = ["order", "lines", "rr", "target", "tr"];
    if (tools.includes("order"))
        params.tools.order = { side: 0, entry: {}, tp: {}, sl: {} };
    if (tools.includes("lines")) params.tools.lines = [];
    if (tools.includes("rr")) params.tools.rr = { EP: {}, SL: {}, TP: {} };
    if (tools.includes("target"))
        params.tools.target = { A: {}, B: {}, X: {}, Y: {}, Z: {} };
    if (tools.includes("tr")) params.tools.timeRange = [];
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
function getTimeDistance(start, end) {
    let distance = Math.abs(start - end);
    if (distance > 5400) distance -= 5400;
    return distance;
}
function cmp(vari, value, side, eq = false) {
    if (side) {
        if (eq) return vari >= value;
        return vari > value;
    }
    if (eq) return vari <= value;
    return vari < value;
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
        }

        &.tool-area {
            top: 0px;
            left: 0px;
            flex-direction: column;

            .command:not(:first-child) {
                border-top: solid 2px #2a2e39 !important;
            }

            .warning {
                color: yellow !important;
            }

            .popup {
                position: relative;

                .contextmenu {
                    position: absolute;
                    top: 0px;
                    left: 42px;
                }
            }

            .pattern {
                position: relative;

                .contextmenu {
                    position: absolute;
                    top: -140px;
                    left: 42px;
                }
            }

            .progress {
                position: relative;

                .contextmenu {
                    position: absolute;
                    top: -170px;
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
            background: yellow;
        }
    }

    .chart-top {
        position: absolute;
        bottom: 29px;
        right: 55px;
        border-radius: 50%;
        border: 1px solid #2b2b43;
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
