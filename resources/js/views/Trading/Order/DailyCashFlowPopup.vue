<template>
    <CorePopup
        ref="popupRef"
        :title="$t('trading.orderChart.buttons.cashflow')"
        :fullScreen="true"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxScrollView>
            <div
                class="chart-wrapper"
                style="height: calc(100vh - 114px)"
                ref="orderChartRef"
            ></div>
        </DxScrollView>
    </CorePopup>
</template>
<script setup>
import CorePopup from "../../../components/Popups/CorePopup.vue";
import { createChart } from "../../../plugins/lightweight-charts.esm.development";
import { inject, ref, reactive, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

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
};

const store = useStore();
const { t } = useI18n();
const mf = inject("mf");
const popupRef = ref(null);
const orderChartRef = ref(null);
const state = reactive({
    gridData: null,
});
let params = {
    chart: {},
};

// onMounted(() => {

// });

watch(
    () => store.state.tradingOrder.copyists,
    (value) => {
        state.gridData = mf.cloneDeep(value);
    }
);

function show() {
    popupRef.value.show();
}
function onShown() {
    params.chart = createChart(orderChartRef.value, CHART_OPTIONS);
    store.dispatch("tradingOrder/cashflow").then((data) => {
        console.log("cashflow", data);
        const candlestickSeries = params.chart.addCandlestickSeries({
            upColor: "#26a69a",
            downColor: "#ef5350",
            borderVisible: false,
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350",
            priceFormat: { minMove: 0.1 },
        });

        candlestickSeries.setData(data.data.price);

        const lineSeries = params.chart.addLineSeries({
            color: "#2962FF",
            priceScaleId: "cash",
            scaleMargins: { top: 0.61, bottom: 0.01 },
            lastValueVisible: false,
        });

        lineSeries.setData(data.data.cash);

        params.chart.timeScale().fitContent();
    });
}
function onHidden() {
    state.gridData = null;
}

defineExpose({ show });
</script>
