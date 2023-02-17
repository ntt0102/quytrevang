var mConfig = {};
var mChart = {
    object: {},
    series: {},
    data: {},
    order: { entry: {}, tp: {}, sl: {} },
    crosshair: {}
};
var mDatabase = {};

getLocalConfig()
    .then(() => getServerConfig())
    .then(() => {
        createButtons();
        createLightWeightChart();
        registerEvent();
        createIndexedDB().then(() => {
            connectSocket();
            loadPage();
            setInterval(intervalHandler, 1000);
            setInterval(refreshDataEveryMinute, 60000);
        });
    });

function getLocalConfig() {
    return new Promise((resolve, reject) => {
        const file = chrome.runtime.getURL("config.json");
        fetch(file)
            .then(response => response.json())
            .then(json => {
                mConfig = json;
                mConfig.isReportedResult = false;
                mConfig.currentDate = moment().format("YYYY-MM-DD");
                mConfig.currentTime = moment().format("HH:mm:ss");
                setTimeout(() => {
                    mConfig.VN30F1M = document.getElementById(
                        "tbodyPhaisinhContent"
                    ).rows[0].cells[0].innerText;
                    resolve();
                }, 1000);
                console.log("mConfig", mConfig);
            })
            .catch(() => {
                console.log(err);
                var choice = confirm("Get config error. Refresh now?");
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
            body: JSON.stringify({ VN30F1M: mConfig.VN30F1M })
        })
            .then(response => response.json())
            .then(json => {
                console.log("getServerConfig", json);
                mConfig.isOpeningMarket = json.isOpeningMarket;
                mConfig.contractNumber = json.contractNumber;
                mConfig.time = { ...mConfig.time, ...json.time };
                //
                const celPrice = +document.getElementById(
                    `${mConfig.VN30F1M}cel`
                ).innerText;
                const escrow = (celPrice * 0.1 * 0.17) / 0.8;
                mConfig.sheepLimit = parseInt(800 / escrow);
                mConfig.sharkLimit = parseInt(2000 / escrow);
                console.log("mConfig.sheepLimit: ", mConfig.sheepLimit);
                console.log("mConfig.sharkLimit: ", mConfig.sharkLimit);
                //
                mConfig.hasCrosshair = false;
                mConfig.bidPrice = 0;
                mConfig.askPrice = 0;
                //
                resolve();
            })
            .catch(err => {
                console.log(err);
                var choice = confirm("Get config error. Refresh now?");
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

function createLightWeightChart() {
    var div = document.createElement("div");
    div.id = "lightWeightChart";
    div.style.width = "100vw";
    div.style.height = "100vh";
    div.addEventListener("contextmenu", e => {
        e.preventDefault();
        showOrderButton();
    });
    document.body.append(div);
    //
    var select = document.createElement("select");
    select.id = "timeFrameSelect";
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
        getData().then(() => mChart.object.timeScale().resetTimeScale());
    });
    div.append(select);
    //
    var input = document.createElement("input");
    input.id = "dateInput";
    input.type = "date";
    input.addEventListener("change", e => {
        if (!!e.target.value) getData(e.target.value);
    });
    div.append(input);
    //
    var button = document.createElement("button");
    button.id = "refreshButton";
    button.innerText = "R";
    button.title = "Refresh chart";
    button.addEventListener("click", () => getData());
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "clearButton";
    button.innerText = "C";
    button.title = "Delete local data";
    button.addEventListener("click", () => {
        clearLocalData("data");
        getData();
    });
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "cancelOrderButton";
    button.innerText = "X";
    button.style.display = "none";
    button.addEventListener("click", cancelOrder);
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "entryOrderButton";
    button.innerText = "Entry";
    button.style.display = "none";
    button.addEventListener("click", () => {
        orderEntryPrice();
        removeOrderButton();
    });
    div.append(button);
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
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "scrollButton";
    button.innerText = "≫";
    button.addEventListener("click", () =>
        mChart.object.timeScale().scrollToRealTime()
    );
    div.append(button);
    //
    var img = document.createElement("img");
    img.id = "spinnerImg";
    img.style.opacity = 0;
    img.src = chrome.runtime.getURL("spinner.gif");
    div.append(img);
    //
    var p = document.createElement("p");
    p.id = "priceLegendP";
    p.addEventListener("click", () => {
        mChart.series.price.applyOptions({
            visible: !mChart.series.price.options().visible
        });
        removeOrderButton();
    });
    div.append(p);
    //
    p = document.createElement("p");
    p.id = "sharkLegendP";
    p.addEventListener("click", () => {
        mChart.series.shark.applyOptions({
            visible: !mChart.series.shark.options().visible
        });
    });
    div.append(p);
    //
    p = document.createElement("p");
    p.id = "wolfLegendP";
    p.addEventListener("click", () => {
        mChart.series.wolf.applyOptions({
            visible: !mChart.series.wolf.options().visible
        });
    });
    div.append(p);
    //
    p = document.createElement("p");
    p.id = "sheepLegendP";
    p.addEventListener("click", () => {
        mChart.series.sheep.applyOptions({
            visible: !mChart.series.sheep.options().visible
        });
    });
    div.append(p);
    //
    const chartOptions = {
        localization: { dateFormat: "dd/MM/yyyy", locale: "vi-VN" },
        rightPriceScale: {
            visible: true,
            scaleMargins: { top: 0, bottom: 0.5 }
        },
        leftPriceScale: { visible: false },
        layout: {
            backgroundColor: "#131722",
            textColor: "#d1d4dc",
            lineColor: "#2B2B43"
        },
        grid: {
            vertLines: { color: "#2B2B43" },
            horzLines: { color: "#363C4E" }
        },
        crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
        timeScale: { timeVisible: true, rightOffset: 20, minBarSpacing: 0.1 }
    };
    mChart.object = LightweightCharts.createChart(div, chartOptions);
    //
    mChart.object.subscribeClick(removeOrderButton);
    mChart.object.subscribeCrosshairMove(crosshairMove);
    mChart.object.subscribeCustomPriceLineDragged(priceLineDrag);
    //
    mChart.series.sheep = mChart.object.addLineSeries({
        priceScaleId: "sheep",
        color: "#00FFFF",
        priceFormat: { minMove: 1 },
        scaleMargins: { top: 0.5, bottom: 0 }
    });
    mChart.series.wolf = mChart.object.addLineSeries({
        priceScaleId: "wolf",
        color: "#FFFF00",
        priceFormat: { minMove: 1 },
        scaleMargins: { top: 0.5, bottom: 0 }
    });
    mChart.series.shark = mChart.object.addLineSeries({
        priceScaleId: "shark",
        color: "#FF00FF",
        priceFormat: { minMove: 1 },
        scaleMargins: { top: 0.5, bottom: 0 }
    });
    mChart.series.price = mChart.object.addLineSeries({
        color: "white",
        priceFormat: { minMove: 0.1 }
    });

    mChart.object.timeScale().fitContent();

    function crosshairMove(e) {
        if (e.time) {
            mConfig.hasCrosshair = true;
            updateLegend(
                e.seriesPrices.get(mChart.series.price),
                e.seriesPrices.get(mChart.series.shark),
                e.seriesPrices.get(mChart.series.wolf),
                e.seriesPrices.get(mChart.series.sheep)
            );
        } else mConfig.hasCrosshair = false;
        if (e.point != undefined) {
            mChart.crosshair.x = e.point.x;
            mChart.crosshair.y = e.point.y;
        }
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
                const price = mChart.object
                    .priceScale("right")
                    .formatPrice(
                        mChart.series.price.coordinateToPrice(
                            mChart.crosshair.y
                        )
                    );
                const side = price >= mChart.data.price.slice(-1)[0].value;
                var btn = document.getElementById("entryOrderButton");
                mChart.order.entry.price = price;
                mChart.order.side = side;
                btn.style.left = +(mChart.crosshair.x + 10) + "px";
                btn.style.top = +(mChart.crosshair.y + 10) + "px";
                btn.style.background = side ? "green" : "red";
                btn.innerText = `Entry ${price}`;
                btn.style.display = "block";
            }
        }
    }

    function priceLineDrag(e) {
        const line = e.customPriceLine.options();
        mChart.order[line.kind].price = mChart.object
            .priceScale("right")
            .formatPrice(line.price);
        switch (line.kind) {
            case "entry":
                // if (getOrderPosition()) {
                //     mChart.order[line.kind].line.applyOptions({
                //         price: e.fromPriceString
                //     });
                //     pushNotify("warning", "Không được thay đổi lệnh đã khớp.");
                // } else
                orderEntryPrice();
                break;
            case "tp":
                orderTpPrice();
                break;
            case "sl":
                orderSlPrice();
                break;
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
        var currentPrice = document.getElementById(`${mConfig.VN30F1M}pri`)
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
        mChart.object.resize(window.innerWidth, window.innerHeight);
    }

    function zoomChart(event) {
        if (event.ctrlKey || event.metaKey) {
            if (event.shiftKey) {
                if (event.keyCode == 39)
                    mChart.object.timeScale().scrollToRealTime();
            } else {
                if (event.keyCode == 38) {
                    const options = mChart.object.options();
                    mChart.object.timeScale().applyOptions({
                        barSpacing: options.timeScale.barSpacing + 0.1
                    });
                } else if (event.keyCode == 40) {
                    const options = mChart.object.options();
                    if (
                        options.timeScale.barSpacing >
                        options.timeScale.minBarSpacing
                    )
                        mChart.object.timeScale().applyOptions({
                            barSpacing: options.timeScale.barSpacing - 0.1
                        });
                } else if (event.keyCode == 37) {
                    const position = mChart.object.timeScale().scrollPosition();
                    mChart.object.timeScale().scrollToPosition(position - 10);
                } else if (event.keyCode == 39) {
                    const position = mChart.object.timeScale().scrollPosition();
                    mChart.object.timeScale().scrollToPosition(position + 10);
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
    var msg = { action: "join", list: mConfig.VN30F1M };
    var socket = io(mConfig.endpoint.socket);
    socket.on("connect", () => socket.emit("regs", JSON.stringify(msg)));
    socket.on("reconnect", () => {
        socket.emit("regs", JSON.stringify(msg));
        getData();
    });
    socket.on("boardps", data => bidAskHandler(data.data));
    socket.on("stockps", data => priceHandler(data.data));

    function priceHandler(data) {
        if (data.id == 3220) {
            // console.log("price" + data.id);
            if (!!mConfig.bidPrice && !!mConfig.askPrice) {
                var side = "";
                if (data.lastPrice <= mConfig.bidPrice) side = "SD";
                else if (data.lastPrice >= mConfig.askPrice) side = "BU";
                else if (mChart.data.original.length > 0)
                    side = mChart.data.original.slice(-1)[0].side;
                //
                if (side != "") {
                    var param = {
                        time: `${mConfig.currentDate} ${data.time}`,
                        price: data.lastPrice,
                        vol: data.lastVol,
                        side: side
                    };
                    mChart.data = createChartData(mChart.data, param);
                    var lastPrice = mChart.data.price.slice(-1)[0];
                    var lastShark = mChart.data.shark.slice(-1)[0];
                    var lastWolf = mChart.data.wolf.slice(-1)[0];
                    var lastSheep = mChart.data.sheep.slice(-1)[0];
                    //
                    if (mConfig.timeFrame > 0) {
                        mChart.series.price.setData(mChart.data.price);
                        mChart.series.shark.setData(mChart.data.shark);
                        mChart.series.wolf.setData(mChart.data.wolf);
                        mChart.series.sheep.setData(mChart.data.sheep);
                    } else {
                        mChart.series.price.update(lastPrice);
                        mChart.series.shark.update(lastShark);
                        mChart.series.wolf.update(lastWolf);
                        mChart.series.sheep.update(lastSheep);
                    }
                    if (!mConfig.hasCrosshair) {
                        updateLegend(
                            lastPrice.value,
                            lastShark.value,
                            lastWolf.value,
                            lastSheep.value
                        );
                    }
                    //
                    setLocalData("data", param);
                    mChart.data.original.push(param);
                }
            }
        }
    }

    function bidAskHandler(data) {
        if (data.id == 3210) {
            var arr = data.g1.split("|");
            if (data.side == "B") mConfig.bidPrice = +arr[0];
            else mConfig.askPrice = +arr[0];
        }
    }
}

function loadPage() {
    getData().then(() => {
        getLocalData("order").then(data =>
            data.map(item => {
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
            })
        );
    });
    //
    document.getElementById("sohopdong").value = mConfig.contractNumber;
    document.getElementById("right_price").value = "MTL";
}

function intervalHandler() {
    mConfig.currentTime = moment(
        `${mConfig.currentDate} ${
            document.querySelector(".timeStamp").innerText
        }`,
        "YYYY-MM-DD H:mm:ss"
    ).format("HH:mm:ss");
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
    // Report
    if (mConfig.currentTime == mConfig.time.end) reportHandler();
    //
    showRunningStatus();
}

function refreshDataEveryMinute() {
    if (
        mConfig.currentTime >= mConfig.time.start &&
        mConfig.currentTime <= mConfig.time.end
    )
        getData();
}

function getData() {
    return new Promise((resolve, reject) => {
        toggleSpinner(true);
        Promise.all([getServerData(), getLocalData("data")])
            .then(arr => {
                console.log("getData: ", arr);
                var ids = new Set(arr[0].map(d => d.time));
                var data = [
                    ...arr[0],
                    ...arr[1].filter(d => !ids.has(d.time))
                ].sort((a, b) => a.time.localeCompare(b.time));
                console.log("data", data);
                //
                clearLocalData("data").then(() => setLocalData("data", data));
                //
                mChart.data = data.reduce(
                    (r, item) => {
                        return createChartData(r, item);
                    },
                    {
                        original: [],
                        price: [],
                        shark: [],
                        wolf: [],
                        sheep: []
                    }
                );
                console.log(
                    "chartData",
                    JSON.parse(JSON.stringify(mChart.data))
                );
                //
                mChart.series.price.setData(mChart.data.price);
                mChart.series.shark.setData(mChart.data.shark);
                mChart.series.wolf.setData(mChart.data.wolf);
                mChart.series.sheep.setData(mChart.data.sheep);
                //
                toggleSpinner(false);
                resolve();
            })
            .catch(error => {
                console.log(error);
                toggleSpinner(false);
                resolve();
            });
    });
}

function createChartData(r, item) {
    var time = moment(item.time)
        .add(7, "hours")
        .unix();
    var prevShark = !!r.shark.length ? r.shark.slice(-1)[0].value : 0;
    var prevWolf = !!r.wolf.length ? r.wolf.slice(-1)[0].value : 0;
    var prevSheep = !!r.sheep.length ? r.sheep.slice(-1)[0].value : 0;
    var volume = (item.side == "BU" ? 1 : -1) * item.vol;
    if (mConfig.timeFrame > 0) {
        var period = 60 * mConfig.timeFrame;
        var timeIndex = Math.floor(time / period);
        var isSameTime = false;
        if (!!r.price.length) {
            var prevTime = r.price.slice(-1)[0].time;
            if (timeIndex == Math.floor(prevTime / period)) isSameTime = true;
        }
        if (isSameTime) {
            r.price.pop();
            r.shark.pop();
            r.wolf.pop();
            r.sheep.pop();
        }
        time = timeIndex * period;
    }
    r.original.push(item);
    r.price.push({ time: time, value: item.price });
    r.shark.push({
        time: time,
        value: prevShark + (item.vol > mConfig.sharkLimit ? volume : 0)
    });
    r.wolf.push({
        time: time,
        value:
            prevWolf +
            (item.vol >= mConfig.sheepLimit && item.vol <= mConfig.sharkLimit
                ? volume
                : 0)
    });
    r.sheep.push({
        time: time,
        value: prevSheep + (item.vol < mConfig.sheepLimit ? volume : 0)
    });
    //
    return r;
}

function getServerData() {
    return new Promise((resolve, reject) => {
        const date = document.getElementById("dateInput").value;
        const data = { action: "GET", date: date };
        const url = mConfig.root + mConfig.endpoint.data;
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(() => getServerData());
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
            console.log(`Object Store "${table}" emptied`);
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
                .innerText.replaceAll(",", ""),
            scores: +document.getElementById(`${mConfig.VN30F1M}ref`).innerText
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
    document.getElementById("right_selStopOrderType").value = mChart.order.side
        ? "SOL"
        : "SOU";
    //
    showCancelOrderButton();
    setTimeout(() => {
        document
            .getElementById(`btn_${mChart.order.side ? "long" : "short"}`)
            .click();
    }, 1000);
}

function orderTpPrice(isInit = false) {
    callScript("onCancelAllOrderPending('order')");
    if (isInit)
        mChart.order.tp.price =
            +mChart.order.entry.price + (mChart.order.side ? 1 : -1) * 3;
    drawOrderLine("tp");
    setTimeout(() => {
        document.getElementById("select_normal_order_wrapper").click();
        document.getElementById("right_price").value = mChart.order.tp.price;
        document
            .getElementById(`btn_${!mChart.order.side ? "long" : "short"}`)
            .click();
    }, 1000);
}

function orderSlPrice(isInit = false) {
    callScript("onCancelAllOrderPending('order_condition')");
    if (isInit)
        mChart.order.sl.price =
            +mChart.order.entry.price + (mChart.order.side ? -1 : 1) * 2;
    drawOrderLine("sl");
    setTimeout(() => {
        document.getElementById("select_condition_order_wrapper").click();
        document.getElementById("right_stopOrderIndex").value =
            mChart.order.sl.price;
        document.getElementById("right_price").value = "MTL";
        document.getElementById("right_selStopOrderType").value = !mChart.order
            .side
            ? "SOL"
            : "SOU";
        document
            .getElementById(`btn_${!mChart.order.side ? "long" : "short"}`)
            .click();
    }, 1000);
}

function cancelOrder() {
    if (!getOrderPosition()) {
        callScript("onCancelAllOrderPending('order_condition')");
        callScript("onCancelAllOrderPending('order')");
        document.getElementById("cancelOrderButton").style.display = "none";
        removeOrderLine("entry");
        removeOrderLine("tp");
        removeOrderLine("sl");
        clearLocalData("order");
    } else pushNotify("warning", "Không thể huỷ lệnh đang mở.");
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
                title = `${mChart.order.side ? "Long" : "Short"} Entry`;
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
    btn.style.background = mChart.order.side ? "green" : "red";
}

function pushNotify(status = "success", text = "test") {
    new Notify({
        status: status,
        text: text,
        autoclose: true,
        position: "right bottom"
    });
}

function getOrderPosition() {
    const el = document.querySelector(
        `#danhmuc_${mConfig.VN30F1M} > td:nth-child(2)`
    );
    if(!el) return 0;
    const position = el.innerText;
    if (isNaN(position)) return 0;
    else return +position;
}

function callScript(script) {
    var button = document.createElement("button");
    button.setAttribute("onclick", script);
    button.click();
}

function updateLegend(price, shark, wolf, sheep) {
    if (!!price) document.getElementById("priceLegendP").innerText = price;
    if (!!shark)
        document.getElementById(
            "sharkLegendP"
        ).innerText = shark.toLocaleString("en-US");
    if (!!wolf)
        document.getElementById("wolfLegendP").innerText = wolf.toLocaleString(
            "en-US"
        );
    if (!!sheep)
        document.getElementById(
            "sheepLegendP"
        ).innerText = sheep.toLocaleString("en-US");
}
