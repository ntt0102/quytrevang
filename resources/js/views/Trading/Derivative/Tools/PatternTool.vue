<template>
    <DxDropDownButton
        :items="patternTypes"
        :drop-down-options="{
            wrapperAttr: { class: 'select-pattern-popup' },
            position: {
                my: 'top left',
                at: 'top right',
                of: '.select-pattern',
            },
        }"
        :icon="`far fa-${
            patternType ? `square-${patternType}` : 'square-question'
        } pattern`"
        :hint="$t('trading.derivative.tools.selectPattern')"
        stylingMode="text"
        :showArrowIcon="false"
        :elementAttr="{ class: 'select-pattern command' }"
        @item-click="changePatternType"
    />
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
import DxDropDownButton from "devextreme-vue/drop-down-button";
import { ref, inject, computed, watch } from "vue";
import { useStore } from "vuex";
import { formatISO } from "date-fns";

const store = useStore();
const mf = inject("mf");
const props = defineProps([
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
const patternTypes = [1, 2, 3, 4];
const scanThreshold = 1;
const trThreshold = 0.7;
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
    refresh,
    remove,
});
watch(patternStore, (data) => {
    setTimeout(() => {
        load(data, { isCheck: true });
    }, 0);
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
        const time = { t, d, i };
        if (ix === data.length - 1) {
            start = { time, high, low };
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
                time1: start.time,
                time: start.time,
                price: side ? start.low : start.high,
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
                A = { time1: time, time, price: top };
                S = mf.cloneDeep(A);
                side = !side;
            } else B = { time1: time, time, price: top };
        }
        if (mf.cmp(bottom, !side, A.price, true)) {
            if (bottom === A.price) {
                A.time1 = time;
            } else {
                A = { time1: time, time, price: bottom };
            }
            S = { time: A.time1, price: A.price };
        }
        if (mf.cmp(top, side, S.price)) S = { time, price: top };
        //
        if (C.time.i > A.time.i && mf.cmp(C.price, side, A.price)) {
            const bc = mf.fmtNum(B.price - C.price, 1, true);
            if (bc >= scanThreshold) {
                if (A.time1.i - S.time.i >= C.time.i - B.time.i) break;
                const as = mf.fmtNum(A.price - S.price, 1, true);
                if (as > bc) break;
            }
        }
    }
    delete A.time1;
    delete A.time.i;
    delete B.time.i;
    delete C.time.i;
    return { A, B, C };
}
function load(data, { isSave = false, isCheck = false } = {}) {
    if (!mf.isSet(data)) return false;
    scanPoints = mf.cloneDeep(data);
    if (isSave) savePattern();
    const isLoad = isCheck ? isTimeInChart(scanPoints.A.time.t) : true;
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
        case 3:
            result = calcContinueLitePattern();
            break;
        case 4:
            result = calcReversalLitePattern();
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
        end: { time: Math.min(pickTime ?? B.time.t, B.time.t), price: B.price },
    });
    const phase2 = scanPhase({
        side: !side,
        start: B,
        end: { time: Math.min(pickTime ?? C.time.t, C.time.t), price: C.price },
    });
    const stopTime = props.indexToTime(
        6 * phase2.R.time.i - 5 * phase1.S.time.i
    );
    const phase3 = scanPhase({
        side,
        start: C,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak1 = isBoxValid(phase3.ext, phase3, true);

    const D = isBreak1 ? phase3.R1 : phase3.ext.R;
    const E = isBreak1 ? phase3.S1 : phase3.ext.S;
    const phase4 = scanPhase({
        side: !side,
        start: D,
        end: { time: Math.min(pickTime ?? E.time.t, E.time.t), price: E.price },
    });
    const phase5 = scanPhase({
        side,
        start: E,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak2 = isBoxValid(phase5.ext, phase5, true);

    const F = isBreak2 ? phase5.R1 : phase5.ext.R;
    const G = isBreak2 ? phase5.S1 : phase5.ext.S;
    const phase6 = scanPhase({
        side: !side,
        start: F,
        end: { time: Math.min(pickTime ?? G.time.t, G.time.t), price: G.price },
    });
    const phase7 = scanPhase({
        side,
        start: G,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak3 = isBoxValid(phase7.ext, phase7, true);

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

    const dT2 = phase2.R.time1.i - phase1.R.time.i;
    const dT3 = D.time1.i - phase2.R.time.i;
    const dT4 = E.time1.i - D.time.i;
    const dT6 = G.time1.i - F.time.i;

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

    const dBreak = mf.cmp(D.price, side, B.price);
    const fBreak = mf.cmp(F.price, side, D.price);

    const progressSteps = [
        {
            conds: [
                //
                phase2.R.time1.i > T1,
                BC >= phase1.pr,
                rABC >= 0.3,
                rABC <= 0.7,
                rBCCs < 0.5,
            ],
            excludes: [],
        },
        {
            conds: [
                //
                D.time1.i > T2,
                CD >= phase2.pr,
                rBCD >= 0.5,
                CD <= AB,
                dBreak,
                isTimeNotEqual(dT2, dT3),
            ],
            excludes: [4],
        },
        {
            conds: [
                //
                E.time1.i > T3,
                DE >= phase3.pr,
                rCDE >= 0.5,
                rCDE >= 1.25 - rBCD,
                DE <= BC,
                rDEEs < 0.5,
            ],
            excludes: [1, 4],
        },
        {
            conds: [
                //
                F.time1.i > T4,
                EF >= phase4.pr,
                rDEF >= 0.5,
                EF <= CD,
                fBreak,
                F.price !== D.price,
            ],
            excludes: [3],
        },
        {
            conds: [
                //
                G.time1.i > T5,
                FG >= phase5.pr,
                rEFG >= 0.5,
                rEFG >= 1.25 - rDEF,
                dT6 <= dT4,
                FG <= DE,
            ],
            excludes: [],
        },
    ];
    if (!(dBreak && fBreak)) {
        progressSteps[0].excludes.push(3);
        progressSteps[4].excludes.push(5);
    }
    if (!(dBreak && DE <= BC)) {
        progressSteps[3].excludes.push(4);
    }
    if (rDEF >= 0.5) {
        progressSteps[3].excludes.push(0);
    }
    if (F.time1.i > T4) {
        progressSteps[3].excludes.push(2);
    }
    if (rEFG >= 0.5) {
        progressSteps[4].excludes.push(0);
    }
    if (G.time1.i > T5) {
        progressSteps[4].excludes.push(2);
    }

    const progress = checkProgress(progressSteps);
    //
    const points = buildViewPoints(
        [A, phase1.R, phase2.R, D, E, F, G, H],
        ["yellow", "orange", "red", "pink", "purple", "cyan", "green", "green"]
    );
    //
    const orderSide = side ? 1 : -1;
    const refPrice = fBreak ? F.price : D.price;
    const entry = mf.fmtNum(refPrice + orderSide * 0.1, 1);
    const [x] = adjustTargetPrice(D.price, CD, side);
    const X = mf.fmtNum(x - entry, 1);
    const [y] = adjustTargetPrice(D.price, 2 * CD, side);
    const Y = mf.fmtNum(y - entry, 1);
    const z = B.price + (side ? 1 : -1) * BC;
    const Z = mf.fmtNum(z - entry, 1);
    const t = (dBreak && !fBreak ? D.price + E.price : F.price + G.price) / 2;
    const T = mf.fmtNum(t - entry, 1);
    //
    const tp = mf.cmp(Z, !side, X) ? x : mf.cmp(Z, side, Y) ? y : z;
    const sl = fBreak ? G.price : E.price;
    let order = {};
    if (progress.result) {
        order = {
            side: orderSide,
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
        end: { time: Math.min(pickTime ?? B.time.t, B.time.t), price: B.price },
    });
    const stopTime = props.indexToTime(
        6 * phase1.R.time.i - 5 * phase1.S.time.i
    );
    const phase2 = scanPhase({
        side,
        start: B,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak1 = isBoxValid(phase2.ext, phase2, true);

    const C = isBreak1 ? phase2.R1 : phase2.ext.R;
    const D = isBreak1 ? phase2.S1 : phase2.ext.S;

    const phase3 = scanPhase({
        side: !side,
        start: C,
        end: { time: Math.min(pickTime ?? D.time.t, D.time.t), price: D.price },
    });

    const phase4 = scanPhase({
        side,
        start: D,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak2 = isBoxValid(phase4.ext, phase4, true);

    const E = isBreak2 ? phase4.R1 : phase4.ext.R;
    const F = isBreak2 ? phase4.S1 : phase4.ext.S;

    const phase5 = scanPhase({
        side: !side,
        start: E,
        end: { time: Math.min(pickTime ?? F.time.t, F.time.t), price: F.price },
    });

    const phase6 = scanPhase({
        side,
        start: F,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak3 = isBoxValid(phase6.ext, phase6, true);

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

    const dT2 = C.time1.i - phase1.R.time.i;
    const dT3 = D.time1.i - C.time.i;
    const dT5 = F.time1.i - E.time.i;

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

    const eBreak = mf.cmp(E.price, side, C.price);
    const progressSteps = [
        {
            conds: [
                //
                C.time1.i > T1,
                BC >= phase1.pr,
                rABC >= 0.3,
                rABC <= 0.7,
            ],
            excludes: [],
        },
        {
            conds: [
                //
                D.time1.i > T2,
                CD >= phase2.pr,
                rBCD >= 0.7,
                CD <= AB,
                rCDDs < 0.5,
                isTimeNotEqual(dT2, dT3),
            ],
            excludes: [1],
        },
        {
            conds: [
                //
                E.time1.i > T3,
                DE >= phase3.pr,
                rCDE >= 0.5,
                DE <= BC,
                E.price !== C.price,
            ],
            excludes: [3],
        },
        {
            conds: [
                //
                F.time1.i > T4,
                EF >= phase4.pr,
                rDEF >= 0.5,
                rDEF >= 1.25 - rCDE,
                dT5 <= dT3,
                EF <= CD,
            ],
            excludes: [],
        },
    ];
    if (rCDE >= 0.5) {
        progressSteps[2].excludes.push(0);
    }
    if (E.time1.i > T3) {
        progressSteps[2].excludes.push(2);
    }
    if (rDEF >= 0.5) {
        progressSteps[3].excludes.push(0);
    }
    if (F.time1.i > T4) {
        progressSteps[3].excludes.push(2);
    }
    const progress = checkProgress(progressSteps);
    //
    const points = buildViewPoints(
        [A, phase1.R, C, D, E, F, G],
        ["orange", "red", "pink", "purple", "cyan", "green", "green"]
    );
    //
    const orderSide = side ? 1 : -1;
    const refPrice = eBreak ? E.price : C.price;
    const entry = mf.fmtNum(refPrice + orderSide * 0.1, 1);
    const [x] = adjustTargetPrice(C.price, BC, side);
    const X = mf.fmtNum(x - entry, 1);
    const [y] = adjustTargetPrice(C.price, 2 * BC, side);
    const Y = mf.fmtNum(y - entry, 1);
    const z = A.price;
    const Z = mf.fmtNum(z - entry, 1);
    const t = (E.price + F.price) / 2;
    const T = mf.fmtNum(t - entry, 1);
    //
    const tp = mf.cmp(Z, !side, X) ? x : mf.cmp(Z, side, Y) ? y : z;
    const sl = eBreak ? F.price : D.price;
    let order = {};
    if (progress.result) {
        order = {
            side: orderSide,
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
function calcContinueLitePattern() {
    const { A, B, C } = scanPoints;
    const bc = B.price - C.price;
    let side = bc > 0;
    const pickTime = props.pickTimeToolRef.get();
    const phase1 = scanPhase({
        side,
        start: A,
        end: { time: Math.min(pickTime ?? B.time.t, B.time.t), price: B.price },
    });
    const phase2 = scanPhase({
        side: !side,
        start: B,
        end: { time: Math.min(pickTime ?? C.time.t, C.time.t), price: C.price },
    });
    const stopTime = props.indexToTime(
        6 * phase2.R.time.i - 5 * phase1.S.time.i
    );
    const phase3 = scanPhase({
        side,
        start: C,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak1 = isBoxValid(phase3.ext, phase3, true);

    const D = isBreak1 ? phase3.R1 : phase3.ext.R;
    const E = isBreak1 ? phase3.S1 : phase3.ext.S;
    const phase4 = scanPhase({
        side: !side,
        start: D,
        end: { time: Math.min(pickTime ?? E.time.t, E.time.t), price: E.price },
    });
    const phase5 = scanPhase({
        side,
        start: E,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak2 = isBoxValid(phase5.ext, phase5, true);

    const F = isBreak2 ? phase5.R1 : phase5.ext.R;
    const G = isBreak2 ? phase5.S1 : phase5.ext.S;
    const phase6 = scanPhase({
        side: !side,
        start: F,
        end: { time: Math.min(pickTime ?? G.time.t, G.time.t), price: G.price },
    });
    const phase7 = scanPhase({
        side,
        start: G,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak3 = isBoxValid(phase7.ext, phase7, true);

    const H = isBreak3 ? phase7.R1 : phase7.ext.R;

    console.log("calcContinueLitePattern", [
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

    const dT1 = phase1.R.time1.i - phase1.S.time.i;
    const dT2 = phase2.R.time1.i - phase2.S.time.i;
    const dT3 = D.time1.i - phase3.S.time.i;
    const dT4 = E.time1.i - D.time.i;
    const dT5 = F.time1.i - E.time.i;
    const dT6 = G.time1.i - F.time.i;

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

    const dBreak = mf.cmp(D.price, side, B.price);
    const fBreak = mf.cmp(F.price, side, D.price);

    const progressSteps = [
        {
            conds: [
                //
                dT2 >= phase1.tr / trThreshold,
                BC >= phase1.pr,
                isTimeNotEqual(dT1, dT2),
                dT2 > dT1,
            ],
            excludes: [2, 3],
        },
        {
            conds: [
                //
                dT3 >= phase2.tr / trThreshold,
                CD >= phase2.pr,
                rBCD >= 0.5,
                rBCD >= 0.75,
                isTimeNotEqual(dT2, dT3),
                dT3 > dT2,
            ],
            excludes: [],
        },
        {
            conds: [
                //
                dT4 >= TR3 / trThreshold,
                DE >= phase3.pr,
                rCDE >= 0.75,
                isTimeNotEqual(dT3, dT4),
            ],
            excludes: [],
        },
        {
            conds: [
                //
                dT5 >= phase4.tr / trThreshold,
                EF >= phase4.pr,
                isTimeNotEqual(dT4, dT5),
                fBreak,
            ],
            excludes: [0],
        },
        {
            conds: [
                //
                dT6 >= TR5 / trThreshold,
                FG >= phase5.pr,
                isTimeNotEqual(dT5, dT6),
            ],
            excludes: [0],
        },
    ];
    if (dT2 > dT1 || fBreak) {
        progressSteps[1].excludes.push(3, 5);
    }
    if (dT2 > dT1 || (rBCD >= 0.75 && dT3 > dT2)) {
        progressSteps[2].excludes.push(2);
        progressSteps[3].excludes.push(3);
    }
    const progress = checkProgress(progressSteps);
    //
    const points = buildViewPoints(
        [A, phase1.R, phase2.R, D, E, F, G, H],
        ["yellow", "orange", "red", "pink", "purple", "cyan", "green", "green"]
    );
    //
    const orderSide = side ? 1 : -1;
    const refPrice = fBreak ? F.price : D.price;
    const entry = mf.fmtNum(refPrice + orderSide * 0.1, 1);
    const [x] = adjustTargetPrice(D.price, CD, side);
    const X = mf.fmtNum(x - entry, 1);
    const [y] = adjustTargetPrice(D.price, 2 * CD, side);
    const Y = mf.fmtNum(y - entry, 1);
    const z = B.price + (side ? 1 : -1) * BC;
    const Z = mf.fmtNum(z - entry, 1);
    const t = (dBreak && !fBreak ? D.price + E.price : F.price + G.price) / 2;
    const T = mf.fmtNum(t - entry, 1);
    //
    const tp = mf.cmp(Z, !side, X) ? x : mf.cmp(Z, side, Y) ? y : z;
    const sl = fBreak ? G.price : E.price;
    let order = {};
    if (progress.result) {
        order = {
            side: orderSide,
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
function calcReversalLitePattern() {
    const { A, B } = scanPoints;
    const ab = A.price - B.price;
    let side = ab > 0;
    const pickTime = props.pickTimeToolRef.get();
    const phase1 = scanPhase({
        side: !side,
        start: A,
        end: { time: Math.min(pickTime ?? B.time.t, B.time.t), price: B.price },
    });
    const stopTime = props.indexToTime(
        6 * phase1.R.time.i - 5 * phase1.S.time.i
    );
    const phase2 = scanPhase({
        side,
        start: B,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak1 = isBoxValid(phase2.ext, phase2, true);

    const C = isBreak1 ? phase2.R1 : phase2.ext.R;
    const D = isBreak1 ? phase2.S1 : phase2.ext.S;

    const phase3 = scanPhase({
        side: !side,
        start: C,
        end: { time: Math.min(pickTime ?? D.time.t, D.time.t), price: D.price },
    });

    const phase4 = scanPhase({
        side,
        start: D,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak2 = isBoxValid(phase4.ext, phase4, true);

    const E = isBreak2 ? phase4.R1 : phase4.ext.R;
    const F = isBreak2 ? phase4.S1 : phase4.ext.S;

    const phase5 = scanPhase({
        side: !side,
        start: E,
        end: { time: Math.min(pickTime ?? F.time.t, F.time.t), price: F.price },
    });

    const phase6 = scanPhase({
        side,
        start: F,
        end: { time: pickTime ?? stopTime },
    });

    const isBreak3 = isBoxValid(phase6.ext, phase6, true);

    const G = isBreak3 ? phase6.R1 : phase6.ext.R;

    console.log("calcReversalLitePattern", [
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

    const dT1 = phase1.R.time1.i - phase1.S.time.i;
    const dT2 = C.time1.i - phase2.S.time.i;
    const dT3 = D.time1.i - C.time.i;
    const dT4 = E.time1.i - D.time.i;
    const dT5 = F.time1.i - E.time.i;

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

    console.log("dT3", dT3);
    console.log("phase2.tr", phase2.tr);

    const eBreak = mf.cmp(E.price, side, C.price);
    const progressSteps = [
        {
            conds: [
                //
                dT2 >= phase1.tr / trThreshold,
                BC >= phase1.pr,
                isTimeNotEqual(dT1, dT2),
            ],
            excludes: [2],
        },
        {
            conds: [
                //
                dT3 >= TR2 / trThreshold,
                CD >= phase2.pr,
                rBCD >= 0.5,
                isTimeNotEqual(dT2, dT3),
            ],
            excludes: [],
        },
        {
            conds: [
                //
                dT4 >= phase3.tr / trThreshold,
                DE >= phase3.pr,
                isTimeNotEqual(dT3, dT4),
                dT4 > dT3,
            ],
            excludes: [0, 3],
        },
        {
            conds: [
                //
                dT5 >= TR4 / trThreshold,
                EF >= phase4.pr,
                isTimeNotEqual(dT4, dT5),
            ],
            excludes: [0],
        },
    ];

    const progress = checkProgress(progressSteps);
    //
    const points = buildViewPoints(
        [A, phase1.R, C, D, E, F, G],
        ["orange", "red", "pink", "purple", "cyan", "green", "green"]
    );
    //
    const orderSide = side ? 1 : -1;
    const refPrice = eBreak ? E.price : C.price;
    const entry = mf.fmtNum(refPrice + orderSide * 0.1, 1);
    const [x] = adjustTargetPrice(C.price, BC, side);
    const X = mf.fmtNum(x - entry, 1);
    const [y] = adjustTargetPrice(C.price, 2 * BC, side);
    const Y = mf.fmtNum(y - entry, 1);
    const z = A.price;
    const Z = mf.fmtNum(z - entry, 1);
    const t = (E.price + F.price) / 2;
    const T = mf.fmtNum(t - entry, 1);
    //
    const tp = mf.cmp(Z, !side, X) ? x : mf.cmp(Z, side, Y) ? y : z;
    const sl = eBreak ? F.price : D.price;
    let order = {};
    if (progress.result) {
        order = {
            side: orderSide,
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
            const top = side ? item.high : item.low;
            const bottom = side ? item.low : item.high;
            const t = item.time;
            const d = item.date;
            const i = props.timeToIndex(t);
            if (ix === 0 || (start.price && bottom === start.price)) {
                box = {
                    R: {
                        price: top,
                        price1: top,
                        time: { t, d, i },
                        time1: { t, d, i },
                    },
                    S: {
                        price: top,
                        price1: top,
                        time: { t, d, i },
                        time1: { t, d, i },
                    },
                    pr: 0,
                    tr: 0,
                };
                maxBox = mf.cloneDeep(box);
            }
            if (start.price && mf.cmp(bottom, !side, start.price)) {
                return false;
            }
            if (end.price && mf.cmp(top, side, end.price)) {
                return false;
            }
            if (mf.cmp(top, side, box.R.price, true)) {
                if (box.pr > 0 && (!end.price || top !== end.price)) {
                    if (isBoxValid(box, maxBox)) {
                        preBox = mf.cloneDeep(maxBox);
                        maxBox = mf.cloneDeep(box);
                        if (maxBox.tr < preBox.tr) maxBox.tr = preBox.tr;
                        if (maxBox.pr < preBox.pr) maxBox.pr = preBox.pr;
                    }
                }
                const isREqual = top === box.R.price;
                const price1R = side
                    ? Math.min(box.R.price1, box.S.price)
                    : Math.max(box.R.price1, box.S.price);
                box = {
                    R: {
                        price: top,
                        price1: isREqual ? price1R : top,
                        time: { t, d, i },
                        time1: isREqual ? box.R.time1 : { t, d, i },
                    },
                    S: {
                        price: top,
                        price1: top,
                        time: { t, d, i },
                        time1: { t, d, i },
                    },
                    pr: 0,
                    tr: 0,
                };
            } else {
                if (mf.cmp(bottom, !side, box.S.price, true)) {
                    box.S.time = { t, d, i };
                    if (bottom !== box.S.price) {
                        box.S.price = bottom;
                        box.S.price1 = bottom;
                        box.S.time1 = { t, d, i };
                        box.pr = mf.fmtNum(box.S.price - box.R.price, 1, true);
                        box.tr = box.S.time1.i - box.R.time.i;
                    }
                } else {
                    if (mf.cmp(top, side, box.S.price1)) {
                        box.S.price1 = top;
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
function isBoxValid(box1, box2, isNot = false) {
    const check =
        (box1.pr >= box2.pr && box1.tr >= 0.8 * box2.tr) ||
        (box1.tr >= box2.tr && box1.pr >= 0.8 * box2.pr) ||
        box1.pr >= 2 * box2.pr;
    return isNot ? !check : check;
}
function buildViewPoints(points, colors) {
    const viewPoints = [];
    points.forEach((p, idx) => {
        const point = {
            value: p.price,
            color: colorMap[colors[idx]],
        };
        if (idx !== 0) {
            viewPoints.push({ ...point, time: p.time1.t });
        }
        viewPoints.push({ ...point, time: p.time.t });
    });
    return viewPoints;
}
function checkProgress(steps) {
    let progress = { steps, step: 0, result: true };
    progress.steps.map((step, idx) => {
        step.result = isStepValid(step);
        if (progress.result) {
            progress.step = idx + 1;
            progress.result = step.result;
        }
        return step;
    });
    return progress;
}
function isStepValid({ conds, excludes }) {
    return conds.every((val, idx) => (excludes.includes(idx) ? true : val));
}
function isTimeInChart(time) {
    if (!props.bars.length) return false;
    const first = props.bars[0]?.time;
    const last = props.bars.at(-1)?.time;
    if (typeof first !== "number" || typeof last !== "number") return false;
    return time >= first && time <= last;
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
    if (adjusted !== target) {
        adjusted = mf.fmtNum(adjusted, 1);
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
function changePatternType({ itemData }) {
    console.log("changePatternType", itemData);
    store
        .dispatch("tradingDerivative/setPatternType", itemData)
        .then((isOk) => {
            if (isOk) {
                refresh();
            }
        });
}
function isTimeNotEqual(a, b, threshold = 0.8) {
    const minVal = Math.min(a, b);
    const maxVal = Math.max(a, b);
    if (maxVal === 0) return true;
    const ratio = minVal / maxVal;
    console.log("isTimeNotEqual", ratio);
    return ratio <= threshold;
}
</script>
<style lang="scss">
.select-pattern {
    .dx-button-content {
        padding: 5px !important;
        .pattern {
            color: #bbbbbb !important;
            font-size: 17px !important;
        }
    }
}
.select-pattern-popup {
    .dx-list-item-content {
        line-height: 8px !important;
        padding: 10px !important;
    }
}
</style>
