<template>
    <DxTagBox
        :data-source="dataSource"
        :value="value"
        :show-selection-controls="true"
        :max-displayed-tags="3"
        :show-multi-tag-only="false"
        :on-value-changed="(e) => onValueChanged(e.value)"
        :on-selection-changed="onSelectionChanged"
        :search-enabled="true"
        :dropDownOptions="{ width: width, height: height }"
    />
</template>
<script setup>
import DxTagBox from "devextreme-vue/tag-box";

const props = defineProps({
    width: {
        type: Number,
        default: () => 300,
    },
    height: {
        type: Number,
        default: () => 400,
    },
    value: {
        type: Array,
        default: () => [],
    },
    onValueChanged: {
        type: Function,
        default: () => function () {},
    },
    dataSource: {
        type: Array,
        default: () => [],
    },
    dataGridComponent: {
        type: Object,
        default: () => {},
    },
});
function onSelectionChanged() {
    props.dataGridComponent.updateDimensions();
}
</script>
<style lang="scss" scoped></style>
