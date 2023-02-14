var mConfig = {};
var mChart = {
    object: {},
    series: {},
    data: {},
    order: { entry: {}, tp: {}, sl: {} },
    crosshair: {},
    line: {}
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
                //
                mConfig.hasSharkOrder = false;
                mConfig.hasSheepOrder = false;
                mConfig.hasCrosshair = false;
                //
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
    button.id = "priceCancelButton";
    button.innerText = "X";
    button.style.display = "none";
    button.addEventListener("click", () => {
        document.getElementById("btn_cancel_all_order_condition").click();
        document.getElementById("priceCancelButton").style.display = "none";
        removeOrderLine("price");
    });
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "sharkCancelButton";
    button.innerText = "X";
    button.style.display = "none";
    button.addEventListener("click", cancelSharkOrder);
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "sheepCancelButton";
    button.innerText = "X";
    button.style.display = "none";
    button.addEventListener("click", cancelSheepOrder);
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
    button.id = "priceLongButton";
    button.classList.add("price-order-button");
    button.style.background = "green";
    button.innerText = "↗";
    button.style.display = "none";
    button.addEventListener("click", () => orderByPrice(true));
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "priceShortButton";
    button.classList.add("price-order-button");
    button.style.background = "red";
    button.innerText = "↘";
    button.style.display = "none";
    button.addEventListener("click", () => orderByPrice(false));
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "sharkOrderButton";
    button.innerText = "Order?";
    button.style.display = "none";
    button.addEventListener("click", orderByShark);
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "sheepOrderButton";
    button.innerText = "Order?";
    button.style.display = "none";
    button.addEventListener("click", orderBySheep);
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
        removeOrderButton();
    });
    div.append(p);
    //
    p = document.createElement("p");
    p.id = "sheepLegendP";
    p.addEventListener("click", () => {
        mChart.series.sheep.applyOptions({
            visible: !mChart.series.sheep.options().visible
        });
        removeOrderButton();
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
    // if (navigator.userAgentData.mobile)
    //     mChart.object.subscribeCrosshairMove(showOrderButton);
    // else mChart.object.subscribeClick(showOrderButton);
    //
    mChart.object.subscribeClick(removeOrderButton);
    mChart.object.subscribeCrosshairMove(crosshairMove);
    mChart.object.subscribeCustomPriceLineDragged(priceLineDrag);
    //
    mChart.series.shark = mChart.object.addLineSeries({
        priceScaleId: "shark",
        color: "#FF00FF",
        priceFormat: { minMove: 1 },
        scaleMargins: { top: 0.5, bottom: 0 }
    });
    mChart.series.sheep = mChart.object.addLineSeries({
        priceScaleId: "sheep",
        color: "#00FFFF",
        priceFormat: { minMove: 1 },
        scaleMargins: { top: 0.5, bottom: 0 }
    });
    mChart.series.price = mChart.object.addLineSeries({
        color: "#FFFF00",
        priceFormat: { minMove: 0.1 }
    });

    mChart.object.timeScale().fitContent();

    function crosshairMove(e) {
        if (e.time) {
            mConfig.hasCrosshair = true;
            const price = e.seriesPrices.get(mChart.series.price);
            if (!!price)
                document.getElementById("priceLegendP").innerText = price;
            //
            const shark = e.seriesPrices.get(mChart.series.shark);
            if (!!shark)
                document.getElementById(
                    "sharkLegendP"
                ).innerText = shark.toLocaleString("en-US");
            //
            const sheep = e.seriesPrices.get(mChart.series.sheep);
            if (!!sheep)
                document.getElementById(
                    "sheepLegendP"
                ).innerText = sheep.toLocaleString("en-US");
        } else mConfig.hasCrosshair = false;
        if (e.point != undefined) {
            mChart.crosshair.x = e.point.x;
            mChart.crosshair.y = e.point.y;
        }
    }

    function showOrderButton() {
        const position = getOrderPosition();
        // if (!!position) {
        const price = mChart.object
            .priceScale("right")
            .formatPrice(
                mChart.series.price.coordinateToPrice(mChart.crosshair.y)
            );
        const side = price >= mChart.data.price.slice(-1)[0].value;
        if (mChart.order.entry.hasOwnProperty("line")) {
            if (!mChart.order.tp.hasOwnProperty("line")) {
                var btn = document.getElementById("tpslOrderButton");
                btn.style.left = +(mChart.crosshair.x + 10) + "px";
                btn.style.top = +(mChart.crosshair.y + 10) + "px";
                btn.style.display = "block";
            }
        } else {
            var btn = document.getElementById("entryOrderButton");
            mChart.order.entry.price = price;
            mChart.order.side = side;
            btn.style.left = +(mChart.crosshair.x + 10) + "px";
            btn.style.top = +(mChart.crosshair.y + 10) + "px";
            btn.style.background = side ? "green" : "red";
            btn.innerText = `Entry ${price}`;
            btn.style.display = "block";
        }
        // }

        // var priceLongBtn = document.getElementById("priceLongButton");
        // var priceShortBtn = document.getElementById("priceShortButton");
        // // var sharkBtn = document.getElementById("sharkOrderButton");
        // // var sheepBtn = document.getElementById("sheepOrderButton");
        // if (e.time) {
        //     if (mChart.series.price.options().visible) {
        //         const price = e.seriesPrices.get(mChart.series.price);
        //         priceLongBtn.style.left = +(e.point.x - 41) + "px";
        //         priceLongBtn.style.top = +(e.point.y - 60) + "px";
        //         priceLongBtn.style.display = "block";
        //         //
        //         priceShortBtn.style.left = +(e.point.x - 41) + "px";
        //         priceShortBtn.style.top = +(e.point.y - 20) + "px";
        //         priceShortBtn.style.display = "block";
        //         mChart.order.price = { value: price };
        //     }
        //     //
        //     // if (mChart.series.shark.options().visible) {
        //     //     const shark = e.seriesPrices.get(mChart.series.shark);
        //     //     sharkBtn.style.left = +(e.point.x - 41) + "px";
        //     //     sharkBtn.style.top = +(e.point.y - 80) + "px";
        //     //     sharkBtn.style.display = "block";
        //     //     mChart.order.shark = {
        //     //         value: shark,
        //     //         type: shark >= mChart.data.shark.slice(-1)[0].value
        //     //     };
        //     //     sharkBtn.innerText = mChart.order.shark.type ? "↗" : "↘";
        //     // }
        //     //
        //     // if (mChart.series.sheep.options().visible) {
        //     //     const sheep = e.seriesPrices.get(mChart.series.sheep);
        //     //     sheepBtn.style.left = +(e.point.x - 41) + "px";
        //     //     sheepBtn.style.top = +(e.point.y + 0) + "px";
        //     //     sheepBtn.style.display = "block";
        //     //     mChart.order.sheep = {
        //     //         value: sheep,
        //     //         type: sheep >= mChart.data.sheep.slice(-1)[0].value
        //     //     };
        //     //     sheepBtn.innerText = mChart.order.sheep.type ? "↗" : "↘";
        //     // }
        //     //
        //     const marker = {
        //         time: e.time,
        //         position: "inBar",
        //         color: "#00ffff",
        //         shape: "circle"
        //     };
        //     mChart.series.price.setMarkers([marker]);
        //     // mChart.series.shark.setMarkers([marker]);
        //     // mChart.series.sheep.setMarkers([marker]);
        // } else removeOrderButton();
    }

    function priceLineDrag(e) {
        const line = e.customPriceLine.options();
        mChart.order[line.kind].price = mChart.object
            .priceScale("right")
            .formatPrice(line.price);
        const position = getOrderPosition();
        switch (line.kind) {
            case "entry":
                if (position) {
                    mChart.order[line.kind].line.applyOptions({
                        price: e.fromPriceString
                    });
                    pushNotify("warning", "Không được thay đổi lệnh đã khớp.");
                } else orderEntryPrice();
                break;
            case "tp":
                // console.log(line.kind + " : ", mChart.order[line.kind].price);
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
    // document.addEventListener("contextmenu", () => false);

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
            alert("Giá đặt khác MTL");
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
        if (isError) alert("Đặt sai điều kiện");
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
                    var lastSheep = mChart.data.sheep.slice(-1)[0];
                    processSharkOrder(lastShark);
                    processSheepOrder(lastSheep);
                    //
                    if (mConfig.timeFrame > 0) {
                        mChart.series.price.setData(mChart.data.price);
                        mChart.series.shark.setData(mChart.data.shark);
                        mChart.series.sheep.setData(mChart.data.sheep);
                    } else {
                        mChart.series.price.update(lastPrice);
                        mChart.series.shark.update(lastShark);
                        mChart.series.sheep.update(lastSheep);
                    }
                    if (!mConfig.hasCrosshair) {
                        document.getElementById("priceLegendP").innerText =
                            lastPrice.value;
                        document.getElementById(
                            "sharkLegendP"
                        ).innerText = lastShark.value.toLocaleString("en-US");
                        document.getElementById(
                            "sheepLegendP"
                        ).innerText = lastSheep.value.toLocaleString("en-US");
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
    getData();
    //
    document.getElementById("sohopdong").value = mConfig.contractNumber;
    document.getElementById("right_price").value = "MTL";
    // Load Order List
    // var button = document.createElement("button");
    // button.setAttribute(
    //     "onclick",
    //     "openPanel('conditionOrder');openPanel('conditionOrder');"
    // );
    // button.click();
}

function intervalHandler() {
    mConfig.currentTime = moment(
        `${mConfig.currentDate} ${
            document.querySelector(".timeStamp").innerText
        }`,
        "YYYY-MM-DD H:mm:ss"
    ).format("HH:mm:ss");
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
                        sheep: [],
                        priceMin: 9999,
                        priceMax: 0
                    }
                );
                console.log(
                    "chartData",
                    JSON.parse(JSON.stringify(mChart.data))
                );
                processSharkOrder(mChart.data.shark.slice(-1)[0]);
                processSheepOrder(mChart.data.sheep.slice(-1)[0]);
                //
                mChart.series.price.setData(mChart.data.price);
                mChart.series.shark.setData(mChart.data.shark);
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
            r.sheep.pop();
        }
        time = timeIndex * period;
    }
    r.original.push(item);
    r.price.push({ time: time, value: item.price });
    r.shark.push({
        time: time,
        value: prevShark + (item.vol >= mConfig.sheepLimit ? volume : 0)
    });
    r.sheep.push({
        time: time,
        value: prevSheep + (item.vol <= mConfig.sharkLimit ? -volume : 0)
    });
    if (item.price < r.priceMin) r.priceMin = item.price;
    if (item.price > r.priceMax) r.priceMax = item.price;
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
                        alert("Báo cáo đã gửi thành công.");
                    else alert("Đã gửi báo cáo");
                }
                //
                toggleSpinner(false);
            })
            .catch(error => {
                mConfig.isReportedResult = false;
                console.log("Report-Start ##############################");
                console.log(error);
                console.log("Report-End ##############################");
                alert("Gửi báo cáo thất bại");
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
    // document.getElementById("btn_cancel_all_order_condition").click();
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
    var btn = document.getElementById("priceCancelButton");
    btn.style.display = "block";
    btn.style.border = `2px solid ${mChart.order.side ? "green" : "red"}`;
    setTimeout(() => {
        document
            .getElementById(`btn_${mChart.order.side ? "long" : "short"}`)
            .click();
        // document.getElementById("select_normal_order_wrapper").click();
    }, 1000);
}

function orderTpPrice(isInit = false) {
    // document.getElementById("btn_cancel_all_order_condition").click();
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

// function orderTpSlPrice() {
//     // document.getElementById("btn_cancel_all_order_condition").click();
//     callScript("onCancelAllOrderPending('order')");
//     mChart.order.tp.price =
//         +mChart.order.entry.price + (mChart.order.side ? 1 : -1) * 3;
//     drawOrderLine("tp");
//     setTimeout(() => {
//         document.getElementById("select_normal_order_wrapper").click();
//         document.getElementById("right_price").value = mChart.order.tp.price;
//         document
//             .getElementById(`btn_${!mChart.order.side ? "long" : "short"}`)
//             .click();
//     }, 1000);
//     //
//     callScript("onCancelAllOrderPending('order_condition')");
//     mChart.order.sl.price =
//         +mChart.order.entry.price + (mChart.order.side ? -1 : 1) * 2;
//     drawOrderLine("sl");
//     setTimeout(() => {
//         document.getElementById("select_condition_order_wrapper").click();
//         document.getElementById("right_stopOrderIndex").value =
//             mChart.order.sl.price;
//         document.getElementById("right_price").value = "MTL";
//         document.getElementById("right_selStopOrderType").value = !mChart.order
//             .side
//             ? "SOL"
//             : "SOU";
//         document
//             .getElementById(`btn_${!mChart.order.side ? "long" : "short"}`)
//             .click();
//     }, 1000);
//     //
//     removeOrderButton();
// }

function orderByPrice(type) {
    mChart.order.price.type = type;
    document.getElementById("btn_cancel_all_order_condition").click();
    drawOrderLine("price");
    document.getElementById("select_condition_order_wrapper").click();
    document.getElementById(
        "right_stopOrderIndex"
    ).value = mChart.order.price.value.toFixed(1);
    document.getElementById("right_price").value = "MTL";
    document.getElementById("right_selStopOrderType").value =
        mChart.order.price.value >= mChart.data.price.slice(-1)[0].value
            ? "SOL"
            : "SOU";
    //
    var btn = document.getElementById("priceCancelButton");
    btn.style.display = "block";
    btn.style.border = `2px solid ${type ? "green" : "red"}`;
    setTimeout(() => {
        document.getElementById(`btn_${type ? "long" : "short"}`).click();
        document.getElementById("select_normal_order_wrapper").click();
    }, 1000);
    removeOrderButton();
}

function orderByShark() {
    mConfig.hasSharkOrder = true;
    drawOrderLine("shark");
    var btn = document.getElementById("sharkCancelButton");
    btn.style.display = "block";
    btn.style.border = `2px solid ${mChart.order.shark.type ? "green" : "red"}`;
    removeOrderButton();
}

function orderBySheep() {
    mConfig.hasSheepOrder = true;
    drawOrderLine("sheep");
    var btn = document.getElementById("sheepCancelButton");
    btn.style.display = "block";
    btn.style.border = `2px solid ${mChart.order.sheep.type ? "green" : "red"}`;
    removeOrderButton();
}

function drawOrderLine(kind) {
    // removeOrderLine(series);
    console.log(kind + " : ", mChart.order[kind].price);
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
}
function removeOrderLine(kind) {
    if (mChart.order[kind].hasOwnProperty("line")) {
        mChart.series.price.removePriceLine(mChart.order[kind].line);
        delete mChart.order[kind].line;
    }
}

function cancelSharkOrder() {
    mConfig.hasSharkOrder = false;
    document.getElementById("sharkCancelButton").style.display = "none";
    removeOrderLine("shark");
}

function cancelSheepOrder() {
    mConfig.hasSheepOrder = false;
    document.getElementById("sheepCancelButton").style.display = "none";
    removeOrderLine("sheep");
}

function removeOrderButton() {
    // document.getElementById("priceLongButton").style.display = "none";
    // document.getElementById("priceShortButton").style.display = "none";
    // document.getElementById("sharkOrderButton").style.display = "none";
    // document.getElementById("sheepOrderButton").style.display = "none";
    // mChart.series.price.setMarkers([]);
    // mChart.series.shark.setMarkers([]);
    // mChart.series.sheep.setMarkers([]);
    document.getElementById("entryOrderButton").style.display = "none";
    document.getElementById("tpslOrderButton").style.display = "none";
}

function processSharkOrder(lastShark) {
    if (mConfig.hasSharkOrder) {
        var orderType = "";
        if (
            mChart.order.shark.type &&
            lastShark.value >= mChart.order.shark.value
        ) {
            orderType = "long";
        } else if (
            !mChart.order.shark.type &&
            lastShark.value <= mChart.order.shark.value
        ) {
            orderType = "long";
        }
        //
        if (!!orderType) {
            document.getElementById("select_normal_order_wrapper").click();
            document.getElementById("right_price").value = "MTL";
            document.getElementById(`btn_${orderType}`).click();
            cancelSharkOrder();
        }
    }
}

function processSheepOrder(lastSheep) {
    if (mConfig.hasSheepOrder) {
        var orderType = "";
        if (
            mChart.order.sheep.type &&
            lastSheep.value >= mChart.order.sheep.value
        ) {
            orderType = "long";
        } else if (
            !mChart.order.sheep.type &&
            lastSheep.value <= mChart.order.sheep.value
        ) {
            orderType = "long";
        }
        //
        if (!!orderType) {
            document.getElementById("select_normal_order_wrapper").click();
            document.getElementById("right_price").value = "MTL";
            document.getElementById(`btn_${orderType}`).click();
            cancelSheepOrder();
        }
    }
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
    const position = document.querySelector(
        `#danhmuc_${mConfig.VN30F1M} > td:nth-child(2)`
    ).innerText;
    if (isNaN(position)) return 0;
    else +position;
}

// function crosshairPrice() {
//     return mChart.object
//         .priceScale("right")
//         .formatPrice(mChart.series.price.coordinateToPrice(mChart.crosshair.y));
// }

function callScript(script) {
    var button = document.createElement("button");
    button.setAttribute("onclick", script);
    button.click();
}
