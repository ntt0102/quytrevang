<template>
    <div class="trades-page content-block dx-card responsive-paddings">
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
                        elementAttr: { 'data-page': charts.page },
                        onClick: () =>
                            $store.dispatch('tradingStatistic/lazyLoad'),
                    },
                },
                {
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-database small',
                        hint: $t('trading.trades.buttons.addData'),
                        onClick: () => $refs.trackStatisticPopupRef.show(),
                    },
                },
                {
                    location: 'after',
                    widget: 'dxSelectBox',
                    options: {
                        width: 90,
                        items: $mf.getChartPeriodList(),
                        displayExpr: 'name',
                        valueExpr: 'value',
                        value: charts.period,
                        dropDownOptions: {
                            wrapperAttr: {
                                class: 'statistic-period-select-popup',
                            },
                        },
                        onValueChanged: (e) =>
                            $store.dispatch(
                                'tradingStatistic/getChart',
                                e.value
                            ),
                    },
                },
            ]"
        />
        <DxChart
            ref="chartRef"
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
                <svg>
                    <g v-if="data.series.tag === 'accumulatedProfit'">
                        <path
                            d="M 0 8 C 2 4 7 4 9.5 8 C 11 12 16 12 18 8 L 18 10 C 16 14 11 14 8.5 10 C 7 6 2 6 0 10 Z"
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
                </svg>
            </template>
        </DxChart>
        <TrackStatisticPopup ref="trackStatisticPopupRef" />
    </div>
</template>
<script setup>
import DxChart from "devextreme-vue/chart";
import TrackStatisticPopup from "./TrackStatisticPopup.vue";
import { ref, reactive, inject, computed, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const store = useStore();
const route = useRoute();
const { t } = useI18n();
const filters = inject("filters");
let params = {
    principalTargetThreshold: {
        day: 1,
        week: 5,
        month: 22,
        quarter: 65,
        year: 260,
    },
    feesTargetThreshold: 5,
};
const visibleSeries = reactive({
    money: true,
    profitPerPrincipal: false,
    profitPerFees: false,
    accumulatedProfit: false,
});
const chartRef = ref(null);
const charts = computed(() => store.state.tradingStatistic.charts);

store.dispatch("tradingStatistic/getChart", route.query.period ?? "day");
// this.$bus.on("toggleMenu", () => {
//     setTimeout(() => chartRef.value.instance.render(), 300);
// });

onUnmounted(() => {
    // this.$bus.off("toggleMenu");
});

function customizePoint({ value, series }) {
    if (
        series.tag === "profitPerPrincipal" &&
        value >= params.principalTargetThreshold[charts.value.period]
    )
        return { color: "Aqua", hoverStyle: { color: "Aqua" } };
    else if (
        series.tag === "profitPerFees" &&
        value >= params.feesTargetThreshold
    )
        return { color: "Fuchsia", hoverStyle: { color: "Fuchsia" } };
    else
        return {
            color: series.color,
            hoverStyle: { color: series.color },
        };
}
function customizeText({ valueText }) {
    return `${valueText.replace(",0", "").replace("M", " Tr")}`;
}
function customizeTooltip(pointInfo) {
    let accumulatedProfit = pointInfo.point.data.accumulatedProfit;
    let referenceTime = getReferenceTime();
    if (referenceTime !== null) {
        let referenceAccumulatedProfit = charts.value.data.find(
            (c) => c.time === referenceTime
        ).accumulatedProfit;
        accumulatedProfit = accumulatedProfit - referenceAccumulatedProfit;
    }
    return {
        html: `<div class='trade-chart-tooltip'>
                <div class='tooltip-header'>
                  ${pointInfo.argumentText}
                </div>
                <div class='tooltip-body'>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${t("trading.trades.principalAvg")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${filters.currency(pointInfo.point.data.principal)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${t("trading.trades.revenueSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${filters.currency(pointInfo.point.data.revenue)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${t("trading.trades.lossSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${filters.currency(pointInfo.point.data.loss)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${t("trading.trades.feesSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${filters.currency(pointInfo.point.data.fees)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${t("trading.trades.profitSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value' style='font-weight: bold; color:${
                        pointInfo.point.data.profit >= 0 ? "green" : "red"
                    }'>
                      ${filters.currency(pointInfo.point.data.profit)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='top-series-name'>
                      ${t("trading.trades.profitPerPrincipal")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='top-series-value'>
                      ${filters.numberVnFormat(
                          pointInfo.point.data.profitPerPrincipal,
                          1
                      )}%
                      (${(
                          (100 * pointInfo.point.data.profitPerPrincipal) /
                          params.principalTargetThreshold[charts.value.period]
                      ).toFixed(0)}%
                      ${t("trading.trades.kpi")})
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${t("trading.trades.profitPerFees")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${filters.numberVnFormat(
                          pointInfo.point.data.profitPerFees,
                          1
                      )}
                      (${(
                          (100 * pointInfo.point.data.profitPerFees) /
                          params.feesTargetThreshold
                      ).toFixed(0)}%
                      ${t("trading.trades.kpi")})
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${t("trading.trades.accumulatedProfit")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${filters.currency(accumulatedProfit)}
                    </span>
                  </div>
                </div>
              </div>`,
    };
}
function onPointClick({ target }) {
    let referenceTime =
        getReferenceTime() === target.argument ? null : target.argument;
    setReferenceTime(referenceTime);
}
function onLegendClick(e) {
    const series = e.target;
    let referenceTime = getReferenceTime();
    if (series.isVisible()) {
        series.hide();
        visibleSeries[series.tag] = false;
    } else {
        series.show();
        visibleSeries[series.tag] = true;
    }
    setTimeout(() => setReferenceTime(referenceTime), 0);
}
function getReferenceTime() {
    return chartRef.value.instance.option(
        "argumentAxis.constantLines[0].value"
    );
}
function setReferenceTime(value) {
    return chartRef.value.instance.option(
        "argumentAxis.constantLines[0].value",
        value
    );
}
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
    padding: 5px;
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
.statistic-period-select-popup {
    .dx-collection {
        .dx-list-item-content {
            padding: 7px 0 !important;
            text-align: center;
        }
    }
}
</style>
