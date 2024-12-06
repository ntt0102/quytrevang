<template>
    <div
        class="command"
        :title="$t('trading.derivative.fullscreen')"
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

onMounted(() => {
    document.addEventListener("fullscreenchange", eventFullscreenChange);
    // new ResizeObserver(eventChartResize).observe(props.chartContainerRef);
});

onUnmounted(() => {
    document.removeEventListener("fullscreenchange", eventFullscreenChange);
});
function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
}
function eventFullscreenChange() {
    if (props.chartContainerRef) {
        if (document.fullscreenElement) {
            isFullscreen.value = true;
            props.chartContainerRef.classList.add("fullscreen");
            document.querySelector(
                ".dx-drawer-panel-content"
            ).style.visibility = "hidden";
            document.querySelector(".header-component").style.visibility =
                "hidden";
            document.querySelector(".sc-launcher").style.visibility = "hidden";
            document.querySelector(".dx-drawer-content").style.transform =
                "unset";
        } else {
            isFullscreen.value = false;
            props.chartContainerRef.classList.remove("fullscreen");
            document.querySelector(
                ".dx-drawer-panel-content"
            ).style.visibility = "unset";
            document.querySelector(".header-component").style.visibility =
                "unset";
            document.querySelector(".sc-launcher").style.visibility = "unset";
            document.querySelector(".dx-drawer-content").style.transform =
                "translate(0px, 0px)";
        }
    }
}
// function eventChartResize() {
//     if (props.chartContainerRef) {
//         params.chart.resize(
//             props.chartContainerRef.offsetWidth,
//             props.chartContainerRef.offsetHeight
//         );
//         if (props.chartContainerRef.classList.contains("fullscreen")) {
//             document.querySelector(
//                 ".dx-drawer-panel-content"
//             ).style.visibility = "hidden";
//             document.querySelector(".header-component").style.visibility =
//                 "hidden";
//             document.querySelector(".sc-launcher").style.visibility = "hidden";
//             document.querySelector(".dx-drawer-content").style.transform =
//                 "unset";
//         }
//     }
// }
</script>
