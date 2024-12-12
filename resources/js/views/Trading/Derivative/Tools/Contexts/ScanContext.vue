<template>
    <CoreContext class="scan-context">
        <DxButtonGroup
            :items="items"
            :selected-item-keys="[props.modelValue]"
            key-expr="side"
            styling-mode="outlined"
            @item-click="itemClick"
        />
    </CoreContext>
</template>

<script setup>
import CoreContext from "./CoreContext.vue";
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
</script>

<style lang="scss">
.scan-context {
    width: 180px;
    text-align: center;

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
