class Lightweight {
    // Các thuộc tính
    self = {};
    series = {};
    data = {};
    order = { entry: {}, tp: {}, sl: {} };
    lines = [];
    markers = [];
    ruler = { start: {}, end: {}, point: 0 };
    alerts = [];
    crosshair = {};
    // Hàm khởi tạo
    constructor(options) {
        this.localDB = options.localDB;
        this.getOrderPosition = options.getOrderPosition;
        this.closePosition = options.closePosition;
        this.orderEntryPrice = options.orderEntryPrice;
        this.orderTpPrice = options.orderTpPrice;
        this.orderSlPrice = options.orderSlPrice;
        this.cancelOrder = options.cancelOrder;
        this.alertAudio = options.alertAudio;
        this.notification = options.notification;
    }
    // Các phương thức
    init() {
        this.createLightWeightChart();
        this.createDataArea();
        this.createToolArea();
        this.createLegendArea();
        this.createFreeArea();
    }
    createLightWeightChart() {
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
        chartElement.id = "lightWeightChart";
        chartElement.style.width = "100vw";
        chartElement.style.height = "100vh";
        chartElement.addEventListener("contextmenu", this.chartContextmenu);
        chartElement.addEventListener("click", this.chartClick);
        this.self = LightweightCharts.createChart(chartElement, chartOptions);
        this.self.subscribeCrosshairMove(this.crosshairMove);
        this.self.subscribeCustomPriceLineDragged(this.priceLineDrag);
        //
        this.series.shark = this.self.addLineSeries({
            priceScaleId: "shark",
            color: "#FF00FF",
            priceFormat: { minMove: 1 },
            scaleMargins: { top: 0.6, bottom: 0 }
        });
        this.series.price = this.self.addLineSeries({
            color: "white",
            priceFormat: { minMove: 0.1 }
        });

        this.self.timeScale().fitContent();
        document.body.append(chartElement);
        this.chartElement = chartElement;
    }
    createDataArea() {
        var div = document.createElement("div");
        div.id = "dataAreaDiv";
        div.className = "area";
        this.chartElement.append(div);
        //
        createSpinnerImg(div);
        createDateInput(div);
        createTimeFrameSelect(div);
        createRefreshButton(div);
        createClearButton(div);

        function createTimeFrameSelect(container) {
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
            select.value = mConfig.timeFrame;
            select.addEventListener("change", e => {
                mConfig.timeFrame = e.target.value;
                getData().then(() => this.self.timeScale().resetTimeScale());
            });
            container.append(select);
        }

        function createDateInput(container) {
            var input = document.createElement("input");
            input.id = "dateInput";
            input.type = "date";
            input.value = moment().format("YYYY-MM-DD");
            input.className = "command";
            input.addEventListener("change", e => {
                if (!!e.target.value) getData();
            });
            container.append(input);
        }

        function createRefreshButton(container) {
            var button = document.createElement("div");
            button.id = "refreshButton";
            button.className = "command fa fa-refresh";
            button.title = "Refresh chart";
            button.addEventListener("click", () => getData());
            container.append(button);
        }

        function createClearButton(container) {
            var button = document.createElement("div");
            button.id = "clearButton";
            button.className = "command fa fa-trash";
            button.title = "Delete local data";
            button.addEventListener("click", () => {
                this.localDB.clear("data");
                getData();
            });
            container.append(button);
        }

        function createSpinnerImg(container) {
            var img = document.createElement("img");
            img.id = "spinnerImg";
            img.style.opacity = 0;
            img.src = chrome.runtime.getURL("spinner.gif");
            container.append(img);
        }
    }
    createToolArea() {
        var div = document.createElement("div");
        div.id = "toolAreaDiv";
        div.className = "area";
        this.chartElement.append(div);
        //
        createDrawLineButton(div);
        createDrawMarkerButton(div);
        createDrawRulerButton(div);
        createDrawAlertButton(div);

        function createDrawLineButton(container) {
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
                removeToolLines();
                e.target.classList.remove("selected");
                e.preventDefault();
                e.stopPropagation();
            });
            container.append(button);
            this.drawLineButton = button;
        }

        function createDrawMarkerButton(container) {
            button = document.createElement("div");
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
                removeMarkers();
                e.target.classList.remove("selected");
                e.preventDefault();
                e.stopPropagation();
            });
            container.append(button);
            this.drawMarkerButton = button;
        }

        function createDrawRulerButton(container) {
            button = document.createElement("div");
            button.id = "drawRulerButton";
            button.className = "command fa fa-arrows-v";
            button.addEventListener("click", e => {
                const selected = e.target.classList.contains("selected");
                document
                    .querySelectorAll("#toolAreaDiv > .command")
                    .forEach(el => el.classList.remove("selected"));
                if (!selected) {
                    e.target.classList.add("selected");
                    removeRuler();
                }
                e.stopPropagation();
            });
            button.addEventListener("contextmenu", e => {
                removeRuler();
                e.target.classList.remove("selected");
                e.preventDefault();
                e.stopPropagation();
            });
            container.append(button);
            this.drawRulerButton = button;
        }

        function createDrawAlertButton(container) {
            button = document.createElement("div");
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
                removeAlerts();
                e.target.classList.remove("selected");
                e.preventDefault();
                e.stopPropagation();
            });
            container.append(button);
            this.drawAlertButton = button;
        }
    }
    createLegendArea() {
        var div = document.createElement("div");
        div.id = "legendAreaDiv";
        this.chartElement.append(div);
        //
        createPriceLegendP(div);
        createSharkLegendP(div);

        function createPriceLegendP(container) {
            var p = document.createElement("p");
            p.id = "priceLegendP";
            container.append(p);
            this.priceLegendP = p;
        }

        function createSharkLegendP(container) {
            //
            var p = document.createElement("p");
            p.id = "sharkLegendP";
            container.append(p);
            this.sharkLegendP = p;
        }
    }
    createFreeArea() {
        var container = this.chartElement;
        createCancelOrderButton(container);
        createEntryOrderButton(container);
        createTpslOrderButton(container);
        createScrollButton(container);

        function createCancelOrderButton(container) {
            var button = document.createElement("button");
            button.id = "cancelOrderButton";
            button.innerText = "X";
            button.style.display = "none";
            button.addEventListener("click", () => {
                this.closePosition();
                this.cancelOrder();
                this.cancelOrderButton.style.display = "none";
                this.removeOrderLine("entry");
                this.removeOrderLine("tp");
                this.removeOrderLine("sl");
                this.localDB.clear("order");
            });
            container.append(button);
            this.cancelOrderButton = button;
        }
        function createEntryOrderButton(container) {
            button = document.createElement("button");
            button.id = "entryOrderButton";
            button.innerText = "Entry";
            button.style.display = "none";
            button.addEventListener("click", () => {
                this.orderEntryPrice(this.order);
                this.hideOrderButton();
            });
            container.append(button);
            this.entryOrderButton = button;
        }
        function createTpslOrderButton(container) {
            //
            button = document.createElement("button");
            button.id = "tpslOrderButton";
            button.innerText = "TP/SL";
            button.style.display = "none";
            button.addEventListener("click", () => {
                this.orderTpPrice(this.order, true);
                this.orderSlPrice(this.order, true);
                this.hideOrderButton();
            });
            container.append(button);
            this.tpslOrderButton = button;
        }
        function createScrollButton(container) {
            //
            button = document.createElement("div");
            button.id = "scrollButton";
            button.className = "command fa fa-angle-double-right";
            button.addEventListener("click", () =>
                this.self.timeScale().scrollToRealTime()
            );
            container.append(button);
        }
    }
    chartContextmenu(e) {
        this.showOrderButton();
        e.preventDefault();
    }
    chartClick() {
        this.hideOrderButton();
        if (this.drawLineButton.classList.contains("selected"))
            this.drawToolLine();
        else if (this.drawMarkerButton.classList.contains("selected"))
            this.drawMarker();
        else if (this.drawRulerButton.classList.contains("selected"))
            this.drawRuler();
        else if (this.drawAlertButton.classList.contains("selected"))
            this.drawAlert();
    }
    crosshairMove(e) {
        if (e.time) {
            this.updateLegend(
                e.seriesPrices.get(this.series.price),
                e.seriesPrices.get(this.series.shark)
            );
            mConfig.hasCrosshair = true;
            this.crosshair.time = e.time;
            this.crosshair.price = e.seriesPrices.get(this.series.price);
        } else {
            mConfig.hasCrosshair = false;
            if (!mConfig.isMobile) {
                this.crosshair.time = null;
                this.crosshair.price = null;
            }
        }
        if (e.point != undefined) {
            this.crosshair.x = e.point.x;
            this.crosshair.y = e.point.y;
        }
    }
    priceLineDrag(e) {
        var line = e.customPriceLine.options();
        line.price = this.formatPrice(line.price);
        const oldPrice = +e.fromPriceString;
        const newPrice = line.price;
        switch (line.lineType) {
            case "order":
                if (newPrice != oldPrice) {
                    var isChanged = false;
                    const position = this.getOrderPosition();
                    if (line.kind == "entry") {
                        if (!position) {
                            isChanged = true;
                            this.order[line.kind].price = newPrice;
                            this.drawOrderLine(line.kind);
                            this.orderEntryPrice(this.order);
                        }
                    } else {
                        if (this.order.side * position > 0) {
                            isChanged = true;
                            this.order[line.kind].price = newPrice;
                            drawOrderLine(line.kind);
                            if (line.kind == "tp")
                                this.orderTpPrice(this.order);
                            else this.orderSlPrice(this.order);
                        }
                    }
                    //
                    if (!isChanged) {
                        this.order[line.kind].line.applyOptions({
                            price: oldPrice
                        });
                        this.notification.show(
                            "warning",
                            "Không được thay đổi."
                        );
                    }
                }
                break;
            case "line":
                this.localDB.set("line", { price: oldPrice, removed: true });
                this.localDB.set("line", line);
                this.drawLineButton.classList.remove("selected");
                break;
            case "ruler":
                if (line.point == 1) {
                    this.localDB.set("ruler", line);
                    if (this.ruler.point == 2) {
                        const distance = +this.ruler.end.options().title;
                        const endPrice = +(newPrice + distance).toFixed(1);
                        this.ruler.end.applyOptions({
                            price: endPrice
                        });
                        this.localDB.set("ruler", this.ruler.end.options());
                    }
                } else {
                    this.localDB.set("ruler", line);
                    const startPrice = +this.ruler.start.options().price;
                    this.ruler.end.applyOptions({
                        title: (newPrice - startPrice).toFixed(1)
                    });
                }
                break;
            case "alert":
                this.alertAudio.pause();
                this.localDB.set("alert", { price: oldPrice, removed: true });
                this.localDB.set("alert", line);
                this.drawAlertButton.classList.remove("selected");
                break;
        }
    }
    //
    showOrderButton() {
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
    }
    hideOrderButton() {
        this.entryOrderButton.style.display = "none";
        this.tpslOrderButton.style.display = "none";
    }
    //
    drawOrderLine(kind) {
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
    }
    removeOrderLine(kind) {
        if (this.order[kind].hasOwnProperty("line")) {
            this.series.price.removePriceLine(this.order[kind].line);
            delete this.order[kind].line;
        }
    }
    //
    drawToolLine() {
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
    }
    removeToolLines() {
        this.lines.forEach(line => this.series.price.removePriceLine(line));
        this.lines = [];
        this.localDB.clear("line");
    }
    //
    drawMarker() {
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
    }
    removeMarkers() {
        this.markers = [];
        this.series.price.setMarkers([]);
        this.localDB.clear("marker");
    }
    //
    drawRuler() {
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
    }
    removeRuler() {
        if (this.ruler.point > 0) {
            this.series.price.removePriceLine(this.ruler.start);
            if (this.ruler.point > 1)
                this.series.price.removePriceLine(this.ruler.end);
            //
            this.ruler = { start: {}, end: {}, point: 0 };
            this.localDB.clear("ruler");
        }
    }
    //
    drawAlert() {
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
        this.alertAudio.pause();
    }
    removeAlerts() {
        this.alerts.forEach(line => this.series.price.removePriceLine(line));
        this.alerts = [];
        this.localDB.clear("alert");
        this.alertAudio.pause();
    }
    //
    updateLegend(price, shark) {
        if (!!price) this.priceLegendP.innerText = price;
        if (!!shark)
            this.sharkLegendP.innerText = shark.toLocaleString("en-US");
    }
    //
    coordinateToPrice(y) {
        return this.formatPrice(this.series.price.coordinateToPrice(y));
    }
    formatPrice(price) {
        // return this.self.priceScale("right").formatPrice(+price);
        return +(+price.toFixed(1));
    }
}
