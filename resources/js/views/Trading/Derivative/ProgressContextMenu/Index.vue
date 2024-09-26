<template>
    <div class="progress-popup" @click="stopPropagationEvent" title="">
        <div class="triangle-shadow"></div>
        <div class="triangle"></div>

        <div class="container">
            <div class="text">
                {{ $t("trading.derivative.progressContextMenu.start") }}
            </div>
            <i class="arrow far fa-arrow-alt-down"></i>
            <TreeNode
                v-if="isShowNode"
                :node="treeData"
                :index="0"
                v-model="treeValue"
                @update:modelValue="updateTreeValue"
            />
        </div>
    </div>
</template>

<script setup>
import TreeNode from "./TreeNode.vue";
import { ref, watch } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "change"]);

const isShowNode = ref(false);
const treeData = ref({});
import(`../../../../lang/${window.lang}/derivative.js`).then((e) => {
    treeData.value = e.default;
    isShowNode.value = true;
});

const treeValue = ref(props.modelValue);

watch(
    () => props.modelValue,
    (e) => (treeValue.value = e)
);

function updateTreeValue(e) {
    emit("update:modelValue", e);
    emit("change", e);
}

function stopPropagationEvent(e) {
    e.stopPropagation();
}
</script>

<style lang="scss">
.progress-popup {
    background: #4d4d5c;
    border: 0 solid rgba(0, 0, 0, 0.25);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    position: relative;
    padding: 10px;

    .triangle {
        width: 0px;
        height: 0px;
        top: 5px;
        left: -10px;
        border-style: solid;
        border-width: 9px 10px 9px 0;
        border-color: transparent #4d4d5c transparent transparent;
        position: absolute;
    }
    .triangle-shadow {
        width: 0px;
        height: 0px;
        top: 5px;
        left: -10px;
        border-style: solid;
        border-width: 9px 10px 9px transparent;
        border-color: transparent rgba(0, 0, 0, 0.1) transparent transparent;
        position: absolute;
    }
    .container {
        min-width: 250px;
        padding: auto 20px;

        input {
            text-align: center;
        }
        .dx-clear-button-area {
            margin: auto 0px;
        }

        .text {
            font-size: 18px;
            font-family: Roboto;
        }
        .arrow {
            font-size: 20px;
            margin: 10px auto 5px;
        }
    }
}
</style>
