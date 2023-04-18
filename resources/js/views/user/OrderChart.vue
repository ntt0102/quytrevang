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
            <div class="order-chart-container">
                <div class="chart-wrapper" ref="orderChart"></div>
                <div id="dataAreaDiv" class="area">
                    <img id="spinnerImg" src="spinner.gif" v-if="spinnerShow" />
                    <input
                        type="date"
                        id="dateInput"
                        class="command"
                        :title="$t('user.orderChart.dateTitle')"
                        v-model="chartDate"
                    />
                    <select
                        id="chartTypeSelect"
                        class="command"
                        v-model="chartType"
                    >
                        <option
                            v-for="chartType in chartTypes"
                            :key="chartType.value"
                            :value="chartType.value"
                            >{{ chartType.text }}</option
                        >
                    </select>
                    <select
                        id="timeFrameSelect"
                        class="command"
                        v-model="timeFrame"
                    >
                        <option
                            v-for="timeFrame in timeFrames"
                            :key="timeFrame.value"
                            :value="timeFrame.value"
                            >{{ timeFrame.text }}</option
                        ></select
                    >
                    <div id="dataAreaDiv" class="command far fa-sync-alt"></div>
                    <div id="dataAreaDiv" class="command  far fa-trash"></div>
                </div>
                <div id="toolAreaDiv" class="area">
                    <div class="command far fa-minus"></div>
                    <div class="command far fa-map-marker-check"></div>
                    <div class="command far fa-arrows-v"></div>
                    <div class="command far fa-bell-on"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import userOrderChartStore from "../../store/modules/User/OrderChart";
const UP_COLOR = "48,161,101";
const DOWN_COLOR = "236,63,63";
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
            data: { original: [], price: [], volume: [], whitespace: [] },
            order: { entry: {}, tp: {}, sl: {} },
            lines: [],
            makers: [],
            ruler: { start: {}, end: {}, point: 0 },
            alerts: [],
            crosshair: {},
            spinnerShow: false,
            chartDate: moment().format("YYYY-MM-DD"),
            chartType: "line",
            timeFrame: 0,
            chartTypes: [
                { text: "Nến", value: "candlestick" },
                { text: "Đường", value: "line" },
                { text: "Thanh", value: "bar" }
            ],
            timeFrames: [
                { text: "Tick", value: 0 },
                { text: "1 min", value: 1 },
                { text: "2 min", value: 2 },
                { text: "3 min", value: 3 },
                { text: "5 min", value: 5 },
                { text: "7 min", value: 7 },
                { text: "10 min", value: 10 },
                { text: "15 min", value: 15 },
                { text: "30 min", value: 30 },
                { text: "1 day", value: 1440 }
            ]
        };
    },
    beforeCreate() {
        this.$store.registerModule("User.orderChart", userOrderChartStore);
    },
    created() {
        this.getConfig().then(() => this.loadChartData());
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
            this.series.volume = this.chart.addHistogramSeries({
                priceScaleId: "volume",
                priceFormat: { type: "volume" },
                scaleMargins: { top: 0.8, bottom: 0 },
                visible: false
            });
            this.createPriceSeries();
            window.addEventListener("resize", () =>
                this.eventChartResize(this)
            );
            window.addEventListener("keydown", e =>
                this.eventKeyPress(e, this)
            );
            // this.loadChartData();
        }, 1000);
    },
    destroyed() {
        this.$store.unregisterModule("User.orderChart");
    },
    computed: {
        ...mapGetters("User.orderChart", ["config"])
        // dataGrid: function() {
        //     return this.$refs.dataGrid.instance;
        // }
    },
    methods: {
        ...mapActions("User.orderChart", ["getChartData", "getConfig"]),
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
        createPriceSeries() {
            switch (this.chartType) {
                case "candlestick":
                    this.series.price = this.chart.addCandlestickSeries({
                        upColor: `rgb(${UP_COLOR})`,
                        downColor: `rgb(${DOWN_COLOR})`,
                        borderVisible: false,
                        priceFormat: { minMove: 0.1 }
                    });
                    break;
                case "line":
                    this.series.price = this.chart.addLineSeries({
                        color: "#CCCCCC",
                        priceFormat: { minMove: 0.1 }
                    });
                    break;
                case "bar":
                    this.series.price = this.chart.addBarSeries({
                        upColor: `rgb(${UP_COLOR})`,
                        downColor: `rgb(${DOWN_COLOR})`,
                        thinBars: false,
                        priceFormat: { minMove: 0.1 }
                    });
                    break;
            }
        },
        loadChartData(loadWhitespace = true, loadOriginal = true) {
            return new Promise(async resolve => {
                this.spinnerShow = true;
                // if (loadWhitespace) {
                //     this.data.whitespace = this.mergeChartData(
                //         this.data.whitespace,
                //         this.generateWhitespaceData()
                //     );
                // }
                if (loadOriginal) {
                    const svData = await this.getChartData(this.chartDate);
                    this.data.original = this.mergeChartData(
                        svData,
                        this.data.original
                    );
                }
                //
                // this.series.whitespace.setData(
                //     this.timeFrame == 0 ? this.data.whitespace : []
                // );
                //
                if (!!this.data.original.length) {
                    const data = this.data.original.reduce(
                        (r, item) => this.generateChartData(r, item),
                        {
                            price: [],
                            volume: []
                        }
                    );
                    this.series.price.setData(data.price);
                    this.series.volume.setData(data.volume);
                    // this.updateLegend(
                    //     data.price.slice(-1)[0].value,
                    //     data.volume.slice(-1)[0].value
                    // );
                    this.data.price = data.price;
                    this.data.volume = data.volume;
                }
                //
                this.spinnerShow = false;
                resolve();
            });
        },
        mergeChartData(data1, data2) {
            const ids = new Set(data1.map(d => d.time));
            return [...data1, ...data2.filter(d => !ids.has(d.time))].sort(
                (a, b) => a.time - b.time
            );
        },
        generateWhitespaceData() {
            const date = this.dateInput.value;
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
        generateChartData(r, item) {
            if (this.checkDuplicateTime(r, item.time)) {
                var time = item.time + 7 * 60 * 60;
                const upColor = `rgba(${this.UP_COLOR},0.35)`;
                const downColor = `rgba(${this.DOWN_COLOR},0.35)`;
                var volumeColor = upColor;
                var volume = item.volume,
                    openPrice = 0,
                    highPrice = 0,
                    lowPrice = 0;
                if (this.timeFrame > 0) {
                    const period = 60 * this.timeFrame;
                    const timeIndex = Math.floor(time / period);
                    var isSameTime = false;
                    if (!!r.price.length) {
                        const prevTime = r.price.slice(-1)[0].time;
                        if (timeIndex == Math.floor(prevTime / period))
                            isSameTime = true;
                    }
                    if (isSameTime) {
                        const prevPrice = r.price.pop();
                        openPrice = prevPrice.open;
                        highPrice = prevPrice.high;
                        lowPrice = prevPrice.low;
                        if (item.price < lowPrice) lowPrice = item.price;
                        if (item.price > highPrice) highPrice = item.price;
                        //
                        const prevVolume = r.volume.pop();
                        volume += prevVolume.value;
                        volumeColor =
                            item.price >= openPrice ? upColor : downColor;
                    } else {
                        openPrice = item.price;
                        highPrice = item.price;
                        lowPrice = item.price;
                    }
                    time = timeIndex * period;
                }
                r.price.push({
                    time: time,
                    value: item.price,
                    open: openPrice,
                    high: highPrice,
                    low: lowPrice,
                    close: item.price
                });
                r.volume.push({
                    time: time,
                    value: volume,
                    color: volumeColor
                });
            }
            return r;

            function checkDuplicateTime(r, time) {
                if (r.price.length == 0) return true;
                if (r.price.findIndex(item => item.time == time) == -1)
                    return true;
                return false;
            }
        },
        checkDuplicateTime(r, time) {
            if (r.price.length == 0) return true;
            if (r.price.findIndex(item => item.time == time) == -1) return true;
            return false;
        },
        eventChartResize(self) {
            // self.chart.resize(window.innerWidth, window.innerHeight);
        },
        eventKeyPress(e, self) {
            try {
                if (e.ctrlKey || e.metaKey) {
                    if (e.shiftKey) {
                        switch (e.keyCode) {
                            case 39:
                                self.chart.timeScale().scrollToRealTime();
                                break;
                        }
                    } else {
                        switch (e.keyCode) {
                            case 38:
                                self.chart.timeScale().applyOptions({
                                    barSpacing:
                                        self.chart.options().timeScale
                                            .barSpacing + 0.1
                                });
                                break;
                            case 40:
                                if (
                                    options.timeScale.barSpacing >
                                    options.timeScale.minBarSpacing
                                )
                                    self.chart.timeScale().applyOptions({
                                        barSpacing:
                                            self.chart.options().timeScale
                                                .barSpacing - 0.1
                                    });
                                break;
                            case 37:
                                self.ch
                                    .timeScale()
                                    .scrollToPosition(
                                        self.chart
                                            .timeScale()
                                            .scrollPosition() - 10
                                    );
                                break;
                            case 39:
                                self.ch
                                    .timeScale()
                                    .scrollToPosition(
                                        self.chart
                                            .timeScale()
                                            .scrollPosition() + 10
                                    );
                                break;
                            case 75:
                                self.drawLineButton.click();
                                break;
                            case 76:
                                self.drawMarkerButton.click();
                                break;
                            case 186:
                                self.drawRulerButton.click();
                                break;
                            case 222:
                                self.drawAlertButton.click();
                                break;
                            case 48:
                                if (
                                    self.timeFrame !=
                                    self.global.timeFrames[0].value
                                ) {
                                    self.timeFrameSelect.value =
                                        self.global.timeFrames[0].value;
                                    self.timeFrameSelect.dispatchEvent(
                                        new Event("change")
                                    );
                                }
                                break;
                            case 49:
                                if (
                                    self.timeFrame !=
                                    self.global.timeFrames[1].value
                                ) {
                                    self.timeFrameSelect.value =
                                        self.global.timeFrames[1].value;
                                    self.timeFrameSelect.dispatchEvent(
                                        new Event("change")
                                    );
                                }
                                break;
                            case 50:
                                if (
                                    self.timeFrame !=
                                    self.global.timeFrames[2].value
                                ) {
                                    self.timeFrameSelect.value =
                                        self.global.timeFrames[2].value;
                                    self.timeFrameSelect.dispatchEvent(
                                        new Event("change")
                                    );
                                }
                                break;
                            case 51:
                                if (
                                    self.timeFrame !=
                                    self.global.timeFrames[3].value
                                ) {
                                    self.timeFrameSelect.value =
                                        self.global.timeFrames[3].value;
                                    self.timeFrameSelect.dispatchEvent(
                                        new Event("change")
                                    );
                                }
                                break;
                            case 52:
                                if (
                                    self.chartType !=
                                    self.global.chartTypes[0].value
                                ) {
                                    self.chartTypeSelect.value =
                                        self.global.chartTypes[0].value;
                                    self.chartTypeSelect.dispatchEvent(
                                        new Event("change")
                                    );
                                }
                                break;
                            case 53:
                                if (
                                    self.chartType !=
                                    self.global.chartTypes[1].value
                                ) {
                                    self.chartTypeSelect.value =
                                        self.global.chartTypes[1].value;
                                    self.chartTypeSelect.dispatchEvent(
                                        new Event("change")
                                    );
                                }
                                break;
                            case 54:
                                if (
                                    self.chartType !=
                                    self.global.chartTypes[2].value
                                ) {
                                    self.chartTypeSelect.value =
                                        self.global.chartTypes[2].value;
                                    self.chartTypeSelect.dispatchEvent(
                                        new Event("change")
                                    );
                                }
                                break;
                            case 77:
                                self.refreshButton.click();
                                break;
                            case 188:
                                self.clearButton.click();
                                break;
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.order-chart-container {
    position: relative;
    height: calc(100vh - 56px - 109px - 200px);

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
            right: 55px;

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
}
</style>
