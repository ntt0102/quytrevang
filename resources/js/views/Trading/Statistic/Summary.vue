<template>
    <div class="statistic-summary dx-card responsive-paddings content-block">
        <div v-if="props.hasTitle" class="header">
            {{ $t("trading.statistic.summary.title") }}
        </div>
        <div class="body">
            <div>
                <div class="period">
                    {{ $t("trading.statistic.summary.period.quarter") }}
                </div>
                <div v-if="$mf.isSet(summary)" class="detail">
                    <div>
                        <span>{{
                            $t("trading.statistic.summary.winrate")
                        }}</span
                        >&nbsp;
                        <span
                            :class="`quality ${
                                summary.quarter.winrate >= 50 ? 'good' : 'bad'
                            }`"
                            >{{
                                $filters.numberVnFormat(
                                    summary.quarter.winrate,
                                    0
                                )
                            }}%</span
                        >
                    </div>
                    <div>
                        <span>{{ $t("trading.statistic.summary.rr") }}</span
                        >&nbsp;
                        <span
                            :class="`quality ${
                                summary.quarter.rr == null ||
                                summary.quarter.rr >= 1
                                    ? 'good'
                                    : 'bad'
                            }`"
                        >
                            {{
                                summary.quarter.rr == null
                                    ? "+∞"
                                    : $filters.numberVnFormat(
                                          summary.quarter.rr,
                                          summary.quarter.rr > 2 ? 0 : 1
                                      )
                            }}
                        </span>
                    </div>
                    <div>
                        <span>{{ $t("trading.statistic.summary.profit") }}</span
                        >&nbsp;
                        <span
                            :class="`quality ${
                                summary.quarter.profit > 0 ? 'good' : 'bad'
                            }`"
                            >{{
                                $filters.shorten(summary.quarter.profit, "₫")
                            }}</span
                        >
                    </div>
                </div>
                <div v-else>-</div>
            </div>
            <div>
                <div class="period">
                    {{ $t("trading.statistic.summary.period.year") }}
                </div>
                <div v-if="$mf.isSet(summary)" class="detail">
                    <div>
                        <span>{{
                            $t("trading.statistic.summary.winrate")
                        }}</span
                        >&nbsp;
                        <span
                            :class="`quality ${
                                summary.year.winrate >= 50 ? 'good' : 'bad'
                            }`"
                            >{{
                                $filters.numberVnFormat(
                                    summary.year.winrate,
                                    0
                                )
                            }}%</span
                        >
                    </div>
                    <div>
                        <span>{{ $t("trading.statistic.summary.rr") }}</span
                        >&nbsp;
                        <span
                            :class="`quality ${
                                summary.year.rr == null || summary.year.rr >= 1
                                    ? 'good'
                                    : 'bad'
                            }`"
                        >
                            {{
                                summary.year.rr == null
                                    ? "+∞"
                                    : $filters.numberVnFormat(
                                          summary.year.rr,
                                          summary.year.rr > 2 ? 0 : 1
                                      )
                            }}
                        </span>
                    </div>
                    <div>
                        <span>{{ $t("trading.statistic.summary.profit") }}</span
                        >&nbsp;
                        <span
                            :class="`quality ${
                                summary.year.profit > 0 ? 'good' : 'bad'
                            }`"
                            >{{
                                $filters.shorten(summary.year.profit, "₫")
                            }}</span
                        >
                    </div>
                </div>
                <div v-else>-</div>
            </div>
            <div>
                <div class="period">
                    {{ $t("trading.statistic.summary.period.all") }}
                </div>
                <div v-if="$mf.isSet(summary)" class="detail">
                    <div>
                        <span>{{
                            $t("trading.statistic.summary.winrate")
                        }}</span
                        >&nbsp;
                        <span
                            :class="`quality ${
                                summary.all.winrate >= 50 ? 'good' : 'bad'
                            }`"
                            >{{
                                $filters.numberVnFormat(summary.all.winrate, 0)
                            }}%</span
                        >
                    </div>
                    <div>
                        <span>{{ $t("trading.statistic.summary.rr") }}</span
                        >&nbsp;
                        <span
                            :class="`quality ${
                                summary.all.rr == null || summary.all.rr >= 1
                                    ? 'good'
                                    : 'bad'
                            }`"
                        >
                            {{
                                summary.all.rr == null
                                    ? "+∞"
                                    : $filters.numberVnFormat(
                                          summary.all.rr,
                                          summary.all.rr > 2 ? 0 : 1
                                      )
                            }}
                        </span>
                    </div>
                    <div>
                        <span>{{ $t("trading.statistic.summary.profit") }}</span
                        >&nbsp;
                        <span
                            :class="`quality ${
                                summary.all.profit > 0 ? 'good' : 'bad'
                            }`"
                            >{{
                                $filters.shorten(summary.all.profit, "₫")
                            }}</span
                        >
                    </div>
                </div>
                <div v-else>-</div>
            </div>
            <!-- <div>
                <div class="period">
                    {{ $t("trading.statistic.summary.wr") }}
                </div>
                <div
                    v-if="$mf.isSet(summary)"
                    :class="`quality ${summary.wr >= 50 ? 'good' : 'bad'}`"
                >
                    {{ $filters.numberVnFormat(summary.wr, 0) }}%
                </div>
                <div v-else>-</div>
            </div>
            <div>
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
            </div> -->
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

const props = defineProps({
    hasTitle: {
        type: Boolean,
        default: false,
    },
});

store.dispatch("tradingStatistic/getSummary");

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
.statistic-summary {
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

                .quality {
                    font-size: 16px;
                    &.good {
                        color: lime;
                    }
                    &.bad {
                        color: red;
                    }
                }
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
