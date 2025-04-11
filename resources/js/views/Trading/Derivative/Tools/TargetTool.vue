<template>
    <div
        ref="targetToolRef"
        class="command"
        :title="$t('trading.derivative.targetTool')"
        @click="targetToolClick"
        @contextmenu="targetToolContextmenu"
    >
        <i class="far fa-line-height"> </i>
    </div>
</template>
<script setup>
import { ref, inject, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const mf = inject("mf");
const props = defineProps([
    "symbol",
    "storeModule",
    "drawPriceLine",
    "levels",
    "isPercent",
    "showPercent",
]);
const emit = defineEmits(["hideContext"]);
const targetToolRef = ref(null);
const targetStore = computed(() => store.state[props.storeModule].tools.target);
let lines = {};

defineExpose({
    isSelected,
    draw,
    drag,
    remove,
});

watch(targetStore, (data) => {
    if (data) load(data);
});

function isSelected() {
    return targetToolRef.value.classList.contains("selected");
}
function targetToolClick(e) {
    emit("hideContext");
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) {
        e.target.classList.add("selected");
        removeTargetTool();
    }
}
function targetToolContextmenu(e) {
    removeTargetTool();
    e.target.classList.remove("selected");
}
function draw({ price }) {
    const TYPE = "target";
    let option = {
        lineType: TYPE,
        price: price,
        lineWidth: 1,
        lineStyle: 1,
        draggable: true,
    };
    let param = {
        isRemove: false,
        symbol: props.symbol,
        name: TYPE,
        points: [],
        data: [price],
    };
    if (mf.isSet(lines.A)) {
        const a = +lines.A.options().price;
        const ba = price - a;
        option.point = "B";
        option.ba = mf.fmtNum(ba);
        option.title = titleFormat(1, ba, a);
        option.color = "#F44336";
        lines[option.point] = props.drawPriceLine(option);
        param.points.push(option.point);
        //
        if (props.levels.includes(0.5)) {
            option.point = "X";
            option.price = mf.fmtNum(a - 0.5 * ba);
            option.title = titleFormat(-0.5, ba, a, 1);
            option.color = "#2196F3";
            lines[option.point] = props.drawPriceLine(option);
        }
        //
        if (props.levels.includes(1)) {
            option.point = "Y";
            option.price = mf.fmtNum(a - ba);
            option.title = titleFormat(-1, ba, a);
            option.color = "#673AB7";
            lines[option.point] = props.drawPriceLine(option);
        }
        //
        if (props.levels.includes(2)) {
            option.point = "Z";
            option.price = mf.fmtNum(a - 2 * ba);
            option.title = titleFormat(-2, ba, a);
            option.color = "#9C27B0";
            lines[option.point] = props.drawPriceLine(option);
        }
        //
        if (props.levels.includes(4)) {
            option.point = "W";
            option.price = mf.fmtNum(a - 4 * ba);
            option.title = titleFormat(-4, ba, a);
            option.color = "#E91E63";
            lines[option.point] = props.drawPriceLine(option);
        }
        //
        targetToolRef.value.classList.remove("selected");
    } else {
        option.point = "A";
        option.title = "0";
        option.color = "#FF9800";
        lines[option.point] = props.drawPriceLine(option);
        param.points.push(option.point);
    }
    store.dispatch(`${props.storeModule}/drawTools`, param);
}
function load(points) {
    removeTargetTool(false);
    loadTargetTool(points);
}
function loadTargetTool(points) {
    const TYPE = "target";
    let option = {
        lineType: TYPE,
        lineWidth: 1,
        lineStyle: 1,
        draggable: true,
    };
    const a = points.A;
    const b = points.B;
    const ba = b - a;
    //
    option.point = "A";
    option.price = a;
    option.title = "0";
    option.color = "#FF9800";
    lines[option.point] = props.drawPriceLine(option);
    //
    option.point = "B";
    option.price = b;
    option.ba = mf.fmtNum(ba);
    option.title = titleFormat(1, ba, a);
    option.color = "#F44336";
    lines[option.point] = props.drawPriceLine(option);
    //
    if (props.levels.includes(0.5)) {
        option.point = "X";
        option.price = mf.fmtNum(a - 0.5 * ba);
        option.title = titleFormat(-0.5, ba, a, 1);
        option.color = "#2196F3";
        lines[option.point] = props.drawPriceLine(option);
    }
    //
    if (props.levels.includes(1)) {
        option.point = "Y";
        option.price = mf.fmtNum(a - ba);
        option.title = titleFormat(-1, ba, a);
        option.color = "#673AB7";
        lines[option.point] = props.drawPriceLine(option);
    }
    //
    if (props.levels.includes(2)) {
        option.point = "Z";
        option.price = mf.fmtNum(a - 2 * ba);
        option.title = titleFormat(-2, ba, a);
        option.color = "#9C27B0";
        lines[option.point] = props.drawPriceLine(option);
    }
    //
    if (props.levels.includes(4)) {
        option.point = "W";
        option.price = mf.fmtNum(a - 4 * ba);
        option.title = titleFormat(-4, ba, a);
        option.color = "#E91E63";
        lines[option.point] = props.drawPriceLine(option);
    }
}
function remove() {
    removeTargetTool(false);
}
function removeTargetTool(withServer = true) {
    if (withServer)
        store.dispatch(`${props.storeModule}/drawTools`, {
            isRemove: true,
            symbol: props.symbol,
            name: "target",
        });
    if (mf.isSet(lines.A)) {
        props.drawPriceLine(lines.A, true);
        if (mf.isSet(lines.B)) {
            props.drawPriceLine(lines.B, true);
            if (props.levels.includes(0.5)) props.drawPriceLine(lines.X, true);
            if (props.levels.includes(1)) props.drawPriceLine(lines.Y, true);
            if (props.levels.includes(2)) props.drawPriceLine(lines.Z, true);
            if (props.levels.includes(4)) props.drawPriceLine(lines.W, true);
        }
    }
    lines = {};
}
function drag({ lineOptions, newPrice }) {
    if (mf.isSet(lines.B)) {
        let param = {
            isRemove: false,
            symbol: props.symbol,
            name: "target",
            points: [],
            data: [],
        };
        let point, changeOptions;
        let a = +lines.A.options().price;
        let b = +lines.B.options().price;
        let ba = b - a;
        //
        if (lineOptions.point !== "X") {
            point = "A";
            if (lineOptions.point === point) {
                ba = +lines.B.options().ba;
                b = a + ba;
            }
            param.points.push(point);
            param.data.push(a);
            //
            point = "B";
            if (!["A", "B", "X"].includes(lineOptions.point)) {
                let div = 0;
                switch (lineOptions.point) {
                    case "Y":
                        div = 1;
                        break;
                    case "Z":
                        div = 2;
                        break;
                    case "W":
                        div = 4;
                        break;
                }
                ba = mf.fmtNum((a - newPrice) / div);
                b = a + ba;
            }
            changeOptions = {
                price: b,
                ba: mf.fmtNum(ba),
                title: titleFormat(1, ba, a),
            };
            if (lineOptions.point === point) delete changeOptions.price;
            lines[point].applyOptions(changeOptions);
            param.points.push(point);
            param.data.push(b);
            //
            if (props.levels.includes(1)) {
                point = "Y";
                changeOptions = {
                    price: mf.fmtNum(a - ba),
                    title: titleFormat(-1, ba, a),
                };
                if (lineOptions.point === point) delete changeOptions.price;
                lines[point].applyOptions(changeOptions);
            }
            //
            if (props.levels.includes(2)) {
                point = "Z";
                changeOptions = {
                    price: mf.fmtNum(a - 2 * ba),
                    title: titleFormat(-2, ba, a),
                };
                if (lineOptions.point === point) delete changeOptions.price;
                lines[point].applyOptions(changeOptions);
            }
            //
            if (props.levels.includes(4)) {
                point = "W";
                changeOptions = {
                    price: mf.fmtNum(a - 4 * ba),
                    title: titleFormat(-4, ba, a),
                };
                if (lineOptions.point === point) delete changeOptions.price;
                lines[point].applyOptions(changeOptions);
            }
            //
            store.dispatch(`${props.storeModule}/drawTools`, param);
        }

        if (props.levels.includes(0.5)) {
            point = "X";
            let div = -0.5;
            if (lineOptions.point === point) {
                div = mf.fmtNum((newPrice - a) / ba, 2);
            }
            changeOptions = {
                price: mf.fmtNum(a + div * ba),
                title: titleFormat(div, ba, a, 1),
            };
            if (lineOptions.point === point) delete changeOptions.price;
            lines[point].applyOptions(changeOptions);
        }
    }
}
function titleFormat(multiplier, ba, a, digits = 0) {
    let title = "";
    const base = multiplier * ba;
    title += props.isPercent
        ? mf.fmtNum((100 * base) / a) + " %"
        : mf.fmtNum(base);
    if (props.showPercent) {
        title += " (" + mf.fmtNum(-multiplier * 100, digits) + " %)";
    }
    return title;
}
</script>
