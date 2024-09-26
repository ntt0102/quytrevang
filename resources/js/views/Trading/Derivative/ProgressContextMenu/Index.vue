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
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "change"]);

const treeData = ref({
    items: [
        {
            name: t("trading.derivative.progressContextMenu.step1"),
            items: [
                {
                    name: t("trading.derivative.progressContextMenu.step11"),
                    items: [
                        {
                            name: t(
                                "trading.derivative.progressContextMenu.step111"
                            ),
                            items: [
                                {
                                    name: t(
                                        "trading.derivative.progressContextMenu.step1111"
                                    ),
                                    items: t(
                                        "trading.derivative.progressContextMenu.step11111"
                                    ),
                                },
                                {
                                    name: t(
                                        "trading.derivative.progressContextMenu.step1112"
                                    ),
                                    items: [
                                        {
                                            name: "Giá tạo nền",
                                            items: t(
                                                "trading.derivative.progressContextMenu.step11121"
                                            ),
                                        },
                                        {
                                            name: "Giá gãy hỗ trợ",
                                            items: t(
                                                "trading.derivative.progressContextMenu.step11122"
                                            ),
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: t("trading.derivative.progressContextMenu.step12"),
                    items: [
                        {
                            name: t(
                                "trading.derivative.progressContextMenu.step121"
                            ),
                            items: [
                                {
                                    name: t(
                                        "trading.derivative.progressContextMenu.step1211"
                                    ),
                                    items: t(
                                        "trading.derivative.progressContextMenu.step12111"
                                    ),
                                },
                                {
                                    name: t(
                                        "trading.derivative.progressContextMenu.step1212"
                                    ),
                                    items: t(
                                        "trading.derivative.progressContextMenu.step12121"
                                    ),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
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
        min-width: 230px;
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
