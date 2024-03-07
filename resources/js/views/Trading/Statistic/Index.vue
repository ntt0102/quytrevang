<template>
    <OpeningSummary :hasTitle="false" />
    <Summary :hasTitle="false" />
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
                        hint: $t('trading.statistic.buttons.more'),
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
                        hint: $t('trading.statistic.buttons.addData'),
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
                                'tradingStatistic/getProfitChart',
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
                text: $t('trading.statistic.charTitle'),
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
            :commonSeriesSettings="{ argumentField: 'date', barPadding: 0 }"
            :series="[
                {
                    name: $t('trading.statistic.profitSum'),
                    tag: 'profit',
                    valueField: 'profit',
                    axis: 'profit',
                    type: 'bar',
                    color: 'DarkGreen',
                    visible: visibleSeries.profit,
                },
                {
                    name: $t('trading.statistic.rr'),
                    tag: 'rr',
                    valueField: 'rr',
                    axis: 'rr',
                    type: 'bar',
                    color: 'Teal',
                    visible: visibleSeries.rr,
                },
                {
                    name: $t('trading.statistic.winrate'),
                    tag: 'winrate',
                    valueField: 'winrate',
                    axis: 'winrate',
                    type: 'bar',
                    color: 'Purple',
                    visible: visibleSeries.winrate,
                },
                {
                    name: $t('trading.statistic.accProfit'),
                    tag: 'accProfit',
                    valueField: 'accProfit',
                    axis: 'accProfit',
                    type: 'spline',
                    color: 'White',
                    visible: visibleSeries.accProfit,
                },
            ]"
            :valueAxis="[
                {
                    name: 'profit',
                    synchronizedValue: 0,
                    label: { customizeText: customizeText },
                    constantLines: [
                        {
                            value: 0,
                            color: 'White',
                            label: { visible: false },
                            displayBehindSeries: true,
                        },
                    ],
                },
                {
                    name: 'rr',
                    synchronizedValue: 0,
                    label: { visible: false },
                    tick: { visible: false },
                    grid: { visible: false },
                    visible: false,
                },
                {
                    name: 'winrate',
                    synchronizedValue: 0,
                    label: { visible: false },
                    tick: { visible: false },
                    grid: { visible: false },
                    visible: false,
                },
                {
                    name: 'accProfit',
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
                    <g v-if="data.series.tag === 'accProfit'">
                        <path
                            d="M 0 8 C 2 4 7 4 9.5 8 C 11 12 16 12 18 8 L 18 10 C 16 14 11 14 8.5 10 C 7 6 2 6 0 10 Z"
                            :fill="data.marker.fill"
                        ></path>
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
import OpeningSummary from "./OpeningSummary.vue";
import Summary from "./Summary.vue";
import TrackStatisticPopup from "./TrackStatisticPopup.vue";
import { ref, reactive, inject, computed, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const store = useStore();
const route = useRoute();
const { t } = useI18n();
const bus = inject("bus");
const filters = inject("filters");
let params = {
    targetThreshold: {
        profit: 0,
        rr: 1,
        winrate: 50,
    },
};
const visibleSeries = reactive({
    profit: true,
    rr: false,
    winrate: false,
    accProfit: true,
});
const chartRef = ref(null);
const charts = computed(() => store.state.tradingStatistic.charts);
const permissions = computed(() => store.state.auth.user.permissions);

store.dispatch("tradingStatistic/getProfitChart", route.query.period ?? "day");
bus.on("toggleMenu", () => {
    setTimeout(() => chartRef.value.instance.render(), 300);
});

onUnmounted(() => bus.off("toggleMenu"));

function customizePoint({ value, series }) {
    switch (series.tag) {
        case "profit":
            if (value <= params.targetThreshold.profit)
                return {
                    color: "FireBrick",
                    hoverStyle: { color: "FireBrick" },
                };
            break;
        case "rr":
            if (value > params.targetThreshold.rr)
                return { color: "Aqua", hoverStyle: { color: "Aqua" } };
            break;
        case "winrate":
            if (value > params.targetThreshold.winrate)
                return { color: "Fuchsia", hoverStyle: { color: "Fuchsia" } };
            break;
    }
}
function customizeText({ value }) {
    return filters.shorten(value);
}
function customizeTooltip(pointInfo) {
    let accProfit = pointInfo.point.data.accProfit;
    let refDate = getReferenceDate();
    if (refDate !== null) {
        let refAccProfit = charts.value.data.find(
            (c) => c.date === refDate
        ).accProfit;
        accProfit = accProfit - refAccProfit;
    }
    return {
        html: `<div class='trade-chart-tooltip'>
                <div class='tooltip-header'>
                  ${pointInfo.argumentText}
                </div>
                <div class='tooltip-body'>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${t("trading.statistic.profitSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value' style='font-weight: bold; color:${
                        pointInfo.point.data.profit >= 0 ? "green" : "red"
                    }'>
                      ${filters.shorten(pointInfo.point.data.profit, "₫")}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${t("trading.statistic.rr")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${filters.numberVnFormat(
                          pointInfo.point.data.rr,
                          pointInfo.point.data.rr > 2 ? 0 : 1
                      )}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${t("trading.statistic.winrate")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${filters.numberVnFormat(
                          pointInfo.point.data.winrate,
                          0
                      )}%
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${t("trading.statistic.accProfit")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${filters.shorten(accProfit, "₫")}
                    </span>
                  </div>
                </div>
              </div>`,
    };
}
function onPointClick({ target }) {
    let refDate =
        getReferenceDate() === target.argument ? null : target.argument;
    setReferenceDate(refDate);
}
function onLegendClick(e) {
    const series = e.target;
    let refDate = getReferenceDate();
    if (series.isVisible()) {
        series.hide();
        visibleSeries[series.tag] = false;
    } else {
        series.show();
        visibleSeries[series.tag] = true;
    }
    setTimeout(() => setReferenceDate(refDate), 0);
}
function getReferenceDate() {
    return chartRef.value.instance.option(
        "argumentAxis.constantLines[0].value"
    );
}
function setReferenceDate(value) {
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
