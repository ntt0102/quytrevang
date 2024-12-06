<template>
    <div class="scan-context" @click="stopPropagationEvent">
        <div class="triangle-shadow"></div>
        <div class="triangle"></div>

        <DxButtonGroup
            :items="items"
            :selected-item-keys="[props.modelValue]"
            key-expr="side"
            styling-mode="outlined"
            @item-click="itemClick"
        />
    </div>
</template>

<script setup>
import DxButtonGroup from "devextreme-vue/button-group";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const items = [
    {
        icon: "chevrondoubleleft",
        side: "left",
        text: t("trading.derivative.scanContext.leftScan"),
    },
    {
        icon: "chevrondoubleright",
        side: "right",
        text: t("trading.derivative.scanContext.rightScan"),
    },
];

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

function itemClick({ itemData: { side } }) {
    emit("update:modelValue", side);
}

function stopPropagationEvent(e) {
    e.stopPropagation();
}
</script>

<style lang="scss">
.scan-context {
    background: #4d4d5c;
    border: 0 solid rgba(0, 0, 0, 0.25);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    position: relative;
    width: 180px;
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

    .dx-buttongroup {
        .dx-buttongroup-wrapper {
            flex-flow: column nowrap !important;
            gap: 10px;
        }

        .dx-buttongroup-item {
            border-radius: 4px !important;
            border-width: 1px !important;
        }
    }
}
</style>
