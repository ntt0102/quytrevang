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
                    info: { rEpr1, rEpr2, rEpr3, entry, pStatus, x, X, y, Y },
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
                point = "X";
                changeOptions = {
                    price: mf.fmtNum(x),
                    title: `X ${mf.fmtNum(X)}`,
                };
                lines[point].applyOptions(changeOptions);
                //
                point = "Y";
                changeOptions = {
                    price: mf.fmtNum(y),
                    title: `Y ${mf.fmtNum(Y)}`,
                };
                lines[point].applyOptions(changeOptions);
            } else {
                points.C = { price };
                const {
                    progress,
                    timeMark,
                    info: { rEpr1, rEpr2, rEpr3, entry, pStatus, x, X, y, Y },
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
                option.point = "Y";
                option.price = mf.fmtNum(y);
                option.title = `Y ${mf.fmtNum(Y)}`;
                option.color = "#E91E63";
                option.draggable = false;
                lines[option.point] = props.priceSeries.createPriceLine(option);
                //
                option.point = "X";
                option.price = mf.fmtNum(x);
                option.title = `X ${mf.fmtNum(X)}`;
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
        info: { rEpr1, rEpr2, rEpr3, entry, pStatus, x, X, y, Y },
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
    option.point = "Y";
    option.price = mf.fmtNum(y);
    option.title = `Y ${mf.fmtNum(Y)}`;
    option.color = "#E91E63";
    option.draggable = false;
    lines[option.point] = props.priceSeries.createPriceLine(option);
    //
    option.point = "X";
    option.price = mf.fmtNum(x);
    option.title = `X ${mf.fmtNum(X)}`;
    option.color = "#2196F3";
    option.draggable = false;
    lines[option.point] = props.priceSeries.createPriceLine(option);
}
function refresh(autoAdjust = false) {
    if (mf.isSet(lines.C)) {
        if (autoAdjust && patternType.value) {
            adjustPatternPoints();
        }
        removePatternTool();
        loadPatternTool();
    }
}
function calculatePattern() {
    if (patternType.value) return calcContinuePattern();
    else return calcReversalPattern();
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
    entry = phase1.R1.price;
    if (progress.result) {
        if (T <= T2) {
            progress.step = 2;
            progress.result = progress.steps[1].every(Boolean);
            entry = phase2.S1.price;
        } else {
            progress.step = 3;
            progress.result = progress.steps[2].every(Boolean);
            entry = phase3.R1.price;
            if (progress.result) {
                progress.step = 4;
                progress.result = progress.steps[3].every(Boolean);
                if (progress.result) entry = phase3.ext.R.price;
            }
        }
    }
    //
    const p1Status = s1Valid ? (pr1Valid ? 1 : 0) : 2;
    const p2Status = s2Valid ? (pr2Valid ? 1 : 0) : 2;
    const p3Status = s3Valid ? (pr3Valid ? 1 : 0) : 2;
    const pStatus = `${p1Status}${p2Status}${p3Status}`;
    //
    let X, Y, o;
    X = phase1.rEp;
    Y = X;
    o = B.price;
    const x = adjustTargetPrice(o, X, side);
    const y = adjustTargetPrice(o, Y, side);

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
    });

    console.log("calcReversalPattern", [phase1, phase2, phase3, phase4]);

    //
    const BC = mf.fmtNum(bc, 1, true);
    const CD = mf.fmtNum(C.price - D.price, 1, true);
    const EF = mf.fmtNum(phase4.ext.pr);
    const pr1Valid = BC >= phase1.pr;
    const pr2Valid = CD >= phase2.pr;
    const pr4Valid = EF >= Math.max(phase3.pr, phase4.pr);

    const s2Valid = !mf.cmp(D.price, side, phase2.S1.price);
    const s4Valid = !mf.cmp(phase4.ext.S.price, side, phase4.S1.price);

    const T1 = phase1.R.index + phase1.tr;
    const T2 = phase2.R.index + phase2.tr;
    const T3 = phase4.ext.R.index + Math.max(phase3.tr, phase4.tr);
    const timeMark = [T1, T2, T3];

    const T = props.timeToIndex(pickTime ?? props.prices.at(-1).time);

    let entry,
        progress = {};
    progress.steps = [
        [
            //
            pr1Valid,
            T > T1,
        ],
        [
            //
            pr2Valid,
            s2Valid,
            T > T2,
            !phase2.hasDouble,
        ],
        [
            //
            pr4Valid,
            s4Valid,
            T > T3,
        ],
    ];
    progress.step = 1;
    progress.result = progress.steps[0].every(Boolean);
    entry = phase1.R1.price;
    if (progress.result) {
        progress.step = 2;
        progress.result = progress.steps[1].every(Boolean);
        entry = phase2.R1.price;
        if (progress.result) {
            progress.step = 3;
            progress.result = progress.steps[2].every(Boolean);
            if (progress.result) entry = phase4.ext.R.price;
        }
    }
    //
    const pStatus = "";
    //
    let X, Y, o;
    X = BC;
    Y = X;
    o = C.price;
    const x = adjustTargetPrice(o, X, !side);
    const y = adjustTargetPrice(o, Y, !side);

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
function scanPhase({ side, start, end }) {
    let S = { ...mf.cloneDeep(start), index: props.timeToIndex(start.time) },
        R = {},
        box = {},
        preBox = {},
        maxBox = {},
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
            const index = props.timeToIndex(item.time);
            if (index === -1) return false;
            if (i === 0) {
                box = {
                    R: { index, price },
                    S: { index, price },
                    pr: 0,
                    tr: 0,
                };
                preBox = mf.cloneDeep(box);
                maxBox = mf.cloneDeep(box);
            }
            if (mf.cmp(price, side, box.R.price)) {
                if (box.pr > 0) {
                    box = mergePreBox(box, preBox);
                    if (box.pr > maxBox.pr) maxBox.pr = box.pr;
                    if (box.tr >= maxBox.tr) {
                        maxBox.tr = box.tr;
                        maxBox.R = mf.cloneDeep(box.R);
                        maxBox.S = mf.cloneDeep(box.S);
                    }
                    preBox = mf.cloneDeep(box);
                }
                box = {
                    R: { index, price },
                    S: { index, price },
                    pr: 0,
                    tr: 0,
                };
            } else {
                box.tr = index - box.R.index;
                if (mf.cmp(price, !side, box.S.price)) {
                    box.S.index = index;
                    box.S.price = price;
                    box.pr = mf.fmtNum(box.S.price - box.R.price, 1, true);
                }
            }
            if (price === start.price) {
                doubleTr = mf.fmtNum(index - S.index, 1);
            }
            return true;
        });
        extBox = box;
        R.price = box.R.price;
        R.index = box.R.index;
        R.time = props.indexToTime(R.index);
        rEp = mf.fmtNum(R.price - maxBox.R.price, 1, true);
    } else {
        R = mf.cloneDeep(S);
        maxBox = {
            R: R,
            S: {},
            pr: 0,
            tr: 0,
        };
        extBox = maxBox;
    }

    return {
        tr: maxBox.tr,
        pr: maxBox.pr,
        S1: maxBox.S,
        R1: maxBox.R,
        S,
        R,
        ext: extBox,
        rEp,
        rEpr: maxBox.pr ? mf.fmtNum(rEp / maxBox.pr, 1) : 0,
        hasDouble: doubleTr > maxBox.tr / 2,
    };
}
function mergePreBox(box, preBox) {
    const dis = mf.fmtNum(box.R.price - preBox.R.price, 1, true);
    if (dis === 0.1) {
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

    if (side) {
        if (decimal >= 0.1 && decimal <= 0.2) {
            return Math.floor(target);
        } else if (decimal >= 0.6 && decimal <= 0.7) {
            return Math.floor(target) + 0.5;
        }
    } else {
        if (decimal >= 0.8 && decimal <= 0.9) {
            return Math.ceil(target);
        } else if (decimal >= 0.3 && decimal <= 0.4) {
            return Math.floor(target) + 0.5;
        }
    }

    return target;
}
function adjustPatternPoints() {
    const pickTime = props.pickTimeToolRef.get();
    if (pickTime) return false;
    //
    const side = points.B.price - points.A.price > 0;
    const lastPrice = props.prices.at(-1).value;

    if (mf.cmp(lastPrice, !side, points.C.price)) {
        let cPriceNew = lastPrice;
        for (let i = props.prices.length - 1; i >= 0; i--) {
            const price = props.prices[i].value;
            if (price === points.B.price) break;
            cPriceNew = side
                ? Math.min(cPriceNew, price)
                : Math.max(cPriceNew, price);
        }
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
                props.priceSeries.removePriceLine(lines.X);
                props.priceSeries.removePriceLine(lines.Y);
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
        "#F44336",
        "#009688",
        "#FF9800",
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
            info: { rEpr1, rEpr2, rEpr3, entry, pStatus, x, X, y, Y },
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
        point = "X";
        changeOptions = {
            price: mf.fmtNum(x),
            title: `X ${mf.fmtNum(X)}`,
        };
        lines[point].applyOptions(changeOptions);
        //
        point = "Y";
        changeOptions = {
            price: mf.fmtNum(y),
            title: `Y ${mf.fmtNum(Y)}`,
        };
        lines[point].applyOptions(changeOptions);
    }
}
</script>
