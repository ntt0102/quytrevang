goog.require("proto.tcbs.BuySellActivePojo");

var mConfig = {};
var mChart = {
    self: {},
    series: {},
    data: {},
    order: { entry: {}, tp: {}, sl: {} },
    lines: [],
    markers: [],
    crosshair: {}
};
var mDatabase = {};
var mNotify = {};

getLocalConfig()
    .then(() => getServerConfig())
    .then(() => {
        createButtons();
        createChartContainer();
        registerEvent();
        createIndexedDB().then(() => {
            connectSocket();
            loadPage();
            setInterval(intervalHandler, 1000);
            setInterval(refreshDataInSession, 60000);
        });
    });

function getLocalConfig() {
    mNotify = pushNotify("warning", "Đang cài đặt biểu đồ", false);
    return new Promise((resolve, reject) => {
        const file = chrome.runtime.getURL("config.json");
        fetch(file)
            .then(response => response.json())
            .then(json => {
                // console.log("localConfig", json);
                mConfig = json;
                resolve();
            })
            .catch(() => {
                console.log(err);
                var choice = confirm("Get local config error. Refresh now?");
                if (choice) location.reload();
            });
    });
}

function getServerConfig() {
    return new Promise((resolve, reject) => {
        const url = mConfig.root + mConfig.endpoint.config;
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(json => {
                // console.log("serverConfig", json);
                mConfig = { ...mConfig, ...json };
                mConfig.isMobile = navigator.userAgentData.mobile;
                mConfig.hasCrosshair = false;
                mConfig.hasNewData = false;
                mConfig.currentTime = moment().unix();
                //
                resolve();
            })
            .catch(err => {
                console.log(err);
                var choice = confirm("Get server config error. Refresh now?");
                if (choice) location.reload();
            });
    });
}

function createButtons() {
    var button = document.createElement("button");
    button.id = "candleButton";
    button.innerText = "📊";
    button.title = "Candle chart";
    button.addEventListener("click", () => {
        if (document.body.classList.contains("candle-chart")) {
            document.body.classList.remove("candle-chart");
            document.getElementById("left_order_type").innerText =
                "Lệnh thường";
            document.getElementById("right_order_type").innerText =
                "Lệnh điều kiện";
            document.querySelector(
                "#mainFooter .foot_tab:nth-child(1)"
            ).innerText = "DANH SÁCH LỆNH";
            document.querySelector(
                "#mainFooter .foot_tab:nth-child(2)"
            ).innerText = "DANH SÁCH LỆNH ĐIỀU KIỆN";
        } else {
            document.body.classList.add("candle-chart");
            document.body.classList.remove("line-chart");
            document.getElementById("left_order_type").innerText = "LT";
            document.getElementById("right_order_type").innerText = "LĐK";
            document.querySelector(
                "#mainFooter .foot_tab:nth-child(1)"
            ).innerText = "LỆNH";
            document.querySelector(
                "#mainFooter .foot_tab:nth-child(2)"
            ).innerText = "ĐIỀU KIỆN";
        }
    });
    document.body.append(button);
    //
    button = document.createElement("button");
    button.id = "lineButton";
    button.innerText = "💹";
    button.title = "Line chart";
    button.addEventListener("click", () => {
        if (document.body.classList.contains("line-chart")) {
            document.body.classList.remove("line-chart");
            document.getElementById("left_order_type").innerText =
                "Lệnh thường";
            document.getElementById("right_order_type").innerText =
                "Lệnh điều kiện";
            document.querySelector(
                "#mainFooter .foot_tab:nth-child(1)"
            ).innerText = "DANH SÁCH LỆNH";
            document.querySelector(
                "#mainFooter .foot_tab:nth-child(2)"
            ).innerText = "DANH SÁCH LỆNH ĐIỀU KIỆN";
        } else {
            document.body.classList.add("line-chart");
            document.body.classList.remove("candle-chart");
            document.getElementById("left_order_type").innerText = "LT";
            document.getElementById("right_order_type").innerText = "LĐK";
            document.querySelector(
                "#mainFooter .foot_tab:nth-child(1)"
            ).innerText = "O";
            document.querySelector(
                "#mainFooter .foot_tab:nth-child(2)"
            ).innerText = "?";
        }
    });
    document.body.append(button);
    //
    button = document.createElement("button");
    button.id = "reportButton";
    button.innerText = "📔";
    button.title = "Report";
    button.addEventListener("click", () => {
        if (mConfig.currentTime > mConfig.time.end) reportHandler();
    });
    document.body.append(button);
}

function createChartContainer() {
    var div = document.createElement("div");
    div.id = "lightWeightChart";
    div.style.width = "100vw";
    div.style.height = "100vh";
    div.addEventListener("contextmenu", e => {
        showOrderButton();
        e.preventDefault();
    });
    div.addEventListener("click", chartClick);
    document.body.append(div);
    //
    createDataArea(div);
    createToolArea(div);
    createLegendArea(div);
    createFreeElement(div);
    createLightWeightChart(div);
    //

    function createDataArea(container) {
        var div = document.createElement("div");
        div.id = "dataAreaDiv";
        div.className = "area";
        container.append(div);
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
                getData().then(() => mChart.self.timeScale().resetTimeScale());
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
            button.innerText = "R";
            button.className = "command";
            button.title = "Refresh chart";
            button.addEventListener("click", () => getData());
            container.append(button);
        }

        function createClearButton(container) {
            var button = document.createElement("div");
            button.id = "clearButton";
            button.innerText = "C";
            button.className = "command";
            button.title = "Delete local data";
            button.addEventListener("click", () => {
                clearLocalData("data");
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

    function createToolArea(container) {
        var div = document.createElement("div");
        div.id = "toolAreaDiv";
        div.className = "area";
        container.append(div);
        //
        createDrawLineButton(div);
        createDrawMarkerButton(div);

        function createDrawLineButton(container) {
            var button = document.createElement("div");
            button.id = "drawLineButton";
            button.innerText = "L";
            button.className = "command tool";
            button.addEventListener("click", e => {
                const selected = e.target.classList.contains("selected");
                document
                    .querySelectorAll(".tool")
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
        }

        function createDrawMarkerButton(container) {
            button = document.createElement("div");
            button.id = "drawMarkerButton";
            button.innerText = "M";
            button.className = "command tool";
            button.addEventListener("click", e => {
                const selected = e.target.classList.contains("selected");
                document
                    .querySelectorAll(".tool")
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
        }
    }

    function createLegendArea(container) {
        var div = document.createElement("div");
        div.id = "legendAreaDiv";
        container.append(div);
        //
        createPriceLegendP(div);
        createSharkLegendP(div);

        function createPriceLegendP(container) {
            var p = document.createElement("p");
            p.id = "priceLegendP";
            container.append(p);
        }

        function createSharkLegendP(container) {
            //
            var p = document.createElement("p");
            p.id = "sharkLegendP";
            container.append(p);
        }
    }

    function createFreeElement(container) {
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
                closePosition();
                cancelOrder();
            });
            container.append(button);
        }
        function createEntryOrderButton(container) {
            button = document.createElement("button");
            button.id = "entryOrderButton";
            button.innerText = "Entry";
            button.style.display = "none";
            button.addEventListener("click", () => {
                orderEntryPrice();
                removeOrderButton();
            });
            container.append(button);
        }
        function createTpslOrderButton(container) {
            //
            button = document.createElement("button");
            button.id = "tpslOrderButton";
            button.innerText = "TP/SL";
            button.style.display = "none";
            button.addEventListener("click", () => {
                orderTpPrice(true);
                orderSlPrice(true);
                removeOrderButton();
            });
            container.append(button);
        }
        function createScrollButton(container) {
            //
            button = document.createElement("div");
            button.id = "scrollButton";
            button.className = "command";
            button.innerText = "≫";
            button.addEventListener("click", () =>
                mChart.self.timeScale().scrollToRealTime()
            );
            container.append(button);
        }
    }

    function createLightWeightChart(container) {
        const chartOptions = {
            localization: { dateFormat: "dd/MM/yyyy", locale: "vi-VN" },
            rightPriceScale: {
                visible: true,
                scaleMargins: { top: 0.1, bottom: 0.4 }
            },
            leftPriceScale: { visible: false },
            layout: {
                backgroundColor: "#181C27",
                textColor: "#A2A6AE",
                lineColor: "#2B2B43"
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
        mChart.self = LightweightCharts.createChart(container, chartOptions);
        //
        mChart.self.subscribeCrosshairMove(crosshairMove);
        mChart.self.subscribeCustomPriceLineDragged(priceLineDrag);
        //
        mChart.series.shark = mChart.self.addLineSeries({
            priceScaleId: "shark",
            color: "#FF00FF",
            priceFormat: { minMove: 1 },
            scaleMargins: { top: 0.6, bottom: 0 }
        });
        mChart.series.price = mChart.self.addLineSeries({
            color: "white",
            priceFormat: { minMove: 0.1 }
        });

        mChart.self.timeScale().fitContent();
    }

    function crosshairMove(e) {
        if (e.time) {
            updateLegend(
                e.seriesPrices.get(mChart.series.price),
                e.seriesPrices.get(mChart.series.shark)
            );
            mConfig.hasCrosshair = true;
            mChart.crosshair.time = e.time;
            mChart.crosshair.price = e.seriesPrices.get(mChart.series.price);
        } else {
            mConfig.hasCrosshair = false;
            if (!mConfig.isMobile) {
                mChart.crosshair.time = null;
                mChart.crosshair.price = null;
            }
        }
        if (e.point != undefined) {
            mChart.crosshair.x = e.point.x;
            mChart.crosshair.y = e.point.y;
        }
    }

    function chartClick() {
        removeOrderButton();
        if (
            document
                .getElementById("drawLineButton")
                .classList.contains("selected")
        )
            drawToolLine(coordinateToPrice(mChart.crosshair.y));
        else if (
            document
                .getElementById("drawMarkerButton")
                .classList.contains("selected")
        )
            drawMarker();
    }

    function drawToolLine(price) {
        const TYPE = "tool";
        const existIndex = mChart.lines.findIndex(line => {
            const ops = line.options();
            return (ops.type = TYPE && +ops.price == price);
        });
        if (existIndex != -1) {
            const removeLine = mChart.lines.splice(existIndex, 1);
            mChart.series.price.removePriceLine(removeLine[0]);
        } else
            mChart.lines.push(
                mChart.series.price.createPriceLine({
                    type: TYPE,
                    price: price,
                    color: "aqua",
                    lineWidth: 1,
                    lineStyle: LightweightCharts.LineStyle.Solid,
                    draggable: true
                })
            );
        //
        clearLocalData("line").then(() =>
            setLocalData(
                "line",
                mChart.lines.map(line => line.options())
            )
        );
        document.getElementById("drawLineButton").classList.remove("selected");
    }

    function removeToolLines() {
        mChart.lines.forEach(line => mChart.series.price.removePriceLine(line));
        mChart.lines = [];
        clearLocalData("line");
    }

    function showOrderButton() {
        if (getOrderPosition()) {
            // if (mChart.order.entry.hasOwnProperty("line")) {
            if (!mChart.order.tp.hasOwnProperty("line")) {
                var btn = document.getElementById("tpslOrderButton");
                btn.style.left = +(mChart.crosshair.x + 10) + "px";
                btn.style.top = +(mChart.crosshair.y + 10) + "px";
                btn.style.display = "block";
            }
        } else {
            if (!mChart.order.entry.hasOwnProperty("line")) {
                const price = coordinateToPrice(mChart.crosshair.y);
                const side =
                    price >= mChart.data.price.slice(-1)[0].value ? 1 : -1;
                var btn = document.getElementById("entryOrderButton");
                mChart.order.entry.price = price;
                mChart.order.side = side;
                btn.style.left = +(mChart.crosshair.x + 10) + "px";
                btn.style.top = +(mChart.crosshair.y + 10) + "px";
                btn.style.background = side > 0 ? "green" : "red";
                btn.innerText = `${side > 0 ? "Long" : "Short"} ${price}`;
                btn.style.display = "block";
            }
        }
    }

    function drawMarker() {
        console.log("mChart.crosshair.time: ", mChart.crosshair.time);
        if (mChart.crosshair.time) {
            const markers = mChart.markers.filter(
                item => item.time != mChart.crosshair.time
            );
            if (markers.length == mChart.markers.length) {
                const dir =
                    mChart.crosshair.y >=
                    mChart.series.price.priceToCoordinate(
                        mChart.crosshair.price
                    );
                mChart.markers.push({
                    time: mChart.crosshair.time,
                    position: dir ? "belowBar" : "aboveBar",
                    color: dir ? "lime" : "red",
                    shape: dir ? "arrowUp" : "arrowDown"
                });
            } else mChart.markers = markers;
            mChart.series.price.setMarkers(mChart.markers);
            clearLocalData("marker").then(() =>
                setLocalData("marker", mChart.markers)
            );
            //
            document
                .getElementById("drawMarkerButton")
                .classList.remove("selected");
        }
    }

    function removeMarkers() {
        mChart.markers = [];
        mChart.series.price.setMarkers([]);
        clearLocalData("marker");
    }

    function priceLineDrag(e) {
        const line = e.customPriceLine.options();
        if (line.type == "order") {
            const oldPrice = +e.fromPriceString;
            const newPrice = formatPrice(line.price);
            if (newPrice != oldPrice) {
                var isChanged = false;
                const position = getOrderPosition();
                if (line.kind == "entry") {
                    if (!position) {
                        isChanged = true;
                        mChart.order[line.kind].price = newPrice;
                        orderEntryPrice();
                    }
                } else {
                    if (mChart.order.side * position > 0) {
                        isChanged = true;
                        mChart.order[line.kind].price = newPrice;
                        if (line.kind == "tp") orderTpPrice();
                        else orderSlPrice();
                    }
                }
                //
                if (!isChanged) {
                    mChart.order[line.kind].line.applyOptions({
                        price: e.fromPriceString
                    });
                    pushNotify("warning", "Không được thay đổi.");
                }
            }
        } else {
            clearLocalData("line").then(() =>
                setLocalData(
                    "line",
                    mChart.lines.map(line => line.options())
                )
            );
            document
                .getElementById("drawLineButton")
                .classList.remove("selected");
        }
    }
}

function registerEvent() {
    document
        .getElementById("select_condition_order_wrapper")
        .addEventListener("click", conditionOrderSelect);
    document
        .getElementById("btn_long")
        .addEventListener("click", orderButtonClick);
    document
        .getElementById("btn_short")
        .addEventListener("click", orderButtonClick);
    document
        .getElementById("right_selStopOrderType")
        .addEventListener("change", stopOrderSelect);
    document
        .getElementById("right_stopOrderIndex")
        .addEventListener("input", stopOrderType);
    document
        .querySelector(".timeStamp")
        .addEventListener("dblclick", toggleFullScreen);
    window.addEventListener("resize", resizeChart);
    window.addEventListener("keydown", zoomChart);

    function conditionOrderSelect() {
        document.getElementById("right_price").value = "MTL";
        document.getElementById("right_selStopOrderType").focus();
    }

    function orderButtonClick() {
        if (
            document
                .getElementById("select_condition_order")
                .classList.contains("select-active") &&
            document.getElementById("right_price").value != "MTL"
        )
            pushNotify("warning", "Giá đặt khác MTL");
    }

    function stopOrderSelect() {
        var el = document.getElementById("right_stopOrderIndex");
        el.value = "";
        el.focus();
    }

    function stopOrderType() {
        var isError = false;
        var stopOperation = document.getElementById("right_selStopOrderType")
            .value;
        var stopPrice = document.getElementById("right_stopOrderIndex").value;
        var currentPrice = document.getElementById(`${mConfig.symbol}pri`)
            .innerText;
        if (Math.abs(currentPrice - stopPrice) < 20) {
            if (stopOperation == "SOL" && currentPrice >= stopPrice)
                isError = true;
            else if (stopOperation == "SOU" && currentPrice <= stopPrice)
                isError = true;
        }
        if (isError) pushNotify("warning", "Đặt sai điều kiện");
    }

    function toggleFullScreen() {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
    }

    function resizeChart() {
        mChart.self.resize(window.innerWidth, window.innerHeight);
    }

    function zoomChart(event) {
        if (event.ctrlKey || event.metaKey) {
            if (event.shiftKey) {
                if (event.keyCode == 39)
                    mChart.self.timeScale().scrollToRealTime();
            } else {
                if (event.keyCode == 38) {
                    const options = mChart.self.options();
                    mChart.self.timeScale().applyOptions({
                        barSpacing: options.timeScale.barSpacing + 0.1
                    });
                } else if (event.keyCode == 40) {
                    const options = mChart.self.options();
                    if (
                        options.timeScale.barSpacing >
                        options.timeScale.minBarSpacing
                    )
                        mChart.self.timeScale().applyOptions({
                            barSpacing: options.timeScale.barSpacing - 0.1
                        });
                } else if (event.keyCode == 37) {
                    const position = mChart.self.timeScale().scrollPosition();
                    mChart.self.timeScale().scrollToPosition(position - 10);
                } else if (event.keyCode == 39) {
                    const position = mChart.self.timeScale().scrollPosition();
                    mChart.self.timeScale().scrollToPosition(position + 10);
                }
            }
        } else if (event.which === 27) removeOrderButton();
    }
}

function createIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("vpsDB", 1);
        request.onupgradeneeded = e => {
            console.log("onupgradeneeded");
            mDatabase = e.target.result;
            mDatabase.createObjectStore("data", { keyPath: "time" });
            mDatabase.createObjectStore("order", { keyPath: "kind" });
            mDatabase.createObjectStore("marker", { keyPath: "time" });
            mDatabase.createObjectStore("line", { keyPath: "price" });
            resolve();
        };
        request.onsuccess = e => {
            console.log("onsuccess");
            mDatabase = e.target.result;
            resolve();
        };
        request.onerror = () => {
            console.log("onerror");
            location.reload();
            reject();
        };
    });
}

function connectSocket() {
    var ws = new WebSocket(mConfig.endpoint.socket);
    ws.onopen = function(e) {
        ws.send(`d|st|C001|${mConfig.symbol}`);
    };
    ws.onclose = function(e) {
        // console.log("ws-close", e);
        if (refreshDataInSession()) connectSocket();
    };
    ws.onmessage = function(e) {
        const t = e.data.split("|");
        if (t[0] == "C001") {
            if (mChart.data.hasOwnProperty("original")) {
                mConfig.hasNewData = true;
                // console.log("ws-message", e.data);
                const message = proto.tcbs.BuySellActivePojo.deserializeBinary(
                    base64ToArrayUnit8(t[2])
                ).toObject();
                // console.log("message: ", message);
                const param = {
                    time: message.timesec,
                    price: message.closeprice,
                    volume: message.closevol,
                    action: message.action
                };
                mChart.data = createChartData(mChart.data, param);
                const lastPrice = mChart.data.price.slice(-1)[0];
                const lastShark = mChart.data.shark.slice(-1)[0];
                //
                if (mConfig.timeFrame > 0) {
                    mChart.series.price.setData(mChart.data.price);
                    mChart.series.shark.setData(mChart.data.shark);
                } else {
                    mChart.series.price.update(lastPrice);
                    mChart.series.shark.update(lastShark);
                }
                if (!mConfig.hasCrosshair) {
                    updateLegend(lastPrice.value, lastShark.value);
                }
                //
                setLocalData("data", param);
                mChart.data.original.push(param);
            }
        }
    };
    ws.onerror = function(e) {
        console.log("ws-error", e);
    };

    function base64ToArrayUnit8(g) {
        for (
            var p = window.atob(g), r = p.length, h = new Uint8Array(r), A = 0;
            A < r;
            A++
        )
            h[A] = p.charCodeAt(A);
        return h;
    }
}

function loadPage() {
    getData().then(async () => {
        const order = await getLocalData("order");
        order.map(item => {
            mChart.order.side = item.side;
            mChart.order[item.kind].price = item.price;
            drawOrderLine(item.kind);
            if (item.kind == "entry") {
                if (getOrderPosition()) {
                    mChart.order.entry.line.applyOptions({
                        draggable: false
                    });
                }
                showCancelOrderButton();
            }
        });
        //
        const lines = await getLocalData("line");
        lines.forEach(line => {
            line.price = +line.price;
            mChart.lines.push(mChart.series.price.createPriceLine(line));
        });
        //
        mChart.markers = await getLocalData("marker");
        mChart.series.price.setMarkers(mChart.markers);
        mNotify.close();
        document.getElementById("lineButton").click();
    });
    //
    document.getElementById("sohopdong").value = mConfig.contractNumber;
    document.getElementById("right_price").value = "MTL";
}

function intervalHandler() {
    mConfig.currentTime = moment().unix();
    //
    // Auto order TP/SL and close order position
    if (getOrderPosition()) {
        if (
            mChart.order.entry.hasOwnProperty("line") &&
            !mChart.order.tp.hasOwnProperty("line")
        ) {
            orderTpPrice(true);
            orderSlPrice(true);
            mChart.order.entry.line.applyOptions({
                draggable: false
            });
            pushNotify("success", "Đã mở vị thế.");
        }
    } else {
        if (mChart.order.tp.hasOwnProperty("line")) {
            cancelOrder();
            pushNotify("success", "Đã đóng vị thế.");
        }
    }
    // Begin Socket
    if (mConfig.currentTime == mConfig.time.start) connectSocket();
    // Report
    if (mConfig.currentTime == mConfig.time.end) reportHandler();
    //
    showRunningStatus();
}

function getData() {
    return new Promise(async (resolve, reject) => {
        toggleSpinner(true);
        const svData = await getServerData();
        start: while (true) {
            mConfig.hasNewData = false;
            const lcData = await getLocalData("data");
            const ids = new Set(svData.map(d => d.time));
            const data = [
                ...svData,
                ...lcData.filter(d => !ids.has(d.time))
            ].sort((a, b) => a.time - b.time);
            // console.log("data", data);
            if (mConfig.hasNewData) continue start;
            clearLocalData("data").then(() => setLocalData("data", data));
            //
            mChart.data = data.reduce((r, item) => createChartData(r, item), {
                original: [],
                price: [],
                shark: []
            });
            //
            mChart.series.price.setData(mChart.data.price);
            mChart.series.shark.setData(mChart.data.shark);
            //
            if (!mConfig.hasCrosshair && !!mChart.data.original.length) {
                updateLegend(
                    mChart.data.price.slice(-1)[0].value,
                    mChart.data.shark.slice(-1)[0].value
                );
            }
            //
            toggleSpinner(false);
            resolve();
            break;
        }
    });
}

function createChartData(r, item) {
    var time = item.time + 7 * 60 * 60;
    const prevShark = !!r.shark.length ? r.shark.slice(-1)[0].value : 0;
    const volume = (item.action == "BU" ? 1 : -1) * item.volume;
    if (mConfig.timeFrame > 0) {
        const period = 60 * mConfig.timeFrame;
        const timeIndex = Math.floor(time / period);
        var isSameTime = false;
        if (!!r.price.length) {
            const prevTime = r.price.slice(-1)[0].time;
            if (timeIndex == Math.floor(prevTime / period)) isSameTime = true;
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
        value: prevShark + (item.volume > mConfig.sharkLimit ? volume : 0)
    });
    //
    return r;
}

function getServerData() {
    return new Promise(async (resolve, reject) => {
        const date = document.getElementById("dateInput").value;
        const data = { action: "GET", date: date };
        const url = mConfig.root + mConfig.endpoint.data;
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
}

function setServerData(data) {
    data.action = "SET";
    data.time = data.time.format("YYYY-MM-DD HH:mm:ss");
    const url = mConfig.root + mConfig.endpoint.data;
    toggleSpinner(true);
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(() => toggleSpinner(false));
}

function clearServerData() {
    return new Promise((resolve, reject) => {
        var data = { action: "CLEAR" };
        const url = mConfig.root + mConfig.endpoint.data;
        toggleSpinner(true);
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            toggleSpinner(false);
            resolve();
        });
    });
}

function getLocalData(tables) {
    return new Promise(function(resolve, reject) {
        var tx = mDatabase.transaction(tables, "readonly");
        if (Array.isArray(tables)) {
            var stores = tables.map(table => tx.objectStore(table));
            var promises = stores.map(loadStore);
            Promise.all(promises).then(arr => resolve(arr));
        } else {
            var store = tx.objectStore(tables);
            loadStore(store).then(d => resolve(d));
        }
    });

    function loadStore(store) {
        return new Promise(function(resolve, reject) {
            const request = store.getAll();
            request.onsuccess = e => resolve(e.target.result);
            request.onerror = () => reject();
        });
    }
}

function setLocalData(table, data) {
    const store = mDatabase.transaction(table, "readwrite").objectStore(table);
    if (Array.isArray(data)) {
        if (data.length > 0) data.forEach(item => store.put(item));
    } else store.put(data);
}

function clearLocalData(table) {
    return new Promise(function(resolve, reject) {
        const request = mDatabase
            .transaction(table, "readwrite")
            .objectStore(table)
            .clear();

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = err => {
            console.error(`Error to empty Object Store: ${table}`);
            reject();
        };
    });
}

function reportHandler() {
    if (mConfig.isOpeningMarket && !mConfig.isReportedResult) {
        mConfig.isReportedResult = true;
        toggleSpinner(true);
        const url = mConfig.root + mConfig.endpoint.report;
        const data = {
            revenue: +document
                .getElementById("vmAccInfo")
                .innerText.replaceAll(",", ""),
            fees: +document
                .getElementById("othersAccInfo")
                .innerText.replaceAll(",", "")
        };
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(jsondata => {
                console.log("Report-Start ##############################");
                console.log(jsondata);
                console.log("Report-End ##############################");
                mConfig.isReportedResult = jsondata.isOk;
                if (jsondata.isOk) {
                    if (jsondata.isExecuted)
                        pushNotify("success", "Báo cáo đã gửi thành công.");
                    else pushNotify("warning", "Đã gửi báo cáo");
                }
                //
                toggleSpinner(false);
            })
            .catch(error => {
                mConfig.isReportedResult = false;
                console.log("Report-Start ##############################");
                console.log(error);
                console.log("Report-End ##############################");
                pushNotify("error", "Gửi báo cáo thất bại");
                toggleSpinner(false);
            });
    }
}

function toggleSpinner(status) {
    var img = document.getElementById("spinnerImg");
    img.style.opacity = status ? 1 : 0;
}

function showRunningStatus() {
    var button = document.getElementById("lineButton");
    if (button.classList.contains("dark")) button.classList.remove("dark");
    else button.classList.add("dark");
}

function orderEntryPrice() {
    callScript("onCancelAllOrderPending('order_condition')");
    drawOrderLine("entry");
    document.getElementById("select_condition_order_wrapper").click();
    document.getElementById("right_stopOrderIndex").value =
        mChart.order.entry.price;
    document.getElementById("right_price").value = "MTL";
    document.getElementById("right_selStopOrderType").value =
        mChart.order.side > 0 ? "SOL" : "SOU";
    //
    showCancelOrderButton();
    setTimeout(() => {
        document
            .getElementById(`btn_${mChart.order.side > 0 ? "long" : "short"}`)
            .click();
    }, 1000);
}

function orderTpPrice(isInit = false) {
    callScript("onCancelAllOrderPending('order')");
    if (isInit)
        mChart.order.tp.price =
            +mChart.order.entry.price + mChart.order.side * 3;
    drawOrderLine("tp");
    setTimeout(() => {
        document.getElementById("select_normal_order_wrapper").click();
        document.getElementById("right_price").value = mChart.order.tp.price;
        document
            .getElementById(`btn_${mChart.order.side < 0 ? "long" : "short"}`)
            .click();
    }, 1000);
}

function orderSlPrice(isInit = false) {
    callScript("onCancelAllOrderPending('order_condition')");
    if (isInit)
        mChart.order.sl.price =
            +mChart.order.entry.price - mChart.order.side * 2;
    drawOrderLine("sl");
    setTimeout(() => {
        document.getElementById("select_condition_order_wrapper").click();
        document.getElementById("right_stopOrderIndex").value =
            mChart.order.sl.price;
        document.getElementById("right_price").value = "MTL";
        document.getElementById("right_selStopOrderType").value =
            mChart.order.side < 0 ? "SOL" : "SOU";
        document
            .getElementById(`btn_${mChart.order.side < 0 ? "long" : "short"}`)
            .click();
    }, 1000);
}

function cancelOrder() {
    document.getElementById("cancelOrderButton").style.display = "none";
    callScript("onCancelAllOrderPending('order_condition')");
    callScript("onCancelAllOrderPending('order')");
    removeOrderLine("entry");
    removeOrderLine("tp");
    removeOrderLine("sl");
    clearLocalData("order");
}

function closePosition() {
    const position = getOrderPosition();
    if (position) {
        document.getElementById("select_normal_order_wrapper").click();
        document.getElementById("right_price").value = "MTL";
        document.getElementById("sohopdong").value = Math.abs(position);
        document
            .getElementById(`btn_${position > 0 ? "short" : "long"}`)
            .click();
    }
}

function drawOrderLine(kind) {
    if (mChart.order[kind].hasOwnProperty("line")) {
        mChart.order[kind].line.applyOptions({
            price: mChart.order[kind].price
        });
    } else {
        var color, title;
        switch (kind) {
            case "entry":
                color = "silver";
                title = `${mChart.order.side > 0 ? "Long" : "Short"} Entry`;
                break;
            case "tp":
                color = "lime";
                title = "Take Profit";
                break;
            case "sl":
                color = "red";
                title = "Stop Loss";
                break;
        }
        mChart.order[kind].line = mChart.series.price.createPriceLine({
            type: "order",
            kind: kind,
            price: mChart.order[kind].price,
            color: color,
            lineWidth: 1,
            lineStyle: LightweightCharts.LineStyle.Solid,
            title: title,
            draggable: true
        });
    }
    setLocalData("order", {
        kind: kind,
        price: +mChart.order[kind].price,
        side: mChart.order.side
    });
}
function removeOrderLine(kind) {
    if (mChart.order[kind].hasOwnProperty("line")) {
        mChart.series.price.removePriceLine(mChart.order[kind].line);
        delete mChart.order[kind].line;
    }
}

function removeOrderButton() {
    document.getElementById("entryOrderButton").style.display = "none";
    document.getElementById("tpslOrderButton").style.display = "none";
}

function showCancelOrderButton() {
    var btn = document.getElementById("cancelOrderButton");
    btn.style.display = "block";
    btn.style.background = mChart.order.side > 0 ? "green" : "red";
}

function pushNotify(status = "success", text = "test", autoclose = true) {
    return new Notify({
        status: status,
        text: text,
        autoclose: autoclose,
        position: "right bottom"
    });
}

function getOrderPosition() {
    const el = document.querySelector(
        `#danhmuc_${mConfig.symbol} > td:nth-child(2)`
    );
    if (!el) return 0;
    const position = el.innerText;
    if (isNaN(position)) return 0;
    else return +position;
}

function callScript(script) {
    var button = document.createElement("button");
    button.setAttribute("onclick", script);
    button.click();
}

function updateLegend(price, shark) {
    if (!!price) document.getElementById("priceLegendP").innerText = price;
    if (!!shark)
        document.getElementById(
            "sharkLegendP"
        ).innerText = shark.toLocaleString("en-US");
}

function refreshDataInSession() {
    if (
        mConfig.currentTime >= mConfig.time.start &&
        mConfig.currentTime <= mConfig.time.end
    ) {
        getData();
        return true;
    }
    return false;
}

function coordinateToPrice(y) {
    return formatPrice(mChart.series.price.coordinateToPrice(y));
}

function formatPrice(price) {
    return mChart.self.priceScale("right").formatPrice(+price);
}
