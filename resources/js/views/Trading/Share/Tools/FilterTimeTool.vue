<template>
    <div
        ref="filterTimeToolRef"
        class="command"
        :title="$t('trading.share.tools.filterTime')"
        @click="filterTimeToolClick"
        @contextmenu="filterTimeToolContextmenu"
    >
        <i class="far fa-grip-lines-vertical"></i>
    </div>
</template>
<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps([]);
const emit = defineEmits(["hideContext"]);
const filterTimeStore = computed(
    () => store.state.tradingShare.config.filterTime
);
const filterTimeToolRef = ref(null);
let series = {};
let filterTimes = [];
const colors = [
    "rgba(244, 67, 54, 0.5)",
    "rgba(255, 152, 0, 0.5)",
    "rgba(76, 175, 80, 0.5)",
    "rgba(0, 150, 136, 0.5)",
];

defineExpose({
    createSeries,
    isSelected,
    draw,
    get,
});

watch(filterTimeStore, (data) => {
    if (data) setTimeout(() => load(data), 3000);
});

function isSelected() {
    return filterTimeToolRef.value.classList.contains("selected");
}
function get() {
    let _filterTimes = filterTimes.map((item) => item.time);
    return _filterTimes.reverse();
}
function createSeries(chart) {
    if (!chart) return false;
    series = chart.addHistogramSeries({
        priceScaleId: "filterTime",
        scaleMargins: { top: 0, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
    });
}
function filterTimeToolClick(e) {
    emit("hideContext");
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        filterTimes.pop();
        saveFilterTime({ isRemove: true, removePoint: filterTimes.length });
        series.setData(filterTimes);
        e.target.classList.add("selected");
    }
}
function filterTimeToolContextmenu(e) {
    removeFilterTimeTool();
    e.target.classList.remove("selected");
}
function draw({ time }) {
    const index = filterTimes.length;
    if (index && time <= filterTimes[index - 1].time) return false;
    filterTimes.push({ time, color: colors[index], value: 1 });
    series.setData(filterTimes);
    saveFilterTime({ isRemove: false, points: [index], data: [time] });
    if (index === 3) filterTimeToolRef.value.classList.remove("selected");
}
function load(data) {
    for (let i = 0; i < data.length; i++) {
        filterTimes.push({ time: data[i], color: colors[i], value: 1 });
    }
    series.setData(filterTimes);
}
function removeFilterTimeTool(withServer = true) {
    if (withServer) saveFilterTime({ isRemove: true });
    series.setData([]);
    filterTimes = [];
}
function saveFilterTime({ isRemove, points, data, removePoint }) {
    let param = {
        isRemove,
        symbol: "",
        name: "filterTime",
    };
    if (isRemove) {
        param.point = removePoint;
    } else {
        param.points = points;
        param.data = data;
    }
    store.dispatch("tradingShare/drawTools", param);
}
</script>
