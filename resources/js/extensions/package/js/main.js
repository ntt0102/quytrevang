class SmartOrder {
    // Các thuộc tính
    notifier = new Notifier();
    localDB = new LocalDatabase();
    audio = new Audio(chrome.runtime.getURL("alert.wav"));
    isMobile = navigator.userAgentData.mobile;
    currentTime = moment().unix();

    // Hàm khởi tạo
    constructor() {
        goog.require("proto.tcbs.BuySellActivePojo");
    }

    // Các phương thức
    async init() {
        this.notifier.show("warning", "Đang cài đặt biểu đồ ...", false);
        this.createButtons();
        this.registerEvent();
        await this.getLocalConfig();
        await this.getServerConfig();
        this.lw = new Lightweight({
            dataEndpoint: this.config.root + this.config.endpoint.data,
            localDB: this.localDB,
            notifier: this.notifier,
            audio: this.audio,
            isMobile: this.isMobile,
            timeFrame: this.config.timeFrame,
            sharkLimit: this.config.sharkLimit,
            getOrderPosition: this.getOrderPosition,
            closePosition: this.closePosition,
            orderEntryPrice: this.orderEntryPrice,
            orderTpPrice: this.orderTpPrice,
            orderSlPrice: this.orderSlPrice,
            cancelOrder: this.cancelOrder
        });
        this.lw.init();
        await this.localDB.init();
        await this.lw.loadChartData();
        await this.lw.getHelperData();
        document.getElementById("sohopdong").value = this.config.contractNumber;
        document.getElementById("right_price").value = "MTL";
        this.audio.loop = true;
        //
        setInterval(() => this.intervalHandler(this), 1000);
        setInterval(() => this.refreshDataInSession(this), 60000);
        //
        this.notifier.hide();
        this.lineButton.click();
    }
    getLocalConfig() {
        return new Promise((resolve, reject) => {
            const file = chrome.runtime.getURL("config.json");
            fetch(file)
                .then(response => response.json())
                .then(json => {
                    // console.log("localConfig", json);
                    this.config = json;
                    // this = { ...this, ...json };
                    // console.log("this: ", this);
                    // this.config.isMobile = navigator.userAgentData.mobile;
                    // this.config.hasNewData = false;
                    // this.config.currentTime = moment().unix();
                    // this.config.audio = new Audio(
                    //     chrome.runtime.getURL("alert.wav")
                    // );
                    resolve();
                })
                .catch(() => {
                    console.log(err);
                    var choice = confirm(
                        "Get local config error. Refresh now?"
                    );
                    if (choice) location.reload();
                });
        });
    }
    getServerConfig() {
        return new Promise((resolve, reject) => {
            const url = this.config.root + this.config.endpoint.config;
            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
            })
                .then(response => response.json())
                .then(json => {
                    // console.log("serverConfig", json);
                    this.config = { ...this.config, ...json };
                    //
                    resolve();
                })
                .catch(err => {
                    console.log(err);
                    var choice = confirm(
                        "Get server config error. Refresh now?"
                    );
                    if (choice) location.reload();
                });
        });
    }
    createButtons() {
        var button = document.createElement("button");
        button.id = "candleButton";
        button.classList = "fa fa-bar-chart";
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
        this.candleButton = button;
        //
        button = document.createElement("button");
        button.id = "lineButton";
        button.classList = "fa fa-line-chart";
        button.title = "Line chart";
        button.addEventListener("click", () => {
            var leftEl = document.getElementById("left_order_type");
            var rightEl = document.getElementById("right_order_type");
            var orderEl = document.querySelector(
                "#mainFooter .foot_tab:nth-child(1)"
            );
            var condOrderEl = document.querySelector(
                "#mainFooter .foot_tab:nth-child(2)"
            );
            if (document.body.classList.contains("line-chart")) {
                document.body.classList.remove("line-chart");
                leftEl.innerText = "Lệnh thường";
                rightEl.innerText = "Lệnh điều kiện";
                //
                orderEl.classList.remove("fa", "fa-check-circle");
                orderEl.innerText = "DANH SÁCH LỆNH";
                condOrderEl.classList.remove("fa", "fa-question-circle");
                condOrderEl.innerText = "DANH SÁCH LỆNH ĐIỀU KIỆN";
            } else {
                document.body.classList.add("line-chart");
                document.body.classList.remove("candle-chart");
                leftEl.innerText = "LT";
                rightEl.innerText = "LĐK";
                //
                orderEl.classList.add("fa", "fa-check-circle");
                orderEl.innerText = "";
                condOrderEl.classList.add("fa", "fa-question-circle");
                condOrderEl.innerText = "";
            }
        });
        document.body.append(button);
        this.lineButton = button;
        //
        button = document.createElement("button");
        button.id = "reportButton";
        button.classList = "fa fa-flag-checkered";
        button.title = "Report";
        button.addEventListener("click", () => reportButtonClick(this));
        document.body.append(button);
        this.reportButton = button;

        function reportButtonClick(self) {
            if (self.currentTime > self.config.time.end) self.reportHandler();
        }
    }
    registerEvent() {
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
        // window.addEventListener("resize", resizeChart);
        // window.addEventListener("keydown", keyEvent);

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
                this.notifier.show("warning", "Giá đặt khác MTL");
        }

        function stopOrderSelect() {
            var el = document.getElementById("right_stopOrderIndex");
            el.value = "";
            el.focus();
        }

        function stopOrderType() {
            var isError = false;
            var stopOperation = document.getElementById(
                "right_selStopOrderType"
            ).value;
            var stopPrice = document.getElementById("right_stopOrderIndex")
                .value;
            var currentPrice = document.getElementById(`${mConfig.symbol}pri`)
                .innerText;
            if (Math.abs(currentPrice - stopPrice) < 20) {
                if (stopOperation == "SOL" && currentPrice >= stopPrice)
                    isError = true;
                else if (stopOperation == "SOU" && currentPrice <= stopPrice)
                    isError = true;
            }
            if (isError) this.notifier.show("warning", "Đặt sai điều kiện");
        }

        function toggleFullScreen() {
            if (document.fullscreenElement) document.exitFullscreen();
            else document.documentElement.requestFullscreen();
        }

        // function resizeChart() {
        //     this.lw.self.resize(window.innerWidth, window.innerHeight);
        // }

        // function keyEvent(event) {
        //     if (event.ctrlKey || event.metaKey) {
        //         if (event.shiftKey) {
        //             if (event.keyCode == 39)
        //                 this.lw.self.timeScale().scrollToRealTime();
        //         } else {
        //             if (event.keyCode == 38) {
        //                 const options = this.lw.self.options();
        //                 this.lw.self.timeScale().applyOptions({
        //                     barSpacing: options.timeScale.barSpacing + 0.1
        //                 });
        //             } else if (event.keyCode == 40) {
        //                 const options = this.lw.self.options();
        //                 if (
        //                     options.timeScale.barSpacing >
        //                     options.timeScale.minBarSpacing
        //                 )
        //                     this.lw.self.timeScale().applyOptions({
        //                         barSpacing: options.timeScale.barSpacing - 0.1
        //                     });
        //             } else if (event.keyCode == 37) {
        //                 const position = this.lw.self.timeScale().scrollPosition();
        //                 this.lw.self.timeScale().scrollToPosition(position - 10);
        //             } else if (event.keyCode == 39) {
        //                 const position = this.lw.self.timeScale().scrollPosition();
        //                 this.lw.self.timeScale().scrollToPosition(position + 10);
        //             } else if (event.keyCode == 97)
        //                 document.getElementById("drawLineButton").click();
        //             else if (event.keyCode == 98)
        //                 document.getElementById("drawMarkerButton").click();
        //             else if (event.keyCode == 99)
        //                 document.getElementById("drawRulerButton").click();
        //             else if (event.keyCode == 100)
        //                 document.getElementById("drawAlertButton").click();
        //         }
        //     } else if (event.which === 27) removeOrderButton();
        // }
    }
    //
    getOrderPosition = () => {
        const el = document.querySelector(
            `#danhmuc_${this.config.symbol} > td:nth-child(2)`
        );
        if (!el) return 0;
        const position = el.innerText;
        if (isNaN(position)) return 0;
        else return +position;
    };
    closePosition = () => {
        const position = this.getOrderPosition();
        if (position) {
            document.getElementById("select_normal_order_wrapper").click();
            document.getElementById("right_price").value = "MTL";
            document.getElementById("sohopdong").value = Math.abs(position);
            document
                .getElementById(`btn_${position > 0 ? "short" : "long"}`)
                .click();
        }
    };
    orderEntryPrice = order => {
        this.callScript("onCancelAllOrderPending('order_condition')");
        document.getElementById("select_condition_order_wrapper").click();
        document.getElementById("right_stopOrderIndex").value =
            order.entry.price;
        document.getElementById("right_price").value = "MTL";
        document.getElementById("right_selStopOrderType").value =
            order.side > 0 ? "SOL" : "SOU";
        //
        setTimeout(() => {
            document
                .getElementById(`btn_${order.side > 0 ? "long" : "short"}`)
                .click();
        }, 1000);
    };
    orderTpPrice = (order, isInit = false) => {
        this.callScript("onCancelAllOrderPending('order')");
        if (isInit)
            order.tp.price =
                +order.entry.price + order.side * this.config.order.TP;
        setTimeout(() => {
            document.getElementById("select_normal_order_wrapper").click();
            document.getElementById("right_price").value = order.tp.price;
            document
                .getElementById(`btn_${order.side < 0 ? "long" : "short"}`)
                .click();
        }, 1000);
    };
    orderSlPrice = (order, isInit = false) => {
        this.callScript("onCancelAllOrderPending('order_condition')");
        if (isInit)
            order.sl.price =
                +order.entry.price - order.side * this.config.order.SL;
        setTimeout(() => {
            document.getElementById("select_condition_order_wrapper").click();
            document.getElementById("right_stopOrderIndex").value =
                order.sl.price;
            document.getElementById("right_price").value = "MTL";
            document.getElementById("right_selStopOrderType").value =
                order.side < 0 ? "SOL" : "SOU";
            document
                .getElementById(`btn_${order.side < 0 ? "long" : "short"}`)
                .click();
        }, 1000);
    };
    cancelOrder = () => {
        this.callScript("onCancelAllOrderPending('order_condition')");
        this.callScript("onCancelAllOrderPending('order')");
    };
    connectSocket() {
        var ws = new WebSocket(this.config.endpoint.socket);
        ws.onopen = function(e) {
            ws.send(`d|st|C001|${this.config.symbol}`);
        };
        ws.onclose = function(e) {
            // console.log("ws-close", e);
            if (this.refreshDataInSession()) this.connectSocket();
        };
        ws.onmessage = function(e) {
            const t = e.data.split("|");
            if (t[0] == "C001") {
                // console.log("ws-message", e.data);
                const message = proto.tcbs.BuySellActivePojo.deserializeBinary(
                    base64ToArrayUnit8(t[2])
                ).toObject();
                // console.log("message: ", message);
                this.lw.updateChartData(message);
            }
        };
        ws.onerror = function(e) {
            console.log("ws-error", e);
        };

        function base64ToArrayUnit8(g) {
            for (
                var p = window.atob(g),
                    r = p.length,
                    h = new Uint8Array(r),
                    A = 0;
                A < r;
                A++
            )
                h[A] = p.charCodeAt(A);
            return h;
        }
    }
    intervalHandler(self) {
        self.currentTime = moment().unix();
        // Begin Socket
        if (self.currentTime == self.config.time.start) self.lw.connectSocket();
        // Report
        if (self.currentTime == self.config.time.end) self.reportHandler();
        //
        self.showRunningStatus();
    }
    reportHandler() {
        if (this.config.isOpeningMarket && !this.config.isReportedResult) {
            this.config.isReportedResult = true;
            this.lw.toggleSpinner(true);
            const url = this.config.root + this.config.endpoint.report;
            const data = {
                revenue: +document
                    .getElementById("vmAccInfo")
                    .innerText.replaceAll(",", ""),
                fees: +document
                    .getElementById("othersAccInfo")
                    .innerText.replaceAll(",", "")
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
                    this.config.isReportedResult = jsondata.isOk;
                    if (jsondata.isOk) {
                        if (jsondata.isExecuted)
                            this.notifier.show(
                                "success",
                                "Báo cáo đã gửi thành công."
                            );
                        else this.notifier.show("warning", "Đã gửi báo cáo");
                    }
                    //
                    this.lw.toggleSpinner(false);
                })
                .catch(error => {
                    this.config.isReportedResult = false;
                    console.log("Report-Start ##############################");
                    console.log(error);
                    console.log("Report-End ##############################");
                    this.notifier.show("error", "Gửi báo cáo thất bại");
                    this.lw.toggleSpinner(false);
                });
        }
    }
    showRunningStatus() {
        if (this.lineButton.classList.contains("dark"))
            this.lineButton.classList.remove("dark");
        else this.lineButton.classList.add("dark");
    }
    refreshDataInSession(self) {
        if (
            self.currentTime >= self.config.time.start &&
            self.currentTime <= self.config.time.end
        ) {
            self.lw.loadChartData();
            return true;
        }
        return false;
    }
    callScript(script) {
        var button = document.createElement("button");
        button.setAttribute("onclick", script);
        button.click();
    }
}

var so = new SmartOrder();
so.init();

// goog.require("proto.tcbs.BuySellActivePojo");

// var mConfig = {};
// var lw = {
//     self: {},
//     series: {},
//     data: {},
//     order: { entry: {}, tp: {}, sl: {} },
//     lines: [],
//     markers: [],
//     ruler: { start: {}, end: {}, point: 0 },
//     alerts: [],
//     crosshair: {}
// };
// var mDatabase = {};
// var mNotify = {};

// //
// var notifier = new Notifier();
// var mLocalDB = new LocalDatabase();
// var mLightweight; // = new Lightweight();
// //

// // getLocalConfig()
// //     .then(() => getServerConfig())
// //     .then(() => {
// //         createButtons();
// //         registerEvent();
// //         // createChartContainer();
// //         mLightweight = new Lightweight({
// //             localDB: mLocalDB,
// //             audio: mConfig.audio,
// //             notification: mNotification,
// //             isMobile: mConfig.isMobile,
// //             getOrderPosition: getOrderPosition,
// //             closePosition: closePosition,
// //             orderEntryPrice: orderEntryPrice,
// //             orderTpPrice: orderTpPrice,
// //             orderSlPrice: orderSlPrice,
// //             cancelOrder: cancelOrder
// //         });
// //         // createIndexedDB().then(() => {
// //         connectSocket();
// //         loadPage();
// //         setInterval(intervalHandler, 1000);
// //         setInterval(refreshDataInSession, 60000);
// //         // });
// //     });

// function getLocalConfig() {
//     mNotify = this.notifier.show("warning", "Đang cài đặt biểu đồ", false);
//     return new Promise((resolve, reject) => {
//         const file = chrome.runtime.getURL("config.json");
//         fetch(file)
//             .then(response => response.json())
//             .then(json => {
//                 // console.log("localConfig", json);
//                 mConfig = json;
//                 resolve();
//             })
//             .catch(() => {
//                 console.log(err);
//                 var choice = confirm("Get local config error. Refresh now?");
//                 if (choice) location.reload();
//             });
//     });
// }

// function getServerConfig() {
//     return new Promise((resolve, reject) => {
//         const url = mConfig.root + mConfig.endpoint.config;
//         fetch(url, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({})
//         })
//             .then(response => response.json())
//             .then(json => {
//                 // console.log("serverConfig", json);
//                 mConfig = { ...mConfig, ...json };
//                 mConfig.isMobile = navigator.userAgentData.mobile;
//                 mConfig.hasCrosshair = false;
//                 mConfig.hasNewData = false;
//                 mConfig.currentTime = moment().unix();
//                 mConfig.audio = new Audio(chrome.runtime.getURL("alert.wav"));
//                 //
//                 resolve();
//             })
//             .catch(err => {
//                 console.log(err);
//                 var choice = confirm("Get server config error. Refresh now?");
//                 if (choice) location.reload();
//             });
//     });
// }

// function createButtons() {
//     var button = document.createElement("button");
//     button.id = "candleButton";
//     button.classList = "fa fa-bar-chart";
//     button.title = "Candle chart";
//     button.addEventListener("click", () => {
//         if (document.body.classList.contains("candle-chart")) {
//             document.body.classList.remove("candle-chart");
//             document.getElementById("left_order_type").innerText =
//                 "Lệnh thường";
//             document.getElementById("right_order_type").innerText =
//                 "Lệnh điều kiện";
//             document.querySelector(
//                 "#mainFooter .foot_tab:nth-child(1)"
//             ).innerText = "DANH SÁCH LỆNH";
//             document.querySelector(
//                 "#mainFooter .foot_tab:nth-child(2)"
//             ).innerText = "DANH SÁCH LỆNH ĐIỀU KIỆN";
//         } else {
//             document.body.classList.add("candle-chart");
//             document.body.classList.remove("line-chart");
//             document.getElementById("left_order_type").innerText = "LT";
//             document.getElementById("right_order_type").innerText = "LĐK";
//             document.querySelector(
//                 "#mainFooter .foot_tab:nth-child(1)"
//             ).innerText = "LỆNH";
//             document.querySelector(
//                 "#mainFooter .foot_tab:nth-child(2)"
//             ).innerText = "ĐIỀU KIỆN";
//         }
//     });
//     document.body.append(button);
//     this.candleButton = button;
//     //
//     button = document.createElement("button");
//     button.id = "lineButton";
//     button.classList = "fa fa-line-chart";
//     button.title = "Line chart";
//     button.addEventListener("click", () => {
//         var leftEl = document.getElementById("left_order_type");
//         var rightEl = document.getElementById("right_order_type");
//         var orderEl = document.querySelector(
//             "#mainFooter .foot_tab:nth-child(1)"
//         );
//         var condOrderEl = document.querySelector(
//             "#mainFooter .foot_tab:nth-child(2)"
//         );
//         if (document.body.classList.contains("line-chart")) {
//             document.body.classList.remove("line-chart");
//             leftEl.innerText = "Lệnh thường";
//             rightEl.innerText = "Lệnh điều kiện";
//             //
//             orderEl.classList.remove("fa", "fa-check-circle");
//             orderEl.innerText = "DANH SÁCH LỆNH";
//             condOrderEl.classList.remove("fa", "fa-question-circle");
//             condOrderEl.innerText = "DANH SÁCH LỆNH ĐIỀU KIỆN";
//         } else {
//             document.body.classList.add("line-chart");
//             document.body.classList.remove("candle-chart");
//             leftEl.innerText = "LT";
//             rightEl.innerText = "LĐK";
//             //
//             orderEl.classList.add("fa", "fa-check-circle");
//             orderEl.innerText = "";
//             condOrderEl.classList.add("fa", "fa-question-circle");
//             condOrderEl.innerText = "";
//         }
//     });
//     document.body.append(button);
//     this.lineButton = button;
//     //
//     button = document.createElement("button");
//     button.id = "reportButton";
//     button.classList = "fa fa-flag-checkered";
//     button.title = "Report";
//     button.addEventListener("click", () => {
//         if (mConfig.currentTime > mConfig.time.end) reportHandler();
//     });
//     document.body.append(button);
//     this.reportButton = button;
// }

// // function createChartContainer() {
// //     var div = document.createElement("div");
// //     div.id = "lightWeightChart";
// //     div.style.width = "100vw";
// //     div.style.height = "100vh";
// //     div.addEventListener("contextmenu", e => {
// //         showOrderButton();
// //         e.preventDefault();
// //     });
// //     div.addEventListener("click", chartClick);
// //     document.body.append(div);
// //     //
// //     createDataArea(div);
// //     createToolArea(div);
// //     createLegendArea(div);
// //     createFreeElement(div);
// //     createLightWeightChart(div);
// //     //

// //     function createDataArea(container) {
// //         var div = document.createElement("div");
// //         div.id = "dataAreaDiv";
// //         div.className = "area";
// //         container.append(div);
// //         //
// //         createSpinnerImg(div);
// //         createDateInput(div);
// //         createTimeFrameSelect(div);
// //         createRefreshButton(div);
// //         createClearButton(div);

// //         function createTimeFrameSelect(container) {
// //             var select = document.createElement("select");
// //             select.id = "timeFrameSelect";
// //             select.className = "command";
// //             [
// //                 { text: "Tick", value: 0 },
// //                 { text: "1 min", value: 1 },
// //                 { text: "5 min", value: 5 },
// //                 { text: "30 min", value: 30 },
// //                 { text: "1 day", value: 1440 }
// //             ].forEach((item, index) => {
// //                 var option = document.createElement("option");
// //                 option.value = item.value;
// //                 option.text = item.text;
// //                 select.appendChild(option);
// //             });
// //             select.value = mConfig.timeFrame;
// //             select.addEventListener("change", e => {
// //                 mConfig.timeFrame = e.target.value;
// //                 getData().then(() => this.lw.self.timeScale().resetTimeScale());
// //             });
// //             container.append(select);
// //         }

// //         function createDateInput(container) {
// //             var input = document.createElement("input");
// //             input.id = "dateInput";
// //             input.type = "date";
// //             input.value = moment().format("YYYY-MM-DD");
// //             input.className = "command";
// //             input.addEventListener("change", e => {
// //                 if (!!e.target.value) getData();
// //             });
// //             container.append(input);
// //         }

// //         function createRefreshButton(container) {
// //             var button = document.createElement("div");
// //             button.id = "refreshButton";
// //             button.className = "command fa fa-refresh";
// //             button.title = "Refresh chart";
// //             button.addEventListener("click", () => getData());
// //             container.append(button);
// //         }

// //         function createClearButton(container) {
// //             var button = document.createElement("div");
// //             button.id = "clearButton";
// //             button.className = "command fa fa-trash";
// //             button.title = "Delete local data";
// //             button.addEventListener("click", () => {
// //                 clearLocalData("data");
// //                 getData();
// //             });
// //             container.append(button);
// //         }

// //         function createSpinnerImg(container) {
// //             var img = document.createElement("img");
// //             img.id = "spinnerImg";
// //             img.style.opacity = 0;
// //             img.src = chrome.runtime.getURL("spinner.gif");
// //             container.append(img);
// //         }
// //     }

// //     function createToolArea(container) {
// //         var div = document.createElement("div");
// //         div.id = "toolAreaDiv";
// //         div.className = "area";
// //         container.append(div);
// //         //
// //         createDrawLineButton(div);
// //         createDrawMarkerButton(div);
// //         createDrawRulerButton(div);
// //         createDrawAlertButton(div);

// //         function createDrawLineButton(container) {
// //             var button = document.createElement("div");
// //             button.id = "drawLineButton";
// //             button.className = "command fa fa-minus";
// //             button.addEventListener("click", e => {
// //                 const selected = e.target.classList.contains("selected");
// //                 document
// //                     .querySelectorAll("#toolAreaDiv > .command")
// //                     .forEach(el => el.classList.remove("selected"));
// //                 if (!selected) e.target.classList.add("selected");
// //                 e.stopPropagation();
// //             });
// //             button.addEventListener("contextmenu", e => {
// //                 removeToolLines();
// //                 e.target.classList.remove("selected");
// //                 e.preventDefault();
// //                 e.stopPropagation();
// //             });
// //             container.append(button);
// //         }

// //         function createDrawMarkerButton(container) {
// //             button = document.createElement("div");
// //             button.id = "drawMarkerButton";
// //             button.className = "command fa fa-map-marker";
// //             button.addEventListener("click", e => {
// //                 const selected = e.target.classList.contains("selected");
// //                 document
// //                     .querySelectorAll("#toolAreaDiv > .command")
// //                     .forEach(el => el.classList.remove("selected"));
// //                 if (!selected) e.target.classList.add("selected");
// //                 e.stopPropagation();
// //             });
// //             button.addEventListener("contextmenu", e => {
// //                 removeMarkers();
// //                 e.target.classList.remove("selected");
// //                 e.preventDefault();
// //                 e.stopPropagation();
// //             });
// //             container.append(button);
// //         }

// //         function createDrawRulerButton(container) {
// //             button = document.createElement("div");
// //             button.id = "drawRulerButton";
// //             button.className = "command fa fa-arrows-v";
// //             button.addEventListener("click", e => {
// //                 const selected = e.target.classList.contains("selected");
// //                 document
// //                     .querySelectorAll("#toolAreaDiv > .command")
// //                     .forEach(el => el.classList.remove("selected"));
// //                 if (!selected) {
// //                     e.target.classList.add("selected");
// //                     removeRuler();
// //                 }
// //                 e.stopPropagation();
// //             });
// //             button.addEventListener("contextmenu", e => {
// //                 removeRuler();
// //                 e.target.classList.remove("selected");
// //                 e.preventDefault();
// //                 e.stopPropagation();
// //             });
// //             container.append(button);
// //         }

// //         function createDrawAlertButton(container) {
// //             button = document.createElement("div");
// //             button.id = "drawAlertButton";
// //             button.className = "command fa fa-bell-o";
// //             button.addEventListener("click", e => {
// //                 const selected = e.target.classList.contains("selected");
// //                 document
// //                     .querySelectorAll("#toolAreaDiv > .command")
// //                     .forEach(el => el.classList.remove("selected"));
// //                 if (!selected) e.target.classList.add("selected");
// //                 e.stopPropagation();
// //             });
// //             button.addEventListener("contextmenu", e => {
// //                 removeAlerts();
// //                 e.target.classList.remove("selected");
// //                 e.preventDefault();
// //                 e.stopPropagation();
// //             });
// //             container.append(button);
// //         }
// //     }

// //     function createLegendArea(container) {
// //         var div = document.createElement("div");
// //         div.id = "legendAreaDiv";
// //         container.append(div);
// //         //
// //         createPriceLegendP(div);
// //         createSharkLegendP(div);

// //         function createPriceLegendP(container) {
// //             var p = document.createElement("p");
// //             p.id = "priceLegendP";
// //             container.append(p);
// //         }

// //         function createSharkLegendP(container) {
// //             //
// //             var p = document.createElement("p");
// //             p.id = "sharkLegendP";
// //             container.append(p);
// //         }
// //     }

// //     function createFreeElement(container) {
// //         createCancelOrderButton(container);
// //         createEntryOrderButton(container);
// //         createTpslOrderButton(container);
// //         createScrollButton(container);

// //         function createCancelOrderButton(container) {
// //             var button = document.createElement("button");
// //             button.id = "cancelOrderButton";
// //             button.innerText = "X";
// //             button.style.display = "none";
// //             button.addEventListener("click", () => {
// //                 closePosition();
// //                 cancelOrder();
// //             });
// //             container.append(button);
// //         }
// //         function createEntryOrderButton(container) {
// //             button = document.createElement("button");
// //             button.id = "entryOrderButton";
// //             button.innerText = "Entry";
// //             button.style.display = "none";
// //             button.addEventListener("click", () => {
// //                 orderEntryPrice();
// //                 removeOrderButton();
// //             });
// //             container.append(button);
// //         }
// //         function createTpslOrderButton(container) {
// //             //
// //             button = document.createElement("button");
// //             button.id = "tpslOrderButton";
// //             button.innerText = "TP/SL";
// //             button.style.display = "none";
// //             button.addEventListener("click", () => {
// //                 orderTpPrice(true);
// //                 orderSlPrice(true);
// //                 removeOrderButton();
// //             });
// //             container.append(button);
// //         }
// //         function createScrollButton(container) {
// //             //
// //             button = document.createElement("div");
// //             button.id = "scrollButton";
// //             button.className = "command fa fa-angle-double-right";
// //             button.addEventListener("click", () =>
// //                 this.lw.self.timeScale().scrollToRealTime()
// //             );
// //             container.append(button);
// //         }
// //     }

// //     function createLightWeightChart(container) {
// //         const chartOptions = {
// //             localization: { dateFormat: "dd/MM/yyyy", locale: "vi-VN" },
// //             rightPriceScale: {
// //                 visible: true,
// //                 scaleMargins: { top: 0.1, bottom: 0.4 }
// //             },
// //             leftPriceScale: { visible: false },
// //             layout: {
// //                 backgroundColor: "#181C27",
// //                 textColor: "#A2A6AE"
// //             },
// //             grid: {
// //                 vertLines: { color: "#30333F" },
// //                 horzLines: { color: "#30333F" }
// //             },
// //             crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
// //             timeScale: {
// //                 timeVisible: true,
// //                 rightOffset: 20,
// //                 minBarSpacing: 0.1
// //             }
// //         };
// //         this.lw.self = LightweightCharts.createChart(container, chartOptions);
// //         //
// //         this.lw.self.subscribeCrosshairMove(crosshairMove);
// //         this.lw.self.subscribeCustomPriceLineDragged(priceLineDrag);
// //         //
// //         this.lw.series.shark = this.lw.self.addLineSeries({
// //             priceScaleId: "shark",
// //             color: "#FF00FF",
// //             priceFormat: { minMove: 1 },
// //             scaleMargins: { top: 0.6, bottom: 0 }
// //         });
// //         this.lw.series.price = this.lw.self.addLineSeries({
// //             color: "white",
// //             priceFormat: { minMove: 0.1 }
// //         });

// //         this.lw.self.timeScale().fitContent();
// //     }

// //     function crosshairMove(e) {
// //         if (e.time) {
// //             updateLegend(
// //                 e.seriesPrices.get(this.lw.series.price),
// //                 e.seriesPrices.get(this.lw.series.shark)
// //             );
// //             mConfig.hasCrosshair = true;
// //             this.lw.crosshair.time = e.time;
// //             this.lw.crosshair.price = e.seriesPrices.get(this.lw.series.price);
// //         } else {
// //             mConfig.hasCrosshair = false;
// //             if (!mConfig.isMobile) {
// //                 this.lw.crosshair.time = null;
// //                 this.lw.crosshair.price = null;
// //             }
// //         }
// //         if (e.point != undefined) {
// //             this.lw.crosshair.x = e.point.x;
// //             this.lw.crosshair.y = e.point.y;
// //         }
// //     }

// //     function chartClick() {
// //         removeOrderButton();
// //         if (
// //             document
// //                 .getElementById("drawLineButton")
// //                 .classList.contains("selected")
// //         )
// //             drawToolLine();
// //         else if (
// //             document
// //                 .getElementById("drawMarkerButton")
// //                 .classList.contains("selected")
// //         )
// //             drawMarker();
// //         else if (
// //             document
// //                 .getElementById("drawRulerButton")
// //                 .classList.contains("selected")
// //         )
// //             drawRuler();
// //         else if (
// //             document
// //                 .getElementById("drawAlertButton")
// //                 .classList.contains("selected")
// //         )
// //             drawAlert();
// //     }

// //     function drawToolLine() {
// //         const TYPE = "line";
// //         const price = formatPrice(coordinateToPrice(this.lw.crosshair.y));
// //         const existIndex = this.lw.lines.findIndex(line => {
// //             const ops = line.options();
// //             return (ops.type = TYPE && +ops.price == price);
// //         });
// //         if (existIndex != -1) {
// //             const removeLine = this.lw.lines.splice(existIndex, 1);
// //             this.lw.series.price.removePriceLine(removeLine[0]);
// //             setLocalData("line", { price: price, removed: true });
// //         } else {
// //             const options = {
// //                 lineType: TYPE,
// //                 price: price,
// //                 color: "aqua",
// //                 lineWidth: 1,
// //                 lineStyle: LightweightCharts.LineStyle.Solid,
// //                 draggable: true
// //             };
// //             this.lw.lines.push(this.lw.series.price.createPriceLine(options));
// //             setLocalData("line", options);
// //         }
// //         document.getElementById("drawLineButton").classList.remove("selected");
// //     }

// //     function removeToolLines() {
// //         this.lw.lines.forEach(line => this.lw.series.price.removePriceLine(line));
// //         this.lw.lines = [];
// //         clearLocalData("line");
// //     }

// //     function drawMarker() {
// //         if (this.lw.crosshair.time) {
// //             const markers = this.lw.markers.filter(
// //                 item => item.time != this.lw.crosshair.time
// //             );
// //             if (markers.length == this.lw.markers.length) {
// //                 const dir =
// //                     this.lw.crosshair.y >=
// //                     this.lw.series.price.priceToCoordinate(
// //                         this.lw.crosshair.price
// //                     );
// //                 this.lw.markers.push({
// //                     time: this.lw.crosshair.time,
// //                     position: dir ? "belowBar" : "aboveBar",
// //                     color: dir ? "lime" : "red",
// //                     shape: dir ? "arrowUp" : "arrowDown"
// //                 });
// //             } else this.lw.markers = markers;
// //             this.lw.series.price.setMarkers(this.lw.markers);
// //             clearLocalData("marker").then(() =>
// //                 setLocalData("marker", this.lw.markers)
// //             );
// //             //
// //             document
// //                 .getElementById("drawMarkerButton")
// //                 .classList.remove("selected");
// //         }
// //     }

// //     function removeMarkers() {
// //         this.lw.markers = [];
// //         this.lw.series.price.setMarkers([]);
// //         clearLocalData("marker");
// //     }

// //     function drawRuler() {
// //         const price = coordinateToPrice(this.lw.crosshair.y);
// //         var options = {
// //             lineType: "ruler",
// //             price: price,
// //             color: "yellow",
// //             lineWidth: 1,
// //             lineStyle: LightweightCharts.LineStyle.Solid,
// //             draggable: true
// //         };
// //         if (this.lw.ruler.point == 0) {
// //             const point = 1;
// //             options.point = point;
// //             options.title = "0";
// //             this.lw.ruler.start = this.lw.series.price.createPriceLine(options);
// //             this.lw.ruler.point = point;
// //             setLocalData("ruler", options);
// //         } else if (this.lw.ruler.point == 1) {
// //             const startPrice = +this.lw.ruler.start.options().price;
// //             const point = 2;
// //             options.point = point;
// //             options.title = (price - startPrice).toFixed(1);
// //             this.lw.ruler.end = this.lw.series.price.createPriceLine(options);
// //             this.lw.ruler.point = point;
// //             setLocalData("ruler", options);
// //             document
// //                 .getElementById("drawRulerButton")
// //                 .classList.remove("selected");
// //         }
// //     }

// //     function removeRuler() {
// //         if (this.lw.ruler.point > 0) {
// //             this.lw.series.price.removePriceLine(this.lw.ruler.start);
// //             if (this.lw.ruler.point > 1)
// //                 this.lw.series.price.removePriceLine(this.lw.ruler.end);
// //             //
// //             this.lw.ruler = { start: {}, end: {}, point: 0 };
// //             clearLocalData("ruler");
// //         }
// //     }

// //     function drawAlert() {
// //         const TYPE = "alert";
// //         const price = formatPrice(coordinateToPrice(this.lw.crosshair.y));
// //         const existIndex = this.lw.alerts.findIndex(line => {
// //             const ops = line.options();
// //             return (ops.type = TYPE && +ops.price == price);
// //         });
// //         if (existIndex != -1) {
// //             const removeLine = this.lw.alerts.splice(existIndex, 1);
// //             this.lw.series.price.removePriceLine(removeLine[0]);
// //             setLocalData("alert", { price: price, removed: true });
// //         } else {
// //             const options = {
// //                 lineType: TYPE,
// //                 price: price,
// //                 title:
// //                     price >= this.lw.data.original.slice(-1)[0].price
// //                         ? ">"
// //                         : "<",
// //                 color: "#FF00FF",
// //                 lineWidth: 1,
// //                 lineStyle: LightweightCharts.LineStyle.Solid,
// //                 draggable: true
// //             };
// //             this.lw.alerts.push(this.lw.series.price.createPriceLine(options));
// //             setLocalData("alert", options);
// //         }
// //         document.getElementById("drawAlertButton").classList.remove("selected");
// //         mConfig.audio.pause();
// //     }

// //     function removeAlerts() {
// //         this.lw.alerts.forEach(line =>
// //             this.lw.series.price.removePriceLine(line)
// //         );
// //         this.lw.alerts = [];
// //         clearLocalData("alert");
// //         mConfig.audio.pause();
// //     }

// //     function showOrderButton() {
// //         if (getOrderPosition()) {
// //             // if (this.lw.order.entry.hasOwnProperty("line")) {
// //             if (!this.lw.order.tp.hasOwnProperty("line")) {
// //                 var btn = document.getElementById("tpslOrderButton");
// //                 btn.style.left = +(this.lw.crosshair.x + 10) + "px";
// //                 btn.style.top = +(this.lw.crosshair.y + 10) + "px";
// //                 btn.style.display = "block";
// //             }
// //         } else {
// //             if (!this.lw.order.entry.hasOwnProperty("line")) {
// //                 const price = coordinateToPrice(this.lw.crosshair.y);
// //                 const side =
// //                     price >= this.lw.data.price.slice(-1)[0].value ? 1 : -1;
// //                 var btn = document.getElementById("entryOrderButton");
// //                 this.lw.order.entry.price = price;
// //                 this.lw.order.side = side;
// //                 btn.style.left = +(this.lw.crosshair.x + 10) + "px";
// //                 btn.style.top = +(this.lw.crosshair.y + 10) + "px";
// //                 btn.style.background = side > 0 ? "green" : "red";
// //                 btn.innerText = `${side > 0 ? "Long" : "Short"} ${price}`;
// //                 btn.style.display = "block";
// //             }
// //         }
// //     }

// //     function priceLineDrag(e) {
// //         var line = e.customPriceLine.options();
// //         line.price = formatPrice(line.price);
// //         console.log("drag-line:", line);
// //         const oldPrice = +e.fromPriceString;
// //         const newPrice = line.price;
// //         switch (line.lineType) {
// //             case "order":
// //                 if (newPrice != oldPrice) {
// //                     var isChanged = false;
// //                     const position = getOrderPosition();
// //                     if (line.kind == "entry") {
// //                         if (!position) {
// //                             isChanged = true;
// //                             this.lw.order[line.kind].price = newPrice;
// //                             orderEntryPrice();
// //                         }
// //                     } else {
// //                         if (this.lw.order.side * position > 0) {
// //                             isChanged = true;
// //                             this.lw.order[line.kind].price = newPrice;
// //                             if (line.kind == "tp") orderTpPrice();
// //                             else orderSlPrice();
// //                         }
// //                     }
// //                     //
// //                     if (!isChanged) {
// //                         this.lw.order[line.kind].line.applyOptions({
// //                             price: oldPrice
// //                         });
// //                         this.notifier.show("warning", "Không được thay đổi.");
// //                     }
// //                 }
// //                 break;
// //             case "line":
// //                 setLocalData("line", { price: oldPrice, removed: true });
// //                 setLocalData("line", line);
// //                 document
// //                     .getElementById("drawLineButton")
// //                     .classList.remove("selected");
// //                 break;
// //             case "ruler":
// //                 if (line.point == 1) {
// //                     setLocalData("ruler", line);
// //                     if (this.lw.ruler.point == 2) {
// //                         const distance = +this.lw.ruler.end.options().title;
// //                         const endPrice = +(newPrice + distance).toFixed(1);
// //                         this.lw.ruler.end.applyOptions({
// //                             price: endPrice
// //                         });
// //                         setLocalData("ruler", this.lw.ruler.end.options());
// //                     }
// //                 } else {
// //                     setLocalData("ruler", line);
// //                     const startPrice = +this.lw.ruler.start.options().price;
// //                     this.lw.ruler.end.applyOptions({
// //                         title: (newPrice - startPrice).toFixed(1)
// //                     });
// //                 }
// //                 break;
// //             case "alert":
// //                 mConfig.audio.pause();
// //                 setLocalData("alert", { price: oldPrice, removed: true });
// //                 setLocalData("alert", line);
// //                 document
// //                     .getElementById("drawAlertButton")
// //                     .classList.remove("selected");
// //                 break;
// //         }
// //     }
// // }

// function registerEvent() {
//     document
//         .getElementById("select_condition_order_wrapper")
//         .addEventListener("click", conditionOrderSelect);
//     document
//         .getElementById("btn_long")
//         .addEventListener("click", orderButtonClick);
//     document
//         .getElementById("btn_short")
//         .addEventListener("click", orderButtonClick);
//     document
//         .getElementById("right_selStopOrderType")
//         .addEventListener("change", stopOrderSelect);
//     document
//         .getElementById("right_stopOrderIndex")
//         .addEventListener("input", stopOrderType);
//     document
//         .querySelector(".timeStamp")
//         .addEventListener("dblclick", toggleFullScreen);
//     // window.addEventListener("resize", resizeChart);
//     // window.addEventListener("keydown", keyEvent);

//     function conditionOrderSelect() {
//         document.getElementById("right_price").value = "MTL";
//         document.getElementById("right_selStopOrderType").focus();
//     }

//     function orderButtonClick() {
//         if (
//             document
//                 .getElementById("select_condition_order")
//                 .classList.contains("select-active") &&
//             document.getElementById("right_price").value != "MTL"
//         )
//             this.notifier.show("warning", "Giá đặt khác MTL");
//     }

//     function stopOrderSelect() {
//         var el = document.getElementById("right_stopOrderIndex");
//         el.value = "";
//         el.focus();
//     }

//     function stopOrderType() {
//         var isError = false;
//         var stopOperation = document.getElementById("right_selStopOrderType")
//             .value;
//         var stopPrice = document.getElementById("right_stopOrderIndex").value;
//         var currentPrice = document.getElementById(`${mConfig.symbol}pri`)
//             .innerText;
//         if (Math.abs(currentPrice - stopPrice) < 20) {
//             if (stopOperation == "SOL" && currentPrice >= stopPrice)
//                 isError = true;
//             else if (stopOperation == "SOU" && currentPrice <= stopPrice)
//                 isError = true;
//         }
//         if (isError) this.notifier.show("warning", "Đặt sai điều kiện");
//     }

//     function toggleFullScreen() {
//         if (document.fullscreenElement) document.exitFullscreen();
//         else document.documentElement.requestFullscreen();
//     }

//     // function resizeChart() {
//     //     this.lw.self.resize(window.innerWidth, window.innerHeight);
//     // }

//     // function keyEvent(event) {
//     //     if (event.ctrlKey || event.metaKey) {
//     //         if (event.shiftKey) {
//     //             if (event.keyCode == 39)
//     //                 this.lw.self.timeScale().scrollToRealTime();
//     //         } else {
//     //             if (event.keyCode == 38) {
//     //                 const options = this.lw.self.options();
//     //                 this.lw.self.timeScale().applyOptions({
//     //                     barSpacing: options.timeScale.barSpacing + 0.1
//     //                 });
//     //             } else if (event.keyCode == 40) {
//     //                 const options = this.lw.self.options();
//     //                 if (
//     //                     options.timeScale.barSpacing >
//     //                     options.timeScale.minBarSpacing
//     //                 )
//     //                     this.lw.self.timeScale().applyOptions({
//     //                         barSpacing: options.timeScale.barSpacing - 0.1
//     //                     });
//     //             } else if (event.keyCode == 37) {
//     //                 const position = this.lw.self.timeScale().scrollPosition();
//     //                 this.lw.self.timeScale().scrollToPosition(position - 10);
//     //             } else if (event.keyCode == 39) {
//     //                 const position = this.lw.self.timeScale().scrollPosition();
//     //                 this.lw.self.timeScale().scrollToPosition(position + 10);
//     //             } else if (event.keyCode == 97)
//     //                 document.getElementById("drawLineButton").click();
//     //             else if (event.keyCode == 98)
//     //                 document.getElementById("drawMarkerButton").click();
//     //             else if (event.keyCode == 99)
//     //                 document.getElementById("drawRulerButton").click();
//     //             else if (event.keyCode == 100)
//     //                 document.getElementById("drawAlertButton").click();
//     //         }
//     //     } else if (event.which === 27) removeOrderButton();
//     // }
// }

// // function createIndexedDB() {
// //     return new Promise((resolve, reject) => {
// //         const request = indexedDB.open("vpsDB", 1);
// //         request.onupgradeneeded = e => {
// //             console.log("onupgradeneeded");
// //             mDatabase = e.target.result;
// //             mDatabase.createObjectStore("data", { keyPath: "time" });
// //             mDatabase.createObjectStore("order", { keyPath: "kind" });
// //             mDatabase.createObjectStore("marker", { keyPath: "time" });
// //             mDatabase.createObjectStore("line", { keyPath: "price" });
// //             mDatabase.createObjectStore("ruler", { keyPath: "point" });
// //             mDatabase.createObjectStore("alert", { keyPath: "price" });
// //             resolve();
// //         };
// //         request.onsuccess = e => {
// //             console.log("onsuccess");
// //             mDatabase = e.target.result;
// //             resolve();
// //         };
// //         request.onerror = () => {
// //             console.log("onerror");
// //             location.reload();
// //             reject();
// //         };
// //     });
// // }

// function connectSocket() {
//     var ws = new WebSocket(mConfig.endpoint.socket);
//     ws.onopen = function(e) {
//         ws.send(`d|st|C001|${mConfig.symbol}`);
//     };
//     ws.onclose = function(e) {
//         // console.log("ws-close", e);
//         if (refreshDataInSession()) connectSocket();
//     };
//     ws.onmessage = function(e) {
//         const t = e.data.split("|");
//         if (t[0] == "C001") {
//             if (this.lw.data.hasOwnProperty("original")) {
//                 mConfig.hasNewData = true;
//                 // console.log("ws-message", e.data);
//                 const message = proto.tcbs.BuySellActivePojo.deserializeBinary(
//                     base64ToArrayUnit8(t[2])
//                 ).toObject();
//                 // console.log("message: ", message);
//                 const param = {
//                     time: message.timesec,
//                     price: message.closeprice,
//                     volume: message.closevol,
//                     action: message.action
//                 };
//                 this.lw.data = createChartData(this.lw.data, param);
//                 const lastPrice = this.lw.data.price.slice(-1)[0];
//                 const lastShark = this.lw.data.shark.slice(-1)[0];
//                 //
//                 if (mConfig.timeFrame > 0) {
//                     this.lw.series.price.setData(this.lw.data.price);
//                     this.lw.series.shark.setData(this.lw.data.shark);
//                 } else {
//                     this.lw.series.price.update(lastPrice);
//                     this.lw.series.shark.update(lastShark);
//                 }
//                 if (!mConfig.hasCrosshair) {
//                     updateLegend(lastPrice.value, lastShark.value);
//                 }
//                 //
//                 setLocalData("data", param);
//                 this.lw.data.original.push(param);
//             }
//         }
//     };
//     ws.onerror = function(e) {
//         console.log("ws-error", e);
//     };

//     function base64ToArrayUnit8(g) {
//         for (
//             var p = window.atob(g), r = p.length, h = new Uint8Array(r), A = 0;
//             A < r;
//             A++
//         )
//             h[A] = p.charCodeAt(A);
//         return h;
//     }
// }

// function loadPage() {
//     getData().then(async () => {
//         const order = await this.localDB.get("order");
//         order.map(item => {
//             this.lw.order.side = item.side;
//             this.lw.order[item.kind].price = item.price;
//             drawOrderLine(item.kind);
//             if (item.kind == "entry") {
//                 if (getOrderPosition()) {
//                     this.lw.order.entry.line.applyOptions({
//                         draggable: false
//                     });
//                 }
//                 showCancelOrderButton();
//             }
//         });
//         //
//         const lines = await this.localDB.get("line");
//         lines.forEach(line => {
//             if (!line.removed)
//                 this.lw.lines.push(this.lw.series.price.createPriceLine(line));
//         });
//         //
//         this.lw.markers = await this.localDB.get("marker");
//         this.lw.series.price.setMarkers(this.lw.markers);
//         //
//         const rulerLines = await this.localDB.get("ruler");
//         if (rulerLines.length == 2) {
//             rulerLines.forEach(line => {
//                 this.lw.ruler.point = 2;
//                 if (line.point == 1)
//                     this.lw.ruler.start = this.lw.series.price.createPriceLine(
//                         line
//                     );
//                 else
//                     this.lw.ruler.end = this.lw.series.price.createPriceLine(
//                         line
//                     );
//             });
//         }
//         //
//         const alertLines = await this.localDB.get("alert");
//         alertLines.forEach(line => {
//             if (!line.removed)
//                 this.lw.alerts.push(this.lw.series.price.createPriceLine(line));
//         });
//         //
//         mNotify.close();
//         document.getElementById("lineButton").click();
//     });
//     //
//     document.getElementById("sohopdong").value = mConfig.contractNumber;
//     document.getElementById("right_price").value = "MTL";
//     //
//     mConfig.audio.loop = true;
// }

// function intervalHandler() {
//     mConfig.currentTime = moment().unix();
//     //
//     // Auto order TP/SL and close order position
//     if (getOrderPosition()) {
//         if (
//             this.lw.order.entry.hasOwnProperty("line") &&
//             !this.lw.order.tp.hasOwnProperty("line")
//         ) {
//             orderTpPrice(true);
//             orderSlPrice(true);
//             this.lw.order.entry.line.applyOptions({
//                 draggable: false
//             });
//             this.notifier.show("success", "Đã mở vị thế.");
//         }
//     } else {
//         if (this.lw.order.tp.hasOwnProperty("line")) {
//             cancelOrder();
//             this.notifier.show("success", "Đã đóng vị thế.");
//         }
//     }
//     //
//     if (mConfig.audio.paused) {
//         console.log("paused");
//         this.lw.alerts.forEach(alert => {
//             const ops = alert.options();
//             if (!ops.removed && !!this.lw.data.original.length) {
//                 const currentPrice = this.lw.data.original.slice(-1)[0].price;
//                 if (
//                     (ops.title == ">" && currentPrice >= ops.price) ||
//                     (ops.title == "<" && currentPrice <= ops.price)
//                 ) {
//                     mConfig.audio.play();
//                     console.log("ops: ", ops);
//                 }
//             }
//         });
//     }
//     // Begin Socket
//     if (mConfig.currentTime == mConfig.time.start) connectSocket();
//     // Report
//     if (mConfig.currentTime == mConfig.time.end) reportHandler();
//     //
//     showRunningStatus();
// }

// function getData() {
//     return new Promise(async (resolve, reject) => {
//         toggleSpinner(true);
//         const svData = await getServerData();
//         start: while (true) {
//             mConfig.hasNewData = false;
//             const lcData = await this.localDB.get("data");
//             const ids = new Set(svData.map(d => d.time));
//             const data = [
//                 ...svData,
//                 ...lcData.filter(d => !ids.has(d.time))
//             ].sort((a, b) => a.time - b.time);
//             // console.log("data", data);
//             if (mConfig.hasNewData) continue start;
//             clearLocalData("data").then(() => setLocalData("data", data));
//             //
//             this.lw.data = data.reduce((r, item) => createChartData(r, item), {
//                 original: [],
//                 price: [],
//                 shark: []
//             });
//             //
//             this.lw.series.price.setData(this.lw.data.price);
//             this.lw.series.shark.setData(this.lw.data.shark);
//             //
//             if (!mConfig.hasCrosshair && !!this.lw.data.original.length) {
//                 updateLegend(
//                     this.lw.data.price.slice(-1)[0].value,
//                     this.lw.data.shark.slice(-1)[0].value
//                 );
//             }
//             //
//             toggleSpinner(false);
//             resolve();
//             break;
//         }
//     });
// }

// function createChartData(r, item) {
//     var time = item.time + 7 * 60 * 60;
//     const prevShark = !!r.shark.length ? r.shark.slice(-1)[0].value : 0;
//     const volume = (item.action == "BU" ? 1 : -1) * item.volume;
//     if (mConfig.timeFrame > 0) {
//         const period = 60 * mConfig.timeFrame;
//         const timeIndex = Math.floor(time / period);
//         var isSameTime = false;
//         if (!!r.price.length) {
//             const prevTime = r.price.slice(-1)[0].time;
//             if (timeIndex == Math.floor(prevTime / period)) isSameTime = true;
//         }
//         if (isSameTime) {
//             r.price.pop();
//             r.shark.pop();
//         }
//         time = timeIndex * period;
//     }
//     r.original.push(item);
//     r.price.push({ time: time, value: item.price });
//     r.shark.push({
//         time: time,
//         value: prevShark + (item.volume > mConfig.sharkLimit ? volume : 0)
//     });
//     //
//     return r;
// }

// function getServerData() {
//     return new Promise(async (resolve, reject) => {
//         const date = document.getElementById("dateInput").value;
//         const data = { action: "GET", date: date };
//         const url = mConfig.root + mConfig.endpoint.data;
//         start: while (true) {
//             try {
//                 var response = await fetch(url, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(data)
//                 });
//                 var json = await response.json();
//                 resolve(json);
//                 break;
//             } catch (e) {
//                 continue start;
//             }
//         }
//     });
// }

// function setServerData(data) {
//     data.action = "SET";
//     data.time = data.time.format("YYYY-MM-DD HH:mm:ss");
//     const url = mConfig.root + mConfig.endpoint.data;
//     toggleSpinner(true);
//     fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//     }).then(() => toggleSpinner(false));
// }

// function clearServerData() {
//     return new Promise((resolve, reject) => {
//         var data = { action: "CLEAR" };
//         const url = mConfig.root + mConfig.endpoint.data;
//         toggleSpinner(true);
//         fetch(url, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data)
//         }).then(() => {
//             toggleSpinner(false);
//             resolve();
//         });
//     });
// }

// function getLocalDB(tables) {
//     return new Promise(function(resolve, reject) {
//         var tx = mDatabase.transaction(tables, "readonly");
//         if (Array.isArray(tables)) {
//             var stores = tables.map(table => tx.objectStore(table));
//             var promises = stores.map(loadStore);
//             Promise.all(promises).then(arr => resolve(arr));
//         } else {
//             var store = tx.objectStore(tables);
//             loadStore(store).then(d => resolve(d));
//         }
//     });

//     function loadStore(store) {
//         return new Promise(function(resolve, reject) {
//             const request = store.getAll();
//             request.onsuccess = e => resolve(e.target.result);
//             request.onerror = () => reject();
//         });
//     }
// }

// function setLocalData(table, data) {
//     const store = mDatabase.transaction(table, "readwrite").objectStore(table);
//     if (Array.isArray(data)) {
//         if (data.length > 0) data.forEach(item => store.put(item));
//     } else store.put(data);
// }

// function clearLocalData(table) {
//     return new Promise(function(resolve, reject) {
//         const request = mDatabase
//             .transaction(table, "readwrite")
//             .objectStore(table)
//             .clear();

//         request.onsuccess = () => {
//             resolve();
//         };

//         request.onerror = err => {
//             console.error(`Error to empty Object Store: ${table}`);
//             reject();
//         };
//     });
// }

// function reportHandler() {
//     if (mConfig.isOpeningMarket && !mConfig.isReportedResult) {
//         mConfig.isReportedResult = true;
//         toggleSpinner(true);
//         const url = mConfig.root + mConfig.endpoint.report;
//         const data = {
//             revenue: +document
//                 .getElementById("vmAccInfo")
//                 .innerText.replaceAll(",", ""),
//             fees: +document
//                 .getElementById("othersAccInfo")
//                 .innerText.replaceAll(",", "")
//         };
//         fetch(url, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data)
//         })
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 }
//                 throw new Error(response.statusText);
//             })
//             .then(jsondata => {
//                 console.log("Report-Start ##############################");
//                 console.log(jsondata);
//                 console.log("Report-End ##############################");
//                 mConfig.isReportedResult = jsondata.isOk;
//                 if (jsondata.isOk) {
//                     if (jsondata.isExecuted)
//                         this.notifier.show(
//                             "success",
//                             "Báo cáo đã gửi thành công."
//                         );
//                     else this.notifier.show("warning", "Đã gửi báo cáo");
//                 }
//                 //
//                 toggleSpinner(false);
//             })
//             .catch(error => {
//                 mConfig.isReportedResult = false;
//                 console.log("Report-Start ##############################");
//                 console.log(error);
//                 console.log("Report-End ##############################");
//                 this.notifier.show("error", "Gửi báo cáo thất bại");
//                 toggleSpinner(false);
//             });
//     }
// }

// function toggleSpinner(status) {
//     var img = document.getElementById("spinnerImg");
//     img.style.opacity = status ? 1 : 0;
// }

// function showRunningStatus() {
//     var button = document.getElementById("lineButton");
//     if (button.classList.contains("dark")) button.classList.remove("dark");
//     else button.classList.add("dark");
// }

// function orderEntryPrice() {
//     callScript("onCancelAllOrderPending('order_condition')");
//     drawOrderLine("entry");
//     document.getElementById("select_condition_order_wrapper").click();
//     document.getElementById(
//         "right_stopOrderIndex"
//     ).value = this.lw.order.entry.price;
//     document.getElementById("right_price").value = "MTL";
//     document.getElementById("right_selStopOrderType").value =
//         this.lw.order.side > 0 ? "SOL" : "SOU";
//     //
//     showCancelOrderButton();
//     setTimeout(() => {
//         document
//             .getElementById(`btn_${this.lw.order.side > 0 ? "long" : "short"}`)
//             .click();
//     }, 1000);
// }

// function orderTpPrice(isInit = false) {
//     callScript("onCancelAllOrderPending('order')");
//     if (isInit)
//         this.lw.order.tp.price =
//             +this.lw.order.entry.price + this.lw.order.side * mConfig.order.TP;
//     drawOrderLine("tp");
//     setTimeout(() => {
//         document.getElementById("select_normal_order_wrapper").click();
//         document.getElementById("right_price").value = this.lw.order.tp.price;
//         document
//             .getElementById(`btn_${this.lw.order.side < 0 ? "long" : "short"}`)
//             .click();
//     }, 1000);
// }

// function orderSlPrice(isInit = false) {
//     callScript("onCancelAllOrderPending('order_condition')");
//     if (isInit)
//         this.lw.order.sl.price =
//             +this.lw.order.entry.price - this.lw.order.side * mConfig.order.SL;
//     drawOrderLine("sl");
//     setTimeout(() => {
//         document.getElementById("select_condition_order_wrapper").click();
//         document.getElementById(
//             "right_stopOrderIndex"
//         ).value = this.lw.order.sl.price;
//         document.getElementById("right_price").value = "MTL";
//         document.getElementById("right_selStopOrderType").value =
//             this.lw.order.side < 0 ? "SOL" : "SOU";
//         document
//             .getElementById(`btn_${this.lw.order.side < 0 ? "long" : "short"}`)
//             .click();
//     }, 1000);
// }

// function cancelOrder() {
//     callScript("onCancelAllOrderPending('order_condition')");
//     callScript("onCancelAllOrderPending('order')");
// }

// function closePosition() {
//     const position = getOrderPosition();
//     if (position) {
//         document.getElementById("select_normal_order_wrapper").click();
//         document.getElementById("right_price").value = "MTL";
//         document.getElementById("sohopdong").value = Math.abs(position);
//         document
//             .getElementById(`btn_${position > 0 ? "short" : "long"}`)
//             .click();
//     }
// }

// function drawOrderLine(kind) {
//     var color, title;
//     switch (kind) {
//         case "entry":
//             color = "silver";
//             title = this.lw.order.side > 0 ? "Long" : "Short";
//             break;
//         case "tp":
//             color = "lime";
//             title = Math.abs(
//                 this.lw.order.tp.price - this.lw.order.entry.price
//             ).toFixed(1);
//             break;
//         case "sl":
//             color = "red";
//             title = Math.abs(
//                 this.lw.order.sl.price - this.lw.order.entry.price
//             ).toFixed(1);
//             break;
//     }
//     if (this.lw.order[kind].hasOwnProperty("line")) {
//         this.lw.order[kind].line.applyOptions({
//             price: this.lw.order[kind].price,
//             title: title
//         });
//     } else {
//         this.lw.order[kind].line = this.lw.series.price.createPriceLine({
//             lineType: "order",
//             kind: kind,
//             price: this.lw.order[kind].price,
//             color: color,
//             lineWidth: 1,
//             lineStyle: LightweightCharts.LineStyle.Solid,
//             title: title,
//             draggable: true
//         });
//     }
//     setLocalData("order", {
//         kind: kind,
//         price: +this.lw.order[kind].price,
//         side: this.lw.order.side
//     });
// }

// function removeOrderLine(kind) {
//     if (this.lw.order[kind].hasOwnProperty("line")) {
//         this.lw.series.price.removePriceLine(this.lw.order[kind].line);
//         delete this.lw.order[kind].line;
//     }
// }

// function removeOrderButton() {
//     document.getElementById("entryOrderButton").style.display = "none";
//     document.getElementById("tpslOrderButton").style.display = "none";
// }

// function showCancelOrderButton() {
//     var btn = document.getElementById("cancelOrderButton");
//     btn.style.display = "block";
//     btn.style.background = this.lw.order.side > 0 ? "green" : "red";
// }

// function getOrderPosition() {
//     const el = document.querySelector(
//         `#danhmuc_${mConfig.symbol} > td:nth-child(2)`
//     );
//     if (!el) return 0;
//     const position = el.innerText;
//     if (isNaN(position)) return 0;
//     else return +position;
// }

// function callScript(script) {
//     var button = document.createElement("button");
//     button.setAttribute("onclick", script);
//     button.click();
// }

// function updateLegend(price, shark) {
//     if (!!price) document.getElementById("priceLegendP").innerText = price;
//     if (!!shark)
//         document.getElementById(
//             "sharkLegendP"
//         ).innerText = shark.toLocaleString("en-US");
// }

// function refreshDataInSession() {
//     if (
//         mConfig.currentTime >= mConfig.time.start &&
//         mConfig.currentTime <= mConfig.time.end
//     ) {
//         getData();
//         return true;
//     }
//     return false;
// }

// function coordinateToPrice(y) {
//     return formatPrice(this.lw.series.price.coordinateToPrice(y));
// }

// function formatPrice(price) {
//     // return this.lw.self.priceScale("right").formatPrice(+price);
//     return +(+price.toFixed(1));
// }
