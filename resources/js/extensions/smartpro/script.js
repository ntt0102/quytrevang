var mConfig = {};
var mIsReportedData = false;
var mIsOpeningMarket = false;
var mPeriodicChart = {};
var mExtra = {};

getConfig()
    .then(() => checkOpeningMarket())
    .then(() => {
        if (mIsOpeningMarket) {
            createPeriodicButton();
            createReportButton();
            createOrderListButton();
            intervalHandler();
            initSocket();
        }
        createContinuousButton();
        registerEvent();
    });

function getConfig() {
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

function checkOpeningMarket() {
    return new Promise((resolve, reject) => {
        const url = mConfig.endpoint.check;
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(json => {
                console.log("checkOpeningMarket", json);
                mIsOpeningMarket = json.isOpening;
                if (mIsOpeningMarket)
                    mConfig.contractNumber = json.contractNumber;
                resolve();
            });
    });
}

function createContinuousButton() {
    var button = document.createElement("button");
    button.setAttribute("id", "continuousButton");
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
}

function createReportButton() {
    var button = document.createElement("button");
    button.setAttribute("id", "reportButton");
    button.innerText = "Báo cáo";
    button.addEventListener("click", reportHandler);
    document.body.append(button);
}

function createPeriodicButton() {
    var canvas = document.createElement("canvas");
    var clearButton = document.createElement("button");
    clearButton.setAttribute("id", "clearButton");
    clearButton.innerText = "Xoá dữ liệu";
    clearButton.addEventListener("click", () => {
        removeData(mPeriodicChart);
    });
    var exportButton = document.createElement("button");
    exportButton.setAttribute("id", "exportButton");
    exportButton.innerText = "Xuất ảnh";
    exportButton.addEventListener("click", () => {
        // exportImage(mPeriodicChart, false);
        exportImage(mPeriodicChart, true, "ATO");
    });
    var p = document.createElement("p");
    p.setAttribute("id", "orderCountP");
    var div = document.createElement("div");
    div.setAttribute("id", "periodicChart");
    div.append(clearButton);
    div.append(exportButton);
    div.append(p);
    div.append(canvas);
    document.body.append(div);

    Chart.defaults.color = "white";
    mPeriodicChart = new Chart(canvas.getContext("2d"), {
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    label: "Giá",
                    data: [],
                    borderColor: "yellow",
                    backgroundColor: "yellow",
                    yAxisID: "y",
                    borderWidth: 5,
                    pointRadius: 0
                },
                {
                    label: "KL",
                    data: [],
                    borderColor: "magenta",
                    backgroundColor: "magenta",
                    yAxisID: "y1",
                    pointRadius: 0
                },
                {
                    label: "KL1",
                    data: [],
                    borderColor: "cyan",
                    backgroundColor: "cyan",
                    yAxisID: "y1",
                    pointRadius: 0
                }
            ]
        },
        options: {
            scales: {
                x: {
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
                annotation: {
                    annotations: {
                        line1: {
                            type: "line",
                            xMin: mConfig.time.atoPoint1,
                            xMax: mConfig.time.atoPoint1,
                            adjustScaleRange: false
                        },
                        line2: {
                            type: "line",
                            xMin: mConfig.time.atoPoint2,
                            xMax: mConfig.time.atoPoint2,
                            adjustScaleRange: false
                        },
                        line3: {
                            type: "line",
                            xMin: mConfig.time.atcPoint1,
                            xMax: mConfig.time.atcPoint1,
                            adjustScaleRange: false
                        },
                        line4: {
                            type: "line",
                            xMin: mConfig.time.atcPoint2,
                            xMax: mConfig.time.atcPoint2,
                            adjustScaleRange: false
                        }
                    }
                }
            },
            elements: { line: { tension: 0.4 } }
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

    var periodicButton = document.createElement("button");
    periodicButton.setAttribute("id", "periodicButton");
    periodicButton.innerText = "Định kỳ";
    periodicButton.addEventListener("click", () => {
        if (document.body.classList.contains("periodic-order")) {
            document.body.classList.remove("periodic-order");
        } else {
            document.body.classList.add("periodic-order");
            document.body.classList.remove("continuous-order");
        }
    });
    document.body.append(periodicButton);
}

function createOrderListButton() {
    var button = document.createElement("button");
    button.setAttribute("id", "orderListButton");
    button.style.zIndex = "-1";
    button.setAttribute("onclick", "objOrderPanel.showOrderList()");
    document.body.append(button);
}

function intervalHandler() {
    document.getElementById("orderListButton").click();
    document.getElementById("sohopdong").value = mConfig.contractNumber;
    var currentDate = moment().format("DD/MM/YYYY");

    setInterval(() => {
        var currentTime = moment().format("HH:mm:ss");
        var isAtoSession =
            currentTime >= mConfig.time.atoStart &&
            currentTime <= mConfig.time.atoEnd;
        var isAtcSession =
            currentTime >= mConfig.time.atcStart &&
            currentTime <= mConfig.time.atcEnd;
        var isLoSession =
            (currentTime > mConfig.time.atoEnd &&
                currentTime < mConfig.time.breakStart) ||
            (currentTime > mConfig.time.breakEnd &&
                currentTime < mConfig.time.atcStart);
        var session = isAtoSession
            ? "ATO"
            : isAtcSession
            ? "ATC"
            : isLoSession
            ? "LO"
            : "";
        if (isAtoSession || isAtcSession)
            document.getElementById("right_price").value = session;
        //
        if (
            currentTime == mConfig.time.atoStart ||
            currentTime == mConfig.time.atcStart
        )
            removeData(mPeriodicChart);
        //
        if (session != "") {
            addData(mPeriodicChart, currentTime, session);
            mPeriodicChart.options.plugins.title.text = `Biểu đồ ${session} ngày ${currentDate}`;
            mPeriodicChart.update();
        }
        // Export
        if (
            currentTime == mConfig.time.atoEnd ||
            currentTime == mConfig.time.atcEnd
        )
            exportImage(mPeriodicChart, true, session);
        // Report
        if (currentTime == mConfig.time.atcEnd && !mIsReportedData) {
            mIsReportedData = true;
            setTimeout(() => reportHandler(), 30000);
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
    }, 1000);
}

function reportHandler() {
    const url = mConfig.endpoint.update;
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
    mIsReportedData = true;
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
            mIsReportedData = jsondata.isOk;
            if (jsondata.isOk)
                alert(
                    `Báo cáo đã gửi ${
                        jsondata.isExecuted ? "thành công." : "trước đó rồi."
                    }`
                );
        })
        .catch(error => {
            mIsReportedData = false;
            console.log("Report-Start ##############################");
            console.log(error);
            console.log("Report-End ##############################");
            alert("Gửi báo cáo thất bại");
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
}

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
    var stopOperation = document.getElementById("right_selStopOrderType").value;
    var stopPrice = document.getElementById("right_stopOrderIndex").value;
    var currentPrice = document.getElementById("tbodyPhaisinhContent").rows[0]
        .cells[10].innerText;
    if (Math.abs(currentPrice - stopPrice) < 20) {
        if (stopOperation == "SOL" && currentPrice >= stopPrice) isError = true;
        else if (stopOperation == "SOU" && currentPrice <= stopPrice)
            isError = true;
    }
    if (isError) alert("Đặt sai điều kiện");
}

function addData(chart, label, session) {
    var row = document.getElementById("tbodyPhaisinhContent").rows[0];
    var price = +row.cells[10].innerText.replace(",", "");
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(price);
    chart.data.datasets[1].data.push(mExtra.BVolume - mExtra.SVolume);
    if (session != "LO") {
        var buyAtVol = +row.cells[9].innerText.replace(",", "");
        var sellAtVol = +row.cells[15].innerText.replace(",", "");
        chart.data.datasets[2].data.push(buyAtVol - sellAtVol);
    }
    chart.update();
}

function removeData(chart) {
    console.log("removeData");
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.update();
}

function exportImage(chart, isUpload, session) {
    // console.log("exportImage", isUpload);
    var imageName = `vps-${moment().format("YYYY.MM.DD-HH.mm.ss")}.png`;
    var imageData = chart.toBase64Image();
    if (isUpload) {
        const url = mConfig.endpoint.upload;
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
                console.log("UploadImage-Start ##############################");
                console.log(jsondata);
                console.log("UploadImage-End ##############################");
                if (jsondata.isOk) alert("Đăng ảnh thành công");
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

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.body.classList.add("fullscreen");
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
        document.body.classList.remove("fullscreen");
    }
}

function initSocket() {
    var symbol = document.getElementById("tbodyPhaisinhContent").rows[0]
        .cells[0].innerText;
    var msg = `{"action":"join","list":"${symbol}"}`;
    var socket = io(mConfig.endpoint.socket);
    socket.on("connect", () => socket.emit("regs", msg));
    socket.on("reconnect", () => socket.emit("regs", msg));
    socket.on("boardps", data => {
        if (data.data.id == 3310) {
            // console.log("boardps-3310", data.data);
            mExtra.BVolume = data.data.BVolume;
            mExtra.SVolume = data.data.SVolume;
        }
    });
}
