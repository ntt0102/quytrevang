<template>
    <div class="content-block dx-card responsive-paddings">
        <DxToolbar
            :items="[
                {
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-poll small',
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
            ]"
        />
        <div
            class="order-chart-container"
            ref="chartContainerRef"
            @click="eventChartClick"
            @contextmenu="eventChartContextmenu"
        >
            <div class="chart-wrapper" ref="orderChartRef">
                <div class="area data-area" @click="toolAreaClick">
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
                    <div
                        ref="reloadToolRef"
                        class="command"
                        :title="$t('trading.orderChart.reload')"
                        @click="resetChart"
                        @contextmenu="resetTools"
                    >
                        <i
                            :class="`far fa-sync-alt ${
                                $store.state.tradingOrder.isChartLoading
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
                        ref="lineToolRef"
                        class="line command far fa-horizontal-rule"
                        :title="$t('trading.orderChart.lineTool')"
                        @click="lineToolClick"
                        @contextmenu="lineToolContextmenu"
                    >
                        <LineContextMenu
                            v-show="state.showLineContext"
                            class="line-contextmenu"
                            :enable="state.showLineContext"
                            v-model:title="state.lineTitle"
                            v-model:color="state.lineColor"
                            @deleteAllLine="removeLineTool"
                        ></LineContextMenu>
                    </div>
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
                        ref="targetToolRef"
                        class="command far fa-flag-checkered"
                        :title="$t('trading.orderChart.targetTool')"
                        @click="targetToolClick"
                        @contextmenu="targetToolContextmenu"
                    ></div>
                    <div
                        ref="rrToolRef"
                        class="command far fa-line-height"
                        :title="$t('trading.orderChart.rrTool')"
                        @click="rrToolClick"
                        @contextmenu="rrToolContextmenu"
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
</template>

<script setup>
import LineContextMenu from "./LineContextMenu.vue";
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
import {
    bufferEncode,
    bufferDecode,
    bufferWrite,
    bufferParse,
} from "../../../plugins/fireant";

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
    START: moment(CURRENT_DATE + "T08:45:00").unix(),
    ATO: moment(CURRENT_DATE + "T09:00:00").unix(),
    ATC: moment(CURRENT_DATE + "T14:30:00").unix(),
    END: moment(CURRENT_DATE + "T14:45:00").unix(),
};
const SOCKET_ENDPOINT =
    "wss://datafeed.vps.com.vn/socket.io/?EIO=3&transport=websocket";
const FIREANT_SOCKET_ENDPOINT =
    "wss://tradestation.fireant.vn/quote?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxODg5NjIyNTMwLCJuYmYiOjE1ODk2MjI1MzAsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsiYWNhZGVteS1yZWFkIiwiYWNhZGVteS13cml0ZSIsImFjY291bnRzLXJlYWQiLCJhY2NvdW50cy13cml0ZSIsImJsb2ctcmVhZCIsImNvbXBhbmllcy1yZWFkIiwiZmluYW5jZS1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImludmVzdG9wZWRpYS1yZWFkIiwib3JkZXJzLXJlYWQiLCJvcmRlcnMtd3JpdGUiLCJwb3N0cy1yZWFkIiwicG9zdHMtd3JpdGUiLCJzZWFyY2giLCJzeW1ib2xzLXJlYWQiLCJ1c2VyLWRhdGEtcmVhZCIsInVzZXItZGF0YS13cml0ZSIsInVzZXJzLXJlYWQiXSwianRpIjoiMjYxYTZhYWQ2MTQ5Njk1ZmJiYzcwODM5MjM0Njc1NWQifQ.dA5-HVzWv-BRfEiAd24uNBiBxASO-PAyWeWESovZm_hj4aXMAZA1-bWNZeXt88dqogo18AwpDQ-h6gefLPdZSFrG5umC1dVWaeYvUnGm62g4XS29fj6p01dhKNNqrsu5KrhnhdnKYVv9VdmbmqDfWR8wDgglk5cJFqalzq6dJWJInFQEPmUs9BW_Zs8tQDn-i5r4tYq2U8vCdqptXoM7YgPllXaPVDeccC9QNu2Xlp9WUvoROzoQXg25lFub1IYkTrM66gJ6t9fJRZToewCt495WNEOQFa_rwLCZ1QwzvL0iYkONHS_jZ0BOhBCdW9dWSawD6iF1SIQaFROvMDH1rg";
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
const fullscreenToolRef = ref(null);
const tradingviewChartRef = ref(null);
const reloadToolRef = ref(null);
const tradingviewRef = ref(null);
const lineToolRef = ref(null);
const uplpsToolRef = ref(null);
const downlpsToolRef = ref(null);
const targetToolRef = ref(null);
const rrToolRef = ref(null);
const cancelOrderRef = ref(null);
const entryOrderRef = ref(null);
const tpslOrderRef = ref(null);
let params = {
    chart: {},
    series: {},
    data: {
        whitespace: [],
        price: [],
        vn30: [],
        foreign: [],
        active: [],
        volume: [],
    },
    tools: {
        order: { side: 0, entry: {}, tp: {}, sl: {} },
        lines: [],
        target: { A: {}, B: {}, X: {}, Y: {}, Z: {} },
        uplps: { P1: {}, P2: {} },
        downlps: { P1: {}, P2: {} },
        rr: { EP: {}, SL: {}, TP: {} },
    },
    crosshair: {},
    loadWhitespace: true,
    interval: null,
    interval60: null,
    websocket: null,
    isAutoOrdering: false,
    socketStop: false,
    socketRefreshTime: moment(),
    socketSendData: null,
};
const state = reactive({
    chartDate: route.query.date ?? CURRENT_DATE,
    clock: moment().format("HH:mm:ss"),
    isFullscreen: false,
    lineColor: "#F44336",
    lineTitle: "",
    showLineContext: false,
    showTradingView: false,
});
const status = computed(() => store.state.tradingOrder.status);
const tradingViewSrc = computed(() => {
    return `https://chart.vps.com.vn/tv/?loadLastChart=true&symbol=VN30F1M&u=${store.state.tradingOrder.config.vpsUser}&s=${store.state.tradingOrder.config.vpsSession}&resolution=1`;
});

store.dispatch("tradingOrder/initChart").then(() => {
    const CURRENT_SEC = moment().unix();
    // if (
    //     store.state.tradingOrder.config.openingMarket &&
    //     CURRENT_SEC >= TIME.START &&
    //     CURRENT_SEC <= TIME.END
    // )
    connectSocket();
});
store.dispatch("tradingOrder/getStatus");

params.interval = setInterval(intervalHandler, 1000);
params.interval60 = setInterval(
    () => store.dispatch("tradingOrder/getStatus"),
    60000
);

onMounted(() => {
    params.chart = createChart(orderChartRef.value, CHART_OPTIONS);
    params.chart.subscribeCrosshairMove(eventChartCrosshairMove);
    params.chart.subscribeCustomPriceLineDragged(eventPriceLineDrag);
    params.series.whitespace = params.chart.addLineSeries({
        priceScaleId: "whitespace",
        visible: false,
    });
    params.series.active = params.chart.addLineSeries({
        priceScaleId: "active",
        scaleMargins: { top: 0.61, bottom: 0.01 },
        color: "blue",
        lastValueVisible: false,
    });
    params.series.foreign = params.chart.addLineSeries({
        priceScaleId: "foreign",
        scaleMargins: { top: 0.61, bottom: 0.01 },
        color: "purple",
        lastValueVisible: false,
    });
    params.series.vn30 = params.chart.addLineSeries({
        color: "red",
        priceFormat: { minMove: 0.1 },
    });
    params.series.volume = params.chart.addLineSeries({
        priceScaleId: "volume",
        scaleMargins: { top: 0.61, bottom: 0.01 },
        color: "yellow",
        lastValueVisible: false,
    });
    params.series.price = params.chart.addLineSeries({
        color: "white",
        priceFormat: { minMove: 0.1 },
    });
    new ResizeObserver(eventChartResize).observe(chartContainerRef.value);
    document.addEventListener("keydown", eventKeyPress);
    document.addEventListener("fullscreenchange", eventFullscreenChange);
    store
        .dispatch("tradingOrder/getChartData", state.chartDate)
        .then(loadToolsData);
});
onUnmounted(() => {
    document.removeEventListener("keydown", eventKeyPress);
    document.removeEventListener("fullscreenchange", eventFullscreenChange);
    clearInterval(params.interval);
    clearInterval(params.interval60);
    params.socketStop = true;
    params.websocket.close();
    params.websocket = null;
});

watch(
    () => store.state.tradingOrder.chartData,
    () => {
        if (
            state.chartDate != CURRENT_DATE ||
            !store.state.tradingOrder.config.openingMarket ||
            moment().unix() > TIME.END
        )
            loadChartData();
    }
);

function eventChartClick(e) {
    state.showLineContext = false;
    hideOrderButton();
    if (lineToolRef.value.classList.contains("selected")) drawLineTool();
    else if (targetToolRef.value.classList.contains("selected"))
        drawTargetTool();
    else if (uplpsToolRef.value.classList.contains("selected")) drawUplpsTool();
    else if (downlpsToolRef.value.classList.contains("selected"))
        drawDownlpsTool();
    else if (rrToolRef.value.classList.contains("selected")) drawRrTool();
}
function eventChartContextmenu(e) {
    showOrderButton();
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
                            .dispatch("tradingOrder/executeOrder", {
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
                    params.tools.order[lineOptions.kind].price = newPrice;
                    if (lineOptions.kind == "tp")
                        store
                            .dispatch("tradingOrder/executeOrder", {
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
                                slData: {
                                    cmd: "change",
                                    price: params.tools.order.sl.price,
                                },
                            })
                            .then((resp) => {
                                if (resp.isOk) {
                                    drawOrderLine([lineOptions.kind]);
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
            store.dispatch("tradingOrder/drawTools", {
                isRemove: false,
                name: lineOptions.lineType,
                points: [oldPrice],
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
                let point;
                const a = +params.tools.target.A.options().price;
                const b = +params.tools.target.B.options().price;
                const ba = b - a;
                //
                if (lineOptions.point == "A") {
                    point = "A";
                    param.points.push(point);
                    param.data.push(params.tools.target[point].options());
                }
                //
                point = "B";
                params.tools.target[point].applyOptions({
                    title: ba.toFixed(1),
                });
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                point = "X";
                params.tools.target[point].applyOptions({
                    price: +(a - 0.5 * ba).toFixed(1),
                    title: (-0.5 * ba).toFixed(1),
                });
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                point = "Y";
                params.tools.target[point].applyOptions({
                    price: +(a - ba).toFixed(1),
                    title: (-ba).toFixed(1),
                });
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                point = "Z";
                params.tools.target[point].applyOptions({
                    price: +(a - 2 * ba).toFixed(1),
                    title: (-2 * ba).toFixed(1),
                });
                param.points.push(point);
                param.data.push(params.tools.target[point].options());
                //
                store.dispatch("tradingOrder/drawTools", param);
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
                //
                store.dispatch("tradingOrder/drawTools", param);
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
    const tools = store.state.tradingOrder.tools;
    for (const [name, points] of Object.entries(tools)) {
        switch (name) {
            case "order":
                if (status.value.pending) {
                    Object.entries(points).forEach(([point, line]) => {
                        params.tools.order.side = line.side;
                        params.tools.order[point].price = line.price;
                        params.tools.order[point].line =
                            params.series.price.createPriceLine(line);
                        toggleCancelOrderButton(true);
                    });
                }
                break;
            case "line":
                Object.values(points).forEach((line) =>
                    params.tools.lines.push(
                        params.series.price.createPriceLine(line)
                    )
                );
                break;
            case "target":
                Object.entries(points).forEach(
                    ([point, line]) =>
                        (params.tools.target[point] =
                            params.series.price.createPriceLine(line))
                );
                break;
            case "rr":
                Object.entries(points).forEach(
                    ([point, line]) =>
                        (params.tools.rr[point] =
                            params.series.price.createPriceLine(line))
                );
                break;
            default:
                if (name.includes("uplps")) {
                    Object.entries(points).forEach(
                        ([point, line]) =>
                            (params.tools.uplps[point] =
                                params.series.price.createPriceLine(line))
                    );
                } else if (name.includes("downlps")) {
                    Object.entries(points).forEach(
                        ([point, line]) =>
                            (params.tools.downlps[point] =
                                params.series.price.createPriceLine(line))
                    );
                }
                break;
        }
    }
}
function loadChartData() {
    if (params.loadWhitespace) {
        if (store.state.tradingOrder.chartData.price.length > 0)
            params.data.whitespace = mergeChartData(
                params.data.whitespace,
                createWhitespaceData(state.chartDate)
            );
        params.series.whitespace.setData(params.data.whitespace);
        params.loadWhitespace = false;
    }

    params.data.price = mergeChartData(
        params.data.price,
        store.state.tradingOrder.chartData.price
    );
    params.series.price.setData(params.data.price);
    params.data.volume = mergeChartData(
        params.data.volume,
        store.state.tradingOrder.chartData.volume
    );
    params.series.volume.setData(params.data.volume);
    // params.data.vn30 = mergeChartData(
    //     store.state.tradingOrder.chartData.vn30,
    //     params.data.vn30
    // );
    // params.series.vn30.setData(params.data.vn30);
    // params.data.foreign = mergeChartData(
    //     store.state.tradingOrder.chartData.foreign,
    //     params.data.foreign
    // );
    // params.series.foreign.setData(params.data.foreign);
    // params.data.active = mergeChartData(
    //     store.state.tradingOrder.chartData.active,
    //     params.data.active
    // );
    // params.series.active.setData(params.data.active);
}
function updateChartData(data) {
    let prices = [],
        volumes = [],
        lastVolume =
            params.data.volume.length > 0
                ? params.data.volume.slice(-1)[0].value
                : 0;
    data.forEach((item) => {
        const time = moment(item[1].toString() + "Z").unix();
        prices.push({ time, value: +item[2].toFixed(1) });
        lastVolume += (item[4] == "B" ? 1 : item[4] == "S" ? -1 : 0) * item[3];
        volumes.push({ time, value: lastVolume });
    });
    params.data.price = mergeChartData(params.data.price, prices);
    params.series.price.setData(params.data.price);
    params.data.volume = mergeChartData(params.data.volume, volumes);
    params.series.volume.setData(params.data.volume);
}
function updatePriceData(price) {
    const prevLength = params.data.price.length;
    params.data.price = mergeChartData(params.data.price, [price]);
    if (params.data.price.length > prevLength) {
        params.series.price.update(price);
    }
}
function updateVn30Data(price) {
    const prevLength = params.data.vn30.length;
    params.data.vn30 = mergeChartData(params.data.vn30, [price]);
    if (params.data.vn30.length > prevLength) {
        params.series.vn30.update(price);
    }
}
function createWhitespaceData(date) {
    const amStart = moment(`${date}T09:00:00Z`).unix();
    const amEnd = moment(`${date}T11:30:00Z`).unix();
    const pmStart = moment(`${date}T13:00:00Z`).unix();
    const pmEnd = moment(`${date}T14:30:00Z`).unix();
    let data = [];
    for (let sec = amStart; sec <= pmEnd; sec++) {
        if (sec > amEnd && sec < pmStart) continue;
        data.push({ time: sec });
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
// function connectSocket() {
//     params.websocket = new WebSocket(SOCKET_ENDPOINT);
//     params.websocket.onopen = (e) => {
//         let msg = {
//             action: "join",
//             list: store.state.tradingOrder.config.vn30f1m,
//         };
//         params.websocket.send(
//             `42${JSON.stringify(["regs", JSON.stringify(msg)])}`
//         );
//     };
//     params.websocket.onclose = (e) => {
//         if (params.socketStop) return false;
//         if (inSession()) {
//             blinkSocketStatus(true);
//             connectSocket();
//             if (
//                 moment().diff(params.socketRefreshTime, "seconds") >
//                 SOCKET_REFRESH_PERIOD
//             )
//                 refreshChart();
//         }
//     };
//     params.websocket.onmessage = (e) => {
//         blinkSocketStatus(false);
//         if (e.data.substr(0, 1) == 4) {
//             if (e.data.substr(1, 1) == 2) {
//                 const event = JSON.parse(e.data.substr(2));
//                 if (event[0] == "stockps") {
//                     const data = event[1].data;
//                     if (data.id == 3220) {
//                         if (params.data.price.length > 0) {
//                             updatePriceData({
//                                 time: moment(
//                                     `${CURRENT_DATE}T${data.time}Z`
//                                 ).unix(),
//                                 value: data.lastPrice,
//                             });
//                         }
//                         scanOrder();
//                     }
//                 }
//                 // else if (event[0] == "index") {
//                 //     const data = event[1].data;
//                 //     if (data.id == 1101 && data.mc == "11") {
//                 //         if (params.data.vn30.length > 0) {
//                 //             updateVn30Data({
//                 //                 time: moment(
//                 //                     `${CURRENT_DATE}T${data.time}Z`
//                 //                 ).unix(),
//                 //                 value: data.cIndex,
//                 //             });
//                 //         }
//                 //     }
//                 // }
//             }
//         }
//     };
// }
function connectSocket() {
    params.websocket = new WebSocket(FIREANT_SOCKET_ENDPOINT);
    params.websocket.onopen = (e) => {
        let data = '{"protocol":"messagepack","version":1}';
        params.websocket.send(data);
        data = [1, {}, "UpdateTrades_VN30F1M", "SubscribeTrades", ["VN30F1M"]];
        const encoded = bufferEncode(data);
        params.socketSendData = bufferWrite(encoded.slice());
        params.websocket.send(params.socketSendData);
    };
    params.websocket.onclose = (e) => {
        console.log("websocket-close");
        if (!params.socketStop && inSession()) connectSocket();
    };
    params.websocket.onmessage = (e) => {
        blinkSocketStatus(false);
        const reader = new FileReader();
        reader.onload = function (evt) {
            const arrayBuffer = evt.target.result;
            const parsedMessages = bufferParse(arrayBuffer);
            parsedMessages.forEach((e) => {
                const r = bufferDecode(e);
                if (r[2] == "UpdateTrades_VN30F1M") {
                    if (!params.data.price.length) {
                        params.data.whitespace = mergeChartData(
                            params.data.whitespace,
                            createWhitespaceData(CURRENT_DATE)
                        );
                        params.series.whitespace.setData(
                            params.data.whitespace
                        );
                    }
                    updateChartData(r[4]);
                } else if (r[3] == "UpdateTrades" && r[4][0] == "VN30F1M") {
                    scanOrder(+r[4][1].slice(-1)[0][2].toFixed(1));
                    updateChartData(r[4][1]);
                }
            });
        };
        reader.readAsArrayBuffer(e.data);
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
                    params.tools.order.tp.hasOwnProperty("line")
                ) {
                    store
                        .dispatch("tradingOrder/executeOrder", {
                            action: "cancel",
                            tpData: { cmd: "cancel" },
                            slData: { cmd: "delete" },
                        })
                        .then((resp) => {
                            if (resp.isOk) {
                                removeOrderLine(["entry", "tp", "sl"]);
                                toggleCancelOrderButton(false);
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
        if (
            store.state.tradingOrder.config.openingMarket &&
            CURRENT_SEC == TIME.START
        )
            connectSocket();
    }
    state.clock = moment().format("HH:mm:ss");
    // if (
    //     moment().diff(params.socketRefreshTime, "seconds") >
    //     SOCKET_REFRESH_PERIOD
    // )
    //     refreshChart();
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
        if (params.tools.order[kind].hasOwnProperty("line")) {
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
    store.dispatch("tradingOrder/drawTools", param);
}
function removeOrderLine(kinds) {
    kinds.forEach((kind) => {
        if (params.tools.order[kind].hasOwnProperty("line")) {
            params.series.price.removePriceLine(params.tools.order[kind].line);
            delete params.tools.order[kind].line;
        }
    });
    store.dispatch("tradingOrder/drawTools", {
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
            store.dispatch("tradingOrder/drawTools", {
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
        store.dispatch("tradingOrder/drawTools", {
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
        params.tools.lines = [];
        if (withServer)
            store.dispatch("tradingOrder/drawTools", {
                isRemove: true,
                name: "line",
            });
    }
}
function uplpsToolClick(e) {
    state.showLineContext = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
}
function uplpsToolContextmenu(e) {
    removeUplpsTool();
    e.target.classList.remove("selected");
}
function drawUplpsTool() {
    let startTime, endTime;
    const name = "price";
    const char = "P";
    if (mf.isSet(params.tools.uplps[`${char}1`])) {
        startTime = +params.tools.uplps[`${char}1`].options().startTime;
        endTime = params.crosshair.time;
        removeUplpsTool();
    } else startTime = params.crosshair.time;
    const { value1, value2 } = findUplps(startTime, endTime);
    let option = {
        lineWidth: 1,
        lineStyle: 1,
        color: "#009688",
        draggable: false,
    };
    let param = {
        isRemove: false,
        name: `${name}uplps`,
        points: [],
        data: [],
    };
    option.startTime = startTime;
    option.price = value1;
    option.title = `${char}1`;
    params.tools.uplps[option.title] =
        params.series[name].createPriceLine(option);
    param.points.push(option.title);
    param.data.push(mf.cloneDeep(option));
    //
    option.price = value2;
    option.title = `${char}2`;
    params.tools.uplps[option.title] =
        params.series[name].createPriceLine(option);
    param.points.push(option.title);
    param.data.push(mf.cloneDeep(option));

    store.dispatch("tradingOrder/drawTools", param);
    uplpsToolRef.value.classList.remove("selected");
}
function findUplps(startTime, endTime) {
    let v1,
        v2,
        v3,
        d = 0,
        dMax = 0;
    const data = params.data.price;
    for (let i = 0; i < data.length; i++) {
        const time = data[i].time;
        if (time < startTime) continue;
        if (!!endTime && time > endTime) break;
        const value = data[i].value;
        if (v1 == undefined) {
            v1 = value;
            v2 = value;
            v3 = value;
        }
        if (value > v3) {
            if (d > dMax) {
                v2 = v3;
                dMax = d;
            }
            v3 = value;
            d = 0;
        } else if (value < v3) {
            const _d = +(v3 - value).toFixed(2);
            if (_d > d) d = _d;
        }
        if (value < v1 && dMax > 0) break;
    }
    return {
        value1: +(v2 - dMax).toFixed(2),
        value2: +(v3 - dMax).toFixed(2),
    };
}
function removeUplpsTool(withServer = true) {
    const name = "price";
    const char = "P";
    const point1 = `${char}1`;
    const point2 = `${char}2`;
    if (mf.isSet(params.tools.uplps[point1])) {
        params.series[name].removePriceLine(params.tools.uplps[point1]);
        params.series[name].removePriceLine(params.tools.uplps[point2]);
    }
    params.tools.uplps[point1] = {};
    params.tools.uplps[point2] = {};
    if (withServer)
        store.dispatch("tradingOrder/drawTools", {
            isRemove: true,
            name: `${name}uplps`,
        });
}
function downlpsToolClick(e) {
    state.showLineContext = false;
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
}
function downlpsToolContextmenu(e) {
    removeDownlpsTool();
    e.target.classList.remove("selected");
}
function drawDownlpsTool() {
    let startTime, endTime;
    const name = "price";
    const char = "P";
    if (mf.isSet(params.tools.downlps[`${char}1`])) {
        startTime = +params.tools.downlps[`${char}1`].options().startTime;
        endTime = params.crosshair.time;
        removeDownlpsTool();
    } else startTime = params.crosshair.time;
    const { value1, value2 } = findDownlps(startTime, endTime);
    let option = {
        lineWidth: 1,
        lineStyle: 1,
        color: "#E91E63",
        draggable: false,
    };
    let param = {
        isRemove: false,
        name: `${name}downlps`,
        points: [],
        data: [],
    };
    option.startTime = startTime;
    option.price = value1;
    option.title = `${char}1`;
    params.tools.downlps[option.title] =
        params.series[name].createPriceLine(option);
    param.points.push(option.title);
    param.data.push(mf.cloneDeep(option));
    //
    option.price = value2;
    option.title = `${char}2`;
    params.tools.downlps[option.title] =
        params.series[name].createPriceLine(option);
    param.points.push(option.title);
    param.data.push(mf.cloneDeep(option));

    store.dispatch("tradingOrder/drawTools", param);
    downlpsToolRef.value.classList.remove("selected");
}
function findDownlps(startTime, endTime) {
    let v1,
        v2,
        v3,
        d = 0,
        dMax = 0;
    const data = params.data.price;
    for (let i = 0; i < data.length; i++) {
        const time = data[i].time;
        if (time < startTime) continue;
        if (!!endTime && time > endTime) break;
        const value = data[i].value;
        if (v1 == undefined) {
            v1 = value;
            v2 = value;
            v3 = value;
        }
        if (value < v3) {
            if (d < dMax) {
                v2 = v3;
                dMax = d;
            }
            v3 = value;
            d = 0;
        } else if (value > v3) {
            const _d = +(v3 - value).toFixed(2);
            if (_d < d) d = _d;
        }
        if (value > v1 && dMax < 0) break;
    }
    return {
        value1: +(v2 - dMax).toFixed(2),
        value2: +(v3 - dMax).toFixed(2),
    };
}
function removeDownlpsTool(withServer = true) {
    const name = "price";
    const char = "P";
    const point1 = `${char}1`;
    const point2 = `${char}2`;
    if (mf.isSet(params.tools.downlps[point1])) {
        params.series[name].removePriceLine(params.tools.downlps[point1]);
        params.series[name].removePriceLine(params.tools.downlps[point2]);
    }
    params.tools.downlps[point1] = {};
    params.tools.downlps[point2] = {};
    if (withServer)
        store.dispatch("tradingOrder/drawTools", {
            isRemove: true,
            name: `${name}downlps`,
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
        option.color = "#FF9800";
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
        option.color = "#673AB7";
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
    store.dispatch("tradingOrder/drawTools", param);
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
        params.tools.target = { A: {}, B: {}, X: {}, Y: {}, Z: {} };
    }
    if (withServer)
        store.dispatch("tradingOrder/drawTools", {
            isRemove: true,
            name: "target",
        });
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
            const rTp = price - epPrice;
            if (rTp / rSl > 0) return false;
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
    store.dispatch("tradingOrder/drawTools", param);
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
    params.tools.rr = { EP: {}, SL: {}, TP: {} };
    if (withServer)
        store.dispatch("tradingOrder/drawTools", {
            isRemove: true,
            name: "rr",
        });
}
function showOrderButton() {
    if (store.state.tradingOrder.config.openingMarket) {
        const CURRENT_SEC = moment().unix();
        if (inSession(CURRENT_SEC)) {
            if (!params.tools.order.tp.hasOwnProperty("line")) {
                if (!!status.value.position) {
                    if (
                        true ||
                        (CURRENT_SEC > TIME.ATO && CURRENT_SEC < TIME.ATC)
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
            if (!params.tools.order.entry.hasOwnProperty("line")) {
                let price = null,
                    side = 0;
                if (!status.value.position) {
                    if (
                        true ||
                        (CURRENT_SEC > TIME.ATO && CURRENT_SEC < TIME.ATC)
                    ) {
                        price = coordinateToPrice(params.crosshair.y);
                        side =
                            price >= params.data.price.slice(-1)[0].value
                                ? 1
                                : -1;
                        params.tools.order.side = side;
                        params.tools.order.entry.price = price;
                    }
                } else {
                    if (CURRENT_SEC < TIME.ATO) price = "ATO";
                    else if (CURRENT_SEC > TIME.ATC) price = "ATC";
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
    }
}
function hideOrderButton() {
    entryOrderRef.value.style.display = "none";
    tpslOrderRef.value.style.display = "none";
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
                    etData: {
                        cmd: "new",
                        side: params.tools.order.side,
                        price: params.tools.order.entry.price,
                    },
                })
                .then((resp) => {
                    if (resp.isOk) {
                        drawOrderLine(["entry"]);
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
    params.tools.order.tp.price =
        params.tools.order.entry.price + params.tools.order.side * TP_DEFAULT;
    params.tools.order.sl.price =
        params.tools.order.entry.price - params.tools.order.side * SL_DEFAULT;
    store
        .dispatch("tradingOrder/executeOrder", {
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
                toast.success(t("trading.orderChart.newTpSlSuccess"));
            } else toastOrderError(resp.message);
        });
}
function cancelOrderClick() {
    if (params.tools.order.entry.hasOwnProperty("line")) {
        if (params.tools.order.tp.hasOwnProperty("line")) {
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
                        removeOrderLine(["entry", "tp", "sl"]);
                        toggleCancelOrderButton(false);
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
                    etData: { cmd: "delete" },
                })
                .then((resp) => {
                    if (resp.isOk) {
                        removeOrderLine(["entry"]);
                        toggleCancelOrderButton(false);
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
function scanOrder(lastPrice) {
    if (params.tools.order.entry.hasOwnProperty("line")) {
        if (params.tools.order.tp.hasOwnProperty("line")) {
            if (
                (params.tools.order.side > 0 &&
                    lastPrice >= params.tools.order.tp.price) ||
                (params.tools.order.side < 0 &&
                    lastPrice <= params.tools.order.tp.price)
            ) {
                if (!params.isAutoOrdering) {
                    params.isAutoOrdering = true;
                    store
                        .dispatch("tradingOrder/executeOrder", {
                            action: "sl",
                            slData: {
                                cmd: "delete",
                            },
                        })
                        .then((resp) => {
                            if (resp.isOk) {
                                removeOrderLine(["entry", "tp", "sl"]);
                                toggleCancelOrderButton(false);
                                toast.success(
                                    t("trading.orderChart.deleteTpSuccess")
                                );
                                hideOrderButton();
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
                        .dispatch("tradingOrder/executeOrder", {
                            action: "tp",
                            tpData: {
                                cmd: "cancel",
                            },
                        })
                        .then((resp) => {
                            if (resp.isOk) {
                                removeOrderLine(["entry", "tp", "sl"]);
                                toggleCancelOrderButton(false);
                                toast.success(
                                    t("trading.orderChart.deleteSlSuccess")
                                );
                                hideOrderButton();
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
                            .dispatch("tradingOrder/executeOrder", {
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
                                            "trading.orderChart.autoNewTpSlSuccess"
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
function inSession(currentSec = null) {
    if (!currentSec) currentSec = moment().unix();
    return currentSec >= TIME.START && currentSec <= TIME.END;
}
function coordinateToPrice(y) {
    return +params.series.price.coordinateToPrice(y).toFixed(1);
}
function toastOrderError(error) {
    if (!error) error = "unknown";
    toast.error(t(`trading.orderChart.${error}`));
}
function dateSelectChange() {
    if (!state.chartDate) return false;
    params.loadWhitespace = true;
    store.dispatch("tradingOrder/getChartData", state.chartDate);
}
function refreshChart() {
    params.socketRefreshTime = moment();
    params.loadWhitespace = true;
    // store.dispatch("tradingOrder/getChartData", state.chartDate);
    params.websocket.send(params.socketSendData);
}
function resetChart() {
    params.data.whitespace = [];
    params.data.price = [];
    params.data.volume = [];
    // params.data.vn30 = [];
    // params.data.foreign = [];
    // params.data.active = [];
    refreshChart();
}
function resetTools() {
    removeLineTool(false);
    removeUplpsTool(false);
    removeDownlpsTool(false);
    removeTargetTool(false);
    removeRrTool(false);
    store.dispatch("tradingOrder/getTools").then(loadToolsData);
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

            .line {
                position: relative;

                .line-contextmenu {
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
