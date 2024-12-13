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
            :chartHeightEnough="chartHeightEnough"
            @refreshPattern="refreshPattern"
        >
        </ProgressContext>
    </div>
</template>
<script setup>
import ProgressContext from "./Contexts/ProgressContext.vue";
import { ref, inject, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const mf = inject("mf");
const props = defineProps(["chartHeightEnough"]);
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
onMounted(() => {
    window.addEventListener("keydown", shortcutHandle);
});

onUnmounted(() => {
    window.removeEventListener("keydown", shortcutHandle);
});
function toggleProgressContext() {
    const oldValue = showProgressContext.value;
    emit("hideContext");
    showProgressContext.value = !oldValue;
}
function hide(status = false) {
    showProgressContext.value = status;
}
function set(value) {
    if (autoRefresh.value) checkAlert(value, progress.value);
    progress.value = value;
}
function refreshPattern() {
    emit("refreshPattern");
}
function toggleAutoRefresh() {
    store.dispatch("tradingDerivative/setAutoRefresh", !autoRefresh.value);
}
function checkAlert(newProgress, oldProgress) {
    if (mf.isSet(newProgress)) {
        if (
            newProgress.step !== oldProgress.step ||
            (newProgress.step === oldProgress.step &&
                newProgress.result !== oldProgress.result)
        ) {
            let text = "";
            if (newProgress.result) {
                if ([2, 4].includes(newProgress.step))
                    text = t("trading.derivative.progressOrder", newProgress);
                else
                    text = t("trading.derivative.progressSuccess", newProgress);
            } else text = t("trading.derivative.progressFail", newProgress);
            speakAlert(text);
        }
    }
}
function speakAlert(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "vi-VN";
    speechSynthesis.speak(utterance);
}
function shortcutHandle(e) {
    if (e.key === "F2") {
        toggleProgressContext();
        e.preventDefault();
    }
}
</script>
