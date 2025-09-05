<template>
    <div
        ref="stopTimeToolRef"
        class="command"
        :title="$t('trading.derivative.tools.stopTime')"
        @click="stopTimeToolClick"
        @contextmenu="stopTimeToolContextmenu"
    >
        <i class="far fa-pipe"></i>
    </div>
</template>
<script setup>
import { ref, inject, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
// const props = defineProps([]);
const emit = defineEmits(["done", "hideContext"]);
const mc = inject("mc");
const stopTimeToolRef = ref(null);
const stopTimeStore = computed(
    () => store.state.tradingDerivative.tools.stopTime
);
let stopTime = null;
let series = {};

const symbol = "VN30F1M";

defineExpose({
    isSelected,
    createSeries,
    draw,
    remove: removeStopTimeTool,
    get,
    set,
});

watch(stopTimeStore, (data) => {
    if (data) load(data[0]);
});

function isSelected() {
    return stopTimeToolRef.value.classList.contains("selected");
}
function createSeries(chart) {
    if (!chart) return false;
    series.stopTime = chart.addHistogramSeries({
        priceScaleId: "stopTime",
        scaleMargins: { top: 0, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
    });
}
function get(cmpTime) {
    return (stopTime && stopTime > cmpTime) || !cmpTime ? stopTime : null;
}
function set(time) {
    store.dispatch("tradingDerivative/drawTools", {
        isRemove: false,
        symbol,
        name: "stopTime",
        points: [0],
        data: [time],
    });
    load(time);
}
function stopTimeToolClick(e) {
    emit("hideContext");
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
}
function stopTimeToolContextmenu(e) {
    e.target.classList.remove("selected");
    removeStopTimeTool();
    emit("done", null);
}
function draw({ time }) {
    set(time);
    emit("done", time);
    stopTimeToolRef.value.classList.remove("selected");
}
function load(time) {
    stopTime = time;
    series.stopTime.setData([
        { time, color: mc.CHART_COLOR_MAP.green, value: 1 },
    ]);
}
function removeStopTimeTool(withServer = true) {
    if (withServer)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: true,
            symbol,
            name: "stopTime",
        });
    series.stopTime.setData([]);
    stopTime = null;
}
</script>
