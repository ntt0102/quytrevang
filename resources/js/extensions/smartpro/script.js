var mConfig = {};
var mData = [];
var mChart = { object: {}, series: {}, data: {}, order: {}, line: {} };
var mDatabase = {};
var mHighcharts = {};

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
                // mConfig.strategy = {
                //     trend: !!json.strategy ? json.strategy.trend : null,
                //     momentum: !!json.strategy
                //         ? !!json.strategy.momentum
                //             ? json.strategy.momentum.toFixed(1)
                //             : json.strategy.momentum
                //         : null,
                //     atc: !!json.strategy ? json.strategy.atc : null
                // };
                //
                mConfig.hasChangedData = false;
                mConfig.volumeOrderConfirm = false;
                mConfig.crosshair = false;
                //
                // mConfig.p24h29 = null;
                // mConfig.p24h30 = null;
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
            ).innerText = "🅞";
            document.querySelector(
                "#mainFooter .foot_tab:nth-child(2)"
            ).innerText = "❓";
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
    document.body.append(div);
    //
    var highcharts = document.createElement("div");
    highcharts.id = "highchartsChart";
    highcharts.style.display = "none";
    div.append(highcharts);
    mHighcharts = new Highcharts.chart("highchartsChart", {
        chart: { type: "bar" },
        title: { text: "Volume by price", align: "center" },
        xAxis: [{ labels: { enabled: false } }],
        yAxis: { title: { text: null } },
        plotOptions: { series: { stacking: "normal" } },
        series: [{ name: "Sell" }, { name: "Buy" }],
        tooltip: {
            formatter: function() {
                return (
                    "Price: " +
                    this.point.category +
                    "</b><br/>" +
                    "Volume: " +
                    Math.abs(this.point.y)
                );
            }
        }
    });
    //
    var select = document.createElement("select");
    select.id = "timeFrameSelect";
    [
        { text: "Tick", value: 0 },
        { text: "1 min", value: 1 },
        { text: "5 min", value: 5 },
        { text: "15 min", value: 15 },
        { text: "1 day", value: 1440 },
        { text: "1 week", value: 10080 }
    ].forEach((item, index) => {
        var option = document.createElement("option");
        option.value = item.value;
        option.text = item.text;
        select.appendChild(option);
    });
    select.value = mConfig.timeFrame;
    select.addEventListener("change", e => {
        mConfig.timeFrame = e.target.value;
        getData();
    });
    div.append(select);
    // var select = document.createElement("select");
    // select.id = "trendSelect";
    // ["", "2", "1", "-1", "-2"].forEach((item, index) => {
    //     var option = document.createElement("option");
    //     option.value = item;
    //     option.text = item;
    //     select.appendChild(option);
    // });
    // select.value = mConfig.strategy.trend;
    // select.addEventListener("change", e => {
    //     mConfig.strategy.trend = e.target.value;
    //     getStrategy();
    //     setLocalData("trend", { key: 1, value: mConfig.strategy.trend });
    // });
    // div.append(select);
    // //
    // var input = document.createElement("input");
    // input.id = "momentumInput";
    // input.value = mConfig.strategy.momentum;
    // input.setAttribute("type", "number");
    // input.setAttribute("step", "0.1");
    // input.addEventListener("change", e => {
    //     mConfig.strategy.momentum = e.target.value;
    //     getStrategy();
    //     setLocalData("momentum", { key: 1, value: mConfig.strategy.momentum });
    // });
    // div.append(input);
    // //
    // input = document.createElement("input");
    // input.id = "atcInput";
    // input.value = mConfig.strategy.atc;
    // input.setAttribute("type", "number");
    // input.setAttribute("step", "0.1");
    // input.addEventListener("change", e => {
    //     mConfig.strategy.atc = e.target.value;
    //     getStrategy();
    //     setLocalData("atc", { key: 1, value: mConfig.strategy.atc });
    // });
    // div.append(input);
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
    button.innerText = "🔄";
    button.title = "Refresh chart";
    button.addEventListener("click", () => getData());
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "tcbsButton";
    button.innerText = "🔂";
    button.title = "TCBS chart";
    button.addEventListener("click", () => getData(null, true));
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "clearButton";
    button.innerText = "↺";
    button.title = "Delete local data";
    button.addEventListener("click", () => {
        var choice = confirm("Delete local database?");
        if (choice) {
            clearLocalData("data");
            var date = document.getElementById("dateInput").value;
            getData(date);
        }
    });
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "highchartsButton";
    button.innerText = "📉";
    button.title = "Show highcharts";
    button.addEventListener("click", () => {
        var chart = document.getElementById("highchartsChart");
        if (chart.style.display == "none") {
            getVolumeByPrice();
            chart.style.display = "block";
        } else chart.style.display = "none";
    });
    div.append(button);
    //
    // button = document.createElement("button");
    // button.id = "listButton";
    // button.innerText = "? - ?";
    // button.title = "Toggle list";
    // button.addEventListener("click", () => {
    //     if (div.classList.contains("list-show"))
    //         div.classList.remove("list-show");
    //     else div.classList.add("list-show");
    // });
    // div.append(button);
    //
    button = document.createElement("button");
    button.id = "priceCancelButton";
    button.innerText = "✘";
    button.style.display = "none";
    button.addEventListener("click", () => {
        document.getElementById("btn_cancel_all_order_condition").click();
        document.getElementById("priceCancelButton").style.display = "none";
        removeOrderLine("price");
    });
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "volumeCancelButton";
    button.innerText = "✘";
    button.style.display = "none";
    button.addEventListener("click", () => {
        mConfig.volumeOrderConfirm = false;
        document.getElementById("volumeCancelButton").style.display = "none";
        removeOrderLine("volume");
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
    button.id = "volumeOrderButton";
    button.innerText = "Order?";
    button.style.display = "none";
    button.addEventListener("click", orderByVolume);
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
    div.append(p);
    //
    p = document.createElement("p");
    p.id = "volumeLegendP";
    div.append(p);
    //
    // var table = document.createElement("table");
    // table.id = "listTable";
    // var header = table.createTHead();
    // var row = header.insertRow(0);
    // var cell = row.insertCell(0);
    // cell.innerText = "No.";
    // cell = row.insertCell(1);
    // cell.innerText = "Date";
    // cell = row.insertCell(2);
    // cell.innerText = "Trending";
    // cell = row.insertCell(3);
    // cell.innerText = "Momentum";
    // cell = row.insertCell(4);
    // cell.innerText = "ATC";
    // cell = row.insertCell(5);
    // cell.innerText = "ATO";
    // cell = row.insertCell(6);
    // cell.id = "orderStatistic";
    // cell.innerText = "Order";
    // div.append(table);
    //
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
        timeScale: { timeVisible: true }
    };
    mChart.object = LightweightCharts.createChart(div, chartOptions);
    if (navigator.userAgentData.mobile)
        mChart.object.subscribeCrosshairMove(chartClick);
    else mChart.object.subscribeClick(chartClick);
    //
    mChart.object.subscribeCrosshairMove(e => {
        if (e.time) {
            mConfig.crosshair = true;
            const price = e.seriesPrices.get(mChart.series.price);
            document.getElementById("priceLegendP").innerText = !!price
                ? price
                : null;
            const volume = e.seriesPrices.get(mChart.series.volume);
            document.getElementById("volumeLegendP").innerText = !!volume
                ? volume
                : null;
        } else mConfig.crosshair = false;
    });
    //
    mChart.series.price = mChart.object.addLineSeries({
        color: "#00FFFF",
        priceFormat: { precision: 1 }
    });
    mChart.series.volume = mChart.object.addLineSeries({
        priceScaleId: "volume",
        color: "#FF00FF",
        priceFormat: { precision: 0 }
    });
    mChart.object.timeScale().fitContent();

    function chartClick(e) {
        var pOrdBtn = document.getElementById("priceOrderButton");
        var vOrdBtn = document.getElementById("volumeOrderButton");
        if (e.time) {
            const price = e.seriesPrices.get(mChart.series.price);
            if (!!price) {
                pOrdBtn.style.left = +(e.point.x - 41) + "px";
                pOrdBtn.style.top = +(e.point.y - 40) + "px";
                pOrdBtn.style.display = "block";
                mChart.order.price = {
                    value: price,
                    type: price >= mChart.data.price.slice(-1)[0].value
                };
                pOrdBtn.innerText = mChart.order.price.type ? "↗" : "↘";
            }
            const volume = e.seriesPrices.get(mChart.series.volume);
            if (!!volume) {
                vOrdBtn.style.left = +(e.point.x - 41) + "px";
                vOrdBtn.style.top = +e.point.y + "px";
                vOrdBtn.style.display = "block";
                mChart.order.volume = {
                    value: volume,
                    type: volume >= mChart.data.volume.slice(-1)[0].value
                };
                vOrdBtn.innerText = mChart.order.volume.type ? "↗" : "↘";
            } else vOrdBtn.style.display = "none";
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
            if (event.keyCode == 38) {
                mConfig.barSpacing += 0.5;
                mChart.object
                    .timeScale()
                    .applyOptions({ barSpacing: mConfig.barSpacing });
            } else if (event.keyCode == 40) {
                mConfig.barSpacing -= 0.5;
                mChart.object
                    .timeScale()
                    .applyOptions({ barSpacing: mConfig.barSpacing });
            }
        } else if (event.which === 27) {
            document.getElementById("priceOrderButton").style.display = "none";
            document.getElementById("volumeOrderButton").style.display = "none";
        }
    }
}

function createIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("vpsDB", 1);
        request.onupgradeneeded = e => {
            console.log("onupgradeneeded");
            mDatabase = e.target.result;
            mDatabase.createObjectStore("data", { keyPath: "time" });
            // mDatabase.createObjectStore("trend", { keyPath: "key" });
            // mDatabase.createObjectStore("momentum", { keyPath: "key" });
            // mDatabase.createObjectStore("atc", { keyPath: "key" });
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
    socket.on("boardps", data => {
        // console.log("boardps", data.data);
        bidAskHandler(data.data);
        // periodicHandler(data.data);
    });
    socket.on("stockps", data => {
        // console.log("stockps", data.data);
        priceHandler(data.data);
    });

    function priceHandler(data) {
        if (data.id == 3220) {
            // console.log("price" + data.id);
            if (data.lastVol < data.totalVol) {
                if (!!mConfig.bidPrice && !!mConfig.askPrice) {
                    var side = "";
                    if (data.lastPrice <= mConfig.bidPrice) side = "SD";
                    else if (data.lastPrice >= mConfig.askPrice) side = "BU";
                    else side = mData.slice(-1)[0].side;
                    var param = {
                        time: `${mConfig.currentDate} ${data.timeServer}`,
                        price: data.lastPrice,
                        vol: data.lastVol,
                        side: side
                    };
                    mChart.data = createChartData(mChart.data, param);
                    var lastPrice = mChart.data.price.slice(-1)[0];
                    var lastVolume = mChart.data.volume.slice(-1)[0];
                    processVolumeOrder(lastVolume);
                    //
                    if (mConfig.timeFrame > 0) {
                        mChart.series.price.setData(mChart.data.price);
                        mChart.series.volume.setData(mChart.data.volume);
                    } else {
                        mChart.series.price.update(lastPrice);
                        mChart.series.volume.update(lastVolume);
                    }
                    if (!mConfig.crosshair) {
                        document.getElementById("priceLegendP").innerText =
                            lastPrice.value;
                        document.getElementById("volumeLegendP").innerText =
                            lastVolume.value;
                    }
                    //
                    setLocalData("data", param);
                    mData.push(param);
                    mConfig.hasChangedData = true;
                }
            }
        }

        function processVolumeOrder(lastVolume) {
            if (mConfig.volumeOrderConfirm) {
                var isOrder = false;
                document.getElementById("select_normal_order_wrapper").click();
                document.getElementById("right_price").value = "MTL";
                if (
                    mChart.order.volume.type &&
                    lastVolume.value >= mChart.order.volume.value
                ) {
                    document.getElementById("btn_long").click();
                    isOrder = true;
                } else if (
                    !mChart.order.volume.type &&
                    lastVolume.value <= mChart.order.volume.value
                ) {
                    document.getElementById("btn_short").click();
                    isOrder = true;
                }
                //
                if (isOrder) {
                    mConfig.volumeOrderConfirm = false;
                    document.getElementById(
                        "volumeCancelButton"
                    ).style.display = "none";
                    removeOrderLine("volume");
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

    // function periodicHandler(data) {
    //     if (data.id == 3220) {
    //         // console.log("price", data);
    //         var price = {
    //             time: moment(`${mConfig.currentDate} ${data.timeServer}`)
    //                 .add(7, "hours")
    //                 .unix(),
    //             value: data.lastPrice
    //         };
    //         mChart.series.price.update(price);
    //         mChart.data.price.push(price);
    //         if (!mConfig.crosshair)
    //             document.getElementById("priceLegendP").innerText = price.value;
    //         //
    //         if (inAtcTimeRange()) {
    //             if (!!mConfig.p24h30) {
    //                 var newAtc = data.lastPrice - mConfig.p24h30;
    //                 var isGet =
    //                     mConfig.strategy.atc == 0 ||
    //                     newAtc == 0 ||
    //                     (newAtc != 0 && mConfig.strategy.atc / newAtc < 0);
    //                 mConfig.strategy.atc = newAtc != 0 ? newAtc.toFixed(1) : 0;
    //                 if (isGet) getStrategy();
    //                 document.getElementById("atcInput").value =
    //                     mConfig.strategy.atc;
    //                 setLocalData("atc", {
    //                     key: 1,
    //                     value: mConfig.strategy.atc
    //                 });
    //             }
    //         }
    //     }
    // }
}

function loadPage() {
    getData();
    //
    document.getElementById("sohopdong").value = mConfig.contractNumber;
    // setTimeout(() => {
    //     getLocalData(["trend", "momentum", "atc"]).then(data => {
    //         if (inAtcTimeRange()) {
    //             mConfig.strategy.trend =
    //                 data[0].length > 0 ? data[0][0].value : 0;
    //             mConfig.strategy.momentum =
    //                 data[1].length > 0 ? data[1][0].value : 0;
    //             mConfig.strategy.atc =
    //                 data[2].length > 0 ? data[2][0].value : 0;
    //         }
    //         document.getElementById("trendSelect").value =
    //             mConfig.strategy.trend;
    //         document.getElementById("momentumInput").value =
    //             mConfig.strategy.momentum;
    //         document.getElementById("atcInput").value = mConfig.strategy.atc;
    //         getStrategy();
    //     });
    // }, 5000);
    // Load Order List
    var button = document.createElement("button");
    button.setAttribute(
        "onclick",
        "openPanel('conditionOrder');openPanel('conditionOrder');"
    );
    button.click();
}

function intervalHandler() {
    mConfig.currentTime = moment(
        `${mConfig.currentDate} ${
            document.querySelector(".timeStamp").innerText
        }`,
        "YYYY-MM-DD H:mm:ss"
    ).format("HH:mm:ss");
    // var session = inPeriodicTimeRange();
    // if (!!session) document.getElementById("right_price").value = session;
    //
    // if (inAtcTimeRange() && !mConfig.p24h30) getVn30f1m();
    //
    // Report
    if (mConfig.currentTime == mConfig.time.end) {
        setTimeout(() => reportHandler(), 60000);
        // setTimeout(() => setStrategy(), 45000);
    }
    //
    //
    removePriceOrderLine();
    //
    showRunningStatus();
    //
    // var time = moment()
    //     .add(7, "hours")
    //     .unix();
    // var temp = {
    //     time: time,
    //     value: 1000 + 100 * (Math.random() - 0.5)
    // };
    // mChart.series.price.update(temp);
    // mChart.data.price.push(temp);
    // if (!mConfig.crosshair)
    //     document.getElementById("priceLegendP").innerText = temp.value.toFixed(
    //         1
    //     );
    // temp = {
    //     time: time,
    //     value:
    //         (mChart.data.volume.length
    //             ? mChart.data.volume.slice(-1)[0].value
    //             : 0) +
    //         200000 * (Math.random() - 0.5)
    // };
    // mChart.series.volume.update(temp);
    // mChart.data.volume.push(temp);
    // if (!mConfig.crosshair)
    //     document.getElementById("volumeLegendP").innerText = temp.value.toFixed(
    //         0
    //     );
}

function getData(date = null, tcbs = false) {
    mConfig.hasChangedData = false;
    return new Promise((resolve, reject) => {
        toggleSpinner(true);
        Promise.all([getServerData(date, tcbs), getLocalData("data")])
            .then(arr => {
                console.log("getData: ", arr);
                var ids = new Set(arr[0].map(d => d.time));
                mData = [
                    ...arr[0],
                    ...arr[1].filter(d => !ids.has(d.time))
                ].sort((a, b) => a.time.localeCompare(b.time));
                console.log("data", mData);
                //
                if (!tcbs) {
                    if (!mConfig.hasChangedData) {
                        clearLocalData("data").then(() =>
                            setLocalData("data", mData)
                        );
                    } else return getData();
                }
                //
                mChart.data = mData.reduce(
                    (r, item) => {
                        return createChartData(r, item);
                    },
                    { price: [], volume: [] }
                );
                console.log(
                    "chartData",
                    JSON.parse(JSON.stringify(mChart.data))
                );
                mChart.series.price.setData(mChart.data.price);
                mChart.series.volume.setData(mChart.data.volume);
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
    var prevVolume = !!r.volume.length ? r.volume.slice(-1)[0].value : 0;
    var volume = (item.side == "BU" ? 1 : -1) * item.vol;
    if (mConfig.timeFrame > 0) {
        var period = 60 * mConfig.timeFrame;
        var timeIndex = Math.floor(time / period);
        var isSameTime = false;
        if (!!r.volume.length) {
            var prevTime = r.volume.slice(-1)[0].time;
            if (timeIndex == Math.floor(prevTime / period)) isSameTime = true;
        }
        if (isSameTime) {
            r.price.pop();
            r.volume.pop();
        }
        time = timeIndex * period;
    }
    r.price.push({ time: time, value: item.price });
    r.volume.push({ time: time, value: prevVolume + volume });
    //
    return r;
}

function getServerData(date = null, tcbs = false) {
    return new Promise((resolve, reject) => {
        var data = { action: "GET", date: date, tcbs: tcbs };
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

function toggleSpinner(status) {
    var img = document.getElementById("spinnerImg");
    img.style.opacity = status ? 1 : 0;
}

function inAtcTimeRange() {
    return (
        mConfig.currentTime >= mConfig.time.atc &&
        mConfig.currentTime < mConfig.time.end
    );
}

function inPeriodicTimeRange() {
    var isAtoSession =
        mConfig.currentTime > mConfig.time.start &&
        mConfig.currentTime <= mConfig.time.ato;
    var isAtcSession = inAtcTimeRange();
    return isAtoSession ? "ATO" : isAtcSession ? "ATC" : "";
}

function showRunningStatus() {
    var button = document.getElementById("lineButton");
    if (button.classList.contains("dark")) button.classList.remove("dark");
    else button.classList.add("dark");
}

// function getStrategy() {
//     return new Promise((resolve, reject) => {
//         toggleSpinner(true);
//         const url = mConfig.root + mConfig.endpoint.getStrategy;
//         fetch(url, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 trend: mConfig.strategy.trend,
//                 momentum: mConfig.strategy.momentum,
//                 atc: mConfig.strategy.atc
//             })
//         })
//             .then(response => response.json())
//             .then(json => {
//                 console.log("getStrategy", json);
//                 var table = document.getElementById("listTable");
//                 var tbody = table.querySelector("tbody");
//                 if (tbody) table.removeChild(tbody);
//                 tbody = table.createTBody();
//                 if (json.length > 6) tbody.style.height = "200px";
//                 else tbody.style.height = "unset";
//                 json.forEach((item, index) => {
//                     var row = tbody.insertRow(index);
//                     var cell = row.insertCell(0);
//                     cell.innerText = index + 1;
//                     cell = row.insertCell(1);
//                     cell.innerText = item.date;
//                     cell = row.insertCell(2);
//                     cell.innerText = item.trend;
//                     cell = row.insertCell(3);
//                     cell.innerText = !!item.momentum
//                         ? item.momentum.toFixed(1)
//                         : item.momentum;
//                     cell = row.insertCell(4);
//                     cell.innerText = !!item.atc
//                         ? item.atc.toFixed(1)
//                         : item.atc;
//                     cell = row.insertCell(5);
//                     cell.innerText = !!item.ato
//                         ? item.ato.toFixed(1)
//                         : item.ato;
//                     cell.style.backgroundColor = !!item.ato
//                         ? item.ato >= 0
//                             ? "LimeGreen"
//                             : "red"
//                         : "white";
//                     cell = row.insertCell(6);
//                     cell.innerText = item.order;
//                     cell.style.backgroundColor =
//                         !!item.ato && !!item.order
//                             ? item.ato / item.order >= 0
//                                 ? "LimeGreen"
//                                 : "red"
//                             : "white";
//                 });
//                 //
//                 var posList = json.filter(item => !!item.ato && item.ato >= 0);
//                 var posPer = ((posList.length / json.length) * 100).toFixed(0);
//                 var btn = document.getElementById("listButton");
//                 btn.innerText = `${posPer} - ${100 - posPer}`;
//                 btn.style.background = `linear-gradient(to right, LimeGreen ${posPer}%, red ${posPer}% ${100 -
//                     posPer}%)`;
//                 //
//                 var posOrdList = json.filter(
//                     item =>
//                         !!item.ato && !!item.order && item.ato / item.order >= 0
//                 );
//                 var negOrdList = json.filter(
//                     item =>
//                         !!item.ato && !!item.order && item.ato / item.order < 0
//                 );
//                 var posOrdPer = (
//                     (posOrdList.length /
//                         (posOrdList.length + negOrdList.length)) *
//                     100
//                 ).toFixed(0);
//                 var td = document.getElementById("orderStatistic");
//                 td.innerText = `${posOrdPer} - ${100 - posOrdPer}`;
//                 td.style.background = `linear-gradient(to right, LimeGreen ${posOrdPer}%, red ${posPer}% ${100 -
//                     posOrdPer}%)`;
//                 //
//                 toggleSpinner(false);
//                 resolve();
//             });
//     });
// }

// function setStrategy() {
//     toggleSpinner(true);
//     const url = mConfig.root + mConfig.endpoint.setStrategy;
//     var order = parseInt(
//         document.querySelector("#status-danhmuc-content > tr > td:nth-child(2)")
//             .innerText
//     );
//     var data = {
//         trend: mConfig.strategy.trend,
//         momentum: mConfig.strategy.momentum,
//         atc: mConfig.strategy.atc,
//         order: !isNaN(order) ? order : null
//     };
//     fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//             throw new Error(response.statusText);
//         })
//         .then(jsondata => {
//             console.log(`SetStrategy-Start ##############################`);
//             console.log(jsondata);
//             console.log(`SetStrategy-End ##############################`);
//             if (jsondata.isOk) alert(`Lưu Strategy thành công`);
//             toggleSpinner(false);
//         })
//         .catch(error => {
//             console.log(`SetStrategy-Start ##############################`);
//             console.log(error);
//             console.log(`SetStrategy-End ##############################`);
//             alert(`Lưu Strategy thất bại`);
//         });
// }

// function getVn30f1m() {
//     return new Promise((resolve, reject) => {
//         toggleSpinner(true);
//         const url = mConfig.root + mConfig.endpoint.getVn30f1m;
//         fetch(url, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" }
//         })
//             .then(response => response.json())
//             .then(json => {
//                 console.log("getVn30f1m", json);
//                 mConfig.p24h29 = json[0];
//                 mConfig.p24h30 = json[1];
//                 mConfig.strategy.momentum = (
//                     mConfig.p24h30 - mConfig.p24h29
//                 ).toFixed(1);
//                 document.getElementById("momentumInput").value =
//                     mConfig.strategy.momentum;
//                 setLocalData("momentum", {
//                     key: 1,
//                     value: mConfig.strategy.momentum
//                 });
//                 //
//                 if (mChart.data.price.length > 0) {
//                     mConfig.strategy.atc = (
//                         mChart.data.price.slice(-1)[0].value - mConfig.p24h30
//                     ).toFixed(1);
//                     document.getElementById("atcInput").value =
//                         mConfig.strategy.atc;
//                     setLocalData("atc", {
//                         key: 1,
//                         value: mConfig.strategy.atc
//                     });
//                 }
//                 getStrategy();
//                 toggleSpinner(false);
//                 resolve();
//             })
//             .catch(error => getVn30f1m());
//     });
// }

function getVolumeByPrice() {
    return new Promise((resolve, reject) => {
        toggleSpinner(true);
        const url = mConfig.root + mConfig.endpoint.volumeByPrice;
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(json => {
                console.log("getVolumeByPrice", json);
                mHighcharts.xAxis[0].setCategories(json.price);
                mHighcharts.series[0].setData(json.sell);
                mHighcharts.series[1].setData(json.buy);
                toggleSpinner(false);
                resolve();
            });
    });
}

function orderByPrice() {
    document.getElementById("btn_cancel_all_order_condition").click();
    createOrderLine("price");
    document.getElementById("select_condition_order_wrapper").click();
    document.getElementById(
        "right_stopOrderIndex"
    ).value = mChart.order.price.value.toFixed(1);
    document.getElementById("right_price").value = "MTL";
    document.getElementById("right_selStopOrderType").value = mChart.order.price
        .type
        ? "SOL"
        : "SOU";
    //
    var btn = document.getElementById("priceCancelButton");
    btn.style.display = "block";
    btn.style.border = `2px solid ${mChart.order.price.type ? "green" : "red"}`;
    setTimeout(() => {
        document
            .getElementById(`btn_${mChart.order.price.type ? "long" : "short"}`)
            .click();
    }, 1000);
    document.getElementById("priceOrderButton").style.display = "none";
    document.getElementById("volumeOrderButton").style.display = "none";
}

function orderByVolume() {
    mConfig.volumeOrderConfirm = true;
    createOrderLine("volume");
    var btn = document.getElementById("volumeCancelButton");
    btn.style.display = "block";
    btn.style.border = `5px solid ${
        mChart.order.volume.type ? "green" : "red"
    }`;
    document.getElementById("priceOrderButton").style.display = "none";
    document.getElementById("volumeOrderButton").style.display = "none";
}

function createOrderLine(series) {
    removeOrderLine(series);
    mChart.line[series] = mChart.series[series].createPriceLine({
        price: mChart.order[series].value,
        color: series == "price" ? "#00FFFF" : "#FF00FF",
        lineWidth: 1,
        lineStyle: LightweightCharts.LineStyle.Solid,
        title: mChart.order[series].type ? "LONG" : "SHORT"
    });
}
function removeOrderLine(series) {
    if (mChart.line.hasOwnProperty(series)) {
        mChart.series[series].removePriceLine(mChart.line[series]);
        delete mChart.line[series];
    }
}

function removePriceOrderLine() {
    var button = document.createElement("button");
    button.setAttribute("onclick", "objOrderPanel.showConditionOrderList();");
    button.click();
    setTimeout(() => {
        var removeBtn = document.getElementById("priceCancelButton");
        if (removeBtn.style.display == "block") {
            var hasOrder = false;
            var rows = document.getElementById("tbodyContentCondition").rows;
            for (var item of rows) {
                if (item.cells[9].innerText == "Chờ kích hoạt") {
                    hasOrder = true;
                    break;
                }
            }
            if (!hasOrder) {
                removeBtn.style.display = "none";
                removeOrderLine("price");
            }
        }
    }, 20000);
}
