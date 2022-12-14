<template>
    <DxPopup
        ref="popup"
        :showCloseButton="true"
        :fullScreen="true"
        :show-title="true"
        :title="$t('admin.trades.buttons.vn30f1mChart')"
        :wrapperAttr="{ class: 'vn30f1m-chart-popup' }"
        @hiding="$mf.popRouteHistoryState"
    >
        <template #content> </template>
    </DxPopup>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DxSelectBox from "devextreme-vue/select-box";
import { createChart } from "lightweight-charts";
const chartOptions = {
    localization: {
        locale: "vi-VN"
    },
    rightPriceScale: {
        scaleMargins: {
            top: 0.3,
            bottom: 0.25
        },
        borderVisible: false
    },
    layout: {
        backgroundColor: "#131722",
        textColor: "#d1d4dc",
        lineColor: "#2B2B43"
    },
    watermark: {
        visible: true,
        fontSize: 100,
        horzAlign: "center",
        vertAlign: "center",
        color: "rgba(255, 255, 255, 0.1)",
        text: ""
    },
    grid: {
        vertLines: { color: "#2B2B43" },
        horzLines: { color: "#363C4E" }
    }
};

export default {
    components: {
        DxSelectBox
    },
    data() {
        return {
            chart: null,
            price1Series: null,
            price2Series: null,
            price3Series: null
        };
    },
    computed: {
        popup() {
            return this.$refs.popup.instance;
        }
    },
    methods: {
        ...mapActions("Admin.trades", ["getVn30f1m"]),
        show() {
            this.popup.show();
            if (!this.chart) {
                this.getVn30f1m().then(data => {
                    setTimeout(() => {
                        let container = this.popup.content().firstChild;
                        let toolTip = document.createElement("div");
                        toolTip.className = "floating-tooltip";
                        container.appendChild(toolTip);
                        this.chart = createChart(container, chartOptions);
                        // this.chart.subscribeCrosshairMove(param => {
                        //     if (
                        //         !param.time ||
                        //         param.point.x < 0 ||
                        //         param.point.x > width ||
                        //         param.point.y < 0 ||
                        //         param.point.y > height
                        //     ) {
                        //         toolTip.style.display = "none";
                        //         return;
                        //     }
                        //     let width = container.offsetWidth;
                        //     let height = container.offsetHeight;
                        //     let toolTipWidth = 85;
                        //     let toolTipHeight = 100;

                        //     let vnindex = param.seriesPrices.get(
                        //         this.vnindexSeries
                        //     );
                        //     let price = param.seriesPrices.get(
                        //         this.priceSeries
                        //     );
                        //     let foreign = param.seriesPrices.get(
                        //         this.foreignSeries
                        //     );
                        //     toolTip.style.display = "block";
                        //     toolTip.innerHTML =
                        //         `<div>${param.time.day}/${param.time.month}/${param.time.year}</div>` +
                        //         `<hr/>` +
                        //         `<div style="font-size: 16px; color: rgba(32, 226, 47, 1)">${vnindex}</div>` +
                        //         `<div style="font-size: 16px; color: rgba(33, 150, 243, 1)">${price ??
                        //             "-"}</div>` +
                        //         `<div style="font-size: 16px; color: rgba(171, 71, 188, 1)">${foreign ??
                        //             "-"}</div>`;
                        //     let left = param.point.x;
                        //     if (left > width - toolTipWidth)
                        //         left = param.point.x - toolTipWidth;
                        //     let top = param.point.y + 67;
                        //     if (top > height - toolTipHeight)
                        //         top = param.point.y - toolTipHeight + 67;
                        //     toolTip.style.left = left + "px";
                        //     toolTip.style.top = top + "px";
                        // });
                        this.price1Series = this.chart.addLineSeries({
                            color: "rgba(0, 255, 255, 1)",
                            lineStyle: 0
                        });
                        this.price2Series = this.chart.addLineSeries({
                            color: "rgba(255, 225, 0, 1)"
                        });
                        this.price3Series = this.chart.addLineSeries({
                            color: "rgba(255, 0, 255, 1)",
                            lineStyle: 0
                        });
                        //
                        this.price1Series.setData(data.price1);
                        this.price2Series.setData(data.price2);
                        this.price3Series.setData(data.price3);
                        this.chart.timeScale().fitContent();
                    }, 200);
                });
            }
            this.$mf.pushPopupToHistoryState(() => this.popup.hide());
        }
    }
};
</script>
<style lang="scss">
.vn30f1m-chart-popup {
    .dx-popup-content {
        padding: 0 !important;
    }
    .floating-tooltip {
        width: 85px;
        height: 100px;
        position: absolute;
        display: none;
        padding: 5px;
        box-sizing: border-box;
        font-size: 12px;
        color: #131722;
        background-color: rgba(255, 255, 255, 1);
        text-align: center;
        z-index: 1000;
        pointer-events: none;
        border: 1px solid rgba(255, 70, 70, 1);
        border-radius: 2px;
    }
}
</style>
