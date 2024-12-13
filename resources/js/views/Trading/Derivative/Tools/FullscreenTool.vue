<template>
    <div
        class="command"
        :title="$t('trading.derivative.fullscreenTool')"
        @click="toggleFullscreen"
    >
        <i
            class="far"
            :class="{
                'fa-compress': isFullscreen,
                'fa-expand': !isFullscreen,
            }"
        ></i>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps(["chartContainerRef"]);
const isFullscreen = ref(false);

defineExpose({
    setFullscreen,
});

onMounted(() => {
    document.addEventListener("fullscreenchange", fullscreenChange);
    window.addEventListener("keydown", shortcutHandle);
});

onUnmounted(() => {
    document.removeEventListener("fullscreenchange", fullscreenChange);
    window.removeEventListener("keydown", shortcutHandle);
});
function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
}
function fullscreenChange() {
    if (props.chartContainerRef) {
        if (document.fullscreenElement) {
            isFullscreen.value = true;
            props.chartContainerRef.classList.add("fullscreen");
            setFullscreen();
        } else {
            isFullscreen.value = false;
            props.chartContainerRef.classList.remove("fullscreen");
            unsetFullscreen();
        }
    }
}
function setFullscreen() {
    document.querySelector(".dx-drawer-panel-content").style.visibility =
        "hidden";
    document.querySelector(".header-component").style.visibility = "hidden";
    document.querySelector(".sc-launcher").style.visibility = "hidden";
    document.querySelector(".dx-drawer-content").style.transform = "unset";
}
function unsetFullscreen() {
    document.querySelector(".dx-drawer-panel-content").style.visibility =
        "unset";
    document.querySelector(".header-component").style.visibility = "unset";
    document.querySelector(".sc-launcher").style.visibility = "unset";
    document.querySelector(".dx-drawer-content").style.transform =
        "translate(0px, 0px)";
}
function shortcutHandle(e) {
    if (e.key === "F11") {
        toggleFullscreen();
        e.preventDefault();
    }
}
</script>
