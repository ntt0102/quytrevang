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
const patternTypes = ["C", "V", "R", "S"];
const scanThreshold = 1;
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
            if (C.time.i - B.time.i > 50) {
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
function refresh(autoAdjust = false) {
    if (mf.isSet(lines.X)) {
        if (autoAdjust) adjustPatternPoints();
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
        target: { x, y, z, w, t },
    } = calculatePattern();
    //
    option.point = "O";
    option.price = entry;
    option.title = "O";
    option.color = mc.CHART_COLOR_MAP.cyan;
    option.draggable = false;
    lines[option.point] = series.pattern.createPriceLine(option);
    //
    if (mf.isSet(x)) {
        option.point = "X";
        option.price = x[0];
        option.title = `X ${x[1]}`;
        option.color = mc.CHART_COLOR_MAP.blue;
        option.draggable = false;
        lines[option.point] = series.pattern.createPriceLine(option);
    }
    //
    if (mf.isSet(y)) {
        option.point = "Y";
        option.price = y[0];
        option.title = `Y ${y[1]}`;
        option.color = mc.CHART_COLOR_MAP.purple;
        option.draggable = false;
        lines[option.point] = series.pattern.createPriceLine(option);
    }
    //
    if (mf.isSet(z)) {
        option.point = "Z";
        option.price = z[0];
        option.title = `Z ${z[1]}`;
        option.color = mc.CHART_COLOR_MAP.pink;
        option.draggable = false;
        lines[option.point] = series.pattern.createPriceLine(option);
    }
    //
    if (mf.isSet(w)) {
        option.point = "W";
        option.price = w[0];
        option.title = `W ${w[1]}`;
        option.color = mc.CHART_COLOR_MAP.lime;
        option.draggable = false;
        lines[option.point] = series.pattern.createPriceLine(option);
    }
    //
    if (mf.isSet(t)) {
        option.point = "T";
        option.price = t[0];
        option.title = `T ${t[1]}`;
        option.color = mc.CHART_COLOR_MAP.orange;
        option.draggable = false;
        lines[option.point] = series.pattern.createPriceLine(option);
    }
}
function calculatePattern() {
    let result = {};
    switch (patternType.value) {
        case "C":
            result = calcContinuePattern();
            break;
        case "V":
            result = calcVlinePattern();
            break;
        case "R":
            result = calcReversalPattern();
            break;
        case "S":
            result = calcSidewayPattern();
            break;
    }
    emit("setProgress", result.progress);
    emit("setPatternOrder", result.order);
    setTimeMark(result.timeMark);
    series.pattern.setData(result.points);
    return result;
}

function calcContinuePattern() {
    const { A: P1, B: P2, C: P3 } = scanPoints;
    const bc = P2.price - P3.price;
    let side = bc > 0;
    let pickTime = props.pickTimeToolRef.get();
    if (pickTime < P3.time.t) pickTime = undefined;
    const phase1 = scanPhase({
        side,
        start: P1,
        end: { time: P2.time, price: P2.price },
    });
    const A = phase1.S;
    const B = phase1.R;
    const dT1 = B.time1.i - A.time.i;
    const stopTime = props.indexToTime(B.time.i + 3 * dT1);
    const phase2 = scanPhase({
        side: !side,
        start: B,
        end: { time: P3.time, price: P3.price },
    });
    const C = phase2.R;
    const phase3 = scanPhase({
        side,
        start: { time: C.time },
        end: { time: { t: pickTime ?? stopTime } },
    });

    const isBreak1 = isBoxValid(phase3.ext, phase3, true);

    const D = isBreak1 ? phase3.R1 : phase3.ext.R;
    const E = isBreak1 ? phase3.S1 : phase3.ext.S;
    const phase4 = scanPhase({
        side: !side,
        start: D,
        end: {
            time: { t: Math.min(pickTime ?? E.time.t, E.time.t) },
            price: E.price,
        },
    });
    const phase5 = scanPhase({
        side,
        start: E,
        end: { time: { t: pickTime ?? stopTime } },
    });

    const isBreak2 = isBoxValid(phase5.ext, phase5, true);

    const F = isBreak2 ? phase5.R1 : phase5.ext.R;
    const G = isBreak2 ? phase5.S1 : phase5.ext.S;
    const phase6 = scanPhase({
        side: !side,
        start: F,
        end: {
            time: { t: Math.min(pickTime ?? G.time.t, G.time.t) },
            price: G.price,
        },
    });
    const phase7 = scanPhase({
        side,
        start: G,
        end: { time: { t: pickTime ?? stopTime } },
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
    const CD = mf.fmtNum(D.price - C.price, 1, true);
    const DE = mf.fmtNum(E.price - D.price, 1, true);
    const EF = mf.fmtNum(F.price - E.price, 1, true);
    const FG = mf.fmtNum(G.price - F.price, 1, true);
    const GH = mf.fmtNum(H.price - G.price, 1, true);

    const dT2 = C.time1.i - B.time.i;
    const dT3 = D.time1.i - C.time.i;
    const dT4 = E.time1.i - D.time.i;
    const dT5 = F.time1.i - E.time.i;
    const dT6 = G.time1.i - F.time.i;
    const dT7 = H.time1.i - G.time.i;

    const TR3 = isBreak1 ? phase3.pre.tr : phase3.tr;
    const PR3 = isBreak1 ? phase3.pre.pr : phase3.pr;
    const TR5 = isBreak2 ? phase5.pre.tr : phase5.tr;
    const PR5 = isBreak2 ? phase5.pre.pr : phase5.pr;

    const T1 = H.time.i + dT1 - dT2 - dT3 - dT4 - dT5 - dT6 - dT7;
    const T2 = C.time.i + dT2;
    const T3 = F.time.i + dT3 - dT4 - dT5;
    const T4 = H.time.i + dT5 - dT6 - dT7;
    const timeMark = {
        times: [T1, T2, T3, T4],
        colors: ["yellow", "red", "purple", "cyan"],
    };

    // const rABC = BC / AB;
    const rBCD = CD / BC;
    const rCDE = DE / CD;
    const rDEF = EF / DE;
    // const rEFG = FG / EF;
    // const rFGH = GH / FG;

    const dBreak = mf.cmp(D.price, side, B.price);
    // const eBreak = mf.cmp(E.price, !side, C.price);
    const fBreak = mf.cmp(F.price, side, D.price);
    const hBreak = mf.cmp(H.price, side, F.price);

    // const redConfirmed =
    //     (dBreak && rBCD <= 2) ||
    //     (rBCD >= 0.5 && dT5 + dT4 > dT3) ||
    //     (eBreak && !dBreak && rBCD >= 0.7);
    // const pinkConfirmed = E.time1.i > T4 || F.time1.i > T4 || H.time1.i > T4;
    // const purpleConfirmed = fBreak || (rDEF >= 0.7 && dT7 + dT6 > dT5);
    // const blueConfirmed = G.time1.i > T6 || H.time1.i > T6;
    // const cyanConfirmed =
    //     (hBreak && mf.cmp(H.price, side, D.price)) || (eBreak && rFGH >= 0.7);

    const progressSteps = [
        [
            // red
            isBoxValid({ pr: CD, tr: dT3 }, phase2),
            [dBreak && rBCD <= 2, rBCD >= 0.5 && dT5 >= dT3 - dT4],
        ],
        [
            // pink
            isBoxValid({ pr: DE, tr: dT4 }, { pr: PR3, tr: TR3 }),
            rCDE < 1.5,
        ],
        [
            // purple
            isBoxValid({ pr: EF, tr: dT5 }, phase4),
            [fBreak, rDEF >= 0.7 && dT7 >= dT5 - dT6],
        ],
        [
            // blue
            isBoxValid({ pr: FG, tr: dT6 }, { pr: PR5, tr: TR5 }),
        ],
        [
            // cyan
            isBoxValid({ pr: GH, tr: dT7 }, phase6),
            dT7 >= dT1 - dT2 - dT3 - dT4 - dT5 - dT6,
            mf.cmp(H.price, side, D.price),
            hBreak,
        ],
    ];

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
    const progress = checkProgress("continue", progressSteps, colors, 2);
    //
    const patternPoints = buildViewPoints([A, B, C, D, E, F, G, H, I], colors);
    //
    const orderSide = side ? 1 : -1;
    const refPrice = H.price;
    const entry = mf.fmtNum(refPrice + orderSide * 0.1);
    const range = mf.fmtNum((fBreak ? F.price : D.price) - C.price, 1, true);
    const x = adjustTargetPrice(G.price, 0.5 * range, orderSide);
    const X = mf.fmtNum(x - entry);
    const y = adjustTargetPrice(G.price, range, orderSide);
    const Y = mf.fmtNum(y - entry);
    const z = adjustTargetPrice(G.price, 1.25 * range, orderSide);
    const Z = mf.fmtNum(z - entry);
    const w = adjustTargetPrice(G.price, 1.5 * range, orderSide);
    const W = mf.fmtNum(w - entry);
    const t = mf.fmtNum(
        (hBreak
            ? H.price + I.price
            : fBreak
            ? F.price + G.price
            : D.price + E.price) / 2
    );
    const T = mf.fmtNum(t - entry, 1);
    //
    let order = {};
    if (progress.result) {
        const tp = mf.cmp(H.price, !side, x) ? y : z;
        const sl = G.price;
        order = {
            type: "SLO",
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
        points: makeUnique(patternPoints),
        entry,
        target: {
            x: [x, X],
            y: [y, Y],
            z: [z, Z],
            w: [w, W],
            t: [t, T],
        },
    };
}
function calcVlinePattern() {
    const { A: P1, B: P2, C: P3 } = scanPoints;
    let side = P1.price - P2.price > 0;
    let pickTime = props.pickTimeToolRef.get();
    if (pickTime < P2.time.t) pickTime = undefined;
    const phase0 = scanPhase({
        side: !side,
        start: P1,
        end: { time: P2.time, price: P2.price },
    });
    const O = phase0.S;
    const A = phase0.R;
    const dT0 = A.time1.i - O.time.i;
    const stopTime = props.indexToTime(A.time.i + 2 * dT0);
    const phase1 = scanPhase({
        side,
        start: A,
        end: { time: { t: pickTime ?? stopTime } },
    });
    const isBreak0 = isBoxValid(phase1.ext, phase1, true);

    const B = isBreak0 ? phase1.R1 : phase1.ext.R;
    const C = isBreak0 ? phase1.S1 : phase1.ext.S;
    const phase2 = scanPhase({
        side: !side,
        start: B,
        end: {
            time: { t: Math.min(pickTime ?? C.time.t, C.time.t) },
            price: C.price,
        },
    });
    const phase3 = scanPhase({
        side,
        start: C,
        end: { time: { t: pickTime ?? stopTime } },
    });

    const isBreak1 = isBoxValid(phase3.ext, phase3, true);

    const D = isBreak1 ? phase3.R1 : phase3.ext.R;
    const E = isBreak1 ? phase3.S1 : phase3.ext.S;

    const phase4 = scanPhase({
        side: !side,
        start: D,
        end: {
            time: { t: Math.min(pickTime ?? E.time.t, E.time.t) },
            price: E.price,
        },
    });

    const phase5 = scanPhase({
        side,
        start: E,
        end: { time: { t: pickTime ?? stopTime } },
    });

    const isBreak2 = isBoxValid(phase5.ext, phase5, true);

    const F = isBreak2 ? phase5.R1 : phase5.ext.R;
    const G = isBreak2 ? phase5.S1 : phase5.ext.S;

    const phase6 = scanPhase({
        side: !side,
        start: F,
        end: {
            time: { t: Math.min(pickTime ?? G.time.t, G.time.t) },
            price: G.price,
        },
    });

    const phase7 = scanPhase({
        side,
        start: G,
        end: { time: { t: pickTime ?? stopTime } },
    });

    const isBreak3 = isBoxValid(phase7.ext, phase7, true);

    const H = isBreak3 ? phase7.R1 : phase7.ext.R;
    const I = isBreak3 ? phase7.S1 : phase7.ext.S;

    console.log("calcVlinePattern", [
        phase0,
        phase1,
        phase2,
        phase3,
        phase4,
        phase5,
        phase6,
        phase7,
    ]);

    // const AB = mf.fmtNum(B.price - A.price, 1, true);
    const BC = mf.fmtNum(C.price - B.price, 1, true);
    const CD = mf.fmtNum(D.price - C.price, 1, true);
    const DE = mf.fmtNum(E.price - D.price, 1, true);
    const EF = mf.fmtNum(F.price - E.price, 1, true);
    const FG = mf.fmtNum(G.price - F.price, 1, true);
    const GH = mf.fmtNum(H.price - G.price, 1, true);

    const dT1 = B.time1.i - A.time.i;
    const dT2 = C.time1.i - B.time.i;
    const dT3 = D.time1.i - C.time.i;
    const dT4 = E.time1.i - D.time.i;
    const dT5 = F.time1.i - E.time.i;
    const dT6 = G.time1.i - F.time.i;
    const dT7 = H.time1.i - G.time.i;

    const TR3 = isBreak1 ? phase3.pre.tr : phase3.tr;
    const PR3 = isBreak1 ? phase3.pre.pr : phase3.pr;
    const TR5 = isBreak2 ? phase5.pre.tr : phase5.tr;
    const PR5 = isBreak2 ? phase5.pre.pr : phase5.pr;

    const T1 = H.time.i + dT1 - dT2 - dT3 - dT4 - dT5 - dT6 - dT7;
    const T2 = C.time.i + dT2;
    const T3 = F.time.i + dT3 - dT4 - dT5;
    const T4 = H.time.i + dT5 - dT6 - dT7;
    const timeMark = {
        times: [T1, T2, T3, T4],
        colors: ["yellow", "red", "purple", "cyan"],
    };

    // const rABC = BC / AB;
    const rBCD = CD / BC;
    const rCDE = DE / CD;
    const rDEF = EF / DE;
    // const rEFG = FG / EF;
    // const rFGH = GH / FG;

    const dBreak = mf.cmp(D.price, side, B.price);
    // const eBreak = mf.cmp(E.price, !side, C.price);
    const fBreak = mf.cmp(F.price, side, D.price);
    const hBreak = mf.cmp(H.price, side, F.price);

    // const redConfirmed =
    //     (dBreak && rBCD <= 2) ||
    //     (rBCD >= 0.5 && dT5 + dT4 > dT3) ||
    //     (eBreak && !dBreak && rBCD >= 0.7);
    // const pinkConfirmed = E.time1.i > T4 || F.time1.i > T4 || H.time1.i > T4;
    // const purpleConfirmed = fBreak || (rDEF >= 0.7 && dT7 + dT6 > dT5);
    // const blueConfirmed = G.time1.i > T6 || H.time1.i > T6;
    // const cyanConfirmed =
    //     (hBreak && mf.cmp(H.price, side, D.price)) || (eBreak && rFGH >= 0.7);

    const progressSteps = [
        [
            // red
            isBoxValid({ pr: CD, tr: dT3 }, phase2),
            [dBreak && rBCD <= 2, rBCD >= 0.5 && dT5 >= dT3 - dT4],
        ],
        [
            // pink
            isBoxValid({ pr: DE, tr: dT4 }, { pr: PR3, tr: TR3 }),
            rCDE < 1.5,
        ],
        [
            // purple
            isBoxValid({ pr: EF, tr: dT5 }, phase4),
            [fBreak, rDEF >= 0.7 && dT7 >= dT5 - dT6],
        ],
        [
            // blue
            isBoxValid({ pr: FG, tr: dT6 }, { pr: PR5, tr: TR5 }),
        ],
        [
            // cyan
            isBoxValid({ pr: GH, tr: dT7 }, phase6),
            dT7 >= dT1 - dT2 - dT3 - dT4 - dT5 - dT6,
            mf.cmp(H.price, side, D.price),
            hBreak,

        ],
    ];

    const colors = [
        "lime",
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
    const progress = checkProgress("continue", progressSteps, colors, 3);
    //
    const patternPoints = buildViewPoints(
        [O, A, B, C, D, E, F, G, H, I],
        colors
    );
    //
    const orderSide = side ? 1 : -1;
    const refPrice = H.price;
    const entry = mf.fmtNum(refPrice + orderSide * 0.1);
    const range = mf.fmtNum((fBreak ? F.price : D.price) - C.price, 1, true);
    const x = adjustTargetPrice(G.price, 0.5 * range, orderSide);
    const X = mf.fmtNum(x - entry);
    const y = adjustTargetPrice(G.price, range, orderSide);
    const Y = mf.fmtNum(y - entry);
    const z = adjustTargetPrice(G.price, 1.25 * range, orderSide);
    const Z = mf.fmtNum(z - entry);
    const w = adjustTargetPrice(G.price, 1.5 * range, orderSide);
    const W = mf.fmtNum(w - entry);
    const t = mf.fmtNum(
        (hBreak
            ? H.price + I.price
            : fBreak
            ? F.price + G.price
            : D.price + E.price) / 2
    );
    const T = mf.fmtNum(t - entry, 1);
    //
    let order = {};
    if (progress.result) {
        const tp = mf.cmp(H.price, !side, x) ? y : z;
        const sl = G.price;
        order = {
            type: "SLO",
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
        points: makeUnique(patternPoints),
        entry,
        target: {
            x: [x, X],
            y: [y, Y],
            z: [z, Z],
            w: [w, W],
            t: [t, T],
        },
    };
}
function calcReversalPattern() {
    const { A: P1, B: P2 } = scanPoints;
    const bc = P1.price - P2.price;
    let side = bc > 0;
    let pickTime = props.pickTimeToolRef.get();
    if (pickTime < P2.time.t) pickTime = undefined;
    const phase2 = scanPhase({
        side: !side,
        start: P1,
        end: { time: P2.time, price: P2.price },
    });
    const B = phase2.S;
    const C = phase2.R;
    const dT2 = C.time1.i - B.time.i;
    const stopTime = props.indexToTime(C.time.i + 3 * dT2);
    const phase3 = scanPhase({
        side,
        start: { time: C.time },
        end: { time: { t: pickTime ?? stopTime } },
    });

    const isBreak1 = isBoxValid(phase3.ext, phase3, true);

    const D = isBreak1 ? phase3.R1 : phase3.ext.R;
    const E = isBreak1 ? phase3.S1 : phase3.ext.S;

    const phase4 = scanPhase({
        side: !side,
        start: D,
        end: {
            time: { t: Math.min(pickTime ?? E.time.t, E.time.t) },
            price: E.price,
        },
    });

    const phase5 = scanPhase({
        side,
        start: E,
        end: { time: { t: pickTime ?? stopTime } },
    });

    const isBreak2 = isBoxValid(phase5.ext, phase5, true);

    const F = isBreak2 ? phase5.R1 : phase5.ext.R;
    const G = isBreak2 ? phase5.S1 : phase5.ext.S;

    const phase6 = scanPhase({
        side: !side,
        start: F,
        end: {
            time: { t: Math.min(pickTime ?? G.time.t, G.time.t) },
            price: G.price,
        },
    });

    const phase7 = scanPhase({
        side,
        start: G,
        end: { time: { t: pickTime ?? stopTime } },
    });

    const isBreak3 = isBoxValid(phase7.ext, phase7, true);

    const H = isBreak3 ? phase7.R1 : phase7.ext.R;
    const I = isBreak3 ? phase7.S1 : phase7.ext.S;

    console.log("calcReversalPattern", [
        phase2,
        phase3,
        phase4,
        phase5,
        phase6,
        phase7,
    ]);

    // const BC = mf.fmtNum(bc, 1, true);
    const CD = mf.fmtNum(D.price - C.price, 1, true);
    const DE = mf.fmtNum(E.price - D.price, 1, true);
    const EF = mf.fmtNum(F.price - E.price, 1, true);
    const FG = mf.fmtNum(G.price - F.price, 1, true);
    const GH = mf.fmtNum(H.price - G.price, 1, true);
    // const HI = mf.fmtNum(I.price - H.price, 1, true);

    const dT3 = D.time1.i - C.time.i;
    const dT4 = E.time1.i - D.time.i;
    const dT5 = F.time1.i - E.time.i;
    const dT6 = G.time1.i - F.time.i;
    const dT7 = H.time1.i - G.time.i;

    const TR3 = isBreak1 ? phase3.pre.tr : phase3.tr;
    const PR3 = isBreak1 ? phase3.pre.pr : phase3.pr;
    const TR5 = isBreak2 ? phase5.pre.tr : phase5.tr;
    const PR5 = isBreak2 ? phase5.pre.pr : phase5.pr;

    const T1 = H.time.i + dT2 - dT3 - dT4 - dT5 - dT6 - dT7;
    const T2 = D.time.i + dT3;
    const T3 = F.time.i + dT3 - dT4 - dT5;
    const T4 = H.time.i + dT5 - dT6 - dT7;
    const timeMark = {
        times: [T1, T2, T3, T4],
        colors: ["orange", "pink", "purple", "cyan"],
    };

    // const rBCD = CD / BC;
    const rCDE = DE / CD;
    const rDEF = EF / DE;
    // const rEFG = FG / EF;

    // const eBreak = mf.cmp(E.price, !side, C.price);
    const fBreak = mf.cmp(F.price, side, D.price);
    const hBreak = mf.cmp(H.price, side, F.price);

    // const purpleConfirmed =
    //     mf.cmp(F.price, side, D.price, true) ||
    //     (rDEF > 0.7 && dT6 > dT5 && mf.cmp(H.price, side, F.price));
    // const cyanConfirmed = mf.cmp(H.price, side, F.price);
    // const pinkConfirmed = E.time1.i > T3 || F.time1.i > T3 || H.time1.i > T3;
    // const blueConfirmed = G.time1.i > T5 || H.time1.i > T5;

    const progressSteps = [
        [
            // red
            isBoxValid({ pr: CD, tr: dT3 }, phase2),
            dT5 >= dT3 - dT4,
        ],
        [
            // pink
            isBoxValid({ pr: DE, tr: dT4 }, { pr: PR3, tr: TR3 }),
            rCDE < 1.5,
        ],
        [
            // purple
            isBoxValid({ pr: EF, tr: dT5 }, phase4),
            [fBreak, rDEF >= 0.7 && dT7 >= dT5 - dT6],
        ],
        [
            // blue
            isBoxValid({ pr: FG, tr: dT6 }, { pr: PR5, tr: TR5 }),
        ],
        [
            // cyan
            isBoxValid({ pr: GH, tr: dT7 }, phase6),
            dT7 >= dT2 - dT3 - dT4 - dT5 - dT6,
            mf.cmp(H.price, side, D.price),
            hBreak,
        ],
    ];

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
    const progress = checkProgress("reversal", progressSteps, colors, 1);
    //
    const patternPoints = buildViewPoints([B, C, D, E, F, G, H, I], colors);
    //
    const orderSide = side ? 1 : -1;
    const refPrice = H.price;
    const entry = mf.fmtNum(refPrice + orderSide * 0.1);
    const range = mf.fmtNum((fBreak ? F.price : D.price) - E.price, 1, true);
    const x = adjustTargetPrice(G.price, 0.5 * range, orderSide);
    const X = mf.fmtNum(x - entry);
    const y = adjustTargetPrice(G.price, range, orderSide);
    const Y = mf.fmtNum(y - entry);
    const z = adjustTargetPrice(G.price, 1.25 * range, orderSide);
    const Z = mf.fmtNum(z - entry);
    const w = adjustTargetPrice(G.price, 1.5 * range, orderSide);
    const W = mf.fmtNum(w - entry);
    const t = mf.fmtNum(
        (hBreak
            ? H.price + I.price
            : fBreak
            ? F.price + G.price
            : D.price + E.price) / 2
    );
    const T = mf.fmtNum(t - entry);
    //
    let order = {};
    if (progress.result) {
        const tp = mf.cmp(H.price, !side, x) ? y : z;
        const sl = G.price;
        order = {
            type: "SLO",
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
        points: makeUnique(patternPoints),
        entry,
        target: {
            x: [x, X],
            y: [y, Y],
            z: [z, Z],
            w: [w, W],
            t: [t, T],
        },
    };
}
function calcSidewayPattern() {
    const { A: P1, B: P2, C: P3 } = scanPoints;
    const bc = P1.price - P2.price;
    let side = bc > 0;
    let pickTime = props.pickTimeToolRef.get();
    if (pickTime < P2.time.t) pickTime = undefined;
    const phase2 = scanPhase({
        side: !side,
        start: P1,
        end: { time: P2.time },
    });
    const B = phase2.S;
    const C = phase2.R;
    const phase3 = scanPhase({
        side,
        start: { time: C.time },
        end: { time: P3.time },
    });
    const D = phase3.R;
    const dT2 = C.time1.i - B.time.i;
    const dT3 = D.time1.i - C.time.i;
    const stopTime = props.indexToTime(C.time.i + (dT3 > dT2 ? 4 : 2) * dT2);
    const phase4 = scanPhase({
        side: !side,
        start: D,
        end: { time: { t: pickTime ?? stopTime } },
    });

    const isBreak1 = isBoxValid(phase4.ext, phase4, true);

    const E = isBreak1 ? phase4.R1 : phase4.ext.R;
    const F = isBreak1 ? phase4.S1 : phase4.ext.S;

    console.log("calcSidewayPattern", [phase2, phase3, phase4]);

    const BC = mf.fmtNum(bc, 1, true);
    const CD = mf.fmtNum(D.price - C.price, 1, true);

    const dT4 = E.time1.i - D.time.i;
    const dT5 = F.time1.i - E.time.i;

    const T1 = F.time.i + dT2 - dT3 - dT4 - dT5;
    const T2 = F.time.i + dT3 - dT4 - dT5;
    const T3 = props.timeToIndex(pickTime ?? props.bars.at(-1).time);
    const timeMark = { times: [T1, T2], colors: ["orange", "pink"] };

    const rBCD = CD / BC;
    const confirmed1 = dT3 > dT2 && rBCD >= 0.75;
    const confirmed2 =
        dT3 > dT2 &&
        isBoxValid(phase2, phase3) &&
        mf.cmp(D.price, side, phase2.S1.price) &&
        rBCD >= 0.6;
    const confirmed3 = dT3 < dT2 && T3 < T1 && rBCD < 0.4;

    const progressSteps = [
        [
            // red
            isBoxValid({ pr: CD, tr: dT3 }, phase2),
            CD >= 3,
            T2 > T3,
            [confirmed1, confirmed2, confirmed3],
        ],
    ];
    const colors = ["orange", "red", "pink", "purple", "purple"];
    const progress = checkProgress("sideway", progressSteps, colors, 1);
    //
    const patternPoints = buildViewPoints([B, C, D, E, F], colors);
    //
    const orderSide = side ? 1 : -1;
    const refPrice = C.price;
    const entry = refPrice;
    const range = CD;
    const x = mf.fmtNum(C.price + orderSide * 0.5 * range);
    const X = mf.fmtNum(x - entry);
    const y = mf.fmtNum(C.price - orderSide * 0.5 * range);
    const Y = mf.fmtNum(y - entry);
    const z = mf.fmtNum(C.price - orderSide * range);
    const Z = mf.fmtNum(z - entry);
    //
    let order = {};
    if (progress.result) {
        const tp = x;
        const sl = z;
        order = {
            type: "LO",
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
        points: makeUnique(patternPoints),
        entry,
        target: {
            x: [x, X],
            y: [y, Y],
            z: [z, Z],
        },
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
        if (end.time.t) cond = cond && item.time <= end.time.t;
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
function checkProgress(subPattern, steps, colors, offset = 0) {
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
            progress.result = getStepResult(step);
        }
        return step;
    });
    progress.color = progress.result
        ? "green"
        : colors[progress.step + offset - 1];
    return progress;
}
function getStepResult(step) {
    return step
        .map((cond) => (Array.isArray(cond) ? cond.some(Boolean) : cond))
        .every(Boolean);
}
function isTimeInChart(time) {
    if (!props.bars.length) return false;
    const first = props.bars[0]?.time;
    const last = props.bars.at(-1)?.time;
    if (typeof first !== "number" || typeof last !== "number") return false;
    return time >= first && time <= last;
}
function adjustTargetPrice(price, range, side) {
    const target = price + side * range;
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
    setTimeMark({ times: [] });
    emit("setProgress", false);
    emit("setPatternOrder", {});
    series.pattern.setData([]);
}
function removePatternTool() {
    if (mf.isSet(lines.O)) {
        series.pattern.removePriceLine(lines.O);
    }
    if (mf.isSet(lines.X)) {
        series.pattern.removePriceLine(lines.X);
    }
    if (mf.isSet(lines.Y)) {
        series.pattern.removePriceLine(lines.Y);
    }
    if (mf.isSet(lines.Z)) {
        series.pattern.removePriceLine(lines.Z);
    }
    if (mf.isSet(lines.W)) {
        series.pattern.removePriceLine(lines.W);
    }
    if (mf.isSet(lines.T)) {
        series.pattern.removePriceLine(lines.T);
    }
    lines = {};
}
function setTimeMark({ times, colors }) {
    let result = [];
    times.forEach((item, i) => {
        let time = props.indexToTime(item);
        if (time) {
            result.push({
                time,
                value: 1,
                color: mc.CHART_COLOR_MAP[colors[i]],
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
