<template>
    <div
        ref="pickTimeToolRef"
        class="command"
        :title="$t('trading.derivative.tools.pickTime')"
        @click="pickTimeToolClick"
        @contextmenu="pickTimeToolContextmenu"
    >
        <i class="far fa-pipe"></i>
    </div>
</template>
<script setup>
import { ref, inject, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
// const props = defineProps([]);
const emit = defineEmits(["refreshPattern", "hideContext"]);
const mc = inject("mc");
const pickTimeToolRef = ref(null);
const pickTimeStore = computed(
    () => store.state.tradingDerivative.tools.pickTime
);
let pickTime = null;
let series = {};

const symbol = "VN30F1M";

defineExpose({
    isSelected,
    createSeries,
    draw,
    remove: removePickTimeTool,
    get,
});

watch(pickTimeStore, (data) => {
    if (data) load(data[0]);
});

function isSelected() {
    return pickTimeToolRef.value.classList.contains("selected");
}
function createSeries(chart) {
    if (!chart) return false;
    series.pickTime = chart.addHistogramSeries({
        priceScaleId: "pickTime",
        scaleMargins: { top: 0, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
    });
}
function get() {
    return pickTime;
}
function pickTimeToolClick(e) {
    emit("hideContext");
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
}
function pickTimeToolContextmenu(e) {
    e.target.classList.remove("selected");
    removePickTimeTool();
    emit("refreshPattern");
}
function draw({ time }) {
    store.dispatch("tradingDerivative/drawTools", {
        isRemove: false,
        symbol,
        name: "pickTime",
        points: [0],
        data: [time],
    });
    load(time);
    emit("refreshPattern");
    pickTimeToolRef.value.classList.remove("selected");
}
function load(time) {
    pickTime = time;
    series.pickTime.setData([
        { time, color: mc.CHART_COLOR_MAP.green, value: 1 },
    ]);
}
function removePickTimeTool(withServer = true) {
    if (withServer)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: true,
            symbol,
            name: "pickTime",
        });
    series.pickTime.setData([]);
    pickTime = null;
}
</script>
