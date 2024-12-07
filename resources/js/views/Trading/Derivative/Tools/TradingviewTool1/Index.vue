<template>
    <div
        ref="tradingviewRef"
        class="command far fa-chart-candlestick"
        :title="$t('trading.derivative.tradingview')"
        @click="tradingviewClick"
    >
        <iframe
            v-show="state.showTradingView"
            ref="tradingviewChartRef"
            class="tradingview-chart"
            :style="state.tradingViewStyle"
            :src="tradingViewSrc"
        ></iframe>
    </div>
</template>
<script setup></script>
