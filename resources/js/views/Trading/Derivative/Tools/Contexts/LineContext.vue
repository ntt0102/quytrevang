<template>
    <CoreContext class="line-context">
        <div class="input">
            <DxTextBox
                ref="titleRef"
                :value="props.title"
                :show-clear-button="true"
                :input-attr="{ style: `color:${props.color}` }"
                @valueChanged="updateTitle"
            />
            <DxButton icon="trash" type="danger" @click="deleteAllLine()" />
        </div>
        <div class="color">
            <div
                class="color-swatch"
                :style="{
                    background: color,
                    boxShadow: `0 0 4px ${color}`,
                }"
                v-for="(color, index) in defaultColors"
                :key="index"
                @click="updateColor(color)"
            ></div>
        </div>
    </CoreContext>
</template>

<script setup>
import CoreContext from "./CoreContext.vue";
import DxTextBox from "devextreme-vue/text-box";
import { ref, nextTick, watch } from "vue";

const props = defineProps(["enable", "title", "color"]);
const emit = defineEmits(["update:title", "update:color"]);

const titleRef = ref(null);
const defaultColors = ref([
    "#F44336",
    "#FF9800",
    "#FFEB3B",
    "#4CAF50",
    "#009688",
    "#00BCD4",
    "#2196F3",
    "#673AB7",
    "#9C27B0",
    "#E91E63",
]);

watch(
    () => props.enable,
    (value) => {
        if (value) nextTick().then(() => titleRef.value.instance.focus());
    }
);

function updateTitle({ value }) {
    emit("update:title", value);
}
function updateColor(color) {
    emit("update:color", color);
}
function deleteAllLine() {
    emit("deleteAllLine");
}
</script>

<style lang="scss">
.line-context {
    width: 200px;

    .input {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
    }

    .color {
        .color-swatch {
            width: 30px;
            height: 30px;
            float: left;
            border-radius: 4px;
            margin: 0 6px 6px 0;
            cursor: pointer;
            position: relative;
            outline: none;
        }
    }
}
</style>
