<template>
    <div class="trades-page">
        <h2 class="content-block">
            {{ $t("trading.trades.title") }}
        </h2>
        <div class="content-block dx-card responsive-paddings">
            <DxToolbar
                :items="[
                    {
                        visible: $mf.isSet($route.query),
                        location: 'before',
                        widget: 'dxButton',
                        options: {
                            icon: 'far fa-arrow-left small',
                            hint: $t('buttons.back'),
                            onClick: () => $router.go(-1),
                        },
                    },
                    {
                        location: 'before',
                        cssClass: 'page-button',
                        widget: 'dxButton',
                        options: {
                            icon: 'far fa-backward small',
                            hint: $t('trading.trades.buttons.more'),
                            wrapperAttr: { 'data-page': page },
                            onClick: () => lazyLoad(),
                        },
                    },
                    {
                        location: 'before',
                        widget: 'dxButton',
                        options: {
                            icon: 'far fa-database small',
                            hint: $t('trading.trades.buttons.addData'),
                            onClick: () => $refs.trackTradePopup.show(),
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxSelectBox',
                        options: {
                            width: 80,
                            items: $mf.getChartPeriodList(),
                            displayExpr: 'name',
                            valueExpr: 'value',
                            value: charts.period,
                            onValueChanged: (e) => getChart(e.value),
                        },
                    },
                ]"
            />
            <DxChart
                ref="chart"
                :data-source="charts.data"
                :customize-point="customizePoint"
                :title="{
                    text: $t('trading.trades.charTitle'),
                    horizontalAlignment: 'center',
                }"
                :size="{ width: '100%' }"
                :zoomAndPan="{ argumentAxis: 'both' }"
                :loadingIndicator="{
                    enabled: true,
                    show: true,
                    text: $t('titles.loadingText'),
                }"
                :export="{
                    enabled: true,
                    formats: ['PNG'],
                    fileName: 'chart',
                    printingEnabled: false,
                }"
                :commonSeriesSettings="{ argumentField: 'time', barPadding: 0 }"
                :series="[
                    {
                        name: $t('trading.trades.profitSum'),
                        tag: 'money',
                        valueField: 's3',
                        axis: 'money',
                        type: 'stackedbar',
                        stack: 'money',
                        color: 'DarkGreen',
                        visible: visibleSeries.money,
                    },
                    {
                        name: $t('trading.trades.lossSum'),
                        valueField: 's4',
                        axis: 'money',
                        type: 'stackedbar',
                        stack: 'money',
                        color: 'FireBrick',
                        showInLegend: false,
                        visible: visibleSeries.money,
                    },
                    {
                        name: $t('trading.trades.feesSum'),
                        valueField: 's5',
                        axis: 'money',
                        type: 'stackedbar',
                        stack: 'money',
                        color: 'DarkOrange',
                        showInLegend: false,
                        visible: visibleSeries.money,
                    },

                    {
                        name: $t('trading.trades.feesSum'),
                        valueField: 's2',
                        axis: 'money',
                        type: 'stackedbar',
                        stack: 'money',
                        color: 'DarkOrange',
                        showInLegend: false,
                        visible: visibleSeries.money,
                    },
                    {
                        name: $t('trading.trades.lossSum'),
                        valueField: 's1',
                        axis: 'money',
                        type: 'stackedbar',
                        stack: 'money',
                        color: 'FireBrick',
                        showInLegend: false,
                        visible: visibleSeries.money,
                    },

                    {
                        name: $t('trading.trades.profitPerPrincipal'),
                        tag: 'profitPerPrincipal',
                        valueField: 'profitPerPrincipal',
                        axis: 'profitPerPrincipal',
                        type: 'stackedbar',
                        stack: 'profitPerPrincipal',
                        color: 'Teal',
                        visible: visibleSeries.profitPerPrincipal,
                    },
                    {
                        name: $t('trading.trades.profitPerFees'),
                        tag: 'profitPerFees',
                        valueField: 'profitPerFees',
                        axis: 'profitPerFees',
                        type: 'stackedbar',
                        stack: 'profitPerFees',
                        color: 'Purple',
                        visible: visibleSeries.profitPerFees,
                    },
                    {
                        name: $t('trading.trades.accumulatedProfit'),
                        tag: 'accumulatedProfit',
                        valueField: 'accumulatedProfit',
                        axis: 'accumulatedProfit',
                        type: 'spline',
                        color: 'White',
                        visible: visibleSeries.accumulatedProfit,
                    },
                ]"
                :valueAxis="[
                    {
                        name: 'money',
                        synchronizedValue: 0,
                        label: { customizeText: customizeText },
                    },
                    {
                        name: 'profitPerPrincipal',
                        synchronizedValue: 0,
                        label: { visible: false },
                        tick: { visible: false },
                        grid: { visible: false },
                        visible: false,
                    },
                    {
                        name: 'profitPerFees',
                        synchronizedValue: 0,
                        label: { visible: false },
                        tick: { visible: false },
                        grid: { visible: false },
                        visible: false,
                    },
                    {
                        name: 'accumulatedProfit',
                        label: { visible: false },
                        tick: { visible: false },
                        grid: { visible: false },
                        visible: false,
                    },
                ]"
                :tooltip="{
                    enabled: true,
                    shared: false,
                    customizeTooltip: customizeTooltip,
                }"
                :legend="{
                    verticalAlignment: 'top',
                    horizontalAlignment: 'center',
                    hoverMode: 'none',
                    markerTemplate: 'markerTemplate',
                }"
                :argumentAxis="{
                    constantLines: [
                        {
                            width: 2,
                            color: 'white',
                            dashStyle: 'dot',
                            value: null,
                        },
                    ],
                }"
                @pointClick="onPointClick"
                @legendClick="onLegendClick"
            >
                <template #markerTemplate="{ data }">
                    <g>
                        <g v-if="data.series.tag === 'accumulatedProfit'">
                            <rect
                                :x="-10"
                                :y="-1.5"
                                :width="30"
                                :height="2.5"
                                :fill="data.marker.fill"
                            />
                            <path
                                d="M0,0a5,5 0 1,0 10,0a5,5 0 1,0 -10,0"
                                :fill="data.marker.fill"
                            ></path>
                        </g>
                        <g v-else-if="data.series.tag === 'money'">
                            <rect
                                :x="0"
                                :y="0"
                                :width="10"
                                :height="10"
                                fill="DarkGreen"
                            />
                            <rect
                                :x="10"
                                :y="0"
                                :width="7"
                                :height="10"
                                fill="FireBrick"
                            />
                            <rect
                                :x="17"
                                :y="0"
                                :width="3"
                                :height="10"
                                fill="DarkOrange"
                            />
                        </g>
                        <g v-else>
                            <rect
                                :x="0"
                                :y="0"
                                :width="20"
                                :height="10"
                                :fill="data.marker.fill"
                            />
                        </g>
                    </g>
                </template>
            </DxChart>
        </div>
        <TrackTradePopup ref="trackTradePopup" />
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DxChart from "devextreme-vue/chart";
import TrackTradePopup from "./TrackTradePopup.vue";
import adminTradesStore from "../../../store/modules/Trading/Trades";

export default {
    components: {
        DxChart,
        TrackTradePopup,
    },
    data() {
        return {
            principalTargetThreshold: {
                day: 1,
                week: 5,
                month: 22,
                quarter: 65,
                year: 260,
            },
            feesTargetThreshold: 5,
            visibleSeries: {
                money: true,
                profitPerPrincipal: false,
                profitPerFees: false,
                accumulatedProfit: false,
            },
        };
    },
    beforeCreate() {
        this.$store.registerModule("Trading.trades", adminTradesStore);
    },
    created() {
        this.getChart(this.$route.query.period ?? "day");
        this.$bus.on("toggleMenu", () => {
            setTimeout(() => this.chart.render(), 300);
        });
    },
    mounted() {
        if (this.$route.hash == "#data") this.$refs.trackTradePopup.show();
    },
    destroyed() {
        this.$store.unregisterModule("Trading.trades");
        this.$bus.off("toggleMenu");
    },
    computed: {
        ...mapGetters("Auth", ["permissions"]),
        ...mapGetters("Trading.trades", ["charts", "page", "period"]),
        chart() {
            return this.$refs.chart.instance;
        },
    },
    methods: {
        ...mapActions("Trading.trades", ["getChart", "lazyLoad", "resetState"]),
        customizePoint({ value, series }) {
            if (
                series.tag === "profitPerPrincipal" &&
                value >= this.principalTargetThreshold[this.charts.period]
            )
                return { color: "Aqua", hoverStyle: { color: "Aqua" } };
            else if (
                series.tag === "profitPerFees" &&
                value >= this.feesTargetThreshold
            )
                return { color: "Fuchsia", hoverStyle: { color: "Fuchsia" } };
            else
                return {
                    color: series.color,
                    hoverStyle: { color: series.color },
                };
        },
        customizeText({ valueText }) {
            return `${valueText.replace(",0", "").replace("M", " Tr")}`;
        },
        customizeTooltip(pointInfo) {
            let accumulatedProfit = pointInfo.point.data.accumulatedProfit;
            let referenceTime = this.getReferenceTime();
            if (referenceTime !== null) {
                let referenceAccumulatedProfit = this.charts.data.find(
                    (c) => c.time === referenceTime
                ).accumulatedProfit;
                accumulatedProfit =
                    accumulatedProfit - referenceAccumulatedProfit;
            }
            return {
                html: `<div class='trade-chart-tooltip'>
                <div class='tooltip-header'>
                  ${pointInfo.argumentText}
                </div>
                <div class='tooltip-body'>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${this.$t("trading.trades.principalAvg")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${this.$options.filters.currency(
                          pointInfo.point.data.principal
                      )}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${this.$t("trading.trades.revenueSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${this.$options.filters.currency(
                          pointInfo.point.data.revenue
                      )}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${this.$t("trading.trades.lossSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${this.$options.filters.currency(
                          pointInfo.point.data.loss
                      )}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${this.$t("trading.trades.feesSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${this.$options.filters.currency(
                          pointInfo.point.data.fees
                      )}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${this.$t("trading.trades.profitSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value' style='font-weight: bold; color:${
                        pointInfo.point.data.profit >= 0 ? "green" : "red"
                    }'>
                      ${this.$options.filters.currency(
                          pointInfo.point.data.profit
                      )}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='top-series-name'>
                      ${this.$t("trading.trades.profitPerPrincipal")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='top-series-value'>
                      ${this.$options.filters.numberVnFormat(
                          pointInfo.point.data.profitPerPrincipal,
                          1
                      )}%
                      (${(
                          (100 * pointInfo.point.data.profitPerPrincipal) /
                          this.principalTargetThreshold[this.charts.period]
                      ).toFixed(0)}%
                      ${this.$t("trading.trades.kpi")})
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${this.$t("trading.trades.profitPerFees")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${this.$options.filters.numberVnFormat(
                          pointInfo.point.data.profitPerFees,
                          1
                      )}
                      (${(
                          (100 * pointInfo.point.data.profitPerFees) /
                          this.feesTargetThreshold
                      ).toFixed(0)}%
                      ${this.$t("trading.trades.kpi")})
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${this.$t("trading.trades.accumulatedProfit")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${this.$options.filters.currency(accumulatedProfit)}
                    </span>
                  </div>
                </div>
              </div>`,
            };
        },
        onPointClick({ target }) {
            let referenceTime =
                this.getReferenceTime() === target.argument
                    ? null
                    : target.argument;
            this.setReferenceTime(referenceTime);
        },
        onLegendClick(e) {
            const series = e.target;
            let referenceTime = this.getReferenceTime();
            if (series.isVisible()) {
                series.hide();
                this.visibleSeries[series.tag] = false;
            } else {
                series.show();
                this.visibleSeries[series.tag] = true;
            }
            setTimeout(() => this.setReferenceTime(referenceTime), 0);
        },
        getReferenceTime() {
            return this.chart.option("argumentAxis.constantLines[0].value");
        },
        setReferenceTime(value) {
            return this.chart.option(
                "argumentAxis.constantLines[0].value",
                value
            );
        },
    },
};
</script>
<style lang="scss">
.page-button {
    .dx-button {
        position: relative;

        &:not([data-page="0"]):after {
            position: absolute;
            content: attr(data-page);
            top: 2px;
            right: 5px;
            padding: 1px 4px 0px 4px;
            background: red;
            border-radius: 10px;
            color: #fff;
            font-size: 13px;
            font-weight: bold;
            pointer-events: none;
        }
    }
}
.trades-page .dx-toolbar .dx-selectbox .dx-texteditor-input {
    text-align: center;
}
.trade-chart-tooltip {
    .tooltip-header {
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: 500;
        padding-bottom: 5px;
        border-bottom: 1px solid #c5c5c5;
    }

    .tooltip-body {
        width: 240px;

        .series-name {
            font-weight: normal;
            opacity: 0.6;
            display: inline-block;
            line-height: 1.5;
            padding-right: 10px;
            width: 120px;
        }

        .value-text {
            display: inline-block;
            line-height: 1.5;
            width: 110px;
        }
    }
}
</style>
