var mConfig = {};
var mChart = {};

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
                mConfig.isReportedResult = false;
                mConfig.zoomLevel = 1;
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
    select.addEventListener("change", e => {
        mConfig.displayMode = e.target.value;
        var input = document.getElementById("streamInput");
        input.style.zIndex = -1;
        switch (mConfig.displayMode) {
            case "Full":
                mChart.resetZoom();
                break;
            case "Stream":
                input.style.zIndex = 1;
                input.value = mConfig.streamScale;
                break;
            case "ATO":
            case "ATC":
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
                break;
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
    button = document.createElement("button");
    button.id = "refreshButton";
    button.innerText = "Refresh";
    button.addEventListener("click", () => {
        getData().then(result => {
            mChart.data.datasets[0].data = result.price;
            mChart.data.datasets[1].data = result.volume;
            mChart.update("none");
        });
    });
    div.append(button);
    //
    button = document.createElement("button");
    button.id = "clearButton";
    button.innerText = "Clear";
    button.addEventListener("click", () => {
        var choice = confirm("Xoá toàn bộ dữ liệu?");
        if (choice)
            clearData().then(() => {
                mChart.data.datasets[0].data = [];
                mChart.data.datasets[1].data = [];
                mChart.update("none");
                changeDisplayMode("Stream");
            });
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
                }
            },
            elements: { line: { tension: 0.1 } },
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
            resolve();
            toggleSpinner(false);
        });
    });
}

function getData() {
    return new Promise((resolve, reject) => {
        var data = { action: "GET" };
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
                resolve(json);
                toggleSpinner(false);
            });
    });
}

function initSocket() {
    var msg = { action: "join", list: mConfig.VN30F1M };
    var socket = io(mConfig.endpoint.socket);
    socket.on("connect", () => socket.emit("regs", JSON.stringify(msg)));
    socket.on("reconnect", () => socket.emit("regs", JSON.stringify(msg)));
    socket.on("boardps", data => {
        console.log("boardps");
        priceHandler(data.data);
        volumeHandler(data.data);
    });
    socket.on("stockps", data => {
        console.log("stockps");
        priceHandler(data.data);
    });
    function priceHandler(data) {
        if (data.id == 3220) {
            console.log("price" + data.id);
            const price = {
                x: moment(),
                y: data.lastPrice
            };
            mChart.data.datasets[0].data.push(price);
            mChart.update("none");
        }
    }
    function volumeHandler(data) {
        if (data.id == 3310) {
            console.log("volume" + data.id);
            const volume = {
                x: moment(),
                y: data.BVolume - data.SVolume
            };
            mChart.data.datasets[1].data.push(volume);
            mChart.update("none");
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
                max: moment().add(mConfig.streamScale * 0.05, "minutes")
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
                if (jsondata.isOk && jsondata.isExecuted)
                    alert("Báo cáo đã gửi thành công.");
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
    }, 0);
}

function changeDisplayMode(mode) {
    var select = document.getElementById("displaySelect");
    select.value = mode;
    select.dispatchEvent(new Event("change"));
}

function toggleSpinner(status) {
    var img = document.getElementById("spinnerImg");
    img.style.opacity = status ? 1 : 0;
}
