<template>
    <CorePopup
        ref="popupRef"
        class="cashflow-popup"
        :title="$t('trading.orderChart.DailyCashFlowPopup.title')"
        :fullScreen="true"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxScrollView>
            <div
                class="cashflow-chart"
                style="height: calc(100vh - 64px)"
                ref="orderChartRef"
            >
                <input
                    type="text"
                    class="symbol-input"
                    :title="$t('trading.orderChart.DailyCashFlowPopup.symbol')"
                    v-model="state.symbol"
                    @change="symbolChange"
                    @focus="symbolFocus"
                />
            </div>
        </DxScrollView>
    </CorePopup>
</template>
<script setup>
import CorePopup from "../../../components/Popups/CorePopup.vue";
import { createChart } from "../../../plugins/lightweight-charts.esm.development";
import { ref, reactive } from "vue";
import { useStore } from "vuex";

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
        timeVisible: false,
        rightOffset: 20,
        minBarSpacing: 0.01,
    },
    watermark: {
        visible: true,
        fontSize: 50,
        horzAlign: "center",
        vertAlign: "center",
        color: "rgba(171, 71, 188, 0.2)",
    },
};

const store = useStore();
const popupRef = ref(null);
const orderChartRef = ref(null);
const state = reactive({
    symbol: "VN30F1M",
});
let params = {
    chart: {},
    series: { price: {}, avg: {}, cash: {} },
};

function show() {
    popupRef.value.show();
}
function symbolChange() {
    if (state.symbol == "") return false;
    state.symbol = state.symbol.toUpperCase();
    store.dispatch("tradingOrder/cashflow", state.symbol).then((data) => {
        params.series.price.setData(data.price);
        params.series.avg.setData(data.avg);
        params.series.cash.setData(data.cash);
        params.chart.applyOptions({ watermark: { text: state.symbol } });
    });
}
function symbolFocus(e) {
    e.target.select();
}
function onShown() {
    params.chart = createChart(orderChartRef.value, CHART_OPTIONS);
    store.dispatch("tradingOrder/cashflow", state.symbol).then((data) => {
        params.series.price = params.chart.addCandlestickSeries({
            upColor: "#26a69a",
            downColor: "#ef5350",
            borderVisible: false,
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350",
            priceFormat: { minMove: 0.1 },
        });
        params.series.price.setData(data.price);
        //
        params.series.avg = params.chart.addLineSeries({
            color: "#CCCCCC",
            priceFormat: { minMove: 0.1 },
            lastValueVisible: false,
            priceLineVisible: false,
        });
        params.series.avg.setData(data.avg);
        //
        params.series.cash = params.chart.addLineSeries({
            color: "#2962FF",
            priceScaleId: "cash",
            scaleMargins: { top: 0.61, bottom: 0.01 },
            lastValueVisible: false,
        });
        params.series.cash.setData(data.cash);
        //
        params.chart.timeScale().fitContent();
        params.chart.applyOptions({ watermark: { text: state.symbol } });
    });
}
function onHidden() {
    orderChartRef.value.removeChild(orderChartRef.value.lastChild);
}

defineExpose({ show });
</script>

<style lang="scss">
.cashflow-popup {
    .dx-popup-content {
        padding: 0 !important;
    }
    .cashflow-chart {
        position: relative;

        .symbol-input {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 70px;
            text-align: center;
            text-transform: uppercase;
            background: #131722;
            border: solid 2px #2a2e39;
            border-bottom-right-radius: 5px;
            color: #bbbbbb;
            z-index: 3;
        }
    }
}
</style>
