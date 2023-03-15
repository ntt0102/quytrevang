class Lightweight {
    // Các thuộc tính
    chart = {};
    series = {};
    data = {};
    order = { entry: {}, tp: {}, sl: {} };
    lines = [];
    markers = [];
    ruler = { start: {}, end: {}, point: 0 };
    alerts = [];
    crosshair = {};
    hasCrosshair = false;
    hasNewData = false;

    // Hàm khởi tạo
    constructor(options) {
        this.dataEndpoint = options.dataEndpoint;
        this.localDB = options.localDB;
        this.audio = options.audio;
        this.notifier = options.notifier;
        this.isMobile = options.isMobile;
        this.timeFrame = options.timeFrame;
        this.sharkLimit = options.sharkLimit;
        this.getOrderPosition = options.getOrderPosition;
        this.closePosition = options.closePosition;
        this.orderEntryPrice = options.orderEntryPrice;
        this.orderTpPrice = options.orderTpPrice;
        this.orderSlPrice = options.orderSlPrice;
        this.cancelOrder = options.cancelOrder;
    }

    // Các phương thức
    init = () => {
        this.createLightWeightChart();
        this.createDataArea();
        this.createToolArea();
        this.createLegendArea();
        this.createFreeArea();
        setInterval(() => this.intervalHandler(this), 1000);
        window.addEventListener("resize", () => this.resize(this.chart));
        window.addEventListener("keydown", e => this.keyEvent(e, this));
    };
    createLightWeightChart = () => {
        const chartOptions = {
            localization: { dateFormat: "dd/MM/yyyy", locale: "vi-VN" },
            rightPriceScale: {
                visible: true,
                scaleMargins: { top: 0.1, bottom: 0.4 }
            },
            leftPriceScale: { visible: false },
            layout: {
                backgroundColor: "#181C27",
                textColor: "#A2A6AE"
            },
            grid: {
                vertLines: { color: "#30333F" },
                horzLines: { color: "#30333F" }
            },
            crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
            timeScale: {
                timeVisible: true,
                rightOffset: 20,
                minBarSpacing: 0.1
            }
        };
        var chartElement = document.createElement("div");
        document.body.append(chartElement);
        chartElement.id = "lightWeightChart";
        chartElement.style.width = "100vw";
        chartElement.style.height = "100vh";
        chartElement.addEventListener("contextmenu", e =>
            this.chartContextmenu(e, this)
        );
        chartElement.addEventListener("click", e => this.chartClick(e, this));
        this.chart = LightweightCharts.createChart(chartElement, chartOptions);
        this.chart.subscribeCrosshairMove(e => this.crosshairMove(e, this));
        this.chart.subscribeCustomPriceLineDragged(e =>
            this.priceLineDrag(e, this)
        );
        //
        this.series.shark = this.chart.addLineSeries({
            priceScaleId: "shark",
            color: "#FF00FF",
            priceFormat: { minMove: 1 },
            scaleMargins: { top: 0.6, bottom: 0 }
        });
        this.series.price = this.chart.addLineSeries({
            color: "white",
            priceFormat: { minMove: 0.1 }
        });
        this.chart.timeScale().fitContent();
        this.chartElement = chartElement;
    };
    createDataArea = () => {
        var div = document.createElement("div");
        div.id = "dataAreaDiv";
        div.className = "area";
        this.chartElement.append(div);
        //
        this.createSpinnerImg(div);
        this.createDateInput(div);
        this.createTimeFrameSelect(div);
        this.createRefreshButton(div);
        this.createClearButton(div);
    };
    createClearButton = container => {
        var button = document.createElement("div");
        button.id = "clearButton";
        button.className = "command fa fa-trash";
        button.title = "Delete local data";
        button.addEventListener("click", () => {
            this.localDB.clear("data");
            this.loadChartData();
        });
        container.append(button);
    };
    createRefreshButton = container => {
        var button = document.createElement("div");
        button.id = "refreshButton";
        button.className = "command fa fa-refresh";
        button.title = "Refresh chart";
        button.addEventListener("click", () => this.loadChartData());
        container.append(button);
    };
    createTimeFrameSelect = container => {
        var select = document.createElement("select");
        select.id = "timeFrameSelect";
        select.className = "command";
        [
            { text: "Tick", value: 0 },
            { text: "1 min", value: 1 },
            { text: "5 min", value: 5 },
            { text: "30 min", value: 30 },
            { text: "1 day", value: 1440 }
        ].forEach((item, index) => {
            var option = document.createElement("option");
            option.value = item.value;
            option.text = item.text;
            select.appendChild(option);
        });
        select.value = this.timeFrame;
        select.addEventListener("change", e => {
            this.timeFrame = e.target.value;
            this.loadChartData().then(() =>
                this.chart.timeScale().resetTimeScale()
            );
        });
        container.append(select);
    };
    createDateInput = container => {
        var input = document.createElement("input");
        input.id = "dateInput";
        input.type = "date";
        input.value = moment().format("YYYY-MM-DD");
        input.className = "command";
        input.addEventListener("change", e => {
            if (!!e.target.value) this.loadChartData();
        });
        container.append(input);
        this.dateInput = input;
    };
    createSpinnerImg = container => {
        var img = document.createElement("img");
        img.id = "spinnerImg";
        img.style.opacity = 0;
        img.src = chrome.runtime.getURL("spinner.gif");
        container.append(img);
        this.spinnerImg = img;
    };
    createToolArea = () => {
        var div = document.createElement("div");
        div.id = "toolAreaDiv";
        div.className = "area";
        this.chartElement.append(div);
        //
        this.createDrawLineButton(div);
        this.createDrawMarkerButton(div);
        this.createDrawRulerButton(div);
        this.createDrawAlertButton(div);
    };
    createDrawLineButton = container => {
        var button = document.createElement("div");
        button.id = "drawLineButton";
        button.className = "command fa fa-minus";
        button.addEventListener("click", e => {
            const selected = e.target.classList.contains("selected");
            document
                .querySelectorAll("#toolAreaDiv > .command")
                .forEach(el => el.classList.remove("selected"));
            if (!selected) e.target.classList.add("selected");
            e.stopPropagation();
        });
        button.addEventListener("contextmenu", e => {
            this.removeToolLines();
            e.target.classList.remove("selected");
            e.preventDefault();
            e.stopPropagation();
        });
        container.append(button);
        this.drawLineButton = button;
    };
    createDrawMarkerButton = container => {
        var button = document.createElement("div");
        button.id = "drawMarkerButton";
        button.className = "command fa fa-map-marker";
        button.addEventListener("click", e => {
            const selected = e.target.classList.contains("selected");
            document
                .querySelectorAll("#toolAreaDiv > .command")
                .forEach(el => el.classList.remove("selected"));
            if (!selected) e.target.classList.add("selected");
            e.stopPropagation();
        });
        button.addEventListener("contextmenu", e => {
            this.removeMarkers();
            e.target.classList.remove("selected");
            e.preventDefault();
            e.stopPropagation();
        });
        container.append(button);
        this.drawMarkerButton = button;
    };
    createDrawRulerButton = container => {
        var button = document.createElement("div");
        button.id = "drawRulerButton";
        button.className = "command fa fa-arrows-v";
        button.addEventListener("click", e => {
            const selected = e.target.classList.contains("selected");
            document
                .querySelectorAll("#toolAreaDiv > .command")
                .forEach(el => el.classList.remove("selected"));
            if (!selected) {
                e.target.classList.add("selected");
                this.removeRuler();
            }
            e.stopPropagation();
        });
        button.addEventListener("contextmenu", e => {
            this.removeRuler();
            e.target.classList.remove("selected");
            e.preventDefault();
            e.stopPropagation();
        });
        container.append(button);
        this.drawRulerButton = button;
    };
    createDrawAlertButton = container => {
        var button = document.createElement("div");
        button.id = "drawAlertButton";
        button.className = "command fa fa-bell-o";
        button.addEventListener("click", e => {
            const selected = e.target.classList.contains("selected");
            document
                .querySelectorAll("#toolAreaDiv > .command")
                .forEach(el => el.classList.remove("selected"));
            if (!selected) e.target.classList.add("selected");
            e.stopPropagation();
        });
        button.addEventListener("contextmenu", e => {
            this.removeAlerts();
            e.target.classList.remove("selected");
            e.preventDefault();
            e.stopPropagation();
        });
        container.append(button);
        this.drawAlertButton = button;
    };
    createLegendArea = () => {
        var div = document.createElement("div");
        div.id = "legendAreaDiv";
        this.chartElement.append(div);
        //
        this.createPriceLegendP(div);
        this.createSharkLegendP(div);
    };
    createPriceLegendP = container => {
        var p = document.createElement("p");
        p.id = "priceLegendP";
        container.append(p);
        this.priceLegendP = p;
    };
    createSharkLegendP = container => {
        //
        var p = document.createElement("p");
        p.id = "sharkLegendP";
        container.append(p);
        this.sharkLegendP = p;
    };
    createFreeArea = () => {
        var container = this.chartElement;
        this.createCancelOrderButton(container);
        this.createEntryOrderButton(container);
        this.createTpslOrderButton(container);
        this.createScrollButton(container);
    };
    createCancelOrderButton = container => {
        var button = document.createElement("button");
        button.id = "cancelOrderButton";
        button.innerText = "X";
        button.style.display = "none";
        button.addEventListener("click", () => {
            this.closePosition();
            this.cancelOrder();
            this.toggleCancelOrderButton(false);
            this.removeOrderLine("entry");
            this.removeOrderLine("tp");
            this.removeOrderLine("sl");
            this.localDB.clear("order");
        });
        container.append(button);
        this.cancelOrderButton = button;
    };
    createEntryOrderButton = container => {
        var button = document.createElement("button");
        button.id = "entryOrderButton";
        button.innerText = "Entry";
        button.style.display = "none";
        button.addEventListener("click", () => {
            this.orderEntryPrice(this.order);
            this.drawOrderLine("entry");
            this.toggleCancelOrderButton(true);
            this.hideOrderButton();
        });
        container.append(button);
        this.entryOrderButton = button;
    };
    createTpslOrderButton = container => {
        var button = document.createElement("button");
        button.id = "tpslOrderButton";
        button.innerText = "TP/SL";
        button.style.display = "none";
        button.addEventListener("click", () => {
            this.orderTpPrice(this.order, true);
            this.drawOrderLine("tp");
            this.orderSlPrice(this.order, true);
            this.drawOrderLine("sl");
            this.hideOrderButton();
        });
        container.append(button);
        this.tpslOrderButton = button;
    };
    createScrollButton = container => {
        var button = document.createElement("div");
        button.id = "scrollButton";
        button.className = "command fa fa-angle-double-right";
        button.addEventListener("click", () =>
            this.chart.timeScale().scrollToRealTime()
        );
        container.append(button);
    };
    chartContextmenu = (e, self) => {
        self.showOrderButton();
        e.preventDefault();
    };
    chartClick = (e, self) => {
        self.hideOrderButton();
        if (self.drawLineButton.classList.contains("selected"))
            self.drawToolLine();
        else if (self.drawMarkerButton.classList.contains("selected"))
            self.drawMarker();
        else if (self.drawRulerButton.classList.contains("selected"))
            self.drawRuler();
        else if (self.drawAlertButton.classList.contains("selected"))
            self.drawAlert();
    };
    crosshairMove = (e, self) => {
        if (e.time) {
            self.updateLegend(
                e.seriesPrices.get(self.series.price),
                e.seriesPrices.get(self.series.shark)
            );
            self.hasCrosshair = true;
            self.crosshair.time = e.time;
            self.crosshair.price = e.seriesPrices.get(self.series.price);
        } else {
            self.hasCrosshair = false;
            if (!self.isMobile) {
                self.crosshair.time = null;
                self.crosshair.price = null;
            }
        }
        if (e.point != undefined) {
            self.crosshair.x = e.point.x;
            self.crosshair.y = e.point.y;
        }
    };
    priceLineDrag = (e, self) => {
        var line = e.customPriceLine.options();
        line.price = self.formatPrice(line.price);
        const oldPrice = +e.fromPriceString;
        const newPrice = line.price;
        switch (line.lineType) {
            case "order":
                if (newPrice != oldPrice) {
                    var isChanged = false;
                    const position = self.getOrderPosition();
                    if (line.kind == "entry") {
                        if (!position) {
                            isChanged = true;
                            self.order[line.kind].price = newPrice;
                            self.orderEntryPrice(self.order);
                            self.drawOrderLine(line.kind);
                        }
                    } else {
                        if (self.order.side * position > 0) {
                            isChanged = true;
                            self.order[line.kind].price = newPrice;
                            if (line.kind == "tp")
                                self.orderTpPrice(self.order);
                            else self.orderSlPrice(self.order);
                            drawOrderLine(line.kind);
                        }
                    }
                    //
                    if (!isChanged) {
                        self.order[line.kind].line.applyOptions({
                            price: oldPrice
                        });
                        self.notifier.show("warning", "Không được thay đổi.");
                    }
                }
                break;
            case "line":
                self.localDB.set("line", { price: oldPrice, removed: true });
                self.localDB.set("line", line);
                self.drawLineButton.classList.remove("selected");
                break;
            case "ruler":
                if (line.point == 1) {
                    self.localDB.set("ruler", line);
                    if (self.ruler.point == 2) {
                        const distance = +self.ruler.end.options().title;
                        const endPrice = +(newPrice + distance).toFixed(1);
                        self.ruler.end.applyOptions({
                            price: endPrice
                        });
                        self.localDB.set("ruler", self.ruler.end.options());
                    }
                } else {
                    self.localDB.set("ruler", line);
                    const startPrice = +self.ruler.start.options().price;
                    self.ruler.end.applyOptions({
                        title: (newPrice - startPrice).toFixed(1)
                    });
                }
                break;
            case "alert":
                self.audio.pause();
                self.localDB.set("alert", { price: oldPrice, removed: true });
                self.localDB.set("alert", line);
                self.drawAlertButton.classList.remove("selected");
                break;
        }
    };
    //
    showOrderButton = () => {
        if (this.getOrderPosition()) {
            // if (this.order.entry.hasOwnProperty("line")) {
            if (!this.order.tp.hasOwnProperty("line")) {
                this.tpslOrderButton.style.left =
                    +(this.crosshair.x + 10) + "px";
                this.tpslOrderButton.style.top =
                    +(this.crosshair.y + 10) + "px";
                this.tpslOrderButton.style.display = "block";
            }
        } else {
            if (!this.order.entry.hasOwnProperty("line")) {
                const price = this.coordinateToPrice(this.crosshair.y);
                const side =
                    price >= this.data.price.slice(-1)[0].value ? 1 : -1;
                this.order.entry.price = price;
                this.order.side = side;
                this.entryOrderButton.style.left =
                    +(this.crosshair.x + 10) + "px";
                this.entryOrderButton.style.top =
                    +(this.crosshair.y + 10) + "px";
                this.entryOrderButton.style.background =
                    side > 0 ? "green" : "red";
                this.entryOrderButton.innerText = `${
                    side > 0 ? "Long" : "Short"
                } ${price}`;
                this.entryOrderButton.style.display = "block";
            }
        }
    };
    hideOrderButton = () => {
        this.entryOrderButton.style.display = "none";
        this.tpslOrderButton.style.display = "none";
    };
    //
    drawOrderLine = kind => {
        var color, title;
        switch (kind) {
            case "entry":
                color = "silver";
                title = this.order.side > 0 ? "Long" : "Short";
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
        this.localDB.set("order", {
            kind: kind,
            price: +this.order[kind].price,
            side: this.order.side
        });
    };
    removeOrderLine = kind => {
        if (this.order[kind].hasOwnProperty("line")) {
            this.series.price.removePriceLine(this.order[kind].line);
            delete this.order[kind].line;
        }
    };
    //
    drawToolLine = () => {
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
            this.localDB.set("line", { price: price, removed: true });
        } else {
            const options = {
                lineType: TYPE,
                price: price,
                color: "aqua",
                lineWidth: 1,
                lineStyle: LightweightCharts.LineStyle.Solid,
                draggable: true
            };
            this.lines.push(this.series.price.createPriceLine(options));
            this.localDB.set("line", options);
        }
        this.drawLineButton.classList.remove("selected");
    };
    removeToolLines = () => {
        this.lines.forEach(line => this.series.price.removePriceLine(line));
        this.lines = [];
        this.localDB.clear("line");
    };
    //
    drawMarker = () => {
        if (this.crosshair.time) {
            const markers = this.markers.filter(
                item => item.time != this.crosshair.time
            );
            if (markers.length == this.markers.length) {
                const dir =
                    this.crosshair.y >=
                    this.series.price.priceToCoordinate(this.crosshair.price);
                this.markers.push({
                    time: this.crosshair.time,
                    position: dir ? "belowBar" : "aboveBar",
                    color: dir ? "lime" : "red",
                    shape: dir ? "arrowUp" : "arrowDown"
                });
            } else this.markers = markers;
            this.series.price.setMarkers(this.markers);
            this.localDB
                .clear("marker")
                .then(() => this.localDB.set("marker", this.markers));
            //
            this.drawMarkerButton.classList.remove("selected");
        }
    };
    removeMarkers = () => {
        this.markers = [];
        this.series.price.setMarkers([]);
        this.localDB.clear("marker");
    };
    //
    drawRuler = () => {
        const price = this.coordinateToPrice(this.crosshair.y);
        var options = {
            lineType: "ruler",
            price: price,
            color: "yellow",
            lineWidth: 1,
            lineStyle: LightweightCharts.LineStyle.Solid,
            draggable: true
        };
        if (this.ruler.point == 0) {
            const point = 1;
            options.point = point;
            options.title = "0";
            this.ruler.start = this.series.price.createPriceLine(options);
            this.ruler.point = point;
            this.localDB.set("ruler", options);
        } else if (this.ruler.point == 1) {
            const startPrice = +this.ruler.start.options().price;
            const point = 2;
            options.point = point;
            options.title = (price - startPrice).toFixed(1);
            this.ruler.end = this.series.price.createPriceLine(options);
            this.ruler.point = point;
            this.localDB.set("ruler", options);
            this.drawRulerButton.classList.remove("selected");
        }
    };
    removeRuler = () => {
        if (this.ruler.point > 0) {
            this.series.price.removePriceLine(this.ruler.start);
            if (this.ruler.point > 1)
                this.series.price.removePriceLine(this.ruler.end);
            //
            this.ruler = { start: {}, end: {}, point: 0 };
            this.localDB.clear("ruler");
        }
    };
    //
    drawAlert = () => {
        const TYPE = "alert";
        const price = this.formatPrice(
            this.coordinateToPrice(this.crosshair.y)
        );
        const existIndex = this.alerts.findIndex(line => {
            const ops = line.options();
            return (ops.type = TYPE && +ops.price == price);
        });
        if (existIndex != -1) {
            const removeLine = this.alerts.splice(existIndex, 1);
            this.series.price.removePriceLine(removeLine[0]);
            this.localDB.set("alert", { price: price, removed: true });
        } else {
            const options = {
                lineType: TYPE,
                price: price,
                title:
                    price >= this.data.original.slice(-1)[0].price ? ">" : "<",
                color: "#FF00FF",
                lineWidth: 1,
                lineStyle: LightweightCharts.LineStyle.Solid,
                draggable: true
            };
            this.alerts.push(this.series.price.createPriceLine(options));
            this.localDB.set("alert", options);
        }
        this.drawAlertButton.classList.remove("selected");
        this.audio.pause();
    };
    removeAlerts = () => {
        this.alerts.forEach(line => this.series.price.removePriceLine(line));
        this.alerts = [];
        this.localDB.clear("alert");
        this.audio.pause();
    };
    //
    toggleCancelOrderButton = visible => {
        if (visible) {
            this.cancelOrderButton.style.display = "block";
            this.cancelOrderButton.style.background =
                this.order.side > 0 ? "green" : "red";
        } else this.cancelOrderButton.style.display = "none";
    };
    //
    updateLegend = (price, shark) => {
        if (!!price) this.priceLegendP.innerText = price;
        if (!!shark)
            this.sharkLegendP.innerText = shark.toLocaleString("en-US");
    };
    coordinateToPrice = y => {
        return this.formatPrice(this.series.price.coordinateToPrice(y));
    };
    formatPrice = price => {
        return +(+price.toFixed(1));
    };
    //
    loadChartData = () => {
        return new Promise(async (resolve, reject) => {
            this.toggleSpinner(true);
            const svData = await this.getServerData();
            start: while (true) {
                this.hasNewData = false;
                const lcData = await this.localDB.get("data");
                const ids = new Set(svData.map(d => d.time));
                const data = [
                    ...svData,
                    ...lcData.filter(d => !ids.has(d.time))
                ].sort((a, b) => a.time - b.time);
                // console.log("data", data);
                if (this.hasNewData) continue start;
                this.localDB
                    .clear("data")
                    .then(() => this.localDB.set("data", data));
                //
                this.data = data.reduce(
                    (r, item) => this.createChartData(r, item),
                    {
                        original: [],
                        price: [],
                        shark: []
                    }
                );
                //
                this.series.price.setData(this.data.price);
                this.series.shark.setData(this.data.shark);
                //
                if (!this.hasCrosshair && !!this.data.original.length) {
                    this.updateLegend(
                        this.data.price.slice(-1)[0].value,
                        this.data.shark.slice(-1)[0].value
                    );
                }
                //
                this.toggleSpinner(false);
                resolve();
                break;
            }
        });
    };
    updateChartData = data => {
        this.hasNewData = true;
        const param = {
            time: data.timesec,
            price: data.closeprice,
            volume: data.closevol,
            action: data.action
        };
        this.data = this.createChartData(this.data, param);
        const lastPrice = this.data.price.slice(-1)[0];
        const lastShark = this.data.shark.slice(-1)[0];
        //
        if (this.timeFrame > 0) {
            this.series.price.setData(this.data.price);
            this.series.shark.setData(this.data.shark);
        } else {
            this.series.price.update(lastPrice);
            this.series.shark.update(lastShark);
        }
        if (!this.hasCrosshair) {
            this.updateLegend(lastPrice.value, lastShark.value);
        }
        //
        this.localDB.set("data", param);
        this.data.original.push(param);
    };
    getServerData = () => {
        return new Promise(async (resolve, reject) => {
            const date = this.dateInput.value;
            const data = { action: "GET", date: date };
            const url = this.dataEndpoint;
            start: while (true) {
                try {
                    var response = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data)
                    });
                    var json = await response.json();
                    resolve(json);
                    break;
                } catch (e) {
                    continue start;
                }
            }
        });
    };
    createChartData = (r, item) => {
        var time = item.time + 7 * 60 * 60;
        const prevShark = !!r.shark.length ? r.shark.slice(-1)[0].value : 0;
        const volume = (item.action == "BU" ? 1 : -1) * item.volume;
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
                r.price.pop();
                r.shark.pop();
            }
            time = timeIndex * period;
        }
        r.original.push(item);
        r.price.push({ time: time, value: item.price });
        r.shark.push({
            time: time,
            value: prevShark + (item.volume > this.sharkLimit ? volume : 0)
        });
        //
        return r;
    };
    getHelperData = () => {
        return new Promise(async (resolve, reject) => {
            const order = await this.localDB.get("order");
            order.map(item => {
                this.order.side = item.side;
                this.order[item.kind].price = item.price;
                this.drawOrderLine(item.kind);
                if (item.kind == "entry") {
                    if (this.getOrderPosition()) {
                        this.order.entry.line.applyOptions({
                            draggable: false
                        });
                    }
                    this.toggleCancelOrderButton(true);
                }
            });
            //
            const lines = await this.localDB.get("line");
            lines.forEach(line => {
                if (!line.removed)
                    this.lines.push(this.series.price.createPriceLine(line));
            });
            //
            this.markers = await this.localDB.get("marker");
            this.series.price.setMarkers(this.markers);
            //
            const rulerLines = await this.localDB.get("ruler");
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
            const alertLines = await this.localDB.get("alert");
            alertLines.forEach(line => {
                if (!line.removed)
                    this.alerts.push(this.series.price.createPriceLine(line));
            });
            //
            resolve();
        });
    };
    //
    intervalHandler = self => {
        if (self.getOrderPosition()) {
            if (
                self.order.entry.hasOwnProperty("line") &&
                !self.order.tp.hasOwnProperty("line")
            ) {
                self.orderTpPrice(self.order, true);
                self.drawOrderLine("tp");
                self.orderSlPrice(self.order, true);
                self.drawOrderLine("sl");
                self.order.entry.line.applyOptions({
                    draggable: false
                });
                self.notifier.show("success", "Đã mở vị thế.");
            }
        } else {
            if (self.order.tp.hasOwnProperty("line")) {
                self.cancelOrder();
                self.toggleCancelOrderButton(false);
                self.removeOrderLine("entry");
                self.removeOrderLine("tp");
                self.removeOrderLine("sl");
                self.localDB.clear("order");
                self.notifier.show("success", "Đã đóng vị thế.");
            }
        }
        //
        if (self.audio.paused) {
            self.alerts.forEach(alert => {
                const ops = alert.options();
                if (!ops.removed && !!self.data.original.length) {
                    const currentPrice = self.data.original.slice(-1)[0].price;
                    if (
                        (ops.title == ">" && currentPrice >= ops.price) ||
                        (ops.title == "<" && currentPrice <= ops.price)
                    )
                        self.audio.play();
                }
            });
        }
    };
    //
    toggleSpinner = visible => {
        this.spinnerImg.style.opacity = visible ? 1 : 0;
    };
    resize = chart => {
        chart.resize(window.innerWidth, window.innerHeight);
    };
    keyEvent = (e, self) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.shiftKey) {
                if (e.keyCode == 39) self.chart.timeScale().scrollToRealTime();
            } else {
                if (e.keyCode == 38) {
                    const options = self.chart.options();
                    self.chart.timeScale().applyOptions({
                        barSpacing: options.timeScale.barSpacing + 0.1
                    });
                } else if (e.keyCode == 40) {
                    const options = self.chart.options();
                    if (
                        options.timeScale.barSpacing >
                        options.timeScale.minBarSpacing
                    )
                        self.chart.timeScale().applyOptions({
                            barSpacing: options.timeScale.barSpacing - 0.1
                        });
                } else if (e.keyCode == 37) {
                    const position = self.chart.timeScale().scrollPosition();
                    self.chart.timeScale().scrollToPosition(position - 10);
                } else if (e.keyCode == 39) {
                    const position = self.chart.timeScale().scrollPosition();
                    self.chart.timeScale().scrollToPosition(position + 10);
                } else if (e.keyCode == 97) self.drawLineButton.click();
                else if (e.keyCode == 98) self.drawMarkerButton.click();
                else if (e.keyCode == 99) self.drawRulerButton.click();
                else if (e.keyCode == 100) self.drawAlertButton.click();
            }
        } else if (e.which === 27) self.removeOrderButton();
    };
}
