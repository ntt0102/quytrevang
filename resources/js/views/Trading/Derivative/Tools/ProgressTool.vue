<template>
    <div
        class="context command"
        :class="{
            green: progress.result === true,
            red: progress.result === false,
        }"
        :title="$t('trading.derivative.progressTool')"
        @click="toggleProgressContext"
        @contextmenu="toggleAutoRefresh"
    >
        <i
            class="far"
            :class="{
                'fa-badge-check': !progress.step,
                [`fa-circle-${progress.step}`]: progress.step,
                blink: autoRefresh,
            }"
        >
        </i>
        <ProgressContext
            v-show="showProgressContext"
            class="contextmenu"
            :progress="progress"
        >
        </ProgressContext>
    </div>
</template>
<script setup>
import ProgressContext from "./Contexts/ProgressContext.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["refreshPattern", "hideContext"]);
const progress = ref({});
const showProgressContext = ref(false);
const autoRefresh = computed(
    () => store.state.tradingDerivative.config.autoRefresh
);

defineExpose({
    hide,
    set,
});

function toggleProgressContext() {
    const oldValue = showProgressContext.value;
    emit("hideContext");
    showProgressContext.value = !oldValue;
    if (showProgressContext.value) emit("refreshPattern");
}
function hide(status) {
    showProgressContext.value = status;
}
function set(value) {
    progress.value = value;
}
function toggleAutoRefresh(status) {
    const autoRefresh = status ?? !autoRefresh.value;
    store.dispatch("tradingDerivative/setAutoRefresh", autoRefresh);
}
</script>
