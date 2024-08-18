<template>
    <div class="line-popup" @click="stopPropagationEvent">
        <div class="triangle-shadow"></div>
        <div class="triangle"></div>

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
    </div>
</template>

<script setup>
import { ref, nextTick, watch } from "vue";
import { useI18n } from "vue-i18n";
import DxTextBox from "devextreme-vue/text-box";
import { confirm } from "devextreme/ui/dialog";

const { t } = useI18n();
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
    confirm(`${t("trading.share.deleteAllLine")}?`, t("titles.confirm")).then(
        (result) => {
            if (result) emit("deleteAllLine");
        }
    );
}
function stopPropagationEvent(e) {
    e.stopPropagation();
}
</script>

<style lang="scss">
.line-popup {
    background: #4d4d5c;
    border: 0 solid rgba(0, 0, 0, 0.25);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    position: relative;
    width: 200px;
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
