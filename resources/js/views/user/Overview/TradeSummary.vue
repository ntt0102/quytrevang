<template>
    <div class="overview-trading dx-card responsive-paddings content-block">
        <div class="header">{{ $t("trading.trades.charTitle") }}</div>
        <div class="body">
            <div @click="viewDetail('day')">
                <div class="period">
                    {{ $t("trading.trades.selects.period.day") }}
                </div>
                <div
                    v-if="$mf.isSet(summary)"
                    :class="`quality ${summary.day >= 0 ? 'good' : 'bad'}`"
                >
                    <i
                        v-if="!$screen.getScreenSizeInfo.isXSmall"
                        :class="`far fa-long-arrow-alt-${
                            summary.day >= 0 ? 'up' : 'down'
                        }`"
                    ></i>
                    {{ $filters.numberVnFormat(state.day, 1) }}%
                </div>
                <div v-else>-</div>
            </div>
            <div @click="viewDetail('week')">
                <div class="period">
                    {{ $t("trading.trades.selects.period.week") }}
                </div>
                <div
                    v-if="$mf.isSet(summary)"
                    :class="`quality ${summary.week >= 0 ? 'good' : 'bad'}`"
                >
                    <i
                        v-if="!$screen.getScreenSizeInfo.isXSmall"
                        :class="`far fa-long-arrow-alt-${
                            summary.week >= 0 ? 'up' : 'down'
                        }`"
                    ></i>
                    {{ $filters.numberVnFormat(state.week, 1) }}%
                </div>
                <div v-else>-</div>
            </div>
            <div @click="viewDetail('month')">
                <div class="period">
                    {{ $t("trading.trades.selects.period.month") }}
                </div>
                <div
                    v-if="$mf.isSet(summary)"
                    :class="`quality ${summary.month >= 0 ? 'good' : 'bad'}`"
                >
                    <i
                        v-if="!$screen.getScreenSizeInfo.isXSmall"
                        :class="`far fa-long-arrow-alt-${
                            summary.month >= 0 ? 'up' : 'down'
                        }`"
                    ></i>
                    {{ $filters.numberVnFormat(state.month, 0) }}%
                </div>
                <div v-else>-</div>
            </div>
            <div @click="viewDetail('quater')">
                <div class="period">
                    {{ $t("trading.trades.selects.period.quarter") }}
                </div>
                <div
                    v-if="$mf.isSet(summary)"
                    :class="`quality ${summary.quarter >= 0 ? 'good' : 'bad'}`"
                >
                    <i
                        v-if="!$screen.getScreenSizeInfo.isXSmall"
                        :class="`far fa-long-arrow-alt-${
                            summary.quarter >= 0 ? 'up' : 'down'
                        }`"
                    ></i>
                    {{ $filters.numberVnFormat(state.quarter, 0) }}%
                </div>
                <div v-else>-</div>
            </div>
            <div @click="viewDetail('year')">
                <div class="period">
                    {{ $t("trading.trades.selects.period.year") }}
                </div>
                <div
                    v-if="$mf.isSet(summary)"
                    :class="`quality ${summary.year >= 0 ? 'good' : 'bad'}`"
                >
                    <i
                        v-if="!$screen.getScreenSizeInfo.isXSmall"
                        :class="`far fa-long-arrow-alt-${
                            summary.year >= 0 ? 'up' : 'down'
                        }`"
                    ></i>
                    {{ $filters.numberVnFormat(state.year, 0) }}%
                </div>
                <div v-else>-</div>
            </div>
            <div @click="viewDetail('year')">
                <div class="period">
                    {{ $t("trading.trades.selects.period.all") }}
                </div>
                <div
                    v-if="$mf.isSet(summary)"
                    :class="`quality ${summary.all >= 0 ? 'good' : 'bad'}`"
                >
                    <i
                        v-if="!$screen.getScreenSizeInfo.isXSmall"
                        :class="`far fa-long-arrow-alt-${
                            summary.all >= 0 ? 'up' : 'down'
                        }`"
                    ></i>
                    {{ $filters.numberVnFormat(state.all, 0) }}%
                </div>
                <div v-else>-</div>
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
const summary = computed(() => store.state.tradingStatistic.summary);
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

store.dispatch("tradingStatistic1/getSummary");

watch(
    () => store.state.tradingStatistic.summary,
    (value) => {
        if (mf.isSet(value)) {
            calculateChange();
            if (!params.interval) {
                params.interval = setInterval(() => {
                    animatedNumber("day");
                    animatedNumber("week");
                    animatedNumber("month");
                    animatedNumber("quarter");
                    animatedNumber("year");
                    animatedNumber("all");
                    if (params.doneFlag) {
                        clearInterval(params.interval);
                        params.interval = null;
                    }
                }, INTERVAL);
            }
        }
    }
);
function viewDetail(period) {
    router.push({ name: "trading-statistic1", query: { period } });
}
function animatedNumber(type) {
    if (
        Math.abs(state[type]) <
        Math.abs(summary.value[type] - params.change[type])
    ) {
        state[type] += params.change[type];
        params.doneFlag = false;
    } else {
        state[type] = summary.value[type];
        params.doneFlag = true;
    }
}
function calculateChange() {
    let counterTimes = DURATION / INTERVAL;
    params.change.day = summary.value.day / counterTimes;
    params.change.week = summary.value.week / counterTimes;
    params.change.month = summary.value.month / counterTimes;
    params.change.quarter = summary.value.quarter / counterTimes;
    params.change.year = summary.value.year / counterTimes;
    params.change.all = summary.value.all / counterTimes;
}
</script>
<style lang="scss">
.overview-trading {
    .body {
        display: flex;
        justify-content: space-between;

        & > div {
            display: flex;
            align-items: center;
            cursor: pointer;

            .period {
                color: darken(white, 30);
                padding-right: 10px;
            }

            .quality {
                font-size: 20px;
            }

            .good {
                color: lime;
            }
            .bad {
                color: red;
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
}
</style>
