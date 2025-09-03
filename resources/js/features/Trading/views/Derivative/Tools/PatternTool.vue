<template>
    <div class="command" @contextmenu="togglePatternType">
        <DxDropDownButton
            :items="patternTypes"
            :drop-down-options="{
                width: 145,
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
import { useI18n } from "vue-i18n";
import { formatISO } from "date-fns";

const store = useStore();
const { t } = useI18n();
const mf = inject("mf");
const mc = inject("mc");
const props = defineProps([
    "bars",
    "stopTimeToolRef",
    "timeRangeToolRef",
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
const patternTypes = [
    `C - ${t("trading.derivative.patternTool.continue")}`,
    `N - ${t("trading.derivative.patternTool.nestedContinue")}`,
    `R - ${t("trading.derivative.patternTool.reversal")}`,
    `S - ${t("trading.derivative.patternTool.sideway")}`,
];
const scanThreshold = 1;
const boxPriceRatio = 0.8;
const chartColors = Object.keys(mc.CHART_COLOR_MAP);
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
    if (mf.isSet(lines.O)) {
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
    const stopTime = props.indexToTime(
        props.timeToIndex(points.C.time.t) + points.C.time.i - points.A.time.i
    );
    props.stopTimeToolRef.set(stopTime);
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
        if (side === undefined) {
            if (
                ix === data.length - 1 ||
                (high >= start.high && low <= start.low)
            ) {
                start = { time, high, low };
                continue;
            }
            if (high < start.high && low > start.low) continue;
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
                        boxCmp(
                            { pr: as, tr: A.time1.i - S.time.i },
                            { pr: bc, tr: C.time.i - B.time.i }
                        )
                    )
                        break;
                }
            }
        }
    }
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
    if (mf.isSet(lines.O)) {
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
        case "N":
            result = calcNestedContinuePattern();
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
    let stopTime = props.stopTimeToolRef.get();
    if (stopTime < P3.time.t) stopTime = undefined;
    let pickTime = props.timeRangeToolRef.getFirstTime();
    if (pickTime < P2.time.t) pickTime = undefined;
    const phase1 = scanPhase({
        side,
        start: P1,
        end: { time: P2.time, price: P2.price },
    });
    const A = phase1.S;
    const B = phase1.R;
    const phase2 = scanPhase({
        side: !side,
        start: B,
        end: {
            time: { t: Math.min(pickTime ?? P3.time.t, P3.time.t) },
        },
    });
    const C = phase2.R;
    const phase3 = scanPhase({
        side,
        start: { time: C.time },
        end: { time: { t: stopTime } },
    });

    const isBreak1 = boxCmp(phase3.ext, phase3, { isNot: true });

    const D = isBreak1 ? phase3.R1 : phase3.ext.R;
    const E = isBreak1 ? phase3.S1 : phase3.ext.S;
    const phase4 = scanPhase({
        side: !side,
        start: D,
        end: {
            time: { t: Math.min(stopTime ?? E.time.t, E.time.t) },
            price: E.price,
        },
    });
    const phase5 = scanPhase({
        side,
        start: E,
        end: { time: { t: stopTime } },
    });

    const isBreak2 = boxCmp(phase5.ext, phase5, { isNot: true });

    const F = isBreak2 ? phase5.R1 : phase5.ext.R;
    const G = isBreak2 ? phase5.S1 : phase5.ext.S;
    const phase6 = scanPhase({
        side: !side,
        start: F,
        end: {
            time: { t: Math.min(stopTime ?? G.time.t, G.time.t) },
            price: G.price,
        },
    });
    const phase7 = scanPhase({
        side,
        start: G,
        end: { time: { t: stopTime } },
    });

    const isBreak3 = boxCmp(phase7.ext, phase7, { isNot: true });

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

    const AB = mf.fmtNum(B.price - A.price, 1, true);
    const BC = mf.fmtNum(bc, 1, true);
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

    const box1 = { pr: AB, tr: dT1 };
    const box2 = { pr: BC, tr: dT2 };
    const box3 = { pr: CD, tr: dT3 };
    const box4 = { pr: DE, tr: dT4 };
    const box5 = { pr: EF, tr: dT5 };
    const box6 = { pr: FG, tr: dT6 };
    const box7 = { pr: GH, tr: dT7 };
    const boxS3 = { pr: PR3, tr: TR3 };
    const boxS5 = { pr: PR5, tr: TR5 };

    const T1 = H.time.i + dT1 - dT2 - dT3 - dT4 - dT5 - dT6 - dT7;
    const T2 = C.time.i + dT2;
    const T3 = F.time.i + dT3 - dT4 - dT5;
    const T4 = H.time.i + dT5 - dT6 - dT7;
    const timeMark = {
        times: [T1, T2, T3, T4],
        colors: ["yellow", "red", "purple", "cyan"],
    };

    const dBreak = mf.cmp(D.price, side, B.price);
    const eBreak = mf.cmp(E.price, !side, C.price);
    const fBreak = mf.cmp(F.price, side, D.price);
    const hBreak = mf.cmp(H.price, side, F.price);
    //
    const orderSide = side ? 1 : -1;
    const refPrice = H.price;
    const entry = mf.fmtNum(refPrice + orderSide * 0.1);
    const range = getRange("continue", { B, C, E, H }, side);
    const x = adjustTargetPrice(G.price, 0.75 * range, orderSide);
    const X = mf.fmtNum(x - entry);
    const y = adjustTargetPrice(G.price, range, orderSide);
    const Y = mf.fmtNum(y - entry);
    const z = adjustTargetPrice(G.price, 1.5 * range, orderSide);
    const Z = mf.fmtNum(z - entry);
    const t = mf.fmtNum(
        (hBreak
            ? H.price + I.price
            : fBreak
            ? F.price + G.price
            : D.price + E.price) / 2
    );
    const T = mf.fmtNum(t - entry, 1);
    const entryThreshold = mf.fmtNum(G.price + 0.5 * orderSide * range);
    //
    const progressSteps = [
        [
            // red
            boxCmp(box3, phase2),
            boxCmp(box3, box1, { isNot: true }),
            [
                dBreak && boxCmp(box3, box2, { isNot: true, threshold: 2 }),
                !dBreak &&
                    boxCmp(box3, box2, { threshold: 0.5 }) &&
                    dT5 >= dT3 - dT4,
            ],
        ],
        [
            // pink
            boxCmp(box4, boxS3),
            boxCmp(box4, box2, { threshold: 0.5 }),
            boxCmp(box4, box3, { isNot: true, threshold: 1.5 }),
        ],
        [
            // purple
            boxCmp(box5, phase4),
            boxCmp(box5, box3, { threshold: 0.5 }),
            [
                fBreak,
                !fBreak &&
                    boxCmp(box5, box4, { threshold: 0.7 }) &&
                    dT7 >= dT5 - dT6,
                !fBreak &&
                    eBreak &&
                    boxCmp(box5, box4, { threshold: 0.5 }) &&
                    dT6 >= dT5,
            ],
        ],
        [
            // blue
            boxCmp(box6, boxS5),
            boxCmp(box6, box4, { threshold: 0.5 }),
            boxCmp(box6, boxMax(box2, box4), {
                isNot: true,
                threshold: 0.7,
            }),
        ],
        [
            // cyan
            boxCmp(box7, phase6),
            boxCmp(box7, box5, { threshold: 0.5 }),
            dT7 >= dT1 - dT2 - dT3 - dT4 - dT5 - dT6,
            hBreak,
            mf.cmp(H.price, side, entryThreshold),
        ],
    ];

    const progress = checkProgress("continue", progressSteps, chartColors, 3);
    const patternPoints = buildViewPoints(
        [A, B, C, D, E, F, G, H, I],
        chartColors,
        1
    );
    //
    const tp = mf.cmp(H.price, side, x) ? z : y;
    const sl = G.price;
    const order = {
        data: {
            type: "SLO",
            side: orderSide,
            price: entry,
            tpPrice: tp,
            slPrice: mf.fmtNum(sl - orderSide * 0.1),
            sl1Price: mf.fmtNum(I.price - orderSide * 0.1),
        },
        points: { F, G, H, I, t },
        isOk: progress.result,
    };
    console.log("order", order);

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
            t: [t, T],
        },
    };
}
function calcNestedContinuePattern() {
    const { A: P1, B: P2, C: P3 } = scanPoints;
    let side = P1.price - P2.price > 0;
    let stopTime = props.stopTimeToolRef.get();
    if (stopTime < P2.time.t) stopTime = undefined;
    let pickTime = props.timeRangeToolRef.getFirstTime();
    if (pickTime < P2.time.t) pickTime = undefined;
    const phase0 = scanPhase({
        side: !side,
        start: P1,
        end: { time: P2.time, price: P2.price },
    });
    const O = phase0.S;
    const A = phase0.R;
    const phase1 = scanPhase({
        side,
        start: A,
        end: { time: { t: stopTime } },
    });
    const isBreak0 = boxCmp(phase1.ext, phase1, { isNot: true });

    const B = isBreak0 ? phase1.R1 : phase1.ext.R;
    let C = isBreak0 ? phase1.S1 : phase1.ext.S;
    const phase2 = scanPhase({
        side: !side,
        start: B,
        end: {
            time: { t: Math.min(pickTime ?? stopTime ?? C.time.t, C.time.t) },
        },
    });
    C = phase2.R;
    const phase3 = scanPhase({
        side,
        start: { time: C.time },
        end: { time: { t: stopTime } },
    });

    const isBreak1 = boxCmp(phase3.ext, phase3, { isNot: true });

    const D = isBreak1 ? phase3.R1 : phase3.ext.R;
    const E = isBreak1 ? phase3.S1 : phase3.ext.S;

    const phase4 = scanPhase({
        side: !side,
        start: D,
        end: {
            time: { t: Math.min(stopTime ?? E.time.t, E.time.t) },
            price: E.price,
        },
    });

    const phase5 = scanPhase({
        side,
        start: E,
        end: { time: { t: stopTime } },
    });

    const isBreak2 = boxCmp(phase5.ext, phase5, { isNot: true });

    const F = isBreak2 ? phase5.R1 : phase5.ext.R;
    const G = isBreak2 ? phase5.S1 : phase5.ext.S;

    const phase6 = scanPhase({
        side: !side,
        start: F,
        end: {
            time: { t: Math.min(stopTime ?? G.time.t, G.time.t) },
            price: G.price,
        },
    });

    const phase7 = scanPhase({
        side,
        start: G,
        end: { time: { t: stopTime } },
    });

    const isBreak3 = boxCmp(phase7.ext, phase7, { isNot: true });

    const H = isBreak3 ? phase7.R1 : phase7.ext.R;
    const I = isBreak3 ? phase7.S1 : phase7.ext.S;

    console.log("calcNestedContinuePattern", [
        phase0,
        phase1,
        phase2,
        phase3,
        phase4,
        phase5,
        phase6,
        phase7,
    ]);

    const AB = mf.fmtNum(B.price - A.price, 1, true);
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

    const box1 = { pr: AB, tr: dT1 };
    const box2 = { pr: BC, tr: dT2 };
    const box3 = { pr: CD, tr: dT3 };
    const box4 = { pr: DE, tr: dT4 };
    const box5 = { pr: EF, tr: dT5 };
    const box6 = { pr: FG, tr: dT6 };
    const box7 = { pr: GH, tr: dT7 };
    const boxS3 = { pr: PR3, tr: TR3 };
    const boxS5 = { pr: PR5, tr: TR5 };

    const T1 = H.time.i + dT1 - dT2 - dT3 - dT4 - dT5 - dT6 - dT7;
    const T2 = C.time.i + dT2;
    const T3 = F.time.i + dT3 - dT4 - dT5;
    const T4 = H.time.i + dT5 - dT6 - dT7;
    const timeMark = {
        times: [T1, T2, T3, T4],
        colors: ["yellow", "red", "purple", "cyan"],
    };

    const dBreak = mf.cmp(D.price, side, B.price);
    const eBreak = mf.cmp(E.price, !side, C.price);
    const fBreak = mf.cmp(F.price, side, D.price);
    const hBreak = mf.cmp(H.price, side, F.price);
    //
    const orderSide = side ? 1 : -1;
    const refPrice = H.price;
    const entry = mf.fmtNum(refPrice + orderSide * 0.1);
    const range = getRange("continue", { B, C, E, H }, side);
    const x = adjustTargetPrice(G.price, 0.75 * range, orderSide);
    const X = mf.fmtNum(x - entry);
    const y = adjustTargetPrice(G.price, range, orderSide);
    const Y = mf.fmtNum(y - entry);
    const z = adjustTargetPrice(G.price, 1.5 * range, orderSide);
    const Z = mf.fmtNum(z - entry);
    const t = mf.fmtNum(
        (hBreak
            ? H.price + I.price
            : fBreak
            ? F.price + G.price
            : D.price + E.price) / 2
    );
    const T = mf.fmtNum(t - entry, 1);
    const entryThreshold = mf.fmtNum(G.price + 0.5 * orderSide * range);
    //
    const progressSteps = [
        [
            // red
            boxCmp(box3, phase2),
            boxCmp(box3, box1, { isNot: true }),
            [
                dBreak && boxCmp(box3, box2, { isNot: true, threshold: 2 }),
                !dBreak &&
                    boxCmp(box3, box2, { threshold: 0.5 }) &&
                    dT5 >= dT3 - dT4,
            ],
        ],
        [
            // pink
            boxCmp(box4, boxS3),
            boxCmp(box4, box2, { threshold: 0.5 }),
            boxCmp(box4, box3, { isNot: true, threshold: 1.5 }),
        ],
        [
            // purple
            boxCmp(box5, phase4),
            boxCmp(box5, box3, { threshold: 0.5 }),
            [
                fBreak,
                !fBreak &&
                    boxCmp(box5, box4, { threshold: 0.7 }) &&
                    dT7 >= dT5 - dT6,
                !fBreak &&
                    eBreak &&
                    boxCmp(box5, box4, { threshold: 0.5 }) &&
                    dT6 >= dT5,
            ],
        ],
        [
            // blue
            boxCmp(box6, boxS5),
            boxCmp(box6, box4, { threshold: 0.5 }),
            boxCmp(box6, boxMax(box2, box4), {
                isNot: true,
                threshold: 0.7,
            }),
        ],
        [
            // cyan
            boxCmp(box7, phase6),
            boxCmp(box7, box5, { threshold: 0.5 }),
            dT7 >= dT1 - dT2 - dT3 - dT4 - dT5 - dT6,
            hBreak,
            mf.cmp(H.price, side, entryThreshold),
        ],
    ];

    const progress = checkProgress("continue", progressSteps, chartColors, 3);
    const patternPoints = buildViewPoints(
        [O, A, B, C, D, E, F, G, H, I],
        chartColors
    );
    //
    const tp = mf.cmp(H.price, side, x) ? z : y;
    const sl = G.price;
    const order = {
        data: {
            type: "SLO",
            side: orderSide,
            price: entry,
            tpPrice: tp,
            slPrice: mf.fmtNum(sl - orderSide * 0.1),
            sl1Price: mf.fmtNum(I.price - orderSide * 0.1),
        },
        points: { F, G, H, I, t },
        isOk: progress.result,
    };
    console.log("order", order);

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
            t: [t, T],
        },
    };
}
function calcReversalPattern() {
    const { A: P1, B: P2, C: P3 } = scanPoints;
    const bc = P1.price - P2.price;
    let side = bc > 0;
    let stopTime = props.stopTimeToolRef.get();
    if (stopTime < P2.time.t) stopTime = undefined;
    let pickTime = props.timeRangeToolRef.getFirstTime();
    if (pickTime < P3.time.t) pickTime = undefined;
    const phase2 = scanPhase({
        side: !side,
        start: P1,
        end: { time: P2.time, price: P2.price },
    });
    const B = phase2.S;
    const C = phase2.R;
    const phase3 = scanPhase({
        side,
        start: { time: C.time },
        end: { time: { t: stopTime } },
    });

    const isBreak1 = boxCmp(phase3.ext, phase3, { isNot: true });

    const D = isBreak1 ? phase3.R1 : phase3.ext.R;
    let E = isBreak1 ? phase3.S1 : phase3.ext.S;

    const phase4 = scanPhase({
        side: !side,
        start: D,
        end: {
            time: { t: Math.min(pickTime ?? stopTime ?? E.time.t, E.time.t) },
            price: E.price,
        },
    });
    E = phase4.R;

    const phase5 = scanPhase({
        side,
        start: { time: E.time },
        end: { time: { t: stopTime } },
    });

    const isBreak2 = boxCmp(phase5.ext, phase5, { isNot: true });

    const F = isBreak2 ? phase5.R1 : phase5.ext.R;
    const G = isBreak2 ? phase5.S1 : phase5.ext.S;

    const phase6 = scanPhase({
        side: !side,
        start: F,
        end: {
            time: { t: Math.min(stopTime ?? G.time.t, G.time.t) },
            price: G.price,
        },
    });

    const phase7 = scanPhase({
        side,
        start: G,
        end: { time: { t: stopTime } },
    });

    const isBreak3 = boxCmp(phase7.ext, phase7, { isNot: true });

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

    const BC = mf.fmtNum(bc, 1, true);
    const CD = mf.fmtNum(D.price - C.price, 1, true);
    const DE = mf.fmtNum(E.price - D.price, 1, true);
    const EF = mf.fmtNum(F.price - E.price, 1, true);
    const FG = mf.fmtNum(G.price - F.price, 1, true);
    const GH = mf.fmtNum(H.price - G.price, 1, true);
    // const HI = mf.fmtNum(I.price - H.price, 1, true);

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

    const box2 = { pr: BC, tr: dT2 };
    const box3 = { pr: CD, tr: dT3 };
    const box4 = { pr: DE, tr: dT4 };
    const box5 = { pr: EF, tr: dT5 };
    const box6 = { pr: FG, tr: dT6 };
    const box7 = { pr: GH, tr: dT7 };
    const boxS3 = { pr: PR3, tr: TR3 };
    const boxS5 = { pr: PR5, tr: TR5 };

    const T1 = H.time.i + dT2 - dT3 - dT4 - dT5 - dT6 - dT7;
    const T2 = D.time.i + dT3;
    const T3 = F.time.i + dT3 - dT4 - dT5;
    const T4 = H.time.i + dT5 - dT6 - dT7;
    const timeMark = {
        times: [T1, T2, T3, T4],
        colors: ["orange", "pink", "purple", "cyan"],
    };

    const eBreak = mf.cmp(E.price, !side, C.price);
    const fBreak = mf.cmp(F.price, side, D.price);
    const hBreak = mf.cmp(H.price, side, F.price);
    //
    const orderSide = side ? 1 : -1;
    const refPrice = H.price;
    const entry = mf.fmtNum(refPrice + orderSide * 0.1);
    const range = getRange("reversal", { C, E, H }, side);
    const x = adjustTargetPrice(G.price, 0.75 * range, orderSide);
    const X = mf.fmtNum(x - entry);
    const y = adjustTargetPrice(G.price, range, orderSide);
    const Y = mf.fmtNum(y - entry);
    const z = adjustTargetPrice(G.price, 1.5 * range, orderSide);
    const Z = mf.fmtNum(z - entry);
    const w = adjustTargetPrice(G.price, 2 * range, orderSide);
    const W = mf.fmtNum(w - entry);
    const t = mf.fmtNum(
        (hBreak
            ? H.price + I.price
            : fBreak
            ? F.price + G.price
            : D.price + E.price) / 2
    );
    const T = mf.fmtNum(t - entry);
    const entryThreshold = mf.fmtNum(G.price + 0.5 * orderSide * range);
    //
    const progressSteps = [
        [
            // red
            boxCmp(box3, phase2),
            dT5 >= dT3 - dT4,
        ],
        [
            // pink
            boxCmp(box4, boxS3),
            boxCmp(box4, box2, { isNot: true }),
            boxCmp(box4, box3, { isNot: true, threshold: 2 }),
        ],
        [
            // purple
            boxCmp(box5, phase4),
            boxCmp(box5, box3, { threshold: 0.5 }),
            [
                fBreak,
                !fBreak &&
                    boxCmp(box5, box4, { threshold: 0.7 }) &&
                    dT7 >= dT5 - dT6,
                !fBreak &&
                    eBreak &&
                    boxCmp(box5, box4, { threshold: 0.5 }) &&
                    dT6 >= dT5,
            ],
        ],
        [
            // blue
            boxCmp(box6, boxS5),
            boxCmp(box6, box4, { threshold: 0.5 }),
            boxCmp(box6, box4, { isNot: true, threshold: 0.8 }),
        ],
        [
            // cyan
            boxCmp(box7, phase6),
            boxCmp(box7, box5, { threshold: 0.5 }),
            dT7 >= dT2 - dT3 - dT4 - dT5 - dT6,
            hBreak,
            mf.cmp(H.price, side, entryThreshold),
        ],
    ];

    const progress = checkProgress("reversal", progressSteps, chartColors, 3);
    const patternPoints = buildViewPoints(
        [B, C, D, E, F, G, H, I],
        chartColors,
        2
    );
    //
    const tp = mf.cmp(H.price, side, y) ? w : mf.cmp(H.price, side, x) ? z : y;
    const sl = G.price;
    const order = {
        data: {
            type: "SLO",
            side: orderSide,
            price: entry,
            tpPrice: tp,
            slPrice: mf.fmtNum(sl - orderSide * 0.1),
            sl1Price: mf.fmtNum(I.price - orderSide * 0.1),
        },
        points: { F, G, H, I, t },
        isOk: progress.result,
    };
    console.log("order", order);

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
    let stopTime = props.stopTimeToolRef.get();
    if (stopTime < P2.time.t) stopTime = undefined;
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
    const phase4 = scanPhase({
        side: !side,
        start: D,
        end: { time: { t: stopTime } },
    });

    const isBreak1 = boxCmp(phase4.ext, phase4, { isNot: true });

    const E = isBreak1 ? phase4.R1 : phase4.ext.R;
    const F = isBreak1 ? phase4.S1 : phase4.ext.S;

    console.log("calcSidewayPattern", [phase2, phase3, phase4]);

    const BC = mf.fmtNum(bc, 1, true);
    const CD = mf.fmtNum(D.price - C.price, 1, true);

    const dT2 = C.time1.i - B.time.i;
    const dT3 = D.time1.i - C.time.i;
    const dT4 = E.time1.i - D.time.i;
    const dT5 = F.time1.i - E.time.i;

    const T1 = F.time.i + dT2 - dT3 - dT4 - dT5;
    const T2 = F.time.i + dT3 - dT4 - dT5;
    const T3 = props.timeToIndex(stopTime ?? props.bars.at(-1).time);
    const timeMark = { times: [T1, T2], colors: ["orange", "pink"] };

    const rBCD = CD / BC;
    const confirmed1 = dT3 > dT2 && rBCD >= 0.75;
    const confirmed2 =
        dT3 > dT2 &&
        boxCmp(phase2, phase3) &&
        mf.cmp(D.price, side, phase2.S1.price) &&
        rBCD >= 0.6;
    const confirmed3 = dT3 < dT2 && T3 < T1 && rBCD < 0.4;

    const box3 = { pr: CD, tr: dT3 };

    const progressSteps = [
        [
            // red
            boxCmp(box3, phase2),
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
    const tp = x;
    const sl = z;
    const order = {
        data: {
            type: "LO",
            side: orderSide,
            price: entry,
            tpPrice: tp,
            slPrice: sl,
            sl1Price: null,
        },
        points: {},
        isOk: progress.result,
    };
    console.log("order", order);

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
                    if (boxCmp(box, maxBox)) {
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
                        box.S.time1 = { t, d, i };
                        box.pr = mf.fmtNum(box.S.price - box.R.price, 1, true);
                        box.tr = box.S.time1.i - box.R.time.i;
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
function boxCmp(box1, box2, { isNot = false, threshold = 1.0 } = {}) {
    const score = boxCmpScore(box1, box2);
    return isNot ? score < threshold : score >= threshold;
}
function boxMax(box1, box2, isNot = false) {
    const score = boxCmpScore(box1, box2);
    return score >= 1.0 !== isNot ? box1 : box2;
}
function boxCmpScore(box1, box2) {
    return mf.fmtNum(
        boxPriceRatio * (box1.pr / box2.pr) +
            (1 - boxPriceRatio) * (box1.tr / box2.tr),
        2
    );
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
function buildViewPoints(points, colors, offset = 0) {
    const viewPoints = [];
    const lastIndex = points.length - 1;
    points.forEach((p, idx) => {
        const point = {
            value: p.price,
            color:
                idx !== lastIndex
                    ? mc.CHART_COLOR_MAP[colors[idx + offset]]
                    : null,
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
function getRange(type, { B, C, E, H }, side) {
    const rangeR =
        type === "continue"
            ? side
                ? Math.max(B.price, H.price)
                : Math.min(B.price, H.price)
            : H.price;
    const rangeS = side
        ? Math.min(C.price, E.price)
        : Math.max(C.price, E.price);
    return mf.fmtNum(rangeR - rangeS, 1, true);
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
    const stopTime = props.stopTimeToolRef.get();
    const side = scanPoints.B.price > scanPoints.A.price;
    const cIndex = props.bars.findIndex(
        (bar) => bar.time === scanPoints.C.time.t
    );
    let newPoint = mf.cloneDeep(scanPoints.C);
    for (let i = cIndex; i < props.bars.length; i++) {
        const t = props.bars[i].time;
        if (stopTime && t > stopTime) break;
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
    props.stopTimeToolRef.remove();
    props.timeRangeToolRef.remove();
    removePatternTool();
    setTimeMark({ times: [] });
    emit("setProgress", {});
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
    const value = itemData.split(" - ")[0];
    store.dispatch("tradingDerivative/setPatternType", value).then((isOk) => {
        if (isOk) {
            refresh();
        }
    });
}
function togglePatternType() {
    const values = patternTypes.map((item) => item.split(" - ")[0]);
    const nextType = patternType.value === values[0] ? values[1] : values[0];
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
