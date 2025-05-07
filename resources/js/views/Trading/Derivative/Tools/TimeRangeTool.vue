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
const emit = defineEmits(["hideContext"]);
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
    draw,
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
            option.color = "lime";
            timeRanges[1] = option;
            param.points.push(1);
            param.data.push(time);
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
    if (data.length === 2) {
        start = data[0];
        end = data[1];
    } else if (data.length === 3) {
        const index0 = props.timeToIndex(data[0]);
        const index1 = props.timeToIndex(data[1]);
        const index2 = props.timeToIndex(data[2]);
        const index3 = index2 + (index1 - index0);
        start = data[2];
        end = props.indexToTime(index3);
    } else return false;
    let timeRange = [
        { time: start, value: 1, color: "OrangeRed" },
        { time: end, value: 1, color: "lime" },
    ];
    timeRanges = timeRange;
    series.timeRange.setData(timeRange);
}
function removeTimeRangeTool(withServer = true) {
    if (withServer)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: true,
            symbol,
            name: "timeRange",
        });
    series.timeRange.setData([]);
    timeRanges = [];
}
function getTimeDistance(X, Y) {
    const SESSIONS = [
        [32400, 41400], // 09:00 – 11:30
        [46800, 52200], // 13:00 – 14:30
    ];

    if (Y <= X) return 0;

    const timeInDayX = X % 86400;
    const timeInDayY = Y % 86400;

    let total = 0;

    for (const [start, end] of SESSIONS) {
        const overlapStart = Math.max(timeInDayX, start);
        const overlapEnd = Math.min(timeInDayY, end);

        if (overlapEnd > overlapStart) {
            total += overlapEnd - overlapStart;
        }
    }

    return total;
}
function getYFromXAndDuration(X, durationSec) {
    const SESSIONS = [
        [32400, 41400], // 09:00 – 11:30
        [46800, 52200], // 13:00 – 14:30
    ];
    const SECONDS_IN_DAY = 86400;

    const baseDay = Math.floor(X / SECONDS_IN_DAY) * SECONDS_IN_DAY;
    const timeInDay = X % SECONDS_IN_DAY;

    let remaining = durationSec;
    let current = timeInDay;

    for (const [start, end] of SESSIONS) {
        if (current >= end) continue; // đã qua phiên này

        const sessionStart = Math.max(current, start);
        const sessionEnd = end;
        const available = sessionEnd - sessionStart;

        if (remaining <= available) {
            const Y_timeInDay = sessionStart + remaining;
            return baseDay + Y_timeInDay;
        }

        remaining -= available;
        current = end; // chuyển sang phiên sau
    }

    // Nếu đến đây mà vẫn chưa đủ duration thì không thể tìm Y trong ngày
    return null;
}
</script>
