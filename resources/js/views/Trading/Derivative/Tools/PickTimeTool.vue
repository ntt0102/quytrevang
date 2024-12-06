<template>
    <div
        ref="pickTimeToolRef"
        class="command"
        :title="$t('trading.derivative.pickTimeTool')"
        @click="pickTimeToolClick"
        @contextmenu="pickTimeToolContextmenu"
    >
        <i class="far fa-pipe"></i>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["pickTimeSeries"]);
const emit = defineEmits(["refreshPattern", "hideContext"]);
const pickTimeToolRef = ref(null);
let pickTime = null;

defineExpose({
    isSelected,
    draw,
    load,
    remove: removePickTimeTool,
    get,
});
function isSelected() {
    return pickTimeToolRef.value.classList.contains("selected");
}
function get() {
    return pickTime;
}
function pickTimeToolClick(e) {
    emit("hideContext");
    const selected = e.target.classList.contains("selected");
    document
        .querySelectorAll(".tool-area > .command:not(.drawless)")
        .forEach((el) => el.classList.remove("selected"));
    if (!selected) e.target.classList.add("selected");
}
function pickTimeToolContextmenu(e) {
    e.target.classList.remove("selected");
    removePickTimeTool();
    emit("refreshPattern");
}
function draw({ time }) {
    store.dispatch("tradingDerivative/drawTools", {
        isRemove: false,
        name: "0_pt",
        points: [0],
        data: [time],
    });
    load(time);
    emit("refreshPattern");
    pickTimeToolRef.value.classList.remove("selected");
}
function load(time) {
    pickTime = time;
    props.pickTimeSeries.setData([{ time, value: 1, color: "#9C27B0" }]);
}
function removePickTimeTool(withServer = true) {
    if (withServer)
        store.dispatch("tradingDerivative/drawTools", {
            isRemove: true,
            name: "0_pt",
        });
    props.pickTimeSeries.setData([]);
    pickTime = null;
}
</script>
