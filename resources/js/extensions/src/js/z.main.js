class SmartOrder {
    // Các thuộc tính
    audio = new Audio(chrome.runtime.getURL("alert.wav"));
    isMobile = navigator.userAgentData.mobile;
    currentTime = moment().unix();

    // Hàm khởi tạo
    constructor() {
        goog.require("proto.tcbs.BuySellActivePojo");
        this.notifier = new Notifier();
        this.localDB = new LocalDatabase();
    }

    // Các phương thức
    init = async () => {
        await this.getLocalConfig();
        this.lightweight = new Lightweight(this.global);
        this.optionView = new OptionView(this.global);
        this.menu = new Menu(this.global, {
            toggleTradingViewChart: this.toggleTradingViewCallback,
            toggleLightWeightChart: this.toggleLightWeightCallback,
            togglePopup: this.optionView.toggle,
            report: this.manualReportCallback
        });
        await this.optionView.getUser();
        // this.createMenuButtons();
        // this.registerEvent();
        // this.optionView.setOptions({
        //     notifier: this.notifier,
        //     lightweight: this.lightweight,
        //     config: this.global,
        //     registerEndpoint:
        //         this.global.domain + this.global.endpoint.register,
        //     loginEndpoint: this.global.domain + this.global.endpoint.login,
        //     logoutEndpoint: this.global.domain + this.global.endpoint.logout,
        //     menuButtonCallback: this.toggleButton
        // });
        // this.optionView.init();
        if (this.global.isLoggedin) {
            this.notifier.show("warning", "Đang cài đặt biểu đồ ...", false);
            this.menu.createLoggedinElement();
            this.optionView.createLoggedinElement();

            // await this.optionView.getServerConfig();
            // this.toggleButton(true);
            // this.lightweight.setOptions({
            //     dataEndpoint: this.global.domain + this.global.endpoint.data,
            //     accessToken: this.global.accessToken,
            //     localDB: this.localDB,
            //     notifier: this.notifier,
            //     audio: this.audio,
            //     isMobile: this.isMobile,
            //     timeFrame: this.global.timeFrame,
            //     sharkLimit: this.global.sharkLimit,
            //     getOrderPosition: this.getOrderPosition,
            //     closePosition: this.closePosition,
            //     orderEntryPrice: this.orderEntryPrice,
            //     orderTpPrice: this.orderTpPrice,
            //     orderSlPrice: this.orderSlPrice,
            //     cancelOrder: this.cancelOrder
            // });
            // this.lightweight.init();

            // await this.localDB.init();
            // await this.lightweight.loadChartData();
            // await this.lightweight.getHelperData();
            // this.connectSocket();
            // document.getElementById(
            //     "sohopdong"
            // ).value = this.global.contractNumber;
            // document.getElementById("right_price").value = "MTL";
            // this.audio.loop = true;
            // //
            // setInterval(() => this.intervalHandler(this), 1000);
            // setInterval(() => this.refreshDataInSession(this), 60000);
            // //
            // this.notifier.hide();
            // this.lightWeightButton.click();
        } else {
            // this.settingButton.click();
        }
    };
    getLocalConfig = () => {
        return new Promise((resolve, reject) => {
            const file = chrome.runtime.getURL("config.json");
            fetch(file)
                .then(response => response.json())
                .then(json => {
                    console.log("localConfig", json);
                    this.global = { ...this.global, ...json };
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
    };
    toggleTradingViewCallback = () => {
        var leftEl = document.getElementById("left_order_type");
        var rightEl = document.getElementById("right_order_type");
        var orderEl = document.querySelector(
            "#mainFooter .foot_tab:nth-child(1)"
        );
        var condOrderEl = document.querySelector(
            "#mainFooter .foot_tab:nth-child(2)"
        );
        orderEl.classList.remove("fa", "fa-check-circle");
        condOrderEl.classList.remove("fa", "fa-question-circle");
        if (document.body.classList.contains("tradingview-chart")) {
            document.body.classList.remove("tradingview-chart");
            document.body.classList.remove("full-chart");
            leftEl.innerText = "Lệnh thường";
            rightEl.innerText = "Lệnh điều kiện";
            orderEl.innerText = "DANH SÁCH LỆNH";
            condOrderEl.innerText = "DANH SÁCH LỆNH ĐIỀU KIỆN";
        } else {
            document.body.classList.add("tradingview-chart");
            document.body.classList.add("full-chart");
            document.body.classList.remove("lightweight-chart");
            leftEl.innerText = "LT";
            rightEl.innerText = "LĐK";
            orderEl.innerText = "LỆNH THƯỜNG";
            condOrderEl.innerText = "L. ĐIỀU KIỆN";
        }
    };
    toggleLightWeightCallback = () => {
        var leftEl = document.getElementById("left_order_type");
        var rightEl = document.getElementById("right_order_type");
        var orderEl = document.querySelector(
            "#mainFooter .foot_tab:nth-child(1)"
        );
        var condOrderEl = document.querySelector(
            "#mainFooter .foot_tab:nth-child(2)"
        );
        if (document.body.classList.contains("lightweight-chart")) {
            document.body.classList.remove("lightweight-chart");
            document.body.classList.remove("full-chart");
            leftEl.innerText = "Lệnh thường";
            rightEl.innerText = "Lệnh điều kiện";
            //
            orderEl.classList.remove("fa", "fa-check-circle");
            orderEl.innerText = "DANH SÁCH LỆNH";
            condOrderEl.classList.remove("fa", "fa-question-circle");
            condOrderEl.innerText = "DANH SÁCH LỆNH ĐIỀU KIỆN";
        } else {
            document.body.classList.add("lightweight-chart");
            document.body.classList.add("full-chart");
            document.body.classList.remove("tradingview-chart");
            leftEl.innerText = "LT";
            rightEl.innerText = "LĐK";
            //
            orderEl.classList.add("fa", "fa-check-circle");
            orderEl.innerText = "";
            condOrderEl.classList.add("fa", "fa-question-circle");
            condOrderEl.innerText = "";
        }
    };
    manualReportCallback = () => {
        if (this.currentTime > this.global.time.end) this.reportHandler();
    };
    registerEvent = () => {
        document
            .querySelector(".timeStamp")
            .addEventListener("dblclick", () => {
                if (document.fullscreenElement) document.exitFullscreen();
                else document.documentElement.requestFullscreen();
            });
    };
    //
    getOrderPosition = () => {
        const el = document.querySelector(
            `#danhmuc_${this.global.symbol} > td:nth-child(2)`
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
                +order.entry.price + order.side * this.global.order.TP;
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
                +order.entry.price - order.side * this.global.order.SL;
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
    connectSocket = () => {
        var ws = new WebSocket(this.global.endpoint.socket);
        var self = this;
        ws.onopen = function(e) {
            ws.send(`d|st|C001|${self.global.symbol}`);
        };
        ws.onclose = function(e) {
            // console.log("ws-close", e);
            if (self.refreshDataInSession(self)) self.connectSocket();
        };
        ws.onmessage = function(e) {
            const t = e.data.split("|");
            if (t[0] == "C001") {
                // console.log("ws-message", e.data);
                const message = proto.tcbs.BuySellActivePojo.deserializeBinary(
                    base64ToArrayUnit8(t[2])
                ).toObject();
                // console.log("message: ", message);
                self.lightweight.updateChartData(message);
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
    };
    intervalHandler = self => {
        self.currentTime = moment().unix();
        // Begin Socket
        if (self.currentTime == self.global.time.start)
            self.lightweight.connectSocket();
        // Report
        if (self.currentTime == self.global.time.end) self.reportHandler();
        //
        self.showRunningStatus();
    };
    reportHandler = () => {
        if (this.global.isOpeningMarket && !this.global.isReportedResult) {
            this.global.isReportedResult = true;
            this.lightweight.toggleSpinner(true);
            const url = this.global.domain + this.global.endpoint.report;
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
                    if (response.ok) return response.json();
                    throw new Error(response.statusText);
                })
                .then(jsondata => {
                    this.global.isReportedResult = jsondata.isOk;
                    if (jsondata.isOk) {
                        if (jsondata.isExecuted)
                            this.notifier.show(
                                "success",
                                "Báo cáo đã gửi thành công."
                            );
                        else this.notifier.show("warning", "Đã gửi báo cáo");
                    }
                    //
                    this.lightweight.toggleSpinner(false);
                })
                .catch(error => {
                    this.global.isReportedResult = false;
                    this.notifier.show("error", "Gửi báo cáo thất bại");
                    this.lightweight.toggleSpinner(false);
                });
        }
    };
    showRunningStatus = () => {
        if (this.lightWeightButton.classList.contains("dark"))
            this.lightWeightButton.classList.remove("dark");
        else this.lightWeightButton.classList.add("dark");
    };
    refreshDataInSession = self => {
        if (
            self.currentTime >= self.global.time.start &&
            self.currentTime <= self.global.time.end
        ) {
            self.lightweight.loadChartData();
            return true;
        }
        return false;
    };
    callScript = script => {
        var button = document.createElement("button");
        button.setAttribute("onclick", script);
        button.click();
    };
    toggleButton = visible => {
        const display = visible ? "block" : "none";
        this.tradingViewButton.style.display = display;
        this.lightWeightButton.style.display = display;
        this.reportButton.style.display = display;
    };
}

var so = new SmartOrder();
so.init();
