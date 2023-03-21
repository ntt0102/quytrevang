class Ch {
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
    constructor(g, c) {
        this.g = g;
        this.cb = c;
        this.g.tSp = this.tSp;
        this.auAl.loop = true;
    }

    // Các phương thức
    c = () => {
        this.timFr = this.g.timeFrame;
        this.chaTy = this.g.chartType;
        this.cCoEl();
        this.cCh();
        this.cDaAr();
        this.cToAr();
        this.cLeAr();
        this.cFrAr();
        if (this.g.isOpeningMarket) {
            this.secIn = setInterval(() => this.inSec(this), 1000);
            this.minIn = setInterval(() => this.inMin(this), 60000);
        }
        window.addEventListener("resize", () => this.eChRe(this));
        window.addEventListener("keydown", e => this.eKePr(e, this));
    };
    r = () => {
        window.removeEventListener("resize", () => this.eChRe(this));
        window.removeEventListener("keydown", e => this.eKePr(e, this));
        clearInterval(this.secIn);
        clearInterval(this.minIn);
        //
        this.conEl.remove();
    };
    cCoEl = () => {
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
            this.eChCoMe(e, this)
        );
        chartContainer.addEventListener("click", e => this.eChCl(e, this));
        this.conEl = container;
        this.chaCoEl = chartContainer;
    };
    cCh = () => {
        const chartOptions = {
            localization: { dateFormat: "dd/MM/yyyy", locale: "vi-VN" },
            rightPriceScale: {
                visible: true,
                scaleMargins: this.g.isVolume
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
        this.ch.subscribeCrosshairMove(e => this.eChCrMo(e, this));
        this.ch.subscribeCustomPriceLineDragged(e => this.ePrLiDr(e, this));
        //
        this.se.volume = this.ch.addHistogramSeries({
            priceScaleId: "volume",
            priceFormat: { type: "volume" },
            scaleMargins: { top: 0.8, bottom: 0 },
            visible: this.g.isVolume
        });
        //
        this.cPrSe();
        this.ch.timeScale().fitContent();
    };
    cPrSe = () => {
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
    cDaAr = () => {
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
            if (!!e.target.value) this.lChDa();
        });
        container.append(input);
        this.datIn = input;
        //
        var select = document.createElement("select");
        select.id = "chartTypeSelect";
        select.className = "command";
        select.title = "Loại biểu đồ giá";
        this.g.chaTys.forEach((item, index) => {
            var option = document.createElement("option");
            option.value = item.value;
            option.text = item.text;
            select.appendChild(option);
        });
        select.value = this.chaTy;
        select.addEventListener("change", e => {
            if (this.timFr == 0 && e.target.value != "line") {
                this.chaTySe.value = "line";
                this.g.a.s(
                    "warning",
                    "Chỉ có thể mở biểu đồ Đường trong khung thời gian Tick."
                );
                return false;
            }
            this.chaTy = e.target.value;
            this.ch.remove();
            this.cCh();
            this.se.price.setData(this.da.price);
            this.se.volume.setData(this.da.volume);
            this.gToDa();
        });
        container.append(select);
        this.chaTySe = select;
        //
        var select = document.createElement("select");
        select.id = "timeFrameSelect";
        select.className = "command";
        select.title = "Khung thời gian [Ctrl+0]";
        this.g.timFrs.forEach((item, index) => {
            var option = document.createElement("option");
            option.value = item.value;
            option.text = item.text;
            select.appendChild(option);
        });
        select.value = this.timFr;
        select.addEventListener("change", e => {
            this.timFr = e.target.value;
            if (this.timFr == 0) {
                this.chaTySe.value = "line";
                this.chaTySe.dispatchEvent(new Event("change"));
            } else
                this.lChDa().then(() => this.ch.timeScale().resetTimeScale());
        });
        container.append(select);
        this.timFrSe = select;
        //
        var button = document.createElement("div");
        button.className = "command fa fa-refresh";
        button.title = "Làm mới [Ctrl+M]";
        button.addEventListener("click", () => this.lChDa());
        container.append(button);
        this.refBu = button;
        //
        var button = document.createElement("div");
        button.className = "command fa fa-trash";
        button.title = "Xoá ngày khác [Ctrl+,]";
        button.addEventListener("click", () => {
            this.g.s.c("data");
            this.lChDa();
        });
        container.append(button);
        this.cleBu = button;
    };
    cToAr = () => {
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
            this.rToLi();
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
            this.rMa();
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
                this.rRu();
            }
            e.stopPropagation();
        });
        button.addEventListener("contextmenu", e => {
            this.rRu();
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
            this.rAl();
            e.target.classList.remove("selected");
            e.preventDefault();
            e.stopPropagation();
        });
        container.append(button);
        this.draAlBu = button;
    };
    cLeAr = () => {
        var container = document.createElement("div");
        container.id = "legendAreaDiv";
        this.conEl.append(container);
        //
        var p = document.createElement("p");
        container.append(p);
        this.priLeP = p;
        //
        var p = document.createElement("p");
        p.style.display = this.g.isVolume ? "block" : "none";
        container.append(p);
        this.volLeP = p;
    };
    cFrAr = () => {
        var container = this.conEl;
        //
        var button = document.createElement("button");
        button.id = "cancelOrderButton";
        button.innerText = "X";
        button.style.display = "none";
        button.addEventListener("click", () => {
            this.cb.cPo();
            this.cb.cOr();
            this.tCaOrBu(false);
            this.rOrLi("entry");
            this.rOrLi("tp");
            this.rOrLi("sl");
            this.g.s.c("order");
        });
        container.append(button);
        this.canOrBu = button;
        //
        var button = document.createElement("button");
        button.id = "entryOrderButton";
        button.innerText = "Entry";
        button.style.display = "none";
        button.addEventListener("click", () => {
            this.cb.oEnPr(this.or);
            this.dOrLi("entry");
            this.tCaOrBu(true);
            this.hOrBu();
        });
        container.append(button);
        this.entOrBu = button;
        //
        var button = document.createElement("button");
        button.id = "tpslOrderButton";
        button.innerText = "TP/SL";
        button.style.display = "none";
        button.addEventListener("click", () => {
            this.cb.oTpPr(this.or, true);
            this.dOrLi("tp");
            this.cb.oSlPr(this.or, true);
            this.dOrLi("sl");
            this.hOrBu();
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
    eChCoMe = (e, self) => {
        self.sOrBu();
        e.preventDefault();
    };
    eChCl = (e, self) => {
        self.hOrBu();
        if (self.draLiBu.classList.contains("selected")) self.dToLi();
        else if (self.draMaBu.classList.contains("selected")) self.dMa();
        else if (self.draRuBu.classList.contains("selected")) self.dRu();
        else if (self.draAlBu.classList.contains("selected")) self.dAl();
    };
    eChCrMo = (e, self) => {
        if (e.time) {
            var price = e.seriesPrices.get(self.se.price);
            var volume = e.seriesPrices.get(self.se.volume);
            if (!!price && self.chaTy != "line") price = price.close;
            self.uLe(price, volume);
            self.hsCr = true;
            self.cr.time = e.time;
            self.cr.price = price;
        } else {
            self.hsCr = false;
            if (!self.g.isM) {
                self.cr.time = null;
                self.cr.price = null;
            }
        }
        if (e.point != undefined) {
            self.cr.x = e.point.x;
            self.cr.y = e.point.y;
        }
    };
    ePrLiDr = (e, self) => {
        var line = e.customPriceLine;
        var lineOptions = line.options();
        lineOptions.price = self.fPr(lineOptions.price);
        const oldPrice = +e.fromPriceString;
        const newPrice = lineOptions.price;
        switch (lineOptions.lineType) {
            case "order":
                if (newPrice != oldPrice) {
                    var isChanged = false;
                    const position = self.cb.gOrPo();
                    if (lineOptions.kind == "entry") {
                        if (!position) {
                            isChanged = true;
                            self.or[lineOptions.kind].price = newPrice;
                            self.cb.oEnPr(self.or);
                            self.dOrLi(lineOptions.kind);
                        }
                    } else {
                        if (self.or.side * position > 0) {
                            isChanged = true;
                            self.or[lineOptions.kind].price = newPrice;
                            if (lineOptions.kind == "tp")
                                self.cb.oTpPr(self.or);
                            else self.cb.oSlPr(self.or);
                            self.dOrLi(lineOptions.kind);
                        }
                    }
                    //
                    if (!isChanged) {
                        line.applyOptions({ price: oldPrice });
                        self.g.a.s("warning", "Không được thay đổi.");
                    }
                }
                break;
            case "line":
                self.g.s.s("line", {
                    price: oldPrice,
                    removed: true
                });
                self.g.s.s("line", lineOptions);
                self.draLiBu.classList.remove("selected");
                break;
            case "ruler":
                if (lineOptions.point == 1) {
                    self.g.s.s("ruler", lineOptions);
                    if (self.ru.point == 2) {
                        const distance = +self.ru.end.options().title;
                        const endPrice = +(newPrice + distance).toFixed(1);
                        self.ru.end.applyOptions({ price: endPrice });
                        self.g.s.s("ruler", self.ru.end.options());
                    }
                } else {
                    const startPrice = +self.ru.start.options().price;
                    const distance = (newPrice - startPrice).toFixed(1);
                    line.applyOptions({ title: distance });
                    self.g.s.s("ruler", line.options());
                }
                break;
            case "alert":
                self.auAl.pause();
                self.g.s.s("alert", {
                    price: oldPrice,
                    removed: true
                });
                const currentPrice = self.da.price.slice(-1)[0].value;
                var title = newPrice >= currentPrice ? ">" : "<";
                line.applyOptions({ title: title });
                self.g.s.s("alert", line.options());
                self.draAlBu.classList.remove("selected");
                break;
        }
    };
    //
    sOrBu = () => {
        if (this.cb.gOrPo()) {
            if (!this.or.tp.hasOwnProperty("line")) {
                this.tpsOrBu.style.left = +(this.cr.x + 10) + "px";
                this.tpsOrBu.style.top = +(this.cr.y + 10) + "px";
                this.tpsOrBu.style.display = "block";
            }
        } else {
            if (!this.or.entry.hasOwnProperty("line")) {
                const price = this.cCo2Pr(this.cr.y);
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
    hOrBu = () => {
        this.entOrBu.style.display = "none";
        this.tpsOrBu.style.display = "none";
    };
    //
    dOrLi = kind => {
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
        this.g.s.s("order", {
            kind: kind,
            price: +this.or[kind].price,
            side: this.or.side
        });
    };
    rOrLi = kind => {
        if (this.or[kind].hasOwnProperty("line")) {
            this.se.price.removePriceLine(this.or[kind].line);
            delete this.or[kind].line;
        }
    };
    //
    dToLi = () => {
        const TYPE = "line";
        const price = this.fPr(this.cCo2Pr(this.cr.y));
        const existIndex = this.li.findIndex(line => {
            const ops = line.options();
            return (ops.type = TYPE && +ops.price == price);
        });
        if (existIndex != -1) {
            const removeLine = this.li.splice(existIndex, 1);
            this.se.price.removePriceLine(removeLine[0]);
            this.g.s.s("line", { price: price, removed: true });
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
            this.g.s.s("line", options);
        }
        this.draLiBu.classList.remove("selected");
    };
    rToLi = () => {
        this.li.forEach(line => this.se.price.removePriceLine(line));
        this.li = [];
        this.g.s.c("line");
    };
    //
    dMa = () => {
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
            this.g.s.c("marker").then(() => this.g.s.s("marker", this.ma));
            //
            this.draMaBu.classList.remove("selected");
        }
    };
    rMa = () => {
        this.ma = [];
        this.se.price.setMarkers([]);
        this.g.s.c("marker");
    };
    //
    dRu = () => {
        const price = this.cCo2Pr(this.cr.y);
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
            this.g.s.s("ruler", options);
        } else if (this.ru.point == 1) {
            const startPrice = +this.ru.start.options().price;
            const point = 2;
            options.point = point;
            options.title = (price - startPrice).toFixed(1);
            this.ru.end = this.se.price.createPriceLine(options);
            this.ru.point = point;
            this.g.s.s("ruler", options);
            this.draRuBu.classList.remove("selected");
        }
    };
    rRu = () => {
        if (this.ru.point > 0) {
            this.se.price.removePriceLine(this.ru.start);
            if (this.ru.point > 1) this.se.price.removePriceLine(this.ru.end);
            //
            this.ru = { start: {}, end: {}, point: 0 };
            this.g.s.c("ruler");
        }
    };
    //
    dAl = () => {
        const TYPE = "alert";
        const price = this.fPr(this.cCo2Pr(this.cr.y));
        const existIndex = this.al.findIndex(line => {
            const ops = line.options();
            return (ops.type = TYPE && +ops.price == price);
        });
        if (existIndex != -1) {
            const removeLine = this.al.splice(existIndex, 1);
            this.se.price.removePriceLine(removeLine[0]);
            this.g.s.s("alert", { price: price, removed: true });
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
            this.g.s.s("alert", options);
        }
        this.draAlBu.classList.remove("selected");
        this.auAl.pause();
    };
    rAl = () => {
        this.al.forEach(line => this.se.price.removePriceLine(line));
        this.al = [];
        this.g.s.c("alert");
        this.auAl.pause();
    };
    //
    tCaOrBu = visible => {
        if (visible) {
            this.canOrBu.style.display = "block";
            this.canOrBu.style.background = this.or.side > 0 ? "green" : "red";
        } else this.canOrBu.style.display = "none";
    };
    //
    uLe = (price, volume) => {
        if (!!price) this.priLeP.innerText = price;
        if (!!volume) this.volLeP.innerText = volume.toLocaleString("en-US");
    };
    cCo2Pr = y => {
        return this.fPr(this.se.price.coordinateToPrice(y));
    };
    fPr = price => {
        return +(+price.toFixed(1));
    };
    //
    lChDa = () => {
        return new Promise(async (resolve, reject) => {
            this.tSp(true);
            const svData = await this.gSeDa();
            start: while (true) {
                this.hsNeDa = false;
                const lcData = await this.g.s.g("data");
                const ids = new Set(svData.map(d => d.time));
                const data = [
                    ...svData,
                    ...lcData.filter(d => !ids.has(d.time))
                ].sort((a, b) => a.time - b.time);
                if (this.hsNeDa) continue start;
                this.g.s.c("data").then(() => this.g.s.s("data", data));
                //
                this.da = data.reduce((r, item) => this.cChDa(r, item), {
                    original: [],
                    price: [],
                    volume: []
                });
                // console.log("data: ", this.da);
                //
                this.se.price.setData(this.da.price);
                this.se.volume.setData(this.da.volume);
                //
                if (!this.hsCr && !!this.da.original.length) {
                    this.uLe(
                        this.da.price.slice(-1)[0].value,
                        this.da.volume.slice(-1)[0].value
                    );
                }
                //
                this.tSp(false);
                resolve();
                break;
            }
        });
    };
    uChDa = param => {
        this.hsNeDa = true;
        this.da = this.cChDa(this.da, param);
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
            this.uLe(lastPrice.value, lastVolume.value);
        }
        //
        this.g.s.s("data", param);
        this.da.original.push(param);
    };
    gSeDa = () => {
        return new Promise(async (resolve, reject) => {
            const date = this.datIn.value;
            const data = this.g.c.e({ date: date });
            const url = this.g.domain + this.g.endpoint.getChart;
            start: while (true) {
                try {
                    var response = await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.g.accessToken}`
                        },
                        body: data
                    });
                    var json = await response.json();
                    json = this.g.c.d(json);
                    // console.log("json: ", json);
                    resolve(json);
                    break;
                } catch (e) {
                    continue start;
                }
            }
        });
    };
    cChDa = (r, item) => {
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
    gToDa = () => {
        return new Promise(async (resolve, reject) => {
            const order = await this.g.s.g("order");
            order.map(item => {
                this.or.side = item.side;
                this.or[item.kind].price = item.price;
                this.dOrLi(item.kind);
                if (item.kind == "entry") {
                    if (this.cb.gOrPo()) {
                        this.or.entry.line.applyOptions({
                            draggable: false
                        });
                    }
                    this.tCaOrBu(true);
                }
            });
            //
            const lines = await this.g.s.g("line");
            lines.forEach(line => {
                if (!line.removed)
                    this.li.push(this.se.price.createPriceLine(line));
            });
            //
            this.ma = await this.g.s.g("marker");
            this.se.price.setMarkers(this.ma);
            //
            const rulerLines = await this.g.s.g("ruler");
            if (rulerLines.length == 2) {
                rulerLines.forEach(line => {
                    this.ru.point = 2;
                    if (line.point == 1)
                        this.ru.start = this.se.price.createPriceLine(line);
                    else this.ru.end = this.se.price.createPriceLine(line);
                });
            }
            //
            const alertLines = await this.g.s.g("alert");
            alertLines.forEach(line => {
                if (!line.removed)
                    this.al.push(this.se.price.createPriceLine(line));
            });
            //
            resolve();
        });
    };
    cnSk = () => {
        var self = this;
        var msg = { action: "join", list: self.g.symbol };
        var socket = io(self.g.endpoint.socket);
        socket.on("connect", () => socket.emit("regs", JSON.stringify(msg)));
        socket.on("reconnect", () => {
            self.lChDa();
            if (self.isInSe()) socket.emit("regs", JSON.stringify(msg));
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
                self.uChDa(param);
            }
        });
    };
    //
    inSec = self => {
        if (self.cb.gOrPo()) {
            if (
                self.or.entry.hasOwnProperty("line") &&
                !self.or.tp.hasOwnProperty("line")
            ) {
                self.cb.oTpPr(self.or, true);
                self.dOrLi("tp");
                self.cb.oSlPr(self.or, true);
                self.dOrLi("sl");
                self.or.entry.line.applyOptions({
                    draggable: false
                });
                self.g.a.s("success", "Đã mở vị thế.");
            }
        } else {
            if (self.or.tp.hasOwnProperty("line")) {
                self.cb.cOr();
                self.tCaOrBu(false);
                self.rOrLi("entry");
                self.rOrLi("tp");
                self.rOrLi("sl");
                self.g.s.c("order");
                self.g.a.s("success", "Đã đóng vị thế.");
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
        if (moment().unix() == self.g.time.start) self.cnSk();
    };
    inMin = self => {
        if (self.isInSe()) self.lChDa();
    };
    isInSe = () => {
        return (
            moment().unix() >= this.g.time.start &&
            moment().unix() <= this.g.time.end
        );
    };
    //
    tVo = visible => {
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
    tSp = visible => {
        this.spiIm.style.opacity = visible ? 1 : 0;
    };
    eChRe = self => {
        self.ch.resize(window.innerWidth, window.innerHeight);
    };
    eKePr = (e, self) => {
        try {
            if (e.ctrlKey || e.metaKey) {
                if (e.shiftKey) {
                    if (e.keyCode == 39) self.ch.timeScale().scrollToRealTime();
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
                            self.timFrSe.value = self.g.timFrs[0].value;
                            self.timFrSe.dispatchEvent(new Event("change"));
                            break;
                        case 97:
                            self.timFrSe.value = self.g.timFrs[1].value;
                            self.timFrSe.dispatchEvent(new Event("change"));
                            break;
                        case 98:
                            self.timFrSe.value = self.g.timFrs[2].value;
                            self.timFrSe.dispatchEvent(new Event("change"));
                            break;
                        case 99:
                            self.timFrSe.value = self.g.timFrs[3].value;
                            self.timFrSe.dispatchEvent(new Event("change"));
                            break;
                        case 100:
                            self.timFrSe.value = self.g.timFrs[4].value;
                            self.timFrSe.dispatchEvent(new Event("change"));
                            break;
                        case 101:
                            self.timFrSe.value = self.g.timFrs[5].value;
                            self.timFrSe.dispatchEvent(new Event("change"));
                            break;
                        case 102:
                            self.timFrSe.value = self.g.timFrs[6].value;
                            self.timFrSe.dispatchEvent(new Event("change"));
                            break;
                        case 103:
                            self.timFrSe.value = self.g.timFrs[7].value;
                            self.timFrSe.dispatchEvent(new Event("change"));
                            break;
                        case 104:
                            self.timFrSe.value = self.g.timFrs[8].value;
                            self.timFrSe.dispatchEvent(new Event("change"));
                            break;
                        case 105:
                            self.timFrSe.value = self.g.timFrs[9].value;
                            self.timFrSe.dispatchEvent(new Event("change"));
                            break;
                        case 77:
                            self.refBu.click();
                            break;
                        case 188:
                            self.cleBu.click();
                            break;

                        default:
                            break;
                    }
                }
            }
        } catch (error) {}
    };
}
