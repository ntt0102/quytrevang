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
let points = {};
let lines = {};

defineExpose({
    isSelected,
    draw,
    load,
    refresh,
    remove,
    drag,
});

watch(patternStore, (data) => {
    if (data) load(data, { isCheck: true });
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
                changeOptions = { price: entry, title: "Entry " + pStatus };
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
                option.title = "Entry " + pStatus;
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
function load(data, { isSave = false, isCheck = false }) {
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
    option.title = "Entry " + pStatus;
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
        if (autoAdjust) adjustPatternPoints();
        removePatternTool();
        loadPatternTool();
    }
}
function calculatePattern() {
    const { A, B, C } = points;
    const bc = B.price - C.price;
    const side = bc > 0;
    const phase1 = scanPhase({
        phase: 1,
        start: A,
        end: B,
        retracementPrice: C.price,
    });
    let phase2 = scanPhase({ phase: 2, start: phase1.R, end: C });
    const phase3 = scanPhase({
        phase: 3,
        start: phase2.R,
        end: { price: B.price + (side ? 1 : -1) * phase1.rEp },
        breakPrices: [phase2.S1.price, B.price],
    });
    if (phase1.xBox.tr >= phase2.tr) phase2.tr = phase1.xBox.tr;

    console.log("calculatePattern", [phase1, phase2, phase3]);

    //
    const pr1Valid = mf.fmtNum(bc, 1, true) >= phase1.pr;
    const pr2Valid =
        mf.fmtNum(C.price - phase3.xBox.R.price, 1, true) >= phase2.pr;
    const pr3Valid = mf.fmtNum(phase3.xBox.pr) >= phase3.pr;

    const s1Valid = !mf.cmp(C.price, !side, phase1.S1.price);
    const s2Valid = !mf.cmp(phase3.xBox.R.price, side, phase2.S1.price);
    const s3Valid = !mf.cmp(phase3.xBox.S.price, !side, phase3.S1.price);

    const T1 = phase1.R.index + phase1.tr;
    const T1p = phase1.R.index + 5 * phase1.tr;
    const T2 = phase2.R.index + phase2.tr;
    const T3 = phase3.xBox.R.index + phase3.tr;
    const T3p = phase3.xBox.R.index + 5 * phase3.tr;
    const T4 = phase3.xBox.R.index + phase2.tr;
    const timeMark = [T1, T1p, T2, T3, T3p, T4];

    const T = phase3.xBox.S.index;

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
            pr1Valid || (phase1.rEt < phase1.tr && phase1.rEp >= phase1.sEp),
            s1Valid,
            !phase3.breakIndexs[1] || T1 < phase3.breakIndexs[1],
            T > T1,
            T < T1p,
        ],
        [
            //
            ...extraCond,
            T2 > T1,
            T < T3p,
            T < T2,
        ],
        [
            //
            phase2.R.index - phase1.R.index > 0.5 * phase1.tr,
            pr2Valid,
            !phase3.breakIndexs[1] || T2 < phase3.breakIndexs[1],
            T > T2,
        ],
        [
            //
            pr3Valid,
            s3Valid,
            T > T3,
            extraCond.every(Boolean) || T > T4,
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
                if (progress.result) entry = phase3.xBox.R.price;
            }
        }
    }
    //
    const p1Status = s1Valid ? (pr1Valid ? 1 : 0) : 2;
    const p2Status = s2Valid ? (pr2Valid ? 1 : 0) : 2;
    const p3Status = s3Valid ? (pr3Valid ? 1 : 0) : 2;
    const pStatus = `${p1Status}${p2Status}${p3Status}`;
    //
    const X = phase1.rEp;
    const x = adjustTargetPrice(B.price, X, side);
    const mainTR = phase3.breakIndexs[1] ?? T;
    const scale = parseInt((mainTR - phase1.R.index) / phase1.tr);
    const Y = scale > 1 ? X * scale : X;
    const y = adjustTargetPrice(B.price, Y, side);

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
function scanPhase({ phase, start, end, breakPrices, retracementPrice }) {
    let S = mf.cloneDeep(start);
    let R = mf.cloneDeep(end);
    const side = R.price > S.price;
    let box = {},
        maxBox = {},
        xBox = {},
        breakIndexs = [null, null],
        rEp,
        sEp,
        rEt;
    const pickTime = props.pickTimeToolRef.get();
    props.prices
        .filter((item) => {
            let cond = item.time >= S.time;
            if (pickTime) cond &= item.time <= pickTime;
            return cond;
        })
        .every((item, i) => {
            const price = item.value;
            const index = props.timeToIndex(item.time);
            if (index === -1) return false;
            if (i === 0 || price === S.price) {
                box = {
                    R: { index, price },
                    S: { index, price },
                    pr: 0,
                    tr: 0,
                };
                maxBox = mf.cloneDeep(box);
                xBox = mf.cloneDeep(box);
            }
            if (mf.cmp(price, side, box.R.price)) {
                if (box.pr > 0) {
                    if (box.pr >= maxBox.pr) {
                        maxBox.pr = box.pr;
                        maxBox.R = mf.cloneDeep(box.R);
                        maxBox.S = mf.cloneDeep(box.S);
                    }
                    if (box.tr > maxBox.tr) {
                        maxBox.tr = box.tr;
                    }
                    if (
                        phase === 1 &&
                        retracementPrice &&
                        !mf.cmp(box.S.price, !side, retracementPrice)
                    ) {
                        if (box.tr >= xBox.tr && box.pr >= xBox.pr)
                            xBox = mf.cloneDeep(box);
                    }
                }
                box = {
                    R: { index, price },
                    S: { index, price },
                    pr: 0,
                    tr: 0,
                };
                if (phase === 3 && breakPrices) {
                    if (!breakIndexs[0] && mf.cmp(price, side, breakPrices[0]))
                        breakIndexs[0] = index;
                    if (!breakIndexs[1] && mf.cmp(price, side, breakPrices[1]))
                        breakIndexs[1] = index;
                }
            } else {
                box.S.index = index;
                box.tr = box.S.index - box.R.index;
                if (mf.cmp(price, !side, box.S.price)) {
                    box.S.price = price;
                    box.pr = mf.fmtNum(box.S.price - box.R.price, 1, true);
                }
            }
            if (mf.cmp(price, !side, S.price)) {
                box.S.price = S.price;
                return false;
            }
            if (!mf.cmp(price, !side, R.price)) return false;
            return true;
        });
    if (mf.isSet(box)) {
        S.index = props.timeToIndex(S.time);
        R.index = box.S.index;
        R.time = props.indexToTime(box.S.index);
        rEp = mf.fmtNum(R.price - maxBox.R.price, 1, true);
        sEp = mf.fmtNum(S.price - maxBox.S.price, 1, true);
        rEt = R.index - maxBox.S.index;
        if (phase === 3) xBox = box;
    }

    return {
        tr: maxBox.tr,
        pr: maxBox.pr,
        rEp,
        sEp,
        rEpr: maxBox.pr ? mf.fmtNum(rEp / maxBox.pr) : 0,
        rEt,
        S1: maxBox.S,
        R1: maxBox.R,
        xBox,
        S,
        R,
        breakIndexs,
    };
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
    setTimeMark([]);
}
function setTimeMark(data) {
    const colors = [
        "#F44336",
        "#F44336",
        "#4CAF50",
        "#FFEB3B",
        "#FFEB3B",
        "#2196F3",
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
            title: "Entry " + pStatus,
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
