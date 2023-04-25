<template>
    <div class="order-chart-page">
        <h2 class="content-block">
            {{ $t("admin.orderChart.title") }}
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
                <div class="chart-wrapper" ref="orderChart">
                    <div class="area data-area">
                        <div
                            :class="
                                `command noaction far fa-${
                                    status.connection ? 'link' : 'unlink'
                                }`
                            "
                            :title="$t('admin.orderChart.connection')"
                        ></div>
                        <div
                            class="command noaction status"
                            :class="{
                                green: status.position > 0,
                                red: status.position < 0
                            }"
                            :title="$t('admin.orderChart.position')"
                        >
                            {{ status.position | currency("", "") }}
                        </div>
                        <div class="command noaction clock">{{ clock }}</div>
                        <input
                            type="date"
                            class="chart-date command"
                            :title="$t('admin.orderChart.dateTitle')"
                            v-model="chartDate"
                            @change="() => getChartData(chartDate)"
                        />
                        <img
                            ref="spinner"
                            class="command spinner"
                            src="spinner.gif"
                        />
                    </div>
                    <div class="area tool-area">
                        <div
                            ref="fullscreenTool"
                            :class="
                                `command far fa-${
                                    isFullscreen ? 'compress' : 'expand'
                                }`
                            "
                            @click="toggleFullscreen"
                        ></div>
                        <div
                            ref="reloadTool"
                            class="command far fa-sync-alt"
                            @click="
                                () => {
                                    data.price = [];
                                    getChartData(chartDate);
                                }
                            "
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
                            class="cancel-order command far fa-trash-alt"
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
                            @click="chartTopClick"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import toolsStore from "../../plugins/orderChartDb.js";
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
            chart: {},
            series: {},
            data: { whitespace: [], price: [] },
            order: { side: 0, position: 0, entry: {}, tp: {}, sl: {} },
            lines: [],
            ruler: { start: {}, end: {}, point: 0 },
            crosshair: {},
            loadWhitespace: true,
            chartDate: CURRENT_DATE,
            interval: null,
            interval60: null,
            clock: moment().format("HH:mm:ss"),
            isFullscreen: false,
            websocket: null
        };
    },
    beforeCreate() {
        this.$store.registerModule("Admin.orderChart", adminOrderChartStore);
        if (!document.getElementById("orderChartJs")) {
            var scriptTag = document.createElement("script");
            scriptTag.src = "/js/order-chart.min.js";
            scriptTag.id = "orderChartJs";
            document.getElementsByTagName("head")[0].appendChild(scriptTag);
        }
    },
    created() {
        this.getConfig().then(this.connectSocket);
        this.getStatus();
        this.interval = setInterval(this.intervalHandler, 1000);
        this.interval60 = setInterval(this.getStatus, 60000);
        toolsStore.create();
    },
    mounted() {
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
                this.eventFullscreenChange
            );
            this.getChartData(this.chartDate).then(() => {
                this.loadToolsData();
                this.loadWhitespace = true;
            });
        }, 1000);
    },
    destroyed() {
        this.$store.unregisterModule("Admin.orderChart");
        clearInterval(this.interval);
        clearInterval(this.interval60);
        this.websocket.close();
        this.websocket = null;
    },
    computed: {
        ...mapGetters("Admin.orderChart", [
            "chartData",
            "status",
            "config",
            "isChartLoading"
        ]),
        chartContainer: function() {
            return this.$refs.chartContainer;
        },
        lastPrice: function() {
            return this.data.price.slice(-1)[0];
        }
    },
    watch: {
        chartData() {
            this.loadChartData();
        },
        isChartLoading(value) {
            this.$refs.spinner.style.display = value ? "block" : "none";
        }
    },
    methods: {
        ...mapActions("Admin.orderChart", [
            "getChartData",
            "getStatus",
            "getConfig",
            "executeOrder"
        ]),
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
                        if (lineOptions.kind == "entry") {
                            if (!this.order.position) {
                                isChanged = true;
                                this.order[lineOptions.kind].price = newPrice;
                                this.executeOrder({
                                    action: "entry",
                                    data: {
                                        cmd: "change",
                                        side: this.order.side,
                                        price: this.order.entry.price
                                    }
                                }).then(resp => {
                                    if (resp.isOk) {
                                        this.drawOrderLine(lineOptions.kind);
                                        this.$toasted.success(
                                            "Sửa lệnh Entry thành công"
                                        );
                                    } else {
                                        line.applyOptions({ price: oldPrice });
                                        this.toasteOrderError(resp.message);
                                    }
                                });
                            }
                        } else {
                            isChanged = true;
                            this.order[lineOptions.kind].price = newPrice;
                            if (lineOptions.kind == "tp")
                                this.executeOrder({
                                    action: "tp",
                                    data: {
                                        cmd: "change",
                                        side: -this.order.side,
                                        price: this.order.tp.price
                                    }
                                }).then(resp => {
                                    if (resp.isOk) {
                                        this.drawOrderLine(lineOptions.kind);
                                        this.$toasted.success(
                                            "Sửa lệnh TP thành công"
                                        );
                                    } else {
                                        line.applyOptions({ price: oldPrice });
                                        this.toasteOrderError(resp.message);
                                    }
                                });
                            else
                                this.executeOrder({
                                    action: "sl",
                                    data: {
                                        action: "change",
                                        side: -this.order.side,
                                        price: this.order.sl.price
                                    }
                                }).then(resp => {
                                    if (resp.isOk) {
                                        this.drawOrderLine(lineOptions.kind);
                                        this.$toasted.success(
                                            "Sửa lệnh SL thành công"
                                        );
                                    } else {
                                        line.applyOptions({ price: oldPrice });
                                        this.toasteOrderError(resp.message);
                                    }
                                });
                        }
                        //
                        if (!isChanged) {
                            line.applyOptions({ price: oldPrice });
                            this.$toasted.show("Không được thay đổi.");
                        }
                    }
                    break;
                case "line":
                    toolsStore.set("line", {
                        price: oldPrice,
                        removed: true
                    });
                    toolsStore.set("line", lineOptions);
                    this.$refs.lineTool.classList.remove("selected");
                    break;
                case "ruler":
                    if (lineOptions.point == 1) {
                        toolsStore.set("ruler", lineOptions);
                        if (this.ruler.point == 2) {
                            const distance = +this.ruler.end.options().title;
                            const endPrice = +(newPrice + distance).toFixed(1);
                            this.ruler.end.applyOptions({ price: endPrice });
                            toolsStore.set("ruler", this.ruler.end.options());
                        }
                    } else {
                        const startPrice = +this.ruler.start.options().price;
                        const distance = (newPrice - startPrice).toFixed(1);
                        line.applyOptions({ title: distance });
                        toolsStore.set("ruler", line.options());
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
                        this.$refs.rulerTool.click();
                        break;
                    case 97:
                        this.$refs.lineTool.click();
                        break;
                    case 98:
                        this.$refs.reloadTool.click();
                        break;
                    case 99:
                        this.$refs.fullscreenTool.click();
                        break;
                }
            }
        },
        eventFullscreenChange() {
            if (document.fullscreenElement) {
                this.isFullscreen = true;
                this.chartContainer.classList.add("fullscreen");
                document.querySelector(".dx-drawer-content").style.transform =
                    "unset";
            } else {
                this.isFullscreen = false;
                this.chartContainer.classList.remove("fullscreen");
                document.querySelector(".dx-drawer-content").style.transform =
                    "translate(0px, 0px)";
            }
        },
        toggleFullscreen() {
            if (document.fullscreenElement) document.exitFullscreen();
            else document.documentElement.requestFullscreen();
        },
        loadToolsData() {
            return new Promise(async resolve => {
                const order = await toolsStore.get("order");
                order.map(item => {
                    this.order.side = item.side;
                    this.order[item.kind].price = item.price;
                    this.drawOrderLine(item.kind);
                    this.toggleCancelOrderButton(true);
                    if (item.kind == "tp") this.order.position = item.side;
                });
                if (this.order.tp.hasOwnProperty("line"))
                    this.order.entry.line.applyOptions({
                        draggable: false
                    });
                //
                const lines = await toolsStore.get("line");
                lines.forEach(line => {
                    if (!line.removed)
                        this.lines.push(
                            this.series.price.createPriceLine(line)
                        );
                });
                //
                const rulerLines = await toolsStore.get("ruler");
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
        connectSocket() {
            let self = this;
            const endpoint =
                "wss://datafeed.vps.com.vn/socket.io/?EIO=3&transport=websocket";
            self.websocket = new WebSocket(endpoint);
            self.websocket.onopen = e => {
                console.log("onopen", e);
                var msg = { action: "join", list: self.config.symbol };
                self.websocket.send(
                    `42${JSON.stringify(["regs", JSON.stringify(msg)])}`
                );
            };
            self.websocket.onclose = e => {
                console.log("onclose", e);
                if (self._isDestroyed) return false;
                if (self.inSession()) {
                    self.connectSocket();
                    self.getChartData(self.chartDate);
                }
            };
            self.websocket.onmessage = e => {
                if (e.data.substr(0, 1) == 4) {
                    if (e.data.substr(1, 1) == 2) {
                        const event = JSON.parse(e.data.substr(2));
                        if (event[0] == "stockps") {
                            const data = event[1].data;
                            if (data.id == 3220) {
                                self.updateChartData({
                                    time:
                                        moment(
                                            `${CURRENT_DATE} ${data.time}`
                                        ).unix() +
                                        7 * 60 * 60,
                                    value: data.lastPrice
                                });
                                if (self.order.entry.hasOwnProperty("line")) {
                                    if (self.order.tp.hasOwnProperty("line")) {
                                        if (
                                            (self.order.side > 0 &&
                                                data.lastPrice >=
                                                    self.order.tp.price) ||
                                            (self.order.side < 0 &&
                                                data.lastPrice <=
                                                    self.order.tp.price)
                                        )
                                            self.executeOrder({
                                                action: "sl",
                                                data: { cmd: "delete" }
                                            }).then(resp => {
                                                if (resp.isOk) {
                                                    self.removeOrderLine(
                                                        "entry"
                                                    );
                                                    self.removeOrderLine("tp");
                                                    self.removeOrderLine("sl");
                                                    toolsStore.clear("order");
                                                    self.$toasted.success(
                                                        "Đã khớp lệnh TP và đóng vị thế"
                                                    );
                                                } else
                                                    self.toasteOrderError(
                                                        resp.message
                                                    );
                                            });
                                        if (
                                            (self.order.side > 0 &&
                                                data.lastPrice <=
                                                    self.order.sl.price) ||
                                            (self.order.side < 0 &&
                                                data.lastPrice >=
                                                    self.order.sl.price)
                                        )
                                            self.executeOrder({
                                                action: "tp",
                                                data: { cmd: "cancel" }
                                            }).then(resp => {
                                                if (resp.isOk) {
                                                    self.removeOrderLine(
                                                        "entry"
                                                    );
                                                    self.removeOrderLine("tp");
                                                    self.removeOrderLine("sl");
                                                    toolsStore.clear("order");
                                                    self.$toasted.success(
                                                        "Đã khớp lệnh SL và đóng vị thế"
                                                    );
                                                } else
                                                    self.toasteOrderError(
                                                        resp.message
                                                    );
                                            });
                                    } else {
                                        if (
                                            (self.order.side > 0 &&
                                                data.lastPrice >=
                                                    self.order.entry.price) ||
                                            (self.order.side < 0 &&
                                                data.lastPrice <=
                                                    self.order.entry.price)
                                        )
                                            self.executeOrder({
                                                action: "tpsl",
                                                tpData: {
                                                    cmd: "new",
                                                    side: -self.order.side,
                                                    price: self.order.tp.price
                                                },
                                                slData: {
                                                    cmd: "new",
                                                    side: -self.order.side,
                                                    price: self.order.sl.price
                                                }
                                            }).then(resp => {
                                                if (resp.isOk) {
                                                    self.drawOrderLine("tp");
                                                    self.drawOrderLine("sl");
                                                    self.order.entry.line.applyOptions(
                                                        { draggable: false }
                                                    );
                                                    self.$toasted.success(
                                                        "Tự động đặt lệnh TP/SL thành công"
                                                    );
                                                } else
                                                    self.toasteOrderError(
                                                        resp.message
                                                    );
                                            });
                                    }
                                }
                            }
                        }
                    }
                }
            };
            self.websocket.onerror = e => {
                console.log("onerror", e);
            };
        },
        intervalHandler() {
            const CURRENT_SEC = moment().unix();
            if (this.inSession(CURRENT_SEC)) {
                if (CURRENT_SEC > TIME.ATC - 5 * 60) {
                    this.blinkCancelOrderButton();
                    if (
                        CURRENT_SEC > TIME.ATC - 60 &&
                        this.order.tp.hasOwnProperty("line")
                    ) {
                        this.executeOrder({
                            action: "cancel",
                            tpData: { cmd: "cancel" },
                            slData: { cmd: "delete" }
                        }).then(resp => {
                            if (resp.isOk) {
                                this.removeOrderLine("entry");
                                this.removeOrderLine("tp");
                                this.removeOrderLine("sl");
                                toolsStore.clear("order");
                                this.$toasted.success(
                                    "Đã tự động huỷ lệnh do tới phiên ATC, nhưng vẫn giữ vị thế"
                                );
                            } else this.toasteOrderError(resp.message);
                        });
                    }
                }
                if (CURRENT_SEC == TIME.START) this.connectSocket();
            }
            this.clock = Intl.DateTimeFormat(navigator.language, {
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            }).format();
        },
        showOrderButton() {
            const CURRENT_SEC = moment().unix();
            if (this.inSession(CURRENT_SEC)) {
                if (this.order.position) {
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
                            this.order.tp.price = price + side * TP_DEFAULT;
                            this.order.sl.price = price - side * SL_DEFAULT;
                        } else price = "ATC";
                        this.order.entry.price = price;
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
        blinkCancelOrderButton() {
            if (this.$refs.cancelOrder.classList.contains("warning"))
                this.$refs.cancelOrder.classList.remove("warning");
            else this.$refs.cancelOrder.classList.add("warning");
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
            toolsStore.set("order", {
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
                toolsStore.set("line", { price: price, removed: true });
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
                toolsStore.set("line", options);
            }
            this.$refs.lineTool.classList.remove("selected");
        },
        removeLineTool() {
            this.lines.forEach(line => this.series.price.removePriceLine(line));
            this.lines = [];
            toolsStore.clear("line");
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
                toolsStore.set("ruler", options);
            } else if (this.ruler.point == 1) {
                const startPrice = +this.ruler.start.options().price;
                const point = 2;
                options.point = point;
                options.title = (price - startPrice).toFixed(1);
                this.ruler.end = this.series.price.createPriceLine(options);
                this.ruler.point = point;
                toolsStore.set("ruler", options);
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
                toolsStore.clear("ruler");
            }
        },
        cancelOrderClick() {
            let result = confirm("Huỷ lệnh?", "Xác nhận");
            result.then(dialogResult => {
                if (dialogResult) {
                    this.toggleCancelOrderButton(false);
                    if (this.order.entry.hasOwnProperty("line")) {
                        if (this.order.tp.hasOwnProperty("line")) {
                            this.executeOrder({
                                action: "exit",
                                tpData: { cmd: "cancel" },
                                slData: { cmd: "delete" },
                                exitData: {
                                    cmd: "new",
                                    side: -this.order.side,
                                    price: "MTL"
                                }
                            }).then(resp => {
                                if (resp.isOk) {
                                    this.removeOrderLine("entry");
                                    this.removeOrderLine("tp");
                                    this.removeOrderLine("sl");
                                    toolsStore.clear("order");
                                    this.$toasted.success(
                                        "Đóng vị thế thành công"
                                    );
                                } else {
                                    this.toggleCancelOrderButton(true);
                                    this.toasteOrderError(resp.message);
                                }
                            });
                        } else {
                            this.executeOrder({
                                action: "entry",
                                data: { cmd: "delete" }
                            }).then(resp => {
                                if (resp.isOk) {
                                    this.removeOrderLine("entry");
                                    toolsStore.clear("order");
                                    this.$toasted.success(
                                        "Huỷ lệnh Entry thành công"
                                    );
                                } else {
                                    this.toggleCancelOrderButton(true);
                                    this.toasteOrderError(resp.message);
                                }
                            });
                        }
                    }
                }
            });
        },
        entryOrderClick() {
            const CURRENT_SEC = moment().unix();
            if (this.inSession(CURRENT_SEC)) {
                if (CURRENT_SEC < TIME.ATO) {
                    let result = confirm("Đặt lệnh ATO?", "Xác nhận");
                    result.then(dialogResult => {
                        if (dialogResult) {
                            this.executeOrder({
                                action: "exit",
                                exitData: {
                                    cmd: "new",
                                    side: -this.order.side,
                                    price: "ATO"
                                }
                            }).then(resp => {
                                if (resp.isOk)
                                    this.$toasted.success(
                                        "Đặt lệnh ATO thành công"
                                    );
                                else this.toasteOrderError(resp.message);
                            });
                        }
                    });
                } else if (CURRENT_SEC < TIME.ATC) {
                    this.executeOrder({
                        action: "entry",
                        data: {
                            cmd: "new",
                            side: this.order.side,
                            price: this.order.entry.price
                        }
                    }).then(resp => {
                        if (resp.isOk) {
                            this.drawOrderLine("entry");
                            this.toggleCancelOrderButton(true);
                            this.$toasted.success("Đặt lệnh Entry thành công");
                        } else this.toasteOrderError(resp.message);
                    });
                } else {
                    let result = confirm("Đặt lệnh ATC?", "Xác nhận");
                    result.then(dialogResult => {
                        if (dialogResult) {
                            this.executeOrder({
                                action: "exit",
                                exitData: {
                                    cmd: "new",
                                    side: -this.order.side,
                                    price: "ATC"
                                }
                            }).then(resp => {
                                if (resp.isOk)
                                    this.$toasted.success(
                                        "Đặt lệnh ATC thành công"
                                    );
                                else this.toasteOrderError(resp.message);
                            });
                        }
                    });
                }
            }
        },
        tpslOrderClick() {
            this.executeOrder({
                action: "tpsl",
                tpData: {
                    cmd: "new",
                    side: -this.order.side,
                    price: this.order.tp.price
                },
                slData: {
                    cmd: "new",
                    side: -this.order.side,
                    price: this.order.sl.price
                }
            }).then(resp => {
                if (resp.isOk) {
                    this.drawOrderLine("tp");
                    this.drawOrderLine("sl");
                    this.order.entry.line.applyOptions({ draggable: false });
                    this.$toasted.success("Đặt lệnh TP/SL thành công");
                } else this.toasteOrderError(resp.message);
            });
        },
        chartTopClick() {
            this.chart.timeScale().scrollToRealTime();
        },
        inSession(currentSec = null) {
            if (!currentSec) currentSec = moment().unix();
            return currentSec >= TIME.START && currentSec <= TIME.END;
        },
        coordinateToPrice(y) {
            return this.formatPrice(this.series.price.coordinateToPrice(y));
        },
        formatPrice(price) {
            return +(+price.toFixed(1));
        },
        toasteOrderError(error) {
            if (error == "ordering") return false;
            let message = "";
            switch (error) {
                case "notConnect":
                    message = "Chưa kết nối tài khoản VPS";
                    break;
                case "invalidVolume":
                    message = "Số hợp đồng lớn hơn sức mua";
                    break;
                case "openedPosition":
                    message = "Đã có vị thế đang mở";
                    break;
                case "unopenedPosition":
                    message = "Chưa có vị thế được mở";
                    break;
                case "failOrder":
                    message = "Đặt lệnh thất bại";
                    break;
                case "failSave":
                    message = "Lưu lệnh thất bại";
                    break;
                default:
                    message = "Lỗi chưa xác định";
                    break;
            }
            this.$toasted.error(message);
        }
    }
};
</script>
<style lang="scss" scoped>
.order-chart-container {
    height: 300px;
    background: #131722;
    border: none;

    &.fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1501;
    }
    .chart-wrapper {
        position: relative;
        height: 100%;
    }
    .area {
        position: absolute;
        display: flex;
        justify-content: space-between;
        font-size: 17px;
        background: #131722;
        border: solid 2px #2a2e39;
        border-bottom-right-radius: 5px;
        z-index: 3;

        &.data-area {
            top: 0px;
            left: 0px;

            .command:not(:first-child) {
                border-left: solid 2px #2a2e39 !important;
            }

            .clock {
                width: 80px;
            }

            .chart-date {
                width: 125px;
            }

            .status {
                width: unset !important;
                padding: 0 10px !important;

                &.green {
                    color: lime !important;
                }
                &.red {
                    color: red !important;
                }
            }

            .spinner {
                width: 30px;
                height: 30px;
                display: none;
            }
        }

        &.tool-area {
            top: 32px;
            left: 0px;
            flex-direction: column;

            .command:not(:first-child) {
                border-top: solid 2px #2a2e39 !important;
            }

            .selected {
                color: #1f62ff !important;
            }

            .warning {
                color: yellow !important;
            }

            .cancel-order {
                display: none;
                color: red;
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

        &:not(.noaction):hover {
            background: #2a2e39 !important;
        }
        &.noaction {
            cursor: unset !important;
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
        z-index: 3;
        cursor: pointer;

        &.entry {
            width: 70px;
            height: 55px;
            color: white !important;
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
