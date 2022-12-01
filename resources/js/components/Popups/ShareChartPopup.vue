<template>
    <DxPopup
        ref="popup"
        :showCloseButton="true"
        :fullScreen="true"
        :show-title="true"
        :title="$t('admin.trades.buttons.shareChart')"
        :wrapperAttr="{ class: 'share-chart-popup' }"
        @hiding="$mf.popRouteHistoryState"
    >
        <template #content>
            <DxScrollView>
                <DxSelectBox
                    class="symbol-selectbox"
                    :items="symbols"
                    v-model="symbol"
                    :searchEnabled="true"
                    @value-changed="onSymbolChanged"
                />
                <div class="lightweight"></div>
            </DxScrollView>
        </template>
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
            symbol: null,
            symbols: [],
            chart: null,
            priceSeries: null,
            foreignSeries: null
        };
    },
    created() {
        this.getSymbol().then(symbols => {
            this.symbols = symbols;
            this.symbol = symbols[0];
        });
    },
    computed: {
        popup() {
            return this.$refs.popup.instance;
        }
    },
    methods: {
        ...mapActions("Admin.trades", ["getSymbol", "getShare"]),
        show() {
            this.popup.show();
            this.getShare(this.symbol).then(data => {
                if (!this.chart) {
                    let container = this.popup
                        .content()
                        .querySelector(".lightweight");
                    var toolTip = document.createElement("div");
                    toolTip.className = "floating-tooltip";
                    container.appendChild(toolTip);
                    this.chart = createChart(container, chartOptions);
                    this.chart.subscribeCrosshairMove(param => {
                        if (
                            !param.time ||
                            param.point.x < 0 ||
                            param.point.x > width ||
                            param.point.y < 0 ||
                            param.point.y > height
                        ) {
                            toolTip.style.display = "none";
                            return;
                        }
                        let width = container.offsetWidth;
                        let height = container.offsetHeight;
                        var toolTipWidth = 100;
                        var toolTipHeight = 80;
                        var toolTipMargin = 15;

                        let price = param.seriesPrices.get(this.priceSeries);
                        let foreign = param.seriesPrices.get(
                            this.foreignSeries
                        );
                        toolTip.style.display = "block";
                        toolTip.innerHTML =
                            `<div>${param.time.day}/${param.time.month}/${param.time.year}</div>` +
                            `<div style="font-size: 20px; color: rgba(33,150,243, 1)">${price}</div>` +
                            `<div style="font-size: 20px; color: rgba(171, 71, 188, 1)">${foreign}</div>`;
                        var y = param.point.y;

                        var left = param.point.x + toolTipMargin;
                        if (left > width - toolTipWidth) {
                            left = param.point.x - toolTipMargin - toolTipWidth;
                        }

                        var top = y + toolTipMargin;
                        if (top > height - toolTipHeight) {
                            top = y - toolTipHeight - toolTipMargin;
                        }

                        toolTip.style.left = left + "px";
                        toolTip.style.top = top + "px";
                    });
                    this.chart.applyOptions({
                        watermark: { text: this.symbol }
                    });
                    this.foreignSeries = this.chart.addAreaSeries({
                        priceScaleId: "",
                        topColor: "rgba(171, 71, 188, 0.56)",
                        bottomColor: "rgba(171, 71, 188, 0.04)",
                        lineColor: "rgba(171, 71, 188, 1)",
                        lineWidth: 2,
                        priceFormat: { precision: 0, minMove: 1 }
                    });
                    this.priceSeries = this.chart.addLineSeries();
                }
                this.priceSeries.setData(data.price);
                this.foreignSeries.setData(data.foreign);
                this.chart.timeScale().fitContent();
            });
            this.$mf.pushPopupToHistoryState(() => this.popup.hide());
        },
        onSymbolChanged(e) {
            this.getShare(e.value).then(data => {
                this.priceSeries.setData(data.price);
                this.foreignSeries.setData(data.foreign);
                this.chart.applyOptions({
                    watermark: { text: e.value }
                });
            });
        }
    }
};
</script>
<style lang="scss">
.share-chart-popup {
    .symbol-selectbox {
        width: 75px;
    }
    .lightweight {
        width: 100%;
        height: calc(100vh - 200px);
        margin-top: 15px;
    }
}
body[screen-size="small"] {
    .share-chart-popup {
        .symbol-selectbox {
            margin-left: 20px;
        }
        .lightweight {
            height: calc(100vh - 180px);
        }
        .dx-popup-content {
            padding: 24px 0 !important;
        }
    }
}
.floating-tooltip {
    width: 96px;
    height: 80px;
    position: absolute;
    display: none;
    padding: 8px;
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
</style>
