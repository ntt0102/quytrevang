<template>
    <div
        ref="selectPatternRef"
        class="context command"
        :title="$t('trading.derivative.tools.selectPattern')"
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
        :title="$t('trading.derivative.tools.pattern')"
        @click="patternToolClick"
        @contextmenu="patternToolContextmenu"
    >
        <i class="far fa-heart-rate"></i>
    </div>
</template>
<script setup>
import { ref, inject, computed, watch } from "vue";
import { useStore } from "vuex";
import { formatISO } from "date-fns";

const store = useStore();
const mf = inject("mf");
const props = defineProps([
    "prices",
    "bars",
    "pickTimeToolRef",
    "timeToIndex",
    "indexToTime",
]);
const emit = defineEmits(["setProgress", "setPatternOrder", "hideContext"]);
const patternToolRef = ref(null);
const patternStore = computed(
    () => store.state.tradingDerivative.tools.pattern
);
const patternType = computed(
    () => store.state.tradingDerivative.config.patternType
);
const symbol = "VN30F1M";
const patternTypeCount = 2;
const scanThreshold = 1;
const phaseThreshold = 0.9;
let scanPoints = {};
let lines = {};
let series = {};

const colorMap = {
    yellow: "rgba(255, 255, 0, 0.7)",
    orange: "rgba(255, 127, 0, 0.7)",
    red: "rgba(255, 0, 0, 0.7)",
    pink: "rgba(255, 20, 147, 0.7)",
    purple: "rgba(128, 0, 255, 0.7)",
    cyan: "rgba(0, 255, 255, 0.7)",
    green: "rgba(0, 255, 0, 0.7)",
};

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
        const date = formatISO(new Date(time * 1000));
        points.A = { time: { t: time, d: date }, price };
        console.log("points", points);
    } else {
        const data = time
            ? props.bars.filter((item) => !mf.cmp(item.time, true, time))
            : props.bars;
        points = scanPattern(data);
    }
    load(points, { isSave: true });
    patternToolRef.value.classList.remove("selected");
}
function scanPattern(data) {
    let start;
    let side;
    let [A, B, C, S] = Array(4).fill({});
    for (let ix = data.length - 1; ix >= 0; ix--) {
        const high = data[ix].high;
        const low = data[ix].low;
        const t = data[ix].time;
        const d = data[ix].date;
        const i = props.timeToIndex(t);
        if (ix === data.length - 1) {
            start = { time: { t, d, i }, high, low };
        }
        if (side === undefined) {
            if (
                (high <= start.high && low >= start.low) ||
                (high > start.high && low < start.low)
            ) {
                continue;
            }
            if (high > start.high && low >= start.low) side = true;
            if (low < start.low && high <= start.high) side = false;
            C = {
                price: side ? start.low : start.high,
                time: start.time,
            };
            [B, A, S] = Array(3)
                .fill(null)
                .map(() => mf.cloneDeep(C));
        }
        const top = side ? high : low;
        const bottom = side ? low : high;
        if (mf.cmp(top, side, B.price)) {
            if (mf.cmp(A.price, !side, C.price)) {
                [C, B] = [B, A].map((item) => mf.cloneDeep(item));
                A = { time: { t, d, i }, price: top };
                S = mf.cloneDeep(A);
                side = !side;
            } else B = { time: { t, d, i }, price: top };
        }
        if (mf.cmp(bottom, !side, A.price, true)) {
            A = { time: { t, d, i }, price: bottom };
            S = mf.cloneDeep(A);
        }
        if (mf.cmp(top, side, S.price)) S = { time: { t, d, i }, price: top };
        //
        if (C.time.i > A.time.i && mf.cmp(C.price, side, A.price)) {
            const bc = mf.fmtNum(B.price - C.price, 1, true);
            if (bc >= scanThreshold) {
                if (A.time.i - S.time.i >= C.time.i - B.time.i) break;
                const as = mf.fmtNum(A.price - S.price, 1, true);
                if (as > bc) break;
            }
        }
    }
    delete A.time.i;
    delete B.time.i;
    delete C.time.i;
    return { A, B, C };
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
        target: [[x, X], [y, Y], [z, Z], [t, T]],
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
    //
    option.point = "T";
    option.price = mf.fmtNum(t);
    option.title = `T ${mf.fmtNum(T)}`;
    option.color = "#FF7F00";
    option.draggable = false;
    lines[option.point] = series.pattern.createPriceLine(option);
}
function refresh(autoAdjust = false) {
    if (mf.isSet(lines.X)) {
        if (autoAdjust) adjustPatternPoints();
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
    emit("setPatternOrder", result.order);
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
        end: { time: Math.min(pickTime ?? B.time.t, B.time.t) },
    });
    const phase2 = scanPhase({
        side: !side,
        start: B,
        end: { time: Math.min(pickTime ?? C.time.t, C.time.t) },
    });
    const stopTime = props.indexToTime(
        6 * phase2.R.time.i - 5 * phase1.S.time.i
    );
    const phase3 = scanPhase({
        side,
        start: C,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak1 =
        (phase3.ext.pr < phase3.pr ||
            phase3.ext.tr < phaseThreshold * phase3.tr) &&
        (phase3.ext.tr < phase3.tr ||
            phase3.ext.pr < phaseThreshold * phase3.pr);

    const D = isBreak1 ? phase3.R1 : phase3.ext.R;
    const E = isBreak1 ? phase3.S1 : phase3.ext.S;
    const phase4 = scanPhase({
        side: !side,
        start: D,
        end: { time: Math.min(pickTime ?? E.time.t, E.time.t) },
    });
    const phase5 = scanPhase({
        side,
        start: E,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak2 =
        (phase5.ext.pr < phase5.pr ||
            phase5.ext.tr < phaseThreshold * phase5.tr) &&
        (phase5.ext.tr < phase5.tr ||
            phase5.ext.pr < phaseThreshold * phase5.pr);

    const F = isBreak2 ? phase5.R1 : phase5.ext.R;
    const G = isBreak2 ? phase5.S1 : phase5.ext.S;
    const phase6 = scanPhase({
        side: !side,
        start: F,
        end: { time: Math.min(pickTime ?? G.time.t, G.time.t) },
    });
    const phase7 = scanPhase({
        side,
        start: G,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak3 =
        (phase7.ext.pr < phase7.pr ||
            phase7.ext.tr < phaseThreshold * phase7.tr) &&
        (phase7.ext.tr < phase7.tr ||
            phase7.ext.pr < phaseThreshold * phase7.pr);

    const H = isBreak3 ? phase7.R1 : phase7.ext.R;

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
    const CCs = mf.fmtNum(phase2.R.price1 - C.price, 1, true);
    const DE = mf.fmtNum(E.price - D.price, 1, true);
    const EF = mf.fmtNum(F.price - E.price, 1, true);
    const EEs = mf.fmtNum(phase4.R.price1 - E.price, 1, true);
    const FG = mf.fmtNum(G.price - F.price, 1, true);
    const EG = mf.fmtNum(G.price - E.price, 1, true);

    const TR3 = isBreak1 ? phase3.pre.tr : phase3.tr;
    const TR5 = isBreak2 ? phase5.pre.tr : phase5.tr;

    const T1 = phase1.R.time.i + phase1.tr;
    const T2 = phase2.R.time.i + phase2.tr;
    const T3 = D.time.i + TR3;
    const T4 = E.time.i + phase4.tr;
    const T5 = F.time.i + TR5;
    const T6 = G.time.i + phase6.tr;
    const timeMark = [T6, T5, T4, T3, T2, T1];

    const rABC = BC / AB;
    const rBCD = CD / BC;
    const rBCCs = CCs / BC;
    const rCDE = DE / CD;
    const rDEF = EF / DE;
    const rDEEs = EEs / DE;
    const rEFG = FG / EF;
    const rDEG = EG / DE;

    let progress = {};
    progress.steps = [
        [
            //
            phase2.R.time1.i > T1,
            BC >= phase1.pr,
            rABC >= 0.3,
            rBCCs < 0.5,
        ],
        [
            //
            D.time1.i > T2,
            rBCD >= 0.5,
            CD <= AB,
            D.price !== F.price,
        ],
        [
            //
            E.time1.i > T3,
            rCDE >= 0.5,
            rCDE >= 1.25 - rBCD,
            DE <= BC,
            rDEEs < 0.5,
            rDEF >= 0.5,
            rDEG <= 0.5,
        ],
        [
            //
            F.time1.i > T4,
            rDEF >= 0.5,
            EF <= CD,
        ],
        [
            //
            G.time1.i > T5,
            rEFG >= 0.5,
            rEFG >= 1.25 - rDEF,
            FG <= DE,
        ],
    ];
    let tempResult = [];
    for (let i = 0; i < progress.steps.length; i++) {
        const result = progress.steps[i].every(Boolean);
        tempResult.push(result);
        if (!result) {
            progress.step = i + 1;
            progress.result = false;
            break;
        }
    }
    if (tempResult[4]) {
        progress.step = 5;
        progress.result = true;
    } else if (tempResult[2]) {
        progress.step = 3;
        progress.result = true;
    }
    //
    const points = [
        { time: A.time.t, value: A.price, color: colorMap.yellow },
        {
            time: phase1.R.time1.t,
            value: phase1.R.price,
            color: colorMap.orange,
        },
        { time: phase2.R.time1.t, value: phase2.R.price, color: colorMap.red },
        { time: D.time1.t, value: D.price, color: colorMap.pink },
        { time: E.time1.t, value: E.price, color: colorMap.purple },
        { time: F.time1.t, value: F.price, color: colorMap.cyan },
        { time: G.time1.t, value: G.price, color: colorMap.green },
        { time: H.time1.t, value: H.price },
    ];
    //
    const refPrice = D.price;
    const [x] = adjustTargetPrice(D.price, CD, side);
    const X = mf.fmtNum(x - refPrice, 1);
    const [y] = adjustTargetPrice(D.price, 2 * CD, side);
    const Y = mf.fmtNum(y - refPrice, 1);
    const z = B.price + (side ? 1 : -1) * BC;
    const Z = mf.fmtNum(z - refPrice, 1);
    const t = (F.price + G.price) / 2;
    const T = mf.fmtNum(t - refPrice, 1);
    //
    const dBreak = mf.cmp(F.price, side, D.price);
    const entry = dBreak ? F.price : D.price;
    const tp = Z < X ? x : Z > Y ? y : z;
    const sl = dBreak ? G.price : E.price;
    let order = {};
    if (progress.result) {
        order = {
            side: x > entry ? 1 : -1,
            price: entry,
            tpPrice: tp,
            slPrice: sl,
        };
        console.log("order", order);
    }

    return {
        timeMark,
        progress,
        order,
        points: makeUnique(points),
        target: [
            [x, X],
            [y, Y],
            [z, Z],
            [t, T],
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
        end: { time: Math.min(pickTime ?? B.time.t, B.time.t) },
    });
    const stopTime = props.indexToTime(
        6 * phase1.R.time.i - 5 * phase1.S.time.i
    );
    const phase2 = scanPhase({
        side,
        start: B,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak1 =
        (phase2.ext.pr < phase2.pr ||
            phase2.ext.tr < phaseThreshold * phase2.tr) &&
        (phase2.ext.tr < phase2.tr ||
            phase2.ext.pr < phaseThreshold * phase2.pr);

    const C = isBreak1 ? phase2.R1 : phase2.ext.R;
    const D = isBreak1 ? phase2.S1 : phase2.ext.S;

    const phase3 = scanPhase({
        side: !side,
        start: C,
        end: { time: Math.min(pickTime ?? D.time.t, D.time.t) },
    });

    const phase4 = scanPhase({
        side,
        start: D,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak2 =
        (phase4.ext.pr < phase4.pr ||
            phase4.ext.tr < phaseThreshold * phase4.tr) &&
        (phase4.ext.tr < phase4.tr ||
            phase4.ext.pr < phaseThreshold * phase4.pr);

    const E = isBreak2 ? phase4.R1 : phase4.ext.R;
    const F = isBreak2 ? phase4.S1 : phase4.ext.S;

    const phase5 = scanPhase({
        side: !side,
        start: E,
        end: { time: Math.min(pickTime ?? F.time.t, F.time.t) },
    });

    const phase6 = scanPhase({
        side,
        start: F,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak3 =
        (phase6.ext.pr < phase6.pr ||
            phase6.ext.tr < phaseThreshold * phase6.tr) &&
        (phase6.ext.tr < phase6.tr ||
            phase6.ext.pr < phaseThreshold * phase6.pr);

    const G = isBreak3 ? phase6.R1 : phase6.ext.R;

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
    const DDs = mf.fmtNum(phase3.R.price1 - D.price, 1, true);
    const EF = mf.fmtNum(F.price - E.price, 1, true);
    const DF = mf.fmtNum(F.price - D.price, 1, true);

    const TR2 = isBreak1 ? phase2.pre.tr : phase2.tr;
    const TR4 = isBreak2 ? phase4.pre.tr : phase4.tr;

    const T1 = phase1.R.time.i + phase1.tr;
    const T2 = C.time.i + TR2;
    const T3 = D.time.i + phase3.tr;
    const T4 = E.time.i + TR4;
    const T5 = F.time.i + phase5.tr;
    const timeMark = [T5, T4, T3, T2, T1];

    const rABC = BC / AB;
    const rBCD = CD / BC;
    const rCDE = DE / CD;
    const rCDDs = DDs / CD;
    const rDEF = EF / DE;
    const rCDF = DF / CD;

    let progress = {};
    progress.steps = [
        [
            //
            C.time1.i > T1,
            BC >= phase1.pr,
            rABC >= 0.3,
            C.price !== E.price,
        ],
        [
            //
            D.time1.i > T2,
            rBCD >= 0.7,
            CD <= AB,
            rCDDs < 0.5,
            rCDE >= 0.5,
            rCDF <= 0.5,
        ],
        [
            //
            E.time1.i > T3,
            rCDE >= 0.5,
            DE <= BC,
        ],
        [
            //
            F.time1.i > T4,
            rDEF >= 0.5,
            rDEF >= 1.25 - rCDE,
            EF <= CD,
        ],
    ];
    let tempResult = [];
    for (let i = 0; i < progress.steps.length; i++) {
        const result = progress.steps[i].every(Boolean);
        tempResult.push(result);
        if (!result) {
            progress.step = i + 1;
            progress.result = false;
            break;
        }
    }
    if (tempResult[3]) {
        progress.step = 4;
        progress.result = true;
    } else if (tempResult[1]) {
        progress.step = 2;
        progress.result = true;
    }
    //
    const points = [
        { time: A.time.t, value: A.price, color: colorMap.orange },
        { time: phase1.R.time1.t, value: B.price, color: colorMap.red },
        { time: C.time1.t, value: C.price, color: colorMap.pink },
        { time: D.time1.t, value: D.price, color: colorMap.purple },
        { time: E.time1.t, value: E.price, color: colorMap.cyan },
        { time: F.time1.t, value: F.price, color: colorMap.green },
        { time: G.time1.t, value: G.price },
    ];
    //
    const refPrice = C.price;
    const [x] = adjustTargetPrice(C.price, BC, side);
    const X = mf.fmtNum(x - refPrice, 1);
    const [y] = adjustTargetPrice(C.price, 2 * BC, side);
    const Y = mf.fmtNum(y - refPrice, 1);
    const z = A.price;
    const Z = mf.fmtNum(z - refPrice, 1);
    const t = (E.price + F.price) / 2;
    const T = mf.fmtNum(t - refPrice, 1);
    //
    const eBreak = mf.cmp(E.price, side, C.price);
    const entry = eBreak ? E.price : C.price;
    const tp = Z < X ? x : Z > Y ? y : z;
    const sl = eBreak ? F.price : D.price;
    let order = {};
    if (progress.result) {
        order = {
            side: x > entry ? 1 : -1,
            price: entry,
            tpPrice: tp,
            slPrice: sl,
        };
    }

    return {
        timeMark,
        progress,
        order,
        points: makeUnique(points),
        target: [
            [x, X],
            [y, Y],
            [z, Z],
            [t, T],
        ],
    };
}
function scanPhase({ side, start, end }) {
    let S = mf.cloneDeep(start),
        R = {},
        box = {},
        maxBox = {},
        preBox = {},
        extBox = {};
    S.time.i = props.timeToIndex(S.time.t);
    const bars = props.bars.filter((item) => {
        let cond = item.time >= start.time.t;
        if (end.time) cond = cond && item.time <= end.time;
        return cond;
    });
    if (bars.length > 0) {
        bars.every((item, ix) => {
            const high = side ? item.high : item.low;
            const low = side ? item.low : item.high;
            const t = item.time;
            const d = item.date;
            const i = props.timeToIndex(t);
            if (ix === 0 || (start.price && low === start.price)) {
                box = {
                    R: {
                        price: high,
                        price1: high,
                        time: { t, d, i },
                        time1: { t, d, i },
                    },
                    S: {
                        price: high,
                        price1: high,
                        time: { t, d, i },
                        time1: { t, d, i },
                    },
                    pr: 0,
                    tr: 0,
                };
                maxBox = mf.cloneDeep(box);
            }
            if (start.price && mf.cmp(low, !side, start.price)) {
                return false;
            }
            if (end.price && mf.cmp(high, side, end.price)) {
                return false;
            }
            if (mf.cmp(high, side, box.R.price, true)) {
                if (box.pr > 0) {
                    if (
                        (box.pr >= maxBox.pr &&
                            box.tr >= phaseThreshold * maxBox.tr) ||
                        (box.tr >= maxBox.tr &&
                            box.pr >= phaseThreshold * maxBox.pr)
                    ) {
                        preBox = mf.cloneDeep(maxBox);
                        maxBox = mf.cloneDeep(box);
                        if (maxBox.tr < preBox.tr) maxBox.tr = preBox.tr;
                        if (maxBox.pr < preBox.pr) maxBox.pr = preBox.pr;
                    }
                }
                const isREqual = high === box.R.price;
                const price1R = side
                    ? Math.min(box.R.price1, box.S.price)
                    : Math.max(box.R.price1, box.S.price);
                box = {
                    R: {
                        price: high,
                        price1: isREqual ? price1R : high,
                        time: { t, d, i },
                        time1: isREqual ? box.R.time1 : { t, d, i },
                    },
                    S: {
                        price: high,
                        price1: high,
                        time: { t, d, i },
                        time1: { t, d, i },
                    },
                    pr: 0,
                    tr: 0,
                };
            } else {
                if (mf.cmp(low, !side, box.S.price, true)) {
                    box.S.time = { t, d, i };
                    if (low !== box.S.price) {
                        box.S.price = low;
                        box.S.price1 = low;
                        box.S.time1 = { t, d, i };
                        box.pr = mf.fmtNum(box.S.price - box.R.price, 1, true);
                        box.tr = box.S.time1.i - box.R.time.i;
                    }
                } else {
                    if (mf.cmp(high, side, box.S.price1)) {
                        box.S.price1 = high;
                    }
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
        S,
        R,
        S1: maxBox.S,
        R1: maxBox.R,
        tr: maxBox.tr,
        pr: maxBox.pr,
        pre: preBox,
        ext: extBox,
    };
}
function checkPointsValid({ A }) {
    const aTime = A.time.t;
    return aTime >= props.bars[0].time && aTime < props.bars.at(-1).time;
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
    const cIndex = props.bars.findIndex(
        (bar) => bar.time === scanPoints.C.time.t
    );
    let newPoint = mf.cloneDeep(scanPoints.C);
    for (let i = cIndex; i < props.bars.length; i++) {
        const t = props.bars[i].time;
        const d = props.bars[i].date;
        const price = side ? props.bars[i].low : props.bars[i].high;
        if (mf.cmp(price, !side, newPoint.price, true)) {
            newPoint.time = { t, d };
            newPoint.price = price;
        }
    }
    if (newPoint.time.t !== scanPoints.C.time.t) {
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
    emit("setPatternOrder", {});
    series.pattern.setData([]);
}
function removePatternTool() {
    if (mf.isSet(lines.X)) {
        series.pattern.removePriceLine(lines.X);
        series.pattern.removePriceLine(lines.Y);
        series.pattern.removePriceLine(lines.Z);
        series.pattern.removePriceLine(lines.T);
    }
    lines = {};
}
function setTimeMark(data) {
    const colors = [
        colorMap.green,
        colorMap.cyan,
        colorMap.purple,
        colorMap.pink,
        colorMap.red,
        colorMap.orange,
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
