var mConfig = {};
var mChart = {};
var mDatabase = null;

getLocalConfig()
    .then(() => getServerConfig())
    .then(() => {
        createButtons();
        createChart();
        registerEvent();
        initSocket();
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
                console.log("mConfig", mConfig);
                resolve();
            });
    });
}

function getServerConfig() {
    return new Promise((resolve, reject) => {
        const url = mConfig.endpoint.config;
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(json => {
                console.log("getServerConfig", json);
                mConfig.isOpeningMarket = json.isOpeningMarket;
                mConfig.contractNumber = json.contractNumber;
                mConfig.isReportedResult = false;
                mConfig.zoomLevel = 1;
                resolve();
            });
    });
}

function createButtons() {
    var button = document.createElement("button");
    button.id = "continuousButton";
    button.innerText = "Liên tục";
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
    button.innerText = "Định kỳ";
    button.addEventListener("click", () => {
        if (document.body.classList.contains("periodic-order")) {
            document.body.classList.remove("periodic-order");
        } else {
            document.body.classList.add("periodic-order");
            document.body.classList.remove("continuous-order");
            mChart.resetZoom();
        }
    });
    document.body.append(button);
}

function createChart() {
    var div = document.createElement("div");
    div.id = "periodicChart";
    //
    var select = document.createElement("select");
    select.id = "displaySelect";
    ["Free", "ATO", "ATC", "Stream"].forEach((item, index) => {
        var option = document.createElement("option");
        option.value = item;
        option.text = item;
        select.appendChild(option);
    });
    select.addEventListener("change", e => {
        mConfig.displayMode = e.target.value;
        var input = document.getElementById("streamInput");
        if (mConfig.displayMode == "Stream") {
            input.style.zIndex = 1;
            input.value = mConfig.streamScale;
        } else {
            input.style.zIndex = -1;
            if (mConfig.displayMode != "Free") {
                var [hStart, mStart, sStart] = mConfig.time[
                    mConfig.displayMode
                ].start.split(":");
                var [hEnd, mEnd, sEnd] = mConfig.time[
                    mConfig.displayMode
                ].end.split(":");
                mChart.zoomScale(
                    "x",
                    {
                        min: moment().set({
                            hour: hStart,
                            minute: mStart,
                            second: sStart
                        }),
                        max: moment().set({
                            hour: hEnd,
                            minute: mEnd,
                            second: sEnd
                        })
                    },
                    "none"
                );
            }
        }
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
                    order: 2
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
                    order: 1
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: "time",
                    time: {
                        tooltipFormat: "DD-MM-YYYY HH:mm:ss",
                        displayFormats: {
                            month: "MM-YYYY",
                            day: "DD-MM-YYYY",
                            hour: "HH:mm",
                            minute: "HH:mm",
                            second: "HH:mm:ss",
                            millisecond: "mm:ss.SSS"
                        }
                    },
                    grid: {
                        color: "#696969",
                        borderDash: [2, 2]
                    }
                },
                y: {
                    grid: {
                        color: "#696969",
                        borderDash: [2, 2]
                    }
                },
                y1: {
                    position: "right",
                    grid: { display: true }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: "Biểu đồ"
                },
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: "x",
                        onZoomComplete: () => changeDisplayMode("Free")
                    },
                    pan: {
                        enabled: true,
                        mode: "x",
                        onPanComplete: () => changeDisplayMode("Free")
                    }
                }
            },
            elements: { line: { tension: 0.4 } },
            events: ["mousemove", "click"],
            onHover: (e, elements) => {
                if (elements.length) {
                    var datasetIndex = elements[0].datasetIndex;
                    mChart.data.datasets[datasetIndex].order = 1;
                    mChart.data.datasets[datasetIndex == 0 ? 1 : 0].order = 2;
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
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(response => console.log("setData"));
}

function getData() {
    var data = { action: "GET" };
    return new Promise((resolve, reject) => {
        const url = mConfig.endpoint.data;
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
                resolve(json);
            });
    });
}

function clearData() {
    var data = { action: "CLEAR" };
    const url = mConfig.endpoint.data;
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(response => console.log("clearData"));
}

function initSocket() {
    var symbol = document.getElementById("tbodyPhaisinhContent").rows[0]
        .cells[0].innerText;
    var msg = `{"action":"join","list":"${symbol}"}`;
    var socket = io(mConfig.endpoint.socket);
    socket.on("connect", () => socket.emit("regs", msg));
    socket.on("reconnect", () => socket.emit("regs", msg));
    socket.on("boardps", data => {
        priceHandler(data.data);
        volumeHandler(data.data);
    });
    socket.on("stockps", data => priceHandler(data.data));
    function priceHandler(data) {
        if (data.id == 3220) {
            console.log("price" + data.id);
            const price = {
                x: new Date(),
                y: data.lastPrice
            };
            mChart.data.datasets[0].data.push(price);
            mChart.update("none");
            price.type = false;
            setData(price);
        }
    }
    function volumeHandler(data) {
        if (data.id == 3310) {
            console.log("volume" + data.id);
            const volume = {
                x: new Date(),
                y: data.BVolume - data.SVolume
            };
            mChart.data.datasets[1].data.push(volume);
            mChart.update("none");
            price.type = true;
            setData(volume);
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
    // const price = {
    //     x: moment(),
    //     y: 100 * Math.random(),
    //     type: false
    // };
    // setData(price);
    // const volume = {
    //     x: moment(),
    //     y: 1000 * Math.random(),
    //     type: true
    // };
    // setData(volume);
    // Load Order List
    var button = document.createElement("button");
    button.setAttribute("onclick", "objOrderPanel.showOrderList()");
    button.click();
    //
    document.getElementById("sohopdong").value = mConfig.contractNumber;
    mChart.options.plugins.title.text = `Biểu đồ ngày ${moment().format(
        "DD/MM/YYYY"
    )}`;
    mChart.update();
    //
    getData().then(result => {
        mChart.data.datasets[0].data = result.price;
        mChart.data.datasets[1].data = result.volume;
        mChart.update("none");
    });
    // getDatabase("volume").then(r => {
    //     r.forEach(item => {
    //         setTimeout(() => {
    //             item.x = moment(item.x);
    //             item.type = true;
    //             console.log(item);
    //             setData(item);
    //         }, 5000);
    //     });
    // });
}

function intervalHandler() {
    var currentTime = moment().format("HH:mm:ss");
    var isAtoSession =
        currentTime >= mConfig.time.ATO.start &&
        currentTime <= mConfig.time.ATO.end;
    var isAtcSession =
        currentTime >= mConfig.time.ATC.start &&
        currentTime <= mConfig.time.ATC.end;
    var session = isAtoSession ? "ATO" : isAtcSession ? "ATC" : null;
    if (isAtoSession || isAtcSession)
        document.getElementById("right_price").value = session;
    //
    if (currentTime == mConfig.time.ATO.start) clearData();
    //Display
    if (
        currentTime == mConfig.time.ATO.start ||
        currentTime == mConfig.time.ATC.start
    ) {
        if (!document.body.classList.contains("periodic-order"))
            document.body.classList.add("periodic-order");
        changeDisplayMode(session);
    }
    // Export
    if (
        currentTime == mConfig.time.ATO.end ||
        currentTime == mConfig.time.ATC.end
    )
        exportHandler(session);
    // Report
    if (currentTime >= mConfig.time.ATC.end && !mConfig.isReportedResult) {
        mConfig.isReportedResult = true;
        setTimeout(() => reportHandler(), 30000);
    }
    //
    if (mConfig.displayMode == "Stream") {
        mChart.zoomScale(
            "x",
            {
                min: moment().subtract(mConfig.streamScale, "minutes"),
                max: moment()
            },
            "none"
        );
    }
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
                if (jsondata.isOk && jsondata.isExecuted)
                    alert("Báo cáo đã gửi thành công.");
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
    mChart.options.plugins.title.text = `Biểu đồ ${session} ngày ${moment().format(
        "DD/MM/YYYY"
    )}`;
    mChart.update();
    changeDisplayMode(session);
    setTimeout(() => {
        var imageName = `vps-${moment().format("YYYY.MM.DD-HH.mm.ss")}.png`;
        var imageData = mChart.toBase64Image();
        if (["ATO", "ATC"].includes(session)) {
            const url = mConfig.endpoint.export;
            const data = { imageData, imageName, session };
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
    }, 0);
}

function changeDisplayMode(mode) {
    var select = document.getElementById("displaySelect");
    select.value = mode;
    select.dispatchEvent(new Event("change"));
}
