<template>
    <div
        ref="scanToolRef"
        class="context command"
        :title="$t('trading.derivative.scanTool')"
        @click="scanToolClick"
        @contextmenu="toggleScanContext"
    >
        <i
            class="far"
            :class="{
                [`fa-angles-${scanSide}`]: true,
            }"
        ></i>
        <ScanContext
            v-show="showScanContext"
            class="contextmenu"
            v-model="scanSide"
        >
        </ScanContext>
    </div>
</template>
<script setup>
import ScanContext from "./Contexts/ScanContext.vue";
import { ref, inject } from "vue";

const mf = inject("mf");
const props = defineProps(["prices", "timeToIndex"]);
const emit = defineEmits(["scaned", "removePattern", "hideContext"]);
const scanToolRef = ref(null);
const showScanContext = ref(false);
const scanSide = ref("left");

defineExpose({
    isSelected,
    hide,
    draw,
});
function isSelected() {
    return scanToolRef.value.classList.contains("selected");
}
function hide() {
    showScanContext.value = false;
}
function scanToolClick(e) {
    emit("hideContext");
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        e.target.classList.add("selected");
        emit("removePattern");
    }
}
function toggleScanContext() {
    const oldValue = showScanContext.value;
    emit("hideContext");
    showScanContext.value = !oldValue;
}
function draw({ time }) {
    const leftSide = scanSide.value === "left";
    const data = time
        ? props.prices.filter((item) => !mf.cmp(item.time, leftSide, time))
        : props.prices;
    let points = leftSide ? leftScanPattern(data) : rightScanPattern(data);
    if (mf.isSet(points)) emit("scaned", removeIndex(points));
    scanToolRef.value.classList.remove("selected");
}
function leftScanPattern(data) {
    let side;
    let [A, B, C, S] = Array(4).fill({});
    for (let i = data.length - 1; i >= 0; i--) {
        const price = data[i].value;
        const time = data[i].time;
        const index = props.timeToIndex(time);
        if (index === -1) break;
        if (i === data.length - 1) {
            C = { index, time, price };
            [B, A, S] = Array(3)
                .fill(null)
                .map(() => mf.cloneDeep(C));
        }
        if (side === undefined) {
            if (price === C.price) continue;
            side = price > C.price;
        }
        if (mf.cmp(price, side, B.price)) {
            if (mf.cmp(A.price, !side, C.price)) {
                [C, B] = [B, A].map((item) => mf.cloneDeep(item));
                A = { index, time, price };
                S = mf.cloneDeep(A);
                side = !side;
            } else B = { index, time, price };
        }
        if (mf.cmp(price, !side, A.price)) {
            A = { index, time, price };
            S = mf.cloneDeep(A);
        } else S.index = index;
        if (mf.cmp(price, side, S.price)) S = { index, time, price };
        //
        if (C.index > A.index) {
            const bc = mf.fmtNum(B.price - C.price, 1, true);
            if (bc >= 1) {
                if (A.index - S.index >= 2 * (C.index - B.index)) break;
                const as = mf.fmtNum(A.price - S.price, 1, true);
                if (as > bc) break;
            }
        }
    }
    return { A, B, C };
}
function rightScanPattern(data) {
    let side;
    let [A, B, C] = Array(3).fill({});
    for (let i = 0; i < data.length; i++) {
        const price = data[i].value;
        const time = data[i].time;
        const index = props.timeToIndex(time);
        if (index === -1) break;
        if (i === 0) {
            A = { index, time, price };
            B = mf.cloneDeep(A);
            C = mf.cloneDeep(A);
        }
        if (side === undefined) {
            if (price === A.price) continue;
            side = price > A.price;
        }
        if (mf.cmp(price, side, B.price)) {
            B = { index, time, price };
            C = mf.cloneDeep(B);
        }
        if (mf.cmp(B.price, side, A.price) && mf.cmp(price, !side, C.price)) {
            if (!mf.cmp(price, side, A.price)) {
                A = mf.cloneDeep(B);
                B = { index, time, price };
                C = mf.cloneDeep(B);
                side = !side;
            } else C = { index, time, price };
        }
    }
    return { A, B, C };
}
function removeIndex(obj) {
    const result = {};
    Object.entries(obj).forEach(([key, value]) => {
        const { index, ...rest } = value;
        result[key] = rest;
    });
    return result;
}
// function timeToIndex(time) {
//     let index = params.data.whitespace.findIndex((item) => item.time === time);
//     if (index === -1) {
//         const date = format(new Date(time * 1000), "yyyy-MM-dd");
//         const amEnd = getUnixTime(new Date(`${date}T11:30:00Z`));
//         const pmStart = getUnixTime(new Date(`${date}T13:00:00Z`));
//         const pmEnd = getUnixTime(new Date(`${date}T14:30:00Z`));
//         if (time > amEnd && time < pmStart) time = amEnd;
//         else if (time > pmEnd) time = pmEnd;
//         index = params.data.whitespace.findIndex((item) => item.time === time);
//     }
//     return index;
// }
</script>
