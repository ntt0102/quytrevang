var mConfig = {};
var mChart = {};

getLocalConfig()
    .then(() => getServerConfig())
    .then(() => {
        createButtons();
        createChart();
        registerEvent();
        connectSocket();
        loadPage();
        setInterval(intervalHandler, 1000);
    });

function getLocalConfig() {
    return new Promise((resolve, reject) => {
        const file = chrome.runtime.getURL("config.json");
        fetch(file)
            .then(response => response.json())
            .then(json => {
                mConfig = json;
                mConfig.isReportedResult = false;
                mConfig.zoomLevel = 1;
                mConfig.displayDate = moment().format("YYYY-MM-DD");
                mConfig.currentDate = mConfig.displayDate;
                mConfig.currentTime = moment().format("HH:mm:ss");
                mConfig.socketVol10Temp = { side: "B", B: 0, S: 0 };
                setTimeout(() => {
                    mConfig.VN30F1M = document.getElementById(
                        "tbodyPhaisinhContent"
                    ).rows[0].cells[0].innerText;
                    resolve();
                }, 1000);
                console.log("mConfig", mConfig);
            });
    });
}

function getServerConfig() {
    return new Promise((resolve, reject) => {
        const url = mConfig.endpoint.config;
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
                resolve();
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
        } else {
            document.body.classList.add("continuous-order");
            document.body.classList.remove("periodic-order");
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
    var input = document.createElement("input");
    input.id = "streamInput";
    input.style.zIndex = -1;
    input.setAttribute("type", "number");
    input.setAttribute("min", 1);
    input.addEventListener("input", e => {
        mConfig.streamScale = e.target.value;
        showStreamMode();
    });
    div.append(input);
    //
    input = document.createElement("input");
    input.id = "dateInput";
    input.setAttribute("type", "date");
    input.setAttribute("value", mConfig.displayDate);
    input.addEventListener("change", e => {
        mConfig.displayDate = e.target.value;
        if (mConfig.displayDate) {
            showdisplayMode(mConfig.displayMode);
            drawTimeLine();
        } else changeDisplayMode("Full");
        getData();
    });
    div.append(input);
    //
    //
    var button = document.createElement("button");
    button.id = "exportButton";
    button.innerText = "Export";
    button.addEventListener("click", () => exportHandler(mConfig.displayMode));
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
        var choice = confirm("Xoá toàn bộ dữ liệu?");
        if (choice) clearData().then(() => changeDisplayMode("Stream"));
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
                    label: "KL10",
                    data: [],
                    borderColor: "cyan",
                    backgroundColor: "cyan",
                    yAxisID: "y2",
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHitRadius: 20,
                    order: 2
                },
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
                    label: "KL10",
                    data: [],
                    borderColor: "cyan",
                    backgroundColor: "cyan",
                    yAxisID: "y2",
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHitRadius: 20,
                    order: 2
                }
            ]
        },
        options: {
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
                        volume_0: {
                            type: "line",
                            yScaleID: "y1",
                            yMin: 0,
                            yMax: 0,
                            borderColor: "magenta",
                            borderWidth: 1,
                            borderDash: [5, 5],
                            adjustScaleRange: false
                        },
                        vol10_0: {
                            type: "line",
                            yScaleID: "y2",
                            yMin: 0,
                            yMax: 0,
                            borderColor: "cyan",
                            borderWidth: 1,
                            borderDash: [5, 5],
                            adjustScaleRange: false
                        },
                        startATO: {
                            type: "line",
                            xMin: moment(
                                `${mConfig.displayDate} ${mConfig.time.ATO.start}`
                            ),
                            xMax: moment(
                                `${mConfig.displayDate} ${mConfig.time.ATO.start}`
                            ),
                            borderColor: "lime",
                            borderWidth: 1,
                            borderDash: [5, 5],
                            adjustScaleRange: false
                        },
                        endATO: {
                            type: "line",
                            xMin: moment(
                                `${mConfig.displayDate} ${mConfig.time.ATO.end}`
                            ),
                            xMax: moment(
                                `${mConfig.displayDate} ${mConfig.time.ATO.end}`
                            ),
                            borderColor: "lime",
                            borderWidth: 1,
                            borderDash: [5, 5],
                            adjustScaleRange: false
                        },
                        startATC: {
                            type: "line",
                            xMin: moment(
                                `${mConfig.displayDate} ${mConfig.time.ATC.start}`
                            ),
                            xMax: moment(
                                `${mConfig.displayDate} ${mConfig.time.ATC.start}`
                            ),
                            borderColor: "red",
                            borderWidth: 1,
                            borderDash: [5, 5],
                            adjustScaleRange: false
                        },
                        endATC: {
                            type: "line",
                            xMin: moment(
                                `${mConfig.displayDate} ${mConfig.time.ATC.end}`
                            ),
                            xMax: moment(
                                `${mConfig.displayDate} ${mConfig.time.ATC.end}`
                            ),
                            borderColor: "red",
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
                    mChart.data.datasets[2].order = 2;
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

function setData(data) {
    data.action = "SET";
    data.x = data.x.format("YYYY-MM-DD HH:mm:ss");
    const url = mConfig.endpoint.data;
    toggleSpinner(true);
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(() => toggleSpinner(false));
}

function clearData() {
    return new Promise((resolve, reject) => {
        var data = { action: "CLEAR" };
        const url = mConfig.endpoint.data;
        toggleSpinner(true);
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            mChart.data.datasets.forEach(item => (item.data = []));
            mChart.update("none");
            toggleSpinner(false);
            resolve();
        });
    });
}

function getData() {
    return new Promise((resolve, reject) => {
        var data = { action: "GET", date: mConfig.displayDate };
        const url = mConfig.endpoint.data;
        toggleSpinner(true);
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                console.log("getData", json);
                json.price.map(item => {
                    item.x = moment(item.x);
                    return item;
                });
                json.volume.map(item => {
                    item.x = moment(item.x);
                    return item;
                });
                mChart.data.datasets[0].data = json.price;
                mChart.data.datasets[1].data = json.volume;
                mChart.data.datasets[2].data = json.vol10;
                mChart.update("none");
                toggleSpinner(false);
                resolve();
            });
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
        var session = inTradingTimeRange();
        if (!!session) {
            // console.log("boardps", data.data);
            priceHandler(data.data);
            volumeHandler(data.data);
            vol10Handler(data.data, session);
        }
    });
    socket.on("stockps", data => {
        if (!!inTradingTimeRange()) {
            // console.log("stockps", data.data);
            priceHandler(data.data);
        }
    });
    function priceHandler(data) {
        if (data.id == 3220) {
            // console.log("price" + data.id);
            const price = {
                x: moment(`${mConfig.currentDate} ${data.timeServer}`),
                y: data.lastPrice
            };
            mChart.data.datasets[0].data.push(price);
            mChart.update("none");
        }
    }
    function volumeHandler(data) {
        if (data.id == 3310) {
            // console.log("volume" + data.id);
            const volume = {
                x: moment(`${mConfig.currentDate} ${data.timeServer}`),
                y: data.BVolume - data.SVolume
            };
            mChart.data.datasets[1].data.push(volume);
            mChart.update("none");
        }
    }
    function vol10Handler(data, session) {
        if (data.id == 3211 && session == "ATC") {
            var sum = data.ndata
                .split("SOH")
                .reduce((acc, item) => acc + +item.split(":")[1], 0);

            if (
                data.side == "B" &&
                mConfig.socketVol10Temp.side == "S" &&
                mConfig.socketVol10Temp.B != 0
            ) {
                const vol10 = {
                    x: moment(`${mConfig.currentDate} ${mConfig.currentTime}`),
                    y: mConfig.socketVol10Temp.B - mConfig.socketVol10Temp.S
                };
                mChart.data.datasets[2].data.push(vol10);
                mChart.update("none");
            }
            mConfig.socketVol10Temp.side = data.side;
            mConfig.socketVol10Temp[data.side] = sum;
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
        var currentPrice = document.getElementById("tbodyPhaisinhContent")
            .rows[0].cells[10].innerText;
        if (Math.abs(currentPrice - stopPrice) < 20) {
            if (stopOperation == "SOL" && currentPrice >= stopPrice)
                isError = true;
            else if (stopOperation == "SOU" && currentPrice <= stopPrice)
                isError = true;
        }
        if (isError) alert("Đặt sai điều kiện");
    }

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            document.body.classList.add("fullscreen");
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            document.body.classList.remove("fullscreen");
        }
    }
}

function loadPage() {
    // Load Order List
    var button = document.createElement("button");
    button.setAttribute("onclick", "objOrderPanel.showOrderList()");
    button.click();
    //
    document.getElementById("sohopdong").value = mConfig.contractNumber;
    updateChartTitle();
    //
    getData();
}

function intervalHandler() {
    mConfig.currentTime = moment(
        `${mConfig.currentDate} ${
            document.querySelector(".timeStamp").innerText
        }`,
        "YYYY-MM-DD H:mm:ss"
    ).format("HH:mm:ss");
    var session = inTradingTimeRange();
    if (!!session) document.getElementById("right_price").value = session;
    //
    //Display
    if (isTradingTime("start")) {
        if (!document.body.classList.contains("periodic-order"))
            document.body.classList.add("periodic-order");
        changeDisplayMode(session);
    }
    // Export
    if (isTradingTime("end")) exportHandler(session);
    // Report
    if (
        mConfig.currentTime == mConfig.time.ATC.end &&
        !mConfig.isReportedResult
    ) {
        mConfig.isReportedResult = true;
        setTimeout(() => reportHandler(), 30000);
    }
    //
    if (mConfig.displayMode == "Stream") showStreamMode();
    //
    var orderCounter = 0;
    for (var item of document.getElementById("tbodyContent").rows) {
        if (item.cells[0].innerText == "") break;
        else orderCounter++;
    }
    document.getElementById(
        "orderCountP"
    ).innerText = `Tổng số lệnh: ${orderCounter}`;
}

function reportHandler() {
    if (mConfig.isOpeningMarket) {
        const url = mConfig.endpoint.report;
        const data = {
            revenue: +document
                .getElementById("vmAccInfo")
                .innerText.replaceAll(",", ""),
            fees: +document
                .getElementById("othersAccInfo")
                .innerText.replaceAll(",", ""),
            scores: +document.getElementById("tbodyPhaisinhContent").rows[0]
                .cells[1].innerText
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
        mConfig.isReportedResult = true;
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
            });
    }
}

function exportHandler(session) {
    changeDisplayMode(session);
    getData().then(() => {
        var imageName = `vps-${moment().format("YYYY.MM.DD-HH.mm.ss")}.png`;
        var imageData = mChart.toBase64Image();
        if (Object.keys(mConfig.time).includes(session)) {
            const url = mConfig.endpoint.export;
            const data = { imageData, imageName, session };
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
                    console.log(
                        "UploadImage-Start ##############################"
                    );
                    console.log(jsondata);
                    console.log(
                        "UploadImage-End ##############################"
                    );
                    if (jsondata.isOk) alert("Đăng ảnh thành công");
                    toggleSpinner(false);
                })
                .catch(error => {
                    console.log(
                        "UploadImage-Start ##############################"
                    );
                    console.log(error);
                    console.log(
                        "UploadImage-End ##############################"
                    );
                    alert("Đăng ảnh thất bại");
                });
        } else {
            var a = document.createElement("a");
            a.href = imageData;
            a.download = imageName;
            a.click();
        }
    });
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
            showStreamMode();
            break;
        case "ATO":
        case "ATC":
            mChart.zoomScale(
                "x",
                {
                    min: moment(
                        `${mConfig.displayDate} ${
                            mConfig.time[mConfig.displayMode].start
                        }`
                    ),
                    max: moment(
                        `${mConfig.displayDate} ${
                            mConfig.time[mConfig.displayMode].end
                        }`
                    )
                },
                "none"
            );
            break;
    }
}

function showStreamMode() {
    mChart.zoomScale(
        "x",
        {
            min: moment().subtract(mConfig.streamScale, "minutes"),
            max: moment().add(mConfig.streamScale * 0.05, "minutes")
        },
        "none"
    );
}

function updateChartTitle() {
    mChart.options.plugins.title.text = `Biểu đồ ${
        mConfig.displayMode
    } ngày ${moment(mConfig.displayDate).format("DD/MM/YYYY")}`;
    mChart.update();
}

function toggleSpinner(status) {
    var img = document.getElementById("spinnerImg");
    img.style.opacity = status ? 1 : 0;
}

function drawTimeLine() {
    for (const session in mConfig.time) {
        for (const event in mConfig.time[session]) {
            var annotation =
                mChart.options.plugins.annotation.annotations[
                    `${event}${session}`
                ];
            annotation.xMin = moment(
                `${mConfig.displayDate} ${mConfig.time[session][event]}`
            );
            annotation.xMax = moment(
                `${mConfig.displayDate} ${mConfig.time[session][event]}`
            );
        }
    }
    mChart.update("none");
}

function inTradingTimeRange() {
    var isAtoSession =
        mConfig.currentTime >= mConfig.time.ATO.start &&
        mConfig.currentTime <= mConfig.time.ATO.end;
    var isAtcSession =
        mConfig.currentTime >= mConfig.time.ATC.start &&
        mConfig.currentTime <= mConfig.time.ATC.end;
    return isAtoSession ? "ATO" : isAtcSession ? "ATC" : false;
}

function isTradingTime(event) {
    return (
        mConfig.currentTime == mConfig.time.ATO[event] ||
        mConfig.currentTime == mConfig.time.ATC[event]
    );
}
