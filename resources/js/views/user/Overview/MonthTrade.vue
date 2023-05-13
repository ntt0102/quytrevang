<template>
    <div class="overview-week-trade dx-card responsive-paddings content-block">
        <DxChart
            ref="chartRef"
            :data-source="charts"
            :title="{
                text: $t('user.overview.monthTrade.title'),
                subtitle: {
                    text: $t('user.overview.monthTrade.subtitle', [copyRate]),
                },
                horizontalAlignment: 'center',
            }"
            :size="{ width: '100%', height: 300 }"
            :series="[
                {
                    valueField: 'accumulatedProfit',
                    argumentField: 'time',
                    type: 'spline',
                    color: 'lime',
                },
            ]"
            :valueAxis="[
                {
                    name: 'accumulatedProfit',
                    synchronizedValue: 0,
                    label: { visible: false },
                    tick: { visible: false },
                    visible: false,
                },
            ]"
            :legend="{ visible: false }"
        >
        </DxChart>
    </div>
</template>
<script setup>
import DxChart from "devextreme-vue/chart";
import { computed, inject, onUnmounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const bus = inject("bus");
const chartRef = ref(null);
const charts = computed(() => store.state.userTrade.charts);
const copyRate = computed(() => store.state.userTrade.copyRate);
store.dispatch("userTrade/getMonthChart");
bus.on("toggleMenu", () => {
    setTimeout(() => chartRef.value.instance.render(), 300);
});

onUnmounted(() => bus.off("toggleMenu"));
</script>
<style lang="scss">
.overview-week-trade {
    min-height: 180px;
}
</style>
