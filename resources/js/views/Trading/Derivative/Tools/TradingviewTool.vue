<template>
    <div
        class="tradingview command far fa-chart-candlestick"
        :title="$t('trading.derivative.tradingviewTool')"
        @click="tradingviewClick"
    >
        <iframe
            v-show="showTradingView"
            ref="tradingviewRef"
            class="chart"
            :src="tradingViewSrc"
        ></iframe>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps(["vpsUser", "vpsSession", "chartContainerRef"]);
const tradingviewRef = ref(null);
const showTradingView = ref(false);
const tradingViewSrc = computed(() => {
    return `https://chart.vps.com.vn/tv/?u=${props.vpsUser}&s=${props.vpsSession}&symbol=VN30F1M&resolution=1&lang=vi`;
});
onMounted(() => {
    window.addEventListener("keydown", shortcutHandle);
});

onUnmounted(() => {
    window.removeEventListener("keydown", shortcutHandle);
});
function tradingviewClick(e) {
    toggleTradingview();
    updateChildSize();
    e.stopPropagation();
}
function toggleTradingview() {
    showTradingView.value = !showTradingView.value;
}
function updateChildSize() {
    if (props.chartContainerRef && tradingviewRef.value) {
        const { offsetWidth, offsetHeight } = props.chartContainerRef;
        const { top, left } = tradingviewRef.value.getBoundingClientRect();
        tradingviewRef.value.style.top = `${top - 2}px`;
        tradingviewRef.value.style.left = `${left + 32}px`;
        tradingviewRef.value.style.width = `${offsetWidth - 34}px`;
        tradingviewRef.value.style.height = `${offsetHeight}px`;
    }
}
function shortcutHandle(e) {
    if (e.key === "F2") {
        toggleTradingview();
        updateChildSize();
        e.preventDefault();
    }
}
</script>
