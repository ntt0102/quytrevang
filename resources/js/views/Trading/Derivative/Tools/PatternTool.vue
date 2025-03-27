<template>
    <div
        ref="patternToolRef"
        class="command"
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
    "priceSeries",
    "timeMarkSeries",
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
let points = {};
let lines = {};

const symbol = "VN30F1M";

defineExpose({
    isSelected,
    draw,
    load,
    refresh,
    remove,
    drag,
});

watch(patternStore, (data) => {
    if (data) setTimeout(() => load(data, { isCheck: true }), 0);
});

function isSelected() {
    return patternToolRef.value.classList.contains("selected");
}
function patternToolClick(e) {
    emit("hideContext");
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        e.target.classList.add("selected");
        props.pickTimeToolRef.remove();
    }
}
function patternToolContextmenu(e) {
    e.target.classList.remove("selected");
    emit("hideContext");
    remove();
}
function draw({ time, price }) {
    const TYPE = "pattern";
    let option = {
        lineType: TYPE,
        price,
        lineWidth: 1,
        lineStyle: 1,
        draggable: true,
    };
    if (mf.isSet(lines.A)) {
        if (mf.isSet(lines.B)) {
            let _timeMark, _progress;

            if (mf.isSet(lines.C)) {
                let point, changeOptions;

                points.A = { time, price };
                const {
                    progress,
                    timeMark,
                    info: {
                        rEpr1,
                        rEpr2,
                        rEpr3,
                        entry,
                        pStatus,
                        x: [x1, x2],
                        X: [X1, X2],
                        y: [y1, y2],
                        Y: [Y1, Y2],
                    },
                } = calculatePattern();
                _progress = progress;
                _timeMark = timeMark;
                //
                point = "A";
                changeOptions = {
                    price,
                    title: `A ${rEpr1}`,
                };
                lines[point].applyOptions(changeOptions);
                //
                point = "B";
                changeOptions = {
                    title: `B ${rEpr2}`,
                };
                lines[point].applyOptions(changeOptions);
                //
                point = "C";
                changeOptions = { title: `C ${rEpr3}` };
                lines[point].applyOptions(changeOptions);
                //
                point = "D";
                changeOptions = { price: entry, title: "E " + pStatus };
                lines[point].applyOptions(changeOptions);
                //
                point = "X1";
                changeOptions = {
                    price: mf.fmtNum(x1),
                    title: `X1 ${mf.fmtNum(X1)}`,
                };
                lines[point].applyOptions(changeOptions);
                //
                point = "Y1";
                changeOptions = {
                    price: mf.fmtNum(y1),
                    title: `Y1 ${mf.fmtNum(Y1)}`,
                };
                //
                point = "X2";
                changeOptions = {
                    price: mf.fmtNum(x2),
                    title: `X2 ${mf.fmtNum(X2)}`,
                };
                lines[point].applyOptions(changeOptions);
                //
                point = "Y2";
                changeOptions = {
                    price: mf.fmtNum(y2),
                    title: `Y2 ${mf.fmtNum(Y2)}`,
                };
                lines[point].applyOptions(changeOptions);
            } else {
                points.C = { price };
                const {
                    progress,
                    timeMark,
                    info: {
                        rEpr1,
                        rEpr2,
                        rEpr3,
                        entry,
                        pStatus,
                        x: [x1, x2],
                        X: [X1, X2],
                        y: [y1, y2],
                        Y: [Y1, Y2],
                    },
                } = calculatePattern();
                _progress = progress;
                _timeMark = timeMark;
                //
                let point = "A";
                lines[point].applyOptions({
                    title: `A ${rEpr1}`,
                });
                //
                point = "B";
                lines[point].applyOptions({
                    title: `B ${rEpr2}`,
                });
                //
                option.point = "C";
                option.title = `C ${rEpr3}`;
                option.color = "#FFEB3B";
                lines[option.point] = props.priceSeries.createPriceLine(option);
                //
                option.point = "D";
                option.price = entry;
                option.title = "E " + pStatus;
                option.color = "#9C27B0";
                option.draggable = false;
                lines[option.point] = props.priceSeries.createPriceLine(option);
                //
                option.point = "Y1";
                option.price = mf.fmtNum(y1);
                option.title = `Y1 ${mf.fmtNum(Y1)}`;
                option.color = "#E91E63";
                option.draggable = false;
                lines[option.point] = props.priceSeries.createPriceLine(option);
                //
                option.point = "X1";
                option.price = mf.fmtNum(x1);
                option.title = `X1 ${mf.fmtNum(X1)}`;
                option.color = "#2196F3";
                option.draggable = false;
                lines[option.point] = props.priceSeries.createPriceLine(option);
                //
                option.point = "Y2";
                option.price = mf.fmtNum(y2);
                option.title = `Y2 ${mf.fmtNum(Y2)}`;
                option.color = "#E91E63";
                option.draggable = false;
                lines[option.point] = props.priceSeries.createPriceLine(option);
                //
                option.point = "X2";
                option.price = mf.fmtNum(x2);
                option.title = `X2 ${mf.fmtNum(X2)}`;
                option.color = "#2196F3";
                option.draggable = false;
                lines[option.point] = props.priceSeries.createPriceLine(option);
            }
            savePattern();
            emit("setProgress", _progress);
            setTimeMark(_timeMark);
            patternToolRef.value.classList.remove("selected");
        } else {
            option.point = "B";
            option.title = "B 0";
            option.color = "#4CAF50";
            lines[option.point] = props.priceSeries.createPriceLine(option);
            points.B = { price };
        }
    } else {
        option.point = "A";
        option.title = "A 0";
        option.color = "#F44336";
        lines[option.point] = props.priceSeries.createPriceLine(option);
        points = { A: { time, price } };
    }
}
function load(data, { isSave = false, isCheck = false } = {}) {
    points = mf.cloneDeep(data);
    if (isSave) savePattern();
    const isLoad = isCheck ? checkPointsValid(points) : true;
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
        draggable: true,
    };
    const { A, B, C } = points;
    const {
        progress,
        timeMark,
        info: {
            rEpr1,
            rEpr2,
            rEpr3,
            entry,
            pStatus,
            x: [x1, x2],
            X: [X1, X2],
            y: [y1, y2],
            Y: [Y1, Y2],
        },
    } = calculatePattern();
    emit("setProgress", progress);
    setTimeMark(timeMark);
    //
    option.point = "A";
    option.title = `A ${rEpr1}`;
    option.color = "#F44336";
    option.price = A.price;
    lines[option.point] = props.priceSeries.createPriceLine(option);
    //
    option.point = "B";
    option.title = `B ${rEpr2}`;
    option.color = "#4CAF50";
    option.price = B.price;
    lines[option.point] = props.priceSeries.createPriceLine(option);
    //
    option.point = "C";
    option.price = C.price;
    option.title = `C ${rEpr3}`;
    option.color = "#FFEB3B";
    lines[option.point] = props.priceSeries.createPriceLine(option);
    //
    option.point = "D";
    option.price = entry;
    option.title = "E " + pStatus;
    option.color = "#9C27B0";
    option.draggable = false;
    lines[option.point] = props.priceSeries.createPriceLine(option);
    //
    option.point = "Y1";
    option.price = mf.fmtNum(y1);
    option.title = `Y1 ${mf.fmtNum(Y1)}`;
    option.color = "#E91E63";
    option.draggable = false;
    lines[option.point] = props.priceSeries.createPriceLine(option);
    //
    option.point = "X1";
    option.price = mf.fmtNum(x1);
    option.title = `X1 ${mf.fmtNum(X1)}`;
    option.color = "#2196F3";
    option.draggable = false;
    lines[option.point] = props.priceSeries.createPriceLine(option);
    //
    option.point = "Y2";
    option.price = mf.fmtNum(y2);
    option.title = `Y2 ${mf.fmtNum(Y2)}`;
    option.color = "#E91E63";
    option.draggable = false;
    lines[option.point] = props.priceSeries.createPriceLine(option);
    //
    option.point = "X2";
    option.price = mf.fmtNum(x2);
    option.title = `X2 ${mf.fmtNum(X2)}`;
    option.color = "#2196F3";
    option.draggable = false;
    lines[option.point] = props.priceSeries.createPriceLine(option);
}
function refresh(autoAdjust = false) {
    if (mf.isSet(lines.C)) {
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
        case 3:
            result = calcExtensionPattern();
            break;
    }
    return result;
}
function calcContinuePattern() {
    const { A, B, C } = points;
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
        start: phase1.R,
        end: { time: Math.min(pickTime ?? C.time, C.time) },
    });
    const stopTime = props.indexToTime(
        Math.max(phase1.R.index + 6 * phase1.tr, phase2.R.index + phase2.tr)
    );
    const phase3 = scanPhase({
        side,
        start: phase2.R,
        end: { time: Math.min(pickTime ?? stopTime, stopTime) },
    });

    console.log("calcContinuePattern", [phase1, phase2, phase3]);

    //
    const BC = mf.fmtNum(bc, 1, true);
    const CD = mf.fmtNum(C.price - phase3.ext.R.price, 1, true);
    const DE = mf.fmtNum(phase3.ext.pr);
    const pr1Valid = BC >= phase1.pr;
    const pr2Valid = CD >= phase2.pr;
    const pr3Valid = DE >= phase3.pr;

    const s1Valid = !mf.cmp(C.price, !side, phase1.S1.price);
    const s2Valid = !mf.cmp(phase3.ext.R.price, side, phase2.S1.price);
    const s3Valid = !mf.cmp(phase3.ext.S.price, !side, phase3.S1.price);

    const T1 = phase1.R.index + phase1.tr;
    const T1p = phase1.R.index + 5 * phase1.tr;
    const T2 = phase2.R.index + phase2.tr;
    const T2p = 2 * phase2.R.index - phase2.S1.index;
    const T3 = phase3.ext.R.index + phase3.tr;
    const T3p = phase3.ext.R.index + phase2.tr;
    const timeMark = [T1, T2, T3, T1p, T2p, T3p];

    const T = props.timeToIndex(pickTime ?? props.prices.at(-1).time);

    let entry,
        progress = {};
    const extraCond = [
        phase2.R.index > T1,
        phase1.rEpr < 3,
        phase2.rEpr < phase1.rEpr,
    ];
    progress.steps = [
        [
            //
            pr1Valid,
            s1Valid,
            T > T1,
            T < T1p,
            !phase3.hasDouble,
        ],
        [
            //
            ...extraCond,
            T2 > T1,
            T2p < T2,
            T < T2p,
        ],
        [
            //
            phase2.R.index - phase1.R.index > 0.5 * phase1.tr,
            pr2Valid,
            T > T2,
        ],
        [
            //
            phase3.ext.R.index > T2,
            pr3Valid,
            s3Valid,
            T > T3,
            extraCond.every(Boolean) || T > T3p,
        ],
    ];
    progress.step = 1;
    progress.result = progress.steps[0].every(Boolean);
    entry = B.price;
    if (progress.result) {
        if (T <= T2) {
            progress.step = 2;
            progress.result = progress.steps[1].every(Boolean);
            entry = phase2.S1.price;
        } else {
            progress.step = 3;
            progress.result = progress.steps[2].every(Boolean);
            entry = phase3.ext.R.price;
            if (progress.result) {
                progress.step = 4;
                progress.result = progress.steps[3].every(Boolean);
            }
        }
    }
    //
    const p1Status = s1Valid ? (pr1Valid ? 1 : 0) : 2;
    const p2Status = s2Valid ? (pr2Valid ? 1 : 0) : 2;
    const p3Status = s3Valid ? (pr3Valid ? 1 : 0) : 2;
    const pStatus = `${p1Status}${p2Status}${p3Status}`;
    //
    let X = mf.fmtNum(B.price - phase1.S1.price, 1, true);
    let Y = phase1.rEp;
    const [x] = adjustTargetPrice(C.price, X, side);
    const [y] = adjustTargetPrice(B.price, Y, side);
    X = mf.fmtNum(x - entry, 1, true);
    Y = mf.fmtNum(y - entry, 1, true);

    return {
        progress,
        timeMark,
        info: {
            rEpr1: phase1.rEpr,
            rEpr2: phase2.rEpr,
            rEpr3: phase3.rEpr,
            entry,
            pStatus,
            x,
            X,
            y,
            Y,
        },
    };
}
function calcReversalPattern() {
    const { A, B, C } = points;
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
        start: phase1.R,
        end: { time: pickTime, price: C.price },
    });
    const D = {
        time: props.indexToTime(phase2.ext.S.index),
        price: phase2.ext.S.price,
    };
    const phase3 = scanPhase({
        side,
        start: phase2.R,
        end: { time: Math.min(pickTime ?? D.time, D.time) },
    });
    const stopTime = props.indexToTime(
        Math.max(phase1.R.index + 6 * phase1.tr, phase2.R.index + phase2.tr)
    );
    const phase4 = scanPhase({
        side: !side,
        start: D,
        end: { time: Math.min(pickTime ?? stopTime, stopTime) },
        pick: { price: C.price },
    });

    console.log("calcReversalPattern", [phase1, phase2, phase3, phase4]);

    //
    const AB = mf.fmtNum(A.price - B.price, 1, true);
    const BC = mf.fmtNum(bc, 1, true);
    const CD = phase2.ext.pr;
    const EF = phase4.ext.pr;

    const bcValid = BC > AB / 2;

    const pr1Valid = BC >= phase1.pr;
    const pr2Valid = CD >= phase2.pr;
    const pr4Valid = EF >= Math.max(phase3.pr, phase4.pr);

    const s2Valid = !mf.cmp(D.price, side, phase2.S1.price);
    const s4Valid = !mf.cmp(phase4.ext.S.price, side, phase4.S1.price);

    const T = props.timeToIndex(pickTime ?? props.prices.at(-1).time);
    const T1 = phase1.R.index + phase1.tr;
    const T1p = phase1.R.index + 5 * phase1.tr;
    const T2 = phase2.R.index + phase2.tr;
    const T3 = phase4.ext.R.index + Math.max(phase3.tr, phase4.tr);
    const T3p =
        phase4.ext.R.index + ((phase4.pick.index ?? T) - phase2.R.index);
    const timeMark = [T1, T2, T3, T1p, T3p];

    const isBreak =
        phase4.pick.index &&
        mf.cmp(phase4.R1.price, !side, C.price) &&
        phase4.ext.tr < phase4.tr;
    let entry = isBreak ? phase4.R1.price : phase4.ext.R.price,
        progress = {};
    progress.steps = [
        [
            //
            bcValid,
            pr1Valid,
            T > T1,
            T < T1p,
        ],
        [
            //
            pr2Valid,
            s2Valid,
            T2 > T1,
            T > T2,
            !phase2.hasDouble,
        ],
        [
            //
            EF < CD,
            pr4Valid,
            s4Valid,
            T3 > T2,
            T > T3,
            phase4.ext.pr < phase2.ext.pr,
            !phase4.hasDouble,
        ],
    ];
    progress.step = 1;
    progress.result = progress.steps[0].every(Boolean);
    if (progress.result) {
        progress.step = 2;
        progress.result = progress.steps[1].every(Boolean);
        if (progress.result) {
            progress.step = 3;
            progress.result = progress.steps[2].every(Boolean);
        }
    }
    //
    const pStatus = "";
    //
    const [x, xp] = adjustTargetPrice(bcValid ? C.price : D.price, BC, !side);
    let y = x;
    if (isBreak) {
        const phase5 = scanPhase({
            side: !side,
            start: { time: phase4.B.time },
            end: { time: pickTime, price: phase4.ext.R.price },
        });
        const extra = Math.max(phase5.pr, phase5.ext.pr);
        [y] = adjustTargetPrice(xp, 2 * extra, !side);
    }
    const X = mf.fmtNum(x - entry, 1, true);
    const Y = mf.fmtNum(y - entry, 1, true);

    return {
        progress,
        timeMark,
        info: {
            rEpr1: phase1.rEpr,
            rEpr2: phase2.rEpr,
            rEpr3: phase3.rEpr,
            entry,
            pStatus,
            x,
            X,
            y,
            Y,
        },
    };
}
function calcExtensionPattern() {
    const { A, B, C } = points;
    const bc = B.price - C.price;
    let side = bc > 0;
    const pickTime = props.pickTimeToolRef.get();
    const phase1 = scanPhase({
        side,
        start: A,
        end: { time: Math.min(pickTime ?? B.time, B.time), price: B.price },
    });
    const phase2 = scanPhase({
        side: !side,
        start: phase1.R,
        end: { time: Math.min(pickTime ?? C.time, C.time), price: C.price },
    });
    const stopTime = props.indexToTime(4 * phase2.R.index - 3 * phase1.S.index);
    const phase3 = scanPhase({
        side,
        start: phase2.R,
        end: { time: Math.min(pickTime ?? stopTime, stopTime) },
        pick: { price: B.price },
    });

    const isBreak =
        (phase3.R1.price - C.price) / bc >= 0.5 && phase3.ext.tr < phase3.tr;
    const D = {
        price: isBreak ? phase3.R1.price : phase3.ext.R.price,
        index: isBreak ? phase3.R1.index : phase3.ext.R.index,
        time: isBreak ? phase3.R1.time : phase3.ext.R.time,
    };
    const E = {
        price: isBreak ? phase3.S1.price : phase3.ext.S.price,
        index: isBreak ? phase3.S1.index : phase3.ext.S.index,
        time: isBreak ? phase3.S1.time : phase3.ext.S.time,
        tAfter: isBreak ? phase3.S1.tAfter : phase3.ext.S.tAfter,
    };

    const phase4 = scanPhase({
        side: !side,
        start: D,
        end: { time: Math.min(pickTime ?? E.tAfter, E.tAfter), price: E.price },
    });

    const phase5 = scanPhase({
        side,
        start: E,
        end: { time: Math.min(pickTime ?? stopTime, stopTime) },
        pick: { price: D.price },
    });

    const F = {
        price: phase5.R.price,
        index: phase5.R.index,
        time: phase5.R.time,
    };

    console.log("calcExtensionPattern", [
        phase1,
        phase2,
        phase3,
        phase4,
        phase5,
    ]);

    const AB = mf.fmtNum(B.price - A.price, 1, true);
    const BC = mf.fmtNum(bc, 1, true);
    const CD = mf.fmtNum(D.price - C.price, 1, true);
    const DE = mf.fmtNum(E.price - D.price, 1, true);
    const EF = mf.fmtNum(F.price - E.price, 1, true);
    const FG = phase5.ext.pr;

    const TR3 = isBreak ? phase3.tr1 : phase3.tr;

    const T1 = phase1.R.index + phase1.tr;
    const T2 = phase2.R.index + phase2.tr;
    const T3 = D.index + TR3;
    const T4 = E.index + phase4.tr;
    const T5 = F.index + phase5.tr;
    const timeMark = [T1, T2, T3, T4, T5];

    const entry = D.price;
    let progress = {};
    progress.steps = [
        [
            //
            BC >= phase1.pr,
            phase2.R.index >= T1,
        ],
        [
            //
            CD <= AB,
            CD >= BC / 2,
            CD >= phase2.pr,
            D.index >= T2,
        ],
        [
            //
            DE <= BC,
            DE >= phase3.pr,
            TR3 <= phase1.tr,
            E.index >= T3,
        ],
        [
            //
            EF <= CD,
            EF >= DE / 2,
            EF >= phase4.pr,
            phase4.tr <= phase2.tr,
            F.index >= T4,
        ],
        [
            //
            ![B.price, D.price].includes(F.price),
            FG <= DE,
            FG >= phase5.pr,
            phase5.tr <= TR3,
            phase5.ext.S.iAfter >= T5,
        ],
    ];
    progress.step = 1;
    progress.result = progress.steps[0].every(Boolean);
    if (progress.result) {
        progress.step = 2;
        progress.result = progress.steps[1].every(Boolean);
        if (progress.result) {
            progress.step = 3;
            progress.result = progress.steps[2].every(Boolean);
            if (progress.result) {
                progress.step = 4;
                progress.result = progress.steps[3].every(Boolean);
                if (progress.result) {
                    progress.step = 5;
                    progress.result = progress.steps[4].every(Boolean);
                }
            }
        }
    }
    //
    const pStatus = mf.fmtNum(100 * (CD / BC), 1);
    //
    const [x1] = adjustTargetPrice(D.price, CD, side);
    const [y1] = adjustTargetPrice(D.price, 2 * CD, side);
    const X1 = mf.fmtNum(x1 - entry, 1, true);
    const Y1 = mf.fmtNum(y1 - entry, 1, true);
    const [x2] = adjustTargetPrice(F.price, EF, side);
    const [y2] = adjustTargetPrice(F.price, 2 * EF, side);
    const X2 = mf.fmtNum(x2 - entry, 1, true);
    const Y2 = mf.fmtNum(y2 - entry, 1, true);

    return {
        progress,
        timeMark,
        info: {
            rEpr1: phase1.rEpr,
            rEpr2: phase2.rEpr,
            rEpr3: phase3.rEpr,
            entry,
            pStatus,
            x: [x1, x2],
            X: [X1, X2],
            y: [y1, y2],
            Y: [Y1, Y2],
        },
    };
}
function calcExtensionPattern1() {
    const { A, B, C } = points;
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
        start: phase1.R,
        end: { time: Math.min(pickTime ?? C.time, C.time) },
    });
    const stopTime = props.indexToTime(
        phase1.R.index + 6 * (phase1.R.index - phase1.S.index)
    );
    const phase3 = scanPhase({
        side,
        start: phase2.R,
        end: { time: Math.min(pickTime ?? stopTime, stopTime) },
        pick: { price: B.price },
    });

    const isBreak =
        (phase3.R1.price - C.price) / bc >= 0.7 && phase3.ext.tr < phase3.tr;
    const D = {
        price: isBreak ? phase3.R1.price : phase3.ext.R.price,
        index: isBreak ? phase3.R1.index : phase3.ext.R.index,
        time: isBreak ? phase3.R1.time : phase3.ext.R.time,
    };
    const E = {
        price: isBreak ? phase3.S1.price : phase3.ext.S.price,
        index: isBreak ? phase3.S1.index : phase3.ext.S.index,
        time: isBreak ? phase3.S1.time : phase3.ext.S.time,
    };

    const phase4 = scanPhase({
        side,
        start: E,
        end: { time: pickTime, price: D.price },
    });

    console.log("calcExtensionPattern", [phase1, phase2, phase3, phase4]);

    const BC = mf.fmtNum(bc, 1, true);
    const CD = mf.fmtNum(D.price - C.price, 1, true);
    const DE = mf.fmtNum(E.price - D.price, 1, true);

    const pr3Valid = DE >= phase3.pr;

    const ir13 = (phase3.pick.index ?? D.index) - phase1.R.index;
    const gtType = phase2.R.index < phase1.R.index + ir13 / 2;

    const T = props.timeToIndex(pickTime ?? props.prices.at(-1).time);
    const T1 = phase1.R.index + phase1.tr;
    const T2 = phase2.R.index + phase2.tr;
    const T3 = phase3.ext.R.index + phase3.tr;
    const T1p = D.index + ir13;
    const T3p = 2 * E.index - D.index;
    const timeMark = [T1, T2, T3, T1p, T3p];

    const entry = D.price;
    let progress = {};
    progress.steps = [
        [
            //
            T > T1,
            T < T1p,
            T > T2,
            CD / BC >= 0.7,
            !phase3.hasDouble,
        ],
        [
            //
            DE < BC,
            pr3Valid,
            !phase4.hasDouble,
            gtType ? T < T3p : T > T3p,
            T > T3,
        ],
    ];
    progress.step = 1;
    progress.result = progress.steps[0].every(Boolean);
    if (progress.result) {
        progress.step = 2;
        progress.result = progress.steps[1].every(Boolean);
    }
    //
    const pStatus = mf.fmtNum(100 * (CD / BC), 1);
    //
    const [x1] = adjustTargetPrice(entry, CD, side);
    const [y1] = adjustTargetPrice(entry, 2 * CD, side);
    const X1 = mf.fmtNum(x1 - entry, 1, true);
    const Y1 = mf.fmtNum(y1 - entry, 1, true);
    const [x2] = adjustTargetPrice(entry, EF, side);
    const [y2] = adjustTargetPrice(entry, 2 * EF, side);
    const X2 = mf.fmtNum(x2 - entry, 1, true);
    const Y2 = mf.fmtNum(y2 - entry, 1, true);

    return {
        progress,
        timeMark,
        info: {
            rEpr1: phase1.rEpr,
            rEpr2: phase2.rEpr,
            rEpr3: phase3.rEpr,
            entry,
            pStatus,
            x: [x1, x2],
            X: [X1, X2],
            y: [y1, y2],
            Y: [Y1, Y2],
        },
    };
}
function scanPhase({ side, start, end, pick = {} }) {
    let S = { ...mf.cloneDeep(start), index: props.timeToIndex(start.time) },
        R = {},
        box = {},
        preBox = {},
        maxBox = {},
        pMaxBox = {},
        extBox = {},
        rEp,
        doubleTr = 0;
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
            if (i === 0) {
                box = {
                    R: { index, time, price },
                    S: { index, time, price },
                    pr: 0,
                    tr: 0,
                };
                preBox = mf.cloneDeep(box);
                maxBox = mf.cloneDeep(box);
            }
            if (mf.cmp(price, side, box.R.price)) {
                if (box.pr > 0) {
                    if (box.tr >= maxBox.tr && box.pr >= maxBox.pr) {
                        pMaxBox = mf.cloneDeep(maxBox);
                        maxBox = mf.cloneDeep(box);
                    }
                    // box = mergePreBox(box, preBox);
                    // const tempBox = mf.cloneDeep(maxBox);
                    // if (
                    //     (box.tr >= maxBox.tr && box.pr >= maxBox.pr) ||
                    //     box.tr >= 2 * maxBox.tr ||
                    //     box.pr >= 2 * maxBox.pr
                    // ) {
                    //     maxBox.R = mf.cloneDeep(box.R);
                    //     maxBox.S = mf.cloneDeep(box.S);
                    // }
                    // if (box.tr > maxBox.tr) maxBox.tr = box.tr;
                    // if (box.pr > maxBox.pr) maxBox.pr = box.pr;

                    // if (JSON.stringify(maxBox) !== JSON.stringify(tempBox)) {
                    //     pMaxBox = tempBox;
                    // }
                }
                box = {
                    R: { index, time, price },
                    S: { index, time, price },
                    pr: 0,
                    tr: 0,
                };
            } else {
                if (mf.cmp(price, !side, box.S.price)) {
                    box.S.price = price;
                    box.S.index = index;
                    box.S.time = time;
                    box.S.iAfter = index;
                    box.S.tAfter = time;
                    box.pr = mf.fmtNum(box.S.price - box.R.price, 1, true);
                    box.tr = index - box.R.index;
                } else if (price === box.S.price) {
                    box.S.iAfter = index;
                    box.S.tAfter = time;
                    box.tr = index - box.R.index;
                }
            }
            // if (end.price && price === end.price && price === box.R.price) {
            //     if (
            //         box.tr >= maxBox.tr / (maxBox.touch ? 2 : 1) &&
            //         box.pr >= maxBox.pr
            //     ) {
            //         maxBox = mf.cloneDeep(box);
            //         maxBox.tr = 2 * maxBox.tr;
            //         maxBox.touch = true;
            //     }
            // }
            if (pick.price && !pick.index && mf.cmp(price, side, pick.price)) {
                pick.index = index;
                pick.time = time;
            }
            if (price === start.price) {
                doubleTr = mf.fmtNum(index - S.index, 1);
            }
            return true;
        });
        extBox = mf.cloneDeep(box);
        R = mf.cloneDeep(box.R);
        rEp = mf.fmtNum(R.price - maxBox.R.price, 1, true);
    } else {
        R = mf.cloneDeep(S);
        maxBox = {
            R: R,
            S: {},
            pr: 0,
            tr: 0,
        };
        extBox = mf.cloneDeep(maxBox);
    }

    return {
        tr: maxBox.tr,
        pr: maxBox.pr,
        S1: maxBox.S,
        R1: maxBox.R,
        tr1: pMaxBox.tr,
        pr1: pMaxBox.pr,
        S,
        R,
        ext: extBox,
        rEp,
        rEpr: maxBox.pr ? mf.fmtNum(rEp / maxBox.pr, 1) : 0,
        pick,
        hasDouble: doubleTr > maxBox.tr / 2,
    };
}
function mergePreBox(box, preBox) {
    const dis = mf.fmtNum(box.R.price - preBox.R.price, 1, true);
    if (dis === 0.1 && dis < 0.1 * preBox.pr) {
        let _box = box.pr > preBox.pr ? box : preBox;
        _box.tr = preBox.tr + box.tr;
        return mf.cloneDeep(_box);
    } else return box;
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
    const side = points.B.price - points.A.price > 0;
    const lastBar = props.prices.at(-1);

    if (mf.cmp(lastBar.value, !side, points.C.price)) {
        let cTimeNew = lastBar.time;
        let cPriceNew = lastBar.value;
        for (let i = props.prices.length - 1; i >= 0; i--) {
            const time = props.prices[i].time;
            const price = props.prices[i].value;
            if (price === points.B.price) break;
            cTimeNew = time;
            cPriceNew = side
                ? Math.min(cPriceNew, price)
                : Math.max(cPriceNew, price);
        }
        points.C.time = cTimeNew;
        points.C.price = cPriceNew;
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
        Object.entries(points).forEach(([key, value]) => {
            param.points.push(key);
            param.data.push(value);
        });
    } else points = {};
    store.dispatch("tradingDerivative/drawTools", param);
}
function remove() {
    savePattern(true);
    props.pickTimeToolRef.remove();
    removePatternTool();
    setTimeMark([]);
    emit("setProgress", {});
}
function removePatternTool() {
    if (mf.isSet(lines.A)) {
        props.priceSeries.removePriceLine(lines.A);
        if (mf.isSet(lines.B)) {
            props.priceSeries.removePriceLine(lines.B);
            if (mf.isSet(lines.C)) {
                props.priceSeries.removePriceLine(lines.C);
                props.priceSeries.removePriceLine(lines.D);
                props.priceSeries.removePriceLine(lines.X1);
                props.priceSeries.removePriceLine(lines.Y1);
                props.priceSeries.removePriceLine(lines.X2);
                props.priceSeries.removePriceLine(lines.Y2);
            }
        }
    }
    lines = {};
}
function setTimeMark(data) {
    console.log("setTimeMark", data);
    const colors = [
        "#F44336",
        "#4CAF50",
        "#FFEB3B",
        "#00BCD4",
        "#673AB7",
        "#E91E63",
        // "#F44336",
        // "#009688",
        // "#FF9800",
    ];
    let result = [];
    for (let i = 0; i < data.length; i++) {
        let time = props.indexToTime(data[i]);
        if (time) {
            if (data.indexOf(data[i]) !== data.lastIndexOf(data[i])) time += i;
            result.push({
                time,
                value: 1,
                color: colors[i],
            });
        }
    }
    if (result.length) result.sort((a, b) => a.time - b.time);
    props.timeMarkSeries.setData(result);
}
function drag({ lineOptions }) {
    if (mf.isSet(lines.C)) {
        let point, changeOptions;
        points = {
            A: {
                time: points.A.time,
                price: +lines.A.options().price,
            },
            B: { price: +lines.B.options().price },
            C: { price: +lines.C.options().price },
        };
        savePattern();
        const {
            progress,
            timeMark,
            info: {
                rEpr1,
                rEpr2,
                rEpr3,
                entry,
                pStatus,
                x: [x1, x2],
                X: [X1, X2],
                y: [y1, y2],
                Y: [Y1, Y2],
            },
        } = calculatePattern();
        emit("setProgress", progress);
        setTimeMark(timeMark);
        //
        point = "A";
        changeOptions = { title: `A ${rEpr1}` };
        lines[point].applyOptions(changeOptions);
        //
        point = "B";
        changeOptions = { title: `B ${rEpr2}` };
        lines[point].applyOptions(changeOptions);
        //
        point = "C";
        changeOptions = { title: `C ${rEpr3}` };
        lines[point].applyOptions(changeOptions);
        //
        point = "D";
        changeOptions = {
            price: entry,
            title: "E " + pStatus,
        };
        if (lineOptions.point === point) delete changeOptions.price;
        lines[point].applyOptions(changeOptions);
        //
        point = "X1";
        changeOptions = {
            price: mf.fmtNum(x1),
            title: `X1 ${mf.fmtNum(X1)}`,
        };
        lines[point].applyOptions(changeOptions);
        //
        point = "Y1";
        changeOptions = {
            price: mf.fmtNum(y1),
            title: `Y1 ${mf.fmtNum(Y1)}`,
        };
        lines[point].applyOptions(changeOptions);
        //
        point = "X2";
        changeOptions = {
            price: mf.fmtNum(x2),
            title: `X2 ${mf.fmtNum(X2)}`,
        };
        lines[point].applyOptions(changeOptions);
        //
        point = "Y2";
        changeOptions = {
            price: mf.fmtNum(y2),
            title: `Y2 ${mf.fmtNum(Y2)}`,
        };
        lines[point].applyOptions(changeOptions);
    }
}
</script>
