var mConfig = {};
var mChart = { object: {}, series: {}, data: {}, order: {}, line: {} };
var mDatabase = null;

getLocalConfig()
    .then(() => getServerConfig())
    .then(() => {
        createButtons();
        createChart1();
        // createLightweightChart();
        registerEvent();
        createIndexedDB().then(() => {
            connectSocket();
            loadPage();
            setInterval(intervalHandler, 1000);
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
                mConfig.time = json.time;
                mConfig.trend = !!json.strategy ? json.strategy.trend : null;
                mConfig.momentum = !!json.strategy
                    ? !!json.strategy.momentum
                        ? json.strategy.momentum.toFixed(1)
                        : json.strategy.momentum
                    : null;
                mConfig.atc = !!json.strategy ? json.strategy.atc : null;
                //
                mConfig.timeFrame = 0;
                mConfig.hasChangedData = false;
                mConfig.orderValue = null;
                mConfig.orderConfirm = false;
                //
                mConfig.refPrice = +document.getElementById(
                    `${mConfig.VN30F1M}ref`
                ).innerText;
                mConfig.celPrice = +document.getElementById(
                    `${mConfig.VN30F1M}cel`
                ).innerText;
                mConfig.floPrice = +document.getElementById(
                    `${mConfig.VN30F1M}flo`
                ).innerText;
                mConfig.bV2 = "";
                mConfig.sV2 = "";
                //
                mConfig.p24h29 = null;
                mConfig.p24h30 = null;
                mConfig.buyPrice = null;
                mConfig.sellPrice = null;
                //
                resolve();
            })
            .catch(() => {
                var choice = confirm("Get config error. Refresh now?");
                if (choice) location.reload();
            });
    });
}

function createButtons() {
    var button = document.createElement("button");
    button.id = "candleButton";
    button.innerText = "Candle";
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
    button.innerText = "Line";
    button.addEventListener("click", () => {
        if (document.body.classList.contains("line-chart")) {
            document.body.classList.remove("line-chart");
        } else {
            document.body.classList.add("line-chart");
            document.body.classList.remove("candle-chart");
            document.getElementById("left_order_type").innerText =
                "Lệnh thường";
            document.getElementById("right_order_type").innerText =
                "Lệnh điều kiện";
            // document.querySelector(
            //     "#mainFooter .foot_tab:nth-child(1)"
            // ).innerText = "DANH SÁCH LỆNH";
            // document.querySelector(
            //     "#mainFooter .foot_tab:nth-child(2)"
            // ).innerText = "DANH SÁCH LỆNH ĐIỀU KIỆN";
            document.querySelector(
                "#mainFooter .foot_tab:nth-child(1)"
            ).innerText = "≃";
            document.querySelector(
                "#mainFooter .foot_tab:nth-child(2)"
            ).innerText = "≥";
        }
    });
    document.body.append(button);
    //
    button = document.createElement("button");
    button.id = "reportButton";
    button.innerText = "Report";
    button.addEventListener("click", () => {
        if (mConfig.currentTime > mConfig.time.ATC.end) reportHandler();
    });
    document.body.append(button);
}

function createChart1() {
    var div = document.createElement("div");
    div.id = "lightWeightChart";
    div.style.width = "100vw";
    div.style.height = "100vh";
    document.body.append(div);
    //
    var select = document.createElement("select");
    select.id = "trendSelect";
    ["", "2", "1", "-1", "-2"].forEach((item, index) => {
        var option = document.createElement("option");
        option.value = item;
        option.text = item;
        select.appendChild(option);
    });
    select.value = mConfig.trend;
    select.addEventListener("change", e => {
        mConfig.trend = e.target.value;
        getStrategy();
        setLocalData("trend", { key: 1, value: mConfig.trend });
    });
    div.append(select);
    //
    var input = document.createElement("input");
    input.id = "momentumInput";
    input.value = mConfig.momentum;
    input.setAttribute("type", "number");
    input.setAttribute("step", "0.1");
    input.addEventListener("change", e => {
        mConfig.momentum = e.target.value;
        getStrategy();
        setLocalData("momentum", { key: 1, value: mConfig.momentum });
    });
    div.append(input);
    //
    input = document.createElement("input");
    input.id = "atcInput";
    input.value = mConfig.atc;
    input.setAttribute("type", "number");
    input.setAttribute("step", "0.1");
    input.addEventListener("change", e => {
        mConfig.atc = e.target.value;
        getStrategy();
        setLocalData("atc", { key: 1, value: mConfig.atc });
    });
    div.append(input);
    //
    var button = document.createElement("button");
    button.id = "refreshButton";
    button.innerText = "🔄";
    button.addEventListener("click", getData);
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "clearButton";
    button.innerText = "🔂";
    button.addEventListener("click", () => {
        var choice = confirm("Delete local database?");
        if (choice) {
            clearLocalData("data");
            getData();
        }
    });
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "listButton";
    button.innerText = "? - ?";
    button.addEventListener("click", () => {
        if (div.classList.contains("list-show"))
            div.classList.remove("list-show");
        else div.classList.add("list-show");
    });
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "cancelButton";
    button.innerText = "✘";
    button.style.display = "none";
    button.addEventListener("click", () => {
        document.getElementById("cancelButton").style.display = "none";
        mConfig.orderConfirm = false;
    });
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "priceOrderButton";
    button.innerText = "Order?";
    button.style.display = "none";
    button.addEventListener("click", orderByPrice);
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "valueOrderButton";
    button.innerText = "Order?";
    button.style.display = "none";
    button.addEventListener("click", orderByValue);
    div.append(button);
    //
    var img = document.createElement("img");
    img.id = "spinnerImg";
    // img.style.opacity = 0;
    img.src = chrome.runtime.getURL("spinner.gif");
    div.append(img);
    //
    var p = document.createElement("p");
    p.id = "orderCountP";
    div.append(p);
    //
    var table = document.createElement("table");
    table.id = "listTable";
    var header = table.createTHead();
    var row = header.insertRow(0);
    var cell = row.insertCell(0);
    cell.innerText = "No.";
    cell = row.insertCell(1);
    cell.innerText = "Date";
    cell = row.insertCell(2);
    cell.innerText = "Trending";
    cell = row.insertCell(3);
    cell.innerText = "Momentum";
    cell = row.insertCell(4);
    cell.innerText = "ATC";
    cell = row.insertCell(5);
    cell.innerText = "ATO";
    cell = row.insertCell(6);
    cell.id = "orderStatistic";
    cell.innerText = "Order";
    div.append(table);
    //
    // document.body.append(div);
    const chartOptions = {
        localization: { locale: "vi-VN" },
        rightPriceScale: { visible: true },
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
        timeScale: {
            timeVisible: true
            // secondsVisible: false
        }
    };
    mChart.object = LightweightCharts.createChart(div, chartOptions);
    if (navigator.userAgentData.mobile)
        mChart.object.subscribeCrosshairMove(chartClick);
    else mChart.object.subscribeClick(chartClick);
    mChart.series.price = mChart.object.addLineSeries({
        priceScaleId: "right",
        color: "rgba(32, 226, 47, 1)",
        priceFormat: { precision: 1 }
    });
    mChart.series.value = mChart.object.addLineSeries({
        priceScaleId: "left",
        color: "rgba(171, 71, 188, 1)",
        priceFormat: { precision: 1 }
    });
    mChart.object.timeScale().fitContent();

    function chartClick(e) {
        console.log("subscribeClick", e);
        var values = Array.from(e.seriesPrices.values());
        var pOrdBtn = document.getElementById("priceOrderButton");
        var vOrdBtn = document.getElementById("valueOrderButton");
        if (e.seriesPrices.size) {
            pOrdBtn.style.left = +(e.point.x - 41) + "px";
            pOrdBtn.style.top = +(e.point.y - 40) + "px";
            pOrdBtn.style.display = "block";
            console.log(values[0], mChart.data.price.slice(-1)[0].value);
            mChart.order.price = {
                value: values[0],
                type: values[0] >= mChart.data.price.slice(-1)[0].value
            };
            pOrdBtn.innerText = mChart.order.price.type ? "↗" : "↘";
            if (e.seriesPrices.size == 2) {
                vOrdBtn.style.left = +(e.point.x - 41) + "px";
                vOrdBtn.style.top = +e.point.y + "px";
                vOrdBtn.style.display = "block";
                mChart.order.value = {
                    value: values[1],
                    type: values[1] >= mChart.data.value.slice(-1)[0].value
                };
                vOrdBtn.innerText = mChart.order.value.type ? "↗" : "↘";
            } else vOrdBtn.style.display = "none";
            // if (e.seriesPrices.size == 2) {
            //     mConfig.orderKind = 1;
            //     //
            //     var price = mChart.data.datasets[0].data[el.index];
            //     document
            //         .getElementById("select_condition_order_wrapper")
            //         .click();
            //     document.getElementById("right_stopOrderIndex").value =
            //         price.value;
            //     mConfig.orderType = price.value >= mConfig.currPrice ? 1 : 2;
            //     document.getElementById("right_selStopOrderType").value =
            //         mConfig.orderType == 1 ? "SOL" : "SOU";
            //     //
            //     hasOrder = true;
            // } else if (el.datasetIndex == 2) {
            //     mConfig.orderKind = 2;
            //     mConfig.orderConfirm = false;
            //     //
            //     var value = mChart.data.datasets[2].data[el.index];
            //     mConfig.orderValue = value.value;
            //     mConfig.orderType = value.value >= mConfig.currValue ? 1 : 2;
            //     document.getElementById("select_normal_order_wrapper").click();
            //     document.getElementById("right_price").value = "MTL";
            //     //
            //     hasOrder = true;
            // }
            // if (hasOrder) {
            //     ordBtn.style.left = +(e.native.clientX - 54) + "px";
            //     ordBtn.style.top = +(e.native.clientY - 27) + "px";
            //     ordBtn.style.display = "block";
            //     if (mConfig.orderType == 1) {
            //         ordBtn.innerText = "LONG";
            //         ordBtn.style.background = "green";
            //     } else {
            //         ordBtn.innerText = "SHORT";
            //         ordBtn.style.background = "red";
            //     }
            // }
        } else {
            pOrdBtn.style.display = "none";
            vOrdBtn.style.display = "none";
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
    document.addEventListener("fullscreenchange", fullscreenchange);

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

    function fullscreenchange() {
        mChart.object.resize(window.innerWidth, window.innerHeight);
        if (document.fullscreenElement)
            document.body.classList.add("fullscreen");
        else document.body.classList.remove("fullscreen");
    }
}

function createIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("vpsDB", 1);
        request.onupgradeneeded = e => {
            console.log("onupgradeneeded");
            mDatabase = e.target.result;
            mDatabase.createObjectStore("data", { keyPath: "time" });
            // mDatabase.createObjectStore("price", { keyPath: "time" });
            // mDatabase.createObjectStore("volume", { keyPath: "time" });
            // mDatabase.createObjectStore("value", { keyPath: "time" });
            mDatabase.createObjectStore("trend", { keyPath: "key" });
            mDatabase.createObjectStore("momentum", { keyPath: "key" });
            mDatabase.createObjectStore("atc", { keyPath: "key" });
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
        if (inTradingTimeRange()) getData();
    });
    socket.on("boardps", data => {
        // console.log("boardps", data.data);
        priceHandler(data.data);
        bidAskHandler(data.data);
    });
    socket.on("stockps", data => {
        // console.log("stockps", data.data);
        priceHandler(data.data);
    });

    function priceHandler(data) {
        if (data.id == 3220) {
            // console.log("price" + data.id);
            var index = 0;
            mConfig.currPrice = data.lastPrice;
            var price = {
                time: `${mConfig.currentDate} ${data.timeServer}`,
                value: data.lastPrice
            };
            var pa = mChart.options.plugins.annotation.annotations.price;
            pa.yMin = price.value;
            pa.yMax = price.value;
            pa.label.content = price.value;
            //
            createTimeFrameData(mChart.data.datasets[index].data, price, index);
            //
            setLocalData("price", price);
            if (!inTradingTimeRange()) {
                var activeValue = 0;
                if (data.lastPrice <= mConfig.buyPrice)
                    activeValue = -data.lastVol * data.lastPrice;
                else if (data.lastPrice >= mConfig.sellPrice)
                    activeValue = data.lastVol * data.lastPrice;
                //
                var index = 2;
                var value = {
                    time: `${mConfig.currentDate} ${data.timeServer}`,
                    value: activeValue
                };
                //
                var dataList = createTimeFrameData(
                    mChart.data.datasets[index].data,
                    value,
                    index
                );
                //
                var accumulateValue = dataList.slice(-1)[0].value;
                mConfig.currValue = accumulateValue;
                //
                if (mConfig.orderConfirm) {
                    mConfig.orderConfirm = false;
                    document.getElementById("btn_cancel_all_normal").click();
                    setTimeout(() => {
                        if (
                            mConfig.orderType == 1 &&
                            accumulateValue >= mConfig.orderValue
                        )
                            document.getElementById("btn_long").click();
                        else if (
                            mConfig.orderType == 2 &&
                            accumulateValue <= mConfig.orderValue
                        )
                            document.getElementById("btn_short").click();
                        //
                        document.getElementById("cancelButton").style.display =
                            "none";
                    }, 500);
                }
                //
                var va = mChart.options.plugins.annotation.annotations.value;
                va.yMin = accumulateValue;
                va.yMax = accumulateValue;
                va.label.content = accumulateValue;
                //
                setLocalData("value", {
                    ...value,
                    ...{ value: activeValue.toFixed(1) }
                });
            }
            mChart.update("none");
            //
            if (inAtcTimeRange()) {
                if (!!mConfig.p24h30) {
                    var newAtc = data.lastPrice - mConfig.p24h30;
                    var isGet =
                        mConfig.atc == 0 ||
                        newAtc == 0 ||
                        (newAtc != 0 && mConfig.atc / newAtc < 0);
                    mConfig.atc = newAtc != 0 ? newAtc.toFixed(1) : 0;
                    if (isGet) getStrategy();
                    document.getElementById("atcInput").value = mConfig.atc;
                    setLocalData("atc", { key: 1, value: mConfig.atc });
                }
            }
            //
            mConfig.hasChangedData = true;
        }
    }

    function bidAskHandler(data) {
        if (data.id == 3210) {
            if (!inTradingTimeRange()) {
                var arr = data.g1.split("|");
                if (data.side == "B") mConfig.buyPrice = +arr[0];
                else mConfig.sellPrice = +arr[0];
            }
        }
    }
}

function loadPage() {
    getData();
    //
    // document.getElementById("sohopdong").value = mConfig.contractNumber;
    // updateChartTitle();
    // setTimeout(() => {
    //     getLocalData(["trend", "momentum", "atc"]).then(data => {
    //         if (inAtcTimeRange()) {
    //             mConfig.trend = data[0].length > 0 ? data[0][0].value : 0;
    //             mConfig.momentum = data[1].length > 0 ? data[1][0].value : 0;
    //             mConfig.atc = data[2].length > 0 ? data[2][0].value : 0;
    //         }
    //         document.getElementById("trendSelect").value = mConfig.trend;
    //         document.getElementById("momentumInput").value = mConfig.momentum;
    //         document.getElementById("atcInput").value = mConfig.atc;
    //         getStrategy();
    //     });
    //     // Load Order List
    //     var button = document.createElement("button");
    //     button.setAttribute("onclick", "objOrderPanel.showOrderList()");
    //     button.click();
    // }, 5000);
}

function intervalHandler() {
    // mConfig.currentTime = moment(
    //     `${mConfig.currentDate} ${
    //         document.querySelector(".timeStamp").innerText
    //     }`,
    //     "YYYY-MM-DD H:mm:ss"
    // ).format("HH:mm:ss");
    // var session = inTradingTimeRange(true);
    // if (!!session) document.getElementById("right_price").value = session;
    // //
    // if (inAtcTimeRange() && !mConfig.p24h30) getVn30f1m();
    // //
    // // Start ATO|ATC
    // if (isTradingTime("start")) {
    //     clearLocalData("price");
    //     clearLocalData("volume");
    //     mChart.data.datasets.forEach(item => (item.data = []));
    //     mChart.update("none");
    //     changeDisplayMode(session);
    //     if (!document.body.classList.contains("line-chart"))
    //         document.body.classList.add("line-chart");
    // }
    // // Export
    // if (isTradingTime("end")) setTimeout(() => exportHandler(session), 30000);
    // // Report
    // if (mConfig.currentTime == mConfig.time.ATC.end) {
    //     setTimeout(() => reportHandler(), 60000);
    //     setTimeout(() => setStrategy(), 45000);
    // }
    // //
    // if (mConfig.displayMode == "Stream") showStreamMode();
    // //
    // var orderCounter = 0;
    // for (var item of document.getElementById("tbodyContent").rows) {
    //     if (item.cells[0].innerText == "") break;
    //     else orderCounter++;
    // }
    // document.getElementById("orderCountP").innerText = `[${orderCounter}]`;
    // //
    // showRunningStatus();
    //
    var time = moment()
        .add(7, "hours")
        .unix();
    var temp = {
        time: time,
        value: 1000 + 100 * (Math.random() - 0.5)
    };
    mChart.series.price.update(temp);
    mChart.data.price.push(temp);
    temp = {
        time: time,
        value:
            (mChart.data.value.length
                ? mChart.data.value.slice(-1)[0].value
                : 0) +
            200000 * (Math.random() - 0.5)
    };
    mChart.series.value.update(temp);
    mChart.data.value.push(temp);
}

function getData() {
    mConfig.hasChangedData = false;
    return new Promise((resolve, reject) => {
        toggleSpinner(true);
        Promise.all([getServerData(), getLocalData("data")]).then(arr => {
            console.log("getData: ", arr);
            var ids = new Set(arr[0].map(d => d.time));
            var data = [
                ...arr[0],
                ...arr[1].filter(d => !ids.has(d.time))
            ].sort((a, b) => a.time.localeCompare(b.time));
            //
            if (!mConfig.hasChangedData) {
                console.log("data", data);
                clearLocalData("data");
                setLocalData("data", data);
            } else return getData();
            //
            // var chartData = data.reduce(
            //     (r, item) => createTimeFrameData(r, item),
            //     [{ data: [] }, { data: [] }]
            // );
            mChart.data = data.reduce(
                (r, item) => {
                    var temp = createChartData(r, item);
                    r.price.push(temp.price);
                    if (temp.hasOwnProperty("value")) r.value.push(temp.value);
                    return r;
                },
                { price: [], value: [] }
            );
            console.log("chartData", JSON.parse(JSON.stringify(mChart.data)));
            mChart.series.price.setData(mChart.data.price);
            mChart.series.value.setData(mChart.data.value);
            // mChart.data.datasets[0].data = chartData[0].data;
            // mChart.data.datasets[1].data = chartData[1].data;
            // mConfig.currPrice = mChartData[0].slice(-1)[0].value;
            // mConfig.currValue = mChartData[1].slice(-1)[0].value;

            // mChart.update("none");
            toggleSpinner(false);
            resolve();
        });
    });
}

function createChartData(r, item) {
    var ret = {};
    var time = moment(item.time)
        .add(7, "hours")
        .unix();
    ret.price = { time: time, value: item.price };
    if (!!item.vol) {
        var prevValue = 0;
        if (r.value.length > 0) prevValue = r.value.slice(-1)[0].value;
        var temp = 0;
        if (item.price <= item.bid) temp = -item.vol * item.price;
        else if (item.price >= item.ask) temp = item.vol * item.price;
        ret.value = {
            time: time,
            value: +(prevValue + temp).toFixed(1)
        };
    }
    return ret;
}

function getServerData() {
    return new Promise((resolve, reject) => {
        var data = { action: "GET" };
        const url = mConfig.root + mConfig.endpoint.data;
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => resolve(json));
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
            clearLocalData("price");
            clearLocalData("volume");
            mChart.data.datasets.forEach(item => (item.data = []));
            mChart.update("none");
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
    const request = mDatabase
        .transaction(table, "readwrite")
        .objectStore(table)
        .clear();

    request.onsuccess = () => {
        console.log(`Object Store "${table}" emptied`);
    };

    request.onerror = err => {
        console.error(`Error to empty Object Store: ${table}`);
    };
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
            scores: mConfig.refPrice
        };
        for (var item of document.getElementById("tbodyContent").rows) {
            if (item.cells[0].innerText == "") break;
            else {
                var volume = +item.cells[6].innerText;
                if (!isNaN(volume) && item.cells[7].innerText == "ATO") {
                    var days = moment().day() == 1 ? 3 : 1;
                    data.fees += days * volume * mConfig.PMF;
                }
            }
        }
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

function exportHandler(session = false) {
    if (!!session) changeDisplayMode(session);
    var imageName = `vps_${moment().format("YYYY.MM.DD-HH.mm.ss")}_${
        mConfig.bV2
    }-${mConfig.sV2}.png`;
    var imageData = mChart.toBase64Image();
    if (Object.keys(mConfig.time).includes(mConfig.displayMode)) {
        const url = mConfig.root + mConfig.endpoint.export;
        const data = { imageData, imageName, session: mConfig.displayMode };
        toggleSpinner(true);
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
                console.log("UploadImage-Start ##############################");
                console.log(jsondata);
                console.log("UploadImage-End ##############################");
                // if (jsondata.isOk) alert("Đăng ảnh thành công");
                toggleSpinner(false);
            })
            .catch(error => {
                console.log("UploadImage-Start ##############################");
                console.log(error);
                console.log("UploadImage-End ##############################");
                alert("Đăng ảnh thất bại");
            });
    } else {
        var a = document.createElement("a");
        a.href = imageData;
        a.download = imageName;
        a.click();
    }
}

function changeDisplayMode(mode) {
    var select = document.getElementById("displaySelect");
    select.value = mode;
    select.dispatchEvent(new Event("change"));
}

function showdisplayMode(mode) {
    mConfig.displayMode = mode;
    updateChartTitle();
    var input = document.getElementById("streamInput");
    input.style.zIndex = -1;
    switch (mConfig.displayMode) {
        case "Full":
            mChart.resetZoom();
            break;
        case "Stream":
            // input.style.zIndex = 1;
            // input.value = mConfig.streamScale;
            // showStreamMode("show");
            // mChart.options.scales.x.type = "realtime";
            mChart.options.plugins.streaming.pause = false;
            // mChart.options.scales.x.realtime.duration = 1000;
            mChart.update();
            break;
        case "ATO":
        case "ATC":
            // mChart.options.scales.x.type = "time";
            // mChart.options.scales.x.realtime.pause = true;
            // mChart.options.scales.x.realtime.duration = 86400000;
            mChart.options.plugins.streaming.pause = true;
            mChart.update();
            // setTimeout(() => {
            //     mChart.zoomScale(
            //         "x",
            //         {
            //             min: moment(
            //                 `${mConfig.currentDate} ${
            //                     mConfig.time[mConfig.displayMode].start
            //                 }`
            //             ),
            //             max: moment(
            //                 `${mConfig.currentDate} ${
            //                     mConfig.time[mConfig.displayMode].end
            //                 }`
            //             )
            //         },
            //         "show"
            //     );
            // }, 1000);
            break;
    }
}

function showStreamMode(mode = "none") {
    mChart.zoomScale(
        "x",
        {
            min: moment().subtract(mConfig.streamScale, "minutes"),
            max: moment().add(mConfig.streamScale * 0.05, "minutes")
        },
        mode
    );
}

function updateChartTitle() {
    mChart.options.plugins.title.text = `Biểu đồ ${
        mConfig.displayMode
    } ngày ${moment(mConfig.currentDate).format("DD/MM/YYYY")}`;
    mChart.update();
}

function toggleSpinner(status) {
    // var img = document.getElementById("spinnerImg");
    // img.style.opacity = status ? 1 : 0;
}

function inAtcTimeRange() {
    return (
        mConfig.currentTime >= mConfig.time.ATC.start &&
        mConfig.currentTime <= mConfig.time.ATC.end
    );
}

function inTradingTimeRange(sessionName = false) {
    var isAtoSession =
        mConfig.currentTime >= mConfig.time.ATO.start &&
        mConfig.currentTime <= mConfig.time.ATO.end;
    var isAtcSession = inAtcTimeRange();
    if (sessionName) return isAtoSession ? "ATO" : isAtcSession ? "ATC" : "";
    else return isAtoSession || isAtcSession;
}

function isTradingTime(event) {
    return (
        mConfig.currentTime == mConfig.time.ATO[event] ||
        mConfig.currentTime == mConfig.time.ATC[event]
    );
}

function showRunningStatus() {
    var button = document.getElementById("lineButton");
    if (button.classList.contains("dark")) button.classList.remove("dark");
    else button.classList.add("dark");
}

function getStrategy() {
    return new Promise((resolve, reject) => {
        toggleSpinner(true);
        const url = mConfig.root + mConfig.endpoint.getStrategy;
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                trend: mConfig.trend,
                momentum: mConfig.momentum,
                atc: mConfig.atc
            })
        })
            .then(response => response.json())
            .then(json => {
                console.log("getStrategy", json);
                var table = document.getElementById("listTable");
                var tbody = table.querySelector("tbody");
                if (tbody) table.removeChild(tbody);
                tbody = table.createTBody();
                if (json.length > 6) tbody.style.height = "200px";
                else tbody.style.height = "unset";
                json.forEach((item, index) => {
                    var row = tbody.insertRow(index);
                    var cell = row.insertCell(0);
                    cell.innerText = index + 1;
                    cell = row.insertCell(1);
                    cell.innerText = item.date;
                    cell = row.insertCell(2);
                    cell.innerText = item.trend;
                    cell = row.insertCell(3);
                    cell.innerText = !!item.momentum
                        ? item.momentum.toFixed(1)
                        : item.momentum;
                    cell = row.insertCell(4);
                    cell.innerText = !!item.atc
                        ? item.atc.toFixed(1)
                        : item.atc;
                    cell = row.insertCell(5);
                    cell.innerText = !!item.ato
                        ? item.ato.toFixed(1)
                        : item.ato;
                    cell.style.backgroundColor = !!item.ato
                        ? item.ato >= 0
                            ? "LimeGreen"
                            : "red"
                        : "white";
                    cell = row.insertCell(6);
                    cell.innerText = item.order;
                    cell.style.backgroundColor =
                        !!item.ato && !!item.order
                            ? item.ato / item.order >= 0
                                ? "LimeGreen"
                                : "red"
                            : "white";
                });
                //
                var posList = json.filter(item => !!item.ato && item.ato >= 0);
                var posPer = ((posList.length / json.length) * 100).toFixed(0);
                var btn = document.getElementById("listButton");
                btn.innerText = `${posPer} - ${100 - posPer}`;
                btn.style.background = `linear-gradient(to right, LimeGreen ${posPer}%, red ${posPer}% ${100 -
                    posPer}%)`;
                //
                var posOrdList = json.filter(
                    item =>
                        !!item.ato && !!item.order && item.ato / item.order >= 0
                );
                var negOrdList = json.filter(
                    item =>
                        !!item.ato && !!item.order && item.ato / item.order < 0
                );
                var posOrdPer = (
                    (posOrdList.length /
                        (posOrdList.length + negOrdList.length)) *
                    100
                ).toFixed(0);
                var td = document.getElementById("orderStatistic");
                td.innerText = `${posOrdPer} - ${100 - posOrdPer}`;
                td.style.background = `linear-gradient(to right, LimeGreen ${posOrdPer}%, red ${posPer}% ${100 -
                    posOrdPer}%)`;
                //
                toggleSpinner(false);
                resolve();
            });
    });
}

function setStrategy() {
    toggleSpinner(true);
    const url = mConfig.root + mConfig.endpoint.setStrategy;
    var order = parseInt(
        document.querySelector("#status-danhmuc-content > tr > td:nth-child(2)")
            .innerText
    );
    var data = {
        trend: mConfig.trend,
        momentum: mConfig.momentum,
        atc: mConfig.atc,
        order: !isNaN(order) ? order : null
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
            console.log(`SetStrategy-Start ##############################`);
            console.log(jsondata);
            console.log(`SetStrategy-End ##############################`);
            if (jsondata.isOk) alert(`Lưu Strategy thành công`);
            toggleSpinner(false);
        })
        .catch(error => {
            console.log(`SetStrategy-Start ##############################`);
            console.log(error);
            console.log(`SetStrategy-End ##############################`);
            alert(`Lưu Strategy thất bại`);
        });
}

function getVn30f1m() {
    return new Promise((resolve, reject) => {
        toggleSpinner(true);
        const url = mConfig.root + mConfig.endpoint.getVn30f1m;
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(json => {
                console.log("getVn30f1m", json);
                mConfig.p24h29 = json[0];
                mConfig.p24h30 = json[1];
                mConfig.momentum = (mConfig.p24h30 - mConfig.p24h29).toFixed(1);
                document.getElementById("momentumInput").value =
                    mConfig.momentum;
                setLocalData("momentum", { key: 1, value: mConfig.momentum });
                //
                if (mChart.data.datasets[0].data.length > 0) {
                    mConfig.atc = (
                        mChart.data.datasets[0].data.slice(-1)[0].value -
                        mConfig.p24h30
                    ).toFixed(1);
                    document.getElementById("atcInput").value = mConfig.atc;
                    setLocalData("atc", { key: 1, value: mConfig.atc });
                }
                getStrategy();
                toggleSpinner(false);
                resolve();
            })
            .catch(error => getVn30f1m());
    });
}

function orderByPrice() {
    console.log("orderByPrice");
    createOrderLine("price");
    if (mConfig.orderKind == 1) {
        document.getElementById("btn_cancel_all_order_condition").click();
        setTimeout(() => {
            document
                .getElementById(
                    `btn_${mConfig.orderType == 1 ? "long" : "short"}`
                )
                .click();
        }, 500);
    } else if (mConfig.orderKind == 2) {
        mConfig.orderConfirm = true;
        var btn = document.getElementById("cancelButton");
        btn.style.display = "block";
        btn.innerText = `Cancel ${mConfig.orderType == 1 ? "LONG" : "SHORT"}`;
        btn.style.background = mConfig.orderType == 1 ? "green" : "red";
    }
    document.getElementById("orderButton").style.display = "none";
}
function orderByValue() {
    createOrderLine("value");
}
// function conditionOrder(type) {
//     if (mConfig.orderKind == 1) {
//         document.getElementById("btn_cancel_all_order_condition").click();
//         setTimeout(() => {
//             document
//                 .getElementById(
//                     `btn_${mConfig.orderType == 1 ? "long" : "short"}`
//                 )
//                 .click();
//         }, 500);
//     } else if (mConfig.orderKind == 2) {
//         mConfig.orderConfirm = true;
//         var btn = document.getElementById("cancelButton");
//         btn.style.display = "block";
//         btn.innerText = `Cancel ${mConfig.orderType == 1 ? "LONG" : "SHORT"}`;
//         btn.style.background = mConfig.orderType == 1 ? "green" : "red";
//     }
//     document.getElementById("orderButton").style.display = "none";
// }

function createOrderLine(series) {
    if (mChart.line.hasOwnProperty(series)) {
        mChart.series[series].removePriceLine(mChart.line[series]);
        delete mChart.line[series];
    }
    mChart.line[series] = mChart.series[series].createPriceLine({
        price: mChart.order[series].value,
        color: `rgba(${series == "price" ? "32, 226, 47" : "171, 71, 188"}, 1)`,
        lineWidth: 1,
        lineStyle: LightweightCharts.LineStyle.Solid,
        title: mChart.order[series].type ? "LONG" : "SHORT",
        draggable: true
    });
}
