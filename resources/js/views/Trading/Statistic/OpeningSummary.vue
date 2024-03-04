<template>
    <div class="statistic-opening dx-card responsive-paddings content-block">
        <div class="header">
            <div v-if="props.hasTitle">
                {{ $t("trading.statistic.opening.title") }}
            </div>
            <div>
                <span>{{ $t("trading.statistic.opening.totalProfit") }}</span
                >&nbsp;
                <span
                    :class="`quality ${
                        opening.totalProfit > 0 ? 'good' : 'bad'
                    }`"
                    >{{ $filters.shorten(opening.totalProfit, "₫") }} ({{
                        $mf.isSet(opening)
                            ? opening.totalPercent.toFixed(1)
                            : 0
                    }}%)</span
                >
            </div>
        </div>
        <div class="body">
            <div v-for="order in opening.orders" :key="order.symbol">
                <div class="period">
                    {{ order.symbol }}
                </div>
                <div class="detail">
                    <div>
                        <span>{{ $t("trading.statistic.opening.price") }}</span
                        >&nbsp;
                        <span
                            :class="`quality ${getChangeClass(order.change)}`"
                            >{{ order.lastPrice }}</span
                        >
                    </div>
                    <div>
                        <span>{{ $t("trading.statistic.opening.volume") }}</span
                        >&nbsp;
                        <span class="quality orange"
                            >{{ order.openingVol }}
                        </span>
                    </div>
                    <div>
                        <span>{{ $t("trading.statistic.opening.profit") }}</span
                        >&nbsp;
                        <span
                            :class="`quality ${
                                order.profit > 0 ? 'good' : 'bad'
                            }`"
                            >{{ $filters.shorten(order.profit, "₫") }} ({{
                                order.percent.toFixed(1)
                            }}%)</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, inject, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const DURATION = 200;
const INTERVAL = 4; // 4ms

const store = useStore();
const router = useRouter();
const mf = inject("mf");
const opening = computed(() => store.state.tradingStatistic.opening);
const state = reactive({
    day: 0,
    week: 0,
    month: 0,
    quarter: 0,
    year: 0,
    all: 0,
});
let params = {
    interval: null,
    change: {},
    doneFlag: false,
};

const props = defineProps({
    hasTitle: {
        type: Boolean,
        default: false,
    },
});

store.dispatch("tradingStatistic/getOpening");
function getChangeClass(change) {
    let cls = "orange";
    if (change < 0) cls = "bad";
    else if (change > 0) cls = "good";
    return cls;
}
</script>
<style lang="scss">
.statistic-opening {
    .body {
        display: flex;
        justify-content: space-between;
        gap: 10px;

        & > div {
            display: flex;
            flex-direction: column;
            gap: 10px;
            cursor: pointer;

            .period {
                color: darken(white, 30);
                padding-right: 10px;
                font-size: 20px;
            }

            .detail {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
        }

        .screen-x-small & {
            margin-left: 20px;
            margin-right: 20px;

            & > div {
                flex-direction: column;

                .period {
                    padding-right: 0;
                }
            }
        }
    }
    .quality {
        font-size: 16px;
        &.good {
            color: lime;
        }
        &.bad {
            color: red;
        }
        &.orange {
            color: orange;
        }
    }
}
</style>
