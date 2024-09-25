<template>
    <div v-if="node.children && node.children.length > 0">
        node-{{ index }}-{{ modelValue }}-{{ childValue }}
        <DxSelectBox
            :items="node.children"
            v-model="selectedChild"
            displayExpr="name"
            :show-clear-button="true"
            :placeholder="$t('titles.dxSelectPlacehoder')"
            @valueChanged="handleSelectChange"
        />
    </div>
    <div class="text" v-else>
        {{ $t("trading.derivative.progressContextMenu.end") }}
    </div>

    <div v-if="isChildShow">
        <i class="arrow far fa-arrow-alt-down"></i>
        <TreeNode
            :node="selectedChild"
            :index="index + 1"
            v-model="childValue"
            @update:modelValue="updateValue"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import DxSelectBox from "devextreme-vue/select-box";

const props = defineProps(["node", "index", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const selectedChild = ref(null);
const isChildShow = ref(false);
const childValue = ref(props.modelValue);

function handleSelectChange() {
    isChildShow.value = false;
    setTimeout(() => {
        if (selectedChild.value != null) isChildShow.value = true;
    }, 0);

    const childIndex = props.node.children.findIndex(
        (item) => item === selectedChild.value
    );
    childValue.value[props.index] = childIndex;
    childValue.value = childValue.value.slice(
        0,
        props.index + (childIndex == -1 ? 0 : 1)
    );
    emit("update:modelValue", childValue.value);
}
function updateValue(e) {
    emit("update:modelValue", e);
}
</script>

<style scoped>
.text {
    font-size: 20px;
    font-family: Roboto;
}
.arrow {
    font-size: 30px;
    margin: 20px auto 10px;
}
</style>
