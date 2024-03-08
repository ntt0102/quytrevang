<template>
    <div class="statistic-summary dx-card responsive-paddings content-block">
        <div v-if="props.hasTitle" class="header">
            {{ $t("trading.statistic.summary.title") }}
        </div>
        <div class="body">
            <div>
                <div class="period" @click="periodClick('quarter')">
                    {{ $t("trading.statistic.periods.quarter") }}
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
                                summary.quarter.rr >= 1 ? 'good' : 'bad'
                            }`"
                        >
                            {{
                                $filters.numberVnFormat(
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
                <div class="period" @click="periodClick('year')">
                    {{ $t("trading.statistic.periods.year") }}
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
                                summary.year.rr >= 1 ? 'good' : 'bad'
                            }`"
                        >
                            {{
                                $filters.numberVnFormat(
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
                    {{ $t("trading.statistic.periods.all") }}
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
                                summary.all.rr >= 1 ? 'good' : 'bad'
                            }`"
                        >
                            {{
                                $filters.numberVnFormat(
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
        </div>
    </div>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const summary = computed(() => store.state.tradingStatistic.summary);

const props = defineProps({
    hasTitle: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(["period"]);

store.dispatch("tradingStatistic/getSummary");
function periodClick(period) {
    emit("period", period);
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
