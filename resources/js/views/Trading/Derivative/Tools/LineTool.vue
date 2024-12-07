<template>
    <div
        ref="lineToolRef"
        class="context command"
        :title="$t('trading.derivative.lineTool')"
        @click="lineToolClick"
        @contextmenu="lineToolContextmenu"
    >
        <i class="far fa-horizontal-rule"></i>
        <LineContext
            v-show="showLineContext"
            class="contextmenu"
            :enable="showLineContext"
            v-model:title="lineTitle"
            v-model:color="lineColor"
            @deleteAllLine="removeLineTool"
        >
        </LineContext>
    </div>
</template>
<script setup>
import LineContext from "./Contexts/LineContext.vue";
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["priceSeries"]);
const emit = defineEmits(["hideContext"]);
const lineToolRef = ref(null);
const showLineContext = ref(false);
const lineStore = computed(() => store.state.tradingDerivative.tools.line);
const lineTitle = ref("");
const lineColor = ref("#F44336");
let lines = [];

defineExpose({
    isSelected,
    hide,
    draw,
    drag,
});

watch(lineStore, (data) => {
    if (data) load(data);
});

function isSelected() {
    return lineToolRef.value.classList.contains("selected");
}
function hide(status) {
    showLineContext.value = status;
}
function lineToolClick(e) {
    emit("hideContext");
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
}
function lineToolContextmenu(e) {
    const oldValue = showLineContext.value;
    emit("hideContext");
    showLineContext.value = !oldValue;
}
function draw({ price }) {
    const TYPE = "line";
    const oldLength = lines.length;
    lines = lines.filter((line) => {
        const ops = line.options();
        const isExist = (ops.type = TYPE && price === +ops.price);
        if (isExist) {
            props.priceSeries.removePriceLine(line);
            store.dispatch("tradingDerivative/drawTools", {
                isRemove: true,
                name: TYPE,
                point: price,
            });
        }
        return !isExist;
    });
    if (lines.length === oldLength) {
        const color = lineColor.value;
        const title = lineTitle.value;
        const options = {
            lineType: TYPE,
            price: price,
            color,
            title,
            lineWidth: 1,
            lineStyle: 1,
            draggable: true,
        };
        lines.push(props.priceSeries.createPriceLine(options));
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: false,
            name: TYPE,
            points: [price],
            data: [{ color, title }],
        });
    }
    lineToolRef.value.classList.remove("selected");
}
function load(data) {
    removeLineTool(false);
    loadLineTool(data);
}
function loadLineTool(data) {
    const TYPE = "line";
    const options = {
        lineType: TYPE,
        lineWidth: 1,
        lineStyle: 1,
        draggable: true,
    };
    Object.entries(data).forEach(([price, { color, title }]) => {
        options.price = +price;
        options.color = color;
        options.title = title;
        lines.push(props.priceSeries.createPriceLine(options));
    });
}
function removeLineTool(withServer = true) {
    if (lines.length > 0) {
        if (withServer)
            store.dispatch("tradingDerivative/drawTools", {
                isRemove: true,
                name: "line",
            });
        lines.forEach((line) => props.priceSeries.removePriceLine(line));
        lines = [];
    }
}
function drag({ lineOptions, oldPrice, newPrice }) {
    store.dispatch("tradingDerivative/drawTools", {
        isRemove: true,
        name: "line",
        point: oldPrice,
    });
    const color = lineOptions.color;
    const title = lineOptions.title;
    store.dispatch("tradingDerivative/drawTools", {
        isRemove: false,
        name: "line",
        points: [newPrice],
        data: [{ color, title }],
    });
    lineToolRef.value.classList.remove("selected");
}
</script>
