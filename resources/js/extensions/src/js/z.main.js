class SmartOrder {
    // Hàm khởi tạo
    constructor() {
        this.global = new Object();
        this.global.alert = new Alert();
        this.global.store = new Store();
        this.global.isMobile = navigator.userAgentData.mobile;
        this.global.timeFrames = [
            { text: "Tick", value: 0 },
            { text: "1 min", value: 1 },
            { text: "2 min", value: 2 },
            { text: "3 min", value: 3 },
            { text: "5 min", value: 5 },
            { text: "7 min", value: 7 },
            { text: "10 min", value: 10 },
            { text: "15 min", value: 15 },
            { text: "30 min", value: 30 },
            { text: "1 day", value: 1440 }
        ];
        this.global.chartTypes = [
            { text: "Nến", value: 0 },
            { text: "Đường", value: 1 },
            { text: "Thanh", value: 2 }
        ];
        this.chart = new Chart(this.global, {
            getOrderPosition: this.getOrderPositionCallback,
            closePosition: this.closePositionCallback,
            orderEntryPrice: this.orderEntryPriceCallback,
            orderTpPrice: this.orderTpPriceCallback,
            orderSlPrice: this.orderSlPriceCallback,
            cancelOrder: this.cancelOrderCallback
        });
        this.popup = new Popup(this.global, {
            loggedin: this.loggedinCallback,
            loggedout: this.loggedoutCallback
        });
        this.menu = new Menu(this.global, {
            toggleTradingViewChart: this.toggleTradingViewCallback,
            toggleLightWeightChart: this.toggleLightWeightCallback,
            togglePopup: this.popup.toggle,
            getReportData: this.getReportDataCallback
        });
        this.registerFullscreenEvent();
    }

    // Các phương thức
    init = async () => {
        this.global.alert.show(
            "warning",
            "Đang khởi tạo SmartOrder . . .",
            false
        );
        await this.popup.getLocalConfig();
        this.popup.createNoLoginElement();
        await this.popup.getUser();
        if (this.global.isLoggedin) {
            await this.popup.getServerConfig();
            console.log("global-server: ", this.global);
            await this.loggedinCallback();
            document.getElementById(
                "sohopdong"
            ).value = this.global.contractNumber;
            document.getElementById("right_price").value = "MTL";
        }
        this.menu.displayDefault();
        this.global.alert.hide();
    };
    loggedinCallback = async () => {
        this.chart.createChart();
        await this.chart.loadChartData();
        await this.chart.getToolsData();
        this.popup.createLoggedinElement();
        this.menu.createLoggedinElement();
        this.chart.connectSocket();
    };
    loggedoutCallback = () => {
        this.menu.removeLoggedinElement();
        this.popup.removeLoggedinElement();
        this.chart.removeChart();
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
    getReportDataCallback = () => {
        return {
            revenue: +document
                .getElementById("vmAccInfo")
                .innerText.replaceAll(",", ""),
            fees: +document
                .getElementById("othersAccInfo")
                .innerText.replaceAll(",", "")
        };
    };
    getOrderPositionCallback = () => {
        const el = document.querySelector(
            `#danhmuc_${this.global.symbol} > td:nth-child(2)`
        );
        if (!el) return 0;
        const position = el.innerText;
        if (isNaN(position)) return 0;
        else return +position;
    };
    closePositionCallback = () => {
        const position = this.getOrderPositionCallback();
        if (position) {
            document.getElementById("select_normal_order_wrapper").click();
            document.getElementById("right_price").value = "MTL";
            document.getElementById("sohopdong").value = Math.abs(position);
            document
                .getElementById(`btn_${position > 0 ? "short" : "long"}`)
                .click();
        }
    };
    orderEntryPriceCallback = order => {
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
    orderTpPriceCallback = (order, isInit = false) => {
        this.callScript("onCancelAllOrderPending('order')");
        if (isInit)
            order.tp.price =
                +order.entry.price + order.side * this.global.takeProfit;
        setTimeout(() => {
            document.getElementById("select_normal_order_wrapper").click();
            document.getElementById("right_price").value = order.tp.price;
            document
                .getElementById(`btn_${order.side < 0 ? "long" : "short"}`)
                .click();
        }, 1000);
    };
    orderSlPriceCallback = (order, isInit = false) => {
        this.callScript("onCancelAllOrderPending('order_condition')");
        if (isInit)
            order.sl.price =
                +order.entry.price - order.side * this.global.stopLoss;
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
    cancelOrderCallback = () => {
        this.callScript("onCancelAllOrderPending('order_condition')");
        this.callScript("onCancelAllOrderPending('order')");
    };
    callScript = script => {
        var button = document.createElement("button");
        button.setAttribute("onclick", script);
        button.click();
    };
    registerFullscreenEvent = () => {
        document
            .querySelector(".timeStamp")
            .addEventListener("dblclick", () => {
                if (document.fullscreenElement) document.exitFullscreen();
                else document.documentElement.requestFullscreen();
            });
    };
}

var so = new SmartOrder();
so.init();
