<template>
    <DxPopup
        ref="popupRef"
        :showCloseButton="true"
        :show-title="true"
        @shown="onShown"
        @hidden="onHidden"
    >
        <template #content><slot /> </template>
    </DxPopup>
</template>
<script setup>
import { inject, ref, onMounted } from "vue";

const props = defineProps({
    width: {
        type: Number,
        default: null,
    },
    height: {
        type: Number,
        default: null,
    },
    title: {
        type: String,
        default: null,
    },
    class: {
        type: String,
        default: null,
    },
    toolbarItems: {
        type: Array,
        default: [],
    },
});
const emit = defineEmits(["shown", "hidden"]);
const mf = inject("mf");
const devices = inject("devices");
const routeHistoryState = inject("routeHistoryState");
const popupRef = ref(null);
let popupInstance = null;
onMounted(() => {
    popupInstance = popupRef.value.instance;
    if (!!props.width) popupInstance.option("width", props.width);
    if (!!props.height) popupInstance.option("height", props.height);
    if (!props.width)
        popupInstance.option("fullScreen", devices.phone ? true : false);
    if (!!props.title) popupInstance.option("title", props.title);
    if (!!props.class)
        popupInstance.option("wrapperAttr", {
            class: props.class,
        });
    if (!!props.toolbarItems.length)
        popupInstance.option("toolbarItems", props.toolbarItems);
});

function show() {
    popupInstance.show();
}

function hide() {
    popupInstance.hide();
}

function setTitle(value) {
    popupInstance.option("title", value);
}

function setOption(key, value) {
    popupInstance.option(key, value);
}

function onShown() {
    mf.pushPopupToHistoryState(routeHistoryState, hide);
    emit("shown");
}
function onHidden() {
    emit("hidden");
    mf.popRouteHistoryState(routeHistoryState);
}

defineExpose({
    show,
    hide,
    setTitle,
    setOption,
});
</script>
