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
const props = defineProps(["symbol", "indexSeries", "stockSeries"]);
const emit = defineEmits(["hideContext"]);
const reversalToolRef = ref(null);
const stockStore = computed(() => store.state.tradingShare.tools.reversal);
const indexStore = computed(() => store.state.tradingShare.config.reversal);
const indexSymbol = computed(() => store.state.tradingShare.config.index);
const whitespace = computed(() => store.state.tradingShare.config.whitespace);
const TOOL_NAME = "reversal";
const colors = {
    index: "rgba(103, 58, 183, 0.6)",
    stock: "rgba(156, 39, 176, 0.6)",
};
let reversalSeries = {};
let drawTimes = [];
let lines = { index: null, stock: null };
let lineOption = {
    title: "R",
    lineWidth: 1,
    lineStyle: 0,
    draggable: false,
};

defineExpose({
    createSeries,
    isSelected,
    draw,
    remove,
    loadIndex,
});

watch(stockStore, (data) => {
    if (data) loadStock(data[0]);
});
watch(indexStore, (data) => {
    if (data) loadIndex(data);
});

function isSelected() {
    return reversalToolRef.value.classList.contains("selected");
}
function createSeries(chart) {
    if (!chart) return false;
    reversalSeries.stock = chart.addHistogramSeries({
        priceScaleId: TOOL_NAME + "Stock",
        color: colors.stock,
        scaleMargins: { top: 0, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
    });
    reversalSeries.index = chart.addHistogramSeries({
        priceScaleId: TOOL_NAME + "Index",
        color: colors.index,
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
        removeReversalStockTool();
        if (props.symbol === indexSymbol.value) removeReversalIndexTool();
        e.target.classList.add("selected");
    }
}
function reversalToolContextmenu(e) {
    removeReversalStockTool();
    if (props.symbol === indexSymbol.value) removeReversalIndexTool();
    e.target.classList.remove("selected");
}
function draw({ stock, time }) {
    drawTimes.push({ time, value: 1 });
    if (drawTimes.length === 2) {
        const reversal = scan(stock, drawTimes[0].time, drawTimes[1].time);
        loadReversalStockTool(reversal);
        store.dispatch("tradingShare/drawTools", {
            isRemove: false,
            symbol: props.symbol,
            name: TOOL_NAME,
            points: [0],
            data: [reversal],
        });
        if (props.symbol === indexSymbol.value) loadIndex(reversal);
        drawTimes = [];
        reversalToolRef.value.classList.remove("selected");
    } else reversalSeries.stock.setData(drawTimes);
}
function scan(stock, startTime, endTime) {
    let B, bTime, pr, ir;
    const data = stock.filter(
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
    const _prices = [...stock, ...whitespace.value];
    const bIndex = _prices.findIndex((item) => item.time === bTime);
    const time = _prices[bIndex + ir].time;
    const price = B.L.p + pr;
    return { time, price };
}
function loadStock(data) {
    removeReversalStockTool(false);
    loadReversalStockTool(data);
}
function loadReversalStockTool({ price, time }) {
    reversalSeries.stock.setData([{ time, value: 1 }]);
    lineOption.price = price;
    lineOption.color = colors.stock;
    lines.stock = props.stockSeries.createPriceLine(lineOption);
}
function loadIndex(data) {
    removeReversalIndexTool(false);
    loadReversalIndexTool(data);
}
function loadReversalIndexTool({ price, time }) {
    reversalSeries.index.setData([{ time, value: 1 }]);
    lineOption.price = price;
    lineOption.color = colors.index;
    lines.index = props.indexSeries.createPriceLine(lineOption);
}
function remove() {
    removeReversalStockTool(false);
}
function removeReversalStockTool(withServer = true) {
    if (withServer) {
        store.dispatch("tradingShare/drawTools", {
            isRemove: true,
            symbol: props.symbol,
            name: TOOL_NAME,
        });
    }
    reversalSeries.stock.setData([]);
    if (lines.stock) {
        props.stockSeries.removePriceLine(lines.stock);
        lines.stock = null;
    }
}
function removeReversalIndexTool() {
    reversalSeries.index.setData([]);
    if (lines.index) {
        props.indexSeries.removePriceLine(lines.index);
        lines.index = null;
    }
}
</script>
