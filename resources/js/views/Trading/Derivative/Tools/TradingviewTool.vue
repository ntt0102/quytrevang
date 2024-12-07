<template>
    <div
        class="tradingview command far fa-chart-candlestick"
        :title="$t('trading.derivative.tradingview')"
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
import { ref, computed } from "vue";

const props = defineProps(["vpsUser", "vpsSession", "chartContainerRef"]);
const tradingviewRef = ref(null);
const showTradingView = ref(false);
const tradingViewSrc = computed(() => {
    return `https://chart.vps.com.vn/tv/?u=${props.vpsUser}&s=${props.vpsSession}&symbol=VN30F1M&resolution=1&lang=vi`;
});

function tradingviewClick(e) {
    showTradingView.value = !showTradingView.value;
    updateChildSize();
    e.stopPropagation();
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
</script>
