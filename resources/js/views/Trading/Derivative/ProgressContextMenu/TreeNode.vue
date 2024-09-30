<template>
    <div v-if="node.items">
        <div v-if="index == 0" class="text">
            {{ $t("trading.derivative.progressContextMenu.start") }}
        </div>
        <i
            :class="`arrow far fa-chevron-${isMultiItems ? 'double-' : ''}down`"
        ></i>
        <DxSelectBox
            v-if="isItemsArray"
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
            <span class="text" v-html="node.items"></span>
            <Pattern
                v-if="node.pattern"
                :pattern="patterns[node.pattern[0]][node.pattern[1] - 1]"
            />
        </div>
        <TreeNode
            v-if="state.hasChild"
            :node="state.selectedChild"
            :index="index + 1"
            v-model="state.childValue"
            @update:modelValue="updateTreeValue"
        />
    </div>
</template>

<script setup>
import { reactive, computed, watch } from "vue";
import patterns from "../../../../data/derivative";
import DxSelectBox from "devextreme-vue/select-box";
import Pattern from "../PatternContextMenu/Pattern.vue";

const props = defineProps(["node", "index", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const isItemsArray = computed(() => Array.isArray(props.node.items));
const isMultiItems = computed(
    () => Array.isArray(props.node.items) && props.node.items.length > 1
);
const state = reactive({
    selectedChild: props.node.items[props.modelValue[props.index]],
    childValue: props.modelValue,
    hasChild: false,
});
state.hasChild = !!state.selectedChild;

let isLoadProps = false;

watch(
    () => props.modelValue,
    (e) => {
        isLoadProps = true;
        state.selectedChild = props.node.items[e[props.index]];
        state.childValue = e;
        state.hasChild = !!state.selectedChild;
        setTimeout(() => (isLoadProps = false), 1000);
    }
);
watch(
    () => props.node,
    (e) => {
        isLoadProps = true;
        state.selectedChild = e.items[state.childValue[props.index]];
        state.hasChild = !!state.selectedChild;
        setTimeout(() => (isLoadProps = false), 1000);
    }
);

function handleSelectChange() {
    if (isLoadProps) return false;
    state.hasChild = false;
    setTimeout(() => {
        if (state.selectedChild) state.hasChild = true;
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

<style scoped>
.text {
    font-size: 18px;
    font-family: Roboto;
}
.arrow {
    font-size: 20px;
    margin: 10px auto 5px;
}
</style>
