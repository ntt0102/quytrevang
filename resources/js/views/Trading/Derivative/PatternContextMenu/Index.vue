<template>
    <div class="pattern-popup" @click="stopPropagationEvent" title="">
        <div class="triangle-shadow"></div>
        <div class="triangle"></div>

        <div class="container">
            <div class="continue">
                <div class="title">
                    {{ $t("trading.derivative.patternContextMenu.continue") }}
                </div>
                <DxScrollView class="items">
                    <div
                        v-for="(item, index) in patterns.continueData"
                        :key="index"
                    >
                        <div class="name">{{ index + 1 }}.</div>
                        <Pattern :pattern="item" />
                    </div>
                </DxScrollView>
            </div>
            <div class="reversal">
                <div class="title">
                    {{ $t("trading.derivative.patternContextMenu.reversal") }}
                </div>
                <DxScrollView class="items">
                    <div
                        v-for="(item, index) in patterns.reversalData"
                        :key="index"
                    >
                        <div class="name">{{ index + 1 }}.</div>
                        <Pattern :pattern="item" />
                    </div>
                </DxScrollView>
            </div>
        </div>
    </div>
</template>

<script setup>
import patterns from "../../../../data/derivative";
import Pattern from "./Pattern.vue";

function stopPropagationEvent(e) {
    e.stopPropagation();
}
</script>

<style lang="scss">
.pattern-popup {
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
        display: flex;
        gap: 10px;
        font-family: Roboto;

        .items {
            width: 300px;
            height: 230px;
        }

        .name {
            text-align: left;
        }
    }
}
</style>
