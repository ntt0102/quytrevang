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
const props = defineProps(["symbol", "storeModule", "priceSeries", "levels"]);
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
        option.title = mf.fmtNum(ba);
        option.color = "#F44336";
        lines[option.point] = props.priceSeries.createPriceLine(option);
        param.points.push(option.point);
        //
        if (props.levels.includes(0.5)) {
            option.point = "X";
            option.price = mf.fmtNum(a - 0.5 * ba);
            option.title = mf.fmtNum(-0.5 * ba);
            option.color = "#2196F3";
            lines[option.point] = props.priceSeries.createPriceLine(option);
        }
        //
        if (props.levels.includes(1)) {
            option.point = "Y";
            option.price = mf.fmtNum(a - ba);
            option.title = mf.fmtNum(-ba);
            option.color = "#673AB7";
            lines[option.point] = props.priceSeries.createPriceLine(option);
        }
        //
        if (props.levels.includes(2)) {
            option.point = "Z";
            option.price = mf.fmtNum(a - 2 * ba);
            option.title = mf.fmtNum(-2 * ba);
            option.color = "#9C27B0";
            lines[option.point] = props.priceSeries.createPriceLine(option);
        }
        //
        if (props.levels.includes(4)) {
            option.point = "W";
            option.price = mf.fmtNum(a - 4 * ba);
            option.title = mf.fmtNum(-4 * ba);
            option.color = "#E91E63";
            lines[option.point] = props.priceSeries.createPriceLine(option);
        }
        //
        targetToolRef.value.classList.remove("selected");
    } else {
        option.point = "A";
        option.title = "0";
        option.color = "#FF9800";
        lines[option.point] = props.priceSeries.createPriceLine(option);
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
    lines[option.point] = props.priceSeries.createPriceLine(option);
    //
    option.point = "B";
    option.price = b;
    option.title = mf.fmtNum(ba);
    option.color = "#F44336";
    lines[option.point] = props.priceSeries.createPriceLine(option);
    //
    if (props.levels.includes(0.5)) {
        option.point = "X";
        option.price = mf.fmtNum(a - 0.5 * ba);
        option.title = mf.fmtNum(-0.5 * ba);
        option.color = "#2196F3";
        lines[option.point] = props.priceSeries.createPriceLine(option);
    }
    //
    if (props.levels.includes(1)) {
        option.point = "Y";
        option.price = mf.fmtNum(a - ba);
        option.title = mf.fmtNum(-ba);
        option.color = "#673AB7";
        lines[option.point] = props.priceSeries.createPriceLine(option);
    }
    //
    if (props.levels.includes(2)) {
        option.point = "Z";
        option.price = mf.fmtNum(a - 2 * ba);
        option.title = mf.fmtNum(-2 * ba);
        option.color = "#9C27B0";
        lines[option.point] = props.priceSeries.createPriceLine(option);
    }
    //
    if (props.levels.includes(4)) {
        option.point = "W";
        option.price = mf.fmtNum(a - 4 * ba);
        option.title = mf.fmtNum(-4 * ba);
        option.color = "#E91E63";
        lines[option.point] = props.priceSeries.createPriceLine(option);
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
        props.priceSeries.removePriceLine(lines.A);
        if (mf.isSet(lines.B)) {
            props.priceSeries.removePriceLine(lines.B);
            if (props.levels.includes(0.5))
                props.priceSeries.removePriceLine(lines.X);
            if (props.levels.includes(1))
                props.priceSeries.removePriceLine(lines.Y);
            if (props.levels.includes(2))
                props.priceSeries.removePriceLine(lines.Z);
            if (props.levels.includes(4))
                props.priceSeries.removePriceLine(lines.W);
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
        point = "A";
        if (lineOptions.point === "A") {
            ba = +lines.B.options().title;
            b = a + ba;
        } else if (lineOptions.point !== "B") {
            let div = 0;
            switch (lineOptions.point) {
                case "X":
                    div = 1.5;
                    break;
                case "Y":
                    div = 2;
                    break;
                case "Z":
                    div = 3;
                    break;
                case "W":
                    div = 5;
                    break;
            }
            ba = mf.fmtNum((b - newPrice) / div);
            a = b - ba;
            changeOptions = { price: a };
            lines[point].applyOptions(changeOptions);
        }
        param.points.push(point);
        param.data.push(a);
        //
        point = "B";
        changeOptions = { price: b, title: mf.fmtNum(ba) };
        if (lineOptions.point === point) delete changeOptions.price;
        lines[point].applyOptions(changeOptions);
        param.points.push(point);
        param.data.push(b);
        //
        if (props.levels.includes(0.5)) {
            point = "X";
            changeOptions = {
                price: mf.fmtNum(a - 0.5 * ba),
                title: mf.fmtNum(-0.5 * ba),
            };
            if (lineOptions.point === point) delete changeOptions.price;
            lines[point].applyOptions(changeOptions);
        }
        //
        if (props.levels.includes(1)) {
            point = "Y";
            changeOptions = {
                price: mf.fmtNum(a - ba),
                title: mf.fmtNum(-ba),
            };
            if (lineOptions.point === point) delete changeOptions.price;
            lines[point].applyOptions(changeOptions);
        }
        //
        if (props.levels.includes(2)) {
            point = "Z";
            changeOptions = {
                price: mf.fmtNum(a - 2 * ba),
                title: mf.fmtNum(-2 * ba),
            };
            if (lineOptions.point === point) delete changeOptions.price;
            lines[point].applyOptions(changeOptions);
        }
        //
        if (props.levels.includes(4)) {
            point = "W";
            changeOptions = {
                price: mf.fmtNum(a - 4 * ba),
                title: mf.fmtNum(-4 * ba),
            };
            if (lineOptions.point === point) delete changeOptions.price;
            lines[point].applyOptions(changeOptions);
        }
        //
        store.dispatch(`${props.storeModule}/drawTools`, param);
    }
}
</script>
