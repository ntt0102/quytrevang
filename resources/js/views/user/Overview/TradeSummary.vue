<template>
    <div class="overview-trading dx-card responsive-paddings content-block">
        <div @click="viewDetail('day')">
            <div class="period">
                {{ $t("trading.trades.selects.period.day") }}
            </div>
            <div
                v-if="$mf.isSet(summary)"
                :class="`quality ${summary.day >= 0 ? 'good' : 'bad'}`"
            >
                <i
                    v-if="!$devices.phone"
                    :class="`far fa-long-arrow-alt-${
                        summary.day >= 0 ? 'up' : 'down'
                    }`"
                ></i>
                {{ day | numberVnFormat(1) }}%
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
                    v-if="!$devices.phone"
                    :class="`far fa-long-arrow-alt-${
                        summary.week >= 0 ? 'up' : 'down'
                    }`"
                ></i>
                {{ week | numberVnFormat(1) }}%
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
                    v-if="!$devices.phone"
                    :class="`far fa-long-arrow-alt-${
                        summary.month >= 0 ? 'up' : 'down'
                    }`"
                ></i>
                {{ month | numberVnFormat(0) }}%
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
                    v-if="!$devices.phone"
                    :class="`far fa-long-arrow-alt-${
                        summary.quarter >= 0 ? 'up' : 'down'
                    }`"
                ></i>
                {{ quarter | numberVnFormat(0) }}%
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
                    v-if="!$devices.phone"
                    :class="`far fa-long-arrow-alt-${
                        summary.year >= 0 ? 'up' : 'down'
                    }`"
                ></i>
                {{ year | numberVnFormat(0) }}%
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
                    v-if="!$devices.phone"
                    :class="`far fa-long-arrow-alt-${
                        summary.all >= 0 ? 'up' : 'down'
                    }`"
                ></i>
                {{ all | numberVnFormat(0) }}%
            </div>
            <div v-else>-</div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import adminTradesStore from "../../../store/modules/Trading/Trades";

const DURATION = 200;
const INTERVAL = 4; // 4ms

export default {
    components: {},
    data() {
        return {
            interval: null,
            change: {},
            doneFlag: false,
            day: 0,
            week: 0,
            month: 0,
            quarter: 0,
            year: 0,
            all: 0,
        };
    },
    beforeCreate() {
        this.$store.registerModule("Trading.trades", adminTradesStore);
    },
    created() {
        this.getSummary();
    },
    destroyed() {
        this.$store.unregisterModule("Trading.trades");
    },
    computed: {
        ...mapGetters("Trading.trades", ["summary"]),
    },
    watch: {
        summary(value) {
            if (this.$mf.isSet(value)) {
                this.calculateChange();
                if (!this.interval) {
                    this.interval = setInterval(() => {
                        this.animatedNumber("day");
                        this.animatedNumber("week");
                        this.animatedNumber("month");
                        this.animatedNumber("quarter");
                        this.animatedNumber("year");
                        this.animatedNumber("all");
                        if (this.doneFlag) {
                            clearInterval(this.interval);
                            this.interval = null;
                        }
                    }, INTERVAL);
                }
            }
        },
    },
    methods: {
        ...mapActions("Trading.trades", ["getSummary", "resetState"]),
        viewDetail(period) {
            this.$router.push({ name: "trades", query: { period } });
        },
        animatedNumber(type) {
            if (
                Math.abs(this[type]) <
                Math.abs(this.summary[type] - this.change[type])
            ) {
                this[type] += this.change[type];
                this.doneFlag = false;
            } else {
                this[type] = this.summary[type];
                this.doneFlag = true;
            }
        },
        calculateChange() {
            let counterTimes = DURATION / INTERVAL;
            this.change.day = this.summary.day / counterTimes;
            this.change.week = this.summary.week / counterTimes;
            this.change.month = this.summary.month / counterTimes;
            this.change.quarter = this.summary.quarter / counterTimes;
            this.change.year = this.summary.year / counterTimes;
            this.change.all = this.summary.all / counterTimes;
        },
    },
};
</script>
<style lang="scss">
.overview-trading {
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
}
body[screen-size="small"] {
    .overview-trading {
        & > div {
            flex-direction: column;

            .period {
                padding-right: 0;
            }
        }
    }
}
</style>
