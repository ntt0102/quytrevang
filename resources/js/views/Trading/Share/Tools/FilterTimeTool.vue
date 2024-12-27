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
import { ref, inject, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const mf = inject("mf");
const props = defineProps(["filterTimeSeries"]);
const emit = defineEmits(["hideContext"]);
const filterTimeToolRef = ref(null);
// const symbol = computed(() => store.state.tradingShare.symbol);
// const filterTimeStore = computed(
//     () => store.state.tradingShare.chart.tools.filterTime,
//     tools.filterTime
// );
let filterTimes = [];
const colors = ["#F44336", "#FF9800", "#4CAF50", "#009688"];

defineExpose({
    isSelected,
    draw,
    load,
    get,
});

// watch(filterTimeStore, (data) => {
//     if (data) load(data);
// });

function isSelected() {
    return filterTimeToolRef.value.classList.contains("selected");
}
function get() {
    return filterTimes.map((item) => item.time);
}
function filterTimeToolClick(e) {
    // emit("hideContext");
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        removefilterTimeTool();
        e.target.classList.add("selected");
    }
}
function filterTimeToolContextmenu(e) {
    removefilterTimeTool();
    e.target.classList.remove("selected");
}
function draw({ time }) {
    const index = filterTimes.length;
    if (index && time <= filterTimes[index - 1].time) return false;
    filterTimes.push({ time, color: colors[index], value: 1 });
    props.filterTimeSeries.setData(filterTimes);
    store.dispatch("tradingShare/drawTools", {
        isRemove: false,
        symbol: "",
        name: "filterTime",
        points: [index],
        data: [time],
    });
    if (index === 3) filterTimeToolRef.value.classList.remove("selected");
}
function load(data) {
    // removefilterTimeTool(false);
    // loadfilterTimeTool(data);
    for (let i = 0; i < data.length; i++) {
        filterTimes.push({ time: data[i], color: colors[i], value: 1 });
    }
    props.filterTimeSeries.setData(filterTimes);
}
// function loadfilterTimeTool(data) {
//     for (let i = 0; i < data.length; i++) {
//         filterTimes.push({ time: data[i], color: colors[i], value: 1 });
//     }
//     props.filterTimeSeries.setData(filterTimes);
// }
function removefilterTimeTool(withServer = true) {
    if (withServer)
        store.dispatch("tradingShare/drawTools", {
            isRemove: true,
            symbol: "",
            name: "filterTime",
        });
    props.filterTimeSeries.setData([]);
    filterTimes = [];
}
</script>
