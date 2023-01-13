var mConfig = {};
var mChart = {};
var mDatabase = null;

getLocalConfig()
    .then(() => getServerConfig())
    .then(() => {
        createButtons();
        createChart();
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
        console.log("getServerConfig", mConfig.VN30F1M);
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
                mConfig.hasChangedData = false;
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
                mConfig.activeVolume = 0;
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
    button.id = "continuousButton";
    button.innerText = "Candle";
    button.addEventListener("click", () => {
        if (document.body.classList.contains("continuous-order")) {
            document.body.classList.remove("continuous-order");
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
            document.body.classList.add("continuous-order");
            document.body.classList.remove("periodic-order");
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
    button.id = "periodicButton";
    button.innerText = "Line";
    button.addEventListener("click", () => {
        if (document.body.classList.contains("periodic-order")) {
            document.body.classList.remove("periodic-order");
        } else {
            document.body.classList.add("periodic-order");
            document.body.classList.remove("continuous-order");
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

function createChart() {
    var div = document.createElement("div");
    div.id = "periodicChart";
    //
    var select = document.createElement("select");
    select.id = "displaySelect";
    ["Full", "Free", "Stream", "ATO", "ATC"].forEach((item, index) => {
        var option = document.createElement("option");
        option.value = item;
        option.text = item;
        select.appendChild(option);
    });
    select.addEventListener("change", e => showdisplayMode(e.target.value));
    div.append(select);
    //
    select = document.createElement("select");
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
    input.id = "streamInput";
    input.style.zIndex = -1;
    input.setAttribute("type", "number");
    input.setAttribute("min", 1);
    input.addEventListener("input", e => {
        mConfig.streamScale = e.target.value;
        showStreamMode("show");
    });
    div.append(input);
    //
    input = document.createElement("input");
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
    button.id = "exportButton";
    button.innerText = "Export";
    button.addEventListener("click", () => exportHandler());
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "refreshButton";
    button.innerText = "Refresh";
    button.addEventListener("click", getData);
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "clearButton";
    button.innerText = "Clear";
    button.addEventListener("click", () => {
        var choice = confirm("Delete local database?");
        if (choice) {
            clearLocalData("price");
            clearLocalData("volume");
            clearLocalData("value");
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
    var img = document.createElement("img");
    img.id = "spinnerImg";
    img.style.opacity = 0;
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
    div.append(table);
    //
    var canvas = document.createElement("canvas");
    div.append(canvas);
    document.body.append(div);
    //
    Chart.defaults.color = "white";
    mChart = new Chart(canvas.getContext("2d"), {
        type: "line",
        data: {
            datasets: [
                {
                    label: "Giá",
                    data: [],
                    borderColor: "yellow",
                    backgroundColor: "yellow",
                    yAxisID: "y",
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHitRadius: 20,
                    order: 1
                },
                {
                    label: "KL",
                    data: [],
                    borderColor: "magenta",
                    backgroundColor: "magenta",
                    yAxisID: "y1",
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHitRadius: 20,
                    order: 2
                },
                {
                    label: "AV",
                    data: [],
                    borderColor: "aqua",
                    backgroundColor: "aqua",
                    yAxisID: "y2",
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHitRadius: 20,
                    order: 2
                }
            ]
        },
        options: {
            parsing: {
                xAxisKey: "time",
                yAxisKey: "value"
            },
            scales: {
                x: {
                    type: "time",
                    time: {
                        tooltipFormat: "D/M/YYYY H:mm:ss",
                        displayFormats: {
                            month: "[tháng] M",
                            day: "[ngày] D",
                            hour: "HH [giờ]",
                            minute: "HH:mm",
                            second: "HH:mm:ss",
                            millisecond: "HH:mm:ss"
                        }
                    },
                    grid: {
                        color: "#696969",
                        borderDash: [2, 2]
                    },
                    ticks: {
                        maxTicksLimit: 10,
                        maxRotation: 0
                    }
                },
                y: {
                    grid: {
                        color: "#696969",
                        borderDash: [2, 2]
                    }
                },
                y1: {
                    display: false
                },
                y2: {
                    display: false
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: "Biểu đồ"
                },
                zoom: {
                    zoom: {
                        wheel: { enabled: true },
                        pinch: { enabled: true },
                        mode: "x",
                        onZoom: () => changeDisplayMode("Free")
                    },
                    pan: {
                        enabled: true,
                        mode: "x",
                        onPan: () => changeDisplayMode("Free")
                    }
                },
                annotation: {
                    annotations: {
                        startATO: {
                            type: "line",
                            xMin: moment(
                                `${mConfig.currentDate} ${mConfig.time.ATO.start}`
                            ),
                            xMax: moment(
                                `${mConfig.currentDate} ${mConfig.time.ATO.start}`
                            ),
                            borderColor: "lime",
                            borderWidth: 1,
                            borderDash: [5, 5],
                            adjustScaleRange: false
                        },
                        endATO: {
                            type: "line",
                            xMin: moment(
                                `${mConfig.currentDate} ${mConfig.time.ATO.end}`
                            ),
                            xMax: moment(
                                `${mConfig.currentDate} ${mConfig.time.ATO.end}`
                            ),
                            borderColor: "lime",
                            borderWidth: 1,
                            borderDash: [5, 5],
                            adjustScaleRange: false
                        },
                        startATC: {
                            type: "line",
                            xMin: moment(
                                `${mConfig.currentDate} ${mConfig.time.ATC.start}`
                            ),
                            xMax: moment(
                                `${mConfig.currentDate} ${mConfig.time.ATC.start}`
                            ),
                            borderColor: "red",
                            borderWidth: 1,
                            borderDash: [5, 5],
                            adjustScaleRange: false
                        },
                        endATC: {
                            type: "line",
                            xMin: moment(
                                `${mConfig.currentDate} ${mConfig.time.ATC.end}`
                            ),
                            xMax: moment(
                                `${mConfig.currentDate} ${mConfig.time.ATC.end}`
                            ),
                            borderColor: "red",
                            borderWidth: 1,
                            borderDash: [5, 5],
                            adjustScaleRange: false
                        },
                        volume: {
                            type: "line",
                            yScaleID: "y1",
                            yMin: 0,
                            yMax: 0,
                            label: {
                                content: null,
                                display: true,
                                position: "start"
                            },
                            borderColor: "magenta",
                            borderWidth: 1,
                            borderDash: [5, 5],
                            adjustScaleRange: false
                        },
                        price: {
                            type: "line",
                            yScaleID: "y",
                            yMin: 0,
                            yMax: 0,
                            label: {
                                content: null,
                                display: true,
                                position: "start"
                            },
                            borderColor: "yellow",
                            borderWidth: 1,
                            borderDash: [5, 5],
                            adjustScaleRange: false
                        }
                    }
                }
            },
            elements: { line: { tension: 0.1 } },
            onHover: (e, elements) => {
                if (elements.length) {
                    var datasetIndex = elements[0].datasetIndex;
                    mChart.data.datasets[0].order = 2;
                    mChart.data.datasets[1].order = 2;
                    // mChart.data.datasets[2].order = 2;
                    mChart.data.datasets[datasetIndex].order = 1;
                    mChart.update();
                }
            },
            onClick: (e, elements) => {
                if (elements.length) {
                    var datasetIndex = elements[0].datasetIndex;
                    var index = elements[0].index;
                    var data = mChart.data.datasets[datasetIndex].data[index];
                    console.log("onClick", data);
                }
            }
        },
        plugins: [
            {
                beforeDraw: chart => {
                    chart.ctx.fillStyle = "black";
                    chart.ctx.fillRect(0, 0, chart.width, chart.height);
                }
            }
        ]
    });
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
            mDatabase.createObjectStore("price", { keyPath: "time" });
            mDatabase.createObjectStore("volume", { keyPath: "time" });
            mDatabase.createObjectStore("value", { keyPath: "time" });
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
        volumeHandler(data.data);
        valueHandler(data.data);
    });
    socket.on("stockps", data => {
        // console.log("stockps", data.data);
        priceHandler(data.data);
    });

    function priceHandler(data) {
        if (data.id == 3220) {
            // console.log("price" + data.id);
            var pa = mChart.options.plugins.annotation.annotations.price;
            pa.yMin = data.lastPrice;
            pa.yMax = data.lastPrice;
            pa.label.content = data.lastPrice;
            //
            mChart.data.datasets[0].data.push({
                time: moment(`${mConfig.currentDate} ${data.timeServer}`),
                value: data.lastPrice
            });
            //
            setLocalData("price", {
                time: `${mConfig.currentDate} ${data.timeServer}`,
                value: data.lastPrice
            });
            if (!inTradingTimeRange()) {
                var activeValue = 0;
                if (data.lastPrice <= mConfig.buyPrice)
                    activeValue = -data.lastVol * data.lastPrice;
                else if (data.lastPrice >= mConfig.sellPrice)
                    activeValue = data.lastVol * data.lastPrice;
                //
                mChart.data.datasets[2].data.push({
                    time: moment(`${mConfig.currentDate} ${data.timeServer}`),
                    y:
                        (mChart.data.datasets[2].data.length > 0
                            ? mChart.data.datasets[2].data.slice(-1)[0].value
                            : 0) + activeValue
                });
                //
                setLocalData("value", {
                    time: `${mConfig.currentDate} ${data.timeServer}`,
                    value: activeValue
                });
            }
            mChart.update("none");
            //
            if (inAtcTimeRange()) {
                if (!!mConfig.p24h30) {
                    var newAtc = (data.lastPrice - mConfig.p24h30).toFixed(1);
                    var isGet =
                        mConfig.atc == 0 ||
                        newAtc == 0 ||
                        (newAtc != 0 && mConfig.atc / newAtc < 0);
                    mConfig.atc = newAtc;
                    if (isGet) getStrategy();
                    document.getElementById("atcInput").value = mConfig.atc;
                    setLocalData("atc", { key: 1, value: mConfig.atc });
                }
            }
            //
            mConfig.hasChangedData = true;
        }
    }
    function volumeHandler(data) {
        if (data.id == 3310) {
            // console.log("volume" + data.id);
            var volume = data.BVolume - data.SVolume;
            var va = mChart.options.plugins.annotation.annotations.volume;
            va.yMin = volume;
            va.yMax = volume;
            va.label.content = volume;
            //
            mChart.data.datasets[1].data.push({
                time: moment(`${mConfig.currentDate} ${data.timeServer}`),
                value: volume
            });
            mChart.update("none");
            setLocalData("volume", {
                time: `${mConfig.currentDate} ${data.timeServer}`,
                value: volume
            });
            //
            mConfig.hasChangedData = true;
        }
    }
    function valueHandler(data) {
        if (data.id == 3210) {
            if (inTradingTimeRange()) {
                // console.log("vol2" + data.id);
                var arr = data.g2.split("|");
                var value = `${getColor(+arr[0])}${arr[1]}`;
                if (data.side == "B") mConfig.bV2 = value;
                else mConfig.sV2 = value;
                // console.log(mConfig.bV2 + " : ", mConfig.sV2);
            } else {
                var arr = data.g1.split("|");
                if (data.side == "B") mConfig.buyPrice = +arr[0];
                else mConfig.sellPrice = +arr[0];
            }
        }

        function getColor(price) {
            var ret = "";
            switch (price) {
                case mConfig.celPrice:
                    ret = "C";
                    break;
                case mConfig.floPrice:
                    ret = "F";
                    break;
                case mConfig.refPrice:
                    ret = "R";
                    break;
                default:
                    ret = price > mConfig.refPrice ? "U" : "D";
                    break;
            }
            return ret;
        }
    }
}

function loadPage() {
    getData();
    //
    document.getElementById("sohopdong").value = mConfig.contractNumber;
    updateChartTitle();
    setTimeout(() => {
        getLocalData(["trend", "momentum", "atc"]).then(data => {
            if (inAtcTimeRange()) {
                mConfig.trend = data[0].length > 0 ? data[0][0].value : 0;
                mConfig.momentum = data[1].length > 0 ? data[1][0].value : 0;
                mConfig.atc = data[2].length > 0 ? data[2][0].value : 0;
            }
            document.getElementById("trendSelect").value = mConfig.trend;
            document.getElementById("momentumInput").value = mConfig.momentum;
            document.getElementById("atcInput").value = mConfig.atc;
            getStrategy();
        });
        // Load Order List
        var button = document.createElement("button");
        button.setAttribute("onclick", "objOrderPanel.showOrderList()");
        button.click();
    }, 5000);
}

function intervalHandler() {
    mConfig.currentTime = moment(
        `${mConfig.currentDate} ${
            document.querySelector(".timeStamp").innerText
        }`,
        "YYYY-MM-DD H:mm:ss"
    ).format("HH:mm:ss");
    var session = inTradingTimeRange(true);
    if (!!session) document.getElementById("right_price").value = session;
    //
    if (inAtcTimeRange() && !mConfig.p24h30) getVn30f1m();
    //
    // Start ATO|ATC
    if (isTradingTime("start")) {
        clearLocalData("price");
        clearLocalData("volume");
        mChart.data.datasets.forEach(item => (item.data = []));
        mChart.update("none");
        changeDisplayMode(session);
        if (!document.body.classList.contains("periodic-order"))
            document.body.classList.add("periodic-order");
    }
    // Export
    if (isTradingTime("end")) setTimeout(() => exportHandler(session), 30000);
    // Report
    if (mConfig.currentTime == mConfig.time.ATC.end) {
        setTimeout(() => reportHandler(), 60000);
        setTimeout(() => setStrategy(), 45000);
    }
    //
    if (mConfig.displayMode == "Stream") showStreamMode();
    //
    var orderCounter = 0;
    for (var item of document.getElementById("tbodyContent").rows) {
        if (item.cells[0].innerText == "") break;
        else orderCounter++;
    }
    document.getElementById("orderCountP").innerText = `[${orderCounter}]`;
    //
    showRunningStatus();
}

function getData() {
    mConfig.hasChangedData = false;
    return new Promise((resolve, reject) => {
        toggleSpinner(true);
        Promise.all([getServerData(), getLocalData()]).then(arr => {
            console.log("getData: ", arr);
            var ids = new Set(arr[0][0].map(d => d.time));
            var data = [];
            data[0] = [
                ...arr[0][0],
                ...arr[1][0].filter(d => !ids.has(d.time))
            ];
            //
            ids = new Set(arr[0][1].map(d => d.time));
            data[1] = [
                ...arr[0][1],
                ...arr[1][1].filter(d => !ids.has(d.time))
            ];
            //
            ids = new Set(arr[0][2].map(d => d.time));
            data[2] = [
                ...arr[0][2],
                ...arr[1][2].filter(d => !ids.has(d.time))
            ];
            //
            if (!mConfig.hasChangedData) {
                console.log("data", data);
                clearLocalData("price");
                clearLocalData("volume");
                clearLocalData("value");
                setLocalData("price", data[0]);
                setLocalData("volume", data[1]);
                setLocalData("value", data[2]);
            } else return getData();
            //
            mChart.data.datasets.forEach((dataset, index) => {
                if (index <= 2) {
                    dataset.data = data[index].reduce((r, item) => {
                        item.time = moment(item.time);
                        if (index == 2)
                            item.value =
                                (r.length > 0 ? r.slice(-1)[0].value : 0) +
                                +item.value;
                        r.push(item);
                        return r;
                    }, []);
                }
            });
            mChart.update("none");
            toggleSpinner(false);
            resolve();
        });
    });
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

function getLocalData(tables = ["price", "volume", "value"]) {
    return new Promise(function(resolve, reject) {
        var tx = mDatabase.transaction(tables, "readonly");
        var stores = tables.map(table => tx.objectStore(table));
        var promises = stores.map(loadStore);
        Promise.all(promises).then(arr => resolve(arr));
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
            input.style.zIndex = 1;
            input.value = mConfig.streamScale;
            showStreamMode("show");
            break;
        case "ATO":
        case "ATC":
            mChart.zoomScale(
                "x",
                {
                    min: moment(
                        `${mConfig.currentDate} ${
                            mConfig.time[mConfig.displayMode].start
                        }`
                    ),
                    max: moment(
                        `${mConfig.currentDate} ${
                            mConfig.time[mConfig.displayMode].end
                        }`
                    )
                },
                "show"
            );
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
    var img = document.getElementById("spinnerImg");
    img.style.opacity = status ? 1 : 0;
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
    var button = document.getElementById("periodicButton");
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
                    cell.style.backgroundColor = item.ato
                        ? item.ato >= 0
                            ? "LimeGreen"
                            : "red"
                        : "white";
                });
                //
                var posList = json.filter(item => item.ato >= 0);
                var posPer = ((posList.length / json.length) * 100).toFixed(0);
                var btn = document.getElementById("listButton");
                btn.innerText = `${posPer} - ${100 - posPer}`;
                btn.style.background = `linear-gradient(to right, LimeGreen ${posPer}%, red ${posPer}% ${100 -
                    posPer}%)`;
                toggleSpinner(false);
                resolve();
            });
    });
}

function setStrategy() {
    toggleSpinner(true);
    const url = mConfig.root + mConfig.endpoint.setStrategy;
    var data = {
        trend: mConfig.trend,
        momentum: mConfig.momentum,
        atc: mConfig.atc
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
