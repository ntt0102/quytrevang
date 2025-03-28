<template>
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
    if (mf.isSet(lines.X1)) {
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
        if (mf.cmp(price, side, S.price, true)) S = { index, time, price };
        //
        if (C.index > A.index) {
            const bc = mf.fmtNum(B.price - C.price, 1, true);
            if (bc >= bcThreshold) {
                if (A.index - S.index >= C.index - B.index) {
                    const as = mf.fmtNum(A.price - S.price, 1, true);
                    if (as > bc) break;
                }
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
        target: {
            x: [x1],
            X: [X1],
            y: [y1, y2],
            Y: [Y1, Y2],
        },
    } = calculatePattern();
    //
    option.point = "Y1";
    option.price = mf.fmtNum(y1);
    option.title = `Y1 ${mf.fmtNum(Y1)}`;
    option.color = "#00FFFF";
    option.draggable = false;
    lines[option.point] = series.pattern.createPriceLine(option);
    //
    option.point = "X1";
    option.price = mf.fmtNum(x1);
    option.title = `X1 ${mf.fmtNum(X1)}`;
    option.color = "#8000FF";
    option.draggable = false;
    lines[option.point] = series.pattern.createPriceLine(option);
    //
    option.point = "Y2";
    option.price = mf.fmtNum(y2);
    option.title = `Y2 ${mf.fmtNum(Y2)}`;
    option.color = "#FF1493";
    option.draggable = false;
    lines[option.point] = series.pattern.createPriceLine(option);
}
function refresh(autoAdjust = false) {
    if (mf.isSet(lines.X1)) {
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
            // result = calcContinuePattern();
            break;
        case 2:
            // result = calcReversalPattern();
            break;
        case 3:
            result = calcExtensionPattern();
            break;
    }
    emit("setProgress", result.progress);
    setTimeMark(result.timeMark);
    series.pattern.setData(result.points);
    return result;
}
function calcExtensionPattern() {
    const { A, B, C } = scanPoints;
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
    });

    const F = {
        price: phase5.ext.R.price,
        index: phase5.ext.R.index,
        time: phase5.ext.R.time,
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
            phase2.R.index > T1,
        ],
        [
            //
            CD <= AB,
            CD >= BC / 2,
            CD >= phase2.pr,
            D.index > T2,
        ],
        [
            //
            DE <= BC,
            DE >= phase3.pr,
            TR3 <= phase1.tr,
            E.index > T3,
        ],
        [
            //
            EF <= CD,
            EF >= DE / 2,
            EF >= phase4.pr,
            phase4.tr <= phase2.tr,
            F.index > T4,
        ],
        [
            //
            ![B.price, D.price].includes(F.price),
            FG <= DE,
            FG >= phase5.pr,
            phase5.tr <= TR3,
            phase5.ext.S.index > T5,
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
    const [x1] = adjustTargetPrice(D.price, CD, side);
    const [y1] = adjustTargetPrice(D.price, 2 * CD, side);
    const X1 = mf.fmtNum(x1 - entry, 1, true);
    const Y1 = mf.fmtNum(y1 - entry, 1, true);
    const [y2] = adjustTargetPrice(F.price, 2 * EF, side);
    const Y2 = mf.fmtNum(y2 - entry, 1, true);

    const points = [
        { time: A.time, value: A.price, color: "#FF7F00" },
        { time: phase1.R.time, value: phase1.R.price, color: "#FF0000" },
        { time: phase2.R.time, value: phase2.R.price, color: "#FF1493" },
        { time: D.time, value: D.price, color: "#8000FF" },
        { time: E.time, value: E.price, color: "#00FFFF" },
        { time: F.time, value: F.price, color: "#00FF00" },
        {
            time: phase5.ext.S.time,
            value: phase5.ext.S.price,
            color: "#00FF00",
        },
    ];

    return {
        progress,
        timeMark,
        points: makeUnique(points),
        target: {
            x: [x1],
            X: [X1],
            y: [y1, y2],
            Y: [Y1, Y2],
        },
    };
}
function scanPhase({ side, start, end }) {
    let S = { ...mf.cloneDeep(start), index: props.timeToIndex(start.time) },
        R = {},
        box = {},
        maxBox = {},
        pMaxBox = {},
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
            if (i === 0) {
                box = {
                    R: { index, time, price },
                    S: { index, time, price },
                    pr: 0,
                    tr: 0,
                };
                maxBox = mf.cloneDeep(box);
            }
            if (mf.cmp(price, side, box.R.price)) {
                if (box.pr > 0) {
                    if (box.tr >= maxBox.tr && box.pr >= maxBox.pr) {
                        pMaxBox = mf.cloneDeep(maxBox);
                        maxBox = mf.cloneDeep(box);
                    }
                }
                box = {
                    R: { index, time, price },
                    S: { index, time, price },
                    pr: 0,
                    tr: 0,
                };
            } else {
                if (mf.cmp(price, !side, box.S.price)) {
                    box.S = { index, time, price };
                    box.S.tAfter = time;
                    box.pr = mf.fmtNum(price - box.R.price, 1, true);
                    box.tr = index - box.R.index;
                } else if (price === box.S.price) {
                    box.S.tAfter = time;
                }
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
    const side = scanPoints.B.price - scanPoints.A.price > 0;
    const lastBar = props.prices.at(-1);

    if (mf.cmp(lastBar.value, !side, scanPoints.C.price)) {
        let cTimeNew = lastBar.time;
        let cPriceNew = lastBar.value;
        for (let i = props.prices.length - 1; i >= 0; i--) {
            const time = props.prices[i].time;
            const price = props.prices[i].value;
            if (price === scanPoints.B.price) break;
            cTimeNew = time;
            cPriceNew = side
                ? Math.min(cPriceNew, price)
                : Math.max(cPriceNew, price);
        }
        scanPoints.C.time = cTimeNew;
        scanPoints.C.price = cPriceNew;
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
    if (mf.isSet(lines.X1)) {
        series.pattern.removePriceLine(lines.X1);
        series.pattern.removePriceLine(lines.Y1);
        series.pattern.removePriceLine(lines.X2);
        series.pattern.removePriceLine(lines.Y2);
    }
    lines = {};
}
function setTimeMark(data) {
    const colors = [
        "#FF0000",
        "#FF1493",
        "#8000FF",
        "#00FFFF",
        "#00FF00",
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
</script>
