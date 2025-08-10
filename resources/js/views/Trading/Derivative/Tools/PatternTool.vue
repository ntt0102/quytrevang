<template>
    <div class="command" @contextmenu="togglePatternType">
        <DxDropDownButton
            :items="patternTypes"
            :drop-down-options="{
                width: 33,
                wrapperAttr: { class: 'select-pattern-popup' },
                position: {
                    my: 'top left',
                    at: 'top right',
                    of: '.select-pattern',
                },
            }"
            :icon="`far fa-circle-${(
                patternType || 'question'
            ).toLowerCase()} pattern`"
            :hint="$t('trading.derivative.tools.selectPattern')"
            stylingMode="text"
            :showArrowIcon="false"
            :elementAttr="{ class: 'select-pattern' }"
            @item-click="changePatternType"
        />
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
import DxDropDownButton from "devextreme-vue/drop-down-button";
import { ref, inject, computed, watch } from "vue";
import { useStore } from "vuex";
import { formatISO } from "date-fns";

const store = useStore();
const mf = inject("mf");
const mc = inject("mc");
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
const patternTypes = ["C", "R", "K"];
const scanThreshold = 1;
// const trThreshold = 1;
let scanPoints = {};
let lines = {};
let series = {};

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
                const as = mf.fmtNum(A.price - S.price, 1, true);
                if (as > bc) break;
                if (
                    isBoxValid(
                        { pr: as, tr: A.time1.i - S.time.i },
                        { pr: bc, tr: C.time.i - B.time.i }
                    )
                )
                    break;
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
        entry,
        target: [[x, X], [y, Y], [z, Z], [t, T]],
    } = calculatePattern();
    //
    option.point = "O";
    option.price = entry;
    option.title = "O";
    option.color = mc.CHART_COLOR_MAP.cyan;
    option.draggable = false;
    lines[option.point] = series.pattern.createPriceLine(option);
    //
    option.point = "X";
    option.price = x;
    option.title = `X ${X}`;
    option.color = mc.CHART_COLOR_MAP.blue;
    option.draggable = false;
    lines[option.point] = series.pattern.createPriceLine(option);
    //
    option.point = "Y";
    option.price = y;
    option.title = `Y ${Y}`;
    option.color = mc.CHART_COLOR_MAP.purple;
    option.draggable = false;
    lines[option.point] = series.pattern.createPriceLine(option);
    //
    option.point = "Z";
    option.price = z;
    option.title = `Z ${Z}`;
    option.color = mc.CHART_COLOR_MAP.pink;
    option.draggable = false;
    lines[option.point] = series.pattern.createPriceLine(option);
    //
    option.point = "T";
    option.price = t;
    option.title = `T ${T}`;
    option.color = mc.CHART_COLOR_MAP.orange;
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
        case "C":
            result = calcContinuePattern();
            break;
        case "R":
            result = calcReversalPattern();
            break;
        case "K":
            result = calcKathyLienPattern();
            break;
    }
    emit("setProgress", result.progress);
    emit("setPatternOrder", result.order);
    setTimeMark(result.timeMark);
    series.pattern.setData(result.points);
    return result;
}
// function calcContinuePattern() {
//     const { A, B, C } = scanPoints;
//     const bc = B.price - C.price;
//     let side = bc > 0;
//     let pickTime = props.pickTimeToolRef.get();
//     if (pickTime < C.time.t) pickTime = undefined;
//     const phase1 = scanPhase({
//         side,
//         start: A,
//         end: { time: Math.min(pickTime ?? B.time.t, B.time.t), price: B.price },
//     });
//     const phase2 = scanPhase({
//         side: !side,
//         start: B,
//         end: { time: Math.min(pickTime ?? C.time.t, C.time.t), price: C.price },
//     });
//     const stopTime = props.indexToTime(
//         6 * phase2.R.time.i - 5 * phase1.S.time.i
//     );

//     const phase3 = scanPhase({
//         side,
//         start: C,
//         end: { time: pickTime ?? stopTime },
//     });

//     const isBreak1 = isBoxValid(phase3.ext, phase3, true);

//     const D = isBreak1 ? phase3.R1 : phase3.ext.R;
//     const E = isBreak1 ? phase3.S1 : phase3.ext.S;
//     const phase4 = scanPhase({
//         side: !side,
//         start: D,
//         end: { time: Math.min(pickTime ?? E.time.t, E.time.t), price: E.price },
//     });
//     const phase5 = scanPhase({
//         side,
//         start: E,
//         end: { time: pickTime ?? stopTime },
//     });

//     const isBreak2 = isBoxValid(phase5.ext, phase5, true);

//     const F = isBreak2 ? phase5.R1 : phase5.ext.R;
//     const G = isBreak2 ? phase5.S1 : phase5.ext.S;
//     const phase6 = scanPhase({
//         side: !side,
//         start: F,
//         end: { time: Math.min(pickTime ?? G.time.t, G.time.t), price: G.price },
//     });
//     const phase7 = scanPhase({
//         side,
//         start: G,
//         end: { time: pickTime ?? stopTime },
//     });

//     const isBreak3 = isBoxValid(phase7.ext, phase7, true);

//     const H = isBreak3 ? phase7.R1 : phase7.ext.R;

//     console.log("calcContinuePattern", [
//         phase1,
//         phase2,
//         phase3,
//         phase4,
//         phase5,
//         phase6,
//         phase7,
//     ]);

//     const AB = mf.fmtNum(B.price - A.price, 1, true);
//     const BC = mf.fmtNum(bc, 1, true);
//     const BBs = mf.fmtNum(phase1.R.price1 - B.price, 1, true);
//     const CBm = mf.fmtNum(phase2.S1.price - C.price, 1, true);
//     const CD = mf.fmtNum(D.price - C.price, 1, true);
//     const CCs = mf.fmtNum(phase2.R.price1 - C.price, 1, true);
//     const DE = mf.fmtNum(E.price - D.price, 1, true);
//     const EF = mf.fmtNum(F.price - E.price, 1, true);
//     const EEs = mf.fmtNum(phase4.R.price1 - E.price, 1, true);
//     const FG = mf.fmtNum(G.price - F.price, 1, true);
//     const GGs = mf.fmtNum(phase6.R.price1 - G.price, 1, true);

//     const dT1 = phase1.R.time1.i - phase1.S.time.i;
//     const dT2 = phase2.R.time1.i - phase2.S.time.i;
//     const dT3 = D.time1.i - phase3.S.time.i;
//     const dT4 = E.time1.i - D.time.i;
//     const dT5 = F.time1.i - E.time.i;
//     const dT6 = G.time1.i - F.time.i;

//     const TR3 = isBreak1 ? phase3.pre.tr : phase3.tr;
//     const PR3 = isBreak1 ? phase3.pre.pr : phase3.pr;
//     const TR5 = isBreak2 ? phase5.pre.tr : phase5.tr;

//     const T1 = phase1.R.time.i + phase1.tr;
//     const T2 = phase2.R.time.i + phase2.tr;
//     const T3 = D.time.i + TR3;
//     const T4 = E.time.i + phase4.tr;
//     const T5 = F.time.i + TR5;
//     const T6 = G.time.i + phase6.tr;
//     const timeMark = [T6, T5, T4, T3, T2, T1];

//     const rABC = BC / AB;
//     const rBCD = CD / BC;
//     const rBCCs = CCs / BC;
//     const rBCBm = CBm / BC;
//     const rCDE = DE / CD;
//     const rDEF = EF / DE;
//     const rDEEs = EEs / DE;
//     const rEFG = FG / EF;
//     const rFGGs = GGs / FG;

//     const dBreak = mf.cmp(D.price, side, B.price);
//     const fBreak = mf.cmp(F.price, side, D.price);
//     const hBreak = mf.cmp(H.price, side, F.price);

//     const isRedBoxValid = isBoxValid({ tr: TR3, pr: PR3 }, phase1, true);

//     let subPattern;
//     if (dT2 > dT1)
//         subPattern = DE < phase2.pr ? "longOrange" : "confirmLongOrange";
//     else if (!dBreak) {
//         if (dT3 > dT2)
//             subPattern = dT3 >= dT1 - dT2 ? "longRed" : "confirmLongRed";
//         else {
//             subPattern = dT4 > dT3 ? "longPink" : "shortPink";
//         }
//     } else subPattern = dT4 > dT2 ? "twoBase" : "threeBase";

//     let progressSteps;

//     switch (subPattern) {
//         case "longOrange":
//             progressSteps = [
//                 [
//                     // orange
//                     dT2 >= phase1.tr * trThreshold,
//                     BC >= phase1.pr,
//                     rABC <= 0.7,
//                     rBCCs < 0.5,
//                     isBoxValid(phase2, phase1),
//                     phase2.pr > BBs,
//                 ],
//                 [
//                     // red
//                     rBCBm >= 0.5,
//                     dT3 <= phase2.R.time1.i - phase2.S1.time.i,
//                     isRedBoxValid,
//                 ],
//             ];
//             break;

//         case "confirmLongOrange":
//             progressSteps = [
//                 [
//                     // orange
//                     dT2 >= phase1.tr * trThreshold,
//                     BC >= phase1.pr,
//                     rABC <= 0.7,
//                     rBCCs < 0.5,
//                     isBoxValid(phase2, phase1),
//                     phase2.pr > BBs,
//                 ],
//                 [
//                     // red
//                     rBCBm >= 0.5,
//                     dT3 <= phase2.R.time1.i - phase2.S1.time.i,
//                     mf.cmp(D.price, side, phase2.S1.price, true),
//                     isRedBoxValid,
//                 ],
//             ];
//             break;

//         case "longRed":
//             progressSteps = [
//                 [
//                     // orange
//                     dT2 >= phase1.tr * trThreshold,
//                     BC >= phase1.pr,
//                     rBCCs < 0.5,
//                 ],
//                 [
//                     // red
//                     dT3 >= phase2.tr * trThreshold,
//                     CD >= phase2.pr,
//                     rBCD >= 0.7,
//                     TR3 < phase1.tr,
//                     isRedBoxValid,
//                 ],
//                 [
//                     // pink
//                     dT4 >= TR3 * trThreshold,
//                     // DE >= phase3.pr,
//                     rDEEs < 0.5,
//                 ],
//             ];
//             break;

//         case "confirmLongRed":
//             const confirmedLR =
//                 mf.cmp(F.price, side, D.price, true) ||
//                 (rDEF > 0.7 &&
//                     dT6 > dT5 &&
//                     mf.cmp(H.price, side, F.price, true));
//             progressSteps = [
//                 [
//                     // orange
//                     dT2 >= phase1.tr * trThreshold,
//                     BC >= phase1.pr,
//                     rBCCs < 0.5,
//                 ],
//                 [
//                     // red
//                     dT3 >= phase2.tr * trThreshold,
//                     CD >= phase2.pr,
//                     rBCD >= 0.7,
//                     isRedBoxValid,
//                 ],
//                 [
//                     // pink
//                     dT4 >= TR3 * trThreshold,
//                     // DE >= phase3.pr,
//                 ],
//                 [
//                     // purple
//                     confirmedLR,
//                     mf.cmp(F.price, !side, B.price, true),
//                 ],
//             ];
//             break;

//         case "longPink":
//             progressSteps = [
//                 [
//                     // orange
//                     dT2 >= phase1.tr * trThreshold,
//                     BC >= phase1.pr,
//                     rABC >= 0.5,
//                     rBCCs < 0.5,
//                 ],
//                 [
//                     // red
//                     dT3 >= phase2.tr * trThreshold,
//                     CD >= phase2.pr,
//                     CD > CCs,
//                     isRedBoxValid,
//                 ],
//                 [
//                     // pink
//                     dT4 >= TR3 * trThreshold,
//                     rDEEs < 0.5,
//                     // DE >= phase3.pr,
//                 ],
//                 [
//                     // purple
//                     dT5 >= dT1 - dT2 - dT3 - dT4,
//                     mf.cmp(F.price, side, D.price, true),
//                 ],
//                 [
//                     // cyan
//                     FG < DE,
//                     rFGGs < 0.5,
//                 ],
//             ];
//             break;
//         case "shortPink":
//             progressSteps = [
//                 [
//                     // orange
//                     dT2 >= phase1.tr * trThreshold,
//                     BC >= phase1.pr,
//                     rABC >= 0.5,
//                     rBCCs < 0.5,
//                 ],
//                 [
//                     // red
//                     dT3 >= phase2.tr * trThreshold,
//                     CD >= phase2.pr,
//                     CD > CCs,
//                     isRedBoxValid,
//                 ],
//                 [
//                     // pink
//                     dT4 >= TR3 * trThreshold,
//                     // DE >= phase3.pr,
//                     rCDE >= 0.5,
//                     rDEEs < 0.5,
//                 ],
//                 [
//                     // purple
//                     dT5 >= dT1 - dT2 - dT3 - dT4,
//                     mf.cmp(F.price, side, D.price, true),
//                 ],
//                 [
//                     // cyan
//                     FG < DE,
//                     rFGGs < 0.5,
//                 ],
//             ];
//             break;
//         case "twoBase":
//             progressSteps = [
//                 [
//                     // orange
//                     dT2 >= phase1.tr * trThreshold,
//                     BC >= phase1.pr,
//                     rBCCs < 0.5,
//                 ],
//                 [
//                     // red
//                     dT3 >= phase2.tr * trThreshold,
//                     dT3 >= dT1 - dT2,
//                     CD >= phase2.pr,
//                     rBCD < 2,
//                     isRedBoxValid,
//                 ],
//                 [
//                     // pink
//                     dT4 >= TR3 * trThreshold,
//                     // DE >= phase3.pr,
//                     DE >= BC,
//                     dT4 > phase5.R.time1.i - phase5.S.time.i,
//                 ],
//             ];
//             break;
//         case "threeBase":
//             progressSteps = [
//                 [
//                     // orange
//                     dT2 >= phase1.tr * trThreshold,
//                     BC >= phase1.pr,
//                     rBCCs < 0.5,
//                 ],
//                 [
//                     // red
//                     dT3 >= phase2.tr * trThreshold,
//                     dT3 >= dT1 - dT2,
//                     CD >= phase2.pr,
//                     rBCD < 2,
//                     isRedBoxValid,
//                 ],
//                 [
//                     // pink
//                     // DE >= phase3.pr,
//                     DE < BC,
//                 ],
//                 [
//                     // purple
//                     dT5 >= dT3 - dT4,
//                     EF >= phase4.pr,
//                     rDEF < 2,
//                     fBreak,
//                 ],
//                 [
//                     // cyan
//                     // FG >= phase5.pr,
//                     FG < DE,
//                 ],
//             ];
//             break;
//     }

//     const progress = checkProgress(subPattern, progressSteps);
//     //
//     const points = buildViewPoints(
//         [A, phase1.R, phase2.R, D, E, F, G, H],
//         ["yellow", "orange", "red", "pink", "purple", "cyan", "green", "green"]
//     );
//     //
//     const islongOrange = ["longOrange", "confirmLongOrange"].includes(
//         subPattern
//     );
//     const orderSide = side ? 1 : -1;
//     const refPrice = islongOrange
//         ? phase2.S1.price
//         : fBreak
//         ? hBreak
//             ? H.price
//             : F.price
//         : D.price;
//     const entry = mf.fmtNum(refPrice + orderSide * 0.1);
//     const x = adjustTargetPrice(D.price, CD, orderSide);
//     const X = mf.fmtNum(x - entry);
//     const y = adjustTargetPrice(D.price, 2 * CD, orderSide);
//     const Y = mf.fmtNum(y - entry);
//     const z = adjustTargetPrice(D.price, 4 * CD, orderSide);
//     const Z = mf.fmtNum(z - entry);
//     const w = mf.fmtNum(B.price + orderSide * BC);
//     const W = mf.fmtNum(w - entry);
//     const t = mf.fmtNum(
//         (islongOrange || (dBreak && !fBreak)
//             ? D.price + E.price
//             : F.price + G.price) / 2,
//         1
//     );
//     const T = mf.fmtNum(t - entry, 1);
//     //
//     let order = {};
//     if (progress.result) {
//         const tp = islongOrange
//             ? w
//             : mf.cmp(W, !side, X)
//             ? x
//             : mf.cmp(W, side, Y)
//             ? y
//             : w;
//         const sl = islongOrange ? C.price : fBreak ? G.price : E.price;
//         order = {
//             side: orderSide,
//             price: entry,
//             tpPrice: tp,
//             slPrice: mf.fmtNum(sl - orderSide * 0.1),
//         };
//         console.log("order", order);
//     }

//     return {
//         timeMark,
//         progress,
//         order,
//         points: makeUnique(points),
//         entry,
//         target: [
//             [x, X],
//             [y, Y],
//             [z, Z],
//             [w, W],
//             [t, T],
//         ],
//     };
// }
function calcContinuePattern() {
    const { A, B, C } = scanPoints;
    const bc = B.price - C.price;
    let side = bc > 0;
    let pickTime = props.pickTimeToolRef.get();
    if (pickTime < C.time.t) pickTime = undefined;
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
    const I = isBreak3 ? phase7.S1 : phase7.ext.S;

    console.log("calcContinuePattern", [
        phase1,
        phase2,
        phase3,
        phase4,
        phase5,
        phase6,
        phase7,
    ]);

    // const AB = mf.fmtNum(B.price - A.price, 1, true);
    const BC = mf.fmtNum(bc, 1, true);
    // const BBs = mf.fmtNum(phase1.R.price1 - B.price, 1, true);
    // const CBm = mf.fmtNum(phase2.S1.price - C.price, 1, true);
    const CD = mf.fmtNum(D.price - C.price, 1, true);
    // const CCs = mf.fmtNum(phase2.R.price1 - C.price, 1, true);
    const DE = mf.fmtNum(E.price - D.price, 1, true);
    const EF = mf.fmtNum(F.price - E.price, 1, true);
    // const EEs = mf.fmtNum(phase4.R.price1 - E.price, 1, true);
    const FG = mf.fmtNum(G.price - F.price, 1, true);
    // const GGs = mf.fmtNum(phase6.R.price1 - G.price, 1, true);
    const GH = mf.fmtNum(H.price - G.price, 1, true);

    const dT1 = phase1.R.time1.i - phase1.S.time.i;
    const dT2 = phase2.R.time1.i - phase2.S.time.i;
    const dT3 = D.time1.i - phase3.S.time.i;
    const dT4 = E.time1.i - D.time.i;
    const dT5 = F.time1.i - E.time.i;
    const dT6 = G.time1.i - F.time.i;
    const dT7 = H.time1.i - G.time.i;

    const TR3 = isBreak1 ? phase3.pre.tr : phase3.tr;
    const PR3 = isBreak1 ? phase3.pre.pr : phase3.pr;
    const TR5 = isBreak2 ? phase5.pre.tr : phase5.tr;
    const PR5 = isBreak2 ? phase5.pre.pr : phase5.pr;

    // const T1 = phase1.R.time.i + phase1.tr;
    // const T2 = phase2.R.time.i + phase2.tr;
    // const T3 = D.time.i + TR3;
    // const T4 = E.time.i + phase4.tr;
    // const T5 = F.time.i + TR5;
    // const T6 = G.time.i + phase6.tr;

    const T1 = G.time.i + dT1 - dT2 - dT3 - dT4 - dT5 - dT6;
    const T4 = D.time.i + Math.max(phase2.tr, TR3);
    const T6 = F.time.i + Math.max(phase4.tr, TR5);
    const timeMark = [T1, T4, T6];

    // const rABC = BC / AB;
    const rBCD = CD / BC;
    // const rBCCs = CCs / BC;
    // const rBCBm = CBm / BC;
    // const rCDE = DE / CD;
    const rDEF = EF / DE;
    // const rDEEs = EEs / DE;
    // const rEFG = FG / EF;
    // const rFGGs = GGs / FG;

    const dBreak = mf.cmp(D.price, side, B.price);
    const fBreak = mf.cmp(F.price, side, D.price);
    const hBreak = mf.cmp(H.price, side, F.price);

    const purpleConfirmed = (dBreak && fBreak) || !dBreak;
    // mf.cmp(F.price, side, D.price, true) || (!dBreak && !fBreak);
    // (rDEF > 0.5 && dT6 > dT5 && mf.cmp(H.price, side, F.price));
    const cyanConfirmed = hBreak;
    const pinkConfirmed = E.time1.i > T4 || F.time1.i > T4 || H.time1.i > T4;
    const blueConfirmed = G.time1.i > T6 || H.time1.i > T6;

    // let subPattern = "continue";
    // if (dBreak) {
    //     subPattern = isBoxValid(phase4, phase2)
    //         ? "breakout"
    //         : "breakoutConfirm";
    // } else {
    // if (dT2 >= dT1) {
    //     const isOrangeInvalid = isBoxValid(phase2, phase1, true);
    //     subPattern = isOrangeInvalid ? "orangeConfirm" : "orange";
    // } else if (dT3 + dT2 >= dT1) {
    //     const isRedInvalid = isBoxValid({ pr: PR3, tr: TR3 }, phase1);
    //     const isPinkInvalid = isBoxValid({ pr: DE, tr: dT4 }, phase2, true);
    //     const isPinkLong = dT4 >= dT3;
    //     subPattern =
    //         isRedInvalid || isPinkInvalid || isPinkLong ? "redConfirm" : "red";
    // } else if (dT4 + dT3 + dT2 >= dT1) {
    //     subPattern = "pink";
    // } else if (dT5 + dT4 + dT3 + dT2 >= dT1) {
    //     subPattern = "purple";
    // } else if (dT6 + dT5 + dT4 + dT3 + dT2 >= dT1) {
    //     subPattern = "cyan";
    // } else {
    //     subPattern = "green";
    // }
    // }

    const progressSteps = [
        [
            // orange
            isBoxValid({ pr: BC, tr: dT2 }, phase1),
        ],
        [
            // red
            isBoxValid({ pr: CD, tr: dT3 }, phase2),
            rBCD < 2,
        ],
        [
            // pink
            isBoxValid({ pr: DE, tr: dT4 }, { pr: PR3, tr: TR3 }),
            pinkConfirmed,
        ],
        [
            // purple
            isBoxValid({ pr: EF, tr: dT5 }, phase4),
            rDEF >= 0.7,
            purpleConfirmed,
        ],
        [
            // blue
            isBoxValid({ pr: FG, tr: dT6 }, { pr: PR5, tr: TR5 }),
            blueConfirmed,
        ],
        [
            // cyan
            isBoxValid({ pr: GH, tr: dT7 }, phase6),
            dT7 >= dT1 - dT2 - dT3 - dT4 - dT5 - dT6,
            cyanConfirmed,
        ],
    ];

    // switch (subPattern) {
    //     case "continue":
    //         timeMark.push(G.time.i + dT1 - dT2 - dT3 - dT4 - dT5 - dT6);
    //         progressSteps = [
    //             [
    //                 // orange
    //                 isBoxValid({ pr: BC, tr: dT2 }, phase1),
    //             ],
    //             [
    //                 // red
    //                 isBoxValid({ pr: CD, tr: dT3 }, phase2),
    //                 rBCD < 2,
    //             ],
    //             [
    //                 // pink
    //                 isBoxValid({ pr: DE, tr: dT4 }, { pr: PR3, tr: TR3 }),
    //                 pinkConfirmed,
    //             ],
    //             [
    //                 // purple
    //                 isBoxValid({ pr: EF, tr: dT5 }, phase4),
    //                 purpleConfirmed,
    //             ],
    //             [
    //                 // cyan
    //                 isBoxValid({ pr: FG, tr: dT6 }, { pr: PR5, tr: TR5 }),
    //                 cyanConfirmed,
    //             ],
    //             [
    //                 // green
    //                 isBoxValid({ pr: GH, tr: dT7 }, phase6),
    //                 dT7 >= dT1 - dT2 - dT3 - dT4 - dT5 - dT6,
    //                 greenConfirmed,
    //             ],
    //         ];
    //         break;

    //     case "orange":
    //         timeMark.push(phase1.R.time.i + dT1);
    //         progressSteps = [
    //             [
    //                 // orange
    //                 isBoxValid({ pr: BC, tr: dT2 }, phase1),
    //                 rABC <= 0.7,
    //                 isBoxValid(phase2, phase1),
    //                 phase2.pr > BBs,
    //                 rBCBm >= 0.5,
    //             ],
    //             [
    //                 // red
    //                 dT3 < dT2,
    //                 dT3 <= phase2.R.time1.i - phase2.S1.time.i,
    //             ],
    //         ];
    //         break;

    //     case "orangeConfirm":
    //         timeMark.push(phase1.R.time.i + dT1);
    //         progressSteps = [
    //             [
    //                 // orange
    //                 isBoxValid({ pr: BC, tr: dT2 }, phase1),
    //                 rABC <= 0.7,
    //                 isBoxValid(phase2, phase1),
    //                 phase2.pr > BBs,
    //                 rBCBm >= 0.5,
    //             ],
    //             [
    //                 // red
    //                 dT3 < dT2,
    //                 dT3 <= phase2.R.time1.i - phase2.S1.time.i,
    //                 mf.cmp(D.price, side, phase2.S1.price, true),
    //             ],
    //         ];
    //         break;

    //     case "red":
    //         timeMark.push(phase2.R.time.i + dT1 - dT2);
    //         progressSteps = [
    //             [
    //                 // orange
    //                 isBoxValid({ pr: BC, tr: dT2 }, phase1),
    //             ],
    //             [
    //                 // red
    //                 isBoxValid({ pr: CD, tr: dT3 }, phase2),
    //                 rBCD < 2,
    //             ],
    //             [
    //                 // pink
    //                 dT4 < dT3,
    //                 pinkConfirmed,
    //             ],
    //         ];
    //         break;

    //     case "redConfirm":
    //         timeMark.push(phase2.R.time.i + dT1 - dT2);
    //         progressSteps = [
    //             [
    //                 // orange
    //                 isBoxValid({ pr: BC, tr: dT2 }, phase1),
    //             ],
    //             [
    //                 // red
    //                 isBoxValid({ pr: CD, tr: dT3 }, phase2),
    //                 rBCD < 2,
    //             ],
    //             [
    //                 // pink
    //                 pinkConfirmed,
    //             ],
    //             [
    //                 // purple
    //                 purpleConfirmed,
    //             ],
    //             [
    //                 // cyan
    //                 cyanConfirmed,
    //             ],
    //             [
    //                 // green
    //                 greenConfirmed,
    //             ],
    //         ];
    //         break;

    //     case "pink":
    //         timeMark.push(D.time.i + dT1 - dT2 - dT3);
    //         progressSteps = [
    //             [
    //                 // orange
    //                 isBoxValid({ pr: BC, tr: dT2 }, phase1),
    //             ],
    //             [
    //                 // red
    //                 isBoxValid({ pr: CD, tr: dT3 }, phase2),
    //                 rBCD < 2,
    //             ],
    //             [
    //                 // pink
    //                 isBoxValid({ pr: DE, tr: dT4 }, { pr: PR3, tr: TR3 }),
    //                 pinkConfirmed,
    //             ],
    //             [
    //                 // purple
    //                 purpleConfirmed,
    //             ],
    //         ];
    //         break;

    //     case "purple":
    //         timeMark.push(E.time.i + dT1 - dT2 - dT3 - dT4);
    //         progressSteps = [
    //             [
    //                 // orange
    //                 isBoxValid({ pr: BC, tr: dT2 }, phase1),
    //             ],
    //             [
    //                 // red
    //                 isBoxValid({ pr: CD, tr: dT3 }, phase2),
    //                 rBCD < 2,
    //             ],
    //             [
    //                 // pink
    //                 isBoxValid({ pr: DE, tr: dT4 }, { pr: PR3, tr: TR3 }),
    //                 pinkConfirmed,
    //             ],
    //             [
    //                 // purple
    //                 isBoxValid({ pr: EF, tr: dT5 }, phase4),
    //                 purpleConfirmed,
    //             ],
    //             [
    //                 // cyan
    //                 dT6 < dT5,
    //             ],
    //             [
    //                 // green
    //                 greenConfirmed,
    //             ],
    //         ];
    //         break;

    //     case "cyan":
    //         timeMark.push(F.time.i + dT1 - dT2 - dT3 - dT4 - dT5);
    //         progressSteps = [
    //             [
    //                 // orange
    //                 isBoxValid({ pr: BC, tr: dT2 }, phase1),
    //             ],
    //             [
    //                 // red
    //                 isBoxValid({ pr: CD, tr: dT3 }, phase2),
    //                 rBCD < 2,
    //             ],
    //             [
    //                 // pink
    //                 isBoxValid({ pr: DE, tr: dT4 }, { pr: PR3, tr: TR3 }),
    //                 pinkConfirmed,
    //             ],
    //             [
    //                 // purple
    //                 isBoxValid({ pr: EF, tr: dT5 }, phase4),
    //                 purpleConfirmed,
    //             ],
    //             [
    //                 // cyan
    //                 isBoxValid({ pr: FG, tr: dT6 }, { pr: PR5, tr: TR5 }),
    //             ],
    //             [
    //                 // green
    //                 greenConfirmed,
    //             ],
    //         ];
    //         break;

    //     case "green":
    //         timeMark.push(G.time.i + dT1 - dT2 - dT3 - dT4 - dT5 - dT6);
    //         progressSteps = [
    //             [
    //                 // orange
    //                 isBoxValid({ pr: BC, tr: dT2 }, phase1),
    //             ],
    //             [
    //                 // red
    //                 isBoxValid({ pr: CD, tr: dT3 }, phase2),
    //                 rBCD < 2,
    //             ],
    //             [
    //                 // pink
    //                 isBoxValid({ pr: DE, tr: dT4 }, { pr: PR3, tr: TR3 }),
    //                 pinkConfirmed,
    //             ],
    //             [
    //                 // purple
    //                 isBoxValid({ pr: EF, tr: dT5 }, phase4),
    //                 purpleConfirmed,
    //             ],
    //             [
    //                 // cyan
    //                 isBoxValid({ pr: FG, tr: dT6 }, { pr: PR5, tr: TR5 }),
    //             ],
    //             [
    //                 // green
    //                 isBoxValid({ pr: GH, tr: dT7 }, phase6),
    //                 dT7 >= dT1 - dT2 - dT3 - dT4 - dT5 - dT6,
    //                 greenConfirmed,
    //             ],
    //         ];
    //         break;
    // }
    // timeMark.push(T4);
    // timeMark.push(T6);
    const colors = [
        "yellow",
        "orange",
        "red",
        "pink",
        "purple",
        "blue",
        "cyan",
        "green",
        "green",
    ];
    const progress = checkProgress("continue", progressSteps, colors);
    //
    const points = buildViewPoints(
        [A, phase1.R, phase2.R, D, E, F, G, H, I],
        colors
    );
    //
    // const isOrange = ["orange", "orangeConfirm"].includes(subPattern);
    const orderSide = side ? 1 : -1;
    const refPrice = H.price;
    const entry = mf.fmtNum(refPrice + orderSide * 0.1);
    const range = mf.fmtNum((fBreak ? F.price : D.price) - C.price, 1, true);
    const x = adjustTargetPrice(G.price, 0.5 * range, orderSide);
    const X = mf.fmtNum(x - entry);
    const y = adjustTargetPrice(G.price, range, orderSide);
    const Y = mf.fmtNum(y - entry);
    const z = adjustTargetPrice(G.price, 1.5 * range, orderSide);
    const Z = mf.fmtNum(z - entry);
    const t = mf.fmtNum(
        (fBreak
            ? hBreak
                ? H.price + I.price
                : F.price + G.price
            : D.price + E.price) / 2,
        1
    );
    const T = mf.fmtNum(t - entry, 1);
    //
    let order = {};
    if (progress.result) {
        const tp = mf.cmp(H.price, !side, x) ? y : z;
        const sl = G.price;
        order = {
            side: orderSide,
            price: entry,
            tpPrice: tp,
            slPrice: mf.fmtNum(sl - orderSide * 0.1),
        };
        console.log("order", order);
    }

    return {
        timeMark,
        progress,
        order,
        points: makeUnique(points),
        entry,
        target: [
            [x, X],
            [y, Y],
            [z, Z],
            [t, T],
        ],
    };
}
// function calcReversalPattern() {
//     const { A, B } = scanPoints;
//     const ab = A.price - B.price;
//     let side = ab > 0;
//     const pickTime = props.pickTimeToolRef.get();
//     const phase1 = scanPhase({
//         side: !side,
//         start: A,
//         end: { time: Math.min(pickTime ?? B.time.t, B.time.t), price: B.price },
//     });
//     const stopTime = props.indexToTime(
//         6 * phase1.R.time.i - 5 * phase1.S.time.i
//     );
//     const phase2 = scanPhase({
//         side,
//         start: { time: B.time },
//         end: { time: pickTime ?? stopTime },
//     });

//     const isBreak1 = isBoxValid(phase2.ext, phase2, true);

//     const C = isBreak1 ? phase2.R1 : phase2.ext.R;
//     const D = isBreak1 ? phase2.S1 : phase2.ext.S;

//     const phase3 = scanPhase({
//         side: !side,
//         start: C,
//         end: { time: Math.min(pickTime ?? D.time.t, D.time.t), price: D.price },
//     });

//     const phase4 = scanPhase({
//         side,
//         start: D,
//         end: { time: pickTime ?? stopTime },
//     });

//     const isBreak2 = isBoxValid(phase4.ext, phase4, true);

//     const E = isBreak2 ? phase4.R1 : phase4.ext.R;
//     const F = isBreak2 ? phase4.S1 : phase4.ext.S;

//     const phase5 = scanPhase({
//         side: !side,
//         start: E,
//         end: { time: Math.min(pickTime ?? F.time.t, F.time.t), price: F.price },
//     });

//     const phase6 = scanPhase({
//         side,
//         start: F,
//         end: { time: pickTime ?? stopTime },
//     });

//     const isBreak3 = isBoxValid(phase6.ext, phase6, true);

//     const G = isBreak3 ? phase6.R1 : phase6.ext.R;

//     console.log("calcReversalPattern", [
//         phase1,
//         phase2,
//         phase3,
//         phase4,
//         phase5,
//         phase6,
//     ]);

//     const AB = mf.fmtNum(ab, 1, true);
//     const BC = mf.fmtNum(C.price - B.price, 1, true);
//     const CD = mf.fmtNum(D.price - C.price, 1, true);
//     const DE = mf.fmtNum(E.price - D.price, 1, true);
//     const DDs = mf.fmtNum(phase3.R.price1 - D.price, 1, true);
//     const EF = mf.fmtNum(F.price - E.price, 1, true);
//     const FFs = mf.fmtNum(phase5.R.price1 - F.price, 1, true);

//     const dT1 = phase1.R.time1.i - phase1.S.time.i;
//     const dT2 = C.time1.i - phase2.S.time.i;
//     const dT3 = D.time1.i - C.time.i;
//     const dT4 = E.time1.i - D.time.i;
//     const dT5 = F.time1.i - E.time.i;

//     const TR2 = isBreak1 ? phase2.pre.tr : phase2.tr;
//     const TR4 = isBreak2 ? phase4.pre.tr : phase4.tr;

//     const T1 = phase1.R.time.i + phase1.tr;
//     const T2 = C.time.i + TR2;
//     const T3 = D.time.i + phase3.tr;
//     const T4 = E.time.i + TR4;
//     const T5 = F.time.i + phase5.tr;
//     const timeMark = [T5, T4, T3, T2, T1];

//     const rABC = BC / AB;
//     const rBCD = CD / BC;
//     const rCDE = DE / CD;
//     const rCDDs = DDs / CD;
//     const rDEF = EF / DE;
//     const rEFFs = FFs / EF;

//     const dBreak = mf.cmp(D.price, !side, B.price);
//     const eBreak = mf.cmp(E.price, side, C.price);
//     const gBreak = mf.cmp(G.price, side, E.price);

//     const confirmed =
//         eBreak || (rCDE > 0.7 && dT5 > dT4 && mf.cmp(G.price, side, E.price));

//     let subPattern;
//     if (dT2 > dT1) subPattern = !dBreak ? "longRed" : "shakeLongRed";
//     else if (!dBreak) subPattern = dT3 > dT2 ? "longPink" : "shortPink";
//     else subPattern = dT4 > dT3 ? "shakeLongPurple" : "shakeShortPurple";

//     let progressSteps;
//     switch (subPattern) {
//         case "longRed":
//             progressSteps = [
//                 [
//                     // red
//                     dT2 >= phase1.tr * trThreshold,
//                     BC >= phase1.pr,
//                 ],
//                 [
//                     // purple
//                     confirmed,
//                 ],
//                 [
//                     // cyan
//                     EF < CD,
//                     rEFFs < 0.5,
//                 ],
//             ];
//             break;
//         case "shakeLongRed":
//             progressSteps = [
//                 [
//                     // red
//                     dT2 >= phase1.tr * trThreshold,
//                     BC >= phase1.pr,
//                 ],
//                 [
//                     // pink
//                     rBCD < 1.5,
//                     rCDDs < 0.5,
//                 ],
//                 [
//                     // purple
//                     confirmed,
//                 ],
//                 [
//                     // cyan
//                     EF < CD,
//                     rEFFs < 0.5,
//                 ],
//             ];
//             break;
//         case "longPink":
//             progressSteps = [
//                 [
//                     // red
//                     dT2 >= phase1.tr * trThreshold,
//                     BC >= phase1.pr,
//                 ],
//                 [
//                     // pink
//                     dT3 >= TR2 * trThreshold,
//                     CD >= phase2.pr,
//                     rCDDs < 0.5,
//                 ],
//                 [
//                     // purple
//                     confirmed,
//                 ],
//                 [
//                     // cyan
//                     EF < CD,
//                     rEFFs < 0.5,
//                 ],
//             ];
//             break;
//         case "shortPink":
//             progressSteps = [
//                 [
//                     // red
//                     dT2 >= phase1.tr * trThreshold,
//                     BC >= phase1.pr,
//                 ],
//                 [
//                     // pink
//                     dT3 >= TR2 * trThreshold,
//                     CD >= phase2.pr,
//                     rBCD >= 0.7,
//                     rCDDs < 0.5,
//                 ],
//                 [
//                     // purple
//                     dT4 >= dT2 - dT3,
//                     confirmed,
//                 ],
//                 [
//                     // cyan
//                     EF < CD,
//                     rEFFs < 0.5,
//                 ],
//             ];
//             break;
//         case "shakeLongPurple":
//             progressSteps = [
//                 [
//                     // red
//                     dT2 >= phase1.tr * trThreshold,
//                     BC >= phase1.pr,
//                 ],
//                 [
//                     // pink
//                     dT3 >= TR2 * trThreshold,
//                     CD >= phase2.pr,
//                     rBCD < 1.5,
//                     rCDDs < 0.5,
//                 ],
//                 [
//                     // purple
//                     rCDE >= 0.7,
//                 ],
//             ];
//             break;
//         case "shakeShortPurple":
//             progressSteps = [
//                 [
//                     // red
//                     dT2 >= phase1.tr * trThreshold,
//                     BC >= phase1.pr,
//                 ],
//                 [
//                     // pink
//                     dT3 >= TR2 * trThreshold,
//                     CD >= phase2.pr,
//                     rBCD < 1.5,
//                     rCDDs < 0.5,
//                 ],
//                 [
//                     // purple
//                     confirmed,
//                 ],
//                 [
//                     // cyan
//                     EF < CD,
//                     rEFFs < 0.5,
//                 ],
//             ];
//             break;
//     }

//     const progress = checkProgress(subPattern, progressSteps);
//     //
//     const points = buildViewPoints(
//         [A, phase1.R, C, D, E, F, G],
//         ["orange", "red", "pink", "purple", "cyan", "green", "green"]
//     );
//     //
//     const orderSide = side ? 1 : -1;
//     const refPrice = gBreak ? G.price : E.price;
//     const entry = mf.fmtNum(refPrice + orderSide * 0.1);
//     const x = adjustTargetPrice(C.price, CD, orderSide);
//     const X = mf.fmtNum(x - entry);
//     const y = adjustTargetPrice(C.price, 2 * CD, orderSide);
//     const Y = mf.fmtNum(y - entry);
//     const z = adjustTargetPrice(C.price, 4 * CD, orderSide);
//     const Z = mf.fmtNum(z - entry);
//     const w = mf.fmtNum(C.price + orderSide * BC);
//     const W = mf.fmtNum(w - entry);
//     const t = mf.fmtNum((E.price + F.price) / 2);
//     const T = mf.fmtNum(t - entry);
//     //
//     let order = {};
//     if (progress.result) {
//         const tp = mf.cmp(W, !side, X) ? x : mf.cmp(W, side, Y) ? y : w;
//         const sl = dBreak ? B.price : D.price;
//         order = {
//             side: orderSide,
//             price: entry,
//             tpPrice: tp,
//             slPrice: mf.fmtNum(sl - orderSide * 0.1),
//         };
//         console.log("order", order);
//     }

//     return {
//         timeMark,
//         progress,
//         order,
//         points: makeUnique(points),
//         entry,
//         target: [
//             [x, X],
//             [y, Y],
//             [z, Z],
//             [w, W],
//             [t, T],
//         ],
//     };
// }
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
        start: { time: B.time },
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
    const H = isBreak3 ? phase6.S1 : phase6.ext.S;

    console.log("calcReversalPattern", [
        phase1,
        phase2,
        phase3,
        phase4,
        phase5,
        phase6,
    ]);

    // const AB = mf.fmtNum(ab, 1, true);
    const BC = mf.fmtNum(C.price - B.price, 1, true);
    const CD = mf.fmtNum(D.price - C.price, 1, true);
    const DE = mf.fmtNum(E.price - D.price, 1, true);
    // const DDs = mf.fmtNum(phase3.R.price1 - D.price, 1, true);
    const EF = mf.fmtNum(F.price - E.price, 1, true);
    // const FFs = mf.fmtNum(phase5.R.price1 - F.price, 1, true);
    const FG = mf.fmtNum(G.price - F.price, 1, true);
    // const GH = mf.fmtNum(H.price - G.price, 1, true);

    const dT1 = phase1.R.time1.i - phase1.S.time.i;
    const dT2 = C.time1.i - phase2.S.time.i;
    const dT3 = D.time1.i - C.time.i;
    const dT4 = E.time1.i - D.time.i;
    const dT5 = F.time1.i - E.time.i;
    const dT6 = G.time1.i - F.time.i;

    const TR2 = isBreak1 ? phase2.pre.tr : phase2.tr;
    const PR2 = isBreak1 ? phase2.pre.pr : phase2.pr;
    const TR4 = isBreak2 ? phase4.pre.tr : phase4.tr;
    const PR4 = isBreak2 ? phase4.pre.pr : phase4.pr;

    // const T1 = phase1.R.time.i + phase1.tr;
    // const T2 = C.time.i + TR2;
    // const T3 = D.time.i + phase3.tr;
    // const T4 = E.time.i + TR4;
    // const T5 = F.time.i + phase5.tr;
    // const timeMark = [T5, T4, T3, T2, T1];

    const T1 = F.time.i + dT1 - dT2 - dT3 - dT4 - dT5;
    const T3 = C.time.i + Math.max(phase1.tr, TR2);
    const T5 = E.time.i + Math.max(phase3.tr, TR4);
    const timeMark = [T1, T3, T5];

    // const rABC = BC / AB;
    const rBCD = CD / BC;
    const rCDE = DE / CD;
    // const rCDDs = DDs / CD;
    // const rDEF = EF / DE;
    // const rEFFs = FFs / EF;

    // const dBreak = mf.cmp(D.price, !side, B.price);
    const eBreak = mf.cmp(E.price, side, C.price);
    const gBreak = mf.cmp(G.price, side, E.price);

    const purpleConfirmed =
        mf.cmp(E.price, side, C.price, true) ||
        (rCDE > 0.7 && dT5 > dT4 && mf.cmp(G.price, side, E.price));
    const cyanConfirmed = mf.cmp(G.price, side, E.price);
    const pinkConfirmed = D.time1.i > T3 || E.time1.i > T3 || G.time1.i > T3;
    const blueConfirmed = F.time1.i > T5 || G.time1.i > T5;

    // let subPattern;

    // if (dT2 >= dT1) {
    //     subPattern = "red";
    // } else if (dT3 + dT2 >= dT1) {
    //     subPattern = "pink";
    // } else if (dT4 + dT3 + dT2 >= dT1) {
    //     subPattern = "purple";
    // } else if (dT5 + dT4 + dT3 + dT2 >= dT1) {
    //     subPattern = "cyan";
    // } else {
    //     subPattern = "green";
    // }

    const progressSteps = [
        [
            // red
            isBoxValid({ pr: BC, tr: dT2 }, phase1),
        ],
        [
            // pink
            isBoxValid({ pr: CD, tr: dT3 }, { pr: PR2, tr: TR2 }),
            rBCD < 1.5,
            pinkConfirmed,
        ],
        [
            // purple
            isBoxValid({ pr: DE, tr: dT4 }, phase3),
            rCDE >= 0.7,
            purpleConfirmed,
        ],
        [
            // blue
            isBoxValid({ pr: EF, tr: dT5 }, { pr: PR4, tr: TR4 }),
            blueConfirmed,
        ],
        [
            // cyan
            isBoxValid({ pr: FG, tr: dT6 }, phase5),
            dT6 >= dT1 - dT2 - dT3 - dT4 - dT5,
            cyanConfirmed,
        ],
    ];

    // switch (subPattern) {
    //     case "red":
    //         timeMark.push(phase1.R.time.i + dT1);
    //         progressSteps = [
    //             [
    //                 // red
    //                 isBoxValid({ pr: BC, tr: dT2 }, phase1),
    //             ],
    //             [
    //                 // pink
    //                 rBCD < 1.5,
    //                 dT3 < dT2,
    //                 pinkConfirmed,
    //             ],
    //         ];
    //         break;

    //     case "pink":
    //         timeMark.push(C.time.i + dT1 - dT2);
    //         progressSteps = [
    //             [
    //                 // red
    //                 isBoxValid({ pr: BC, tr: dT2 }, phase1),
    //             ],
    //             [
    //                 // pink
    //                 isBoxValid({ pr: CD, tr: dT3 }, { pr: PR2, tr: TR2 }),
    //                 rBCD < 1.5,
    //                 pinkConfirmed,
    //             ],
    //             [
    //                 // purple
    //                 purpleConfirmed,
    //             ],
    //         ];
    //         break;

    //     case "purple":
    //         timeMark.push(D.time.i + dT1 - dT2 - dT3);
    //         progressSteps = [
    //             [
    //                 // red
    //                 isBoxValid({ pr: BC, tr: dT2 }, phase1),
    //             ],
    //             [
    //                 // pink
    //                 isBoxValid({ pr: CD, tr: dT3 }, { pr: PR2, tr: TR2 }),
    //                 rBCD < 1.5,
    //                 pinkConfirmed,
    //             ],
    //             [
    //                 // purple
    //                 isBoxValid({ pr: DE, tr: dT4 }, phase3),
    //                 purpleConfirmed,
    //             ],
    //             [
    //                 // cyan
    //                 dT5 < dT4,
    //             ],
    //             [
    //                 // green
    //                 greenConfirmed,
    //             ],
    //         ];
    //         break;

    //     case "cyan":
    //         timeMark.push(E.time.i + dT1 - dT2 - dT3 - dT4);
    //         progressSteps = [
    //             [
    //                 // red
    //                 isBoxValid({ pr: BC, tr: dT2 }, phase1),
    //             ],
    //             [
    //                 // pink
    //                 isBoxValid({ pr: CD, tr: dT3 }, { pr: PR2, tr: TR2 }),
    //                 rBCD < 1.5,
    //                 pinkConfirmed,
    //             ],
    //             [
    //                 // purple
    //                 isBoxValid({ pr: DE, tr: dT4 }, phase3),
    //                 purpleConfirmed,
    //             ],
    //             [
    //                 // cyan
    //                 isBoxValid({ pr: EF, tr: dT5 }, { pr: PR4, tr: TR4 }),
    //             ],
    //             [
    //                 // green
    //                 greenConfirmed,
    //             ],
    //         ];
    //         break;

    //     case "green":
    //         timeMark.push(F.time.i + dT1 - dT2 - dT3 - dT4 - dT5);
    //         progressSteps = [
    //             [
    //                 // red
    //                 isBoxValid({ pr: BC, tr: dT2 }, phase1),
    //             ],
    //             [
    //                 // pink
    //                 isBoxValid({ pr: CD, tr: dT3 }, { pr: PR2, tr: TR2 }),
    //                 rBCD < 1.5,
    //                 pinkConfirmed,
    //             ],
    //             [
    //                 // purple
    //                 isBoxValid({ pr: DE, tr: dT4 }, phase3),
    //                 purpleConfirmed,
    //             ],
    //             [
    //                 // cyan
    //                 isBoxValid({ pr: EF, tr: dT5 }, { pr: PR4, tr: TR4 }),
    //                 cyanConfirmed,
    //             ],
    //             [
    //                 // green
    //                 isBoxValid({ pr: FG, tr: dT6 }, phase5),
    //                 dT6 >= dT1 - dT2 - dT3 - dT4 - dT5,
    //                 greenConfirmed,
    //             ],
    //         ];
    //         break;
    //     // case "red":
    //     //     progressSteps = [
    //     //         [
    //     //             // red
    //     //             dT2 >= phase1.tr * trThreshold,
    //     //             BC >= phase1.pr,
    //     //         ],
    //     //         [
    //     //             // pink
    //     //             rBCD < 1.5,
    //     //             // rCDDs < 0.5,
    //     //         ],
    //     //         [
    //     //             // purple
    //     //             confirmed,
    //     //         ],
    //     //         [
    //     //             // cyan
    //     //             EF < CD,
    //     //             rEFFs < 0.5,
    //     //         ],
    //     //     ];
    //     //     break;

    //     // case "purple":
    //     //     progressSteps = [
    //     //         [
    //     //             // red
    //     //             dT2 >= phase1.tr * trThreshold,
    //     //             BC >= phase1.pr,
    //     //         ],
    //     //         [
    //     //             // pink
    //     //             rBCD < 1.5,
    //     //             // rCDDs < 0.5,
    //     //             isBoxValid(phase3, phase1),
    //     //         ],
    //     //         [
    //     //             // purple
    //     //             dT4 >= dT1 - dT2 - dT3,
    //     //             confirmed,
    //     //         ],
    //     //         [
    //     //             // cyan
    //     //             EF < CD,
    //     //             rEFFs < 0.5,
    //     //         ],
    //     //     ];
    //     //     break;
    // }
    // timeMark.push(T3);
    // timeMark.push(T5);
    const colors = [
        "orange",
        "red",
        "pink",
        "purple",
        "blue",
        "cyan",
        "green",
        "green",
    ];
    const progress = checkProgress("reversal", progressSteps, colors);
    //
    const points = buildViewPoints([A, phase1.R, C, D, E, F, G, H], colors);
    //
    const orderSide = side ? 1 : -1;
    const refPrice = G.price;
    const entry = mf.fmtNum(refPrice + orderSide * 0.1);
    const range = mf.fmtNum((eBreak ? E.price : C.price) - D.price, 1, true);
    const x = adjustTargetPrice(F.price, 0.5 * range, orderSide);
    const X = mf.fmtNum(x - entry);
    const y = adjustTargetPrice(F.price, range, orderSide);
    const Y = mf.fmtNum(y - entry);
    const z = adjustTargetPrice(F.price, 1.5 * range, orderSide);
    const Z = mf.fmtNum(z - entry);
    const t = mf.fmtNum(
        (eBreak
            ? gBreak
                ? G.price + H.price
                : E.price + F.price
            : C.price + D.price) / 2
    );
    const T = mf.fmtNum(t - entry);
    //
    let order = {};
    if (progress.result) {
        const tp = mf.cmp(G.price, !side, x) ? y : z;
        const sl = F.price;
        order = {
            side: orderSide,
            price: entry,
            tpPrice: tp,
            slPrice: mf.fmtNum(sl - orderSide * 0.1),
        };
        console.log("order", order);
    }

    return {
        timeMark,
        progress,
        order,
        points: makeUnique(points),
        entry,
        target: [
            [x, X],
            [y, Y],
            [z, Z],
            [t, T],
        ],
    };
}
function calcKathyLienPattern() {
    const { A, B, C } = scanPoints;
    const ab = A.price - B.price;
    let side = ab > 0;
    const phase1 = scanPhase({
        side: !side,
        start: A,
        end: { time: B.time.t },
    });
    const phase2 = scanPhase({
        side,
        start: { time: B.time },
        end: { time: C.time.t },
    });

    console.log("calcKathyLienPattern", [phase1, phase2]);

    const AB = mf.fmtNum(ab, 1, true);
    const BC = mf.fmtNum(C.price - B.price, 1, true);

    const dT1 = phase1.R.time1.i - phase1.S.time.i;
    const dT2 = phase2.R.time1.i - phase2.S.time.i;

    const T1 = B.time.i + dT1;
    const timeMark = [T1];

    const rABC = BC / AB;

    const progressSteps = [
        [
            // green
            // isBoxValid({ pr: BC, tr: dT2 }, phase1),
            rABC > 0.75,
        ],
    ];
    const colors = ["orange", "red", "red"];
    const progress = checkProgress("kathylien", progressSteps, colors);
    //
    const points = buildViewPoints([A, phase1.R, C], colors);
    //
    const orderSide = side ? 1 : -1;
    const refPrice = B.price;
    const entry = refPrice;
    const range = BC;
    const x = B.price + orderSide * 0.5 * range;
    const X = mf.fmtNum(x - entry);
    const y = B.price - orderSide * 0.5 * range;
    const Y = mf.fmtNum(y - entry);
    const z = B.price - orderSide * range;
    const Z = mf.fmtNum(z - entry);
    const t = C.price;
    const T = mf.fmtNum(t - entry);
    //
    let order = {};
    if (progress.result) {
        const tp = x;
        const sl = z;
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
        entry,
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
                        // price1: top,
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
                        // price1: top,
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
                        // box.S.price1 = bottom;
                        box.S.time1 = { t, d, i };
                        box.pr = mf.fmtNum(box.S.price - box.R.price, 1, true);
                        box.tr = box.S.time1.i - box.R.time.i;
                    }
                }
                // else {
                //     if (mf.cmp(top, side, box.S.price1)) {
                //         box.S.price1 = top;
                //     }
                // }
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
    const score = mf.fmtNum(
        0.7 * (box1.pr / box2.pr) + 0.3 * (box1.tr / box2.tr),
        2
    );
    return isNot ? score < 1.0 : score >= 1.0;
    // const check =
    //     (box1.tr >= box2.tr && box1.pr >= 0.8 * box2.pr) ||
    //     (box1.pr >= box2.pr && box1.tr >= 0.8 * box2.tr) ||
    //     (box1.pr >= 1.25 * box2.pr && box1.tr >= 0.6 * box2.tr) ||
    //     (box1.pr >= 1.5 * box2.pr && box1.tr >= 0.4 * box2.tr) ||
    //     box1.pr >= 2 * box2.pr;
    // return isNot ? !check : check;
}
function buildViewPoints(points, colors) {
    const viewPoints = [];
    points.forEach((p, idx) => {
        const point = {
            value: p.price,
            color: mc.CHART_COLOR_MAP[colors[idx]],
        };
        if (idx !== 0) {
            viewPoints.push({ ...point, time: p.time1.t });
        }
        if (idx !== points.length - 1) {
            viewPoints.push({ ...point, time: p.time.t });
        }
    });
    return viewPoints;
}
function checkProgress(subPattern, steps, colors) {
    let progress = {
        pattern: patternType.value,
        subPattern,
        steps,
        step: 0,
        result: true,
    };
    progress.steps.map((step, idx) => {
        if (progress.result) {
            progress.step = idx + 1;
            progress.result = step.every(Boolean);
        }
        return step;
    });
    progress.color = progress.result ? "green" : colors[progress.step];
    return progress;
}
function isTimeInChart(time) {
    if (!props.bars.length) return false;
    const first = props.bars[0]?.time;
    const last = props.bars.at(-1)?.time;
    if (typeof first !== "number" || typeof last !== "number") return false;
    return time >= first && time <= last;
}
function adjustTargetPrice(price, range, side) {
    const target = price + range;
    let decimal = mf.fmtNum(target % 1);
    let adjusted = target;
    if (side > 0) {
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
    return mf.fmtNum(adjusted);
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
        series.pattern.removePriceLine(lines.O);
        series.pattern.removePriceLine(lines.X);
        series.pattern.removePriceLine(lines.Y);
        series.pattern.removePriceLine(lines.Z);
        series.pattern.removePriceLine(lines.T);
    }
    lines = {};
}
function setTimeMark(data) {
    const colors = [
        mc.CHART_COLOR_MAP[patternType.value === "C" ? "yellow" : "orange"],
        mc.CHART_COLOR_MAP.pink,
        mc.CHART_COLOR_MAP.blue,
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
    store
        .dispatch("tradingDerivative/setPatternType", itemData)
        .then((isOk) => {
            if (isOk) {
                refresh();
            }
        });
}
function togglePatternType() {
    const nextType =
        patternType.value === patternTypes[0]
            ? patternTypes[1]
            : patternTypes[0];
    store
        .dispatch("tradingDerivative/setPatternType", nextType)
        .then((isOk) => {
            if (isOk) {
                refresh();
            }
        });
}
</script>
<style lang="scss">
.select-pattern {
    width: 100% !important;
    height: 100% !important;

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
