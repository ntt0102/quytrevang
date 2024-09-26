<template>
    <div v-if="node.items">
        <DxSelectBox
            v-if="Array.isArray(node.items)"
            :items="node.items"
            v-model="state.selectedChild"
            displayExpr="name"
            stylingMode="outlined"
            :show-clear-button="true"
            :showDropDownButton="false"
            :placeholder="$t('titles.dxSelectPlacehoder')"
            @valueChanged="handleSelectChange"
        />
        <div v-else>
            <div class="text">
                {{ node.items }}
            </div>
        </div>
        <div v-if="state.isShowChild">
            <i class="arrow far fa-arrow-alt-down"></i>
            <TreeNode
                :node="state.selectedChild"
                :index="index + 1"
                v-model="state.childValue"
                @update:modelValue="updateTreeValue"
            />
        </div>
    </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import DxSelectBox from "devextreme-vue/select-box";

const props = defineProps(["node", "index", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const state = reactive({
    selectedChild: props.node.items[props.modelValue[props.index]],
    childValue: props.modelValue,
    isShowChild: false,
});
state.isShowChild = !!state.selectedChild;

let isLoadProps = false;

watch(
    () => props.modelValue,
    (e) => {
        isLoadProps = true;
        state.selectedChild = props.node.items[e[props.index]];
        state.childValue = e;
        state.isShowChild = !!state.selectedChild;
        setTimeout(() => (isLoadProps = false), 1000);
    }
);
watch(
    () => props.node,
    (e) => {
        isLoadProps = true;
        state.selectedChild = e.items[state.childValue[props.index]];
        state.isShowChild = !!state.selectedChild;
        setTimeout(() => (isLoadProps = false), 1000);
    }
);

function handleSelectChange() {
    if (isLoadProps) return false;
    state.isShowChild = false;
    setTimeout(() => {
        if (state.selectedChild) state.isShowChild = true;
    }, 0);

    const childIndex = props.node.items.findIndex(
        (item) => item === state.selectedChild
    );
    if (childIndex == -1)
        state.childValue = state.childValue.slice(0, props.index);
    else {
        state.childValue = state.childValue.slice(0, props.index + 1);
        state.childValue[props.index] = childIndex;
    }
    emit("update:modelValue", state.childValue);
}
function updateTreeValue(e) {
    emit("update:modelValue", e);
}
</script>

<style scoped></style>
