class Chart {
    // Các thuộc tính
    ch = {};
    se = {};
    da = { original: [], price: [], volume: [] };
    or = { entry: {}, tp: {}, sl: {} };
    li = [];
    ma = [];
    ru = { start: {}, end: {}, point: 0 };
    al = [];
    cr = {};
    hsCr = false;
    hsNeDa = false;
    auAl = new Audio(chrome.runtime.getURL("alert.wav"));
    U_C = "rgb(38,166,154)";
    D_C = "rgb(239,83,80)";

    // Hàm khởi tạo
    constructor(global, callback) {
        this.global = global;
        this.callback = callback;
        this.global.toggleSpinner = this.toggleSpinner;
        this.global.isInSession = this.isInSession;
        this.auAl.loop = true;
    }

    // Các phương thức
    create = () => {
        this.timFr = this.global.timeFrame;
        this.chaTy = this.global.chartType;
        this.createContainerElement();
        this.createChart();
        this.createDataArea();
        this.createToolArea();
        this.createLegendArea();
        this.createFreeArea();
        if (this.global.isOpeningMarket) {
            this.secIn = setInterval(() => this.secIntervalHandler(this), 1000);
            this.minIn = setInterval(
                () => this.minIntervalHandler(this),
                60000
            );
        }
        window.addEventListener("resize", () => this.eventChartResize(this));
        window.addEventListener("keydown", e => this.eventKeyPress(e, this));
    };
    remove = () => {
        window.removeEventListener("resize", () => this.eventChartResize(this));
        window.removeEventListener("keydown", e => this.eventKeyPress(e, this));
        clearInterval(this.secIn);
        clearInterval(this.minIn);
        //
        this.conEl.remove();
    };
    createContainerElement = () => {
        var container = document.createElement("div");
        document.body.append(container);
        container.id = "lightWeightChartContainer";
        container.style.width = "100vw";
        container.style.height = "100vh";
        //
        var chartContainer = document.createElement("div");
        container.prepend(chartContainer);
        chartContainer.style.width = "100%";
        chartContainer.style.height = "100%";
        chartContainer.addEventListener("contextmenu", e =>
            this.eventChartContextmenu(e, this)
        );
        chartContainer.addEventListener("click", e =>
            this.eventChartClick(e, this)
        );
        this.conEl = container;
        this.chaCoEl = chartContainer;
    };
    createChart = () => {
        const chartOptions = {
            localization: { dateFormat: "dd/MM/yyyy", locale: "vi-VN" },
            rightPriceScale: {
                visible: true,
                scaleMargins: this.global.isVolume
                    ? { top: 0.1, bottom: 0.21 }
                    : { top: 0.2, bottom: 0.1 }
            },
            leftPriceScale: { visible: false },
            layout: {
                backgroundColor: "#000000",
                textColor: "#CCCCCC"
            },
            grid: {
                vertLines: {
                    color: "#1B1E27",
                    style: LightweightCharts.LineStyle.Dashed
                },
                horzLines: {
                    color: "#1B1E27",
                    style: LightweightCharts.LineStyle.Dashed
                }
            },
            crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
            timeScale: {
                timeVisible: true,
                rightOffset: 20,
                minBarSpacing: 0.1
            }
        };
        this.ch = LightweightCharts.createChart(this.chaCoEl, chartOptions);
        this.ch.subscribeCrosshairMove(e =>
            this.eventChartCrosshairMove(e, this)
        );
        this.ch.subscribeCustomPriceLineDragged(e =>
            this.eventPriceLineDrag(e, this)
        );
        //
        this.se.volume = this.ch.addHistogramSeries({
            priceScaleId: "volume",
            priceFormat: { type: "volume" },
            scaleMargins: { top: 0.8, bottom: 0 },
            visible: this.global.isVolume
        });
        //
        this.createPriceSeries();
        this.ch.timeScale().fitContent();
    };
    createPriceSeries = () => {
        switch (this.chaTy) {
            case "candlestick":
                this.se.price = this.ch.addCandlestickSeries({
                    priceFormat: { minMove: 0.1 }
                });
                break;
            case "line":
                this.se.price = this.ch.addLineSeries({
                    color: "#CCCCCC",
                    priceFormat: { minMove: 0.1 }
                });
                break;
            case "bar":
                this.se.price = this.ch.addBarSeries({
                    thinBars: false,
                    priceFormat: { minMove: 0.1 }
                });
                break;
        }
    };
    createDataArea = () => {
        var container = document.createElement("div");
        container.id = "dataAreaDiv";
        container.className = "area";
        this.conEl.append(container);
        //
        var img = document.createElement("img");
        img.id = "spinnerImg";
        img.style.opacity = 0;
        img.src = chrome.runtime.getURL("spinner.gif");
        container.append(img);
        this.spiIm = img;
        //
        var input = document.createElement("input");
        input.id = "dateInput";
        input.type = "date";
        input.value = moment().format("YYYY-MM-DD");
        input.className = "command";
        input.title = "Dữ liệu của ngày";
        input.addEventListener("change", e => {
            if (!!e.target.value) this.loadChartData();
        });
        container.append(input);
        this.datIn = input;
        //
        var select = document.createElement("select");
        select.id = "chartTypeSelect";
        select.className = "command";
        select.title = "Loại biểu đồ giá";
        this.global.chaTys.forEach((item, index) => {
            var option = document.createElement("option");
            option.value = item.value;
            option.text = item.text;
            select.appendChild(option);
        });
        select.value = this.chaTy;
        select.addEventListener("change", e => {
            if (this.timFr == 0 && e.target.value != "line") {
                this.chaTySe.value = "line";
                this.global.alert.s(
                    "warning",
                    "Chỉ có thể mở biểu đồ Đường trong khung thời gian Tick."
                );
                return false;
            }
            this.chaTy = e.target.value;
            this.ch.remove();
            this.createChart();
            this.se.price.setData(this.da.price);
            this.se.volume.setData(this.da.volume);
            this.getToolsData();
        });
        container.append(select);
        this.chaTySe = select;
        //
        var select = document.createElement("select");
        select.id = "timeFrameSelect";
        select.className = "command";
        select.title = "Khung thời gian [Ctrl+0]";
        this.global.timFrs.forEach((item, index) => {
            var option = document.createElement("option");
            option.value = item.value;
            option.text = item.text;
            select.appendChild(option);
        });
        select.value = this.timFr;
        select.addEventListener("change", e => {
            this.timFr = e.target.value;
            this.loadChartData().then(() =>
                this.ch.timeScale().resetTimeScale()
            );
            if (this.timFr == 0 && this.chaTy != "line") {
                this.chaTySe.value = "line";
                this.chaTySe.dispatchEvent(new Event("change"));
            }
        });
        container.append(select);
        this.timFrSe = select;
        //
        var button = document.createElement("div");
        button.className = "command fa fa-refresh";
        button.title = "Làm mới [Ctrl+M]";
        button.addEventListener("click", () => this.loadChartData());
        container.append(button);
        this.refBu = button;
        //
        var button = document.createElement("div");
        button.className = "command fa fa-trash";
        button.title = "Xoá ngày khác [Ctrl+,]";
        button.addEventListener("click", () => {
            this.global.store.c("data");
            this.loadChartData();
        });
        container.append(button);
        this.cleBu = button;
    };
    createToolArea = () => {
        var container = document.createElement("div");
        container.id = "toolAreaDiv";
        container.className = "area";
        this.conEl.append(container);
        //
        var button = document.createElement("div");
        button.className = "command fa fa-minus";
        button.title = "Vẽ đường ngang [Ctrl+K][Ctrl+Shift+K]";
        button.addEventListener("click", e => {
            const selected = e.target.classList.contains("selected");
            document
                .querySelectorAll("#toolAreaDiv > .command")
                .forEach(el => el.classList.remove("selected"));
            if (!selected) e.target.classList.add("selected");
            e.stopPropagation();
        });
        button.addEventListener("contextmenu", e => {
            this.removeHorizontalLine();
            e.target.classList.remove("selected");
            e.preventDefault();
            e.stopPropagation();
        });
        container.append(button);
        this.draLiBu = button;
        //
        var button = document.createElement("div");
        button.className = "command fa fa-map-marker";
        button.title = "Vẽ đánh dấu [Ctrl+L][Ctrl+Shift+L]";
        button.addEventListener("click", e => {
            const selected = e.target.classList.contains("selected");
            document
                .querySelectorAll("#toolAreaDiv > .command")
                .forEach(el => el.classList.remove("selected"));
            if (!selected) e.target.classList.add("selected");
            e.stopPropagation();
        });
        button.addEventListener("contextmenu", e => {
            this.removeMaker();
            e.target.classList.remove("selected");
            e.preventDefault();
            e.stopPropagation();
        });
        container.append(button);
        this.draMaBu = button;
        //
        var button = document.createElement("div");
        button.className = "command fa fa-arrows-v";
        button.title = "Thước đo giá [Ctrl+;][Ctrl+Shift+;]";
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
        this.draRuBu = button;
        //
        var button = document.createElement("div");
        button.className = "command fa fa-bell-o";
        button.title = "Đặt cảnh báo [Ctrl+'][Ctrl+Shift+']";
        button.addEventListener("click", e => {
            const selected = e.target.classList.contains("selected");
            document
                .querySelectorAll("#toolAreaDiv > .command")
                .forEach(el => el.classList.remove("selected"));
            if (!selected) e.target.classList.add("selected");
            e.stopPropagation();
        });
        button.addEventListener("contextmenu", e => {
            this.removeAlert();
            e.target.classList.remove("selected");
            e.preventDefault();
            e.stopPropagation();
        });
        container.append(button);
        this.draAlBu = button;
    };
    createLegendArea = () => {
        var container = document.createElement("div");
        container.id = "legendAreaDiv";
        this.conEl.append(container);
        //
        var p = document.createElement("p");
        container.append(p);
        this.priLeP = p;
        //
        var p = document.createElement("p");
        p.style.display = this.global.isVolume ? "block" : "none";
        container.append(p);
        this.volLeP = p;
    };
    createFreeArea = () => {
        var container = this.conEl;
        //
        var button = document.createElement("button");
        button.id = "cancelOrderButton";
        button.innerText = "X";
        button.style.display = "none";
        button.addEventListener("click", () => {
            this.callback.closeOrderPositionCallback();
            this.callback.cancelOrderCallback();
            this.toggleCancelOrderButton(false);
            this.removeOrderLine("entry");
            this.removeOrderLine("tp");
            this.removeOrderLine("sl");
            this.global.store.c("order");
        });
        container.append(button);
        this.canOrBu = button;
        //
        var button = document.createElement("button");
        button.id = "entryOrderButton";
        button.innerText = "Entry";
        button.style.display = "none";
        button.addEventListener("click", () => {
            this.callback.orderEntryPriceCallback(this.or);
            this.drawOrderLine("entry");
            this.toggleCancelOrderButton(true);
            this.hideOrderButton();
        });
        container.append(button);
        this.entOrBu = button;
        //
        var button = document.createElement("button");
        button.id = "tpslOrderButton";
        button.innerText = "TP/SL";
        button.style.display = "none";
        button.addEventListener("click", () => {
            this.callback.orderTpPriceCallback(this.or, true);
            this.drawOrderLine("tp");
            this.callback.orderSlPriceCallback(this.or, true);
            this.drawOrderLine("sl");
            this.hideOrderButton();
        });
        container.append(button);
        this.tpsOrBu = button;
        //
        var button = document.createElement("div");
        button.id = "scrollButton";
        button.className = "command fa fa-angle-double-right";
        button.addEventListener("click", () =>
            this.ch.timeScale().scrollToRealTime()
        );
        container.append(button);
    };
    eventChartContextmenu = (e, self) => {
        self.showOrderButton();
        e.preventDefault();
    };
    eventChartClick = (e, self) => {
        self.hideOrderButton();
        if (self.draLiBu.classList.contains("selected"))
            self.drawHorizontalLine();
        else if (self.draMaBu.classList.contains("selected")) self.drawMaker();
        else if (self.draRuBu.classList.contains("selected")) self.drawRuler();
        else if (self.draAlBu.classList.contains("selected")) self.drawAlert();
    };
    eventChartCrosshairMove = (e, self) => {
        if (e.time) {
            var price = e.seriesPrices.get(self.se.price);
            var volume = e.seriesPrices.get(self.se.volume);
            if (!!price && self.chaTy != "line") price = price.close;
            self.updateLegend(price, volume);
            self.hsCr = true;
            self.cr.time = e.time;
            self.cr.price = price;
        } else {
            self.hsCr = false;
            if (!self.global.isMobile) {
                self.cr.time = null;
                self.cr.price = null;
            }
        }
        if (e.point != undefined) {
            self.cr.x = e.point.x;
            self.cr.y = e.point.y;
        }
    };
    eventPriceLineDrag = (e, self) => {
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
                            self.or[lineOptions.kind].price = newPrice;
                            self.callback.orderEntryPriceCallback(self.or);
                            self.drawOrderLine(lineOptions.kind);
                        }
                    } else {
                        if (self.or.side * position > 0) {
                            isChanged = true;
                            self.or[lineOptions.kind].price = newPrice;
                            if (lineOptions.kind == "tp")
                                self.callback.orderTpPriceCallback(self.or);
                            else self.callback.orderSlPriceCallback(self.or);
                            self.drawOrderLine(lineOptions.kind);
                        }
                    }
                    //
                    if (!isChanged) {
                        line.applyOptions({ price: oldPrice });
                        self.global.alert.s("warning", "Không được thay đổi.");
                    }
                }
                break;
            case "line":
                self.global.store.s("line", {
                    price: oldPrice,
                    removed: true
                });
                self.global.store.s("line", lineOptions);
                self.draLiBu.classList.remove("selected");
                break;
            case "ruler":
                if (lineOptions.point == 1) {
                    self.global.store.s("ruler", lineOptions);
                    if (self.ru.point == 2) {
                        const distance = +self.ru.end.options().title;
                        const endPrice = +(newPrice + distance).toFixed(1);
                        self.ru.end.applyOptions({ price: endPrice });
                        self.global.store.s("ruler", self.ru.end.options());
                    }
                } else {
                    const startPrice = +self.ru.start.options().price;
                    const distance = (newPrice - startPrice).toFixed(1);
                    line.applyOptions({ title: distance });
                    self.global.store.s("ruler", line.options());
                }
                break;
            case "alert":
                self.auAl.pause();
                self.global.store.s("alert", {
                    price: oldPrice,
                    removed: true
                });
                const currentPrice = self.da.price.slice(-1)[0].value;
                var title = newPrice >= currentPrice ? ">" : "<";
                line.applyOptions({ title: title });
                self.global.store.s("alert", line.options());
                self.draAlBu.classList.remove("selected");
                break;
        }
    };
    //
    showOrderButton = () => {
        if (this.callback.getOrderPositionCallback()) {
            if (!this.or.tp.hasOwnProperty("line")) {
                this.tpsOrBu.style.left = +(this.cr.x + 10) + "px";
                this.tpsOrBu.style.top = +(this.cr.y + 10) + "px";
                this.tpsOrBu.style.display = "block";
            }
        } else {
            if (!this.or.entry.hasOwnProperty("line")) {
                const price = this.coordinateToPrice(this.cr.y);
                const side = price >= this.da.price.slice(-1)[0].value ? 1 : -1;
                this.or.entry.price = price;
                this.or.side = side;
                this.entOrBu.style.left = +(this.cr.x + 10) + "px";
                this.entOrBu.style.top = +(this.cr.y + 10) + "px";
                this.entOrBu.style.background = side > 0 ? "green" : "red";
                this.entOrBu.innerText = `${
                    side > 0 ? "Long" : "Short"
                } ${price}`;
                this.entOrBu.style.display = "block";
            }
        }
    };
    hideOrderButton = () => {
        this.entOrBu.style.display = "none";
        this.tpsOrBu.style.display = "none";
    };
    //
    drawOrderLine = kind => {
        var color, title;
        switch (kind) {
            case "entry":
                color = "silver";
                title = this.or.side > 0 ? "Long" : "Short";
                break;
            case "tp":
                color = "lime";
                title = Math.abs(
                    this.or.tp.price - this.or.entry.price
                ).toFixed(1);
                break;
            case "sl":
                color = "red";
                title = Math.abs(
                    this.or.sl.price - this.or.entry.price
                ).toFixed(1);
                break;
        }
        if (this.or[kind].hasOwnProperty("line")) {
            this.or[kind].line.applyOptions({
                price: this.or[kind].price,
                title: title
            });
        } else {
            this.or[kind].line = this.se.price.createPriceLine({
                lineType: "order",
                kind: kind,
                price: this.or[kind].price,
                color: color,
                lineWidth: 1,
                lineStyle: LightweightCharts.LineStyle.Solid,
                title: title,
                draggable: true
            });
        }
        this.global.store.s("order", {
            kind: kind,
            price: +this.or[kind].price,
            side: this.or.side
        });
    };
    removeOrderLine = kind => {
        if (this.or[kind].hasOwnProperty("line")) {
            this.se.price.removePriceLine(this.or[kind].line);
            delete this.or[kind].line;
        }
    };
    //
    drawHorizontalLine = () => {
        const TYPE = "line";
        const price = this.formatPrice(this.coordinateToPrice(this.cr.y));
        const existIndex = this.li.findIndex(line => {
            const ops = line.options();
            return (ops.type = TYPE && +ops.price == price);
        });
        if (existIndex != -1) {
            const removeLine = this.li.splice(existIndex, 1);
            this.se.price.removePriceLine(removeLine[0]);
            this.global.store.s("line", { price: price, removed: true });
        } else {
            const options = {
                lineType: TYPE,
                price: price,
                color: "aqua",
                lineWidth: 1,
                lineStyle: LightweightCharts.LineStyle.Dotted,
                draggable: true
            };
            this.li.push(this.se.price.createPriceLine(options));
            this.global.store.s("line", options);
        }
        this.draLiBu.classList.remove("selected");
    };
    removeHorizontalLine = () => {
        this.li.forEach(line => this.se.price.removePriceLine(line));
        this.li = [];
        this.global.store.c("line");
    };
    //
    drawMaker = () => {
        if (this.cr.time) {
            const markers = this.ma.filter(item => item.time != this.cr.time);
            if (markers.length == this.ma.length) {
                const dir =
                    this.cr.y >= this.se.price.priceToCoordinate(this.cr.price);
                this.ma.push({
                    time: this.cr.time,
                    position: dir ? "belowBar" : "aboveBar",
                    color: dir ? "lime" : "red",
                    shape: dir ? "arrowUp" : "arrowDown"
                });
            } else this.ma = markers;
            this.se.price.setMarkers(this.ma);
            this.global.s
                .c("marker")
                .then(() => this.global.store.s("marker", this.ma));
            //
            this.draMaBu.classList.remove("selected");
        }
    };
    removeMaker = () => {
        this.ma = [];
        this.se.price.setMarkers([]);
        this.global.store.c("marker");
    };
    //
    drawRuler = () => {
        const price = this.coordinateToPrice(this.cr.y);
        var options = {
            lineType: "ruler",
            price: price,
            color: "yellow",
            lineWidth: 1,
            lineStyle: LightweightCharts.LineStyle.Dotted,
            draggable: true
        };
        if (this.ru.point == 0) {
            const point = 1;
            options.point = point;
            options.title = "0";
            this.ru.start = this.se.price.createPriceLine(options);
            this.ru.point = point;
            this.global.store.s("ruler", options);
        } else if (this.ru.point == 1) {
            const startPrice = +this.ru.start.options().price;
            const point = 2;
            options.point = point;
            options.title = (price - startPrice).toFixed(1);
            this.ru.end = this.se.price.createPriceLine(options);
            this.ru.point = point;
            this.global.store.s("ruler", options);
            this.draRuBu.classList.remove("selected");
        }
    };
    removeRuler = () => {
        if (this.ru.point > 0) {
            this.se.price.removePriceLine(this.ru.start);
            if (this.ru.point > 1) this.se.price.removePriceLine(this.ru.end);
            //
            this.ru = { start: {}, end: {}, point: 0 };
            this.global.store.c("ruler");
        }
    };
    //
    drawAlert = () => {
        const TYPE = "alert";
        const price = this.formatPrice(this.coordinateToPrice(this.cr.y));
        const existIndex = this.al.findIndex(line => {
            const ops = line.options();
            return (ops.type = TYPE && +ops.price == price);
        });
        if (existIndex != -1) {
            const removeLine = this.al.splice(existIndex, 1);
            this.se.price.removePriceLine(removeLine[0]);
            this.global.store.s("alert", { price: price, removed: true });
        } else {
            const options = {
                lineType: TYPE,
                price: price,
                title: price >= this.da.original.slice(-1)[0].price ? ">" : "<",
                color: "#FF00FF",
                lineWidth: 1,
                lineStyle: LightweightCharts.LineStyle.Dotted,
                draggable: true
            };
            this.al.push(this.se.price.createPriceLine(options));
            this.global.store.s("alert", options);
        }
        this.draAlBu.classList.remove("selected");
        this.auAl.pause();
    };
    removeAlert = () => {
        this.al.forEach(line => this.se.price.removePriceLine(line));
        this.al = [];
        this.global.store.c("alert");
        this.auAl.pause();
    };
    //
    toggleCancelOrderButton = visible => {
        if (visible) {
            this.canOrBu.style.display = "block";
            this.canOrBu.style.background = this.or.side > 0 ? "green" : "red";
        } else this.canOrBu.style.display = "none";
    };
    //
    updateLegend = (price, volume) => {
        if (!!price) this.priLeP.innerText = price;
        if (!!volume) this.volLeP.innerText = volume.toLocaleString("en-US");
    };
    coordinateToPrice = y => {
        return this.formatPrice(this.se.price.coordinateToPrice(y));
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
                this.hsNeDa = false;
                const lcData = await this.global.store.g("data");
                const ids = new Set(svData.map(d => d.time));
                const data = [
                    ...svData,
                    ...lcData.filter(d => !ids.has(d.time))
                ].sort((a, b) => a.time - b.time);
                if (this.hsNeDa) continue start;
                this.global.store
                    .c("data")
                    .then(() => this.global.store.s("data", data));
                //
                this.da = data.reduce(
                    (r, item) => this.generateChartData(r, item),
                    {
                        original: [],
                        price: [],
                        volume: []
                    }
                );
                // console.log("data: ", this.da);
                //
                if (!!this.da.original.length) {
                    this.se.price.setData(this.da.price);
                    this.se.volume.setData(this.da.volume);
                    this.updateLegend(
                        this.da.price.slice(-1)[0].value,
                        this.da.volume.slice(-1)[0].value
                    );
                }
                //
                this.toggleSpinner(false);
                resolve();
                break;
            }
        });
    };
    updateChartData = param => {
        this.hsNeDa = true;
        this.da = this.generateChartData(this.da, param);
        const lastPrice = this.da.price.slice(-1)[0];
        const lastVolume = this.da.volume.slice(-1)[0];
        //
        if (this.timFr > 0) {
            this.se.price.setData(this.da.price);
            this.se.volume.setData(this.da.volume);
        } else {
            this.se.price.update(lastPrice);
            this.se.volume.update(lastVolume);
        }
        if (!this.hsCr) {
            this.updateLegend(lastPrice.value, lastVolume.value);
        }
        //
        this.global.store.s("data", param);
        this.da.original.push(param);
    };
    getServerData = () => {
        return new Promise(async (resolve, reject) => {
            const date = this.datIn.value;
            const data = this.global.crypto.e({
                date: date,
                deviceId: this.global.deviceId
            });
            const url = this.global.domain + this.global.endpoint.getChart;
            start: while (true) {
                try {
                    var response = await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.global.accessToken}`
                        },
                        body: data
                    });
                    var json = await response.json();
                    json = this.global.crypto.d(json);
                    // console.log("json: ", json);
                    if (!json.isOk) this.callback.alertInvalidAccessCallback();
                    resolve(json.data);
                    break;
                } catch (e) {
                    continue start;
                }
            }
        });
    };
    generateChartData = (r, item) => {
        var time = item.time + 7 * 60 * 60;
        var volumeColor = this.U_C;
        var volume = item.volume,
            openPrice = 0,
            highPrice = 0,
            lowPrice = 0;
        if (this.timFr > 0) {
            const period = 60 * this.timFr;
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
                volumeColor = item.price >= openPrice ? this.U_C : this.D_C;
            } else {
                openPrice = item.price;
                highPrice = item.price;
                lowPrice = item.price;
            }
            time = timeIndex * period;
        }
        r.original.push(item);
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
        //
        return r;
    };
    getToolsData = () => {
        return new Promise(async (resolve, reject) => {
            const order = await this.global.store.g("order");
            order.map(item => {
                this.or.side = item.side;
                this.or[item.kind].price = item.price;
                this.drawOrderLine(item.kind);
                if (item.kind == "entry") {
                    if (this.callback.getOrderPositionCallback()) {
                        this.or.entry.line.applyOptions({
                            draggable: false
                        });
                    }
                    this.toggleCancelOrderButton(true);
                }
            });
            //
            const lines = await this.global.store.g("line");
            lines.forEach(line => {
                if (!line.removed)
                    this.li.push(this.se.price.createPriceLine(line));
            });
            //
            this.ma = await this.global.store.g("marker");
            this.se.price.setMarkers(this.ma);
            //
            const rulerLines = await this.global.store.g("ruler");
            if (rulerLines.length == 2) {
                rulerLines.forEach(line => {
                    this.ru.point = 2;
                    if (line.point == 1)
                        this.ru.start = this.se.price.createPriceLine(line);
                    else this.ru.end = this.se.price.createPriceLine(line);
                });
            }
            //
            const alertLines = await this.global.store.g("alert");
            alertLines.forEach(line => {
                if (!line.removed)
                    this.al.push(this.se.price.createPriceLine(line));
            });
            //
            resolve();
        });
    };
    connectSocket = () => {
        var self = this;
        var msg = { action: "join", list: self.global.symbol };
        var socket = io(self.global.endpoint.socket);
        socket.on("connect", () => socket.emit("regs", JSON.stringify(msg)));
        socket.on("reconnect", () => {
            self.loadChartData();
            if (self.isInSession()) socket.emit("regs", JSON.stringify(msg));
        });
        socket.on("stockps", data => {
            if (data.data.id == 3220) {
                const param = {
                    time: moment(
                        `${moment().format("YYYY-MM-DD")} ${data.data.time}`
                    ).unix(),
                    price: data.data.lastPrice,
                    volume: data.data.lastVol
                };
                self.updateChartData(param);
            }
        });
    };
    //
    secIntervalHandler = self => {
        if (self.callback.getOrderPositionCallback()) {
            if (
                self.or.entry.hasOwnProperty("line") &&
                !self.or.tp.hasOwnProperty("line")
            ) {
                self.callback.orderTpPriceCallback(self.or, true);
                self.drawOrderLine("tp");
                self.callback.orderSlPriceCallback(self.or, true);
                self.drawOrderLine("sl");
                self.or.entry.line.applyOptions({
                    draggable: false
                });
                self.global.alert.s("success", "Đã mở vị thế.");
            }
        } else {
            if (self.or.tp.hasOwnProperty("line")) {
                self.callback.cancelOrderCallback();
                self.toggleCancelOrderButton(false);
                self.removeOrderLine("entry");
                self.removeOrderLine("tp");
                self.removeOrderLine("sl");
                self.global.store.c("order");
                self.global.alert.s("success", "Đã đóng vị thế.");
            }
        }
        if (self.auAl.paused) {
            self.al.forEach(alert => {
                const ops = alert.options();
                if (!ops.removed && !!self.da.original.length) {
                    const currentPrice = self.da.original.slice(-1)[0].price;
                    if (
                        (ops.title == ">" && currentPrice >= ops.price) ||
                        (ops.title == "<" && currentPrice <= ops.price)
                    )
                        self.auAl.play();
                }
            });
        }
        if (moment().unix() == self.global.time.start) self.connectSocket();
    };
    minIntervalHandler = self => {
        if (self.isInSession()) self.loadChartData();
    };
    isInSession = () => {
        return (
            moment().unix() >= this.global.time.start &&
            moment().unix() <= this.global.time.end
        );
    };
    //
    toggleChartVolume = visible => {
        this.global.isVolume = visible;
        this.se.volume.applyOptions({ visible: visible });
        this.volLeP.style.display = visible ? "block" : "none";
        this.ch.applyOptions({
            rightPriceScale: {
                scaleMargins: visible
                    ? { top: 0.1, bottom: 0.21 }
                    : { top: 0.2, bottom: 0.1 }
            }
        });
    };
    //
    toggleSpinner = visible => {
        this.spiIm.style.opacity = visible ? 1 : 0;
    };
    eventChartResize = self => {
        self.ch.resize(window.innerWidth, window.innerHeight);
    };
    eventKeyPress = (e, self) => {
        try {
            if (e.ctrlKey || e.metaKey) {
                if (e.shiftKey) {
                    switch (e.keyCode) {
                        case 39:
                            self.ch.timeScale().scrollToRealTime();
                            break;
                    }
                } else {
                    switch (e.keyCode) {
                        case 38:
                            self.ch.timeScale().applyOptions({
                                barSpacing:
                                    self.ch.options().timeScale.barSpacing + 0.1
                            });
                            break;
                        case 40:
                            if (
                                options.timeScale.barSpacing >
                                options.timeScale.minBarSpacing
                            )
                                self.ch.timeScale().applyOptions({
                                    barSpacing:
                                        self.ch.options().timeScale.barSpacing -
                                        0.1
                                });
                            break;
                        case 37:
                            self.ch
                                .timeScale()
                                .scrollToPosition(
                                    self.ch.timeScale().scrollPosition() - 10
                                );
                            break;
                        case 39:
                            self.ch
                                .timeScale()
                                .scrollToPosition(
                                    self.ch.timeScale().scrollPosition() + 10
                                );
                            break;
                        case 75:
                            self.draLiBu.click();
                            break;
                        case 76:
                            self.draMaBu.click();
                            break;
                        case 186:
                            self.draRuBu.click();
                            break;
                        case 222:
                            self.draAlBu.click();
                            break;
                        case 96:
                            if (self.timFr != self.global.timFrs[0].value) {
                                self.timFrSe.value =
                                    self.global.timFrs[0].value;
                                self.timFrSe.dispatchEvent(new Event("change"));
                            }
                            break;
                        case 97:
                            if (self.timFr != self.global.timFrs[1].value) {
                                self.timFrSe.value =
                                    self.global.timFrs[1].value;
                                self.timFrSe.dispatchEvent(new Event("change"));
                            }
                            break;
                        case 98:
                            if (self.timFr != self.global.timFrs[2].value) {
                                self.timFrSe.value =
                                    self.global.timFrs[2].value;
                                self.timFrSe.dispatchEvent(new Event("change"));
                            }
                            break;
                        case 99:
                            if (self.timFr != self.global.timFrs[3].value) {
                                self.timFrSe.value =
                                    self.global.timFrs[3].value;
                                self.timFrSe.dispatchEvent(new Event("change"));
                            }
                            break;
                        case 100:
                            if (self.timFr != self.global.timFrs[4].value) {
                                self.timFrSe.value =
                                    self.global.timFrs[4].value;
                                self.timFrSe.dispatchEvent(new Event("change"));
                            }
                            break;
                        case 101:
                            if (self.timFr != self.global.timFrs[5].value) {
                                self.timFrSe.value =
                                    self.global.timFrs[5].value;
                                self.timFrSe.dispatchEvent(new Event("change"));
                            }
                            break;
                        case 102:
                            if (self.timFr != self.global.timFrs[6].value) {
                                self.timFrSe.value =
                                    self.global.timFrs[6].value;
                                self.timFrSe.dispatchEvent(new Event("change"));
                            }
                            break;
                        case 103:
                            if (self.timFr != self.global.timFrs[7].value) {
                                self.timFrSe.value =
                                    self.global.timFrs[7].value;
                                self.timFrSe.dispatchEvent(new Event("change"));
                            }
                            break;
                        case 104:
                            if (self.timFr != self.global.timFrs[8].value) {
                                self.timFrSe.value =
                                    self.global.timFrs[8].value;
                                self.timFrSe.dispatchEvent(new Event("change"));
                            }
                            break;
                        case 105:
                            if (self.timFr != self.global.timFrs[9].value) {
                                self.timFrSe.value =
                                    self.global.timFrs[9].value;
                                self.timFrSe.dispatchEvent(new Event("change"));
                            }
                            break;
                        case 77:
                            self.refBu.click();
                            break;
                        case 188:
                            self.cleBu.click();
                            break;
                    }
                }
            }
        } catch (error) {}
    };
}
