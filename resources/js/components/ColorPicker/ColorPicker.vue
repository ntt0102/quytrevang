<template>
    <div class="vc-twitter">
        <div class="vc-twitter-triangle-shadow"></div>
        <div class="vc-twitter-triangle"></div>

        <div class="vc-twitter-body">
            <span
                class="vc-twitter-swatch"
                :style="{
                    background: color,
                    boxShadow: `0 0 4px ${color}`,
                }"
                v-for="(color, index) in defaultColors"
                :key="index"
                @click="handlerClick(color)"
            >
            </span>
            <div class="vc-twitter-clear"></div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const defaultColors = ref([
    "#FF6900",
    "#FCB900",
    "#7BDCB5",
    "#00D084",
    "#8ED1FC",
    "#0693E3",
    "#ABB8C3",
    "#EB144C",
    "#F78DA7",
    "#9900EF",
]);

function handlerClick(color) {
    emit("update:modelValue", color);
}
</script>

<style lang="scss">
.vc-twitter {
    background: #4d4d5c;
    border: 0 solid rgba(0, 0, 0, 0.25);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    position: relative;
    width: 204px;

    .vc-twitter-triangle {
        width: 0px;
        height: 0px;
        top: 5px;
        left: -10px;
        border-style: solid;
        border-width: 9px 10px 9px 0;
        border-color: transparent #4d4d5c transparent transparent;
        position: absolute;
    }
    .vc-twitter-triangle-shadow {
        width: 0px;
        height: 0px;
        top: 5px;
        left: -10px;
        border-style: solid;
        border-width: 9px 10px 9px transparent;
        border-color: transparent rgba(0, 0, 0, 0.1) transparent transparent;
        position: absolute;
    }

    .vc-twitter-body {
        padding: 15px 9px 9px 15px;

        .vc-twitter-swatch {
            width: 30px;
            height: 30px;
            float: left;
            border-radius: 4px;
            margin: 0 6px 6px 0;
            cursor: pointer;
            position: relative;
            outline: none;
        }
        .vc-twitter-clear {
            clear: both;
        }
    }
}
</style>
