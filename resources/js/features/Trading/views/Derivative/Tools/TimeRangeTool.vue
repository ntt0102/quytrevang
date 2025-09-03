<template>
    <div
        ref="timeRangeToolRef"
        class="command"
        :title="$t('trading.derivative.tools.timeRange')"
        @click="timeRangeToolClick"
        @contextmenu="timeRangeToolContextmenu"
    >
        <i class="far fa-grip-lines-vertical"></i>
    </div>
</template>
<script setup>
import { ref, inject, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const mf = inject("mf");
const props = defineProps(["timeToIndex", "indexToTime"]);
const emit = defineEmits(["done", "hideContext"]);
const timeRangeToolRef = ref(null);
const timeRangeStore = computed(
    () => store.state.tradingDerivative.tools.timeRange
);
let timeRanges = [];
let series = {};

const symbol = "VN30F1M";

defineExpose({
    isSelected,
    createSeries,
    getFirstTime,
    draw,
    remove: removeTimeRangeTool,
});

watch(timeRangeStore, (data) => {
    if (data) load(data);
});

function isSelected() {
    return timeRangeToolRef.value.classList.contains("selected");
}
function createSeries(chart) {
    if (!chart) return false;
    series.timeRange = chart.addHistogramSeries({
        priceScaleId: "timeRange",
        scaleMargins: { top: 0, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
    });
}
function getFirstTime() {
    return timeRanges[0] ? timeRanges[0].time : null;
}
function timeRangeToolClick(e) {
    emit("hideContext");
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        e.target.classList.add("selected");
    }
}
function timeRangeToolContextmenu(e) {
    removeTimeRangeTool();
    emit("done");
    e.target.classList.remove("selected");
}
function draw({ time }) {
    let param = {
        isRemove: false,
        symbol,
        name: "timeRange",
        points: [],
        data: [],
    };
    let option = { time, value: 1 };
    switch (timeRanges.length) {
        case 0:
            option.color = "OrangeRed";
            timeRanges[0] = option;
            param.points.push(0);
            param.data.push(time);
            break;
        case 1:
            if (time > timeRanges[0].time) {
                option.color = "lime";
                timeRanges[1] = option;
                param.points.push(1);
                param.data.push(time);
            }
            emit("done");
            timeRangeToolRef.value.classList.remove("selected");
            break;
        default:
            const index0 = props.timeToIndex(timeRanges[0].time);
            const index1 = props.timeToIndex(timeRanges[1].time);
            const index2 = props.timeToIndex(time);
            const index3 = index2 + (index1 - index0);
            const time3 = props.indexToTime(index3);

            option.color = "OrangeRed";
            timeRanges[0] = mf.cloneDeep(option);
            param.points.push(0);
            param.data.push(time);
            //
            option.time = time3;
            option.color = "lime";
            timeRanges[1] = option;
            param.points.push(1);
            param.data.push(time3);
            timeRangeToolRef.value.classList.remove("selected");
            break;
    }
    series.timeRange.setData(timeRanges);
    store.dispatch("tradingDerivative/drawTools", param);
}
function load(data) {
    removeTimeRangeTool(false);
    loadTimeRangeTool(data);
}
function loadTimeRangeTool(data) {
    let start, end;
    switch (data.length) {
        case 1:
            start = data[0];
            break;
        case 2:
            start = data[0];
            end = data[1];
            break;
        case 3:
            const index0 = props.timeToIndex(data[0]);
            const index1 = props.timeToIndex(data[1]);
            const index2 = props.timeToIndex(data[2]);
            const index3 = index2 + (index1 - index0);
            start = data[2];
            end = props.indexToTime(index3);
            break;
    }
    if (start) timeRanges.push({ time: start, value: 1, color: "OrangeRed" });
    if (end) timeRanges.push({ time: end, value: 1, color: "lime" });
    series.timeRange.setData(timeRanges);
}
function removeTimeRangeTool(withServer = true) {
    if (withServer)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: true,
            symbol,
            name: "timeRange",
        });
    timeRanges = [];
    series.timeRange.setData([]);
}
</script>
