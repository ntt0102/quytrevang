var mConfig = {};
var mChart = {};
var mDatabase = null;

getLocalConfig()
    .then(() => getServerConfig())
    .then(() => {
        createPeriodicButton();
        // createReportButton();
        createOrderListButton();
        intervalHandler();
        initSocket();
        createDatabase();
        createContinuousButton();
        registerEvent();
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
                mConfig.session = null;
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

// function createReportButton() {
//     var button = document.createElement("button");
//     button.setAttribute("id", "reportButton");
//     button.innerText = "Báo cáo";
//     button.addEventListener("click", reportHandler);
//     document.body.append(button);
// }

function createPeriodicButton() {
    var canvas = document.createElement("canvas");
    var clearButton = document.createElement("button");
    clearButton.setAttribute("id", "clearButton");
    clearButton.innerText = "Reset zoom";
    clearButton.addEventListener("click", () => {
        // removeData(mChart);
        // mChart.resetZoom();
        mChart.zoomScale(
            "x",
            {
                max: moment()
            },
            "none"
        );
    });
    var exportButton = document.createElement("button");
    exportButton.setAttribute("id", "exportButton");
    exportButton.innerText = "Xuất ảnh";
    exportButton.addEventListener("click", () => {
        // exportImage(mChart, false, "ATC");
        // exportImage(mChart, true, "ATO");
        zoomScale("ATC");
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
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: "time",
                    time: {
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
                        mode: "x"
                    },
                    pan: {
                        enabled: true,
                        mode: "x"
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
    mChart.options.plugins.title.text = `Biểu đồ ngày ${moment().format(
        "DD/MM/YYYY"
    )}`;
    mChart.update();

    setInterval(() => {
        var currentTime = moment().format("HH:mm:ss");
        var isAtoSession =
            currentTime >= mConfig.time.ATO.start &&
            currentTime <= mConfig.time.ATO.end;
        var isAtcSession =
            currentTime >= mConfig.time.ATC.start &&
            currentTime <= mConfig.time.ATC.end;
        // var isLoSession =
        //     (currentTime > mConfig.time.ATO.end &&
        //         currentTime < mConfig.time.breakStart) ||
        //     (currentTime > mConfig.time.breakEnd &&
        //         currentTime < mConfig.time.ATC.start);
        mConfig.session = isAtoSession
            ? "ATO"
            : isAtcSession
            ? "ATC"
            : // : isLoSession
              // ? "LO"
              null;
        if (isAtoSession || isAtcSession)
            document.getElementById("right_price").value = mConfig.session;
        // Export
        if (
            currentTime == mConfig.time.ATO.end ||
            currentTime == mConfig.time.ATC.end
        )
            exportImage(session, true);
        // Report
        if (currentTime >= mConfig.time.ATC.end && !mConfig.isReportedResult) {
            mConfig.isReportedResult = true;
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
                if (jsondata.isOk)
                    alert(
                        `Báo cáo đã gửi ${
                            jsondata.isExecuted
                                ? "thành công."
                                : "trước đó rồi."
                        }`
                    );
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

function exportImage(session, isUpload) {
    mChart.options.plugins.title.text = `Biểu đồ ${session} ngày ${moment().format(
        "DD/MM/YYYY"
    )}`;
    mChart.update();
    zoomScale(session);
    var imageName = `vps-${moment().format("YYYY.MM.DD-HH.mm.ss")}.png`;
    var imageData = mChart.toBase64Image();
    if (isUpload) {
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

function zoomScale(session) {
    var [hStart, mStart, sStart] = mConfig.time[session].start.split(":");
    var [hEnd, mEnd, sEnd] = mConfig.time[session].end.split(":");
    mChart.zoomScale(
        "x",
        {
            min: moment().set({ hour: hStart, minute: mStart, second: sStart }),
            max: moment().set({ hour: hEnd, minute: mEnd, second: sEnd })
        },
        "none"
    );
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
        // console.log("boardps" + data.data.id, data.data);
        if (data.data.id == 3220) {
            console.log("boardps" + data.data.id);
            const price = {
                x: new Date(),
                y: data.data.lastPrice
            };
            mChart.data.datasets[0].data.push(price);
            mChart.update("none");
            setDatabase("price", price);
        }
        if (data.data.id == 3310) {
            console.log("boardps" + data.data.id);
            const volume = {
                x: new Date(),
                y: data.data.BVolume - data.data.SVolume
            };
            mChart.data.datasets[1].data.push(volume);
            mChart.update("none");
            setDatabase("volume", volume);
        }
    });
    socket.on("stockps", data => {
        if (data.data.id == 3220) {
            console.log("stockps" + data.data.id);
            const price = {
                x: new Date(),
                y: data.data.lastPrice
            };
            mChart.data.datasets[0].data.push(price);
            mChart.update("none");
            setDatabase("price", price);
        }
    });
}

function createDatabase() {
    const request = indexedDB.open("vpsDB", 1);
    request.onupgradeneeded = e => {
        console.log("onupgradeneeded");
        mDatabase = e.target.result;
        mDatabase.createObjectStore("price", { keyPath: "x" });
        mDatabase.createObjectStore("volume", { keyPath: "x" });
    };
    request.onsuccess = e => {
        console.log("onsuccess");
        mDatabase = e.target.result;
    };
    request.onerror = () => {
        console.log("onerror");
    };
}

function setDatabase(table, data) {
    const transaction = mDatabase.transaction(table, "readwrite");
    const records = transaction.objectStore(table);
    const request = records.add(data);
    request.onsuccess = () => {
        console.log("onsuccess");
    };
    request.onerror = () => {
        console.log("onerror");
    };
}

function getDatabase(table) {
    const transaction = mDatabase.transaction(table, "readonly");
    const records = transaction.objectStore(table);
    const request = records.getAll();
    request.onsuccess = e => {
        console.log("onsuccess", e);
    };
    request.onerror = () => {
        console.log("onerror");
    };
}
