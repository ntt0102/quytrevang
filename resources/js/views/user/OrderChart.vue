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
                <div class="area data-area">
                    <div class="command clock">{{ clock }}</div>
                    <input
                        type="date"
                        class="chart-date command"
                        :title="$t('user.orderChart.dateTitle')"
                        v-model="chartDate"
                        @change="() => getChartData()"
                    />
                    <img class="spinner" src="spinner.gif" v-if="spinnerShow" />
                </div>
                <div class="area tool-area">
                    <div
                        :class="
                            `command far fa-${
                                isFullscreen ? 'compress' : 'expand'
                            }`
                        "
                        @click="toggleFullscreen"
                    ></div>
                    <div
                        class="command far fa-sync-alt"
                        @click="() => getChartData()"
                    ></div>
                    <div
                        ref="lineTool"
                        class="command far fa-minus"
                        @click="lineToolClick"
                        @contextmenu="lineToolContextmenu"
                    ></div>
                    <div
                        ref="rulerTool"
                        class="command far fa-arrows-v"
                        @click="rulerToolClick"
                        @contextmenu="rulerToolContextmenu"
                    ></div>
                    <div
                        ref="cancelOrder"
                        class="command far fa-trash-alt"
                        @click="cancelOrderClick"
                    ></div>
                </div>
                <div>
                    <div
                        ref="entryOrder"
                        class="order-button entry"
                        @click="entryOrderClick"
                    >
                        Entry
                    </div>
                    <div
                        ref="tpslOrder"
                        class="order-button tpsl"
                        @click="tpslOrderClick"
                    >
                        TP/SL
                    </div>
                    <div
                        class="chart-top command far fa-angle-double-right"
                        @click="charTopClick"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import orderChartDb from "../../plugins/orderChartDb.js";
import adminOrderChartStore from "../../store/modules/Admin/OrderChart";
import { confirm } from "devextreme/ui/dialog";
const CHART_OPTIONS = {
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
const TP_DEFAULT = 3;
const SL_DEFAULT = 2;
const CURRENT_DATE = moment().format("YYYY-MM-DD");
const TIME = {
    START: moment(CURRENT_DATE + " 08:45:00").unix(),
    ATO: moment(CURRENT_DATE + " 09:00:00").unix(),
    ATC: moment(CURRENT_DATE + " 14:30:00").unix(),
    END: moment(CURRENT_DATE + " 14:45:00").unix()
};
export default {
    data() {
        return {
            orderPosition: 0,
            chart: {},
            series: {},
            data: { whitespace: [], price: [] },
            order: { side: 0, entry: {}, tp: {}, sl: {} },
            lines: [],
            ruler: { start: {}, end: {}, point: 0 },
            crosshair: {},
            spinnerShow: false,
            loadWhitespace: false,
            chartDate: CURRENT_DATE,
            clockInterval: null,
            clock: moment().format("HH:mm:ss"),
            isFullscreen: false
        };
    },
    beforeCreate() {
        this.$store.registerModule("Admin.orderChart", adminOrderChartStore);
    },
    created() {
        this.getConfig();
        this.loadWhitespace = true;
        this.getChartData(this.chartDate).then(() => this.loadToolsData());
        this.clockInterval = setInterval(() => {
            this.clock = Intl.DateTimeFormat(navigator.language, {
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            }).format();
        }, 1000);
        orderChartDb.create();
        this.connectSocket();
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
                CHART_OPTIONS
            );
            this.chartContainer.addEventListener("click", this.eventChartClick);
            this.chartContainer.addEventListener(
                "contextmenu",
                this.eventChartContextmenu
            );
            this.chart.subscribeCrosshairMove(this.eventChartCrosshairMove);
            this.chart.subscribeCustomPriceLineDragged(this.eventPriceLineDrag);
            this.series.whitespace = this.chart.addLineSeries({
                priceScaleId: "whitespace",
                visible: false
            });
            this.series.price = this.chart.addLineSeries({
                color: "#CCCCCC",
                priceFormat: { minMove: 0.1 }
            });
            new ResizeObserver(this.eventChartResize).observe(
                this.chartContainer
            );
            window.addEventListener("keydown", this.eventKeyPress);
            document.addEventListener(
                "fullscreenchange",
                () => (this.isFullscreen = document.fullscreenElement)
            );
            // console.log("$crypto: ", this.$crypto.encrypt({ a: 0 }));
        }, 1000);

        // const socket = io("https://datafeed.vps.com.vn");
        // console.log("socket: ", socket);
        // socket.on("connect", () => {
        //     console.log("socket-connect");
        //     var msg = { action: "join", list: this.config.symbol };
        //     socket.emit("regs", JSON.stringify(msg));
        // });

        // socket.on("connect_error", () => {
        //     console.log("socket-connect_error");
        //     // this.loadWhitespace = false;
        //     // this.getChartData(this.chartDate);
        //     // if (this.isInSession()) socket.connect();
        //     socket.connect();
        // });

        // socket.on("stockps", e => {
        //     console.log("socket-stockps", e);
        //     if (e.data.id == 3220) {
        //         const param = {
        //             time: moment(`${CURRENT_DATE} ${e.data.time}`).unix(),
        //             price: e.data.lastPrice,
        //             volume: e.data.lastVol
        //         };
        //         this.updateChartData(param);
        //     }
        // });
    },
    destroyed() {
        this.$store.unregisterModule("Admin.orderChart");
        clearInterval(this.interval);
    },
    computed: {
        ...mapGetters("Admin.orderChart", ["chartData", "config"]),
        chartContainer: function() {
            return this.$refs.chartContainer;
        },
        lastPrice: function() {
            return this.data.price.slice(-1)[0].value;
        }
    },
    watch: {
        chartData() {
            this.loadChartData();
        }
    },
    sockets: {
        connect: function() {
            console.log("socket connected");
            this.$socket.emit("emit_method", data);
        },
        customEmit: function(val) {
            console.log(
                'this method fired by socket server. eg: io.emit("customEmit", data)'
            );
        }
    },
    methods: {
        ...mapActions("Admin.orderChart", ["getChartData", "getConfig"]),
        eventChartContextmenu(e) {
            this.showOrderButton();
            e.preventDefault();
        },
        eventChartClick() {
            this.hideOrderButton();
            if (this.$refs.lineTool.classList.contains("selected"))
                this.drawLineTool();
            else if (this.$refs.rulerTool.classList.contains("selected"))
                this.drawRulerTool();
        },
        eventChartCrosshairMove(e) {
            if (e.time) {
                var price = e.seriesPrices.get(this.series.price);
                this.hasCrosshair = true;
                this.crosshair.time = e.time;
                this.crosshair.price = price;
            } else {
                this.hasCrosshair = false;
                if (!this.$devices.phone) {
                    this.crosshair.time = null;
                    this.crosshair.price = null;
                }
            }
            if (e.point != undefined) {
                this.crosshair.x = e.point.x;
                this.crosshair.y = e.point.y;
            }
        },
        eventPriceLineDrag(e) {
            var line = e.customPriceLine;
            var lineOptions = line.options();
            lineOptions.price = this.formatPrice(lineOptions.price);
            const oldPrice = +e.fromPriceString;
            const newPrice = lineOptions.price;
            switch (lineOptions.lineType) {
                case "order":
                    if (newPrice != oldPrice) {
                        var isChanged = false;
                        // const position = this.callback.getOrderPositionCallback();
                        if (lineOptions.kind == "entry") {
                            if (!this.orderPosition) {
                                isChanged = true;
                                this.order[lineOptions.kind].price = newPrice;
                                this.executeOrder({
                                    type: "entry",
                                    cmd: "change",
                                    side: this.order.side,
                                    price: this.order.entry.price
                                });
                                this.drawOrderLine(lineOptions.kind);
                            }
                        } else {
                            if (this.order.side * position > 0) {
                                isChanged = true;
                                this.order[lineOptions.kind].price = newPrice;
                                if (lineOptions.kind == "tp")
                                    this.executeOrder({
                                        type: "tp",
                                        cmd: "change",
                                        side: -this.order.side,
                                        price: this.order.tp.price
                                    });
                                else
                                    this.executeOrder({
                                        type: "sl",
                                        cmd: "change",
                                        side: -this.order.side,
                                        price: this.order.sl.price
                                    });

                                this.drawOrderLine(lineOptions.kind);
                            }
                        }
                        //
                        if (!isChanged) {
                            line.applyOptions({ price: oldPrice });
                            this.$toasted.show("Không được thay đổi.");
                        }
                    }
                    break;
                case "line":
                    orderChartDb.set("line", {
                        price: oldPrice,
                        removed: true
                    });
                    orderChartDb.set("line", lineOptions);
                    this.$refs.lineTool.classList.remove("selected");
                    break;
                case "ruler":
                    if (lineOptions.point == 1) {
                        orderChartDb.set("ruler", lineOptions);
                        if (this.ruler.point == 2) {
                            const distance = +this.ruler.end.options().title;
                            const endPrice = +(newPrice + distance).toFixed(1);
                            this.ruler.end.applyOptions({ price: endPrice });
                            orderChartDb.set("ruler", this.ruler.end.options());
                        }
                    } else {
                        const startPrice = +this.ruler.start.options().price;
                        const distance = (newPrice - startPrice).toFixed(1);
                        line.applyOptions({ title: distance });
                        orderChartDb.set("ruler", line.options());
                    }
                    break;
            }
        },
        eventChartResize() {
            const el = this.chartContainer;
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
            else this.chartContainer.requestFullscreen();
        },
        executeOrder(data) {
            return new Promise(resolve => {
                // this.spinnerShow = true;
                // axios
                //     .post("order-chart/order", data, {
                //         noLoading: true,
                //         crypto: true
                //     })
                //     .then(response => {
                //         // console.log(response.data);
                //         this.spinnerShow = false;
                //         resolve();
                //     });
                resolve(true);
            });
        },
        loadToolsData() {
            return new Promise(async (resolve, reject) => {
                const order = await orderChartDb.get("order");
                order.map(item => {
                    this.order.side = item.side;
                    this.order[item.kind].price = item.price;
                    this.drawOrderLine(item.kind);
                    if (item.kind == "entry") {
                        // if (this.callback.getOrderPositionCallback()) {
                        //     this.order.entry.line.applyOptions({
                        //         draggable: false
                        //     });
                        // }
                        this.toggleCancelOrderButton(true);
                    }
                });
                //
                const lines = await orderChartDb.get("line");
                lines.forEach(line => {
                    if (!line.removed)
                        this.lines.push(
                            this.series.price.createPriceLine(line)
                        );
                });
                //
                const rulerLines = await orderChartDb.get("ruler");
                if (rulerLines.length == 2) {
                    rulerLines.forEach(line => {
                        this.ruler.point = 2;
                        if (line.point == 1)
                            this.ruler.start = this.series.price.createPriceLine(
                                line
                            );
                        else
                            this.ruler.end = this.series.price.createPriceLine(
                                line
                            );
                    });
                }
                //
                resolve();
            });
        },
        loadChartData() {
            if (this.loadWhitespace) {
                this.data.whitespace = this.mergeChartData(
                    this.data.whitespace,
                    this.createWhitespaceData()
                );
                this.series.whitespace.setData(this.data.whitespace);
            }
            this.data.price = this.mergeChartData(
                this.chartData,
                this.data.price
            );
            this.series.price.setData(this.data.price);
            //
            this.spinnerShow = false;
        },
        updateChartData(data) {
            this.data.price = this.mergeChartData([data], this.data.price);
            this.series.price.update(this.lastPrice);
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
        },
        showOrderButton() {
            const CURRENT_SEC = moment().unix();
            if (this.isInSession(CURRENT_SEC)) {
                // if (true) {
                if (this.orderPosition) {
                    if (
                        this.order.entry.hasOwnProperty("line") &&
                        !this.order.tp.hasOwnProperty("line")
                    ) {
                        this.$refs.tpslOrder.style.left =
                            +(
                                this.crosshair.x +
                                (this.crosshair.x > innerWidth - 61 ? -61 : 1)
                            ) + "px";
                        this.$refs.tpslOrder.style.top =
                            +(
                                this.crosshair.y +
                                (this.crosshair.y > innerHeight - 51 ? -51 : 1)
                            ) + "px";
                        this.$refs.tpslOrder.style.display = "block";
                    }
                } else {
                    if (!this.order.entry.hasOwnProperty("line")) {
                        var price = this.coordinateToPrice(this.crosshair.y);
                        const side =
                            price >= this.data.price.slice(-1)[0].value
                                ? 1
                                : -1;
                        this.order.side = side;
                        if (CURRENT_SEC < TIME.ATO) price = "ATO";
                        else if (CURRENT_SEC < TIME.ATC) {
                            this.order.entry.price = price;
                            this.order.tp.price = price + side * TP_DEFAULT;
                            this.order.sl.price = price - side * SL_DEFAULT;
                        } else price = "ATC";
                        this.$refs.entryOrder.style.left =
                            +(
                                this.crosshair.x +
                                (this.crosshair.x > innerWidth - 71 ? -71 : 1)
                            ) + "px";
                        this.$refs.entryOrder.style.top =
                            +(
                                this.crosshair.y +
                                (this.crosshair.y > innerHeight - 61 ? -61 : 1)
                            ) + "px";
                        this.$refs.entryOrder.style.background =
                            side > 0 ? "green" : "red";
                        this.$refs.entryOrder.innerText = `${
                            side > 0 ? "LONG" : "SHORT"
                        } ${price}`;
                        this.$refs.entryOrder.style.display = "block";
                    }
                }
            }
        },
        hideOrderButton() {
            this.$refs.entryOrder.style.display = "none";
            this.$refs.tpslOrder.style.display = "none";
        },
        toggleCancelOrderButton(visible) {
            this.$refs.cancelOrder.style.display = visible ? "block" : "none";
        },
        drawOrderLine(kind) {
            var color, title;
            switch (kind) {
                case "entry":
                    color = "yellow";
                    title = this.order.side > 0 ? "LONG" : "SHORT";
                    break;
                case "tp":
                    color = "lime";
                    title = Math.abs(
                        this.order.tp.price - this.order.entry.price
                    ).toFixed(1);
                    break;
                case "sl":
                    color = "red";
                    title = Math.abs(
                        this.order.sl.price - this.order.entry.price
                    ).toFixed(1);
                    break;
            }
            if (this.order[kind].hasOwnProperty("line")) {
                this.order[kind].line.applyOptions({
                    price: this.order[kind].price,
                    title: title
                });
            } else {
                this.order[kind].line = this.series.price.createPriceLine({
                    lineType: "order",
                    kind: kind,
                    price: this.order[kind].price,
                    color: color,
                    lineWidth: 1,
                    lineStyle: LightweightCharts.LineStyle.Solid,
                    title: title,
                    draggable: true
                });
            }
            orderChartDb.set("order", {
                kind: kind,
                price: +this.order[kind].price,
                side: this.order.side
            });
        },
        removeOrderLine(kind) {
            if (this.order[kind].hasOwnProperty("line")) {
                this.series.price.removePriceLine(this.order[kind].line);
                delete this.order[kind].line;
            }
        },
        lineToolClick(e) {
            const selected = e.target.classList.contains("selected");
            document
                .querySelectorAll(".tool-area > .command")
                .forEach(el => el.classList.remove("selected"));
            if (!selected) e.target.classList.add("selected");
            e.stopPropagation();
        },
        lineToolContextmenu(e) {
            this.removeLineTool();
            e.target.classList.remove("selected");
            e.preventDefault();
            e.stopPropagation();
        },
        drawLineTool() {
            const TYPE = "line";
            const price = this.formatPrice(
                this.coordinateToPrice(this.crosshair.y)
            );
            const existIndex = this.lines.findIndex(line => {
                const ops = line.options();
                return (ops.type = TYPE && +ops.price == price);
            });
            if (existIndex != -1) {
                const removeLine = this.lines.splice(existIndex, 1);
                this.series.price.removePriceLine(removeLine[0]);
                orderChartDb.set("line", { price: price, removed: true });
            } else {
                const options = {
                    lineType: TYPE,
                    price: price,
                    color: "aqua",
                    lineWidth: 1,
                    lineStyle: LightweightCharts.LineStyle.Dotted,
                    draggable: true
                };
                this.lines.push(this.series.price.createPriceLine(options));
                orderChartDb.set("line", options);
            }
            this.$refs.lineTool.classList.remove("selected");
        },
        removeLineTool() {
            this.lines.forEach(line => this.series.price.removePriceLine(line));
            this.lines = [];
            orderChartDb.clear("line");
        },
        rulerToolClick(e) {
            const selected = e.target.classList.contains("selected");
            document
                .querySelectorAll(".tool-area > .command")
                .forEach(el => el.classList.remove("selected"));
            if (!selected) {
                e.target.classList.add("selected");
                this.removeRulerTool();
            }
            e.stopPropagation();
        },
        rulerToolContextmenu(e) {
            this.removeRulerTool();
            e.target.classList.remove("selected");
            e.preventDefault();
            e.stopPropagation();
        },
        drawRulerTool() {
            const price = this.coordinateToPrice(this.crosshair.y);
            var options = {
                lineType: "ruler",
                price: price,
                color: "#FF00FF",
                lineWidth: 1,
                lineStyle: LightweightCharts.LineStyle.Dotted,
                draggable: true
            };
            if (this.ruler.point == 0) {
                const point = 1;
                options.point = point;
                options.title = "0";
                this.ruler.start = this.series.price.createPriceLine(options);
                this.ruler.point = point;
                orderChartDb.set("ruler", options);
            } else if (this.ruler.point == 1) {
                const startPrice = +this.ruler.start.options().price;
                const point = 2;
                options.point = point;
                options.title = (price - startPrice).toFixed(1);
                this.ruler.end = this.series.price.createPriceLine(options);
                this.ruler.point = point;
                orderChartDb.set("ruler", options);
                this.$refs.rulerTool.classList.remove("selected");
            }
        },
        removeRulerTool() {
            if (this.ruler.point > 0) {
                this.series.price.removePriceLine(this.ruler.start);
                if (this.ruler.point > 1)
                    this.series.price.removePriceLine(this.ruler.end);
                //
                this.ruler = { start: {}, end: {}, point: 0 };
                orderChartDb.clear("ruler");
            }
        },
        cancelOrderClick() {
            this.toggleCancelOrderButton(false);
            if (this.order.entry.hasOwnProperty("line")) {
                if (this.order.tp.hasOwnProperty("line")) {
                    this.executeOrder({
                        type: "exit",
                        side: -this.order.side,
                        price: "MTL"
                    }).then(isOk => {
                        if (isOk) {
                            this.removeOrderLine("entry");
                            this.removeOrderLine("tp");
                            this.removeOrderLine("sl");
                            orderChartDb.clear("order");
                            this.$toasted.error(
                                "Đã huỷ lệnh và đóng tất cả vị thế"
                            );
                        } else this.toggleCancelOrderButton(true);
                    });
                } else {
                    this.executeOrder({
                        type: "entry",
                        cmd: "delete"
                    }).then(isOk => {
                        if (isOk) {
                            this.removeOrderLine("entry");
                            orderChartDb.clear("order");
                            this.$toasted.show("Đã huỷ lệnh entry.");
                        } else this.toggleCancelOrderButton(true);
                    });
                }
            }

            // const CURRENT_SEC = moment().unix();
            // if (this.isInSession()) {
            //     if (CURRENT_SEC < TIME.ATO) {
            //         // this.executeOrder({
            //         //     type: "exit",
            //         //     side: -this.order.side,
            //         //     price: "ATO"
            //         // }).then(isOk => {
            //         //     if (isOk)
            //         //         this.$toasted.success("Đặt lệnh ATO thành công");
            //         //     else this.$toasted.error("Đặt lệnh ATO thất bại");
            //         // });
            //     } else if (CURRENT_SEC < TIME.ATC) {
            //         if (this.order.entry.hasOwnProperty("line")) {
            //             // this.callback.cancelOrderCallback();
            //             orderChartDb.clear("order");
            //             this.removeOrderLine("entry");
            //             if (this.order.tp.hasOwnProperty("line")) {
            //                 // this.callback.closeOrderPositionCallback("MTL");
            //                 this.removeOrderLine("tp");
            //                 this.removeOrderLine("sl");
            //                 this.$toasted.error(
            //                     "Đã huỷ lệnh và đóng tất cả vị thế"
            //                 );
            //             } else this.$toasted.show("Đã huỷ lệnh entry.");
            //         }
            //     } else {
            //         // this.callback.closeOrderPositionCallback("ATC");
            //         this.$toasted.error("Đã đặt lệnh ATC để đóng vị thế.");
            //     }
            // }
        },
        entryOrderClick() {
            const CURRENT_SEC = moment().unix();
            if (this.isInSession(CURRENT_SEC)) {
                if (CURRENT_SEC < TIME.ATO) {
                    let result = confirm(
                        "<i>Đặt lệnh ATO?</i>",
                        "Xác nhận đặt lệnh"
                    );
                    result.then(dialogResult => {
                        if (dialogResult) {
                            this.executeOrder({
                                type: "exit",
                                side: -this.order.side,
                                price: "ATO"
                            }).then(isOk => {
                                if (isOk)
                                    this.$toasted.success(
                                        "Đặt lệnh ATO thành công"
                                    );
                                else
                                    this.$toasted.error(
                                        "Đặt lệnh ATO thất bại"
                                    );
                            });
                        }
                    });
                } else if (CURRENT_SEC < TIME.ATC) {
                    this.executeOrder({
                        type: "entry",
                        cmd: "new",
                        side: this.order.side,
                        price: this.order.entry.price
                    });
                    this.drawOrderLine("entry");
                    this.toggleCancelOrderButton(true);
                } else {
                    let result = confirm(
                        "<i>Đặt lệnh ATC?</i>",
                        "Xác nhận đặt lệnh"
                    );
                    result.then(dialogResult => {
                        if (dialogResult) {
                            this.executeOrder({
                                type: "exit",
                                side: -this.order.side,
                                price: "ATC"
                            }).then(isOk => {
                                if (isOk)
                                    this.$toasted.success(
                                        "Đặt lệnh ATC thành công"
                                    );
                                else
                                    this.$toasted.error(
                                        "Đặt lệnh ATC thất bại"
                                    );
                            });
                        }
                    });
                }
                this.hideOrderButton();
            }
        },
        tpslOrderClick() {
            // this.callback.orderTpPriceCallback(this.order, false);
            this.drawOrderLine("tp");
            // this.callback.orderSlPriceCallback(this.order, false);
            this.drawOrderLine("sl");
            this.hideOrderButton();
            this.order.entry.line.applyOptions({ draggable: false });
        },
        charTopClick() {
            this.chart.timeScale().scrollToRealTime();
        },
        isInSession(currentSec = null) {
            if (!currentSec) currentSec = moment().unix();
            return currentSec >= TIME.START && currentSec <= TIME.END;
        },
        coordinateToPrice(y) {
            return this.formatPrice(this.series.price.coordinateToPrice(y));
        },
        formatPrice(price) {
            return +(+price.toFixed(1));
        },
        connectSocket() {
            let websocket = new WebSocket(
                "wss://datafeed.vps.com.vn/socket.io/?EIO=3&transport=websocket"
            );
            websocket.onopen = function(e) {
                console.log("onopen", e);
                var msg = { action: "join", list: this.config.symbol };
                // websocket.send("2");
                websocket.send(
                    "42" + JSON.stringify(["regs", JSON.stringify(msg)])
                );
            };
            websocket.onclose = function(e) {
                console.log("onclose", e);
                this.connectSocket();
            };
            websocket.onmessage = function(e) {
                console.log("onmessage", e.data);
            };
            websocket.onerror = function(e) {
                console.log("onerror", e);
            };
        }
    }
};
</script>
<style lang="scss" scoped>
.order-chart-container {
    position: relative;
    height: 300px;
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

        &.data-area {
            top: 0px;
            left: 30px;

            .command:not(:first-child) {
                border-left: solid 2px #2a2e39 !important;
            }

            .chart-date {
                width: 125px;
            }

            .spinner {
                width: 30px;
                height: 30px;
            }
        }

        &.tool-area {
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

        .selected {
            color: #1f62ff !important;
        }

        &.warning {
            background: yellow;
            color: black;
        }

        &.clock {
            width: 80px;
        }
    }

    .order-button {
        position: absolute;
        display: none;
        padding: 5px;
        text-align: center;
        border-radius: 7px;
        color: black;
        background: silver;
        line-height: 21px;
        z-index: 3;
        cursor: pointer;

        &.entry {
            width: 70px;
            height: 60px;
        }

        &.tpsl {
            width: 60px;
            height: 50px;
        }
    }

    .chart-top {
        position: absolute;
        bottom: 29px;
        right: 55px;
        border-radius: 50%;
        border: 1px solid gray;
        padding-left: 1px;
        line-height: 22px !important;
        width: 25px !important;
        height: 25px !important;
        font-size: 18px;
    }
}
</style>
