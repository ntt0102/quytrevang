<template>
    <div id="root">
        <div :class="cssClasses">
            <component
                :is="$route.meta.layout"
                :is-x-small="screen.getScreenSizeInfo.isXSmall"
                :is-large="screen.getScreenSizeInfo.isLarge"
            >
                <router-view v-slot="{ Component, route }">
                    {{ baseAccentColor }}
                    <transition name="fade">
                        <component :is="Component" :key="route.path" />
                    </transition>
                </router-view>
                <template #footer>
                    <app-footer />
                </template>
            </component>
        </div>
        <DxLoadPanel
            :position="{ of: '#root' }"
            :visible="isSyncing"
            :show-pane="false"
            height="200"
            width="200"
            maxHeight="200"
            maxWidth="200"
            :wrapperAttr="{ class: 'load-panel' }"
            indicatorSrc="../images/android-chrome-reverse-512x512.svg"
            shading-color="rgba(0,0,0,0.4)"
        />
        <Chatbot />
    </div>
</template>

<script setup>
import AppFooter from "./components/Layouts/Partials/AppFooter.vue";
import Chatbot from "./components/Chatbot.vue";
import { sizes, subscribe, unsubscribe } from "./utils/media-query";
import {
    getCurrentInstance,
    reactive,
    inject,
    computed,
    onMounted,
    onBeforeUnmount,
    onUnmounted,
} from "vue";
import { useStore } from "vuex";

const store = useStore();
const mf = inject("mf");
const routeHistoryState = inject("routeHistoryState");

const app = getCurrentInstance();

console.log("window.screen", window.screen);

const screen = reactive({
    getScreenSizeInfo: {},
    width: window.screen.width,
    height: window.screen.height,
});
screen.getScreenSizeInfo = getScreenSizeInfo();
app.appContext.config.globalProperties.$screen = screen;

function screenSizeChanged() {
    screen.getScreenSizeInfo = getScreenSizeInfo();
    app.appContext.config.globalProperties.$screen = screen;
}

function getScreenSizeInfo() {
    const screenSizes = sizes();

    return {
        isXSmall: screenSizes["screen-x-small"],
        isLarge: screenSizes["screen-large"],
        cssClasses: Object.keys(screenSizes).filter((cl) => screenSizes[cl]),
    };
}

onMounted(() => {
    subscribe(screenSizeChanged);
});

onBeforeUnmount(() => {
    unsubscribe(screenSizeChanged);
});

const cssClasses = computed(() => {
    return ["app"].concat(screen.getScreenSizeInfo.cssClasses);
});

window.addEventListener("popstate", () =>
    mf.popRouteHistoryState(routeHistoryState, true)
);
onUnmounted(() => {
    window.removeEventListener("popstate", () =>
        mf.popRouteHistoryState(routeHistoryState, true)
    );
});

const isSyncing = computed(() => store.state.isSyncing);
</script>

<style lang="scss">
@import "../sass/variables.scss";
html,
body {
    margin: 0px;
    min-height: 100%;
    height: 100%;
}

#root {
    height: 100%;
}

* {
    box-sizing: border-box;
}

.app {
    background-color: darken($base-bg, 5);
    display: flex;
    height: 100%;
    width: 100%;
}
.load-panel .dx-loadindicator {
    width: 120px;
    height: 120px;
}
</style>
