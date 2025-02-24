<template>
    <div
        ref="scanToolRef"
        class="context command"
        :title="$t('trading.derivative.scanTool')"
        @click="scanToolClick"
        @contextmenu="changePatternType"
    >
        <i
            class="far"
            :class="{
                'fa-right-from-line': patternType,
                'fa-left-from-line': !patternType,
            }"
        ></i>
    </div>
</template>
<script setup>
import { ref, computed, inject } from "vue";
import { useStore } from "vuex";

const store = useStore();
const mf = inject("mf");
const props = defineProps(["prices", "timeToIndex"]);
const emit = defineEmits([
    "scaned",
    "patternTypeChanged",
    "removePattern",
    "hideContext",
]);
const scanToolRef = ref(null);
const patternType = computed(
    () => store.state.tradingDerivative.config.patternType
);

defineExpose({
    isSelected,
    draw,
});
function isSelected() {
    return scanToolRef.value.classList.contains("selected");
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
function changePatternType() {
    store.dispatch("tradingDerivative/setPatternType", !patternType.value);
    emit("patternTypeChanged");
}
function draw({ time }) {
    const data = time
        ? props.prices.filter((item) => !mf.cmp(item.time, true, time))
        : props.prices;
    const points = leftScanPattern(data);
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
function removeIndex(obj) {
    const result = {};
    Object.entries(obj).forEach(([key, value]) => {
        const { index, ...rest } = value;
        result[key] = rest;
    });
    return result;
}
</script>
