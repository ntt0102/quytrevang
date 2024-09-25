<template>
    <div class="progress-popup" @click="stopPropagationEvent" title="">
        <div class="triangle-shadow"></div>
        <div class="triangle"></div>

        <div class="container">
            {{ value }}
            <div class="text">
                {{ $t("trading.derivative.progressContextMenu.start") }}
            </div>
            <i class="arrow far fa-arrow-alt-down"></i>
            <TreeNode :node="treeData" :index="0" v-model="value" />
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import TreeNode from "./TreeNode.vue";

const treeData = reactive({
    children: [
        {
            name: "Trùng đỉnh đáy",
            children: [
                {
                    name: "Child Node 1.1",
                    children: [
                        { name: "Child Node 1.1.1", children: [] },
                        { name: "Child Node 1.1.2", children: [] },
                    ],
                },
                {
                    name: "Child Node 1.2",
                    children: [],
                },
            ],
        },
    ],
});

const value = reactive([]);

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
        top: 175px;
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
        min-width: 200px;
        padding: 10px;

        .text {
            font-size: 20px;
            font-family: Roboto;
        }
        .arrow {
            font-size: 30px;
            margin: 20px auto 10px;
        }
    }
}
</style>
