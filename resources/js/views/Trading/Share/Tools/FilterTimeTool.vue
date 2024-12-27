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
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["filterTimeSeries"]);
const emit = defineEmits(["hideContext"]);
const filterTimeToolRef = ref(null);
let filterTimes = [];
const colors = ["#F44336", "#FF9800", "#4CAF50", "#009688"];

defineExpose({
    isSelected,
    draw,
    load,
    get,
});

function isSelected() {
    return filterTimeToolRef.value.classList.contains("selected");
}
function get() {
    return filterTimes.map((item) => item.time);
}
function filterTimeToolClick(e) {
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
    for (let i = 0; i < data.length; i++) {
        filterTimes.push({ time: data[i], color: colors[i], value: 1 });
    }
    props.filterTimeSeries.setData(filterTimes);
}
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
