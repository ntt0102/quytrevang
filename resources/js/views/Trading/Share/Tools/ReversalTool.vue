<template>
    <div
        ref="reversalToolRef"
        class="command"
        :title="$t('trading.share.tools.reversal')"
        @click="reversalToolClick"
        @contextmenu="reversalToolContextmenu"
    >
        <i class="far fa-arrow-trend-down"></i>
    </div>
</template>
<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["symbol", "priceSeries"]);
const emit = defineEmits(["indexUpdated", "hideContext"]);
const reversalToolRef = ref(null);
const toolStore = computed(() => store.state.tradingShare.tools.reversal);
const indexSymbol = computed(() => store.state.tradingShare.config.index);
const whitespace = computed(() => store.state.tradingShare.config.whitespace);
const TOOL_NAME = "reversal";
const TOOL_COLOR = "rgba(156, 39, 176, 0.7)";
let series = {};
let times = [];
let reversal = null;
let lineOption = {
    lineType: TOOL_NAME,
    color: TOOL_COLOR,
    title: "R",
    lineWidth: 1,
    lineStyle: 1,
    draggable: true,
};
let priceLine = null;

defineExpose({
    createSeries,
    isSelected,
    draw,
    remove,
});

watch(toolStore, (data) => {
    if (data) load(data[0]);
});

function isSelected() {
    return reversalToolRef.value.classList.contains("selected");
}
function createSeries(chart) {
    if (!chart) return false;
    series = chart.addHistogramSeries({
        priceScaleId: TOOL_NAME,
        color: TOOL_COLOR,
        scaleMargins: { top: 0, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
    });
}
function reversalToolClick(e) {
    emit("hideContext");
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        removeReversalTool();
        if (props.symbol === indexSymbol.value) emit("indexUpdated");
        e.target.classList.add("selected");
    }
}
function reversalToolContextmenu(e) {
    removeReversalTool();
    if (props.symbol === indexSymbol.value) emit("indexUpdated");
    e.target.classList.remove("selected");
}
function draw({ prices, time }) {
    times.push({ time, value: 1 });
    if (times.length === 2) {
        reversal = scan(prices, times[0].time, times[1].time);
        loadReversalTool(reversal);
        store.dispatch("tradingShare/drawTools", {
            isRemove: false,
            symbol: props.symbol,
            name: TOOL_NAME,
            points: [0],
            data: [reversal],
        });
        if (props.symbol === indexSymbol.value) emit("indexUpdated", reversal);
        times = [];
        reversalToolRef.value.classList.remove("selected");
    } else series.setData(times);
}
function scan(prices, startTime, endTime) {
    let B, bTime, pr, ir;
    const data = prices.filter(
        (item) => item.time >= startTime && item.time <= endTime
    );
    for (let i = 0; i < data.length; i++) {
        const t = data[i].time;
        const h = data[i].high;
        const l = data[i].low;
        const pH = { i, p: h };
        const pL = { i, p: l };
        if (i === 0) {
            B = { H: pH, L: pH };
            pr = 0;
            ir = 0;
            bTime = t;
        } else {
            if (h > B.H.p) B.H = pH;
            else B.H.i = i;
            if (l < B.L.p) {
                bTime = t;
                const _pr = B.H.p - B.L.p;
                const _ir = B.H.i - B.L.i;
                if (_pr > pr) pr = _pr;
                if (_ir > ir) ir = _ir;
                B = { H: pL, L: pL };
            }
        }
    }
    const _prices = [...prices, ...whitespace.value];
    const bIndex = _prices.findIndex((item) => item.time === bTime);
    const time = _prices[bIndex + ir].time;
    const price = B.L.p + pr;
    return { time, price };
}
function load(data) {
    removeReversalTool(false);
    loadReversalTool(data);
}
function loadReversalTool(reversal) {
    series.setData([{ time: reversal.time, value: 1 }]);
    lineOption.price = reversal.price;
    priceLine = props.priceSeries.createPriceLine(lineOption);
}
function remove() {
    removeReversalTool(false);
}
function removeReversalTool(withServer = true) {
    if (withServer) {
        store.dispatch("tradingShare/drawTools", {
            isRemove: true,
            symbol: props.symbol,
            name: TOOL_NAME,
        });
    }
    reversal = {};
    series.setData([]);
    if (priceLine) {
        props.priceSeries.removePriceLine(priceLine);
        priceLine = null;
    }
}
</script>
