<template>
    <div v-if="node.children && node.children.length">
        <DxSelectBox
            :items="node.children"
            v-model="selectedChild"
            displayExpr="name"
            :show-clear-button="true"
            :placeholder="$t('titles.dxSelectPlacehoder')"
            @valueChanged="handleSelectChange"
        />
        <div v-if="selectedChild && selectedChild.children.length == 1">
            <i class="arrow far fa-arrow-alt-down"></i>
            <div class="text">
                {{ selectedChild.children[0].name }}
            </div>
        </div>
    </div>

    <div v-if="isShowChild && selectedChild.children.length > 1">
        <i class="arrow far fa-arrow-alt-down"></i>
        <TreeNode
            :node="selectedChild"
            :index="index + 1"
            v-model="childValue"
            @update:modelValue="updateTreeValue"
        />
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import DxSelectBox from "devextreme-vue/select-box";

const props = defineProps(["node", "index", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const selectedChild = ref(props.node.children[props.modelValue[props.index]]);
const childValue = ref(props.modelValue);
const isShowChild = ref(!!selectedChild.value);

let isLoadProps = false;

watch(
    () => props.modelValue,
    (e) => {
        isLoadProps = true;
        selectedChild.value = props.node.children[e[props.index]];
        childValue.value = e;
        isShowChild.value = !!selectedChild.value;
        setTimeout(() => (isLoadProps = false), 1000);
    }
);
watch(
    () => props.node,
    (e) => {
        isLoadProps = true;
        selectedChild.value = e.children[childValue.value[props.index]];
        isShowChild.value = !!selectedChild.value;
        setTimeout(() => (isLoadProps = false), 1000);
    }
);

function handleSelectChange() {
    if (isLoadProps) return false;
    isShowChild.value = false;
    setTimeout(() => {
        if (selectedChild.value) isShowChild.value = true;
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
function updateTreeValue(e) {
    emit("update:modelValue", e);
}
</script>

<style scoped></style>
