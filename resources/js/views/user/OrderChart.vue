<template>
    <div class="order-chart-page">
        <h2 class="content-block">
            {{ $t("user.orderChart.title") }}
        </h2>
        <div class="content-block dx-card responsive-paddings">
            <DxToolbar
                :items="[
                    {
                        location: 'before',
                        widget: 'dxButton',
                        options: {
                            icon: 'far fa-arrow-left small',
                            hint: $t('buttons.back'),
                            onClick: () => {
                                $router.push({ name: $route.query.redirect });
                            }
                        }
                    }
                ]"
            />
            <div class="order-chart-container" ref="chartContainer">
                <div class="chart-wrapper" ref="orderChart"></div>
                <div id="dataAreaDiv" class="area">
                    <div class="command clock">{{ clock }}</div>
                    <input
                        type="date"
                        id="dateInput"
                        class="command"
                        :title="$t('user.orderChart.dateTitle')"
                        v-model="chartDate"
                        @change="() => getChartData()"
                    />
                    <img id="spinnerImg" src="spinner.gif" v-if="spinnerShow" />
                </div>
                <div id="toolAreaDiv" class="area">
                    <div
                        :class="
                            `command far fa-${
                                isFullscreen ? 'compress' : 'expand'
                            }`
                        "
                        @click="() => toggleFullscreen()"
                    ></div>
                    <div
                        class="command far fa-sync-alt"
                        @click="() => getChartData()"
                    ></div>
                    <div class="command far fa-minus"></div>
                    <div class="command far fa-arrows-v"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import adminOrderChartStore from "../../store/modules/Admin/OrderChart";
const chartOptions = {
    localization: { dateFormat: "dd/MM/yyyy", locale: "vi-VN" },
    rightPriceScale: {
        visible: true,
        scaleMargins: { top: 0.2, bottom: 0.1 }
    },
    leftPriceScale: { visible: false },
    layout: {
        backgroundColor: "#000000",
        textColor: "#CCCCCC"
    },
    grid: {
        vertLines: {
            color: "#1B1E27",
            style: 2
        },
        horzLines: {
            color: "#1B1E27",
            style: 2
        }
    },
    crosshair: { mode: 0 },
    timeScale: {
        timeVisible: true,
        rightOffset: 20,
        minBarSpacing: 0.05
    }
};
export default {
    data() {
        return {
            chart: {},
            series: {},
            data: { whitespace: [], price: [] },
            order: { entry: {}, tp: {}, sl: {} },
            lines: [],
            ruler: { start: {}, end: {}, point: 0 },
            crosshair: {},
            spinnerShow: false,
            chartDate: moment().format("YYYY-MM-DD"),
            clockInterval: null,
            clock: null,
            isFullscreen: false
        };
    },
    beforeCreate() {
        this.$store.registerModule("User.orderChart", adminOrderChartStore);
    },
    created() {
        this.getChartData(true);
        this.clockInterval = setInterval(() => {
            this.clock = Intl.DateTimeFormat(navigator.language, {
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            }).format();
        }, 1000);
    },
    mounted() {
        if (document.getElementById("orderChartJs")) return;
        var scriptTag = document.createElement("script");
        scriptTag.src = "/js/order-chart.min.js";
        scriptTag.id = "orderChartJs";
        document.getElementsByTagName("head")[0].appendChild(scriptTag);
        //
        setTimeout(() => {
            this.chart = LightweightCharts.createChart(
                this.$refs.orderChart,
                chartOptions
            );
            this.chart.subscribeCrosshairMove(e =>
                this.eventChartCrosshairMove(e, this)
            );
            this.chart.subscribeCustomPriceLineDragged(e =>
                this.eventPriceLineDrag(e, this)
            );
            this.series.whitespace = this.chart.addLineSeries({
                priceScaleId: "whitespace",
                visible: false
            });
            this.series.price = this.chart.addLineSeries({
                color: "#CCCCCC",
                priceFormat: { minMove: 0.1 }
            });
            new ResizeObserver(this.eventChartResize).observe(
                this.$refs.chartContainer
            );
            window.addEventListener("keydown", this.eventKeyPress);
            document.addEventListener(
                "fullscreenchange",
                () => (this.isFullscreen = document.fullscreenElement)
            );
        }, 1000);
    },
    destroyed() {
        this.$store.unregisterModule("User.orderChart");
        clearInterval(this.interval);
    },
    computed: {
        ...mapGetters("User.orderChart", ["config"])
        // dataGrid: function() {
        //     return this.$refs.dataGrid.instance;
        // }
    },
    methods: {
        // ...mapActions("User.orderChart", ["getChartData", "getConfig"]),
        eventChartCrosshairMove(e, self) {
            // if (e.time) {
            //     var price = e.seriesPrices.get(self.series.price);
            //     var volume = e.seriesPrices.get(self.series.volume);
            //     if (!!price && self.chartType != "line") price = price.close;
            //     self.updateLegend(price, volume);
            //     self.hasCrosshair = true;
            //     self.crosshair.time = e.time;
            //     self.crosshair.price = price;
            // } else {
            //     self.hasCrosshair = false;
            //     if (!self.global.isMobile) {
            //         self.crosshair.time = null;
            //         self.crosshair.price = null;
            //     }
            // }
            // if (e.point != undefined) {
            //     self.crosshair.x = e.point.x;
            //     self.crosshair.y = e.point.y;
            // }
        },
        eventPriceLineDrag(e, self) {
            var line = e.customPriceLine;
            var lineOptions = line.options();
            lineOptions.price = self.formatPrice(lineOptions.price);
            const oldPrice = +e.fromPriceString;
            const newPrice = lineOptions.price;
            switch (lineOptions.lineType) {
                case "order":
                    if (newPrice != oldPrice) {
                        var isChanged = false;
                        const position = self.callback.getOrderPositionCallback();
                        if (lineOptions.kind == "entry") {
                            if (!position) {
                                isChanged = true;
                                self.order[lineOptions.kind].price = newPrice;
                                self.callback.orderEntryPriceCallback(
                                    self.order,
                                    true
                                );
                                self.drawOrderLine(lineOptions.kind);
                            }
                        } else {
                            if (self.order.side * position > 0) {
                                isChanged = true;
                                self.order[lineOptions.kind].price = newPrice;
                                if (lineOptions.kind == "tp")
                                    self.callback.orderTpPriceCallback(
                                        self.order,
                                        true
                                    );
                                else
                                    self.callback.orderSlPriceCallback(
                                        self.order,
                                        true
                                    );
                                self.drawOrderLine(lineOptions.kind);
                            }
                        }
                        //
                        if (!isChanged) {
                            line.applyOptions({ price: oldPrice });
                            self.global.alert.warning("Không được thay đổi.");
                        }
                    }
                    break;
                case "line":
                    self.global.store.set("line", {
                        price: oldPrice,
                        removed: true
                    });
                    self.global.store.set("line", lineOptions);
                    self.drawLineButton.classList.remove("selected");
                    break;
                case "ruler":
                    if (lineOptions.point == 1) {
                        self.global.store.set("ruler", lineOptions);
                        if (self.ruler.point == 2) {
                            const distance = +self.ruler.end.options().title;
                            const endPrice = +(newPrice + distance).toFixed(1);
                            self.ruler.end.applyOptions({ price: endPrice });
                            self.global.store.set(
                                "ruler",
                                self.ruler.end.options()
                            );
                        }
                    } else {
                        const startPrice = +self.ruler.start.options().price;
                        const distance = (newPrice - startPrice).toFixed(1);
                        line.applyOptions({ title: distance });
                        self.global.store.set("ruler", line.options());
                    }
                    break;
                case "alert":
                    self.alertAudio.pause();
                    self.global.store.set("alert", {
                        price: oldPrice,
                        removed: true
                    });
                    const currentPrice = self.data.price.slice(-1)[0].value;
                    var title = newPrice >= currentPrice ? ">" : "<";
                    line.applyOptions({ title: title });
                    self.global.store.set("alert", line.options());
                    self.drawAlertButton.classList.remove("selected");
                    break;
            }
        },
        eventChartResize() {
            const el = this.$refs.chartContainer;
            this.chart.resize(el.offsetWidth, el.offsetHeight);
        },
        eventKeyPress(e) {
            if (e.ctrlKey || e.metaKey) {
                switch (e.keyCode) {
                    case 38:
                        this.chart.timeScale().applyOptions({
                            barSpacing:
                                this.chart.options().timeScale.barSpacing + 0.05
                        });
                        break;
                    case 40:
                        this.chart.timeScale().applyOptions({
                            barSpacing:
                                this.chart.options().timeScale.barSpacing - 0.05
                        });
                        break;
                    case 37:
                        this.chart
                            .timeScale()
                            .scrollToPosition(
                                this.chart.timeScale().scrollPosition() - 10
                            );
                        break;
                    case 39:
                        this.chart
                            .timeScale()
                            .scrollToPosition(
                                this.chart.timeScale().scrollPosition() + 10
                            );
                        break;
                    case 96:
                        self.drawAlertButton.click();
                        break;
                    case 97:
                        self.drawMarkerButton.click();
                        break;
                    case 98:
                        this.getChartData();
                        break;
                    case 99:
                        this.toggleFullscreen();
                        break;
                }
            }
        },
        toggleFullscreen() {
            if (document.fullscreenElement) document.exitFullscreen();
            else this.$refs.chartContainer.requestFullscreen();
        },
        getChartData(loadWhitespace = false) {
            this.spinnerShow = true;
            axios
                .post(
                    "order-chart",
                    { date: this.chartDate },
                    { noLoading: true }
                )
                .then(response => {
                    // console.log(response.data);
                    if (loadWhitespace) {
                        this.data.whitespace = this.mergeChartData(
                            this.data.whitespace,
                            this.createWhitespaceData()
                        );
                        this.series.whitespace.setData(this.data.whitespace);
                    }
                    this.data.price = this.mergeChartData(
                        response.data,
                        this.data.price
                    );
                    this.series.price.setData(this.data.price);
                    //
                    this.spinnerShow = false;
                });
        },
        createWhitespaceData() {
            const date = this.chartDate;
            const amStart = moment(`${date} 09:00:00`).unix();
            const amEnd = moment(`${date} 11:30:00`).unix();
            const pmStart = moment(`${date} 13:00:00`).unix();
            const pmEnd = moment(`${date} 14:30:00`).unix();
            var data = [],
                sec;
            for (sec = amStart; sec <= amEnd; sec++) {
                data.push({ time: sec + 7 * 60 * 60 });
            }
            for (sec = pmStart; sec <= pmEnd; sec++) {
                data.push({ time: sec + 7 * 60 * 60 });
            }
            return data;
        },
        mergeChartData(data1, data2) {
            const ids = new Set(data1.map(d => d.time));
            return [...data1, ...data2.filter(d => !ids.has(d.time))].sort(
                (a, b) => a.time - b.time
            );
        }
    }
};
</script>
<style lang="scss" scoped>
.order-chart-container {
    position: relative;
    height: 350px;
    background: #131722;
    border: none;
    .chart-wrapper {
        height: 100%;
    }
    .area {
        position: absolute;
        display: flex;
        justify-content: space-between;
        font-size: 17px;
        background: #131722;
        border: solid 2px #2a2e39;
        border-radius: 5px;
        z-index: 3;

        &#dataAreaDiv {
            top: 0px;
            left: 30px;

            .command:not(:first-child) {
                border-left: solid 2px #2a2e39 !important;
            }

            #timeFrameSelect {
                width: 75px;
            }

            #chartTypeSelect {
                width: 77px;
            }

            #dateInput {
                width: 125px;
            }

            #spinnerImg {
                width: 30px;
                height: 30px;
            }
        }

        &#toolAreaDiv {
            top: 0px;
            left: 0px;
            flex-direction: column;

            .command:not(:first-child) {
                border-top: solid 2px #2a2e39 !important;
            }
        }
    }
    .command {
        width: 30px;
        height: 30px;
        flex: 1 1 auto;
        text-align: center;
        color: #bbbbbb;
        background: transparent !important;
        line-height: 30px;
        font-size: 16px;
        border: none;
        cursor: pointer;
        z-index: 3;

        &:hover {
            background: #2a2e39 !important;
        }
    }
    .clock {
        width: 80px;
    }
}
</style>
