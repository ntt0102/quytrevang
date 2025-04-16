<template>
    <div
        ref="selectPatternRef"
        class="context command"
        :title="$t('trading.derivative.selectPatternTool')"
        @click="changePatternType"
    >
        <i
            class="far"
            :class="{
                'fa-square-question': !patternType,
                [`fa-square-${patternType}`]: patternType,
            }"
        ></i>
    </div>
    <div
        ref="patternToolRef"
        class="context command"
        :title="$t('trading.derivative.patternTool')"
        @click="patternToolClick"
        @contextmenu="patternToolContextmenu"
    >
        <i class="far fa-heart-rate"></i>
    </div>
</template>
<script setup>
import { ref, inject, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const mf = inject("mf");
const props = defineProps([
    "prices",
    "pickTimeToolRef",
    "timeToIndex",
    "indexToTime",
]);
const emit = defineEmits(["setProgress", "hideContext"]);
const patternToolRef = ref(null);
const patternStore = computed(
    () => store.state.tradingDerivative.tools.pattern
);
const patternType = computed(
    () => store.state.tradingDerivative.config.patternType
);
const symbol = "VN30F1M";
const patternTypeCount = 2;
const bcThreshold = 1;
let scanPoints = {};
let lines = {};
let series = {};

defineExpose({
    isSelected,
    createSeries,
    draw,
    load,
    refresh,
    remove,
});
watch(patternStore, (data) => {
    if (data) setTimeout(() => load(data, { isCheck: true }), 0);
});

function isSelected() {
    return patternToolRef.value.classList.contains("selected");
}
function createSeries(chart) {
    if (!chart) return false;
    series.pattern = chart.addLineSeries({
        color: "#F5F5F5",
        lastValueVisible: false,
        priceLineVisible: false,
    });
    series.timeMark = chart.addHistogramSeries({
        priceScaleId: "timeMark",
        scaleMargins: { top: 0, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
    });
}
function patternToolClick(e) {
    emit("hideContext");
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        e.target.classList.add("selected");
    }
}
function patternToolContextmenu(e) {
    e.target.classList.remove("selected");
    emit("hideContext");
    remove();
}
function draw({ time, price }) {
    let points = {};
    if (mf.isSet(lines.X)) {
        points = mf.cloneDeep(scanPoints);
        points.A = { time, price };
    } else {
        const data = time
            ? props.prices.filter((item) => !mf.cmp(item.time, true, time))
            : props.prices;
        points = removeIndex(scanPattern(data));
    }
    load(points, { isSave: true });
    patternToolRef.value.classList.remove("selected");
}
function scanPattern(data) {
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
        }
        if (mf.cmp(price, side, S.price)) S = { index, time, price };
        //
        if (C.index > A.index) {
            const bc = mf.fmtNum(B.price - C.price, 1, true);
            if (bc >= bcThreshold) {
                if (A.index - S.index >= C.index - B.index) break;
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
function load(data, { isSave = false, isCheck = false } = {}) {
    scanPoints = mf.cloneDeep(data);
    if (isSave) savePattern();
    const isLoad = isCheck ? checkPointsValid(scanPoints) : true;
    if (isLoad) {
        removePatternTool();
        loadPatternTool();
    }
}
function loadPatternTool() {
    const TYPE = "pattern";
    let option = {
        lineType: TYPE,
        lineWidth: 1,
        lineStyle: 1,
        draggable: false,
    };
    const {
        target: [[x, X], [y, Y], [z, Z]],
    } = calculatePattern();
    //
    option.point = "X";
    option.price = mf.fmtNum(x);
    option.title = `X ${mf.fmtNum(X)}`;
    option.color = "#FF1493";
    option.draggable = false;
    lines[option.point] = series.pattern.createPriceLine(option);
    //
    option.point = "Y";
    option.price = mf.fmtNum(y);
    option.title = `Y ${mf.fmtNum(Y)}`;
    option.color = "#8000FF";
    option.draggable = false;
    lines[option.point] = series.pattern.createPriceLine(option);
    //
    option.point = "Z";
    option.price = mf.fmtNum(z);
    option.title = `Z ${mf.fmtNum(Z)}`;
    option.color = "#00FFFF";
    option.draggable = false;
    lines[option.point] = series.pattern.createPriceLine(option);
}
function refresh(autoAdjust = false) {
    if (mf.isSet(lines.X)) {
        if (autoAdjust && patternType.value !== 2) {
            adjustPatternPoints();
        }
        removePatternTool();
        loadPatternTool();
    }
}
function calculatePattern() {
    let result = {};
    switch (patternType.value) {
        case 1:
            result = calcContinuePattern();
            break;
        case 2:
            result = calcReversalPattern();
            break;
    }
    emit("setProgress", result.progress);
    setTimeMark(result.timeMark);
    series.pattern.setData(result.points);
    return result;
}
function calcContinuePattern() {
    const { A, B, C } = scanPoints;
    const bc = B.price - C.price;
    let side = bc > 0;
    const pickTime = props.pickTimeToolRef.get();
    const phase1 = scanPhase({
        side,
        start: A,
        end: { time: Math.min(pickTime ?? B.time, B.time) },
    });
    const phase2 = scanPhase({
        side: !side,
        start: B,
        end: { time: Math.min(pickTime ?? C.time, C.time) },
    });
    const stopTime = props.indexToTime(6 * phase2.R.index - 5 * phase1.S.index);
    const phase3 = scanPhase({
        side,
        start: C,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak1 =
        mf.fmtNum(phase3.R1.price - C.price, 1, true) >= phase2.pr &&
        phase3.R1.index1 - phase2.R.index >= phase2.tr &&
        phase3.ext.pr < phase3.pr &&
        phase3.ext.tr < phase3.tr;
    const D = {
        price: isBreak1 ? phase3.R1.price : phase3.ext.R.price,
        index: isBreak1 ? phase3.R1.index : phase3.ext.R.index,
        index1: isBreak1 ? phase3.R1.index1 : phase3.ext.R.index1,
        time: isBreak1 ? phase3.R1.time : phase3.ext.R.time,
        time1: isBreak1 ? phase3.R1.time1 : phase3.ext.R.time1,
    };
    const E = {
        price: isBreak1 ? phase3.S1.price : phase3.ext.S.price,
        index: isBreak1 ? phase3.S1.index : phase3.ext.S.index,
        index1: isBreak1 ? phase3.S1.index1 : phase3.ext.S.index1,
        time: isBreak1 ? phase3.S1.time : phase3.ext.S.time,
        time1: isBreak1 ? phase3.S1.time1 : phase3.ext.S.time1,
    };

    const phase4 = scanPhase({
        side: !side,
        start: D,
        end: { time: Math.min(pickTime ?? E.time, E.time) },
    });

    const phase5 = scanPhase({
        side,
        start: E,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak2 =
        mf.fmtNum(phase5.R1.price - E.price, 1, true) >= phase4.pr &&
        phase5.R1.index1 - phase4.R.index >= phase4.tr &&
        phase5.ext.pr < phase5.pr &&
        phase5.ext.tr < phase5.tr;

    const F = {
        price: isBreak2 ? phase5.R1.price : phase5.ext.R.price,
        index: isBreak2 ? phase5.R1.index : phase5.ext.R.index,
        index1: isBreak2 ? phase5.R1.index1 : phase5.ext.R.index1,
        time: isBreak2 ? phase5.R1.time : phase5.ext.R.time,
        time1: isBreak2 ? phase5.R1.time1 : phase5.ext.R.time1,
    };

    const G = {
        price: isBreak2 ? phase5.S1.price : phase5.ext.S.price,
        index: isBreak2 ? phase5.S1.index : phase5.ext.S.index,
        index1: isBreak2 ? phase5.S1.index1 : phase5.ext.S.index1,
        time: isBreak2 ? phase5.S1.time : phase5.ext.S.time,
        time1: isBreak2 ? phase5.S1.time1 : phase5.ext.S.time1,
    };

    const phase6 = scanPhase({
        side: !side,
        start: F,
        end: { time: Math.min(pickTime ?? G.time, G.time) },
    });

    const phase7 = scanPhase({
        side,
        start: G,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak3 =
        mf.fmtNum(phase7.R1.price - E.price, 1, true) >= phase6.pr &&
        phase7.R1.index1 - phase6.R.index >= phase6.tr &&
        phase7.ext.pr < phase7.pr &&
        phase7.ext.tr < phase7.tr;

    const H = {
        price: isBreak3 ? phase7.R1.price : phase7.ext.R.price,
        index: isBreak3 ? phase7.R1.index : phase7.ext.R.index,
        index1: isBreak3 ? phase7.R1.index1 : phase7.ext.R.index1,
        time: isBreak3 ? phase7.R1.time : phase7.ext.R.time,
        time1: isBreak3 ? phase7.R1.time1 : phase7.ext.R.time1,
    };

    console.log("calcContinuePattern", [
        phase1,
        phase2,
        phase3,
        phase4,
        phase5,
        phase6,
        phase7,
    ]);

    const AB = mf.fmtNum(B.price - A.price, 1, true);
    const BC = mf.fmtNum(bc, 1, true);
    const CD = mf.fmtNum(D.price - C.price, 1, true);
    const DE = mf.fmtNum(E.price - D.price, 1, true);
    const EF = mf.fmtNum(F.price - E.price, 1, true);
    const FG = mf.fmtNum(G.price - F.price, 1, true);
    const GH = mf.fmtNum(H.price - G.price, 1, true);

    const Tab = phase1.R.index1 - phase1.S.index;
    const Tbc = phase2.R.index1 - phase2.S.index;
    const Tcd = D.index1 - phase3.S.index;
    const Tde = E.index1 - D.index;
    const Tef = F.index1 - E.index;
    const Tfg = G.index1 - F.index;
    const Tgh = H.index1 - G.index;

    const TR3 = isBreak1 ? phase3.pre.tr : phase3.tr;
    const PR3 = isBreak1 ? phase3.pre.pr : phase3.pr;
    const PR5 = isBreak2 ? phase5.pre.pr : phase5.pr;

    const T1 = phase1.R.index + phase1.tr;
    const T2 = phase2.R.index + phase2.tr;
    const T3 = D.index + TR3;
    const T4 = E.index + phase4.tr;
    const T5 = F.index + phase5.tr;
    const T6 = G.index + phase6.tr;
    const timeMark = [T6, T5, T4, T3, T2, T1];

    const rBCD = CD / BC;
    const rCDE = DE / CD;
    const rDEF = EF / DE;
    const rEFG = FG / EF;

    let progress = {};
    progress.steps = [
        [
            //
            phase2.R.index1 > T1,
            BC >= phase1.pr,
        ],
        [
            //
            D.index1 > T2,
            CD >= phase2.pr,
            rBCD >= 0.5,
            Tcd <= Tab,
            CD <= AB,
        ],
        [
            //
            E.index1 > T3,
            DE >= PR3,
            rCDE >= 0.5,
            rCDE >= 1.3 - rBCD,
            Tde <= Tbc,
            DE <= BC,
        ],
        [
            //
            F.index1 > T4,
            EF >= phase4.pr,
            rDEF >= 0.5,
            Tef <= Tcd,
            EF <= CD,
            F.price !== D.price && F.price !== B.price,
        ],
        [
            //
            G.index1 > T5,
            FG >= PR5,
            rEFG >= 0.5,
            rEFG >= 1.3 - rDEF,
            Tfg <= Tde,
            FG <= DE,
        ],
        [
            //
            H.index1 > T6,
            GH >= phase6.pr,
            Tgh <= Tef,
        ],
    ];
    for (let i = 0; i < progress.steps.length; i++) {
        progress.step = i + 1;
        progress.result = progress.steps[i].every(Boolean);
        if (!progress.result) break;
    }
    //
    const points = [
        { time: A.time, value: A.price, color: "#FFFF00" },
        { time: phase1.R.time1, value: phase1.R.price, color: "#FF7F00" },
        { time: phase2.R.time1, value: phase2.R.price, color: "#FF0000" },
        { time: D.time1, value: D.price, color: "#FF1493" },
        { time: E.time1, value: E.price, color: "#8000FF" },
        { time: F.time1, value: F.price, color: "#00FFFF" },
        { time: G.time1, value: G.price, color: "#00FF00" },
        { time: H.time1, value: H.price },
    ];
    //
    const entry = D.price;
    const [x] = adjustTargetPrice(D.price, CD, side);
    const X = mf.fmtNum(x - entry, 1, true);
    const [y] = adjustTargetPrice(D.price, 2 * CD, side);
    const Y = mf.fmtNum(y - entry, 1, true);
    const z = B.price + (side ? 1 : -1) * BC;
    const Z = mf.fmtNum(z - entry, 1, true);

    return {
        timeMark,
        progress,
        points: makeUnique(points),
        target: [
            [x, X],
            [y, Y],
            [z, Z],
        ],
    };
}
function calcReversalPattern() {
    const { A, B } = scanPoints;
    const ab = A.price - B.price;
    let side = ab > 0;
    const pickTime = props.pickTimeToolRef.get();
    const phase1 = scanPhase({
        side: !side,
        start: A,
        end: { time: Math.min(pickTime ?? B.time, B.time) },
    });
    const stopTime = props.indexToTime(6 * phase1.R.index - 5 * phase1.S.index);
    const phase2 = scanPhase({
        side,
        start: B,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak1 =
        mf.fmtNum(phase2.R1.price - B.price, 1, true) >= phase1.pr &&
        phase2.R1.index1 - phase1.R.index >= phase1.tr &&
        phase2.ext.pr < phase2.pr &&
        phase2.ext.tr < phase2.tr;

    const C = {
        price: isBreak1 ? phase2.R1.price : phase2.ext.R.price,
        index: isBreak1 ? phase2.R1.index : phase2.ext.R.index,
        index1: isBreak1 ? phase2.R1.index1 : phase2.ext.R.index1,
        time: isBreak1 ? phase2.R1.time : phase2.ext.R.time,
        time1: isBreak1 ? phase2.R1.time1 : phase2.ext.R.time1,
    };
    const D = {
        price: isBreak1 ? phase2.S1.price : phase2.ext.S.price,
        index: isBreak1 ? phase2.S1.index : phase2.ext.S.index,
        index1: isBreak1 ? phase2.S1.index1 : phase2.ext.S.index1,
        time: isBreak1 ? phase2.S1.time : phase2.ext.S.time,
        time1: isBreak1 ? phase2.S1.time1 : phase2.ext.S.time1,
    };

    const phase3 = scanPhase({
        side: !side,
        start: C,
        end: { time: Math.min(pickTime ?? D.time, D.time) },
    });

    const phase4 = scanPhase({
        side,
        start: D,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak2 =
        mf.fmtNum(phase4.R1.price - D.price, 1, true) >= phase3.pr &&
        phase4.R1.index1 - phase3.R.index >= phase3.tr &&
        phase4.ext.pr < phase4.pr &&
        phase4.ext.tr < phase4.tr;

    const E = {
        price: isBreak2 ? phase4.R1.price : phase4.ext.R.price,
        index: isBreak2 ? phase4.R1.index : phase4.ext.R.index,
        index1: isBreak2 ? phase4.R1.index1 : phase4.ext.R.index1,
        time: isBreak2 ? phase4.R1.time : phase4.ext.R.time,
        time1: isBreak2 ? phase4.R1.time1 : phase4.ext.R.time1,
    };

    const F = {
        price: isBreak2 ? phase4.S1.price : phase4.ext.S.price,
        index: isBreak2 ? phase4.S1.index : phase4.ext.S.index,
        index1: isBreak2 ? phase4.S1.index1 : phase4.ext.S.index1,
        time: isBreak2 ? phase4.S1.time : phase4.ext.S.time,
        time1: isBreak2 ? phase4.S1.time1 : phase4.ext.S.time1,
    };

    const phase5 = scanPhase({
        side: !side,
        start: E,
        end: { time: Math.min(pickTime ?? F.time, F.time) },
    });

    const phase6 = scanPhase({
        side,
        start: F,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak3 =
        mf.fmtNum(phase6.R1.price - F.price, 1, true) >= phase5.pr &&
        phase6.R1.index1 - phase5.R.index >= phase5.tr &&
        phase6.ext.pr < phase6.pr &&
        phase6.ext.tr < phase6.tr;

    const G = {
        price: isBreak3 ? phase6.R1.price : phase6.ext.R.price,
        index: isBreak3 ? phase6.R1.index : phase6.ext.R.index,
        index1: isBreak3 ? phase6.R1.index1 : phase6.ext.R.index1,
        time: isBreak3 ? phase6.R1.time : phase6.ext.R.time,
        time1: isBreak3 ? phase6.R1.time1 : phase6.ext.R.time1,
    };

    console.log("calcReversalPattern", [
        phase1,
        phase2,
        phase3,
        phase4,
        phase5,
        phase6,
    ]);

    const AB = mf.fmtNum(ab, 1, true);
    const BC = mf.fmtNum(C.price - B.price, 1, true);
    const CD = mf.fmtNum(D.price - C.price, 1, true);
    const DE = mf.fmtNum(E.price - D.price, 1, true);
    const EF = mf.fmtNum(F.price - E.price, 1, true);
    const FG = mf.fmtNum(G.price - F.price, 1, true);

    const Tab = phase1.R.index1 - phase1.S.index;
    const Tbc = C.index1 - phase2.S.index;
    const Tcd = D.index1 - C.index;
    const Tde = E.index1 - D.index;
    const Tef = F.index1 - E.index;
    const Tfg = G.index1 - F.index;

    const TR2 = isBreak1 ? phase2.pre.tr : phase2.tr;
    const PR2 = isBreak1 ? phase2.pre.pr : phase2.pr;
    const PR4 = isBreak2 ? phase4.pre.pr : phase4.pr;

    const T1 = phase1.R.index + phase1.tr;
    const T2 = C.index + TR2;
    const T3 = D.index + phase3.tr;
    const T4 = E.index + phase4.tr;
    const T5 = F.index + phase5.tr;
    const timeMark = [T5, T4, T3, T2, T1];

    const rBCD = CD / BC;
    const rCDE = DE / CD;
    const rDEF = EF / DE;
    const rEFG = FG / EF;

    let progress = {};
    progress.steps = [
        [
            //
            C.index1 > T1,
            BC >= phase1.pr,
        ],
        [
            //
            D.index1 > T2,
            CD >= PR2,
            rBCD >= 0.7,
            Tcd <= Tab,
            CD <= AB,
        ],
        [
            //
            E.index1 > T3,
            DE >= phase3.pr,
            rCDE >= 0.5,
            Tde <= Tbc,
            DE <= BC,
            E.price !== C.price,
        ],
        [
            //
            F.index1 > T4,
            EF >= PR4,
            rDEF >= 0.5,
            rDEF >= 1.3 - rCDE,
            Tef <= Tcd,
            EF <= CD,
        ],
        [
            //
            G.index1 > T5,
            FG >= phase5.pr,
            Tfg <= Tde,
        ],
    ];
    for (let i = 0; i < progress.steps.length; i++) {
        progress.step = i + 1;
        progress.result = progress.steps[i].every(Boolean);
        if (!progress.result) break;
    }
    //
    const points = [
        { time: A.time, value: A.price, color: "#FF7F00" },
        { time: phase1.R.time1, value: B.price, color: "#FF0000" },
        { time: C.time1, value: C.price, color: "#FF1493" },
        { time: D.time1, value: D.price, color: "#8000FF" },
        { time: E.time1, value: E.price, color: "#00FFFF" },
        { time: F.time1, value: F.price, color: "#00FF00" },
        { time: G.time1, value: G.price },
    ];
    //
    const entry = C.price;
    const [x] = adjustTargetPrice(C.price, BC, side);
    const X = mf.fmtNum(x - entry, 1, true);
    const [y] = adjustTargetPrice(C.price, 2 * BC, side);
    const Y = mf.fmtNum(y - entry, 1, true);
    const z = A.price;
    const Z = mf.fmtNum(z - entry, 1, true);

    return {
        timeMark,
        progress,
        points: makeUnique(points),
        target: [
            [x, X],
            [y, Y],
            [z, Z],
        ],
    };
}
function scanPhase({ side, start, end }) {
    let S = { ...mf.cloneDeep(start), index: props.timeToIndex(start.time) },
        R = {},
        box = {},
        maxBox = {},
        preBox = {},
        extBox = {};
    const _prices = props.prices.filter((item) => {
        let cond = item.time >= start.time;
        if (end.time) cond = cond && item.time <= end.time;
        return cond;
    });
    if (_prices.length > 0) {
        _prices.every((item, i) => {
            const price = item.value;
            if (start.price && mf.cmp(price, !side, start.price)) return false;
            if (end.price && mf.cmp(price, side, end.price)) return false;
            const time = item.time;
            const index = props.timeToIndex(time);
            if (index === -1) return false;
            if (i === 0 || (start.price && price === start.price)) {
                box = {
                    R: { index, time, price, index1: index, time1: time },
                    S: { index, time, price, index1: index, time1: time },
                    pr: 0,
                    tr: 0,
                };
                maxBox = mf.cloneDeep(box);
            }
            if (mf.cmp(price, side, box.R.price, true)) {
                if (box.pr > 0) {
                    if (
                        (box.pr >= maxBox.pr && box.tr >= 0.5 * maxBox.tr) ||
                        (box.tr >= maxBox.tr && box.pr >= 0.5 * maxBox.pr)
                    ) {
                        preBox = mf.cloneDeep(maxBox);
                        maxBox = mf.cloneDeep(box);
                        if (maxBox.tr < preBox.tr) maxBox.tr = preBox.tr;
                        if (maxBox.pr < preBox.pr) maxBox.pr = preBox.pr;
                    }
                }
                const isREqual = price === box.R.price;
                box = {
                    R: {
                        index,
                        time,
                        price,
                        index1: isREqual ? box.R.index1 : index,
                        time1: isREqual ? box.R.time1 : time,
                    },
                    S: { index, time, price, index1: index, time1: time },
                    pr: 0,
                    tr: 0,
                };
            } else {
                if (mf.cmp(price, !side, box.S.price, true)) {
                    if (price !== box.S.price) {
                        box.pr = mf.fmtNum(price - box.R.price, 1, true);
                        box.tr = index - box.R.index;
                        box.S.price = price;
                        box.S.index1 = index;
                        box.S.time1 = time;
                    }
                    box.S.index = index;
                    box.S.time = time;
                }
            }
            return true;
        });
        extBox = mf.cloneDeep(box);
        R = mf.cloneDeep(box.R);
    } else {
        R = mf.cloneDeep(S);
        maxBox = {
            R: R,
            S: {},
            pr: 0,
            tr: 0,
        };
        preBox = mf.cloneDeep(maxBox);
        extBox = mf.cloneDeep(maxBox);
    }

    return {
        tr: maxBox.tr,
        pr: maxBox.pr,
        S1: maxBox.S,
        R1: maxBox.R,
        pre: preBox,
        S,
        R,
        ext: extBox,
    };
}
function checkPointsValid({ A: { time } }) {
    return time >= props.prices[0].time && time < props.prices.at(-1).time;
}
function adjustTargetPrice(price, range, side) {
    const target = price + (side ? 1 : -1) * range;
    let decimal = mf.fmtNum(target % 1);
    let adjusted = target;
    if (side) {
        if (decimal >= 0.1 && decimal <= 0.2) {
            adjusted = Math.floor(target);
        } else if (decimal >= 0.6 && decimal <= 0.7) {
            adjusted = Math.floor(target) + 0.5;
        }
    } else {
        if (decimal >= 0.8 && decimal <= 0.9) {
            adjusted = Math.ceil(target);
        } else if (decimal >= 0.3 && decimal <= 0.4) {
            adjusted = Math.floor(target) + 0.5;
        }
    }

    return [adjusted, target];
}
function adjustPatternPoints() {
    const pickTime = props.pickTimeToolRef.get();
    if (pickTime) return false;
    //
    const side = scanPoints.B.price > scanPoints.A.price;
    const cIndex = props.prices.findIndex(
        (bar) => bar.time === scanPoints.C.time
    );
    let newPoint = mf.cloneDeep(scanPoints.C);
    for (let i = cIndex; i < props.prices.length; i++) {
        const time = props.prices[i].time;
        const price = props.prices[i].value;
        if (mf.cmp(price, !side, newPoint.price)) {
            newPoint.time = time;
            newPoint.price = price;
        }
    }
    if (newPoint.time !== scanPoints.C.time) {
        scanPoints.C = newPoint;
        savePattern();
    }
}
function savePattern(isRemove = false) {
    let param = {
        isRemove,
        symbol,
        name: "pattern",
        points: [],
        data: [],
    };
    if (!isRemove) {
        Object.entries(scanPoints).forEach(([key, value]) => {
            param.points.push(key);
            param.data.push(value);
        });
    } else scanPoints = {};
    store.dispatch("tradingDerivative/drawTools", param);
}
function remove() {
    savePattern(true);
    props.pickTimeToolRef.remove();
    removePatternTool();
    setTimeMark([]);
    emit("setProgress", {});
    series.pattern.setData([]);
}
function removePatternTool() {
    if (mf.isSet(lines.X)) {
        series.pattern.removePriceLine(lines.X);
        series.pattern.removePriceLine(lines.Y);
        series.pattern.removePriceLine(lines.Z);
    }
    lines = {};
}
function setTimeMark(data) {
    const colors = [
        "#00FF00",
        "#00FFFF",
        "#8000FF",
        "#FF1493",
        "#FF0000",
        "#FF7F00",
    ];
    let result = [];
    data.forEach((item, i) => {
        let time = props.indexToTime(item);
        if (time) {
            result.push({
                time,
                value: 1,
                color: colors[i],
            });
        }
    });
    if (result.length) {
        result = makeUnique(result);
        result.sort((a, b) => a.time - b.time);
    }
    series.timeMark.setData(result);
}
function makeUnique(arr) {
    const uniqueSet = new Set();
    return arr.map((item) => {
        let newItem = { ...item };
        while (uniqueSet.has(newItem.time)) {
            newItem.time++;
        }
        uniqueSet.add(newItem.time);
        return newItem;
    });
}
function changePatternType() {
    const type =
        patternType.value >= patternTypeCount ? 1 : patternType.value + 1;
    store.dispatch("tradingDerivative/setPatternType", type);
    refresh();
}
</script>
