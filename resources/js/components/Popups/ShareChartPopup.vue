<template>
    <DxPopup
        ref="popup"
        class="share-chart-popup"
        :showCloseButton="true"
        :fullScreen="true"
        :show-title="true"
        :title="$t('admin.trades.buttons.shareChart')"
        @hiding="$mf.popRouteHistoryState"
    >
        <template #content>
            <DxScrollView>
                <DxSelectBox
                    class="symbol-selectbox"
                    :items="symbols"
                    v-model="symbol"
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
        fontSize: 50,
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
                    this.chart = createChart(
                        this.popup.content().querySelector(".lightweight"),
                        chartOptions
                    );
                    this.chart.applyOptions({
                        watermark: { text: this.symbol }
                    });
                    this.priceSeries = this.chart.addLineSeries();
                    this.foreignSeries = this.chart.addAreaSeries({
                        priceScaleId: "",
                        topColor: "rgba(171, 71, 188, 0.56)",
                        bottomColor: "rgba(171, 71, 188, 0.04)",
                        lineColor: "rgba(171, 71, 188, 1)",
                        lineWidth: 2
                    });
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
.symbol-selectbox {
    width: 100px;
}
.lightweight {
    width: 100%;
    height: 400px;
    margin-top: 15px;
}
</style>
